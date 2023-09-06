import { useState } from 'react';
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
} from '@chakra-ui/react';

import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard';
import BackButton from '../../../components/BackButton/BackButton';
import initialDoctorList from './DoctorList';
import specialties from '../Specialties';

function AppointDoctor() {
  const [sortBy, setSortBy] = useState();
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [doctorList, setDoctorList] = useState(initialDoctorList);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSortByChange = event => {
    const newSortBy = event;
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    } else {
      setDoctorList([...doctorList]);
    }
  };

  const handleSpecialtyChange = selectedOptions => {
    setSelectedSpecialties(selectedOptions);
  };

  const doctorsToDisplay = doctorList.filter(doctor => {
    const isSelectedSpecialty = doctor.field.some(specialty =>
      selectedSpecialties.includes(specialty),
    );
    return selectedSpecialties.length === 0 || isSelectedSpecialty;
  });

  if (sortBy === 'name') {
    doctorsToDisplay.sort((a, b) => (a.name > b.name ? 1 : -1));
  } else {
    doctorsToDisplay.sort((a, b) => (a.rate < b.rate ? 1 : -1));
  }

  return (
    <Flex direction="column" alignItems="flex-start">
      <Box>
        <BackButton title={'의사별 보기'} />
        <Button onClick={onOpen} position="fixed" right="8" top="4">
          필터적용
        </Button>

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
          {doctorsToDisplay.map(info => (
            <AppointmentCard info={info} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default AppointDoctor;
