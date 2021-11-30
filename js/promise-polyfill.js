! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define(t) : t() }(0, function() { "use strict";

    function e(e) { var t = this.constructor; return this.then(function(n) { return t.resolve(e()).then(function() { return n }) }, function(n) { return t.resolve(e()).then(function() { return t.reject(n) }) }) }

    function t(e) { return new this(function(t, n) {
            function o(e, n) { if (n && ("object" == typeof n || "function" == typeof n)) { var f = n.then; if ("function" == typeof f) return void f.call(n, function(t) { o(e, t) }, function(n) { r[e] = { status: "rejected", reason: n }, 0 == --i && t(r) }) }
                r[e] = { status: "fulfilled", value: n }, 0 == --i && t(r) } if (!e || "undefined" == typeof e.length) return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))")); var r = Array.prototype.slice.call(e); if (0 === r.length) return t([]); for (var i = r.length, f = 0; r.length > f; f++) o(f, r[f]) }) }

    function n(e) { return !(!e || "undefined" == typeof e.length) }

    function o() {}

    function r(e) { if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new"); if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], l(e, this) }

    function i(e, t) { for (; 3 === e._state;) e = e._value;
        0 !== e._state ? (e._handled = !0, r._immediateFn(function() { var n = 1 === e._state ? t.onFulfilled : t.onRejected; if (null !== n) { var o; try { o = n(e._value) } catch (r) { return void u(t.promise, r) }
                f(t.promise, o) } else(1 === e._state ? f : u)(t.promise, e._value) })) : e._deferreds.push(t) }

    function f(e, t) { try { if (t === e) throw new TypeError("A promise cannot be resolved with itself."); if (t && ("object" == typeof t || "function" == typeof t)) { var n = t.then; if (t instanceof r) return e._state = 3, e._value = t, void c(e); if ("function" == typeof n) return void l(function(e, t) { return function() { e.apply(t, arguments) } }(n, t), e) }
            e._state = 1, e._value = t, c(e) } catch (o) { u(e, o) } }

    function u(e, t) { e._state = 2, e._value = t, c(e) }

    function c(e) { 2 === e._state && 0 === e._deferreds.length && r._immediateFn(function() { e._handled || r._unhandledRejectionFn(e._value) }); for (var t = 0, n = e._deferreds.length; n > t; t++) i(e, e._deferreds[t]);
        e._deferreds = null }

    function l(e, t) { var n = !1; try { e(function(e) { n || (n = !0, f(t, e)) }, function(e) { n || (n = !0, u(t, e)) }) } catch (o) { if (n) return;
            n = !0, u(t, o) } } var a = setTimeout,
        s = "undefined" != typeof setImmediate ? setImmediate : null;
    r.prototype["catch"] = function(e) { return this.then(null, e) }, r.prototype.then = function(e, t) { var n = new this.constructor(o); return i(this, new function(e, t, n) { this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n }(e, t, n)), n }, r.prototype["finally"] = e, r.all = function(e) { return new r(function(t, o) {
            function r(e, n) { try { if (n && ("object" == typeof n || "function" == typeof n)) { var u = n.then; if ("function" == typeof u) return void u.call(n, function(t) { r(e, t) }, o) }
                    i[e] = n, 0 == --f && t(i) } catch (c) { o(c) } } if (!n(e)) return o(new TypeError("Promise.all accepts an array")); var i = Array.prototype.slice.call(e); if (0 === i.length) return t([]); for (var f = i.length, u = 0; i.length > u; u++) r(u, i[u]) }) }, r.allSettled = t, r.resolve = function(e) { return e && "object" == typeof e && e.constructor === r ? e : new r(function(t) { t(e) }) }, r.reject = function(e) { return new r(function(t, n) { n(e) }) }, r.race = function(e) { return new r(function(t, o) { if (!n(e)) return o(new TypeError("Promise.race accepts an array")); for (var i = 0, f = e.length; f > i; i++) r.resolve(e[i]).then(t, o) }) }, r._immediateFn = "function" == typeof s && function(e) { s(e) } || function(e) { a(e, 0) }, r._unhandledRejectionFn = function(e) { void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e) }; var d = function() { if ("undefined" != typeof self) return self; if ("undefined" != typeof window) return window; if ("undefined" != typeof global) return global; throw Error("unable to locate global object") }(); "function" != typeof d.Promise ? d.Promise = r : (d.Promise.prototype["finally"] || (d.Promise.prototype["finally"] = e), d.Promise.allSettled || (d.Promise.allSettled = t)) });