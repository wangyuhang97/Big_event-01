$(function() {
    var layer = layui.layer
    var form = layui.form
    initArt() 
    function initArt() {
        $.ajax({
            url:'/my/article/cates',
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('成功')
                //// 调用渲染函数
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })

    }
    var indexA = null
    $('#btnLB').on('click',function() {
        indexA = layer.open({
            type:1,
            area:['500px','250px'],
            title:'添加文章分类',
            content:$('#addForm').html()
        })
    })
    //// 通过代理的形式，为 #form-add表单绑定submit事件
    $('body').on('submit','#form-add',function(e) {
        e.preventDefault()
        console.log(123);
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArt()
                layer.close(indexA)

            }
        })
    })
    //// 
    var indexE = null
    $('tbody').on('click','.btn-edit',function() {
        indexE = layer.open({
            type:1,
            area:['500px','250px'],
            title:'修改文章分类',
            content:$('#dialog-edit').html()
            
        })
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            method:'GET',
            url:"/my/article/cates/" + id,
            success:function(res) {
                form.val('form-edit',res.data)
                console.log(res);
                console.log(951);
                
                
            }
        })
    })
    //// 代理方式为修改分类的表单绑定 submit 事件
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArt()
                layer.close(indexE)

            }
        })
    })
    //// 删除功能
    $('body').on('click','.btn-delete',function() {
        var id = $(this).attr('data-id')
        //提示用户是否删除
        layer.confirm('是否确认删除？',{icon:3,title:'提示'},function(index) {
            layer.close(index)
            $.ajax({
            url:'/my/article/deletecate/' + id,
            data:$(this).serialize(),
            success:function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                
                layer.close(index)
                initArt()

            }
        })
        })
        
    })
})