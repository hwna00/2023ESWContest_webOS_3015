import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

const closeApp = appId => {
  const lsRequest = {
    service: 'luna://com.webos.service.applicationmanager',
    method: 'closeByAppId',
    parameters: { id: appId },

    onComplete: response => {
      console.log(response);
    },
    onFailure: error => {
      console.log(error);
    },
  };
  webOSBridge.send(lsRequest);
};
export default closeApp;
