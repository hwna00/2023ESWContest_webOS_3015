import { useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingPage from '@housepital/common/LoadingPage';

import { auth } from '../../../firebase';

const AuthRoot = function () {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigate('/');
      }
      setIsLoading(false);
    });
  });

  return <>{isLoading ? <LoadingPage /> : <Outlet />}</>;
};

export default AuthRoot;
