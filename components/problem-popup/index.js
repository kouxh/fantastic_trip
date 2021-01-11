Component({
  /**
   * 页面的初始数据
   */
  data: {
    problemShow:true,//控制弹出的显示隐藏
    value:''
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
      // close 是自定义名称事件，父组件中监听使用
      this.triggerEvent('problemClose',{ problemShow: false } )
    },
    // 点击提交按钮
    submitFn(){
      // 请求成功接口 成功后跳转
      let that =this;
      if(that.data.value==''){
        return wx.showToast({ title: "请输入内容", icon: "none" });
      }
      getApp()
          .globalData.api.feedbackMessage({
            March_Token:wx.getStorageSync('token'),
            content:that.data.value,
          }).then(res=>{
            if(res.errCode == 200){
              wx.showToast({ title: '提交成功', icon: "none" });
              setTimeout(() => {
                that.closeMask();
              }, 500);
            }else{
              wx.showToast({ title:res.errMsg, icon: "none" });
            }
          })
    },
       // 评论内容 同步
  inputValueFn(e) {
    this.setData({
      value: e.detail.value,
    })
  },
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