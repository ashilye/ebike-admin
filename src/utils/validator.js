export function validatorIdNumber (rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if(!value) {
        return callback(new Error ('请输入身份证号'))
    }else if(reg.test(value)){
        callback()
    }else {
        return callback(new Error('身份证号格式不正确'))
    }
}
export function validatorPhoneNumber (rule, value, callback) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if(!value){
        return callback(new Error('请输入手机号'))
    }else if(reg.test(value)){
        callback()
    }else {
        return callback(new Error('手机号格式不正确'))
    }
}




