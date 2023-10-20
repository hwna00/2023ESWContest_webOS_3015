import {
  Avatar,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function MyPage() {
  const counselor = useSelector(state => state.counselor);

  const {
    register,

    reset,
    formState: { errors },
  } = useForm({ mode: 'all', defaultValues: counselor });

  useEffect(() => {
    reset(counselor);
  }, [reset, counselor]);

  return (
    <Box height={'full'} overflowY={'scroll'}>
      <VStack as={'form'} width={'full'}>
        <HStack
          width={'full'}
          justifyContent={'center'}
          alignItems={('center', 'flex-start')}
          gap={'12'}
        >
          <Avatar src={counselor.profileImg} size={'2xl'} />
          <VStack width={'sm'}>
            <FormControl width="350px" isRequired isInvalid={errors.username}>
              <FormLabel>상담사 이름</FormLabel>
              <Input
                {...register('username', {})}
                defaultValue={counselor.counselorName}
                readOnly
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl width="350px" isRequired isInvalid={errors.center}>
              <FormLabel margin={0}>센터</FormLabel>
              <Input
                {...register('center', {})}
                defaultValue={counselor.centerName}
                readOnly
              />
              <FormErrorMessage>{errors?.center?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}

export default MyPage;
