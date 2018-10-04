import {fetch} from '@/core/fetch.js';

export function menuTree(data) {
    return fetch({
        url: '/api/menu/tree',
        method: 'get'
    })
}

export function authTree(data) {
    return fetch({
        url: '/api/menu/auth-tree',
        method: 'get',
        params: data
    })
}
