import { AxiosResponse } from 'axios';
import { axiosBase } from './index';
import {GetSampleType} from './type/GetSample';

export class SampleApi {
    static async getSample(authToken: string): Promise<AxiosResponse<GetSampleType>> {
        return axiosBase.get(`/sample`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
    }
}
