import {fetch} from '@/core/fetch.js';

export function page(data) {
    return fetch({
        url: '/api/role/page',
        method: 'post',
        data: data
    })
}

export function add(data) {
    return fetch({
        url: '/api/role/add',
        method: 'post',
        data: data
    })
}

export function del(data) {
    return fetch({
        url: '/api/role/del',
        method: 'delete',
        data: data
    })
}

export function listRole() {
    return fetch({
        url: '/api/role/list',
        method: 'get',
    })
}
