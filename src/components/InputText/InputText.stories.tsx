import React, {useState} from 'react';
import InputText from '.';

export default {
    title: 'Input/InputText',
    component: InputText,
};

export const InputTextNormalWithRequire = () => {
    const [text, setText] = useState('')
    const [validate, setValidate] = useState(false)
    return (<>
        <div style={{width: '600px'}}>
            <InputText labelStr="通常テキスト 必須パターン"
                inputType="text"
                maxlength={255}
                onChangeFunc={(text: string) => setText(text)}
                require
                placeholder="プレースホルダ"
                validateType="text"
                onChangeValidate={(flag: boolean) => setValidate(flag)}
            />
        </div>

        <div>関数戻り値</div>
        <div>{`text:${text}`}</div>
        <div>{`validate:${validate}`}</div>
    </>
    )
}

export const InputTextNormal = () => {
    const [text, setText] = useState('')
    const [validate, setValidate] = useState(false)
    return (<>
        <div style={{width: '600px'}}>
            <InputText labelStr="通常テキスト 任意パターン"
                inputType="text"
                maxlength={255}
                onChangeFunc={(text: string) => setText(text)}
                require={false}
                placeholder="プレースホルダ"
                validateType="text"
                onChangeValidate={(flag: boolean) => setValidate(flag)}
            />
        </div>

        <div>関数戻り値</div>
        <div>{`text:${text}`}</div>
        <div>{`validate:${validate}`}</div>
    </>
    )
}
