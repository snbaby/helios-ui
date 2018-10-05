import {fetch} from '@/core/fetch.js';

export function login(data) {
    return fetch({
        url: '/auth/login',
        method: 'post',
        data: data
    })
}
