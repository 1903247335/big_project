$.ajaxPrefilter(function (res) {
    res.url='http://www.liulongbin.top:3007'+res.url
    res.headers={Authorization:localStorage.getItem('token')}
})
$('.name').val('')
$('.alias').val('')

$(function () {//获取文章列表
    $.ajax({type:'GET',url:'/my/article/cates',success:function (res) {
            for (let i=0;i<res['data'].length;i++){
                let tr=document.createElement('tr')
                tr.innerHTML=
                    `
                        <td>${res['data'][i].name}</td>
                        <td >${res['data'][i].alias}</td>
                        <td id="${res['data'][i]['Id']}">
                            <button class="edit" style="background: #008586">编辑</button>
                            <button class="delete" style="background: #eb6f39">删除</button>
                        </td>
                    `
                $('tbody').append(tr)
            }
        }})
})


$(function () {//弹出层出现
    $('.add-classify').on('click',function () {
        $('.mask').show()
        $('.add').show()
    })
    $('.main').on('click','.edit',function () {//多个按钮事件委托
        $('.mask').show()
        $('.modify').show()
    })
})


$(function () {//设置弹出层取消
    $('.add .cancel').on('click',function () {
        $('.mask').hide()
        $('.add').hide()
    })
    $('.modify .cancel').on('click',function () {
        $('.mask').hide()
        $('.modify').hide()
    })
})


$(function () {//新增文章类型  接口出现问题
    $('.add').on('submit',function (event) {
            event.preventDefault()
            $.ajax({type:'POST',url:'/my/article/addcates',data:$(this).serialize(),success:function (res) {

                alert(res['message'])
                let tr=document.createElement('tr')
                let tbody=document.querySelector('tbody')
                tr.innerHTML=
                    `<td>${$('.name').val()}</td>
                     <td>${$('.alias').val()}</td>
                      <td>
                           <button class="edit" style="background: #008586">编辑</button>
                            <button class="delete" style="background: #eb6f39">删除</button>
                      </td>`
                tbody.innerHTML= tbody.innerHTML+tr

    
    }})
    })
})

function show_msg(res){//封装弹出信息框
    $('.name').val('')
    $('.alias').val('')
    $('.msg').text(res.message).slideDown(1000).slideUp(1000)
}




$(function () {
    $('.main').on('click','.delete',function () {//给删除的按钮绑定
        let Id=$(this).parent().attr('Id')
        $.ajax({type:'GET',url:'/my/article/deletecate/'+Id,
            success:function (res) {
                show_msg(res)
                }

        })
    })
})








$(function () {//编辑的内容提交
    $('.modify').on('submit',function (event) {
        event.preventDefault()//阻止默认行为
    })



    $('.main').on('click','.edit',function () {//提供点击的编号
            Id=$(this).parent().attr('Id')
                        //点击编辑时候内容自动填充
            $.ajax({type:'GET',url:'/my/article/cates/'+Id,success:function (res) {
                            let name=$('.name')
                            let alias=$('.alias')
                    name.val(res['data']['name'])
                    alias.val(res['data']['alias'])
                }})
        })

    $('.determine-modify').on('click',function () {//点击确认提交按钮执行
        let name=$('.name')
        let alias=$('.alias')
        $.ajax({type:'POST',url:'/my/article/updatecate',data:`id=${Id}&`+$('.modify').serialize(),
                success:function (res) {
                    show_msg(res)
                }})
    })
})

