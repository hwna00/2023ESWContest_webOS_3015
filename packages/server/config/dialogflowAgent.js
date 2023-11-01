/**
 * TODO(developer): UPDATE these variables before running the sample.
 */
// projectId: ID of the GCP project where Dialogflow agent is deployed
// const projectId = 'PROJECT_ID';
// sessionId: String representing a random number or hashed user identifier
// const sessionId = '123456';
// queries: A set of sequential queries to be send to Dialogflow agent for Intent Detection
// const queries = [
//   'Reserve a meeting room in Toronto office, there will be 5 of us',
//   'Next monday at 3pm for 1 hour, please', // Tell the bot when the meeting is taking place
//   'B'  // Rooms are defined on the Dialogflow agent, default options are A, B, or C
// ]
// languageCode: Indicates the language Dialogflow agent should use to detect intents
// const languageCode = 'en';

// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient();
// const projectId = require('../dfConfig.json').project_id;
const projectId = 'webohyes-chatbotv3-9gys';

async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode,
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId,
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries(sessionId, query, languageCode = 'ko') {
  // Keeping the context across queries let's us simulate an ongoing conversation with the bot

  let context;
  let intentResponse;
  try {
    console.log(`Sending Query: ${query}`);
    intentResponse = await detectIntent(
      projectId,
      sessionId,
      query,
      context,
      languageCode,
    );

    const intentName = intentResponse.queryResult.intent.displayName;
    const body = intentResponse.queryResult.parameters.fields.body?.stringValue;
    const hurt = intentResponse.queryResult.parameters.fields.hurt?.stringValue;
    const predicate =
      intentResponse.queryResult.parameters.fields.predicate?.stringValue;
    const onePain =
      intentResponse.queryResult.parameters.fields.one_pain?.stringValue;
    const onPredicate =
      intentResponse.queryResult.parameters.fields.one_predicate?.stringValue;

    console.log(`${intentName}, ${body}, ${hurt}`);
    let symptom;

    switch (intentName) {
      case 'body&hurt':
        if (body === '속' || body === '위' || body === '명치') {
          symptom = '소화불량';
        } else if (body === '머리') {
          symptom = '두통';
        } else if (body === '배' || body === '갈비뼈') {
          symptom = '복통';
        } else if (body === '목') {
          symptom = '인후통';
        } else if (body === '가슴') {
          symptom = '흉통';
        } else if (body === '근육') {
          symptom = '근육통';
        }
        break;
      case 'body&predicate':
        if (predicate === '피곤함') {
          symptom = '피로';
        } else if (predicate === '두근거림') {
          if (body === '머리') {
            symptom = '두통';
          } else {
            symptom = '심계항진';
          }
        } else if (predicate === '메스꺼움') {
          symptom = '메스꺼움';
        } else if (predicate === '울렁거림') {
          if (body === '머리') {
            symptom = '두통';
          } else if (body === '속') {
            symptom = '메스꺼움';
          }
        } else if (predicate === '건조함') {
          if (body === '입') {
            symptom = '구강건조증';
          } else if (body === '목') {
            symptom = '인후통';
          }
        } else if (predicate === '가려움') {
          if (body === '목') {
            symptom = '인후통';
          }
        } else if (predicate === '창백함') {
          symptom = '빈혈';
        } else if (predicate === '차가움') {
          symptom = '수족냉증';
        } else if (predicate === '어지러움') {
          symptom = '어지러움';
        }
        break;
      case 'one_pain':
        symptom = onePain;
        break;
      case 'one_predicate':
        if (onPredicate === '피곤함') {
          symptom = '피로';
        } else if (onPredicate === '두근거림') {
          symptom = '심계항진';
        } else if (onPredicate === '메스꺼움') {
          symptom = '메스꺼움';
        } else if (onPredicate === '창백함') {
          symptom = '빈혈';
        } else if (onPredicate === '어지러움') {
          symptom = '어지러움';
        }
        break;
      default:
        symptom = '증상을 찾을 수 없습니다.';
        break;
    }

    console.log(symptom);
    // TODO: 증상명을 출력 ex.두통
    return symptom;
  } catch (error) {
    console.log(error);
  }
}

exports.executeQueries = executeQueries;
