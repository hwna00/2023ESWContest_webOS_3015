import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

const getStatus = () => {
  return new Promise((resolve, reject) => {
    webOSBridge.send({
      service: 'luna://com.webos.service.wifi',
      method: 'getstatus',
      onComplete: response => {
        resolve(response);
      },
      onFailure: error => {
        reject(error);
      },
    });
  });
};

export default getStatus;
