import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  HStack,
  Image,
  Tag,
  Text,
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

      <VStack width={'60'} height={'full'} overflowY={'auto'}>
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

      <VStack></VStack>
    </HStack>
  );
};

export default AppointmentDetail;
