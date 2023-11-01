import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

const getNetworks = () => {
  return new Promise((resolve, reject) => {
    webOSBridge.send({
      service: 'luna://com.webos.service.wifi',
      method: 'findnetworks',
      onComplete: response => {
        resolve(response.foundNetworks);
      },
      onFailure: error => {
        reject(error);
      },
    });
  });
};

export default getNetworks;
