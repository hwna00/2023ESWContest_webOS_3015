import { getHospitals, getDoctors, getHospital, getDoctor } from '../api';

export const getAllByCategory = category => {
  switch (category) {
    case 'hospitals':
      return getHospitals();
    case 'doctors':
      return getDoctors();

    default:
      throw new Error();
  }
};

export const getDetailByCategory = (category, id) => {
  switch (category) {
    case 'hospitals':
      return getHospital(id);
    case 'doctors':
      return getDoctor(id);
    default:
      throw new Error();
  }
};
