//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    attentionAnim: '',//动画
  },
  jumpFn:function(){
    console.log('000')
    wx.switchTab({
      url: '/pages/overall/index',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  onLoad: function () {
    // console.log(this.data.canIUse)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // getPhoneNumber (e) {
  //   console.log(e,'0000000000000')
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   console.log(e.detail.encryptedData)
  // }
  /**
   * 生命周期函数--监听页面初次渲染完成
  */
 onReady: function () {
  var attentionAnim = wx.createAnimation({
    duration:150,
    timingFunction: 'ease',
    delay: 0
  })
  //设置循环动画
  this.attentionAnim = attentionAnim
  var next = true;
  setInterval(function () {
    if (next) {
      //根据需求实现相应的动画
      this.attentionAnim.rotate(5).step()
      next = !next;
    } else {
      this.attentionAnim.rotate(-2).step()
      next = !next;
    }
    this.setData({
      //导出动画到指定控件animation属性
      attentionAnim: attentionAnim.export()
    })
  }.bind(this), 150)
},
})
