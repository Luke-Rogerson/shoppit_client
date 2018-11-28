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
    method: api.method || 'GET'
  };

  // HANDLE AUTH HERE TOO WHEN WE GET TO IT
  // get token from async storage
  // then append the token in the headers
  // Header: auth - bearer...

  const headers = {
    'Content-Type': 'application/json'
  };
  options.headers = headers;

  if (api.method === 'POST' || api.method === 'PUT') {
    options.body = JSON.stringify(api.body);
  }

  fetch(BASE_URL + api.url, options)
    .then(response => response.json())
    .then(data => {
      if (api.schema) {
        console.log('GOT HERE: ', api.schema);
        data = normalize(data, api.schema);
        console.log('AFTER',data);



        // data = {
        //   entities: {
        //     categories: {
        //       501: {
        //         "category_id": 501,
        //         "category_name": "books"
        //       },
        //       505: {
        //         "category_id": 505,
        //         "category_name": "fitness"
        //       }
        //     },
        //     users: {
        //       1400: {
        //         "user_id": 1400,
        //         "first_name": "Charlie",
        //         "last_name": "Rutland",
        //         "gender": "female",
        //         "birthday": "01-11-1460",
        //         "avatar_url": "https://i.imgur.com/MU2dD8E.jpg",
        //         "email": "wownice@codeworks.me",
        //         "category": [501,505]
        //       }
        //     }
        //   },
        //   results: 1400
        // }
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
      });
    });
};
