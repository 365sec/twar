$(function () {

    /**
     * header 选中样式
     */
    $('#question').addClass('active');

    /**
     * 一些页面样式的处理
     * */
    var type = $("#question_type").val(); //获得题目类型
    var option = $("#single-question-option > a");//单选
    var multi_option = $("#multi-question-option > a");//多选
    var qid = $("#qid").val();

    //初始化评论区的回复
    $(".reply-content").show();

    //选择题样式封装函数
    function option_style(option_btn) {
        option_btn.mouseenter(function () {
            $(this).css({"background-color": "#36a594c9", "color": "#fff"});
        });
        option_btn.mouseleave(function () {
            $(this).css({"background-color": "#fff", "color": "#333"});
        });
    }

    //单选题处理页面样式
    option_style(option);
    option.click(function () {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        $(this).children("label").addClass("checked");
        $(this).siblings().children("label").removeClass("checked");
    });

    //多选题处理页面样式
    option_style(multi_option);
    multi_option.click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            $(this).children("label").removeClass("checked");
        } else {
            $(this).addClass("selected");
            $(this).children("label").addClass("checked");
        }
    });

    //回答里面的回复连接
    $(".answer-reply-link").on('click', function () {

        //取inputLayer的值
        var replyContent = $(this).siblings("input[name='layerInput']").val();
        var replyContent_str = "reply-content-" + replyContent;
        $("#" + replyContent_str).fadeToggle();
    });

    //评论里面的回复连接
    $(".review-reply-link").click(function () {

        //取input的值，然后进行拼接
        var form_number = $(this).siblings("input[name='reply-link-input']").val();
        var form_str = "form-" + form_number;
        $("#" + form_str).fadeToggle();
    });

    //我要回答按钮
    $("#answer_question").click(function () {
        var _targetTop = $(".review-panel").offset().top;
        $("html,body").animate({scrollTop: _targetTop}, 300);
    });


    /**
     * 单选题点击提交答案按钮
     * */
    $("#submit-btn").on('click', function () {
        var answer = $(".checked input").val();
        var uid = $("#uid").val()


        //获取url
        pathObj = new Object();
        pathObj.qid = qid;
        pathObj.answer = answer;

        var params_str = $.param(pathObj);
        var submit_answer_path = "/exercise/answer_check?";

        // 简单判定单选题答案
        if (answer == undefined || answer == null || answer == '') {
            toast_success("答案不能为空！");
            return;
        }
        if (answer != 'A' && answer != 'B' && answer != 'C' && answer != 'D') {
            toast_error("答案不符合格式！");
            return;
        }

        //后台请求
        $.ajax({
            type: 'post',
            async: false,
            dataType: "json",
            url: submit_answer_path,
            data: {'qid':qid,'answer':answer,'uid':uid},
            success: function (data) {
                if (data.code == 200) {

                    var answer_result = data.data.AnswerIsRight;
                    var correct_answer = data.data.CorrectAnswer;
                    //调用处理单选题函数
                    result(correct_answer, answer_result, answer);
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("系统错误！");
            }
        });
    });





    /**
     * 多选题点击提交答案按钮
     * */
    $("#submit_multi_btn").on('click', function () {
        var qid = $("#qid").val();
        var answerArray = new Array();
        $(".checked").each(function () {
            answerArray.push($(this).children("input").val());
        });
        var answer = answerArray.join(",");

        //获取url
        pathObj = new Object();
        pathObj.qid = qid;
        pathObj.answer = answer;
        var params_str = $.param(pathObj);
        var multi_answer_path = "/question/terminal/submit/multi?" + params_str;

        // 简单判定单选题答案
        if (answer == undefined || answer == null || answer == '') {
            toast_error("答案不能为空！");
            return;
        }
        else if(!checkStr(answer)){
            return;
        }

        //后台请求
        $.ajax({
            type: 'post',
            async: false,
            dataType: "json",
            url: multi_answer_path,
            success: function (data) {
                if (data.code === 200) {
                    var answer_result = data.data.AnswerIsRight;
                    var correct_answer = data.data.CorrectAnswer;

                    //调用处理多选题函数
                    result(correct_answer, answer_result, answer);
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("系统错误！");
            }
        });

    });


    /**
     * 操作题点击提交答案按钮
     * */
    $("#operate-submit-btn").on('click', function () {
        var qid = $("#qid").val();
        var uid = $("input[name='uid']").val();
        //获取操作题答案
        var operate_answer = $("input[name='operate-answer']").val();
        //获取url
        pathObj = new Object();
        pathObj.qid = qid;
        pathObj.answer = operate_answer;
         pathObj.uid= uid
        var params_str = $.param(pathObj);
        var operate_path = "/match/operator/check?";

        //判空操作
        if (operate_answer == undefined || operate_answer == "" || operate_answer == null) {
            toast_error("答案不能为空！");
            return;
        }
        /*else if(!checkStr(operate_answer)){
            return;
        }*/
        //后台请求
        $.ajax({
            type: 'post',
            async: false,
            data:{
                'qid':qid,
                'answer':operate_answer,
                'uid':uid,
            },
            dataType: "json",
            url: operate_path,
            success: function (data) {
                if (data.code === 200) {
                    var answer_result = data.AnswerIsRight;
                    operate_result(answer_result, operate_answer);
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    //记得考虑验证码错误的情况
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("系统错误！");
            }
        });
    });


     $("#flag-submit-btn").on('click', function () {
        var qid = $("#qid").val();
        //获取操作题答案
        var operate_answer = $("input[name='operate-answer']").val();
        //获取url
        pathObj = new Object();
        pathObj.qid = qid;
        pathObj.answer = operate_answer;
        var params_str = $.param(pathObj);
        var operate_path = "/match/operator/check?";

        //判空操作
        if (operate_answer == undefined || operate_answer == "" || operate_answer == null) {
            toast_error("答案不能为空！");
            return;
        }
        /*else if(!checkStr(operate_answer)){
            return;
        }*/
        //后台请求
        $.ajax({
            type: 'post',
            async: false,
            data:{
                'qid':qid,
                'answer':operate_answer
            },
            dataType: "json",
            url: operate_path,
            success: function (data) {
                if (data.code === 200) {
                    var answer_result = data.AnswerIsRight;
                    operate_result(answer_result, operate_answer);
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    //记得考虑验证码错误的情况
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("系统错误！");
            }
        });
    });




      $("#flag-submit-btn").on('click', function () {
        var qid = $("#qid").val();
        //获取操作题答案
        var operate_answer = $("input[name='flag-answer']").val();
        //获取url
        pathObj = new Object();
        pathObj.qid = qid;
        pathObj.answer = operate_answer;
        var params_str = $.param(pathObj);
        var operate_path = "/match/operator/check?";

        //判空操作
        if (operate_answer == undefined || operate_answer == "" || operate_answer == null) {
            toast_error("答案不能为空！");
            return;
        }
        /*else if(!checkStr(operate_answer)){
            return;
        }*/
        //后台请求
        $.ajax({
            type: 'post',
            async: false,
            data:{
                'qid':qid,
                'answer':operate_answer
            },
            dataType: "json",
            url: operate_path,
            success: function (data) {
                if (data.code === 200) {
                    var answer_result = data.AnswerIsRight;
                    operate_result(answer_result, operate_answer);
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    //记得考虑验证码错误的情况
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("系统错误！");
            }
        });
    });
    /**
     * 处理保存笔记按钮
     **/
    var add_note_btn = $("#add_note_btn");

    //添加笔记
    add_note_btn.on('click', function () {

        //获取url
        pathObj = new Object();
        pathObj.qid = qid;
        pathObj.title = $("#note_heading_input").val();
        pathObj.content = $("#note-content-input").val();
        pathObj.brief = 'overview';
        var params_str = $.param(pathObj);
        var add_note_path = "/question/terminal/note/add?" + params_str;

        //简单判断笔记标题
        if (pathObj.title.length > 50) {
            toast_error("笔记标题过长！");
            return;
        }

        //简单判断笔记内容
        if (pathObj.content == "" || pathObj.content == null) {
            toast_error("笔记内容为空！");
            return;
        }
        else if(!checkStr(pathObj.content)) {
            return;
        }

        //请求
        $.ajax({
            type: 'post',
            async: false,
            url: add_note_path,
            success: function (data) {
                if (data.code === 200) {
                    toast_reload("成功添加笔记！");
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("系统错误！");
            }

        });

    });


    /**
     * 处理添加/取消收藏按钮
     **/
    var collect_btn = $("#collect-btn");
    collect_btn.on('click', function () {
        if ($(this).hasClass('collect')) {
            cancelCollect();
        } else if ($(this).hasClass("no-collect")) {
            collect();
        }
    });


    /**
     * 处理纠错按钮
     **/
    $("#confirm_feedback_btn").on('click', function () {
        var feedback_text = $("#feedback_text").val();
        var feedback_path = "/question/terminal/feedback/" + qid + "?error=" + feedback_text;
        var feedback_modal = $("#correct-modal");

        //简单判断错误
        if (feedback_text == "" || feedback_text > 500 || feedback_text == null) {
            toast_error("请提交内容！");
            return;
        }

        //后台请求
        $.ajax({
            type: "POST",
            async: false,
            dataType: "json",
            url: feedback_path,
            success: function (data) {
                feedback_modal.modal("hide");
                if (data.code === 200) {
                    toast_success("提交成功！感谢您的反馈~");
                    $("#correct").modal('hide');
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    toast_error(data.message);
                    $("#correct").modal('hide');
                }
            },
            error: function () {
                toast_error("系统错误！");
            }

        });
    });


    /**
     * 处理提交观点按钮
     **/
    $("#submit-view-btn").on('click', function () {
        var viewContent = $("#view-input").val();

        //获取url
        pathObj = new Object();
        pathObj.qid = qid;
        pathObj.viewContent = viewContent;
        var params_str = $.param(pathObj);
        var view_path = "/question/terminal/view?" + params_str;

        //后台请求
        $.ajax({
            type: "POST",
            async: false,
            dataType: "json",
            url: view_path,
            success: function (data) {
                if (data.code === 200) {
                    toast_reload("提交成功！");
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("系统错误！");
            }

        });
    });


    /**
     * 处理提交回复按钮(有评论列表时的第一个按钮)
     **/
    $(".answer-reply-btn").on('click', function () {
        var replyInput = $(this).siblings("input[name='replyInput']").val();
        var layerInput = $(this).siblings("input[name='layerInput']").val();
        var toUserId = $(this).siblings("input[name='toUserId']").val();

        //封装提交的数据
        var formData = {
            toUserId: null,
            questionId: null,
            layer: null,
            replyContent: null
        };
        formData.toUserId = toUserId;
        formData.questionId = qid;
        formData.layer = layerInput;
        formData.replyContent = replyInput;

        //简单判定输入
        if (replyInput == null || replyInput == '' || replyInput == 'undefined') {
            toast_error("回复框输入不能为空！");
            return;
        }
        else if(!checkStr(replyInput)) {
            return;
        }


        //后台请求
        $.ajax({
            type: "post",
            async: false,
            contentType: "application/json",
            data: JSON.stringify(formData),
            url: "/question/terminal/reply",
            success: function (data) {
                if (data.code === 200) {
                    toast_reload("提交成功！");
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面!", "/auth/goLogin");
                }
                else {
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("系统错误！");
            }

        });
    });


    /**
     * 下面是收藏按钮的封装函数
     **/

    //收藏函数
    function collect() {
        var collect_path = "/question/terminal/collect/" + qid;

        //后台请求
        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            url: collect_path,
            success: function (data) {
                if (data.code === 200) {
                    toast_success("恭喜你，您已成功收藏！");
                    collect_btn.html("<span><i class=\"glyphicon glyphicon-heart-empty\"></i>取消收藏</span>");
                    collect_btn.removeClass("no-collect");
                    collect_btn.addClass("collect");
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面！", "/auth/goLogin");
                }
                else {
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("对不起，系统错误！");
            }
        });
    }

    //取消收藏函数
    function cancelCollect() {
        var cancel_collect_path = "/question/terminal/decollect/" + qid;

        //后台请求
        $.ajax({
            type: 'POST',
            async: false,
            dataType: 'json',
            url: cancel_collect_path,
            success: function (data) {
                if (data.code === 200) {
                    toast_success("您已取消该收藏！");
                    collect_btn.html("<span><i class=\"glyphicon glyphicon-heart-empty\"></i>收藏该题</span>");
                    collect_btn.removeClass("collect");
                    collect_btn.addClass("no-collect");
                }
                else if (data.code === -1) {
                    toast_hidden("您还没有登陆，即将跳转到登陆页面！", "/auth/goLogin");
                }
                else {
                    toast_error(data.message);
                }
            },
            error: function () {
                toast_error("对不起，系统错误！");
            }
        });
    }


    /**
     * 下面是一些题目（单选题|多选题|操作题）处理返回的封装函数
     **/
    var close_btn = $("#close_btn");
    var submit_answer_modal = $("#submit-answer");
    var modal_confirm_btn = $("#submit_confirm");
    var modal_answer_result = $("#modal_answer_result");
    var correct_answer_p = $("#correct_answer");
    var correct_answer_op_p = $("#correct_answer_operate");

    //（单选函数）
    function result(correct_answer, answer_result, answer) {
        if (answer_result === 'true') {

            modal_answer_result.html('<i class="glyphicon glyphicon-ok"></i><span>恭喜你，答对啦！</span>');
            // close_btn.removeClass("show");
            // close_btn.addClass("hide");
            close_btn.css({'display':'none'});
            submit_answer_modal.modal("show");

            //点击确定按钮之后
            modal_confirm_btn.on('click', function () {
                submit_answer_modal.modal("hide");
                $("#submit-btn").addClass('hide');
                correct_answer_p.html("正确答案：" + correct_answer + "&nbsp;&nbsp;您的答案：" + answer + "<span class='correct'>(正确)</span>");
            });
        }
        else if (answer_result === 'false') {
            modal_answer_result.html('<i class="glyphicon glyphicon-exclamation-sign"></i><span>答案错误，是否查看正确答案？</span>');
            // close_btn.removeClass("hide");
            // close_btn.addClass("show");
            close_btn.css({'display':'inline-block'});
            submit_answer_modal.modal('show');

            //点击关闭按钮
            close_btn.on('click', function () {
                // close_btn.removeClass("hide");
                submit_answer_modal.modal('hide');
            });
            modal_confirm_btn.on('click', function () {
                submit_answer_modal.modal("hide");
                $("#submit-answer").modal('hide');
                correct_answer_p.html("正确答案：" + correct_answer + "&nbsp;&nbsp;您的答案：" + answer + "<span class='wrong'>（错误）</span>");
            });
        }
    }

    //（操作题处理函数）
    function operate_result(answer_result, answer) {
        if (answer_result === 'true') {
            alert("恭喜你答对了")
        }
        else if (answer_result === 'false') {

         alert("答案错误，请再次尝试")

        }
    }


    /**
     * 下面toast函数的封装
     **/

    //错误toast函数
    function toast_error(tips) {
        $.toast({
            text: tips,
            heading: '提示',
            icon: 'error',
            showHideTransition: 'fade',
            allowToastClose: true,
            hideAfter: 1000,
            stack: 1,
            position: 'top-center',
            textAlign: 'left',
            loader: true,
            loaderBg: '#ffffff'
        });
    }

    //成功toast函数
    function toast_success(tips) {
        $.toast({
            text: tips,
            heading: '提示',
            icon: 'success',
            showHideTransition: 'fade',
            allowToastClose: true,
            hideAfter: 1000,
            stack: 1,
            position: 'top-center',
            textAlign: 'left',
            loader: true,
            loaderBg: '#ffffff'
        });
    }

    //afterHidden
    function toast_hidden(tips, hidden_url) {
        $.toast({
            text: tips,
            heading: '提示',
            icon: 'success',
            showHideTransition: 'fade',
            allowToastClose: true,
            hideAfter: 1000,
            stack: 1,
            position: 'top-center',
            textAlign: 'left',
            loader: true,
            loaderBg: '#ffffff',
            afterHidden: function () {
                window.location.href = hidden_url;
            }
        });
    }

    //afterReload
    function toast_reload(tips) {
        $.toast({
            text: tips,
            heading: '提示',
            icon: 'success',
            showHideTransition: 'fade',
            allowToastClose: true,
            hideAfter: 1000,
            stack: 1,
            position: 'top-center',
            textAlign: 'left',
            loader: true,
            loaderBg: '#ffffff',
            afterHidden: function () {
                window.location.reload();
            }
        });
    }
});