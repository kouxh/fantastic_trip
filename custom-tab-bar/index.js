Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/overall/index",
        iconPath: "/assets/img/icon/overall.png",
        selectedIconPath: "/assets/img/icon/overall.png",
        text: "全局"
      },
      {
        pagePath: "/pages/own/index",
        iconPath: "/assets/img/icon/own.png",
        selectedIconPath: "/assets/img/icon/own.png",
        text: "我的行军图"
      },
      {
        pagePath: "/pages/ranking/index",
        iconPath: "/assets/img/icon/ranking.png",
        selectedIconPath: "/assets/img/icon/ranking.png",
        text: "排行榜"
      },
      {
        pagePath: "/pages/integral/index",
        iconPath: "/assets/img/icon/integral.png",
        selectedIconPath: "/assets/img/icon/integral.png",
        text: "积分兑换"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      console.log(e,'---------')
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})