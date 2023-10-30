import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { fbLogOut } from '../firebase';

function Setting() {
  const onLogoutClick = useCallback(() => fbLogOut(), []);

  return (
    <Button onClick={onLogoutClick} colorScheme="red">
      로그아웃
    </Button>
  );
}
export default Setting;
