import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createCounselor = async counselor => {
  const data = await instance.post('counselors', { data: counselor });
  return data;
};

export const getCounselor = async counselorId => {
  try {
    const { data } = await instance.get(`/counselors/${counselorId}`);
    return data.result;
  } catch (error) {
    throw new Error(error);
  }
};
export const updateRequestState = async (
  requestId,
  newStateId,
  rejectionReason,
) => {
  return await instance.patch(`requests/${requestId}`, {
    data: {
      stateId: newStateId,
      rejectionReason: rejectionReason,
    },
  });
};

export const getRequests = async counselorId => {
  // const response = await instance.get(`/counselors/${counselorId}/requests`);
  if (false) {
  } else {
    return [
      {
        name: '김재인',
        id: '1',
        phoneNumber: '010-1234-1234',
        birthDate: '2003-03-07',
        address: '서울 강남구 논현로123길 4-2',
        secondPhoneNumber: '010-9911-0928',
        bloodType: 'AB',
        height: '184',
        weight: '80',
        gender: 'M',
        regularMedicines: '타이레놀, 고혈압약',
        chronicDisease: null,
        message: '안녕',

        stateId: '완료',

      },
      {
        name: '양지웅',
        id: '2',
        phoneNumber: '010-1235-1234',
        birthDate: '2000-06-07',
        address: '서울 강남구 논현로123길 4-2',
        secondPhoneNumber: '010-9911-0928',
        bloodType: 'AB',
        height: '184',
        weight: '80',
        gender: 'M',
        regularMedicines: '타이레놀, 고혈압약',
        chronicDisease: '어찌고 저찌고',

        message: '안녕',

        stateId: '미완료',

      },
      {
        name: '하철환',
        id: '3',
        phoneNumber: '010-1221-1234',
        birthDate: '2000-03-07',
        address: '서울 강남구 논현로123길 4-2',
        secondPhoneNumber: '010-9911-0928',
        bloodType: 'AB',
        height: '184',
        weight: '80',
        gender: 'M',
        regularMedicines: '타이레놀, 고혈압약',
        chronicDisease: '아파요',

        message: '안녕',

        stateId: '완료',

      },
    ];
  }
};

export const getRequest = async requestId => {

  // const response = await instance.get(`/requests/${requestId}`);
  if (false) {
    // return response.data;

  } else {
    return {
      name: '김재인',
      id: '1',
      phoneNumber: '010-1234-1234',
      birthDate: '2003-03-07',
      address: '서울 강남구 논현로123길 4-2',
      secondPhoneNumber: '010-9911-0928',
      bloodType: 'AB',
      height: '184',
      weight: '80',
      gender: 'M',
      regularMedicines: '타이레놀, 고혈압약',
      chronicDisease: null,

      message: '안녕',

      stateId: '완료',

    };
  }
};
