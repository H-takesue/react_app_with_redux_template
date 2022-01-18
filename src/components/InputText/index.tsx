import React from 'react';
import styles from './css/style.module.scss';
import {useInputText} from "./hooks/useInputText";

type InputTextProps = {
    // eslint-disable-next-line react/require-default-props
    labelStr?: string, // ラベル文字列
    inputType: string, // type
    // eslint-disable-next-line react/require-default-props
    placeholder?: string,
    maxlength: number,
    // eslint-disable-next-line react/require-default-props
    noticeText?: string, // 補足文字列
    onChangeFunc: (text: string) => void, // 呼び出し元へ文字列の返却
    require: boolean, // 必須フラグ
    validateType: string, // バリデーションタイプ
    onChangeValidate: (errorFlag: boolean) => void, // 呼び出し元へのエラーフラグ返却
    // eslint-disable-next-line react/require-default-props
    defaultVal?: string, // 初期値
}

const InputText: React.FC<InputTextProps> = (props) => {

    const {
        labelStr,
        inputType,
        placeholder,
        maxlength,
        noticeText,
        onChangeFunc,
        require,
        validateType,
        onChangeValidate,
        defaultVal,
    } = props;

    const [inputData, inputCallback] = useInputText(
        defaultVal || '',
        require,
        validateType,
    )

    return (
        <div className={styles.wrap}>
            <div className={require ? `${styles['label--require']}` : `${styles.label}`}>
                {labelStr}
            </div>
            <input type={inputType}
                placeholder={placeholder}
                maxLength={maxlength}
                value={inputData.textData}
                onChange={(e) => {
                    const result = inputCallback.changeTextAndValidate(e.target.value);
                    onChangeFunc(e.target.value);
                    onChangeValidate(result);
                }}
                onBlur={() => {
                    const result = inputCallback.changeTextAndValidate(inputData.textData ? inputData.textData : '');
                    onChangeFunc(inputData.textData);
                    onChangeValidate(result);
                }}
                className={`${styles.input} ${inputType === 'password' ? styles.inputPass : ''} ${inputData.validateErrorFlag ? styles.error : null}`}
            />
            <div className={styles.errorText}>{inputData.validateErrorText}</div>
            {noticeText ?
                (<div className={styles.notice}>
                    {noticeText}
                </div>) : ''
            }
        </div>
    )
}

export default InputText;
