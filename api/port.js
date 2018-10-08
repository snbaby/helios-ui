import {fetch} from '@/core/fetch.js';

export function page(data) {
    return fetch({
        url: '/api/port/page',
        method: 'post',
        data: data
    })
}

export function add(data) {
    return fetch({
        url: '/api/port/add',
        method: 'post',
        data: data
    })
}

export function del(data) {
    return fetch({
        url: '/api/port/del',
        method: 'delete',
        data: data
    })
}

export function list(param) {
    return fetch({
        url: '/api/port/list',
        method: 'get',
        params: param
    })
}
