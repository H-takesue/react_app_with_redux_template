import { Action } from 'redux';

export const SampleActionTypes = {
    SET_SAMPLE: 'app/set_sample',
    GET_SAMPLE: 'app/get_sample',
};

export const setSample = (sampleStr: string): SetSample => ({
    type: SampleActionTypes.SET_SAMPLE,
    payload: { sampleStr },
});

export interface SetSample extends Action {
    type: string;
    payload: { sampleStr: string };
}

export const getSample = (sampleStr: string): GetSample => ({
    type: SampleActionTypes.GET_SAMPLE,
    payload: { sampleStr },
});

export interface GetSample extends Action {
    type: string;
    payload: { sampleStr: string };
}


