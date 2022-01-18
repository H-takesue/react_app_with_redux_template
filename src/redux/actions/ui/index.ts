import { Action } from 'redux';

export const UiActionTypes = {
    SET_GLOBAL_LOADING: 'app/set_global_loading',
};

export const setGlobalLoading = (loading: boolean): SetGlobalLoading => ({
    type: UiActionTypes.SET_GLOBAL_LOADING,
    payload: { loading },
});

export interface SetGlobalLoading extends Action {
    type: string;
    payload: { loading: boolean };
}
