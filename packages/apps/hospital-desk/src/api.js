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
        date_time: '2023-10-03 09:00',
        is_NFTF: true,
        confirm: true,
        state_id: 'ac',
        doctor_id: 1,
        doctorName: '차은우',
      },
      {
        id: 2,
        uid: 2,
        name: '양지웅',
        phone_number: '010-1234-5678',
        date_time: '2023-10-03 09:30',
        is_NFTF: false,
        confirm: false,
        state_id: 'pc',
        doctor_id: 1,
        doctorName: '차은우',
      },
      {
        id: 3,
        uid: 3,
        name: '송보경',
        phone_number: '010-1234-5678',
        date_time: '2023-10-03 10:30',
        is_NFTF: true,
        confirm: true,
        state_id: 'aw',
        doctor_id: 3,
        doctorName: '차은후',
      },
      {
        id: 4,
        uid: 4,
        name: '서진형',
        phone_number: '010-1234-5678',
        date_time: '2023-10-04 10:00',
        is_NFTF: false,
        confirm: false,
        state_id: 'aw',
        doctor_id: 4,
        doctorName: '최은우',
      },
      {
        id: 5,
        uid: 5,
        name: '하철환',
        phone_number: '010-1234-5678',
        date_time: '2023-10-04 11:00',
        is_NFTF: false,
        confirm: true,
        state_id: 'pc',
        doctor_id: 3,
        doctorName: '차은후',
      },
      {
        id: 6,
        uid: 6,
        name: '오예스',
        phone_number: '010-1234-5678',
        date_time: '2023-10-04 13:00',
        is_NFTF: true,
        confirm: true,
        state_id: 'ac',
        doctor_id: 1,
        doctorName: '차은우',
      },
      {
        id: 7,
        uid: 7,
        name: '오잉스',
        phone_number: '010-1234-5678',
        date_time: '2023-10-05 15:30',
        is_NFTF: true,
        confirm: false,
        state_id: 'ar',
        doctor_id: 2,
        doctorName: '차은수',
      },
      {
        id: 8,
        uid: 8,
        name: '박아파',
        phone_number: '010-1234-5678',
        date_time: '2023-10-05 16:00',
        is_NFTF: true,
        state_id: 'dc',
        doctor_id: 2,
        doctorName: '차은수',
      },
      {
        id: 9,
        uid: 9,
        name: '나환자',
        phone_number: '010-1234-5678',
        date_time: '2023-10-05 16:30',
        is_NFTF: true,
        confirm: false,
        state_id: 'dc',
        doctor_id: 2,
        doctorName: '차은수',
      },
    ];
  }
};

export const updateAppointmentState = (id, newStateId, rejectionReason) =>
  instance.patch(`appointments/${id}`, {
    state_id: newStateId,
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
      is_NFTF: 1,
      is_first_visit: 0,
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    };
  }
};
