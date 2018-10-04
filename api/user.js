import {fetch} from '@/core/fetch.js';

export function page(data) {
    return fetch({
        url: '/api/user/page',
        method: 'post',
        data: data
    })
}

export function add(data) {
    return fetch({
        url: '/api/user/add',
        method: 'post',
        data: data
    })
}

export function del(data) {
    return fetch({
        url: '/api/user/del',
        method: 'delete',
        data: data
    })
}

export function listUser() {
    return fetch({
        url: '/api/user/list',
        method: 'get'
    })
}
