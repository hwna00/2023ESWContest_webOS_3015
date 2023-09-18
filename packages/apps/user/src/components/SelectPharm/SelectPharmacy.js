import { useCallback, useState } from 'react';

import {
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  SimpleGrid,
  Select,
} from '@chakra-ui/react';

import AppointmentCard from '../AppointmentCard/AppointmentCard.js';

import { PharmList } from './PharmList.js';

function SelectPharm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const filteredList = PharmList.filter(item => item.distance <= '2km');
  const handlePharmacy = useCallback(
    item => {
      setSelectedPharmacy(item);
      onOpen();
    },
    [onOpen],
  );

  return (
    <VStack width="full" height="full" gap="4">
      <Box width="100%">
        <VStack width="100%" justifyContent="space-between">
          <Heading as="h2" fontSize="24">
            진료가 완료되었습니다
          </Heading>
          <Heading as="h3" fontSize="24">
            처방전을 전송할 약국을 선택해주세요
          </Heading>
        </VStack>
      </Box>
      <SimpleGrid columns={2} gap="5" width="full" px="4" overflowY="scroll">
        {filteredList.map((item, idx) => (
          <Box onClick={() => handlePharmacy(item)} key={idx}>
            <AppointmentCard data={item} key={idx} />
          </Box>
        ))}
      </SimpleGrid>

      {selectedPharmacy && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedPharmacy && selectedPharmacy.name}
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              <Box display="flex" alignItems="center" whiteSpace="nowrap">
                약을
                <Select width="32" ml={2} mr={2}>
                  <option value="배달수령">배달수령</option>
                  <option value="직접수령">직접수령</option>
                </Select>
                하겠습니다.
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
}

export default SelectPharm;
