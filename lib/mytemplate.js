// 封装的模板函数
function template(id, data) {
    // 获取模板中的标签以及元素内容
    var targetTemplateData = document.getElementById(id).innerHTML;

    var zhengze = /{{\s*([A-z0-9]{1,})\s*}}/;
    // 将正则表达式找到的结果赋值，默认为true，当值为null时，while中的值就是false停止循环
    var result = null;
    while (result = zhengze.exec(targetTemplateData)) {
        // console.log(result);
        targetTemplateData = targetTemplateData.replace(result[0], data[result[1]]);
    }
    // 将替换后的模板数据返回给指定元素
    return targetTemplateData;
}