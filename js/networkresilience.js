$("header").vegas({
      timer: false,
      delay: 7000,
      preload: true,
      overlay: '/overlays/08.png',
      slides: [
        { src: "/img/smaller-quilombolaengineering-header.jpg" }
      ],
      animation: 'kenburns',
      transitionDuration: 9000,
});


! function() {
    "use strict";

    function t(e, o) {
        function i(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        var r;
        if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
            for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++) c[a[s]] = i(c[a[s]], c);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) {
                var i = Node.prototype.removeEventListener;
                "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
            }, e.addEventListener = function(t, n, o) {
                var i = Node.prototype.addEventListener;
                "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) {
                    t.propagationStopped || n(t)
                }), o) : i.call(e, t, n, o)
            }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(t) {
                r(t)
            }, !1), e.onclick = null)
        }
    }
    var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
        n = navigator.userAgent.indexOf("Android") > 0 && !e,
        o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
        i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        r = o && /OS [6-7]_\d/.test(navigator.userAgent),
        a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (t.disabled) return !0;
                break;
            case "input":
                if (o && "file" === t.type || t.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !n;
            case "input":
                switch (t.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function(t, e) {
        var n, o;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
    }, t.prototype.determineEventType = function(t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function(t) {
        var e;
        o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function(t) {
        var e, n;
        if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function(t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function(t) {
        var e, n, r;
        if (t.targetTouches.length > 1) return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
            if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function(t) {
        var e = t.changedTouches[0],
            n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
    }, t.prototype.onTouchMove = function(t) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, t.prototype.findControl = function(t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function(t) {
        var e, a, c, s, u, l = this.targetElement;
        if (!this.trackingClick) return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
            if (e = this.findControl(l)) {
                if (this.focus(l), n) return !1;
                l = e
            }
        } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);
        return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
    }, t.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function(t) {
        return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
    }, t.prototype.onClick = function(t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
    }, t.prototype.destroy = function() {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function(t) {
        var e, o, i, r;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n) return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
    }, t.attach = function(e, n) {
        return new t(e, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}();

function debounce(e, t, n) {
    "use strict";
    var o;
    return function() {
        var i = this,
            a = arguments,
            s = function() {
                o = null, n || e.apply(i, a)
            },
            r = n && !o;
        clearTimeout(o), o = setTimeout(s, t), r && e.apply(i, a)
    }
}

function typing(e) {
    /*
    Originally used the following code:
    return sentences[e] ? (t = sentences[e], n = t.text + "_", void forward(n, 0, function() {
    return sentences[e] ? (t = sentences[e], n = t.text + "~", void forward(n, 0, function() {
    but removed the "> " to simplify presentation.
    */
    var t, n;
    return sentences[e] ? (t = sentences[e], n = t.text + "_", void forward(n, 0, function() {
        typing(++e)
    }, t.wait, t.back)) : $(".conversation").set(".shown", "remove")
}

function forward(e, t, n, o, i) {
    /*
    Originally used the following code:
    t++, t === e.length && (r = "conversation-blinking"), s = e.substring(0, t), a = "> " + s.substring(0, t - 1) + '<span class="conversation-cursor ' + r + '">' + s.substring(t - 1, t) + "</span>", container.innerHTML = a, t < e.length ? setTimeout(function() {
    t++, t === e.length && (r = "conversation-blinking"), s = e.substring(0, t), a = "~ " + s.substring(0, t - 1) + '<span class="conversation-cursor ' + r + '"~' + s.substring(t - 1, t) + "</span>", container.innerHTML = a, t < e.length ? setTimeout(function() {
    but removed the "> " to simplify presentation.
    */
    var a, s, r = "";
    t++, t === e.length && (r = "conversation-blinking"), s = e.substring(0, t), a = "> " + s.substring(0, t - 1) + '<span class="conversation-cursor ' + r + '">' + s.substring(t - 1, t) + "</span>", container.innerHTML = a, t < e.length ? setTimeout(function() {
        forward(e, t, n, o, i)
    }, 70 * Math.random() + 10) : setTimeout(function() {
        i ? backward(e, t, n) : n()
    }, o)
}

function backward(e, t, n) {
    /*
    Originally used the following code:
    t--, container.innerHTML = "> " + e.substring(0, t) + '<span class="conversation-cursor">_</span>', 0 !== t ? setTimeout(function() {
    but removed the "> " to simplify presentation.
    */
    t--, container.innerHTML = "> " + e.substring(0, t) + '<span class="conversation-cursor">_</span>', 0 !== t ? setTimeout(function() {
        backward(e, t, n)
    }, 40 * Math.random() + 0) : n()
}
$(function() {
    "use strict";

    function e(t) {
        X[t] += 90, A[t]++, A[t] >= 4 && (A[t] = 0), $("." + t + " div").set(".active", "remove").eq(A[t]).set(".active"), $("." + t).set(":transform", "rotateX(" + X[t] + "deg)"), setTimeout(function() {
            e(t)
        }, 1e3 * Math.random() + 1e3)
    }

    function t(e) {
        q = e, T.set(":transform", "translateY(" + -100 * (q - 1) + "vh)").find(".slide").set(".active", "remove").eq(q - 1).set(".active"), $(".social").on(L, function() {
            1 !== q || sessionStorage.getItem("swipe1") || ($(".touch .slide-swipe").set(".vertical"), $(".slide-swipe .icon").on(I, function() {
                $(".slide-swipe").set(".vertical", "remove")
            }), sessionStorage.setItem("swipe1", !0))
        }), 2 !== q || sessionStorage.getItem("swipe2", !0) ? $(".slide-swipe").set(".vertical", "remove").set(".horizontal", "remove") : ($(".touch .slide-swipe").set(".horizontal"), $(".slide-swipe .icon").on(I, function() {
            $(".slide-swipe").set(".horizontal", "remove")
        }), sessionStorage.setItem("swipe2", !0)), 3 === q && $(".footer").set(".animated")
    }

    function n() {
        q >= M || t(++q)
    }

    function o() {
        1 >= q || t(--q)
    }

    function i(e) {
        E = e;
        var t = $(".work").width();
        y.set(":transform", "translateX(" + (E - 1) * -t + "px)").find(".work").set(".active", "remove").eq(E - 1).set(".active"), f()
    }

    function a() {
        2 !== q || E >= C || i(++E)
    }

    function s() {
        2 !== q || 1 >= E || i(--E)
    }

    function r(e) {
        window.scrollTo(0, 0), (38 === e.keyCode || 33 === e.keyCode) && (e.preventDefault(), o()), (40 === e.keyCode || 34 === e.keyCode || 32 === e.keyCode) && (e.preventDefault(), n()), 37 === e.keyCode && (e.preventDefault(), s()), 39 === e.keyCode && (e.preventDefault(), a()), "mousewheel" === e.type && (e.preventDefault(), e.wheelDelta >= 0 ? o() : n())
    }

    function c(e) {
        var t = e.changedTouches[0];
        m = 0, b = 0, p = t.pageX, v = t.pageY, k = (new Date).getTime()
    }

    function u(e) {
        e.preventDefault()
    }

    function d(e) {
        var t, n = e.changedTouches[0];
        m = n.pageX - p, b = n.pageY - v, g = (new Date).getTime() - k, z >= g && (Math.abs(m) >= S && Math.abs(b) <= H ? t = 0 > m ? "left" : "right" : Math.abs(b) >= S && Math.abs(m) <= H && (t = b > 0 ? "up" : "down")), l(e, t)
    }

    function l(e, t) {
        "up" === t && o(), "down" === t && n(), "left" === t && a(), "right" === t && s()
    }

    function f() {
        D.find("a").set(".active", "remove").eq(E - 1).set(".active"), $(".work-previous").set(".disabled", "remove"), 1 === E && $(".work-previous").set(".disabled"), $(".work-next").set(".disabled", "remove"), E === C && $(".work-next").set(".disabled")
    }

    function w() {
        window.orientation % 180 !== 0 ? $(".touch .slide-swipe").set(".orientation") : $(".touch .slide-swipe").set(".orientation", "remove")
    }

    function h() {
        var e, t;
        if (C = Math.ceil(x / ($(window).width() / $(".work").width())), y.set(":width", 100 * C + "vw"), D[0].innerHTML = "", !(1 >= C)) {
            for (e = 0; C > e; e++) t = $('<a href="#" />').on("click", function(e) {
                e.preventDefault(), i(D.find("a").index(this) + 1)
            }), D.append(t);
            E > C && (E = C, i(E)), f()
        }
    }
    FastClick.attach(document.body);
    var p, v, m, b, g, k, T = $(".slide-container"),
        y = $(".work-container"),
        D = $(".work-pagination"),
        M = $(".slide").length,
        x = $(".work").length,
        C = x,
        q = 1,
        E = 1,
        S = 25,
        z = 1e3,
        H = 50,
        I = "webkitAnimationEnd oanimationend msAnimationEnd animationend",
        L = "webkitTransitionEnd otransitionend msTransitionEnd transitionend",
        X = {
            contributions: 0,
            awards: 0
        },
        A = {
            contributions: 0,
            awards: 0
        };
    e("contributions"), e("awards"), h(), t(q), i(E), $("html").set("ontouchstart" in window || "onmsgesturechange" in window ? ".touch" : ".no-touch"), $($(".header-bio p")[0].childNodes).each(function() {
        3 === this.nodeType && $(this).wrap("<span></span>")
    }), $($(".footer p")[0].childNodes).each(function() {
        3 === this.nodeType && $(this).wrap("<span></span>")
    }), $(".social-email a").set("@href", function() {
        return "mailto:" + $(this).get("@href").replace("#", "@").replace("|", ".")
    }), $(".header-scroll").on("click", function(e) {
        e.preventDefault(), t(2)
    }), $(".work-previous").on("click", function(e) {
        s(), e.preventDefault()
    }), $(".work-next").on("click", function(e) {
        a(), e.preventDefault()
    }), setTimeout(function() {
        $(".header").set(".animated")
    }, 10), $(window).on("scroll", debounce(r, 50, !0)).on("mousewheel", debounce(r, 50, !0)).on("keydown", debounce(r, 50, !0)).on("resize", debounce(h, 250)).on("touchstart", c).on("touchmove", u).on("touchend", d).on("orientationchange", w).trigger("orientationchange")
});
var container = $(".conversation-text")[0],
    sentences = [],
    i = 0;
[].slice.call(container.querySelectorAll("p")).forEach(function(e) {
    sentences.push({
        text: e.textContent,
        wait: e.dataset.wait,
        back: e.dataset.back
    })
}), container.innerHTML = "", setTimeout(function() {
    typing(i)
}, 4e3);