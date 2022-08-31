$(function () {
    $('.main aside ul').on('click','li',function (event) {
        if ($(this).hasClass('hover-active')){
            $('.hover-active').removeClass('hover-active')
            $('.icon-xiangshang').removeClass('icon-xiangshang')
        }
        else {
            $('.hover-active').removeClass('hover-active')
            $(this).addClass('hover-active')
            let down=$(this).children('a').children('i')
            if(down.hasClass('icon-Chevron-down')){
            $('.icon-xiangshang').removeClass('icon-xiangshang')
            $(down).addClass('icon-xiangshang')
        }
        }


    })
    $('dl').on('mouseenter','dd',function (event) {
        $('.mouseenter').removeClass('mouseenter')
        $(this).addClass('mouseenter')
    }).on('click','dd',function (event) {
        event.stopPropagation()//dd和li是相同事件，所以在点击时候会冒泡
                                //触发li事件
        $('.now-place').removeClass('now-place')
        $(this).addClass('now-place')
    })
    $('li').first().on('click',function (event) {

        $('.icon-xiangshang').removeClass('icon-xiangshang')
        $('.now-place').removeClass('now-place')
        $(this).addClass('now-place')
    })
})

$(function () {
  $('.start').on('click',function () {
    $(this).attr('target','fm')
  })
    document.querySelector('.start').click()
})
$(function () {
    $('.mouse').on('mouseenter',function () {
        $('.person-center').show()
    }).on('mouseleave',function () {
        $('.person-center').hide()
    })
    $('.person-center').on('mouseenter','li',function () {

        $('.person-center .now-place').removeClass('now-place')
        $(this).addClass('now-place')
    })
})


function tell_fail() {
    alert('请先登录')
    location.href='http://localhost:63342/python/save/%E4%BD%9C%E5%93%81/web/%E5%AD%A6%E4%B9%A0%E6%A1%88%E4%BE%8B/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/login.html'
}

function avatar(user) {
    console.log(user)
    if (user['data'].nickname===''){
        $('#name').text(user['data'].username)
    }
    else {
        $('#name').text(user['data'].nickname)

    }
}

function obtain_info() {
    $.ajaxPrefilter(function (res) {//设置默认路径
        res.url='http://www.liulongbin.top:3007'+res.url
    })
    $.ajax({type:'GET',url:'/my/userinfo',headers:{Authorization:localStorage.getItem('token')},success:function (res) {
            if (res['status']===0){//身份验证
                avatar(res)
                $('.head-portrait img').attr('src',res['data']['user_pic'])//获取头像
                $('.mouse img').attr('src',res['data']['user_pic'])
            }
            else {tell_fail()}



        }})
}


$(function () {
    obtain_info()
    $('.exit').on('click',function () {//点击退出时候出现的事件
        $('.prompt-contain').attr('style','display:flex')
        $('.cancel').on('click',function () {
            $('.prompt-contain').attr('style','display:none')
        })
        $('.determine').on('click',function () {
            localStorage.removeItem('token')
            location.href='http://localhost:63342/python/save/%E4%BD%9C%E5%93%81/web/%E5%AD%A6%E4%B9%A0%E6%A1%88%E4%BE%8B/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/login.html'
        })
    })
})
function pagereload() {
    location.reload()
}


