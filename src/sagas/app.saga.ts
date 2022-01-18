import { put, takeEvery } from 'redux-saga/effects';
import { AppActionTypes, clearState,} from '../redux/actions/app';
import { persistor } from '../redux/store';

// ログアウト
function* logOut() {
    // storeリセット
    yield put(clearState());
    // storeの永続化を削除
    yield persistor.purge();
}

export function* logOutAsync() {
    yield takeEvery(AppActionTypes.LOGOUT, logOut);
}
