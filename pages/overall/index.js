// pages/overall/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadEnd: false,
    isDoudong: true, //控制图片抖动
    checkBool:false,//审核失败弹框
    developBool:false,//开拓弹框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //抖动相关的
    // setInterval(function() {
      // let isDoudong = that.data.isDoudong
      // setTimeout(function(){
      //   that.setData({
      //     isDoudong: false
      //   })
      // },1000)
     
    // }, 1000)
    // wx.showLoading({
    //   title: "加载中...",
    //   mask: true
    // });
    
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
  },
  // 点击待开拓站点
  developFn(){
    console.log('蒙层----')
    wx.navigateTo({
      url: '/pages-focus/develop/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (typeof this.getTabBar === 'function' &&
    //     this.getTabBar()) {
    //     this.getTabBar().setData({
    //       selected: 0
    //     })
    //   }
      let that = this;
      //抖动相关的
        setTimeout(function(){
          that.setData({
            isDoudong: false
          })
        },3000)
        that.setData({
          isDoudong: true
        })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})