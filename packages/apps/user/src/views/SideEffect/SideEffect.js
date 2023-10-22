import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';

import BackButton from '../../components/BackButton';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMedicines, getSideEffect } from '../../api';
import { useQuery } from '@tanstack/react-query';

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
            <Text>효능: {data?.efcyQesitm}</Text>
            <Text>사용법: {data?.useMethodQesitm}</Text>
            <Text>주의사항경고: {data?.atpnWarnQesitm}</Text>
            <Text>주의사항: {data?.atpnQesitm}</Text>
            <Text>상호작용: {data?.intrcQesitm}</Text>
            <Text>부작용: {data?.seQesitm}</Text>
            <Text>보관법: {data?.depositMethodQesitm}</Text>
          </VStack>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

const SideEffet = function () {
  const [sideEffect, setSideEffect] = useState('');
  const onSearchFieldClick = useCallback(async () => {}, []);
  const uid = useSelector(state => state.me.uid);

  const { data: registeredMedicines } = useQuery(
    ['medicines'],
    () => getMedicines(uid),
    { enabled: !!uid },
  );

  return (
    <Box>
      <BackButton title="부작용 관리" />
      <HStack justifyContent="space-between" alignItems="center" gap="4" mt="8">
        <Input
          placeholder="부작용을 검색하세요"
          value={sideEffect}
          onChange={event => setSideEffect(event.target.value)}
        />
        <Icon as={FaSearch} boxSize={6} onClick={onSearchFieldClick} />
      </HStack>
      <Accordion mt="8" allowMultiple>
        {registeredMedicines?.map(medicine => (
          <CustomAccordionItem key={medicine.id} medicine={medicine} />
        ))}
      </Accordion>
    </Box>
  );
};

export default SideEffet;
