var Fly = require("../libs/flyio/wx"); //wx.js为您下载的源码文件
var fly = new Fly(); //创建fly实例

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    response => {
        //只将请求结果的data字段返回
        return response.data;
    },
    err => {
        //发生网络错误后会走到这里
    }
);

export default {
    //fetchPost  请求方式
    fetchPost: function (url, params, options) {
        return new Promise((resolve, reject) => {
            fly
                .post(url, params, options)
                .then(
                    response => {
                        resolve(response);
                    },
                    err => {
                        this.errJumpFn(err);
                        reject(err);
                    }
                )
                .catch(error => {
                    reject(error);
                });
        });
    },

    //GET 请求方式
    fetchGet: function (url, params, options) {
        return new Promise((resolve, reject) => {
            fly
                .get(url, params, options)
                .then(
                    response => {
                        resolve(response);
                    },
                    err => {
                        this.errJumpFn(err);
                        reject(err);
                    }
                )
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 处理请求错误码
    errJumpFn(err) {
        console.log(err, "err-----请求错误----------------");
        // 401 未登录前往登录
        // if (err.status == 401) {
        //     wx.reLaunch({ url: "/pages/login/index" });
        // }
    }
};
