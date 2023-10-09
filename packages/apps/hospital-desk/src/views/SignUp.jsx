import React, { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import axios from 'axios';
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
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { fbSignUp } from '../firebase';
import { createHospital } from '../api';
import { useNavigate } from 'react-router-dom';

const BASE_URL = `https://apis.data.go.kr/B551182/hospInfoServicev2`;

const SignUp = function () {
  const [hospitalName, setHospitalName] = useState('');
  const [hospital, setHospital] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const fetchResults = useCallback(async () => {
    const { data } = await axios.get(
      // TODO: api 키 이름 변경
      `${BASE_URL}/getHospBasisList?serviceKey=${process.env.REACT_APP_PUBLIC_DP_API_KEY}&numOfRows=999&yadmNm=${hospitalName}`,
    );

    if (data.response?.body.items) {
      const { item } = data.response.body.items;
      setSearchResults(Array.isArray(item) ? item : [item]);
    } else {
      setSearchResults([]);
    }
  }, [hospitalName]);

  const onChange = useCallback(e => {
    const valueWithoutSpaces = e.target.value.replace(/\s/g, '');
    setHospitalName(valueWithoutSpaces);
  }, []);

  const onSelect = useCallback(hospital => {
    setHospital(hospital);
    setHospitalName(hospital.yadmNm);
    setIsFormVisible(true);
  }, []);
  const onSubmit = async data => {
    try {
      const hospitalId = await fbSignUp(data.email, data.password);
      await createHospital({
        hospitalId,
        ykiho: hospital.ykiho,
        hospitalName: hospital.yadmNm,
        email: data.email,
        description: data.description,
      });
      console.log(hospitalId);
    } catch (error) {
      console.error('Error during signup or creating a hospital:', error);
    }
    navigate('/auth/log-in');
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (hospitalName) {
        fetchResults();
      }
    }, 100);

    return () => clearTimeout(debounce);
  }, [hospitalName, fetchResults]);

  return (
    <Container>
      <Heading as="h1" textAlign="center" p="8">
        Housepital for Hospital
      </Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <HStack w="400px" alignContent="center">
          <InputGroup>
            <Input
              value={hospitalName}
              onChange={onChange}
              h="14"
              w="100%"
              borderRadius="24px"
              placeholder="병원 이름을 검색하세요."
              _hover={{ boxShadow: '0px 0px 10px rgba(32,33,36,.28)' }}
            />
            <InputRightElement>
              <Button
                onClick={fetchResults}
                h="14"
                borderRightRadius="24px"
                bgColor="transparent"
                p="0"
              >
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </HStack>
        {!isFormVisible && (
          <Box
            border="solid 1px"
            borderColor="black"
            w="500px"
            maxHeight="500px"
            overflowY="auto"
          >
            {searchResults.map(result => (
              <HStack key={result.ykiho}>
                <Text>{result.yadmNm}</Text>
                <Text>{result.addr}</Text>
                <Button onClick={() => onSelect(result)}>선택</Button>
              </HStack>
            ))}
          </Box>
        )}

        {isFormVisible && (
          <VStack width="80" gap="4">
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

            <FormControl
              width="full"
              isRequired
              isInvalid={errors.checkPassword}
            >
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
              <FormErrorMessage>
                {errors.checkPassword?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>병원 소개 및 설명</FormLabel>
              <Textarea
                placeholder="병원 소개 및 설명을 입력해주세요."
                {...register('description', {})}
              />
            </FormControl>
            <Button colorScheme="primary" w="full" type="submit">
              가입하기
            </Button>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};
export default SignUp;
