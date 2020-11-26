import fetch from "./http";
export default {
  /**
   *登录
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  login(params) {
    return fetch.fetchGet("api/march/login", params);
  },
  /**
   *判断是否是VIP
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  checkUserVip(params) {
    return fetch.fetchGet("applets/forum/checkUserVip", params);
  },

}

// 获得充值单支付参数
// // 订单列表
// export const getOrderList = function (params) {
//   return fetch.fetchGet(mokeUrl + "api/user/v1/order/list", params);
// };