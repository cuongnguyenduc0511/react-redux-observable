import { combineEpics } from 'redux-observable';
import { fetchRequests } from './requestEpics';

export const rootEpic = combineEpics(
    fetchRequests
);
