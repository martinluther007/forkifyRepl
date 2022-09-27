import { async } from 'regenerator-runtime';
import { TIMEOUT_SECONDS } from './config';
// import recipeView from './views/recipeView';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async (url, uploadData = undefined) => {
  const fetchPro = uploadData
    ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);

  try {
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    // handling errors incase of errors
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    // to handle it in the required component since error on async functions are also resolved
    throw error;
  }
};
/*
export const getJson = async url => {
  try {
    const res = await Promise.race([, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    // handling errors incase of errors
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    // to handle it in the required component since error on async functions are also resolved
    throw error;
  }
};

export const sendJson = async (url, uploadData) => {
  try {
    const res = await Promise.race([
      ,
      timeout(TIMEOUT_SECONDS),
    ]);
    const data = await res.json();
    // handling errors incase of errors
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    // to handle it in the required component since error on async functions are also resolved
    throw error;
  }
};
*/
// Sebastian — Teaching Assistant
// Answer
// 10 upvotes
// 1 year ago
// Hi Djordje,

// There are two major differences between Observer/Observable and Publisher/Subscriber patterns:

// 1. Observer/Observable pattern is mostly implemented in a synchronous way, i.e. the observable calls the appropriate method of all its observers when some event occurs. The Publisher/Subscriber pattern is mostly implemented in an asynchronous way (using message queue).

// 2. In the Observer/Observable pattern, the observers are aware of the observable. Whereas, in Publisher/Subscriber, publishers and subscribers don't need to know each other. They simply communicate with the help of message queues.

// Data binding is a generic term and it can be implemented using either Observer/Observable or Publisher/Subscriber method. Data is the Publisher/Subscriber.
