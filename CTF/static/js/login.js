$(document).ready(function () {

    //初始化模态框不显示
    $('#needVerifyCode-modal').modal({
        show: false
    });

    var btn_login = $('#btn-login'); // 登陆按钮
    var btn_send_sms = $('#btn-send-sms'); // 发送验证码按钮
    var img_verify_code = $('#login-verify-code-img'); // 验证码图片


    var login_phone_link = $('#login-phone-link');
    var login_password_link = $('#login-password-link');
    var phoneLogin = false;//是否是手机登陆

    login_phone_link.on('click', function (e) {
        $("#form-login-phone").delay(100).fadeIn(100);
        $("#form-login-password").fadeOut(100);
        $("#form-login-password").removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
        phoneLogin = true;
    });

    login_password_link.on('click', function (e) {
        $("#form-login-password").delay(100).fadeIn(100);
        $("#form-login-phone").fadeOut(100);
        $("#form-login-phone").removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
        phoneLogin = false;
    });


    var btn_send_sms_enabled = true;

    /**
     * 整个逻辑：
     * 其实就是需要还是不需要图片验证码的问题：
     * 1. 点击发送按钮,发送/auth/need请求
     * 2. 接收请求查看need字段分两种情况
     *  （1）true就是需要，那么弹出模态框要求填写验证码，完善formData的verifyCode字段
     *  （2）false就是不需要，不需要做任何操作
     * 3. 完成第2步就等于完善了formData的内容，直接发送ajax请求即可
     */
    btn_send_sms.on('click', function () {

        if (!btn_send_sms_enabled) {
            return;
        }

        var formData = {
            telephone: null,
            forWhat: null,
            verifyCode: null
        };

        formData.telephone = $('#login-telephone-phone').val();
        formData.forWhat = 'login';
        //简单判定手机号
        if (!checkAccount(formData.telephone)) {
            return;
        }

        $.ajax({
            type: "get",
            async: false,
            url: "/auth/need",
            success: function (data) {

                if (data.data.need === "true") {

                    //清空input输入框
                    $("#login-img-verify-input").val("");
                    $("#login-verify-code-img1").click();

                    // 显示图片验证码模态框
                    $("#needVerifyCode-modal").modal("show");

                    //点击确定按钮的时候完善verifyCode字段
                    $("#img-verify-code-btn").click(function () {
                        formData.verifyCode = $("#login-img-verify-input").val();
                        if (!checkVerifyCode(formData.verifyCode)) {
                            return;
                        } else {
                            $("#needVerifyCode-modal").modal("hide");
                            $.ajax({
                                type: "post",
                                async: false,
                                contentType: "application/json",
                                data: JSON.stringify(formData),
                                url: "/auth/sms",
                                success: function (data) {
                                    if (data.code === 200) {
                                        toast_info("发送成功，请注意查收！", 'success', 1000);
                                        setButtonStatus(120);//发送成功开始倒计时
                                    }
                                    else if (data.code === -1) {
                                        toast_locateNew(data.message, "error", 1000, "/auth/goLogin");
                                    }
                                    else {
                                        toast_info(data.message, 'error', 1000);
                                    }
                                }
                            });
                        }
                    });
                }
                else if (data.code === -1) {
                    toast_locateNew(data.message, "error", 1000, "/auth/goLogin");
                }
                else {
                    $.ajax({
                        type: "post",
                        async: false,
                        contentType: "application/json",
                        data: JSON.stringify(formData),
                        url: "/auth/sms",
                        success: function (data) {
                            if (data.code === 200) {
                                toast_info("发送成功，请注意查收！", 'success', 1000);
                                setButtonStatus(120);//发送成功开始倒计时
                            }
                            else if (data.code === -1) {
                                toast_locateNew(data.message, "error", 1000, "/auth/goLogin");
                            }
                            else {
                                toast_info(data.message, 'error', 1000);
                            }
                        }
                    });
                }
            },
            error: function () {
                toast_info('系统出错', 'error', 1000);
            }
        });
    });

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

    btn_login.on('click', function () {
        var formData = {
            telephone: null,
            password: null,
            verifyCode: null,
            phoneVerifyCode: null,
            phoneLogin: phoneLogin
        };

        // 手机验证码登陆所需
        if (phoneLogin) {
            formData.telephone = $('#login-telephone-phone').val();
            formData.phoneVerifyCode = $('#login-phone-verify-code').val();
            if (!checkAccount(formData.telephone)) {
                return;
            }
            if (!checkPhoneVerifyCode(formData.phoneVerifyCode)) {
                return;
            }
        } else {
            formData.telephone = $('#login-telephone').val();
            formData.password = $('#login-password').val();
            formData.verifyCode = $('#login-verify-code').val();
            if (!checkAccount(formData.telephone)) {
                return;
            }
            if (!checkPassword(formData.password)) {
                return;
            }
            if (!checkVerifyCode(formData.verifyCode)) {
                return;
            }
        }

        $.ajax({
            type: "post",
            async: true,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(formData),
            url: "/auth/login",
            beforeSend: function () {
                loading_info('');
            },
            success: function (data) {
                removeLoading('load');
                if (data.code === 200) {
                    toast_locateNew("登录成功！", 'success', 1000, "/index");
                }
                else if (data.code === -1) {
                    toast_locateNew(data.message, "error", 1000, "/auth/goLogin");
                }
                else {
                    img_verify_code.click(); // 更新验证码图片
                    toast_info(data.message, 'error', 1000);
                }
            },
            error: function (data) {
                removeLoading('load');
                img_verify_code.click(); // 更新验证码图片
                // processErrResult(data);
                toast_info("系统错误！", 'error', 1000);
            }
        });
    });
});