$.ajaxPrefilter(function (res) {
    res.url='http://www.liulongbin.top:3007'+res.url
})
$(function () {
    let password=$('.password')
    let new_password=$('.new-password')
    $('form').on('submit',function (event) {
        event.preventDefault()
        if ($('.new-password').val()===$('.repassword').val()){
        $.ajax({type:'POST',url:'/my/updatepwd',
        header:{Authorization:localStorage.getItem('token')},
        data:{oldPwd:password.val(),newPwd:new_password.val()},
        success:function (res) {
            console.log(res)
            $('.prompt-contain p').text(res['message'])
            $('.prompt-contain').show(2000,function () {
                window.parent.pagereload()
            })
        }
    })}
        if ($('.new-password').val()===$('.password')){
            $('.prompt-contain p').text('旧密码和新密码不能相同')
            $('.prompt-contain').show(2000).hide(2000)
        }
        else {
            $('.prompt-contain p').text('新密码与确认密码不一致')
            $('.prompt-contain').show(2000).hide(2000)
        }

    })

})