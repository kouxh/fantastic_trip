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
   *获取首页信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getShow(params) {
    return fetch.fetchGet("api/march/get_show", params);
  },
  /**
   *用户添加昵称或修改昵称
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  addUserName(params) {
    return fetch.fetchGet("api/march/insert_and_up_user_nickname", params);
  },
  /**
   *用户每个分类下的状态
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getUserStatus(params) {
    return fetch.fetchGet("api/march/get_user_column_status", params);
  },
  /**
   *用户提交开拓意见
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  insertUserMessage(params) {
    return fetch.fetchGet("api/march/insert_user_message", params);
  },

}

// 获得充值单支付参数
// // 订单列表
// export const getOrderList = function (params) {
//   return fetch.fetchGet(mokeUrl + "api/user/v1/order/list", params);
// };