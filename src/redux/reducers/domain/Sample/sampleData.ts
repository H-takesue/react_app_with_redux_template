import {SampleActionTypes} from '../../../actions/domain/Sample';
import {sampleDataType} from './type/sampleData.type';
import {sampleDataInitialize} from './initialize/sampleDataInitialize';

export const sampleData = (state = sampleDataInitialize, action: any): sampleDataType => {
    switch (action.type) {
        case SampleActionTypes.SET_SAMPLE:
            return {
                ...state,
                sampleStr: action.payload.sampleStr,
            };
        default:
            return state;
    }
};
