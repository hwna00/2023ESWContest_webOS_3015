import { useCallback, useState } from 'react';

import {
  useParams,
  Link as ReactRouterLink,
  useNavigate,
} from 'react-router-dom';
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
import { createAppointment, getHospitalDtl } from '../../../api';
import AppointForm from './AppiontForm';
import ReviewList from '@housepital/common/ReviewList';
import { useQuery } from '@tanstack/react-query';
import { getDetailByCategory } from '../../../utils/getByCategory';
import FieldList from '../../../components/FieldList/FieldList';
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard';

const AppointmentDetail = function () {
  const [appointTime, setAppointTime] = useState();

  const { category, id } = useParams();
  const navigate = useNavigate();
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

  const { data: hospitalDtl, isError: isDtlError } = useQuery(
    ['publicData', id],
    () => getHospitalDtl(data?.ykiho),
    {
      enabled: !!data?.ykiho,
    },
  );

  const onToggleBookmarkClick = useCallback(() => {
    // Todo: 추후에 isFavorite 항목을 수정하는 axios patch 함수로 변경해야 함.
  }, []);

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
        .then(() => navigate('/appointment/waiting-room'))
        .catch(err => console.log(err));
    },
    [appointTime, uid, data?.id, navigate],
  );

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
              {data?.rate && (
                <HStack gap="2" alignItems="center" fontWeight="bold">
                  <Icon as={FaStar} color="yellow.400" />
                  <Text>{Math.round(data?.rate * 10) / 10}</Text>
                </HStack>
              )}
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
              alignItems="flex-start"
              gap="2"
              wrap="wrap"
              overflowY="scroll"
            >
              {data.fields ? (
                data.fields?.map(field => (
                  <Tag
                    size="md"
                    key={field}
                    variant="outline"
                    colorScheme="gray"
                  >
                    {field}
                  </Tag>
                ))
              ) : (
                <FieldList ykiho={data.ykiho} />
              )}
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
                      <ListItem>
                        <b>월요일</b> {hospitalDtl?.mon} (점심시간{' '}
                        {hospitalDtl?.lunchWeek})
                      </ListItem>
                      <ListItem>
                        <b>화요일</b> {hospitalDtl?.tue} (점심시간{' '}
                        {hospitalDtl?.lunchWeek})
                      </ListItem>
                      <ListItem>
                        <b>수요일</b> {hospitalDtl?.wed} (점심시간{' '}
                        {hospitalDtl?.lunchWeek})
                      </ListItem>
                      <ListItem>
                        <b>목요일</b> {hospitalDtl?.thu} (점심시간{' '}
                        {hospitalDtl?.lunchWeek})
                      </ListItem>
                      <ListItem>
                        <b>금요일</b> {hospitalDtl?.fri} (점심시간{' '}
                        {hospitalDtl?.lunchWeek})
                      </ListItem>
                      <ListItem>
                        <b>토요일</b> {hospitalDtl?.sat} (점심시간:{' '}
                        {hospitalDtl?.lunchSat})
                      </ListItem>
                      <ListItem>
                        <b>일요일</b> {hospitalDtl?.sun}
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
                    hospitalDtl={hospitalDtl}
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
                            bgColor={'primary.100'}
                            borderRadius={'md'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                          >
                            <AppointmentCard data={doctor} />
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
