import { HStack, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const MyPage = function () {
  const me = useSelector(state => state.me);
  //TODO: 끝나면 인증페이지 접근 제한
  return (
    <VStack>
      {/* //TODO: 사진, 이름 전화번호 */}
      <HStack></HStack>
      {/* //TODO: 이메일, 생년월일, 주소, 전화번호1, 전화번호2 */}
      {/* //TODO: 혈액형, 키, 몸무게, 질환정보, 복약 정보 */}
      {/* //TODO: 성별 정보를 회원가입에서 받아야 함 */}
      {/* //TODO: 로그아웃, 회원전환 */}
    </VStack>
  );
};

export default MyPage;
