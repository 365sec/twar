/**
 * Created by Administrator on 2015/12/13 0013.
 */

/**
 * 判断是否包含sql中的敏感字符
 * @param str
 * @returns {boolean}
 */
function filterSqlStr(str) {
    var sqlKeysStr = "and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
    var sqlKeysArray = sqlKeysStr.split(',');
    var isSensitive = false;

    for (var i = 0; i < sqlKeysArray.length; i++) {

        if (str.toLowerCase().indexOf(sqlKeysArray[i]) != -1) {
            isSensitive = true;
            break;
        }
    }
    return isSensitive;
}

/**
 * 判断是否是邮件
 * @param email
 * @returns {boolean}
 */
function isEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //var filter  = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$;
    return filter.test(email);
}

/**
 * 判断是否是手机号码
 * @param phone
 * @returns {boolean}
 */
function isPhone(phone) {
    var filter = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
    return filter.test(phone);
}

/**
 * 判断是否是中文
 * @param ch
 * @returns {boolean}
 */
function isChinese(ch) {
    var filter = /^[\u4e00-\u9fa5]+$/;

    return filter.test(ch);
}

/**
 * 验证身份证号码
 * @param id
 * @returns {boolean}
 */
function isIdentityId(id) {
    //var filter = /(^\d{15}&)|(^\d{18})|(^\d{17}(\d|x|X)$)/;
    var filter = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    return filter.test(id);

}

/**
 * 简单判定账号
 * @returns {boolean}
 */
function checkAccount(account) {
    if (account == null || account === "") {
        toast_info("请输入账号",'warning',1000);
        return false;
    }

    if (filterSqlStr(account)) {
        toast_info('非法账号','error',1000);
        return false;
    }
    return true;
}
/**
 * 简单判定旧版本账号
 * @returns {boolean}
 */
function checkOldAccount(account) {
    if (account == null || account === "") {
        toast_info("请输入旧平台账号",'warning',1000);
        return false;
    }

    if (filterSqlStr(account)) {
        toast_info('非法账号','error',1000);
        return false;
    }
    return true;
}

/**
 * 简单判定输入有无非法字符
 * @returns {boolean}
 */
function checkStr(str) {
    if (filterSqlStr(str)) {
        toast_info('非法账号','error',1000);
        return false;
    }
}

/**
 * 简单判定密码
 * @returns {boolean}
 */
function checkPassword(password) {
    if (password === null || password === "") {
        toast_info("请输入密码",'warning',1000);
        return false;
    }
    if (filterSqlStr(password)) {
        toast_info('非法密码','error',1000);
        return false;
    }
    return true
}

/**
 * 简单判定验证码
 * @returns {boolean}
 */
function checkVerifyCode(verify_code) {
    if (verify_code === null || verify_code === "") {
        toast_info("请输入验证码",'warning',1000);
        return false;
    }

    if (verify_code.length != 6) {
        toast_info("请输入6位验证码",'warning',1000);
        return false;
    }

    if (filterSqlStr(verify_code)) {
        toast_info('非法验证码','error',1000);
        return false;
    }
    return true;
}

/**
 * 简单判定手机验证码
 * @param phoneVerifyCode
 */
function checkPhoneVerifyCode(phoneVerifyCode) {
    if (phoneVerifyCode === null || phoneVerifyCode === "") {
        toast_info("请输入6位数字短信验证码",'warning',1000);
        return false;
    }

    if (phoneVerifyCode.length != 6) {
        toast_info("请输入6位验证码",'warning',1000);
        return false;
    }
    if (filterSqlStr(phoneVerifyCode)) {
        toast_info('非法验证码','error',1000);
        return false;
    }
    return true;
}

/**
 * 通用通知
 * @param title
 * @param content
 */
function toast(title, content) {
    swal({
        title: title,
        text: content
    });
}



