        let img=$('.container img')
        let option={aspectRatio:1,preview:'.preview'}
        img.cropper(option)

        let result
        $(function () {
                $('form').on('submit',function (event) {
                        event.preventDefault()
                        $('[type="file"]').click()
                })

                let img=$('.container img')
                $('[type="file"]').on('change',function (event) {
                        let file=event.target.files[0]
                        let url=URL.createObjectURL(file)
                        let reader=new FileReader()
                        img.cropper('destroy')
                            .attr('src',url)
                            .cropper(option)
                        reader.readAsBinaryString(file)
                        reader.onload=function () {
                                result=reader['result']
                                console.log(typeof result)
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
        })