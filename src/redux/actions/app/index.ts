import { Action } from 'redux';
import { ErrorType } from '../../reducers/app/type/error.type';

export const AppActionTypes = {
    SET_AUTH_TOKEN: 'app/set_auth_token',
    GET_AUTH_TOKEN: 'app/get_auth_token',
    SET_ERROR: 'app/set_error',
    LOGOUT: 'app/logout',
    REFRESH_AUTH_TOKEN: 'app/refresh_auth_token',
};

export const logOut = () => ({
    type: AppActionTypes.LOGOUT,
});

export interface LogOut extends Action {
    type: string;
}

export const clearState = () => ({
    type: 'CLEAR_STATE',
});

export const setAuthToken = (authToken: string): SetAuthToken => ({
    type: AppActionTypes.SET_AUTH_TOKEN,
    payload: { authToken },
});

export interface SetAuthToken extends Action {
    type: string;
    payload: { authToken: string };
}

export const getAuthToken = (email: string, password: string): GetAuthToken => ({
    type: AppActionTypes.GET_AUTH_TOKEN,
    payload: { email, password },
});

export interface GetAuthToken extends Action {
    type: string;
    payload: { email: string; password: string };
}

export const setError = (error: ErrorType | null): SetError => ({
    type: AppActionTypes.SET_ERROR,
    payload: { error },
});

export interface SetError extends Action {
    type: string;
    payload: { error: ErrorType | null };
}
