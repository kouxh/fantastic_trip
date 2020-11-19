// pages/own/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDoudong: true, //控制图片抖动
    reqEndBool: false, // 是否加载完成,可显示页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //抖动相关的
    // setInterval(function() {
      // let isDoudong = that.data.isDoudong
      setTimeout(function(){
        that.setData({
          isDoudong: false
        })
      },1000)
     
    // }, 1000)
  
  },
  // 点击待开拓站点
  developFn(){
    wx.navigateTo({
      url: '/pages-focus/develop/index',
    })
  },
  // 点击头条号
  headlineFn(e){
    wx.navigateTo({
      url: '/pages-focus/no-concern/index?name='+ e.currentTarget.dataset.name,
    })
  },
  //点击抖音号
  trillFn(e){
    wx.navigateTo({
      url: '/pages-focus/no-concern/index?name='+ e.currentTarget.dataset.name,
    })
  },
  // 点击视频号
  videoFn(e){
    wx.navigateTo({
      url: '/pages-focus/no-concern/index?name='+ e.currentTarget.dataset.name,
    })
  },
  //点击知乎号
  zhihuFn(e){
    wx.navigateTo({
      url: '/pages-focus/no-concern/index?name='+ e.currentTarget.dataset.name,
    })
  },
  //点击喜马拉雅号
  himalayaFn(e){
    wx.navigateTo({
      url: '/pages-focus/no-concern/index?name='+ e.currentTarget.dataset.name,
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
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
 
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