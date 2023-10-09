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
import { useCallback, useEffect, useState } from 'react';

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
  const [tabIdex, setTabIdx] = useState();
  const hospital = useSelector(state => state.hospital);

  const onTabIdxChange = useCallback(index => {
    setTabIdx(index);
    window.localStorage.setItem('currentTab', index);
  }, []);

  useEffect(() => {
    const currentTabIdx = window.localStorage.getItem('currentTab');
    if (currentTabIdx) {
      setTabIdx(Number(currentTabIdx));
    }
  }, []);

  return (
    <Tabs
      height="100vh"
      width="60"
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
      defaultIndex={tabIdex}
      index={tabIdex}
      onChange={onTabIdxChange}
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
          {hospital ? (
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
              <Avatar src={hospital.profileImg} size="xl" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                {hospital.name} 님
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
              to="auth/log-in"
            >
              <SkeletonCircle size="24" />
              <SkeletonText skeletonHeight="6" width="16" noOfLines={1} />
            </ChakraLink>
          )}
        </Tab>
        <VStack width="full" justifyContent="center" gap="0">
          <CustomTab to="">메인화면</CustomTab>
          <CustomTab to="manage-appointment">예약관리</CustomTab>
          <CustomTab to="view-appointment">완료된 진료</CustomTab>
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
