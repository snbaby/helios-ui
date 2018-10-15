import {fetch} from '@/core/fetch.js';

export function alarmPage(data) {
    return fetch({
        url: '/api/report/alarm/page',
        method: 'post',
        data: data
    })
}

export function leavePage(data) {
    return fetch({
        url: '/api/report/leave/page',
        method: 'post',
        data: data
    })
}

export function rebackPage(data) {
    return fetch({
        url: '/api/report/reback/page',
        method: 'post',
        data: data
    })
}

