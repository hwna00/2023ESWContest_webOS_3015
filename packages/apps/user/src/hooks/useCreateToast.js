import { useCallback, useState } from 'react';
import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

const useCreateToast = () => {
  const [msg, setMsg] = useState('');

  const onToastSuccess = useCallback(response => {
    console.log(response);
    setMsg('');
  }, []);

  const onToastFailure = useCallback(error => {
    console.log(error);
    setMsg('');
  }, []);

  const createToast = useCallback(
    message => {
      setMsg(message);

      const parms = {
        message: message,
      };

      const lsRequest = {
        service: 'luna://com.webos.notification',
        method: 'createToast',
        parameters: parms,
        onSuccess: onToastSuccess,
        onFailure: onToastFailure,
      };

      webOSBridge.send(lsRequest);
    },
    [onToastSuccess, onToastFailure],
  );

  return createToast;
};

export default useCreateToast;
