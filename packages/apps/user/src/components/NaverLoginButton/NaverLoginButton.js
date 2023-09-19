import { Image } from '@chakra-ui/react';
import logo from '../../images/btnG_icon_circle.png';
import { useCallback } from 'react';

const NaverForm = function () {
  const base_url = 'https://nid.naver.com/oauth2.0/authorize';
  const REDIRECT_URI = `http://localhost:8080/auth/login/naver-callback`;
  const STATE = 'slfjsdf';
  const NAVER_AUTH_URL = `${base_url}?response_type=code&client_id=${
    process.env.REACT_APP_NAVER_CLIENT_ID
  }&redirect_uri=${encodeURI(REDIRECT_URI)}&state=${STATE}`;

  const onLoginClick = useCallback(() => {
    window.location.href = NAVER_AUTH_URL;
  }, [NAVER_AUTH_URL]);

  return <Image onClick={onLoginClick} height={'14'} src={logo} />;
};

export default NaverForm;
