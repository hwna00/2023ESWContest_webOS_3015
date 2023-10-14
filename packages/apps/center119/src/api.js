import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createCenter = async center => {
  const data = await instance.post('centers', { data: center });
  return data;
};

export const getRequests = async centerId => {
  // const response = await instance.get(`/centers/${centerId}/requests`);
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
      },
    ];
  }
};
