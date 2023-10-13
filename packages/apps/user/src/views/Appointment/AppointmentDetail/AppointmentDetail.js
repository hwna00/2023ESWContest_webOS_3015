import { useCallback, useEffect, useState } from 'react';

import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';
import { FaBookmark } from '@react-icons/all-files/fa/FaBookmark';
import { FaRegBookmark } from '@react-icons/all-files/fa/FaRegBookmark';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import dayjs from 'dayjs';
import {
  AspectRatio,
  Box,
  Divider,
  HStack,
  Heading,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  UnorderedList,
  VStack,
  Icon,
  Link as ChakraLink,
  Avatar,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import BackButton from '../../../components/BackButton/BackButton';
import { useForm } from 'react-hook-form';
import { createAppointment, getFields, getHospitalDtl } from '../../../api';
import AppointForm from './AppiontForm';
import ReviewList from '@housepital/common/ReviewList';
import { useQuery } from '@tanstack/react-query';
import { getDetailByCategory } from '../../../utils/getByCategory';

const AppointmentDetail = function () {
  const [appointTime, setAppointTime] = useState();
  const [reservationOfDay, setReservationOfDay] = useState({});

  const { category, id } = useParams();
  const uid = useSelector(state => state.me.uid);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: { date: dayjs(new Date()).format('YYYY-MM-DD') },
  });

  const { isLoading, data } = useQuery([id], () =>
    getDetailByCategory(category, id),
  );

  const {
    isLoading: isDtlLoading,
    data: hospitalDtl,
    isError: isDtlError,
  } = useQuery([id], () => getHospitalDtl(data?.ykiho));

  const { data: fields = [] } = useQuery([id, data?.ykiho], getFields);

  const onToggleBookmarkClick = useCallback(() => {
    // Todo: 추후에 isFavorite 항목을 수정하는 axios patch 함수로 변경해야 함.
  }, []);

  const getReviewAve = reviews => {
    // TODO: 리뷰 평점 계산하는 computed 함수 제작하기
    return 10;
  };

  const onSubmit = useCallback(
    formData => {
      if (!appointTime) {
        //TODO: webOS로 알림 전송하기
        return null;
      }
      if (formData.type === 'nftf' && !formData.nftfType) {
        //TODO: webOS로 알림 전송하기
        return null;
      }

      const appointment = {
        uid,
        doctorId: data.id,
        time: appointTime,
        ...formData,
      };

      createAppointment(appointment)
        .then(() => console.log('success'))
        .catch(err => console.log(err));
    },
    [appointTime, uid, data?.id],
  );

  useEffect(() => {
    setReservationOfDay({
      '09:00': 2,
      '09:30': 1,
      '10:00': 0,
      '10:30': 3,
      '11:00': 3,
      '11:30': 3,
      '12:00': 2,
      '12:30': 1,
      '13:00': 0,
      '13:30': 0,
      '14:00': 0,
      '14:30': 0,
      '15:00': 3,
      '15:30': 0,
      '16:00': 1,
      '16:30': 0,
      '17:00': 0,
      '17:30': 0,
    });
  }, []);

  return (
    <HStack height="full" gap="6">
      {isDtlError && <Text>{isDtlError.message}</Text>}
      <VStack height="full" justifyContent="flex-start" alignItems="center">
        <BackButton />
      </VStack>

      {isLoading ? (
        'loading...'
      ) : (
        <>
          <VStack
            maxW="60"
            height="full"
            justifyContent="center"
            overflowY="auto"
          >
            <Box
              width="full"
              position="relative"
              borderRadius="md"
              overflow="hidden"
            >
              <AspectRatio ratio={1} maxW="48" mx="auto">
                <Avatar src={data?.profileImg} alt="Profile" />
              </AspectRatio>
              <Text position="absolute" top="4" right="4">
                {data?.isFavorite ? (
                  <Icon
                    as={FaBookmark}
                    boxSize={6}
                    onClick={onToggleBookmarkClick}
                  />
                ) : (
                  <Icon
                    as={FaRegBookmark}
                    boxSize={6}
                    onClick={onToggleBookmarkClick}
                  />
                )}
              </Text>
            </Box>

            <HStack
              width="full"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                {/* // TODO: api 연결해야 함 */}
                <Text color="primary.500" fontWeight="bold">
                  영업중
                </Text>
                {category === 'doctors' && (
                  <>
                    <Text fontSize="xl" fontWeight="bold">
                      {data?.name} 의사
                    </Text>
                    <Text>{data?.specialty} 전문의</Text>
                  </>
                )}
                {category === 'hospitals' && (
                  <>
                    <Text fontSize="xl" fontWeight="bold">
                      {data?.name}
                    </Text>
                  </>
                )}
              </Box>
              <HStack gap="2" alignItems="center" fontWeight="bold">
                <Icon as={FaStar} color="yellow.400" />
                <Text>{getReviewAve(data?.reviews)}</Text>
              </HStack>
            </HStack>

            <Divider bgColor="primary.700" height="1px" />

            <VStack width="full" gap="2" alignItems="flex-start">
              <Text>{data?.hospital}</Text>
              <Text>전화번호: {data?.tel}</Text>
              <Text>주소: {data?.address}</Text>
            </VStack>

            <Divider bgColor="primary.700" height="1px" />

            <HStack
              width="full"
              height="20"
              columnGap="4"
              rowGap="2"
              justifyContent="flex-start"
              alignItems="center"
              wrap="wrap"
              overflowY="scroll"
            >
              {fields?.map(field => (
                <Tag
                  size="md"
                  key={field.dgsbjtCdNm}
                  variant="outline"
                  colorScheme="gray"
                >
                  {field.dgsbjtCdNm}
                </Tag>
              ))}
            </HStack>
          </VStack>

          <Tabs
            isFitted
            width="full"
            height="full"
            size="md"
            colorScheme="primary"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            <TabList>
              {category === 'doctors' && (
                <>
                  <Tab>의사 정보</Tab>
                  <Tab>예약</Tab>
                </>
              )}
              {category === 'hospitals' && (
                <>
                  <Tab>병원 정보</Tab>
                  <Tab>의료진</Tab>
                </>
              )}
              <Tab>리뷰</Tab>
            </TabList>

            <TabPanels width="full" height="full" overflowY="scroll">
              <TabPanel>
                <Box>
                  <Heading as="h2" size="lg">
                    {category === 'doctors' && '의사 소개'}
                    {category === 'hospitals' && '병원 소개'}
                  </Heading>
                  <Box
                    width="full"
                    minH="10"
                    mt="4"
                    padding="4"
                    bgColor="primary.100"
                    borderRadius="md"
                  >
                    <Text>{data?.description}</Text>
                  </Box>
                </Box>

                <Box mt="8">
                  <Heading as="h2" size="lg">
                    영업 시간
                  </Heading>
                  <Box
                    width="full"
                    minH="10"
                    mt="4"
                    padding="4"
                    bgColor="primary.100"
                    borderRadius="md"
                  >
                    <UnorderedList styleType="none" ml={0} spacing="2">
                      {/* // TODO: 공데포 api 연결하기 */}
                      <ListItem>
                        <b>월요일</b> {data?.businessHours?.monday.open}{' '}
                        (점심시간 {data?.businessHours?.monday.break})
                      </ListItem>
                      <ListItem>
                        <b>화요일</b> {data?.businessHours?.tuesday.open}{' '}
                        (점심시간 {data?.businessHours?.tuesday.break})
                      </ListItem>
                      <ListItem>
                        <b>수요일</b> {data?.businessHours?.wednesday.open}{' '}
                        (점심시간 {data?.businessHours?.wednesday.break})
                      </ListItem>
                      <ListItem>
                        <b>목요일</b> {data?.businessHours?.thursday.open}{' '}
                        (점심시간 {data?.businessHours?.thursday.break})
                      </ListItem>
                      <ListItem>
                        <b>금요일</b> {data?.businessHours?.friday.open}{' '}
                        (점심시간 {data?.businessHours?.friday.break})
                      </ListItem>
                      <ListItem>
                        <b>토요일</b> {data?.businessHours?.saturday.open}{' '}
                        (점심시간 {data?.businessHours?.saturday.break})
                      </ListItem>
                      <ListItem>
                        <b>일요일</b> {data?.businessHours?.sunday.open}{' '}
                        (점심시간 {data?.businessHours?.sunday.break})
                      </ListItem>
                    </UnorderedList>
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel
                as={'form'}
                height="full"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap={'4'}
                onSubmit={handleSubmit(onSubmit)}
              >
                {category === 'doctors' && (
                  <AppointForm
                    reservationOfDay={reservationOfDay}
                    register={register}
                    errors={errors}
                    setAppointTime={setAppointTime}
                  />
                )}
                {category === 'hospitals' && (
                  <UnorderedList
                    listStyleType={'none'}
                    margin={0}
                    spacing={'4'}
                  >
                    {data?.doctors.map(doctor => {
                      return (
                        <ListItem key={doctor.id}>
                          <ChakraLink
                            as={ReactRouterLink}
                            to={`/appointment/doctors/${doctor.id}`}
                            p={'4'}
                            bgColor={'primary.100'}
                            borderRadius={'md'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                          >
                            <HStack gap={'6'}>
                              <AspectRatio width={'28'} ratio={1}>
                                <Avatar
                                  borderRadius={'full'}
                                  src={doctor.profileImg}
                                  alt="Doctor Profile"
                                />
                              </AspectRatio>

                              <VStack
                                height={'full'}
                                justifyContent={'flex-start'}
                                alignItems={'flex-start'}
                              >
                                <Text fontSize="xl" fontWeight="bold">
                                  {doctor.name} 의사
                                </Text>
                                <Text>{doctor.specialty} 전문의</Text>
                              </VStack>
                            </HStack>

                            <Icon boxSize={8} as={FaAngleRight} />
                          </ChakraLink>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                )}
              </TabPanel>

              <TabPanel>
                <ReviewList reviews={data?.reviews} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </HStack>
  );
};

export default AppointmentDetail;
