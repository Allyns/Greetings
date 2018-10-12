// pages/type1/type1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeList: [{ "type_name": "拜年", "level": 1, "seq": 1, "child_count": 13, "img": "ic1" }, { "type_name": "二十四节气", "level": 1, "seq": 2, "child_count": 24, "img": "ic2" }, { "type_name": "贺词", "level": 1, "seq": 3, "child_count": 9, "img": "ic3" }, { "type_name": "节日", "level": 1, "seq": 4, "child_count": 26, "img": "ic4" }, { "type_name": "日常问候", "level": 1, "seq": 5, "child_count": 9, "img": "ic5" }]
    },
    typeclick: function (e) {
        wx.navigateTo({
            url: `/pages/create/create?typename=${e.currentTarget.dataset.typename}`
        })
        console.log(e.currentTarget.dataset.typename);
    },
    setData: function (url) {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})