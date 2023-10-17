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
import { getRequests } from '../api';
import TableRow from '../components/TableSection/TableRow';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const MainPage = function () {
  const counselor = useSelector(state => state.counselor);
  const { data, isLoading, error } = useQuery([counselor.id], getRequests);
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
          <Heading textAlign="left" p="4" fontSize="30px">
            이름
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

            <div className={styles.hideScrollBar}>
              <Box maxH="250px" overflowY="scroll">
                {data
                  .filter(request => request.stateId === 'rw')
                  .map(request => (
                    <TableRow
                      key={request.id}
                      data={request}
                      buttonType="detail"
                    />
                  ))}
              </Box>
            </div>
          </Box>
        </VStack>
      )}
    </>
  );
};

export default MainPage;
