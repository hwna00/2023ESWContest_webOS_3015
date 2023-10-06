import { createDoctor, getHospitals } from '../../api';
import {
  Box,
  Button,
  ButtonGroup,
  Link as ChakraLink,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
  UnorderedList,
  VStack,
  useCheckboxGroup,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import { fbSignUp } from '../../../firebase';
import CustomCheckbox from '@housepital/common/CustomCheckox';

const SignUp = function () {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const fields = [
    '내과',
    '신경과',
    '정신건강의학과',
    '외과',
    '정형외과',
    '신경외과',
    '흉부외과',
    '성형외과',
    '마취통증의학과',
    '산부인과',
    '소아청소년과',
    '안과',
    '이비인후과',
    '피부과',
    '비뇨의학과',
    '영상의학과',
    '방사선종양학과',
    '병리과',
    '진단검사의학과',
    '결핵과',
    '재활의학과',
    '예방의학과',
    '가정의학과',
    '응급의학과',
    '핵의학과',
    '직업환경의학과',
  ];

  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all', defaultValues: { ykiho: '' } });
  const checkboxGroup = useCheckboxGroup({
    onChange: e => console.log(e),
  });

  const onSearchFieldClick = useCallback(async () => {
    const hospitalName = getValues('hospital');
    const { data } = await getHospitals(hospitalName);

    if (data.length === 0) {
      // TODO: webOS.notification 전송
    } else {
      setHospitals(data);
    }
  }, [getValues]);

  const onHospitalClick = useCallback(
    hospital => {
      setSelectedHospital(hospital.id); // TODO: id를 ykiho로 변경해야 함
    },
    [setSelectedHospital],
  );

  const onSubmit = useCallback(
    async data => {
      if (selectedHospital === '') {
        // TODO: 병원이 선택되지 않은 경우
        // TODO: webOS.notification 사용
      }
      const doctorId = await fbSignUp(data);
      const response = await createDoctor({ doctorId, ...data });

      if (response.isSucess) {
        navigate('/');
      } else {
        //TODO: 가입 실패
        // TODO: webOS.notification 사용
        console.log(response.message);
      }
    },
    [selectedHospital, navigate],
  );

  return (
    <Container height={'100vh'} py={'8'} overflowY={'hidden'}>
      <HStack width="full" justifyContent="start" alignItems="end">
        <Heading as="h1">Housepital 회원가입</Heading>
        <ChakraLink as={ReactRouterLink} to="/auth/log-in">
          이미 계정이 있으신가요? 로그인
        </ChakraLink>
      </HStack>

      <VStack
        as={'form'}
        height={{ sm: 'sm', lg: 'md', xl: 'full' }}
        mt={'8'}
        gap={'4'}
        overflowY={'scroll'}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.hideScrollBar}
      >
        <FormControl isRequired isInvalid={errors.hospital}>
          <FormLabel>소속 병원</FormLabel>
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            gap="4"
          >
            <Input
              placeholder="소속 병원을 검색하세요"
              {...register('hospital', {
                required: '소속 병원을 선택해주세요',
              })}
            />
            <Icon as={FaSearch} boxSize={6} onClick={onSearchFieldClick} />
          </HStack>
          {hospitals.length !== 0 && (
            <UnorderedList
              listStyleType={'none'}
              margin={0}
              mt={'4'}
              spacing={'4'}
              maxHeight={'64'}
              overflowY={'scroll'}
            >
              {hospitals.map(hospital => {
                return (
                  // TODO: key를 id에서 ykiho로 변경해야 함
                  <HStack
                    as={'li'}
                    key={hospital.id}
                    padding={'4'}
                    border={'1px'}
                    borderColor={'primary.200'}
                    borderRadius={'md'}
                    justifyContent={'space-between'}
                  >
                    <Box>
                      <Text fontSize={'xl'} fontWeight={'bold'}>
                        {hospital.name}
                      </Text>
                      <Text>{hospital.address}</Text>
                    </Box>
                    <Button
                      colorScheme="primary"
                      size={'lg'}
                      onClick={() => onHospitalClick(hospital)}
                    >
                      선택
                    </Button>
                  </HStack>
                );
              })}
            </UnorderedList>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={errors.email}>
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

        <FormControl isRequired isInvalid={errors.username}>
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

        <FormControl isRequired isInvalid={errors.password}>
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

        <FormControl isRequired isInvalid={errors.checkPassword}>
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

        <FormControl isRequired isInvalid={errors.specialty}>
          <FormLabel>specialty</FormLabel>
          {/* //TODO: 공공데이터포털에서 진료분야를 어떻게 알아올 수 있는 지 확인해야 함 */}
          <Select
            placeholder="전문 분야를 선택하세요"
            {...register('specialty')}
          >
            {fields.map(field => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.specialty?.message}</FormErrorMessage>
        </FormControl>

        <CheckboxGroup colorScheme="primary">
          {fields.map(field => (
            <CustomCheckbox
              {...checkboxGroup.getCheckboxProps({ value: field })}
              key={field}
            >
              {field}
            </CustomCheckbox>
          ))}
        </CheckboxGroup>

        <FormControl>
          <FormLabel>소개글</FormLabel>
          <Textarea
            required
            type="password"
            placeholder="소개글을 남겨주세요"
            {...register('description')}
          />
        </FormControl>

        <ButtonGroup>
          <Button type="submit" colorScheme="primary" size={'lg'}>
            가입하기
          </Button>
        </ButtonGroup>
      </VStack>
    </Container>
  );
};

export default SignUp;
