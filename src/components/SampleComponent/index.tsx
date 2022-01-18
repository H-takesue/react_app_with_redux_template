import React from 'react';
import styles from './css/style.module.scss';

type SampleComponentProps = {
    text: string
}

export const SampleComponent: React.FC<SampleComponentProps> = (props: SampleComponentProps) => {
    const {text} = props;

    return <>
        <div className={styles.sample}>{text}</div>
    </>

}
