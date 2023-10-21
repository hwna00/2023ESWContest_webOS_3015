/*
 * Copyright (c) 2020-2023 LG Electronics Inc.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// helloworld_webos_service.js
// is simple service, based on low-level luna-bus API

// eslint-disable-next-line import/no-unresolved

const Service = require('webos-service');
const schedule = require('node-schedule');

const pool = require('../../server/config/db');

const pkgInfo = require('./package.json');

const service = new Service(pkgInfo.name);
const logHeader = `[${pkgInfo.name}]`;
let greeting = 'Hello, World!';

// const readAppointmentQuery = async (connection, uid) => {
//   const Query = `SELECT YEAR(date) year, MONTH(date) month, DAY(date) day, HOUR(time) hour, MINUTE(time) minute FROM
//     Appointments WHERE user_id = ? AND state_id = 'ac';`;
//   const Params = [uid];

//   const rows = await connection.query(Query, Params);

//   return rows;
// };

// let previousTime = [];

// service.register('watchTime', async uid => {
//   try {
//     const connection = await pool.getConnection(async conn => conn);
//     try {
//       const [rows] = await readAppointmentQuery(connection, uid);
//       previousTime = rows;
//     } catch (err) {
//       // 서버 오류
//     } finally {
//       connection.release();
//     }
//   } catch (err) {
//     // 데이터 베이스 연결 실패
//   }
// });

// const onToastSuccess = msg => {
//   console.log(msg);
// };

// const onToastFailure = msg => {
//   console.log(msg);
// };

const createSchedule = msg => {
  console.log(msg);
  const params = {
    activity: {
      name: 'ScheduledActivityWithCallback',
      description: 'Test create of scheduled activity with callback',
      type: { foreground: true },
      callback: {
        method: 'luna://com.webos.notification/createToast',
        params: { message: '알람 시간입니다.', persistent: true },
      },
      schedule: { start: '2023-10-21 00:14:00' },
    },
    start: true,
    subscribe: true,
  };

  service.call('luna://com.webos.service.activitymanager/create', params, m2 =>
    console.log(m2),
  );
};

service.register('createSchedule', createSchedule);

// a method that always returns the same value
service.register('hello', message => {
  console.log('In hello callback');
  const name = message.payload.name ? message.payload.name : 'World';

  message.respond({
    returnValue: true,
    Response: `Hello, ${name} !`,
  });
});

// set some state in the service
service.register('/config/setGreeting', message => {
  console.log('In setGreeting callback');
  if (message.payload.greeting) {
    greeting = message.payload.greeting;
  } else {
    message.respond({
      returnValue: false,
      errorText: "argument 'greeting' is required",
      errorCode: 1,
    });
  }
  message.respond({
    returnValue: true,
    greeting,
  });
});

// call another service
service.register('time', message => {
  console.log('time callback');
  service.call(
    'luna://com.webos.service.systemservice/clock/getTime',
    {},
    m2 => {
      console.log(
        logHeader,
        'SERVICE_METHOD_CALLED:com.webos.service.systemservice/clock/getTime',
      );
      const response = `You appear to have your UTC set to: ${m2.payload.utc}`;
      console.log(response);
      message.respond({ message: response });
    },
  );
});

// handle subscription requests
const subscriptions = {};
let interval;
let x = 1;
function createInterval() {
  if (interval) {
    return;
  }
  console.log(logHeader, 'create_interval');
  console.log('create new interval');
  interval = setInterval(() => {
    sendResponses();
  }, 1000);
}

// send responses to each subscribed client
function sendResponses() {
  console.log(logHeader, 'send_response');
  console.log(
    `Sending responses, subscription count=${
      Object.keys(subscriptions).length
    }`,
  );
  for (const i in subscriptions) {
    if (Object.prototype.hasOwnProperty.call(subscriptions, i)) {
      const s = subscriptions[i];
      s.respond({
        returnValue: true,
        event: `beat ${x}`,
      });
    }
  }
  x++;
}

// listen for requests, and handle subscriptions via implicit event handlers in call
// to register
service.register(
  'heartbeat',
  message => {
    const { uniqueToken } = message;
    console.log(logHeader, 'SERVICE_METHOD_CALLED:/heartbeat');
    console.log(
      `heartbeat callback, uniqueToken: ${uniqueToken}, token: ${message.token}`,
    );
    message.respond({ event: 'beat' });
    if (message.isSubscription) {
      subscriptions[uniqueToken] = message;
      if (!interval) {
        createInterval();
      }
    }
  },
  message => {
    const { uniqueToken } = message;
    console.log(`Canceled ${uniqueToken}`);
    delete subscriptions[uniqueToken];
    const keys = Object.keys(subscriptions);
    if (keys.length === 0) {
      console.log('no more subscriptions, canceling interval');
      clearInterval(interval);
      interval = undefined;
    }
  },
);

// EventEmitter-based API for subscriptions
// note that the previous examples are actually using this API as well, they're
// just setting a "request" handler implicitly
const heartbeat2 = service.register('heartbeat2');

heartbeat2.on('request', message => {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/heartbeat2/request');
  console.log('heartbeat callback');
  message.respond({ event: 'beat' });
  if (message.isSubscription) {
    subscriptions[message.uniqueToken] = message;
    if (!interval) {
      createInterval();
    }
  }
});
heartbeat2.on('cancel', message => {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/heartbeat2/cancel');
  console.log(`Canceled ${message.uniqueToken}`);
  delete subscriptions[message.uniqueToken];
  const keys = Object.keys(subscriptions);
  if (keys.length === 0) {
    console.log('no more subscriptions, canceling interval');
    clearInterval(interval);
    interval = undefined;
  }
});

service.register('ping', message => {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/ping');
  console.log('Ping! setting up activity');
  const methodName = `luna://${pkgInfo.name}/pong`;
  const activitySpec = {
    activity: {
      name: 'My Activity', // this needs to be unique, per service
      description: 'do something', // required
      background: true, // can use foreground or background, or set individual properties (see Activity Specification below, for details)
      persist: true, // this activity will be persistent across reboots
      explicit: true, // this activity *must* be completed or cancelled explicitly, or it will be re-launched until it does
      callback: {
        // what service to call when this activity starts
        method: methodName, // URI to service
        params: {
          // parameters/arguments to pass to service
        },
      },
    },
    start: true, // start the activity immediately when its requirements (if any) are met
    replace: true, // if an activity with the same name already exists, replace it
    subscribe: false, // if "subscribe" is false, the activity needs to be adopted immediately, or it gets canceled
  };
  service.call(
    'luna://com.webos.service.activitymanager/create',
    activitySpec,
    reply => {
      console.log(
        logHeader,
        'SERVICE_METHOD_CALLED:com.webos.service.activitymanager/create',
      );
      const { activityId } = reply.payload;
      console.log(`ActivityId = ${activityId}`);
      message.respond({ msg: `Created activity ${activityId}` });
    },
  );
});

service.register('pong', message => {
  console.log(logHeader, 'SERVICE_METHOD_CALLED:/pong');
  console.log('Pong!');
  console.log(message.payload);
  message.respond({ message: 'Pong' });
});

service.register('/do/re/me', message => {
  console.log(logHeader, 'SERVICE_METHOD_CALLED://do/re/me');
  message.respond({
    verses: [
      { doe: 'a deer, a female deer' },
      { ray: 'a drop of golden sun' },
      { me: 'a name I call myself' },
    ],
  });
});
