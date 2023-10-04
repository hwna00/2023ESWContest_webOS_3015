import { useCallback } from 'react';

import { Button, Heading, ListItem, UnorderedList } from '@chakra-ui/react';

import { fbLogOut } from '../../../firebase';

const SettingPage = function () {
  //TODO: webOS API 사용해서 앱 종료 기능 추가하기
  //TODO: 계정 전환 기능 추가하기

  const onLogoutClick = useCallback(() => {
    fbLogOut();
  }, []);

  return (
    <>
      <Heading>설정</Heading>
      <UnorderedList listStyleType="none" spacing="4" mt="8">
        <ListItem>
          <Button
            variant="outline"
            colorScheme="red"
            size="lg"
            onClick={onLogoutClick}
          >
            로그아웃
          </Button>
        </ListItem>
        <ListItem>
          <Button colorScheme="red" size="lg">
            앱 종료
          </Button>
        </ListItem>
      </UnorderedList>
    </>
  );
};

export default SettingPage;
