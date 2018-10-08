import {fetch} from '@/core/fetch.js';

export function page(data) {
    return fetch({
        url: '/api/detect/page',
        method: 'post',
        data: data
    })
}

export function add(data) {
    return fetch({
        url: '/api/detect/add',
        method: 'post',
        data: data
    })
}

export function del(data) {
    return fetch({
        url: '/api/detect/del',
        method: 'delete',
        data: data
    })
}

export function list() {
    return fetch({
        url: '/api/detect/list'
    })
}
