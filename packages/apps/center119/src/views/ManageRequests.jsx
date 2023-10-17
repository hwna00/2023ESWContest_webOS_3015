import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getRequests } from '../api';
import {
  Box,
  HStack,
  Heading,
  VStack,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

import TableHeader from '../components/TableSection/TableHeader';
import TableRow from '../components/TableSection/TableRow';
import { useEffect } from 'react';

function ManageRequests() {
  const counselor = useSelector(state => state.counselor);
  const { data, isLoading, error } = useQuery([counselor.id], getRequests);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/error-page');
    }
  }, [error, navigate]);

  return (
    <>
      {isLoading ? (
        <Text>로딩중</Text>
      ) : (
        <VStack p="8" spacing="8" alignItems="initial">
          <Heading textAlign="left" p="4" fontSize="30px">
            신고관리
          </Heading>

          <Box>
            <HStack justifyContent="space-between">
              <Heading fontSize="25px">모든 신고</Heading>
              <ChakraLink as={ReactRouterLink} to="/view-appointment">
                + 전체보기
              </ChakraLink>
            </HStack>
            <TableHeader
              tableHeaders={['이름', '전화번호', '생년월일', '상세보기']}
            />

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
          </Box>
        </VStack>
      )}
    </>
  );
}
export default ManageRequests;
