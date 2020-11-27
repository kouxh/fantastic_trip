import { sliderightshow } from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //点击返回按钮
  // backFn(){
  //   wx.switchTab({
  //     url: '/pages/overall/index',
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that =this;
    setTimeout(() => {
      sliderightshow(that, 'slide_up', -200, 1)
    }, 200);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let that =this;
    sliderightshow(that, 'slide_up', 400, 1)
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