import {slideupshow } from "../../utils/util.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listShowType:0, // 列表显示状态 0加载中 1有 2无
    getListArr: [
      {
        id:1,
        cover:'http://img.deiyou.net/upload/seller/goods/image/2019/9/25/061b559c523a4fd6992545d33410caaf',
        name:'搜狐视频月会员',
        integral:100,
        stock:700,
      },
    ], //积分列表数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();////获取积分兑换列表
  },
  //获取积分兑换列表
  getDataList(){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    getApp()
        .globalData.api.orderList({
          March_Token:wx.getStorageSync('token'),
        }).then(res=>{
          if (res.errCode == 200){
            that.setData({
              getListArr: res.data,
              listShowType: res.data.length>0 ? 1 : 2
            });
              wx.hideLoading()
          }else{
           wx.showToast({ title: res.errMsg, icon: "none" });
          }
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
     // 淡入
     setTimeout(function () {
      slideupshow(this, 'slide_up1', 0, 1,0)
    }.bind(this), 500);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    slideupshow(this, 'slide_up1', 100, 1,0)
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