import axios, { AxiosResponse } from 'axios';
import {call} from 'redux-saga-test-plan/matchers';
import {put, takeEvery} from 'redux-saga/effects';
import {setGlobalLoading} from '../redux/actions/ui';
import {getSample, SampleActionTypes, setSample} from '../redux/actions/domain/Sample';
import {SampleApi} from '../util/api/SampleApi';
import {GetSampleType} from '../util/api/type/GetSample';
import {setError} from '../redux/actions/app';

function* fetchSampleData({ payload }: ReturnType<typeof getSample>) {
    yield put(setGlobalLoading(true))
    try {
        const resSession: AxiosResponse<GetSampleType> = yield call(SampleApi.getSample, payload.sampleStr);
        yield put(setSample(resSession.data.name));
        yield put(setGlobalLoading(false))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response && Number(e.code) !== 401) {
            yield put(
                setError({
                    code: e.code ? Number(e.code) : null,
                    title: 'ネットワークエラー',
                    message: e.message ? e.message : '不明なエラーが発生しました'
                })
            );
        }
        yield put(setGlobalLoading(false))
    }
}

export function* fetchSampleDataAsync() {
    yield takeEvery(SampleActionTypes.GET_SAMPLE, fetchSampleData);
}
