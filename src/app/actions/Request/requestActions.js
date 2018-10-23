import { requestActions } from "./types";
import { getAllUrlParams } from '../../modules/params';

export function fetchRequests(page = null, params = null) {
    let urlParams = params ? jsonCopy(params) : {};

    if (typeof params === 'string') {
        urlParams = getAllUrlParams(params);
    }

    if (page) {
        urlParams.page = page;
    }

    return {
        type: requestActions.FETCH_REQUESTS,
        payload: {
            urlParams
        }
    };
}

export function receiveRequests(requestResult) {
    return {
      type: requestActions.RECEIVED_REQUESTS,
      payload: requestResult
    };
  }

  export function abortFetchingRequests() {
    return {
      type: requestActions.ABORT_FETCH_REQUESTS,
    };
  }

  

// function jsonCopy(src) {
//     return JSON.parse(JSON.stringify(src));
// }