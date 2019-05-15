//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    latitude: 0,
    longitude: 0,
    imgUrls: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 5000,
    positionInfo: {name: '深圳'},
    navList: [{
        label: '打卡',
        icon: 'https://via.placeholder.com/30'
      }, {
        label: '资料',
        icon: 'https://via.placeholder.com/30'
      }, {
        label: '团队介绍',
        icon: 'https://via.placeholder.com/30'
      }, {
        label: '课程推荐',
        icon: 'https://via.placeholder.com/30'
      }, {
        label: '场馆信息',
        icon: 'https://via.placeholder.com/30'
      }, {
        label: '照片墙',
        icon: 'https://via.placeholder.com/30'
      }],
      newsList: [
        {
          title:'从零开始，走进瑜伽',
          time:'2019/5/15'
        },
        {
          title: 'xxxxxxxxxxx',
          time: '2019/5/15'
        }, 
        {
          title: 'xxxxxxxxxxxxxxxx',
          time: '2019/5/15'
        }],
      courseList: [
        {
          image: {
            imageUrl: '../../images/code-db-inc-dec.png',
            nums: 1
          },
          title: 'xxxxxxxxx',
          stars: 1,
          info: '调整肩颈疼痛、不适，改善圆肩驼背'
        }, {
          image: {
            imageUrl: '../../images/code-db-inc-dec.png'
          },
          title: 'xxxxxxxxx',
          stars: 1,
          info: '调整肩颈疼痛、不适，改善圆肩驼背'
        }
      ]
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    /**wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          });
          wx.getLocation({
            type: 'wgs84',
            success: res => {
              console.log(res)
              this.setData({
                latitude: res.latitude,
                longitude: res.longitude
              })
            }
          })
        }
      }
    })**/
  },

  /**onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  }**/

  
})
