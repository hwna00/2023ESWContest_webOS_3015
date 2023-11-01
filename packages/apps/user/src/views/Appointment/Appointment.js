import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Link as ChakraLink,
  Avatar,
} from '@chakra-ui/react';

import AppointmentViewList from '../../components/AppointmentViewList/AppointmentViewList';
import { getAppointments, getFavorite } from '../../api';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { getBlob } from '../../../firebase';

const FavoriteItem = function ({ data }) {
  const [favoriteImg, setFavoriteImg] = useState('');
  const navigate = useNavigate();

  const handleMove = useCallback(() => {
    navigate(`/appointment/${data.type}s/${data.id}`);
  }, [navigate, data]);

  const getFavoriteImg = useCallback(async () => {
    const url = await getBlob(`${data.id}/profileImg.png`);
    setFavoriteImg(url);
  }, [data]);

  useEffect(() => {
    getFavoriteImg();
  }, [getFavoriteImg]);

  return (
    <Avatar
      src={favoriteImg}
      size="xl"
      key={data.id}
      h="full"
      borderRadius={'sm'}
      onClick={handleMove}
    />
  );
};

const Appointment = function () {
  const uid = useSelector(state => state.me.uid);

  const { data: favorites } = useQuery(['favorites'], () => getFavorite(uid), {
    enabled: !!uid,
  });
  console.log('d', favorites);
  const {
    isLoading,
    data: appointments,
    isError,
  } = useQuery({
    queryKey: ['appointments', uid],
    queryFn: () => getAppointments(uid),
    enabled: !!uid,
  });

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
                      {appointments?.length}건의 예약이 있습니다.
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
          </HStack>

          <HStack justifyContent="flex-start" overflowX="scroll" gap={'4'}>
            {favorites &&
              favorites.map(favorite => (
                <FavoriteItem key={favorite.id} data={favorite} />
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
