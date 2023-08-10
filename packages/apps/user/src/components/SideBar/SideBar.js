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
  '메인 화면',
  '진료 예약',
  '진료 내역',
  '건강 기록',
  '복약 관리',
];

const SideBar = function () {
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
    >
      <VStack width={'full'} py={'2'}>
        <Avatar icon={<FaUser />} size={'xl'} />
        <Text fontSize={'xl'} fontWeight={'bold'}>
          하철환님
        </Text>
      </VStack>
      <VStack width={'full'} gap={0}>
        {menuNames.map(menuName => {
          return (
            <ChakraLink
              as={ReactRouterLink}
              to={'/'}
              width={'full'}
              key={menuName}
              onClick={e => console.log(e.target)}
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
                {menuName}
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
