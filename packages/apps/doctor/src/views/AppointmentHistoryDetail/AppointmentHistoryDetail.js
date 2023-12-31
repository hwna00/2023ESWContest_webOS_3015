import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  VStack,
} from '@chakra-ui/react';

import { getDiagnosis } from '../../api';

const AppointmentHistoryDetail = function () {
  const { id } = useParams();
  const { data: diagnosis } = useQuery(
    ['diagnosis', id],
    () => getDiagnosis(id),
    {
      enabled: !!id,
    },
  );

  return (
    <Box height="full" overflowY="hidden">
      <Heading>상세 기록</Heading>

      <VStack width="full" height="full" mt="4" gap="4" overflowY="scroll">
        <Box width="full" bg="primary.100" padding="4" borderRadius="md">
          진료 일시: {diagnosis?.date}
        </Box>
        <Box width="full" bg="primary.100" padding="4" borderRadius="md">
          진료 병원: {diagnosis?.hospitalName}
        </Box>
        <Box width="full" bg="primary.100" padding="4" borderRadius="md">
          담당 의사: {diagnosis?.doctorName}
        </Box>
        <Box width="full" bg="primary.100" padding="4" borderRadius="md">
          제조 약국: {diagnosis?.pharmacyName}
        </Box>
        <Box width="full" bg="primary.100" padding="4" borderRadius="md">
          결제 금액: {diagnosis?.payment}
        </Box>
        <Accordion
          allowToggle
          display="flex"
          flexDirection="column"
          gap="4"
          width="full"
        >
          <AccordionItem bg="primary.100" borderRadius="md">
            <h2>
              <AccordionButton py="3" _expanded={{ bg: 'primary.200' }}>
                <Box as="span" flex="1" textAlign="left">
                  처방전
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {/* // TODO: 처방전 사진 추가하기 */}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default AppointmentHistoryDetail;
