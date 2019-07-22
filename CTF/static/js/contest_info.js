$(function () {


    /**
     * 导航选择样式
     * */
    $("#contest").addClass('active');

    /* ***************点击我要参赛按钮触发事件*************** */
    $('#enroll-btn,#enrollp-btn').on('click', function () {
        //发送请求
        var path = "/megagame/join";
        var user_ID = '12d1d2d1f3df554fd2s1f2ds1'
        uid =  $('#contest-id').val()
        var  name='彼岸花开'
        $.ajax({
            type: "post",
            data: { uid:uid,
                user_ID:user_ID,
                name:name
            },
            async: false,
            dataType: "json",
            url: path,
            //如果请求成功
            success: function (data) {
                //成功，页面跳转
                if (data.code === 200) {
                    window.location.href = "/megagame/operation_list?page=1&contest_id="+$('#contest-id').val()+'&user_ID = '+user_ID;
                }
                else if (data.code === -1) {
                    window.location.href = "/auth/goLogin";
                }
                //还没有实名认证
                else if (data.code === -2) {
                    window.location.href = "/contest/" + $("#contest-id").val() + "/team";
                }
                //等待后台审核
                else if (data.code === -3) {
                    window.location.href = "/contest/" + $("#contest-id").val() + "/team";
                }
                //实名认证失败
                else if (data.code === -4) {
                    window.location.href = "/contest/" + $("#contest-id").val() + "/team";
                }
                else {
                    toast_info(data.message, "error", 1000);
                }
            },
            error: function (data) {
                toast_info("系统错误", "error", 1000);
            }
        });
    });
    /* ****************组队和加入队伍逻辑******************* */
    //点击创建队伍按钮

    //简单判定队伍名称的输入
    $("#create_button").on('click', function () {
        var createInput = $("#create_input").val();
        if (createInput === '' || createInput == null) {
            toast_info("队伍名不能为空", "error", 1000);
            return;
        }
        else if(!checkStr(createInput)) {
            return;
        }

        if (createInput.length > 12) {
            toast_info("队伍名称过长", "error", 1000);
            return;
        }
        var create_path = "/contest/" + $("#contest-id").val() + "/team/add?teamName=" + createInput;
        $.ajax({
            type: "post",
            async: false,
            dataType: "json",
            url: create_path,
            //如果请求成功
            success: function (data) {
                //成功,可以创建队伍
                if (data.code === 200) {
                    swal({
                            title: "恭喜您！组队成功",
                            text: "赶快告诉小伙伴邀请码加入队伍吧！",
                            type: "success",
                            confirmButtonColor: "#DD6B55",
                        },
                        function () {
                            window.location.reload();
                        });
                }
                //没有登陆或session过期
                else if (data.code === -1) {
                    toast_locateNew(data.message, "error", 1000, "/auth/goLogin");
                }
                //已有队伍或者名称已经存在，创建失败
                else {
                    toast_info(data.message, "error", 1000);
                }
            }, error: function (data) {
                toast_info("系统错误", "error", 1000);
            }
        });
    });
    //点击加入队伍按钮
    $("#enroll_button").on('click', function () {
        var enroll_path = "/contest/" + $("#contest-id").val() + "/team/participate?token=" + $("#enroll_input").val();
        $.ajax({
            type: "post",
            async: false,
            dataType: "json",
            url: enroll_path,
            //如果请求成功
            success: function (data) {
                //成功,可以加入队伍
                if (data.code === 200) {
                    toast_locateNew("恭喜您！成功加入队伍", "success", 1000, "/contest/" + $("#contest-id").val() + "/team");
                }
                else if (data.code === -1) {
                    toast_locateNew(data.message, "error", 1000, "/auth/goLogin");
                }
                //加入队伍失败，返回错误信息
                else {
                    toast_info(data.message, "error", 1000);
                }
            }, error: function (data) {
                toast_info("系统错误", "error", 1000);
            }
        });
    });
    /* ***************比赛信息框  和比赛状态相关的js*************** */
    $('.beforecontest-btn').on('click', function () {
        toast_info("当前的比赛还未开始报名，您可以在比赛介绍中查看比赛开始报名时间！", "warning", 1000);
    });
    $('.aftercontest-btn').on('click', function () {
        toast_info("当前的比赛已结束报名！", "warning", 1000);
    });

});