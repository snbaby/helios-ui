import {fetch} from '@/core/fetch.js';

export function add(data) {
    return fetch({
        url: '/api/role-resource/add',
        method: 'post',
        data: data
    })
}

export function del(data) {
    return fetch({
        url: '/api/role-resource/del',
        method: 'post',
        data: data
    })
}

export function listRoleResource(data) {
    return fetch({
        url: '/api/role-resource/list',
        method: 'post',
        data: data
    })
}
