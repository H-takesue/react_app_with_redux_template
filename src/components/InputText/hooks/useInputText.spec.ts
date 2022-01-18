import { renderHook, act } from '@testing-library/react-hooks';
import {useInputText} from './useInputText';

describe('InputText hooks test', () => {

    it('初期状態が正しい', () => {
        // hooks初期化 hooksの引数は、result.currentに格納される
        const { result } = renderHook(() => useInputText(
            '',
            true,
            'text',
        ))

        expect(result.current[0].textData).toBe('');
        expect(result.current[0].validateErrorFlag).toBe(false);
        expect(result.current[0].validateErrorText).toBe('');
    })

    it('必須エラーが正しく動作する', () => {
        const { result } = renderHook(() => useInputText(
            '',
            true,
            'text',
        ))

        act(() => {
            // テキストを入力して削除する
            result.current[1].changeTextAndValidate('テキスト');
            result.current[1].changeTextAndValidate('');
        })

        expect(result.current[0].textData).toBe('');
        expect(result.current[0].validateErrorFlag).toBe(true);
        expect(result.current[0].validateErrorText).toBe('必須入力です');
    })

    it('必須エラーが必須入力でない場合、発生しない', () => {
        const { result } = renderHook(() => useInputText(
            '',
            false,
            'text',
        ))

        act(() => {
            // テキストを入力して削除する
            result.current[1].changeTextAndValidate('テキスト');
            result.current[1].changeTextAndValidate('');
        })

        expect(result.current[0].textData).toBe('');
        expect(result.current[0].validateErrorFlag).toBe(false);
        expect(result.current[0].validateErrorText).toBe('');
    })

    it('メールアドレス バリデーションチェック', () => {
        const { result } = renderHook(() => useInputText(
            '',
            false,
            'email',
        ))

        // メールアドレスではない
        act(() => {
            result.current[1].changeTextAndValidate('test');
        })

        expect(result.current[0].textData).toBe('test');
        expect(result.current[0].validateErrorFlag).toBe(true);
        expect(result.current[0].validateErrorText).toBe('メールアドレスが不正です');

        act(() => {
            result.current[1].changeTextAndValidate('test@mento.jp');
        })

        expect(result.current[0].textData).toBe('test@mento.jp');
        expect(result.current[0].validateErrorFlag).toBe(false);
        expect(result.current[0].validateErrorText).toBe('');
    })

    it('password バリデーションチェック', () => {
        const { result } = renderHook(() => useInputText(
            '',
            false,
            'password',
        ))

        // 8文字以下
        act(() => {
            result.current[1].changeTextAndValidate('passwor');
        })

        expect(result.current[0].textData).toBe('passwor');
        expect(result.current[0].validateErrorFlag).toBe(true);
        expect(result.current[0].validateErrorText).toBe('パスワードは8文字以上で入力してください');

        // 英字だけ
        act(() => {
            result.current[1].changeTextAndValidate('password');
        })

        expect(result.current[0].textData).toBe('password');
        expect(result.current[0].validateErrorFlag).toBe(true);
        expect(result.current[0].validateErrorText).toBe('パスワードは英字と数字が1文字以上ずつ含んでください');

        // 数字だけ
        act(() => {
            result.current[1].changeTextAndValidate('12345678');
        })

        expect(result.current[0].textData).toBe('12345678');
        expect(result.current[0].validateErrorFlag).toBe(true);
        expect(result.current[0].validateErrorText).toBe('パスワードは英字と数字が1文字以上ずつ含んでください');

        act(() => {
            result.current[1].changeTextAndValidate('password1234');
        })

        expect(result.current[0].textData).toBe('password1234');
        expect(result.current[0].validateErrorFlag).toBe(false);
        expect(result.current[0].validateErrorText).toBe('');
    })

    it('kana バリデーションチェック', () => {
        const { result } = renderHook(() => useInputText(
            '',
            false,
            'kana',
        ))

        // 8文字以下
        act(() => {
            result.current[1].changeTextAndValidate('test');
        })

        expect(result.current[0].textData).toBe('test');
        expect(result.current[0].validateErrorFlag).toBe(true);
        expect(result.current[0].validateErrorText).toBe('全角カタカナで入力してください');

        act(() => {
            result.current[1].changeTextAndValidate('カタカナ');
        })

        expect(result.current[0].textData).toBe('カタカナ');
        expect(result.current[0].validateErrorFlag).toBe(false);
        expect(result.current[0].validateErrorText).toBe('');
    })

    it('tel バリデーションチェック', () => {
        const { result } = renderHook(() => useInputText(
            '',
            false,
            'tel',
        ))

        // 数字でない
        act(() => {
            result.current[1].changeTextAndValidate('test');
        })

        expect(result.current[0].textData).toBe('test');
        expect(result.current[0].validateErrorFlag).toBe(true);
        expect(result.current[0].validateErrorText).toBe('半角数字で入力してください');

        act(() => {
            result.current[1].changeTextAndValidate('08012345678');
        })

        expect(result.current[0].textData).toBe('08012345678');
        expect(result.current[0].validateErrorFlag).toBe(false);
        expect(result.current[0].validateErrorText).toBe('');
    })
})
