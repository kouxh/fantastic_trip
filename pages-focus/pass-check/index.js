// pages/pass-check/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeName:'',//跳转参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'---------')
    if(options.name){
      this.setData({
        typeName:options.name
      })
    }
  },
   //返回按钮
   backFn(){
    if(this.data.typeName){
      wx.navigateBack({
        delta: 2
      })
    }else{
      wx.navigateBack({
        delta: 1
      })
    }
  },
  //点击下一步
  nextFn(){
    wx.switchTab({
        url: '/pages/own/index',
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
    // if(this.data.typeName){
    //   wx.navigateBack({
    //     delta: 2
    //   })
    // }else{
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // }
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