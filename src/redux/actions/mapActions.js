import {
  GET_SEARCH_REQUEST_FAIL,
  GET_SEARCH_REQUEST_START,
  GET_SEARCH_REQUEST_SUCCESS,
} from './types';

import {iTunesSearchURL} from '../../api';

const getSearchRequestStart = () => {
  return {
    type: GET_SEARCH_REQUEST_START,
  };
};

const getSearchRequestSuccess = (response) => {
  return {
    type: GET_SEARCH_REQUEST_SUCCESS,
    payload: {
      searchResponse: response,
    },
  };
};

const getSearchRequestFail = (errorMessage) => {
  return {
    type: GET_SEARCH_REQUEST_FAIL,
    payload: {
      apiErrorMessage: errorMessage,
    },
  };
};

export const executeGetSearchRequest = (term, entity) => {
  return async (dispatch, _getState) => {
    dispatch(getSearchRequestStart());
    const url = iTunesSearchURL
      .replace('{{term}}', term)
      .replace('{{entity}}', entity);
    const options = {
      method: 'GET',
    };
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response && response.resultCount) {
          dispatch(getSearchRequestSuccess(response));
        } else {
          dispatch(getSearchRequestFail('Some thing went wrong'));
        }
      })
      .catch((_error) => {
        dispatch(getSearchRequestFail('Some thing went wrong'));
      });
  };
};

export default {
  executeGetSearchRequest,
};
