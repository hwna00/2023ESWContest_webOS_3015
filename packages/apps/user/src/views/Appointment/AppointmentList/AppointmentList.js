import { useState, useEffect, useCallback } from 'react';

import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  HStack,
  VStack,
  SimpleGrid,
  Radio,
  RadioGroup,
  Link as ChakraLink,

} from '@chakra-ui/react';

import specialties from '../Specialties.js';
import { DoctorList, HospitalList, FavoriteList } from '../dataList';
import BackButton from '../../../components/BackButton/BackButton';
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard';

function AppointmentList() {
  const { category } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sortBy, setSortBy] = useState();
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [title, setTitle] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    if (category === 'doctors') {
      setList(DoctorList);
      setTitle('의사별 보기');
    } else if (category === 'hospitals') {
      setList(HospitalList);
      setTitle('병원별 보기');
    } else if (category === 'favorites') {
      setList(FavoriteList);
      setTitle('즐겨찾기 관리');
    }
  }, [category, list, title]);

  const handleSortByChange = useCallback(event => {
    setSortBy(event);
  }, []);
  const handleSortByName = useCallback(() => {
    handleSortByChange('name');
  }, [handleSortByChange]);

  const handleSortByRating = useCallback(() => {
    handleSortByChange('rating');
  }, [handleSortByChange]);

  const handleSortByDistance = useCallback(() => {
    handleSortByChange('distance');
  }, [handleSortByChange]);

  // useCallback 사용하면 진료 과목 필터링이 정상적으로 작동하지 않음
  const handleSpecialtyChange = selectedOptions => {
    setSelectedSpecialties(selectedOptions);
  };

  useEffect(() => {
    let itemsToFilter = [...list];

    if (selectedSpecialties.length > 0) {
      itemsToFilter = itemsToFilter.filter(item =>
        item.fields.some(specialty => selectedSpecialties.includes(specialty)),
      );
    }

    if (sortBy === 'name') {
      itemsToFilter.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortBy === 'distance') {
      itemsToFilter.sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
      );
    } else if (sortBy === 'rating') {
      itemsToFilter.sort((a, b) => (a.rate < b.rate ? 1 : -1));
    }

    setFilteredList(itemsToFilter);
  }, [sortBy, selectedSpecialties, list]);

  return (
    <VStack width="full" height="full" gap="4">
      <Box width="100%">
        <HStack width="100%" justifyContent="space-between">
          <BackButton title={title} />
          <Button
            onClick={onOpen}
            h="10"
            w="24"
            padding="4"
            border="solid 2px"
            borderColor="primary.500"
            colorScheme="primary.100"
            color="primary.500"
          >
            필터적용
          </Button>
        </HStack>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          width="70%"
          height="75%"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>필터적용</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb="4">
                <Heading as="h3" fontSize="24" mb="2">
                  정렬 기준
                </Heading>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row">
                    <Radio
                      value="name"
                      checked={sortBy === 'name'}
                      onChange={handleSortByName}
                      name="sort"
                    >
                      이름순
                    </Radio>

                    <Radio
                      value="rating"
                      checked={sortBy === 'rating'}
                      onChange={handleSortByRating}
                      name="sort"
                    >
                      별점순
                    </Radio>

                    <Radio
                      value="distance"
                      checked={sortBy === 'distance'}
                      onChange={handleSortByDistance}
                      name="sort"
                    >
                      거리순
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Box>
                <Heading as="h3" fontSize="24" mb="2">
                  진료 과목
                </Heading>
                <CheckboxGroup
                  defaultValue={selectedSpecialties}
                  onChange={handleSpecialtyChange}
                >
                  <Stack spacing={2} direction={['column', 'row']}>
                    {specialties.map((specialty, idx) => (
                      <Box
                        borderRadius="8"
                        border="solid 2px"
                        color="primary.500"
                        key={idx}
                        w="36"
                      >
                        <Checkbox
                          name={specialty}
                          value={specialty}
                          key={specialty}
                        >
                          {specialty}
                        </Checkbox>
                      </Box>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

      <Box width="full" maxHeight="80vh" overflowY="scroll">
        <SimpleGrid columns={2} gap="8" mt="4" width="full" padding="8">
          {filteredList.map(item => (
            <ChakraLink as={ReactRouterLink} to={`${item.id}`} key={item.name}>
              <AppointmentCard data={item} />
            </ChakraLink>
          ))}
        </SimpleGrid>
      </Box>

    </VStack>
  );
}

export default AppointmentList;
