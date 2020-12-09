Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDoudong: true, //控制图片抖动
    checkBool:false,//审核失败弹框
    developBool:false,//开拓弹框
    stationBool:false,//点击总站弹框
    getShowData:{},//获取数据
    typeName:'',//弹层类型名
    showData:[
      {
        id:1,
        img:'assets/img/icon/headline.png',
        num:2,
        className:'headline-icon',
        classNum:'headline-num',
        dataName:'头条号',
        dataType:'1'
      },
      {
        id:2,
        img:'assets/img/icon/trill.png',
        num:2,
        className:'trill-icon',
        classNum:'trill-num',
        dataName:'抖音号',
        dataType:'1'
      },
      {
        id:3,
        img:'assets/img/icon/zhihu.png',
        num:2,
        className:'video-icon',
        classNum:'zhihu-num',
        dataName:'知乎号',
        dataType:'1'
       
      },
      {
        id:4,
        img:'assets/img/icon/himalaya.png',
        num:2,
        className:'himalaya-icon',
        classNum:'himalaya-num',
        dataName:'喜马拉雅号',
        dataType:'1'
      },
      {
        id:5,
        img:'assets/img/icon/video.png',
        num:2,
        className:'zhihu-icon',
        classNum:'video-num',
        dataName:'视频号',
        dataType:'1'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
   
  },
  // 点击图标
  iconFn(e){
    console.log(e,'----')
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
             // type:10未关注 1 审核中 2审核成功 3 审核失败
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
   // 审核失败获取子组件传递过来的数据
   closeFn(data){
    this.setData({
      checkBool:data.detail.changeShow
    })
  },
  //获取首页信息
  getShow(){
    let that=this;
    getApp()
        .globalData.api.getShow({
          March_Token:wx.getStorageSync('token')
        }).then(res=>{
          if (res.errCode == 200){
            that.setData({
              getShowData:res.data
            })
            let isDevelop=wx.getStorageSync('isDevelop');
            if(res.data.user_follow.length==5 && isDevelop==''){
                that.setData({
                  developBool:true
                })
              wx.setStorageSync('isDevelop',true)
            }
          }else{
           wx.showToast({ title: res.errMsg, icon: "none" });
          }
        })
  },
  
  // 点击待开拓站点
  developFn(){
    wx.navigateTo({
      url: '/pages-focus/develop/index',
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
      that.getShow();// //获取首页信息
      //抖动相关的
        setTimeout(function(){
          that.setData({
            isDoudong: false
          })
        },3000)
        that.setData({
          isDoudong: true
        })
        const pages = getCurrentPages()
        const currPage = pages[pages.length - 1]  // 当前页
        if (this.data.close=="true") {
          this.setData({
            checkBool:false,
            close:''
          })
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