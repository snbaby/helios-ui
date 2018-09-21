import axios from 'axios';
import ElementUI from 'element-ui';

import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from './axiosInitHelper';

// 创建axios实例
const service = axios.create({
    timeout: 5000,// 请求超时时间
    withCredentials: true
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    showFullScreenLoading();
    return config;
  },
  error => Promise.reject(error)
  ,
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    tryHideFullScreenLoading();
    return response.data;
  },
  (error) => {
    const resp = error.response;
    let message = '';
    if (resp && Object.prototype.hasOwnProperty.call(resp, 'data')) {
      if (resp.data.code === 'USER_NOT_LOGIN_EXCEPTION') {
        ElementUI.Message.error('请重新登录');
        tryHideFullScreenLoading();
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
        return Promise.reject(error);
      }
    }

    if (resp && Object.prototype.hasOwnProperty.call(resp, 'data')) {
      message = resp.data.description;
    } else {
      message = '服务器或网络异常，请稍后重试！';
    }
    ElementUI.Notification.error({
      title: '错误',
      message: `请求错误,${message}`,
    });
    tryHideFullScreenLoading();
    return Promise.reject(error);
  },
);

export const fetch = service;
