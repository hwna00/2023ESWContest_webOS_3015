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
  const response = await instance.get(`/counselors/${counselorId}/requests`);
  if (response.data) {
    return response.data;
  } else {
    return {};
  }
};

export const getRequest = async requestId => {
  const response = await instance.get(`/requests/${requestId}`);
  if (response.data) {
    return response.data;
  }
};
