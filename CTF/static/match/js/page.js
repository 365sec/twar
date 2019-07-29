LazyLoad = function (e) {
    function t(t, n) {
        var s, r = e.createElement(t);
        for (s in n) n.hasOwnProperty(s) && r.setAttribute(s, n[s]);
        return r
    }

    function n(e) {
        var t, n, s = i[e];
        s && (t = s.callback, n = s.urls, n.shift(), u = 0, n.length || (t && t.call(s.context, s.obj), i[e] = null, f[e].length && r(e)))
    }

    function s() {
        var t = navigator.userAgent;
        o = {async: e.createElement("script").async === !0}, (o.webkit = /AppleWebKit\//.test(t)) || (o.ie = /MSIE|Trident/.test(t)) || (o.opera = /Opera/.test(t)) || (o.gecko = /Gecko\//.test(t)) || (o.unknown = !0)
    }

    function r(r, u, h, g, d) {
        var y, p, b, k, m, v, j = function () {
            n(r)
        }, w = "css" === r, T = [];
        if (o || s(), u) if (u = "string" == typeof u ? [u] : u.concat(), w || o.async || o.gecko || o.opera) f[r].push({
            urls: u,
            callback: h,
            obj: g,
            context: d
        }); else for (y = 0, p = u.length; p > y; ++y) f[r].push({
            urls: [u[y]],
            callback: y === p - 1 ? h : null,
            obj: g,
            context: d
        });
        if (!i[r] && (k = i[r] = f[r].shift())) {
            for (l || (l = e.head || e.getElementsByTagName("head")[0]), m = k.urls, y = 0, p = m.length; p > y; ++y) {
                if (v = m[y], w ? b = o.gecko ? t("style") : t("link", {
                    href: v,
                    rel: "stylesheet"
                }) : (b = t("script", {src: v}), b.async = !1), b.className = "lazyload", b.setAttribute("charset", "utf-8"), o.ie && !w && "onreadystatechange" in b && !("draggable" in b)) b.onreadystatechange = function () {
                    /loaded|complete/.test(b.readyState) && (b.onreadystatechange = null, j())
                }; else if (w && (o.gecko || o.webkit)) if (o.webkit) {
                    var A;
                    if (k.urls[y] = b.href, A = a()) {
                        y--, p = m.length;
                        continue
                    }
                } else b.innerHTML = '@import "' + v + '";', c(b); else b.onload = b.onerror = j;
                T.push(b)
            }
            for (y = 0, p = T.length; p > y; ++y) l.appendChild(T[y])
        }
    }

    function c(e) {
        var t;
        try {
            t = !!e.sheet.cssRules
        } catch (s) {
            return u += 1, void(200 > u ? setTimeout(function () {
                c(e)
            }, 50) : t && n("css"))
        }
        n("css")
    }

    function a() {
        var e, t = i.css, s = !1;
        if (t) {
            for (e = h.length; --e >= 0;) if (h[e].href === t.urls[0]) {
                s = !0, n("css");
                break
            }
            u += 1, t && (200 > u ? setTimeout(a, 50) : n("css"))
        }
        return s
    }

    var o, l, i = {}, u = 0, f = {css: [], js: []}, h = e.styleSheets;
    return {
        css: function (e, t, n, s) {
            r("css", e, t, n, s)
        }, js: function (e, t, n, s) {
            r("js", e, t, n, s)
        }
    }
}(this.document);
;var iYQ;
iYQ = {
    debug: !1, CS: window.console || {
        log: function () {
        }, warn: function () {
        }, error: function () {
        }
    }, util: {
        killIE: function () {
            var e = parseInt(this.getBrowserVersion());
            try {
                if (11 > e) {
                    if ($("#warn").length > 0) return $("#warn").show(), !1;
                    var t = Number($(document).width()) / 2 - 220,
                        i = '<style type="text/css">html,body{overflow:hidden;}#warn{width:500%;height:500%;left:0;top:0;background-color:#000;position:absolute;z-index:99999;filter:Alpha(opacity=85);-moz-opacity:.85;opacity:0.85;}#warn p{border:5px solid red;line-height:30px;width:450px;margin:250px 0 0 ' + t + "px;font-size:13px;background-color:#fff;padding:15px;}#warn a{font-size:13px;text-decoration:underline;}</style>";
                    $("body").prepend(i + '<div id="warn"><p><span style="color:red;font-weight:bold;font-size:14px;">\u5bf9\u4e0d\u8d77:</span><br>\u60a8\u6240\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u65e0\u6cd5\u6ee1\u8db3\u8bbf\u95ee\u672c\u5e73\u53f0\u6700\u4f4e\u9700\u6c42\uff01\u63a8\u8350\u4f7f\u7528Chrome\u8bbf\u95ee\u3002<br>\u79bb\u7ebf\u5b89\u88c5\u5305\uff1a<a href="/static/browsers/ChromeStandaloneSetup64.exe" target="_blank">WIN64\u4f4d</a>\u3001<a href="/static/browsers/ChromeStandaloneSetup.exe" target="_blank">WIN32\u4f4d</a>\u3001<a href="/static/browsers/googlechrome.dmg" target="_blank">MAC\u7248</a>\u3001<a href="/static/browsers/google-chrome-stable_current_amd64.deb" target="_blank">Linux64\u4f4d</a>\u3001<a href="/static/browsers/google-chrome-stable_current_i386.deb" target="_blank">Linux32\u4f4d</a><br>Firefox\u79bb\u7ebf\u5b89\u88c5\u5305\uff1a<a href="/static/browsers/Firefox-win64.exe" target="_blank">WIN64\u4f4d</a>\u3001<a href="/static/browsers/Firefox-win32.exe" target="_blank">WIN32\u4f4d</a>\u3001<a href="/static/browsers/Firefox-mac.dmg" target="_blank">MAC\u7248</a>\u3001<a href="/static/browsers/Firefox-Linux64.tar.bz2" target="_blank">Linux64\u4f4d</a>\u3001<a href="/static/browsers/Firefox-Linux.tar.bz2" target="_blank">Linux32\u4f4d</a></p></div>')
                }
            } catch (r) {
                alert(r + "  \n=>\u5bf9\u4e0d\u8d77:\n\u60a8\u6240\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u7248\u672c\u592a\u4f4e\uff0c\u5b83\u65e0\u6cd5\u8bbf\u95ee\u672c\u7f51\u7ad9\u7684\u9700\u6c42\uff01\n\u8bf7\u4e0b\u8f7d\u4f7f\u7528 Chrome\u6d4f\u89c8\u5668\u8fdb\u884c\u8bbf\u95ee\uff01")
            }
        }, getBrowserVersion: function () {
            var e = navigator.userAgent.toLowerCase();
            if (null != e.match(/msie ([\d.]+)/)) return uaMatch = e.match(/msie ([\d.]+)/), uaMatch[1];
            if (e.match(/(trident)\/([\w.]+)/)) switch (uaMatch = e.match(/trident\/([\w.]+)/), uaMatch[1]) {
                case"4.0":
                    return "8";
                case"5.0":
                    return "9";
                case"6.0":
                    return "10";
                case"7.0":
                    return "11";
                default:
                    return "undefined"
            }
            return "undefined"
        }, isArray: function (e) {
            return e && "object" == typeof e && "number" == typeof e.length && "function" == typeof e.splice && !e.propertyIsEnumerable("length")
        }, isEmpty: function (e, t) {
            var i = this;
            return null === e || void 0 === e || (t ? !1 : "" === e) || i.isArray(e) && 0 === e.length
        }, contains: function (e, t) {
            return e.contains ? e != t && e.contains(t) : !!(16 & e.compareDocumentPosition(t))
        }, sort: function (e, t, i) {
            return e.sort(function (e, r) {
                var n = r[t] - e[t];
                return (isNaN(n) ? r[t].localeCompare(e[t]) : n) * (i || 1)
            })
        }, serToArr: function (e, t) {
            if (t) {
                var i = {};
                return $.each(e, function () {
                    i[this.name] = i[this.name] && i[this.name].length ? i[this.name] + "," + this.value : this.value
                }), i
            }
            var i = new Array;
            return $.each(e, function () {
                i.push(this.value || "")
            }), i.join(",")
        }, getParam: function (e, t) {
            var i, r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i");
            i = "undefined" != typeof t ? t : window.location.search;
            var n = i.substr(1).match(r);
            return null != n ? unescape(n[2]) : ""
        }, setParam: function (e, t, i) {
            var r, n, a, o = new String;
            if ("undefined" != typeof i) if ("new" == i) {
                var s = window.location.href;
                r = s.substring(0, s.indexOf("?"))
            } else r = i.replace(/(#.*)/, ""), n = i.match(/(#.*)/); else r = window.location.href.replace(/(#.*)/, ""), n = window.location.href.match(/(#.*)/);
            if (a = null == n || 0 == n.length ? "" : n[0], iYQ.util.isEmpty(r)) return iYQ.iMSG.error("\u51fa\u9519\u4e86\uff01", "URL\u4fe1\u606f\u4e0d\u80fd\u4e3a\u7a7a\uff01\uff01"), "#isEmpty";
            if (-1 != r.indexOf("?")) {
                var l = r.substr(r.indexOf("?") + 1);
                if (-1 == l.toLowerCase().indexOf(e.toLowerCase())) o = r + "&" + e + "=" + t; else {
                    for (var u = l.split("&"), c = 0; c < u.length; c++) u[c].substr(0, u[c].indexOf("=")).toLowerCase() == e.toLowerCase() && (u[c] = u[c].substr(0, u[c].indexOf("=")) + "=" + t);
                    o = r.substr(0, r.indexOf("?") + 1) + u.join("&")
                }
            } else o = r + "?" + e + "=" + t;
            return "page" == e || "" == iYQ.getParam("page") || i || (o = o.replace(/(page=+([0-9])*(?=&|#)+)/g, "page=0")), o + a
        }, blockui: function (e, t, i) {
            var r = this, n = e.parents(".grid-body:has(>div[data-ajaxurl])"), a = e.attr("id") || "blockui";
            if (n.size() < 1) {
                if (!($(".modal:visible").size() > 0)) return !1;
                n = e
            }
            if (n.size() > 0) {
                if (n.find(".iyq-loading")[0]) {
                    var o = $(".iyq-loading", n);
                    o.is(":hidden") && o.show()
                } else {
                    var o = $('<div class="iyq-loading"><div class="dot"><b></b><b></b><b></b><b></b><b></b></div></div>');
                    o.prependTo(n)
                }
                i && i > 0 && new iYQ.Task({
                    name: a + "blockui", task: function () {
                        r.unblockui(e, a)
                    }, delay: i
                })
            }
        }, unblockui: function (e, t) {
            var i = e.parents(".grid").find(".grid-body");
            _id = t || e.attr("id") || "blockui", i.size() < 1 && (i = $(".modal:visible").size() > 0 ? e : e.parents(".grid-body")), iYQ.Task.kill(_id + "blockui"), iYQ.Task.kill(_id + "blockui_reset", 1), i.find(".iyq-loading").remove()
        }, showMSG: function (e) {
            var t, i = e.self;
            t = {
                title: i.data("type") || e.type || "\u63d0\u793a",
                text: i.data("text") || e.text,
                sticky: i.data("sticky") || e.sticky || !0,
                position: i.data("position") || e.position || "top-left",
                class_name: i.data("class_name") || e.class_name || "my-sticky-class",
                image: i.data("image") || e.image || "",
                fade_in_speed: 100,
                fade_out_speed: 100,
                time: e.time || 12e3
            }, $.gritter.add(t) || alert(t.cont)
        }, showTip: function (e, t, i, r, n, a, o, s) {
            iYQ.debug && iYQ.CS.log("iYQ.showTip: $.type(arguments[1]) = " + $.type(arguments[1])), "string" == typeof arguments[1] && (opts = {
                title: e,
                text: t,
                sticky: !1,
                position: i || "top-right",
                class_name: n || "animation fada",
                image: a || "",
                before_open: function () {
                    $.isFunction(o) && o()
                },
                after_close: function () {
                    $.isFunction(s) && s()
                },
                fade_in_speed: 100,
                fade_out_speed: 100,
                time: r || 6e3
            }, $.gritter.add(opts) || alert(t))
        }, showError: function (e, t, i, r, n, a) {
            "string" == typeof arguments[1] && (opts = {
                title: '<i class="icon-warning-sign"></i> ' + e,
                text: t,
                sticky: !1,
                position: i || "top-right",
                class_name: n || "gritter-error fada",
                image: a || "",
                fade_in_speed: 100,
                fade_out_speed: 200,
                time: r || 1e4
            }, $.unblockUI(), $.gritter.add(opts) || alert(t))
        }
    }
}, iYQ.util.killIE(), iYQ.getParam = iYQ.util.getParam, iYQ.setParam = iYQ.util.setParam, iYQ.iMSG = iYQ.util.showTip, iYQ.iMSG.error = iYQ.util.showError, iYQ.bbox = window.bootbox || {
    confirm: function () {
    }, prompt: function () {
    }, dialog: function () {
    }
}, iYQ.confirm = iYQ.bbox.confirm || {}, iYQ.dialog = iYQ.bbox.dialog, iYQ.alert = iYQ.bbox.alert, iYQ.Task = function (e) {
    var t = e.type || 0;
    for (var i in e) this[i] = e[i];
    iYQ.Task.pool[t][e.name] = 1 == t ? setInterval(e.task, e.delay) : setTimeout(e.task, e.delay)
}, iYQ.Task.pool = [{}, {}], iYQ.Task.kill = function (e, t) {
    var i = t || 0, r = iYQ.Task.pool[i];
    if (e) 1 == i ? clearInterval(r[e]) : clearTimeout(r[e]), delete r[e]; else for (var n in r) clearTimeout(r[n]), clearInterval(r[n]), delete r[n];
    iYQ.debug && iYQ.CS.log("@iYQ.Task.kill ===> Name:" + e + " Type:" + i)
}, iYQ.Task.killAll = function () {
    this.kill();
    var e = iYQ.Task.pool[0];
    for (var t in e) clearTimeout(e[t]), delete e[t];
    var i = iYQ.Task.pool[1];
    for (var t in i) clearInterval(i[t]), delete i[t]
}, iYQ.ajax = function (e) {
    var t = {cache: !1};
    return t.beforeSend = e.beforeSend || function () {
        0 != e.loading && $.blockUI({message: '<i class="fa fa-spinner fa-spin"></i> \u9875\u9762\u52a0\u8f7d\u4e2d...'})
    }, t.dataFilter = function (e, t) {
        iYQ.debug && iYQ.CS.log("@iYQ.ajax ===> dataFilter type:" + t);
        var i;
        if ("timeOut" == e) return window.location.href = location.href.split("#")[0], !1;
        switch (t) {
            case"json":
                -100 == e.code || "[object XMLDocument]" == e ? ($(".modal").modal("hide").empty(), iYQ.Login.open({
                    retUrl: e.retUrl,
                    msg: e.msg,
                    type: e.type
                })) : i = e;
                break;
            case"xml":
            case"html":
            default:
                if (-1 != e.indexOf('<body class="error-body')) return window.location.href = location.href.split("#")[0], !1;
                i = e
        }
        return i
    }, !e.success && e.iyqSuccess && (t.success = function (t) {
        e.el && 0 != e.loading && setTimeout(function () {
            iYQ.util.unblockui(e.el)
        }, 800), e.isForm && setTimeout(function () {
            (e.submitBtn ? e.submitBtn : $("#btn_submit")).prop("disabled", !1)
        }, 800), t.code >= 1 ? e.iyqSuccess(t) : -100 == t.code ? ($(".modal").modal("hide").empty(), iYQ.Task.killAll(), iYQ.dialog({
            title: "\u9519\u8bef\u63d0\u793a",
            message: '<p class="ng-binding">' + t.msg + "</p>",
            buttons: {
                main: {
                    label: "\u786e\u5b9a", className: "btn-primary", callback: function () {
                        location.href = t.url
                    }
                }
            }
        })) : (e.iyqErrCode ? e.iyqErrCode(t) : iYQ.iMSG.error("\u64cd\u4f5c\u5931\u8d25\uff01", t.msg), $.unblockUI())
    }), t.error = function (t, i, r) {
        e.iyqError ? e.iyqError(t, i, r) : e.error || (e.el ? e.el.html('<div class="alert alert-error"><button class="close" data-dismiss="alert"></button><h4 class="alert-heading">\u52a0\u8f7dAJAX\u51fa\u73b0\u9519\u8bef\uff1a</h4><br/> URL\uff1a' + e.url + "<br/> info\uff1a" + i + "<br/> XHR.status\uff1a" + t.status + "<br/> XHR.readyState\uff1a" + t.readyState + "</div>") : iYQ.debug && iYQ.CS.log("@iYQ.ajax ===> \u52a0\u8f7dAJAX\u51fa\u73b0\u9519\u8bef\uff1aURL\uff1a" + e.url + "\n info: " + i + "\n XHR.status: " + t.status + "\n XHR.readyState: " + t.readyState)), "abort" != i && iYQ.debug && iYQ.CS.log("@iYQ.ajax ===> \u52a0\u8f7dAJAX\u51fa\u73b0\u9519\u8bef\uff1aURL\uff1a" + e.url + "\n info: " + i + "\n XHR.status: " + t.status + "\n XHR.readyState: " + t.readyState), $.unblockUI(), setTimeout(function () {
            $("#btn_submit").size() > 0 && $("#btn_submit").prop("disabled", !1)
        }, 800)
    }, t = $.extend({}, t, e), "undefined" != typeof _aDlTk_ && ("undefined" == typeof t.headers && (t.headers = {"X-CSRF-TOKEN": ""}), t.headers["X-CSRF-TOKEN"] = _aDlTk_), $.ajax(t)
}, iYQ.getParam("debug").length > 0 && (iYQ.debug = "true" == iYQ.getParam("debug") ? !0 : !1), iYQ.CS.log(" _____   ______  _______  ______  ______   _______  _______  _____   \n|     \\ |   __ \\|   _   ||   __ \\|   __ \\ |   |   ||    ___||     \\  \n|  --  ||   __ <|       ||    __/|    __/ |   |   ||    ___||  --  | \n|_____/ |______/|___|___||___|   |___|    |_______||_______||_____/  \n\n"), iYQ.CS.log("\u8bf7\u5c06\u7b80\u5386\u53d1\u9001\u81f3 %c ued@dbappsecurity.com.cn\uff08 \u90ae\u4ef6\u6807\u9898\u8bf7\u4ee5\u201c\u59d3\u540d-\u5e94\u8058XX\u804c\u4f4d-\u6765\u81eaconsole\u201d\u547d\u540d\uff09", "color:red"), function (e, t) {
    var i = function (e, t, i) {
        var r;
        return function () {
            function n() {
                i || e.apply(a, o), r = null
            }

            var a = this, o = arguments;
            r ? clearTimeout(r) : i && e.apply(a, o), r = setTimeout(n, t || 100), iYQ.debug && iYQ.CS.warn("espressoResize:1 @iYQ.core")
        }
    };
    jQuery.fn[t] = function (e) {
        return e ? this.on("resize", i(e)) : this.trigger(t)
    }
}(jQuery, "espressoResize"), Handlebars.registerHelper("addOne", function (e) {
    return parseInt(e) + 1
}), Handlebars.registerHelper("compare", function (e, t, i, r) {
    if (arguments.length < 3) throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    var n = {
        "==": function (e, t) {
            return e == t
        }, "===": function (e, t) {
            return e === t
        }, "!=": function (e, t) {
            return e != t
        }, "!==": function (e, t) {
            return e !== t
        }, "<": function (e, t) {
            return t > e
        }, ">": function (e, t) {
            return e > t
        }, "<=": function (e, t) {
            return t >= e
        }, ">=": function (e, t) {
            return e >= t
        }, "typeof": function (e, t) {
            return typeof e == t
        }
    };
    if (!n[t]) throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + t);
    var a = n[t](e, i);
    return a ? r.fn(this) : r.inverse(this)
});
;"undefined" == typeof iYQ && (("undefined" != typeof window ? window : this).iYQ = {});
var isIE8 = !1, isIE9 = !1, supportTransition = !0, isMobile = !1, ajaxError = 0, $windowWidth, $windowHeight,
    $body = $("body"), inner = $(".main-wrapper > .inner"), closedbar = $(".closedbar"), pageslide, filter = [],
    subViews = $(".subviews"), $sideLeft = $("#pageslide-left"), sideRight = $("#pageslide-right"),
    sidebarWidth = $sideLeft.outerWidth(!0), topBar = $(".topbar"), mainNavigation = $(".main-navigation"),
    mainContainer = $(".main-container"), mainContent = $(".main-content"), footer = $(".main-wrapper footer"),
    thisSlider, actualItemWidth, newItemWidth, activeAnimation = !1;
iYQ.p = {}, iYQ.iMax = {}, iYQ.Page = {
    url: "",
    title: "",
    _LT: {lastTime: moment(), ACTIVEANIMATION: !1},
    init: function (e) {
        var a = this, i = e;
        "undefined" == $.type(i) && "v2" != $("body").prop("ver") && (i = $("body"), i.prop("ver", "v2"), "undefined" != typeof $.blockUI && ($.blockUI.defaults.css.border = "none", $.blockUI.defaults.css.padding = "20px 5px", $.blockUI.defaults.css.width = "10%", $.blockUI.defaults.css.left = "50%"), a.initMain(), a.bindMainNavMenu(), a.bindToggleSideBars(), $("#fullscreen", i).on("click", function (e) {
            try {
                $(document).toggleFullScreen();
                var a = $(this);
                a.find("i").toggleClass("fa-expand"), a.find("i").toggleClass("fa-compress")
            } catch (i) {
                iYQ.debug && iYQ.CS.warn("iYQ.Page.init toggleFullScreen:" + i)
            }
            e.preventDefault()
        }), $windowWidth = a.viewport().width, $windowHeight = a.viewport().height, $(".page-content").css("min-height", $("body").height() - 40));
        var t = $("[data-timing]", i), n = $(".notify-menu-toggle", i),
            o = ($("[data-load]", i), $("[data-autoload]", i)),
            s = ($('[data-imgPre="image-preview"]', i), $(".select2, .select2-offscreen", i)), l = $(".sortable", i),
            r = $('[rel="toggle"]', i), d = ($(".userface img", i), $(".panel-scroll", i)), p = $(".auto-scroll", i),
            u = $("img[data-src-retina]", i), c = $('[data-role="tagsinput"]', i), m = $(".datepicker", i),
            h = ($(".reportrange", i), $(".mixItUp", i)), f = $(".panel-tools", i), g = $(".comm_act[data-id]", i),
            b = $(".btn-loadmore[data-ajaxurl]", i), v = $('[data-toggle="actSlide"]', i), C = $(".iyq-filter li>a", i);
        n.length > 0 && a.buildSidr(n), t.length > 0 && a.buildTiming(t), o.length > 0 && a.buildAutoload(o), l.length > 0 && a.buildSortable(l), r.length > 0 && a.buildToggle(r), d.length > 0 && a.bindPanelScroll(d), p.length > 0 && a.bindPanelScroll(p), c.length > 0 && a.bindTagsinput(c), u.length > 0 && u.unveil(200), h.length > 0 && $.fn.mixItUp() && h.mixItUp({load: {filter: ".in"}}), f.length > 0 && a.bindGridTools(f), g.length > 0 && a.buildCommBtn(g), b.length > 0 && a.buildLoadMore(b), v.length > 0 && a.buildSlide(v), C.length > 0 && a.buildDropFilter(C), a.buildjPages(i), $(".tooltip").remove(), $(".tip", i).tooltip({html: !0}), $(".hovpop", i).popover({
            html: !0,
            trigger: "hover focus",
            container: "body"
        }), $('[rel="popover"]', i).popover({
            html: !0,
            trigger: "click",
            container: "body"
        }), m && $.fn.datepicker && m.datepicker({
            format: "yyyy-mm-dd",
            autoclose: !0,
            todayBtn: !0,
            todayHighlight: !0
        }), s && $.fn.select2 && s.select2({
            placeholder: "\u70b9\u51fb\u9009\u62e9",
            allowClear: !1
        }), $(".animate-number", i).each(function () {
            $(this).animateNumbers($(this).data("value"), !0, parseInt($(this).attr("data-animation-duration")))
        })
    },
    imageCHK: function (e, a) {
        e.each(function () {
            var e = !1;
            this.complete || (e = !0), "undefined" != typeof this.naturalWidth && 0 == this.naturalWidth && (e = !0), e && $(this).bind("error.replaceSrc", function () {
                this.src = a || RES_DOMAIN + "assets/img/profiles/avatar_small.jpg", $(this).unbind("error.replaceSrc").addClass("animated fadeIn")
            }).trigger("load")
        })
    },
    localbin: function (e, a) {
        {
            var i = $("#" + e), t = i.parent();
            $(".pager-group", t)
        }
        switch (_opts = a || {}, iYQ.Page.init(i), _opts.target) {
            case"append":
            case"before":
                t.find("ul li:first").before(i.find("li"));
                break;
            case"append":
            case"after":
            default:
                t.find("ul li:last").after(i.find("li"))
        }
        i.remove()
    },
    autoRefresh: function (e, a) {
        var i = this, t = moment(), n = i._LT.lastTime, o = a || {isNewPath: !1},
            s = $(".main-navigation-menu:not(.core-menu) li.active"), l = iYQ.getParam("id");
        l.length > 0 && 0 == o.isNewPath && (!o.timeout || o.timeout < 1e3) && (o.timeout = 1e3), iYQ.debug && iYQ.CS.log("@iYQ.page.autoRefresh   ==>\n RT\uff1a" + (t - n) + " Type\uff1a" + e + "\n $CurrMenu:" + s.size() + " $CurrMenu html:" + s.html()), "isSubview" != e || "isSubview" == e && t - n > 3e3 ? o && o.timeout ? setTimeout(function () {
            o.fn && "function" === $.type(o.fn) && o.fn(), "isSubview" == e && s.size() > 0 && l.length <= 0 ? (i.setSlideLeft("refresh"), o && o.afterFn && "function" === $.type(o.afterFn) && o.afterFn()) : window.location.href = o && "undefined" != typeof o.href ? o.href : location.href.split("#")[0]
        }, o.timeout) : (o && o.fn && "function" === $.type(o.fn) && o.fn(), "isSubview" == e && s.size() > 0 ? (i.setSlideLeft("refresh"), o && o.afterFn && "function" === $.type(o.afterFn) && o.afterFn()) : window.location.href = o && "undefined" != typeof o.href ? o.href : location.href.split("#")[0], i._LT.lastTime = moment()) : iYQ.iMSG.error("\u64cd\u4f5c\u5931\u8d25", "\u4eb2\uff01\u5237\u65b0\u64cd\u4f5c\u592a\u9891\u7e41\u5566\uff0c\u8bf7\u4f11\u606f\u4f1a\u513f\u91cd\u8bd5\u3002")
    },
    buildTiming: function (el, type) {
        function replaceEL(el, opts, fn) {
            var newData = "", _rOpts = opts, _params = {};
            return "true" == el.data("stop") ? (iYQ.Task.kill(opts.elID, 1), !1) : (_rOpts.num >= _rOpts.max && (_rOpts.type = "update", _rOpts.num = -1, _rOpts.updateFn && eval(_rOpts.updateFn)), _rOpts.isAutoload && (_params.isautoload = "true"), _params.load = _rOpts.type, 0 != opts.modified && (_params.modified = el.attr("data-modified")), void(_rOpts.url && iYQ.ajax({
                url: _rOpts.url,
                dataType: "html",
                data: _params,
                beforeSend: function () {
                    (_rOpts.noloading || !_rOpts.noloadin && "update" == _rOpts.type) && iYQ.util.blockui(el)
                },
                success: function (e) {
                    setTimeout(function () {
                        iYQ.util.unblockui(el)
                    }, 800), "update" == _rOpts.type, "function" === $.type(fn) && fn(), -1 == _rOpts.num && (_rOpts.type = el.data("type") || "update"), "" != e && (_rOpts.num++, el.data("num", _rOpts.num), iYQ.debug && iYQ.CS.log("@iYQ.Page.buildTiming NUM:" + _rOpts.num + " --> #" + _rOpts.elID + " --> TIME:" + _rOpts.time + " --> TYPE:" + _rOpts.type))
                }
            })))
        }

        var _that = this, _showTimeout = [], _opts = {};
        el.each(function () {
            var e = $(this), a = e.prop("id"), i = (e.data("isload"), e.data("ajaxurl")),
                t = parseInt(e.data("timing")) || 6e4, n = e.data("num") || 0, o = e.data("max") || 10,
                s = e.attr("data-modified") || !1;
            switch (_opts[a] = {}, _opts[a].elID = a, _opts[a].time = t, _opts[a].isAutoload = !1, _opts[a].modified = s, _opts[a].num = parseInt(n), _opts[a].max = parseInt(o), _opts[a].url = i || !1, _opts[a].init = e.data("init") || !0, _opts[a].place = e.data("place") || !1, _opts[a].type = e.data("type") || "update", _opts[a].target = e.data("target"), _opts[a].hasload = e.data("isload") || !1, _opts[a].updateFn = e.data("update-fn") || !1, _opts[a].noloading = "0" == e.data("noloading") ? !1 : !0, type) {
                case"reload":
                    _opts[a].type = "update", _opts[a].isAutoload = !1, replaceEL(e, _opts[a]), _opts[a].num = -1, e.data("num", 0);
                    break;
                case"pause":
                    iYQ.Task.kill(a, 1), e.addClass("animated pulse timing-stop");
                    break;
                case"play":
                    iYQ.Task.kill(a, 1), e.removeClass("animated pulse timing-stop"), _opts[a].type = "update", _opts[a].isAutoload = !1, replaceEL(e, _opts[a]), _opts[a].num = -1, e.data("num", 0), new iYQ.Task({
                        name: a,
                        task: function () {
                            _opts[a].isAutoload = !0, replaceEL(e, _opts[a])
                        },
                        delay: _opts[a].time,
                        type: 1
                    });
                    break;
                default:
                    _opts.hasload || (iYQ.Task.kill(a, 1), _opts[a].type = "update", _opts[a].isAutoload = !1, replaceEL(e, _opts[a], function () {
                        _opts[a].type = e.data("type") || "update", e.data("isload", !0), _opts[a].hasload = !0
                    }), new iYQ.Task({
                        name: a, task: function () {
                            _opts[a].isAutoload = !0, replaceEL(e, _opts[a])
                        }, delay: _opts[a].time, type: 1
                    }))
            }
        })
    },
    buildAutoload: function (e) {
        iYQ.debug && iYQ.CS.warn("el" + e.attr("id") + "\u8be5\u65b9\u6cd5\u5df2\u88ab\u5e9f\u9664 ===>@iYQ.Page.buildAutoload ")
    },
    buildload: function (e, a) {
        e.each(function () {
            var e = $(this), i = e.attr("href"), t = i && "#" != i && "javascript:;" != i ? i : e.data("ajaxurl"),
                n = "0" == e.data("noloading") ? !1 : !0, o = e.data("target"),
                s = /^(#|\.)\w/.test(o) ? e.parent().find(o) : e;
            t && iYQ.ajax({
                el: e, noloading: n, dataType: "html", url: t, success: function (i) {
                    setTimeout(function () {
                        iYQ.util.unblockui(e)
                    }, 800), s.html(i).addClass("animated fadeIn"), iYQ.Page.init(s), $.isFunction(a) && a()
                }
            })
        })
    },
    buildToggle: function (e) {
        var a = this;
        e.each(function () {
            var e = $(this).data("eve") || "click";
            $(this).on(e, function (e) {
                var i = $(this), t = i.data("goal") || i.attr("href"),
                    n = /^(#|\.)\w/.test(t) && i.parents("li").find(t);
                n.is(":visible") ? n.slideUp() : "" != n.html() ? n.slideDown() : n.has('[rel="load"]') && (n.show(), a.buildload(n)), e.preventDefault()
            })
        })
    },
    buildSortable: function (e) {
        e.each(function () {
            var e = $(this), a = $(e.data("items")),
                i = e.data("placeholder") || "sortable-box-placeholder " + a.prop("class");
            e.sortable({
                connectWith: e.data("connectWith") || !1,
                iframeFix: !1,
                items: e.data("items") || ".sortable-items",
                opacity: e.data("opacity") || .8,
                helper: "original",
                revert: !0,
                forceHelperSize: !0,
                placeholder: i,
                forcePlaceholderSize: !0,
                tolerance: "pointer",
                delay: e.data("delay") || 100
            })
        })
    },
    buildSidr: function () {
    },
    bindPanelScroll: function (e) {
        0 == $body.hasClass("isMobile") && e.perfectScrollbar({
            wheelSpeed: 10,
            minScrollbarLength: 30,
            suppressScrollX: !0
        })
    },
    bindTagsinput: function (e) {
        e.tagsinput("items")
    },
    bindGridTools: function (e) {
        var a = this;
        $(".panel-expand", e).hide(), $(".panel-close", e).off(".tools").on("click.tools", function (e) {
            $(this).parents(".panel").fadeOut(), e.preventDefault()
        }), $(".panel-refresh", e).off(".tools").on("click.tools", function (e) {
            a.autoRefresh("panel-refresh"), e.preventDefault()
        }), $(".panel-collapse", e).off(".tools").on("click.tools", function (e) {
            e.preventDefault();
            var a = $(this), i = jQuery(this).parent().closest(".panel").children(".panel-body");
            $(this).hasClass("collapses") ? i.slideUp(200, function () {
                a.addClass("expand").removeClass("collapses").children("span").text("Expand").end().children("i").addClass("fa-rotate-180")
            }) : i.slideDown(200, function () {
                a.addClass("collapses").removeClass("expand").children("span").text("Collapse").end().children("i").removeClass("fa-rotate-180")
            })
        })
    },
    buildjPages: function (e) {
        var a = $(".pager-group", e);
        a.each(function () {
            var e = $(this), a = parseInt(e.data("per") || 5), i = parseInt(e.data("start") || 1),
                t = parseInt(e.data("pause") || 0);
            _contID = e.parent().prev(".jpager-list").prop("id"), _btnType = e.prop("data-btnType") || "btn-small", e.jPages({
                containerID: _contID,
                perPage: a,
                startPage: i,
                startRange: 0,
                midRange: 1,
                endRange: 0,
                pause: t,
                btnType: _btnType,
                clickStop: !0
            })
        })
    },
    buildCommBtn: function (e) {
        var a = e;
        a.off("click").on("click", function () {
            var e = $(this), a = e.data("id") || e.data("ids"), i = $("span.label", e),
                t = i.hasClass("label-success") ? "att" : "un", n = e.data("ajaxurl") || FAV_URL,
                o = i.text().replace("\u53d6\u6d88", "");
            n = n + (~n.indexOf("?") ? "&" : "?") + "ids=" + a + "&type=" + t, iYQ.ajax({
                url: n,
                dataType: "json",
                iyqSuccess: function (a) {
                    iYQ.iMSG("\u64cd\u4f5c\u6210\u529f", a.msg), i.hasClass("label-success") ? (i.removeClass("label-success").text("\u53d6\u6d88" + o), e.attr("data-original-title", "\u70b9\u51fb\u53d6\u6d88" + o)) : i.hasClass("label") && (i.addClass("label-success").text(o), e.attr("data-original-title", "\u70b9\u51fb" + o)), e.tooltip("hide")
                }
            })
        })
    },
    buildLoadMore: function (e) {
        var a = e;
        a.off("click").on("click", function () {
            var e = $(this), a = parseInt(e.data("pagenav")), i = (e.data("pagetype"), e.data("ajaxurl")),
                t = e.data("target") || "before", n = e.parents(".grid-body") || t.parent(),
                o = 0 == e.data("init") ? !1 : !0, s = e.data("place") || e.parent();
            i = i + (~i.indexOf("?") ? "&" : "?") + "page=" + (a + 1);
            var l = {};
            l.url = i || !1, l.init = o || !1, l.place = s || !1, l.target = t || "before", l.type = e.data("type") || "insert", l.noloading = "0" == e.data("noloading") ? !1 : !0, l.noloading && iYQ.util.blockui(n), iYQ.ajax({
                url: i,
                data: {dataType: "TPL"},
                success: function (i) {
                    iYQ.util.loadTPLData(i, l), e.data("pagenav", a + 1), setTimeout(function () {
                        iYQ.util.unblockui(n)
                    }, 800)
                }
            })
        })
    },
    buildSlide: function (e) {
        e.each(function () {
            $("a", $(this)).on("click", function () {
                var e = $(this), a = e.parent(), i = $(a.data("target")), t = parseFloat(i.css("left")),
                    n = e.data("type"), o = i.width(), s = i.parent(), l = s.width(), r = o - l,
                    d = o / $("li", i).size() * parseFloat(e.data("num") || 5);
                return 0 >= r ? !1 : void("next" == n ? (t -= d, t = 0 > r + t ? -r : t, i.animate({left: t + "px"})) : "pre" == n && (t += d, t = 0 > r - t || t > 0 ? 0 : t, i.animate({left: t + "px"})))
            })
        })
    },
    buildDropFilter: function (e) {
        e.on("click", function () {
            var e = $(this), a = e.parents(".iyq-filter"), i = a.attr("name"), t = (a.data("unique") || "").split(","),
                n = e.prop("href").replace(/(.*?#)/, ""), o = location.href.split("#")[0];
            return $.each(t, function (e, a) {
                iYQ.getParam(a) && (o = iYQ.setParam(a, "", o))
            }), window.location.href = iYQ.setParam(i, n, o), !1
        })
    },
    initMain: function () {
        function e() {
            $windowWidth = a.viewport().width, $windowHeight = a.viewport().height, a.fitContHeight(), iYQ.debug && iYQ.CS.log("fitContHeight @initMain runElementsPosition")
        }

        var a = this;
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var i = new Number(RegExp.$1);
            8 == i ? (isIE8 = !0, $body.addClass("isIE8")) : 9 == i && (isIE9 = !0, $body.addClass("isIE9"))
        }
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (isMobile = !0, $body.addClass("isMobile"));
        var t = document.body || document.documentElement, n = t.style;
        supportTransition = void 0 !== n.transition || void 0 !== n.WebkitTransition || void 0 !== n.MozTransition || void 0 !== n.MsTransition || void 0 !== n.OTransition, 0 == $body.hasClass("isMobile") && mainNavigation.length && (mainNavigation.perfectScrollbar({
            wheelSpeed: 50,
            minScrollbarLength: 20,
            suppressScrollX: !0
        }), $(".right-wrapper").perfectScrollbar({
            wheelSpeed: 50,
            minScrollbarLength: 20,
            suppressScrollX: !0
        })), $("#horizontal-menu").length && ($(".main-navigation-menu").length ? $("#horizontal-menu").find(".nav").clone().removeClass("nav navbar-nav").addClass("main-navigation-menu core-menu").find("li.dropdown").removeClass("dropdown").find("a").removeClass("dropdown-toggle").removeAttr("data-toggle").end().end().find("ul.dropdown-menu").removeClass("dropdown-menu").addClass("sub-menu").end().addClass("hidden-md hidden-lg").insertBefore(".main-navigation-menu") : $(".user-profile").length ? $("#horizontal-menu").find(".nav").clone().removeClass("nav navbar-nav").addClass("main-navigation-menu core-menu").find("li.dropdown").removeClass("dropdown").find("a").removeClass("dropdown-toggle").removeAttr("data-toggle").end().end().find("ul.dropdown-menu").removeClass("dropdown-menu").addClass("sub-menu").end().addClass("hidden-md hidden-lg").insertAfter(".user-profile") : $("#horizontal-menu").find(".nav").clone().removeClass("nav navbar-nav").addClass("main-navigation-menu core-menu").find("li.dropdown").removeClass("dropdown").find("a").removeClass("dropdown-toggle").removeAttr("data-toggle").end().end().find("ul.dropdown-menu").removeClass("dropdown-menu").addClass("sub-menu").end().addClass("hidden-md hidden-lg").prependTo(".main-navigation")), function () {
            $(".go-top").on("click", function (e) {
                $("html, body").animate({scrollTop: 0}, "slow"), e.preventDefault()
            })
        }(), e(), function () {
            var e;
            closedbar.mouseover(function () {
                0 == $body.hasClass("layout-boxed") && 0 == $body.hasClass("isMobile") && closedbar.hasClass("open") && (e = setTimeout(function () {
                    closedbar.velocity({left: -closedbar.width()}, 100, "ease"), $sideLeft.css({
                        left: -sidebarWidth,
                        zIndex: 1021
                    }).velocity({left: 0}, 200, "ease")
                }, 800))
            }).mouseleave(function () {
                0 == $body.hasClass("layout-boxed") && 0 == $body.hasClass("isMobile") && clearTimeout(e)
            }), $sideLeft.mouseleave(function () {
                $body.hasClass("sidebar-close") && closedbar.hasClass("open") && 0 == $body.hasClass("isMobile") && $sideLeft.velocity({left: -sidebarWidth}, 200, "ease", function () {
                    closedbar.velocity({left: 0}, 200, "ease"), $sideLeft.css({left: 0, zIndex: 0})
                })
            })
        }(), $(window).espressoResize(function () {
            $windowWidth = iYQ.Page.viewport().width, $windowHeight = iYQ.Page.viewport().height, e(), iYQ.debug && iYQ.CS.warn("espressoResize:1 @iYQ.Page.initMain")
        })
    },
    viewport: function () {
        var e = window, a = "inner";
        return "innerWidth" in window || (a = "client", e = document.documentElement || document.body), {
            width: e[a + "Width"],
            height: e[a + "Height"]
        }
    },
    bindToggleSideBars: function () {
        var e, a, i = {
            duration: 150, easing: "ease", mobileHA: !0, progress: function () {
                activeAnimation = !0
            }
        };
        $(".sb-toggle-left, .closedbar").on("click", function (t) {
            0 == activeAnimation && ($windowWidth > 991 ? ($body.removeClass("sidebar-mobile-open"), $body.hasClass("sidebar-close") ? $body.hasClass("layout-boxed") || $body.hasClass("isMobile") ? ($body.removeClass("sidebar-close"), closedbar.removeClass("open"), $(window).trigger("resize")) : (closedbar.removeClass("open").hide(), closedbar.css({left: -closedbar.width()}), a = {
                complete: function () {
                    $body.removeClass("sidebar-close"), $(".main-container, #pageslide-left, #footer .footer-inner, #horizontal-menu .container, .closedbar").attr("style", ""), $(window).trigger("resize"), activeAnimation = !1
                }
            }, e = $.extend({}, a, i), $(".main-container, footer .footer-inner, #horizontal-menu .container").velocity({marginLeft: sidebarWidth}, e)) : $body.hasClass("layout-boxed") || $body.hasClass("isMobile") ? ($body.addClass("sidebar-close"), closedbar.addClass("open"), $(window).trigger("resize")) : ($sideLeft.css({zIndex: 0}), a = {
                complete: function () {
                    closedbar.show().velocity({left: 0}, 100, "ease", function () {
                        activeAnimation = !1, closedbar.addClass("open"), $body.addClass("sidebar-close"), $(".main-container, footer .footer-inner, #horizontal-menu .container, .closedbar").attr("style", ""), $(window).trigger("resize")
                    })
                }
            }, e = $.extend({}, a, i), $(".main-container, footer .footer-inner, #horizontal-menu .container").velocity({marginLeft: 0}, e))) : $body.hasClass("sidebar-mobile-open") ? supportTransition ? (a = {
                complete: function () {
                    inner.attr("style", "").removeClass("inner-transform"), $body.removeClass("sidebar-mobile-open"), activeAnimation = !1
                }
            }, e = $.extend({}, a, i), inner.velocity({
                translateZ: 0,
                translateX: [-sidebarWidth, 0]
            }, e)) : $body.removeClass("sidebar-mobile-open") : supportTransition ? (inner.addClass("inner-transform"), a = {
                complete: function () {
                    inner.attr("style", ""), $body.addClass("sidebar-mobile-open"), activeAnimation = !1
                }
            }, e = $.extend({}, a, i), inner.velocity({
                translateZ: 0,
                translateX: [sidebarWidth, 0]
            }, e)) : $body.addClass("sidebar-mobile-open")), t.preventDefault()
        }), $(".sb-toggle-right").on("click", function (t) {
            0 == activeAnimation && ($windowWidth > 991 && $body.removeClass("sidebar-mobile-open"), $body.hasClass("right-sidebar-open") ? supportTransition ? (a = {
                complete: function () {
                    inner.attr("style", "").removeClass("inner-transform"), $body.removeClass("right-sidebar-open"), activeAnimation = !1
                }
            }, e = $.extend({}, a, i), inner.velocity({
                translateZ: 0,
                translateX: [sidebarWidth, 0]
            }, e)) : $body.removeClass("right-sidebar-open") : supportTransition ? (inner.addClass("inner-transform"), a = {
                complete: function () {
                    inner.attr("style", ""), $body.addClass("right-sidebar-open"), activeAnimation = !1
                }
            }, e = $.extend({}, a, i), inner.velocity({
                translateZ: 0,
                translateX: [-sidebarWidth, 0]
            }, e)) : $body.addClass("right-sidebar-open")), t.preventDefault()
        })
    },
    bindMainNavMenu: function () {
        var e = this;
        if (iYQ.debug && iYQ.CS.warn('@iYQ.page.bindMainNavMenu $("body").hasClass("single-page")\uff1a' + $("body").hasClass("single-page")), 0 == $("body").hasClass("single-page")) $(".main-navigation-menu > li.active").addClass("open"), $(".main-navigation-menu > li a").on("click setActive", function () {
            $(this).parent().children("ul").hasClass("sub-menu") && (!$body.hasClass("navigation-small") || 767 > $windowWidth || !$(this).parent().parent().hasClass("main-navigation-menu")) ? $(this).parent().hasClass("open") ? $(this).parent().hasClass("active") ? $(this).parent().parent().children("li.open").removeClass("open").children("ul").slideUp(200, function () {
                mainNavigation.height() > $(".main-navigation-menu").outerHeight() ? mainNavigation.scrollTo(0, 300, {
                    onAfter: function () {
                        0 == $body.hasClass("isMobile") && mainNavigation.perfectScrollbar("update")
                    }
                }) : mainNavigation.scrollTo($(this).parent("li"), 300, {
                    onAfter: function () {
                        0 == $body.hasClass("isMobile") && mainNavigation.perfectScrollbar("update")
                    }
                })
            }) : $(this).parent().parent().children("li.open").not($(".main-navigation-menu > li.active")).removeClass("open").children("ul").slideUp(200, function () {
                mainNavigation.height() > $(".main-navigation-menu").outerHeight() ? mainNavigation.scrollTo(0, 300, {
                    onAfter: function () {
                        0 == $body.hasClass("isMobile") && mainNavigation.perfectScrollbar("update")
                    }
                }) : mainNavigation.scrollTo($(this).parent("li").closest("ul").children("li:eq(0)"), 300, {
                    onAfter: function () {
                        0 == $body.hasClass("isMobile") && mainNavigation.perfectScrollbar("update")
                    }
                })
            }) : ($(this).parent().addClass("open"), $(this).parent().parent().children("li.open").not($(this).parent()).not($(".main-navigation-menu > li.active")).removeClass("open").children("ul").slideUp(200), $(this).parent().children("ul").slideDown(200, function () {
                mainNavigation.height() > $(".main-navigation-menu").outerHeight() ? mainNavigation.scrollTo($(this).parent("li"), 300, {
                    onAfter: function () {
                        0 == $body.hasClass("isMobile") && mainNavigation.perfectScrollbar("update")
                    }
                }) : mainNavigation.scrollTo($(this).parent("li"), 300, {
                    onAfter: function () {
                        0 == $body.hasClass("isMobile") && mainNavigation.perfectScrollbar("update")
                    }
                })
            })) : $(this).parent().addClass("active")
        }); else {
            {
                var a;
                $("#ajax-content"), $(".main-navigation-menu li.start")
            }
            $(".main-navigation-menu > li.active").addClass("open"), $('.main-navigation-menu:not(.core-menu) > li a[data-islink!="1"]').on("click setActive", function (i) {
                var t = $(this);
                if (!t.parent().children("ul").hasClass("sub-menu") || $("body").hasClass("navigation-small") && t.parent().parent().hasClass("main-navigation-menu")) {
                    $(".main-navigation-menu ul.sub-menu li").removeClass("active"), t.parent().addClass("active");
                    var n = t.parent("li").parent("ul");
                    n.hasClass("main-navigation-menu") ? (iYQ.debug && iYQ.CS.log("@bindMainNavMenu  e.type\uff1a" + i.type), $(".main-navigation-menu > li.active").removeClass("active").removeClass("open").children("ul").slideUp(200), t.parents("li").addClass("active")) : n.parent("li").hasClass("active") || n.parent("li").parent("ul").hasClass("sub-menu") ? n.parent("li").parent("ul").hasClass("sub-menu") ? n.parents("li.open").hasClass("active") || ($(".main-navigation-menu > li.active").removeClass("active").removeClass("open").children("ul").slideUp(200), t.parent().siblings("li.open").removeClass("active").removeClass("open").children("ul").slideUp(200), n.parents("li").removeClass("active").addClass("open"), t.parents("ul.sub-menu").show()) : t.parent().siblings("li.open").removeClass("active").removeClass("open").children("ul").slideUp(200) : ($(".main-navigation-menu > li.active").removeClass("active").removeClass("open").children("ul").slideUp(200), t.parent("li").parent("ul").parent("li").addClass("open active")), a = $(this).attr("href")
                } else t.parent().hasClass("open") ? t.parent().hasClass("active") ? t.parent().parent().children("li.open").removeClass("open").children("ul").slideUp(200, function () {
                    e.fitContHeight()
                }) : t.parent().parent().children("li.open").not($(".main-navigation-menu > li.active")).removeClass("open").children("ul").slideUp(200, function () {
                    e.fitContHeight()
                }) : (t.parent().addClass("open"), t.parent().parent().children("li.open").not(t.parent()).not($(".main-navigation-menu > li.active")).removeClass("open").children("ul").slideUp(200), t.parent().children("ul").slideDown(200, function () {
                    e.fitContHeight()
                }))
            })
        }
    },
    setSlideLeft: function (e, a) {
        var i, t = a || iYQ.getParam("page"), e = e || "click";
        t.length > 1 && (i = $('ul.main-navigation-menu:last li a[data-href="?page=' + t + '"]', $sideLeft), i.length < 1 && pageslide && (i = $('ul.main-navigation-menu:last li a[data-href^="?page=' + pageslide + '"]', $sideLeft))), "click" !== e && i && !i.hasClass("active") && i && setTimeout(function () {
            i.trigger("refresh" == e ? "click" : e)
        }, 100), iYQ.debug && iYQ.CS.log("@iYQ.page.setSlideLeft pageslide\uff1a" + pageslide + " || pageID\uff1a" + t + " ||  type\uff1a" + e), "setActive" == e && (filter = [])
    },
    ajaxLoader: function (e, a) {
        if (a.removeClass("fadeIn shake"), $body.hasClass("sidebar-mobile-open")) {
            var i, t, n = {
                duration: 200, easing: "ease", mobileHA: !0, progress: function () {
                    activeAnimation = !0
                }
            };
            t = {
                complete: function () {
                    inner.attr("style", "").removeClass("inner-transform"), $body.removeClass("sidebar-mobile-open"), activeAnimation = !1
                }
            }, i = $.extend({}, t, n), inner.velocity({translateZ: 0, translateX: [-sidebarWidth, 0]}, i)
        }
    },
    fitContHeight: function (e) {
        var a = moment(), i = mainContent.attr("lastTime") || !1, t = a - i;
        if (iYQ.debug && iYQ.CS.log("@fitContHeight  _now:" + a + " _lastTime:" + i + " mainContent:" + mainContent.css("min-height")), !i || t > 300) {
            subViews.is(":visible") && $(".main-container").css({
                "max-height": $windowHeight - topBar.outerHeight(!0),
                "min-height": $windowHeight - topBar.outerHeight(!0)
            }), $("#slidingbar-area").is(":visible") && $("#slidingbar-area").css({"max-height": $windowHeight}), $windowWidth > 991 ? (mainNavigation.css({height: $windowHeight - topBar.outerHeight(!0) - $(".slide-tools").outerHeight(!0)}), $(".navbar-content").css({height: $windowHeight - topBar.outerHeight(!0)})) : (mainNavigation.css({height: $windowHeight - $(".slide-tools").outerHeight(!0)}), $(".navbar-content").css({height: $windowHeight})), $(".right-wrapper").css({height: $windowHeight}), 0 == $body.hasClass("isMobile") && mainNavigation.length && (mainNavigation.perfectScrollbar("update"), $(".right-wrapper").perfectScrollbar("update"));
            var n = $windowHeight;
            n = $("#horizontal-menu").length ? $windowHeight - topBar.outerHeight(!0) - $("#horizontal-menu").outerHeight(!0) - footer.outerHeight(!0) : $windowHeight - topBar.outerHeight(!0) - footer.outerHeight(!0), mainContent = $(".main-content"), mainContent.css({"min-height": n}).attr("lastTime", moment()), subViews.is(":visible") && subViews.css({height: $windowHeight - topBar.outerHeight(!0) - $(".toolbar").outerHeight(!0)}), iYQ.debug && iYQ.CS.log("@fitContHeight \n type:" + e + " mainContentMinHeight:" + n + " mainContent Height:" + mainContent.css("min-height"))
        } else iYQ.debug && iYQ.CS.warn("@fitContHeight updateTime \u5c0f\u4e8e300\u6beb\u79d2")
    },
    loadJSON: function (e, a) {
        var i = this;
        return iYQ.ajax({
            type: e.type || "GET",
            cache: e && e.cache || !1,
            url: e && e.ajaxUrl || apiAtnURL,
            data: e ? e.ajaxData : {loadType: "autoload"},
            dataType: "json",
            iyqSuccess: function (e) {
                $.unblockUI(), "function" === $.type(a) && a(e), i.fitContHeight("_loadJSON_")
            },
            error: function () {
                $.unblockUI(), 5 > ajaxError ? ajaxError++ : location.reload(), iYQ.debug && iYQ.CS.warn("@iYQ.Page.loadJSON ===> ajaxError\uff1a" + ajaxError)
            }
        })
    },
    Readjust: function () {
    },
    validaForm: function (e) {
        function a(e) {
            iYQ.ajax({
                isForm: !0,
                submitBtn: n,
                type: "POST",
                dataType: "json",
                url: t.prop("action"),
                data: e,
                iyqSuccess: function (e) {
                    r.listWarp ? (console.info("\u8c03\u8bd5\u4fe1\u606f:" + JSON.stringify(r)), r.isSubview ? r.autoRefresh ? (e.errorlist && e.errorlist.length > 0 ? iYQ.iMSG.error("\u64cd\u4f5c\u5b8c\u6210\uff01", e.msg) : (iYQ.iMSG("\u64cd\u4f5c\u5b8c\u6210\uff01", e.msg), o.autoRefresh("isSubview", {
                        timeout: 1e3,
                        fn: function () {
                        },
                        afterFn: function () {
                            $(".close-subviews").trigger("click")
                        }
                    })), r.formAfter && $.isFunction(r.formAfter) && r.formAfter(e, r)) : location.reload() : d.modal("hide")) : location.href = location.href.split("#")[0], $.unblockUI()
                }
            })
        }

        var i, t, n, o = this, s = [], l = {
            myModal: $("#myModal"),
            isSubview: !1,
            autoRefresh: !1,
            formEle: "#modal_form",
            subviewformEle: "#subview_form",
            submitBtn: "#btn_submit",
            listWarp: !1,
            validator: !1,
            formCallBack: !1,
            formAfter: !1
        }, r = $.extend({}, l, e), d = r.isSubview ? $(".subviews-container") : r.myModal;
        t = d.length > 0 ? r.isSubview ? $(r.subviewformEle, d) : $(r.formEle, d) : $(r.isSubview ? r.subviewformEle : r.formEle), r.isSubview && (r.autoRefresh = e.autoRefresh || !0);
        var n = $(r.submitBtn, t);
        t.off(".vform"), r.validator ? (r.validator === !0 ? i = t : (r.validator = o.validate(r.validator), i = t.validate(r.validator)), t.on("submit.vform", function () {
            return i.valid() && (n.size() > 0 && n.prop("disabled", "disabled"), s = t.serializeArray(), r.formCallBack && $.isFunction(r.formCallBack) ? r.formCallBack(s) : a(s)), !1
        })) : t.on("submit.vform", function () {
            return n.size() > 0 && n.prop("disabled", "disabled"), s = t.serializeArray(), r.formCallBack && $.isFunction(r.formCallBack) ? r.formCallBack(s) : a(s), !1
        })
    },
    validate: function (e) {
        var a = {
            rules: {},
            focusInvalid: !0,
            onkeyup: !1,
            ignore: ":hidden",
            errorElement: "span",
            errorPlacement: function (e, a) {
                e.insertAfter(a)
            },
            success: function (e, a) {
                e.addClass("help-block valid"), $(a).closest(".form-group").removeClass("has-error")
            },
            highlight: function (e) {
                $(e).closest(".help-block").removeClass("valid"), $(e).closest(".form-group").addClass("has-error")
            },
            unhighlight: function (e) {
                $(e).closest(".form-group").removeClass("has-error")
            }
        };
        return $.extend({}, a, e)
    },
    uploader: function (e) {
        var a = {
            $uploadTip: $("#upload-tip"),
            uploadBtnId: "seUpload",
            target: iYQ.setParam("atn", "upload", apiAtnURL),
            chunkSize: 5242880,
            fileType: [],
            maxFiles: 1,
            simultaneousUploads: 1,
            throttleProgressCallbacks: 1,
            onFileProgress: function (e) {
                var a = Math.floor(100 * e.progress());
                $(".progress-bar", i.$uploadTip).css("width", a + "%"), i.$uploadTip.hasClass("hide") && (iYQ.Task.kill("showUploadTip"), new iYQ.Task({
                    name: "showUploadTip",
                    task: function () {
                        $(".title b", i.$uploadTip).text("\u6587\u4ef6\u4e0a\u4f20\u4e2d..."), i.$uploadTip.removeClass("hide")
                    },
                    delay: 100
                })), iYQ.debug && iYQ.CS.log(a + "@fileProgress")
            },
            onFileError: function (e, a) {
                iYQ.Task.kill("showUploadTip"), i.$uploadTip.addClass("hide"), iYQ.iMSG.error("\u51fa\u9519\u5566", "\u4e0a\u4f20\u6587\u4ef6\uff1a" + e.fileName + "\uff0c\u5185\u5bb9\uff1a" + a, "top-left")
            },
            onFileAdded: function () {
                $(".btn-cancel", i.$uploadTip).on("click", function () {
                    t.cancel()
                }), $(".title b", i.$uploadTip).text("\u6587\u4ef6\u52a0\u8f7d\u4e2d..."), t.upload()
            },
            onComplete: function () {
                t.files.pop()
            }
        }, i = $.extend({}, a, e), t = new Resumable({
            query: i.query,
            target: i.target,
            fileType: i.fileType,
            maxFiles: i.maxFiles,
            chunkSize: i.chunkSize,
            simultaneousUploads: i.simultaneousUploads,
            throttleProgressCallbacks: i.throttleProgressCallbacks
        });
        t.support || iYQ.iMSG.error("\u51fa\u9519\u5566", "\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u672c\u4e0a\u4f20\u7ec4\u4ef6\uff0c\u8bf7\u6362\u7528FireFoxChromeSafari", "top-left"), t.assignBrowse(document.getElementById(i.uploadBtnId)), t.on("fileSuccess", function (e) {
            if ("undefined" != typeof arguments[1]) {
                var a = $.parseJSON(arguments[1]);
                i.onFileSuccess(e, a)
            } else i.onFileSuccess(e);
            iYQ.Task.kill("showUploadTip"), i.$uploadTip.addClass("hide"), iYQ.iMSG("\u4e0a\u4f20\u6210\u529f\uff01", e.fileName + " \u4e0a\u4f20\u5b8c\u6210", "top-center"), iYQ.debug && iYQ.CS.log(e.fileName + "@fileSuccess")
        }), t.on("fileProgress", function (e) {
            i.onFileProgress(e)
        }), t.on("fileError", function (e, a) {
            i.onFileError(e, a)
        }), t.on("fileAdded", function (e, a) {
            i.onFileAdded(e, a)
        }), t.on("complete", function (e) {
            i.onComplete(e)
        })
    }
}, iYQ.Page.init();
;"undefined" == typeof iYQ && (("undefined" != typeof window ? window : this).iYQ = {}), iYQ.tblist = {
    _LT: {lastTime: moment()},
    init: function (e) {
        var t = this;
        iYQ.debug && iYQ.CS.log("iYQ.tblist.init @" + t._LT)
    },
    initMarkdown: function (e) {
        e.length && e.markdown({language: "zh", autofocus: !1, savable: !1, iconlibrary: "fa", fullscreen: !1})
    },
    defaultHandle: function (e) {
        var t = e.message || "\u786e\u5b9a\u8981\u5bf9\u6240\u9009\u5185\u5bb9" + (e.btnText ? '\u64cd\u4f5c&nbsp;[<strong class="text-primary">' + e.btnText + "</strong>]" : "\u8fdb\u884c\u8be5\u64cd\u4f5c") + "\uff1f";
        iYQ.debug && iYQ.CS.log("@defaultHandle \n callback:" + typeof e.callback + " \n_message:" + t), iYQ.dialog({
            title: "\u64cd\u4f5c\u63d0\u793a",
            message: t,
            buttons: {
                cancel: {label: "\u53d6\u6d88"},
                main: {
                    label: "\u786e\u5b9a", className: "btn-primary", callback: function () {
                        iYQ.ajax({
                            type: "post",
                            url: apiAtnURL,
                            dataType: "json",
                            data: e.ajaxData,
                            iyqSuccess: function (t) {
                                $.unblockUI(), t.errorMessage && t.errorMessage.length > 0 ? iYQ.iMSG.error("\u51fa\u9519", t.errorMessage) : iYQ.iMSG("\u6210\u529f", t.msg), $.isFunction(e.callback) ? e.callback(t) : iYQ.Page.autoRefresh("isSubview")
                            }
                        })
                    }
                }
            }
        })
    },
    setMessage: function (e, t, n) {
        var a = e.clone().addClass(function () {
            var e = $(this);
            return e.removeClass("btn btn-default").find(".fa").remove(), e.hasClass("btn-danger") ? (e.removeClass("btn btn-danger").removeAttr("id href"), "text-danger") : e.hasClass("text-danger") ? "" : "text-primary"
        }).prop("outerHTML"), i = new RegExp(/<(\/)*([A-Za-z0-9\-_]*)/g);
        return "\u786e\u5b9a\u8981\u5bf9&nbsp;\u201c" + t + "\u201d&nbsp;\u64cd\u4f5c&nbsp;[" + a.replace(i, "<$1strong") + "]\uff1f" + (n ? n : "")
    },
    getListHeight: function (e) {
        var t = $(".topbar").outerHeight(), n = $(".container > .toolbar").outerHeight(),
            a = $("footer.inner").outerHeight(), i = $(".panel-heading").outerHeight(), r = e || -65,
            o = $(window).height() - (t + n + a + i);
        return (o > 400 ? o : 400) + r
    },
    getIdSelections: function (e) {
        return $.map(e.bootstrapTable("getSelections"), function (e) {
            return e.id
        })
    },
    getNameSelections: function (e) {
        return $.map(e.bootstrapTable("getSelections"), function (e) {
            return e.name
        })
    }
};
;!function () {
    function parseJSON(json) {
        try {
            return window.JSON ? JSON.parse(json) : eval("(" + json + ")")
        } catch (e) {
            return iYQ.debug && iYQ.CS.warn("@BigPipe " + e), !1
        }
    }

    function ajax(e, r, n) {
        iYQ.ajax({
            type: n ? "POST" : "GET", dataType: "json", url: e, data: n, iyqSuccess: function (e) {
                $.unblockUI(), r(e)
            }
        })
    }

    function getCommentById(e) {
        var r = document.getElementById(e);
        if (!r) return "";
        var n = r.firstChild.nodeValue;
        return n = n.substring(1, n.length - 1).replace(/\\([\s\S]|$)/g, "$1"), r.parentNode.removeChild(r), n
    }

    function renderPagelet(e, r, n) {
        if (!(e.id in n)) {
            n[e.id] = !0, e.parent_id && renderPagelet(r[e.parent_id], r, n);
            var t = document.getElementById(e.id);
            t || (t = document.createElement("div"), t.id = e.id, container ? container.appendChild(t) : document.body.appendChild(t)), t.innerHTML = e.html || getCommentById(e.html_id)
        }
    }

    function render(e) {
        var r, n = pagelets.length, t = {}, a = {}, e = e || {};
        for (r = 0; n > r; r++) {
            var o = pagelets[r];
            t[o.id] = o
        }
        for (r = 0; n > r; r++) renderPagelet(pagelets[r], t, a);
        e.trigger === !0 && trigger("pagerendercomplete", {url: pageUrl, resource: resource})
    }

    function process(e, r) {
        function n() {
            var n = getNeedLoad(e.js);
            if (e.style) {
                var t = document.createElement("style");
                t.innerHTML = e.style, document.getElementsByTagName("head")[0].appendChild(t)
            }
            r(), n ? LazyLoad.js(n, function () {
                recordLoaded(n), e.script && window.eval(e.script), trigger("onpageloaded")
            }) : (e.script && window.eval(e.script), trigger("onpageloaded"))
        }

        e.async && require.resourceMap(e.async);
        var t = getNeedLoad(e.css);
        t ? LazyLoad.css(t.reverse(), function () {
            recordLoaded(t), n()
        }) : n()
    }

    function getNeedLoad(e) {
        var r = [];
        if ("string" == typeof e) r = [e]; else if ("[object Array]" === Object.prototype.toString.call(e)) for (var n = 0; n < e.length; n++) loadedResource[e[n]] !== LOADED && r.push(e[n]);
        return 0 === r.length && (r = null), r
    }

    function recordLoaded(e) {
        var r = e;
        "string" == typeof r && (r = [r]);
        for (var n = 0; n < r.length; n++) loadedResource[e[n]] = LOADED
    }

    function register(e) {
        process(e, function () {
            render({trigger: !0}), "function" == typeof onReady && onReady()
        })
    }

    function fetch(e, r, n, t) {
        var a, o = location.href, n = n || {}, i = {};
        containerId = r;
        var c = function (n, a) {
            if (o === location.href && r == containerId) {
                if (pageUrl = e, $("#" + containerId).length) {
                    var i = $("#" + containerId).offset().top;
                    i > 30 && $("html,body").animate({scrollTop: i - 80}, 600)
                }
                resource = n, trigger("pagearrived", a), onPagelets(n, r, t), iYQ.Page.init($("#" + containerId)), setTimeout(function () {
                    $.unblockUI()
                }, 500)
            }
        };
        isCacheAvailable(e) && n.cache !== !1 ? (a = getCachedResource(e), i.initiator = initiatorType.FROM_CACHE, c(a, i), statRecord(e)) : ajax(e, function (r) {
            i.initiator = initiatorType.QUICKLING, addResourceToCache(e, r), c(r, i)
        })
    }

    function refresh(e, r, n, t) {
        fetch(e, r, n, t)
    }

    function asyncLoad(e, r) {
        e instanceof Array || (e = [e]);
        var n, t = [], a = location.href;
        for (n = e.length - 1; n >= 0; n--) {
            var o = e[n].id;
            if (!o) throw Error("[BigPipe] missing pagelet id");
            t.push("pagelets[]=" + o)
        }
        r = r ? "&" + r : "";
        var i = location.href.split("#")[0] + "&" + t.join("&") + "&force_mode=1&is_widget=true" + r;
        ajax(i, function (e) {
            a === location.href && (resource = e, pageUrl = i, pagelets = e.pagelets, process(e.resource_map, function () {
                render()
            }))
        })
    }

    function statRecord() {
    }

    function addResourceToCache(e, r) {
        resourceCache[e] = {data: r, time: Date.now()}
    }

    function getCachedResource(e) {
        return resourceCache[e] ? resourceCache[e].data : void 0
    }

    function isCacheAvailable(e) {
        return !!resourceCache[e] && Date.now() - resourceCache[e].time <= cacheMaxTime
    }

    function onPageletArrived(e) {
        pagelets.push(e)
    }

    function onPagelets(e, r, n) {
        e.title && (document.title = e.title), $container = $("#" + r), $container.length > 0 && ($container.empty(), pagelets = e.pagelets, process(e.resource_map, function () {
            n && n(), render({trigger: !0})
        }))
    }

    function onPageReady(e) {
        onReady = e, trigger("pageready", pagelets)
    }

    function onPageChange(e) {
        fetch(location.pathname + (location.search ? location.search + "&" : "?") + "pagelets=" + e)
    }

    function trigger(e) {
        var r = events[e];
        if (r) for (var n = SLICE.call(arguments, 1), t = 0, a = r.length; a > t; t++) {
            var o = r[t];
            if (o.f.apply(o.o, n) === !1) break
        }
    }

    function on(e, r, n) {
        var t = events[e] || (events[e] = []);
        t.push({f: r, o: n})
    }

    var pagelets = [], loadedResource = {}, container, containerId,
        pageUrl = location.pathname + (location.search ? "?" + location.search : ""), resource, resourceCache = {},
        onReady, initiatorType = {LANDING: 0, QUICKLING: 1, FROM_CACHE: 2}, LOADED = 1, cacheMaxTime = 3e5,
        SLICE = [].slice, events = {};
    iYQ.BigPipe = {
        asyncLoad: asyncLoad,
        register: register,
        refresh: refresh,
        onPageReady: onPageReady,
        onPageChange: onPageChange,
        onPageletArrived: onPageletArrived,
        onPagelets: onPagelets,
        on: on,
        trigger: trigger
    }
}();
;!function (e) {
    function t(e) {
        var t = {selector: "[data-href]", cacheMaxTime: 3e5, pushState: !0, layer: document.body};
        b = p(t, e), Y = b.cacheMaxTime, w = b.pushState, y = r(b.layer), m = s(), w === !0 && a()
    }

    function a() {
        window.addEventListener("popstate", n, !1), $(y).delegate(b.selector, "click", l), v("pagerendercomplete", o, this), v("pagearrived", i, this), v("onpageloaded", c, this)
    }

    function r(e) {
        return "string" == typeof e ? document.querySelector(e) : e && e.nodeType ? e : document.body
    }

    function n(e) {
        var t = s();
        m && t !== m && (h("onpagerenderstart"), g(t, e.state))
    }

    function o(e) {
        Q[e.url] = {resource: e.resource, time: Date.now()}, h("onpagerendercomplete", {url: e.url}), $.unblockUI()
    }

    function i(e) {
        h("onpagearrived", e)
    }

    function c() {
        h("onpageloaded")
    }

    function p(e, t) {
        for (var a in t) t.hasOwnProperty(a) && (e[a] = t[a]);
        return e
    }

    function l(e) {
        var t, a, r = $(this), n = (b.selector, r.data("href")), o = r.data("key") || r.parent().parent().data("key"),
            i = iYQ.getParam("page", n), c = iYQ.getParam("page");
        if (o && o.length > 0 && (!c || i == c) ? (t = iYQ.setParam(o, iYQ.getParam(o, n)), "pn" != o && iYQ.getParam("pn", t).length > 0 && (t = iYQ.setParam("pn", "1", t)), a = r.data("area") || r.parent().parent().data("area")) : (t = n, a = r.data("area")), d(t)) {
            e.stopPropagation(), e.preventDefault();
            var p = {replace: r.data("replace") || !1, containerId: a, pagelets: a, target: r};
            f(t, p)
        }
    }

    function d(e) {
        var t = b.validate, a = Object.prototype.toString.call(t);
        return "[object RegExp]" === a ? t.test(e) : "[object Function]" === a ? t(e) : !0
    }

    function u(e) {
        return x.test(e) ? RegExp.$5 + (RegExp.$6 ? RegExp.$6 : "") : void("console" in window && console.error("[url error]:", e))
    }

    function s() {
        return u(window.location.href)
    }

    function f(e, t) {
        if (e = u(e), s() !== e) {
            $.blockUI({message: '<i class="fa fa-spinner fa-spin"></i> \u9875\u9762\u52a0\u8f7d\u4e2d...'});
            var a, r = {trigger: !0, forword: !0, replace: !1}, n = {url: e};
            if (t = p(r, t), n.target = t.target || null, t.trigger === !1) return void(w && (a = t.replace ? "replaceState" : "pushState", window.history[a]({}, document.title, e)));
            if (!w) return void(t.replace ? location.replace(e) : location.href = e);
            h("onpagerenderstart", n), g(e, t, function () {
                t.forword && (a = t.replace ? "replaceState" : "pushState", window.history[a]({}, document.title, e))
            })
        }
    }

    function g(e, t, a) {
        if (e) {
            var t = (Date.now(), t || {}), r = [], n = {}, o = t.containerId ? t.containerId : b.containerId,
                i = t.pagelets ? t.pagelets : b.pagelets;
            if ("string" == typeof i && (i = [i]), m = e, i.length > 0) {
                for (var c = 0, p = i.length; p > c; c++) r.push("pagelets[]=" + i[c]);
                e = -1 === e.indexOf("?") ? e + "/?" + r.join("&") : e + "&" + r.join("&")
            }
            t.cache === !1 && (n.cache = !1), iYQ.BigPipe.refresh(e, o, n, function () {
                a && a()
            })
        }
    }

    function h(e) {
        var t = k[e];
        if (t) for (var a = S.call(arguments, 1), r = 0, n = t.length; n > r; r++) {
            var o = t[r];
            if (o.f.apply(o.o, a) === !1) break
        }
    }

    function v(e, t, a) {
        var r = k[e] || (k[e] = []);
        r.push({f: t, o: a})
    }

    var m, w, y, P = (e.iYQ.appPage, e), Q = {}, Y = 0, b = {},
        x = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i, S = [].slice, k = {};
    P.appPage = {start: t, redirect: f, on: v}, e.iYQ.appPage = {
        start: t,
        redirect: f,
        on: v
    }, "define" in window && "undefined" != typeof module && (module.exports = P.appPage)
}(this);
;var UIModals = function () {
    "use strict";
    var t = function () {
        $.fn.modalmanager.defaults.resize = !0, $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner = '<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="progress-bar" style="width: 100%;"></div></div></div>';
        var t = $("#ajax-modal");
        $(".ajaxmodal").on("click", function () {
            $("body").modalmanager("loading"), setTimeout(function () {
                t.load("modal_ajax_test.html", "", function () {
                    t.modal()
                })
            }, 1e3)
        }), t.on("click", ".update", function () {
            t.modal("loading"), setTimeout(function () {
                t.modal("loading").find(".modal-body").prepend('<div class="alert alert-info fade in">Updated!<button type="button" class="close" data-dismiss="alert">&times;</button></div>')
            }, 1e3)
        })
    }, o = function () {
        var t = {};
        $(document).on("click", "button[data-bb]", function (o) {
            o.preventDefault();
            var a = $(this).data("bb");
            "function" == typeof t[a] && t[a]()
        }), t.alert_callback = function () {
            bootbox.alert("Hello world!", function () {
                toastr.success("Hello world callback")
            })
        }, t.confirm = function () {
            bootbox.confirm("Are you sure?", function (t) {
                toastr.success("Confirm result: " + t)
            })
        }, t.prompt = function () {
            bootbox.prompt("What is your name?", function (t) {
                null === t ? toastr.warning("Prompt dismissed") : toastr.success("Hi <b>" + t + "</b>")
            })
        }, t.dialog = function () {
            bootbox.dialog({
                message: "I am a custom dialog",
                title: "Custom title",
                buttons: {
                    success: {
                        label: "Success!", className: "btn-success", callback: function () {
                            toastr.success("great success")
                        }
                    }, danger: {
                        label: "Danger!", className: "btn-danger", callback: function () {
                            toastr.warning("uh oh, look out!")
                        }
                    }, main: {
                        label: "Click ME!", className: "btn-primary", callback: function () {
                            toastr.info("Primary button")
                        }
                    }
                }
            })
        }, t.custom_html = function () {
            var t = '<img src="assets/images/logo.png"/><br />';
            t += "<h2>You can use custom HTML too!</h2><br />", t += "<h4>Just be sure to mind your quote marks</h4>", bootbox.alert(t)
        }
    };
    return {
        init: function () {
            t(), o()
        }
    }
}();