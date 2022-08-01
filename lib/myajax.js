function changeToJSONString(data) {
    var arr = [];
    for (let k in data) {
        arr.push(k + '=' + data[k]);
    }
    return arr.join('&');
}

function myAjax(ajaxObject) {
    var xhr = new XMLHttpRequest();
    var userData = changeToJSONString(ajaxObject.data);
    if (ajaxObject.method.toUpperCase() === 'GET') {
        xhr.open('GET', ajaxObject.url + '?' + userData);
        xhr.send();
    } else if (ajaxObject.method.toUpperCase() == 'POST') {
        xhr.open('POST', ajaxObject.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(userData);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            ajaxObject.success(result);
        }
    }
}