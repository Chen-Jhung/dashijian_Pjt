$(function() {
    $('.link_sgin').on('click', function() {
        $('.sgin_box').hide()
        $('.reg_box').show()
    })

    $('.link_reg').on('click', function() {
        $('.sgin_box').show()
        $('.reg_box').hide()
    })

    //为表单添加验证规则
    //从layui 中获取 form对象
    let form = layui.form
        //从layui 中获取 layer对象 // 弹出框
    let layer = layui.layer
        //通过form.verify() 函数自定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],

            //校验两次密码的输入是否一致
            //通过形参拿到再次输入密码框的文本
            repwd: function(value) {
                //需要拿到第一个密码框的输入文本
                let pwdR = $('.pwdR').val()

                //判断两次密码输入是否一直
                if (value !== pwdR) {
                    return '两次密码输入不一致'
                }
            }
        })
        //监听表单的提交事件
    $('#form_reg').on('submit', function(e) {
            //阻止表单的默认提交行为
            e.preventDefault()
                //发起ajax的post请求
            $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')

                //注册成功后自动跳转到登录页面
                $('.link_reg').click()
            })
        })
        //监听登录表单的提交行为
    $('#form_sgin').submit(function(e) {
        //阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            //获取数据成功后
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                    //将登录成功后的token 字符串保存到localStorage 中
                localStorage.setItem('token', res.token)
                    //登录成功后自动跳转到主页
                location.href = '/index.html'
            }
        })
    })
})