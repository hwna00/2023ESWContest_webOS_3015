import { useState, useEffect, useCallback } from 'react';

import { useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
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
} from '@chakra-ui/react';

import specialties from '../Specialties.js';
import { DoctorList, HospitalList, FavoriteList } from '../dataList';
import BackButton from '../../../components/BackButton/BackButton';
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard';

function AppointmentList() {
  const { pathname } = useLocation();
  const path = pathname.split('/')[2];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sortBy, setSortBy] = useState();
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [title, setTitle] = useState();

  useEffect(() => {
    if (path === 'doctors') {
      setList(DoctorList);
      setTitle('의사별 보기');
    } else if (path === 'hospitals') {
      setList(HospitalList);
      setTitle('병원별 보기');
    } else if (path === 'favorites') {
      setList(FavoriteList);
      setTitle('즐겨찾기 관리');
    }
  }, [path, list, title]);

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
    <VStack width={'full'} height={'full'} gap="4">
      <Box width="100%">
        <HStack width="100%" justifyContent="space-between">
          <BackButton title={title} />
          <Button onClick={onOpen} padding="4">
            필터적용
          </Button>
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>필터적용</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Heading as="h3">정렬 기준</Heading>
                <Checkbox
                  id="name"
                  checked={sortBy === 'name'}
                  onChange={handleSortByName}
                >
                  이름순
                </Checkbox>
                <Checkbox
                  id="rating"
                  checked={sortBy === 'rating'}
                  onChange={handleSortByRating}
                >
                  별점순
                </Checkbox>
                <Checkbox
                  id="distance"
                  checked={sortBy === 'distance'}
                  onChange={handleSortByDistance}
                >
                  거리순
                </Checkbox>
              </Box>
              <Box>
                <Heading as="h3">진료 과목</Heading>
                <CheckboxGroup
                  defaultValue={selectedSpecialties}
                  onChange={handleSpecialtyChange}
                >
                  <Stack spacing={2} direction={['column', 'row']}>
                    {specialties.map(specialty => (
                      <Checkbox
                        name={specialty}
                        value={specialty}
                        key={specialty}
                      >
                        {specialty}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

      <SimpleGrid
        columns={2}
        gap="5"
        width="full"
        pr="4"
        pl="4"
        maxHeight="80vh"
        overflowY="scroll"
      >
        {filteredList.map(item => (
          <AppointmentCard data={item} key={item.name} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default AppointmentList;
