import { Box, HStack, Image, Tag, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DoctorList } from '../dataList';
import BackButton from '../../../components/BackButton/BackButton';

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
    </HStack>
  );
};

export default AppointmentDetail;
