$(document).ready(function(){

    /**
     * 高亮导航样式
     */
    $('#info').addClass("act");
    $('#info-tel').addClass("active");

    /**
     * 未读消息事件
     **/
    // $.ajax({
    //     type: 'GET',
    //     async: false,
    //     dataType: 'json',
    //     url: '/message/unread',
    //     success: function (data) {
    //         if (data.code == 200) {
    //             var UnreadNum=data.data.unreadNumber;
    //             if (UnreadNum!==0 && UnreadNum!==''){
    //                 $(".red-point").removeClass("hide");
    //                 $(".red-point").addClass("show");
    //                 $(".red-point").text(UnreadNum);
    //             }
    //         }else{
    //             // toast_info(data.message,"error",1000);
    //         }
    //     },error:function (data) {
    //         // toast_info("系统错误！","error",1000);
    //     }
    // });

    /**
     * 监听事件
     **/
    $("input").each(function () {
        $(this).keydown(function () {
            $(this).css("border-color","#ccc");
        });
    });

    /**
     * 修改昵称
     **/
    $("#save_name").on('click',function () {
        var nickNameInput=$("#nick_name").val();
        if(nickNameInput===''||nickNameInput==null){
            $("#nick_name").css("border-color","red");
            toast_info("昵称不能为空！","error",800);
        }
        else if(nickNameInput.length>18){
            $("#nick_name").css("border-color","red");
            toast_info("昵称过长！","error",800);
        }
        else if(!checkStr(nickNameInput)) {
            return;
        }
        else{
            $.ajax({
                type: "post",
                async: false,
                dataType: "json",
                url: "/user/profile/updateNickname?nickname=" + nickNameInput,
                success: function (data) {
                    if (data.code === 200) {
                        //toast提示修改成功，并且更新页面，页面显示新昵称
                        toast_reload('昵称修改成功！','success',1000);
                    }
                    else if(data.code===-1){
                        toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                    }
                    else {
                        toast_info('昵称修改失败','error',1000);
                    }
                },error: function (data) {
                    toast_info('系统错误','error',1000);
                }
            });
        }

    });

    //放弃修改昵称
    $(".abandon_name").on('click', function (){
        $("#nick_name").val("");
    });

    /**
     * 修改密码
     **/
    var btn_password_reset = $('#save_password');
    var btn_send_sms = $('#send_sms');
    var btn_abandon_password=$("#abandon_password");
    var btn_send_sms_enabled = true;
    //初始化模态框不显示
    $('#needVerifyCode-modal').modal({
        show: false
    });
    // 点击发送验证码
    btn_send_sms.on('click', function () {
        if(!btn_send_sms_enabled){
            return;
        }
        var formData = {
            telephone: $('#user-telephone').val(),
            verifyCode: null,
            forWhat: 'modify-password'
        };
        $.ajax({
            type: "get",
            async: false,
            url: "/auth/need",
            success: function (data){
                if (data.data.need === "true") {
                    // 显示图片验证码模态框
                    $("#info-needVerifyCode-modal").modal("show");
                    $("#info-img-verify-input").val("");
                    $("#info-verify-code-img4").click();
                    //点击确定按钮的时候完善verifyCode字段
                    $("#img-verify-code-btn").click(function () {
                        formData.verifyCode = $("#info-img-verify-input").val();
                        if(!checkVerifyCode(formData.verifyCode)){
                            return;
                        }else{
                            $("#info-needVerifyCode-modal").modal("hide");
                            $.ajax({
                                type: "post",
                                async: false,
                                contentType: "application/json",
                                data: JSON.stringify(formData),
                                url: "/auth/sms",
                                success: function (data) {
                                    if (data.code === 200) {
                                        toast_info("发送成功，请注意查收！",'success',1000);
                                        setButtonStatus(120);//发送成功开始倒计时
                                    }
                                    else if(data.code===-1){
                                        toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                                    }
                                    else {
                                        toast_info("发送失败",'error',1000);
                                    }
                                }
                            });
                        }
                    });
                }else {
                    $.ajax({
                        type: "post",
                        async: false,
                        contentType: "application/json",
                        data: JSON.stringify(formData),
                        url: "/auth/sms",
                        success: function (data) {
                            if (data.code === 200) {
                                toast_info("发送成功，请注意查收！",'success',1000);
                                setButtonStatus(120);//发送成功开始倒计时
                            }
                            else if(data.code===-1){
                                toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                            }
                            else {
                                toast_info("发送失败",'error',1000);
                            }
                        }
                    });
                }
            }
        });


    });
    //倒计时函数
    function setButtonStatus(wait) {
        if (wait == 0) {
            btn_send_sms_enabled = true;
            btn_send_sms.removeAttr("disabled");
            btn_send_sms.text('重新发送');
            wait = 120;
        } else {
            btn_send_sms.attr("disabled", "disabled"); // 设定发送按钮为不可用
            btn_send_sms.text(wait + '秒后重试');
            btn_send_sms_enabled = false;
            wait--;
            setTimeout(function () {
                setButtonStatus(wait)
            }, 1000)
        }
    }
    // 修改密码
    btn_password_reset.on('click', function () {
        // 获取账号
        var account = $('#user-telephone').val();
        // 新密码
        var password = $('#user_password').val();
        // 短信验证码
        var phoneVerifyCode = $('#verify_code').val();
        // 判断
        if (checkAccount(account) && checkPassword(password) && checkPhoneVerifyCode(phoneVerifyCode)) {
            $.ajax({
                type: "post",
                async: false,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    "telephone": account,
                    "password": password,
                    "phoneVerifyCode": phoneVerifyCode
                }),
                url: "/auth/newpass",
                success: function (data) {
                    if (data.code === 200) {
                        toast_locateNew('密码修改成功！','success',1000,"/user/logout");
                    }
                    else if(data.code===-1){
                        toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                    }
                    else {
                        toast_info(data.message,'error',1000);
                    }
                },
                error: function (data) {
                    toast_info("系统错误",'error',1000);
                }
            });
        }
    });
    // 放弃修改密码
    btn_abandon_password.on('click',function(){
        $("#user_password").val("");
        $("#verify_code").val("");
        $("#modify-password-code").val("");
    });
    /***************修改个性签名******************/
    $("#save_signature").on('click',function () {

        var signatureInput=$("#signature").val();
        if(signatureInput===''||signatureInput==null){
            $("#signature").css("border-color","red");
            toast_info("个性签名不能为空！","error",800);
        }
        else if(signatureInput.length>30){
            $("#signature").css("border-color","red");
            toast_info("个性签名过长！","error",800);
        }
        else if(!checkStr(signatureInput)) {
            return;
        }
        else{
            $.ajax({
                type: "post",
                async: false,
                dataType: "json",
                url: "/user/profile/updateSignature?signature=" + $("#signature").val(),
                success: function (data) {
                    if (data.code === 200) {
                        //toast提示修改成功，并且更新页面，页面显示新昵称
                        toast_locateNew('个性签名修改成功！','success',1000,"/user/profile/info");
                    }
                    else if(data.code===-1){
                        toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                    }
                    else {
                        toast_info(data.message,"error",1000);
                    }
                },
                error: function (data) {
                    toast_info("系统错误","error",1000);
                }
            });
        }
    });
    // 放弃修改
    $("#abandon_signature").on('click',function () {
        $("#signature").val("");
    });

    /**********样式的js***********/
    $("#nickname_a").on('click',function () {
        $("#modify_input").fadeToggle();
        $("#modify_button").fadeToggle();
    });
    $("#signature_a").on('click',function () {
        $("#signature_input").fadeToggle();
        $("#signature_button").fadeToggle();
    });

    /**
     * 修改用户头像
     * 请求URL：/user/profile/updateAvatar
     * */
    $('#user-newimg').fileinput({
        language: 'zh',
        uploadUrl: '/user/profile/updateAvatar',
        uploadAsync: true,
        allowedFileExtensions: ['jpg','gif','png','jpeg'],
        maxFileCount: 1,
        enctype : 'multipart/form-data',
        showClose: false,
        dropZoneTitle: "请上传头像 <br/>拖拽照片到这里...",
        maxFileSize:'2048'
    }).on("fileuploaded",function (event,data,previewId,index) {

        var data = data.jqXHR.responseJSON;
        if(data.code===200){
            $("#uploadForm").hide(400);
            toast_reload("上传成功！",'success',1000);
        }
        else if(data.code===-1){
            toast_locateNew(data.message,"error",1000,"/auth/goLogin");
        }
        else{
            toast_reload(data.message,'error',1000);
        }
    });

    /**
     * 设置打卡按钮的文字
     * URL：/user/profile/checked
     * 方法：页面加载完时 判断用户今日是否已打卡
     *       1.打过卡 按钮显示“已打卡”       2.未打过卡  按钮显示“打卡”
    * */
    // $.ajax({
    //     type: 'post',
    //     async: false,
    //     dataType: 'json',
    //     url: '/user/profile/checked',
    //     success: function(data) {
    //
    //         if(data.code==200 && data.data.hasCheckedToday==true) {
    //             $('#sign-in').text('已打卡');
    //         }
    //         else if(data.code==200 && data.data.hasCheckedToday==false){
    //             $('#sign-in').text('打卡');
    //         }
    //         else if(data.code===-1){
    //             toast_locateNew(data.message,"error",1000,"/auth/goLogin");
    //         }
    //         else{
    //             toast_reload(data.message,'error',1000);
    //         }
    //     },error:function (data) {
    //         toast_reload("系统错误！",'error',1000);
    //     }
    // });

/**
* 打卡签到
* URL：/user/profile/check
* */
    $('#sign-in').click(function () {
        $.ajax({
            type: 'post',
            async: false,
            dataType: 'json',
            url: '/user/profile/check',
            success: function(data) {

                if(data.code==200 && data.data.checkedToday==true && data.data.checkSuccess==true) {
                    swal({
                        title: " <h3>打卡成功！</h3>",
                        text: "已累积打卡"+data.data.checkDays+"天",
                        type: 'success',
                        imageUrl: "/static/img/profile/calendar.png",
                        html: true
                    },function () {
                        window.location.reload();
                    });
                }
                else if(data.code==200 && data.data.checkedToday==true){
                    swal({
                        title: " <h3>今日已打过卡了，明日再来吧~</h3>",
                        text: "已累积打卡"+data.data.checkDays+"天",
                        type: 'info',
                        imageUrl: "/static/img/profile/calendar.png",
                        html: true
                    });
                }
                else if(data.code===-1){
                    toast_locateNew(data.message,"error",1000,"/auth/goLogin");
                }
                else{
                    toast_reload(data.message,'error',1000);
                }
            },error:function (data) {
                toast_reload("系统错误！",'error',1000);
            }
        });
    });
});