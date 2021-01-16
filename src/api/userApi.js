import axios from '@/utils/request'

export function userLogin(params){
    return axios.post('/antitheft/login/login.do',params)
}

export function userLogout(){
    return axios.get('/antitheft/login/logout.do')
}
