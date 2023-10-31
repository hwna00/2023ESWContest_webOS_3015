import { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Heading,
  Highlight,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';
import useCreateToast from '@housepital/common/hooks/useCreateToast';

import { getIntent, getMedicines, getSideEffect } from '../../api';
import BackButton from '../../components/BackButton';

const CustomAccordionItem = function ({ medicine }) {
  const { data } = useQuery(
    [medicine.medecineName],
    () => getSideEffect(medicine.medecineName),
    {
      enabled: !!medicine,
    },
  );

  return (
    <AccordionItem mb="4">
      <h2>
        <AccordionButton
          borderRadius="md"
          padding="4"
          bgColor="primary.100"
          _expanded={{ bg: 'primary.400', color: 'white' }}
        >
          <Box
            as="span"
            fontSize="lg"
            fontWeight="bold"
            flex="1"
            textAlign="left"
          >
            {medicine?.medecineName}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bgColor="primary.100">
        {typeof data === 'string' ? (
          <Text>{data}</Text>
        ) : (
          <VStack py="4" alignItems="flex-start" gap="4">
            <Box width="full">
              <Image src={data?.itemImage} width="50%" mx="auto" />
            </Box>
            <Text>
              <Text as="b" fontSize="lg">
                효능:
              </Text>{' '}
              {data?.efcyQesitm}
            </Text>
            <Text>
              <Text as="b" fontSize="lg">
                사용법:
              </Text>{' '}
              {data?.useMethodQesitm}
            </Text>
            <Text>
              <Text as="b" fontSize="lg">
                주의사항경고:
              </Text>{' '}
              {data?.atpnWarnQesitm}
            </Text>
            <Text>
              <Text as="b" fontSize="lg">
                주의사항:
              </Text>{' '}
              {data?.atpnQesitm}
            </Text>
            <Text>
              <Text as="b" fontSize="lg">
                상호작용:
              </Text>{' '}
              {data?.intrcQesitm}
            </Text>
            <Text>
              <Text as="b" fontSize="lg">
                부작용:
              </Text>{' '}
              {data?.seQesitm}
            </Text>
            <Text>
              <Text as="b">보관법:</Text> {data?.depositMethodQesitm}
            </Text>
          </VStack>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

const SideEffet = function () {
  const [symptom, setSymptom] = useState(''); // 사용자가 말한 증상
  const [keyWord, setKeyWord] = useState(''); // 찾은 증상
  const [sideEffects, setSideEffects] = useState([]);

  const toast = useCreateToast();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const uid = useSelector(state => state.me.uid);
  const queryClient = useQueryClient();
  const { data: registeredMedicines } = useQuery(
    ['medicines'],
    () => getMedicines(uid),
    { enabled: !!uid },
  );

  const resetState = useCallback(() => {
    setSymptom('');
    setKeyWord('');
    setSideEffects([]);
  }, []);

  const onModalClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  const findSeQesitm = useCallback(
    async intent => {
      console.log(intent);
      const medicines = queryClient.getQueryData(['medicines']);
      await medicines.map(medicine => {
        try {
          const detail = queryClient.getQueryData([medicine.medecineName]);

          const relatedDetail = [];

          if (detail.seQesitm.includes(intent)) {
            relatedDetail.push(detail.seQesitm);
          }
          if (detail.atpnWarnQesitm.includes(intent)) {
            relatedDetail.push(detail.atpnWarnQesitm);
          }
          if (detail.atpnQesitm.includes(intent)) {
            relatedDetail.push(detail.atpnQesitm);
          }

          if (relatedDetail.length !== 0) {
            console.log(relatedDetail);
            setSideEffects(prev => [
              ...prev,
              {
                medicineName: medicine.medecineName,
                relatedDetail,
              },
            ]);
          }
        } catch {
          console.log(`${medicine.medecineName}에 대한 정보가 없습니다.`);
        }

        onOpen();
      });
    },
    [queryClient, onOpen],
  );

  const onSearchFieldChange = useCallback(event => {
    setSymptom(event.target.value);
  }, []);

  const onSearchClick = useCallback(async () => {
    if (symptom === '') {
      return toast('증상을 입력해주세요');
    }
    const intent = await getIntent(symptom);
    setKeyWord(intent);
    findSeQesitm(intent);
  }, [symptom, findSeQesitm, toast]);

  return (
    <VStack height="full" alignItems="flex-start" overflow="hidden" gap="8">
      <BackButton title="부작용 관리" />
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="center"
        gap="4"
      >
        <Input
          placeholder="부작용을 검색하세요"
          value={symptom}
          onChange={onSearchFieldChange}
        />
        <Icon as={FaSearch} boxSize={6} onClick={onSearchClick} />
      </HStack>
      <Accordion width="full" height="full" overflowY="scroll" allowMultiple>
        {registeredMedicines?.map(medicine => (
          <CustomAccordionItem key={medicine.id} medicine={medicine} />
        ))}
      </Accordion>
      <Modal size="2xl" isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent maxHeight="70%" overflowY="scroll">
          <ModalHeader>
            <Heading size="xl">{`'${symptom}'에 대한 결과입니다.`}</Heading>{' '}
          </ModalHeader>
          <ModalBody>
            <Text fontSize="2xl" fontWeight="bold">
              분석한 증상: {keyWord}
            </Text>
            <HStack justifyContent="flex-start" alignItems="center">
              <Text fontSize="2xl" fontWeight="bold">
                의심 약물:
              </Text>
              <HStack flexWrap="wrap" gap="4">
                {sideEffects.map(sideEffect => (
                  <Tag
                    key={sideEffect.medicineName}
                    colorScheme="gray"
                    variant="outline"
                  >
                    {sideEffect.medicineName}
                  </Tag>
                ))}
              </HStack>
            </HStack>

            <VStack gap="6" mt="4">
              {sideEffects.map(sideEffect => (
                <Box width="full" key={sideEffect}>
                  <Text fontSize="lg" fontWeight="bold">
                    {sideEffect.medicineName}
                  </Text>
                  {sideEffect.relatedDetail?.map(detail => (
                    <Text key={detail}>
                      <Highlight
                        query={keyWord}
                        styles={{ px: '1', py: '1', bg: 'orange.100' }}
                      >
                        {detail}
                      </Highlight>
                    </Text>
                  ))}
                </Box>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" onClick={onModalClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default SideEffet;
