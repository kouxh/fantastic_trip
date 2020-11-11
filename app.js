//app.js
import api from "/api/api";
import { setStorage } from "utils/util";
App({
  onLaunch: function () {
    let that=this;
    // 展示本地存储能力
    // wx.setStorageSync('logs', logs)
    var isWxWork = false;
    wx.getSystemInfo({
      success(res) {
        console.log(res.environment);
        isWxWork = res.environment == 'wxwork';
        if (!isWxWork) {
            // 当前环境不是企业微信，怎么处理你随便
            wx.showToast({
              title: '请在企业微信中使用该小程序',
              icon: "none",
            })
            return;
        }
        
        // 当前环境是企业微信，执行登陆，获取用户 code，用于后面的权限校验
        wx.qy.login() //重新登录
      }
    })

    // 登录
    wx.qy.login({
      success: function(res) {
        console.log(res,'------------')
        if (res.code) {
          wx.showToast({
            title: res.code,
            icon: "none",
          })
          wx.qy.getEnterpriseUserInfo ({
            success: function(res) {
              console.log(res,'----------------')
              var userInfo = res.userInfo
              var name = userInfo.name
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
            }
          })
          // 发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    wx.qy.checkSession({
      success: function(res){
        console.log(res,'-------------')
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function(res){
        // session_key 已经失效，需要重新执行登录流程
        wx.qy.login() //重新登录
      }
    });
    
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log( this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    // 判断是否是机型
    wx.getSystemInfo({
      success(res) {
        if (
          res.model.indexOf('iPhone X') != -1 ||
          res.model.indexOf('iPhone 11') != -1 ||
          res.model.indexOf('iPhone 12') != -1
        ) {
          that.globalData.isIphoneX = true;
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    api, //请求方法封装
    isIphoneX: false, // 是否属于iPhone X系列
  }
})