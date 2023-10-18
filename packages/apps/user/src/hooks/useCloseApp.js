import { useCallback } from 'react';
import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

const useCloseApp = () => {
  const closeApp = useCallback(() => {
    const lsRequest = {
      service: 'luna://com.webos.service.applicationmanager',
      method: 'closeByAppId',
      parameters: { id: 'com.housepital.app.user' },
      onComplete: response => {
        console.log(response);
      },
      onFailure: error => {
        console.log(error);
      },
    };

    webOSBridge.send(lsRequest);
  }, []);

  return closeApp;
};

export default useCloseApp;
