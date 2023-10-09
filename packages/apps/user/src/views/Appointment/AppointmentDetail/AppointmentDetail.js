import { useCallback, useEffect, useState } from 'react';

import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import {
  FaAngleRight,
  FaBookmark,
  FaRegBookmark,
  FaStar,
} from 'react-icons/fa6';
import dayjs from 'dayjs';
import {
  AspectRatio,
  Box,
  Divider,
  HStack,
  Heading,
  Image,
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
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { DoctorList, HospitalList } from '../dataList';
import BackButton from '../../../components/BackButton/BackButton';
import { useForm } from 'react-hook-form';
import { createAppointment } from '../../../api';
import AppointForm from './AppiontForm';
import ReviewList from '@housepital/common/ReviewList';

const AppointmentDetail = function () {
  const { category, id } = useParams();
  const [data, setData] = useState({});
  const [appointTime, setAppointTime] = useState();
  const [reservationOfDay, setReservationOfDay] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: { date: dayjs(new Date()).format('YYYY-MM-DD') },
  });
  const uid = useSelector(state => state.me.uid);

  const onToggleBookmarkClick = useCallback(() => {
    // Todo: 추후에 isFavorite 항목을 수정하는 axios patch 함수로 변경해야 함.
    setData({
      ...data,
      isFavorite: !data.isFavorite,
    });
  }, [data]);

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
        doctorId: 'hsw123', //TODO: 실제 doctor id로 변경해야 함
        time: appointTime,
        ...formData,
      };

      createAppointment(appointment)
        .then(() => console.log('success'))
        .catch(err => console.log(err));
    },
    [appointTime, uid],
  );

  useEffect(() => {
    //Todo: 추후에 id를 이용한 axios get 함수로 변경해야 함.
    //TODO: axios.get(`/${catogory}/${id}`)를 state에 저장하기 -> tanstack으로 감싸기
    if (category === 'doctors') {
      const found = DoctorList.find(d => d?.id === id);
      setData(found);
    } else if (category === 'hospitals') {
      const found = HospitalList.find(h => h?.id === id);
      setData(found);
    }

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
  }, [category, id]);

  return (
    <HStack height="full" gap="6">
      <VStack height="full" justifyContent="flex-start" alignItems="center">
        <BackButton />
      </VStack>

      <VStack minW="60" height="full" overflowY="auto">
        <Box
          width="full"
          minH="60"
          position="relative"
          borderRadius="md"
          overflow="hidden"
        >
          <AspectRatio ratio={1}>
            <Image src={data?.profileImg} alt="Profile" objectFit="cover" />
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

        <HStack width="full" justifyContent="space-between" alignItems="center">
          <Box>
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
            <Text>{data?.rate}</Text>
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
          columnGap="4"
          rowGap="2"
          justifyContent="flex-start"
          alignItems="center"
          wrap="wrap"
        >
          {data?.fields?.map(field => (
            <Tag size="md" key={field} variant="outline" colorScheme="gray">
              {field}
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
                bgColor="primary.200"
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
                bgColor="primary.200"
                borderRadius="md"
              >
                <UnorderedList styleType="none" ml={0} spacing="2">
                  <ListItem>
                    <b>월요일</b> {data?.businessHours?.monday.open} (점심시간{' '}
                    {data?.businessHours?.monday.break})
                  </ListItem>
                  <ListItem>
                    <b>화요일</b> {data?.businessHours?.tuesday.open} (점심시간{' '}
                    {data?.businessHours?.tuesday.break})
                  </ListItem>
                  <ListItem>
                    <b>수요일</b> {data?.businessHours?.wednesday.open}{' '}
                    (점심시간 {data?.businessHours?.wednesday.break})
                  </ListItem>
                  <ListItem>
                    <b>목요일</b> {data?.businessHours?.thursday.open} (점심시간{' '}
                    {data?.businessHours?.thursday.break})
                  </ListItem>
                  <ListItem>
                    <b>금요일</b> {data?.businessHours?.friday.open} (점심시간{' '}
                    {data?.businessHours?.friday.break})
                  </ListItem>
                  <ListItem>
                    <b>토요일</b> {data?.businessHours?.saturday.open} (점심시간{' '}
                    {data?.businessHours?.saturday.break})
                  </ListItem>
                  <ListItem>
                    <b>일요일</b> {data?.businessHours?.sunday.open} (점심시간{' '}
                    {data?.businessHours?.sunday.break})
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
              <UnorderedList listStyleType={'none'} margin={0} spacing={'4'}>
                {data.doctors?.map(doctor => {
                  return (
                    <ListItem key={doctor.id}>
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`/appointment/doctors/${doctor.id}`}
                        p={'4'}
                        bgColor={'primary.200'}
                        borderRadius={'md'}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <HStack gap={'6'}>
                          <AspectRatio width={'28'} ratio={1}>
                            <Image
                              borderRadius={'full'}
                              src={doctor.profileImg}
                              alt="Doctor Profile"
                              objectFit="cover"
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
    </HStack>
  );
};

export default AppointmentDetail;
