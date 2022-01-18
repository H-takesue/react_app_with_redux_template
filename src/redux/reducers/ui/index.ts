import { combineReducers } from 'redux';
import {UiActionTypes} from '../../actions/ui';

const globalLoading = (state = false, action: any) => {
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
