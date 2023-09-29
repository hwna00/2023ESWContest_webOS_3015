import { Link as ReactRouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCog } from 'react-icons/fa';
import {
  Avatar,
  Text,
  VStack,
  Link as ChakraLink,
  SkeletonCircle,
  SkeletonText,
  Tabs,
  TabList,
  Tab,
  Flex,
  Icon,
} from '@chakra-ui/react';

const CustomTab = function ({ children, to }) {
  return (
    <ChakraLink as={ReactRouterLink} to={to} width="full">
      <Tab
        width="full"
        py="4"
        bgColor="primary.500"
        color="white"
        border="none"
        _selected={{
          bgColor: 'white',
          color: 'primary.500',
          fontWeight: 'bold',
        }}
      >
        {children}
      </Tab>
    </ChakraLink>
  );
};

const SideBar = function () {
  const me = useSelector(state => state.me);

  return (
    <Tabs
      height="100vh"
      width="40"
      color="white"
      bgColor="primary.500"
      py="8"
      direction="column"
      borderRightRadius="md"
      position="absolute"
      top="0"
      left="0"
      zIndex={2}
      variant="enclosed-colored"
      size="lg"
      orientation="vertical"
      defaultIndex={1}
    >
      <TabList
        width="full"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        margin={0}
      >
        <Tab
          width="full"
          bgColor="primary.500"
          color="white"
          border="none"
          _selected={{
            bgColor: 'white',
            color: 'primary.500',
            fontWeight: 'bold',
          }}
        >
          {me ? (
            <ChakraLink
              width="full"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="4"
              as={ReactRouterLink}
              to="mypage"
            >
              <Avatar src={me.profileImg} size="xl" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                {me.name}
              </Text>
            </ChakraLink>
          ) : (
            <ChakraLink
              width="full"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="4"
              as={ReactRouterLink}
              to="login"
            >
              <SkeletonCircle size="24" />
              <SkeletonText skeletonHeight="6" width="16" noOfLines={1} />
            </ChakraLink>
          )}
        </Tab>
        <VStack width="full" justifyContent="center" gap="0">
          <CustomTab to="">메인화면</CustomTab>
          <CustomTab to="appointment">진료예약</CustomTab>
          <CustomTab to="appointment-history">진료내역</CustomTab>
          <CustomTab to="health-history">건강기록</CustomTab>
          <CustomTab to="medicines">복약관리</CustomTab>
        </VStack>
        <CustomTab to="settings">
          <Flex
            width="full"
            justifyContent="center"
            alignItems="center"
            gap="2"
          >
            <Icon as={FaCog} />
            설정
          </Flex>
        </CustomTab>
      </TabList>
    </Tabs>
  );
};

export default SideBar;
