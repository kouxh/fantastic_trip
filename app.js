//app.js
import api from "/api/api";
import { setStorage } from "utils/util";
App({
  onLaunch: function () {
    let that=this;
    let token=wx.getStorageSync('token');
    let isDevelop=wx.getStorageSync('isDevelop');
    wx.clearStorageSync(); // 首次进入，清除缓存
    if (token) {
      setStorage('token', token, that);
    }
    if (isDevelop) {
      setStorage('isDevelop', isDevelop, that);
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
        wx.qy.checkSession({
          success: function(res){
            console.log(res,'-----session_key-------')
            //session_key 未过期，并且在本生命周期一直有效
          },
          fail: function(res){
            // session_key 已经失效，需要重新执行登录流程
            // 当前环境是企业微信，执行登陆，获取用户 code，用于后面的权限校验
            // if(wx.getStorageSync('token')=='' || wx.getStorageSync('token')==undefined){
              // 登录
              wx.qy.login({
                success: function(res) {
                  console.log(res.code,'----res.code1------')
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
                        }else if(res.data.errCode==10043){
                          wx.removeStorageSync('token');
                          wx.removeStorageSync('isDevelop');
                          wx.qy.login()
                        }else{
                          wx.showToast({
                            title: res.data.errMsg,
                            icon: "none"
                          });
                        }
                      },
                      fail: function(res){
                        wx.showToast({
                          title: res,
                          icon: "none"
                        });
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
            // }else{
            //   console.log(wx.getStorageSync('token'),'----有token-----------')
            // }
        }
      })
      }
    })
    // 校验用户当前 session_key 是否有效
    // wx.qy.checkSession({
    //   success: function(res){
    //     console.log(res,'-----session_key-------')
    //     //session_key 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function(res){
    //     // session_key 已经失效，需要重新执行登录流程
    //     //  登录
    //       wx.qy.login({
    //         success: function(res) {
    //           console.log(res.code,'------res.code222222222-----------')
    //           if (res.code) {
    //           // 发起网络请求
    //             wx.request({
    //               url: 'https://march.yuanian.com/api/march/login',
    //               data: {
    //                 code: res.code
    //               },
    //               success:function(res){
    //                 if(res.data.errCode==200){
    //                   wx.setStorageSync('token', res.data.data.custom_token)
    //                 }else if(res.data.errCode==10043){
    //                   wx.removeStorageSync('token');
    //                   wx.removeStorageSync('isDevelop');
    //                   wx.qy.login()
    //                 }else{
    //                   wx.showToast({
    //                     title: res.data.errMsg,
    //                     icon: "none"
    //                   });
    //                 }
    //               },
    //               fail: function(res){
    //                 wx.showToast({
    //                   title: res,
    //                   icon: "none"
    //                 });
    //               }
    //             })
    //           } else {
    //             console.log('登录失败！' + res.errMsg)
    //           }
    //         },
    //         fail: function(res){
    //           console.log(res,'获取code失败')
    //         }
    //       });
    //   }
    // });
    
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
  // onShow:function(){
  //   if (wx.canIUse('getUpdateManager')) {
  //     const updateManager = wx.getUpdateManager()
  //     updateManager.onCheckForUpdate(function (res) {
  //       console.log(res.hasUpdate,'-----res.hasUpdate----')
  //       if (res.hasUpdate) {
  //         updateManager.onUpdateReady(function () {
  //           wx.showModal({
  //             title: '更新提示',
  //             content: '新版本已经准备好，是否重启应用？',
  //             success: function (res) {
  //               console.log(res.confirm,'res.confirm---------------')
  //               if (res.confirm) {
  //                 updateManager.applyUpdate()
  //               }
  //             }
  //           })
  //         })
  //         updateManager.onUpdateFailed(function () {
  //           wx.showModal({
  //             title: '已经有新版本了哟~',
  //             content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
  //           })
  //         })
  //       }
  //     })
  //   } else {
  //     wx.showModal({
  //       title: '提示',
  //       content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
  //     })
  //   }

  // },

  globalData: {
    api, //请求方法封装
    isIphoneX: false, // 是否属于iPhone X系列
  }
})