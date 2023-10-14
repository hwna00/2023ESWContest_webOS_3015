import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import LoadingPage from '@housepital/common/LoadingPage';
import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import CancelModal from '../component/CancelModal';
import { getPatientDetail, updateAppointmentState } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

function AppointmentDetail() {
  const { id } = useParams();
  const AppointmentId = id;

  const {
    isOpen: isCancelOpen,
    onOpen: openCancelModal,
    onClose: closeCancelModal,
  } = useDisclosure();
  const [firstNFTF, setFirstNFTF] = useState([]);
  const [notFirstNFTF, setNotFirstNFTF] = useState([]);
  const { data, isLoading, isError } = useQuery(
    [AppointmentId],
    getPatientDetail,
  );

  const navigate = useNavigate();
  const handleConfirm = useCallback(() => {
    updateAppointmentState(AppointmentId, 'ac', '')
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        navigate('/error-page');
      });
  }, [AppointmentId, navigate]);

  useEffect(() => {
    if (isError) navigate('/error-page');
  }, [isError, navigate]);

  const handleFirstCheck = event => {
    if (event.target.checked) {
      setFirstNFTF([...firstNFTF, event.target.value]);
    } else {
      setFirstNFTF(firstNFTF.filter(item => item !== event.target.value));
    }
  };
  const handleNotFirstCheck = event => {
    if (event.target.checked) {
      setNotFirstNFTF([...notFirstNFTF, event.target.value]);
    } else {
      setNotFirstNFTF(notFirstNFTF.filter(item => item !== event.target.value));
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : isError ? (
        <div>Error occurred</div>
      ) : (
        <VStack p="8" alignItems="initial" w="100%">
          <Heading textAlign="left" p="4" fontSize="30px">
            예약 상세 보기
          </Heading>
          <HStack
            p="4"
            spacing="6"
            justifyContent="space-between"
            alignItems="start"
          >
            <HStack spacing="6" alignItems="start" w="-webkit-fill-available">
              <AspectRatio ratio={1} width="100%" maxW="60">
                <Image alt={data.name} objectFit="cover" />
              </AspectRatio>
              <VStack alignItems="left">
                <Text fontSize="28px" fontWeight="bold">
                  환자 이름 : {data?.result?.name}
                </Text>
                <Text fontSize="28px" fontWeight="bold">
                  전화 번호 : {data?.result?.phoneNumber}
                </Text>
                <Text fontSize="28px" fontWeight="bold">
                  생년월일 :{data?.result?.birthDate}
                </Text>
                <Text fontSize="28px" fontWeight="bold">
                  주소 : {data?.result?.address}
                </Text>
              </VStack>
            </HStack>
            {data.result.stateId === 'aw' ? (
              <Button colorScheme="primary" onClick={handleConfirm}>
                예약수락
              </Button>
            ) : (
              <></>
            )}
            <Button colorScheme="red" onClick={openCancelModal}>
              취소하기
            </Button>
            <CancelModal isOpen={isCancelOpen} onClose={closeCancelModal} />
          </HStack>

          {data.isNFTF === 1 ? (
            <Grid
              h="200px"
              templateAreas={`
                  "nav main"
                  "nav footer"`}
              gap={4}
              p="4"
            >
              <GridItem
                area="nav"
                w="400px"
                h="440px"
                bgColor="primary.200"
                borderRadius="8"
              >
                <Text>진료 심사 관련 서류</Text>
                <Image src={data.document} alt="관련서류가 없습니다." />
              </GridItem>
              <GridItem area="main">
                <HStack alignItems="start">
                  <VStack alignItems="start">
                    <Text fontSize="20px" fontWeight="bold">
                      초진대상
                    </Text>
                    <Checkbox value="섬벽지 거주자" onChange={handleFirstCheck}>
                      섬벽지 거주자
                    </Checkbox>

                    <Checkbox
                      value="만 65세 이상 이용자"
                      onChange={handleFirstCheck}
                    >
                      만 65세 이상 이용자
                    </Checkbox>

                    <Checkbox value="장애인 이용자" onChange={handleFirstCheck}>
                      장애인 이용자
                    </Checkbox>

                    <Checkbox
                      value="만 18세 미만의 소아 환자"
                      onChange={handleFirstCheck}
                    >
                      만 18세 미만의 소아 환자
                    </Checkbox>
                  </VStack>
                  <VStack alignItems="start">
                    <Text fontSize="20px" fontWeight="bold">
                      재진대상
                    </Text>
                    <Checkbox
                      value="30일 이내 대면 진료 이력"
                      onChange={handleNotFirstCheck}
                    >
                      30일 이내 대면 진료 이력
                    </Checkbox>
                    <Checkbox
                      value="1년 이내 대면 진료 이력"
                      onChange={handleNotFirstCheck}
                    >
                      1년 이내 대면 진료 이력
                    </Checkbox>
                  </VStack>
                </HStack>
              </GridItem>
              <GridItem area="footer">
                <FormControl>
                  <FormLabel fontSize="28px" fontWeight="bold">
                    환자 전달 사항
                  </FormLabel>
                  <Textarea
                    defaultValue={data?.result?.message}
                    borderRadius="8"
                    bgColor="primary.200"
                  />
                </FormControl>
              </GridItem>
            </Grid>
          ) : (
            <Box as="form" margin="0" h="400px" w="full" p="4">
              <FormControl area="footer">
                <FormLabel fontSize="28px" fontWeight="bold">
                  환자 전달 사항
                </FormLabel>
                <Textarea
                  defaultValue={data?.result?.message}
                  borderRadius="8"
                  bgColor="primary.200"
                  w="full"
                  h="full"
                  p="4"
                  fontSize="18px"
                />
              </FormControl>
            </Box>
          )}
        </VStack>
      )}
    </>
  );
}

export default AppointmentDetail;
