          
// 时间戳转日期
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 时间戳转日期
// const util = require('../../utils/util.js')
// return util.formatTime(new Date(log))
/**
 * 
 * url  要跳转的路径
 * path 从哪个页面过来的 1首页 2 联系 3 我的
 * isLogin 判断是否授权
 * type 跳转方式 1wx.navigateTo 2 wx.switchTab 3wx.redirectTo 4 wx.reLaunch
 */
function checkLogin (url,path,isLogin,type){
  let bindPhone = wx.getStorageSync('bindPhone');
  let token = wx.getStorageSync('userInfoData').token;
  wx.getSetting({
    success: res => {
      if ((!res.authSetting['scope.userInfo']  || token==undefined || bindPhone=='') && isLogin) {
        console.log('1111')
          wx.showToast({
            title: '关注更多精彩视频，请先授权登录！',
            icon: "none"
          })
            wx.reLaunch({
              url: '/pages/login/index',
            })
      }else{
          console.log('22222')
          if(type==1){
            wx.navigateTo({
              url: url,
            })
          }else if(type==2){
            wx.switchTab({
              url: url,
            })
          }else if(type==3){
            wx.redirectTo({
              url: url,
            })
          }else if(type==4){
            wx.reLaunch({
              url: url,
            })
          }
     
      }
    }
  })
}
// 【 将数据同时存入'global和storage'中 】
// 【 设置存储 】
// --- key 键
// --- value 值
// --- app GetApp()开发者可以通过 getApp 方法获取到全局唯一的 App 示例
function setStorage(key, value, app) {
  if (app != null) {
    app.globalData[key] = value;
  }
  wx.setStorageSync(key, value);
}
//渐入，渐出实现 
 function show(that,param,opacity){
  var animation = wx.createAnimation({
    //持续时间800ms
    duration: 800,
    timingFunction: 'ease',
  });
  //var animation = this.animation
  animation.opacity(opacity).step()
  //将param转换为key
  var json = '{"' + param + '":""}'
  json = JSON.parse(json);
  json[param] = animation.export()
  //设置动画
  that.setData(json)
}
  //滑动渐入渐出
  function slideupshow(that,param,px,opacity,rotate){
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).rotateY(rotate).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  }

  //向右滑动渐入渐出
   function sliderightshow (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  }


module.exports = {
  formatTime: formatTime,
  checkLogin:checkLogin,
  setStorage:setStorage,
  show:show,
  slideupshow:slideupshow,
  sliderightshow:sliderightshow,

}
