import config from '../config'

export default function request(params) {
    return new Promise((resolve, reject) => {
        swan.showLoading()
        swan.request({
            method: params.method || 'GET',
            url: config.baseUrl + params.url || '',
            data: params.data || {},
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${swan.getStorageSync('access_token')}`
            },
            success(res) {

                if(res.statusCode == 200) {
                    resolve(res.data || {});
                } else if(res.statusCode == 404) {
                    swan.showToast({
                        icon: 'none',
                        title: '服务接口不存在！'
                    });
                } else {
                    swan.showToast({
                        icon: 'none',
                        title: res.data.message || '服务器繁忙！'
                    });
                }
				reject({
					errCode:res.statusCode,
					errMsg:res.data.message
				})
            },
            fail(err) {
                reject(err)
            },
            complete() {
                swan.hideLoading()
            }
        })
    })
}