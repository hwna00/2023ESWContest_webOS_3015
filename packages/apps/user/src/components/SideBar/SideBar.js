import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Avatar,
  Text,
  VStack,
  Link as ChakraLink,
  Button,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { FaUser, FaCog } from 'react-icons/fa';

const menuNames = [
  { name: '메인 화면', path: '' },
  { name: '진료 예약', path: 'doctor-appointment' },
  { name: '진료 내역', path: 'appointment-history' },
  { name: '건강 기록', path: 'health' },
  { name: '복약 관리', path: 'medicines' },
];

//TODO: 로그인 기능 구현 후 실제 user를 props 로 받아와야 한다.
//TODO: 버튼 클릭 시, 배경 색상이 유지되는 기능을 추가해야 한다.
const SideBar = function ({ user }) {
  return (
    <Flex
      height="100vh"
      width="40"
      color={'white'}
      bgColor={'primary.500'}
      py={'4'}
      direction={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderRightRadius={'md'}
      position="absolute"
      top="0"
      left="0"
      zIndex={2}
    >
      <VStack width={'full'} py={'2'}>
        <ChakraLink as={ReactRouterLink} to={'/mypage'}>
          {user ? (
            <Avatar src={user?.img} size={'xl'} />
          ) : (
            <Avatar icon={<FaUser />} size={'xl'} />
          )}
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to={'/auth/log-in'}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            {user ? `${user?.name}님` : '로그인하기'}
          </Text>
        </ChakraLink>
      </VStack>

      <VStack width={'full'} gap={0}>
        {menuNames.map(menu => {
          return (
            <ChakraLink
              as={ReactRouterLink}
              to={menu.path}
              width={'full'}
              key={menu.name}
            >
              <Button
                width={'full'}
                size={'lg'}
                borderRadius={'none'}
                color={'white'}
                bgColor={'primary.500'}
                fontSize={'xl'}
                _hover={{
                  bgColor: 'primary.700',
                }}
                _focus={{
                  bgColor: 'white',
                  color: 'primary.500',
                  fontWeight: 'bold',
                }}
              >
                {menu.name}
              </Button>
            </ChakraLink>
          );
        })}
      </VStack>
      <HStack width={'full'}>
        <ChakraLink as={ReactRouterLink} to={'/'} width={'full'}>
          <Button
            leftIcon={<FaCog />}
            variant={'ghost'}
            width={'full'}
            size={'lg'}
            borderRadius={'none'}
            color={'white'}
            bgColor={'primary.500'}
            _hover={{
              bgColor: 'primary.700',
            }}
            _focus={{
              bgColor: 'white',
              color: 'primary.500',
              fontWeight: 'bold',
            }}
          >
            환경 설정
          </Button>
        </ChakraLink>
      </HStack>
    </Flex>
  );
};

export default SideBar;
