import { Link as ReactRouterLink } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from '@chakra-ui/react';

const menuNames = [
  { name: '메인 화면', path: '' },
  { name: '진료 예약', path: 'appointment' },
  { name: '진료 내역', path: 'appointment-history' },
  { name: '건강 기록', path: 'health-history' },
  { name: '복약 관리', path: 'medicines' },
];

// TODO: 버튼 클릭 시, 배경 색상이 유지되는 기능을 추가해야 한다.
// const SideBar = function ({ user }) {
//   return (
//     <Flex
//       height="100vh"
//       width="40"
//       color="white"
//       bgColor="primary.500"
//       py="4"
//       direction="column"
//       justifyContent="space-between"
//       alignItems="center"
//       borderRightRadius="md"
//       position="absolute"
//       top="0"
//       left="0"
//       zIndex={2}
//     >
//       <VStack width="full" py="2">
//         {user ? (
//           <ChakraLink
//             as={ReactRouterLink}
//             to="/mypage"
//             textDecorationLine="none"
//             _hover={{ textDecoration: 'none' }}
//           >
//             <Avatar src={user?.photoURL} size="xl" />
//             <Text
//               mt={2}
//               fontSize="xl"
//               fontWeight="bold"
//               textAlign="center"
//             >
//               {user?.displayName}님
//             </Text>
//           </ChakraLink>
//         ) : (
//           <>
//             <SkeletonCircle size="24" />
//             <SkeletonText
//               mt={2}
//               skeletonHeight="5"
//               width="16"
//               noOfLines={1}
//             />
//           </>
//         )}
//       </VStack>

//       <VStack width="full" gap={0}>
//         {menuNames.map(menu => (
//             <ChakraLink
//               as={ReactRouterLink}
//               to={menu.path}
//               width="full"
//               key={menu.name}
//             >
//               <Button
//                 width="full"
//                 size="lg"
//                 borderRadius="none"
//                 color="white"
//                 bgColor="primary.500"
//                 fontSize="xl"
//                 _hover={{
//                   bgColor: 'primary.700',
//                 }}
//                 _focus={{
//                   bgColor: 'white',
//                   color: 'primary.500',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {menu.name}
//               </Button>
//             </ChakraLink>
//           ))}
//       </VStack>
//       <HStack width="full">
//         <ChakraLink as={ReactRouterLink} to="/" width="full">
//           <Button
//             leftIcon={<FaCog />}
//             variant="ghost"
//             width="full"
//             size="lg"
//             borderRadius="none"
//             color="white"
//             bgColor="primary.500"
//             _hover={{
//               bgColor: 'primary.700',
//             }}
//             _focus={{
//               bgColor: 'white',
//               color: 'primary.500',
//               fontWeight: 'bold',
//             }}
//           >
//             환경 설정
//           </Button>
//         </ChakraLink>
//       </HStack>
//     </Flex>
//   );
// };

const CustomTab = function ({ children, to }) {
  return (
    <ChakraLink as={ReactRouterLink} to={to} width={'full'}>
      <Tab
        width={'full'}
        py={'4'}
        bgColor={'primary.500'}
        color={'white'}
        border={'none'}
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
  return (
    <Tabs
      height="100vh"
      width="40"
      color="white"
      bgColor="primary.500"
      py="4"
      direction="column"
      borderRightRadius="md"
      position="absolute"
      top="0"
      left="0"
      zIndex={2}
      variant="enclosed-colored"
      size={'lg'}
      orientation="vertical"
      defaultIndex={1}
    >
      <TabList
        width={'full'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
        margin={0}
      >
        <CustomTab to={'my-page'}>프로필</CustomTab>
        <VStack width={'full'} justifyContent={'center'} gap={'0'}>
          <CustomTab to={''}>메인화면</CustomTab>
          <CustomTab to={'appointment'}>진료예약</CustomTab>
          <CustomTab to={'appointment-history'}>진료내역</CustomTab>
          <CustomTab to={'health-history'}>건강기록</CustomTab>
          <CustomTab to={'medicines'}>복약관리</CustomTab>
        </VStack>
        <CustomTab to={'settings'}>설정</CustomTab>
      </TabList>
    </Tabs>
  );
};

export default SideBar;
