import { useCallback } from 'react';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import logo from '../../images/kakao_payment_icon_yellow_medium.png';

const KakaoPayment = function () {
  const BASE_URL = 'https://kapi.kakao.com/v1/payment/ready';
  // TODO : 아래 있는 값 실시간으로 받아오게 만들기
  const PARTNER_ORDER_ID = '12345678'; // TODO : unique한 값 생성하도록 변경하기
  const PARTNER_USER_ID = 'slfjsdf';
  const ITEM_NAME = '진료비';
  const QUANTITY = 1;
  const TOTAL_AMOUNT = 15000;
  const TAX_FREE_AMOUNT = 0;
  const APPROVAL_URL = 'http://localhost:8080'; // TODO : 성공 url 변경하기
  const CANCEL_URL = 'http://localhost:8080'; // TODO : 취소 url 변경하기
  const FAIL_URL = 'http://localhost:8080'; // TODO : 실패(시간 초과) url 변경하기

  const KAKAO_PAYMENT_READY_URL =
    `${BASE_URL}?cid=` +
    process.env.REACT_APP_KAKAO_PAYMENT_CID +
    '&partner_order_id=' +
    PARTNER_ORDER_ID +
    '&partner_user_id=' +
    PARTNER_USER_ID +
    '&item_name=' +
    ITEM_NAME +
    '&quantity=' +
    QUANTITY +
    '&total_amount=' +
    TOTAL_AMOUNT +
    '&tax_free_amount=' +
    TAX_FREE_AMOUNT +
    '&approval_url=' +
    APPROVAL_URL +
    '&cancel_url=' +
    CANCEL_URL +
    '&fail_url=' +
    FAIL_URL;

  const onPaymentClick = useCallback(() => {
    axios.post(
      KAKAO_PAYMENT_READY_URL,
      null, // You can pass request data here if needed
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    )
      .then((response) => {
        // Handle the response here
        console.log(response.data); // Log the response or update the state, etc.
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, [KAKAO_PAYMENT_READY_URL]);

  return <Image onClick={onPaymentClick} height="14" src={logo} />;
};

export default KakaoPayment;
