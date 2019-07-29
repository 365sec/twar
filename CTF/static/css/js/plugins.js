!function (t) {
    "use strict";
    var e = function (t, e) {
        this.init(t, e)
    }, s = null;
    e.prototype = {
        init: function (e, s) {
            this.$element = t(e);
            {
                var i = s && s.bootstrapMajorVersion ? s.bootstrapMajorVersion : t.fn.bootstrapPaginator.defaults.bootstrapMajorVersion;
                this.$element.attr("id")
            }
            if (2 === i && !this.$element.is("div")) throw"in Bootstrap version 2 the pagination must be a div element. Or if you are using Bootstrap pagination 3. Please specify it in bootstrapMajorVersion in the option";
            if (i > 2 && !this.$element.is("ul")) throw"in Bootstrap version 3 the pagination root item must be an ul element.";
            this.currentPage = 1, this.lastPage = 1, this.setOptions(s), this.initialized = !0
        }, setOptions: function (e) {
            this.options = t.extend({}, this.options || t.fn.bootstrapPaginator.defaults, e), this.totalPages = parseInt(this.options.totalPages, 10), this.numberOfPages = parseInt(this.options.numberOfPages, 10), e && "undefined" != typeof e.currentPage && this.setCurrentPage(e.currentPage), this.listen(), this.render(), this.initialized || this.lastPage === this.currentPage || this.$element.trigger("page-changed", [this.lastPage, this.currentPage])
        }, listen: function () {
            this.$element.off("page-clicked"), this.$element.off("page-changed"), "function" == typeof this.options.onPageClicked && this.$element.bind("page-clicked", this.options.onPageClicked), "function" == typeof this.options.onPageChanged && this.$element.on("page-changed", this.options.onPageChanged), this.$element.bind("page-clicked", this.onPageClicked)
        }, destroy: function () {
            this.$element.off("page-clicked"), this.$element.off("page-changed"), this.$element.removeData("bootstrapPaginator"), this.$element.empty()
        }, show: function (t) {
            this.setCurrentPage(t), this.render(), this.lastPage !== this.currentPage && this.$element.trigger("page-changed", [this.lastPage, this.currentPage])
        }, showNext: function () {
            var t = this.getPages();
            t.next && this.show(t.next)
        }, showPrevious: function () {
            var t = this.getPages();
            t.prev && this.show(t.prev)
        }, showFirst: function () {
            var t = this.getPages();
            t.first && this.show(t.first)
        }, showLast: function () {
            var t = this.getPages();
            t.last && this.show(t.last)
        }, onPageItemClicked: function (t) {
            var e = t.data.type, s = t.data.page;
            this.$element.trigger("page-clicked", [t, e, s])
        }, onPageClicked: function (e, s, i, a) {
            var n = t(e.currentTarget);
            switch (i) {
                case"first":
                    n.bootstrapPaginator("showFirst");
                    break;
                case"prev":
                    n.bootstrapPaginator("showPrevious");
                    break;
                case"next":
                    n.bootstrapPaginator("showNext");
                    break;
                case"last":
                    n.bootstrapPaginator("showLast");
                    break;
                case"page":
                    n.bootstrapPaginator("show", a)
            }
        }, render: function () {
            var e = this.getValueFromOption(this.options.containerClass, this.$element),
                s = this.options.size || "normal", i = this.options.alignment || "left", a = this.getPages(),
                n = 2 === this.options.bootstrapMajorVersion ? t("<ul></ul>") : this.$element,
                o = 2 === this.options.bootstrapMajorVersion ? this.getValueFromOption(this.options.listContainerClass, n) : null,
                r = null, h = null, l = null, g = null, p = null, u = 0;
            switch (this.$element.prop("class", ""), this.$element.addClass("pagination"), s.toLowerCase()) {
                case"large":
                case"small":
                case"mini":
                    this.$element.addClass(t.fn.bootstrapPaginator.sizeArray[this.options.bootstrapMajorVersion][s.toLowerCase()])
            }
            if (2 === this.options.bootstrapMajorVersion) switch (i.toLowerCase()) {
                case"center":
                    this.$element.addClass("pagination-centered");
                    break;
                case"right":
                    this.$element.addClass("pagination-right")
            }
            for (this.$element.addClass(e), this.$element.empty(), 2 === this.options.bootstrapMajorVersion && (this.$element.append(n), n.addClass(o)), this.pageRef = [], a.first && (r = this.buildPageItem("first", a.first), r && n.append(r)), a.prev && (h = this.buildPageItem("prev", a.prev), h && n.append(h)), u = 0; u < a.length; u += 1) p = this.buildPageItem("page", a[u]), p && n.append(p);
            a.next && (l = this.buildPageItem("next", a.next), l && n.append(l)), a.last && (g = this.buildPageItem("last", a.last), g && n.append(g))
        }, buildPageItem: function (e, s) {
            var i = t("<li></li>"), a = t("<a></a>"), n = "", o = "",
                r = this.options.itemContainerClass(e, s, this.currentPage),
                h = this.getValueFromOption(this.options.itemContentClass, e, s, this.currentPage), l = null;
            switch (e) {
                case"first":
                    if (!this.getValueFromOption(this.options.shouldShowPage, e, s, this.currentPage)) return;
                    n = this.options.itemTexts(e, s, this.currentPage), o = this.options.tooltipTitles(e, s, this.currentPage);
                    break;
                case"last":
                    if (!this.getValueFromOption(this.options.shouldShowPage, e, s, this.currentPage)) return;
                    n = this.options.itemTexts(e, s, this.currentPage), o = this.options.tooltipTitles(e, s, this.currentPage);
                    break;
                case"prev":
                    if (!this.getValueFromOption(this.options.shouldShowPage, e, s, this.currentPage)) return;
                    n = this.options.itemTexts(e, s, this.currentPage), o = this.options.tooltipTitles(e, s, this.currentPage);
                    break;
                case"next":
                    if (!this.getValueFromOption(this.options.shouldShowPage, e, s, this.currentPage)) return;
                    n = this.options.itemTexts(e, s, this.currentPage), o = this.options.tooltipTitles(e, s, this.currentPage);
                    break;
                case"page":
                    if (!this.getValueFromOption(this.options.shouldShowPage, e, s, this.currentPage)) return;
                    n = this.options.itemTexts(e, s, this.currentPage), o = this.options.tooltipTitles(e, s, this.currentPage)
            }
            return i.addClass(r).append(a), a.addClass(h).html(n).on("click", null, {
                type: e,
                page: s
            }, t.proxy(this.onPageItemClicked, this)), this.options.pageUrl && a.attr("href", this.getValueFromOption(this.options.pageUrl, e, s, this.currentPage)), this.options.useBootstrapTooltip ? (l = t.extend({}, this.options.bootstrapTooltipOptions, {title: o}), a.tooltip(l)) : a.attr("title", o), i
        }, setCurrentPage: function (t) {
            if (t > this.totalPages || 1 > t) throw"Page out of range";
            this.lastPage = this.currentPage, this.currentPage = parseInt(t, 10)
        }, getPages: function () {
            var t = this.totalPages,
                e = this.currentPage % this.numberOfPages === 0 ? (parseInt(this.currentPage / this.numberOfPages, 10) - 1) * this.numberOfPages + 1 : parseInt(this.currentPage / this.numberOfPages, 10) * this.numberOfPages + 1,
                s = [], i = 0, a = 0;
            for (e = 1 > e ? 1 : e, i = e, a = 0; a < this.numberOfPages && t >= i; i += 1, a += 1) s.push(i);
            return s.first = 1, s.prev = this.currentPage > 1 ? this.currentPage - 1 : 1, s.next = this.currentPage < t ? this.currentPage + 1 : t, s.last = t, s.current = this.currentPage, s.total = t, s.numberOfPages = this.options.numberOfPages, s
        }, getValueFromOption: function (t) {
            var e = null, s = Array.prototype.slice.call(arguments, 1);
            return e = "function" == typeof t ? t.apply(this, s) : t
        }
    }, s = t.fn.bootstrapPaginator, t.fn.bootstrapPaginator = function (s) {
        var i = arguments, a = null;
        return t(this).each(function (n, o) {
            var r = t(o), h = r.data("bootstrapPaginator"), l = "object" != typeof s ? null : s;
            if (!h) return h = new e(this, l), r = t(h.$element), void r.data("bootstrapPaginator", h);
            if ("string" == typeof s) {
                if (!h[s]) throw"Method " + s + " does not exist";
                a = h[s].apply(h, Array.prototype.slice.call(i, 1))
            } else a = h.setOptions(s)
        }), a
    }, t.fn.bootstrapPaginator.sizeArray = {
        2: {
            large: "pagination-large",
            small: "pagination-small",
            mini: "pagination-mini"
        }, 3: {large: "pagination-lg", small: "pagination-sm", mini: ""}
    }, t.fn.bootstrapPaginator.defaults = {
        containerClass: "",
        size: "normal",
        alignment: "left",
        bootstrapMajorVersion: 2,
        listContainerClass: "",
        itemContainerClass: function (t, e, s) {
            return e === s ? "active" : ""
        },
        itemContentClass: function () {
            return ""
        },
        currentPage: 1,
        numberOfPages: 5,
        totalPages: 1,
        pageUrl: function () {
            return null
        },
        onPageClicked: null,
        onPageChanged: null,
        useBootstrapTooltip: !1,
        shouldShowPage: function (t, e, s) {
            var i = !0;
            switch (t) {
                case"first":
                    i = 1 !== s;
                    break;
                case"prev":
                    i = 1 !== s;
                    break;
                case"next":
                    i = s !== this.totalPages;
                    break;
                case"last":
                    i = s !== this.totalPages;
                    break;
                case"page":
                    i = !0
            }
            return i
        },
        itemTexts: function (t, e) {
            switch (t) {
                case"first":
                    return "&lt;&lt;";
                case"prev":
                    return "&lt;";
                case"next":
                    return "&gt;";
                case"last":
                    return "&gt;&gt;";
                case"page":
                    return e
            }
        },
        tooltipTitles: function (t, e, s) {
            switch (t) {
                case"first":
                    return "Go to first page";
                case"prev":
                    return "Go to previous page";
                case"next":
                    return "Go to next page";
                case"last":
                    return "Go to last page";
                case"page":
                    return e === s ? "Current page is " + e : "Go to page " + e
            }
        },
        bootstrapTooltipOptions: {animation: !0, html: !0, placement: "top", selector: !1, title: "", container: !1}
    }, t.fn.bootstrapPaginator.Constructor = e
}(window.jQuery);
;!function (t) {
    "use strict";
    var e = function (t, e) {
        this.init(t, e)
    };
    e.prototype = {
        constructor: e, init: function (e, i) {
            var n = this;
            this.options = i, this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote, function () {
                var e = t.Event("loaded");
                n.$element.trigger(e)
            });
            var s = "function" == typeof this.options.manager ? this.options.manager.call(this) : this.options.manager;
            s = s.appendModal ? s : t(s).modalmanager().data("modalmanager"), s.appendModal(this)
        }, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var e = t.Event("show");
            this.isShown || (this.$element.trigger(e), e.isDefaultPrevented() || (this.escape(), this.tab(), this.options.loading && this.loading()))
        }, hide: function (e) {
            e && e.preventDefault(), e = t.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.tab(), this.isLoading && this.loading(), t(document).off("focusin.modal"), this.$element.removeClass("in").removeClass("animated").removeClass(this.options.attentionAnimation).removeClass("modal-overflow").attr("aria-hidden", !0), t.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        }, layout: function () {
            var e = this.options.height ? "height" : "max-height", i = this.options.height || this.options.maxHeight;
            if (this.options.width) {
                this.$element.css("width", this.options.width);
                var n = this;
                this.$element.css("margin-left", function () {
                    return /%/gi.test(n.options.width) ? -(parseInt(n.options.width) / 2) + "%" : -(t(this).width() / 2) + "px"
                })
            } else this.$element.css("width", ""), this.$element.css("margin-left", "");
            this.$element.find(".modal-body").css("overflow", "").css(e, ""), i && this.$element.find(".modal-body").css("overflow", "auto").css(e, i);
            var s = t(window).height() - 10 < this.$element.height();
            s || this.options.modalOverflow ? this.$element.css("margin-top", 0).addClass("modal-overflow") : this.$element.css("margin-top", 0 - this.$element.height() / 2).removeClass("modal-overflow")
        }, tab: function () {
            var e = this;
            this.isShown && this.options.consumeTab ? this.$element.on("keydown.tabindex.modal", "[data-tabindex]", function (i) {
                if (i.keyCode && 9 == i.keyCode) {
                    var n = [], s = Number(t(this).data("tabindex"));
                    e.$element.find("[data-tabindex]:enabled:visible:not([readonly])").each(function () {
                        n.push(Number(t(this).data("tabindex")))
                    }), n.sort(function (t, e) {
                        return t - e
                    });
                    var o = t.inArray(s, n);
                    i.shiftKey ? 0 == o ? e.$element.find("[data-tabindex=" + n[n.length - 1] + "]").focus() : e.$element.find("[data-tabindex=" + n[o - 1] + "]").focus() : o < n.length - 1 ? e.$element.find("[data-tabindex=" + n[o + 1] + "]").focus() : e.$element.find("[data-tabindex=" + n[0] + "]").focus(), i.preventDefault()
                }
            }) : this.isShown || this.$element.off("keydown.tabindex.modal")
        }, escape: function () {
            var t = this;
            this.isShown && this.options.keyboard ? (this.$element.attr("tabindex") || this.$element.attr("tabindex", -1), this.$element.on("keyup.dismiss.modal", function (e) {
                27 == e.which && t.hide()
            })) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var e = this, i = setTimeout(function () {
                e.$element.off(t.support.transition.end), e.hideModal()
            }, 500);
            this.$element.one(t.support.transition.end, function () {
                clearTimeout(i), e.hideModal()
            })
        }, hideModal: function () {
            var t = this.options.height ? "height" : "max-height", e = this.options.height || this.options.maxHeight;
            e && this.$element.find(".modal-body").css("overflow", "").css(t, ""), this.$element.hide().trigger("hidden")
        }, removeLoading: function () {
            this.$loading.remove(), this.$loading = null, this.isLoading = !1
        }, loading: function (e) {
            e = e || function () {
            };
            var i = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isLoading) if (this.isLoading && this.$loading) {
                this.$loading.removeClass("in");
                var n = this;
                t.support.transition && this.$element.hasClass("fade") ? this.$loading.one(t.support.transition.end, function () {
                    n.removeLoading()
                }) : n.removeLoading()
            } else e && e(this.isLoading); else {
                var s = t.support.transition && i;
                this.$loading = t('<div class="loading-mask ' + i + '">').append(this.options.spinner).appendTo(this.$element), s && this.$loading[0].offsetWidth, this.$loading.addClass("in"), this.isLoading = !0, s ? this.$loading.one(t.support.transition.end, e) : e()
            }
        }, focus: function () {
            var t = this.$element.find(this.options.focusOn);
            t = t.length ? t : this.$element, t.focus()
        }, attention: function () {
            if (this.options.attentionAnimation) {
                this.$element.removeClass("animated").removeClass(this.options.attentionAnimation);
                var t = this;
                setTimeout(function () {
                    t.$element.addClass("animated").addClass(t.options.attentionAnimation)
                }, 0)
            }
            this.focus()
        }, destroy: function () {
            var e = t.Event("destroy");
            this.$element.trigger(e), e.isDefaultPrevented() || (this.$element.off(".modal").removeData("modal").removeClass("in").attr("aria-hidden", !0), this.$parent !== this.$element.parent() ? this.$element.appendTo(this.$parent) : this.$parent.length || (this.$element.remove(), this.$element = null), this.$element.trigger("destroyed"))
        }
    }, t.fn.modal = function (i, n) {
        return this.each(function () {
            var s = t(this), o = s.data("modal"),
                a = t.extend({}, t.fn.modal.defaults, s.data(), "object" == typeof i && i);
            o || s.data("modal", o = new e(this, a)), "string" == typeof i ? o[i].apply(o, [].concat(n)) : a.show && o.show()
        })
    }, t.fn.modal.defaults = {
        keyboard: !0,
        backdrop: !0,
        loading: !1,
        show: !0,
        width: null,
        height: null,
        maxHeight: null,
        modalOverflow: !1,
        consumeTab: !0,
        focusOn: null,
        replace: !1,
        resize: !1,
        attentionAnimation: "shake",
        manager: "body",
        spinner: '<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>',
        backdropTemplate: '<div class="modal-backdrop" />'
    }, t.fn.modal.Constructor = e, t(function () {
        t(document).off("click.modal").on("click.modal.data-api", '[data-toggle="modal"]', function (e) {
            var i = t(this), n = i.attr("href"), s = t(i.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
                o = s.data("modal") ? "toggle" : t.extend({remote: !/#/.test(n) && n}, s.data(), i.data());
            e.preventDefault(), s.modal(o).one("hide", function () {
                i.focus()
            })
        })
    })
}(window.jQuery);
;!function (e) {
    "use strict";

    function t(e) {
        return function (t) {
            return t && this === t.target ? e.apply(this, arguments) : void 0
        }
    }

    var n = function (e, t) {
        this.init(e, t)
    };
    n.prototype = {
        constructor: n, init: function (t, n) {
            if (this.$element = e(t), this.options = e.extend({}, e.fn.modalmanager.defaults, this.$element.data(), "object" == typeof n && n), this.stack = [], this.backdropCount = 0, this.options.resize) {
                var o, a = this;
                e(window).on("resize.modal", function () {
                    o && clearTimeout(o), o = setTimeout(function () {
                        for (var e = 0; e < a.stack.length; e++) a.stack[e].isShown && a.stack[e].layout()
                    }, 10)
                })
            }
        }, createModal: function (t, n) {
            e(t).modal(e.extend({manager: this}, n))
        }, appendModal: function (n) {
            this.stack.push(n);
            var o = this;
            n.$element.on("show.modalmanager", t(function () {
                var t = function () {
                    n.isShown = !0;
                    var t = e.support.transition && n.$element.hasClass("fade");
                    o.$element.toggleClass("modal-open", o.hasOpenModal()).toggleClass("page-overflow", e(window).height() < o.$element.height()), n.$parent = n.$element.parent(), n.$container = o.createContainer(n), n.$element.appendTo(n.$container), o.backdrop(n, function () {
                        n.$element.show(), t && n.$element[0].offsetWidth, n.layout(), n.$element.addClass("in").attr("aria-hidden", !1);
                        var a = function () {
                            o.setFocus(), n.$element.trigger("shown")
                        };
                        t ? n.$element.one(e.support.transition.end, a) : a()
                    })
                };
                n.options.replace ? o.replace(t) : t()
            })), n.$element.on("hidden.modalmanager", t(function () {
                if (o.backdrop(n), n.$element.parent().length) if (n.$backdrop) {
                    var t = e.support.transition && n.$element.hasClass("fade");
                    t && n.$element[0].offsetWidth, e.support.transition && n.$element.hasClass("fade") ? n.$backdrop.one(e.support.transition.end, function () {
                        n.destroy()
                    }) : n.destroy()
                } else n.destroy(); else o.destroyModal(n)
            })), n.$element.on("destroyed.modalmanager", t(function () {
                o.destroyModal(n)
            }))
        }, getOpenModals: function () {
            for (var e = [], t = 0; t < this.stack.length; t++) this.stack[t].isShown && e.push(this.stack[t]);
            return e
        }, hasOpenModal: function () {
            return this.getOpenModals().length > 0
        }, setFocus: function () {
            for (var e, t = 0; t < this.stack.length; t++) this.stack[t].isShown && (e = this.stack[t]);
            e && e.focus()
        }, destroyModal: function (e) {
            e.$element.off(".modalmanager"), e.$backdrop && this.removeBackdrop(e), this.stack.splice(this.getIndexOfModal(e), 1);
            var t = this.hasOpenModal();
            this.$element.toggleClass("modal-open", t), t || this.$element.removeClass("page-overflow"), this.removeContainer(e), this.setFocus()
        }, getModalAt: function (e) {
            return this.stack[e]
        }, getIndexOfModal: function (e) {
            for (var t = 0; t < this.stack.length; t++) if (e === this.stack[t]) return t
        }, replace: function (n) {
            for (var o, a = 0; a < this.stack.length; a++) this.stack[a].isShown && (o = this.stack[a]);
            o ? (this.$backdropHandle = o.$backdrop, o.$backdrop = null, n && o.$element.one("hidden", t(e.proxy(n, this))), o.hide()) : n && n()
        }, removeBackdrop: function (e) {
            e.$backdrop.remove(), e.$backdrop = null
        }, createBackdrop: function (t, n) {
            var o;
            return this.$backdropHandle ? (o = this.$backdropHandle, o.off(".modalmanager"), this.$backdropHandle = null, this.isLoading && this.removeSpinner()) : o = e(n).addClass(t).appendTo(this.$element), o
        }, removeContainer: function (e) {
            e.$container.remove(), e.$container = null
        }, createContainer: function (n) {
            var a;
            return a = e('<div class="modal-scrollable">').css("z-index", o("modal", this.getOpenModals().length)).appendTo(this.$element), n && "static" != n.options.backdrop ? a.on("click.modal", t(function () {
                n.hide()
            })) : n && a.on("click.modal", t(function () {
                n.attention()
            })), a
        }, backdrop: function (t, n) {
            var a = t.$element.hasClass("fade") ? "fade" : "",
                s = t.options.backdrop && this.backdropCount < this.options.backdropLimit;
            if (t.isShown && s) {
                var i = e.support.transition && a && !this.$backdropHandle;
                t.$backdrop = this.createBackdrop(a, t.options.backdropTemplate), t.$backdrop.css("z-index", o("backdrop", this.getOpenModals().length)), i && t.$backdrop[0].offsetWidth, t.$backdrop.addClass("in"), this.backdropCount += 1, i ? t.$backdrop.one(e.support.transition.end, n) : n()
            } else if (!t.isShown && t.$backdrop) {
                t.$backdrop.removeClass("in"), this.backdropCount -= 1;
                var r = this;
                e.support.transition && t.$element.hasClass("fade") ? t.$backdrop.one(e.support.transition.end, function () {
                    r.removeBackdrop(t)
                }) : r.removeBackdrop(t)
            } else n && n()
        }, removeSpinner: function () {
            this.$spinner && this.$spinner.remove(), this.$spinner = null, this.isLoading = !1
        }, removeLoading: function () {
            this.$backdropHandle && this.$backdropHandle.remove(), this.$backdropHandle = null, this.removeSpinner()
        }, loading: function (t) {
            if (t = t || function () {
            }, this.$element.toggleClass("modal-open", !this.isLoading || this.hasOpenModal()).toggleClass("page-overflow", e(window).height() < this.$element.height()), this.isLoading) if (this.isLoading && this.$backdropHandle) {
                this.$backdropHandle.removeClass("in");
                var n = this;
                e.support.transition ? this.$backdropHandle.one(e.support.transition.end, function () {
                    n.removeLoading()
                }) : n.removeLoading()
            } else t && t(this.isLoading); else {
                this.$backdropHandle = this.createBackdrop("fade", this.options.backdropTemplate), this.$backdropHandle[0].offsetWidth;
                var a = this.getOpenModals();
                this.$backdropHandle.css("z-index", o("backdrop", a.length + 1)).addClass("in");
                var s = e(this.options.spinner).css("z-index", o("modal", a.length + 1)).appendTo(this.$element).addClass("in");
                this.$spinner = e(this.createContainer()).append(s).on("click.modalmanager", e.proxy(this.loading, this)), this.isLoading = !0, e.support.transition ? this.$backdropHandle.one(e.support.transition.end, t) : t()
            }
        }
    };
    var o = function () {
        var t, n = {};
        return function (o, a) {
            if ("undefined" == typeof t) {
                var s = e('<div class="modal hide" />').appendTo("body"),
                    i = e('<div class="modal-backdrop hide" />').appendTo("body");
                n.modal = +s.css("z-index"), n.backdrop = +i.css("z-index"), t = n.modal - n.backdrop, s.remove(), i.remove(), i = s = null
            }
            return n[o] + t * a
        }
    }();
    e.fn.modalmanager = function (t, o) {
        return this.each(function () {
            var a = e(this), s = a.data("modalmanager");
            s || a.data("modalmanager", s = new n(this, t)), "string" == typeof t && s[t].apply(s, [].concat(o))
        })
    }, e.fn.modalmanager.defaults = {
        backdropLimit: 999,
        resize: !0,
        spinner: '<div class="loading-spinner fade" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>',
        backdropTemplate: '<div class="modal-backdrop" />'
    }, e.fn.modalmanager.Constructor = n, e(function () {
        e(document).off("show.bs.modal").off("hidden.bs.modal")
    })
}(jQuery);
;!function (e) {
    "undefined" == typeof e.fn.each2 && e.extend(e.fn, {
        each2: function (t) {
            for (var s = e([0]), i = -1, n = this.length; ++i < n && (s.context = s[0] = this[i]) && t.call(s[0], i, s) !== !1;) ;
            return this
        }
    })
}(jQuery), function (e, t) {
    "use strict";

    function s(t) {
        var s = e(document.createTextNode(""));
        t.before(s), s.before(t), s.remove()
    }

    function i(e) {
        function t(e) {
            return j[e] || e
        }

        return e.replace(/[^\u0000-\u007E]/g, t)
    }

    function n(e, t) {
        for (var s = 0, i = t.length; i > s; s += 1) if (a(e, t[s])) return s;
        return -1
    }

    function o() {
        var t = e(z);
        t.appendTo("body");
        var s = {width: t.width() - t[0].clientWidth, height: t.height() - t[0].clientHeight};
        return t.remove(), s
    }

    function a(e, s) {
        return e === s ? !0 : e === t || s === t ? !1 : null === e || null === s ? !1 : e.constructor === String ? e + "" == s + "" : s.constructor === String ? s + "" == e + "" : !1
    }

    function r(t, s) {
        var i, n, o;
        if (null === t || t.length < 1) return [];
        for (i = t.split(s), n = 0, o = i.length; o > n; n += 1) i[n] = e.trim(i[n]);
        return i
    }

    function c(e) {
        return e.outerWidth(!1) - e.width()
    }

    function l(s) {
        var i = "keyup-change-value";
        s.on("keydown", function () {
            e.data(s, i) === t && e.data(s, i, s.val())
        }), s.on("keyup", function () {
            var n = e.data(s, i);
            n !== t && s.val() !== n && (e.removeData(s, i), s.trigger("keyup-change"))
        })
    }

    function h(s) {
        s.on("mousemove", function (s) {
            var i = F;
            (i === t || i.x !== s.pageX || i.y !== s.pageY) && e(s.target).trigger("mousemove-filtered", s)
        })
    }

    function u(e, s, i) {
        i = i || t;
        var n;
        return function () {
            var t = arguments;
            window.clearTimeout(n), n = window.setTimeout(function () {
                s.apply(i, t)
            }, e)
        }
    }

    function d(e, t) {
        var s = u(e, function (e) {
            t.trigger("scroll-debounced", e)
        });
        t.on("scroll", function (e) {
            n(e.target, t.get()) >= 0 && s(e)
        })
    }

    function p(e) {
        e[0] !== document.activeElement && window.setTimeout(function () {
            var t, s = e[0], i = e.val().length;
            e.focus();
            var n = s.offsetWidth > 0 || s.offsetHeight > 0;
            n && s === document.activeElement && (s.setSelectionRange ? s.setSelectionRange(i, i) : s.createTextRange && (t = s.createTextRange(), t.collapse(!1), t.select()))
        }, 0)
    }

    function f(t) {
        t = e(t)[0];
        var s = 0, i = 0;
        if ("selectionStart" in t) s = t.selectionStart, i = t.selectionEnd - s; else if ("selection" in document) {
            t.focus();
            var n = document.selection.createRange();
            i = document.selection.createRange().text.length, n.moveStart("character", -t.value.length), s = n.text.length - i
        }
        return {offset: s, length: i}
    }

    function g(e) {
        e.preventDefault(), e.stopPropagation()
    }

    function m(e) {
        e.preventDefault(), e.stopImmediatePropagation()
    }

    function v(t) {
        if (!L) {
            var s = t[0].currentStyle || window.getComputedStyle(t[0], null);
            L = e(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: s.fontSize,
                fontFamily: s.fontFamily,
                fontStyle: s.fontStyle,
                fontWeight: s.fontWeight,
                letterSpacing: s.letterSpacing,
                textTransform: s.textTransform,
                whiteSpace: "nowrap"
            }), L.attr("class", "select2-sizer"), e("body").append(L)
        }
        return L.text(t.val()), L.width()
    }

    function w(t, s, i) {
        var n, o, a = [];
        n = e.trim(t.attr("class")), n && (n = "" + n, e(n.split(/\s+/)).each2(function () {
            0 === this.indexOf("select2-") && a.push(this)
        })), n = e.trim(s.attr("class")), n && (n = "" + n, e(n.split(/\s+/)).each2(function () {
            0 !== this.indexOf("select2-") && (o = i(this), o && a.push(o))
        })), t.attr("class", a.join(" "))
    }

    function b(e, t, s, n) {
        var o = i(e.toUpperCase()).indexOf(i(t.toUpperCase())), a = t.length;
        return 0 > o ? void s.push(n(e)) : (s.push(n(e.substring(0, o))), s.push("<span class='select2-match'>"), s.push(n(e.substring(o, o + a))), s.push("</span>"), void s.push(n(e.substring(o + a, e.length))))
    }

    function C(e) {
        var t = {"\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;"};
        return String(e).replace(/[&<>"'\/\\]/g, function (e) {
            return t[e]
        })
    }

    function S(s) {
        var i, n = null, o = s.quietMillis || 100, a = s.url, r = this;
        return function (c) {
            window.clearTimeout(i), i = window.setTimeout(function () {
                var i = s.data, o = a, l = s.transport || e.fn.select2.ajaxDefaults.transport, h = {
                    type: s.type || "GET",
                    cache: s.cache || !1,
                    jsonpCallback: s.jsonpCallback || t,
                    dataType: s.dataType || "json"
                }, u = e.extend({}, e.fn.select2.ajaxDefaults.params, h);
                i = i ? i.call(r, c.term, c.page, c.context) : null, o = "function" == typeof o ? o.call(r, c.term, c.page, c.context) : o, n && "function" == typeof n.abort && n.abort(), s.params && (e.isFunction(s.params) ? e.extend(u, s.params.call(r)) : e.extend(u, s.params)), e.extend(u, {
                    url: o,
                    dataType: s.dataType,
                    data: i,
                    success: function (e) {
                        var t = s.results(e, c.page, c);
                        c.callback(t)
                    },
                    error: function (e, t, s) {
                        var i = {hasError: !0, jqXHR: e, textStatus: t, errorThrown: s};
                        c.callback(i)
                    }
                }), n = l.call(r, u)
            }, o)
        }
    }

    function y(t) {
        var s, i, n = t, o = function (e) {
            return "" + e.text
        };
        e.isArray(n) && (i = n, n = {results: i}), e.isFunction(n) === !1 && (i = n, n = function () {
            return i
        });
        var a = n();
        return a.text && (o = a.text, e.isFunction(o) || (s = a.text, o = function (e) {
            return e[s]
        })), function (t) {
            var s, i = t.term, a = {results: []};
            return "" === i ? void t.callback(n()) : (s = function (n, a) {
                var r, c;
                if (n = n[0], n.children) {
                    r = {};
                    for (c in n) n.hasOwnProperty(c) && (r[c] = n[c]);
                    r.children = [], e(n.children).each2(function (e, t) {
                        s(t, r.children)
                    }), (r.children.length || t.matcher(i, o(r), n)) && a.push(r)
                } else t.matcher(i, o(n), n) && a.push(n)
            }, e(n().results).each2(function (e, t) {
                s(t, a.results)
            }), void t.callback(a))
        }
    }

    function E(s) {
        var i = e.isFunction(s);
        return function (n) {
            var o = n.term, a = {results: []}, r = i ? s(n) : s;
            e.isArray(r) && (e(r).each(function () {
                var e = this.text !== t, s = e ? this.text : this;
                ("" === o || n.matcher(o, s)) && a.results.push(e ? this : {id: this, text: this})
            }), n.callback(a))
        }
    }

    function x(t, s) {
        if (e.isFunction(t)) return !0;
        if (!t) return !1;
        if ("string" == typeof t) return !0;
        throw new Error(s + " must be a string, function, or falsy value")
    }

    function T(t, s) {
        if (e.isFunction(t)) {
            var i = Array.prototype.slice.call(arguments, 2);
            return t.apply(s, i)
        }
        return t
    }

    function O(t) {
        var s = 0;
        return e.each(t, function (e, t) {
            t.children ? s += O(t.children) : s++
        }), s
    }

    function P(e, s, i, n) {
        var o, r, c, l, h, u = e, d = !1;
        if (!n.createSearchChoice || !n.tokenSeparators || n.tokenSeparators.length < 1) return t;
        for (; ;) {
            for (r = -1, c = 0, l = n.tokenSeparators.length; l > c && (h = n.tokenSeparators[c], r = e.indexOf(h), !(r >= 0)); c++) ;
            if (0 > r) break;
            if (o = e.substring(0, r), e = e.substring(r + h.length), o.length > 0 && (o = n.createSearchChoice.call(this, o, s), o !== t && null !== o && n.id(o) !== t && null !== n.id(o))) {
                for (d = !1, c = 0, l = s.length; l > c; c++) if (a(n.id(o), n.id(s[c]))) {
                    d = !0;
                    break
                }
                d || i(o)
            }
        }
        return u !== e ? e : void 0
    }

    function I() {
        var t = this;
        e.each(arguments, function (e, s) {
            t[s].remove(), t[s] = null
        })
    }

    function k(t, s) {
        var i = function () {
        };
        return i.prototype = new t, i.prototype.constructor = i, i.prototype.parent = t.prototype, i.prototype = e.extend(i.prototype, s), i
    }

    if (window.Select2 === t) {
        var A, R, D, H, M, L, N, U, F = {x: 0, y: 0}, A = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function (e) {
                switch (e = e.which ? e.which : e) {
                    case A.LEFT:
                    case A.RIGHT:
                    case A.UP:
                    case A.DOWN:
                        return !0
                }
                return !1
            },
            isControl: function (e) {
                var t = e.which;
                switch (t) {
                    case A.SHIFT:
                    case A.CTRL:
                    case A.ALT:
                        return !0
                }
                return e.metaKey ? !0 : !1
            },
            isFunctionKey: function (e) {
                return e = e.which ? e.which : e, e >= 112 && 123 >= e
            }
        }, z = "<div class='select2-measure-scrollbar'></div>", j = {
            "\u24b6": "A",
            "\uff21": "A",
            "\xc0": "A",
            "\xc1": "A",
            "\xc2": "A",
            "\u1ea6": "A",
            "\u1ea4": "A",
            "\u1eaa": "A",
            "\u1ea8": "A",
            "\xc3": "A",
            "\u0100": "A",
            "\u0102": "A",
            "\u1eb0": "A",
            "\u1eae": "A",
            "\u1eb4": "A",
            "\u1eb2": "A",
            "\u0226": "A",
            "\u01e0": "A",
            "\xc4": "A",
            "\u01de": "A",
            "\u1ea2": "A",
            "\xc5": "A",
            "\u01fa": "A",
            "\u01cd": "A",
            "\u0200": "A",
            "\u0202": "A",
            "\u1ea0": "A",
            "\u1eac": "A",
            "\u1eb6": "A",
            "\u1e00": "A",
            "\u0104": "A",
            "\u023a": "A",
            "\u2c6f": "A",
            "\ua732": "AA",
            "\xc6": "AE",
            "\u01fc": "AE",
            "\u01e2": "AE",
            "\ua734": "AO",
            "\ua736": "AU",
            "\ua738": "AV",
            "\ua73a": "AV",
            "\ua73c": "AY",
            "\u24b7": "B",
            "\uff22": "B",
            "\u1e02": "B",
            "\u1e04": "B",
            "\u1e06": "B",
            "\u0243": "B",
            "\u0182": "B",
            "\u0181": "B",
            "\u24b8": "C",
            "\uff23": "C",
            "\u0106": "C",
            "\u0108": "C",
            "\u010a": "C",
            "\u010c": "C",
            "\xc7": "C",
            "\u1e08": "C",
            "\u0187": "C",
            "\u023b": "C",
            "\ua73e": "C",
            "\u24b9": "D",
            "\uff24": "D",
            "\u1e0a": "D",
            "\u010e": "D",
            "\u1e0c": "D",
            "\u1e10": "D",
            "\u1e12": "D",
            "\u1e0e": "D",
            "\u0110": "D",
            "\u018b": "D",
            "\u018a": "D",
            "\u0189": "D",
            "\ua779": "D",
            "\u01f1": "DZ",
            "\u01c4": "DZ",
            "\u01f2": "Dz",
            "\u01c5": "Dz",
            "\u24ba": "E",
            "\uff25": "E",
            "\xc8": "E",
            "\xc9": "E",
            "\xca": "E",
            "\u1ec0": "E",
            "\u1ebe": "E",
            "\u1ec4": "E",
            "\u1ec2": "E",
            "\u1ebc": "E",
            "\u0112": "E",
            "\u1e14": "E",
            "\u1e16": "E",
            "\u0114": "E",
            "\u0116": "E",
            "\xcb": "E",
            "\u1eba": "E",
            "\u011a": "E",
            "\u0204": "E",
            "\u0206": "E",
            "\u1eb8": "E",
            "\u1ec6": "E",
            "\u0228": "E",
            "\u1e1c": "E",
            "\u0118": "E",
            "\u1e18": "E",
            "\u1e1a": "E",
            "\u0190": "E",
            "\u018e": "E",
            "\u24bb": "F",
            "\uff26": "F",
            "\u1e1e": "F",
            "\u0191": "F",
            "\ua77b": "F",
            "\u24bc": "G",
            "\uff27": "G",
            "\u01f4": "G",
            "\u011c": "G",
            "\u1e20": "G",
            "\u011e": "G",
            "\u0120": "G",
            "\u01e6": "G",
            "\u0122": "G",
            "\u01e4": "G",
            "\u0193": "G",
            "\ua7a0": "G",
            "\ua77d": "G",
            "\ua77e": "G",
            "\u24bd": "H",
            "\uff28": "H",
            "\u0124": "H",
            "\u1e22": "H",
            "\u1e26": "H",
            "\u021e": "H",
            "\u1e24": "H",
            "\u1e28": "H",
            "\u1e2a": "H",
            "\u0126": "H",
            "\u2c67": "H",
            "\u2c75": "H",
            "\ua78d": "H",
            "\u24be": "I",
            "\uff29": "I",
            "\xcc": "I",
            "\xcd": "I",
            "\xce": "I",
            "\u0128": "I",
            "\u012a": "I",
            "\u012c": "I",
            "\u0130": "I",
            "\xcf": "I",
            "\u1e2e": "I",
            "\u1ec8": "I",
            "\u01cf": "I",
            "\u0208": "I",
            "\u020a": "I",
            "\u1eca": "I",
            "\u012e": "I",
            "\u1e2c": "I",
            "\u0197": "I",
            "\u24bf": "J",
            "\uff2a": "J",
            "\u0134": "J",
            "\u0248": "J",
            "\u24c0": "K",
            "\uff2b": "K",
            "\u1e30": "K",
            "\u01e8": "K",
            "\u1e32": "K",
            "\u0136": "K",
            "\u1e34": "K",
            "\u0198": "K",
            "\u2c69": "K",
            "\ua740": "K",
            "\ua742": "K",
            "\ua744": "K",
            "\ua7a2": "K",
            "\u24c1": "L",
            "\uff2c": "L",
            "\u013f": "L",
            "\u0139": "L",
            "\u013d": "L",
            "\u1e36": "L",
            "\u1e38": "L",
            "\u013b": "L",
            "\u1e3c": "L",
            "\u1e3a": "L",
            "\u0141": "L",
            "\u023d": "L",
            "\u2c62": "L",
            "\u2c60": "L",
            "\ua748": "L",
            "\ua746": "L",
            "\ua780": "L",
            "\u01c7": "LJ",
            "\u01c8": "Lj",
            "\u24c2": "M",
            "\uff2d": "M",
            "\u1e3e": "M",
            "\u1e40": "M",
            "\u1e42": "M",
            "\u2c6e": "M",
            "\u019c": "M",
            "\u24c3": "N",
            "\uff2e": "N",
            "\u01f8": "N",
            "\u0143": "N",
            "\xd1": "N",
            "\u1e44": "N",
            "\u0147": "N",
            "\u1e46": "N",
            "\u0145": "N",
            "\u1e4a": "N",
            "\u1e48": "N",
            "\u0220": "N",
            "\u019d": "N",
            "\ua790": "N",
            "\ua7a4": "N",
            "\u01ca": "NJ",
            "\u01cb": "Nj",
            "\u24c4": "O",
            "\uff2f": "O",
            "\xd2": "O",
            "\xd3": "O",
            "\xd4": "O",
            "\u1ed2": "O",
            "\u1ed0": "O",
            "\u1ed6": "O",
            "\u1ed4": "O",
            "\xd5": "O",
            "\u1e4c": "O",
            "\u022c": "O",
            "\u1e4e": "O",
            "\u014c": "O",
            "\u1e50": "O",
            "\u1e52": "O",
            "\u014e": "O",
            "\u022e": "O",
            "\u0230": "O",
            "\xd6": "O",
            "\u022a": "O",
            "\u1ece": "O",
            "\u0150": "O",
            "\u01d1": "O",
            "\u020c": "O",
            "\u020e": "O",
            "\u01a0": "O",
            "\u1edc": "O",
            "\u1eda": "O",
            "\u1ee0": "O",
            "\u1ede": "O",
            "\u1ee2": "O",
            "\u1ecc": "O",
            "\u1ed8": "O",
            "\u01ea": "O",
            "\u01ec": "O",
            "\xd8": "O",
            "\u01fe": "O",
            "\u0186": "O",
            "\u019f": "O",
            "\ua74a": "O",
            "\ua74c": "O",
            "\u01a2": "OI",
            "\ua74e": "OO",
            "\u0222": "OU",
            "\u24c5": "P",
            "\uff30": "P",
            "\u1e54": "P",
            "\u1e56": "P",
            "\u01a4": "P",
            "\u2c63": "P",
            "\ua750": "P",
            "\ua752": "P",
            "\ua754": "P",
            "\u24c6": "Q",
            "\uff31": "Q",
            "\ua756": "Q",
            "\ua758": "Q",
            "\u024a": "Q",
            "\u24c7": "R",
            "\uff32": "R",
            "\u0154": "R",
            "\u1e58": "R",
            "\u0158": "R",
            "\u0210": "R",
            "\u0212": "R",
            "\u1e5a": "R",
            "\u1e5c": "R",
            "\u0156": "R",
            "\u1e5e": "R",
            "\u024c": "R",
            "\u2c64": "R",
            "\ua75a": "R",
            "\ua7a6": "R",
            "\ua782": "R",
            "\u24c8": "S",
            "\uff33": "S",
            "\u1e9e": "S",
            "\u015a": "S",
            "\u1e64": "S",
            "\u015c": "S",
            "\u1e60": "S",
            "\u0160": "S",
            "\u1e66": "S",
            "\u1e62": "S",
            "\u1e68": "S",
            "\u0218": "S",
            "\u015e": "S",
            "\u2c7e": "S",
            "\ua7a8": "S",
            "\ua784": "S",
            "\u24c9": "T",
            "\uff34": "T",
            "\u1e6a": "T",
            "\u0164": "T",
            "\u1e6c": "T",
            "\u021a": "T",
            "\u0162": "T",
            "\u1e70": "T",
            "\u1e6e": "T",
            "\u0166": "T",
            "\u01ac": "T",
            "\u01ae": "T",
            "\u023e": "T",
            "\ua786": "T",
            "\ua728": "TZ",
            "\u24ca": "U",
            "\uff35": "U",
            "\xd9": "U",
            "\xda": "U",
            "\xdb": "U",
            "\u0168": "U",
            "\u1e78": "U",
            "\u016a": "U",
            "\u1e7a": "U",
            "\u016c": "U",
            "\xdc": "U",
            "\u01db": "U",
            "\u01d7": "U",
            "\u01d5": "U",
            "\u01d9": "U",
            "\u1ee6": "U",
            "\u016e": "U",
            "\u0170": "U",
            "\u01d3": "U",
            "\u0214": "U",
            "\u0216": "U",
            "\u01af": "U",
            "\u1eea": "U",
            "\u1ee8": "U",
            "\u1eee": "U",
            "\u1eec": "U",
            "\u1ef0": "U",
            "\u1ee4": "U",
            "\u1e72": "U",
            "\u0172": "U",
            "\u1e76": "U",
            "\u1e74": "U",
            "\u0244": "U",
            "\u24cb": "V",
            "\uff36": "V",
            "\u1e7c": "V",
            "\u1e7e": "V",
            "\u01b2": "V",
            "\ua75e": "V",
            "\u0245": "V",
            "\ua760": "VY",
            "\u24cc": "W",
            "\uff37": "W",
            "\u1e80": "W",
            "\u1e82": "W",
            "\u0174": "W",
            "\u1e86": "W",
            "\u1e84": "W",
            "\u1e88": "W",
            "\u2c72": "W",
            "\u24cd": "X",
            "\uff38": "X",
            "\u1e8a": "X",
            "\u1e8c": "X",
            "\u24ce": "Y",
            "\uff39": "Y",
            "\u1ef2": "Y",
            "\xdd": "Y",
            "\u0176": "Y",
            "\u1ef8": "Y",
            "\u0232": "Y",
            "\u1e8e": "Y",
            "\u0178": "Y",
            "\u1ef6": "Y",
            "\u1ef4": "Y",
            "\u01b3": "Y",
            "\u024e": "Y",
            "\u1efe": "Y",
            "\u24cf": "Z",
            "\uff3a": "Z",
            "\u0179": "Z",
            "\u1e90": "Z",
            "\u017b": "Z",
            "\u017d": "Z",
            "\u1e92": "Z",
            "\u1e94": "Z",
            "\u01b5": "Z",
            "\u0224": "Z",
            "\u2c7f": "Z",
            "\u2c6b": "Z",
            "\ua762": "Z",
            "\u24d0": "a",
            "\uff41": "a",
            "\u1e9a": "a",
            "\xe0": "a",
            "\xe1": "a",
            "\xe2": "a",
            "\u1ea7": "a",
            "\u1ea5": "a",
            "\u1eab": "a",
            "\u1ea9": "a",
            "\xe3": "a",
            "\u0101": "a",
            "\u0103": "a",
            "\u1eb1": "a",
            "\u1eaf": "a",
            "\u1eb5": "a",
            "\u1eb3": "a",
            "\u0227": "a",
            "\u01e1": "a",
            "\xe4": "a",
            "\u01df": "a",
            "\u1ea3": "a",
            "\xe5": "a",
            "\u01fb": "a",
            "\u01ce": "a",
            "\u0201": "a",
            "\u0203": "a",
            "\u1ea1": "a",
            "\u1ead": "a",
            "\u1eb7": "a",
            "\u1e01": "a",
            "\u0105": "a",
            "\u2c65": "a",
            "\u0250": "a",
            "\ua733": "aa",
            "\xe6": "ae",
            "\u01fd": "ae",
            "\u01e3": "ae",
            "\ua735": "ao",
            "\ua737": "au",
            "\ua739": "av",
            "\ua73b": "av",
            "\ua73d": "ay",
            "\u24d1": "b",
            "\uff42": "b",
            "\u1e03": "b",
            "\u1e05": "b",
            "\u1e07": "b",
            "\u0180": "b",
            "\u0183": "b",
            "\u0253": "b",
            "\u24d2": "c",
            "\uff43": "c",
            "\u0107": "c",
            "\u0109": "c",
            "\u010b": "c",
            "\u010d": "c",
            "\xe7": "c",
            "\u1e09": "c",
            "\u0188": "c",
            "\u023c": "c",
            "\ua73f": "c",
            "\u2184": "c",
            "\u24d3": "d",
            "\uff44": "d",
            "\u1e0b": "d",
            "\u010f": "d",
            "\u1e0d": "d",
            "\u1e11": "d",
            "\u1e13": "d",
            "\u1e0f": "d",
            "\u0111": "d",
            "\u018c": "d",
            "\u0256": "d",
            "\u0257": "d",
            "\ua77a": "d",
            "\u01f3": "dz",
            "\u01c6": "dz",
            "\u24d4": "e",
            "\uff45": "e",
            "\xe8": "e",
            "\xe9": "e",
            "\xea": "e",
            "\u1ec1": "e",
            "\u1ebf": "e",
            "\u1ec5": "e",
            "\u1ec3": "e",
            "\u1ebd": "e",
            "\u0113": "e",
            "\u1e15": "e",
            "\u1e17": "e",
            "\u0115": "e",
            "\u0117": "e",
            "\xeb": "e",
            "\u1ebb": "e",
            "\u011b": "e",
            "\u0205": "e",
            "\u0207": "e",
            "\u1eb9": "e",
            "\u1ec7": "e",
            "\u0229": "e",
            "\u1e1d": "e",
            "\u0119": "e",
            "\u1e19": "e",
            "\u1e1b": "e",
            "\u0247": "e",
            "\u025b": "e",
            "\u01dd": "e",
            "\u24d5": "f",
            "\uff46": "f",
            "\u1e1f": "f",
            "\u0192": "f",
            "\ua77c": "f",
            "\u24d6": "g",
            "\uff47": "g",
            "\u01f5": "g",
            "\u011d": "g",
            "\u1e21": "g",
            "\u011f": "g",
            "\u0121": "g",
            "\u01e7": "g",
            "\u0123": "g",
            "\u01e5": "g",
            "\u0260": "g",
            "\ua7a1": "g",
            "\u1d79": "g",
            "\ua77f": "g",
            "\u24d7": "h",
            "\uff48": "h",
            "\u0125": "h",
            "\u1e23": "h",
            "\u1e27": "h",
            "\u021f": "h",
            "\u1e25": "h",
            "\u1e29": "h",
            "\u1e2b": "h",
            "\u1e96": "h",
            "\u0127": "h",
            "\u2c68": "h",
            "\u2c76": "h",
            "\u0265": "h",
            "\u0195": "hv",
            "\u24d8": "i",
            "\uff49": "i",
            "\xec": "i",
            "\xed": "i",
            "\xee": "i",
            "\u0129": "i",
            "\u012b": "i",
            "\u012d": "i",
            "\xef": "i",
            "\u1e2f": "i",
            "\u1ec9": "i",
            "\u01d0": "i",
            "\u0209": "i",
            "\u020b": "i",
            "\u1ecb": "i",
            "\u012f": "i",
            "\u1e2d": "i",
            "\u0268": "i",
            "\u0131": "i",
            "\u24d9": "j",
            "\uff4a": "j",
            "\u0135": "j",
            "\u01f0": "j",
            "\u0249": "j",
            "\u24da": "k",
            "\uff4b": "k",
            "\u1e31": "k",
            "\u01e9": "k",
            "\u1e33": "k",
            "\u0137": "k",
            "\u1e35": "k",
            "\u0199": "k",
            "\u2c6a": "k",
            "\ua741": "k",
            "\ua743": "k",
            "\ua745": "k",
            "\ua7a3": "k",
            "\u24db": "l",
            "\uff4c": "l",
            "\u0140": "l",
            "\u013a": "l",
            "\u013e": "l",
            "\u1e37": "l",
            "\u1e39": "l",
            "\u013c": "l",
            "\u1e3d": "l",
            "\u1e3b": "l",
            "\u017f": "l",
            "\u0142": "l",
            "\u019a": "l",
            "\u026b": "l",
            "\u2c61": "l",
            "\ua749": "l",
            "\ua781": "l",
            "\ua747": "l",
            "\u01c9": "lj",
            "\u24dc": "m",
            "\uff4d": "m",
            "\u1e3f": "m",
            "\u1e41": "m",
            "\u1e43": "m",
            "\u0271": "m",
            "\u026f": "m",
            "\u24dd": "n",
            "\uff4e": "n",
            "\u01f9": "n",
            "\u0144": "n",
            "\xf1": "n",
            "\u1e45": "n",
            "\u0148": "n",
            "\u1e47": "n",
            "\u0146": "n",
            "\u1e4b": "n",
            "\u1e49": "n",
            "\u019e": "n",
            "\u0272": "n",
            "\u0149": "n",
            "\ua791": "n",
            "\ua7a5": "n",
            "\u01cc": "nj",
            "\u24de": "o",
            "\uff4f": "o",
            "\xf2": "o",
            "\xf3": "o",
            "\xf4": "o",
            "\u1ed3": "o",
            "\u1ed1": "o",
            "\u1ed7": "o",
            "\u1ed5": "o",
            "\xf5": "o",
            "\u1e4d": "o",
            "\u022d": "o",
            "\u1e4f": "o",
            "\u014d": "o",
            "\u1e51": "o",
            "\u1e53": "o",
            "\u014f": "o",
            "\u022f": "o",
            "\u0231": "o",
            "\xf6": "o",
            "\u022b": "o",
            "\u1ecf": "o",
            "\u0151": "o",
            "\u01d2": "o",
            "\u020d": "o",
            "\u020f": "o",
            "\u01a1": "o",
            "\u1edd": "o",
            "\u1edb": "o",
            "\u1ee1": "o",
            "\u1edf": "o",
            "\u1ee3": "o",
            "\u1ecd": "o",
            "\u1ed9": "o",
            "\u01eb": "o",
            "\u01ed": "o",
            "\xf8": "o",
            "\u01ff": "o",
            "\u0254": "o",
            "\ua74b": "o",
            "\ua74d": "o",
            "\u0275": "o",
            "\u01a3": "oi",
            "\u0223": "ou",
            "\ua74f": "oo",
            "\u24df": "p",
            "\uff50": "p",
            "\u1e55": "p",
            "\u1e57": "p",
            "\u01a5": "p",
            "\u1d7d": "p",
            "\ua751": "p",
            "\ua753": "p",
            "\ua755": "p",
            "\u24e0": "q",
            "\uff51": "q",
            "\u024b": "q",
            "\ua757": "q",
            "\ua759": "q",
            "\u24e1": "r",
            "\uff52": "r",
            "\u0155": "r",
            "\u1e59": "r",
            "\u0159": "r",
            "\u0211": "r",
            "\u0213": "r",
            "\u1e5b": "r",
            "\u1e5d": "r",
            "\u0157": "r",
            "\u1e5f": "r",
            "\u024d": "r",
            "\u027d": "r",
            "\ua75b": "r",
            "\ua7a7": "r",
            "\ua783": "r",
            "\u24e2": "s",
            "\uff53": "s",
            "\xdf": "s",
            "\u015b": "s",
            "\u1e65": "s",
            "\u015d": "s",
            "\u1e61": "s",
            "\u0161": "s",
            "\u1e67": "s",
            "\u1e63": "s",
            "\u1e69": "s",
            "\u0219": "s",
            "\u015f": "s",
            "\u023f": "s",
            "\ua7a9": "s",
            "\ua785": "s",
            "\u1e9b": "s",
            "\u24e3": "t",
            "\uff54": "t",
            "\u1e6b": "t",
            "\u1e97": "t",
            "\u0165": "t",
            "\u1e6d": "t",
            "\u021b": "t",
            "\u0163": "t",
            "\u1e71": "t",
            "\u1e6f": "t",
            "\u0167": "t",
            "\u01ad": "t",
            "\u0288": "t",
            "\u2c66": "t",
            "\ua787": "t",
            "\ua729": "tz",
            "\u24e4": "u",
            "\uff55": "u",
            "\xf9": "u",
            "\xfa": "u",
            "\xfb": "u",
            "\u0169": "u",
            "\u1e79": "u",
            "\u016b": "u",
            "\u1e7b": "u",
            "\u016d": "u",
            "\xfc": "u",
            "\u01dc": "u",
            "\u01d8": "u",
            "\u01d6": "u",
            "\u01da": "u",
            "\u1ee7": "u",
            "\u016f": "u",
            "\u0171": "u",
            "\u01d4": "u",
            "\u0215": "u",
            "\u0217": "u",
            "\u01b0": "u",
            "\u1eeb": "u",
            "\u1ee9": "u",
            "\u1eef": "u",
            "\u1eed": "u",
            "\u1ef1": "u",
            "\u1ee5": "u",
            "\u1e73": "u",
            "\u0173": "u",
            "\u1e77": "u",
            "\u1e75": "u",
            "\u0289": "u",
            "\u24e5": "v",
            "\uff56": "v",
            "\u1e7d": "v",
            "\u1e7f": "v",
            "\u028b": "v",
            "\ua75f": "v",
            "\u028c": "v",
            "\ua761": "vy",
            "\u24e6": "w",
            "\uff57": "w",
            "\u1e81": "w",
            "\u1e83": "w",
            "\u0175": "w",
            "\u1e87": "w",
            "\u1e85": "w",
            "\u1e98": "w",
            "\u1e89": "w",
            "\u2c73": "w",
            "\u24e7": "x",
            "\uff58": "x",
            "\u1e8b": "x",
            "\u1e8d": "x",
            "\u24e8": "y",
            "\uff59": "y",
            "\u1ef3": "y",
            "\xfd": "y",
            "\u0177": "y",
            "\u1ef9": "y",
            "\u0233": "y",
            "\u1e8f": "y",
            "\xff": "y",
            "\u1ef7": "y",
            "\u1e99": "y",
            "\u1ef5": "y",
            "\u01b4": "y",
            "\u024f": "y",
            "\u1eff": "y",
            "\u24e9": "z",
            "\uff5a": "z",
            "\u017a": "z",
            "\u1e91": "z",
            "\u017c": "z",
            "\u017e": "z",
            "\u1e93": "z",
            "\u1e95": "z",
            "\u01b6": "z",
            "\u0225": "z",
            "\u0240": "z",
            "\u2c6c": "z",
            "\ua763": "z",
            "\u0386": "\u0391",
            "\u0388": "\u0395",
            "\u0389": "\u0397",
            "\u038a": "\u0399",
            "\u03aa": "\u0399",
            "\u038c": "\u039f",
            "\u038e": "\u03a5",
            "\u03ab": "\u03a5",
            "\u038f": "\u03a9",
            "\u03ac": "\u03b1",
            "\u03ad": "\u03b5",
            "\u03ae": "\u03b7",
            "\u03af": "\u03b9",
            "\u03ca": "\u03b9",
            "\u0390": "\u03b9",
            "\u03cc": "\u03bf",
            "\u03cd": "\u03c5",
            "\u03cb": "\u03c5",
            "\u03b0": "\u03c5",
            "\u03c9": "\u03c9",
            "\u03c2": "\u03c3"
        };
        N = e(document), M = function () {
            var e = 1;
            return function () {
                return e++
            }
        }(), R = k(Object, {
            bind: function (e) {
                var t = this;
                return function () {
                    e.apply(t, arguments)
                }
            }, init: function (s) {
                var i, n, a = ".select2-results";
                this.opts = s = this.prepareOpts(s), this.id = s.id, s.element.data("select2") !== t && null !== s.element.data("select2") && s.element.data("select2").destroy(), this.container = this.createContainer(), this.liveRegion = e("<span>", {
                    role: "status",
                    "aria-live": "polite"
                }).addClass("select2-hidden-accessible").appendTo(document.body), this.containerId = "s2id_" + (s.element.attr("id") || "autogen" + M()), this.containerEventName = this.containerId.replace(/([.])/g, "_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.container.attr("title", s.element.attr("title")), this.body = e("body"), w(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.attr("style", s.element.attr("style")), this.container.css(T(s.containerCss, this.opts.element)), this.container.addClass(T(s.containerCssClass, this.opts.element)), this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", g), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), w(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(T(s.dropdownCssClass, this.opts.element)), this.dropdown.data("select2", this), this.dropdown.on("click", g), this.results = i = this.container.find(a), this.search = n = this.container.find("input.select2-input"), this.queryCount = 0, this.resultsPage = 0, this.context = null, this.initContainer(), this.container.on("click", g), h(this.results), this.dropdown.on("mousemove-filtered", a, this.bind(this.highlightUnderEvent)), this.dropdown.on("touchstart touchmove touchend", a, this.bind(function (e) {
                    this._touchEvent = !0, this.highlightUnderEvent(e)
                })), this.dropdown.on("touchmove", a, this.bind(this.touchMoved)), this.dropdown.on("touchstart touchend", a, this.bind(this.clearTouchMoved)), this.dropdown.on("click", this.bind(function () {
                    this._touchEvent && (this._touchEvent = !1, this.selectHighlighted())
                })), d(80, this.results), this.dropdown.on("scroll-debounced", a, this.bind(this.loadMoreIfNeeded)), e(this.container).on("change", ".select2-input", function (e) {
                    e.stopPropagation()
                }), e(this.dropdown).on("change", ".select2-input", function (e) {
                    e.stopPropagation()
                }), e.fn.mousewheel && i.mousewheel(function (e, t, s, n) {
                    var o = i.scrollTop();
                    n > 0 && 0 >= o - n ? (i.scrollTop(0), g(e)) : 0 > n && i.get(0).scrollHeight - i.scrollTop() + n <= i.height() && (i.scrollTop(i.get(0).scrollHeight - i.height()), g(e))
                }), l(n), n.on("keyup-change input paste", this.bind(this.updateResults)), n.on("focus", function () {
                    n.addClass("select2-focused")
                }), n.on("blur", function () {
                    n.removeClass("select2-focused")
                }), this.dropdown.on("mouseup", a, this.bind(function (t) {
                    e(t.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(t), this.selectHighlighted(t))
                })), this.dropdown.on("click mouseup mousedown touchstart touchend focusin", function (e) {
                    e.stopPropagation()
                }), this.nextSearchTerm = t, e.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), null !== s.maximumInputLength && this.search.attr("maxlength", s.maximumInputLength);
                var r = s.element.prop("disabled");
                r === t && (r = !1), this.enable(!r);
                var c = s.element.prop("readonly");
                c === t && (c = !1), this.readonly(c), U = U || o(), this.autofocus = s.element.prop("autofocus"), s.element.prop("autofocus", !1), this.autofocus && this.focus(), this.search.attr("placeholder", s.searchInputPlaceholder)
            }, destroy: function () {
                var e = this.opts.element, s = e.data("select2"), i = this;
                this.close(), e.length && e[0].detachEvent && e.each(function () {
                    this.detachEvent("onpropertychange", i._sync)
                }), this.propertyObserver && (this.propertyObserver.disconnect(), this.propertyObserver = null), this._sync = null, s !== t && (s.container.remove(), s.liveRegion.remove(), s.dropdown.remove(), e.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), this.elementTabIndex ? e.attr({tabindex: this.elementTabIndex}) : e.removeAttr("tabindex"), e.show()), I.call(this, "container", "liveRegion", "dropdown", "results", "search")
            }, optionToData: function (e) {
                return e.is("option") ? {
                    id: e.prop("value"),
                    text: e.text(),
                    element: e.get(),
                    css: e.attr("class"),
                    disabled: e.prop("disabled"),
                    locked: a(e.attr("locked"), "locked") || a(e.data("locked"), !0)
                } : e.is("optgroup") ? {
                    text: e.attr("label"),
                    children: [],
                    element: e.get(),
                    css: e.attr("class")
                } : void 0
            }, prepareOpts: function (s) {
                var i, n, o, c, l = this;
                if (i = s.element, "select" === i.get(0).tagName.toLowerCase() && (this.select = n = s.element), n && e.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in s) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                }), s = e.extend({}, {
                    populateResults: function (i, n, o) {
                        var a, r = this.opts.id, c = this.liveRegion;
                        (a = function (i, n, h) {
                            var u, d, p, f, g, m, v, w, b, C;
                            i = s.sortResults(i, n, o);
                            var S = [];
                            for (u = 0, d = i.length; d > u; u += 1) p = i[u], g = p.disabled === !0, f = !g && r(p) !== t, m = p.children && p.children.length > 0, v = e("<li></li>"), v.addClass("select2-results-dept-" + h), v.addClass("select2-result"), v.addClass(f ? "select2-result-selectable" : "select2-result-unselectable"), g && v.addClass("select2-disabled"), m && v.addClass("select2-result-with-children"), v.addClass(l.opts.formatResultCssClass(p)), v.attr("role", "presentation"), w = e(document.createElement("div")), w.addClass("select2-result-label"), w.attr("id", "select2-result-label-" + M()), w.attr("role", "option"), C = s.formatResult(p, w, o, l.opts.escapeMarkup), C !== t && (w.html(C), v.append(w)), m && (b = e("<ul></ul>"), b.addClass("select2-result-sub"), a(p.children, b, h + 1), v.append(b)), v.data("select2-data", p), S.push(v[0]);
                            n.append(S), c.text(s.formatMatches(i.length))
                        })(n, i, 0)
                    }
                }, e.fn.select2.defaults, s), "function" != typeof s.id && (o = s.id, s.id = function (e) {
                    return e[o]
                }), e.isArray(s.element.data("select2Tags"))) {
                    if ("tags" in s) throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + s.element.attr("id");
                    s.tags = s.element.data("select2Tags")
                }
                if (n ? (s.query = this.bind(function (e) {
                    var s, n, o, a = {results: [], more: !1}, r = e.term;
                    o = function (t, s) {
                        var i;
                        t.is("option") ? e.matcher(r, t.text(), t) && s.push(l.optionToData(t)) : t.is("optgroup") && (i = l.optionToData(t), t.children().each2(function (e, t) {
                            o(t, i.children)
                        }), i.children.length > 0 && s.push(i))
                    }, s = i.children(), this.getPlaceholder() !== t && s.length > 0 && (n = this.getPlaceholderOption(), n && (s = s.not(n))), s.each2(function (e, t) {
                        o(t, a.results)
                    }), e.callback(a)
                }), s.id = function (e) {
                    return e.id
                }) : "query" in s || ("ajax" in s ? (c = s.element.data("ajax-url"), c && c.length > 0 && (s.ajax.url = c), s.query = S.call(s.element, s.ajax)) : "data" in s ? s.query = y(s.data) : "tags" in s && (s.query = E(s.tags), s.createSearchChoice === t && (s.createSearchChoice = function (t) {
                    return {id: e.trim(t), text: e.trim(t)}
                }), s.initSelection === t && (s.initSelection = function (t, i) {
                    var n = [];
                    e(r(t.val(), s.separator)).each(function () {
                        var t = {id: this, text: this}, i = s.tags;
                        e.isFunction(i) && (i = i()), e(i).each(function () {
                            return a(this.id, t.id) ? (t = this, !1) : void 0
                        }), n.push(t)
                    }), i(n)
                }))), "function" != typeof s.query) throw"query function not defined for Select2 " + s.element.attr("id");
                if ("top" === s.createSearchChoicePosition) s.createSearchChoicePosition = function (e, t) {
                    e.unshift(t)
                }; else if ("bottom" === s.createSearchChoicePosition) s.createSearchChoicePosition = function (e, t) {
                    e.push(t)
                }; else if ("function" != typeof s.createSearchChoicePosition) throw"invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";
                return s
            }, monitorSource: function () {
                var s, i = this.opts.element, n = this;
                i.on("change.select2", this.bind(function () {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                })), this._sync = this.bind(function () {
                    var e = i.prop("disabled");
                    e === t && (e = !1), this.enable(!e);
                    var s = i.prop("readonly");
                    s === t && (s = !1), this.readonly(s), w(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(T(this.opts.containerCssClass, this.opts.element)), w(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(T(this.opts.dropdownCssClass, this.opts.element))
                }), i.length && i[0].attachEvent && i.each(function () {
                    this.attachEvent("onpropertychange", n._sync)
                }), s = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, s !== t && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new s(function (t) {
                    e.each(t, n._sync)
                }), this.propertyObserver.observe(i.get(0), {attributes: !0, subtree: !1}))
            }, triggerSelect: function (t) {
                var s = e.Event("select2-selecting", {val: this.id(t), object: t, choice: t});
                return this.opts.element.trigger(s), !s.isDefaultPrevented()
            }, triggerChange: function (t) {
                t = t || {}, t = e.extend({}, t, {
                    type: "change",
                    val: this.val()
                }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(t), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
            }, isInterfaceEnabled: function () {
                return this.enabledInterface === !0
            }, enableInterface: function () {
                var e = this._enabled && !this._readonly, t = !e;
                return e === this.enabledInterface ? !1 : (this.container.toggleClass("select2-container-disabled", t), this.close(), this.enabledInterface = e, !0)
            }, enable: function (e) {
                e === t && (e = !0), this._enabled !== e && (this._enabled = e, this.opts.element.prop("disabled", !e), this.enableInterface())
            }, disable: function () {
                this.enable(!1)
            }, readonly: function (e) {
                e === t && (e = !1), this._readonly !== e && (this._readonly = e, this.opts.element.prop("readonly", e), this.enableInterface())
            }, opened: function () {
                return this.container ? this.container.hasClass("select2-dropdown-open") : !1
            }, positionDropdown: function () {
                var t, s, i, n, o, a = this.dropdown, r = this.container.offset(), c = this.container.outerHeight(!1),
                    l = this.container.outerWidth(!1), h = a.outerHeight(!1), u = e(window), d = u.width(),
                    p = u.height(), f = u.scrollLeft() + d, g = u.scrollTop() + p, m = r.top + c, v = r.left,
                    w = g >= m + h, b = r.top - h >= u.scrollTop(), C = a.outerWidth(!1), S = f >= v + C,
                    y = a.hasClass("select2-drop-above");
                y ? (s = !0, !b && w && (i = !0, s = !1)) : (s = !1, !w && b && (i = !0, s = !0)), i && (a.hide(), r = this.container.offset(), c = this.container.outerHeight(!1), l = this.container.outerWidth(!1), h = a.outerHeight(!1), f = u.scrollLeft() + d, g = u.scrollTop() + p, m = r.top + c, v = r.left, C = a.outerWidth(!1), S = f >= v + C, a.show(), this.focusSearch()), this.opts.dropdownAutoWidth ? (o = e(".select2-results", a)[0], a.addClass("select2-drop-auto-width"), a.css("width", ""), C = a.outerWidth(!1) + (o.scrollHeight === o.clientHeight ? 0 : U.width), C > l ? l = C : C = l, h = a.outerHeight(!1), S = f >= v + C) : this.container.removeClass("select2-drop-auto-width"), "static" !== this.body.css("position") && (t = this.body.offset(), m -= t.top, v -= t.left), S || (v = r.left + this.container.outerWidth(!1) - C), n = {
                    left: v,
                    width: l
                }, s ? (n.top = r.top - h, n.bottom = "auto", this.container.addClass("select2-drop-above"), a.addClass("select2-drop-above")) : (n.top = m, n.bottom = "auto", this.container.removeClass("select2-drop-above"), a.removeClass("select2-drop-above")), n = e.extend(n, T(this.opts.dropdownCss, this.opts.element)), a.css(n)
            }, shouldOpen: function () {
                var t;
                return this.opened() ? !1 : this._enabled === !1 || this._readonly === !0 ? !1 : (t = e.Event("select2-opening"), this.opts.element.trigger(t), !t.isDefaultPrevented())
            }, clearDropdownAlignmentPreference: function () {
                this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
            }, open: function () {
                return this.shouldOpen() ? (this.opening(), N.on("mousemove.select2Event", function (e) {
                    F.x = e.pageX, F.y = e.pageY
                }), !0) : !1
            }, opening: function () {
                var t, i = this.containerEventName, n = "scroll." + i, o = "resize." + i, a = "orientationchange." + i;
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body.children().last()[0] && this.dropdown.detach().appendTo(this.body), t = e("#select2-drop-mask"), 0 == t.length && (t = e(document.createElement("div")), t.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), t.hide(), t.appendTo(this.body), t.on("mousedown touchstart click", function (i) {
                    s(t);
                    var n, o = e("#select2-drop");
                    o.length > 0 && (n = o.data("select2"), n.opts.selectOnBlur && n.selectHighlighted({noFocus: !0}), n.close(), i.preventDefault(), i.stopPropagation())
                })), this.dropdown.prev()[0] !== t[0] && this.dropdown.before(t), e("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), t.show(), this.positionDropdown(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active");
                var r = this;
                this.container.parents().add(window).each(function () {
                    e(this).on(o + " " + n + " " + a, function () {
                        r.opened() && r.positionDropdown()
                    })
                })
            }, close: function () {
                if (this.opened()) {
                    var t = this.containerEventName, s = "scroll." + t, i = "resize." + t, n = "orientationchange." + t;
                    this.container.parents().add(window).each(function () {
                        e(this).off(s).off(i).off(n)
                    }), this.clearDropdownAlignmentPreference(), e("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), this.results.empty(), N.off("mousemove.select2Event"), this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger(e.Event("select2-close"))
                }
            }, externalSearch: function (e) {
                this.open(), this.search.val(e), this.updateResults(!1)
            }, clearSearch: function () {
            }, getMaximumSelectionSize: function () {
                return T(this.opts.maximumSelectionSize, this.opts.element)
            }, ensureHighlightVisible: function () {
                var t, s, i, n, o, a, r, c, l = this.results;
                if (s = this.highlight(), !(0 > s)) {
                    if (0 == s) return void l.scrollTop(0);
                    t = this.findHighlightableChoices().find(".select2-result-label"), i = e(t[s]), c = (i.offset() || {}).top || 0, n = c + i.outerHeight(!0), s === t.length - 1 && (r = l.find("li.select2-more-results"), r.length > 0 && (n = r.offset().top + r.outerHeight(!0))), o = l.offset().top + l.outerHeight(!0), n > o && l.scrollTop(l.scrollTop() + (n - o)), a = c - l.offset().top, 0 > a && "none" != i.css("display") && l.scrollTop(l.scrollTop() + a)
                }
            }, findHighlightableChoices: function () {
                return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)")
            }, moveHighlight: function (t) {
                for (var s = this.findHighlightableChoices(), i = this.highlight(); i > -1 && i < s.length;) {
                    i += t;
                    var n = e(s[i]);
                    if (n.hasClass("select2-result-selectable") && !n.hasClass("select2-disabled") && !n.hasClass("select2-selected")) {
                        this.highlight(i);
                        break
                    }
                }
            }, highlight: function (t) {
                var s, i, o = this.findHighlightableChoices();
                return 0 === arguments.length ? n(o.filter(".select2-highlighted")[0], o.get()) : (t >= o.length && (t = o.length - 1), 0 > t && (t = 0), this.removeHighlight(), s = e(o[t]), s.addClass("select2-highlighted"), this.search.attr("aria-activedescendant", s.find(".select2-result-label").attr("id")), this.ensureHighlightVisible(), this.liveRegion.text(s.text()), i = s.data("select2-data"), void(i && this.opts.element.trigger({
                    type: "select2-highlight",
                    val: this.id(i),
                    choice: i
                })))
            }, removeHighlight: function () {
                this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            }, touchMoved: function () {
                this._touchMoved = !0
            }, clearTouchMoved: function () {
                this._touchMoved = !1
            }, countSelectableResults: function () {
                return this.findHighlightableChoices().length
            }, highlightUnderEvent: function (t) {
                var s = e(t.target).closest(".select2-result-selectable");
                if (s.length > 0 && !s.is(".select2-highlighted")) {
                    var i = this.findHighlightableChoices();
                    this.highlight(i.index(s))
                } else 0 == s.length && this.removeHighlight()
            }, loadMoreIfNeeded: function () {
                var e, t = this.results, s = t.find("li.select2-more-results"), i = this.resultsPage + 1, n = this,
                    o = this.search.val(), a = this.context;
                0 !== s.length && (e = s.offset().top - t.offset().top - t.height(), e <= this.opts.loadMorePadding && (s.addClass("select2-active"), this.opts.query({
                    element: this.opts.element,
                    term: o,
                    page: i,
                    context: a,
                    matcher: this.opts.matcher,
                    callback: this.bind(function (e) {
                        n.opened() && (n.opts.populateResults.call(this, t, e.results, {
                            term: o,
                            page: i,
                            context: a
                        }), n.postprocessResults(e, !1, !1), e.more === !0 ? (s.detach().appendTo(t).text(T(n.opts.formatLoadMore, n.opts.element, i + 1)), window.setTimeout(function () {
                            n.loadMoreIfNeeded()
                        }, 10)) : s.remove(), n.positionDropdown(), n.resultsPage = i, n.context = e.context, this.opts.element.trigger({
                            type: "select2-loaded",
                            items: e
                        }))
                    })
                })))
            }, tokenize: function () {
            }, updateResults: function (s) {
                function i() {
                    l.removeClass("select2-active"), d.positionDropdown(), d.liveRegion.text(h.find(".select2-no-results,.select2-selection-limit,.select2-searching").length ? h.text() : d.opts.formatMatches(h.find(".select2-result-selectable").length))
                }

                function n(e) {
                    h.html(e), i()
                }

                var o, r, c, l = this.search, h = this.results, u = this.opts, d = this, p = l.val(),
                    f = e.data(this.container, "select2-last-term");
                if ((s === !0 || !f || !a(p, f)) && (e.data(this.container, "select2-last-term", p), s === !0 || this.showSearchInput !== !1 && this.opened())) {
                    c = ++this.queryCount;
                    var g = this.getMaximumSelectionSize();
                    if (g >= 1 && (o = this.data(), e.isArray(o) && o.length >= g && x(u.formatSelectionTooBig, "formatSelectionTooBig"))) return void n("<li class='select2-selection-limit'>" + T(u.formatSelectionTooBig, u.element, g) + "</li>");
                    if (l.val().length < u.minimumInputLength) return n(x(u.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + T(u.formatInputTooShort, u.element, l.val(), u.minimumInputLength) + "</li>" : ""), void(s && this.showSearch && this.showSearch(!0));
                    if (u.maximumInputLength && l.val().length > u.maximumInputLength) return void n(x(u.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + T(u.formatInputTooLong, u.element, l.val(), u.maximumInputLength) + "</li>" : "");
                    u.formatSearching && 0 === this.findHighlightableChoices().length && n("<li class='select2-searching'>" + T(u.formatSearching, u.element) + "</li>"), l.addClass("select2-active"), this.removeHighlight(), r = this.tokenize(), r != t && null != r && l.val(r), this.resultsPage = 1, u.query({
                        element: u.element,
                        term: l.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: u.matcher,
                        callback: this.bind(function (o) {
                            var r;
                            if (c == this.queryCount) {
                                if (!this.opened()) return void this.search.removeClass("select2-active");
                                if (o.hasError !== t && x(u.formatAjaxError, "formatAjaxError")) return void n("<li class='select2-ajax-error'>" + T(u.formatAjaxError, u.element, o.jqXHR, o.textStatus, o.errorThrown) + "</li>");
                                if (this.context = o.context === t ? null : o.context, this.opts.createSearchChoice && "" !== l.val() && (r = this.opts.createSearchChoice.call(d, l.val(), o.results), r !== t && null !== r && d.id(r) !== t && null !== d.id(r) && 0 === e(o.results).filter(function () {
                                    return a(d.id(this), d.id(r))
                                }).length && this.opts.createSearchChoicePosition(o.results, r)), 0 === o.results.length && x(u.formatNoMatches, "formatNoMatches")) return void n("<li class='select2-no-results'>" + T(u.formatNoMatches, u.element, l.val()) + "</li>");
                                h.empty(), d.opts.populateResults.call(this, h, o.results, {
                                    term: l.val(),
                                    page: this.resultsPage,
                                    context: null
                                }), o.more === !0 && x(u.formatLoadMore, "formatLoadMore") && (h.append("<li class='select2-more-results'>" + u.escapeMarkup(T(u.formatLoadMore, u.element, this.resultsPage)) + "</li>"), window.setTimeout(function () {
                                    d.loadMoreIfNeeded()
                                }, 10)), this.postprocessResults(o, s), i(), this.opts.element.trigger({
                                    type: "select2-loaded",
                                    items: o
                                })
                            }
                        })
                    })
                }
            }, cancel: function () {
                this.close()
            }, blur: function () {
                this.opts.selectOnBlur && this.selectHighlighted({noFocus: !0}), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
            }, focusSearch: function () {
                p(this.search)
            }, selectHighlighted: function (e) {
                if (this._touchMoved) return void this.clearTouchMoved();
                var t = this.highlight(), s = this.results.find(".select2-highlighted"),
                    i = s.closest(".select2-result").data("select2-data");
                i ? (this.highlight(t), this.onSelect(i, e)) : e && e.noFocus && this.close()
            }, getPlaceholder: function () {
                var e;
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((e = this.getPlaceholderOption()) !== t ? e.text() : t)
            }, getPlaceholderOption: function () {
                if (this.select) {
                    var s = this.select.children("option").first();
                    if (this.opts.placeholderOption !== t) return "first" === this.opts.placeholderOption && s || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select);
                    if ("" === e.trim(s.text()) && "" === s.val()) return s
                }
            }, initContainerWidth: function () {
                function s() {
                    var s, i, n, o, a, r;
                    if ("off" === this.opts.width) return null;
                    if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if (s = this.opts.element.attr("style"), s !== t) for (i = s.split(";"), o = 0, a = i.length; a > o; o += 1) if (r = i[o].replace(/\s/g, ""), n = r.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i), null !== n && n.length >= 1) return n[1];
                        return "resolve" === this.opts.width ? (s = this.opts.element.css("width"), s.indexOf("%") > 0 ? s : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return e.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }

                var i = s.call(this);
                null !== i && this.container.css("width", i)
            }
        }), D = k(R, {
            createContainer: function () {
                var t = e(document.createElement("div")).attr({"class": "select2-container"}).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>", "</a>", "<label for='' class='select2-offscreen'></label>", "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <label for='' class='select2-offscreen'></label>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'", "       aria-autocomplete='list' />", "   </div>", "   <ul class='select2-results' role='listbox'>", "   </ul>", "</div>"].join(""));
                return t
            }, enableInterface: function () {
                this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled())
            }, opening: function () {
                var s, i, n;
                this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.opts.shouldFocusInput(this) && (this.search.focus(), s = this.search.get(0), s.createTextRange ? (i = s.createTextRange(), i.collapse(!1), i.select()) : s.setSelectionRange && (n = this.search.val().length, s.setSelectionRange(n, n))), "" === this.search.val() && this.nextSearchTerm != t && (this.search.val(this.nextSearchTerm), this.search.select()), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger(e.Event("select2-open"))
            }, close: function () {
                this.opened() && (this.parent.close.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus())
            }, focus: function () {
                this.opened() ? this.close() : (this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus())
            }, isFocused: function () {
                return this.container.hasClass("select2-container-active")
            }, cancel: function () {
                this.parent.cancel.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus()
            }, destroy: function () {
                e("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), I.call(this, "selection", "focusser")
            }, initContainer: function () {
                var t, i, n = this.container, o = this.dropdown, a = M();
                this.showSearch(this.opts.minimumResultsForSearch < 0 ? !1 : !0), this.selection = t = n.find(".select2-choice"), this.focusser = n.find(".select2-focusser"), t.find(".select2-chosen").attr("id", "select2-chosen-" + a), this.focusser.attr("aria-labelledby", "select2-chosen-" + a), this.results.attr("id", "select2-results-" + a), this.search.attr("aria-owns", "select2-results-" + a), this.focusser.attr("id", "s2id_autogen" + a), i = e("label[for='" + this.opts.element.attr("id") + "']"), this.focusser.prev().text(i.text()).attr("for", this.focusser.attr("id"));
                var r = this.opts.element.attr("title");
                this.opts.element.attr("title", r || i.text()), this.focusser.attr("tabindex", this.elementTabIndex), this.search.attr("id", this.focusser.attr("id") + "_search"), this.search.prev().text(e("label[for='" + this.focusser.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.search.on("keydown", this.bind(function (e) {
                    if (this.isInterfaceEnabled() && 229 != e.keyCode) {
                        if (e.which === A.PAGE_UP || e.which === A.PAGE_DOWN) return void g(e);
                        switch (e.which) {
                            case A.UP:
                            case A.DOWN:
                                return this.moveHighlight(e.which === A.UP ? -1 : 1), void g(e);
                            case A.ENTER:
                                return this.selectHighlighted(), void g(e);
                            case A.TAB:
                                return void this.selectHighlighted({noFocus: !0});
                            case A.ESC:
                                return this.cancel(e), void g(e)
                        }
                    }
                })), this.search.on("blur", this.bind(function () {
                    document.activeElement === this.body.get(0) && window.setTimeout(this.bind(function () {
                        this.opened() && this.search.focus()
                    }), 0)
                })), this.focusser.on("keydown", this.bind(function (e) {
                    if (this.isInterfaceEnabled() && e.which !== A.TAB && !A.isControl(e) && !A.isFunctionKey(e) && e.which !== A.ESC) {
                        if (this.opts.openOnEnter === !1 && e.which === A.ENTER) return void g(e);
                        if (e.which == A.DOWN || e.which == A.UP || e.which == A.ENTER && this.opts.openOnEnter) {
                            if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
                            return this.open(), void g(e)
                        }
                        return e.which == A.DELETE || e.which == A.BACKSPACE ? (this.opts.allowClear && this.clear(), void g(e)) : void 0
                    }
                })), l(this.focusser), this.focusser.on("keyup-change input", this.bind(function (e) {
                    if (this.opts.minimumResultsForSearch >= 0) {
                        if (e.stopPropagation(), this.opened()) return;
                        this.open()
                    }
                })), t.on("mousedown touchstart", "abbr", this.bind(function (e) {
                    this.isInterfaceEnabled() && (this.clear(), m(e), this.close(), this.selection.focus())
                })), t.on("mousedown touchstart", this.bind(function (i) {
                    s(t), this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), g(i)
                })), o.on("mousedown touchstart", this.bind(function () {
                    this.opts.shouldFocusInput(this) && this.search.focus()
                })), t.on("focus", this.bind(function (e) {
                    g(e)
                })), this.focusser.on("focus", this.bind(function () {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.container.addClass("select2-container-active")
                })).on("blur", this.bind(function () {
                    this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(e.Event("select2-blur")))
                })), this.search.on("focus", this.bind(function () {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.container.addClass("select2-container-active")
                })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.setPlaceholder()
            }, clear: function (t) {
                var s = this.selection.data("select2-data");
                if (s) {
                    var i = e.Event("select2-clearing");
                    if (this.opts.element.trigger(i), i.isDefaultPrevented()) return;
                    var n = this.getPlaceholderOption();
                    this.opts.element.val(n ? n.val() : ""), this.selection.find(".select2-chosen").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), t !== !1 && (this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(s),
                        choice: s
                    }), this.triggerChange({removed: s}))
                }
            }, initSelection: function () {
                if (this.isPlaceholderOptionSelected()) this.updateSelection(null), this.close(), this.setPlaceholder(); else {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element, function (s) {
                        s !== t && null !== s && (e.updateSelection(s), e.close(), e.setPlaceholder(), e.nextSearchTerm = e.opts.nextSearchTerm(s, e.search.val()))
                    })
                }
            }, isPlaceholderOptionSelected: function () {
                var e;
                return this.getPlaceholder() === t ? !1 : (e = this.getPlaceholderOption()) !== t && e.prop("selected") || "" === this.opts.element.val() || this.opts.element.val() === t || null === this.opts.element.val()
            }, prepareOpts: function () {
                var t = this.parent.prepareOpts.apply(this, arguments), s = this;
                return "select" === t.element.get(0).tagName.toLowerCase() ? t.initSelection = function (e, t) {
                    var i = e.find("option").filter(function () {
                        return this.selected && !this.disabled
                    });
                    t(s.optionToData(i))
                } : "data" in t && (t.initSelection = t.initSelection || function (s, i) {
                    var n = s.val(), o = null;
                    t.query({
                        matcher: function (e, s, i) {
                            var r = a(n, t.id(i));
                            return r && (o = i), r
                        }, callback: e.isFunction(i) ? function () {
                            i(o)
                        } : e.noop
                    })
                }), t
            }, getPlaceholder: function () {
                return this.select && this.getPlaceholderOption() === t ? t : this.parent.getPlaceholder.apply(this, arguments)
            }, setPlaceholder: function () {
                var e = this.getPlaceholder();
                if (this.isPlaceholderOptionSelected() && e !== t) {
                    if (this.select && this.getPlaceholderOption() === t) return;
                    this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(e)), this.selection.addClass("select2-default"), this.container.removeClass("select2-allowclear")
                }
            }, postprocessResults: function (e, t, s) {
                var i = 0, n = this;
                if (this.findHighlightableChoices().each2(function (e, t) {
                    return a(n.id(t.data("select2-data")), n.opts.element.val()) ? (i = e, !1) : void 0
                }), s !== !1 && this.highlight(t === !0 && i >= 0 ? i : 0), t === !0) {
                    var o = this.opts.minimumResultsForSearch;
                    o >= 0 && this.showSearch(O(e.results) >= o)
                }
            }, showSearch: function (t) {
                this.showSearchInput !== t && (this.showSearchInput = t, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !t), this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !t), e(this.dropdown, this.container).toggleClass("select2-with-searchbox", t))
            }, onSelect: function (e, t) {
                if (this.triggerSelect(e)) {
                    var s = this.opts.element.val(), i = this.data();
                    this.opts.element.val(this.id(e)), this.updateSelection(e), this.opts.element.trigger({
                        type: "select2-selected",
                        val: this.id(e),
                        choice: e
                    }), this.nextSearchTerm = this.opts.nextSearchTerm(e, this.search.val()), this.close(), t && t.noFocus || !this.opts.shouldFocusInput(this) || this.focusser.focus(), a(s, this.id(e)) || this.triggerChange({
                        added: e,
                        removed: i
                    })
                }
            }, updateSelection: function (e) {
                var s, i, n = this.selection.find(".select2-chosen");
                this.selection.data("select2-data", e), n.empty(), null !== e && (s = this.opts.formatSelection(e, n, this.opts.escapeMarkup)), s !== t && n.append(s), i = this.opts.formatSelectionCssClass(e, n), i !== t && n.addClass(i), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== t && this.container.addClass("select2-allowclear")
            }, val: function () {
                var e, s = !1, i = null, n = this, o = this.data();
                if (0 === arguments.length) return this.opts.element.val();
                if (e = arguments[0], arguments.length > 1 && (s = arguments[1]), this.select) this.select.val(e).find("option").filter(function () {
                    return this.selected
                }).each2(function (e, t) {
                    return i = n.optionToData(t), !1
                }), this.updateSelection(i), this.setPlaceholder(), s && this.triggerChange({
                    added: i,
                    removed: o
                }); else {
                    if (!e && 0 !== e) return void this.clear(s);
                    if (this.opts.initSelection === t) throw new Error("cannot call val() if initSelection() is not defined");
                    this.opts.element.val(e), this.opts.initSelection(this.opts.element, function (e) {
                        n.opts.element.val(e ? n.id(e) : ""), n.updateSelection(e), n.setPlaceholder(), s && n.triggerChange({
                            added: e,
                            removed: o
                        })
                    })
                }
            }, clearSearch: function () {
                this.search.val(""), this.focusser.val("")
            }, data: function (e) {
                var s, i = !1;
                return 0 === arguments.length ? (s = this.selection.data("select2-data"), s == t && (s = null), s) : (arguments.length > 1 && (i = arguments[1]), void(e ? (s = this.data(), this.opts.element.val(e ? this.id(e) : ""), this.updateSelection(e), i && this.triggerChange({
                    added: e,
                    removed: s
                })) : this.clear(i)))
            }
        }), H = k(R, {
            createContainer: function () {
                var t = e(document.createElement("div")).attr({"class": "select2-container select2-container-multi"}).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <label for='' class='select2-offscreen'></label>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            }, prepareOpts: function () {
                var t = this.parent.prepareOpts.apply(this, arguments), s = this;
                return "select" === t.element.get(0).tagName.toLowerCase() ? t.initSelection = function (e, t) {
                    var i = [];
                    e.find("option").filter(function () {
                        return this.selected && !this.disabled
                    }).each2(function (e, t) {
                        i.push(s.optionToData(t))
                    }), t(i)
                } : "data" in t && (t.initSelection = t.initSelection || function (s, i) {
                    var n = r(s.val(), t.separator), o = [];
                    t.query({
                        matcher: function (s, i, r) {
                            var c = e.grep(n, function (e) {
                                return a(e, t.id(r))
                            }).length;
                            return c && o.push(r), c
                        }, callback: e.isFunction(i) ? function () {
                            for (var e = [], s = 0; s < n.length; s++) for (var r = n[s], c = 0; c < o.length; c++) {
                                var l = o[c];
                                if (a(r, t.id(l))) {
                                    e.push(l), o.splice(c, 1);
                                    break
                                }
                            }
                            i(e)
                        } : e.noop
                    })
                }), t
            }, selectChoice: function (e) {
                var t = this.container.find(".select2-search-choice-focus");
                t.length && e && e[0] == t[0] || (t.length && this.opts.element.trigger("choice-deselected", t), t.removeClass("select2-search-choice-focus"), e && e.length && (this.close(), e.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", e)))
            }, destroy: function () {
                e("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), I.call(this, "searchContainer", "selection")
            }, initContainer: function () {
                var t, s = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"), this.selection = t = this.container.find(s);
                var i = this;
                this.selection.on("click", ".select2-search-choice:not(.select2-locked)", function () {
                    i.search[0].focus(), i.selectChoice(e(this))
                }), this.search.attr("id", "s2id_autogen" + M()), this.search.prev().text(e("label[for='" + this.opts.element.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.search.on("input paste", this.bind(function () {
                    this.search.attr("placeholder") && 0 == this.search.val().length || this.isInterfaceEnabled() && (this.opened() || this.open())
                })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function (e) {
                    if (this.isInterfaceEnabled()) {
                        ++this.keydowns;
                        var s = t.find(".select2-search-choice-focus"),
                            i = s.prev(".select2-search-choice:not(.select2-locked)"),
                            n = s.next(".select2-search-choice:not(.select2-locked)"), o = f(this.search);
                        if (s.length && (e.which == A.LEFT || e.which == A.RIGHT || e.which == A.BACKSPACE || e.which == A.DELETE || e.which == A.ENTER)) {
                            var a = s;
                            return e.which == A.LEFT && i.length ? a = i : e.which == A.RIGHT ? a = n.length ? n : null : e.which === A.BACKSPACE ? this.unselect(s.first()) && (this.search.width(10), a = i.length ? i : n) : e.which == A.DELETE ? this.unselect(s.first()) && (this.search.width(10), a = n.length ? n : null) : e.which == A.ENTER && (a = null), this.selectChoice(a), g(e), void(a && a.length || this.open())
                        }
                        if ((e.which === A.BACKSPACE && 1 == this.keydowns || e.which == A.LEFT) && 0 == o.offset && !o.length) return this.selectChoice(t.find(".select2-search-choice:not(.select2-locked)").last()), void g(e);
                        if (this.selectChoice(null), this.opened()) switch (e.which) {
                            case A.UP:
                            case A.DOWN:
                                return this.moveHighlight(e.which === A.UP ? -1 : 1), void g(e);
                            case A.ENTER:
                                return this.selectHighlighted(), void g(e);
                            case A.TAB:
                                return this.selectHighlighted({noFocus: !0}), void this.close();
                            case A.ESC:
                                return this.cancel(e), void g(e)
                        }
                        if (e.which !== A.TAB && !A.isControl(e) && !A.isFunctionKey(e) && e.which !== A.BACKSPACE && e.which !== A.ESC) {
                            if (e.which === A.ENTER) {
                                if (this.opts.openOnEnter === !1) return;
                                if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return
                            }
                            this.open(), (e.which === A.PAGE_UP || e.which === A.PAGE_DOWN) && g(e), e.which === A.ENTER && g(e)
                        }
                    }
                })), this.search.on("keyup", this.bind(function () {
                    this.keydowns = 0, this.resizeSearch()
                })), this.search.on("blur", this.bind(function (t) {
                    this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.selectChoice(null), this.opened() || this.clearSearch(), t.stopImmediatePropagation(), this.opts.element.trigger(e.Event("select2-blur"))
                })), this.container.on("click", s, this.bind(function (t) {
                    this.isInterfaceEnabled() && (e(t.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.open(), this.focusSearch(), t.preventDefault()))
                })), this.container.on("focus", s, this.bind(function () {
                    this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.clearSearch()
            }, enableInterface: function () {
                this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled())
            }, initSelection: function () {
                if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element, function (s) {
                        s !== t && null !== s && (e.updateSelection(s), e.close(), e.clearSearch())
                    })
                }
            }, clearSearch: function () {
                var e = this.getPlaceholder(), s = this.getMaxSearchWidth();
                e !== t && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(e).addClass("select2-default"), this.search.width(s > 0 ? s : this.container.css("width"))) : this.search.val("").width(10)
            }, clearPlaceholder: function () {
                this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
            }, opening: function () {
                this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), "" === this.search.val() && this.nextSearchTerm != t && (this.search.val(this.nextSearchTerm), this.search.select()), this.updateResults(!0), this.opts.shouldFocusInput(this) && this.search.focus(), this.opts.element.trigger(e.Event("select2-open"))
            }, close: function () {
                this.opened() && this.parent.close.apply(this, arguments)
            }, focus: function () {
                this.close(), this.search.focus()
            }, isFocused: function () {
                return this.search.hasClass("select2-focused")
            }, updateSelection: function (t) {
                var s = [], i = [], o = this;
                e(t).each(function () {
                    n(o.id(this), s) < 0 && (s.push(o.id(this)), i.push(this))
                }), t = i, this.selection.find(".select2-search-choice").remove(), e(t).each(function () {
                    o.addSelectedChoice(this)
                }), o.postprocessResults()
            }, tokenize: function () {
                var e = this.search.val();
                e = this.opts.tokenizer.call(this, e, this.data(), this.bind(this.onSelect), this.opts), null != e && e != t && (this.search.val(e), e.length > 0 && this.open())
            }, onSelect: function (e, s) {
                this.triggerSelect(e) && "" !== e.text && (this.addSelectedChoice(e), this.opts.element.trigger({
                    type: "selected",
                    val: this.id(e),
                    choice: e
                }), this.nextSearchTerm = this.opts.nextSearchTerm(e, this.search.val()), this.clearSearch(), this.updateResults(), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(e, !1, this.opts.closeOnSelect === !0), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() ? this.updateResults(!0) : this.nextSearchTerm != t && (this.search.val(this.nextSearchTerm), this.updateResults(), this.search.select()), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({added: e}), s && s.noFocus || this.focusSearch())
            }, cancel: function () {
                this.close(), this.focusSearch()
            }, addSelectedChoice: function (s) {
                var i, n, o = !s.locked,
                    a = e("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                    r = e("<li class='select2-search-choice select2-locked'><div></div></li>"), c = o ? a : r,
                    l = this.id(s), h = this.getVal();
                i = this.opts.formatSelection(s, c.find("div"), this.opts.escapeMarkup), i != t && c.find("div").replaceWith("<div>" + i + "</div>"), n = this.opts.formatSelectionCssClass(s, c.find("div")), n != t && c.addClass(n), o && c.find(".select2-search-choice-close").on("mousedown", g).on("click dblclick", this.bind(function (t) {
                    this.isInterfaceEnabled() && (this.unselect(e(t.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), g(t), this.close(), this.focusSearch())
                })).on("focus", this.bind(function () {
                    this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                })), c.data("select2-data", s), c.insertBefore(this.searchContainer), h.push(l), this.setVal(h)
            }, unselect: function (t) {
                var s, i, o = this.getVal();
                if (t = t.closest(".select2-search-choice"), 0 === t.length) throw"Invalid argument: " + t + ". Must be .select2-search-choice";
                if (s = t.data("select2-data")) {
                    var a = e.Event("select2-removing");
                    if (a.val = this.id(s), a.choice = s, this.opts.element.trigger(a), a.isDefaultPrevented()) return !1;
                    for (; (i = n(this.id(s), o)) >= 0;) o.splice(i, 1), this.setVal(o), this.select && this.postprocessResults();
                    return t.remove(), this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(s),
                        choice: s
                    }), this.triggerChange({removed: s}), !0
                }
            }, postprocessResults: function (e, t, s) {
                var i = this.getVal(), o = this.results.find(".select2-result"),
                    a = this.results.find(".select2-result-with-children"), r = this;
                o.each2(function (e, t) {
                    var s = r.id(t.data("select2-data"));
                    n(s, i) >= 0 && (t.addClass("select2-selected"), t.find(".select2-result-selectable").addClass("select2-selected"))
                }), a.each2(function (e, t) {
                    t.is(".select2-result-selectable") || 0 !== t.find(".select2-result-selectable:not(.select2-selected)").length || t.addClass("select2-selected")
                }), -1 == this.highlight() && s !== !1 && r.highlight(0), !this.opts.createSearchChoice && !o.filter(".select2-result:not(.select2-selected)").length > 0 && (!e || e && !e.more && 0 === this.results.find(".select2-no-results").length) && x(r.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + T(r.opts.formatNoMatches, r.opts.element, r.search.val()) + "</li>")
            }, getMaxSearchWidth: function () {
                return this.selection.width() - c(this.search)
            }, resizeSearch: function () {
                var e, t, s, i, n, o = c(this.search);
                e = v(this.search) + 10, t = this.search.offset().left, s = this.selection.width(), i = this.selection.offset().left, n = s - (t - i) - o, e > n && (n = s - o), 40 > n && (n = s - o), 0 >= n && (n = e), this.search.width(Math.floor(n))
            }, getVal: function () {
                var e;
                return this.select ? (e = this.select.val(), null === e ? [] : e) : (e = this.opts.element.val(), r(e, this.opts.separator))
            }, setVal: function (t) {
                var s;
                this.select ? this.select.val(t) : (s = [], e(t).each(function () {
                    n(this, s) < 0 && s.push(this)
                }), this.opts.element.val(0 === s.length ? "" : s.join(this.opts.separator)))
            }, buildChangeDetails: function (e, t) {
                for (var t = t.slice(0), e = e.slice(0), s = 0; s < t.length; s++) for (var i = 0; i < e.length; i++) a(this.opts.id(t[s]), this.opts.id(e[i])) && (t.splice(s, 1), s > 0 && s--, e.splice(i, 1), i--);
                return {added: t, removed: e}
            }, val: function (s, i) {
                var n, o = this;
                if (0 === arguments.length) return this.getVal();
                if (n = this.data(), n.length || (n = []), !s && 0 !== s) return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), void(i && this.triggerChange({
                    added: this.data(),
                    removed: n
                }));
                if (this.setVal(s), this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), i && this.triggerChange(this.buildChangeDetails(n, this.data())); else {
                    if (this.opts.initSelection === t) throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function (t) {
                        var s = e.map(t, o.id);
                        o.setVal(s), o.updateSelection(t), o.clearSearch(), i && o.triggerChange(o.buildChangeDetails(n, o.data()))
                    })
                }
                this.clearSearch()
            }, onSortStart: function () {
                if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0), this.searchContainer.hide()
            }, onSortEnd: function () {
                var t = [], s = this;
                this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function () {
                    t.push(s.opts.id(e(this).data("select2-data")))
                }), this.setVal(t), this.triggerChange()
            }, data: function (t, s) {
                var i, n, o = this;
                return 0 === arguments.length ? this.selection.children(".select2-search-choice").map(function () {
                    return e(this).data("select2-data")
                }).get() : (n = this.data(), t || (t = []), i = e.map(t, function (e) {
                    return o.opts.id(e)
                }), this.setVal(i), this.updateSelection(t), this.clearSearch(), s && this.triggerChange(this.buildChangeDetails(n, this.data())), void 0)
            }
        }), e.fn.select2 = function () {
            var s, i, o, a, r, c = Array.prototype.slice.call(arguments, 0),
                l = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
                h = ["opened", "isFocused", "container", "dropdown"], u = ["val", "data"],
                d = {search: "externalSearch"};
            return this.each(function () {
                if (0 === c.length || "object" == typeof c[0]) s = 0 === c.length ? {} : e.extend({}, c[0]), s.element = e(this), "select" === s.element.get(0).tagName.toLowerCase() ? r = s.element.prop("multiple") : (r = s.multiple || !1, "tags" in s && (s.multiple = r = !0)), i = r ? new window.Select2["class"].multi : new window.Select2["class"].single, i.init(s); else {
                    if ("string" != typeof c[0]) throw"Invalid arguments to select2 plugin: " + c;
                    if (n(c[0], l) < 0) throw"Unknown method: " + c[0];
                    if (a = t, i = e(this).data("select2"), i === t) return;
                    if (o = c[0], "container" === o ? a = i.container : "dropdown" === o ? a = i.dropdown : (d[o] && (o = d[o]), a = i[o].apply(i, c.slice(1))), n(c[0], h) >= 0 || n(c[0], u) >= 0 && 1 == c.length) return !1
                }
            }), a === t ? this : a
        }, e.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function (e, t, s, i) {
                var n = [];
                return b(e.text, s.term, n, i), n.join("")
            },
            formatSelection: function (e, s, i) {
                return e ? i(e.text) : t
            },
            sortResults: function (e) {
                return e
            },
            formatResultCssClass: function (e) {
                return e.css
            },
            formatSelectionCssClass: function () {
                return t
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function (e) {
                return e == t ? null : e.id
            },
            matcher: function (e, t) {
                return i("" + t).toUpperCase().indexOf(i("" + e).toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: P,
            escapeMarkup: C,
            blurOnChange: !1,
            selectOnBlur: !1,
            adaptContainerCssClass: function (e) {
                return e
            },
            adaptDropdownCssClass: function () {
                return null
            },
            nextSearchTerm: function () {
                return t
            },
            searchInputPlaceholder: "",
            createSearchChoicePosition: "top",
            shouldFocusInput: function (e) {
                var t = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
                return t && e.opts.minimumResultsForSearch < 0 ? !1 : !0
            }
        }, e.fn.select2.locales = [], e.fn.select2.locales.en = {
            formatMatches: function (e) {
                return 1 === e ? "One result is available, press enter to select it." : e + " results are available, use up and down arrow keys to navigate."
            }, formatNoMatches: function () {
                return "\u6ca1\u6709\u627e\u5230\u5339\u914d\u9879"
            }, formatAjaxError: function () {
                return "Loading failed"
            }, formatInputTooShort: function (e, t) {
                var s = t - e.length;
                return "\u8bf7\u518d\u8f93\u5165" + s + "\u4e2a\u5b57\u7b26"
            }, formatInputTooLong: function (e, t) {
                var s = e.length - t;
                return "\u8bf7\u5220\u6389" + s + "\u4e2a\u5b57\u7b26"
            }, formatSelectionTooBig: function (e) {
                return "\u4f60\u53ea\u80fd\u9009\u62e9\u6700\u591a" + e + "\u9879"
            }, formatLoadMore: function () {
                return "\u52a0\u8f7d\u7ed3\u679c\u4e2d\u2026"
            }, formatSearching: function () {
                return "\u641c\u7d22\u4e2d\u2026"
            }
        }, e.extend(e.fn.select2.defaults, e.fn.select2.locales.en), e.fn.select2.ajaxDefaults = {
            transport: e.ajax,
            params: {type: "GET", cache: !1, dataType: "json"}
        }, window.Select2 = {
            query: {ajax: S, local: y, tags: E},
            util: {debounce: u, markMatch: b, escapeMarkup: C, stripDiacritics: i},
            "class": {"abstract": R, single: D, multi: H}
        }
    }
}(jQuery);
;!function (e) {
    "use strict";
    var t = function (t, c) {
        var a = c.val(), n = c.attr("id"), l = c.attr("class"), i = c.attr("style"), s = !!c[0].checked,
            d = e("<div></div>");
        c.replaceWith(d), n && d.attr("id", n), l && d.attr("class", l), d.addClass("bootstrap-checkbox"), i && d.attr("style", i), s && d.addClass("checked"), t.value = a, t.checked = s, t.element = d
    }, c = function (e, t) {
        e.removeClass("ambiguous"), e.removeClass("checked"), null === t ? (e.addClass("ambiguous"), e.html('<i class="icon-stop"></i>')) : t ? (e.addClass("checked"), e.html('<i class="icon-ok"></i>')) : e.html("")
    }, a = function (e, t) {
        t.on("click", function () {
            var t;
            t = e.checked ? !1 : e.checked === !1 && e.ambiguous === !0 ? null : !0, e.checked = t, c(e.element, t), e.element.trigger({
                type: "check",
                value: e.value,
                checked: t,
                element: e.element
            })
        })
    }, n = function (c, n) {
        t(this, c), a(this, this.element), n && n.label && a(this, e(n.label))
    };
    e.fn.extend({
        checkbox: function (t) {
            var c = e(this.map(function () {
                var c = e(this), a = c.data("checkbox");
                return a || (a = new n(c, t), a.element.data("checkbox", a)), a.element[0]
            }));
            return c.selector = this.selector, c
        }, chbxVal: function (t) {
            var c = e(this[0]), a = c.data("checkbox");
            return a ? "undefined" === e.type(t) ? a.value : (a.value = t, void c.data("checkbox", a)) : void 0
        }, chbxChecked: function (t) {
            var a = e(this[0]), n = a.data("checkbox");
            return n ? "undefined" === e.type(t) ? n.checked : (n.ambiguous = null === t, c(a, t), n.checked = t, a.data("checkbox", n), void 0) : void 0
        }
    })
}(jQuery);
;!function (t) {
    function e() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function i(e, i) {
        var a, s = t(e).data(), n = {}, o = new RegExp("^" + i.toLowerCase() + "([A-Z])"),
            i = new RegExp("^" + i.toLowerCase());
        for (var r in s) i.test(r) && (a = r.replace(o, function (t, e) {
            return e.toLowerCase()
        }), n[a] = s[r]);
        return n
    }

    function a(e) {
        var i = {};
        if (l[e] || (e = e.split("-")[0], l[e])) {
            var a = l[e];
            return t.each(d, function (t, e) {
                e in a && (i[e] = a[e])
            }), i
        }
    }

    var s = t(window), n = function (e, i) {
        this._process_options(i), this.element = t(e), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = t(c.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && (this.picker.addClass("datepicker-rtl"), this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function (t, e) {
            return parseInt(e) + 1
        }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
    };
    n.prototype = {
        constructor: n, _process_options: function (e) {
            this._o = t.extend({}, this._o, e);
            var i = this.o = t.extend({}, this._o), a = i.language;
            switch (l[a] || (a = a.split("-")[0], l[a] || (a = h.language)), i.language = a, i.startView) {
                case 2:
                case"decade":
                    i.startView = 2;
                    break;
                case 1:
                case"year":
                    i.startView = 1;
                    break;
                default:
                    i.startView = 0
            }
            switch (i.minViewMode) {
                case 1:
                case"months":
                    i.minViewMode = 1;
                    break;
                case 2:
                case"years":
                    i.minViewMode = 2;
                    break;
                default:
                    i.minViewMode = 0
            }
            i.startView = Math.max(i.startView, i.minViewMode), i.weekStart %= 7, i.weekEnd = (i.weekStart + 6) % 7;
            var s = c.parseFormat(i.format);
            i.startDate !== -1 / 0 && (i.startDate = i.startDate ? i.startDate instanceof Date ? this._local_to_utc(this._zero_time(i.startDate)) : c.parseDate(i.startDate, s, i.language) : -1 / 0), 1 / 0 !== i.endDate && (i.endDate = i.endDate ? i.endDate instanceof Date ? this._local_to_utc(this._zero_time(i.endDate)) : c.parseDate(i.endDate, s, i.language) : 1 / 0), i.daysOfWeekDisabled = i.daysOfWeekDisabled || [], t.isArray(i.daysOfWeekDisabled) || (i.daysOfWeekDisabled = i.daysOfWeekDisabled.split(/[,\s]*/)), i.daysOfWeekDisabled = t.map(i.daysOfWeekDisabled, function (t) {
                return parseInt(t, 10)
            });
            var n = String(i.orientation).toLowerCase().split(/\s+/g), o = i.orientation.toLowerCase();
            if (n = t.grep(n, function (t) {
                return /^auto|left|right|top|bottom$/.test(t)
            }), i.orientation = {x: "auto", y: "auto"}, o && "auto" !== o) if (1 === n.length) switch (n[0]) {
                case"top":
                case"bottom":
                    i.orientation.y = n[0];
                    break;
                case"left":
                case"right":
                    i.orientation.x = n[0]
            } else o = t.grep(n, function (t) {
                return /^left|right$/.test(t)
            }), i.orientation.x = o[0] || "auto", o = t.grep(n, function (t) {
                return /^top|bottom$/.test(t)
            }), i.orientation.y = o[0] || "auto"; else ;
        }, _events: [], _secondaryEvents: [], _applyEvents: function (t) {
            for (var e, i, a = 0; a < t.length; a++) e = t[a][0], i = t[a][1], e.on(i)
        }, _unapplyEvents: function (t) {
            for (var e, i, a = 0; a < t.length; a++) e = t[a][0], i = t[a][1], e.off(i)
        }, _buildEvents: function () {
            this.isInput ? this._events = [[this.element, {
                focus: t.proxy(this.show, this),
                keyup: t.proxy(this.update, this),
                keydown: t.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), {
                focus: t.proxy(this.show, this),
                keyup: t.proxy(this.update, this),
                keydown: t.proxy(this.keydown, this)
            }], [this.component, {click: t.proxy(this.show, this)}]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {click: t.proxy(this.show, this)}]], this._secondaryEvents = [[this.picker, {click: t.proxy(this.click, this)}], [t(window), {resize: t.proxy(this.place, this)}], [t(document), {
                mousedown: t.proxy(function (t) {
                    this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide()
                }, this)
            }]]
        }, _attachEvents: function () {
            this._detachEvents(), this._applyEvents(this._events)
        }, _detachEvents: function () {
            this._unapplyEvents(this._events)
        }, _attachSecondaryEvents: function () {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
        }, _detachSecondaryEvents: function () {
            this._unapplyEvents(this._secondaryEvents)
        }, _trigger: function (e, i) {
            var a = i || this.date, s = this._utc_to_local(a);
            this.element.trigger({
                type: e, date: s, format: t.proxy(function (t) {
                    var e = t || this.o.format;
                    return c.formatDate(a, e, this.o.language)
                }, this)
            })
        }, show: function (t) {
            this.isInline || this.picker.appendTo("body"), this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), this._attachSecondaryEvents(), t && t.preventDefault(), this._trigger("show")
        }, hide: function () {
            this.isInline || this.picker.is(":visible") && (this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"))
        }, remove: function () {
            this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
        }, _utc_to_local: function (t) {
            return new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
        }, _local_to_utc: function (t) {
            return new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
        }, _zero_time: function (t) {
            return new Date(t.getFullYear(), t.getMonth(), t.getDate())
        }, _zero_utc_time: function (t) {
            return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
        }, getDate: function () {
            return this._utc_to_local(this.getUTCDate())
        }, getUTCDate: function () {
            return this.date
        }, setDate: function (t) {
            this.setUTCDate(this._local_to_utc(t))
        }, setUTCDate: function (t) {
            this.date = t, this.setValue()
        }, setValue: function () {
            var t = this.getFormattedDate();
            this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change()
        }, getFormattedDate: function (t) {
            return void 0 === t && (t = this.o.format), c.formatDate(this.date, t, this.o.language)
        }, setStartDate: function (t) {
            this._process_options({startDate: t}), this.update(), this.updateNavArrows()
        }, setEndDate: function (t) {
            this._process_options({endDate: t}), this.update(), this.updateNavArrows()
        }, setDaysOfWeekDisabled: function (t) {
            this._process_options({daysOfWeekDisabled: t}), this.update(), this.updateNavArrows()
        }, place: function () {
            if (!this.isInline) {
                var e = this.picker.outerWidth(), i = this.picker.outerHeight(), a = 10, n = s.width(), o = s.height(),
                    r = s.scrollTop(), h = Math.max.apply(null, t.map(t("body > *"), function (e) {
                        return "absolute" == t(e).css("position") || "fixed" == t(e).css("position") ? parseInt(t(e).css("z-index")) : 1
                    })) + 10, d = this.component ? this.component.parent().offset() : this.element.offset(),
                    l = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                    c = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1), p = d.left,
                    u = d.top;
                this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (p -= e - c)) : (this.picker.addClass("datepicker-orient-left"), d.left < 0 ? p -= d.left - a : d.left + e > n && (p = n - e - a));
                var f, g, v = this.o.orientation.y;
                "auto" === v && (f = -r + d.top - i, g = r + o - (d.top + l + i), v = Math.max(f, g) === g ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + v), "top" === v ? u += l : u -= i + parseInt(this.picker.css("padding-top")), this.picker.css({
                    top: u,
                    left: p,
                    zIndex: h
                })
            }
        }, _allow_update: !0, update: function () {
            if (this._allow_update) {
                var t, e = new Date(this.date), i = !1;
                arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0] instanceof Date) ? (t = arguments[0], t instanceof Date && (t = this._local_to_utc(t)), i = !0) : (t = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), delete this.element.data().date), this.date = c.parseDate(t, this.o.format, this.o.language), i ? this.setValue() : t ? e.getTime() !== this.date.getTime() && this._trigger("changeDate") : this._trigger("clearDate"), this.date < this.o.startDate ? (this.viewDate = new Date(this.o.startDate), this.date = new Date(this.o.startDate)) : this.date > this.o.endDate ? (this.viewDate = new Date(this.o.endDate), this.date = new Date(this.o.endDate)) : (this.viewDate = new Date(this.date), this.date = new Date(this.date)), this.fill()
            }
        }, fillDow: function () {
            var t = this.o.weekStart, e = "<tr>";
            if (this.o.calendarWeeks) {
                var i = '<th class="cw">&nbsp;</th>';
                e += i, this.picker.find(".datepicker-days thead tr:first-child").prepend(i)
            }
            for (; t < this.o.weekStart + 7;) e += '<th class="dow">' + l[this.o.language].daysMin[t++ % 7] + "</th>";
            e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
        }, fillMonths: function () {
            for (var t = "", e = 0; 12 > e;) t += '<span class="month">' + l[this.o.language].monthsShort[e++] + "</span>";
            this.picker.find(".datepicker-months td").html(t)
        }, setRange: function (e) {
            e && e.length ? this.range = t.map(e, function (t) {
                return t.valueOf()
            }) : delete this.range, this.fill()
        }, getClassNames: function (e) {
            var i = [], a = this.viewDate.getUTCFullYear(), s = this.viewDate.getUTCMonth(), n = this.date.valueOf(),
                o = new Date;
            return e.getUTCFullYear() < a || e.getUTCFullYear() == a && e.getUTCMonth() < s ? i.push("old") : (e.getUTCFullYear() > a || e.getUTCFullYear() == a && e.getUTCMonth() > s) && i.push("new"), this.o.todayHighlight && e.getUTCFullYear() == o.getFullYear() && e.getUTCMonth() == o.getMonth() && e.getUTCDate() == o.getDate() && i.push("today"), n && e.valueOf() == n && i.push("active"), (e.valueOf() < this.o.startDate || e.valueOf() > this.o.endDate || -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled)) && i.push("disabled"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), -1 != t.inArray(e.valueOf(), this.range) && i.push("selected")), i
        }, fill: function () {
            {
                var i, a = new Date(this.viewDate), s = a.getUTCFullYear(), n = a.getUTCMonth(),
                    o = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                    r = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                    h = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1 / 0,
                    d = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1 / 0;
                this.date && this.date.valueOf()
            }
            this.picker.find(".datepicker-days thead th.datepicker-switch").text(l[this.o.language].months[n] + " " + s), this.picker.find("tfoot th.today").text(l[this.o.language].today).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot th.clear").text(l[this.o.language].clear).toggle(this.o.clearBtn !== !1), this.updateNavArrows(), this.fillMonths();
            var p = e(s, n - 1, 28, 0, 0, 0, 0), u = c.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
            p.setUTCDate(u), p.setUTCDate(u - (p.getUTCDay() - this.o.weekStart + 7) % 7);
            var f = new Date(p);
            f.setUTCDate(f.getUTCDate() + 42), f = f.valueOf();
            for (var g, v = []; p.valueOf() < f;) {
                if (p.getUTCDay() == this.o.weekStart && (v.push("<tr>"), this.o.calendarWeeks)) {
                    var D = new Date(+p + (this.o.weekStart - p.getUTCDay() - 7) % 7 * 864e5),
                        m = new Date(+D + (11 - D.getUTCDay()) % 7 * 864e5),
                        y = new Date(+(y = e(m.getUTCFullYear(), 0, 1)) + (11 - y.getUTCDay()) % 7 * 864e5),
                        w = (m - y) / 864e5 / 7 + 1;
                    v.push('<td class="cw">' + w + "</td>")
                }
                if (g = this.getClassNames(p), g.push("day"), this.o.beforeShowDay !== t.noop) {
                    var k = this.o.beforeShowDay(this._utc_to_local(p));
                    void 0 === k ? k = {} : "boolean" == typeof k ? k = {enabled: k} : "string" == typeof k && (k = {classes: k}), k.enabled === !1 && g.push("disabled"), k.classes && (g = g.concat(k.classes.split(/\s+/))), k.tooltip && (i = k.tooltip)
                }
                g = t.unique(g), v.push('<td class="' + g.join(" ") + '"' + (i ? ' title="' + i + '"' : "") + ">" + p.getUTCDate() + "</td>"), p.getUTCDay() == this.o.weekEnd && v.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1)
            }
            this.picker.find(".datepicker-days tbody").empty().append(v.join(""));
            var C = this.date && this.date.getUTCFullYear(),
                T = this.picker.find(".datepicker-months").find("th:eq(1)").text(s).end().find("span").removeClass("active");
            C && C == s && T.eq(this.date.getUTCMonth()).addClass("active"), (o > s || s > h) && T.addClass("disabled"), s == o && T.slice(0, r).addClass("disabled"), s == h && T.slice(d + 1).addClass("disabled"), v = "", s = 10 * parseInt(s / 10, 10);
            var _ = this.picker.find(".datepicker-years").find("th:eq(1)").text(s + "-" + (s + 9)).end().find("td");
            s -= 1;
            for (var M = -1; 11 > M; M++) v += '<span class="year' + (-1 == M ? " old" : 10 == M ? " new" : "") + (C == s ? " active" : "") + (o > s || s > h ? " disabled" : "") + '">' + s + "</span>", s += 1;
            _.html(v)
        }, updateNavArrows: function () {
            if (this._allow_update) {
                var t = new Date(this.viewDate), e = t.getUTCFullYear(), i = t.getUTCMonth();
                switch (this.viewMode) {
                    case 0:
                        this.picker.find(".prev").css(this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(1 / 0 !== this.o.endDate && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? {visibility: "hidden"} : {visibility: "visible"});
                        break;
                    case 1:
                    case 2:
                        this.picker.find(".prev").css(this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() ? {visibility: "hidden"} : {visibility: "visible"}), this.picker.find(".next").css(1 / 0 !== this.o.endDate && e >= this.o.endDate.getUTCFullYear() ? {visibility: "hidden"} : {visibility: "visible"})
                }
            }
        }, click: function (i) {
            i.preventDefault();
            var a = t(i.target).closest("span, td, th");
            if (1 == a.length) switch (a[0].nodeName.toLowerCase()) {
                case"th":
                    switch (a[0].className) {
                        case"datepicker-switch":
                            this.showMode(1);
                            break;
                        case"prev":
                        case"next":
                            var s = c.modes[this.viewMode].navStep * ("prev" == a[0].className ? -1 : 1);
                            switch (this.viewMode) {
                                case 0:
                                    this.viewDate = this.moveMonth(this.viewDate, s), this._trigger("changeMonth", this.viewDate);
                                    break;
                                case 1:
                                case 2:
                                    this.viewDate = this.moveYear(this.viewDate, s), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                            }
                            this.fill();
                            break;
                        case"today":
                            var n = new Date;
                            n = e(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0), this.showMode(-2);
                            var o = "linked" == this.o.todayBtn ? null : "view";
                            this._setDate(n, o);
                            break;
                        case"clear":
                            var r;
                            this.isInput ? r = this.element : this.component && (r = this.element.find("input")), r && r.val("").change(), this._trigger("changeDate"), this.update(), this.o.autoclose && this.hide()
                    }
                    break;
                case"span":
                    if (!a.is(".disabled")) {
                        if (this.viewDate.setUTCDate(1), a.is(".month")) {
                            var h = 1, d = a.parent().find("span").index(a), l = this.viewDate.getUTCFullYear();
                            this.viewDate.setUTCMonth(d), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(e(l, d, h, 0, 0, 0, 0))
                        } else {
                            var l = parseInt(a.text(), 10) || 0, h = 1, d = 0;
                            this.viewDate.setUTCFullYear(l), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(e(l, d, h, 0, 0, 0, 0))
                        }
                        this.showMode(-1), this.fill()
                    }
                    break;
                case"td":
                    if (a.is(".day") && !a.is(".disabled")) {
                        var h = parseInt(a.text(), 10) || 1, l = this.viewDate.getUTCFullYear(),
                            d = this.viewDate.getUTCMonth();
                        a.is(".old") ? 0 === d ? (d = 11, l -= 1) : d -= 1 : a.is(".new") && (11 == d ? (d = 0, l += 1) : d += 1), this._setDate(e(l, d, h, 0, 0, 0, 0))
                    }
            }
        }, _setDate: function (t, e) {
            e && "date" != e || (this.date = new Date(t)), e && "view" != e || (this.viewDate = new Date(t)), this.fill(), this.setValue(), this._trigger("changeDate");
            var i;
            this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && i.change(), !this.o.autoclose || e && "date" != e || this.hide()
        }, moveMonth: function (t, e) {
            if (!e) return t;
            var i, a, s = new Date(t.valueOf()), n = s.getUTCDate(), o = s.getUTCMonth(), r = Math.abs(e);
            if (e = e > 0 ? 1 : -1, 1 == r) a = -1 == e ? function () {
                return s.getUTCMonth() == o
            } : function () {
                return s.getUTCMonth() != i
            }, i = o + e, s.setUTCMonth(i), (0 > i || i > 11) && (i = (i + 12) % 12); else {
                for (var h = 0; r > h; h++) s = this.moveMonth(s, e);
                i = s.getUTCMonth(), s.setUTCDate(n), a = function () {
                    return i != s.getUTCMonth()
                }
            }
            for (; a();) s.setUTCDate(--n), s.setUTCMonth(i);
            return s
        }, moveYear: function (t, e) {
            return this.moveMonth(t, 12 * e)
        }, dateWithinRange: function (t) {
            return t >= this.o.startDate && t <= this.o.endDate
        }, keydown: function (t) {
            if (this.picker.is(":not(:visible)")) return void(27 == t.keyCode && this.show());
            var e, i, a, s = !1;
            switch (t.keyCode) {
                case 27:
                    this.hide(), t.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.o.keyboardNavigation) break;
                    e = 37 == t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.date, e), a = this.moveYear(this.viewDate, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.date, e), a = this.moveMonth(this.viewDate, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.date), i.setUTCDate(this.date.getUTCDate() + e), a = new Date(this.viewDate), a.setUTCDate(this.viewDate.getUTCDate() + e)), this.dateWithinRange(i) && (this.date = i, this.viewDate = a, this.setValue(), this.update(), t.preventDefault(), s = !0);
                    break;
                case 38:
                case 40:
                    if (!this.o.keyboardNavigation) break;
                    e = 38 == t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.date, e), a = this.moveYear(this.viewDate, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.date, e), a = this.moveMonth(this.viewDate, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.date), i.setUTCDate(this.date.getUTCDate() + 7 * e), a = new Date(this.viewDate), a.setUTCDate(this.viewDate.getUTCDate() + 7 * e)), this.dateWithinRange(i) && (this.date = i, this.viewDate = a, this.setValue(), this.update(), t.preventDefault(), s = !0);
                    break;
                case 13:
                    this.hide(), t.preventDefault();
                    break;
                case 9:
                    this.hide()
            }
            if (s) {
                this._trigger("changeDate");
                var n;
                this.isInput ? n = this.element : this.component && (n = this.element.find("input")), n && n.change()
            }
        }, showMode: function (t) {
            t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))), this.picker.find(">div").hide().filter(".datepicker-" + c.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }
    };
    var o = function (e, i) {
        this.element = t(e), this.inputs = t.map(i.inputs, function (t) {
            return t.jquery ? t[0] : t
        }), delete i.inputs, t(this.inputs).datepicker(i).bind("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function (e) {
            return t(e).data("datepicker")
        }), this.updateDates()
    };
    o.prototype = {
        updateDates: function () {
            this.dates = t.map(this.pickers, function (t) {
                return t.date
            }), this.updateRanges()
        }, updateRanges: function () {
            var e = t.map(this.dates, function (t) {
                return t.valueOf()
            });
            t.each(this.pickers, function (t, i) {
                i.setRange(e)
            })
        }, dateUpdated: function (e) {
            var i = t(e.target).data("datepicker"), a = i.getUTCDate(), s = t.inArray(e.target, this.inputs),
                n = this.inputs.length;
            if (-1 != s) {
                if (a < this.dates[s]) for (; s >= 0 && a < this.dates[s];) this.pickers[s--].setUTCDate(a); else if (a > this.dates[s]) for (; n > s && a > this.dates[s];) this.pickers[s++].setUTCDate(a);
                this.updateDates()
            }
        }, remove: function () {
            t.map(this.pickers, function (t) {
                t.remove()
            }), delete this.element.data().datepicker
        }
    };
    var r = t.fn.datepicker;
    t.fn.datepicker = function (e) {
        var s = Array.apply(null, arguments);
        s.shift();
        var r;
        return this.each(function () {
            var d = t(this), l = d.data("datepicker"), c = "object" == typeof e && e;
            if (!l) {
                var p = i(this, "date"), u = t.extend({}, h, p, c), f = a(u.language), g = t.extend({}, h, f, p, c);
                if (d.is(".input-daterange") || g.inputs) {
                    var v = {inputs: g.inputs || d.find("input").toArray()};
                    d.data("datepicker", l = new o(this, t.extend(g, v)))
                } else d.data("datepicker", l = new n(this, g))
            }
            return "string" == typeof e && "function" == typeof l[e] && (r = l[e].apply(l, s), void 0 !== r) ? !1 : void 0
        }), void 0 !== r ? r : this
    };
    var h = t.fn.datepicker.defaults = {
        autoclose: !1,
        beforeShowDay: t.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        daysOfWeekDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "zh-CN",
        minViewMode: 0,
        orientation: "auto",
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        weekStart: 0
    }, d = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    t.fn.datepicker.Constructor = n;
    var l = t.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear"
        },
        "zh-CN": {
            days: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d", "\u661f\u671f\u65e5"],
            daysShort: ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d", "\u5468\u65e5"],
            daysMin: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u65e5"],
            months: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
            monthsShort: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
            today: "\u4eca\u65e5",
            format: "yyyy-mm-dd"
        }
    }, c = {
        modes: [{clsName: "days", navFnc: "Month", navStep: 1}, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {clsName: "years", navFnc: "FullYear", navStep: 10}],
        isLeapYear: function (t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        },
        getDaysInMonth: function (t, e) {
            return [31, c.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function (t) {
            var e = t.replace(this.validParts, "\x00").split("\x00"), i = t.match(this.validParts);
            if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
            return {separators: e, parts: i}
        },
        parseDate: function (i, a, s) {
            if (i instanceof Date) return i;
            if ("string" == typeof a && (a = c.parseFormat(a)), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(i)) {
                var o, r, h = /([\-+]\d+)([dmwy])/, d = i.match(/([\-+]\d+)([dmwy])/g);
                i = new Date;
                for (var p = 0; p < d.length; p++) switch (o = h.exec(d[p]), r = parseInt(o[1]), o[2]) {
                    case"d":
                        i.setUTCDate(i.getUTCDate() + r);
                        break;
                    case"m":
                        i = n.prototype.moveMonth.call(n.prototype, i, r);
                        break;
                    case"w":
                        i.setUTCDate(i.getUTCDate() + 7 * r);
                        break;
                    case"y":
                        i = n.prototype.moveYear.call(n.prototype, i, r)
                }
                return e(i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate(), 0, 0, 0)
            }
            var u, f, o, d = i && i.match(this.nonpunctuation) || [], i = new Date, g = {},
                v = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], D = {
                    yyyy: function (t, e) {
                        return t.setUTCFullYear(e)
                    }, yy: function (t, e) {
                        return t.setUTCFullYear(2e3 + e)
                    }, m: function (t, e) {
                        if (isNaN(t)) return t;
                        for (e -= 1; 0 > e;) e += 12;
                        for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() != e;) t.setUTCDate(t.getUTCDate() - 1);
                        return t
                    }, d: function (t, e) {
                        return t.setUTCDate(e)
                    }
                };
            D.M = D.MM = D.mm = D.m, D.dd = D.d, i = e(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0);
            var m = a.parts.slice();
            if (d.length != m.length && (m = t(m).filter(function (e, i) {
                return -1 !== t.inArray(i, v)
            }).toArray()), d.length == m.length) {
                for (var p = 0, y = m.length; y > p; p++) {
                    if (u = parseInt(d[p], 10), o = m[p], isNaN(u)) switch (o) {
                        case"MM":
                            f = t(l[s].months).filter(function () {
                                var t = this.slice(0, d[p].length), e = d[p].slice(0, t.length);
                                return t == e
                            }), u = t.inArray(f[0], l[s].months) + 1;
                            break;
                        case"M":
                            f = t(l[s].monthsShort).filter(function () {
                                var t = this.slice(0, d[p].length), e = d[p].slice(0, t.length);
                                return t == e
                            }), u = t.inArray(f[0], l[s].monthsShort) + 1
                    }
                    g[o] = u
                }
                for (var w, k, p = 0; p < v.length; p++) k = v[p], k in g && !isNaN(g[k]) && (w = new Date(i), D[k](w, g[k]), isNaN(w) || (i = w))
            }
            return i
        },
        formatDate: function (e, i, a) {
            "string" == typeof i && (i = c.parseFormat(i));
            var s = {
                d: e.getUTCDate(),
                D: l[a].daysShort[e.getUTCDay()],
                DD: l[a].days[e.getUTCDay()],
                m: e.getUTCMonth() + 1,
                M: l[a].monthsShort[e.getUTCMonth()],
                MM: l[a].months[e.getUTCMonth()],
                yy: e.getUTCFullYear().toString().substring(2),
                yyyy: e.getUTCFullYear()
            };
            s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m;
            for (var e = [], n = t.extend([], i.separators), o = 0, r = i.parts.length; r >= o; o++) n.length && e.push(n.shift()), e.push(s[i.parts[o]]);
            return e.join("")
        },
        headTemplate: '<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    c.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + c.headTemplate + "<tbody></tbody>" + c.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + c.headTemplate + c.contTemplate + c.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + c.headTemplate + c.contTemplate + c.footTemplate + "</table></div></div>", t.fn.datepicker.DPGlobal = c, t.fn.datepicker.noConflict = function () {
        return t.fn.datepicker = r, this
    }, t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (e) {
        var i = t(this);
        i.data("datepicker") || (e.preventDefault(), i.datepicker("show"))
    }), t(function () {
        t('[data-provide="datepicker-inline"]').datepicker()
    })
}(window.jQuery);
;!function (e, t, r, a) {
    function o(e) {
        for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
            var o = e[t];
            o && a.push(o)
        }
        return a
    }

    function n(e) {
        var t = m.data(e, c);
        return null === t ? a : t
    }

    function i(e) {
        return function (t) {
            return Math.round(t * e) * (1 / e)
        }
    }

    function l(e, t) {
        var r = e;
        return h.isString(e) ? y.Easings[e] || (r = !1) : r = h.isArray(e) && 1 === e.length ? i.apply(null, e) : h.isArray(e) && 2 === e.length ? S.apply(null, e.concat([t])) : h.isArray(e) && 4 === e.length ? v.apply(null, e) : !1, r === !1 && (r = y.Easings[y.defaults.easing] ? y.defaults.easing : g), r
    }

    function s(e) {
        if (e) for (var t = (new Date).getTime(), r = 0, o = y.State.calls.length; o > r; r++) if (y.State.calls[r]) {
            var i = y.State.calls[r], l = i[0], c = i[2], p = i[3];
            p || (p = y.State.calls[r][3] = t - 16);
            for (var g = Math.min((t - p) / c.duration, 1), d = 0, m = l.length; m > d; d++) {
                var v = l[d], S = v.element;
                if (n(S)) {
                    var b = !1;
                    null !== c.display && "none" !== c.display && x.setPropertyValue(S, "display", c.display);
                    for (var V in v) if ("element" !== V) {
                        var P, w = v[V], k = h.isString(w.easing) ? y.Easings[w.easing] : w.easing;
                        if (P = 1 === g ? w.endValue : w.startValue + (w.endValue - w.startValue) * k(g), w.currentValue = P, x.Hooks.registered[V]) {
                            var C = x.Hooks.getRoot(V), T = n(S).rootPropertyValueCache[C];
                            T && (w.rootPropertyValue = T)
                        }
                        var A = x.setPropertyValue(S, V, w.currentValue + (0 === parseFloat(P) ? "" : w.unitType), w.rootPropertyValue, w.scrollData);
                        x.Hooks.registered[V] && (n(S).rootPropertyValueCache[C] = x.Normalizations.registered[C] ? x.Normalizations.registered[C]("extract", null, A[1]) : A[1]), "transform" === A[0] && (b = !0)
                    }
                    c.mobileHA && n(S).transformCache.translate3d === a && (n(S).transformCache.translate3d = "(0px, 0px, 0px)", b = !0), b && x.flushTransformCache(S)
                }
            }
            null !== c.display && "none" !== c.display && (y.State.calls[r][2].display = !1), c.progress && c.progress.call(i[1], i[1], g, Math.max(0, p + c.duration - t), p), 1 === g && u(r)
        }
        y.State.isTicking && f(s)
    }

    function u(e, t) {
        if (!y.State.calls[e]) return !1;
        for (var r = y.State.calls[e][0], o = y.State.calls[e][1], i = y.State.calls[e][2], l = y.State.calls[e][4], s = !1, u = 0, c = r.length; c > u; u++) {
            var p = r[u].element;
            if (t || "none" !== i.display || i.loop || x.setPropertyValue(p, "display", i.display), (m.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test(m.queue(p)[1])) && n(p)) {
                n(p).isAnimating = !1, n(p).rootPropertyValueCache = {};
                var g, d = ["transformPerspective", "translateZ", "rotateX", "rotateY"], f = !1;
                for (var h in d) g = d[h], /^\(0[^.]/.test(n(p).transformCache[g]) && (f = !0, delete n(p).transformCache[g]);
                i.mobileHA && (f = !0, delete n(p).transformCache.translate3d), f && x.flushTransformCache(p)
            }
            t || !i.complete || i.loop || u !== c - 1 || i.complete.call(o, o), l && l(o), i.queue !== !1 && m.dequeue(p, i.queue)
        }
        y.State.calls[e] = !1;
        for (var v = 0, S = y.State.calls.length; S > v; v++) if (y.State.calls[v] !== !1) {
            s = !0;
            break
        }
        s === !1 && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = [])
    }

    var c = "velocity", p = 400, g = "swing", d = function () {
        if (r.documentMode) return r.documentMode;
        for (var e = 7; e > 4; e--) {
            var t = r.createElement("div");
            if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
        }
        return a
    }(), f = t.requestAnimationFrame || function () {
        var e = 0;
        return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
            var r, a = (new Date).getTime();
            return r = Math.max(0, 16 - (a - e)), e = a + r, setTimeout(function () {
                t(a + r)
            }, r)
        }
    }(), h = {
        isString: function (e) {
            return "string" == typeof e
        }, isArray: Array.isArray || function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, isFunction: function (e) {
            return "[object Function]" === Object.prototype.toString.call(e)
        }, isNode: function (e) {
            return e && e.nodeType
        }, isNodeList: function (e) {
            return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
        }, isWrapped: function (e) {
            return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
        }, isSVG: function (e) {
            return t.SVGElement && e instanceof SVGElement
        }
    }, m = t.jQuery || e.Velocity && e.Velocity.Utilities;
    if (!m) throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.");
    if (e.Velocity !== a && !e.Velocity.Utilities) throw new Error("Velocity: Namespace is occupied.");
    if (7 >= d) {
        if (t.jQuery) return void(t.jQuery.fn.velocity = t.jQuery.fn.animate);
        throw new Error("Velocity: For IE<=7, Velocity falls back to jQuery, which must first be loaded.")
    }
    if (8 === d && !t.jQuery) throw new Error("Velocity: For IE8, Velocity requires jQuery to be loaded. (Velocity's jQuery shim does not work with IE8.)");
    var y = e.Velocity = e.velocity = {
        State: {
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isAndroid: /Android/i.test(navigator.userAgent),
            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
            isChrome: t.chrome,
            prefixElement: r.createElement("div"),
            prefixMatches: {},
            scrollAnchor: null,
            scrollPropertyLeft: null,
            scrollPropertyTop: null,
            isTicking: !1,
            calls: []
        },
        CSS: {},
        Utilities: t.jQuery,
        Sequences: {},
        Easings: {},
        Promise: t.Promise,
        defaults: {
            queue: "",
            duration: p,
            easing: g,
            begin: null,
            complete: null,
            progress: null,
            display: null,
            loop: !1,
            delay: !1,
            mobileHA: !0,
            _cacheValues: !0
        },
        animate: function () {
        },
        mock: !1,
        version: {major: 0, minor: 5, patch: 1},
        debug: !1
    };
    t.pageYOffset !== a ? (y.State.scrollAnchor = t, y.State.scrollPropertyLeft = "pageXOffset", y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop");
    var v = function () {
        function e(e, t) {
            return 1 - 3 * t + 3 * e
        }

        function t(e, t) {
            return 3 * t - 6 * e
        }

        function r(e) {
            return 3 * e
        }

        function a(a, o, n) {
            return ((e(o, n) * a + t(o, n)) * a + r(o)) * a
        }

        function o(a, o, n) {
            return 3 * e(o, n) * a * a + 2 * t(o, n) * a + r(o)
        }

        return function (e, t, r, n) {
            function i(t) {
                for (var n = t, i = 0; 8 > i; ++i) {
                    var l = o(n, e, r);
                    if (0 === l) return n;
                    var s = a(n, e, r) - t;
                    n -= s / l
                }
                return n
            }

            if (4 !== arguments.length) return !1;
            for (var l = 0; 4 > l; ++l) if ("number" != typeof arguments[l] || isNaN(arguments[l]) || !isFinite(arguments[l])) return !1;
            return e = Math.min(e, 1), r = Math.min(r, 1), e = Math.max(e, 0), r = Math.max(r, 0), function (o) {
                return e === t && r === n ? o : a(i(o), t, n)
            }
        }
    }(), S = function () {
        function e(e) {
            return -e.tension * e.x - e.friction * e.v
        }

        function t(t, r, a) {
            var o = {x: t.x + a.dx * r, v: t.v + a.dv * r, tension: t.tension, friction: t.friction};
            return {dx: o.v, dv: e(o)}
        }

        function r(r, a) {
            var o = {dx: r.v, dv: e(r)}, n = t(r, .5 * a, o), i = t(r, .5 * a, n), l = t(r, a, i),
                s = 1 / 6 * (o.dx + 2 * (n.dx + i.dx) + l.dx), u = 1 / 6 * (o.dv + 2 * (n.dv + i.dv) + l.dv);
            return r.x = r.x + s * a, r.v = r.v + u * a, r
        }

        return function a(e, t, o) {
            var n, i, l, s = {x: -1, v: 0, tension: null, friction: null}, u = [0], c = 0, p = 1e-4, g = .016;
            for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, o = o || null, s.tension = e, s.friction = t, n = null !== o, n ? (c = a(e, t), i = c / o * g) : i = g; ;) if (l = r(l || s, i), u.push(1 + l.x), c += 16, !(Math.abs(l.x) > p && Math.abs(l.v) > p)) break;
            return n ? function (e) {
                return u[e * (u.length - 1) | 0]
            } : c
        }
    }();
    !function () {
        y.Easings.linear = function (e) {
            return e
        }, y.Easings.swing = function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }, y.Easings.spring = function (e) {
            return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
        }, y.Easings.ease = v(.25, .1, .25, 1), y.Easings["ease-in"] = v(.42, 0, 1, 1), y.Easings["ease-out"] = v(0, 0, .58, 1), y.Easings["ease-in-out"] = v(.42, 0, .58, 1);
        var e = {};
        m.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, r) {
            e[r] = function (e) {
                return Math.pow(e, t + 2)
            }
        }), m.extend(e, {
            Sine: function (e) {
                return 1 - Math.cos(e * Math.PI / 2)
            }, Circ: function (e) {
                return 1 - Math.sqrt(1 - e * e)
            }, Elastic: function (e) {
                return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
            }, Back: function (e) {
                return e * e * (3 * e - 2)
            }, Bounce: function (e) {
                for (var t, r = 4; e < ((t = Math.pow(2, --r)) - 1) / 11;) ;
                return 1 / Math.pow(4, 3 - r) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
            }
        }), m.each(e, function (e, t) {
            y.Easings["easeIn" + e] = t, y.Easings["easeOut" + e] = function (e) {
                return 1 - t(1 - e)
            }, y.Easings["easeInOut" + e] = function (e) {
                return .5 > e ? t(2 * e) / 2 : 1 - t(-2 * e + 2) / 2
            }
        })
    }();
    var x = y.CSS = {
        RegEx: {
            valueUnwrap: /^[A-z]+\((.*)\)$/i,
            wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
            valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
        },
        Hooks: {
            templates: {
                color: ["Red Green Blue Alpha", "255 255 255 1"],
                backgroundColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderTopColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderRightColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderBottomColor: ["Red Green Blue Alpha", "255 255 255 1"],
                borderLeftColor: ["Red Green Blue Alpha", "255 255 255 1"],
                outlineColor: ["Red Green Blue Alpha", "255 255 255 1"],
                fill: ["Red Green Blue Alpha", "255 255 255 1"],
                stroke: ["Red Green Blue Alpha", "255 255 255 1"],
                stopColor: ["Red Green Blue Alpha", "255 255 255 1"],
                textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                backgroundPosition: ["X Y", "0% 0%"],
                transformOrigin: ["X Y Z", "50% 50% 0px"],
                perspectiveOrigin: ["X Y", "50% 50%"]
            }, registered: {}, register: function () {
                var e, t, r;
                if (d) for (e in x.Hooks.templates) {
                    t = x.Hooks.templates[e], r = t[0].split(" ");
                    var a = t[1].match(x.RegEx.valueSplit);
                    "Color" === r[0] && (r.push(r.shift()), a.push(a.shift()), x.Hooks.templates[e] = [r.join(" "), a.join(" ")])
                }
                for (e in x.Hooks.templates) {
                    t = x.Hooks.templates[e], r = t[0].split(" ");
                    for (var o in r) {
                        var n = e + r[o], i = o;
                        x.Hooks.registered[n] = [e, i]
                    }
                }
            }, getRoot: function (e) {
                var t = x.Hooks.registered[e];
                return t ? t[0] : e
            }, cleanRootPropertyValue: function (e, t) {
                return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.Hooks.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]), t
            }, extractValue: function (e, t) {
                var r = x.Hooks.registered[e];
                if (r) {
                    var a = r[0], o = r[1];
                    return t = x.Hooks.cleanRootPropertyValue(a, t), t.toString().match(x.RegEx.valueSplit)[o]
                }
                return t
            }, injectValue: function (e, t, r) {
                var a = x.Hooks.registered[e];
                if (a) {
                    var o, n, i = a[0], l = a[1];
                    return r = x.Hooks.cleanRootPropertyValue(i, r), o = r.toString().match(x.RegEx.valueSplit), o[l] = t, n = o.join(" ")
                }
                return r
            }
        },
        Normalizations: {
            registered: {
                clip: function (e, t, r) {
                    switch (e) {
                        case"name":
                            return "clip";
                        case"extract":
                            var a;
                            return x.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(x.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;
                        case"inject":
                            return "rect(" + r + ")"
                    }
                }, opacity: function (e, t, r) {
                    if (8 >= d) switch (e) {
                        case"name":
                            return "filter";
                        case"extract":
                            var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                            return r = a ? a[1] / 100 : 1;
                        case"inject":
                            return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
                    } else switch (e) {
                        case"name":
                            return "opacity";
                        case"extract":
                            return r;
                        case"inject":
                            return r
                    }
                }
            }, register: function () {
                function e(e) {
                    var t, r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return e = e.replace(r, function (e, t, r, a) {
                        return t + t + r + r + a + a
                    }), t = a.exec(e), t ? "rgb(" + (parseInt(t[1], 16) + " " + parseInt(t[2], 16) + " " + parseInt(t[3], 16)) + ")" : "rgb(0 0 0)"
                }

                var t = ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"];
                9 >= d || y.State.isGingerbread || (t = t.concat(["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]));
                for (var r = 0, o = t.length; o > r; r++) !function () {
                    var e = t[r];
                    x.Normalizations.registered[e] = function (t, r, o) {
                        switch (t) {
                            case"name":
                                return "transform";
                            case"extract":
                                return n(r).transformCache[e] === a ? /^scale/i.test(e) ? 1 : 0 : n(r).transformCache[e].replace(/[()]/g, "");
                            case"inject":
                                var i = !1;
                                switch (e.substr(0, e.length - 1)) {
                                    case"translate":
                                        i = !/(%|px|em|rem|\d)$/i.test(o);
                                        break;
                                    case"scal":
                                    case"scale":
                                        y.State.isAndroid && n(r).transformCache[e] === a && (o = 1), i = !/(\d)$/i.test(o);
                                        break;
                                    case"skew":
                                        i = !/(deg|\d)$/i.test(o);
                                        break;
                                    case"rotate":
                                        i = !/(deg|\d)$/i.test(o)
                                }
                                return i || (n(r).transformCache[e] = "(" + o + ")"), n(r).transformCache[e]
                        }
                    }
                }();
                for (var i = ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], r = 0, l = i.length; l > r; r++) !function () {
                    var t = i[r];
                    x.Normalizations.registered[t] = function (r, o, n) {
                        switch (r) {
                            case"name":
                                return t;
                            case"extract":
                                var i;
                                if (x.RegEx.wrappedValueAlreadyExtracted.test(n)) i = n; else {
                                    var l, s = {
                                        aqua: "rgb(0, 255, 255);",
                                        black: "rgb(0, 0, 0)",
                                        blue: "rgb(0, 0, 255)",
                                        fuchsia: "rgb(255, 0, 255)",
                                        gray: "rgb(128, 128, 128)",
                                        green: "rgb(0, 128, 0)",
                                        lime: "rgb(0, 255, 0)",
                                        maroon: "rgb(128, 0, 0)",
                                        navy: "rgb(0, 0, 128)",
                                        olive: "rgb(128, 128, 0)",
                                        purple: "rgb(128, 0, 128)",
                                        red: "rgb(255, 0, 0)",
                                        silver: "rgb(192, 192, 192)",
                                        teal: "rgb(0, 128, 128)",
                                        white: "rgb(255, 255, 255)",
                                        yellow: "rgb(255, 255, 0)"
                                    };
                                    /^[A-z]+$/i.test(n) ? l = s[n] !== a ? s[n] : s.black : /^#([A-f\d]{3}){1,2}$/i.test(n) ? l = e(n) : /^rgba?\(/i.test(n) || (l = s.black), i = (l || n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                }
                                return 8 >= d || 3 !== i.split(" ").length || (i += " 1"), i;
                            case"inject":
                                return 8 >= d ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (8 >= d ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                        }
                    }
                }()
            }
        },
        Names: {
            camelCase: function (e) {
                return e.replace(/-(\w)/g, function (e, t) {
                    return t.toUpperCase()
                })
            }, SVGAttribute: function (e) {
                var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y1";
                return (d || y.State.isAndroid && !y.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
            }, prefixCheck: function (e) {
                if (y.State.prefixMatches[e]) return [y.State.prefixMatches[e], !0];
                for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
                    var o;
                    if (o = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
                        return e.toUpperCase()
                    }), h.isString(y.State.prefixElement.style[o])) return y.State.prefixMatches[e] = o, [o, !0]
                }
                return [e, !1]
            }
        },
        Values: {
            isCSSNullValue: function (e) {
                return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
            }, getUnitType: function (e) {
                return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
            }
        },
        getPropertyValue: function (e, r, o, i) {
            function l(e, r) {
                var o = 0;
                if (8 >= d) o = m.css(e, r); else {
                    if (!i) {
                        if ("height" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) return e.offsetHeight - (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);
                        if ("width" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) return e.offsetWidth - (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0)
                    }
                    var s;
                    s = n(e) === a ? t.getComputedStyle(e, null) : n(e).computedStyle ? n(e).computedStyle : n(e).computedStyle = t.getComputedStyle(e, null), d && "borderColor" === r && (r = "borderTopColor"), o = 9 === d && "filter" === r ? s.getPropertyValue(r) : s[r], ("" === o || null === o) && (o = e.style[r])
                }
                if ("auto" === o && /^(top|right|bottom|left)$/i.test(r)) {
                    var u = l(e, "position");
                    ("fixed" === u || "absolute" === u && /top|left/i.test(r)) && (o = m(e).position()[r] + "px")
                }
                return o
            }

            var s;
            if (x.Hooks.registered[r]) {
                var u = r, c = x.Hooks.getRoot(u);
                o === a && (o = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])), x.Normalizations.registered[c] && (o = x.Normalizations.registered[c]("extract", e, o)), s = x.Hooks.extractValue(u, o)
            } else if (x.Normalizations.registered[r]) {
                var p, g;
                p = x.Normalizations.registered[r]("name", e), "transform" !== p && (g = l(e, x.Names.prefixCheck(p)[0]), x.Values.isCSSNullValue(g) && x.Hooks.templates[r] && (g = x.Hooks.templates[r][1])), s = x.Normalizations.registered[r]("extract", e, g)
            }
            return /^[\d-]/.test(s) || (s = n(e) && n(e).isSVG && x.Names.SVGAttribute(r) ? /^(height|width)$/i.test(r) ? e.getBBox()[r] : e.getAttribute(r) : l(e, x.Names.prefixCheck(r)[0])), x.Values.isCSSNullValue(s) && (s = 0), y.debug >= 2 && console.log("Get " + r + ": " + s), s
        },
        setPropertyValue: function (e, r, a, o, i) {
            var l = r;
            if ("scroll" === r) i.container ? i.container["scroll" + i.direction] = a : "Left" === i.direction ? t.scrollTo(a, i.alternateValue) : t.scrollTo(i.alternateValue, a); else if (x.Normalizations.registered[r] && "transform" === x.Normalizations.registered[r]("name", e)) x.Normalizations.registered[r]("inject", e, a), l = "transform", a = n(e).transformCache[r]; else {
                if (x.Hooks.registered[r]) {
                    var s = r, u = x.Hooks.getRoot(r);
                    o = o || x.getPropertyValue(e, u), a = x.Hooks.injectValue(s, a, o), r = u
                }
                if (x.Normalizations.registered[r] && (a = x.Normalizations.registered[r]("inject", e, a), r = x.Normalizations.registered[r]("name", e)), l = x.Names.prefixCheck(r)[0], 8 >= d) try {
                    e.style[l] = a
                } catch (c) {
                    y.debug && console.log("Browser does not support [" + a + "] for [" + l + "]")
                } else n(e) && n(e).isSVG && x.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[l] = a;
                y.debug >= 2 && console.log("Set " + r + " (" + l + "): " + a)
            }
            return [l, a]
        },
        flushTransformCache: function (e) {
            function t(t) {
                return parseFloat(x.getPropertyValue(e, t))
            }

            var r = "";
            if ((d || y.State.isAndroid && !y.State.isChrome) && n(e).isSVG) {
                var a = {
                    translate: [t("translateX"), t("translateY")],
                    skewX: [t("skewX")],
                    skewY: [t("skewY")],
                    scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                    rotate: [t("rotateZ"), 0, 0]
                };
                m.each(n(e).transformCache, function (e) {
                    /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e])
                })
            } else {
                var o, i;
                m.each(n(e).transformCache, function (t) {
                    return o = n(e).transformCache[t], "transformPerspective" === t ? (i = o, !0) : (9 === d && "rotateZ" === t && (t = "rotate"), void(r += t + o + " "))
                }), i && (r = "perspective" + i + " " + r)
            }
            x.setPropertyValue(e, "transform", r)
        }
    };
    x.Hooks.register(), x.Normalizations.register(), y.animate = function () {
        function e() {
            return i ? T.promise || null : g
        }

        function t() {
            function e() {
                function e(e) {
                    var r = a, o = a, n = a;
                    return h.isArray(e) ? (r = e[0], !h.isArray(e[1]) && /^[\d-]/.test(e[1]) || h.isFunction(e[1]) ? n = e[1] : (h.isString(e[1]) || h.isArray(e[1])) && (o = l(e[1], i.duration), e[2] !== a && (n = e[2]))) : r = e, o = o || i.easing, h.isFunction(r) && (r = r.call(t, w, P)), h.isFunction(n) && (n = n.call(t, w, P)), [r || 0, o, n]
                }

                function c(e, t) {
                    var r, a;
                    return a = (t || 0).toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
                        return r = e, ""
                    }), r || (r = x.Values.getUnitType(e)), [a, r]
                }

                function p() {
                    var e = {
                            parent: t.parentNode,
                            position: x.getPropertyValue(t, "position"),
                            fontSize: x.getPropertyValue(t, "fontSize")
                        }, a = e.position === F.lastPosition && e.parent === F.lastParent,
                        o = e.fontSize === F.lastFontSize && e.parent === F.lastParent;
                    F.lastParent = e.parent, F.lastPosition = e.position, F.lastFontSize = e.fontSize, null === F.remToPxRatio && (F.remToPxRatio = parseFloat(x.getPropertyValue(r.body, "fontSize")) || 16);
                    var i = {
                        overflowX: null,
                        overflowY: null,
                        boxSizing: null,
                        width: null,
                        minWidth: null,
                        maxWidth: null,
                        height: null,
                        minHeight: null,
                        maxHeight: null,
                        paddingLeft: null
                    }, l = {}, s = 10;
                    if (l.remToPxRatio = F.remToPxRatio, d && !n(t).isSVG) var u = /^auto$/i.test(t.currentStyle.width),
                        c = /^auto$/i.test(t.currentStyle.height);
                    a && o || (n(t).isSVG || (i.overflowX = x.getPropertyValue(t, "overflowX"), i.overflowY = x.getPropertyValue(t, "overflowY"), i.boxSizing = x.getPropertyValue(t, "boxSizing"), i.minWidth = x.getPropertyValue(t, "minWidth"), i.maxWidth = x.getPropertyValue(t, "maxWidth") || "none", i.minHeight = x.getPropertyValue(t, "minHeight"), i.maxHeight = x.getPropertyValue(t, "maxHeight") || "none", i.paddingLeft = x.getPropertyValue(t, "paddingLeft")), i.width = x.getPropertyValue(t, "width", null, !0), i.height = x.getPropertyValue(t, "height", null, !0)), a ? (l.percentToPxRatioWidth = F.lastPercentToPxWidth, l.percentToPxRatioHeight = F.lastPercentToPxHeight) : (n(t).isSVG || (x.setPropertyValue(t, "overflowX", "hidden"), x.setPropertyValue(t, "overflowY", "hidden"), x.setPropertyValue(t, "boxSizing", "content-box"), x.setPropertyValue(t, "minWidth", s + "%"), x.setPropertyValue(t, "maxWidth", s + "%"), x.setPropertyValue(t, "minHeight", s + "%"), x.setPropertyValue(t, "maxHeight", s + "%")), x.setPropertyValue(t, "width", s + "%"), x.setPropertyValue(t, "height", s + "%")), o ? l.emToPxRatio = F.lastEmToPx : n(t).isSVG || x.setPropertyValue(t, "paddingLeft", s + "em"), a || (l.percentToPxRatioWidth = F.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(t, "width", null, !0)) || 1) / s, l.percentToPxRatioHeight = F.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(t, "height", null, !0)) || 1) / s), o || (l.emToPxRatio = F.lastEmToPx = (parseFloat(x.getPropertyValue(t, "paddingLeft")) || 1) / s);
                    for (var p in i) null !== i[p] && x.setPropertyValue(t, p, i[p]);
                    return n(t).isSVG || (d ? (u && x.setPropertyValue(t, "width", "auto"), c && x.setPropertyValue(t, "height", "auto")) : (x.setPropertyValue(t, "height", "auto"), i.height !== x.getPropertyValue(t, "height", null, !0) && x.setPropertyValue(t, "height", i.height), x.setPropertyValue(t, "width", "auto"), i.width !== x.getPropertyValue(t, "width", null, !0) && x.setPropertyValue(t, "width", i.width))), y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), t), l
                }

                if (i.begin && 0 === w && i.begin.call(v, v), "scroll" === A) {
                    var g, f, V, k = /^x$/i.test(i.axis) ? "Left" : "Top", C = parseFloat(i.offset) || 0;
                    i.container ? i.container.jquery || h.isNode(i.container) ? (i.container = i.container[0] || i.container, g = i.container["scroll" + k], V = g + m(t).position()[k.toLowerCase()] + C) : i.container = null : (g = y.State.scrollAnchor[y.State["scrollProperty" + k]], f = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === k ? "Top" : "Left")]], V = m(t).offset()[k.toLowerCase()] + C), u = {
                        scroll: {
                            rootPropertyValue: !1,
                            startValue: g,
                            currentValue: g,
                            endValue: V,
                            unitType: "",
                            easing: i.easing,
                            scrollData: {container: i.container, direction: k, alternateValue: f}
                        }, element: t
                    }
                } else if ("reverse" === A) {
                    if (!n(t).tweensContainer) return void m.dequeue(t, i.queue);
                    "none" === n(t).opts.display && (n(t).opts.display = "block"), n(t).opts.loop = !1, n(t).opts.begin = null, n(t).opts.complete = null, b.easing || delete i.easing, b.duration || delete i.duration, i = m.extend({}, n(t).opts, i);
                    var R = m.extend(!0, {}, n(t).tweensContainer);
                    for (var E in R) if ("element" !== E) {
                        var H = R[E].startValue;
                        R[E].startValue = R[E].currentValue = R[E].endValue, R[E].endValue = H, b && (R[E].easing = i.easing)
                    }
                    u = R
                } else if ("start" === A) {
                    var R;
                    n(t).tweensContainer && n(t).isAnimating === !0 && (R = n(t).tweensContainer);
                    for (var j in S) {
                        var z = e(S[j]), M = z[0], q = z[1], G = z[2];
                        j = x.Names.camelCase(j);
                        var L = x.Hooks.getRoot(j), B = !1;
                        if (n(t).isSVG || x.Names.prefixCheck(L)[1] !== !1 || x.Normalizations.registered[L] !== a) {
                            null !== i.display && "none" !== i.display && /opacity|filter/.test(j) && !G && 0 !== M && (G = 0), i._cacheValues && R && R[j] ? (G === a && (G = R[j].endValue + R[j].unitType), B = n(t).rootPropertyValueCache[L]) : x.Hooks.registered[j] ? G === a ? (B = x.getPropertyValue(t, L), G = x.getPropertyValue(t, j, B)) : B = x.Hooks.templates[L][1] : G === a && (G = x.getPropertyValue(t, j));
                            var X, Y, W, $;
                            X = c(j, G), G = X[0], W = X[1], X = c(j, M), M = X[0].replace(/^([+-\/*])=/, function (e, t) {
                                return $ = t, ""
                            }), Y = X[1], G = parseFloat(G) || 0, M = parseFloat(M) || 0;
                            var O;
                            if ("%" === Y && (/^(fontSize|lineHeight)$/.test(j) ? (M /= 100, Y = "em") : /^scale/.test(j) ? (M /= 100, Y = "") : /(Red|Green|Blue)$/i.test(j) && (M = M / 100 * 255, Y = "")), /[\/*]/.test($)) Y = W; else if (W !== Y && 0 !== G) if (0 === M) Y = W; else {
                                O = O || p();
                                var Q = /margin|padding|left|right|width|text|word|letter/i.test(j) || /X$/.test(j) ? "x" : "y";
                                switch (W) {
                                    case"%":
                                        G *= "x" === Q ? O.percentToPxRatioWidth : O.percentToPxRatioHeight;
                                        break;
                                    case"em":
                                        G *= O.emToPxRatio;
                                        break;
                                    case"rem":
                                        G *= O.remToPxRatio;
                                        break;
                                    case"px":
                                }
                                switch (Y) {
                                    case"%":
                                        G *= 1 / ("x" === Q ? O.percentToPxRatioWidth : O.percentToPxRatioHeight);
                                        break;
                                    case"em":
                                        G *= 1 / O.emToPxRatio;
                                        break;
                                    case"rem":
                                        G *= 1 / O.remToPxRatio;
                                        break;
                                    case"px":
                                }
                            }
                            switch ($) {
                                case"+":
                                    M = G + M;
                                    break;
                                case"-":
                                    M = G - M;
                                    break;
                                case"*":
                                    M = G * M;
                                    break;
                                case"/":
                                    M = G / M
                            }
                            u[j] = {
                                rootPropertyValue: B,
                                startValue: G,
                                currentValue: G,
                                endValue: M,
                                unitType: Y,
                                easing: q
                            }, y.debug && console.log("tweensContainer (" + j + "): " + JSON.stringify(u[j]), t)
                        } else y.debug && console.log("Skipping [" + L + "] due to a lack of browser support.")
                    }
                    u.element = t
                }
                u.element && (N.push(u), n(t).tweensContainer = u, n(t).opts = i, n(t).isAnimating = !0, w === P - 1 ? (y.State.calls.length > 1e4 && (y.State.calls = o(y.State.calls)), y.State.calls.push([N, v, i, null, T.resolver]), y.State.isTicking === !1 && (y.State.isTicking = !0, s())) : w++)
            }

            var t = this, i = m.extend({}, y.defaults, b), u = {};
            if (n(t) === a && m.data(t, c, {
                isSVG: h.isSVG(t),
                isAnimating: !1,
                computedStyle: null,
                tweensContainer: null,
                rootPropertyValueCache: {},
                transformCache: {}
            }), parseFloat(i.delay) && i.queue !== !1 && m.queue(t, i.queue, function (e) {
                y.velocityQueueEntryFlag = !0, setTimeout(e, parseFloat(i.delay))
            }), y.mock === !0) i.duration = 1; else switch (i.duration.toString().toLowerCase()) {
                case"fast":
                    i.duration = 200;
                    break;
                case"normal":
                    i.duration = p;
                    break;
                case"slow":
                    i.duration = 600;
                    break;
                default:
                    i.duration = parseFloat(i.duration) || 1
            }
            i.easing = l(i.easing, i.duration), i.begin && !h.isFunction(i.begin) && (i.begin = null), i.progress && !h.isFunction(i.progress) && (i.progress = null), i.complete && !h.isFunction(i.complete) && (i.complete = null), h.isString(i.display) && (i.display = i.display.toLowerCase()), i.mobileHA = i.mobileHA && y.State.isMobile && !y.State.isGingerbread, i.queue === !1 ? i.delay ? setTimeout(e, i.delay) : e() : m.queue(t, i.queue, function (t) {
                return "clearQueue" === t ? (T.promise && T.resolver(v), !0) : (y.velocityQueueEntryFlag = !0, void e(t))
            }), "" !== i.queue && "fx" !== i.queue || "inprogress" === m.queue(t)[0] || m.dequeue(t)
        }

        var i, g, f, v, S, b,
            V = arguments[0] && (m.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || h.isString(arguments[0].properties));
        if (h.isWrapped(this) ? (i = !1, f = 0, v = this, g = this) : (i = !0, f = 1, v = V ? arguments[0].elements : arguments[0]), v = h.isWrapped(v) ? [].slice.call(v) : v) {
            V ? (S = arguments[0].properties, b = arguments[0].options) : (S = arguments[f], b = arguments[f + 1]);
            var P = h.isArray(v) || h.isNodeList(v) ? v.length : 1, w = 0;
            if ("stop" !== S && !m.isPlainObject(b)) {
                var k = f + 1;
                b = {};
                for (var C = k; C < arguments.length; C++) !h.isArray(arguments[C]) && /^\d/.test(arguments[C]) ? b.duration = parseFloat(arguments[C]) : h.isString(arguments[C]) || h.isArray(arguments[C]) ? b.easing = arguments[C] : h.isFunction(arguments[C]) && (b.complete = arguments[C])
            }
            var T = {promise: null, resolver: null, rejecter: null};
            i && y.Promise && (T.promise = new y.Promise(function (e, t) {
                T.resolver = e, T.rejecter = t
            }));
            var A;
            switch (S) {
                case"scroll":
                    A = "scroll";
                    break;
                case"reverse":
                    A = "reverse";
                    break;
                case"stop":
                    var R = [];
                    return m.each(y.State.calls, function (e, t) {
                        t !== !1 && m.each(h.isNode(t[1]) ? [t[1]] : t[1], function (t, r) {
                            m.each(h.isNode(v) ? [v] : v, function (t, a) {
                                if (a === r) {
                                    if (n(a) && m.each(n(a).tweensContainer, function (e, t) {
                                        t.endValue = t.currentValue
                                    }), b === !0 || h.isString(b)) {
                                        var o = h.isString(b) ? b : "";
                                        m.each(m.queue(a, o), function (e, t) {
                                            h.isFunction(t) && t("clearQueue")
                                        }), m.queue(a, o, [])
                                    }
                                    R.push(e)
                                }
                            })
                        })
                    }), m.each(R, function (e, t) {
                        u(t, !0)
                    }), T.promise && T.resolver(v), e();
                default:
                    if (!m.isPlainObject(S) || m.isEmptyObject(S)) {
                        if (h.isString(S) && y.Sequences[S]) {
                            var E = b.duration;
                            return b.backwards === !0 && (v = (v.jquery ? [].slice.call(v) : v).reverse()), m.each(v, function (e, t) {
                                parseFloat(b.stagger) && (b.delay = parseFloat(b.stagger) * e), b.drag && (b.duration = parseFloat(E) || (/^(callout|transition)/.test(S) ? 1e3 : p), b.duration = Math.max(b.duration * (b.backwards ? 1 - e / P : (e + 1) / P), .75 * b.duration, 200)), y.Sequences[S].call(t, t, b || {}, e, P, v, T.promise ? T : a)
                            }), e()
                        }
                        var H = "Velocity: First argument (" + S + ") was not a property map, a known action, or a registered sequence. Aborting.";
                        return T.promise ? T.rejecter(new Error(H)) : console.log(H), e()
                    }
                    A = "start"
            }
            var F = {
                lastParent: null,
                lastPosition: null,
                lastFontSize: null,
                lastPercentToPxWidth: null,
                lastPercentToPxHeight: null,
                lastEmToPx: null,
                remToPxRatio: null
            }, N = [];
            m.each(h.isNode(v) ? [v] : v, function (e, r) {
                h.isNode(r) && t.call(r)
            });
            var j, z = m.extend({}, y.defaults, b);
            if (z.loop = parseInt(z.loop), j = 2 * z.loop - 1, z.loop) for (var M = 0; j > M; M++) {
                var q = {delay: z.delay};
                z.complete && M === j - 1 && (q.complete = z.complete), y.animate(v, "reverse", q)
            }
            return e()
        }
    };
    var b = t.jQuery || t.Zepto;
    b && (b.fn.velocity = y.animate, b.fn.velocity.defaults = y.defaults), "undefined" != typeof define && define.amd ? define(function () {
        return y
    }) : "undefined" != typeof module && module.exports && (module.exports = y), m.each(["Down", "Up"], function (e, t) {
        y.Sequences["slide" + t] = function (e, r) {
            var a = m.extend({}, r), o = {
                height: null,
                marginTop: null,
                marginBottom: null,
                paddingTop: null,
                paddingBottom: null,
                overflow: null,
                overflowX: null,
                overflowY: null
            }, n = a.begin, i = a.complete, l = !1;
            null !== a.display && (a.display = "Down" === t ? a.display || "" : a.display || "none"), a.begin = function () {
                function r() {
                    e.style.display = "block", o.height = y.CSS.getPropertyValue(e, "height"), e.style.height = "auto", y.CSS.getPropertyValue(e, "height") === o.height && (l = !0), y.CSS.setPropertyValue(e, "height", o.height + "px")
                }

                if ("Down" === t) {
                    o.overflow = [y.CSS.getPropertyValue(e, "overflow"), 0], o.overflowX = [y.CSS.getPropertyValue(e, "overflowX"), 0], o.overflowY = [y.CSS.getPropertyValue(e, "overflowY"), 0], e.style.overflow = "hidden", e.style.overflowX = "visible", e.style.overflowY = "hidden", r();
                    for (var a in o) /^overflow/.test(a) || (o[a] = [y.CSS.getPropertyValue(e, a), 0]);
                    e.style.display = "none"
                } else {
                    r();
                    for (var a in o) o[a] = [0, y.CSS.getPropertyValue(e, a)];
                    e.style.overflow = "hidden", e.style.overflowX = "visible", e.style.overflowY = "hidden"
                }
                n && n.call(e, e)
            }, a.complete = function (e) {
                var r = "Down" === t ? 0 : 1;
                l === !0 ? o.height[r] = "auto" : o.height[r] += "px";
                for (var a in o) e.style[a] = o[a][r];
                i && i.call(e, e)
            }, y.animate(e, o, a)
        }
    }), m.each(["In", "Out"], function (e, t) {
        y.Sequences["fade" + t] = function (e, r, a, o) {
            var n = m.extend({}, r), i = {opacity: "In" === t ? 1 : 0};
            a !== o - 1 && (n.complete = n.begin = null), null !== n.display && (n.display = "In" === t ? "" : "none"), y.animate(this, i, n)
        }
    })
}(window.jQuery || window.Zepto || window, window, document);
;!function (t) {
    t.fn.unveil = function (i, e) {
        function n() {
            var i = a.filter(function () {
                var i = t(this);
                if (!i.is(":hidden")) {
                    var e = o.scrollTop(), n = e + o.height(), r = i.offset().top, s = r + i.height();
                    return s >= e - u && n + u >= r
                }
            });
            r = i.trigger("unveil"), a = a.not(r)
        }

        var r, o = t(window), u = i || 0, s = window.devicePixelRatio > 1, l = s ? "data-src-retina" : "data-src",
            a = this;
        return this.one("unveil", function () {
            var t = this.getAttribute(l);
            t = t || this.getAttribute("data-src"), t && (this.setAttribute("src", t), "function" == typeof e && e.call(this))
        }), o.on("scroll.unveil resize.unveil lookup.unveil", n), n(), this
    }
}(window.jQuery || window.Zepto);
;!function (t) {
    t.extend(t.fn, {
        validate: function (e) {
            if (!this.length) return void(e && e.debug && window.console && console.warn("nothing selected, can't validate, returning nothing"));
            var s = t.data(this[0], "validator");
            return s ? s : (this.attr("novalidate", "novalidate"), s = new t.validator(e, this[0]), t.data(this[0], "validator", s), s.settings.onsubmit && (this.validateDelegate(":submit", "click", function (e) {
                if (s.settings.submitHandler && (s.submitButton = e.target), t(e.target).hasClass("cancel")) {
                    s.cancelSubmit = !0;
                    var i = document, n = i.documentMode;
                    s.cancelSubmit = i.all && n && 8 === n && null === event.target.attributes.formnovalidate ? void 0 : !0
                }
            }), this.submit(function (e) {
                function i() {
                    var i;
                    return s.settings.submitHandler ? (s.submitButton && (i = t("<input type='hidden'/>").attr("name", s.submitButton.name).val(s.submitButton.value).appendTo(s.currentForm)), s.settings.submitHandler.call(s, s.currentForm, e), s.submitButton && i.remove(), !1) : !0
                }

                return s.settings.debug && e.preventDefault(), s.cancelSubmit ? (s.cancelSubmit = !1, i()) : s.form() ? s.pendingRequest ? (s.formSubmitted = !0, !1) : i() : (s.focusInvalid(), !1)
            })), s)
        }, valid: function () {
            if (t(this[0]).is("form")) return this.validate().form();
            var e = !0, s = t(this[0].form).validate();
            return this.each(function () {
                e &= s.element(this)
            }), e
        }, removeAttrs: function (e) {
            var s = {}, i = this;
            return t.each(e.split(/\s/), function (t, e) {
                s[e] = i.attr(e), i.removeAttr(e)
            }), s
        }, rules: function (e, s) {
            var i = this[0];
            if (e) {
                var n = t.data(i.form, "validator").settings, r = n.rules, a = t.validator.staticRules(i);
                switch (e) {
                    case"add":
                        t.extend(a, t.validator.normalizeRule(s)), r[i.name] = a, s.messages && (n.messages[i.name] = t.extend(n.messages[i.name], s.messages));
                        break;
                    case"remove":
                        if (!s) return delete r[i.name], a;
                        var o = {};
                        return t.each(s.split(/\s/), function (t, e) {
                            o[e] = a[e], delete a[e]
                        }), o
                }
            }
            var u = t.validator.normalizeRules(t.extend({}, t.validator.metadataRules(i), t.validator.classRules(i), t.validator.attributeRules(i), t.validator.staticRules(i)), i);
            if (u.required) {
                var l = u.required;
                delete u.required, u = t.extend({required: l}, u)
            }
            return u
        }
    }), t.extend(t.expr[":"], {
        blank: function (e) {
            return !t.trim("" + e.value)
        }, filled: function (e) {
            return !!t.trim("" + e.value)
        }, unchecked: function (t) {
            return !t.checked
        }
    }), t.validator = function (e, s) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = s, this.init()
    }, t.validator.format = function (e, s) {
        return 1 === arguments.length ? function () {
            var s = t.makeArray(arguments);
            return s.unshift(e), t.validator.format.apply(this, s)
        } : (arguments.length > 2 && s.constructor !== Array && (s = t.makeArray(arguments).slice(1)), s.constructor !== Array && (s = [s]), t.each(s, function (t, s) {
            e = e.replace(new RegExp("\\{" + t + "\\}", "g"), s)
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "field-error",
            validClass: "field-valid",
            normalClass: "field-normal",
            focusClass: "field-focus",
            signClass: "field-tip",
            errorElement: "span",
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            focusInvalid: !0,
            onkeyup: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (t) {
                this.lastActive = t, this.addWrapper(this.errorsFor(t)).removeClass(this.settings.errorClass).removeClass(this.settings.validClass).removeClass(this.settings.normalClass).addClass(this.settings.focusClass), this.addWrapper(this.errorsFor(t)).html(this.errorsFor(t).attr("tip")), this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).removeClass(this.settings.errorClass).removeClass(this.settings.validClass).addClass(this.settings.normalClass))
            },
            onfocusout: function (t) {
                this.addWrapper(this.errorsFor(t)).removeClass(this.settings.errorClass).removeClass(this.settings.focusClass).removeClass(this.settings.validClass).addClass(this.settings.normalClass), this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function (t, e) {
                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastActive) && this.element(t)
            },
            onclick: function (t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function (e, s, i) {
                "radio" === e.type ? this.findByName(e.name).addClass(s).removeClass(i) : t(e).addClass(s).removeClass(i)
            },
            unhighlight: function (e, s, i) {
                "radio" === e.type ? this.findByName(e.name).removeClass(s).addClass(i) : t(e).removeClass(s).addClass(i)
            }
        },
        setDefaults: function (e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "\u5fc5\u586b\u9879\uff0c\u4e0d\u80fd\u4e3a\u7a7a",
            remote: "\u8bf7\u586b\u5199",
            email: "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740",
            url: "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684URL\u5730\u5740",
            date: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u65e5\u671f",
            dateISO: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u65e5\u671f (ISO\uff0c\u5982:2012-03-06)",
            dateTime: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u65e5\u671f (\u5982:2014-06-30 11:11)",
            number: "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684\u6570\u5b57",
            digits: "\u8bf7\u8f93\u5165\u6574\u6570",
            creditcard: "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7684\u4fe1\u7528\u5361\u53f7\u7801",
            equalTo: "\u8bf7\u518d\u6b21\u8f93\u5165\u76f8\u540c\u7684\u503c",
            maxlength: t.validator.format("\u957f\u5ea6\u4e0d\u8d85\u8fc7 {0} \u4e2a\u5b57"),
            minlength: t.validator.format("\u957f\u5ea6\u4e0d\u5c11\u8fc7 {0} \u4e2a\u5b57"),
            rangelength: t.validator.format("\u957f\u5ea6\u4ecb\u4e8e {0}~{1} \u7684\u5b57\u7b26"),
            range: t.validator.format("\u8bf7\u8f93\u5165 {0}~{1} \u4e4b\u95f4\u7684\u503c"),
            max: t.validator.format("\u6700\u5927\u503c\u4e0d\u8d85\u8fc7 {0}"),
            min: t.validator.format("\u6700\u5c0f\u503c\u4e0d\u5c0f\u4e8e {0}"),
            moblie: "\u624b\u673a\u53f7\u7801\u683c\u5f0f\u9519\u8bef",
            phone: "\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u9519\u8bef",
            phoneOrMoblie: "\u7535\u8bdd\u6216\u624b\u673a\u53f7\u7801\u683c\u5f0f\u9519\u8bef",
            zipCode: "\u90ae\u653f\u7f16\u7801\u683c\u5f0f\u9519\u8bef",
            ip: "IP\u5730\u5740\u683c\u5f0f\u9519\u8bef\uff0c\u4f8b\u5982\uff1a192.168.10.10",
            netmask: "\u5b50\u7f51\u63a9\u7801\u683c\u5f0f\u9519\u8bef\uff0c\u4f8b\u5982\uff1a255.255.255.0",
            qq: "QQ\u53f7\u7801\u683c\u5f0f\u9519\u8bef",
            chinese: "\u53ea\u80fd\u8f93\u5165\u4e2d\u6587",
            userName: t.validator.format("\u4ee5\u5b57\u6bcd\u5f00\u5934\uff0c\u957f\u5ea6\u57286~18\u4e4b\u95f4\uff0c\u53ea\u80fd\u5305\u542b\u5b57\u7b26\u3001\u6570\u5b57\u548c\u4e0b\u5212\u7ebf"),
            byteRangeLength: t.validator.format("\u5b57\u7b26\u957f\u5ea6\u5728{0}~{1}\u4e4b\u95f4\uff0c\u4e2d\u6587\u7b97\u4e24\u4e2a\u5b57\u7b26"),
            charOrNum: "\u53ea\u80fd\u8f93\u5165\u82f1\u6587\u548c\u6570\u5b57"
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function e(e) {
                    var s = t.data(this[0].form, "validator"), i = "on" + e.type.replace(/^validate/, "");
                    s.settings[i] && s.settings[i].call(s, this[0], e)
                }

                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset(), t.each(this.errors(), function () {
                    t(this).html(t(this).attr("tip"))
                });
                var s = this.groups = {};
                t.each(this.settings.groups, function (e, i) {
                    t.each(i.split(/\s/), function (t, i) {
                        s[i] = e
                    })
                });
                var i = this.settings.rules;
                t.each(i, function (e, s) {
                    i[e] = t.validator.normalizeRule(s)
                }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            }, form: function () {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            }, checkForm: function () {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            }, element: function (e) {
                e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                var s = this.check(e) !== !1;
                return s ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), s
            }, showErrors: function (e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var s in e) this.errorList.push({message: e[s], element: this.findByName(s)[0]});
                    this.successList = t.grep(this.successList, function (t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }, resetForm: function () {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            }, numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            }, objectLength: function (t) {
                var e = 0;
                for (var s in t) e++;
                return e
            }, hideErrors: function () {
                this.addWrapper(this.toHide).removeClass(this.settings.errorClass).removeClass(this.settings.normalClass).removeClass(this.settings.focusClass).addClass(this.settings.validClass).attr("title", "\u6b63\u786e")
            }, valid: function () {
                return 0 === this.size()
            }, size: function () {
                return this.errorList.length
            }, focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {
                }
            }, findLastActive: function () {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function (t) {
                    return t.element.name === e.name
                }).length && e
            }, elements: function () {
                var e = this, s = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in s || !e.objectLength(t(this).rules()) ? !1 : (s[this.name] = !0, !0)
                })
            }, clean: function (e) {
                return t(e)[0]
            }, errors: function () {
                return t(this.settings.errorElement + "." + this.settings.signClass, this.errorContext)
            }, reset: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            }, prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            }, prepareElement: function (t) {
                this.reset(), this.toHide = this.errorsFor(t)
            }, elementValue: function (e) {
                var s = t(e).attr("type"), i = t(e).val();
                return "radio" === s || "checkbox" === s ? t('input[name="' + t(e).attr("name") + '"]:checked').val() : "string" == typeof i ? i.replace(/\r/g, "") : i
            }, check: function (e) {
                e = this.validationTargetFor(this.clean(e));
                var s, i = t(e).rules(), n = !1, r = this.elementValue(e);
                for (var a in i) {
                    var o = {method: a, parameters: i[a]};
                    try {
                        if (s = t.validator.methods[a].call(this, r, e, o.parameters), "dependency-mismatch" === s) {
                            n = !0;
                            continue
                        }
                        if (n = !1, "pending" === s) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!s) return this.formatAndAdd(e, o), !1
                    } catch (u) {
                        throw this.settings.debug && window.console && console.log("exception occured when checking element " + e.id + ", check the '" + o.method + "' method", u), u
                    }
                }
                return n ? void 0 : (this.objectLength(i) && this.successList.push(e), !0)
            }, customMetaMessage: function (e, s) {
                if (t.metadata) {
                    var i = this.settings.meta ? t(e).metadata()[this.settings.meta] : t(e).metadata();
                    return i && i.messages && i.messages[s]
                }
            }, customDataMessage: function (e, s) {
                return t(e).data("msg-" + s.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + s.toLowerCase())
            }, customMessage: function (t, e) {
                var s = this.settings.messages[t];
                return s && (s.constructor === String ? s : s[e])
            }, findDefined: function () {
                for (var t = 0; t < arguments.length; t++) if (void 0 !== arguments[t]) return arguments[t];
                return void 0
            }, defaultMessage: function (e, s) {
                return this.findDefined(this.customMessage(e.name, s), this.customDataMessage(e, s), this.customMetaMessage(e, s), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[s], "<strong>Warning: No message defined for " + e.name + "</strong>")
            }, formatAndAdd: function (e, s) {
                var i = this.defaultMessage(e, s.method), n = /\$?\{(\d+)\}/g;
                "function" == typeof i ? i = i.call(this, s.parameters, e) : n.test(i) && (i = t.validator.format(i.replace(n, "{$1}"), s.parameters)), this.errorList.push({
                    message: i,
                    element: e
                }), this.errorMap[e.name] = i, this.submitted[e.name] = i
            }, addWrapper: function (t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            }, defaultShowErrors: function () {
                var t, e;
                for (t = 0; this.errorList[t]; t++) {
                    var s = this.errorList[t];
                    this.settings.highlight && this.settings.highlight.call(this, s.element, this.settings.errorClass, this.settings.validClass), this.showLabel(s.element, s.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight) for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            }, validElements: function () {
                return this.currentElements.not(this.invalidElements())
            }, invalidElements: function () {
                return t(this.errorList).map(function () {
                    return this.element
                })
            }, showLabel: function (e, s) {
                var i = this.errorsFor(e);
                i.length ? (i.removeClass(this.settings.validClass).removeClass(this.settings.focusClass).removeClass(this.settings.normalClass).addClass(this.settings.errorClass), i.attr("title", s).html(s)) : (i = t("<" + this.settings.errorElement + "/>").attr({"for": this.idOrName(e)}).addClass(this.settings.signClass).addClass(this.settings.errorClass).attr("title", s).html(s || ""), this.settings.wrapper && (i = i.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(i).length || (this.settings.errorPlacement ? this.settings.errorPlacement(i, t(e)) : i.insertAfter(t(e).next().hasClass("field-si") ? t(e).next() : e))), !s && this.settings.success && (i.text(""), "string" == typeof this.settings.success ? i.addClass(this.settings.success) : this.settings.success(i, e)), this.toShow = this.toShow.add(i)
            }, errorsFor: function (e) {
                var s = this.idOrName(e);
                return this.errors().filter(function () {
                    return t(this).attr("for") === s
                })
            }, idOrName: function (t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            }, validationTargetFor: function (t) {
                return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
            }, checkable: function (t) {
                return /radio|checkbox/i.test(t.type)
            }, findByName: function (e) {
                return t(this.currentForm).find('[name="' + e + '"]')
            }, getLength: function (e, s) {
                switch (s.nodeName.toLowerCase()) {
                    case"select":
                        return t("option:selected", s).length;
                    case"input":
                        if (this.checkable(s)) return this.findByName(s.name).filter(":checked").length
                }
                return e.length
            }, depend: function (t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            }, dependTypes: {
                "boolean": function (t) {
                    return t
                }, string: function (e, s) {
                    return !!t(e, s.form).length
                }, "function": function (t, e) {
                    return t(e)
                }
            }, optional: function (e) {
                var s = this.elementValue(e);
                return !t.validator.methods.required.call(this, s, e) && "dependency-mismatch"
            }, startRequest: function (t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            }, stopRequest: function (e, s) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], s && 0 === this.pendingRequest && this.formSubmitted && this.form() ? this.formSubmitted = !1 : !s && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }, previousValue: function (e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(e, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {required: !0},
            email: {email: !0},
            url: {url: !0},
            date: {date: !0},
            dateISO: {dateISO: !0},
            dateTime: {dateTime: !0},
            number: {number: !0},
            digits: {digits: !0},
            creditcard: {creditcard: !0}
        },
        addClassRules: function (e, s) {
            e.constructor === String ? this.classRuleSettings[e] = s : t.extend(this.classRuleSettings, e)
        },
        classRules: function (e) {
            var s = {}, i = t(e).attr("class");
            return i && t.each(i.split(" "), function () {
                this in t.validator.classRuleSettings && t.extend(s, t.validator.classRuleSettings[this])
            }), s
        },
        attributeRules: function (e) {
            var s = {}, i = t(e);
            for (var n in t.validator.methods) {
                var r;
                "required" === n ? (r = i.get(0).getAttribute(n), "" === r && (r = !0), r = !!r) : r = i.attr(n), r ? s[n] = r : i[0].getAttribute("type") === n && (s[n] = !0)
            }
            return s.maxlength && /-1|2147483647|524288/.test(s.maxlength) && delete s.maxlength, s
        },
        metadataRules: function (e) {
            if (!t.metadata) return {};
            var s = t.data(e.form, "validator").settings.meta;
            return s ? t(e).metadata()[s] : t(e).metadata()
        },
        staticRules: function (e) {
            var s = {}, i = t.data(e.form, "validator");
            return i.settings.rules && (s = t.validator.normalizeRule(i.settings.rules[e.name]) || {}), s
        },
        normalizeRules: function (e, s) {
            return t.each(e, function (i, n) {
                if (n === !1) return void delete e[i];
                if (n.param || n.depends) {
                    var r = !0;
                    switch (typeof n.depends) {
                        case"string":
                            r = !!t(n.depends, s.form).length;
                            break;
                        case"function":
                            r = n.depends.call(s, s)
                    }
                    r ? e[i] = void 0 !== n.param ? n.param : !0 : delete e[i]
                }
            }), t.each(e, function (i, n) {
                e[i] = t.isFunction(n) ? n(s) : n
            }), t.each(["minlength", "maxlength", "min", "max"], function () {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function () {
                e[this] && (e[this] = [Number(e[this][0]), Number(e[this][1])])
            }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e.messages && delete e.messages, e
        },
        normalizeRule: function (e) {
            if ("string" == typeof e) {
                var s = {};
                t.each(e.split(/\s/), function () {
                    s[this] = !0
                }), e = s
            }
            return e
        },
        addMethod: function (e, s, i) {
            t.validator.methods[e] = s, t.validator.messages[e] = void 0 !== i ? i : t.validator.messages[e], s.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function (e, s, i) {
                if (!this.depend(i, s)) return "dependency-mismatch";
                if ("select" === s.nodeName.toLowerCase()) {
                    var n = t(s).val();
                    return n && n.length > 0
                }
                return this.checkable(s) ? this.getLength(e, s) > 0 : t.trim(e).length > 0
            }, remote: function (e, s, i) {
                if (this.optional(s)) return "dependency-mismatch";
                var n = this.previousValue(s);
                if (this.settings.messages[s.name] || (this.settings.messages[s.name] = {}), n.originalMessage = this.settings.messages[s.name].remote, this.settings.messages[s.name].remote = n.message, i = "string" == typeof i && {url: i} || i, this.pending[s.name]) return "pending";
                if (n.old === e) return n.valid;
                n.old = e;
                var r = this;
                this.startRequest(s);
                var a = {};
                return a[s.name] = e, t.ajax(t.extend(!0, {
                    url: i,
                    mode: "abort",
                    port: "validate" + s.name,
                    dataType: "json",
                    headers: {"X-CSRF-TOKEN": "undefined" != typeof _aDlTk_ ? _aDlTk_ : ""},
                    data: a,
                    success: function (i) {
                        r.settings.messages[s.name].remote = n.originalMessage;
                        var a = i === !0 || "true" === i || "1" === i.result || i.result === !0;
                        if (a) {
                            var o = r.formSubmitted;
                            r.prepareElement(s), r.formSubmitted = o, r.successList.push(s), delete r.invalid[s.name], r.showErrors()
                        } else {
                            var u = {}, l = i.msg || i || r.defaultMessage(s, "remote");
                            u[s.name] = n.message = t.isFunction(l) ? l(e) : l, r.invalid[s.name] = !0, r.showErrors(u)
                        }
                        n.valid = a, r.stopRequest(s, a)
                    }
                }, i)), "pending"
            }, minlength: function (e, s, i) {
                var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), s);
                return this.optional(s) || n >= i
            }, maxlength: function (e, s, i) {
                var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), s);
                return this.optional(s) || i >= n
            }, rangelength: function (e, s, i) {
                var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), s);
                return this.optional(s) || n >= i[0] && n <= i[1]
            }, min: function (t, e, s) {
                return this.optional(e) || t >= s
            }, max: function (t, e, s) {
                return this.optional(e) || s >= t
            }, range: function (t, e, s) {
                return this.optional(e) || t >= s[0] && t <= s[1]
            }, email: function (t, e) {
                return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
            }, url: function (t, e) {
                return this.optional(e) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            }, date: function (t, e) {
                return this.optional(e) || !/Invalid|NaN/.test(new Date(t))
            }, dateISO: function (t, e) {
                return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
            }, dateTime: function (t, e) {
                return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2} ([01][0-9]|2[0-3]):[0-5][0-9]$/.test(t)
            }, number: function (t, e) {
                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            }, digits: function (t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            }, creditcard: function (t, e) {
                if (this.optional(e)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t)) return !1;
                var s = 0, i = 0, n = !1;
                t = t.replace(/\D/g, "");
                for (var r = t.length - 1; r >= 0; r--) {
                    var a = t.charAt(r);
                    i = parseInt(a, 10), n && (i *= 2) > 9 && (i -= 9), s += i, n = !n
                }
                return s % 10 === 0
            }, equalTo: function (e, s, i) {
                var n = t(i);
                return this.settings.onfocusout && n.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    t(s).valid()
                }), e === n.val()
            }, moblie: function (t, e) {
                return this.optional(e) || /^1(3|4|5|7|8)[0-9]{9}$/.test(t)
            }, phone: function (t, e) {
                return this.optional(e) || /^(0\d{2,3}-)?\d{7,8}$/.test(t)
            }, phoneOrMoblie: function (t, e) {
                return this.optional(e) || /^(0\d{2,3}-)?\d{7,8}$/.test(t) || /^1(3|4|5|8)[0-9]{9}$/.test(t)
            }, zipCode: function (t, e) {
                return this.optional(e) || /^[1-9]\d{5}(?!\d)$/.test(t)
            }, ip: function (t, e) {
                var s = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                return this.optional(e) || s.test(t) && RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256
            }, netmask: function (t, e) {
                var s = /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$/,
                    i = t.split(".");
                return this.optional(e) || s.test(t) && i[0] < 256 && i[1] < 256 && i[2] < 256 && i[3] < 256
            }, qq: function (t, e) {
                return this.optional(e) || /^\d{5,12}$/.test(t)
            }, chinese: function (t, e) {
                return this.optional(e) || /^[\u4e00-\u9fa5]{0,}$/.test(t)
            }, userName: function (t, e) {
                return this.optional(e) || /^[a-zA-Z]\w{6,18}$/.test(t)
            }, byteRangeLength: function (t, e, s) {
                for (var i = t.length, n = 0; n < t.length; n++) t.charCodeAt(n) > 19968 && i++;
                return this.optional(e) || i >= s[0] && i <= s[1]
            }, charOrNum: function (t, e) {
                var s = /^([a-zA-Z0-9]+)$/;
                return this.optional(e) || s.test(t)
            }
        }
    }), t.format = t.validator.format
}(jQuery), function (t) {
    var e = {};
    if (t.ajaxPrefilter) t.ajaxPrefilter(function (t, s, i) {
        var n = t.port;
        "abort" === t.mode && (e[n] && e[n].abort(), e[n] = i)
    }); else {
        var s = t.ajax;
        t.ajax = function (i) {
            var n = ("mode" in i ? i : t.ajaxSettings).mode, r = ("port" in i ? i : t.ajaxSettings).port;
            return "abort" === n ? (e[r] && e[r].abort(), e[r] = s.apply(this, arguments)) : s.apply(this, arguments)
        }
    }
}(jQuery), function (t) {
    jQuery.event.special.focusin || jQuery.event.special.focusout || !document.addEventListener || t.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, s) {
        function i(e) {
            return e = t.event.fix(e), e.type = s, t.event.handle.call(this, e)
        }

        t.event.special[s] = {
            setup: function () {
                this.addEventListener(e, i, !0)
            }, teardown: function () {
                this.removeEventListener(e, i, !0)
            }, handler: function (e) {
                var i = arguments;
                return i[0] = t.event.fix(e), i[0].type = s, t.event.handle.apply(this, i)
            }
        }
    }), t.extend(t.fn, {
        validateDelegate: function (e, s, i) {
            return this.bind(s, function (s) {
                var n = t(s.target);
                return n.is(e) ? i.apply(n, arguments) : void 0
            })
        }
    })
}(jQuery);
;!function (e) {
    e.fn.countdown = function (n, s) {
        function o(n) {
            var o = n;
            return iYQ.debug && iYQ.CS.log("@countdown_proc timeout:" + d + "    date:" + a.date), e("#" + a.id).size() < 1 ? (iYQ.Task.kill("countdown" + a.name, 1), iYQ.debug && iYQ.CS.log("@countdown_proc countdown:" + a.name + "  >>>>>> \u8fd9\u4e2a\u5012\u8ba1\u65f6\u5df2\u6682\u505c!"), !1) : (d >= 0 ? seconds = d-- : (eventDate = Date.parse(a.date) / 1e3, currentDate = Math.floor(e.now() / 1e3), seconds = eventDate - currentDate), 0 >= seconds && (s.call(this), iYQ.Task.kill("countdown" + a.name, 1)), seconds < a.shake && (o.hasClass("shake") || (o.addClass("animated shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                clearTimeout(t), t = setTimeout(function () {
                    o.removeClass("animated shake")
                }, 100 * (seconds > 500 ? .38 * seconds : seconds))
            }), iYQ.debug && iYQ.CS.log("@countdown_proc animated shake:" + 500 * (seconds > 500 ? .62 * seconds : seconds)))), days = Math.floor(seconds / 86400), seconds -= 60 * days * 60 * 24, hours = Math.floor(seconds / 3600), seconds -= 60 * hours * 60, minutes = Math.floor(seconds / 60), seconds -= 60 * minutes, 1 > days ? e(".days", o).parent().addClass("hide") : e(".days", o).parent().removeClass("hide"), 1 > days && 1 > hours ? e(".hours", o).parent().addClass("hide") : e(".hours", o).parent().removeClass("hide"), 1 > days && 1 > hours && 1 > minutes ? e(".minutes", o).parent().addClass("hide") : e(".minutes", o).parent().removeClass("hide"), 1 > days && 1 > hours && 1 > minutes && 1 > seconds ? e(".seconds", o).parent().addClass("hide") : e(".seconds", o).parent().removeClass("hide"), "on" == a.format && (hours = String(hours).length >= 2 ? hours : "0" + hours, minutes = String(minutes).length >= 2 ? minutes : "0" + minutes, seconds = String(seconds).length >= 2 ? seconds : "0" + seconds), void(null != a.date || null != a.timeout ? (o.find(".days").text(days).parent().addClass("timeDays"), o.find(".hours").text(hours), o.find(".minutes").text(minutes), o.find(".seconds").text(seconds)) : (iYQ.debug && iYQ.CS.log("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00"), iYQ.Task.kill("countdown" + a.name, 1))))
        }

        var t, d = 1e3, a = {dom: e(this), timeout: null, name: "", date: null, format: null, shake: 1e3};
        n && e.extend(a, n), null != a.timeout && (d = a.timeout), a.dom.attr("id") && a.dom.attr("id").length > 0 ? a.id = a.dom.attr("id") : (a.id = a.name, a.dom.attr("id", a.id)), o(a.dom), iYQ.Task.kill("countdown" + a.name, 1), new iYQ.Task({
            name: "countdown" + a.name,
            task: function () {
                o(a.dom)
            },
            delay: 1e3,
            type: 1
        })
    }
}(jQuery);
;!function (e) {
    e.Jcrop = function (t, n) {
        function r(e) {
            return Math.round(e) + "px"
        }

        function o(e) {
            return J.baseClass + "-" + e
        }

        function a() {
            return e.fx.step.hasOwnProperty("backgroundColor")
        }

        function i(t) {
            var n = e(t).offset();
            return [n.left, n.top]
        }

        function s(e) {
            return [e.pageX - P[0], e.pageY - P[1]]
        }

        function c(t) {
            "object" != typeof t && (t = {}), J = e.extend(J, t), e.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (e, t) {
                "function" != typeof J[t] && (J[t] = function () {
                })
            })
        }

        function u(e, t, n) {
            if (P = i(L), pt.setCursor("move" === e ? e : e + "-resize"), "move" === e) return pt.activateHandlers(l(t), b, n);
            var r = lt.getFixed(), o = h(e), a = lt.getCorner(h(o));
            lt.setPressed(lt.getCorner(o)), lt.setCurrent(a), pt.activateHandlers(d(e, r), b, n)
        }

        function d(e, t) {
            return function (n) {
                if (J.aspectRatio) switch (e) {
                    case"e":
                        n[1] = t.y + 1;
                        break;
                    case"w":
                        n[1] = t.y + 1;
                        break;
                    case"n":
                        n[0] = t.x + 1;
                        break;
                    case"s":
                        n[0] = t.x + 1
                } else switch (e) {
                    case"e":
                        n[1] = t.y2;
                        break;
                    case"w":
                        n[1] = t.y2;
                        break;
                    case"n":
                        n[0] = t.x2;
                        break;
                    case"s":
                        n[0] = t.x2
                }
                lt.setCurrent(n), ft.update()
            }
        }

        function l(e) {
            var t = e;
            return gt.watchKeys(), function (e) {
                lt.moveOffset([e[0] - t[0], e[1] - t[1]]), t = e, ft.update()
            }
        }

        function h(e) {
            switch (e) {
                case"n":
                    return "sw";
                case"s":
                    return "nw";
                case"e":
                    return "nw";
                case"w":
                    return "ne";
                case"ne":
                    return "sw";
                case"nw":
                    return "se";
                case"se":
                    return "nw";
                case"sw":
                    return "ne"
            }
        }

        function f(e) {
            return function (t) {
                return J.disabled ? !1 : "move" !== e || J.allowMove ? (P = i(L), rt = !0, u(e, s(t)), t.stopPropagation(), t.preventDefault(), !1) : !1
            }
        }

        function p(e, t, n) {
            var r = e.width(), o = e.height();
            r > t && t > 0 && (r = t, o = t / e.width() * e.height()), o > n && n > 0 && (o = n, r = n / e.height() * e.width()), tt = e.width() / r, nt = e.height() / o, e.width(r).height(o)
        }

        function g(e) {
            return {
                x: parseInt(e.x * tt),
                y: parseInt(e.y * nt),
                x2: parseInt(e.x2 * tt),
                y2: parseInt(e.y2 * nt),
                w: parseInt(e.w * tt),
                h: parseInt(e.h * nt)
            }
        }

        function b() {
            var e = lt.getFixed();
            e.w > J.minSelect[0] && e.h > J.minSelect[1] ? (ft.enableHandles(), ft.done()) : ft.release(), pt.setCursor(J.allowSelect ? "crosshair" : "default")
        }

        function w(e) {
            if (J.disabled) return !1;
            if (!J.allowSelect) return !1;
            rt = !0, P = i(L), ft.disableHandles(), pt.setCursor("crosshair");
            var t = s(e);
            return lt.setPressed(t), ft.update(), pt.activateHandlers(v, b, "touch" === e.type.substring(0, 5)), gt.watchKeys(), e.stopPropagation(), e.preventDefault(), !1
        }

        function v(e) {
            lt.setCurrent(e), ft.update()
        }

        function y() {
            var t = e("<div></div>").addClass(o("tracker"));
            return R && t.css({opacity: 0, backgroundColor: "white"}), t
        }

        function m(e) {
            G.removeClass().addClass(o("holder")).addClass(e)
        }

        function x(e, t) {
            function n() {
                window.setTimeout(v, l)
            }

            var r = e[0] / tt, o = e[1] / nt, a = e[2] / tt, i = e[3] / nt;
            if (!ot) {
                var s = lt.flipCoords(r, o, a, i), c = lt.getFixed(), u = [c.x, c.y, c.x2, c.y2], d = u,
                    l = J.animationDelay, h = s[0] - u[0], f = s[1] - u[1], p = s[2] - u[2], g = s[3] - u[3], b = 0,
                    w = J.swingSpeed;
                r = d[0], o = d[1], a = d[2], i = d[3], ft.animMode(!0);
                var v = function () {
                    return function () {
                        b += (100 - b) / w, d[0] = Math.round(r + b / 100 * h), d[1] = Math.round(o + b / 100 * f), d[2] = Math.round(a + b / 100 * p), d[3] = Math.round(i + b / 100 * g), b >= 99.8 && (b = 100), 100 > b ? (S(d), n()) : (ft.done(), ft.animMode(!1), "function" == typeof t && t.call(bt))
                    }
                }();
                n()
            }
        }

        function C(e) {
            S([e[0] / tt, e[1] / nt, e[2] / tt, e[3] / nt]), J.onSelect.call(bt, g(lt.getFixed())), ft.enableHandles()
        }

        function S(e) {
            lt.setPressed([e[0], e[1]]), lt.setCurrent([e[2], e[3]]), ft.update()
        }

        function k() {
            return g(lt.getFixed())
        }

        function z() {
            return lt.getFixed()
        }

        function M(e) {
            c(e), B()
        }

        function O() {
            J.disabled = !0, ft.disableHandles(), ft.setCursor("default"), pt.setCursor("default")
        }

        function I() {
            J.disabled = !1, B()
        }

        function j() {
            ft.done(), pt.activateHandlers(null, null)
        }

        function F() {
            G.remove(), E.show(), E.css("visibility", "visible"), e(t).removeData("Jcrop")
        }

        function H(e, t) {
            ft.release(), O();
            var n = new Image;
            n.onload = function () {
                var r = n.width, o = n.height, a = J.boxWidth, i = J.boxHeight;
                L.width(r).height(o), L.attr("src", e), N.attr("src", e), p(L, a, i), X = L.width(), Y = L.height(), N.width(X).height(Y), st.width(X + 2 * it).height(Y + 2 * it), G.width(X).height(Y), ht.resize(X, Y), I(), "function" == typeof t && t.call(bt)
            }, n.src = e
        }

        function D(e, t, n) {
            var r = t || J.bgColor;
            J.bgFade && a() && J.fadeTime && !n ? e.animate({backgroundColor: r}, {
                queue: !1,
                duration: J.fadeTime
            }) : e.css("backgroundColor", r)
        }

        function B(e) {
            J.allowResize ? e ? ft.enableOnly() : ft.enableHandles() : ft.disableHandles(), pt.setCursor(J.allowSelect ? "crosshair" : "default"), ft.setCursor(J.allowMove ? "move" : "default"), J.hasOwnProperty("trueSize") && (tt = J.trueSize[0] / X, nt = J.trueSize[1] / Y), J.hasOwnProperty("setSelect") && (C(J.setSelect), ft.done(), delete J.setSelect), ht.refresh(), J.bgColor != ct && (D(J.shade ? ht.getShades() : G, J.shade ? J.shadeColor || J.bgColor : J.bgColor), ct = J.bgColor), ut != J.bgOpacity && (ut = J.bgOpacity, J.shade ? ht.refresh() : ft.setBgOpacity(ut)), Z = J.maxSize[0] || 0, $ = J.maxSize[1] || 0, _ = J.minSize[0] || 0, et = J.minSize[1] || 0, J.hasOwnProperty("outerImage") && (L.attr("src", J.outerImage), delete J.outerImage), ft.refresh()
        }

        var P, J = e.extend({}, e.Jcrop.defaults), A = navigator.userAgent.toLowerCase(), R = /msie/.test(A),
            T = /msie [1-6]\./.test(A);
        "object" != typeof t && (t = e(t)[0]), "object" != typeof n && (n = {}), c(n);
        var K = {border: "none", visibility: "visible", margin: 0, padding: 0, position: "absolute", top: 0, left: 0},
            E = e(t), W = !0;
        if ("IMG" == t.tagName) {
            if (0 != E[0].width && 0 != E[0].height) E.width(E[0].width), E.height(E[0].height); else {
                var q = new Image;
                q.src = E[0].src, E.width(q.width), E.height(q.height)
            }
            var L = E.clone().removeAttr("id").css(K).show();
            L.width(E.width()), L.height(E.height()), E.after(L).hide()
        } else L = E.css(K).show(), W = !1, null === J.shade && (J.shade = !0);
        p(L, J.boxWidth, J.boxHeight);
        var X = L.width(), Y = L.height(), G = e("<div />").width(X).height(Y).addClass(o("holder")).css({
            position: "relative",
            backgroundColor: J.bgColor
        }).insertAfter(E).append(L);
        J.addClass && G.addClass(J.addClass);
        var N = e("<div />"),
            V = e("<div />").width("100%").height("100%").css({zIndex: 310, position: "absolute", overflow: "hidden"}),
            Q = e("<div />").width("100%").height("100%").css({zIndex: 320}),
            U = e('<div id="small" />').css({position: "absolute", zIndex: 600}).dblclick(function () {
                var e = lt.getFixed();
                J.onDblClick.call(bt, e)
            }).insertBefore(L).append(V, Q);
        W && (N = e("<img />").attr("src", L.attr("src")).css(K).width(X).height(Y), V.append(N));
        var Z, $, _, et, tt, nt, rt, ot, at, it = J.boundary, st = y().width(X + 2 * it).height(Y + 2 * it).css({
            position: "absolute",
            top: r(-it),
            left: r(-it),
            zIndex: 290
        }).mousedown(w), ct = J.bgColor, ut = J.bgOpacity;
        P = i(L);
        var dt = function () {
            function e() {
                var e, t = {}, n = ["touchstart", "touchmove", "touchend"], r = document.createElement("div");
                try {
                    for (e = 0; e < n.length; e++) {
                        var o = n[e];
                        o = "on" + o;
                        var a = o in r;
                        a || (r.setAttribute(o, "return;"), a = "function" == typeof r[o]), t[n[e]] = a
                    }
                    return t.touchstart && t.touchend && t.touchmove
                } catch (i) {
                    return !1
                }
            }

            function t() {
                return J.touchSupport === !0 || J.touchSupport === !1 ? J.touchSupport : e()
            }

            return {
                createDragger: function (e) {
                    return function (t) {
                        return J.disabled ? !1 : "move" !== e || J.allowMove ? (P = i(L), rt = !0, u(e, s(dt.cfilter(t)), !0), t.stopPropagation(), t.preventDefault(), !1) : !1
                    }
                }, newSelection: function (e) {
                    return w(dt.cfilter(e))
                }, cfilter: function (e) {
                    return e.pageX = e.originalEvent.changedTouches[0].pageX, e.pageY = e.originalEvent.changedTouches[0].pageY, e
                }, isSupported: e, support: t()
            }
        }(), lt = function () {
            function e(e) {
                e = i(e), p = h = e[0], g = f = e[1]
            }

            function t(e) {
                e = i(e), d = e[0] - p, l = e[1] - g, p = e[0], g = e[1]
            }

            function n() {
                return [d, l]
            }

            function r(e) {
                var t = e[0], n = e[1];
                0 > h + t && (t -= t + h), 0 > f + n && (n -= n + f), g + n > Y && (n += Y - (g + n)), p + t > X && (t += X - (p + t)), h += t, p += t, f += n, g += n
            }

            function o(e) {
                var t = a();
                switch (e) {
                    case"ne":
                        return [t.x2, t.y];
                    case"nw":
                        return [t.x, t.y];
                    case"se":
                        return [t.x2, t.y2];
                    case"sw":
                        return [t.x, t.y2]
                }
            }

            function a() {
                if (!J.aspectRatio) return c();
                var e, t, n, r, o = J.aspectRatio, a = J.minSize[0] / tt, i = (J.minSize[1] / nt, J.maxSize[0] / tt),
                    d = J.maxSize[1] / nt, l = p - h, b = g - f, w = Math.abs(l), v = Math.abs(b), y = w / v;
                return 0 === i && (i = 10 * X), 0 === d && (d = 10 * Y), o > y ? (t = g, n = v * o, e = 0 > l ? h - n : n + h, 0 > e ? (e = 0, r = Math.abs((e - h) / o), t = 0 > b ? f - r : r + f) : e > X && (e = X, r = Math.abs((e - h) / o), t = 0 > b ? f - r : r + f)) : (e = p, r = w / o, t = 0 > b ? f - r : f + r, 0 > t ? (t = 0, n = Math.abs((t - f) * o), e = 0 > l ? h - n : n + h) : t > Y && (t = Y, n = Math.abs(t - f) * o, e = 0 > l ? h - n : n + h)), e > h ? (a > e - h ? e = h + a : e - h > i && (e = h + i), t = t > f ? f + (e - h) / o : f - (e - h) / o) : h > e && (a > h - e ? e = h - a : h - e > i && (e = h - i), t = t > f ? f + (h - e) / o : f - (h - e) / o), 0 > e ? (h -= e, e = 0) : e > X && (h -= e - X, e = X), 0 > t ? (f -= t, t = 0) : t > Y && (f -= t - Y, t = Y), u(s(h, f, e, t))
            }

            function i(e) {
                return e[0] < 0 && (e[0] = 0), e[1] < 0 && (e[1] = 0), e[0] > X && (e[0] = X), e[1] > Y && (e[1] = Y), [Math.round(e[0]), Math.round(e[1])]
            }

            function s(e, t, n, r) {
                var o = e, a = n, i = t, s = r;
                return e > n && (o = n, a = e), t > r && (i = r, s = t), [o, i, a, s]
            }

            function c() {
                var e, t = p - h, n = g - f;
                return Z && Math.abs(t) > Z && (p = t > 0 ? h + Z : h - Z), $ && Math.abs(n) > $ && (g = n > 0 ? f + $ : f - $), et / nt && Math.abs(n) < et / nt && (g = n > 0 ? f + et / nt : f - et / nt), _ / tt && Math.abs(t) < _ / tt && (p = t > 0 ? h + _ / tt : h - _ / tt), 0 > h && (p -= h, h -= h), 0 > f && (g -= f, f -= f), 0 > p && (h -= p, p -= p), 0 > g && (f -= g, g -= g), p > X && (e = p - X, h -= e, p -= e), g > Y && (e = g - Y, f -= e, g -= e), h > X && (e = h - Y, g -= e, f -= e), f > Y && (e = f - Y, g -= e, f -= e), u(s(h, f, p, g))
            }

            function u(e) {
                return {x: e[0], y: e[1], x2: e[2], y2: e[3], w: e[2] - e[0], h: e[3] - e[1]}
            }

            var d, l, h = 0, f = 0, p = 0, g = 0;
            return {flipCoords: s, setPressed: e, setCurrent: t, getOffset: n, moveOffset: r, getCorner: o, getFixed: a}
        }(), ht = function () {
            function t(e, t) {
                p.left.css({height: r(t)}), p.right.css({height: r(t)})
            }

            function n() {
                return o(lt.getFixed())
            }

            function o(e) {
                p.top.css({left: r(e.x), width: r(e.w), height: r(e.y), top: 0}), p.bottom.css({
                    top: r(e.y2),
                    left: r(e.x),
                    width: r(e.w),
                    height: r(Y - e.y2)
                }), p.right.css({left: r(e.x2), width: r(X - e.x2), top: 0}), p.left.css({
                    width: r(e.x),
                    top: 0,
                    left: 0
                })
            }

            function a() {
                return e("<div />").css({position: "absolute", backgroundColor: J.shadeColor || J.bgColor}).appendTo(f)
            }

            function i() {
                h || (h = !0, f.insertBefore(L), n(), ft.setBgOpacity(1, 0, 1), N.hide(), s(J.shadeColor || J.bgColor, 1), ft.isAwake() ? u(J.bgOpacity, 1) : u(1, 1))
            }

            function s(e, t) {
                D(l(), e, t)
            }

            function c() {
                h && (f.remove(), N.show(), h = !1, ft.isAwake() ? ft.setBgOpacity(J.bgOpacity, 1, 1) : (ft.setBgOpacity(1, 1, 1), ft.disableHandles()), D(G, 0, 1))
            }

            function u(e, t) {
                h && (J.bgFade && !t ? f.animate({opacity: 1 - e}, {
                    queue: !1,
                    duration: J.fadeTime
                }) : f.css({opacity: 1 - e}))
            }

            function d() {
                J.shade ? i() : c(), ft.isAwake() && u(J.bgOpacity)
            }

            function l() {
                return f.children()
            }

            var h = !1, f = e('<div id="opa" />').css({
                position: "absolute",
                zIndex: 240,
                opacity: 0,
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }), p = {top: a(), left: a().height(Y), right: a().height(Y), bottom: a()};
            return {
                update: n,
                updateRaw: o,
                getShades: l,
                setBgColor: s,
                enable: i,
                disable: c,
                resize: t,
                refresh: d,
                opacity: u
            }
        }(), ft = function () {
            function t(t) {
                var n = e("<div />").css({position: "absolute", opacity: J.borderOpacity}).addClass(o(t));
                return V.append(n), n
            }

            function n(t, n) {
                var r = e("<div />").mousedown(f(t)).css({
                    cursor: t + "-resize",
                    position: "absolute",
                    zIndex: n
                }).addClass("ord-" + t);
                return dt.support && r.bind("touchstart.jcrop", dt.createDragger(t)), Q.append(r), r
            }

            function a(t, n) {
                var r = e("<div />").mousedown(f(t)).css({
                    cursor: t + "-resize",
                    position: "absolute",
                    zIndex: n
                }).addClass("ord2-" + t);
                return dt.support && r.bind("touchstart.jcrop", dt.createDragger(t)), Q.append(r), r
            }

            function i(e) {
                var t = J.handleSize, r = n(e, I++).css({opacity: J.handleOpacity}).addClass(o("handle"));
                return t && r.width(t).height(t), r
            }

            function s(e) {
                return a(e, I++).addClass("jcrop-dragbar")
            }

            function c(e) {
                var t;
                for (t = 0; t < e.length; t++) H[e[t]] = s(e[t])
            }

            function u(e) {
                var n, r;
                for (r = 0; r < e.length; r++) {
                    switch (e[r]) {
                        case"n":
                            n = "hline";
                            break;
                        case"s":
                            n = "hline bottom";
                            break;
                        case"e":
                            n = "vline right";
                            break;
                        case"w":
                            n = "vline"
                    }
                    j[e[r]] = t(n)
                }
            }

            function d(e) {
                var t;
                for (t = 0; t < e.length; t++) F[e[t]] = i(e[t])
            }

            function l(e, t) {
                J.shade || N.css({top: r(-t), left: r(-e)}), U.css({top: r(t), left: r(e)})
            }

            function h(e, t) {
                U.width(Math.round(e)).height(Math.round(t))
            }

            function p() {
                var e = lt.getFixed();
                lt.setPressed([e.x, e.y]), lt.setCurrent([e.x2, e.y2]), b()
            }

            function b(e) {
                return O ? w(e) : void 0
            }

            function w(e) {
                var t = lt.getFixed();
                h(t.w, t.h), l(t.x, t.y), J.shade && ht.updateRaw(t), O || m(), e ? J.onSelect.call(bt, g(t)) : J.onChange.call(bt, g(t))
            }

            function v(e, t, n) {
                (O || t) && (J.bgFade && !n ? L.animate({opacity: e}, {
                    queue: !1,
                    duration: J.fadeTime
                }) : L.css("opacity", e))
            }

            function m() {
                U.show(), J.shade ? ht.opacity(ut) : v(ut, !0), O = !0
            }

            function x() {
                k(), U.hide(), J.shade ? ht.opacity(1) : v(1), O = !1, J.onRelease.call(bt)
            }

            function C() {
                D && Q.show()
            }

            function S() {
                return D = !0, J.allowResize ? (Q.show(), !0) : void 0
            }

            function k() {
                D = !1, Q.hide()
            }

            function z(e) {
                e ? (ot = !0, k()) : (ot = !1, S())
            }

            function M() {
                z(!1), p()
            }

            var O, I = 370, j = {}, F = {}, H = {}, D = !1;
            e.isArray(J.createDragbars) && c(J.createDragbars), e.isArray(J.createHandles) && d(J.createHandles), J.drawBorders && e.isArray(J.createBorders) && u(J.createBorders), e(document).bind("touchstart.jcrop-ios", function (t) {
                e(t.currentTarget).hasClass("jcrop-tracker") && t.stopPropagation()
            });
            var B = y().mousedown(f("move")).css({cursor: "move", position: "absolute", zIndex: 360});
            return dt.support && B.bind("touchstart.jcrop", dt.createDragger("move")), V.append(B), k(), {
                updateVisible: b,
                update: w,
                release: x,
                refresh: p,
                isAwake: function () {
                    return O
                },
                setCursor: function (e) {
                    B.css("cursor", e)
                },
                enableHandles: S,
                enableOnly: function () {
                    D = !0
                },
                showHandles: C,
                disableHandles: k,
                animMode: z,
                setBgOpacity: v,
                done: M
            }
        }(), pt = function () {
            function t(t) {
                st.css({zIndex: 450}), t ? e(document).bind("touchmove.jcrop", i).bind("touchend.jcrop", c) : h && e(document).bind("mousemove.jcrop", r).bind("mouseup.jcrop", o)
            }

            function n() {
                st.css({zIndex: 290}), e(document).unbind(".jcrop")
            }

            function r(e) {
                return d(s(e)), !1
            }

            function o(e) {
                return e.preventDefault(), e.stopPropagation(), rt && (rt = !1, l(s(e)), ft.isAwake() && J.onSelect.call(bt, g(lt.getFixed())), n(), d = function () {
                }, l = function () {
                }), !1
            }

            function a(e, n, r) {
                return rt = !0, d = e, l = n, t(r), !1
            }

            function i(e) {
                return d(s(dt.cfilter(e))), !1
            }

            function c(e) {
                return o(dt.cfilter(e))
            }

            function u(e) {
                st.css("cursor", e)
            }

            var d = function () {
            }, l = function () {
            }, h = J.trackDocument;
            return h || st.mousemove(r).mouseup(o).mouseout(o), L.before(st), {activateHandlers: a, setCursor: u}
        }(), gt = function () {
            function t() {
                J.keySupport && (a.show(), a.focus())
            }

            function n() {
                a.hide()
            }

            function r(e, t, n) {
                J.allowMove && (lt.moveOffset([t, n]), ft.updateVisible(!0)), e.preventDefault(), e.stopPropagation()
            }

            function o(e) {
                if (e.ctrlKey || e.metaKey) return !0;
                at = e.shiftKey ? !0 : !1;
                var t = at ? 10 : 1;
                switch (e.keyCode) {
                    case 37:
                        r(e, -t, 0);
                        break;
                    case 39:
                        r(e, t, 0);
                        break;
                    case 38:
                        r(e, 0, -t);
                        break;
                    case 40:
                        r(e, 0, t);
                        break;
                    case 27:
                        J.allowSelect && ft.release();
                        break;
                    case 9:
                        return !0
                }
                return !1
            }

            var a = e('<input type="radio" />').css({
                position: "fixed",
                left: "-120px",
                width: "12px"
            }).addClass("jcrop-keymgr"), i = e("<div />").css({position: "absolute", overflow: "hidden"}).append(a);
            return J.keySupport && (a.keydown(o).blur(n), T || !J.fixedSupport ? (a.css({
                position: "absolute",
                left: "-20px"
            }), i.append(a).insertBefore(L)) : a.insertBefore(L)), {watchKeys: t}
        }();
        dt.support && st.bind("touchstart.jcrop", dt.newSelection), Q.hide(), B(!0);
        var bt = {
            setImage: H,
            animateTo: x,
            setSelect: C,
            setOptions: M,
            tellSelect: k,
            tellScaled: z,
            setClass: m,
            disable: O,
            enable: I,
            cancel: j,
            release: ft.release,
            destroy: F,
            focus: gt.watchKeys,
            getBounds: function () {
                return [X * tt, Y * nt]
            },
            getWidgetSize: function () {
                return [X, Y]
            },
            getScaleFactor: function () {
                return [tt, nt]
            },
            getOptions: function () {
                return J
            },
            ui: {holder: G, selection: U}
        };
        return R && G.bind("selectstart", function () {
            return !1
        }), E.data("Jcrop", bt), bt
    }, e.fn.Jcrop = function (t, n) {
        var r;
        return this.each(function () {
            if (e(this).data("Jcrop")) {
                if ("api" === t) return e(this).data("Jcrop");
                e(this).data("Jcrop").setOptions(t)
            } else "IMG" == this.tagName ? e.Jcrop.Loader(this, function () {
                e(this).css({
                    display: "block",
                    visibility: "hidden"
                }), r = e.Jcrop(this, t), e.isFunction(n) && n.call(r)
            }) : (e(this).css({
                display: "block",
                visibility: "hidden"
            }), r = e.Jcrop(this, t), e.isFunction(n) && n.call(r))
        }), this
    }, e.Jcrop.Loader = function (t, n, r) {
        function o() {
            i.complete ? (a.unbind(".jcloader"), e.isFunction(n) && n.call(i)) : window.setTimeout(o, 50)
        }

        var a = e(t), i = a[0];
        a.bind("load.jcloader", o).bind("error.jcloader", function () {
            a.unbind(".jcloader"), e.isFunction(r) && r.call(i)
        }), i.complete && e.isFunction(n) && (a.unbind(".jcloader"), n.call(i))
    }, e.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: .6,
        bgFade: !1,
        borderOpacity: .4,
        handleOpacity: .5,
        handleSize: null,
        aspectRatio: 0,
        keySupport: !1,
        createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 0,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function () {
        },
        onSelect: function () {
        },
        onDblClick: function () {
        },
        onRelease: function () {
        }
    }
}(jQuery);
;!function (e) {
    "use strict";
    var i = function (i, t) {
        if (this.$element = e(i), this.type = this.$element.data("uploadtype") || (this.$element.find(".thumbnail").length > 0 ? "image" : "file"), this.maxWidth = this.$element.data("maxWidth") || t.maxWidth || 1e3, this.maxHeight = this.$element.data("maxHeight") || t.maxHeight || 1e3, this.maxSize = this.$element.data("maxSize") || t.maxSize || 102400, this.$input = this.$element.find(":file"), 0 !== this.$input.length) {
            this.name = this.$input.attr("name") || t.name, this.title = this.$input.attr("title") || t.title, this.callback = t.callback, this.$hidden = this.$element.find('input[type=hidden][name="' + this.name + '"]'), 0 === this.$hidden.length && (this.$hidden = e('<input type="hidden"/>'), this.$element.prepend(this.$hidden)), this.$input.attr("title", this.title), this.$preview = this.$element.find(".fileupload-preview");
            var a = this.$preview.css("height");
            "inline" != this.$preview.css("display") && "0px" != a && "none" != a && this.$preview.css("line-height", a), this.original = {
                exists: this.$element.hasClass("fileupload-exists"),
                preview: this.$preview.html(),
                hiddenVal: this.$hidden.val()
            }, this.$remove = this.$element.find('[data-dismiss="fileupload"]'), this.$element.find('[data-trigger="fileupload"]').on("click.fileupload", e.proxy(this.trigger, this)), this.listen()
        }
    };
    i.prototype = {
        listen: function () {
            this.$input.on("change.fileupload", e.proxy(this.change, this)), e(this.$input[0].form).on("reset.fileupload", e.proxy(this.reset, this)), this.$remove && this.$remove.on("click.fileupload", e.proxy(this.clear, this))
        }, change: function (i, t) {
            if ("clear" !== t) {
                var a = void 0 !== i.target.files ? i.target.files[0] : i.target.value ? {name: i.target.value.replace(/^.+\\/, "")} : null;
                if (!a) return void this.clear();
                if (e.blockUI({message: '<i class="fa fa-spinner fa-spin"></i> \u56fe\u7247\u52a0\u8f7d\u4e2d...'}), this.$hidden.val(""), this.$hidden.attr("name", ""), this.$input.attr("name", this.name), this.callback && "function" === e.type(this.callback)) {
                    if ("image" === this.type && ("undefined" != typeof a.type ? a.type.match("image.*") : a.name.match(/\.(gif|png|jpe?g)$/i)) && "undefined" != typeof FileReader) {
                        var s = new FileReader, l = this, n = this.$element;
                        s.onload = function (e) {
                            var i = new Image;
                            i.src = e.target.result, i.onload = function () {
                                this.width < l.maxWidth && this.height < l.maxHeight && a.size < l.maxSize ? (l.curFile = a, l.ImageData = e.target.result, l.callback(l)) : iYQ.iMSG.error("\u64cd\u4f5c\u5931\u8d25", "\u6240\u9009\u6587\u4ef6\u5c3a\u5bf8\u8fc7\u5927\uff0c\u8bf7\u9009\u62e9\u957f\u5bbd\u5c0f\u4e8e" + l.maxWidth + "px X " + l.maxHeight + "px \u7684\u6587\u4ef6\u3002")
                            }
                        }, s.readAsDataURL(a)
                    } else iYQ.iMSG.error("\u64cd\u4f5c\u5931\u8d25", "\u8bf7\u786e\u5b9a\u6240\u9009\u62e9\u7684\u662f\u5426\u4e3a\u56fe\u7247\u6587\u4ef6\uff01");
                    return !1
                }
                if ("image" === this.type && this.$preview.length > 0 && ("undefined" != typeof a.type ? a.type.match("image.*") : a.name.match(/\.(gif|png|jpe?g)$/i)) && "undefined" != typeof FileReader) {
                    var s = new FileReader, h = this.$preview, d = h.attr("data-class"), n = this.$element;
                    s.onload = function (e) {
                        h.html('<img src="' + e.target.result + '" class="' + d + '" ' + ("none" != h.css("max-height") ? 'style="max-height: ' + h.css("max-height") + ';"' : "") + " />"), n.addClass("fileupload-exists").removeClass("fileupload-new")
                    }, s.readAsDataURL(a)
                } else this.$preview.text(a.name), this.$element.addClass("fileupload-exists").removeClass("fileupload-new")
            }
        }, clear: function (e) {
            if (this.$hidden.val(""), this.$hidden.attr("name", this.name), this.$input.attr("name", ""), navigator.userAgent.match(/msie/i)) {
                var i = this.$input.clone(!0);
                this.$input.after(i), this.$input.remove(), this.$input = i
            } else this.$input.val("");
            this.$preview.html(""), this.$element.addClass("fileupload-new").removeClass("fileupload-exists"), e && (this.$input.trigger("change", ["clear"]), e.preventDefault())
        }, reset: function () {
            this.clear(), this.$hidden.val(this.original.hiddenVal), this.$preview.html(this.original.preview), this.original.exists ? this.$element.addClass("fileupload-exists").removeClass("fileupload-new") : this.$element.addClass("fileupload-new").removeClass("fileupload-exists")
        }, trigger: function (e) {
            this.$input.trigger("click"), e.preventDefault()
        }
    }, e.fn.fileupload = function (t) {
        return this.each(function () {
            var a = e(this), s = a.data("fileupload");
            s || a.data("fileupload", s = new i(this, t)), "string" == typeof t && s[t]()
        })
    }, e.fn.fileupload.Constructor = i, e(document).on("click.fileupload.data-api", '[data-provides="fileupload"]', function (i) {
        var t = e(this);
        if (!t.data("fileupload")) {
            t.fileupload(t.data());
            var a = e(i.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');
            a.length > 0 && (a.trigger("click.fileupload"), i.preventDefault())
        }
    })
}(window.jQuery);
;(function () {
    var t = [].slice;
    !function (e, s) {
        "use strict";
        var o;
        return o = function () {
            function t(t, s) {
                null == s && (s = {}), this.$element = e(t), this.options = e.extend({}, e.fn.bootstrapSwitch.defaults, s, {
                    state: this.$element.is(":checked"),
                    size: this.$element.data("size"),
                    animate: this.$element.data("animate"),
                    disabled: this.$element.is(":disabled"),
                    readonly: this.$element.is("[readonly]"),
                    indeterminate: this.$element.data("indeterminate"),
                    onColor: this.$element.data("on-color"),
                    offColor: this.$element.data("off-color"),
                    onText: this.$element.data("on-text"),
                    offText: this.$element.data("off-text"),
                    labelText: this.$element.data("label-text"),
                    baseClass: this.$element.data("base-class"),
                    wrapperClass: this.$element.data("wrapper-class")
                }), this.$wrapper = e("<div>", {
                    "class": function (t) {
                        return function () {
                            var e;
                            return e = ["" + t.options.baseClass].concat(t._getClasses(t.options.wrapperClass)), e.push(t.options.state ? "" + t.options.baseClass + "-on" : "" + t.options.baseClass + "-off"), null != t.options.size && e.push("" + t.options.baseClass + "-" + t.options.size), t.options.animate && e.push("" + t.options.baseClass + "-animate"), t.options.disabled && e.push("" + t.options.baseClass + "-disabled"), t.options.readonly && e.push("" + t.options.baseClass + "-readonly"), t.options.indeterminate && e.push("" + t.options.baseClass + "-indeterminate"), t.$element.attr("id") && e.push("" + t.options.baseClass + "-id-" + t.$element.attr("id")), e.join(" ")
                        }
                    }(this)()
                }), this.$container = e("<div>", {"class": "" + this.options.baseClass + "-container"}), this.$on = e("<span>", {
                    html: this.options.onText,
                    "class": "" + this.options.baseClass + "-handle-on " + this.options.baseClass + "-" + this.options.onColor
                }), this.$off = e("<span>", {
                    html: this.options.offText,
                    "class": "" + this.options.baseClass + "-handle-off " + this.options.baseClass + "-" + this.options.offColor
                }), this.$label = e("<label>", {
                    "for": this.$element.attr("id"),
                    html: this.options.labelText,
                    "class": "" + this.options.baseClass + "-label"
                }), this.options.indeterminate && this.$element.prop("indeterminate", !0), this.$element.on("init.bootstrapSwitch", function (e) {
                    return function () {
                        return e.options.onInit.apply(t, arguments)
                    }
                }(this)), this.$element.on("switchChange.bootstrapSwitch", function (e) {
                    return function () {
                        return e.options.onSwitchChange.apply(t, arguments)
                    }
                }(this)), this.$container = this.$element.wrap(this.$container).parent(), this.$wrapper = this.$container.wrap(this.$wrapper).parent(), this.$element.before(this.$on).before(this.$label).before(this.$off).trigger("init.bootstrapSwitch"), this._elementHandlers(), this._handleHandlers(), this._labelHandlers(), this._formHandler()
            }

            return t.prototype._constructor = t, t.prototype.state = function (t, e) {
                return "undefined" == typeof t ? this.options.state : this.options.disabled || this.options.readonly || this.options.indeterminate ? this.$element : (t = !!t, this.$element.prop("checked", t).trigger("change.bootstrapSwitch", e), this.$element)
            }, t.prototype.toggleState = function (t) {
                return this.options.disabled || this.options.readonly || this.options.indeterminate ? this.$element : this.$element.prop("checked", !this.options.state).trigger("change.bootstrapSwitch", t)
            }, t.prototype.size = function (t) {
                return "undefined" == typeof t ? this.options.size : (null != this.options.size && this.$wrapper.removeClass("" + this.options.baseClass + "-" + this.options.size), t && this.$wrapper.addClass("" + this.options.baseClass + "-" + t), this.options.size = t, this.$element)
            }, t.prototype.animate = function (t) {
                return "undefined" == typeof t ? this.options.animate : (t = !!t, this.$wrapper[t ? "addClass" : "removeClass"]("" + this.options.baseClass + "-animate"), this.options.animate = t, this.$element)
            }, t.prototype.disabled = function (t) {
                return "undefined" == typeof t ? this.options.disabled : (t = !!t, this.$wrapper[t ? "addClass" : "removeClass"]("" + this.options.baseClass + "-disabled"), this.$element.prop("disabled", t), this.options.disabled = t, this.$element)
            }, t.prototype.toggleDisabled = function () {
                return this.$element.prop("disabled", !this.options.disabled), this.$wrapper.toggleClass("" + this.options.baseClass + "-disabled"), this.options.disabled = !this.options.disabled, this.$element
            }, t.prototype.readonly = function (t) {
                return "undefined" == typeof t ? this.options.readonly : (t = !!t, this.$wrapper[t ? "addClass" : "removeClass"]("" + this.options.baseClass + "-readonly"), this.$element.prop("readonly", t), this.options.readonly = t, this.$element)
            }, t.prototype.toggleReadonly = function () {
                return this.$element.prop("readonly", !this.options.readonly), this.$wrapper.toggleClass("" + this.options.baseClass + "-readonly"), this.options.readonly = !this.options.readonly, this.$element
            }, t.prototype.indeterminate = function (t) {
                return "undefined" == typeof t ? this.options.indeterminate : (t = !!t, this.$wrapper[t ? "addClass" : "removeClass"]("" + this.options.baseClass + "-indeterminate"), this.$element.prop("indeterminate", t), this.options.indeterminate = t, this.$element)
            }, t.prototype.toggleIndeterminate = function () {
                return this.$element.prop("indeterminate", !this.options.indeterminate), this.$wrapper.toggleClass("" + this.options.baseClass + "-indeterminate"), this.options.indeterminate = !this.options.indeterminate, this.$element
            }, t.prototype.onColor = function (t) {
                var e;
                return e = this.options.onColor, "undefined" == typeof t ? e : (null != e && this.$on.removeClass("" + this.options.baseClass + "-" + e), this.$on.addClass("" + this.options.baseClass + "-" + t), this.options.onColor = t, this.$element)
            }, t.prototype.offColor = function (t) {
                var e;
                return e = this.options.offColor, "undefined" == typeof t ? e : (null != e && this.$off.removeClass("" + this.options.baseClass + "-" + e), this.$off.addClass("" + this.options.baseClass + "-" + t), this.options.offColor = t, this.$element)
            }, t.prototype.onText = function (t) {
                return "undefined" == typeof t ? this.options.onText : (this.$on.html(t), this.options.onText = t, this.$element)
            }, t.prototype.offText = function (t) {
                return "undefined" == typeof t ? this.options.offText : (this.$off.html(t), this.options.offText = t, this.$element)
            }, t.prototype.labelText = function (t) {
                return "undefined" == typeof t ? this.options.labelText : (this.$label.html(t), this.options.labelText = t, this.$element)
            }, t.prototype.baseClass = function () {
                return this.options.baseClass
            }, t.prototype.wrapperClass = function (t) {
                return "undefined" == typeof t ? this.options.wrapperClass : (t || (t = e.fn.bootstrapSwitch.defaults.wrapperClass), this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")), this.$wrapper.addClass(this._getClasses(t).join(" ")), this.options.wrapperClass = t, this.$element)
            }, t.prototype.onInit = function (t) {
                return "undefined" == typeof t ? this.options.onInit : (t || (t = e.fn.bootstrapSwitch.defaults.onInit), this.options.onInit = t, this.$element)
            }, t.prototype.onSwitchChange = function (t) {
                return "undefined" == typeof t ? this.options.onSwitchChange : (t || (t = e.fn.bootstrapSwitch.defaults.onSwitchChange), this.options.onSwitchChange = t, this.$element)
            }, t.prototype.destroy = function () {
                var t;
                return t = this.$element.closest("form"), t.length && t.off("reset.bootstrapSwitch").removeData("bootstrap-switch"), this.$container.children().not(this.$element).remove(), this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"), this.$element
            }, t.prototype._elementHandlers = function () {
                return this.$element.on({
                    "change.bootstrapSwitch": function (t) {
                        return function (s, o) {
                            var n;
                            return s.preventDefault(), s.stopPropagation(), s.stopImmediatePropagation(), n = t.$element.is(":checked"), n !== t.options.state ? (t.options.state = n, t.$wrapper.removeClass(n ? "" + t.options.baseClass + "-off" : "" + t.options.baseClass + "-on").addClass(n ? "" + t.options.baseClass + "-on" : "" + t.options.baseClass + "-off"), o ? void 0 : (t.$element.is(":radio") && e("[name='" + t.$element.attr("name") + "']").not(t.$element).prop("checked", !1).trigger("change.bootstrapSwitch", !0), t.$element.trigger("switchChange.bootstrapSwitch", [n]))) : void 0
                        }
                    }(this), "focus.bootstrapSwitch": function (t) {
                        return function (e) {
                            return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), t.$wrapper.addClass("" + t.options.baseClass + "-focused")
                        }
                    }(this), "blur.bootstrapSwitch": function (t) {
                        return function (e) {
                            return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), t.$wrapper.removeClass("" + t.options.baseClass + "-focused")
                        }
                    }(this), "keydown.bootstrapSwitch": function (t) {
                        return function (e) {
                            if (e.which && !t.options.disabled && !t.options.readonly && !t.options.indeterminate) switch (e.which) {
                                case 32:
                                    return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), t.toggleState();
                                case 37:
                                    return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), t.state(!1);
                                case 39:
                                    return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), t.state(!0)
                            }
                        }
                    }(this)
                })
            }, t.prototype._handleHandlers = function () {
                return this.$on.on("click.bootstrapSwitch", function (t) {
                    return function () {
                        return t.state(!1), t.$element.trigger("focus.bootstrapSwitch")
                    }
                }(this)), this.$off.on("click.bootstrapSwitch", function (t) {
                    return function () {
                        return t.state(!0), t.$element.trigger("focus.bootstrapSwitch")
                    }
                }(this))
            }, t.prototype._labelHandlers = function () {
                return this.$label.on({
                    "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": function (t) {
                        return function (e) {
                            var s, o, n, i;
                            if (t.drag) return e.preventDefault(), o = e.pageX || e.originalEvent.touches[0].pageX, n = (o - t.$wrapper.offset().left) / t.$wrapper.width() * 100, s = 25, i = 75, s > n ? n = s : n > i && (n = i), t.$container.css("margin-left", "" + (n - i) + "%"), t.$element.trigger("focus.bootstrapSwitch")
                        }
                    }(this), "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": function (t) {
                        return function (e) {
                            return t.drag || t.options.disabled || t.options.readonly || t.options.indeterminate ? void 0 : (e.preventDefault(), t.drag = !0, t.options.animate && t.$wrapper.removeClass("" + t.options.baseClass + "-animate"), t.$element.trigger("focus.bootstrapSwitch"))
                        }
                    }(this), "mouseup.bootstrapSwitch touchend.bootstrapSwitch": function (t) {
                        return function (e) {
                            return t.drag ? (e.preventDefault(), t.drag = !1, t.$element.prop("checked", parseInt(t.$container.css("margin-left"), 10) > -(t.$container.width() / 6)).trigger("change.bootstrapSwitch"), t.$container.css("margin-left", ""), t.options.animate ? t.$wrapper.addClass("" + t.options.baseClass + "-animate") : void 0) : void 0
                        }
                    }(this), "mouseleave.bootstrapSwitch": function (t) {
                        return function () {
                            return t.$label.trigger("mouseup.bootstrapSwitch")
                        }
                    }(this), "click.bootstrapSwitch": function (t) {
                        return function () {
                            return t.toggleState(), t.$element.trigger("focus.bootstrapSwitch")
                        }
                    }(this)
                })
            }, t.prototype._formHandler = function () {
                var t;
                return t = this.$element.closest("form"), t.data("bootstrap-switch") ? void 0 : t.on("reset.bootstrapSwitch", function () {
                    return s.setTimeout(function () {
                        return t.find("input").filter(function () {
                            return e(this).data("bootstrap-switch")
                        }).each(function () {
                            return e(this).bootstrapSwitch("state", this.checked)
                        })
                    }, 1)
                }).data("bootstrap-switch", !0)
            }, t.prototype._getClasses = function (t) {
                var s, o, n, i;
                if (!e.isArray(t)) return ["" + this.options.baseClass + "-" + t];
                for (o = [], n = 0, i = t.length; i > n; n++) s = t[n], o.push("" + this.options.baseClass + "-" + s);
                return o
            }, t
        }(), e.fn.bootstrapSwitch = function () {
            var s, n, i;
            return n = arguments[0], s = 2 <= arguments.length ? t.call(arguments, 1) : [], i = this, this.each(function () {
                var t, a;
                return t = e(this), a = t.data("bootstrap-switch"), a || t.data("bootstrap-switch", a = new o(this, n)), "string" == typeof n ? i = a[n].apply(a, s) : void 0
            }), i
        }, e.fn.bootstrapSwitch.Constructor = o, e.fn.bootstrapSwitch.defaults = {
            state: !0,
            size: null,
            animate: !0,
            disabled: !1,
            readonly: !1,
            indeterminate: !1,
            onColor: "primary",
            offColor: "default",
            onText: "ON",
            offText: "OFF",
            labelText: "&nbsp;",
            baseClass: "bootstrap-switch",
            wrapperClass: "wrapper",
            onInit: function () {
            },
            onSwitchChange: function () {
            }
        }
    }(window.jQuery, window)
}).call(this);
;!function (t) {
    "use strict";

    function e(t, e) {
        for (var i = 0; i < t.length; ++i) e(t[i], i)
    }

    function i(e, i) {
        this.$select = t(e), this.$select.attr("data-placeholder") && (i.nonSelectedText = this.$select.data("placeholder")), this.options = this.mergeOptions(t.extend({}, i, this.$select.data())), this.originalOptions = this.$select.clone()[0].options, this.query = "", this.searchTimeout = null, this.lastToggledInput = null, this.options.multiple = "multiple" === this.$select.attr("multiple"), this.options.onChange = t.proxy(this.options.onChange, this), this.options.onSelectAll = t.proxy(this.options.onSelectAll, this), this.options.onDeselectAll = t.proxy(this.options.onDeselectAll, this), this.options.onDropdownShow = t.proxy(this.options.onDropdownShow, this), this.options.onDropdownHide = t.proxy(this.options.onDropdownHide, this), this.options.onDropdownShown = t.proxy(this.options.onDropdownShown, this), this.options.onDropdownHidden = t.proxy(this.options.onDropdownHidden, this), this.options.onInitialized = t.proxy(this.options.onInitialized, this), this.options.onFiltering = t.proxy(this.options.onFiltering, this), this.buildContainer(), this.buildButton(), this.buildDropdown(), this.buildSelectAll(), this.buildDropdownOptions(), this.buildFilter(), this.updateButtonText(), this.updateSelectAll(!0), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups(), this.options.disableIfEmpty && t("option", this.$select).length <= 0 && this.disable(), this.$select.wrap('<span class="hide-native-select">').after(this.$container), this.options.onInitialized(this.$select, this.$container)
    }

    "undefined" != typeof ko && ko.bindingHandlers && !ko.bindingHandlers.multiselect && (ko.bindingHandlers.multiselect = {
        after: ["options", "value", "selectedOptions", "enable", "disable"],
        init: function (e, i, s) {
            var l = t(e), o = ko.toJS(i());
            if (l.multiselect(o), s.has("options")) {
                var n = s.get("options");
                ko.isObservable(n) && ko.computed({
                    read: function () {
                        n(), setTimeout(function () {
                            var t = l.data("multiselect");
                            t && t.updateOriginalOptions(), l.multiselect("rebuild")
                        }, 1)
                    }, disposeWhenNodeIsRemoved: e
                })
            }
            if (s.has("value")) {
                var a = s.get("value");
                ko.isObservable(a) && ko.computed({
                    read: function () {
                        a(), setTimeout(function () {
                            l.multiselect("refresh")
                        }, 1)
                    }, disposeWhenNodeIsRemoved: e
                }).extend({rateLimit: 100, notifyWhenChangesStop: !0})
            }
            if (s.has("selectedOptions")) {
                var p = s.get("selectedOptions");
                ko.isObservable(p) && ko.computed({
                    read: function () {
                        p(), setTimeout(function () {
                            l.multiselect("refresh")
                        }, 1)
                    }, disposeWhenNodeIsRemoved: e
                }).extend({rateLimit: 100, notifyWhenChangesStop: !0})
            }
            var h = function (t) {
                setTimeout(function () {
                    l.multiselect(t ? "enable" : "disable")
                })
            };
            if (s.has("enable")) {
                var r = s.get("enable");
                ko.isObservable(r) ? ko.computed({
                    read: function () {
                        h(r())
                    }, disposeWhenNodeIsRemoved: e
                }).extend({rateLimit: 100, notifyWhenChangesStop: !0}) : h(r)
            }
            if (s.has("disable")) {
                var c = s.get("disable");
                ko.isObservable(c) ? ko.computed({
                    read: function () {
                        h(!c())
                    }, disposeWhenNodeIsRemoved: e
                }).extend({rateLimit: 100, notifyWhenChangesStop: !0}) : h(!c)
            }
            ko.utils.domNodeDisposal.addDisposeCallback(e, function () {
                l.multiselect("destroy")
            })
        },
        update: function (e, i) {
            var s = t(e), l = ko.toJS(i());
            s.multiselect("setOptions", l), s.multiselect("rebuild")
        }
    }), i.prototype = {
        defaults: {
            buttonText: function (e, i) {
                if (this.disabledText.length > 0 && (i.prop("disabled") || 0 == e.length && this.disableIfEmpty)) return this.disabledText;
                if (0 === e.length) return this.nonSelectedText;
                if (this.allSelectedText && e.length === t("option", t(i)).length && 1 !== t("option", t(i)).length && this.multiple) return this.selectAllNumber ? this.allSelectedText + " (" + e.length + ")" : this.allSelectedText;
                if (e.length > this.numberDisplayed) return e.length + " " + this.nSelectedText;
                var s = "", l = this.delimiterText;
                return e.each(function () {
                    var e = void 0 !== t(this).attr("label") ? t(this).attr("label") : t(this).text();
                    s += e + l
                }), s.substr(0, s.length - this.delimiterText.length)
            },
            buttonTitle: function (e) {
                if (0 === e.length) return this.nonSelectedText;
                var i = "", s = this.delimiterText;
                return e.each(function () {
                    var e = void 0 !== t(this).attr("label") ? t(this).attr("label") : t(this).text();
                    i += e + s
                }), i.substr(0, i.length - this.delimiterText.length)
            },
            checkboxName: function () {
                return !1
            },
            optionLabel: function (e) {
                return t(e).attr("label") || t(e).text()
            },
            optionClass: function (e) {
                return t(e).attr("class") || ""
            },
            onChange: function () {
            },
            onDropdownShow: function () {
            },
            onDropdownHide: function () {
            },
            onDropdownShown: function () {
            },
            onDropdownHidden: function () {
            },
            onSelectAll: function () {
            },
            onDeselectAll: function () {
            },
            onInitialized: function () {
            },
            onFiltering: function () {
            },
            enableHTML: !1,
            buttonClass: "btn btn-default",
            inheritClass: !1,
            buttonWidth: "auto",
            buttonContainer: '<div class="btn-group" />',
            dropRight: !1,
            dropUp: !1,
            selectedClass: "active",
            maxHeight: !1,
            includeSelectAllOption: !1,
            includeSelectAllIfMoreThan: 0,
            selectAllText: " \u5168\u9009",
            selectAllValue: "multiselect-all",
            selectAllName: !1,
            selectAllNumber: !0,
            selectAllJustVisible: !0,
            enableFiltering: !1,
            enableCaseInsensitiveFiltering: !1,
            enableFullValueFiltering: !1,
            enableClickableOptGroups: !1,
            enableCollapsibleOptGroups: !1,
            filterPlaceholder: "\u641c\u7d22",
            filterBehavior: "text",
            includeFilterClearBtn: !0,
            preventInputChangeEvent: !1,
            nonSelectedText: "\u8bf7\u9009\u62e9",
            nSelectedText: "\u4e2a\u9009\u4e2d",
            allSelectedText: "\u5168\u9009",
            numberDisplayed: 3,
            disableIfEmpty: !1,
            disabledText: "",
            delimiterText: ", ",
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="fa fa-times-circle"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            }
        }, constructor: i, buildContainer: function () {
            this.$container = t(this.options.buttonContainer), this.$container.on("show.bs.dropdown", this.options.onDropdownShow), this.$container.on("hide.bs.dropdown", this.options.onDropdownHide), this.$container.on("shown.bs.dropdown", this.options.onDropdownShown), this.$container.on("hidden.bs.dropdown", this.options.onDropdownHidden)
        }, buildButton: function () {
            this.$button = t(this.options.templates.button).addClass(this.options.buttonClass), this.$select.attr("class") && this.options.inheritClass && this.$button.addClass(this.$select.attr("class")), this.$select.prop("disabled") ? this.disable() : this.enable(), this.options.buttonWidth && "auto" !== this.options.buttonWidth && (this.$button.css({
                width: "100%",
                overflow: "hidden",
                "text-overflow": "ellipsis"
            }), this.$container.css({width: this.options.buttonWidth}));
            var e = this.$select.attr("tabindex");
            e && this.$button.attr("tabindex", e), this.$container.prepend(this.$button)
        }, buildDropdown: function () {
            if (this.$ul = t(this.options.templates.ul), this.options.dropRight && this.$ul.addClass("pull-right"), this.options.maxHeight && this.$ul.css({
                "max-height": this.options.maxHeight + "px",
                "overflow-y": "auto",
                "overflow-x": "hidden"
            }), this.options.dropUp) {
                var e = Math.min(this.options.maxHeight, 26 * t('option[data-role!="divider"]', this.$select).length + 19 * t('option[data-role="divider"]', this.$select).length + (this.options.includeSelectAllOption ? 26 : 0) + (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering ? 44 : 0)),
                    i = e + 34;
                this.$ul.css({
                    "max-height": e + "px",
                    "overflow-y": "auto",
                    "overflow-x": "hidden",
                    "margin-top": "-" + i + "px"
                })
            }
            this.$container.append(this.$ul)
        }, buildDropdownOptions: function () {
            this.$select.children().each(t.proxy(function (e, i) {
                var s = t(i), l = s.prop("tagName").toLowerCase();
                s.prop("value") !== this.options.selectAllValue && ("optgroup" === l ? this.createOptgroup(i) : "option" === l && ("divider" === s.data("role") ? this.createDivider() : this.createOptionValue(i)))
            }, this)), t("li:not(.multiselect-group) input", this.$ul).on("change", t.proxy(function (e) {
                var i = t(e.target), s = i.prop("checked") || !1, l = i.val() === this.options.selectAllValue;
                this.options.selectedClass && (s ? i.closest("li").addClass(this.options.selectedClass) : i.closest("li").removeClass(this.options.selectedClass));
                var o = i.val(), n = this.getOptionByValue(o), a = t("option", this.$select).not(n),
                    p = t("input", this.$container).not(i);
                return l ? s ? this.selectAll(this.options.selectAllJustVisible) : this.deselectAll(this.options.selectAllJustVisible) : (s ? (n.prop("selected", !0), this.options.multiple ? n.prop("selected", !0) : (this.options.selectedClass && t(p).closest("li").removeClass(this.options.selectedClass), t(p).prop("checked", !1), a.prop("selected", !1), this.$button.click()), "active" === this.options.selectedClass && a.closest("a").css("outline", "")) : n.prop("selected", !1), this.options.onChange(n, s), this.updateSelectAll(), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups()), this.$select.change(), this.updateButtonText(), this.options.preventInputChangeEvent ? !1 : void 0
            }, this)), t("li a", this.$ul).on("mousedown", function (t) {
                return t.shiftKey ? !1 : void 0
            }), t("li a", this.$ul).on("touchstart click", t.proxy(function (e) {
                e.stopPropagation();
                var i = t(e.target);
                if (e.shiftKey && this.options.multiple) {
                    i.is("label") && (e.preventDefault(), i = i.find("input"), i.prop("checked", !i.prop("checked")));
                    var s = i.prop("checked") || !1;
                    if (null !== this.lastToggledInput && this.lastToggledInput !== i) {
                        var l = i.closest("li").index(), o = this.lastToggledInput.closest("li").index();
                        if (l > o) {
                            var n = o;
                            o = l, l = n
                        }
                        ++o;
                        var a = this.$ul.find("li").slice(l, o).find("input");
                        a.prop("checked", s), this.options.selectedClass && a.closest("li").toggleClass(this.options.selectedClass, s);
                        for (var p = 0, h = a.length; h > p; p++) {
                            var r = t(a[p]), c = this.getOptionByValue(r.val());
                            c.prop("selected", s)
                        }
                    }
                    i.trigger("change")
                }
                i.is("input") && !i.closest("li").is(".multiselect-item") && (this.lastToggledInput = i), i.blur()
            }, this)), this.$container.off("keydown.multiselect").on("keydown.multiselect", t.proxy(function (e) {
                if (!t('input[type="text"]', this.$container).is(":focus")) if (9 === e.keyCode && this.$container.hasClass("open")) this.$button.click(); else {
                    var i = t(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");
                    if (!i.length) return;
                    var s = i.index(i.filter(":focus"));
                    38 === e.keyCode && s > 0 ? s-- : 40 === e.keyCode && s < i.length - 1 ? s++ : ~s || (s = 0);
                    var l = i.eq(s);
                    if (l.focus(), 32 === e.keyCode || 13 === e.keyCode) {
                        var o = l.find("input");
                        o.prop("checked", !o.prop("checked")), o.change()
                    }
                    e.stopPropagation(), e.preventDefault()
                }
            }, this)), this.options.enableClickableOptGroups && this.options.multiple && t("li.multiselect-group input", this.$ul).on("change", t.proxy(function (e) {
                e.stopPropagation();
                var i = t(e.target), s = i.prop("checked") || !1, l = t(e.target).closest("li"),
                    o = l.nextUntil("li.multiselect-group").not(".multiselect-filter-hidden").not(".disabled"),
                    n = o.find("input"), a = [];
                t.each(n, t.proxy(function (e, i) {
                    var l = t(i).val(), o = this.getOptionByValue(l);
                    s ? (t(i).prop("checked", !0), t(i).closest("li").addClass(this.options.selectedClass), o.prop("selected", !0)) : (t(i).prop("checked", !1), t(i).closest("li").removeClass(this.options.selectedClass), o.prop("selected", !1)), a.push(this.getOptionByValue(l))
                }, this)), this.options.onChange(a, s), this.updateButtonText(), this.updateSelectAll()
            }, this)), this.options.enableCollapsibleOptGroups && this.options.multiple && (t("li.multiselect-group .caret-container", this.$ul).on("click", t.proxy(function (e) {
                var i = t(e.target).closest("li"),
                    s = i.nextUntil("li.multiselect-group").not(".multiselect-filter-hidden"), l = !0;
                s.each(function () {
                    l = l && t(this).is(":visible")
                }), l ? s.hide().addClass("multiselect-collapsible-hidden") : s.show().removeClass("multiselect-collapsible-hidden")
            }, this)), t("li.multiselect-all", this.$ul).css("background", "#f3f3f3").css("border-bottom", "1px solid #eaeaea"), t("li.multiselect-all > a > label.checkbox", this.$ul).css("padding", "3px 20px 3px 35px"), t("li.multiselect-group > a > input", this.$ul).css("margin", "4px 0px 5px -20px"))
        }, createOptionValue: function (e) {
            var i = t(e);
            i.is(":selected") && i.prop("selected", !0);
            var s = this.options.optionLabel(e), l = this.options.optionClass(e), o = i.val(),
                n = this.options.multiple ? "checkbox" : "radio", a = t(this.options.templates.li), p = t("label", a);
            p.addClass(n), a.addClass(l), this.options.enableHTML ? p.html(" " + s) : p.text(" " + s);
            var h = t("<input/>").attr("type", n), r = this.options.checkboxName(i);
            r && h.attr("name", r), p.prepend(h);
            var c = i.prop("selected") || !1;
            h.val(o), o === this.options.selectAllValue && (a.addClass("multiselect-item multiselect-all"), h.parent().parent().addClass("multiselect-all")), p.attr("title", i.attr("title")), (i.attr("tip") + "").length > 0 && p.popover({
                placement: "right",
                trigger: "hover",
                title: i.attr("title"),
                html: !0,
                content: i.attr("tip"),
                container: "#pager"
            }), this.$ul.append(a), i.is(":disabled") && h.attr("disabled", "disabled").prop("disabled", !0).closest("a").attr("tabindex", "-1").closest("li").addClass("disabled"), h.prop("checked", c), c && this.options.selectedClass && h.closest("li").addClass(this.options.selectedClass)
        }, createDivider: function () {
            var e = t(this.options.templates.divider);
            this.$ul.append(e)
        }, createOptgroup: function (e) {
            var i = t(e).attr("label"), s = t(e).attr("value"),
                l = t('<li class="multiselect-item multiselect-group"><a href="javascript:void(0);"><label><b></b></label></a></li>'),
                o = this.options.optionClass(e);
            l.addClass(o), this.options.enableHTML ? t("label b", l).html(" " + i) : t("label b", l).text(" " + i), this.options.enableCollapsibleOptGroups && this.options.multiple && t("a", l).append('<span class="caret-container"><b class="caret"></b></span>'), this.options.enableClickableOptGroups && this.options.multiple && t("a label", l).prepend('<input type="checkbox" value="' + s + '"/>'), t(e).is(":disabled") && l.addClass("disabled"), this.$ul.append(l), t("option", e).each(t.proxy(function (t, e) {
                this.createOptionValue(e)
            }, this))
        }, buildSelectAll: function () {
            "number" == typeof this.options.selectAllValue && (this.options.selectAllValue = this.options.selectAllValue.toString());
            var e = this.hasSelectAll();
            if (!e && this.options.includeSelectAllOption && this.options.multiple && t("option", this.$select).length > this.options.includeSelectAllIfMoreThan) {
                this.options.includeSelectAllDivider && this.$ul.prepend(t(this.options.templates.divider));
                var i = t(this.options.templates.li);
                t("label", i).addClass("checkbox"), this.options.enableHTML ? t("label", i).html(" " + this.options.selectAllText) : t("label", i).text(" " + this.options.selectAllText), t("label", i).prepend(this.options.selectAllName ? '<input type="checkbox" name="' + this.options.selectAllName + '" />' : '<input type="checkbox" />');
                var s = t("input", i);
                s.val(this.options.selectAllValue), i.addClass("multiselect-item multiselect-all"), s.parent().parent().addClass("multiselect-all"), this.$ul.prepend(i), s.prop("checked", !1)
            }
        }, buildFilter: function () {
            if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
                var e = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);
                if (this.$select.find("option").length >= e) {
                    if (this.$filter = t(this.options.templates.filter), t("input", this.$filter).attr("placeholder", this.options.filterPlaceholder), this.options.includeFilterClearBtn) {
                        var i = t(this.options.templates.filterClearBtn);
                        i.on("click", t.proxy(function () {
                            clearTimeout(this.searchTimeout), this.$filter.find(".multiselect-search").val(""), t("li", this.$ul).show().removeClass("multiselect-filter-hidden"), this.updateSelectAll(), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups()
                        }, this)), this.$filter.find(".input-group").append(i)
                    }
                    this.$ul.prepend(this.$filter), this.$filter.val(this.query).on("click", function (t) {
                        t.stopPropagation()
                    }).on("input keydown", t.proxy(function (e) {
                        13 === e.which && e.preventDefault(), clearTimeout(this.searchTimeout), this.searchTimeout = this.asyncFunction(t.proxy(function () {
                            if (this.query !== e.target.value) {
                                this.query = e.target.value;
                                var i, s;
                                t.each(t("li", this.$ul), t.proxy(function (e, l) {
                                    var o = t("input", l).length > 0 ? t("input", l).val() : "",
                                        n = t("label", l).text(), a = "";
                                    if ("text" === this.options.filterBehavior ? a = n : "value" === this.options.filterBehavior ? a = o : "both" === this.options.filterBehavior && (a = n + "\n" + o), o !== this.options.selectAllValue && n) {
                                        var p = !1;
                                        if (this.options.enableCaseInsensitiveFiltering && (a = a.toLowerCase(), this.query = this.query.toLowerCase()), this.options.enableFullValueFiltering && "both" !== this.options.filterBehavior) {
                                            var h = a.trim().substring(0, this.query.length);
                                            this.query.indexOf(h) > -1 && (p = !0)
                                        } else a.indexOf(this.query) > -1 && (p = !0);
                                        t(l).toggle(p).toggleClass("multiselect-filter-hidden", !p), t(l).hasClass("multiselect-group") ? (i = l, s = p) : (p && t(i).show().removeClass("multiselect-filter-hidden"), !p && s && t(l).show().removeClass("multiselect-filter-hidden"))
                                    }
                                }, this))
                            }
                            this.updateSelectAll(), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups(), this.options.onFiltering(e.target)
                        }, this), 300, this)
                    }, this))
                }
            }
        }, destroy: function () {
            this.$container.remove(), this.$select.show(), this.$select.data("multiselect", null)
        }, refresh: function () {
            var e = t.map(t("li input", this.$ul), t);
            t("option", this.$select).each(t.proxy(function (i, s) {
                for (var l, o = t(s), n = o.val(), a = e.length; 0 < a--;) if (n === (l = e[a]).val()) {
                    o.is(":selected") ? (l.prop("checked", !0), this.options.selectedClass && l.closest("li").addClass(this.options.selectedClass)) : (l.prop("checked", !1), this.options.selectedClass && l.closest("li").removeClass(this.options.selectedClass)), o.is(":disabled") ? l.attr("disabled", "disabled").prop("disabled", !0).closest("li").addClass("disabled") : l.prop("disabled", !1).closest("li").removeClass("disabled");
                    break
                }
            }, this)), this.updateButtonText(), this.updateSelectAll(), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups()
        }, select: function (e, i) {
            t.isArray(e) || (e = [e]);
            for (var s = 0; s < e.length; s++) {
                var l = e[s];
                if (null !== l && void 0 !== l) {
                    var o = this.getOptionByValue(l), n = this.getInputByValue(l);
                    void 0 !== o && void 0 !== n && (this.options.multiple || this.deselectAll(!1), this.options.selectedClass && n.closest("li").addClass(this.options.selectedClass), n.prop("checked", !0), o.prop("selected", !0), i && this.options.onChange(o, !0))
                }
            }
            this.updateButtonText(), this.updateSelectAll(), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups()
        }, clearSelection: function () {
            this.deselectAll(!1), this.updateButtonText(), this.updateSelectAll(), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups()
        }, deselect: function (e, i) {
            t.isArray(e) || (e = [e]);
            for (var s = 0; s < e.length; s++) {
                var l = e[s];
                if (null !== l && void 0 !== l) {
                    var o = this.getOptionByValue(l), n = this.getInputByValue(l);
                    void 0 !== o && void 0 !== n && (this.options.selectedClass && n.closest("li").removeClass(this.options.selectedClass), n.prop("checked", !1), o.prop("selected", !1), i && this.options.onChange(o, !1))
                }
            }
            this.updateButtonText(), this.updateSelectAll(), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups()
        }, selectAll: function (e, i) {
            var e = "undefined" == typeof e ? !0 : e,
                s = t("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul),
                l = t("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)", this.$ul).filter(":visible");
            e ? (t("input:enabled", l).prop("checked", !0), l.addClass(this.options.selectedClass), t("input:enabled", l).each(t.proxy(function (e, i) {
                var s = t(i).val(), l = this.getOptionByValue(s);
                t(l).prop("selected", !0)
            }, this))) : (t("input:enabled", s).prop("checked", !0), s.addClass(this.options.selectedClass), t("input:enabled", s).each(t.proxy(function (e, i) {
                var s = t(i).val(), l = this.getOptionByValue(s);
                t(l).prop("selected", !0)
            }, this))), t('li input[value="' + this.options.selectAllValue + '"]').prop("checked", !0), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups(), i && this.options.onSelectAll()
        }, deselectAll: function (e, i) {
            var e = "undefined" == typeof e ? !0 : e,
                s = t("li:not(.divider):not(.disabled):not(.multiselect-group)", this.$ul),
                l = t("li:not(.divider):not(.disabled):not(.multiselect-group):not(.multiselect-filter-hidden):not(.multiselect-collapisble-hidden)", this.$ul).filter(":visible");
            e ? (t('input[type="checkbox"]:enabled', l).prop("checked", !1), l.removeClass(this.options.selectedClass), t('input[type="checkbox"]:enabled', l).each(t.proxy(function (e, i) {
                var s = t(i).val(), l = this.getOptionByValue(s);
                t(l).prop("selected", !1)
            }, this))) : (t('input[type="checkbox"]:enabled', s).prop("checked", !1), s.removeClass(this.options.selectedClass), t('input[type="checkbox"]:enabled', s).each(t.proxy(function (e, i) {
                var s = t(i).val(), l = this.getOptionByValue(s);
                t(l).prop("selected", !1)
            }, this))), t('li input[value="' + this.options.selectAllValue + '"]').prop("checked", !1), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups(), i && this.options.onDeselectAll()
        }, rebuild: function () {
            this.$ul.html(""), this.options.multiple = "multiple" === this.$select.attr("multiple"), this.buildSelectAll(), this.buildDropdownOptions(), this.buildFilter(), this.updateButtonText(), this.updateSelectAll(!0), this.options.enableClickableOptGroups && this.options.multiple && this.updateOptGroups(), this.options.disableIfEmpty && t("option", this.$select).length <= 0 ? this.disable() : this.enable(), this.options.dropRight && this.$ul.addClass("pull-right")
        }, dataprovider: function (i) {
            var s = 0, l = this.$select.empty();
            t.each(i, function (i, o) {
                var n;
                if (t.isArray(o.children)) s++, n = t("<optgroup/>").attr({
                    label: o.label || "Group " + s,
                    disabled: !!o.disabled
                }), e(o.children, function (e) {
                    var i = {
                        value: e.value,
                        label: e.label || e.value,
                        title: e.title,
                        tip: e.tip,
                        selected: !!e.selected,
                        disabled: !!e.disabled
                    };
                    for (var s in e.attributes) i["data-" + s] = e.attributes[s];
                    n.append(t("<option/>").attr(i))
                }); else {
                    var a = {
                        value: o.value,
                        label: o.label || o.value,
                        title: o.title,
                        tip: o.tip,
                        "class": o.class,
                        selected: !!o.selected,
                        disabled: !!o.disabled
                    };
                    for (var p in o.attributes) a["data-" + p] = o.attributes[p];
                    n = t("<option/>").attr(a), n.text(o.label || o.value)
                }
                l.append(n)
            }), this.rebuild()
        }, enable: function () {
            this.$select.prop("disabled", !1), this.$button.prop("disabled", !1).removeClass("disabled")
        }, disable: function () {
            this.$select.prop("disabled", !0), this.$button.prop("disabled", !0).addClass("disabled")
        }, setOptions: function (t) {
            this.options = this.mergeOptions(t)
        }, mergeOptions: function (e) {
            return t.extend(!0, {}, this.defaults, this.options, e)
        }, hasSelectAll: function () {
            return t("li.multiselect-all", this.$ul).length > 0
        }, updateOptGroups: function () {
            var e = t("li.multiselect-group", this.$ul);
            e.each(function () {
                var e = t(this).nextUntil("li.multiselect-group").not(".multiselect-filter-hidden").not(".disabled"),
                    i = !0;
                e.each(function () {
                    var e = t("input", this);
                    e.prop("checked") || (i = !1)
                }), t("input", this).prop("checked", i)
            })
        }, updateSelectAll: function (e) {
            if (this.hasSelectAll()) {
                var i = t("li:not(.multiselect-item):not(.multiselect-filter-hidden):not(.multiselect-group):not(.disabled) input:enabled", this.$ul),
                    s = i.length, l = i.filter(":checked").length, o = t("li.multiselect-all", this.$ul),
                    n = o.find("input");
                l > 0 && l === s ? (n.prop("checked", !0), o.addClass(this.options.selectedClass), this.options.onSelectAll()) : (n.prop("checked", !1), o.removeClass(this.options.selectedClass), 0 === l && (e || this.options.onDeselectAll()))
            }
        }, updateButtonText: function () {
            var e = this.getSelected();
            this.options.enableHTML ? t(".multiselect .multiselect-selected-text", this.$container).html(this.options.buttonText(e, this.$select)) : t(".multiselect .multiselect-selected-text", this.$container).text(this.options.buttonText(e, this.$select)), t(".multiselect", this.$container).attr("title", this.options.buttonTitle(e, this.$select))
        }, getSelected: function () {
            return t("option", this.$select).filter(":selected")
        }, getOptionByValue: function (e) {
            for (var i = t("option", this.$select), s = e.toString(), l = 0; l < i.length; l += 1) {
                var o = i[l];
                if (o.value === s) return t(o)
            }
        }, getInputByValue: function (e) {
            for (var i = t("li input", this.$ul), s = e.toString(), l = 0; l < i.length; l += 1) {
                var o = i[l];
                if (o.value === s) return t(o)
            }
        }, updateOriginalOptions: function () {
            this.originalOptions = this.$select.clone()[0].options
        }, asyncFunction: function (t, e, i) {
            var s = Array.prototype.slice.call(arguments, 3);
            return setTimeout(function () {
                t.apply(i || window, s)
            }, e)
        }, setAllSelectedText: function (t) {
            this.options.allSelectedText = t, this.updateButtonText()
        }
    }, t.fn.multiselect = function (e, s, l) {
        return this.each(function () {
            var o = t(this).data("multiselect"), n = "object" == typeof e && e;
            o || (o = new i(this, n), t(this).data("multiselect", o)), "string" == typeof e && (o[e](s, l), "destroy" === e && t(this).data("multiselect", !1))
        })
    }, t.fn.multiselect.Constructor = i, t(function () {
        t("select[data-role=multiselect]").multiselect()
    })
}(window.jQuery);
;!function (t) {
    "use strict";

    function e(e, n) {
        this.itemsArray = [], this.$element = t(e), this.$element.hide(), this.$eleClass = this.$element.attr("class"), this.isSelect = "SELECT" === e.tagName, this.multiple = this.isSelect && e.hasAttribute("multiple"), this.objectItems = n && n.itemValue, this.placeholderText = e.hasAttribute("placeholder") ? this.$element.attr("placeholder") : "", this.inputSize = Math.max(1, this.placeholderText.length), this.$container = t('<div class="bootstrap-tagsinput ' + this.$eleClass + '"></div>'), this.$input = t('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container), this.$element.before(this.$container), this.build(n)
    }

    function n(t, e) {
        if ("function" != typeof t[e]) {
            var n = t[e];
            t[e] = function (t) {
                return t[n]
            }
        }
    }

    function i(t, e) {
        if ("function" != typeof t[e]) {
            var n = t[e];
            t[e] = function () {
                return n
            }
        }
    }

    function a(t) {
        return t ? l.text(t).html() : ""
    }

    function r(t) {
        var e = 0;
        if (document.selection) {
            t.focus();
            var n = document.selection.createRange();
            n.moveStart("character", -t.value.length), e = n.text.length
        } else (t.selectionStart || "0" == t.selectionStart) && (e = t.selectionStart);
        return e
    }

    function o(e, n) {
        var i = !1;
        return t.each(n, function (t, n) {
            if ("number" == typeof n && e.which === n) return i = !0, !1;
            if (e.which === n.which) {
                var a = !n.hasOwnProperty("altKey") || e.altKey === n.altKey,
                    r = !n.hasOwnProperty("shiftKey") || e.shiftKey === n.shiftKey,
                    o = !n.hasOwnProperty("ctrlKey") || e.ctrlKey === n.ctrlKey;
                if (a && r && o) return i = !0, !1
            }
        }), i
    }

    var s = {
        tagClass: function () {
            return "label partition-blue"
        },
        itemValue: function (t) {
            return t ? t.toString() : t
        },
        itemText: function (t) {
            return this.itemValue(t)
        },
        itemTitle: function () {
            return null
        },
        freeInput: !0,
        addOnBlur: !0,
        maxTags: void 0,
        maxChars: 20,
        confirmKeys: [13, 44],
        delimiter: ",",
        delimiterRegex: null,
        cancelConfirmKeysOnEmpty: !0,
        onTagExists: function (t, e) {
            e.hide().fadeIn()
        },
        trimValue: !1,
        allowDuplicates: !1
    };
    e.prototype = {
        constructor: e, add: function (e, n, i) {
            var r = this;
            if (!(r.options.maxTags && r.itemsArray.length >= r.options.maxTags || e !== !1 && !e)) {
                if ("string" == typeof e && r.options.trimValue && (e = t.trim(e)), "object" == typeof e && !r.objectItems) throw"Can't add objects when itemValue option is not set";
                if (!e.toString().match(/^\s*$/)) {
                    if (r.isSelect && !r.multiple && r.itemsArray.length > 0 && r.remove(r.itemsArray[0]), "string" == typeof e && "INPUT" === this.$element[0].tagName) {
                        var o = r.options.delimiterRegex ? r.options.delimiterRegex : r.options.delimiter,
                            s = e.split(o);
                        if (s.length > 1) {
                            for (var l = 0; l < s.length; l++) this.add(s[l], !0);
                            return void(n || r.pushVal())
                        }
                    }
                    var u = r.options.itemValue(e), p = r.options.itemText(e), c = r.options.tagClass(e),
                        h = r.options.itemTitle(e), m = t.grep(r.itemsArray, function (t) {
                            return r.options.itemValue(t) === u
                        })[0];
                    if (!m || r.options.allowDuplicates) {
                        if (!(r.items().toString().length + e.length + 1 > r.options.maxInputLength)) {
                            var f = t.Event("beforeItemAdd", {item: e, cancel: !1, options: i});
                            if (r.$element.trigger(f), !f.cancel) {
                                r.itemsArray.push(e);
                                var d = t('<span class="tag ' + a(c) + (null !== h ? '" title="' + h : "") + '">' + a(p) + '<span data-role="remove"></span></span>');
                                if (d.data("item", e), r.findInputWrapper().before(d), d.after(" "), r.isSelect && !t('option[value="' + encodeURIComponent(u) + '"]', r.$element)[0]) {
                                    var v = t("<option selected>" + a(p) + "</option>");
                                    v.data("item", e), v.attr("value", u), r.$element.append(v)
                                }
                                n || r.pushVal(), (r.options.maxTags === r.itemsArray.length || r.items().toString().length === r.options.maxInputLength) && r.$container.addClass("bootstrap-tagsinput-max"), r.$element.trigger(t.Event("itemAdded", {
                                    item: e,
                                    options: i
                                }))
                            }
                        }
                    } else if (r.options.onTagExists) {
                        var g = t(".tag", r.$container).filter(function () {
                            return t(this).data("item") === m
                        });
                        r.options.onTagExists(e, g)
                    }
                }
            }
        }, remove: function (e, n, i) {
            var a = this;
            if (a.objectItems && (e = "object" == typeof e ? t.grep(a.itemsArray, function (t) {
                return a.options.itemValue(t) == a.options.itemValue(e)
            }) : t.grep(a.itemsArray, function (t) {
                return a.options.itemValue(t) == e
            }), e = e[e.length - 1]), e) {
                var r = t.Event("beforeItemRemove", {item: e, cancel: !1, options: i});
                if (a.$element.trigger(r), r.cancel) return;
                t(".tag", a.$container).filter(function () {
                    return t(this).data("item") === e
                }).remove(), t("option", a.$element).filter(function () {
                    return t(this).data("item") === e
                }).remove(), -1 !== t.inArray(e, a.itemsArray) && a.itemsArray.splice(t.inArray(e, a.itemsArray), 1)
            }
            n || a.pushVal(), a.options.maxTags > a.itemsArray.length && a.$container.removeClass("bootstrap-tagsinput-max"), a.$element.trigger(t.Event("itemRemoved", {
                item: e,
                options: i
            }))
        }, removeAll: function () {
            var e = this;
            for (t(".tag", e.$container).remove(), t("option", e.$element).remove(); e.itemsArray.length > 0;) e.itemsArray.pop();
            e.pushVal()
        }, refresh: function () {
            var e = this;
            t(".tag", e.$container).each(function () {
                var n = t(this), i = n.data("item"), r = e.options.itemValue(i), o = e.options.itemText(i),
                    s = e.options.tagClass(i);
                if (n.attr("class", null), n.addClass("tag " + a(s)), n.contents().filter(function () {
                    return 3 == this.nodeType
                })[0].nodeValue = a(o), e.isSelect) {
                    var l = t("option", e.$element).filter(function () {
                        return t(this).data("item") === i
                    });
                    l.attr("value", r)
                }
            })
        }, items: function () {
            return this.itemsArray
        }, pushVal: function () {
            var e = this, n = t.map(e.items(), function (t) {
                return e.options.itemValue(t).toString()
            });
            e.$element.val(n, !0).trigger("change")
        }, build: function (e) {
            var a = this;
            if (a.options = t.extend({}, s, e), a.objectItems && (a.options.freeInput = !1), n(a.options, "itemValue"), n(a.options, "itemText"), i(a.options, "tagClass"), a.options.typeahead) {
                var l = a.options.typeahead || {};
                i(l, "source"), a.$input.typeahead(t.extend({}, l, {
                    source: function (e, n) {
                        function i(t) {
                            for (var e = [], i = 0; i < t.length; i++) {
                                var o = a.options.itemText(t[i]);
                                r[o] = t[i], e.push(o)
                            }
                            n(e)
                        }

                        this.map = {};
                        var r = this.map, o = l.source(e);
                        t.isFunction(o.success) ? o.success(i) : t.isFunction(o.then) ? o.then(i) : t.when(o).then(i)
                    }, updater: function (t) {
                        return a.add(this.map[t]), this.map[t]
                    }, matcher: function (t) {
                        return -1 !== t.toLowerCase().indexOf(this.query.trim().toLowerCase())
                    }, sorter: function (t) {
                        return t.sort()
                    }, highlighter: function (t) {
                        var e = new RegExp("(" + this.query + ")", "gi");
                        return t.replace(e, "<strong>$1</strong>")
                    }
                }))
            }
            if (a.options.typeaheadjs) {
                var u = null, p = {}, c = a.options.typeaheadjs;
                t.isArray(c) ? (u = c[0], p = c[1]) : p = c, a.$input.typeahead(u, p).on("typeahead:selected", t.proxy(function (t, e) {
                    a.add(p.valueKey ? e[p.valueKey] : e), a.$input.typeahead("val", "")
                }, a))
            }
            a.$container.on("click", t.proxy(function () {
                a.$element.attr("disabled") || a.$input.removeAttr("disabled"), a.$input.focus()
            }, a)), a.options.addOnBlur && a.options.freeInput && a.$input.on("focusout", t.proxy(function () {
                0 === t(".typeahead, .twitter-typeahead", a.$container).length && (a.add(a.options.maxChars ? a.$input.val().slice(0, a.options.maxChars) : a.$input.val()), a.$input.val(""))
            }, a)), a.$container.on("keydown", "input", t.proxy(function (e) {
                var n = t(e.target), i = a.findInputWrapper();
                if (a.$element.attr("disabled")) return void a.$input.attr("disabled", "disabled");
                switch (e.which) {
                    case 8:
                        if (0 === r(n[0])) {
                            var o = i.prev();
                            o.length && a.remove(o.data("item"))
                        }
                        break;
                    case 46:
                        if (0 === r(n[0])) {
                            var s = i.next();
                            s.length && a.remove(s.data("item"))
                        }
                        break;
                    case 37:
                        var l = i.prev();
                        0 === n.val().length && l[0] && (l.before(i), n.focus());
                        break;
                    case 39:
                        var u = i.next();
                        0 === n.val().length && u[0] && (u.after(i), n.focus());
                        break;
                    case 13:
                        a.$input.trigger("focusout"), e.preventDefault(), e.stopPropagation()
                }
                {
                    var p = n.val().length;
                    Math.ceil(p / 5)
                }
                n.attr("size", Math.max(this.inputSize, n.val().length))
            }, a)), a.$container.on("keypress", "input", t.proxy(function (e) {
                var n = t(e.target);
                if (a.$element.attr("disabled")) return void a.$input.attr("disabled", "disabled");
                var i = n.val(), r = a.options.maxChars && i.length >= a.options.maxChars;
                a.options.freeInput && (o(e, a.options.confirmKeys) || r) && (0 !== i.length && (a.add(r ? i.substr(0, a.options.maxChars) : i), n.val("")), a.options.cancelConfirmKeysOnEmpty === !1 && e.preventDefault());
                {
                    var s = n.val().length;
                    Math.ceil(s / 5)
                }
                n.attr("size", Math.max(this.inputSize, n.val().length))
            }, a)), a.$container.on("click", "[data-role=remove]", t.proxy(function (e) {
                a.$element.attr("disabled") || a.remove(t(e.target).closest(".tag").data("item"))
            }, a)), a.options.itemValue === s.itemValue && ("INPUT" === a.$element[0].tagName ? a.add(a.$element.val()) : t("option", a.$element).each(function () {
                a.add(t(this).attr("value"), !0)
            }))
        }, destroy: function () {
            var t = this;
            t.$container.off("keypress", "input"), t.$container.off("click", "[role=remove]"), t.$container.remove(), t.$element.removeData("tagsinput"), t.$element.show()
        }, focus: function () {
            this.$input.focus()
        }, input: function () {
            return this.$input
        }, findInputWrapper: function () {
            for (var e = this.$input[0], n = this.$container[0]; e && e.parentNode !== n;) e = e.parentNode;
            return t(e)
        }
    }, t.fn.tagsinput = function (n, i, a) {
        var r = [];
        return this.each(function () {
            var o = t(this).data("tagsinput");
            if (o) if (n || i) {
                if (void 0 !== o[n]) {
                    if (3 === o[n].length && void 0 !== a) var s = o[n](i, null, a); else var s = o[n](i);
                    void 0 !== s && r.push(s)
                }
            } else r.push(o); else o = new e(this, n), t(this).data("tagsinput", o), r.push(o), "SELECT" === this.tagName && t("option", t(this)).attr("selected", "selected"), t(this).val(t(this).val())
        }), "string" == typeof n ? r.length > 1 ? r : r[0] : r
    }, t.fn.tagsinput.Constructor = e;
    var l = t("<div />");
    t(function () {
        t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()
    })
}(window.jQuery);
;!function (t) {
    "function" == typeof define && define.amd ? t(jQuery, document, window, navigator) : "object" == typeof exports ? t(require("jquery"), document, window, navigator) : t(jQuery, document, window, navigator)
}(function (t, i, s, o, e) {
    "use strict";
    var h = 0, r = function () {
        var i, s = o.userAgent, e = /msie\s\d+/i;
        return s.search(e) > 0 && (i = e.exec(s).toString(), i = i.split(" ")[1], 9 > i) ? (t("html").addClass("lt-ie9"), !0) : !1
    }();
    Function.prototype.bind || (Function.prototype.bind = function (t) {
        var i = this, s = [].slice;
        if ("function" != typeof i) throw new TypeError;
        var o = s.call(arguments, 1), e = function () {
            if (this instanceof e) {
                var h = function () {
                };
                h.prototype = i.prototype;
                var r = new h, n = i.apply(r, o.concat(s.call(arguments)));
                return Object(n) === n ? n : r
            }
            return i.apply(t, o.concat(s.call(arguments)))
        };
        return e
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (t, i) {
        var s;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var o = Object(this), e = o.length >>> 0;
        if (0 === e) return -1;
        var h = +i || 0;
        if (1 / 0 === Math.abs(h) && (h = 0), h >= e) return -1;
        for (s = Math.max(h >= 0 ? h : e - Math.abs(h), 0); e > s;) {
            if (s in o && o[s] === t) return s;
            s++
        }
        return -1
    });
    var n = '<span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>',
        a = '<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>',
        c = '<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>',
        l = '<span class="irs-disable-mask"></span>', _ = function (o, h, r) {
            this.VERSION = "2.1.5", this.input = o, this.plugin_count = r, this.current_plugin = 0, this.calc_count = 0, this.update_tm = 0, this.old_from = 0, this.old_to = 0, this.old_min_interval = null, this.raf_id = null, this.dragging = !1, this.force_redraw = !1, this.no_diapason = !1, this.is_key = !1, this.is_update = !1, this.is_first_update = !0, this.is_start = !0, this.is_finish = !1, this.is_active = !1, this.is_resize = !1, this.is_click = !1, h = h || {}, this.$cache = {
                win: t(s),
                body: t(i.body),
                input: t(o),
                cont: null,
                rs: null,
                min: null,
                max: null,
                from: null,
                to: null,
                single: null,
                bar: null,
                line: null,
                s_single: null,
                s_from: null,
                s_to: null,
                shad_single: null,
                shad_from: null,
                shad_to: null,
                edge: null,
                grid: null,
                grid_labels: []
            }, this.coords = {
                x_gap: 0,
                x_pointer: 0,
                w_rs: 0,
                w_rs_old: 0,
                w_handle: 0,
                p_gap: 0,
                p_gap_left: 0,
                p_gap_right: 0,
                p_step: 0,
                p_pointer: 0,
                p_handle: 0,
                p_single_fake: 0,
                p_single_real: 0,
                p_from_fake: 0,
                p_from_real: 0,
                p_to_fake: 0,
                p_to_real: 0,
                p_bar_x: 0,
                p_bar_w: 0,
                grid_gap: 0,
                big_num: 0,
                big: [],
                big_w: [],
                big_p: [],
                big_x: []
            }, this.labels = {
                w_min: 0,
                w_max: 0,
                w_from: 0,
                w_to: 0,
                w_single: 0,
                p_min: 0,
                p_max: 0,
                p_from_fake: 0,
                p_from_left: 0,
                p_to_fake: 0,
                p_to_left: 0,
                p_single_fake: 0,
                p_single_left: 0
            };
            var n, a, c, l = this.$cache.input, _ = l.prop("value");
            n = {
                type: "single",
                min: 10,
                max: 100,
                from: null,
                to: null,
                step: 1,
                min_interval: 0,
                max_interval: 0,
                drag_interval: !1,
                values: [],
                p_values: [],
                from_fixed: !1,
                from_min: null,
                from_max: null,
                from_shadow: !1,
                to_fixed: !1,
                to_min: null,
                to_max: null,
                to_shadow: !1,
                prettify_enabled: !0,
                prettify_separator: " ",
                prettify: null,
                force_edges: !1,
                keyboard: !1,
                keyboard_step: 5,
                grid: !1,
                grid_margin: !0,
                grid_num: 4,
                grid_snap: !1,
                hide_min_max: !1,
                hide_from_to: !1,
                prefix: "",
                postfix: "",
                max_postfix: "",
                decorate_both: !0,
                values_separator: " \u2014 ",
                input_values_separator: ";",
                disable: !1,
                onStart: null,
                onChange: null,
                onFinish: null,
                onUpdate: null
            }, a = {
                type: l.data("type"),
                min: l.data("min"),
                max: l.data("max"),
                from: l.data("from"),
                to: l.data("to"),
                step: l.data("step"),
                min_interval: l.data("minInterval"),
                max_interval: l.data("maxInterval"),
                drag_interval: l.data("dragInterval"),
                values: l.data("values"),
                from_fixed: l.data("fromFixed"),
                from_min: l.data("fromMin"),
                from_max: l.data("fromMax"),
                from_shadow: l.data("fromShadow"),
                to_fixed: l.data("toFixed"),
                to_min: l.data("toMin"),
                to_max: l.data("toMax"),
                to_shadow: l.data("toShadow"),
                prettify_enabled: l.data("prettifyEnabled"),
                prettify_separator: l.data("prettifySeparator"),
                force_edges: l.data("forceEdges"),
                keyboard: l.data("keyboard"),
                keyboard_step: l.data("keyboardStep"),
                grid: l.data("grid"),
                grid_margin: l.data("gridMargin"),
                grid_num: l.data("gridNum"),
                grid_snap: l.data("gridSnap"),
                hide_min_max: l.data("hideMinMax"),
                hide_from_to: l.data("hideFromTo"),
                prefix: l.data("prefix"),
                postfix: l.data("postfix"),
                max_postfix: l.data("maxPostfix"),
                decorate_both: l.data("decorateBoth"),
                values_separator: l.data("valuesSeparator"),
                input_values_separator: l.data("inputValuesSeparator"),
                disable: l.data("disable")
            }, a.values = a.values && a.values.split(",");
            for (c in a) a.hasOwnProperty(c) && (a[c] === e || "" === a[c]) && delete a[c];
            "" !== _ && (_ = _.split(a.input_values_separator || h.input_values_separator || ";"), _[0] && _[0] == +_[0] && (_[0] = +_[0]), _[1] && _[1] == +_[1] && (_[1] = +_[1]), h && h.values && h.values.length ? (n.from = _[0] && h.values.indexOf(_[0]), n.to = _[1] && h.values.indexOf(_[1])) : (n.from = _[0] && +_[0], n.to = _[1] && +_[1])), t.extend(n, h), t.extend(n, a), this.options = n, this.update_check = {}, this.validate(), this.result = {
                input: this.$cache.input,
                slider: null,
                min: this.options.min,
                max: this.options.max,
                from: this.options.from,
                from_percent: 0,
                from_value: null,
                to: this.options.to,
                to_percent: 0,
                to_value: null
            }, this.init()
        };
    _.prototype = {
        init: function (t) {
            this.no_diapason = !1, this.coords.p_step = this.convertToPercent(this.options.step, !0), this.target = "base", this.toggleInput(), this.append(), this.setMinMax(), t ? (this.force_redraw = !0, this.calc(!0), this.callOnUpdate()) : (this.force_redraw = !0, this.calc(!0), this.callOnStart()), this.updateScene()
        }, append: function () {
            var t = '<span class="irs js-irs-' + this.plugin_count + '"></span>';
            this.$cache.input.before(t), this.$cache.input.prop("readonly", !0), this.$cache.cont = this.$cache.input.prev(), this.result.slider = this.$cache.cont, this.$cache.cont.html(n), this.$cache.rs = this.$cache.cont.find(".irs"), this.$cache.min = this.$cache.cont.find(".irs-min"), this.$cache.max = this.$cache.cont.find(".irs-max"), this.$cache.from = this.$cache.cont.find(".irs-from"), this.$cache.to = this.$cache.cont.find(".irs-to"), this.$cache.single = this.$cache.cont.find(".irs-single"), this.$cache.bar = this.$cache.cont.find(".irs-bar"), this.$cache.line = this.$cache.cont.find(".irs-line"), this.$cache.grid = this.$cache.cont.find(".irs-grid"), "single" === this.options.type ? (this.$cache.cont.append(a), this.$cache.edge = this.$cache.cont.find(".irs-bar-edge"), this.$cache.s_single = this.$cache.cont.find(".single"), this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append(c), this.$cache.s_from = this.$cache.cont.find(".from"), this.$cache.s_to = this.$cache.cont.find(".to"), this.$cache.shad_from = this.$cache.cont.find(".shadow-from"), this.$cache.shad_to = this.$cache.cont.find(".shadow-to"), this.setTopHandler()), this.options.hide_from_to && (this.$cache.from[0].style.display = "none", this.$cache.to[0].style.display = "none", this.$cache.single[0].style.display = "none"), this.appendGrid(), this.options.disable ? (this.appendDisableMask(), this.$cache.input[0].disabled = !0) : (this.$cache.cont.removeClass("irs-disabled"), this.$cache.input[0].disabled = !1, this.bindEvents()), this.options.drag_interval && (this.$cache.bar[0].style.cursor = "ew-resize")
        }, setTopHandler: function () {
            var t = this.options.min, i = this.options.max, s = this.options.from, o = this.options.to;
            s > t && o === i ? this.$cache.s_from.addClass("type_last") : i > o && this.$cache.s_to.addClass("type_last")
        }, changeLevel: function (t) {
            switch (t) {
                case"single":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
                    break;
                case"from":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake), this.$cache.s_from.addClass("state_hover"), this.$cache.s_from.addClass("type_last"), this.$cache.s_to.removeClass("type_last");
                    break;
                case"to":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake), this.$cache.s_to.addClass("state_hover"), this.$cache.s_to.addClass("type_last"), this.$cache.s_from.removeClass("type_last");
                    break;
                case"both":
                    this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake), this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer), this.$cache.s_to.removeClass("type_last"), this.$cache.s_from.removeClass("type_last")
            }
        }, appendDisableMask: function () {
            this.$cache.cont.append(l), this.$cache.cont.addClass("irs-disabled")
        }, remove: function () {
            this.$cache.cont.remove(), this.$cache.cont = null, this.$cache.line.off("keydown.irs_" + this.plugin_count), this.$cache.body.off("touchmove.irs_" + this.plugin_count), this.$cache.body.off("mousemove.irs_" + this.plugin_count), this.$cache.win.off("touchend.irs_" + this.plugin_count), this.$cache.win.off("mouseup.irs_" + this.plugin_count), r && (this.$cache.body.off("mouseup.irs_" + this.plugin_count), this.$cache.body.off("mouseleave.irs_" + this.plugin_count)), this.$cache.grid_labels = [], this.coords.big = [], this.coords.big_w = [], this.coords.big_p = [], this.coords.big_x = [], cancelAnimationFrame(this.raf_id)
        }, bindEvents: function () {
            this.no_diapason || (this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.options.drag_interval && "double" === this.options.type ? (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"))) : (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), "single" === this.options.type ? (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), this.options.keyboard && this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard")), r && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this))))
        }, pointerMove: function (t) {
            if (this.dragging) {
                var i = t.pageX || t.originalEvent.touches && t.originalEvent.touches[0].pageX;
                this.coords.x_pointer = i - this.coords.x_gap, this.calc()
            }
        }, pointerUp: function (i) {
            this.current_plugin === this.plugin_count && this.is_active && (this.is_active = !1, this.$cache.cont.find(".state_hover").removeClass("state_hover"), this.force_redraw = !0, r && t("*").prop("unselectable", !1), this.updateScene(), this.restoreOriginalMinInterval(), (t.contains(this.$cache.cont[0], i.target) || this.dragging) && this.callOnFinish(), this.dragging = !1)
        }, pointerDown: function (i, s) {
            s.preventDefault();
            var o = s.pageX || s.originalEvent.touches && s.originalEvent.touches[0].pageX;
            2 !== s.button && ("both" === i && this.setTempMinInterval(), i || (i = this.target || "from"), this.current_plugin = this.plugin_count, this.target = i, this.is_active = !0, this.dragging = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = o - this.coords.x_gap, this.calcPointerPercent(), this.changeLevel(i), r && t("*").prop("unselectable", !0), this.$cache.line.trigger("focus"), this.updateScene())
        }, pointerClick: function (t, i) {
            i.preventDefault();
            var s = i.pageX || i.originalEvent.touches && i.originalEvent.touches[0].pageX;
            2 !== i.button && (this.current_plugin = this.plugin_count, this.target = t, this.is_click = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = +(s - this.coords.x_gap).toFixed(), this.force_redraw = !0, this.calc(), this.$cache.line.trigger("focus"))
        }, key: function (t, i) {
            if (!(this.current_plugin !== this.plugin_count || i.altKey || i.ctrlKey || i.shiftKey || i.metaKey)) {
                switch (i.which) {
                    case 83:
                    case 65:
                    case 40:
                    case 37:
                        i.preventDefault(), this.moveByKey(!1);
                        break;
                    case 87:
                    case 68:
                    case 38:
                    case 39:
                        i.preventDefault(), this.moveByKey(!0)
                }
                return !0
            }
        }, moveByKey: function (t) {
            var i = this.coords.p_pointer;
            t ? i += this.options.keyboard_step : i -= this.options.keyboard_step, this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * i), this.is_key = !0, this.calc()
        }, setMinMax: function () {
            if (this.options) {
                if (this.options.hide_min_max) return this.$cache.min[0].style.display = "none", void(this.$cache.max[0].style.display = "none");
                this.options.values.length ? (this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])), this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]))) : (this.$cache.min.html(this.decorate(this._prettify(this.options.min), this.options.min)), this.$cache.max.html(this.decorate(this._prettify(this.options.max), this.options.max))), this.labels.w_min = this.$cache.min.outerWidth(!1), this.labels.w_max = this.$cache.max.outerWidth(!1)
            }
        }, setTempMinInterval: function () {
            var t = this.result.to - this.result.from;
            null === this.old_min_interval && (this.old_min_interval = this.options.min_interval), this.options.min_interval = t
        }, restoreOriginalMinInterval: function () {
            null !== this.old_min_interval && (this.options.min_interval = this.old_min_interval, this.old_min_interval = null)
        }, calc: function (t) {
            if (this.options && (this.calc_count++, (10 === this.calc_count || t) && (this.calc_count = 0, this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.calcHandlePercent()), this.coords.w_rs)) {
                this.calcPointerPercent();
                var i = this.getHandleX();
                switch ("both" === this.target && (this.coords.p_gap = 0, i = this.getHandleX()), "click" === this.target && (this.coords.p_gap = this.coords.p_handle / 2, i = this.getHandleX(), this.target = this.options.drag_interval ? "both_one" : this.chooseHandle(i)), this.target) {
                    case"base":
                        var s = (this.options.max - this.options.min) / 100,
                            o = (this.result.from - this.options.min) / s, e = (this.result.to - this.options.min) / s;
                        this.coords.p_single_real = this.toFixed(o), this.coords.p_from_real = this.toFixed(o), this.coords.p_to_real = this.toFixed(e), this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real), this.target = null;
                        break;
                    case"single":
                        if (this.options.from_fixed) break;
                        this.coords.p_single_real = this.convertToRealPercent(i), this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real), this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max), this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                        break;
                    case"from":
                        if (this.options.from_fixed) break;
                        this.coords.p_from_real = this.convertToRealPercent(i), this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real), this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                        break;
                    case"to":
                        if (this.options.to_fixed) break;
                        this.coords.p_to_real = this.convertToRealPercent(i), this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real), this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                        break;
                    case"both":
                        if (this.options.from_fixed || this.options.to_fixed) break;
                        i = this.toFixed(i + .001 * this.coords.p_handle), this.coords.p_from_real = this.convertToRealPercent(i) - this.coords.p_gap_left, this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_real = this.convertToRealPercent(i) + this.coords.p_gap_right, this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                        break;
                    case"both_one":
                        if (this.options.from_fixed || this.options.to_fixed) break;
                        var h = this.convertToRealPercent(i), r = this.result.from_percent, n = this.result.to_percent,
                            a = n - r, c = a / 2, l = h - c, _ = h + c;
                        0 > l && (l = 0, _ = l + a), _ > 100 && (_ = 100, l = _ - a), this.coords.p_from_real = this.calcWithStep(l), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_real = this.calcWithStep(_), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real)
                }
                "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2, this.coords.p_bar_w = this.coords.p_single_fake, this.result.from_percent = this.coords.p_single_real, this.result.from = this.convertToValue(this.coords.p_single_real), this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2), this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake), this.result.from_percent = this.coords.p_from_real, this.result.from = this.convertToValue(this.coords.p_from_real), this.result.to_percent = this.coords.p_to_real, this.result.to = this.convertToValue(this.coords.p_to_real), this.options.values.length && (this.result.from_value = this.options.values[this.result.from], this.result.to_value = this.options.values[this.result.to])), this.calcMinMax(), this.calcLabels()
            }
        }, calcPointerPercent: function () {
            return this.coords.w_rs ? (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer) ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs), void(this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100))) : void(this.coords.p_pointer = 0)
        }, convertToRealPercent: function (t) {
            var i = 100 - this.coords.p_handle;
            return t / i * 100
        }, convertToFakePercent: function (t) {
            var i = 100 - this.coords.p_handle;
            return t / 100 * i
        }, getHandleX: function () {
            var t = 100 - this.coords.p_handle, i = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
            return 0 > i ? i = 0 : i > t && (i = t), i
        }, calcHandlePercent: function () {
            this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100)
        }, chooseHandle: function (t) {
            if ("single" === this.options.type) return "single";
            var i = this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2;
            return t >= i ? this.options.to_fixed ? "from" : "to" : this.options.from_fixed ? "to" : "from"
        }, calcMinMax: function () {
            this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100, this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100)
        }, calcLabels: function () {
            this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2, this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake)) : (this.labels.w_from = this.$cache.from.outerWidth(!1), this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100, this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2, this.labels.p_from_left = this.toFixed(this.labels.p_from_left), this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake), this.labels.w_to = this.$cache.to.outerWidth(!1), this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100, this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2, this.labels.p_to_left = this.toFixed(this.labels.p_to_left), this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake), this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2, this.labels.p_single_left = this.toFixed(this.labels.p_single_left), this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake)))
        }, updateScene: function () {
            this.raf_id && (cancelAnimationFrame(this.raf_id), this.raf_id = null), clearTimeout(this.update_tm), this.update_tm = null, this.options && (this.drawHandles(), this.is_active ? this.raf_id = requestAnimationFrame(this.updateScene.bind(this)) : this.update_tm = setTimeout(this.updateScene.bind(this), 300))
        }, drawHandles: function () {
            this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && (this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base", this.is_resize = !0), (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) && (this.setMinMax(), this.calc(!0), this.drawLabels(), this.options.grid && (this.calcGridMargin(), this.calcGridLabels()), this.force_redraw = !0, this.coords.w_rs_old = this.coords.w_rs, this.drawShadow()), this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key) && ((this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) && (this.drawLabels(), this.$cache.bar[0].style.left = this.coords.p_bar_x + "%", this.$cache.bar[0].style.width = this.coords.p_bar_w + "%", "single" === this.options.type ? (this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%", this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.options.values.length ? this.$cache.input.prop("value", this.result.from_value) : this.$cache.input.prop("value", this.result.from), this.$cache.input.data("from", this.result.from)) : (this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%", this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%", (this.old_from !== this.result.from || this.force_redraw) && (this.$cache.from[0].style.left = this.labels.p_from_left + "%"), (this.old_to !== this.result.to || this.force_redraw) && (this.$cache.to[0].style.left = this.labels.p_to_left + "%"), this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.options.values.length ? this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value) : this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to), this.$cache.input.data("from", this.result.from), this.$cache.input.data("to", this.result.to)), this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || this.$cache.input.trigger("change"), this.old_from = this.result.from, this.old_to = this.result.to, this.is_resize || this.is_update || this.is_start || this.is_finish || this.callOnChange(), (this.is_key || this.is_click || this.is_first_update) && (this.is_key = !1, this.is_click = !1, this.is_first_update = !1, this.callOnFinish()), this.is_update = !1, this.is_resize = !1, this.is_finish = !1), this.is_start = !1, this.is_key = !1, this.is_click = !1, this.force_redraw = !1))
        }, drawLabels: function () {
            if (this.options) {
                var t, i, s, o = this.options.values.length, e = this.options.p_values;
                if (!this.options.hide_from_to) if ("single" === this.options.type) o ? (t = this.decorate(e[this.result.from]), this.$cache.single.html(t)) : (t = this.decorate(this._prettify(this.result.from), this.result.from), this.$cache.single.html(t)), this.calcLabels(), this.$cache.min[0].style.visibility = this.labels.p_single_left < this.labels.p_min + 1 ? "hidden" : "visible", this.$cache.max[0].style.visibility = this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1 ? "hidden" : "visible"; else {
                    o ? (this.options.decorate_both ? (t = this.decorate(e[this.result.from]), t += this.options.values_separator, t += this.decorate(e[this.result.to])) : t = this.decorate(e[this.result.from] + this.options.values_separator + e[this.result.to]), i = this.decorate(e[this.result.from]), s = this.decorate(e[this.result.to]), this.$cache.single.html(t), this.$cache.from.html(i), this.$cache.to.html(s)) : (this.options.decorate_both ? (t = this.decorate(this._prettify(this.result.from), this.result.from), t += this.options.values_separator, t += this.decorate(this._prettify(this.result.to), this.result.to)) : t = this.decorate(this._prettify(this.result.from) + this.options.values_separator + this._prettify(this.result.to), this.result.to), i = this.decorate(this._prettify(this.result.from), this.result.from), s = this.decorate(this._prettify(this.result.to), this.result.to), this.$cache.single.html(t), this.$cache.from.html(i), this.$cache.to.html(s)), this.calcLabels();
                    var h = Math.min(this.labels.p_single_left, this.labels.p_from_left),
                        r = this.labels.p_single_left + this.labels.p_single_fake,
                        n = this.labels.p_to_left + this.labels.p_to_fake, a = Math.max(r, n);
                    this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", this.result.from === this.result.to ? ("from" === this.target ? this.$cache.from[0].style.visibility = "visible" : "to" === this.target ? this.$cache.to[0].style.visibility = "visible" : this.target || (this.$cache.from[0].style.visibility = "visible"), this.$cache.single[0].style.visibility = "hidden", a = n) : (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", a = Math.max(r, n))) : (this.$cache.from[0].style.visibility = "visible", this.$cache.to[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden"), this.$cache.min[0].style.visibility = h < this.labels.p_min + 1 ? "hidden" : "visible", this.$cache.max[0].style.visibility = a > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
                }
            }
        }, drawShadow: function () {
            var t, i, s, o, e = this.options, h = this.$cache, r = "number" == typeof e.from_min && !isNaN(e.from_min),
                n = "number" == typeof e.from_max && !isNaN(e.from_max),
                a = "number" == typeof e.to_min && !isNaN(e.to_min),
                c = "number" == typeof e.to_max && !isNaN(e.to_max);
            "single" === e.type ? e.from_shadow && (r || n) ? (t = this.convertToPercent(r ? e.from_min : e.min), i = this.convertToPercent(n ? e.from_max : e.max) - t, t = this.toFixed(t - this.coords.p_handle / 100 * t), i = this.toFixed(i - this.coords.p_handle / 100 * i), t += this.coords.p_handle / 2, h.shad_single[0].style.display = "block", h.shad_single[0].style.left = t + "%", h.shad_single[0].style.width = i + "%") : h.shad_single[0].style.display = "none" : (e.from_shadow && (r || n) ? (t = this.convertToPercent(r ? e.from_min : e.min), i = this.convertToPercent(n ? e.from_max : e.max) - t, t = this.toFixed(t - this.coords.p_handle / 100 * t), i = this.toFixed(i - this.coords.p_handle / 100 * i), t += this.coords.p_handle / 2, h.shad_from[0].style.display = "block", h.shad_from[0].style.left = t + "%", h.shad_from[0].style.width = i + "%") : h.shad_from[0].style.display = "none", e.to_shadow && (a || c) ? (s = this.convertToPercent(a ? e.to_min : e.min), o = this.convertToPercent(c ? e.to_max : e.max) - s, s = this.toFixed(s - this.coords.p_handle / 100 * s), o = this.toFixed(o - this.coords.p_handle / 100 * o), s += this.coords.p_handle / 2, h.shad_to[0].style.display = "block", h.shad_to[0].style.left = s + "%", h.shad_to[0].style.width = o + "%") : h.shad_to[0].style.display = "none")
        }, callOnStart: function () {
            this.options.onStart && "function" == typeof this.options.onStart && this.options.onStart(this.result)
        }, callOnChange: function () {
            this.options.onChange && "function" == typeof this.options.onChange && this.options.onChange(this.result)
        }, callOnFinish: function () {
            this.options.onFinish && "function" == typeof this.options.onFinish && this.options.onFinish(this.result)
        }, callOnUpdate: function () {
            this.options.onUpdate && "function" == typeof this.options.onUpdate && this.options.onUpdate(this.result)
        }, toggleInput: function () {
            this.$cache.input.toggleClass("irs-hidden-input")
        }, convertToPercent: function (t, i) {
            var s, o, e = this.options.max - this.options.min, h = e / 100;
            return e ? (s = i ? t : t - this.options.min, o = s / h, this.toFixed(o)) : (this.no_diapason = !0, 0)
        }, convertToValue: function (t) {
            var i, s, o = this.options.min, e = this.options.max, h = o.toString().split(".")[1],
                r = e.toString().split(".")[1], n = 0, a = 0;
            if (0 === t) return this.options.min;
            if (100 === t) return this.options.max;
            h && (i = h.length, n = i), r && (s = r.length, n = s), i && s && (n = i >= s ? i : s), 0 > o && (a = Math.abs(o), o = +(o + a).toFixed(n), e = +(e + a).toFixed(n));
            var c, l = (e - o) / 100 * t + o, _ = this.options.step.toString().split(".")[1];
            return _ ? l = +l.toFixed(_.length) : (l /= this.options.step, l *= this.options.step, l = +l.toFixed(0)), a && (l -= a), c = _ ? +l.toFixed(_.length) : this.toFixed(l), c < this.options.min ? c = this.options.min : c > this.options.max && (c = this.options.max), c
        }, calcWithStep: function (t) {
            var i = Math.round(t / this.coords.p_step) * this.coords.p_step;
            return i > 100 && (i = 100), 100 === t && (i = 100), this.toFixed(i)
        }, checkMinInterval: function (t, i, s) {
            var o, e, h = this.options;
            return h.min_interval ? (o = this.convertToValue(t), e = this.convertToValue(i), "from" === s ? e - o < h.min_interval && (o = e - h.min_interval) : o - e < h.min_interval && (o = e + h.min_interval), this.convertToPercent(o)) : t
        }, checkMaxInterval: function (t, i, s) {
            var o, e, h = this.options;
            return h.max_interval ? (o = this.convertToValue(t), e = this.convertToValue(i), "from" === s ? e - o > h.max_interval && (o = e - h.max_interval) : o - e > h.max_interval && (o = e + h.max_interval), this.convertToPercent(o)) : t
        }, checkDiapason: function (t, i, s) {
            var o = this.convertToValue(t), e = this.options;
            return "number" != typeof i && (i = e.min), "number" != typeof s && (s = e.max), i > o && (o = i), o > s && (o = s), this.convertToPercent(o)
        }, toFixed: function (t) {
            return t = t.toFixed(20), +t
        }, _prettify: function (t) {
            return this.options.prettify_enabled ? this.options.prettify && "function" == typeof this.options.prettify ? this.options.prettify(t) : this.prettify(t) : t
        }, prettify: function (t) {
            var i = t.toString();
            return i.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator)
        }, checkEdges: function (t, i) {
            return this.options.force_edges ? (0 > t ? t = 0 : t > 100 - i && (t = 100 - i), this.toFixed(t)) : this.toFixed(t)
        }, validate: function () {
            var t, i, s = this.options, o = this.result, e = s.values, h = e.length;
            if ("string" == typeof s.min && (s.min = +s.min), "string" == typeof s.max && (s.max = +s.max), "string" == typeof s.from && (s.from = +s.from), "string" == typeof s.to && (s.to = +s.to), "string" == typeof s.step && (s.step = +s.step), "string" == typeof s.from_min && (s.from_min = +s.from_min), "string" == typeof s.from_max && (s.from_max = +s.from_max), "string" == typeof s.to_min && (s.to_min = +s.to_min), "string" == typeof s.to_max && (s.to_max = +s.to_max), "string" == typeof s.keyboard_step && (s.keyboard_step = +s.keyboard_step), "string" == typeof s.grid_num && (s.grid_num = +s.grid_num), s.max < s.min && (s.max = s.min), h) for (s.p_values = [], s.min = 0, s.max = h - 1, s.step = 1, s.grid_num = s.max, s.grid_snap = !0, i = 0; h > i; i++) t = +e[i], isNaN(t) ? t = e[i] : (e[i] = t, t = this._prettify(t)), s.p_values.push(t);
            ("number" != typeof s.from || isNaN(s.from)) && (s.from = s.min), ("number" != typeof s.to || isNaN(s.to)) && (s.to = s.max), "single" === s.type ? (s.from < s.min && (s.from = s.min), s.from > s.max && (s.from = s.max)) : (s.from < s.min && (s.from = s.min), s.from > s.max && (s.from = s.max), s.to < s.min && (s.to = s.min), s.to > s.max && (s.to = s.max), this.update_check.from && (this.update_check.from !== s.from && s.from > s.to && (s.from = s.to), this.update_check.to !== s.to && s.to < s.from && (s.to = s.from)), s.from > s.to && (s.from = s.to), s.to < s.from && (s.to = s.from)), ("number" != typeof s.step || isNaN(s.step) || !s.step || s.step < 0) && (s.step = 1), ("number" != typeof s.keyboard_step || isNaN(s.keyboard_step) || !s.keyboard_step || s.keyboard_step < 0) && (s.keyboard_step = 5), "number" == typeof s.from_min && s.from < s.from_min && (s.from = s.from_min), "number" == typeof s.from_max && s.from > s.from_max && (s.from = s.from_max), "number" == typeof s.to_min && s.to < s.to_min && (s.to = s.to_min), "number" == typeof s.to_max && s.from > s.to_max && (s.to = s.to_max), o && (o.min !== s.min && (o.min = s.min), o.max !== s.max && (o.max = s.max), (o.from < o.min || o.from > o.max) && (o.from = s.from), (o.to < o.min || o.to > o.max) && (o.to = s.to)), ("number" != typeof s.min_interval || isNaN(s.min_interval) || !s.min_interval || s.min_interval < 0) && (s.min_interval = 0), ("number" != typeof s.max_interval || isNaN(s.max_interval) || !s.max_interval || s.max_interval < 0) && (s.max_interval = 0), s.min_interval && s.min_interval > s.max - s.min && (s.min_interval = s.max - s.min), s.max_interval && s.max_interval > s.max - s.min && (s.max_interval = s.max - s.min)
        }, decorate: function (t, i) {
            var s = "", o = this.options;
            return o.prefix && (s += o.prefix), s += t, o.max_postfix && (o.values.length && t === o.p_values[o.max] ? (s += o.max_postfix, o.postfix && (s += " ")) : i === o.max && (s += o.max_postfix, o.postfix && (s += " "))), o.postfix && (s += o.postfix), s
        }, updateFrom: function () {
            this.result.from = this.options.from, this.result.from_percent = this.convertToPercent(this.result.from), this.options.values && (this.result.from_value = this.options.values[this.result.from])
        }, updateTo: function () {
            this.result.to = this.options.to, this.result.to_percent = this.convertToPercent(this.result.to), this.options.values && (this.result.to_value = this.options.values[this.result.to])
        }, updateResult: function () {
            this.result.min = this.options.min, this.result.max = this.options.max, this.updateFrom(), this.updateTo()
        }, appendGrid: function () {
            if (this.options.grid) {
                var t, i, s, o, e, h = this.options, r = h.max - h.min, n = h.grid_num, a = 0, c = 0, l = 4, _ = 0,
                    p = "";
                for (this.calcGridMargin(), h.grid_snap ? (n = r / h.step, a = this.toFixed(h.step / (r / 100))) : a = this.toFixed(100 / n), n > 4 && (l = 3), n > 7 && (l = 2), n > 14 && (l = 1), n > 28 && (l = 0), t = 0; n + 1 > t; t++) {
                    for (s = l, c = this.toFixed(a * t), c > 100 && (c = 100, s -= 2, 0 > s && (s = 0)), this.coords.big[t] = c, o = (c - a * (t - 1)) / (s + 1), i = 1; s >= i && 0 !== c; i++) _ = this.toFixed(c - o * i), p += '<span class="irs-grid-pol small" style="left: ' + _ + '%"></span>';
                    p += '<span class="irs-grid-pol" style="left: ' + c + '%"></span>', e = this.convertToValue(c), e = h.values.length ? h.p_values[e] : this._prettify(e), p += '<span class="irs-grid-text js-grid-text-' + t + '" style="left: ' + c + '%">' + e + "</span>"
                }
                this.coords.big_num = Math.ceil(n + 1), this.$cache.cont.addClass("irs-with-grid"), this.$cache.grid.html(p), this.cacheGridLabels()
            }
        }, cacheGridLabels: function () {
            var t, i, s = this.coords.big_num;
            for (i = 0; s > i; i++) t = this.$cache.grid.find(".js-grid-text-" + i), this.$cache.grid_labels.push(t);
            this.calcGridLabels()
        }, calcGridLabels: function () {
            var t, i, s = [], o = [], e = this.coords.big_num;
            for (t = 0; e > t; t++) this.coords.big_w[t] = this.$cache.grid_labels[t].outerWidth(!1), this.coords.big_p[t] = this.toFixed(this.coords.big_w[t] / this.coords.w_rs * 100), this.coords.big_x[t] = this.toFixed(this.coords.big_p[t] / 2), s[t] = this.toFixed(this.coords.big[t] - this.coords.big_x[t]), o[t] = this.toFixed(s[t] + this.coords.big_p[t]);
            for (this.options.force_edges && (s[0] < -this.coords.grid_gap && (s[0] = -this.coords.grid_gap, o[0] = this.toFixed(s[0] + this.coords.big_p[0]), this.coords.big_x[0] = this.coords.grid_gap), o[e - 1] > 100 + this.coords.grid_gap && (o[e - 1] = 100 + this.coords.grid_gap, s[e - 1] = this.toFixed(o[e - 1] - this.coords.big_p[e - 1]), this.coords.big_x[e - 1] = this.toFixed(this.coords.big_p[e - 1] - this.coords.grid_gap))), this.calcGridCollision(2, s, o), this.calcGridCollision(4, s, o), t = 0; e > t; t++) i = this.$cache.grid_labels[t][0], this.coords.big_x[t] !== Number.POSITIVE_INFINITY && (i.style.marginLeft = -this.coords.big_x[t] + "%")
        }, calcGridCollision: function (t, i, s) {
            var o, e, h, r = this.coords.big_num;
            for (o = 0; r > o && (e = o + t / 2, !(e >= r)); o += t) h = this.$cache.grid_labels[e][0], h.style.visibility = s[o] <= i[e] ? "visible" : "hidden"
        }, calcGridMargin: function () {
            this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && (this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100), this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1), this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%", this.$cache.grid[0].style.left = this.coords.grid_gap + "%"))
        }, update: function (i) {
            this.input && (this.is_update = !0, this.options.from = this.result.from, this.options.to = this.result.to, this.update_check.from = this.result.from, this.update_check.to = this.result.to, this.options = t.extend(this.options, i), this.validate(), this.updateResult(i), this.toggleInput(), this.remove(), this.init(!0))
        }, reset: function () {
            this.input && (this.updateResult(), this.update())
        }, destroy: function () {
            this.input && (this.toggleInput(), this.$cache.input.prop("readonly", !1), t.data(this.input, "ionRangeSlider", null), this.remove(), this.input = null, this.options = null)
        }
    }, t.fn.ionRangeSlider = function (i) {
        return this.each(function () {
            t.data(this, "ionRangeSlider") || t.data(this, "ionRangeSlider", new _(this, i, h++))
        })
    }, function () {
        for (var t = 0, i = ["ms", "moz", "webkit", "o"], o = 0; o < i.length && !s.requestAnimationFrame; ++o) s.requestAnimationFrame = s[i[o] + "RequestAnimationFrame"], s.cancelAnimationFrame = s[i[o] + "CancelAnimationFrame"] || s[i[o] + "CancelRequestAnimationFrame"];
        s.requestAnimationFrame || (s.requestAnimationFrame = function (i) {
            var o = (new Date).getTime(), e = Math.max(0, 16 - (o - t)), h = s.setTimeout(function () {
                i(o + e)
            }, e);
            return t = o + e, h
        }), s.cancelAnimationFrame || (s.cancelAnimationFrame = function (t) {
            clearTimeout(t)
        })
    }()
});
;!function (t) {
    var e = function (e, a, i) {
        var s, n = "object" == typeof a;
        this.format = "YYYY-MM-DD", this.startDate = moment().startOf("day"), this.endDate = moment().startOf("day"), this.minDate = !1, this.maxDate = moment().endOf("days"), this.dateLimit = !1, this.showDropdowns = !1, this.showWeekNumbers = !1, this.ranges = {}, this.opens = "right", this.buttonClasses = ["btn", "btn-small", "btn-cons"], this.applyClass = "btn-success btn-primary", this.cancelClass = "btn-default", this.separator = "~", this.timePicker = !1, this.timePickerIncrement = 1, this.timePicker12Hour = !1, this.locale = {
            applyLabel: "\u786e\u5b9a",
            cancelLabel: "\u53d6\u6d88",
            fromLabel: "\u4ece",
            toLabel: "\u5230",
            weekLabel: "W",
            customRangeLabel: "\u81ea\u5b9a\u4e49\u8303\u56f4",
            daysOfWeek: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
            monthNames: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
            firstDay: 0
        }, this.cb = function () {
        }, this.parentEl = "body", this.element = t(e), this.element.hasClass("pull-right") && (this.opens = "left"), this.element.is("input") ? this.element.on({
            click: t.proxy(this.show, this),
            focus: t.proxy(this.show, this)
        }) : this.element.on("click", t.proxy(this.show, this)), s = this.locale, n && ("object" == typeof a.locale && t.each(s, function (t, e) {
            s[t] = a.locale[t] || e
        }), a.applyClass && (this.applyClass = a.applyClass), a.cancelClass && (this.cancelClass = a.cancelClass));
        var r = '<div class="daterangepicker dropdown-menu"><div class="calendar left"></div><div class="calendar right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input" style="float: left"><label for="daterangepicker_start">' + this.locale.fromLabel + '</label><input class="input-mini" type="text" name="daterangepicker_start" value="" disabled="disabled" /></div><div class="daterangepicker_end_input" style="float: left; padding-left: 11px"><label for="daterangepicker_end">' + this.locale.toLabel + '</label><input class="input-mini" type="text" name="daterangepicker_end" value="" disabled="disabled" /></div><button class="' + this.applyClass + ' applyBtn" disabled="disabled">' + this.locale.applyLabel + '</button>&nbsp;<button class="' + this.cancelClass + ' cancelBtn">' + this.locale.cancelLabel + "</button></div></div></div>";
        if (this.parentEl = n && a.parentEl && t(a.parentEl) || t(this.parentEl), this.container = t(r).appendTo(this.parentEl), n) {
            if ("string" == typeof a.format && (this.format = a.format), "string" == typeof a.separator && (this.separator = a.separator), "string" == typeof a.startDate && (this.startDate = moment(a.startDate, this.format)), "string" == typeof a.endDate && (this.endDate = moment(a.endDate, this.format)), "string" == typeof a.minDate && (this.minDate = moment(a.minDate, this.format)), "string" == typeof a.maxDate && (this.maxDate = moment(a.maxDate, this.format)), "object" == typeof a.startDate && (this.startDate = moment(a.startDate)), "object" == typeof a.endDate && (this.endDate = moment(a.endDate)), "object" == typeof a.minDate && (this.minDate = moment(a.minDate)), "object" == typeof a.maxDate && (this.maxDate = moment(a.maxDate)), "object" == typeof a.ranges) {
                for (var o in a.ranges) {
                    var h = moment(a.ranges[o][0]), l = moment(a.ranges[o][1]);
                    this.minDate && h.isBefore(this.minDate) && (h = moment(this.minDate)), this.maxDate && l.isAfter(this.maxDate) && (l = moment(this.maxDate)), this.minDate && l.isBefore(this.minDate) || this.maxDate && h.isAfter(this.maxDate) || (this.ranges[o] = [h, l])
                }
                var d = "<ul>";
                for (var o in this.ranges) d += "<li>" + o + "</li>";
                d += "<li>" + this.locale.customRangeLabel + "</li>", d += "</ul>", this.container.find(".ranges").prepend(d)
            }
            if ("object" == typeof a.dateLimit && (this.dateLimit = a.dateLimit), "object" == typeof a.locale && ("object" == typeof a.locale.daysOfWeek && (this.locale.daysOfWeek = a.locale.daysOfWeek.slice()), "number" == typeof a.locale.firstDay)) {
                this.locale.firstDay = a.locale.firstDay;
                for (var c = a.locale.firstDay; c > 0;) this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), c--
            }
            "string" == typeof a.opens && (this.opens = a.opens), "boolean" == typeof a.showWeekNumbers && (this.showWeekNumbers = a.showWeekNumbers), "string" == typeof a.buttonClasses && (this.buttonClasses = [a.buttonClasses]), "object" == typeof a.buttonClasses && (this.buttonClasses = a.buttonClasses), "boolean" == typeof a.showDropdowns && (this.showDropdowns = a.showDropdowns), "boolean" == typeof a.timePicker && (this.timePicker = a.timePicker), "number" == typeof a.timePickerIncrement && (this.timePickerIncrement = a.timePickerIncrement), "boolean" == typeof a.timePicker12Hour && (this.timePicker12Hour = a.timePicker12Hour)
        }
        this.timePicker || (this.startDate = this.startDate.startOf("day"), this.endDate = this.endDate.startOf("day"));
        var m = this.container;
        if (t.each(this.buttonClasses, function (t, e) {
            m.find("button").addClass(e)
        }), "right" == this.opens) {
            var f = this.container.find(".calendar.left"), p = this.container.find(".calendar.right");
            f.removeClass("left").addClass("right"), p.removeClass("right").addClass("left")
        }
        if (("undefined" == typeof a || "undefined" == typeof a.ranges) && (this.container.find(".calendar").show(), this.move()), "function" == typeof i && (this.cb = i), this.container.addClass("opens" + this.opens), (!n || "undefined" == typeof a.startDate && "undefined" == typeof a.endDate) && t(this.element).is("input[type=text]")) {
            var h, l, u = t(this.element).val(), D = u.split(this.separator);
            2 == D.length && (h = moment(D[0], this.format), l = moment(D[1], this.format)), null != h && null != l && (this.startDate = h, this.endDate = l)
        }
        this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.leftCalendar = {
            month: moment([this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute()]),
            calendar: []
        }, this.rightCalendar = {
            month: moment([this.endDate.year(), this.endDate.month(), 1, this.endDate.hour(), this.endDate.minute()]),
            calendar: []
        }, this.container.on("mousedown", t.proxy(this.mousedown, this)), this.container.find(".calendar").on("click", ".prev", t.proxy(this.clickPrev, this)).on("click", ".next", t.proxy(this.clickNext, this)).on("click", "td.available", t.proxy(this.clickDate, this)).on("mouseenter", "td.available", t.proxy(this.enterDate, this)).on("mouseleave", "td.available", t.proxy(this.updateFormInputs, this)).on("change", "select.yearselect", t.proxy(this.updateMonthYear, this)).on("change", "select.monthselect", t.proxy(this.updateMonthYear, this)).on("change", "select.hourselect,select.minuteselect,select.ampmselect", t.proxy(this.updateTime, this)), this.container.find(".ranges").on("click", "button.applyBtn", t.proxy(this.clickApply, this)).on("click", "button.cancelBtn", t.proxy(this.clickCancel, this)).on("click", ".daterangepicker_start_input,.daterangepicker_end_input", t.proxy(this.showCalendars, this)).on("click", "li", t.proxy(this.clickRange, this)).on("mouseenter", "li", t.proxy(this.enterRange, this)).on("mouseleave", "li", t.proxy(this.updateFormInputs, this)), this.element.on("keyup", t.proxy(this.updateFromControl, this)), this.updateView(), this.updateCalendars()
    };
    e.prototype = {
        constructor: e, mousedown: function (t) {
            t.stopPropagation()
        }, updateView: function () {
            this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()), this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()), this.updateFormInputs()
        }, updateFormInputs: function () {
            this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format)), this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format)), this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate) ? this.container.find("button.applyBtn").removeAttr("disabled") : this.container.find("button.applyBtn").attr("disabled", "disabled")
        }, updateFromControl: function () {
            if (this.element.is("input") && this.element.val().length) {
                var t = this.element.val().split(this.separator), e = moment(t[0], this.format),
                    a = moment(t[1], this.format);
                null != e && null != a && (a.isBefore(e) || (this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.startDate = e, this.endDate = a, this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), this.updateCalendars()))
            }
        }, notify: function () {
            this.updateView(), this.cb(this.startDate, this.endDate)
        }, move: function () {
            var e = {
                top: this.parentEl.offset().top - (this.parentEl.is("body") ? 0 : this.parentEl.scrollTop()),
                left: this.parentEl.offset().left - (this.parentEl.is("body") ? 0 : this.parentEl.scrollLeft())
            };
            "left" == this.opens ? (this.container.css({
                top: this.element.offset().top + this.element.outerHeight() - e.top,
                right: t(window).width() - this.element.offset().left - this.element.outerWidth() - e.left,
                left: "auto"
            }), this.container.offset().left < 0 && this.container.css({
                right: "auto",
                left: 9
            })) : (this.container.css({
                top: this.element.offset().top + this.element.outerHeight() - e.top,
                left: this.element.offset().left - e.left,
                right: "auto"
            }), this.container.offset().left + this.container.outerWidth() > t(window).width() && this.container.css({
                left: "auto",
                right: 0
            }))
        }, show: function (e) {
            this.container.show(), this.move(), e && (e.stopPropagation(), e.preventDefault()), t(document).on("mousedown", t.proxy(this.hide, this)), this.element.trigger("shown", {
                target: e.target,
                picker: this
            })
        }, hide: function () {
            this.container.hide(), this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), t(document).off("mousedown", this.hide), this.element.trigger("hidden", {picker: this})
        }, enterRange: function (t) {
            var e = t.target.innerHTML;
            if (e == this.locale.customRangeLabel) this.updateView(); else {
                var a = this.ranges[e];
                this.container.find("input[name=daterangepicker_start]").val(a[0].format(this.format)), this.container.find("input[name=daterangepicker_end]").val(a[1].format(this.format))
            }
        }, showCalendars: function () {
            this.container.find(".calendar").show(), this.container.css("width", "655px"), this.move()
        }, updateInputText: function (t) {
            {
                var e = this.startDate.format(this.format) + this.separator + this.endDate.format(this.format);
                t ? t.target.innerHTML : e
            }
            this.element.is("input") && this.element.val(e), this.container.css("width", "auto")
        }, clickRange: function (t) {
            var e = t.target.innerHTML;
            if (e == this.locale.customRangeLabel) this.showCalendars(); else {
                var a = this.ranges[e];
                this.startDate = a[0], this.endDate = a[1], this.timePicker || (this.startDate.startOf("day"), this.endDate.startOf("day")), this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()), this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()), this.updateCalendars(), this.updateInputText(t), this.container.find(".calendar").hide(), this.hide()
            }
        }, clickPrev: function (e) {
            var a = t(e.target).parents(".calendar");
            a.hasClass("left") ? this.leftCalendar.month.subtract("month", 1) : this.rightCalendar.month.subtract("month", 1), this.updateCalendars()
        }, clickNext: function (e) {
            var a = t(e.target).parents(".calendar");
            a.hasClass("left") ? this.leftCalendar.month.add("month", 1) : this.rightCalendar.month.add("month", 1), this.updateCalendars()
        }, enterDate: function (e) {
            var a = t(e.target).attr("data-title"), i = a.substr(1, 1), s = a.substr(3, 1),
                n = t(e.target).parents(".calendar");
            n.hasClass("left") ? this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[i][s].format(this.format)) : this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[i][s].format(this.format))
        }, clickDate: function (e) {
            var a = t(e.target).attr("data-title"), i = a.substr(1, 1), s = a.substr(3, 1),
                n = t(e.target).parents(".calendar");
            if (n.hasClass("left")) {
                var r = this.leftCalendar.calendar[i][s], o = this.endDate;
                if ("object" == typeof this.dateLimit) {
                    var h = moment(r).add(this.dateLimit).startOf("day");
                    o.isAfter(h) && (o = h)
                }
            } else {
                var r = this.startDate, o = this.rightCalendar.calendar[i][s];
                if ("object" == typeof this.dateLimit) {
                    var l = moment(o).subtract(this.dateLimit).startOf("day");
                    r.isBefore(l) && (r = l)
                }
            }
            n.find("td").removeClass("active"), r.isSame(o) || r.isBefore(o) ? (t(e.target).addClass("active"), this.startDate = r, this.endDate = o) : r.isAfter(o) && (t(e.target).addClass("active"), this.startDate = r, this.endDate = moment(r).add("day", 1).startOf("day")), this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()), this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()), this.updateCalendars()
        }, clickApply: function () {
            this.updateInputText(), this.hide()
        }, clickCancel: function () {
            this.startDate = this.oldStartDate, this.endDate = this.oldEndDate, this.updateView(), this.updateCalendars(), this.hide()
        }, updateMonthYear: function (e) {
            var a = t(e.target).closest(".calendar").hasClass("left"), i = this.container.find(".calendar.left");
            a || (i = this.container.find(".calendar.right"));
            var s = parseInt(i.find(".monthselect").val(), 10), n = i.find(".yearselect").val();
            a ? this.leftCalendar.month.month(s).year(n) : this.rightCalendar.month.month(s).year(n), this.updateCalendars()
        }, updateTime: function (e) {
            var a = t(e.target).closest(".calendar").hasClass("left"), i = this.container.find(".calendar.left");
            a || (i = this.container.find(".calendar.right"));
            var s = parseInt(i.find(".hourselect").val()), n = parseInt(i.find(".minuteselect").val());
            if (this.timePicker12Hour) {
                var r = i.find(".ampmselect").val();
                "PM" == r && 12 > s && (s += 12), "AM" == r && 12 == s && (s = 0)
            }
            if (a) {
                var o = this.startDate.clone();
                o.hour(s), o.minute(n), this.startDate = o, this.leftCalendar.month.hour(s).minute(n)
            } else {
                var h = this.endDate.clone();
                h.hour(s), h.minute(n), this.endDate = h, this.rightCalendar.month.hour(s).minute(n)
            }
            this.updateCalendars()
        }, updateCalendars: function () {
            this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), "left"), this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), "right"), this.container.find(".calendar.left").html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate)), this.container.find(".calendar.right").html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, this.startDate, this.maxDate)), this.container.find(".ranges li").removeClass("active");
            var t, e = !0, a = 0;
            for (var i in this.ranges) this.timePicker ? (t = -1 == this.format.indexOf(":") ? "YYYY-MM-DD HH:mm" : this.format, this.startDate.format(t) == this.ranges[i][0].format(t) && this.endDate.format(t) == this.ranges[i][1].format(t) && (e = !1, this.container.find(".ranges li:eq(" + a + ")").addClass("active"), this.element.find("text").html(this.container.find(".ranges li:eq(" + a + ")").text()))) : this.startDate.format(this.format) == this.ranges[i][0].format(this.format) && this.endDate.format(this.format) == this.ranges[i][1].format(this.format) && (e = !1, this.container.find(".ranges li:eq(" + a + ")").addClass("active"), this.element.find("text").html(this.container.find(".ranges li:eq(" + a + ")").text())), a++;
            e && (this.container.find(".ranges li:last").addClass("active"), this.element.find("text").html(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format)))
        }, buildCalendar: function (t, e, a, i) {
            for (var s = moment([e, t, 1]), n = moment(s).subtract("month", 1).month(), r = moment(s).subtract("month", 1).year(), o = moment([r, n]).daysInMonth(), h = s.day(), l = [], d = 0; 6 > d; d++) l[d] = [];
            var c = o - h + this.locale.firstDay + 1;
            c > o && (c -= 7), h == this.locale.firstDay && (c = o - 6);
            for (var m = moment([r, n, c, 12, i]), d = 0, f = 0, p = 0; 42 > d; d++, f++, m = moment(m).add("hour", 24)) d > 0 && f % 7 == 0 && (f = 0, p++), l[p][f] = m.clone().hour(a), m.hour(12);
            return l
        }, renderDropdowns: function (t, e, a) {
            for (var i = t.month(), s = '<select class="monthselect">', n = !1, r = !1, o = 0; 12 > o; o++) (!n || o >= e.month()) && (!r || o <= a.month()) && (s += "<option value='" + o + "'" + (o === i ? " selected='selected'" : "") + ">" + this.locale.monthNames[o] + "</option>");
            s += "</select>";
            for (var h = t.year(), l = a && a.year() || h + 5, d = e && e.year() || h - 50, c = '<select class="yearselect">', m = d; l >= m; m++) c += '<option value="' + m + '"' + (m === h ? ' selected="selected"' : "") + ">" + m + "</option>";
            return c += "</select>", s + c
        }, renderCalendar: function (e, a, i, s) {
            var n = '<div class="calendar-date">';
            n += '<table class="table-condensed">', n += "<thead>", n += "<tr>", this.showWeekNumbers && (n += "<th></th>"), n += !i || i.isBefore(e[1][1]) ? '<th class="prev available"><i class="fa fa-arrow-left icon-chevron-left glyphicon glyphicon-arrow-left"></i></th>' : "<th></th>";
            var r = this.locale.monthNames[e[1][1].month()] + e[1][1].format(" YYYY");
            this.showDropdowns && (r = this.renderDropdowns(e[1][1], i, s)), n += '<th colspan="5" style="width: auto">' + r + "</th>", n += !s || s.isAfter(e[1][1]) ? '<th class="next available"><i class="fa fa-arrow-right icon-chevron-right glyphicon glyphicon-arrow-right"></i></th>' : "<th></th>", n += "</tr>", n += "<tr>", this.showWeekNumbers && (n += '<th class="week">' + this.locale.weekLabel + "</th>"), t.each(this.locale.daysOfWeek, function (t, e) {
                n += "<th>" + e + "</th>"
            }), n += "</tr>", n += "</thead>", n += "<tbody>";
            for (var o = 0; 6 > o; o++) {
                n += "<tr>", this.showWeekNumbers && (n += '<td class="week">' + e[o][0].week() + "</td>");
                for (var h = 0; 7 > h; h++) {
                    var l = "available ";
                    l += e[o][h].month() == e[1][1].month() ? "" : "off", i && e[o][h].isBefore(i) || s && e[o][h].isAfter(s) ? l = " off disabled " : e[o][h].format("YYYY-MM-DD") == a.format("YYYY-MM-DD") ? (l += " active ", e[o][h].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && (l += " start-date "), e[o][h].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && (l += " end-date ")) : e[o][h] >= this.startDate && e[o][h] <= this.endDate && (l += " in-range ", e[o][h].isSame(this.startDate) && (l += " start-date "), e[o][h].isSame(this.endDate) && (l += " end-date "));
                    var d = "r" + o + "c" + h;
                    n += '<td class="' + l.replace(/\s+/g, " ").replace(/^\s?(.*?)\s?$/, "$1") + '" data-title="' + d + '">' + e[o][h].date() + "</td>"
                }
                n += "</tr>"
            }
            if (n += "</tbody>", n += "</table>", n += "</div>", this.timePicker) {
                n += '<div class="calendar-time">', n += '<select class="hourselect">';
                var c = 0, m = 23, f = a.hour(), p = this.format.indexOf("HH");
                if (this.timePicker12Hour && (c = 1, m = 12, f >= 12 && (f -= 12), 0 == f && (f = 12)), p && !this.timePicker12Hour) for (var u = c; m >= u; u++) {
                    var D = u;
                    10 > D && (D = "0" + D), n += u == f ? '<option value="' + u + '" selected="selected">' + D + "</option>" : '<option value="' + u + '">' + D + "</option>"
                } else for (var u = c; m >= u; u++) n += u == f ? '<option value="' + u + '" selected="selected">' + u + "</option>" : '<option value="' + u + '">' + u + "</option>";
                n += "</select> : ", n += '<select class="minuteselect">';
                for (var u = 0; 60 > u; u += this.timePickerIncrement) {
                    var D = u;
                    10 > D && (D = "0" + D), n += u == a.minute() ? '<option value="' + u + '" selected="selected">' + D + "</option>" : '<option value="' + u + '">' + D + "</option>"
                }
                n += "</select> ", this.timePicker12Hour && (n += '<select class="ampmselect">', n += a.hour() >= 12 ? '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>' : '<option value="AM" selected="selected">AM</option><option value="PM">PM</option>', n += "</select>"), n += "</div>"
            }
            return n
        }
    }, t.fn.daterangepicker = function (a, i) {
        return this.each(function () {
            var s = t(this);
            s.data("daterangepicker") || s.data("daterangepicker", new e(s, a, i))
        }), this
    }
}(window.jQuery);
;!function () {
    function e(e) {
        console.log("$f.fireEvent", [].slice.call(e))
    }

    function t(e) {
        if (!e || "object" != typeof e) return e;
        var n = new e.constructor;
        for (var r in e) e.hasOwnProperty(r) && (n[r] = t(e[r]));
        return n
    }

    function n(e, t) {
        if (e) {
            var n, r = 0, i = e.length;
            if (void 0 === i) {
                for (n in e) if (t.call(e[n], n, e[n]) === !1) break
            } else for (var o = e[0]; i > r && t.call(o, r, o) !== !1; o = e[++r]) ;
            return e
        }
    }

    function r(e) {
        return document.getElementById(e)
    }

    function i(e, t, r) {
        return "object" != typeof t ? e : (e && t && n(t, function (t, n) {
            r && "function" == typeof n || (e[t] = n)
        }), e)
    }

    function o(e) {
        var t = e.indexOf(".");
        if (-1 != t) {
            var r = e.slice(0, t) || "*", i = e.slice(t + 1, e.length), o = [];
            return n(document.getElementsByTagName(r), function () {
                this.className && -1 != this.className.indexOf(i) && o.push(this)
            }), o
        }
    }

    function a(e) {
        return e = e || window.event, e.preventDefault ? (e.stopPropagation(), e.preventDefault()) : (e.returnValue = !1, e.cancelBubble = !0), !1
    }

    function u(e, t, n) {
        e[t] = e[t] || [], e[t].push(n)
    }

    function l() {
        return "_" + ("" + Math.random()).slice(2, 10)
    }

    function s(o, s, f) {
        function g() {
            function e(e) {
                var t = S.hasiPadSupport && S.hasiPadSupport();
                return !/iPad|iPhone|iPod/i.test(navigator.userAgent) || /.flv$/i.test(C[0].url) || t ? (S.isLoaded() || S._fireEvent("onBeforeClick") === !1 || S.load(), a(e)) : !0
            }

            function t() {
                "" !== h.replace(/\s/g, "") ? o.addEventListener ? o.addEventListener("click", e, !1) : o.attachEvent && o.attachEvent("onclick", e) : (o.addEventListener && o.addEventListener("click", a, !1), S.load())
            }

            $f(o) ? ($f(o).getParent().innerHTML = "", w = $f(o).getIndex(), p[w] = S) : (p.push(S), w = p.length - 1), E = parseInt(o.style.height, 10) || o.clientHeight, y = o.id || "fp" + l(), m = s.id || y + "_api", s.id = m, f.playerId = y, "string" == typeof f && (f = {clip: {url: f}}), "string" == typeof f.clip && (f.clip = {url: f.clip}), f.clip = f.clip || {}, o.getAttribute("href", 2) && !f.clip.url && (f.clip.url = o.getAttribute("href", 2)), v = new c(f.clip, -1, S), f.playlist = f.playlist || [f.clip];
            var r = 0;
            n(f.playlist, function () {
                var e = this;
                "object" == typeof e && e.length && (e = {url: "" + e}), n(f.clip, function (t, n) {
                    void 0 !== n && void 0 === e[t] && "function" != typeof n && (e[t] = n)
                }), f.playlist[r] = e, e = new c(e, r, S), C.push(e), r++
            }), n(f, function (e, t) {
                "function" == typeof t && (v[e] ? v[e](t) : u(x, e, t), delete f[e])
            }), n(f.plugins, function (e, t) {
                t && (k[e] = new d(e, t, S))
            }), f.plugins && void 0 !== f.plugins.controls || (k.controls = new d("controls", null, S)), k.canvas = new d("canvas", null, S), h = o.innerHTML, setTimeout(t, 0)
        }

        var h, v, y, m, w, b, _, E, S = this, L = null, P = !1, C = [], k = {}, x = {};
        if (i(S, {
            id: function () {
                return y
            }, isLoaded: function () {
                return null !== L && void 0 !== L.fp_play && !P
            }, getParent: function () {
                return o
            }, hide: function (e) {
                return e && (o.style.height = "0px"), S.isLoaded() && (L.style.height = "0px"), S
            }, show: function () {
                return o.style.height = E + "px", S.isLoaded() && (L.style.height = _ + "px"), S
            }, isHidden: function () {
                return S.isLoaded() && 0 === parseInt(L.style.height, 10)
            }, load: function (e) {
                if (!S.isLoaded() && S._fireEvent("onBeforeLoad") !== !1) {
                    var t = function () {
                        h = o.innerHTML, h && !flashembed.isSupported(s.version) && (o.innerHTML = ""), e && (e.cached = !0, u(x, "onLoad", e)), flashembed(o, s, {config: f})
                    }, r = 0;
                    n(p, function () {
                        this.unload(function () {
                            ++r == p.length && t()
                        })
                    })
                }
                return S
            }, unload: function (e) {
                if (this.isFullscreen() && /WebKit/i.test(navigator.userAgent)) return e && e(!1), S;
                if ("" !== h.replace(/\s/g, "")) {
                    if (S._fireEvent("onBeforeUnload") === !1) return e && e(!1), S;
                    P = !0;
                    try {
                        L && (L.fp_close(), S._fireEvent("onUnload"))
                    } catch (t) {
                    }
                    var n = function () {
                        L = null, o.innerHTML = h, P = !1, e && e(!0)
                    };
                    setTimeout(n, 50)
                } else e && e(!1);
                return S
            }, getClip: function (e) {
                return void 0 === e && (e = b), C[e]
            }, getCommonClip: function () {
                return v
            }, getPlaylist: function () {
                return C
            }, getPlugin: function (e) {
                var t = k[e];
                if (!t && S.isLoaded()) {
                    var n = S._api().fp_getPlugin(e);
                    n && (t = new d(e, n, S), k[e] = t)
                }
                return t
            }, getScreen: function () {
                return S.getPlugin("screen")
            }, getControls: function () {
                return S.getPlugin("controls")._fireEvent("onUpdate")
            }, getLogo: function () {
                try {
                    return S.getPlugin("logo")._fireEvent("onUpdate")
                } catch (e) {
                }
            }, getPlay: function () {
                return S.getPlugin("play")._fireEvent("onUpdate")
            }, getConfig: function (e) {
                return e ? t(f) : f
            }, getFlashParams: function () {
                return s
            }, loadPlugin: function (e, t, n, r) {
                "function" == typeof n && (r = n, n = {});
                var i = r ? l() : "_";
                S._api().fp_loadPlugin(e, t, n, i);
                var o = {};
                o[i] = r;
                var a = new d(e, null, S, o);
                return k[e] = a, a
            }, getState: function () {
                return S.isLoaded() ? L.fp_getState() : -1
            }, play: function (e, t) {
                var n = function () {
                    void 0 !== e ? S._api().fp_play(e, t) : S._api().fp_play()
                };
                return S.isLoaded() ? n() : P ? setTimeout(function () {
                    S.play(e, t)
                }, 50) : S.load(function () {
                    n()
                }), S
            }, getVersion: function () {
                var e = "flowplayer.js 3.2.6";
                if (S.isLoaded()) {
                    var t = L.fp_getVersion();
                    return t.push(e), t
                }
                return e
            }, _api: function () {
                if (!S.isLoaded()) throw"Flowplayer " + S.id() + " not loaded when calling an API method";
                return L
            }, setClip: function (e) {
                return S.setPlaylist([e]), S
            }, getIndex: function () {
                return w
            }, _swfHeight: function () {
                return L.clientHeight
            }
        }), n("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut".split(","), function () {
            var e = "on" + this;
            if (-1 != e.indexOf("*")) {
                e = e.slice(0, e.length - 1);
                var t = "onBefore" + e.slice(2);
                S[t] = function (e) {
                    return u(x, t, e), S
                }
            }
            S[e] = function (t) {
                return u(x, e, t), S
            }
        }), n("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled".split(","), function () {
            var e = this;
            S[e] = function (t, n) {
                if (!S.isLoaded()) return S;
                var r = null;
                return r = void 0 !== t && void 0 !== n ? L["fp_" + e](t, n) : void 0 === t ? L["fp_" + e]() : L["fp_" + e](t), "undefined" === r || void 0 === r ? S : r
            }
        }), S._fireEvent = function (t) {
            "string" == typeof t && (t = [t]);
            var i = t[0], o = t[1], a = t[2], u = t[3], l = 0;
            if (f.debug && e(t), S.isLoaded() || "onLoad" != i || "player" != o || (L = L || r(m), _ = S._swfHeight(), n(C, function () {
                this._fireEvent("onLoad")
            }), n(k, function (e, t) {
                t._fireEvent("onUpdate")
            }), v._fireEvent("onLoad")), "onLoad" != i || "player" == o) {
                if ("onError" == i && ("string" == typeof o || "number" == typeof o && "number" == typeof a) && (o = a, a = u), "onContextMenu" == i) return void n(f.contextMenu[o], function (e, t) {
                    t.call(S)
                });
                if ("onPluginEvent" != i && "onBeforePluginEvent" != i) {
                    if ("onPlaylistReplace" == i) {
                        C = [];
                        var s = 0;
                        n(o, function () {
                            C.push(new c(this, s++, S))
                        })
                    }
                    if ("onClipAdd" == i) {
                        if (o.isInStream) return;
                        for (o = new c(o, a, S), C.splice(a, 0, o), l = a + 1; l < C.length; l++) C[l].index++
                    }
                    var d = !0;
                    if ("number" == typeof o && o < C.length) {
                        b = o;
                        var p = C[o];
                        p && (d = p._fireEvent(i, a, u)), p && d === !1 || (d = v._fireEvent(i, a, u, p))
                    }
                    return n(x[i], function () {
                        return d = this.call(S, o, a), this.cached && x[i].splice(l, 1), d === !1 ? !1 : void l++
                    }), d
                }
                var g = o.name || o, h = k[g];
                if (h) return h._fireEvent("onUpdate", o), h._fireEvent(a, t.slice(3))
            }
        }, "string" == typeof o) {
            var T = r(o);
            if (!T) throw"Flowplayer cannot access element: " + o;
            o = T, g()
        } else g()
    }

    function f(e) {
        this.length = e.length, this.each = function (t) {
            n(e, t)
        }, this.size = function () {
            return e.length
        }
    }

    var c = function (e, t, r) {
        var o = this, a = {}, s = {};
        if (o.index = t, "string" == typeof e && (e = {url: e}), i(this, e, !0), n("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop".split(","), function () {
            var e = "on" + this;
            if (-1 != e.indexOf("*")) {
                e = e.slice(0, e.length - 1);
                var n = "onBefore" + e.slice(2);
                o[n] = function (e) {
                    return u(s, n, e), o
                }
            }
            o[e] = function (t) {
                return u(s, e, t), o
            }, -1 == t && (o[n] && (r[n] = o[n]), o[e] && (r[e] = o[e]))
        }), i(this, {
            onCuepoint: function (e, n) {
                if (1 == arguments.length) return a.embedded = [null, e], o;
                "number" == typeof e && (e = [e]);
                var i = l();
                return a[i] = [e, n], r.isLoaded() && r._api().fp_addCuepoints(e, t, i), o
            }, update: function (e) {
                i(o, e), r.isLoaded() && r._api().fp_updateClip(e, t);
                var n = r.getConfig(), a = -1 == t ? n.clip : n.playlist[t];
                i(a, e, !0)
            }, _fireEvent: function (e, u, l, f) {
                if ("onLoad" == e) return n(a, function (e, n) {
                    n[0] && r._api().fp_addCuepoints(n[0], t, e)
                }), !1;
                if (f = f || o, "onCuepoint" == e) {
                    var c = a[u];
                    if (c) return c[1].call(r, f, l)
                }
                u && -1 != "onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(e) && (i(f, u), u.metaData && (f.duration ? f.fullDuration = u.metaData.duration : f.duration = u.metaData.duration));
                var d = !0;
                return n(s[e], function () {
                    d = this.call(r, f, u, l)
                }), d
            }
        }), e.onCuepoint) {
            var f = e.onCuepoint;
            o.onCuepoint.apply(o, "function" == typeof f ? [f] : f), delete e.onCuepoint
        }
        n(e, function (t, n) {
            "function" == typeof n && (u(s, t, n), delete e[t])
        }), -1 == t && (r.onCuepoint = this.onCuepoint)
    }, d = function (e, t, r, o) {
        var a = this, u = {}, s = !1;
        o && i(u, o), n(t, function (e, n) {
            "function" == typeof n && (u[e] = n, delete t[e])
        }), i(this, {
            animate: function (n, i, o) {
                if (!n) return a;
                if ("function" == typeof i && (o = i, i = 500), "string" == typeof n) {
                    var s = n;
                    n = {}, n[s] = i, i = 500
                }
                if (o) {
                    var f = l();
                    u[f] = o
                }
                return void 0 === i && (i = 500), t = r._api().fp_animate(e, n, i, f), a
            }, css: function (n, o) {
                if (void 0 !== o) {
                    var u = {};
                    u[n] = o, n = u
                }
                return t = r._api().fp_css(e, n), i(a, t), a
            }, show: function () {
                return this.display = "block", r._api().fp_showPlugin(e), a
            }, hide: function () {
                return this.display = "none", r._api().fp_hidePlugin(e), a
            }, toggle: function () {
                return this.display = r._api().fp_togglePlugin(e), a
            }, fadeTo: function (t, n, i) {
                if ("function" == typeof n && (i = n, n = 500), i) {
                    var o = l();
                    u[o] = i
                }
                return this.display = r._api().fp_fadeTo(e, t, n, o), this.opacity = t, a
            }, fadeIn: function (e, t) {
                return a.fadeTo(1, e, t)
            }, fadeOut: function (e, t) {
                return a.fadeTo(0, e, t)
            }, getName: function () {
                return e
            }, getPlayer: function () {
                return r
            }, _fireEvent: function (t, o) {
                if ("onUpdate" == t) {
                    var l = r._api().fp_getPlugin(e);
                    if (!l) return;
                    i(a, l), delete a.methods, s || (n(l.methods, function () {
                        var t = "" + this;
                        a[t] = function () {
                            var n = [].slice.call(arguments), i = r._api().fp_invoke(e, t, n);
                            return "undefined" === i || void 0 === i ? a : i
                        }
                    }), s = !0)
                }
                var f = u[t];
                if (f) {
                    var c = f.apply(a, o);
                    return "_" == t.slice(0, 1) && delete u[t], c
                }
                return a
            }
        })
    }, p = [];
    window.flowplayer = window.$f = function () {
        var e = null, a = arguments[0];
        if (!arguments.length) return n(p, function () {
            return this.isLoaded() ? (e = this, !1) : void 0
        }), e || p[0];
        if (1 == arguments.length) return "number" == typeof a ? p[a] : "*" == a ? new f(p) : (n(p, function () {
            return this.id() == a.id || this.id() == a || this.getParent() == a ? (e = this, !1) : void 0
        }), e);
        if (arguments.length > 1) {
            var u = arguments[1], l = 3 == arguments.length ? arguments[2] : {};
            if ("string" == typeof u && (u = {src: u}), u = i({
                bgcolor: "#000000",
                version: [9, 0],
                expressInstall: "http://static.flowplayer.org/swf/expressinstall.swf",
                cachebusting: !1
            }, u), "string" == typeof a) {
                if (-1 != a.indexOf(".")) {
                    var c = [];
                    return n(o(a), function () {
                        c.push(new s(this, t(u), t(l)))
                    }), new f(c)
                }
                var d = r(a);
                return new s(null !== d ? d : a, u, l)
            }
            if (a) return new s(a, u, l)
        }
        return null
    }, i(window.$f, {
        fireEvent: function () {
            var e = [].slice.call(arguments), t = $f(e[0]);
            return t ? t._fireEvent(e.slice(1)) : null
        }, addPlugin: function (e, t) {
            return s.prototype[e] = t, $f
        }, each: n, extend: i
    }), "function" == typeof jQuery && (jQuery.fn.flowplayer = function (e, n) {
        if (!arguments.length || "number" == typeof arguments[0]) {
            var r = [];
            return this.each(function () {
                var e = $f(this);
                e && r.push(e)
            }), arguments.length ? r[arguments[0]] : new f(r)
        }
        return this.each(function () {
            $f(this, t(e), n ? t(n) : {})
        })
    })
}(), function () {
    function e() {
        if (s.done) return !1;
        var e = document;
        if (e && e.getElementsByTagName && e.getElementById && e.body) {
            clearInterval(s.timer), s.timer = null;
            for (var t = 0; t < s.ready.length; t++) s.ready[t].call();
            s.ready = null, s.done = !0
        }
    }

    function t(e, t) {
        if (t) for (key in t) t.hasOwnProperty(key) && (e[key] = t[key]);
        return e
    }

    function n(e) {
        switch (r(e)) {
            case"string":
                return e = e.replace(new RegExp('(["\\\\])', "g"), "\\$1"), e = e.replace(/^\s?(\d+)%/, "$1pct"), '"' + e + '"';
            case"array":
                return "[" + i(e, function (e) {
                    return n(e)
                }).join(",") + "]";
            case"function":
                return '"function()"';
            case"object":
                var t = [];
                for (var o in e) e.hasOwnProperty(o) && t.push('"' + o + '":' + n(e[o]));
                return "{" + t.join(",") + "}"
        }
        return String(e).replace(/\s/g, " ").replace(/\'/g, '"')
    }

    function r(e) {
        if (null === e || void 0 === e) return !1;
        var t = typeof e;
        return "object" == t && e.push ? "array" : t
    }

    function i(e, t) {
        var n = [];
        for (var r in e) e.hasOwnProperty(r) && (n[r] = t(e[r]));
        return n
    }

    function o(e, r) {
        var i = t({}, e), o = document.all, a = '<object width="' + i.width + '" height="' + i.height + '"';
        o && !i.id && (i.id = "_" + ("" + Math.random()).substring(9)), i.id && (a += ' id="' + i.id + '"'), i.cachebusting && (i.src += (-1 != i.src.indexOf("?") ? "&" : "?") + Math.random()), a += i.w3c || !o ? ' data="' + i.src + '" type="application/x-shockwave-flash"' : ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', a += ">", (i.w3c || o) && (a += '<param name="movie" value="' + i.src + '" />'), i.width = i.height = i.id = i.w3c = i.src = null;
        for (var u in i) null !== i[u] && (a += '<param name="' + u + '" value="' + i[u] + '" />');
        var l = "";
        if (r) {
            for (var s in r) null !== r[s] && (l += s + "=" + ("object" == typeof r[s] ? n(r[s]) : r[s]) + "&");
            l = l.substring(0, l.length - 1), a += '<param name="flashvars" value=\'' + l + "' />"
        }
        return a += "</object>"
    }

    function a(e, n, r) {
        var i = flashembed.getVersion();
        t(this, {
            getContainer: function () {
                return e
            }, getConf: function () {
                return n
            }, getVersion: function () {
                return i
            }, getFlashvars: function () {
                return r
            }, getApi: function () {
                return e.firstChild
            }, getHTML: function () {
                return o(n, r)
            }
        });
        var a = n.version, u = n.expressInstall, l = !a || flashembed.isSupported(a);
        if (l ? (n.onFail = n.version = n.expressInstall = null, e.innerHTML = o(n, r)) : a && u && flashembed.isSupported([6, 65]) ? (t(n, {src: u}), r = {
            MMredirectURL: location.href,
            MMplayerType: "PlugIn",
            MMdoctitle: document.title
        }, e.innerHTML = o(n, r)) : "" !== e.innerHTML.replace(/\s/g, "") || (e.innerHTML = "<h2>Flash version " + a + " or greater is required</h2><h3>" + (i[0] > 0 ? "Your version is " + i : "You have no flash plugin installed") + "</h3>" + ("A" == e.tagName ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>"), "A" == e.tagName && (e.onclick = function () {
            location.href = "http://www.adobe.com/go/getflashplayer"
        })), !l && n.onFail) {
            var s = n.onFail.call(this);
            "string" == typeof s && (e.innerHTML = s)
        }
        document.all && (window[n.id] = document.getElementById(n.id))
    }

    var u = "function" == typeof jQuery, l = {
        width: "100%",
        height: "100%",
        allowfullscreen: !0,
        allowscriptaccess: "always",
        quality: "high",
        version: null,
        onFail: null,
        expressInstall: null,
        w3c: !1,
        cachebusting: !1
    };
    u && (jQuery.tools = jQuery.tools || {}, jQuery.tools.flashembed = {version: "1.0.4", conf: l});
    var s = u ? jQuery : function (t) {
        return s.done ? t() : void(s.timer ? s.ready.push(t) : (s.ready = [t], s.timer = setInterval(e, 13)))
    };
    window.attachEvent && window.attachEvent("onbeforeunload", function () {
        __flash_unloadHandler = function () {
        }, __flash_savedUnloadHandler = function () {
        }
    }), window.flashembed = function (e, n, r) {
        if ("string" == typeof e) {
            var i = document.getElementById(e);
            if (!i) return void s(function () {
                flashembed(e, n, r)
            });
            e = i
        }
        if (e) {
            "string" == typeof n && (n = {src: n});
            var o = t({}, l);
            return t(o, n), new a(e, o, r)
        }
    }, t(window.flashembed, {
        getVersion: function () {
            var e = [0, 0];
            if (navigator.plugins && "object" == typeof navigator.plugins["Shockwave Flash"]) {
                var t = navigator.plugins["Shockwave Flash"].description;
                if ("undefined" != typeof t) {
                    t = t.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    var n = parseInt(t.replace(/^(.*)\..*$/, "$1"), 10),
                        r = /r/.test(t) ? parseInt(t.replace(/^.*r(.*)$/, "$1"), 10) : 0;
                    e = [n, r]
                }
            } else if (window.ActiveXObject) {
                try {
                    var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
                } catch (o) {
                    try {
                        i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), e = [6, 0], i.AllowScriptAccess = "always"
                    } catch (a) {
                        if (6 == e[0]) return e
                    }
                    try {
                        i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                    } catch (u) {
                    }
                }
                "object" == typeof i && (t = i.GetVariable("$version"), "undefined" != typeof t && (t = t.replace(/^\S+\s+(.*)$/, "$1").split(","), e = [parseInt(t[0], 10), parseInt(t[2], 10)]))
            }
            return e
        }, isSupported: function (e) {
            var t = flashembed.getVersion(), n = t[0] > e[0] || t[0] == e[0] && t[1] >= e[1];
            return n
        }, domReady: s, asString: n, getHTML: o
    }), u && (jQuery.fn.flashembed = function (e, t) {
        var n = null;
        return this.each(function () {
            n = flashembed(this, e, t)
        }), e.api === !1 ? this : n
    })
}(), function () {
    function e() {
        if (!u && (u = !0, l)) {
            for (var e = 0; e < l.length; e++) l[e].call(window, []);
            l = []
        }
    }

    function t(e) {
        var t = window.onload;
        window.onload = "function" != typeof window.onload ? e : function () {
            t && t(), e()
        }
    }

    function n() {
        if (!a) {
            if (a = !0, document.addEventListener && !o.opera && document.addEventListener("DOMContentLoaded", e, !1), o.msie && window == top && function () {
                if (!u) {
                    try {
                        document.documentElement.doScroll("left")
                    } catch (t) {
                        return void setTimeout(arguments.callee, 0)
                    }
                    e()
                }
            }(), o.opera && document.addEventListener("DOMContentLoaded", function () {
                if (!u) {
                    for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].disabled) return void setTimeout(arguments.callee, 0);
                    e()
                }
            }, !1), o.safari) {
                var n;
                !function () {
                    if (!u) {
                        if ("loaded" != document.readyState && "complete" != document.readyState) return void setTimeout(arguments.callee, 0);
                        if (void 0 === n) {
                            for (var t = document.getElementsByTagName("link"), r = 0; r < t.length; r++) "stylesheet" == t[r].getAttribute("rel") && n++;
                            var i = document.getElementsByTagName("style");
                            n += i.length
                        }
                        return document.styleSheets.length != n ? void setTimeout(arguments.callee, 0) : void e()
                    }
                }()
            }
            t(e)
        }
    }

    var r = window.DomReady = {}, i = navigator.userAgent.toLowerCase(), o = {
        version: (i.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(i),
        opera: /opera/.test(i),
        msie: /msie/.test(i) && !/opera/.test(i),
        mozilla: /mozilla/.test(i) && !/(compatible|webkit)/.test(i)
    }, a = !1, u = !1, l = [];
    r.ready = function (e) {
        n(), u ? e.call(window, []) : l.push(function () {
            return e.call(window, [])
        })
    }, n()
}(), function (e, t) {
    "use strict";

    function n(e, t) {
        return e.canPlayType(t) || g && t.search("mp4") > -1
    }

    function r(e) {
        for (var r = t.getElementsByTagName(e), o = [], u = 0; u < r.length; u++) o.push(r[u]);
        for (u = 0; u < o.length; u++) {
            var l = o[u], s = !0;
            if (l.canPlayType) if (l.src) n(l, a(e, l.src)) && (s = !1); else for (var f = l.getElementsByTagName("source"), c = 0; c < f.length; c++) {
                var d = f[c];
                if (n(l, a(e, d.src, d.type))) {
                    s = !1;
                    break
                }
            }
            s || i.forceFallback(e, l) ? i.createFallback(e, l) : g && l.addEventListener("click", function () {
                this.play()
            }, !1)
        }
    }

    function i() {
        r("video"), r("audio")
    }

    function o(e) {
        return e.split("/").slice(0, -1).join("/") + "/"
    }

    function a(e, t, n) {
        if (n) return n;
        var r = /\.([a-z1-9]+)(\?|#|\s|$)/i.exec(t);
        if (r) {
            var i = C[e][r[1]];
            if (i) return i
        }
        return L[e]
    }

    function u(e, t) {
        var n = e.getAttribute(t);
        return !!n || "string" == typeof n
    }

    function l(e) {
        var n = t.createElement("a");
        return n.href = e, n.href
    }

    function s(n, r, i) {
        var o = n.getAttribute(r);
        if (o) return o + "px";
        var a;
        if (n.currentStyle) a = n.currentStyle[r]; else {
            if (!e.getComputedStyle) return i;
            a = t.defaultView.getComputedStyle(n, null).getPropertyValue(r)
        }
        return "auto" == a ? i : a
    }

    function f(e) {
        return e.match(/\s*([\w-]+\/[\w-]+)(;|\s|$)/)[1]
    }

    function c(e, t) {
        return f(e) == f(t)
    }

    var d = "video", p = "audio";
    t.createElement(d).canPlayType || (t.createElement(p), t.createElement("source"));
    var g = null !== e.navigator.userAgent.toLowerCase().match(/android 2\.[12]/),
        h = null !== e.navigator.userAgent.toLowerCase().match(/opera/);
    i.forceFallback = function () {
        return !1
    };
    var v = function () {
        for (var e = t.getElementsByTagName("script"), n = 0; n < e.length; n++) {
            var r = e[n];
            if (r.src.match(/html5media(\.min|)\.js/)) return o(r.src)
        }
        return ""
    }();
    i.flowplayerSwf = v + "flowplayer.swf", i.flowplayerAudioSwf = v + "flowplayer.audio.swf", i.flowplayerControlsSwf = v + "flowplayer.controls.swf", i.expressInstallSwf = v + "expressInstall.swf";
    var y = 'video/ogg; codecs="theora, vorbis"', m = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
        w = 'audio/ogg; codecs="vorbis"', b = "video/webm;", _ = "audio/x-m4a;", E = "audio/mpeg;",
        S = 'audio/wav; codecs="1"', L = {video: m, audio: E}, P = [m, _, E], C = {
            video: {
                ogg: y,
                ogv: y,
                avi: m,
                mp4: m,
                mkv: m,
                h264: m,
                264: m,
                avc: m,
                m4v: m,
                "3gp": m,
                "3gpp": m,
                "3g2": m,
                mpg: m,
                mpeg: m,
                webm: b
            }, audio: {ogg: w, oga: w, aac: _, m4a: _, mp3: E, wav: S}
        };
    i.configureFlowplayer = function (e, t) {
        return t
    }, i.createFallback = function (e, n) {
        var r = u(n, "controls"), o = n.getAttribute("poster") || "", f = n.getAttribute("src") || "";
        if (!f) for (var p = n.getElementsByTagName("source"), g = 0; g < p.length; g++) {
            var v = p[g], y = v.getAttribute("src");
            if (y) for (var m = 0; m < P.length; m++) {
                var w = P[m];
                if (c(w, a(e, y, v.getAttribute("type")))) {
                    f = y;
                    break
                }
            }
            if (f) break
        }
        if (f) {
            var b = t.createElement("span");
            b.id = n.id, b.style.cssText = n.style.cssText, b.className = n.className, b.title = n.title, b.style.display = "block", b.style.width = s(n, "width", "300px"), b.style.height = "audio" == e ? "26px" : s(n, "height", "200px"), n.parentNode.replaceChild(b, n);
            var _ = (n.getAttribute("preload") || "").toLowerCase(), E = [];
            o && E.push({url: l(o)}), f && E.push({
                url: l(f),
                autoPlay: u(n, "autoplay"),
                autoBuffering: u(n, "autobuffer") || u(n, "preload") && ("" === _ || "auto" == _),
                onBeforeFinish: function () {
                    return !u(n, "loop")
                }
            });
            var S = {
                controls: r && {
                    url: l(i.flowplayerControlsSwf),
                    opacity: .8,
                    backgroundColor: "#181818",
                    backgroundGradient: "none",
                    fullscreen: e == d,
                    autoHide: e == d && {
                        fullscreenOnly: !1,
                        enabled: !0,
                        hideStyle: "fade",
                        mouseOutDelay: 0
                    } || {enabled: !1}
                } || null
            };
            h && S.controls && (S.controls.autoHide.enabled = !1), "audio" == e && (S.audio = {url: l(i.flowplayerAudioSwf)}, r || (S.controls = {
                url: l(i.flowplayerControlsSwf),
                display: "none"
            }, b.style.height = 0), E[E.length - 1].autoBuffering = !1);
            var L = {
                play: null,
                playlist: E,
                clip: {scaling: "fit", fadeInSpeed: 0, fadeOutSpeed: 0},
                canvas: {backgroundGradient: "none", backgroundColor: "#000000"},
                plugins: S
            };
            L = i.configureFlowplayer(n, L), flowplayer(b, {
                src: l(i.flowplayerSwf),
                expressInstall: l(i.expressInstallSwf),
                wmode: "opaque"
            }, L)
        }
    }, DomReady.ready(i), e.html5media = i
}(this, document);