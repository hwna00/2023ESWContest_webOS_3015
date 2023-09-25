import { useQuery } from '@tanstack/react-query';

import { getMe } from '../api';

const useUser = () => {
  const { isLoading, data, isError } = useQuery(['me'], getMe, {
    retry: false,
  });
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
};

export default useUser;
