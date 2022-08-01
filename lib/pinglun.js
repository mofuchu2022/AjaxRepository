$(function () {
    // 获取最新的评论列表
    function getPinglunList() {
        $.ajax({
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            method: 'get',
            data: {},
            //这里把success参数写错了，导致一致进不来
            success: function (res) {
                // console.log(res);
                // alert('进来了');
                if (res.status == 200) {
                    var pingLunList = [];
                    // 要记得返回的res数据是对象，我们要循环的是res里面的data属性存放的数组对象
                    $.each(res.data, function (index, item) {
                        pingLunList.push(' <li class="list-group-item"><span class="badge" style="background-color:bisque">评论时间:' + item.time
                            + '</span><span class="badge" style="background-color:aqua;">评论人:' + item.username + '</span> ' + item.content + ' </li>');
                    })
                    // 添加查询到的数据之前一定要记得先清空渲染的数据
                    $('#pingLunList').empty().append(pingLunList.join(''));
                }

            }
        });
    }
    getPinglunList();

    // 发表评论后提交后台
    // $('#submitPingLun').on('submit', function (e) {
    //     // 这里一定要先用事件的默认对象阻止表单直接提交，否则数据带不过去，提交的就都是空白了
    //     e.preventDefault();
    //     var critic = $('#critic').val().trim();
    //     var criticContent = $('#critic-content').val().trim();
    //     alert(criticContent);
    //     $.ajax({
    //         url: 'http://www.liulongbin.top:3006/api/addcmt',
    //         type: 'post',
    //         data:
    //         {
    //             username: critic,
    //             content: criticContent
    //         },
    //         success: function (res) {
    //             if (res.status == 201) {
    //                 // alert('成功进来了');
    //                 getPinglunList();
    //             }

    //         }
    //     })
    // })

    // 第二种简洁写法
    $('#submitPingLun').on('submit', function (e) {
        // 阻止表单直接提交，一定要写，不然表单直接就跳转不带数据
        e.preventDefault();
        // 序列化serialize方法将这个form中所有带name属性的值，依次获取到
        var data = $(this).serialize();
        // 将serialize的值传给后台的接口
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
            if (res.status == 201) {
                // 评论添加成功，刷新列表
                getPinglunList();
                console.log('提交评论成功');
                // 将获取到的jQuery对象后面跟着一个数组元素就可以重制为DOM对象，使用原生js的reset方法，将表单重置了
                $('#submitPingLun')[0].reset();
            }
        })
    })
});
