import { Image } from '@chakra-ui/react';
import logo from '../../images/kakao_icon_circle.png';
import { useCallback } from 'react';

const KakaoLoginButton = function () {
  const redirect_uri = 'http://localhost:3000/api/auth/login/kakao-callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code`;

  const onLoginClick = useCallback(() => {
    window.location.href = KAKAO_AUTH_URL;
  }, [KAKAO_AUTH_URL]);

  return <Image onClick={onLoginClick} height={'14'} src={logo} />;
};

export default KakaoLoginButton;
