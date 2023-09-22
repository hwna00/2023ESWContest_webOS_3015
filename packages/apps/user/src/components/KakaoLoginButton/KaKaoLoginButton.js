import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';

const KakaoForm = function(){
  const redirect_uri = 'http://localhost:3000/auth/login/kakao-callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code`;

  const onLoginClick = useCallback(() => {
    window.location.href = KAKAO_AUTH_URL;
  }, [KAKAO_AUTH_URL]);

  return (
    <Button onClick={onLoginClick}>카카오 로그인</Button>
  )

};

export default KakaoForm;