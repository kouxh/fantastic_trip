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

  //滑动渐入渐出
  slideupshow:function(that,param,px,opacity){
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).rotateY(360).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //向右滑动渐入渐出
  sliderightshow: function (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
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
  
},
//页面展示时，触发动画
onShow: function () {
  this.slideupshow(this, 'slide_up1', 250, 1)
  setTimeout(function () {
    this.slideupshow(this, 'slide_up1', 220, 1)
  }.bind(this), 1000);
},
//页面隐藏时，触发渐出动画
onHide: function () {
   //你可以看到，动画参数的200,0与渐入时的-200,1刚好是相反的，其实也就做到了页面还原的作用，使页面重新打开时重新展示动画
  this.slideupshow(this, 'slide_up1', -250, 0)
}
})
