
let image=$('.img')
let option={aspectRatio:1,preview:'.preview-img'}
image.cropper(option)
$.ajaxPrefilter(function (res) {
    res.url='http://www.liulongbin.top:3007'+res.url
})




function send(data) {

    $.ajax({type:'POST',url:'/my/update/avatar',headers:{Authorization:localStorage.getItem('token')},
        data:{avatar:data},
        success:function (res) {//不能发送太大

            $('.prompt-contain p').text(res['message'])
            $('.prompt-contain').show(2000,function () {
                $(this).hide(2000,function () {
                    window.parent.pagereload()
                })

            })
        },

    })
}




$(function () {
    $('.pull').on('click',function () {
        $('.file').click()
    })

    $('.file').on('change',function (event) {
        let file=event.target.files[0]//获取地址
        let newUrl=URL.createObjectURL(file)//把地址转化为网址
        let reader=new FileReader()//更换头像
        image.cropper('destroy')//销毁之前路径
            .attr('src',newUrl)//重新设置路径
            .cropper(option)//重新初始化
        $('.confirm').on('click',function () {
            reader.readAsDataURL(file)//把网址转化为图片的字符串
            reader.onload=function (e) {//加载完毕
               send(reader['result'])//没有onload会让reader的result是null
        }
        })



    })
})

