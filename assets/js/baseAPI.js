var baseURL = 'http://api-breakingnews-web.itheima.net'
//// 在发送AJAX之前，会触发
// $.ajaxPrefilter(function(params) {
//     alert('123')
//     ////拼接对应环境的URL地址
//     params.url = baseURL + params.url
//     console.log(456);
// })
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  })