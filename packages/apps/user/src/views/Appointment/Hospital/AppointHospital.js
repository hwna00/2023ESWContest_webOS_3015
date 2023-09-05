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
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react';

import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard';
import BackButton from '../../../components/BackButton/BackButton';
import HospitalList from './HospitalList';
import specialties from '/home/user/projects/housepital/packages/apps/user/src/views/Appointment/Specialties.js';

function AppointHospital() {
  const [sortBy, setSortBy] = useState();
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [hospitalList, setHospitalList] = useState(HospitalList);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSortByChange = event => {
    const newSortBy = event;
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  };

  const handleSpecialtyChange = selectedOptions => {
    setSelectedSpecialties(selectedOptions);
  };

  const [filteredHospitals, setFilteredHospitals] = useState([]);
  useEffect(() => {
    let hospitalToFilter = [...hospitalList];

    if (selectedSpecialties.length > 0) {
      hospitalToFilter = hospitalToFilter.filter(hospital =>
        hospital.fields.some(specialty =>
          selectedSpecialties.includes(specialty),
        ),
      );
    }
    if (sortBy === 'name') {
      hospitalToFilter.sort((a, b) => (a.hospital > b.hospital ? 1 : -1));
    } else if (sortBy === 'distance') {
      hospitalToFilter.sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
      );
    } else if (sortBy === 'rating') {
      hospitalToFilter.sort((a, b) => (a.rate < b.rate ? 1 : -1));
    }

    setFilteredHospitals(hospitalToFilter);
  }, [sortBy, selectedSpecialties, hospitalList]);
  return (
    <Flex direction="column" alignItems="flex-start">
      <Box>
        <HStack gap="31.5rem">
          <BackButton title={'병원별 보기'} />
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
          {filteredHospitals.map(hospital => (
            <AppointmentCard data={hospital} key={hospital.name} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default AppointHospital;
