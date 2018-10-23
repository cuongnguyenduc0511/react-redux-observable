import { requestActions } from '../actions/Request/types';
import { receiveRequests } from '../actions/Request/requestActions';

// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';

import { ofType } from 'redux-observable';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

const requestApiUrl = 'http://localhost:3000/api/requests'

// export default function fetchRequests(action$) {
//     return action$.ofType(requestActions.FETCH_REQUESTS)
//         .map(action => action.payload.urlParams)
//         .switchMap(urlParams => {
//             console.log(urlParams);
//             return ajax.getJSON(requestApiUrl).map(res => receiveRequests(res));
//         }
//         );
// };

export const fetchRequests = action$ => action$.pipe(
    ofType(requestActions.FETCH_REQUESTS),
    mergeMap(action => {
        const urlParams = action.payload.urlParams;
        var url = new URL(requestApiUrl)

        url.search = new URLSearchParams(urlParams)

        return ajax.getJSON(url).pipe(
            map(response => receiveRequests(response)),
            takeUntil(action$.pipe(
                ofType(requestActions.ABORT_FETCH_REQUESTS)
            ))
        )
    })
);