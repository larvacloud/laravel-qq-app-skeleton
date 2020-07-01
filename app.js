//app.js
import config from './config'
App({
  globalData: {
    appName: config.appName,
    systemInfo: {},
    userInfo: null
  },

  onLaunch: function (options) {
    console.log('生命周期函数--监听小程序初始化' + JSON.stringify(options))
    this.systemInfo();
    //this.checkSession();
    this.getUserInfo();

    // 小程序主动更新
    this.updateManager();
    console.log('App名称：' + this.globalData.appName)
    console.log('系统参数：' + JSON.stringify(this.globalData.systemInfo))
  },
  onShow: function () {
    console.log('生命周期函数--监听小程序显示')
  },
  onHide: function () {
    console.log('生命周期函数--监听小程序隐藏')
  },
  checkSession: function () {
    // 登录
    qq.login({
      success: res => {
        if (res.code) {
          api.auth.login({
            code: res.code,
          }).then(res => {
            qq.setStorageSync('openid', res.openid);
            qq.setStorageSync('access_token', res.access_token);
            qq.setStorageSync('session_key', res.session_key);
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserInfo: function () {
    // 获取用户信息
    qq.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          qq.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  updateManager: function () {
    // 获取小程序更新机制兼容
    if (qq.canIUse('getUpdateManager')) {
      const updateManager = qq.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            qq.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            qq.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      qq.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  systemInfo: function () {
    qq.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res;
      }
    });
  }

})
