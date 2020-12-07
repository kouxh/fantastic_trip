// pages/own/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDoudong: true, //控制图片抖动
    checkBool:false,//审核失败弹框
    stationBool:false,//点击总站弹框
    developBool:false ,//开拓弹框
    typeName:'',//弹层类型名
    isHeadline:true,//控制头条是否遮罩
    isTrill:true,//控制抖音是否遮罩
    isZhihu:true,//控制知乎是否遮罩
    isVideo:true,//控制视频是否遮罩
    isHimalaya:true,//控制喜马拉雅是否遮罩
    isDevelop:true,//待发展是否遮罩
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getShow();
  },
  //获取首页信息
  getShow(){
    let that=this;
    getApp()
        .globalData.api.getShow({
          March_Token:wx.getStorageSync('token')
        }).then(res=>{
          if (res.errCode == 200){
            let isHeadline = res.data.user_follow.find(c=>c.un_cid == 1);
            if(isHeadline){
              that.setData({
                isHeadline:false
              })
            }
            let isTrill = res.data.user_follow.find(c=>c.un_cid == 2);
            if(isTrill) {
              that.setData({
                isTrill:false
              })
            }
            let isZhihu = res.data.user_follow.find(c=>c.un_cid == 3);
            if(isZhihu){
              that.setData({
                isZhihu:false
              })
            }
            let isHimalaya = res.data.user_follow.find(c=>c.un_cid == 4);
            if(isHimalaya){
              that.setData({
                isHimalaya:false
              })
            }
            let isVideo = res.data.user_follow.find(c=>c.un_cid == 5);
            if(isVideo){
              that.setData({
                isVideo:false
              })
            }
            if(res.data.user_follow.length>=5){
                that.setData({
                  isDevelop:false,
                  // developBool:true
                })
            }
          }else{
           wx.showToast({ title: res.errMsg, icon: "none" });
          }
        })
  },
  // 点击总站触发事件
  stationFn(){
    this.setData({
      stationBool:!this.data.stationBool
    })
  },
  // 点击总站弹层关闭事件
  stationClose(data){
    this.setData({
      stationBool:data.detail.stationShow
    })
  },
  // 开拓弹出层
  developClose(e){
    this.setData({
      developBool:e.detail.developShow
    })
  },
  // 获取子组件传递过来的数据
  closeFn(data){
    this.setData({
      checkBool:data.detail.changeShow
    })
  },
  // 点击待开拓站点
  developFn(){
    wx.navigateTo({
      url: '/pages-focus/develop/index',
    })
  },

   // 点击图标
   iconFn(e){
    console.log(e,'--own-----------')
    this.getUserStatus(e.currentTarget.dataset.id,e.currentTarget.dataset.name)
  },
  //用户每个分类下的状态
  getUserStatus(classId,name){
    let that=this;
    getApp()
        .globalData.api.getUserStatus({
          March_Token:wx.getStorageSync('token'),
          class_id:classId
        }).then(res=>{
          if (res.errCode == 200){
             // type:0未关注 1 审核中 2审核成功 3 审核失败
              if(res.data.status==0){
                wx.navigateTo({
                  url: '/pages-focus/no-concern/index?name='+ name,
                })
              }else if(res.data.status==1){
                wx.navigateTo({
                  url: '/pages-focus/check/index',
                })
              }else if(res.data.status==2){
                wx.navigateTo({
                  url: '/pages-focus/pass-check/index',
                })
              }else if(res.data.status==3){
                this.setData({
                  checkBool:true,
                  typeName:name
                })
              }
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
    let that = this;
 
      //抖动相关的
        setTimeout(function(){
          that.setData({
            isDoudong: false
          })
        },3000)
        that.setData({
          isDoudong: true
        })
        if (this.data.close) {
          this.setData({
            checkBool:false,
            close:''
          })
          // this.data.close = '';
        }
      
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