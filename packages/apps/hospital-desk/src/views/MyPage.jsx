import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateHospital } from '../api';
import axios from 'axios';

const BASE_URL = ` http://apis.data.go.kr/B551182/MadmDtlInfoService2`;

function MyPage() {
  const hospital = useSelector(state => state.hospital);
  const ykiho = hospital.ykiho;

  const dispatch = useDispatch();
  const [item, setItem] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all', defaultValues: hospital });

  const fetchResultsInfo = useCallback(async () => {
    const { data } = await axios.get(
      `${BASE_URL}/getEqpInfo2?serviceKey=${process.env.REACT_APP_PUBLIC_DP_API_KEY}&ykiho=${ykiho}`,
    );
    return data;
  }, [ykiho]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchResultsInfo();
      setItem(data.response.body.items.item);
    };

    fetchData();
  }, [fetchResultsInfo, setValue, dispatch]);

  const onSubmit = data => {
    updateHospital(hospital.hospitalId, data)
      .then(() => {
        //TODO: 성공했다고 알림
        console.log('성공');
      })
      .catch(err => {
        //TODO: 실패했다고 알림
        console.log(err);
      });
  };

  useEffect(() => {
    reset(hospital);
  }, [reset, hospital]);

  return (
    <Box height={'full'} overflowY={'scroll'}>
      <VStack as={'form'} width={'full'} onSubmit={handleSubmit(onSubmit)}>
        <HStack
          width={'full'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'12'}
        >
          <Avatar src={hospital.profileImg} size={'2xl'} />
          <VStack width={'sm'}>
            <FormControl width="full" isRequired isInvalid={errors.username}>
              <FormLabel>병원 이름</FormLabel>
              <Input
                {...register('username', {})}
                defaultValue={hospital.name}
                readOnly
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        </HStack>

        <VStack>
          <FormControl width="full" isRequired isInvalid={errors.address}>
            <FormLabel margin={0}>주소</FormLabel>
            <Input {...register('address', {})} readOnly />
            <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
          </FormControl>
          <FormControl width="full" isRequired isInvalid={errors.phoneNumber}>
            <FormLabel>전화번호</FormLabel>
            <InputGroup colorScheme="primary">
              <Input
                type="tel"
                {...register('phoneNumber', {
                  pattern: {
                    value: /^[0-9]{9, 11}$/i,
                  },
                })}
                readOnly
              />
            </InputGroup>
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>
          <FormControl width="full" isInvalid={errors.description}>
            <FormLabel>상세정보 및 소개글</FormLabel>
            <InputGroup colorScheme="primary">
              <Textarea
                {...register('description')}
                defaultValue={hospital.description}
              />
            </InputGroup>
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          <FormControl width="full" isInvalid={errors.runningtime}>
            <FormLabel>병원 영업시간</FormLabel>
            <InputGroup colorScheme="primary">
              <Textarea
                {...register('runningtime')}
                defaultValue={hospital.runningtime}
              />
            </InputGroup>
            <FormErrorMessage>{errors.runningtime?.message}</FormErrorMessage>
          </FormControl>
        </VStack>
        <ButtonGroup
          display={'flex'}
          justifyContent={'center'}
          mt={'8'}
          gap={'4'}
        >
          <Button type="submit" size={'lg'} colorScheme="primary">
            저장하기
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
}

export default MyPage;
