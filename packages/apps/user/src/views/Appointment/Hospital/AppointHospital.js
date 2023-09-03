import { useState, useCallback } from 'react';
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

import AppointmentCard from '../../../../theme/components/AppointmentCard';
import BackButton from '../../../../theme/components/BackButton';
import HospitalList from './HospitalList';
import specialties from '/home/user/projects/housepital/packages/apps/user/src/views/Appointment/Specialties.js';

function AppointHospital() {
  const goPrev = useCallback(() => {
    window.history.back();
  }, []);

  const [sortBy, setSortBy] = useState();
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [hospitalList, setHospitalList] = useState(HospitalList);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSortByChange = event => {
    const newSortBy = event;
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    } else {
      setHospitalList([...hospitalList]);
    }
  };

  const handleSpecialtyChange = selectedOptions => {
    setSelectedSpecialties(selectedOptions);
  };

  const hospitalToDisplay = hospitalList.filter(hospital => {
    const isSelectedSpecialty =
      hospital.specialty && // 추가: hospital.specialty가 존재하는지 확인
      hospital.specialty.some(specialty =>
        selectedSpecialties.includes(specialty),
      );
    return selectedSpecialties.length === 0 || isSelectedSpecialty;
  });

  if (sortBy === 'name') {
    hospitalToDisplay.sort((a, b) => (a.hospital > b.hospital ? 1 : -1));
  } else if (sortBy === 'distance') {
    hospitalToDisplay.sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
    );
  } else {
    hospitalToDisplay.sort((a, b) => (a.rate < b.rate ? 1 : -1));
  }

  return (
    <Flex direction="column" alignItems="flex-start">
      <Box>
        <BackButton goPrev={goPrev} title={'병원별 보기'} />
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
          {hospitalToDisplay.map(info => (
            <AppointmentCard info={info} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default AppointHospital;
