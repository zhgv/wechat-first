const app = getApp();
Page({
  copy(){
    wx.setClipboardData({
      data: '誩哥哥说',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }
});
