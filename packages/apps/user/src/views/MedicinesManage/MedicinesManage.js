import { useState } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  UnorderedList,
  VStack,
  useDisclosure,
  Link as ChakraLink,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { getMedicines } from '../../api';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const MedicinesManage = function () {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedMedicine, setSelectedMedicine] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMedicineOpen,
    onOpen: onMedicineOpne,
    onClose: onMedicineClose,
  } = useDisclosure();
  const uid = useSelector(state => state.me.uid);

  const { data: registeredMedicines } = useQuery(
    ['medicines'],
    () => getMedicines(uid),
    { enabled: !!uid },
  );

  const onDateChange = async event => {
    setSelectedDate(event.target.value);
    await getMedicines(uid, event.tartget.value);
  };

  const onMedicineClick = async id => {
    setSelectedMedicine(id);
    onMedicineOpne();
  };

  return (
    <HStack
      height="full"
      justifyContent="center"
      alignItems="flex-start"
      gap="4"
    >
      <VStack
        width="full"
        height="full"
        flex={1}
        justifyContent="space-between"
      >
        <HStack width="full" justifyContent="space-between">
          <Heading fontSize="3xl">복용 약</Heading>
          <Button colorScheme="primary" variant="outline" onClick={onOpen}>
            약 추가
          </Button>
          <Modal size="xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>복용 약 추가하기</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{/* // TODO: 약 추가하는 form 제작하기 */}</ModalBody>

              <ModalFooter>
                <Button colorScheme="primary" onClick={onClose}>
                  저장하기
                </Button>
                <Button variant="ghost">닫기</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
        <UnorderedList
          listStyleType="none"
          width="full"
          height="96"
          overflowY="scroll"
          mx={0}
          my="4"
          spacing="4"
        >
          {registeredMedicines?.map(medicine => (
            <ListItem
              key={medicine.id}
              padding="4"
              bgColor="primary.100"
              borderRadius="md"
              textAlign="center"
              onClick={() => onMedicineClick(medicine)}
            >
              {medicine.medecineName}
            </ListItem>
          ))}
          <Modal size="xl" isOpen={isMedicineOpen} onClose={onMedicineClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedMedicine?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* // TODO: 등록된 약의 상세 정보 보여주기 */}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="primary" onClick={onClose}>
                  저장하기
                </Button>
                <Button variant="ghost">닫기</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </UnorderedList>
        <ChakraLink as={ReactRouterLink} to="side-effets" width="full">
          <Button
            width="full"
            size="lg"
            colorScheme="primary"
            variant="outline"
          >
            부작용 관리
          </Button>
        </ChakraLink>
      </VStack>

      <VStack
        width="full"
        height="full"
        flex={1}
        justifyContent="space-between"
      >
        <Input
          type="date"
          size="lg"
          value={selectedDate}
          onChange={onDateChange}
        />
        <UnorderedList
          listStyleType="none"
          width="full"
          height="80"
          overflowY="scroll"
          mx={0}
          my="4"
          spacing="4"
        >
          {[1, 2, 3, 4, 5].map(item => (
            <ListItem
              key={item}
              padding="4"
              bgColor="primary.100"
              borderRadius="md"
            >
              hi
            </ListItem>
          ))}
        </UnorderedList>
        <Box width="full">
          <HStack justifyContent="space-between" alignItems="center" mb="2">
            <Heading as="h3" fontSize="2xl">
              메모
            </Heading>
            <Button colorScheme="primary">저장하기</Button>
          </HStack>
          <Textarea width="full" />
        </Box>
      </VStack>
    </HStack>
  );
};

export default MedicinesManage;
