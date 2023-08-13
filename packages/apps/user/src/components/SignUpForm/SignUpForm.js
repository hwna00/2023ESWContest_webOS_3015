import {
  FormControl,
  Input,
  FormLabel,
  Textarea,
  InputGroup,
  InputLeftAddon,
  Select,
  InputRightAddon,
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const SignUpForm = function ({ formPosition }) {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <Box width={800} overflow={'hidden'}>
      <HStack
        gap={0}
        as={motion.div}
        animate={{ x: formPosition }}
        transition={'0.1s linear'}
      >
        <VStack minWidth={800} gap={'4'} pr={'10'}>
          <FormControl width={'full'} isRequired>
            <FormLabel>이메일</FormLabel>
            <Input
              required
              type="email"
              placeholder="필수 요소입니다."
              {...register('email', { required: true })}
            />
          </FormControl>
          <FormControl width={'full'} isRequired>
            <FormLabel>이름</FormLabel>
            <Input
              required
              placeholder="필수 요소입니다."
              {...register('username', { required: true })}
            />
          </FormControl>
          <FormControl width={'full'} isRequired>
            <FormLabel>비밀번호</FormLabel>
            <Input
              required
              type="password"
              placeholder="필수 요소입니다."
              {...register('password', { required: true })}
            />
          </FormControl>
          <FormControl width={'full'} isRequired>
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              required
              type="password"
              placeholder="필수 요소입니다."
              {...register('check-password', { required: true })}
            />
          </FormControl>
        </VStack>

        <VStack minWidth={800} gap={'4'} pr={'10'}>
          <FormControl width={'full'} isRequired>
            <FormLabel>생년월일</FormLabel>
            <Input
              required
              type="date"
              placeholder="필수 요소입니다."
              {...register('birth-date', { required: true })}
            />
          </FormControl>
          <FormControl width={'full'} isRequired>
            <FormLabel>주소</FormLabel>
            <Input
              required
              placeholder="옵션 요소입니다."
              {...register('address')}
            />
          </FormControl>
          <FormControl width={'full'} isRequired>
            <FormLabel>전화번호</FormLabel>
            <InputGroup colorScheme="primary">
              <InputLeftAddon children="010" />
              <Input
                required
                type="tel"
                maxLength={'8'}
                placeholder="필수 요소입니다."
                {...register('phone-nubmer', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl width={'full'}>
            <FormLabel>비상 시 연락처</FormLabel>
            <InputGroup>
              <InputLeftAddon children="010" />
              <Input
                required
                type="tel"
                maxLength={'8'}
                placeholder="옵션 요소입니다."
                {...register('second-phone-number')}
              />
            </InputGroup>
          </FormControl>
        </VStack>

        <VStack minWidth={800} gap={'4'} pr={'10'}>
          <HStack width={'full'} gap={'4'}>
            <FormControl width={'full'}>
              <FormLabel>혈액형</FormLabel>
              <Select placeholder="혈액형">
                <option value="option1">A형</option>
                <option value="option2">B형</option>
                <option value="option3">O형</option>
                <option value="option3">AB형</option>
              </Select>
            </FormControl>
            <FormControl width={'full'}>
              <FormLabel>키</FormLabel>
              <InputGroup>
                <Input type="number" placeholder="키" />
                <InputRightAddon children="cm" />
              </InputGroup>
            </FormControl>
            <FormControl width={'full'}>
              <FormLabel>몸무게</FormLabel>
              <InputGroup>
                <Input type="number" placeholder="몸무게" />
                <InputRightAddon children="kg" />
              </InputGroup>
            </FormControl>
          </HStack>
          <FormControl width={'full'}>
            <FormLabel>건강 정보</FormLabel>
            <Textarea
              resize={'none'}
              placeholder="복용하고 있는 약이 있다면 적어주세요"
            />
          </FormControl>
          <FormControl width={'full'}>
            <FormLabel>건강 정보</FormLabel>
            <Textarea
              resize={'none'}
              placeholder="복용하고 있는 약이 있다면 적어주세요"
            />
          </FormControl>
        </VStack>

        <VStack minWidth={800} gap={'4'} pr={'10'}>
          //Todo: 사진 찍기 필요
        </VStack>
      </HStack>
    </Box>
  );
};

export default SignUpForm;
