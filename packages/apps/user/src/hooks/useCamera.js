import { useEffect, useState } from 'react';

const useCamera = () => {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    stream: null,
  });

  const fetchStream = async () => {
    const cameraContraints = {
      audio: true,
      video: true,
    };

    window.navigator.mediaDevices
      .getUserMedia(cameraContraints)
      .then(userStream => {
        setState({
          ...state,
          isLoading: false,
          stream: userStream,
        });
      })
      .catch(error => {
        setState({
          ...state,
          isLoading: false,
          error,
        });
      });
  };

  useEffect(() => {
    fetchStream();
    {
      /* eslint-disable */
    }
  }, []);

  return state;
};

export default useCamera;
