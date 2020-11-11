Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/overall/index",
        iconPath: "/assets/img/icon/icon_API.png",
        selectedIconPath: "/assets/img/icon/icon_API_HL.png",
        text: "全局"
      },
      {
        pagePath: "/pages/own/index",
        iconPath: "/assets/img/icon/icon_component.png",
        selectedIconPath: "/assets/img/icon/icon_component_HL.png",
        text: "我的行军图"
      },
      {
        pagePath: "/pages/ranking/index",
        iconPath: "/assets/img/icon/icon_API.png",
        selectedIconPath: "/assets/img/icon/icon_API_HL.png",
        text: "排行榜"
      },
      {
        pagePath: "/pages/integral/index",
        iconPath: "/assets/img/icon/icon_component.png",
        selectedIconPath: "/assets/img/icon/icon_component_HL.png",
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