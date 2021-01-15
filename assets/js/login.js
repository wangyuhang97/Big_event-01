$(function() {
    $('#link_reg').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
//// 从layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //// 自定义规则
        pwd:[/^[\S]{6,12}$/,'密码必须为6-12位，且不能出现空格'],
        repwd:function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if(value !== pwd) {
                return '俩次密码输入不一致'
            }
        }
    })
    $('#form-reg').on('submit',function(e) {
        e.preventDefault()
        var data = {username:$('.reg-box [name=username]').val(),
                    password:$('.reg-box [name=password]').val()}
        $.post('/api/reguser',data,function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#link_login').click()
        })
    })
    $('#form-login').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method :'POST',
            url: '/api/login',
            data:$(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    console.log(res);
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                location.href = '/index.html'
                localStorage.setItem('token',res.token)
            }
        })

    })
})