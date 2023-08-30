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
} from '@chakra-ui/react';
import AppointmentCard from './AppointmentCard';
import BackButton from '../BackButton';
function Doctor() {
  const goPrev = useCallback(() => {
    window.history.back();
  }, []);
  const initialDoctorList = [
    {
      name: '이현철',
      specialty: '내과 전문의',
      field: ['내과', '가정의학과'],
      rate: '4.4',
      img: 'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    },
    {
      name: '양지웅',
      specialty: '안과 전문의',
      field: ['안과'],
      rate: '4.8',
      img: 'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    },
    {
      name: '김재인',
      specialty: '내과 전문의',
      field: ['내과'],
      rate: '5.0',
      img: 'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    },
    {
      name: '하철환',
      specialty: '소아과 전문의',
      field: ['소아과', '내과'],
      rate: '4.7',
      img: 'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    },

    {
      name: '서진형',
      specialty: '가정의학과 전문의',
      field: ['가정의학과'],
      rate: '4.9',
      img: 'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    },
    {
      name: '송보경',
      specialty: '이비인후과 전문의',
      field: ['이비인후과'],
      rate: '4.5',
      img: 'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    },
  ];

  const specialties = [
    '이비인후과',
    '안과',
    '내과',
    '피부과',
    '정형외과',
    '성형외과',
    '산부인과',
    '가정의학과',
    '정신과',
  ];

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
        <BackButton goPrev={goPrev} title={'의사별 보기'} />
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
        <AppointmentCard doctors={doctorsToDisplay} />
      </Box>
    </Flex>
  );
}

export default Doctor;
