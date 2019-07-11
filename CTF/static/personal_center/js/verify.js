$(function () {

    /**
     * 高亮导航样式
     */
    $('#verify').addClass("act");
    $('#verify-tel').addClass("active");


    /**
     *step-1  身份证号码格式验证函数
     */
    function isCardNo(card) {
        var pattern =/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        return pattern.test(card);
    }

    /**
     * step-1  获取用户选择的三级地址
     */
    var text;
    var address;
    $('#address').citys({
        required: false,
        nodata: 'disabled',
        onChange: function (data) {
            text = data['direct'] ? '(直辖市)' : '';
            address = data['province'] + text + data['city'] + data['area'];
        }
    });

    /**
     *step-1  初始化学校地址select框数据
     * */
    initialize(document.getElementById('school-prov'), document.getElementById('school'), '${province}', '${school}');

    /**
     *step-1  点击学生/在职的单选按钮 切换显示的表单
     */
    //页面加载时判断radio被选中
    var statusInput=$("input[name='status']:checked");
    if (statusInput.val() == 0) {
        $('#verify-staff-info').fadeOut();
        $('#verify-student-info').removeClass("hide");
        setTimeout("$('#verify-student-info').fadeIn()", 200);
        $('#verify-staff-info input').each(function () {
            $(this).val('');
        });
    }
    else if(statusInput.val()==1) {
        $('#verify-student-info').fadeOut();
        $('#verify-staff-info').removeClass("hide");
        setTimeout("$('#verify-staff-info').fadeIn()", 200);
        $('#verify-student-info input').each(function () {
            $(this).val('');
        });
    }
    //点击按钮时的操作
    $(".verify-status").on('click', function () {
        if ($(this).val() == 0) {
            $('#verify-staff-info').fadeOut();
            $('#verify-student-info').removeClass("hide");
            setTimeout("$('#verify-student-info').fadeIn()", 200);
            $('#verify-staff-info input').each(function () {
                $(this).val('');
            });
        } else {
            $('#verify-student-info').fadeOut();
            $('#verify-staff-info').removeClass("hide");
            setTimeout("$('#verify-staff-info').fadeIn()", 200);
            $('#verify-student-info input').each(function () {
                $(this).val('');
            });
        }
    });

    /**
     * step-1  审核被拒绝，学历select显示默认
     */
    var educationInput=$("#educationInput").val();
    $('#education option').filter(
        function () {
            return $(this).text()===educationInput;
        }
    ).attr("selected","selected");

    /**
     *step-1  监听文本框chang事件，实时反馈用户输入数据的正确性
     * */
    $('select, input').change(function () {
        $(this).css('border', '1px solid #ccc');
        $(this).parent().parent().parent().children('span').css('color', '#19a689');
    });
    $('input:radio').change(function () {
        $(this).parent().parent().children('span').css('color', '#19a689');
    });
    $('#school').change(function () {
        if ($('#school').val() == "其它") {
            $("#school-hide").removeClass('hide');
        } else {
            $("#school-hide").addClass('hide');
        }
    });

    //监听身份证格式是否正确
    $('#idCard').change(function () {
        if ($.trim($(this).val()).length == 0) {
            toast_info('未输入身份证','error',1000)
            $(this).css('border', '1px solid red');
        } else if (isCardNo($.trim($(this).val())) == false) {
            $(this).focus();
            $(this).parent().parent().parent().children('span').css('color', 'red');
            $(this).css('border', '1px solid  red');
        } else {
            $(this).parent().parent().parent().children('span').css('color', '#19a689');
            $(this).css('border', '1px solid #ccc');
        }
    });

    /**
     * step-1 点击下一步 验证表单是否填写完整
     **/
    $('#btn-next-1').on('click', function () {
        var statusSelect = 1,
            statusText = 1,
            statusRadio = 1,
            statusIdCard = 1,
            count = 0;
        //验证必填的select表单是否全部选择完整
        $("select").each(function () {
            if ($(this).children('option:selected').val() == '' && $(this).attr('name') != 'area' && $(this).attr('name') != 'school-prov' && $(this).attr('name') != 'school') {
                $(this).css('border', '1px solid red');
                $(this).parent().parent().parent().children('span').css('color', 'red');
                statusSelect = 0;
            }
        });

        // 验证必填的input文本表单是否全部填写完整
        for (var i = 0; i < 3; i++) {
            if ($("input:text").eq(i).val() == '') {
                $("input:text").eq(i).css('border', '1px solid red').parent().parent().parent().children('span').css('color', 'red');
                count += 1;
                statusText = 0;
            }
        }
        // 验证必填的radio是否填写完整
        if ($('input:radio[name="status"]:checked').length == 0) {
            $('input:radio[name="status"]').parent().parent().children('span').css('color', ' red');
            statusRadio = 0;
        }

        //选填：学生填写的字段
        if ($('input[name="status"]:checked ').val() == "0") {
            //验证学院字段
            if($('#department').val() == ""){
                $("#department").css('border', '1px solid red').parent().parent().parent().children('span').css('color', 'red');
                statusText = 0;
            }
            //验证专业字段
            if($('#major').val() == ""){
                $("#major").css('border', '1px solid red').parent().parent().parent().children('span').css('color', 'red');
                statusText = 0;
            }
            //验证选填学校字段
            if($('#school-1').val() == ""  && $('#school').val() == "其它"){
                $("#school-1").css('border', '1px solid red').parent().parent().parent().children('span').css('color', 'red');
                statusText = 0;
            }
            //select框 学校省份
            if($('#school-prov option:selected').val() == ''){
                $("#school-prov").css('border', '1px solid red').parent().parent().parent().children('span').css('color', 'red');
                statusSelect = 0;
            }
            //select框 学校学院
            if($('#school option:selected').val() == ''){
                $("#school").css('border', '1px solid red').parent().parent().parent().children('span').css('color', 'red');
                statusSelect = 0;
            }
        }
        //选填：工作的人填写的字段
        if ($('input[name="status"]:checked ').val() == "1") {
            if($('#company').val() == ""){
                $(this).css('border', '1px solid red');
                $(this).parent().parent().parent().children('span').css('color', 'red');
                statusText = 0;
            }
            if($("#career").val() == ""){
                $(this).css('border', '1px solid red');
                $(this).parent().parent().parent().children('span').css('color', 'red');
                statusText = 0;
            }
            if($('#comp_department').val()==''){
                $(this).css('border', '1px solid red');
                $(this).parent().parent().parent().children('span').css('color', 'red');
                statusText = 0;
            }
        }


        //        验证身份证是否填写正确
        if (isCardNo($.trim($('#idCard').val())) == false) {
            statusIdCard = 0;
            $(this).parent().children('input').css('border', '1px solid  red');
            $(this).parent().parent().parent().children('span').css('color', 'red');
        }

        /* ***************************step-1 所有数据都已经正确提交********************/
        console.log()

        if (statusSelect == 1 && statusText == 1 && statusRadio == 1 && statusIdCard == 1) {
            $('#verify-step-1').removeClass('show');
            $('#verify-step-1').addClass('hide');
            $('#verify-step-2').removeClass('hide');
            $('#verify-step-2').addClass('show');
        }else{
            toast_info('信息未填写完整','warning',1500);
        }
    });


    /**
     * step-2  身份证上传
     */

    //返回上一步
    $('#btn-previous-1').on('click', function () {
        $('#verify-step-2').removeClass('show');
        $('#verify-step-2').addClass('hide');
        $('#verify-step-1').removeClass('hide');
        $('#verify-step-1').addClass('show');
    });

    //身份证图片上传功能实现
    //初始化fileinput插件
    var imgflag1 = 0;
    var imgflag2 = 0;
    $('#file-fr').fileinput({
        language: 'zh',
        uploadUrl: '/user/profile/uploadIdCard/1',
        uploadAsync: true,
        allowedFileExtensions: ['jpg', 'gif', 'png', 'jpeg', 'svg'],
        maxFileCount: 1,
        enctype: 'multipart/form-data',
        showClose: false,
        msgFilesTooMany: "选择上传的文件数量({n}) 超过需要上传的数量{m}！",
        dropZoneTitle: "请上传身份证正面照片 <br/>拖拽照片到这里...",
        maxFileSize:'5120'
    }).on("fileuploaded", function (data) {
        imgflag1 = 1;
        if (data.code == 200) {
            alert("success");
        }
    });
    $('#file-fr1').fileinput({
        language: 'zh',
        uploadUrl: '/user/profile/uploadIdCard/2',
        uploadAsync: true,
        allowedFileExtensions: ['jpg', 'gif', 'png', 'jpeg', 'svg'],
        maxFileCount: 1,
        enctype: 'multipart/form-data',
        showClose: false,
        msgFilesTooMany: "选择上传的文件数量({n}) 超过需要上传的数量{m}！",
        dropZoneTitle: "请上传身份证反面照片 <br/>拖拽照片到这里...",
        maxFileSize:'5120'
    }).on("fileuploaded", function (data) {
        imgflag2 = 1;
        if (data.code == 200) {
            alert("success");
        }
    });

    //点击按钮进入下一步
    $('#btn-next-2').on('click', function () {

        if (imgflag1 === 1 && imgflag2 === 1) {
            //先提交上一步中用户信息的表单
            //上一步已经对提交的表单完整性进行判断所以这一步无需判断
            var home = $('#home').val();
            address = address + home;
            var formData = {
                realName: $('#realname').val(),
                gender: $('#gender').val(),
                education: $('#education').val(),
                type: $('input[name="status"]:checked').val(),
                school: null,
                department:null,
                major: $('#major').val(),
                company: $('#company').val(),
                career: $('#career').val(),
                address: address,
                idCard: $('#idCard').val()
            };

            if($('input[name="status"]:checked').val()==0){
                formData.department=$("#department").val();
            }else{
                formData.department=$("#comp_department").val();
            }
            if ($('#school').val() == "其它") {
                formData.school = $('#school-1').val();
            } else {
                formData.school = $('#school').val();
            }
            //发送请求
            $.ajax({
                type: "post",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(formData),
                url: "/user/verify",
                success: function (data) {
                    if (data.code === 200) {
                        $('#verify-step-2').removeClass('show');
                        $('#verify-step-2').addClass('hide');
                        $('#verify-step-3').removeClass('hide');
                        $('#verify-step-3').addClass('show');
                    }
                    else {
                        toast_info(data.message,'error',1500);
                    }
                }, error: function (data) {
                    toast_info('系统错误','error',1500);
                }
            });
        } else {
            swal({
                title: "未上传正反面两张照片！",
                text: "请点击上传按钮上传身份证的正反面照片！",
                type: "warning",
                confirmButtonColor: "#DD6B55"
            });
        }
    });

    /**
     * 控制身份证照片显示样式
     */
    // var cert1=$("#cert1").val();
    // var cert2=$("#cert2").val();
    // if(cert1!==''&& cert1!==undefined &&cert1!==null){
    //     $('#frm1 .file-drop-zone-title').html("<img src='' id='cert_1'/>");
    //     $("#cert_1").attr("src",cert1);
    //     $(".file-drop-zone-title").addClass("show_pic1");
    // }
    //
    // if(cert2!==''&& cert2!==undefined &&cert2!==null){
    //     $('#frm2 .file-drop-zone-title').html("<img src='' id='cert_2'/>");
    //     $("#cert_2").attr("src",cert2);
    //     $(".file-drop-zone-title").addClass("show_pic2");
    // }
});

/**
 * 处理错误
 * @param data
 */
function processErrResult(data) {
    var responseJSON = data.responseText;
    var json = JSON.parse(responseJSON);
}
