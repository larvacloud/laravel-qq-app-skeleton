import request from './request'

/**
 * 获取用户基本资料
 * @return {promise}
 */
export function profile() {
    return request({
        method: 'GET',
        url: '/api/v1/user/profile'
    })
}

/**
 * 获取用户扩展资料
 * @return {promise}
 */
export function extra() {
    return request({
        method: 'GET',
        url: '/api/v1/user/extra'
    })
}