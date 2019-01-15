Page({
  data: {
    visible1: false,
  },
  openAbout:function(){
    wx.navigateTo({
      url: '/pages/function1/aboutus/aboutus',
    })
  },
  opentime: function () {
    wx.navigateTo({
      url: '/pages/function1/timeline/timeline',
    })
  },
  openCollect() {
    this.setData({
      visible1: true
    });
  },
  closeCollect() {
    this.setData({
      visible1: false
    });
  },
  openViewLog() {
    wx.getStorage({
      key: 'todolist',
      success: function (res) {
        console.log(res.data)
      }
    })

    // console.log(todolist);
    // wx.navigateTo({
    //   url: '/pages/function1/reminderdetail/reminderdetail',
    // })
  }
})