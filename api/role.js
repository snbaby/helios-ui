import {fetch} from '@/core/fetch.js';

export function page(data) {
    return fetch({
        url: '/api/role/page',
        method: 'post',
        data: data
    })
}
