//app.js
import api from "/api/api";
import { setStorage } from "utils/util";
App({
  onLaunch: function () {
    let that=this;
    let token=wx.getStorageSync('token');
    wx.clearStorageSync(); // 首次进入，清除缓存
    if (token) {
      setStorage('token', token, that);
    }
    // 展示本地存储能力
    // wx.setStorageSync('logs', logs)
    var isWxWork = false;
    wx.getSystemInfo({
      success(res) {
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
        if(wx.getStorageSync('token')=='' || wx.getStorageSync('token')==undefined){
           // 登录
           wx.qy.login({
            success: function(res) {
              console.log(res.code,'----res.code------')
              if (res.code) {
              // 发起网络请求
                wx.request({
                  url: 'https://march.yuanian.com/api/march/login',
                  data: {
                    code: res.code
                  },
                  success:function(res){
                    if(res.data.errCode==200){
                      wx.setStorageSync('token', res.data.data.custom_token)
                    }else{
                      // wx.showToast({
                      //   title: res.data.errMsg,
                      //   icon: "none"
                      // });
                    }
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            },
            fail: function(res){
              console.log(res,'获取code失败')
            }
          });
        }else{
          console.log(wx.getStorageSync('token'),'---------------')
        }
        
      }
    })

    // 校验用户当前 session_key 是否有效
    wx.qy.checkSession({
      success: function(res){
        console.log(res,'-----session_key-------')
        //session_key 未过期，并且在本生命周期一直有效
        wx.qy.login();
      },
      fail: function(res){
        // session_key 已经失效，需要重新执行登录流程
        //  登录
          wx.qy.login({
            success: function(res) {
              console.log(res.code,'------res.code222222222-----------')
              if (res.code) {
              // 发起网络请求
                wx.request({
                  url: 'https://march.yuanian.com/api/march/login',
                  data: {
                    code: res.code
                  },
                  success:function(res){
                    if(res.data.errCode==200){
                      wx.setStorageSync('token', res.data.data.custom_token)
                    }
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            },
            fail: function(res){
              console.log(res,'获取code失败')
            }
          });
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
    api, //请求方法封装
    isIphoneX: false, // 是否属于iPhone X系列
  }
})