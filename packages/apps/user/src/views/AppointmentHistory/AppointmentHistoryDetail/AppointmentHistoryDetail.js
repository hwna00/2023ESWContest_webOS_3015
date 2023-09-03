import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  VStack,
} from '@chakra-ui/react';

const AppointmentHistory = function () {
  return (
    <>
      <Heading as={'h3'} size={'lg'} pl={'4'} mb={'5'}>
        상세 진료 기록
      </Heading>
      <VStack h={'450'} mx={'5'} align={'stretch'} gap={'4'} overflowY={'auto'}>
        <Box pl={'4'} bg={'primary.100'} py={'3'} borderRadius={'10'}>
          처방 일시:
        </Box>
        <Box pl={'4'} bg={'primary.100'} py={'3'} borderRadius={'10'}>
          진료 병원:
        </Box>
        <Box pl={'4'} bg={'primary.100'} py={'3'} borderRadius={'10'}>
          담당 의사:
        </Box>
        <Box pl={'4'} bg={'primary.100'} py={'3'} borderRadius={'10'}>
          제조 약국:
        </Box>
        <Accordion
          allowToggle
          display={'flex'}
          flexDirection={'column'}
          gap={'4'}
        >
          <AccordionItem bg={'primary.100'} borderRadius={'10'}>
            <h2>
              <AccordionButton py={'3'} _expanded={{ bg: 'primary.200' }}>
                <Box as="span" flex="1" textAlign="left">
                  결제 금액:
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem bg={'primary.100'} borderRadius={'10'}>
            <h2>
              <AccordionButton py={'3'} _expanded={{ bg: 'primary.200' }}>
                <Box as="span" flex="1" textAlign="left">
                  처방전
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem bg={'primary.100'} borderRadius={'10'}>
            <h2>
              <AccordionButton py={'3'} _expanded={{ bg: 'primary.200' }}>
                <Box as="span" flex="1" textAlign="left">
                  나의 리뷰
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <br />
              &nbsp; &nbsp; 담당의사:
              <br />
              &nbsp; &nbsp; 별점:
              <br />
              &nbsp; &nbsp; 내용:
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </>
  );
};

export default AppointmentHistory;
