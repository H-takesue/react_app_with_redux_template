import React from 'react';
import {SampleComponent} from './index';

export default {
    title: 'Common/SampleComponent',
    component: SampleComponent,
};

export const SampleNormal = () => (
    <div style={{ width: '600px' }}>
        <SampleComponent text='テスト文字列'/>
    </div>
);
