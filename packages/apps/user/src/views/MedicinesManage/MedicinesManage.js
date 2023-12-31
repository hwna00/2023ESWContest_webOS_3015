import { useCallback, useEffect, useState } from 'react';

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
  Text,
  Tag,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useCheckboxGroup,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { addMedicine, getMedicines } from '../../api';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dateToday } from '../../utils/getDayofWeek';
import { useForm } from 'react-hook-form';
import useCreateToast from '@housepital/common/hooks/useCreateToast';
import CustomCheckbox from '@housepital/common/CustomCheckox/CustomCheckox';

const MedicinesManage = function () {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format('YYYY-MM-DD'),
  );
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const [medicinesOfDay, setMedicinesOfDay] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  const toast = useCreateToast();
  const uid = useSelector(state => state.me.uid);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMedicineOpen,
    onOpen: onMedicineOpne,
    onClose: onMedicineClose,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });
  const queryClient = useQueryClient();
  const { data: registeredMedicines } = useQuery(
    ['medicines'],
    () => getMedicines(uid),
    { enabled: !!uid },
  );
  const { mutate } = useMutation(intake => addMedicine(uid, intake), {
    onSuccess: () => {
      toast('약 등록에 성공했습니다.');
      onClose();
      queryClient.invalidateQueries('medicines');
    },
    onError: () => {
      toast('약 등록에 실패했습니다.');
      onClose();
    },
  });

  const onDateChange = useCallback(
    async event => {
      setSelectedDate(event.target.value);
      const response = await getMedicines(uid, dateToday(event.target.value));
      setMedicinesOfDay(response);
    },
    [uid],
  );

  const onMedicineClick = async id => {
    setSelectedMedicine(id);
    onMedicineOpne();
  };

  const onMedicineSubmit = useCallback(
    async data => {
      mutate({
        intakeDays: selectedDays,
        ...data,
      });
    },
    [selectedDays, mutate],
  );

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await getMedicines(uid, dateToday(selectedDate));
      setMedicinesOfDay(response);
    };
    if (uid) {
      fetchMedicines();
    }
  }, [uid, selectedDate]);

  const checkboxGroup = useCheckboxGroup({
    defaultValue: [],
    onChange: selects => setSelectedDays(selects),
  });

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
            <ModalContent as="form" onSubmit={handleSubmit(onMedicineSubmit)}>
              <ModalHeader>복용 약 추가하기</ModalHeader>
              <ModalCloseButton />
              <ModalBody as={VStack} gap="4">
                <FormControl isRequired isInvalid={errors?.medicineName}>
                  <FormLabel>복용하시는 약을 입력해주세요</FormLabel>
                  <Input
                    {...register('medicineName', {
                      required: '필수 값입니다.',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.medicineName?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>복용하시는 요일을 선택해주세요</FormLabel>
                  <HStack gap="4" width="full" flexWrap="wrap">
                    {[
                      ['mon', '월'],
                      ['tue', '화'],
                      ['wed', '수'],
                      ['thu', '목'],
                      ['fri', '금'],
                      ['sat', '토'],
                      ['sun', '일'],
                    ].map(day => (
                      <CustomCheckbox
                        {...checkboxGroup.getCheckboxProps({
                          value: day[0],
                        })}
                        day={day[0]}
                        key={day}
                      >
                        {day[1]}
                      </CustomCheckbox>
                    ))}
                  </HStack>
                </FormControl>

                <FormControl isInvalid={errors?.intakeTimes}>
                  <FormLabel>약을 드시는 시간을 입력해주세요</FormLabel>
                  <Input
                    type="time"
                    {...register(`intakeTimes.0`, { required: true })}
                    mb="4"
                  />
                  <Input type="time" {...register(`intakeTimes.1`)} mb="4" />
                  <Input type="time" {...register(`intakeTimes.2`)} />
                </FormControl>
              </ModalBody>

              <ModalFooter gap="4">
                <Button type="submit" colorScheme="primary">
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

        <ChakraLink as={ReactRouterLink} to="side-effects" width="full">
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
          {medicinesOfDay?.map(medicine => (
            <ListItem
              key={medicine.id}
              padding="4"
              bgColor="primary.100"
              borderRadius="md"
            >
              <Text fontSize="lg" fontWeight="bold" mb="2">
                {medicine.medecineName}
              </Text>
              <HStack width="full" flexWrap="wrap" gap="2">
                {medicine.intakeTimes
                  .filter(time => time !== '')
                  .map(time => (
                    // TODO: 약을 먹었다면 solid로 변경
                    <Tag key={time} variant="outline">
                      {time}
                    </Tag>
                  ))}
              </HStack>
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
