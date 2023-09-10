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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DoctorList } from '../dataList';
import BackButton from '../../../components/BackButton/BackButton';
import { FaBookmark, FaRegBookmark, FaStar } from 'react-icons/fa6';
import { Icon } from '@chakra-ui/react';

const AppointmentDetail = function () {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const found = DoctorList.find(d => d?.id === id);
    setDoctor(found);
  }, []);

  return (
    <HStack height={'full'}>
      <VStack
        height={'full'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <BackButton />
      </VStack>

      <VStack width={'60'} minW={'60'} height={'full'} overflowY={'auto'}>
        <Box
          width={'full'}
          minH={'60'}
          position={'relative'}
          borderRadius={'md'}
          overflow={'hidden'}
        >
          <AspectRatio ratio={1}>
            <Image
              src={doctor.profileImg}
              alt="Doctor Profile"
              objectFit={'cover'}
            />
          </AspectRatio>
          <Text position={'absolute'} top={'4'} right={'4'}>
            {doctor.isFavorite ? (
              <Icon as={FaBookmark} boxSize={6} />
            ) : (
              <Icon as={FaRegBookmark} boxSize={6} />
            )}
          </Text>
        </Box>

        <HStack
          width={'full'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box>
            <Text color={'primary.500'} fontWeight={'bold'}>
              영업중
            </Text>
            <Text fontSize={'xl'} fontWeight={'bold'}>
              {doctor.name} 의사
            </Text>
            <Text>{doctor.specialty} 전문의</Text>
          </Box>
          <HStack gap={'2'} alignItems={'center'} fontWeight={'bold'}>
            <Icon as={FaStar} color="yellow.400" />
            <Text>{doctor.rate}</Text>
          </HStack>
        </HStack>

        <Divider bgColor={'primary.700'} height={'1px'} />

        <VStack width={'full'} gap={'2'} alignItems={'flex-start'}>
          <Text>{doctor.hospital}</Text>
          <Text>전화번호: {doctor.tel}</Text>
          <Text>주소: {doctor.address}</Text>
        </VStack>

        <Divider bgColor={'primary.700'} height={'1px'} />

        <HStack
          width={'full'}
          columnGap={'4'}
          rowGap={'2'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          wrap={'wrap'}
        >
          {doctor.fields?.map(field => (
            <Tag size={'md'} key={field} variant="outline" colorScheme="gray">
              {field}
            </Tag>
          ))}
        </HStack>
      </VStack>

      <Tabs
        isFitted
        width={'full'}
        height={'full'}
        size={'md'}
        colorScheme="primary"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
      >
        <TabList>
          <Tab>의사 정보</Tab>
          <Tab>예약</Tab>
          <Tab>리뷰</Tab>
        </TabList>

        <TabPanels width={'full'} height={'full'} overflowY={'scroll'}>
          <TabPanel>
            <Box>
              <Heading as={'h2'} size={'lg'}>
                의사 소개
              </Heading>
              <Box
                width={'full'}
                minH={'10'}
                mt={'4'}
                padding={'4'}
                bgColor={'primary.200'}
                borderRadius={'md'}
              >
                <Text>{doctor?.description}</Text>
              </Box>
            </Box>

            <Box mt={'8'}>
              <Heading as={'h2'} size={'lg'}>
                영업 시간
              </Heading>
              <Box
                width={'full'}
                minH={'10'}
                mt={'4'}
                padding={'4'}
                bgColor={'primary.200'}
                borderRadius={'md'}
              >
                <UnorderedList styleType={'none'} ml={0} spacing={'2'}>
                  <ListItem>
                    <b>월요일</b> {doctor.businessHours?.monday.open} (점심시간{' '}
                    {doctor.businessHours?.monday.break})
                  </ListItem>
                  <ListItem>
                    <b>화요일</b> {doctor.businessHours?.tuesday.open} (점심시간{' '}
                    {doctor.businessHours?.tuesday.break})
                  </ListItem>
                  <ListItem>
                    <b>수요일</b> {doctor.businessHours?.wednesday.open}{' '}
                    (점심시간 {doctor.businessHours?.wednesday.break})
                  </ListItem>
                  <ListItem>
                    <b>목요일</b> {doctor.businessHours?.thursday.open}{' '}
                    (점심시간 {doctor.businessHours?.thursday.break})
                  </ListItem>
                  <ListItem>
                    <b>금요일</b> {doctor.businessHours?.friday.open} (점심시간{' '}
                    {doctor.businessHours?.friday.break})
                  </ListItem>
                  <ListItem>
                    <b>토요일</b> {doctor.businessHours?.saturday.open}{' '}
                    (점심시간 {doctor.businessHours?.saturday.break})
                  </ListItem>
                  <ListItem>
                    <b>일요일</b> {doctor.businessHours?.sunday.open} (점심시간{' '}
                    {doctor.businessHours?.sunday.break})
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <UnorderedList styleType={'none'} spacing={'6'}>
              <ListItem
                bgColor={'primary.200'}
                borderRadius={'md'}
                padding={'4'}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb={'4'}
                >
                  <Text fontWeight={'bold'}>양지웅님 (담당의사: 김재인)</Text>
                  <HStack gap={'2'} alignItems={'center'} fontWeight={'bold'}>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text>{doctor.rate}</Text>
                  </HStack>
                </HStack>
                <Text>의사 선생님이 약간 불친절해요</Text>
              </ListItem>
              <ListItem
                bgColor={'primary.200'}
                borderRadius={'md'}
                padding={'4'}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb={'4'}
                >
                  <Text fontWeight={'bold'}>양지웅님 (담당의사: 김재인)</Text>
                  <HStack gap={'2'} alignItems={'center'} fontWeight={'bold'}>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text>{doctor.rate}</Text>
                  </HStack>
                </HStack>
                <Text>의사 선생님이 약간 불친절해요</Text>
              </ListItem>
              <ListItem
                bgColor={'primary.200'}
                borderRadius={'md'}
                padding={'4'}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb={'4'}
                >
                  <Text fontWeight={'bold'}>양지웅님 (담당의사: 김재인)</Text>
                  <HStack gap={'2'} alignItems={'center'} fontWeight={'bold'}>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text>{doctor.rate}</Text>
                  </HStack>
                </HStack>
                <Text>의사 선생님이 약간 불친절해요</Text>
              </ListItem>
              <ListItem
                bgColor={'primary.200'}
                borderRadius={'md'}
                padding={'4'}
              >
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mb={'4'}
                >
                  <Text fontWeight={'bold'}>양지웅님 (담당의사: 김재인)</Text>
                  <HStack gap={'2'} alignItems={'center'} fontWeight={'bold'}>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text>{doctor.rate}</Text>
                  </HStack>
                </HStack>
                <Text>의사 선생님이 약간 불친절해요</Text>
              </ListItem>
            </UnorderedList>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </HStack>
  );
};

export default AppointmentDetail;
