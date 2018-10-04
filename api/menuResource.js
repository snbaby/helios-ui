import {fetch} from '@/core/fetch.js';

export function add(data) {
    return fetch({
        url: '/api/menu-resource/add',
        method: 'post',
        data: data
    })
}

export function del(data) {
    return fetch({
        url: '/api/menu-resource/del',
        method: 'delete',
        data: data
    })
}
