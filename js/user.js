$.ajaxPrefilter(function (res) {
            res.url='http://www.liulongbin.top:3007'+res.url
        })
$.ajax({type:'GET',url:'/my/userinfo',headers:{Authorization:localStorage.getItem('token')},success:function (res) {
                $('.login-name').val(res['data']['username'])
            }})
$(function () {
    let loginname=$('.login-name')
    let nickname=$('.nickname')
    let email=$('.email')
    let id
    let name
    let nick
    let e
    $('.reset').on('click',function (event) {
            event.preventDefault()
            loginname.val(name)
            nickname.val(nick)
            email.val(e)
    })
    $.ajax({type:'GET',
        url:'/my/userinfo',
        headers:{Authorization:localStorage.getItem('token')},
        success:function (res) {
            nickname.val(res['data'].nickname)
            email.val(res['data'].email)
            id=res['data'].id
            name=res['data'].username
            nick=res['data'].nickname
            e=res['data'].email
        }})
    $('form').on('submit',function (event) {
    event.preventDefault()
    let pcp=$('.prompt-contain p')
    if (nickname.val().length<1 || nickname.val().length>6){
        pcp.text('填入正确的用户昵称')
    }
    if (nickname.val().length===0){
        pcp.text('填入邮箱地址')
    }
    else {
        console.log('hellow')
        $.ajax({type:'POST',url:'/my/userinfo',//发送修改信息
            headers:{Authorization:localStorage.getItem('token')},
            data:{id:id,//存储开始的name  id等信息
                nickname:nickname.val(),
                email:email.val()},
            success:function (res) {
                pcp.text(res['message'])
                $('.prompt-contain').show(2000,function () {
                    window.parent.pagereload()//调用index里的函数
                })

            }})

    }
})
})


