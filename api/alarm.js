import {fetch} from '@/core/fetch.js';

export function page(data) {
    return fetch({
        url: '/api/alarm/page',
        method: 'post',
        data: data
    })
}
