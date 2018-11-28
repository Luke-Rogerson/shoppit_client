import { normalize } from 'normalizr';

export const API = 'potatosandomolasses';
export default (BASE_URL) => store => next => action => {
  if (!action[API]) return next(action); // Pass on if not asynchronous

  // Otherwise, do...
  const api = action[API];

  next({
    ...action,
    type: action.type + '_PENDING'
  });

  const options = {
    method: api.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'user_id': api.user_id
    }
  };

  // HANDLE AUTH HERE TOO WHEN WE GET TO IT
  // get token from async storage
  // then append the token in the headers
  // Header: auth - bearer...

  // const Headers = {
  //   'Content-Type': 'application/json',
  //   'user_id': api.user_id
  // };
  // options.Headers = Headers;



  if (api.method === 'POST' || api.method === 'PUT') {
    options.body = JSON.stringify(api.body);
  }

  fetch(BASE_URL + api.url, options)
    .then(response => {
      console.log('RES: ', response);
      return response.json();
    })
    .then(data => {
      if (api.schema) {
        console.log('GOT HERE: ', api.schema);
        console.log('DATA: ', data);

        data = normalize(data, api.schema);
        console.log('AFTER', data);
      }

      store.dispatch({
        ...action,
        type: action.type + '_SUCCESS',
        [API]: undefined,
        data
      });
    })
    .catch(error => {
      store.dispatch({
        ...action,
        type: action.type + '_FAILURE',
        [API]: undefined,
        error: error.message
      }, console.log(error));
    });
};
