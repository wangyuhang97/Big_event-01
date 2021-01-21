$(function() {
    var form = layui.form
    // console.log(987);
    initEditor() // 初始化富文本编辑器
    initCate()
    //// 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            url:"/my/article/cates",
            success:function(res) {
                // console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                ////调用模板引擎
                var htmlStr = template('tpl-cate',res)
                $('#cate_id').html(htmlStr)
                form.render()
            }
        })

    }
      // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)

  $('#btnChooseImage').on('click',function() {
      $('#coverFile').click()
  })
  //// 监听 coverFile 的change 事件
  $('#coverFile').on('change',function(e) {
      var file = e.target.files[0]
      if(file === undefined) {
          return
      }
      var newImgURL = URL.createObjectURL(file)
//// 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
      $image.cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
  })

  ////定义文章的发布状态
  var state = '已发布'
  ////为存为草稿按钮，绑定点击事件
  $('#btnSave2').on('click',function() {
      state = '草稿'
  })

  ////表单的提交事件 
  $('#form-pub').on('submit',function(e) {
      e.preventDefault()
      ////创建 FormData 对象
      var fd = new FormData(this)
      fd.append('state',state)
      //// 生成二进制文件图片
      $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
              width: 400,
              height: 280
            })
            .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
              // 得到文件对象后，进行后续的操作
              fd.append('cover_img',blob)
              //   console.log(...fd);
                    //// ajax 必须在这个函数中发送，这个回调函数是个异步任务
                    
                    fawenz(fd) // 调用发布文章的方法
                    
            }) 
  })
//   //定义发布文章的方法
        function fawenz(fd) {
            $.ajax({
                method:'POST',
                url:'/my/article/add',
                data:fd,
                ////向服务器提交的 FormData 格式数据
                // 必须加这俩项
                contentType:false,
                processData:false,
                success:function(res) {
                    if(res.status !== 0) {
                       return layer.msg(res.message)
                    }   layer.msg(res.message)
                    //// 跳转
                    // location.href = '/article/art_list.html'
                    setTimeout(function() {
                        window.parent.document.getElementById('art_list').click()
                    },1500)
                    
                }
            })
        }
})