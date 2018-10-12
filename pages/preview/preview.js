const util = require('../../utils/util');
const app = getApp();

let o;

Page({
    data: {
        toname: '',
        relation: 1,
        sex: 1,
        today: '',
        sentday: '',
        sentence: '',
        wishesId: '',
        state: 0, //0 换一个, 1 制作我的祝福话
        showOverlay: false,
        typelist: {},
    },
    finishCard() {
        this.setData({
            state: '1'
        })
    },
    changeOne(e) {
        var that = this;
        // 点击事件，强制拉去数据
        var random = Math.floor(Math.random() * 20);

        console.log(this.data.typelist)
        that.setData({
            toname: app.getToName(),
            sentence: this.data.typelist[random].neirong,
            today: util.today()
        })
    },
    shareTips() {
        // let that = this;
        // this.setData({
        //     showOverlay: true
        // })
        // setTimeout(function () {
        //     that.hideOverlay()
        // }, 1500);
        wx.showToast({
            title: '右上角选择转发',
            image: '../../images/tap.png',
        })
    },
    hideOverlay() {
        this.setData({
            showOverlay: false
        })
    },
    // 调整到制作页面
    customCard() {
        wx.navigateTo({
            url: `/pages/create/create`
        })
    },
    //跳转到自定义页面
    bindViewTap() {
        if (this.data.state === '0') {
            app.setWishes(this.data.sentence);
            wx.navigateTo({
                url: `/pages/custom/custom?relation=${this.data.relation}&sex=${this.data.sex}`
            })
        }
    },
    onLoad: function (options) {
        wx.showShareMenu({
            withShareTicket: true
        })
        console.log('onLoad')
        console.log('options', options.typename);
        o = options;
    },
    onShow: function () {
        console.log('show')
        let that = this;
        console.log('进入制作页面')
        app.clearWishes(true);
        app.clearTempNickName();
        app.clearTempToName();
        // 初始化数据
        this.setData({
            toname: app.getToName(),
            today: util.today()
        })
        // 获取祝福话
        wx.showLoading({
            title: '加载中',
        })
        var stat = this;
        var path = "https://m.hchezhu.com/api/zf.ashx?typename=" + o.typename + "&page=1&rows=20";
        console.log('path=', path);
        wx.request({
            url: path,
            method: 'GET',
            success: function (res) {
                var random = Math.floor(Math.random() * 20);
                console.log(res.data.result[random].neirong);
                wx.hideLoading();
                stat.setData({
                    typelist: res.data.result,
                    toname: app.getToName(),
                    sentence: res.data.result[random].neirong,
                    today: util.today(),
                })
            }
        })
        // 获取用户信息
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })
        })
        //判断是否需要展示 点击跳转至自定义页面的提示
        let preview_custom_hint = wx.getStorageSync('preview-custom-hint') || false;
        this.setData({
            showCustomHint: preview_custom_hint
        })
    },
    onShareAppMessage() {
        this.hideOverlay();
        wx.hideLoading();
        return {
            title: `${this.data.userInfo.nickName}给您发来祝福`,
            desc: "你也可以制作祝福话送给TA哟！",
            path: `/pages/preview/preview?typename=${this.o.typename}&cktype=${this.data.sentence}`
        }
    },
    confirmCustomHint: function () {
        wx.setStorageSync('preview-custom-hint', true);
        this.setData({
            showCustomHint: true
        })
    }
})
