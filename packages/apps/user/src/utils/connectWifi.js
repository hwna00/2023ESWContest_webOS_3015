import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

const connectWifi = (ssid, wifiPassword, availableSecurityTypes) => {
  webOSBridge.send({
    service: 'luna://com.webos.service.wifi',
    method: 'connect',
    parameters: {
      ssid: ssid,
      security: {
        securityType: availableSecurityTypes,
        simpleSecurity: {
          passKey: wifiPassword,
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
