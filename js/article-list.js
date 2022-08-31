$.ajaxPrefilter(function (res) {
    res.url='http://www.liulongbin.top:3007'+res.url
    res.headers={Authorization:localStorage.getItem('token')}
})



$.ajax({type:'GET',url:'/my/article/list',
    data:{pagenum:10,pagesize:2,cate_id:'',state:''},
    success:function (res) {
        console.log(res)
    }
})

$('.select a').on('click',function () {





   $('.select ul').slideDown(function () {
       $(document).one('click',function () {
            $('.select ul').slideUp()


        })
   }).on('click','li',function () {
        $('.select a').text($(this).text())
   })

})