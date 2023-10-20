import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import {
  Box,
  HStack,
  Heading,
  VStack,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';

import TableHeader from '../components/TableSection/TableHeader';
import { useQuery } from '@tanstack/react-query';
import { getEmergencies } from '../api';
import TableRow from '../components/TableSection/TableRow';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ManageEmergencies = function () {
  const counselor = useSelector(state => state.counselor);
  const { data, isLoading, error } = useQuery(
    [counselor.counselorId],
    getEmergencies,
  );
  console.log(data);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate('/error-page');
    }
  }, [data, error, navigate]);
  return (
    <>
      {isLoading ? (
        <Text>로딩중</Text>
      ) : (
        <VStack spacing="8" p="8" alignItems="initial">
          <Heading textAlign="left" fontSize="30px">
            {counselor.centerName}
          </Heading>

          <Box>
            <HStack justifyContent="space-between">
              <Heading fontSize="25px">들어온 요청</Heading>
              <ChakraLink as={ReactRouterLink} to="/manage-requests">
                + 전체보기
              </ChakraLink>
            </HStack>
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
};

export default ManageEmergencies;
