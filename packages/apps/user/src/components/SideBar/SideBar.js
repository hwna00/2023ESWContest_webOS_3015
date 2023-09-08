import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Avatar,
  Text,
  VStack,
  Link as ChakraLink,
  Button,
  HStack,
  Flex,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';

const menuNames = [
  { name: '메인 화면', path: '' },
  { name: '진료 예약', path: 'appointment' },
  { name: '진료 내역', path: 'appointment-history' },
  { name: '건강 기록', path: 'health-history' },
  { name: '복약 관리', path: 'medicines' },
];

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
        {user ? (
          <ChakraLink
            as={ReactRouterLink}
            to={'/mypage'}
            textDecorationLine={'none'}
            _hover={{ textDecoration: 'none' }}
          >
            <Avatar src={user?.photoURL} size={'xl'} />
            <Text
              mt={2}
              fontSize={'xl'}
              fontWeight={'bold'}
              textAlign={'center'}
            >
              {user?.displayName}님
            </Text>
          </ChakraLink>
        ) : (
          <>
            <SkeletonCircle size={'24'} />
            <SkeletonText
              mt={2}
              skeletonHeight={'5'}
              width={'16'}
              noOfLines={1}
            />
          </>
        )}
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
