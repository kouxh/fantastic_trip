// pages-focus/rank-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      rankData:[
        // {ranking:1,name:'张三',integral:100},
        // {ranking:2,name:'张三',integral:100},
        // {ranking:3,name:'张三',integral:100},
        // {ranking:4,name:'张三',integral:100},
        // {ranking:5,name:'张三',integral:100},
        // {ranking:6,name:'张三',integral:100},
        // {ranking:7,name:'张三',integral:100},
        // {ranking:8,name:'张三',integral:100},
        // {ranking:9,name:'张三',integral:100},
        // {ranking:10,name:'张三',integral:100},
      ],//前十的排名
      oneselfData:{},//自己的排名
      time:'',//截止时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //获取排行榜列表
   getDataList(){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    getApp()
        .globalData.api.rankingList({
          March_Token:wx.getStorageSync('token'),
        }).then(res=>{
          if (res.errCode == 200){
            that.setData({
              rankData: res.data.top,
              oneselfData:res.data.user_rank,
              time:res.data.time
            });
            // console.log(res.data.top.sort(function (a, b) {
            //   return b.u_real_integral-a.u_real_integral;
            // }),'------')
            wx.hideLoading()
          }else{
           wx.showToast({ title: res.errMsg, icon: "none" });
          }
        })
  },


  // 点击规则按钮跳转
  ruleFn(){
    wx.navigateTo({
      url: '/pages-focus/rule/index',
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
    this.getDataList(); //获取排行榜列表
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