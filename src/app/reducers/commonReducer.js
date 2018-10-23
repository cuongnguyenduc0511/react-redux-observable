import { commonActions } from '../actions/Common/types'

const INITIAL_STATE = {
};

const STEPCHART_LEVELS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
const COOP_STEPCHART_LEVELS = ['X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X8', 'X9'];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case commonActions.FETCH_STEPCHART_TYPES:
            let stepchartTypeItems = [{ value: '', title: 'Choose Stepchart Types' }, ...action.payload];
            return {
                ...state,
                stepchartTypeItems: stepchartTypeItems
            };
        case commonActions.FETCH_REQUEST_STATUS:
            let statusItems = action.payload.map(item => {
                return { value: item.status_value ,title: item.status_name}
            });
            statusItems = [{ value: '', title: 'Choose Status' }, ...statusItems];

            return {
                ...state,
                statusItems: statusItems
            };
        case commonActions.FETCH_COOP_STEPCHART_LEVELS:
            let coopStepchartLevelItems = COOP_STEPCHART_LEVELS.map(item => {
                return { value: item ,title: item }
            });

            coopStepchartLevelItems = [{ value: '', title: 'Choose Stepchart Level' }, ...coopStepchartLevelItems]
            
            return {
                ...state,
                stepchartLevelItems: coopStepchartLevelItems
            };
        case commonActions.FETCH_STEPCHART_LEVELS:
            let regularStepchartLevelItems = STEPCHART_LEVELS.map(item => {
                return { value: item , title: item }
            });

            regularStepchartLevelItems = [{ value: '', title: 'Choose Stepchart Level' }, ...regularStepchartLevelItems]

            return {
                ...state,
                stepchartLevelItems: regularStepchartLevelItems
            };
        case commonActions.FETCH_ALL_STEPCHART_LEVELS:
            let allStepchartLevelItems = [...STEPCHART_LEVELS, ...COOP_STEPCHART_LEVELS];
            
            allStepchartLevelItems = allStepchartLevelItems.map(item => {
                return { value: item , title: item }
            });
            allStepchartLevelItems = [{ value: '', title: 'Choose Stepchart Level' }, ...allStepchartLevelItems]
            
            return {
                ...state,
                stepchartLevelItems: allStepchartLevelItems
            };
        default:
            return state;
    }
}

