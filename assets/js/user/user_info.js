$(function() {
    var form = layui.form
    var layer = layui.layer
    //// 1. 定义昵称校验规则
    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })
    initUserInfo()
    //// 获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.mag('获取用户信息失败！')
                }
                form.val('formUserInfo',res.data)
            }
        })

    }
 //// -重置 ：给form绑 reset 事件，给重置按钮绑定 click 事件
    $('#btnReset').on('click',function(e) {
        e.preventDefault()
        initUserInfo()

    })
    //// 监听表单的提交事件
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        //// 发送 ajax 
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(), ////serialize() - 快速获取表单信息
            success:function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                //// 子页面调用父页面的函数
                window.parent.getUserInfo()
            }
        })
    })
})