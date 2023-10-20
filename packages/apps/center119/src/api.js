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
export const updateEmergencyState = async (
  emergencyId,
  newStateId,
  rejectionReason,
) => {
  return await instance.patch(`emergencies/${emergencyId}`, {
    data: {
      stateId: newStateId,
      rejectionReason: rejectionReason,
    },
  });
};

export const getEmergencies = async counselorId => {
  const response = await instance.get(`/counselors/${counselorId}/emergencies`);
  if (response.data) {
    return response.data;
  } else {
    return {};
  }
};

export const getEmergency = async emergencyId => {
  const response = await instance.get(`/emergencies/${emergencyId}`);
  if (response.data) {
    return response.data;
  }
};
