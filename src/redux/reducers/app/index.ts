import { combineReducers } from 'redux';
import {AppActionTypes, SetAuthToken, SetError} from '../../actions/app';
import { ErrorType } from './type/error.type';

const authToken = (state = '', action: SetAuthToken) => {
    switch (action.type) {
        case AppActionTypes.SET_AUTH_TOKEN:
            return action.payload.authToken;
        default:
            return state;
    }
};

const error = (state: ErrorType = null, action: SetError) => {
    switch (action.type) {
        case AppActionTypes.SET_ERROR:
            return action.payload.error;
        default:
            return state;
    }
};

export const app = combineReducers({
    authToken,
    error,
});
