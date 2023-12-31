import { useCallback } from 'react';

import closeApp from '@housepital/common/utils/closeApp';
import { Button, Heading, ListItem, UnorderedList } from '@chakra-ui/react';

import appinfo from '../../../webos-meta/appinfo.json';
import { fbLogOut } from '../../../firebase';

const SettingPage = function () {
  // TODO: 계정 전환 기능 추가하기

  const onLogoutClick = useCallback(() => {
    fbLogOut();
  }, []);
  const onClickCloseApp = useCallback(() => {
    const appId = appinfo.id;
    closeApp(appId);
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
          <Button colorScheme="red" size="lg" onClick={onClickCloseApp}>
            앱 종료
          </Button>
        </ListItem>
      </UnorderedList>
    </>
  );
};

export default SettingPage;
