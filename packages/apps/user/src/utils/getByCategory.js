import { getHospitals, getDoctors, getFavorites } from '../api';

const getByCategory = category => {
  switch (category) {
    case 'hospitals':
      return getHospitals;
    case 'doctors':
      return getDoctors;
    case 'favorites':
      return getFavorites;
    default:
      throw new Error();
  }
};

export default getByCategory;
