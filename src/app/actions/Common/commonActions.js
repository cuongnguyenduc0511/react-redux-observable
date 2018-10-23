import { commonActions } from "./types";
import axios from 'axios';

export const fetchStepchartLevels = () => dispatch => {
    dispatch({
        type: commonActions.FETCH_STEPCHART_LEVELS
    });
}

export const fetchAllStepchartLevels = () => dispatch => {
    dispatch({
        type: commonActions.FETCH_ALL_STEPCHART_LEVELS
    });
}

export const fetchCoopStepchartLevels = () => dispatch => {
    dispatch({
        type: commonActions.FETCH_COOP_STEPCHART_LEVELS
    });
}

export const fetchStepchartTypes = () => dispatch => {
    // var url = new URL('http://localhost:3000/api/stepchart-types')

    // fetch(url)
    // .then(res => res.json())
    // .then(result =>
    //     dispatch({
    //         type: commonActions.FETCH_STEPCHART_TYPES,
    //         payload: result
    //     })
    // );    
    var stepchartTypesApiUrl = 'http://localhost:3000/api/stepchart-types';
    axios.get(stepchartTypesApiUrl).then(function (res) {
        if (res.data) {
            dispatch({
                type: commonActions.FETCH_STEPCHART_TYPES,
                payload: res.data
            })
        }
    }).catch(function (error) {
    }).then(function () {
        //finally
    });

}

export const fetchRequestStatus = () => dispatch => {
    // var url = new URL('http://localhost:3000/api/status')

    // fetch(url)
    //     .then(res => res.json())
    //     .then(result =>
    //         dispatch({
    //             type: commonActions.FETCH_REQUEST_STATUS,
    //             payload: result
    //         })
    //     );

    var requestStatusApiUrl = 'http://localhost:3000/api/status';
    axios.get(requestStatusApiUrl).then(function (res) {
        if (res.data) {
            dispatch({
                type: commonActions.FETCH_REQUEST_STATUS,
                payload: res.data
            })
        }
    }).catch(function (error) {
    }).then(function () {
        //finally
    });

}

export const fetchCommonData = () => dispatch => {
    axios.all([getStepchartTypes(), getRequestStatus()])
    .then(axios.spread(function (stepchartTypes, requestStatus) {
        // Both requests are now complete
        if (stepchartTypes) {
            dispatch({
                type: commonActions.FETCH_STEPCHART_TYPES,
                payload: stepchartTypes.data
            })
        }
        if (requestStatus) {
            dispatch({
                type: commonActions.FETCH_REQUEST_STATUS,
                payload: requestStatus.data
            })
        }
    }));
}

function getStepchartTypes() {
    const stepchartTypesApiUrl = 'http://localhost:3000/api/stepchart-types';
    return axios.get(stepchartTypesApiUrl);
}

function getRequestStatus() {
    const requestStatusApiUrl = 'http://localhost:3000/api/status';
    return axios.get(requestStatusApiUrl);
}



