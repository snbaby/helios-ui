import {fetch} from '@/core/fetch.js';

export function page(data) {
    return fetch({
        url: '/api/pc/page',
        method: 'post',
        data: data
    })
}

export function list() {
    return fetch({
        url: '/api/pc/list',
        method: 'get'
    })
}