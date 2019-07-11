/*封装toast*/

/**
 *函数列表：
 * 1. toast_info(text,type,time)：结束后没有响应时间
 * 2. toast_locateNew(text,type,time,hidden_url)：结束后重定向新页面
 * 3. toast_reload(text,type,time) ：结束后刷新当前页面
 * */

/**
 * 1.没有afterHidden
 * @param text:提示的文字内容
 * @param type:提示的类型 （有error,warning,success,information）
 * @param time:toast停留在页面的时间
 **/
function toast_info(text,type,time) {
    $.toast({
        text: text,
        heading: '提示',
        icon:type,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter:time,
        stack: 1,
        position: 'top-center',
        textAlign: 'left',
        loader: true,
        loaderBg: '#ffffff'
    });
}

/**
 * 2. 有afterHidden：重定向其他页面
 * @param text:提示的文字内容
 * @param type:提示的类型 （有error,warning,success,information）
 * @param time:toast停留在页面的时间
 * @param hidden_url:toast结束重定向的url
 **/
function toast_locateNew(text,type,time,hidden_url) {
    $.toast({
        text: text,
        heading: '提示',
        icon: type,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: time,
        stack: 1,
        position: 'top-center',
        textAlign: 'left',
        loader: true,
        loaderBg: '#ffffff',
        afterHidden :function () {
            window.location.href=hidden_url;
        }
    });
}

/**
 * 3. 有afterHidden：重定向当前页面
 * @param text:提示的文字内容
 * @param type:提示的类型 （有error,warning,success,information）
 * @param time:toast停留在页面的时间
 **/
function toast_reload(text,type,time) {
    $.toast({
        text: text,
        heading: '提示',
        icon: type,
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: time,
        stack: 1,
        position: 'top-center',
        textAlign: 'left',
        loader: true,
        loaderBg: '#ffffff',
        afterHidden :function () {
            window.location.reload();
        }
    });
}