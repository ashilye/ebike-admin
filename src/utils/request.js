import config from '../config/net.config';
import axios from 'axios';
import router from 'vue-router';

// 进行一些全局配置
// 公共路由(网络请求地址)
axios.defaults.baseURL = 'http://localhost:8080/api';
// 请求响应超时时间
axios.defaults.timeout = config.requestTimeout;
// 配后端数据的接收方式
axios.defaults.headers.post['Content-Type'] = config.contentType;

axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);

        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code !== '0') { //请求错误
            router.push({
                path: '/login',
                querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
            })
        }
        return response;
    },
    err => {
        return Promise.reject(err)
    });

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

