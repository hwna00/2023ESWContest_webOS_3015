import { Box, HStack, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments } from '../api';
import TableHeader from '../component/TableSection/TableHeader';
import TableRow from '../component/TableSection/TableRow';
import LoadingPage from '@housepital/common/LoadingPage';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

function CompletedDiagnosis() {
  const [CompletedDiagnosis, setCompletedDiagnosis] = useState([]);
  const hospital = useSelector(state => state.hospital);
  const { data, isLoading, error } = useQuery([hospital.id], getAppointments);
  const navigate = useNavigate();

  useEffect(() => {
    if (!error && data) {
      setCompletedDiagnosis(
        data?.dc?.filter(reservation => reservation.stateId === 'dc') || [],
      );
    }

    if (error) {
      navigate('/error-page');
    }
  }, [data, navigate, isLoading, error]);

  return (
    <>
      {!isLoading ? (
        <VStack p="8" spacing="8" alignItems="initial">
          <HStack justifyContent="space-between">
            <Heading textAlign="left" p="4" fontSize="30px">
              완료된 진료
            </Heading>
          </HStack>
          <Box>
            <TableHeader
              tableHeaders={['이름', '진료시간', '타입', '담당의사', '액션']}
            />

            <div className={styles.hideScrollBar}>
              <Box maxH="250px" overflowY="scroll">
                {CompletedDiagnosis.map(diagnosis => (
                  <TableRow
                    key={diagnosis.id}
                    data={diagnosis}
                    buttonType="detail"
                  />
                ))}
              </Box>
            </div>
          </Box>
        </VStack>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default CompletedDiagnosis;
