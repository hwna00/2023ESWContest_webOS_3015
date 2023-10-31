import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API}/api`,
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

export const updateEmergencyState = async (emergencyId, isCompleted) => {
  return await instance.patch(`emergencies/${emergencyId}`, {
    data: {
      isCompleted: isCompleted,
    },
  });
};

export const getEmergencies = async counselorId => {
  console.log('counselorId', counselorId);
  const response = await instance.get(`/counselors/${counselorId}/emergencies`);
  if (response.data) {
    return response.data.result;
  } else {
    return {};
  }
};

export const getEmergency = async emergencyId => {
  const { data } = await instance.get(`/emergencies/${emergencyId}`);
  if (!data.isSuccess) {
    throw new Error();
  }
  return data.result;
};

export const getCompletedEmergency = async ({ queryKey }) => {
  const counselorId = queryKey[0];
  const response = await instance.get(
    `/counselors/${counselorId}/emergencies?isCompleted=1`,
  );
  if (response) {
    return response.data.result;
  }
};

export const createEmergencyRequest = async (counselorId, uid) => {
  const { data } = await instance.post('/emergencies', {
    data: { counselorId, uid },
  });
  console.log(data);
  if (!data.isSuccess) {
    return new Error();
  }
  return data.result;
};
