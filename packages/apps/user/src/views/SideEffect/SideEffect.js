import { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';

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
  const [symptom, setSymptom] = useState('');

  const uid = useSelector(state => state.me.uid);
  const queryClient = useQueryClient();
  const { data: registeredMedicines } = useQuery(
    ['medicines'],
    () => getMedicines(uid),
    { enabled: !!uid },
  );

  const findSeQesitm = useCallback(
    intent => {
      console.log(intent);
      const medicines = queryClient.getQueryData(['medicines']);
      medicines.map(medicine => {
        try {
          const { seQesitm, atpnWarnQesitm, atpnQesitm } =
            queryClient.getQueryData([medicine.medecineName]);

          if (
            seQesitm.includes(intent) ||
            atpnWarnQesitm.includes(intent) ||
            atpnQesitm.includes(intent)
          ) {
            console.log(`${medicine.medecineName} 때문입니다.`);
          } else {
            console.log(
              `${medicine.medecineName}와/과 관련된 증상이 없습니다.`,
            );
          }
        } catch {
          console.log(`${medicine.medecineName}에 대한 정보가 없습니다.`);
        }
      });
    },
    [queryClient],
  );

  const onSearchFieldChange = useCallback(event => {
    setSymptom(event.target.value);
  }, []);

  const onSearchClick = useCallback(async () => {
    const intent = await getIntent(symptom);
    findSeQesitm(intent);
  }, [symptom, findSeQesitm]);

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
    </VStack>
  );
};

export default SideEffet;
