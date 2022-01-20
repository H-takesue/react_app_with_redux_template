import { combineReducers } from 'redux';
import {SetGlobalLoading, UiActionTypes} from '../../actions/ui';

const globalLoading = (state = false, action: SetGlobalLoading) => {
    switch (action.type) {
        case UiActionTypes.SET_GLOBAL_LOADING:
            return action.payload.loading;
        default:
            return state;
    }
};

export const ui = combineReducers({
    globalLoading
});
