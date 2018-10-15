import {fetch} from '@/core/fetch.js';

export function login(data) {
    return fetch({
        url: '/auth/login',
        method: 'post',
        data: data
    })
}

export function logout() {
    return fetch({
        url: '/auth/logout',
        method: 'post'
    })
}

export function uptPassword(data) {
    return fetch({
        url: '/auth/update-password',
        method: 'post',
        data: data
    })
}
