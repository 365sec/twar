$(function () {
  /**
   * header 选中样式
  */
  $('#question').addClass('active');

  /**
   * 试题类型的选择效果切换   默认|最热|最新
   */
    var currentOrderType = $('#currentOrderType').val();
    switch (currentOrderType) {
        case 'default':     // 按默认排序
            $('.order-default').addClass('on');
            $('.order-hot, .order-new').removeClass('on');
            break;
        case 'hottest':         // 按最热排序
            $('.order-hot').addClass('on');
            $('.order-default, .order-new').removeClass('on');
            break;
        case 'newest':         // 按最新排序
            $('.order-new').addClass('on');
            $('.order-default, .order-hot').removeClass('on');
            break;
    }
});