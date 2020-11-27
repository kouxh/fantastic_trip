// pages/integral/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: {},
    isDoudong: false, //控制图片抖动

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //抖动相关的
    setInterval(function() {
      let isDoudong = that.data.isDoudong
      that.setData({
        isDoudong: !isDoudong
      })
    }, 500)
  
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
    // if (typeof this.getTabBar === 'function' &&
    //     this.getTabBar()) {
    //     this.getTabBar().setData({
    //       selected: 3
    //     })
    //   }
    // 1: 创建动画实例animation:
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    var next = true;
    //连续动画关键步骤
    setInterval(function () {
      //2: 调用动画实例方法来描述动画
      if (next) {
        // animation.translateX(2).step();
        // animation.rotate(4).step()
        this.animation.rotateY(-10).scale(1.2, 1.2).step()
        next = !next;
      } else {
        // animation.translateX(-2).step();
        // animation.rotate(-4).step()
        this.animation.rotate(0).scale(1, 1).step()
        next = !next;
      }
      //3: 将动画export导出，把动画数据传递组件animation的属性 
      this.setData({
        animation: animation.export()
      })
    }.bind(this), 800)
  
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