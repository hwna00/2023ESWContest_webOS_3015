import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Image,
  Link as ChakraLink,
} from '@chakra-ui/react';

import AppointmentViewList from '../../components/AppointmentViewList/AppointmentViewList';
import { FavoriteList } from './dataList';
import { useCallback, useEffect, useState } from 'react';
import { getAppointments } from '../../api';
import { useSelector } from 'react-redux';

const Appointment = function () {
  const uid = useSelector(state => state.me.uid);
  const [appointments, setAppointments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAppointments = useCallback(async () => {
    if (!uid) {
      setAppointments();
      setIsLoading(true);
      return;
    }
    try {
      const response = await getAppointments(uid);
      setAppointments(response.length);
      setIsError(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

const Appointment = function () {
  return (
    <VStack w="full" h="full" justifyContent={'space-between'} gap={'6'}>
      <HStack w="full" gap="6" px="2">
        <Box bg="primary.200" w="full" h="40" borderRadius="10" p="4">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" h="25%">
              진행 현황
            </Text>
          </Box>
          <Flex h="75%" alignItems="center" justifyContent="center">
            {isLoading ? (
              '예약을 불러오는 중입니다.'
            ) : (
              <>
                {isError && <Text opacity="0.5">예약 내역이 없습니다.</Text>}
                {
                  <ChakraLink
                    as={ReactRouterLink}
                    to="waiting-room"
                    textDecoration="none !important"
                  >
                    <Text
                      textAlign="center"
                      textDecoration="underline"
                      fontSize="lg"
                    >
                      {appointments}건의 예약이 있습니다.
                    </Text>
                  </ChakraLink>
                }
              </>
            )}
          </Flex>
        </Box>

        <VStack bg="primary.200" w="full" h="40" borderRadius="10" p="4">
          <HStack w="full" justifyContent="space-between" alignItems="flex-end">
            <Text fontSize="2xl" fontWeight="bold">
              즐겨찾기
            </Text>
            <ChakraLink as={ReactRouterLink} to="/appointment">
              + 더보기
            </ChakraLink>
          </HStack>

          <HStack justifyContent="flex-start" overflowX="scroll" gap={'4'}>
            {FavoriteList.map(favorite => (
              <Image
                key={favorite.id}
                src={favorite.profileImg}
                h="full"
                borderRadius={'sm'}
              />
            ))}
          </HStack>
        </VStack>
      </HStack>

      <HStack w="full">
        <AppointmentViewList type="hospitals" />
        <AppointmentViewList type="doctors" />
      </HStack>
    </VStack>
  );
};

export default Appointment;
