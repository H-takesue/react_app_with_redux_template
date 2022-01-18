import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import { rootReducer } from './reducers';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export type RootStateType = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
