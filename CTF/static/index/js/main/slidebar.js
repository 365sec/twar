$(function () {
    //需要移动的页面区域id为命名 hide-main
    $('#telephone-sidebar-btn').on('click', function () {
        $('#hide-main').css('transform', 'translate3d(300px, 0px, 0px)');
        $('#telephone-sidebar').css('transform', 'translate3d(0px, 0px, 0px)');
        $('#mask').removeClass('hide');
    });
    $('#mask').on('click', function () {
        $('#hide-main').css('transform', 'translate3d(0px, 0px, 0px)');
        $('#telephone-sidebar').css('transform', 'translate3d(-330px, 0px, 0px)');
        $('#mask').addClass('hide');
    })
});