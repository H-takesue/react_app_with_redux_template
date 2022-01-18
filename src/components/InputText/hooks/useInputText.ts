import { useCallback, useState } from 'react';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegex = /^(?=.*?[a-z])(?=.*?\d)[a-z\d!-~¥]{8,255}$/i;
const katakanaRegex = /^([ァ-ヴ][ァ-ヴー・ \u3000]+)$/i;
const telRegex = /^([0-9\-+]+)$/i;

export const useInputText = (defaultVal: string,
    requireOri: boolean,
    validateTypeOri: string,
): [{
        textData: string,
        validateErrorFlag: boolean,
        validateErrorText: string,
    }, {
        changeTextAndValidate: (inputText: string) => boolean,
    }] => {

    const [textData, setTextData] = useState(defaultVal);
    const [validateErrorFlag, setValidateErrorFlag] = useState(false);
    const [validateErrorText, setValidateErrorText] = useState('');
    const [require] = useState(requireOri);
    const [validateType] = useState(validateTypeOri);

    const validateInput = (inputText: string, type: string, require: boolean): boolean => {
        if (inputText.length === 0) {
            if (require) {
                setValidateErrorFlag(true);
                setValidateErrorText("必須入力です");
                return true
            } 
            setValidateErrorFlag(false);
            setValidateErrorText("");
            return false
            
        }

        switch (type) {
            case 'email':
                if (!emailRegex.test(inputText)) {
                    setValidateErrorFlag(true);
                    setValidateErrorText("メールアドレスが不正です");
                    return true
                } 
                setValidateErrorFlag(false);
                setValidateErrorText("");
                return false
                

            case 'password':
                if (inputText.length < 8) {
                    setValidateErrorFlag(true);
                    setValidateErrorText("パスワードは8文字以上で入力してください");
                    return true
                } if (!passRegex.test(inputText)) {
                    setValidateErrorFlag(true);
                    setValidateErrorText("パスワードは英字と数字が1文字以上ずつ含んでください");
                    return true
                } 
                setValidateErrorFlag(false);
                setValidateErrorText("");
                return false
                

            case 'kana':
                if (!katakanaRegex.test(inputText)) {
                    setValidateErrorFlag(true);
                    setValidateErrorText("全角カタカナで入力してください");
                    return true
                } 
                setValidateErrorFlag(false);
                setValidateErrorText("");
                return false
                

            case 'tel':
                if (!telRegex.test(inputText)) {
                    setValidateErrorFlag(true);
                    setValidateErrorText("半角数字で入力してください");
                    return true
                } 
                setValidateErrorFlag(false);
                setValidateErrorText("");
                return false
                

            default:
                setValidateErrorFlag(false);
                setValidateErrorText("");
                return false
        }
    }

    const changeTextAndValidate = useCallback((inputText: string): boolean => {
        setTextData(inputText);
        return validateInput(inputText, validateType, require)
    }, [validateType, require]);

    return [{
        textData,
        validateErrorFlag,
        validateErrorText,
    }, {
        changeTextAndValidate,
    }]
}
