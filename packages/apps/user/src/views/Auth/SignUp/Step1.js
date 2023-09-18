import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const Step1 = function () {
  const { register, getValues } = useOutletContext();
  const errors = useSelector(state => state.signUp.errors);

  return (
    <VStack width={'full'} gap={'4'}>
      <FormControl width="full" isRequired isInvalid={errors.email}>
        <FormLabel>이메일</FormLabel>
        <Input
          required
          type="email"
          placeholder="이메일을 입력해주세요."
          {...register('email', {
            required: '이 항목은 필수입니다.',
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일 형식이 아닙니다.',
            },
          })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isRequired isInvalid={errors.username}>
        <FormLabel>이름</FormLabel>
        <Input
          required
          placeholder="성함을 입력해주세요."
          {...register('username', {
            required: '이 항목은 필수입니다.',
          })}
        />
        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isRequired isInvalid={errors.password}>
        <FormLabel>비밀번호</FormLabel>
        <Input
          required
          type="password"
          placeholder="6자리 이상의 비밀번호를 입력해주세요."
          {...register('password', {
            required: '이 항목은 필수입니다.',
            minLength: { value: 6, message: '6자리 이상 입력해주세요.' },
          })}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isRequired isInvalid={errors.checkPassword}>
        <FormLabel>비밀번호 확인</FormLabel>
        <Input
          required
          type="password"
          placeholder="필수 요소입니다."
          {...register('checkPassword', {
            required: '이 항목은 필수입니다.',
            validate: {
              check: checkPassword => {
                if (getValues('password') !== checkPassword) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              },
            },
          })}
        />
        <FormErrorMessage>{errors.checkPassword?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default Step1;
