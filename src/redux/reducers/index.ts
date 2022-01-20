import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { domain } from './domain';
import { app } from './app';
import {ui} from './ui';

const appPersistConfig = {
    key: 'sample',
    storage,
    whitelist: [],
};

const domainPersistConfig = {
    key: 'sample',
    storage,
    whitelist: [],
};

const reducer = combineReducers({
    app: persistReducer(appPersistConfig, app),
    domain: persistReducer(domainPersistConfig, domain),
    ui, // UI関係は永続化しない
});

export const rootReducer = (state: any, action: any) => {
    const flag: boolean = action.type === 'CLEAR_STATE';
    return reducer(flag ? undefined : state, action);
};
