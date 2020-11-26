    
    
// 使用import config from "./config.js";
module.exports = {
    // 是否线上环境 true正式 false测试
    isRelease() {
      return true;
    },
    // api请求域名
    getConfig() {
      if (this.isRelease()) {
        //正式
        return "https://march.yuanian.com/";
      } else {
        //测试
        return "https://march.yuanian.com/";
      }
    },
  
  };