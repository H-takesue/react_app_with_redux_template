import axiosbase from 'axios';
import { clearState } from '../../redux/actions/app';
import { store } from '../../redux/store';

// export const DOMAIN = process.env.REACT_APP_API_DOMAIN;
export const DOMAIN = 'sample';

export const axiosBase = axiosbase.create({
    baseURL: process.env.REACT_APP_BUILD !== 'local' ? `https://${DOMAIN}` : `http://${DOMAIN}`,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
});

axiosBase.interceptors.request.use((request) => {
    // eslint-disable-next-line no-console
    if (process.env.REACT_APP_BUILD !== 'production') console.log(request.url);
    return request;
});

axiosBase.interceptors.response.use(
    (response) => {
        // eslint-disable-next-line no-console
        if (process.env.REACT_APP_BUILD !== 'production') console.log(response);
        return response;
    },
    (error) => {
        // eslint-disable-next-line no-console
        if (process.env.REACT_APP_BUILD !== 'production') console.log(error);
        // 401の際は、storeをリセットする
        if (error.response.status === 401) {
            const { dispatch } = store;
            return dispatch(clearState());
        }
        return Promise.reject(error);
    }
);
