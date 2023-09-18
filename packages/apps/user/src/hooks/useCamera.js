import { useEffect, useState } from 'react';

const CAMERA_NUMBER = 0;

const useCamera = () => {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    stream: null,
  });

  useEffect(() => {
    const fetchStream = async () => {
      const devices = await window.navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      const devicdId = cameras[CAMERA_NUMBER].deviceId;

      const cameraContraints = {
        audio: true,
        video: {
          deviceId: { exact: devicdId },
        },
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

    fetchStream();
  }, []);

  return state;
};

export default useCamera;
