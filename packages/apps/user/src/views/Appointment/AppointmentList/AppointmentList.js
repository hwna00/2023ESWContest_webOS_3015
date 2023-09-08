import { useState, useEffect } from 'react';
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
  SimpleGrid,
} from '@chakra-ui/react';
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard';
import BackButton from '../../../components/BackButton/BackButton';
import HospitalList from './HospitalList';
import specialties from '../Specialties.js';

import { DoctorList, HospitalList } from '../dataList';
import { useLocation } from 'react-router-dom';

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
      console.log(list, title);
    } else if (path === 'hospitals') {
      setList(HospitalList);
      setTitle('병원별 보기');
    }
  }, [path, list, title]);

  const handleSortByChange = event => {
    setSortBy(event);
  };

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
    <Flex direction="column" alignItems="flex-start">
      <Box>
        <HStack gap="31.5rem">
          <BackButton title={title} />
          <Button onClick={onOpen}>필터적용</Button>
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
                  onChange={() => handleSortByChange('name')}
                >
                  이름순
                </Checkbox>
                <Checkbox
                  id="rating"
                  checked={sortBy === 'rating'}
                  onChange={() => handleSortByChange('rating')}
                >
                  별점순
                </Checkbox>
                <Checkbox
                  id="distance"
                  checked={sortBy === 'distance'}
                  onChange={() => handleSortByChange('distance')}
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

      <Box width={'full'} maxHeight="80vh" overflowY="scroll">
        <SimpleGrid columns={2} gap="8" mt="4" width={'full'} padding="8">
          {filteredList.map(item => (
            <AppointmentCard data={item} key={item.name} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default AppointmentList;
