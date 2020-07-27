$(function () {
    $('#login-a').on('click', function () {
        $('.login-one').hide()
        $('.login-two').show()
    })
    $('#login-b').on('click', function () {
        $('.login-one').show()
        $('.login-two').hide()
    })

    // 表单验证
    var form = layui.form
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.login-two [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //发送请求
    //  注册
    var layer = layui.layer
    $("#form-two").on('submit', function (e) {
        //阻止默认行为
        e.preventDefault()
        var data = {
            username: $('#form-two [name="username"]').val(),
            password: $('#form-two [name="password"]').val()
        }
        $.post("http://ajax.frontend.itheima.net/api/reguser", data,
            function (res) {
                //返回值
                if (res.status !== 0) {
                    return layer.msg("注册失败")
                }
                layer.msg("注册成功")
                $('#login-b').click()
            })
    })
    //登录
    // 监听登录表单的提交事件
    $('#form_one').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
    $.ajaxPrefilter(function (options) {
        // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
})