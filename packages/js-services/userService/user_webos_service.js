/*
 * Copyright (c) 2020-2023 LG Electronics Inc.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// helloworld_webos_service.js
// is simple service, based on low-level luna-bus API

// eslint-disable-next-line import/no-unresolved
const Service = require('webos-service');

const pkgInfo = require('./package.json');

const service = new Service(pkgInfo.name);

function createAppointmentActivity(msg) {
  console.log('=========', msg);
  console.log({
    method: `luna://${pkgInfo.name}/createAppointmentNotification`,
    params: { message: '진료 시간입니다.' },
  });

  service.call(
    'luna://com.webos.service.activitymanager/create',
    {
      activity: {
        name: msg.payload.activityname,
        description: 'Test create of scheduled activity with callback',
        type: { foreground: true },
        callback: {
          method: `luna://${pkgInfo.name}/createAppointmentNotification`,
          params: { message: '진료 시간입니다.' },
        },
        schedule: {
          start: `${msg.payload.datetime}`,
        },
      },
      start: true,
      replace: true,
      subscribe: false,
    },
    m2 => {
      console.log('[CreateActivity]', m2);
      msg.respond({
        returnValue: true,
        Response: '서비스가 시작됩니다',
      });
    },
  );
}

function createAppointmentNotification(msg) {
  console.log('=========', msg);
  const notificationParams = {
    message: msg.payload.message,
  };
  const ttsParams = {
    text: msg.payload.message,
    clear: true,
    language: 'ko-KR',
  };

  service.call(
    'luna://com.webos.notification/createToast',
    notificationParams,
    m2 => {
      console.log('nofitication have been called', m2);
      msg.respond({
        returnValue: true,
      });
    },
  );
  service.call('luna://com.webos.service.tts/speak   ', ttsParams, m2 => {
    console.log('tts have been called', m2);
    msg.respond({
      returnValue: true,
    });
  });
}

service.register('createAppointmentActivity', createAppointmentActivity);
service.register(
  'createAppointmentNotification',
  createAppointmentNotification,
);
service.register('tts', msg => {
  console.log('======tts======', msg);
  const ttsParams = {
    text: msg.payload.message,
    clear: true,
    language: 'ko-KR',
  };

  service.call('luna://com.webos.service.tts/speak', ttsParams, m2 => {
    console.log(m2);
    msg.respond({
      returnValue: true,
    });
  });
});
service.register('activity', msg => {
  console.log('=========', msg);

  const parameters = {
    activity: {
      name: msg.payload.activityname,
      description: 'Test create of scheduled activity with callback',
      type: { foreground: true },
      callback: {
        method: `luna://${pkgInfo.name}/createAppointmentNotification`,
        params: { message: '진료 시간입니다.' },
      },
      schedule: {
        start: msg.payload.datetime,
      },
    },
    start: true,
    replace: true,
  };

  service.call(
    'luna://com.webos.service.activitymanager/create',
    parameters,
    m2 => {
      console.log('[CreateActivity]', m2);
      msg.respond({
        returnValue: true,
        Response: '서비스가 시작됩니다',
      });
    },
  );
});

const subscriptions = {};
let heartbeatinterval;
const heartbeat = service.register('heartbeat');

function sendResponses() {
  console.log('send_response');
  console.log(
    'Sending responses, subscription count=',
    Object.keys(subscriptions).length,
  );
  for (const i in subscriptions) {
    if (Object.prototype.hasOwnProperty.call(subscriptions, i)) {
      const s = subscriptions[i];
      s.respond({
        returnValue: true,
        event: 'beat',
      });
    }
  }
}

function createHeartBeatInterval() {
  if (heartbeatinterval) {
    return;
  }
  console.log('create_heartbeatinterval');
  heartbeatinterval = setInterval(() => {
    sendResponses();
  }, 1000);
}

heartbeat.on('request', message => {
  console.log('SERVICE_METHOD_CALLED:/heartbeat');
  message.respond({ event: 'beat' }); // initial response
  if (message.isSubscription) {
    subscriptions[message.uniqueToken] = message;
    if (!heartbeatinterval) {
      createHeartBeatInterval();
    }
  }
});

heartbeat.on('cancel', message => {
  delete subscriptions[message.uniqueToken]; // remove message from "subscriptions"
  const keys = Object.keys(subscriptions);
  if (keys.length === 0) {
    // count the remaining subscriptions
    console.log('no more subscriptions, canceling interval');
    clearInterval(heartbeatinterval);
    heartbeatinterval = undefined;
  }
});
