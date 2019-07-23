$(function () {
    $("#contest").addClass('active');

    /**
     * 获取当前已经报名参赛的队伍数
     */
    var contestIdInput = $("input[name='contestId-input']").val();

    $(".contest-list").each(function () {
        var _this = $(this);
        var contestIdInput = _this.find("input[name='contestId-input']").val();
        var path = "/contest/" + contestIdInput + "/teamNum";

        $.ajax({
            type: "get",
            async: false,
            dataType: "json",
            url: path,
            //如果请求成功
            success: function (data) {
                _this.find('.team-num').text(data.data);
            }
        });
    });
});