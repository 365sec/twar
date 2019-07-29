var Login = function () {
    "use strict";

    function e() {
        var e = iYQ.setParam("type", "reset", iYQ.setParam("atn", "resetPwdList", oapiAtnURL)),
            n = {ajaxUrl: e, ajaxData: {loadType: "autoload"}, element: $("#content")};
        iYQ.Page.loadJSON(n, function (e) {
            $("#content").html(t(e.pageContent))
        })
    }

    var n, t = Handlebars.template(function (e, n, t, a, i) {
        function o(e, n) {
            var a, i, o = "";
            return o += '\r\n								<th width="', (i = t.width) ? a = i.call(e, {
                hash: {},
                data: n
            }) : (i = e && e.width, a = typeof i === l ? i.call(e, {
                hash: {},
                data: n
            }) : i), o += c(a) + '">', (i = t.name) ? a = i.call(e, {
                hash: {},
                data: n
            }) : (i = e && e.name, a = typeof i === l ? i.call(e, {
                hash: {},
                data: n
            }) : i), o += c(a) + "</th>\r\n								"
        }

        function r(e, n) {
            var a, i, o = "";
            return o += '\r\n							<tr>\r\n								<td class="td-name">\r\n									', (i = t.username) ? a = i.call(e, {
                hash: {},
                data: n
            }) : (i = e && e.username, a = typeof i === l ? i.call(e, {
                hash: {},
                data: n
            }) : i), o += c(a) + '\r\n								</td>\r\n								<td class="td-operation">\r\n									', (i = t.remark) ? a = i.call(e, {
                hash: {},
                data: n
            }) : (i = e && e.remark, a = typeof i === l ? i.call(e, {
                hash: {},
                data: n
            }) : i), o += c(a) + '\r\n								</td>\r\n								<td class="td-time">\r\n									', (i = t.created_at) ? a = i.call(e, {
                hash: {},
                data: n
            }) : (i = e && e.created_at, a = typeof i === l ? i.call(e, {
                hash: {},
                data: n
            }) : i), o += c(a) + "\r\n								</td>\r\n							</tr>\r\n							"
        }

        this.compilerInfo = [4, ">= 1.0.0"], t = this.merge(t, e.helpers), i = i || {};
        var s, d = "", l = "function", c = this.escapeExpression, m = this;
        return d += '<!-- start: PAGE CONTENT -->\r\n<div class="row">\r\n	<div class="col-md-12">\r\n		<div id="list" class="panel panel-white">\r\n			<div class="panel-heading">\r\n				<h4 class="panel-title"></h4>\r\n				<div class="panel-tools"></div>\r\n			</div>\r\n			<div class="panel-body fadeIn animated">\r\n				<div id="list_dt" class="dt-panel">\r\n					<div id="list_head" class="row dt-head hide">\r\n						<div class="col-sm-6">\r\n							<div class="btn-group"></div>\r\n						</div>\r\n						<div class="col-sm-6"></div>\r\n					</div>\r\n					<div class="dt-list">\r\n						<table id="listTable" class="table table-striped table-bordered table-hover table-nowrap">\r\n							<thead>\r\n							<tr>\r\n								', s = t.each.call(n, (s = n && n.datatable, null == s || s === !1 ? s : s.tbhead), {
            hash: {},
            inverse: m.noop,
            fn: m.program(1, o, i),
            data: i
        }), (s || 0 === s) && (d += s), d += "\r\n							</tr>\r\n							</thead>\r\n							<tbody>\r\n							", s = t.each.call(n, (s = n && n.datatable, null == s || s === !1 ? s : s.tbbody), {
            hash: {},
            inverse: m.noop,
            fn: m.program(3, r, i),
            data: i
        }), (s || 0 === s) && (d += s), d += "\r\n							</tbody>\r\n						</table>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n<!-- end: PAGE CONTENT-->"
    }), a = function () {
        var e = $(".box-login");
        if (o("box").length) switch (o("box")) {
            case"forgot":
                e = $(".box-forgot");
                break;
            case"register":
                e = $(".box-register");
                break;
            case"reset":
                e = $(".box-reset");
                break;
            default:
                e = $(".box-login")
        }
        e.show().addClass("animated flipInX").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            $(this).removeClass("animated flipInX")
        })
    }, i = function () {
        $(".forgot").on("click", function () {
            r("box", "forgot"), $(".box-login").removeClass("animated flipInX").addClass("animated bounceOutRight").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).hide().removeClass("animated bounceOutRight")
            }), $(".box-forgot").show().addClass("animated bounceInLeft").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).show().removeClass("animated bounceInLeft")
            })
        }), $(".register").on("click", function () {
            r("box", "register"), $(".box-login").removeClass("animated flipInX").addClass("animated bounceOutRight").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).hide().removeClass("animated bounceOutRight")
            }), $(".box-register").show().addClass("animated bounceInLeft").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).show().removeClass("animated bounceInLeft")
            })
        }), $(".reset").on("click", function () {
            r("box", "reset"), $(".box-login").removeClass("animated flipInX").addClass("animated bounceOutRight").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).hide().removeClass("animated bounceOutRight")
            }), $(".box-reset").show().addClass("animated bounceInLeft").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).show().removeClass("animated bounceInLeft")
            })
        }), $(".showHistory").on("click", function () {
            r("box", "rootResetList"), $(".box-reset").removeClass("animated flipInX").addClass("animated bounceOutRight").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).hide().removeClass("animated bounceOutRight")
            }), $(".box-rootResetList").show().addClass("animated bounceInLeft").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).show().removeClass("animated bounceInLeft")
            })
        }), $(".go-back").click(function () {
            var e;
            e = $($(".box-register").is(":visible") ? ".box-register" : $(".box-forgot").is(":visible") ? ".box-forgot" : ".box-reset"), e.addClass("animated bounceOutLeft").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                e.hide().removeClass("animated bounceOutLeft")
            }), r("box", "login"), $(".box-login").show().addClass("animated bounceInRight").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).show().removeClass("animated bounceInRight")
            })
        }), $(".go-reset").on("click", function () {
            $(".box-rootResetList").addClass("animated bounceOutLeft").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).hide().removeClass("animated bounceOutLeft")
            }), r("box", "reset"), $(".box-reset").show().addClass("animated bounceInRight").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).show().removeClass("animated bounceInRight")
            })
        })
    }, o = function (e) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var n = new RegExp("[\\?&]" + e + "=([^&#]*)"), t = n.exec(location.search);
        return null == t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
    }, r = function (e, n) {
        var t = new Object;
        t[e] = n, t.rand = Math.random(), history.replaceState(t, "", "?" + e + "=" + n)
    }, s = function () {
        var e = $(".form-login .errorHandler"), t = $("#username");
        t.unbind("change").bind("change", function () {
            iYQ.ajax({
                type: "post",
                url: oapiAtnURL,
                dataType: "json",
                data: {atn: "userCodeObj", username: t.val()},
                loading: !1,
                iyqSuccess: function (e) {
                    e.isCodeShow ? d() : l()
                }
            })
        }), iYQ.Page.validaForm({
            formEle: "#login_form",
            validator: {
                rules: {username: {required: !0}, password: {required: !0}, identifyingCode: {required: !0}},
                submitHandler: function () {
                    e.hide()
                }
            },
            formCallBack: function (t) {
                for (var a = [], i = 0; i < t.length; i++) if ("password" === t[i].name) {
                    var o = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(t[i].value), CryptoJS.enc.Utf8.parse(n), {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    }).toString();
                    a.push({name: "password", value: o})
                } else a.push(t[i]);
                for (var r = _.filter(_.sortBy(a, "name"), function (e) {
                    return _.isNumber(e.value) || _.isString(e.value) || _.isBoolean(e.value)
                }), s = "", i = 0; i < r.length; i++) r[i].name.indexOf("[]") < 0 && (s += r[i].name + "=" + r[i].value, i < r.length - 1 && (s += "&&"));
                iYQ.debug && iYQ.CS.log("signature====================================>", s), r.push({
                    name: "signature",
                    value: CryptoJS.MD5(CryptoJS.SHA1(s).toString(CryptoJS.enc.Hex)).toString(CryptoJS.enc.Hex)
                }), iYQ.ajax({
                    isForm: !0,
                    submitBtn: $("#btn_submit"),
                    type: "POST",
                    dataType: "json",
                    url: loginURL,
                    data: r,
                    success: function (n) {
                        $.unblockUI(), 1 == n.code ? n.ret.isTest && n.ret.isTest.length ? (iYQ.iMSG("\u8bd5\u7528\u7248", n.ret.isTest, "top-right"), e.html('<i class="fa fa-remove"></i>&nbsp;' + n.ret.isTest).show(), new iYQ.Task({
                            name: "dologin",
                            task: function () {
                                location.href = n.ret.url
                            },
                            delay: 2e3
                        })) : location.href = n.ret.url : (n.isCodeShow ? d() : l(), e.html('<i class="fa fa-remove"></i>&nbsp;' + n.msg).show()), setTimeout(function () {
                            $("#btn_submit").size() > 0 && $("#btn_submit").prop("disabled", !1)
                        }, 800)
                    }
                })
            }
        })
    }, d = function () {
        var e = $("#code"), n = (new Date).getTime(), t = codeUrl + "&timeLine=" + n;
        if (e.length < 1) {
            var a = '<div class="form-group clearfix" id="code"><span class="input-icon pull-right"><img src="' + t + '" class="pull-left" alt="identifyingCode image" style="width: 120px;height: 34px;cursor: pointer"></span><span class="input-icon pull-left" style="width: calc(100% - 160px);"><input type="text" class="form-control" autocomplete="off" name="identifyingCode" id="identifyingCode" placeholder="\u9a8c\u8bc1\u7801"><i class="fa fa-shield"></i></span></div>',
                i = $("#btn_area");
            i.before(a), $("#code").find("img").on("click", c)
        } else e.find("img").attr("src", t)
    }, l = function () {
        var e = $("#code");
        e.remove()
    }, c = function () {
        var e = (new Date).getTime(), n = codeUrl + "&timeLine=" + e;
        $(this).attr("src", n)
    }, m = function () {
        iYQ.ajax({
            type: "get", url: oapiAtnURL, dataType: "json", data: {atn: getAesPwdAtn}, iyqSuccess: function (t) {
                t.errorMessage ? iYQ.iMSG.error("\u64cd\u4f5c\u51fa\u9519\uff01", t.errorMessage) : (iYQ.debug && iYQ.iMSG("\u64cd\u4f5c\u6210\u529f\uff01", t.msg), n = t.aesPwd, s(), p(), u(), f(), g(), e(), $("#username").trigger("focus"))
            }
        })
    }, u = function () {
        $("#certificate_login").on("click", function () {
            iYQ.ajax({
                type: "post",
                url: oapiAtnURL,
                dataType: "json",
                data: {atn: certificateAtn},
                iyqSuccess: function (e) {
                    e.errorMessage ? iYQ.iMSG.error("\u64cd\u4f5c\u51fa\u9519\uff01", e.errorMessage) : (iYQ.iMSG("\u64cd\u4f5c\u6210\u529f\uff01", e.msg), new iYQ.Task({
                        name: "doCertificateLogin",
                        task: function () {
                            location.href = e.url
                        },
                        delay: 2e3
                    })), $.unblockUI()
                }
            })
        })
    }, p = function () {
        var e = $(".form-register .errorHandler"), t = $(".form-register .messageHandler");
        iYQ.debug && iYQ.CS.log("encrypt_key=================>" + n), iYQ.debug && iYQ.CS.log(CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse("123456"), CryptoJS.enc.Utf8.parse(n), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString()), iYQ.debug && iYQ.CS.log(CryptoJS.AES.decrypt("cWKdZsCnR8tZNvi1HCqbtQ==", CryptoJS.enc.Utf8.parse(n), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8)), iYQ.Page.validaForm({
            formEle: "#register-form",
            validator: {
                rules: {
                    nickname: {required: !0},
                    password_reg: {
                        required: !0,
                        remote: {
                            url: signURL, type: "POST", data: {
                                atn: "pwdLevelValidate", password_reg: function () {
                                    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($("#password_reg").val()), CryptoJS.enc.Utf8.parse(n), {
                                        mode: CryptoJS.mode.ECB,
                                        padding: CryptoJS.pad.Pkcs7
                                    }).toString()
                                }
                            }
                        }
                    },
                    password_again: {required: !0, equalTo: "#password_reg"},
                    email: {email: !0},
                    phone: {moblie: !0}
                }, submitHandler: function () {
                    e.hide(), t.hide()
                }
            },
            formCallBack: function (a) {
                for (var i = [], o = 0; o < a.length; o++) if ("password_reg" === a[o].name || "password_again" === a[o].name) {
                    var r = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(a[o].value), CryptoJS.enc.Utf8.parse(n), {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    }).toString();
                    i.push({name: a[o].name, value: r})
                } else i.push(a[o]);
                for (var s = _.filter(_.sortBy(i, "name"), function (e) {
                    return _.isNumber(e.value) || _.isString(e.value) || _.isBoolean(e.value)
                }), d = "", o = 0; o < s.length; o++) s[o].name.indexOf("[]") < 0 && (d += s[o].name + "=" + s[o].value, o < s.length - 1 && (d += "&&"));
                iYQ.debug && iYQ.CS.log("signature====================================>", d), s.push({
                    name: "signature",
                    value: CryptoJS.MD5(CryptoJS.SHA1(d).toString(CryptoJS.enc.Hex)).toString(CryptoJS.enc.Hex)
                }), iYQ.ajax({
                    isForm: !0,
                    submitBtn: $("#btn_submit"),
                    type: "POST",
                    dataType: "json",
                    url: signURL,
                    data: s,
                    success: function (n) {
                        $.unblockUI(), 1 == n.code ? n.ret.isTest && n.ret.isTest.length ? (iYQ.iMSG("\u8bd5\u7528\u7248", n.ret.isTest, "top-right"), e.html('<i class="fa fa-remove"></i>&nbsp;' + n.ret.isTest).show(), new iYQ.Task({
                            name: "doRegister",
                            task: function () {
                                location.href = n.ret.url
                            },
                            delay: 2e3
                        })) : (iYQ.iMSG("\u64cd\u4f5c\u6210\u529f", n.msg, "top-right"), t.html('<i class="fa fa-check"></i>&nbsp;' + n.msg).show(), new iYQ.Task({
                            name: "goback",
                            task: function () {
                                $("#register-form").get(0).reset()
                            },
                            delay: 2e3
                        })) : e.html('<i class="fa fa-remove"></i>&nbsp;' + n.msg).show(), setTimeout(function () {
                            $("#btn_submit").size() > 0 && $("#btn_submit").prop("disabled", !1)
                        }, 800)
                    }
                })
            }
        })
    }, f = function () {
        var e = $(".form-reset .errorHandler"), t = $(".form-reset .messageHandler");
        iYQ.debug && iYQ.CS.log("encrypt_key=================>" + n), iYQ.debug && iYQ.CS.log(CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse("123456"), CryptoJS.enc.Utf8.parse(n), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString()), iYQ.debug && iYQ.CS.log(CryptoJS.AES.decrypt("cWKdZsCnR8tZNvi1HCqbtQ==", CryptoJS.enc.Utf8.parse(n), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8)), iYQ.Page.validaForm({
            formEle: "#reset_form",
            validator: {
                rules: {
                    resetRootPwd: {
                        required: !0,
                        remote: {
                            url: signURL, type: "POST", data: {
                                atn: "pwdLevelValidate", password_reg: function () {
                                    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($("#resetRootPwd").val()), CryptoJS.enc.Utf8.parse(n), {
                                        mode: CryptoJS.mode.ECB,
                                        padding: CryptoJS.pad.Pkcs7
                                    }).toString()
                                }, resetRootPwd: function () {
                                    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse($("#resetRootPwd").val()), CryptoJS.enc.Utf8.parse(n), {
                                        mode: CryptoJS.mode.ECB,
                                        padding: CryptoJS.pad.Pkcs7
                                    }).toString()
                                }
                            }
                        }
                    }, repeatResetRootPwd: {required: !0, equalTo: "#resetRootPwd"}, certification: {required: !0}
                }, submitHandler: function () {
                    e.hide(), t.hide()
                }
            },
            formCallBack: function (a) {
                for (var i = [], o = 0; o < a.length; o++) if ("resetRootPwd" === a[o].name || "repeatResetRootPwd" === a[o].name) {
                    var r = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(a[o].value), CryptoJS.enc.Utf8.parse(n), {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    }).toString();
                    i.push({name: a[o].name, value: r})
                } else i.push(a[o]);
                for (var s = _.filter(_.sortBy(i, "name"), function (e) {
                    return _.isNumber(e.value) || _.isString(e.value) || _.isBoolean(e.value)
                }), d = "", o = 0; o < s.length; o++) s[o].name.indexOf("[]") < 0 && (d += s[o].name + "=" + s[o].value, o < s.length - 1 && (d += "&&"));
                iYQ.debug && iYQ.CS.log("signature====================================>", d), s.push({
                    name: "signature",
                    value: CryptoJS.MD5(CryptoJS.SHA1(d).toString(CryptoJS.enc.Hex)).toString(CryptoJS.enc.Hex)
                }), iYQ.ajax({
                    isForm: !0,
                    submitBtn: $("#reset_btn_submit"),
                    type: "POST",
                    dataType: "json",
                    url: resetURL,
                    data: s,
                    success: function (n) {
                        $.unblockUI(), 1 == n.code ? (iYQ.iMSG("\u64cd\u4f5c\u6210\u529f", n.msg, "top-right"), t.html('<i class="fa fa-check"></i>&nbsp;' + n.msg).show(), new iYQ.Task({
                            name: "goback",
                            task: function () {
                                $("#reset_form").get(0).reset()
                            },
                            delay: 2e3
                        })) : e.html('<i class="fa fa-remove"></i>&nbsp;' + n.msg).show(), setTimeout(function () {
                            $("#reset_btn_submit").size() > 0 && $("#reset_btn_submit").prop("disabled", !1)
                        }, 800)
                    }
                })
            }
        })
    }, g = function () {
        iYQ.ajax({
            type: "post",
            url: oapiAtnURL,
            dataType: "json",
            data: {atn: "getEncryption"},
            loading: !1,
            iyqSuccess: function (e) {
                e.encryption && $("#encryption").html(e.encryption), e.file_path && $("#file_download").attr("href", e.file_path)
            }
        })
    };
    return {
        init: function () {
            a(), i(), m()
        }
    }
}();
$(document).ready(function () {
    Login.init()
});