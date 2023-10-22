import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

const connectWifi = () => {
  webOSBridge.send({
    service: 'luna://com.webos.service.wifi',
    method: 'connect',
    parameters: {
      ssid: 'wifi 이름',
      security: {
        securityType: 'WPA2',
        simpleSecurity: {
          passKey: 'a123456789!',
        },
      },
    },
    onComplete: response => {
      console.log(response);
    },
    onFailure: error => {
      console.log(error);
    },
  });
};

export default connectWifi;
