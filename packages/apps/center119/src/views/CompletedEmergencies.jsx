import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getCompletedEmergency } from '../api';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import { useNavigate } from 'react-router-dom';

import TableHeader from '../components/TableSection/TableHeader';
import TableRow from '../components/TableSection/TableRow';
import { useEffect } from 'react';
import LoadingPage from '@housepital/common/LoadingPage/LoadingPage';

function CompletedEmergencies() {
  const counselor = useSelector(state => state.counselor);
  const { data, isLoading, error } = useQuery(
    [counselor.counselorId],
    getCompletedEmergency,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/error-page');
    }
  }, [error, navigate]);
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <VStack p="8" spacing="8" alignItems="initial">
          <Heading textAlign="left" fontSize="30px">
            {counselor.centerName}
          </Heading>

          <Box>
            <Heading fontSize="25px">완료된 신고</Heading>
            <TableHeader
              tableHeaders={['이름', '전화번호', '생년월일', '상세보기']}
            />

            {data && data.length > 0 ? (
              <div className={styles.hideScrollBar}>
                <Box maxH="250px" overflowY="scroll">
                  {data.map(request => (
                    <TableRow
                      key={request.id}
                      data={request}
                      buttonType="detail"
                    />
                  ))}
                </Box>
              </div>
            ) : (
              <Text>정보가 없습니다.</Text>
            )}
          </Box>
        </VStack>
      )}
    </>
  );
}

export default CompletedEmergencies;
