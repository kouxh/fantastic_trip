// pages/no-concern/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',//账号
    typeName:'抖音号',//类型名
    url:'https://v.douyin.com/J91Reuy/  ',//复制链接
    bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-trill.png',//底部图片
    circleColor:'',//圆颜色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(options,'------')
    if(options.name=="抖音号"){
      that.setData({
        typeName:options.name,
        bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-trill.png',
        circleColor:'#ff62dc'
      })
    }else if(options.name=="头条号"){
      that.setData({
        typeName:options.name,
        bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-headline.png',
        circleColor:'#ff5e4d'
      })
    }else if(options.name=="知乎号"){
      that.setData({
        typeName:options.name,
        bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-zhihu.png',
        circleColor:'#16a5ff'
      })
    }else if(options.name=="视频号"){
      that.setData({
        typeName:options.name,
        bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-video.png',
        circleColor:'#ff8519'
      })
    }else if(options.name=="喜马拉雅号"){
      that.setData({
        typeName:options.name,
        bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-himalaya.png',
        circleColor:'#eb3f3f'
      })
    }
  },
  // 复制
  copyFn(e) {
    var code = e.currentTarget.dataset.copy;
    wx.setClipboardData({
      data: code,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: "none",
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '复制失败',
          icon: "none",
        });
      },
    });
  },
  submitFn(){
    // 请求提交接口请求成功跳转
    wx.navigateTo({
      url: `/pages-focus/check/index?name=${this.data.typeName}`,
    })

  },

  // 账号同步
  accountFn(e) {
    this.setData({ account: e.detail.value });
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