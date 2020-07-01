import request from './request'
import config from '../config'

/**
 * 小程序登录，将 swan.login 获取的 code 和 swan.getUserInfo 获取的 user_info 一并提交给服务器
 * 如果社交账户的 code 验证通过，则user_info是可信的
 */
export function login(code, userInfo) {
    return request({
        method: 'POST',
        url: '/oauth/token',
        data: {
            grant_type: "mini-program",
            client_id: config.appId,
            client_secret: config.appSecret,
            provider: "qq_mini_program",
            code: code,
            user_info: {
                nickname : userInfo.nickName,
                avatar : userInfo.avatarUrl,
                gender:userInfo.gender
            }
        }
    })
}

export function logout() {
    if (getApp().globalData.userInfo) {
        getApp().globalData.userInfo = '';
        qq.reLaunch({
            url: '/pages/index/index'
        })
    } else {
        qq.showToast({
            title: '注销失败!',
            icon: 'warn',
            duration: 1000,
        });
    }
}