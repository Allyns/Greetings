//index.js
//获取应用实例
var app = getApp();
let typename = "";
Page({
    data: {
        typeList: {},
        query: {
            relationTypeName: '',
        },
        hidden: true,
        ckType: ""
    },
    onLoad: function (parameter) {
        console.log(parameter.typename);
        typename = parameter.typename;
        console.log(typename);
        this.getDate(`https://m.hchezhu.com/api/zf.ashx?typename=${typename}`);
    },
    getDate: function (path) {
        var stat = this;
        wx.showToast({
            title: '加载分类中',
            icon: 'loading'
        });
        wx.request({
            url: path,
            method: 'GET',
            success: function (ret) {
                console.log(ret.data.result)
                stat.setData({
                    typeList: ret.data.result
                })
                wx.hideToast();
            }
        })
    },
    tapRelation: function (e) {
        this.setData({
            'query.relationTypeName': e.currentTarget.dataset.id,
            ckType: e.currentTarget.dataset.id
        });
        console.log(this.data.ckType)
    },
    changeToName(e) {
        let name = e.detail.value
        app.setToName(name)
    },
    generate: function (e) {
        let datas = e.detail.value;
        if (datas.toname == '') {
            wx.showToast({
                title: '称呼不能为空',
            })
        } else {
            if (this.data.ckType == '') {
                wx.showToast({
                    title: '请选择分类',
                })
            } else {
                app.clearWishes();
                let datas = e.detail.value;
                if (datas.toname) {
                    app.setToName(datas.toname);
                }
                wx.navigateTo({
                    url: `/pages/preview/preview?typename=${this.data.ckType}`
                })
            }

        }
    },
})

