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
export const updateEmergencyState = async (emergencyId, newStateId) => {
  return await instance.patch(`emergencies/${emergencyId}`, {
    data: {
      stateId: newStateId,
    },
  });
};

export const getEmergencies = async ({ queryKey }) => {
  const counselorId = queryKey[0];
  const response = await instance.get(`/counselors/${counselorId}/emergencies`);
  if (response.data) {
    return response.data.result;
  } else {
    return {};
  }
};

export const getEmergency = async emergencyId => {
  const response = await instance.get(`/emergencies/${emergencyId}`);
  if (response.data) {
    return response.data.result;
  }
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
