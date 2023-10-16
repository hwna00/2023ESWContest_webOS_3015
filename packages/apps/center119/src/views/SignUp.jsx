import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

import styles from '@housepital/common/css/HideScrollBar.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fbSignUp } from '../firebase';
import { createCounselor } from '../api';
import { useEffect, useState } from 'react';
import seoulCenterList from '../seoulCenterList';

function SignUp() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [centerName, setCenterName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const onChange = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else {
      const results = seoulCenterList.DATA.filter(center =>
        center.wardname.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSearchResults(results);
    }
  }, [searchTerm]);

  const onSubmit = async data => {
    try {
      const counselorId = await fbSignUp(data.email, data.password);
      const centerData = await createCounselor({
        counselorId,
        centerName: centerName,
        counselorName: data.counselorName,
      });

      if (centerData.isSuccess) {
        navigate('/');
      } else {
        navigate('/auth/log-in');
      }
    } catch (error) {
      console.error('Error during signup or creating a center:', error);
      // navigate('/auth/log-in');
    }
  };

  const handleSelect = center => {
    setCenterName(center.wardname);
    setIsFormVisible(true);
  };
  return (
    <Container>
      <Heading as="h1" textAlign="center" p="8">
        Housepital for Center
      </Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack width="80" gap="4">
          <Input
            onChange={onChange}
            w="100%"
            placeholder="센터 이름을 검색하세요."
          />

          {!isFormVisible && searchResults.length > 0 && (
            <div className={styles.hideScrollBar}>
              <Box
                border="solid 1px"
                borderColor="black"
                w="80"
                maxHeight="80"
                overflowY="auto"
              >
                {searchResults.map(item => (
                  <HStack key={item.objectid_1} justifyContent="space-between">
                    <Text>{item.wardname}</Text>
                    <Button onClick={() => handleSelect(item)}>선택</Button>
                  </HStack>
                ))}
              </Box>
            </div>
          )}

          <FormControl width="full" isRequired isInvalid={errors.counselorName}>
            <FormLabel>상담사 이름</FormLabel>
            <Input
              required
              type="text"
              name="counselor"
              placeholder="상담사 이름을 입력해주세요."
              {...register('counselorName', {
                required: '이 항목은 필수입니다.',
              })}
            />
            <FormErrorMessage>{errors.counselorName?.message}</FormErrorMessage>
          </FormControl>

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
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl width="full" isRequired isInvalid={errors.password}>
            <FormLabel>비밀번호</FormLabel>
            <Input
              required
              type="password"
              placeholder="6자리 이상의 비밀번호를 입력해주세요."
              {...register('password', {
                required: '이 항목은 필수입니다.',
                minLength: {
                  value: 6,
                  message: '6자리 이상 입력해주세요.',
                },
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

          <Button colorScheme="primary" w="full" type="submit">
            가입하기
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}

export default SignUp;
