import { normalize } from 'normalizr';
import { AsyncStorage } from 'react-native';

export const API = 'potatosandomolasses';

retrieveToken = async () => {
  try {
    const accesstoken = await AsyncStorage.getItem('accesstoken');
    return accesstoken;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default BASE_URL => store => next => async action => {
  if (!action[API]) return next(action); // Pass on if not asynchronous

  // Otherwise, do...
  const api = action[API];

  next({
    ...action,
    type: action.type + '_PENDING',
    loading: true
  });

  const options = {
    method: api.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      accesstoken: await retrieveToken()
    },
    body: JSON.stringify(api.body)
  };

  fetch(BASE_URL + api.url, options)
    .then(response => {
      // FIXME: this catch is only for empty responses, but it catches all errors now.
      return response.json().catch(e => {
        // eslint-disable-next-line no-console
        console.warn('[apiMiddleware] Error parsing json', e);
      });
    })
    .then(data => {
      if (data && api.schema) {
        data = normalize(data, api.schema);
      }

      store.dispatch({
        ...action,
        type: action.type + '_SUCCESS',
        [API]: undefined,
        loading: false,
        data
      });
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);

      store.dispatch({
        ...action,
        type: action.type + '_FAILURE',
        [API]: undefined,
        loading: false,
        error: error && error.message
      });
    });
};
