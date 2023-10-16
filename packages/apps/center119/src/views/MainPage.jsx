import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import styles from '@housepital/common/css/HideScrollBar.module.css';
import {
  Box,
  HStack,
  Heading,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';

import TableHeader from '../components/TableSection/TableHeader';
import { useQuery } from '@tanstack/react-query';
import { getRequests } from '../api';
import TableRow from '../components/TableSection/TableRow';
import { useEffect } from 'react';

const MainPage = function () {
  const centerId = '일단임시';
  const { data, error } = useQuery([centerId], getRequests);

  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate('/error-page');
    }
  }, [data, error, navigate]);
  return (
    <>
      <VStack p="8" spacing="8" alignItems="initial">
        <Heading textAlign="left" p="4" fontSize="30px">
          이름
        </Heading>

        <Box>
          <HStack justifyContent="space-between">
            <Heading fontSize="25px">들어온 요청</Heading>
            <ChakraLink as={ReactRouterLink} to="/">
              + 전체보기
            </ChakraLink>
          </HStack>
          <TableHeader
            tableHeaders={['이름', '전화번호', '생년월일', '상세보기']}
          />

          <div className={styles.hideScrollBar}>
            <Box overflowY="scroll">
              {data &&
                data.map(reservation => (
                  <TableRow
                    key={reservation.id}
                    data={reservation}
                    buttonType="detail"
                  />
                ))}
            </Box>
          </div>
        </Box>
      </VStack>
    </>
  );
};

export default MainPage;
