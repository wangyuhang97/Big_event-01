$(function() {
    getUserInfo()
    //// 2. 推出登录
    var layer = layui.layer 
    $('#btnLogout').on('click',function() {
    //// 提示用户是否退出
        layer.confirm('是否确认退出登录?', {icon: 3, title:'提示'}, function(index){
            console.log(123);
            // 清空本地 token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = "/login.html"
            //// 关闭 confirm 询问框
            layer.close(index);
          });
    })
})
//// 获取用户的基本信息
    //// 必须是全局函数，后面其他页面还要用
function getUserInfo() {
    $.ajax({
        method:'GET',
        url:"/my/userinfo",
        // //// headers 请求头
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res) {
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
             }
            renderAvatar(res.data)
        },
        //// 移动到全局调用接口拼接处
        // complete:function(res) {
        //     console.log(1249135024);
        //     //// 在complete 函数中，可以使用 res.responseJSON 拿到响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //// 1 . 强制清空 token
        //         localStorage.removeItem('token')
        //         //// 2 . 强制跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    //// 渲染用户名
    var name = user.nickname || user.username
    $('#welcome').html("欢迎：" + name)
    //// 渲染头像
    if(user.user_pic !== null) {
        ////有头像
        $('.layui-nav-img').attr('src',user.user_pic);
        $('.text-avatar').hide()
    } else {
        //// 没有头像
        $('.layui-nav-img').hide()
        //// name[0]取到name数组中的第一项 
        ////            toUpperCase(),让字符串中的小写字母变成大写
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
    

}