import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {AxiosError} from 'axios';
import {throwError} from 'redux-saga-test-plan/providers';
import {fetchSampleDataAsync} from '../sample.saga';
import {SampleApi} from '../../util/api/SampleApi';
import {SampleActionTypes, setSample} from '../../redux/actions/domain/Sample';

import {setError} from '../../redux/actions/app';
import {setGlobalLoading} from '../../redux/actions/ui';

describe('apiテストを絡めたサンプル', () => {
    const testSampleData = {
        name: 'test',
        type: 1
    };

    const {getSample} = SampleApi;

    it('正常', () =>
        expectSaga(fetchSampleDataAsync,)
            // モックデータを返すように設置
            .provide([
                [matchers.call(getSample, 'authToken'), {data: testSampleData}]]
            )
            // 期待するput
            .put(setGlobalLoading(true))
            .put(setSample(testSampleData.name))
            .put(setGlobalLoading(false))
            // action 呼び出し
            .dispatch({
                type: SampleActionTypes.GET_SAMPLE,
                payload: {sampleStr: 'authToken'}
            })
            .silentRun()
    );

    it('ネットワークエラー', () => {
        const error = new Error() as AxiosError;
        error.message = 'testError';
        error.code = '400';
        error.isAxiosError = true;
        error.response = {
            config: {},
            data: undefined,
            headers: {},
            request: undefined,
            statusText: '',
            status: 400
        }

        return expectSaga(fetchSampleDataAsync)
            .provide([
                [matchers.call(getSample, 'authToken'), throwError(error)]]
            )
            // 想定されるエラー内容の格納
            .put(setGlobalLoading(true))
            .put(setError({
                code: Number(error.code),
                title: 'ネットワークエラー',
                message: error.message
            }))
            .put(setGlobalLoading(false))
            .dispatch({
                type: SampleActionTypes.GET_SAMPLE,
                payload: {sampleStr: 'authToken'}
            })
            .silentRun();
    });
});
