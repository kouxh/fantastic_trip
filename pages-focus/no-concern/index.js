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
    circleColor:'#ff62dc',//圆颜色
    model:false,//不同机型
    classId:'',//类型id
    isPopup:'',//是否从弹层跳转
    modeType:'ins',//ins提交 up修改
    popupName:'',//审核失败弹层类型名
    checkBool:false,//审核失败弹框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'---noconcern----')
    let that=this;
    if(options.isPopup){
      that.setData({
        isPopup:options.isPopup,
        modeType:'up'
      })
    }
    wx.getSystemInfo({
      success(res) {
       if(res.model=='iPhone 5'||res.model=='iPhone 6/7/8'||res.model=='iPhone 6'||res.model=='iPhone 7'||res.model=='iPhone 8'||res.model=='iPhone 6 Plus'||res.model=='iPhone 7 Plus'||res.model=='iPhone 8 Plus'){
         that.setData({
           model:true
         })

       }
      }
    })
    if(options.name=="抖音号"){
      that.data.typeName=options.name;
      that.data.bottomImg='https://march.yuanian.com/static/assets/img/icon/focus-trill.png';
      that.data.circleColor='#ff62dc';
      that.data.classId=2;
      // that.setData({
      //   typeName:options.name,
      //   bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-trill.png',
      //   circleColor:'#ff62dc',
      //   classId:2
      // })
    }else if(options.name=="头条号"){
      that.data.typeName=options.name;
      that.data.bottomImg='https://march.yuanian.com/static/assets/img/icon/focus-headline.png';
      that.data.circleColor='#ff5e4d';
      that.data.classId=1;
      // that.setData({
      //   typeName:options.name,
      //   bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-headline.png',
      //   circleColor:'#ff5e4d',
      //   classId:1
      // })
    }else if(options.name=="知乎号"){
      that.data.typeName=options.name;
      that.data.bottomImg='https://march.yuanian.com/static/assets/img/icon/focus-zhihu.png';
      that.data.circleColor='#16a5ff';
      that.data.classId=3;
      // that.setData({
      //   typeName:options.name,
      //   bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-zhihu.png',
      //   circleColor:'#16a5ff',
      //   classId:3
      // })
    }else if(options.name=="视频号"){
      that.data.typeName=options.name;
      that.data.bottomImg='https://march.yuanian.com/static/assets/img/icon/focus-video.png';
      that.data.circleColor='#ff8519';
      that.data.classId=5;
      // that.setData({
      //   typeName:options.name,
      //   bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-video.png',
      //   circleColor:'#ff8519',
      //   classId:5
      // })
    }else if(options.name=="喜马拉雅号"){
      that.data.typeName=options.name;
      that.data.bottomImg='https://march.yuanian.com/static/assets/img/icon/focus-himalaya.png';
      that.data.circleColor='#eb3f3f';
      that.data.classId=4;
      // that.setData({
      //   typeName:options.name,
      //   bottomImg:'https://march.yuanian.com/static/assets/img/icon/focus-himalaya.png',
      //   circleColor:'#eb3f3f',
      //   classId:4
      // })
    }
     that.setData({
        typeName:that.data.typeName,
        bottomImg: that.data.bottomImg,
        circleColor:that.data.circleColor,
        classId:that.data.classId
      })
  },
    // 获取子组件传递过来的数据
    closeFn(data){
      this.setData({
        checkBool:data.detail.changeShow
      })
    },
    //返回按钮
  backFn(){
      if(this.data.isPopup){
        let pages = getCurrentPages() //获取当前页面栈的信息
        let prevPage = pages[pages.length - 2] //获取上一个页面
        prevPage.setData({ //把需要回传的值保存到上一个页面
          close: "true"
        });
      }
      wx.navigateBack({
        delta: 1
      })
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
    let that=this;
    if(that.data.account==''){
      return wx.showToast({ title: "请输入账号", icon: "none" });
    }
    
    getApp()
        .globalData.api.addUserName({
          March_Token:wx.getStorageSync('token'),
          nickName:that.data.account,
          class_id:that.data.classId,
          mode:that.data.modeType
        }).then(res=>{
          if(res.errCode == 200){
            // 1审核中 2审核成功 3审核失败
            if(res.data.status==1){
              wx.showToast({ title: '提交成功,审核中', icon: "none" });
              // setTimeout(() => {
                wx.navigateTo({
                  url: `/pages-focus/check/index?name=${this.data.typeName}`,
                })
              // }, 1000);
            }else if(res.data.status==2){
              wx.navigateTo({
                url: `/pages-focus/pass-check/index?name=${this.data.typeName}`,
              })
            }
            else if(res.data.status==3){
              wx.showToast({ title: '审核失败', icon: "none" });
              setTimeout(() => {
                this.setData({
                  checkBool:true,
                  popupName:this.data.typeName
                })
              }, 1000);
              
            }
            
          }else if (res.errCode == 40035){
            wx.showToast({ title: '等待审核', icon: "none" });
          }else if (res.errCode == 40001){
           wx.showToast({ title: '参数为空', icon: "none" });
          } else if (res.errCode == 40030){
            wx.showToast({ title:'昵称已被占用', icon: "none" });
           }
           else if (res.errCode == 40029){
            wx.showToast({ title: "提交失败，请稍后重试哟！", icon: "none" });
           }else if(res.errCode == 40039){
            wx.showToast({ title: "此昵称已经提交过了，请更换昵称", icon: "none" });
           }
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
        //返回按钮
    if(this.data.isPopup){
      let pages = getCurrentPages() //获取当前页面栈的信息
      let prevPage = pages[pages.length - 2] //获取上一个页面
      prevPage.setData({ //把需要回传的值保存到上一个页面
        close: "true"
      });
      wx.navigateBack({
        delta: 1
      })
    }
    

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