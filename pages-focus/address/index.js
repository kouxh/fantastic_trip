const area = require('../../utils/area.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    areaShow:false,
    countyCode: '110101', //当前选中的省市区code 如：160000 160100
    areaList: Object.assign({}, area.default),
    areaStr: '', //选择的地址
    province_name:'',//省
    city_name:'',//市
    area_name:'',//区
    editorName: "", // 编辑 / 添加地址 昵称
    editorMobile: "", // 编辑 / 添加地址 手机号
    editorDetailed: "", // 编辑 / 添加地址 详细地址
    exchangeShow : false,//点击兑换按钮弹层
    exchangeId:0,//兑换id
    showMask:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      exchangeId: options.exchangeId,
    });
   
  },
//点击选择省市区
  areaFn(){
    this.setData({
      areaShow:true
    })
  },
   
  //点击遮罩层
  onClose(){
    this.setData({
      areaShow:false
    })
  },
//点击右上方完成按钮
  getArea: function(val) {
    if (val.detail.values.length >= 3) {
      let areaStr = val.detail.values[0].name + '/' + val.detail.values[1].name + '/' + val.detail.values[2].name;
      this.setData({
        areaStr:areaStr,
        province_name:val.detail.values[0].name,
        city_name:val.detail.values[1].name,
        area_name:val.detail.values[2].name
      })
    }
    this.setData({
      areaShow:false
    })
  },
//选项改变时触发
  showArea: function(val) {
  },
//点击关闭地址弹框
 colseArea: function() {
    this.setData({
      areaShow:false
    })
  },
  //编辑、添加领取杂志接口
  upAddressVip(){
    let that=this;
    if (that.data.editorName == "") {
      return wx.showToast({ title: "请输入收件人姓名", icon: "none" });
    }
    if (
      !/^1[3-9]\d{9}$/.test(that.data.editorMobile) ||
      that.data.editorMobile == ""
    ) {
      return wx.showToast({ title: "请输入正确手机号", icon: "none" });
    }
    if (that.data.areaStr == "") {
      return wx.showToast({ title: "请选择省市区", icon: "none" });
    }
    if (that.data.editorDetailed == "") {
      return wx.showToast({ title: "请输入详细地址", icon: "none" });
    }
    that.setData({ exchangeShow: true,showMask:true });
  },
   //点击取消按钮
   onCloseFn() {
    this.setData({ exchangeShow: false ,showMask:false});
  },
  // 点击确定按钮
  confirmFn(){
    let that = this;
    console.log(that.data.exchangeId,'----')
    getApp()
    .globalData.api.goodsExchange({
      March_Token:wx.getStorageSync('token'),
      g_id:that.data.exchangeId,
      consignee:that.data.editorName,
      tell:that.data.editorMobile,
      province:that.data.areaStr,
      address:that.data.editorDetailed
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
          wx.navigateBack({
            delta: 1
          })
          that.setData({
            exchangeShow:false,
            showMask:false
          })
        }, 500);
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

  },
   // 昵称 同步
   editorNameFn(e) {
    this.setData({
      editorName: e.detail.value
    });
  },

  // 手机号 同步
  editorMobileFn(e) {
    this.setData({
      editorMobile: e.detail.value
    });
  },

  // 详细地址 同步
  editorDetailedFn(e) {
    this.setData({
      editorDetailed: e.detail.value
    });
  },
 
})