var util = require("../../../utils/util.js");

const {
  $Message
} = require('../../../dist/base/index.js');
//更改数组 第三个参数是对象
function editArr(arr, i, editCnt) {
  let newArr = arr,
    editingObj = newArr[i];
  for (var x in editCnt) {
    editingObj[x] = editCnt[x];
  }
  return newArr;
}

//获取应用实例
var app = getApp()
Page({
  data: {
    open: false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    // windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',

    curIpt: '',
    showAll: true,
    lists: [],
    curRange: [],
    curBegin: 0,
    curFinish: 1,
    remind: [],
  },
  onLoad: function() {
    var that = this;
    //获取之前保留在缓存里的数据
    wx.getStorage({
      key: 'todolist',
      success: function(res) {
        if (res.data) {
          that.setData({
            lists: res.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // initData(this);
  },
  edit(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id),
      wx.navigateTo({
        url: '/pages/function1/edit/edit?id=' + id
      })
  },
  iptChange(e) {
    let timeArr = util.setTimeHalf();
    this.setData({
      curIpt: e.detail.value,
      curRange: timeArr
    })
  },
  formReset() {
    this.setData({
      curIpt: '',
      curRange: []
    })
  },
  formSubmit() {
    let cnt = this.data.curIpt,
      newLists = this.data.lists,
      i = newLists.length,
      begin = this.data.curRange[this.data.curBegin],
      finish = this.data.curRange[this.data.curFinish];
    if (cnt) {
      newLists.push({
        id: i,
        content: cnt,
        done: false,
        beginTime: begin,
        finishTime: finish,
        editing: false
      });
      this.setData({
        lists: newLists,
        curIpt: ''
      })
    }
  },
  beginChange(e) {
    this.setData({
      curBegin: e.detail.value,
      curFinish: Number(e.detail.value) + 1
    })
  },
  finishChange(e) {
    this.setData({
      curFinish: e.detail.value
    })
  },
 
  setDone(e) {
    let i = e.target.dataset.id,
      originalDone = this.data.lists[i].done;
    this.setData({
      lists: editArr(this.data.lists, i, {
        done: !originalDone
      })
    })
    // 保存数据
    let listsArr = this.data.lists;
    wx.setStorage({
        key: 'todolist',
        data: listsArr
      }),
      $Message({
        content: '任务状态改变',
        type: 'success'
      });
  },
  setdelete(e) {
    let index = e.target.dataset.id,
      newLists = this.data.lists;
    newLists.splice(index, 1);
    this.setData({
      lists: newLists
    })
    // 保存数据
    let listsArr = this.data.lists;
    wx.setStorage({
        key: 'todolist',
        data: listsArr
      }),
      $Message({
        content: '删除成功',
        type: 'error'
      });

  },

  doneAll() {
    let newLists = this.data.lists;
    newLists.map(function(l) {
      l.done = true;
    })
    this.setData({
      lists: newLists
    })
    // 保存数据
    let listsArr = this.data.lists;
    wx.setStorage({
      key: 'todolist',
      data: listsArr
    }),
      $Message({
        content: '任务全部完成',
        type: 'success'
      });
  },
  deleteAll() {
    this.setData({
      lists: [],
      remind: []
    })
    // 保存数据
    let listsArr = this.data.lists;
    wx.setStorage({
      key: 'todolist',
      data: listsArr
    }),
      $Message({
        content: '任务全部删除成功',
        type: 'warn'
      });
  },
  showUnfinished() {
    this.setData({
      showAll: false
    })
  },
  showAll() {
    //显示全部事项
    this.setData({
      showAll: true
    })
  }
})
