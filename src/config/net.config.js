/**
 * @description 导出默认网路配置
 **/
const network = {
    //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
    contentType: 'application/json;charset=UTF-8',
    //最长请求时间
    requestTimeout: 6000,
    // 请求重试次数
    retry:3,
    // 请求重试时间间隔
    retryDelay:1000,
    // 是否重试
    shouldRetry:true
}
module.exports = network