import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SampleComponent} from '../../components/SampleComponent';
import {setSample} from '../../redux/actions/domain/Sample';
import {RootStateType} from '../../redux/store';

export const SamplePage: React.FC = () => {
    const sampleDataStore = useSelector((store: RootStateType) => store.domain.sample.sampleData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSample('redux保存内容'));
    }, [dispatch]);

    return (
        <>
            <SampleComponent text="sample"/>
            <SampleComponent text={sampleDataStore.sampleStr}/>
        </>
    );
}
