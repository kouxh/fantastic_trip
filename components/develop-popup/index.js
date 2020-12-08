Component({
  /**
   * 页面的初始数据
   */
  data: {
    developShow:true,//控制弹出的显示隐藏
  },
  

  // 生命周期函数
  ready: function () {
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  methods: {
    //关闭弹层
    closeMask(){
      this.triggerEvent('developClose',{ developShow: false } )
    },
    //点击去修改跳转
    changeFn(){
      wx.navigateTo({
        url: `/pages-focus/develop/index`,
      })
      this.setData({
        developShow:false
      })
    }
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