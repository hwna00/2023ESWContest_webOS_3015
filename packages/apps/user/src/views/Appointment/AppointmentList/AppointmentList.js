import { useState, useEffect, useCallback } from 'react';

import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  VStack,
  Radio,
  RadioGroup,
  useCheckboxGroup,
  Link as ChakraLink,
  Skeleton,
  Text,
  Grid,
} from '@chakra-ui/react';

import specialties from '../Specialties';
import BackButton from '../../../components/BackButton/BackButton';
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard';
import CustomCheckbox from '@housepital/common/CustomCheckox';
import { useQuery } from '@tanstack/react-query';
import { getAllByCategory } from '../../../utils/getByCategory';

function AppointmentList() {
  const [filteredList, setFilteredList] = useState([]);
  const [radioValue, setRadioValue] = useState('name');
  const [title, setTitle] = useState();

  const { category } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isLoading,
    data = [],
    isError,
  } = useQuery([category], () => getAllByCategory(category));

  useEffect(() => {
    if (category === 'doctors') {
      setTitle('의사별 보기');
    } else if (category === 'hospitals') {
      setTitle('병원별 보기');
    } else if (category === 'favorites') {
      setTitle('즐겨찾기 관리');
    }
  }, [category, title]);

  const onRadioGroupChange = useCallback(
    value => {
      const temp = [...filteredList];

      if (value === 'name') {
        temp.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (value === 'distance') {
        temp.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      } else if (value === 'rating') {
        temp.sort((a, b) => (a.rate < b.rate ? 1 : -1));
      }

      setRadioValue(value);
      setFilteredList(temp);
    },
    [filteredList],
  );

  const onCheckBoxGroupChange = useCallback(
    selects => {
      const temp = [...filteredList];
      if (selects.length > 0) {
        temp.filter(item =>
          item?.fields?.some(specialty => selects.includes(specialty)),
        );
      }
      setFilteredList(temp);
    },
    [filteredList],
  );

  const checkboxGroup = useCheckboxGroup({
    defaultValue: [],
    onChange: onCheckBoxGroupChange,
  });

  return (
    <VStack width="full" height="full" gap="4">
      <Box width="100%">
        <HStack width="100%" justifyContent="space-between">
          <BackButton title={title} />
          <Button
            onClick={onOpen}
            height="10"
            width="24"
            padding="4"
            border="solid 2px"
            borderColor="primary.500"
            colorScheme="primary.100"
            color="primary.500"
          >
            필터적용
          </Button>
        </HStack>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent padding="4" width="90%" height="70%">
            <ModalHeader>필터적용</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb="4">
                <Heading as="h3" fontSize="24" mb="2">
                  정렬 기준
                </Heading>
                <RadioGroup
                  display="flex"
                  gap="4"
                  colorScheme="primary"
                  onChange={onRadioGroupChange}
                  value={radioValue}
                >
                  <Radio borderColor="primary.500" value="name">
                    이름순
                  </Radio>
                  <Radio borderColor="primary.500" value="rating">
                    별점순
                  </Radio>
                  <Radio borderColor="primary.500" value="distance">
                    거리순
                  </Radio>
                </RadioGroup>
              </Box>
              <Box>
                <Heading as="h3" fontSize="24" mb="2">
                  진료 과목
                </Heading>
                <HStack gap="4" width="full" flexWrap="wrap">
                  {specialties.map(specialty => (
                    <CustomCheckbox
                      {...checkboxGroup.getCheckboxProps({ value: specialty })}
                      specialty={specialty}
                      key={specialty}
                    >
                      {specialty}
                    </CustomCheckbox>
                  ))}
                </HStack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

      <Box width="full" maxHeight="80vh" overflowY="scroll">
        <Grid templateColumns="1fr 1fr" gap="8" mt="4" width="full">
          {isLoading ? (
            <>
              <Skeleton height="40" borderRadius="lg" />
              <Skeleton height="40" borderRadius="lg" />
              <Skeleton height="40" borderRadius="lg" />
              <Skeleton height="40" borderRadius="lg" />
            </>
          ) : (
            <>
              {isError && (
                <Text textAlign="center">데이터를 불러올 수 없습니다.</Text>
              )}
              {data?.map(item => (
                <ChakraLink
                  as={ReactRouterLink}
                  to={`${item.id}`}
                  key={item.id}
                >
                  <AppointmentCard data={item} />
                </ChakraLink>
              ))}
            </>
          )}
        </Grid>
      </Box>
    </VStack>
  );
}

export default AppointmentList;
