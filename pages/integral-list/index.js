import {slideupshow } from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listShowType:0, // 列表显示状态 0加载中 1有 2无
    getListArr: [

    ], //积分列表数组
    exchangeShow : false,//点击兑换按钮弹层
    exchangeId:0,//兑换id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getDataList();//获取积分活动列表

  },
  
  //点击兑换按钮
  exchangeFn(e){
    let that = this;
    if(e.currentTarget.dataset.status==1){
       //出现兑换弹框
      that.setData({
        exchangeId:e.currentTarget.dataset.id,
        exchangeShow:true
      })
    }else if(e.currentTarget.dataset.status==2){
        wx.navigateTo({
          url:`/pages-focus/address/index?exchangeId=${e.currentTarget.dataset.id}`,
          success: (result) => {
            that.setData({
              exchangeShow:false
            })
          },
          fail: (res) => {},
          complete: (res) => {},
        })
    }
  },
  //点击取消按钮
  onClose() {
    this.setData({ exchangeShow: false });
  },
  // 点击确定按钮
  confirmFn(){
    let that = this;
    getApp()
    .globalData.api.goodsExchange({
      March_Token:wx.getStorageSync('token'),
      g_id:that.data.exchangeId
    }).then(res=>{
        if(res.errCode==200){
          wx.showToast({ title: '兑换成功', icon: "none" });
        }else if(res.errCode==40012){
          wx.showToast({ title: '库存不足', icon: "none" });
        }else if(res.errCode==40011){
          wx.showToast({ title: '积分不足', icon: "none" });
        }else{
          wx.showToast({ title: res.errMsg, icon: "none" });
        }
        setTimeout(() => {
          that.setData({
            exchangeShow:false
          })
        }, 500);
    })
    
  },
  //获取积分活动列表
  getDataList(){
    let that=this;
    // wx.showLoading({
    //   title: '加载中',
    // })
    getApp()
        .globalData.api.goodsList({
          March_Token:wx.getStorageSync('token'),
        }).then(res=>{
          if (res.errCode == 200){
            that.setData({
              getListArr: res.data,
              listShowType: res.data.length>0 ? 1 : 2
            });
              // wx.hideLoading()
          }else{
           wx.showToast({ title: res.errMsg, icon: "none" });
          }
        })
  },
  //跳转到兑换列表
  backFn(){
    wx.navigateTo({
      url: '/pages-focus/record/index',
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
    this.getDataList();//获取积分活动列表
    // 淡入
    setTimeout(function () {
      slideupshow(this, 'slide_up1', 0, 1,0)
    }.bind(this), 500);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    slideupshow(this, 'slide_up1', 200, 0,0)
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