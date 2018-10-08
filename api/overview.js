import {fetch} from '@/core/fetch.js';

export function info() {
    return fetch({
        url: '/api/overview/info',
        method: 'get',
        loading: false,
    })
}
