import { all } from 'redux-saga/effects';
import {fetchSampleDataAsync} from './sample.saga';
import {logOutAsync} from './app.saga';

export default function* rootSaga() {
    yield all([logOutAsync(), fetchSampleDataAsync()]);
}
