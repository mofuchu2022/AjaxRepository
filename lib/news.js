$(function () {
    function getNewsList() {
        // 获取后台的新闻对象数据，成功后再执行操作。注意粘贴的接口地址不要留有空白
        $.get('http://www.liulongbin.top:3006/api/news', function (res) {
            // console.log(res);
            // 返回的对象中每项元素中tags是字符串，需要根据特定符号将字符串划分变为数组，使得模板能够遍历出来每个标签的元素,修改完成后才能传给模板
            for (var i = 0; i < res.data.length; i++) {
                // 将tags属性从字符串变为数组，通过逗号进行划分
                res.data[i].tags = res.data[i].tags.split(',');
            }
            // 模板的时间格式函数需要在将数组添加到模板中之前声明才有效，不然就报错：$imports.dateFormat is not a function
            template.defaults.imports.dateFormat = function (date) {
                // 需要将返回的时间先进行Date对象的实例化，才能调用Date的对应方法
                // alert('哈哈哈');
                var time = new Date(date);
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                var day = time.getDate();
                return year + '年' + month + '月' + day + '日';
            }
            // 调用art-template模板函数根据id，将返回的数据对象手动将里面变量值添加进去。然后将模板设置给变量
            var templateElement = template('news-template', res);
            $('#news-list').html(templateElement);
        })
    }
    // 进入这个函数就渲染一次页面
    getNewsList();
})