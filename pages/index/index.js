import { slideupshow } from "../../utils/util.js";
//获取应用实例
const app = getApp()

Page({
  data: {
    code:'',
    isDoudong: true, //控制图片抖动
  },
  jumpFn:function(){
    let that=this;
    var isWxWork = false;
    wx.getSystemInfo({
      success(res) {
        isWxWork = res.environment == 'wxwork';
        if (!isWxWork) {
            // 当前环境不是企业微信，怎么处理你随便
            wx.showToast({
              title: '请在企业微信中使用该小程序',
              icon: "none",
            })
            return;
        }else{
          if(wx.getStorageSync('token')=='' || wx.getStorageSync('token')==undefined){
            console.log(wx.getStorageSync('token'),'----授权-----')
             wx.qy.login({
              success: function(res) {
                console.log(res.code,'--------index-----------')
                if (res.code) {
                  wx.showLoading({
                    title: "登录中...",
                    mask: true
                  });
                // 发起网络请求
                  wx.request({
                    url: 'https://march.yuanian.com/api/march/login',
                    data: {
                      code: res.code
                    },
                    success:function(res){
                      if(res.data.errCode==200){
                        wx.showToast({
                          title: '登录成功',
                          icon: 'success',
                          duration: 2000
                        });
                        wx.setStorageSync('token', res.data.data.custom_token)
                        wx.hideLoading();
                        wx.switchTab({
                          url: '/pages/overall/index',
                        })
                      }else{
                        wx.showToast({
                          title: res.data.errMsg,
                          icon: "none"
                        });
                      }
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              },
              fail: function(res){
                console.log(res,'获取code失败')
              }
            });
          }else{
            wx.switchTab({
              url: '/pages/overall/index',
            })
          }
         
        }
        
      }
    })
    
  },
  onLoad: function () {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
  */
 onReady: function () {
  
},
//页面展示时，触发动画
onShow: function () {
  let that=this;
  setTimeout(() => {
    slideupshow(that, 'slide_up1', 250, 1,360)
    setTimeout(function () {
    slideupshow(that, 'slide_up1', 220, 1,0)
    }.bind(that), 1000);
  }, 800);
      //抖动相关的
        setTimeout(function(){
          that.setData({
            isDoudong: false
          })
        },2000)
        that.setData({
          isDoudong: true
        })
  
  
},
//页面隐藏时，触发渐出动画
onHide: function () {
   //你可以看到，动画参数的200,0与渐入时的-200,1刚好是相反的，其实也就做到了页面还原的作用，使页面重新打开时重新展示动画
  slideupshow(this, 'slide_up1', -250, 0,0)
}
})
