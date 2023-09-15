import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const Step2 = function () {
  const { register } = useOutletContext();
  const errors = useSelector(state => state.signUp.errors);

  return (
    <VStack width={'full'} gap={'4'}>
      <FormControl width="full" isRequired isInvalid={errors.birthDate}>
        <FormLabel>생년월일</FormLabel>
        <Input
          required
          type="date"
          placeholder="생년월일을 선택해주세요."
          {...register('birthDate', {
            required: '이 항목은 필수입니다.',
          })}
        />
        <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isRequired isInvalid={errors.address}>
        <FormLabel>주소</FormLabel>
        <Input
          required
          placeholder="옵션 요소입니다."
          {...register('address', {
            required: '이 항목은 필수입니다.',
          })}
        />
        <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isRequired isInvalid={errors.phoneNumber}>
        <FormLabel>전화번호</FormLabel>
        <InputGroup colorScheme="primary">
          <InputLeftAddon>010</InputLeftAddon>
          <Input
            required
            type="tel"
            maxLength="8"
            placeholder="필수 요소입니다."
            {...register('phoneNumber', {
              required: '이 항목은 필수입니다.',
              pattern: {
                value: /^[0-9]{8}$/i,
                message: '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
              },
            })}
          />
        </InputGroup>
        <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isInvalid={errors.secondPhoneNumber}>
        <FormLabel>비상 시 연락처</FormLabel>
        <InputGroup>
          <InputLeftAddon>010</InputLeftAddon>
          <Input
            type="tel"
            maxLength="8"
            placeholder="옵션 요소입니다."
            {...register('secondPhoneNumber', {
              pattern: {
                value: /^[0-9]{8}$/i,
                message: '전화번호는 8자리의 숫자로만 이루어져야 합니다.',
              },
            })}
          />
        </InputGroup>
        <FormErrorMessage>{errors.secondPhoneNumber?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default Step2;
