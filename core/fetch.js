import ElementUI from 'element-ui';
import axios from 'axios';
import {
    showFullScreenLoading,
    tryHideFullScreenLoading,
} from './axiosInitHelper';

// 创建axios实例
const service = axios.create({
    timeout: 5000 // 请求超时时间
});


// request拦截器
service.interceptors.request.use(config => {
    config.timeout = 20000;
    let token = sessionStorage.getItem("token");

    if (config.url != '/api/auth/jwt/token' && token && token.length > 64) {
        config.headers['Authorization'] = sessionStorage.getItem("token");
    }
    showFullScreenLoading();
    return config;
}, error => {
    console.log(error); // for debug
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        tryHideFullScreenLoading();
        const res = response.data;
        if (response.status === 401 || res.status === 40101) {
            ElementUI.Message.warning({
                message: '你的登录已过期，请重新登录！'
            });
            window.location.href = "/login";
            return Promise.reject('error');
        }

        if (!Array.isArray(res) && res.hasOwnProperty("message")) {
            if (res.message.indexOf("User token expired") >= 0) {
                ElementUI.Message.warning({
                    message: '你的登录已过期，请重新登录！'
                });
                window.location.href = "/secret/login";
            }
        }

        if (res.status === 429) {
            ElementUI.Message.warning({
                message: '访问频次太高了，稍后重试!'
            });
            return Promise.reject('error');
        }
        if (res.status === 40301) {
            ElementUI.Message.warning({
                message: '当前用户无相关操作权限！'
            });
            return Promise.reject('error');
        }
        if (response.status !== 200 && res.status !== 200) {
            ElementUI.Message.error({
                message: res.message || response.message
            });
            return Promise.reject('error');
        } else {
            return response.data;
        }
    },
    error => {
        tryHideFullScreenLoading();
        const response = error.response;
        if (response.status === 401 || response.status === 40101) {
            ElementUI.Message.warning({
                message: '你的登录已过期，请重新登录！'
            });
            window.location.href = "/login";
        }

        console.log('err' + error); // for debug
        return Promise.reject(error);
    }
);

export const fetch = service;

const fnObjFlat = function (prefix, json, cbItem, isArr) {
    for (let key in json) {
        let val = json[key];
        let kk = prefix;
        if (!isArr) {
            kk = prefix + "." + key;
        }
        if (Array.isArray(val)) {
            fnObjFlat(kk, val, cbItem, true);
        } else if (typeof(val) == 'object') {
            fnObjFlat(kk, val, cbItem);
        } else {
            kk = kk.substring(1);
            cbItem(`${kk}=${val}`);
        }
    }
}

/*
服务请求参数转换json to param
*/
export const json2Param = function (data) {
    let result = '';
    fnObjFlat("", data, (item) => {
        result += '&' + item;
    });

    return result.substring(1);
};
