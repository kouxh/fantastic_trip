Component({
   // 组件的属性列表
   properties: {
    typeName: {
      type: String,
    } // 用户手机号
  },
  /**
   * 页面的初始数据
   */
  data: {
    changeShow:true,//控制弹出的显示隐藏
    // typeName:'头条号'
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
      let myEventDetail = { // 需要传递什么数据就在这个对象中写
        changeShow: false
      }
      // myEventDetail 对象，提供给事件监听函数的参数数据
      // close 是自定义名称事件，父组件中监听使用
      this.triggerEvent('close', myEventDetail)
    },
    //点击去修改跳转
    changeFn(){
      wx.navigateTo({
        url: `/pages-focus/no-concern/index?name=${this.data.typeName}&isPopup=true`,
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