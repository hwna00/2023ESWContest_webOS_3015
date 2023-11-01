/*
 * Copyright (c) 2020-2023 LG Electronics Inc.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// eslint-disable-next-line import/no-unresolved
const Service = require('webos-service');

const pkgInfo = require('./package.json');

const service = new Service(pkgInfo.name);

function createAppointmentActivity(msg) {
  console.log('=========', msg);

  service.call(
    'luna://com.webos.service.activitymanager/create',
    {
      activity: {
        name: msg.payload.activityname,
        description: 'Test create of scheduled activity with callback',
        type: { foreground: true },
        callback: {
          method: `luna://${pkgInfo.name}/createNotification`,
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

function createNotification(msg) {
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

  service.call('luna://com.webos.service.tts/speak', ttsParams, m2 => {
    console.log('tts have been called', m2);
    msg.respond({
      returnValue: true,
    });
  });
}

service.register('createAppointmentActivity', createAppointmentActivity);
service.register('createNotification', createNotification);
