import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createHospital = hospital =>
  instance.post('hospitals', { data: hospital });

export const postPayment = (id, payment) =>
  instance.post(`/appointments/${id}/payment/`, { data: payment });

export const updatePayment = (id, payment) =>
  instance.patch(`/appointments/${id}/payment/`, { data: payment });
export const getAppointments = () => {
  // const { data: appointments } = instance.get('/appointments');
  if (false) {
    // TODO: 해당 리스트가 존재하지 않는 경우에 대한 처리
  } else {
    return [
      {
        id: 1,
        uid: 1,
        name: '김재인',
        phone_number: '010-1234-5678',
        date: '2023-10-03',
        time: '09:00',
        isNFTF: true,
        confirm: true,
        stateId: 'ac',
        doctorId: 1,
        doctorName: '차은우',
      },
      {
        id: 2,
        uid: 2,
        name: '양지웅',
        phone_number: '010-1234-5678',
        date: '2023-10-03',
        time: '09:30',
        isNFTF: false,
        confirm: false,
        stateId: 'pc',
        doctorId: 1,
        doctorName: '차은우',
      },
      {
        id: 3,
        uid: 3,
        name: '송보경',
        phone_number: '010-1234-5678',
        date: '2023-10-03',
        time: '10:30',
        isNFTF: true,
        confirm: true,
        stateId: 'aw',
        doctorId: 3,
        doctorName: '차은후',
      },
      {
        id: 4,
        uid: 4,
        name: '서진형',
        phone_number: '010-1234-5678',
        date: '2023-10-04',
        time: '10:00',
        isNFTF: false,
        confirm: false,
        stateId: 'aw',
        doctorId: 4,
        doctorName: '최은우',
      },
      {
        id: 5,
        uid: 5,
        name: '하철환',
        phone_number: '010-1234-5678',
        date: '2023-10-04',
        time: '11:00',
        isNFTF: false,
        confirm: true,
        stateId: 'pc',
        doctorId: 3,
        doctorName: '차은후',
      },
      {
        id: 6,
        uid: 6,
        name: '오예스',
        phone_number: '010-1234-5678',
        date: '2023-10-04',
        time: '13:00',
        isNFTF: true,
        confirm: true,
        stateId: 'ac',
        doctorId: 1,
        doctorName: '차은우',
      },
      {
        id: 7,
        uid: 7,
        name: '오잉스',
        phone_number: '010-1234-5678',
        date: '2023-10-05',
        time: '15:30',
        isNFTF: true,
        confirm: false,
        stateId: 'ar',
        doctorId: 2,
        doctorName: '차은수',
      },
      {
        id: 8,
        uid: 8,
        name: '박아파',
        phone_number: '010-1234-5678',
        date: '2023-10-05',
        time: '16:00',
        isNFTF: true,
        stateId: 'dc',
        doctorId: 2,
        doctorName: '차은수',
      },
      {
        id: 9,
        uid: 9,
        name: '나환자',
        phone_number: '010-1234-5678',
        date: '2023-10-05',
        time: '16:30',
        isNFTF: true,
        confirm: false,
        stateId: 'dc',
        doctorId: 2,
        doctorName: '차은수',
      },
    ];
  }
};

export const updateAppointmentState = (id, newStateId, rejectionReason) =>
  instance.patch(`appointments/${id}`, {
    stateId: newStateId,
    rejection_reason: rejectionReason,
  });

export const getPatientDetail = uid => {
  // const { data: patient } = instance.get(`/users?uid=${uid}`);
  console.log(uid);

  if (false) {
    // TODO: 해당 유저가 존재하지 않는 경우에 대한 처리
  } else {
    // return patient;
    return {
      name: 'test',
      phoneNumber: '01012341234',
      birthDate: '2000-10-10',
      uid: 'ghdtpdnjs123124215215',
      address: '서울 강남구 논현로123길 4-1', // 아직 입력되지 않았으면 ""
      bloodType: 'AB',
      chronicDisease: '123123',
      height: '123',
      regularMedicines: 'sfdsfsdf',
      secondPhoneNumber: '12121212',
      weight: '123',
      gender: 'M',
      datetime: '2023-09-30 09:10',
      message: '안녕하세요',
      isNFTF: 1,
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    };
  }
};

export const getHospital = hospital_id => {
  // const {
  //   data: { result },
  // } = instance.get(`/hospitals/${hospital_id}`);

  if (false) {
    // return result;
  } else
    return {
      hospital_id: 'zvvdsvsa',
      name: '블라병원',
      address: '서울시 성북구 정릉로 ',
      addressDetail: '321',
      profileImg: '',
    };
};
