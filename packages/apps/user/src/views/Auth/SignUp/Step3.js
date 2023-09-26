import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
  InputGroup,
  InputRightAddon,
  Textarea,
  Select,
} from '@chakra-ui/react';

const Step3 = function () {
  const { register } = useOutletContext();
  const errors = useSelector(state => state.signUp.errors);

  return (
    <VStack width="full" gap="4">
      <HStack width="full" gap="4">
        <FormControl width="full" isInvalid={errors.bloodType}>
          <FormLabel>혈액형</FormLabel>
          <Select placeholder="혈액형" {...register('bloodType')}>
            <option value="blood_A">A형</option>
            <option value="blood_B">B형</option>
            <option value="blood_O">O형</option>
            <option value="blood_AB">AB형</option>
          </Select>
          <FormErrorMessage>{errors.bloodType?.message}</FormErrorMessage>
        </FormControl>

        <FormControl width="full" isInvalid={errors.height}>
          <FormLabel>키</FormLabel>
          <InputGroup>
            <Input
              type="number"
              placeholder="키"
              {...register('height', {
                pattern: {
                  value: /^[0-9]/i,
                  message: '키는 숫자로만 이루어져야 합니다.',
                },
              })}
            />
            <InputRightAddon>cm</InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{errors.height?.message}</FormErrorMessage>
        </FormControl>

        <FormControl width="full" isInvalid={errors.weight}>
          <FormLabel>몸무게</FormLabel>
          <InputGroup>
            <Input type="number" placeholder="몸무게" {...register('weight')} />
            <InputRightAddon>kg</InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
        </FormControl>
      </HStack>

      <FormControl width="full" isInvalid={errors.chronicDisease}>
        <FormLabel>질환 정보</FormLabel>
        <Textarea
          resize="none"
          placeholder="평소 앓고 있었던 질병이나 수술 이력이 있다면 입력해주세요."
          {...register('chronicDisease')}
        />
        <FormErrorMessage>{errors.chronicDisease?.message}</FormErrorMessage>
      </FormControl>

      <FormControl width="full" isInvalid={errors.regularMedicines}>
        <FormLabel>복약 정보</FormLabel>
        <Textarea
          resize="none"
          placeholder="평소 지속적으로 복용하고 있는 약이 있다면 입력해주세요."
          {...register('regularMedicines')}
        />
        <FormErrorMessage>{errors.regularMedicines?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default Step3;
