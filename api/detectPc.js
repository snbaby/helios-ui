import {fetch} from '@/core/fetch.js';

export function add(data) {
    return fetch({
        url: '/api/detect-pc/add',
        method: 'post',
        data: data
    })
}

export function del(data) {
    return fetch({
        url: '/api/detect-pc/del',
        method: 'delete',
        data: data
    })
}

export function page(data) {
    return fetch({
        url: '/api/detect-pc/page',
        method: 'post',
        data: data
    })
}
