$(function () {

    /**
     * 高亮侧栏样式
     */
    $('#message').addClass("act");
    $('#message-tel').addClass("active");

    /**
     * 系统消息内容的展开和收起
     */
    $('.btn1').on('click', function () {
        $(this).parent().siblings(".mes-body").slideToggle();
        $(this).toggleClass('fa-caret-up fa-caret-down');
    });

/**
* 发送私信
* 1.私信记录增加该私信
* 2.私信用户列表增加对方的信息
*
*/
    $('#messageSend-btn').on('click', function () {
        var content =$("#messageTxt").val();
        //输入框没有输入内容 不传给后台
        if(content==""){
            $.toast({
                text: "你还没有输入内容哦~",
                heading: '提示',
                icon: 'error',
                showHideTransition: 'fade',
                allowToastClose: true,
                hideAfter: 1000,
                stack: 1,
                position: 'top-center',
                textAlign: 'left',
                loader: true
            });
        }
        //将输入框的内容发送给后台
        else{
            var id = $("#userId").text();
            $.ajax({
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {
                    'toUserId':id,
                    'content': content
                },
                url: '/message/send',
                success: function (data) {
                    if(data.code==200){
                        toast_reload("发送成功",'success',1000);
                    }
                    else if(data.code===-1){
                        toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                    }
                    else{
                        toast_info(data.message,'error',1000);
                    }
                },error:function (data) {
                      toast_info("系统错误",'error',1000);
                    }
            });
        }
    });

    /**
     * 处理已读系统消息
     * 1.获取当前已读列表的消息id (整个页面)
     * 2.发送给后台
     *
     */
    var SystemMes=$('#system-read input');
    var n=SystemMes.length;
    if(n>0){
        var messageIds = new Array();
        for(var j = 0; j < n; j++) {
            messageIds.push(SystemMes[j].value);
        }
        var form_data = {
            messageIds: messageIds
        };
        $.ajax({
            type: "post",
            async: false,
            url: "/message/read?messageIds="+messageIds,
            success: function (data) {
                if (data.code === 200) {
                }
                else if(data.code===-1){
                    toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                }
                else {
                }
            }, error: function (data) {
            }
        });
    }


    /**
     * 处理已读系统消息
     * 1.获取当前已读列表的消息id  (对方发送的)
     * 2.发送给后台
     *
     */

    $('.friend-mes').on('click',function () {
        var friendMes=$('#friend-read input');
        var n=friendMes.length;
        var messageIds = new Array();
        for(var j = 0; j < n; j++) {
            messageIds.push(SystemMes[j].value);
        }
        var form_data = {
            messageIds: messageIds
        };
        $.ajax({
            type: "post",
            async: false,
            url: "/message/read?messageIds="+messageIds,
            success: function (data) {
                if (data.code === 200) {
                }
                else if(data.code===-1){
                    toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                }
                else {
                }
            }, error: function (data) {
            }
        });
    })

});
