import axios from 'axios';
import qs from 'qs'
import router from 'vue-router';
import global from '../config/global';

/**
 * @description 导出默认网路配置
 **/
const config = {
    //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
    contentType: 'application/json;charset=UTF-8',
    //最长请求时间
    requestTimeout: 6000,
    // 请求重试次数
    retry:3,
    // 请求重试时间间隔
    retryDelay:1000,
    // 是否重试
    shouldRetry:true,
    //
    withCredentials:true,
}

// 进行一些全局配置
// 公共路由(网络请求地址)
axios.defaults.baseURL = global.BASE_URL;
// 请求响应超时时间
axios.defaults.timeout = config.requestTimeout;
// 配后端数据的接收方式
axios.defaults.headers.post['Content-Type'] = config.contentType;
//跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
axios.defaults.withCredentials = config.withCredentials

// http request 拦截器
axios.interceptors.request.use(
    request => {
        request.data = JSON.stringify(request.data)
        request.paramsSerializer = (params) => {
            return qs.stringify(params, { indices: false })
        }
        return request
    },
    error => {
        return Promise.reject(error)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === '404') {
            router.push({
                path: '/login',
                querry: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转
            })
        }
        return Promise.resolve(response)
    },
    error => {
        return Promise.reject(error)
    }
)

/***
 * 封装 HTTP 请求
 * @param url
 * @param data
 * @return {Promise}
 */

function apiAxios (method, url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            headers: method === 'POST' || method === 'PUT' ? { 'Content-Type': 'application/json;charset=UTF-8' } : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function (res) {
            resolve(res)
        }).then(function (err) {
            reject(err)
        })
    })
}

export default {
    get: function (url, params) {
        return apiAxios('GET', url, params)
    },
    post: function (url, params) {
        return apiAxios('POST', url, params)
    },
    put: function (url, params) {
        return apiAxios('PUT', url, params)
    },
    delete: function (url, params) {
        return apiAxios('DELETE', url, params)
    }
}


/**
 * get 请求

 this.$api.get("/api/v1/...", data).then(response => {
  console.log(response)
})
 post 请求

 this.$api.post("/api/v1/...", data).then(response => {
  console.log(response)
})
 */

