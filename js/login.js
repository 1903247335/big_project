$.ajaxPrefilter(function (res) {
    res.url='http://www.liulongbin.top:3007'+res.url
})
$(function () {
    $('input').val('')
    //实现注册和登录切换
    $('.link_reg a').on('click',function () {
        $('.active').removeClass('active')
                    [0].reset()//切换的时候重置表格内容
        $('.reg-box').addClass('active')
                    [0].reset()})
    $('.link_login a').on('click',function () {
        $('.active').removeClass('active')
                    [0].reset()
        $('.login-box').addClass('active')
                    [0].reset()
    })
})

//用于登录
$(function () {
    //用于表单验证
    $('.login-box').on('submit',function (event) {
        event.preventDefault()
        let username=$('.login-box .username input')
        let password=$('.login-box .password input')
        if (username.val().trim().length===0){
            username.focus()
            $('.error').text('请输入账号').fadeIn(1000,function () {
                $(this).fadeOut(2000)
            })
        }
        else if (password.val().trim().length===0){
            password.focus()
            $('.error').text('请输入密码').fadeIn(1000,function () {
                $(this).fadeOut(2000)
            })
        }
        else {$.ajax({
            type:'POST',
            url:'/api/login',
            data:$('.login-box').serialize(),
            success:function (res) {
                if (res.status!==0){
                    $('.error').text(res.message).fadeIn(1000,function () {$(this).fadeOut(2000)})
                }
                else {$('.error').text(res.message).fadeIn(1000,function () {$(this).fadeOut(2000)})}
            }
            
        })}
    })

})

//用于注册

$(function () {
    $('.reg-box').on('submit',function (event) {
        event.preventDefault()
        let username=$('.reg-box .username input')
        let password=$('.reg-box .password input')
        let repassword=$('.reg-box .repeat-password input')
        let pwd=/\S{6,12}/
        if (username.val().trim().length===0){
            console.log(username.val())
            username.focus()
            $('.error').text('请输入账号').fadeIn(1000,function () {
                $(this).fadeOut(2000)
            })
        }
        else if (password.val().trim().length===0){
            password.focus()
            $('.error').text('请输入密码').fadeIn(1000,function () {
                $(this).fadeOut(2000)
            })
        }
        else if (repassword.val().trim().length===0){
            repassword.focus()
            $('.error').text('请再次输入密码').fadeIn(1000,function () {
                $(this).fadeOut(2000)
            })
        }
        else if(password.val()!==repassword.val()){
            $('.error').text('密码不统一').fadeIn(1000,function () {
                $(this).fadeOut(2000)
            })
        }
        else if(!pwd.test(password.val())){
            $('.error').text('密码要求6-12位').fadeIn(1000,function () {
                $(this).fadeOut(2000)
            })
        }
        else {
                $.ajax({type:'POST',url:'/api/reguser',data:$('.reg-box').serialize(),success:function(res){
                    if (res.status===0){
                        $('.error').text('注册成功').fadeIn(1000,function () {$(this).fadeOut(2000,function () {
                            window.location.reload()
                        })})
                    }
                    else {
                        $('.error').text(res.message).fadeIn(1000,function () {$(this).fadeOut(2000)})
                    }
                    }})

        }


    })









})






















