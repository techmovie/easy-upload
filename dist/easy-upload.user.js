// ==UserScript==
// @name         EasyUpload PT一键转种
// @name:en      EasyUpload - Trackers Transfer Tool 
// @namespace    https://github.com/techmovie/easy-upload
// @version      4.2.0
// @description  easy uploading torrents to other trackers
// @description:en easy uploading torrents to other trackers
// @author       birdplane
// @require      https://cdn.staticfile.org/jquery/1.7.1/jquery.min.js
// @match        https://*/torrents.php?id=*
// @match        http://*/torrents.php?id=*
// @match        https://broadcasthe.net/torrents.php?torrentid=*
// @match        http://*/details.php?id=*
// @match        https://*/details.php?id=*
// @match        https://totheglory.im/t/*
// @match        https://beyond-hd.me/torrents/*
// @match        https://blutopia.xyz/torrents/*
// @match        https://blutopia.xyz/torrents?*
// @match        https://blutopia.xyz/upload/*
// @match        https://blutopia.cc/torrents/*
// @match        https://blutopia.cc/torrents?*
// @match        https://blutopia.cc/upload/*
// @match        https://pt.hdpost.top/torrents?*
// @match        https://pt.hdpost.top/torrents/*
// @match        https://asiancinema.me/torrents/*
// @match        https://asiancinema.me/torrents?*
// @match        https://aither.cc/torrents/*
// @match        https://aither.cc/torrents?*
// @match        https://ptpimg.me/*
// @match        https://*/upload*
// @match        http://*/upload*
// @match        https://www.hd.ai/Torrents.upload
// @match        https://www.hd.ai/Torrents.index?*
// @match        https://broadcity.in/browse.php?imdb=*
// @match        https://privatehd.to/torrent/*
// @match        https://avistaz.to/torrent/*
// @exclude      https://privatehd.to/torrent/peers*
// @exclude      https://avistaz.to/torrent/peers*
// @exclude      https://privatehd.to/torrent/history*
// @exclude      https://avistaz.to/torrent/history*
// @match        https://cinemaz.to/torrent/*
// @exclude      https://cinemaz.to/torrent/peers*
// @exclude      https://cinemaz.to/torrent/history*
// @match        https://piratethenet.org/browse.php?*
// @match        https://teamhd.org/details/id*
// @match        https://hd-space.org/index.php?page=upload
// @match        https://hd-space.org/index.php?page=torrent-details&id=*
// @match        https://speedapp.io/browse/*
// @match        https://zhuque.in/torrent/upload
// @match        https://monikadesign.uk/torrents/*
// @match        https://monikadesign.uk/torrents?*
// @match        https://monikadesign.uk/upload/*
// @match        https://lst.gg/torrents/*
// @match        https://lst.gg/torrents?*

// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @downloadURL  https://github.com/techmovie/easy-upload/raw/master/dist/easy-upload.user.js
// @updateURL    https://github.com/techmovie/easy-upload/raw/master/dist/easy-upload.user.js
// @license      MIT
// ==/UserScript==
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b3) => {
    for (var prop in b3 || (b3 = {}))
      if (__hasOwnProp.call(b3, prop))
        __defNormalProp(a3, prop, b3[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b3)) {
        if (__propIsEnum.call(b3, prop))
          __defNormalProp(a3, prop, b3[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b3) => __defProps(a3, __getOwnPropDescs(b3));
  var __esm = (fn2, res) => function __init() {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/preact/dist/preact.module.js
  function a(n2, l3) {
    for (var u3 in l3)
      n2[u3] = l3[u3];
    return n2;
  }
  function h(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function v(l3, u3, i3) {
    var t3, o3, r3, f3 = {};
    for (r3 in u3)
      r3 == "key" ? t3 = u3[r3] : r3 == "ref" ? o3 = u3[r3] : f3[r3] = u3[r3];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), typeof l3 == "function" && l3.defaultProps != null)
      for (r3 in l3.defaultProps)
        f3[r3] === void 0 && (f3[r3] = l3.defaultProps[r3]);
    return y(l3, f3, t3, o3, null);
  }
  function y(n2, i3, t3, o3, r3) {
    var f3 = { type: n2, props: i3, key: t3, ref: o3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r3 == null ? ++u : r3 };
    return r3 == null && l.vnode != null && l.vnode(f3), f3;
  }
  function p() {
    return { current: null };
  }
  function d(n2) {
    return n2.children;
  }
  function _(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function k(n2, l3) {
    if (l3 == null)
      return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++)
      if ((u3 = n2.__k[l3]) != null && u3.__e != null)
        return u3.__e;
    return typeof n2.type == "function" ? k(n2) : null;
  }
  function b(n2) {
    var l3, u3;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
        if ((u3 = n2.__k[l3]) != null && u3.__e != null) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return b(n2);
    }
  }
  function m(n2) {
    (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(g);
  }
  function g() {
    for (var n2; g.__r = t.length; )
      n2 = t.sort(function(n3, l3) {
        return n3.__v.__b - l3.__v.__b;
      }), t = [], n2.some(function(n3) {
        var l3, u3, i3, t3, o3, r3;
        n3.__d && (o3 = (t3 = (l3 = n3).__v).__e, (r3 = l3.__P) && (u3 = [], (i3 = a({}, t3)).__v = t3.__v + 1, j(r3, t3, i3, l3.__n, r3.ownerSVGElement !== void 0, t3.__h != null ? [o3] : null, u3, o3 == null ? k(t3) : o3, t3.__h), z(u3, t3), t3.__e != o3 && b(t3)));
      });
  }
  function w(n2, l3, u3, i3, t3, o3, r3, f3, s3, a3) {
    var h3, v3, p3, _3, b3, m3, g4, w4 = i3 && i3.__k || c, A4 = w4.length;
    for (u3.__k = [], h3 = 0; h3 < l3.length; h3++)
      if ((_3 = u3.__k[h3] = (_3 = l3[h3]) == null || typeof _3 == "boolean" ? null : typeof _3 == "string" || typeof _3 == "number" || typeof _3 == "bigint" ? y(null, _3, null, null, _3) : Array.isArray(_3) ? y(d, { children: _3 }, null, null, null) : _3.__b > 0 ? y(_3.type, _3.props, _3.key, null, _3.__v) : _3) != null) {
        if (_3.__ = u3, _3.__b = u3.__b + 1, (p3 = w4[h3]) === null || p3 && _3.key == p3.key && _3.type === p3.type)
          w4[h3] = void 0;
        else
          for (v3 = 0; v3 < A4; v3++) {
            if ((p3 = w4[v3]) && _3.key == p3.key && _3.type === p3.type) {
              w4[v3] = void 0;
              break;
            }
            p3 = null;
          }
        j(n2, _3, p3 = p3 || e, t3, o3, r3, f3, s3, a3), b3 = _3.__e, (v3 = _3.ref) && p3.ref != v3 && (g4 || (g4 = []), p3.ref && g4.push(p3.ref, null, _3), g4.push(v3, _3.__c || b3, _3)), b3 != null ? (m3 == null && (m3 = b3), typeof _3.type == "function" && _3.__k === p3.__k ? _3.__d = s3 = x(_3, s3, n2) : s3 = P(n2, _3, p3, w4, b3, s3), typeof u3.type == "function" && (u3.__d = s3)) : s3 && p3.__e == s3 && s3.parentNode != n2 && (s3 = k(p3));
      }
    for (u3.__e = m3, h3 = A4; h3--; )
      w4[h3] != null && (typeof u3.type == "function" && w4[h3].__e != null && w4[h3].__e == u3.__d && (u3.__d = k(i3, h3 + 1)), N(w4[h3], w4[h3]));
    if (g4)
      for (h3 = 0; h3 < g4.length; h3++)
        M(g4[h3], g4[++h3], g4[++h3]);
  }
  function x(n2, l3, u3) {
    for (var i3, t3 = n2.__k, o3 = 0; t3 && o3 < t3.length; o3++)
      (i3 = t3[o3]) && (i3.__ = n2, l3 = typeof i3.type == "function" ? x(i3, l3, u3) : P(u3, i3, i3, t3, i3.__e, l3));
    return l3;
  }
  function A(n2, l3) {
    return l3 = l3 || [], n2 == null || typeof n2 == "boolean" || (Array.isArray(n2) ? n2.some(function(n3) {
      A(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function P(n2, l3, u3, i3, t3, o3) {
    var r3, f3, e3;
    if (l3.__d !== void 0)
      r3 = l3.__d, l3.__d = void 0;
    else if (u3 == null || t3 != o3 || t3.parentNode == null)
      n:
        if (o3 == null || o3.parentNode !== n2)
          n2.appendChild(t3), r3 = null;
        else {
          for (f3 = o3, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2)
            if (f3 == t3)
              break n;
          n2.insertBefore(t3, o3), r3 = o3;
        }
    return r3 !== void 0 ? r3 : t3.nextSibling;
  }
  function C(n2, l3, u3, i3, t3) {
    var o3;
    for (o3 in u3)
      o3 === "children" || o3 === "key" || o3 in l3 || H(n2, o3, null, u3[o3], i3);
    for (o3 in l3)
      t3 && typeof l3[o3] != "function" || o3 === "children" || o3 === "key" || o3 === "value" || o3 === "checked" || u3[o3] === l3[o3] || H(n2, o3, l3[o3], u3[o3], i3);
  }
  function $2(n2, l3, u3) {
    l3[0] === "-" ? n2.setProperty(l3, u3) : n2[l3] = u3 == null ? "" : typeof u3 != "number" || s.test(l3) ? u3 : u3 + "px";
  }
  function H(n2, l3, u3, i3, t3) {
    var o3;
    n:
      if (l3 === "style")
        if (typeof u3 == "string")
          n2.style.cssText = u3;
        else {
          if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
            for (l3 in i3)
              u3 && l3 in u3 || $2(n2.style, l3, "");
          if (u3)
            for (l3 in u3)
              i3 && u3[l3] === i3[l3] || $2(n2.style, l3, u3[l3]);
        }
      else if (l3[0] === "o" && l3[1] === "n")
        o3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u3, u3 ? i3 || n2.addEventListener(l3, o3 ? T : I, o3) : n2.removeEventListener(l3, o3 ? T : I, o3);
      else if (l3 !== "dangerouslySetInnerHTML") {
        if (t3)
          l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (l3 !== "href" && l3 !== "list" && l3 !== "form" && l3 !== "tabIndex" && l3 !== "download" && l3 in n2)
          try {
            n2[l3] = u3 == null ? "" : u3;
            break n;
          } catch (n3) {
          }
        typeof u3 == "function" || (u3 != null && (u3 !== false || l3[0] === "a" && l3[1] === "r") ? n2.setAttribute(l3, u3) : n2.removeAttribute(l3));
      }
  }
  function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function j(n2, u3, i3, t3, o3, r3, f3, e3, c3) {
    var s3, h3, v3, y3, p3, k4, b3, m3, g4, x3, A4, P3, C3, $4 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (c3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, r3 = [e3]), (s3 = l.__b) && s3(u3);
    try {
      n:
        if (typeof $4 == "function") {
          if (m3 = u3.props, g4 = (s3 = $4.contextType) && t3[s3.__c], x3 = s3 ? g4 ? g4.props.value : s3.__ : t3, i3.__c ? b3 = (h3 = u3.__c = i3.__c).__ = h3.__E : ("prototype" in $4 && $4.prototype.render ? u3.__c = h3 = new $4(m3, x3) : (u3.__c = h3 = new _(m3, x3), h3.constructor = $4, h3.render = O), g4 && g4.sub(h3), h3.props = m3, h3.state || (h3.state = {}), h3.context = x3, h3.__n = t3, v3 = h3.__d = true, h3.__h = []), h3.__s == null && (h3.__s = h3.state), $4.getDerivedStateFromProps != null && (h3.__s == h3.state && (h3.__s = a({}, h3.__s)), a(h3.__s, $4.getDerivedStateFromProps(m3, h3.__s))), y3 = h3.props, p3 = h3.state, v3)
            $4.getDerivedStateFromProps == null && h3.componentWillMount != null && h3.componentWillMount(), h3.componentDidMount != null && h3.__h.push(h3.componentDidMount);
          else {
            if ($4.getDerivedStateFromProps == null && m3 !== y3 && h3.componentWillReceiveProps != null && h3.componentWillReceiveProps(m3, x3), !h3.__e && h3.shouldComponentUpdate != null && h3.shouldComponentUpdate(m3, h3.__s, x3) === false || u3.__v === i3.__v) {
              h3.props = m3, h3.state = h3.__s, u3.__v !== i3.__v && (h3.__d = false), h3.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n3) {
                n3 && (n3.__ = u3);
              }), h3.__h.length && f3.push(h3);
              break n;
            }
            h3.componentWillUpdate != null && h3.componentWillUpdate(m3, h3.__s, x3), h3.componentDidUpdate != null && h3.__h.push(function() {
              h3.componentDidUpdate(y3, p3, k4);
            });
          }
          if (h3.context = x3, h3.props = m3, h3.__v = u3, h3.__P = n2, A4 = l.__r, P3 = 0, "prototype" in $4 && $4.prototype.render)
            h3.state = h3.__s, h3.__d = false, A4 && A4(u3), s3 = h3.render(h3.props, h3.state, h3.context);
          else
            do {
              h3.__d = false, A4 && A4(u3), s3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
            } while (h3.__d && ++P3 < 25);
          h3.state = h3.__s, h3.getChildContext != null && (t3 = a(a({}, t3), h3.getChildContext())), v3 || h3.getSnapshotBeforeUpdate == null || (k4 = h3.getSnapshotBeforeUpdate(y3, p3)), C3 = s3 != null && s3.type === d && s3.key == null ? s3.props.children : s3, w(n2, Array.isArray(C3) ? C3 : [C3], u3, i3, t3, o3, r3, f3, e3, c3), h3.base = u3.__e, u3.__h = null, h3.__h.length && f3.push(h3), b3 && (h3.__E = h3.__ = null), h3.__e = false;
        } else
          r3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = L(i3.__e, u3, i3, t3, o3, r3, f3, c3);
      (s3 = l.diffed) && s3(u3);
    } catch (n3) {
      u3.__v = null, (c3 || r3 != null) && (u3.__e = e3, u3.__h = !!c3, r3[r3.indexOf(e3)] = null), l.__e(n3, u3, i3);
    }
  }
  function z(n2, u3) {
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function L(l3, u3, i3, t3, o3, r3, f3, c3) {
    var s3, a3, v3, y3 = i3.props, p3 = u3.props, d3 = u3.type, _3 = 0;
    if (d3 === "svg" && (o3 = true), r3 != null) {
      for (; _3 < r3.length; _3++)
        if ((s3 = r3[_3]) && "setAttribute" in s3 == !!d3 && (d3 ? s3.localName === d3 : s3.nodeType === 3)) {
          l3 = s3, r3[_3] = null;
          break;
        }
    }
    if (l3 == null) {
      if (d3 === null)
        return document.createTextNode(p3);
      l3 = o3 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, p3.is && p3), r3 = null, c3 = false;
    }
    if (d3 === null)
      y3 === p3 || c3 && l3.data === p3 || (l3.data = p3);
    else {
      if (r3 = r3 && n.call(l3.childNodes), a3 = (y3 = i3.props || e).dangerouslySetInnerHTML, v3 = p3.dangerouslySetInnerHTML, !c3) {
        if (r3 != null)
          for (y3 = {}, _3 = 0; _3 < l3.attributes.length; _3++)
            y3[l3.attributes[_3].name] = l3.attributes[_3].value;
        (v3 || a3) && (v3 && (a3 && v3.__html == a3.__html || v3.__html === l3.innerHTML) || (l3.innerHTML = v3 && v3.__html || ""));
      }
      if (C(l3, p3, y3, o3, c3), v3)
        u3.__k = [];
      else if (_3 = u3.props.children, w(l3, Array.isArray(_3) ? _3 : [_3], u3, i3, t3, o3 && d3 !== "foreignObject", r3, f3, r3 ? r3[0] : i3.__k && k(i3, 0), c3), r3 != null)
        for (_3 = r3.length; _3--; )
          r3[_3] != null && h(r3[_3]);
      c3 || ("value" in p3 && (_3 = p3.value) !== void 0 && (_3 !== l3.value || d3 === "progress" && !_3 || d3 === "option" && _3 !== y3.value) && H(l3, "value", _3, y3.value, false), "checked" in p3 && (_3 = p3.checked) !== void 0 && _3 !== l3.checked && H(l3, "checked", _3, y3.checked, false));
    }
    return l3;
  }
  function M(n2, u3, i3) {
    try {
      typeof n2 == "function" ? n2(u3) : n2.current = u3;
    } catch (n3) {
      l.__e(n3, i3);
    }
  }
  function N(n2, u3, i3) {
    var t3, o3;
    if (l.unmount && l.unmount(n2), (t3 = n2.ref) && (t3.current && t3.current !== n2.__e || M(t3, null, u3)), (t3 = n2.__c) != null) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u3);
        }
      t3.base = t3.__P = null;
    }
    if (t3 = n2.__k)
      for (o3 = 0; o3 < t3.length; o3++)
        t3[o3] && N(t3[o3], u3, typeof n2.type != "function");
    i3 || n2.__e == null || h(n2.__e), n2.__e = n2.__d = void 0;
  }
  function O(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function S(u3, i3, t3) {
    var o3, r3, f3;
    l.__ && l.__(u3, i3), r3 = (o3 = typeof t3 == "function") ? null : t3 && t3.__k || i3.__k, f3 = [], j(i3, u3 = (!o3 && t3 || i3).__k = v(d, null, [u3]), r3 || e, e, i3.ownerSVGElement !== void 0, !o3 && t3 ? [t3] : r3 ? null : i3.firstChild ? n.call(i3.childNodes) : null, f3, !o3 && t3 ? t3 : r3 ? r3.__e : i3.firstChild, o3), z(f3, u3);
  }
  function q(n2, l3) {
    S(n2, l3, q);
  }
  function B(l3, u3, i3) {
    var t3, o3, r3, f3 = a({}, l3.props);
    for (r3 in u3)
      r3 == "key" ? t3 = u3[r3] : r3 == "ref" ? o3 = u3[r3] : f3[r3] = u3[r3];
    return arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), y(l3.type, f3, t3 || l3.key, o3 || l3.ref, null);
  }
  function D(n2, l3) {
    var u3 = { __c: l3 = "__cC" + f++, __: n2, Consumer: function(n3, l4) {
      return n3.children(l4);
    }, Provider: function(n3) {
      var u4, i3;
      return this.getChildContext || (u4 = [], (i3 = {})[l3] = this, this.getChildContext = function() {
        return i3;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u4.some(m);
      }, this.sub = function(n4) {
        u4.push(n4);
        var l4 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u4.splice(u4.indexOf(n4), 1), l4 && l4.call(n4);
        };
      }), n3.children;
    } };
    return u3.Provider.__ = u3.Consumer.contextType = u3;
  }
  var n, l, u, i, t, o, r, f, e, c, s;
  var init_preact_module = __esm({
    "node_modules/preact/dist/preact.module.js"() {
      init_preact_shim();
      e = {};
      c = [];
      s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      n = c.slice, l = { __e: function(n2, l3, u3, i3) {
        for (var t3, o3, r3; l3 = l3.__; )
          if ((t3 = l3.__c) && !t3.__)
            try {
              if ((o3 = t3.constructor) && o3.getDerivedStateFromError != null && (t3.setState(o3.getDerivedStateFromError(n2)), r3 = t3.__d), t3.componentDidCatch != null && (t3.componentDidCatch(n2, i3 || {}), r3 = t3.__d), r3)
                return t3.__E = t3;
            } catch (l4) {
              n2 = l4;
            }
        throw n2;
      } }, u = 0, i = function(n2) {
        return n2 != null && n2.constructor === void 0;
      }, _.prototype.setState = function(n2, l3) {
        var u3;
        u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n2 == "function" && (n2 = n2(a({}, u3), this.props)), n2 && a(u3, n2), n2 != null && this.__v && (l3 && this.__h.push(l3), m(this));
      }, _.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), m(this));
      }, _.prototype.render = d, t = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;
    }
  });

  // scripts/preact-shim.ts
  var init_preact_shim = __esm({
    "scripts/preact-shim.ts"() {
      init_preact_module();
    }
  });

  // node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "node_modules/classnames/index.js"(exports, module) {
      init_preact_shim();
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames2() {
          var classes = [];
          for (var i3 = 0; i3 < arguments.length; i3++) {
            var arg = arguments[i3];
            if (!arg)
              continue;
            var argType = typeof arg;
            if (argType === "string" || argType === "number") {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames2.apply(null, arg);
                if (inner) {
                  classes.push(inner);
                }
              }
            } else if (argType === "object") {
              if (arg.toString === Object.prototype.toString) {
                for (var key in arg) {
                  if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                  }
                }
              } else {
                classes.push(arg.toString());
              }
            }
          }
          return classes.join(" ");
        }
        if (typeof module !== "undefined" && module.exports) {
          classNames2.default = classNames2;
          module.exports = classNames2;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames2;
          });
        } else {
          window.classNames = classNames2;
        }
      })();
    }
  });

  // src/index.tsx
  init_preact_shim();
  init_preact_module();

  // src/const.ts
  init_preact_shim();

  // src/config.json
  var PT_SITE = {
    "1PTBA": {
      url: "https://1ptba.com",
      host: "1ptba.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACqVBMVEUAerwqYXVnYVNybF9uaFtjXUxTXlcyYnQOb54Ae7wMcKJYaWi0rqbUz8fTz8fSzcXNycG/urKemY1bcXERb50sYnSOioHf29Lt6d/s6N/m4tnBvLFNcntrb2bFwLjt6eHu6eHt6eDr597q5t3n49qRkINrf3+1t7C5u7W6u7S+urG9urG5urTEw7vj39br59/s6eCuqZ0Qc6Uib5Ijb5EkbIxQZGN8d2qAem6JhXlDaXMibpEwaoGVmpLl4disp5sAe70OcKBscWnEv7fV0MjV0cnMx706a3sAe74IcqdjdnXTzcTq59+Mj4UBe7wBerskZoGSj4bi3dTv6+O5urIibpAAerscZod4enLW0cnu6+PPy8JFcoABebg9Y26zrKLp5dyOl5EMcqUCeLcbZodaY12uqJ/t6uHk4Nh3jY4Pb54JcqZdb27Iwrji3tVggYgKbZ4yX21obGavqaDi3dXd2dF9kJIVcZ0Wa5N/f3Xb1s7Lx70zboYvY3WDfXLFwLft6ODKycFhfYESb50AebouZ36emY6nraYWZolMbXXCvLOdoJcTZ44Cd7VIZGi6tKvr5t14jY4HcqgxbIO6tKm6tqprdG/SzcTs6N7e2dBJc38AebsUa5WOk4vn4tns6ODQy8I+dYoAeLgeZoaMi4Lf2tK+vLMncZISa5R3fnnb1czMx743c40AebkCebg2ZXWrpJno5NuSl44YY4IcZYRHXmCcmI6vsKcabpUHc6pYa2vDvbTk4NecnJNnbWd9eW+po5ra1c1nhIoGc6sRbpt3eG3Z1Mza1cze2dHh3dSAk5UUcJ0qa4ajn5Xn5Nzu6uLt6uLv6+Tp5d7Y1MyxtK1hgIgUcZ8lbYyTkYSxrqOxraOwraOtqp+XlIV9iIFReYUfaowGdKz///88yl8CAAAAAWJLR0TixgGeHAAAAAd0SU1FB+UECgcrNELreWwAAAGKSURBVBjTY2BgZGJGABZWNnYOTgYubh5eOODjFxAUEhZhEBUTl5BEBlLSMgyycvIKCvJgoKCgqKSspKyiyqCmrqGhoamlraWtoaGjq6evrGxgyGBkbGJsamZuYWFpZW1sY2unpCxvz8DJwODg6OTs4urmzuDh6eWtpOTjy+Dn5+8QEBikGBwS6hAWHhGpFBUdAxTkjI2LT1CST0xKTklNk0rPyMwCCjpk5+RKSublFxQWFZcEl5aVMzD4cTpUVFYppVfX1NbVSzU0NjUDrfHjbGltk1JSaO/o7FJWUuru8eD0Bwr29vUnKE2YOGnyFEklxanWDJx+DH4OjtOmz5CcOWv2nLnzlOYvWLgIKMjpsHjJUqX0Zcs9VqxcpSS/es1akOC69Rs2Kslv2rxl67Y8peDtOxyAgg47d+1WUtqzd9/+AweV5EsOHXbwAwoeOXoMGDLHp59Qlg8+eeo0JydQMOzM2XPnL1w4H3zx0uUrV68B7QYKMly/cfPW7ds379y9d//BQwZOf6AgACIJgNAMLRaxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQzOjUyKzAwOjAwjJgVBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0Mzo1MiswMDowMP3FrbsAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "10",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "19",
          dtsx: "3",
          ape: "2",
          wav: "22",
          mp3: "4",
          m4a: "5",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "13",
          remux: "3",
          encode: "7",
          web: "11",
          hdtv: "5",
          dvd: "2",
          dvdrip: "7",
          other: "12",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "11",
          "2160p": "10",
          "1080p": "2",
          "1080i": "2",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          "1ptba": "1",
          chd: "2",
          mysilu: "3",
          wiki: "4",
          other: "5"
        }
      }
    },
    "3Wmg": {
      url: "https://www.3wmg.com",
      host: "3wmg.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="pt_gen[douban][link]"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: 'input[name="tags[]"][value="16"]',
        diy: 'input[name="tags[]"][value="8"]',
        hdr: 'input[name="tags[]"][value="64"]',
        chinese_subtitle: 'input[name="tags[]"][value="32"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "410",
          cartoon: "405",
          variety: "403"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "6",
          vhs: "6",
          hddvd: "2"
        }
      }
    },
    "52pt": {
      url: "https://52pt.site",
      host: "52pt.site",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABtlBMVEUAAAD/f1D+f1D8f0nrlATcRhAAAP8AAP72vAX2vAX2uwX2vAX2vAX1vAT2vAX2vAX2vAX2uwX/f1D/f1D/f1D/f1D2vAX2vAX2uwX1ugX0tQT/flD/f1D+f1D+fk/+f1D+f1D2vAX1uAXyrQTwpgT+fk//f1D/f1D/flD/f0//f1D1uwX0twTxqgTuoATslgTohAX/f1D/fk/+flD/f1D/f1DwpQTtmwTqkATohQTmfwT+flD/f0//f1D/f1D/f1D/f1DxqgTvogTslQTpigTmfwTldwXiaAr+f1D/f1D/f1D+f1DrlQPqjQTohQTleQXjbQnhYgrgYgr/f1D/f1D/f1D/f1D/f1DqjwTpiwTkcwfiaArfWwvdTw7/f1D+flD+f1D/f1DpiwXkdgbjbwnhYgreVA3cRRDbPRL/f0/hZArgXQveUA7bQRHbOhLbOhPeUQ3cSQ/bOhLbOhPbOhMAAP8AAP4AAP/bPhLbOhLbOhMAAP8AAP4AAP8AAP8AAP8AAP/bORPaORPbOhMAAP8AAP8AAP8AAP8AAP8AAP/bOhPbOhPbOhPbOhP2uwXysATmfwT////emFSbAAAAjnRSTlMAAAAAAAAAACiIUl5wyHjAdsYQChQGvkoOeMawXHYIIjbQ0IjGLDhAKEZS5Hbk+MoygkRUYljmUu78XiJoaFBKVnCo+t5KQghmVEhuVJJi+vrUAgKApERuMt7AaPjGMhIgDAp44u7QvroGdsg+6rjEdsgEdsYiGih2yHhsOlJKTgZqyLo0OlBYPAQWYDo8iaK1gQAAAAFiS0dEkQ8NvpoAAAAHdElNRQflBBUOAAFlgzxgAAAA50lEQVQY02Ng4OBkYODiZkAAHl4GBj5+JAEBkIAgA6OQsAgDoyhIQExcQlKKgUlaRlZOXgEkoNinpKzCwKSqpq6hqQUS0NbR1dM3YDY0MjYxNQEK6PSbmVtYWjFY29ja2TsABRydnF1c3dxFPWztPb28GRhYfHz9/AMCg4LtQ0Jtw8IZGCIiJ0RFx8QyMMTFJ2glJjIwJCWnpKalZ4CdpJUJIrOyc3Lz8sECTIwgsqCQtai4hIGttKycnQ0kUFHJwFAFFKiuqa2rbwAKNDYBBZoZ2Fpa29o7OoECXd0MDD29QAYbCDAAALdvLFoE/tjvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTIxVDE0OjAwOjAxKzAwOjAwc0mO0gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0yMVQxNDowMDowMSswMDowMAIUNm4AAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "13",
          x264: "11",
          hevc: "1",
          x265: "12",
          h265: "1",
          mpeg2: "4",
          mpeg4: "13",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "13",
          ac3: "6",
          dd: "6",
          "dd+": "6",
          flac: "1",
          dts: "15",
          truehd: "12",
          lpcm: "14",
          dtshdma: "4",
          atmos: "10",
          dtsx: "3",
          ape: "2",
          wav: "11",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "11",
          remux: "4",
          encode: "7",
          web: "10",
          hdtv: "3",
          dvd: "6",
          dvdrip: "7",
          other: "9",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "7",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "6",
          "480p": "6"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          beyondhd: "1",
          hdsky: "2",
          ttg: "3",
          mteam: "8",
          coaster: "4",
          chdbits: "9",
          ourbits: "10",
          hdhome: "11",
          cmct: "12",
          hdchina: "14",
          pthome: "15",
          other: "5"
        }
      }
    },
    ACM: {
      url: "https://asiancinema.me",
      host: "asiancinema.me",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBjskFFwRbgAAA11JREFUOMvNlM1vlGUUxc+5zzPvfLT2y5a0BqglgAFCcaGIYaEhAYIaTYgxLo1x5wL+BBf+Ay6NceOChYnGjVVj4wchkAhE1AKKWqopTBinZdrpFGbe97nHBSaSqNENiWd3N79zF/f+gP97ePdwfXwbIJFkXxbsfjfVEjwJvmZ5q1luLffyPmBs6T8AFzbuAIASyAmS0wHaJWhURCHghqA5gHNmpYbkPrkw97fACACXJ3aitdhEdXJ8E8nnSDxF6SFBQ3dquQrgssC3Bc6C1vynDePM1iNYT034g/0bPOCAES9JPgUgI5AgQOQoiL2QfqUw7yE254c3czlU9ciBd/Du6eN4YfHMHWD0hOpwjqXO0DSgpwHfSiGn/JRJ35kxJto0iZql4mSlu3alUe6rLo1MjnW7nfrVmx/kM3/AAIDvbX8GvWT9g5X8FUDH5BqN8FPB/UT0dI7GsoDtJMo91+lWebAWgX3mvsGNdYgnvZ1dZTmlo1feR7ydVSBxdDVkmwENy3wpwD8xaNal+q3lFRN4KY/lEIdHNlWYDko6IFOfyKrLrBgMq0RoAEDslPtJoObw+wAESCuSfoCrDRKLGyd94PZKjhCrA0EPJ/k4oWsulZ22X+CTIH+cWm81Xtv/KuJyrAlAj1ACZAAoB+QAjagwoVMbKhm0pfCiL5IysC7P52Vhj2h7BZ7/cqT/bMmxHtusAMItRbZA3JY4koTdAr+FuNauj7B/fHXCSulFSlsMyA06E3udz0tCIw+VZ53Wy5NXE7EeO8wQPLW6sXJN4E0BEw4eKmCNLuM3Ycr7k6r7otJhQg+AnId0pp63ry38ki8e3DnYJJQ7ilsSERvVGrbYSGfZV644eNHBDQIedVpw8KccqOWwPVRpkoRTWofUTpXx8HXnUj7anTj36dnX/zzszB2XrQdaeQ4WPxQ4lqRdIB4H8BggAiShLsGvDJhh8gtZeaD0/L4nihgy3f0p4cLCF5jaeBTd+sCaD/pvhcW1PGZDuWW1gjEWFnu5xUYRsvOJ8YRkH2We/wzFHmESEi4tzPxVDoeOvAmTYqKNJXK303YDnAAEya8bcN7A760ITZnS7Mcv/7u+dhx+Cy4hkOWBEMfMbFAk5Hl7NbXrF7cdy+PF40ifvXHvhHrP8zvmB8JDHarovgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNjo1OTozNiswMDowMLWCrh8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDY6NTk6MzYrMDA6MDDE3xajAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: '#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr:last',
      search: {
        path: "/torrents",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#upload-form-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.radio-inline:first input[name="anonymous"]'
      },
      videoType: {
        selector: "#autocat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      category: {
        selector: "#autotype",
        map: {
          BD100: "1",
          BD66: "2",
          UHD50: "3",
          BD50: "4",
          BD25: "5",
          remux: [
            "12",
            "7"
          ],
          encode: [
            "8",
            "10",
            "11",
            "13"
          ],
          web: "9",
          hdtv: "17",
          dvd: [
            "14",
            "16"
          ],
          dvdrip: "13",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "2160p": [
            "1",
            "1",
            "2",
            "3",
            "12",
            "8"
          ],
          "1080p": [
            "2",
            "4",
            "5",
            "7",
            "10"
          ],
          "1080i": [
            "2",
            "4",
            "5",
            "7",
            "10"
          ],
          "720p": [
            "3",
            "11"
          ],
          "576p": [
            "4",
            "13"
          ],
          "480p": [
            "5",
            "14",
            "16",
            "13"
          ],
          other: ""
        }
      }
    },
    Aither: {
      url: "https://aither.cc",
      host: "aither.cc",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABO1BMVEUnPUA0UVVAZWpQfoRTgolJc3lIcXdSgYc5Wl4zUFQfMDIuSExCaG1SgYhckZhimKBbkJdajpVPfIJEa3Bdk5pXiZBLdnxFbXI4WFwvSU1PfYN1paxvoahsn6aGsLZhmKBbj5ZRgIZVho06W182VVlYi5Jgl59elJyLs7miw8eoxsqryMywy8+px8ucvsNrn6ZflZ0yTlJJcng/Y2iavcJtoKeBrbNelJtDaW4rREcxTVE9X2R5qK5KdHoqQkUoP0IsRUiNtbo3VlomOz5NeX8lOj0jNjkeLzEgMjQiNDchMzYkODslOTxYipEoPkEiNTgbKiwZJykcLC4dLS8uR0tBZmsaKCoZJig+YWYSHB0XIyUWIiQWISMfMTMRGhsVICIUHyATHR4cKy0QGRoTHh8YJScQGBkPFxj////TR8cdAAAAAWJLR0Roy2z0IgAAAAd0SU1FB+UEFw4WFlDBxPsAAAEBSURBVBjTFcppX4IwHADgPwmWmuWRVmCZdF9W2mmFlnlWNtBGY7YxWfL9v0H69vk9AMpCRFVVLaotaksxiENiObmymkpnsupaLr++sQmKbhS2UoVtwyjulEx9F/b2Dw6Pjk9Oz87LF1rpMgtXlap5faNG8+nb8l0ldw8PtcenZwvq9Yaiv5jVV2jWI2+tdqfb679bmWQsAR/Nz8FXHNkOGvZH2qgBqPfdH2LXdTFy2j/NLhBc8+iYenP6VbpjYHzgC59zOtOJhSgEojNmbE5c4tafD4RxTKaMCCGkg6WEMAypx8kscdcOwhACSTjFtkddNJFMBMCoCIj0bIq4DKY++wfZwT9SAOOuEQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0yM1QxNDoyMjoyMiswMDowMNu9360AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMjNUMTQ6MjI6MjIrMDA6MDCq4GcRAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/torrents/create?category_id=1",
      needDoubanInfo: true,
      seedDomSelector: ".torrent__buttons+.panelV2",
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anonymous"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "1",
          concert: "1",
          sport: "9",
          cartoon: "405",
          app: "10",
          ebook: "11",
          magazine: "11",
          audioBook: "14"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "3",
          other: "7"
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    Audiences: {
      url: "https://audiences.me",
      host: "audiences.me",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tag_zz",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "401",
          concert: "408",
          sport: "407",
          cartoon: "401",
          variety: "403",
          app: "411",
          ebook: "405",
          magazine: "412",
          audioBook: "404"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "6",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "5",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "26",
          dtsx: "25",
          ape: "2",
          wav: "22",
          mp3: "23",
          m4a: "24"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "15",
          web: "10",
          hdtv: "5",
          dvd: "2",
          dvdrip: "15",
          other: "11"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "10",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          other: "5"
        }
      }
    },
    AvistaZ: {
      url: "https://avistaz.to",
      host: "avistaz.to",
      siteType: "AvistaZ",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QUPDicuFlMtFwAABCJJREFUOMu1lW1olWUYx3/3/TzPeT9nZ+7NHecr25TFFPFl2UJNtJqURUYFkVFQoCAlTIrCXiDB8IuUFGqCJYn2oZJEhH0Im1NC0G3OaJ7N6Uhzm562s7Oz85w9z3P1wQ2cVh+s/nB9u+7ffV339XLD/yT1L86FgKlAAMgDvYD9t+DtEc11T3SDX5WVKjUjrIg7wtgQ3NiW8VIn87IMeBqYDlSOX5AB9gI7AA/AnAB+ZkHPGMaagLe03G9siMIKS0hoCAh4KNIvofraBqVi2GOKC1lgFDgJ/AI4wHKgBxhSAE1zNKkRL7Jk9sw3SyLxzYFrl0qVYyMo9HieWQ+yAl2O0JyT9JEhOXTRpgC4AMwDHgVc4ArQah6t0fzmEVod5aMSX36TWVxgySCIA0pBly3s7hd+yghBDcvCisqQiq3SrE/2SVNeKAeqgONAB9AC9Jjr3vLTvdd+tVipjUbUsMRyIW6BbYMCx4IZLhQBHRnoTguFGaE6rIoVPD9esIPAaeB34BzgmM0H7Jr5MTabiI8pIVSijHSqlayCMp8wTytqsopnA9AaFE5pQfthSRw1amD4DZLHr9MGnAIuT9TMnFbIC0EflYgCXxroo1PyTI+C6lPY7eDLKkoRUgIRv2LqLKHDgVEPttSqkuIQya+6JHtnd+lIAQ06ipaYQpm3uHnjZ5ygQ7mGs+3w4rDHOQQDiAFeDhLXFLVBiEdgfkIVf1Cvwn+8rm/cCTatmFRhKhABy09vOszMWAp93qUrI3yPUCfCEq1ZrxTPALmssLFdWFmnSJTi681Kdbxi8khoYoSJCCoijJTXMDpnFaUVJciIUCaKEmCf5/GG65IUQQM/ukKbT3iqFiQiECFOzeRBMwkxIiYFWinOX+0gELwMRWl+CEEjLv1AP/CJCM2uy3bD4LAIK2ph9jTwBIBBMjIZPBYkiY/FoqC13+Z0t0tqKE/7tdvACcXHO/851+WBCBx4UKEjkPfI2w7J1NDkiHXG4IQXwsv7hLqFCSrmLuZsLyyqhHfXQti67TgdeF9pChQYU6HTESQIY356BxzO/zp4F/h6Tg7nLLrNMCyoCrPlyRAtO6Pseg3SGpzxDJMKhmqEdUth2IOqWSBBSGv5bvk2udp8afJT6IcbjYsDjux2feStgCZRlKOk2M87h+DTY2A7tx1zAj0zhbpHYGAQBkYgZ0rr1Qx7LuyHt7+8K+JjO13O9LD/Zo49rhFydLSaIy3wbfO9S/hmCuqroSAELUmupF221q+g++sW/lpNu+DIh0R7ji58b/hE1cArj2kB7rENq5Fb3+A+vpQzpYWsBNi1lX/WF42w/WWM059Tv2gu+4BOIF0Ux9aaUaC/oY7mzoNs+XgT5SL39/kYwDTL5KEnlrM2HGQNUOv3Ed25QzF/wX0x/xv9CdGEqkHFq79tAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTE1VDE0OjM5OjQ2KzAwOjAwBxpkNgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0xNVQxNDozOTo0NiswMDowMHZH3IoAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "#content-area .block:last table:first>tbody>tr:nth-child(3)",
      needDoubanInfo: true,
      search: {
        path: "/torrents",
        params: {
          search: "{imdb}",
          in: "1",
          order: "size",
          sort: "desc"
        }
      }
    },
    BLUEBIRD: {
      url: "https://bluebird-hd.org",
      host: "bluebird-hd.org",
      siteType: "bluebird",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACGVBMVEWotrlCjJo7l6k6laY7l6g/jp6brbE6f41G2vRF2PJF1/FF1/JH3Pc8j54ueok7vdU4tc04ts06vNQ5jZwra3gtnLAtmKwuma0rl6splaoqlqotmK0wnrMzeoclWmYyiJknfY4ieYoieYsheIosgJE2iJg1h5g2iJkwg5Qhd4kgeowsZnIuV2F3rrxBf4wSWGcYXGsXW2oWW2qDt8Oq2OOg0NyVxtOAtcNjnaspbnwiUVswUFh7r747bXkAMDwEN0IENkICNEAFOEOYxM+l0NtjkJtgjplnlaF9sL1nm6gjRk8qRU2Cs8FkkZ1Gb3lOd4FReYNVfYdGbXemztiLs70AHCYAIiwAIStHb3mGucc3UlsqQ0t+rryKvMqcy9ep1uG13+vF7vinztibwsx7oqwAHCUBIywAGyQoTFY7V18uTFR9sL5RgIwjUFsoVmEqWGIgTVgdS1YSQEsTQUwXRE9biZV9sb80VFwzWWF3rLpAeYYJSFYPTlsOTFoPTVt5qbSbxtKNu8iCsb55q7h4rLtWkJ0iTVctXWhgorE6hJQbbX4fcIEecIBsrbqDvcp2ssBtqrhoprVRl6YjdYYoX2ooZnIrk6cpj6IqkKMqj6MmjKAnjKAojaEpjqIojqEli58xdIItdYQ3s8o1rMM1rMI3h5Y2foxE1O9C0OpCz+lE1vE6j56Yqq9DmalAqLpAprhCnrCGn6X////cFElzAAAAAWJLR0SyrWrP6AAAAAd0SU1FB+YDAgQyIDB3PAEAAADuSURBVBjTY2BgZGKGAxZWNgZ2Dk4uOODm4WXg4xcQhAMBIWEGEVExcRCQkJSSkpCWkWWQk1dQVFJSUlZRVVPX0NTSZtDR1dM3MDA0MjYxNTO3sLRisLaxtbN3cHRydnF1c/fw9GLw9vH18w8IDAoOCQ0Lj4iMYoiOiY2LT0hMSk5JTUvPiMxkyMrOyc3Lyy8oLCgqLiktK2eoqKyqrqmpratvaGxqbmltY2jv6Ozq7u7p6e3rnzBx0uQpDFOnTZ8BBDNnzZ4zd978aQsYFi5aDAFLlixZvHjRUoZly1esRIBVqxnWrF23Hg7WbdgIAFw/WUNqMtpuAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAzLTAyVDA0OjUwOjMyKzAwOjAwrsTcpgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMy0wMlQwNDo1MDozMiswMDowMN+ZZBoAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/browse.php",
        params: {
          search: "{name}",
          incldead: 0,
          cat: 0,
          dsearch: "{imdb}",
          stype: "or"
        }
      }
    },
    BTN: {
      url: "https://broadcasthe.net",
      host: "broadcasthe.net",
      siteType: "gazelle",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: false,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          imdb: "{imdb}",
          artistname: "{name}"
        }
      }
    },
    BTSCHOOL: {
      url: "https://pt.btschool.club",
      host: "btschool.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBwQr3f9M9AAAAz1JREFUOMt91M+LHXYVBfDPefPmR2ZeY0tnWoyxVgihrT8KQoo/SmwUN23RKtGdiAsFS7vRko1/QYdUEMGFS90KcSWoBIRY6mS0oRoTqVLjj9bEpI2pjUle5r3j4k1k6sID39W953A599xvbGPpu2dN3yoDu9UeHMRS2RNeR8ogXMCb5BTOM/13suLGM/eCwOLRM7CEfZkJ3UlW6JsYmwkOMIfbKltYoOdbL0jOYWv8zP2yePSM1m2D5PFwD21C5VTa1/Bak6tUarnskaxq908pRq1T1V9qxsNp7Q6fo7vDivhV6oXE65Lp1W/cbwfGK8+d/WcYTJPTaQ+WEfa3dk3rRObXzzySeGgQBpwIm5Kt/xF6G0bPvexmtyRZaPuB1qFpO5nW8cyv/+6BJJPZ82fcvP5/xHZi/uhZWNC+a1LT1iRrz25gEoaPiYMt+GuS5/FiMcQWS+EOLGN3dS+up/6B82K5bA2bqOGd4cnwoRk3I2zgS/TKFo+RR9vux91JRuosTpf3hC3MqeVhZsl5n3ZSvphYxVe2Y/RuPI0n1Mt4EYfxE3wTnxVPkO9rfxSWB22XtYdxCfdVPlNdxc+rH8R8+Gr4PI4luYLvjTN+VWzip9WH8WFsDvGx8ClxDL+pnsA9eAqb1R+QcWKOHK6exrlFiyIbE9OXwpfF18u5QeIRyVLlZOVPZEAen20qGwOD8bYtH8X78UM8VB1NTQ1YDHuxivcO1RtNx/gWuYB5eqF8e2p6cc4cM8LX8DNyLHxh5mEv4z58Eqfwi6w9u3F7kz1YjRTj6ivVNyKTyDw+YhaZ43gLi/g4Hsbd+C1+jFeyur65Fi1RvRyZXDxyAKytb97KcMzu1q3ajvoC1jrr2RpG98286a7MJjiztn6yjFw88sAtbndeyNr6S+qGMqQPhkfxLxwfkNPkUrlUPlE9hHdwNTsmfNtUNR6EVXoYny6Xw+/DH7ZJXS6H1F24FuaanNNeCH8vYyGyq+yl78SB7f9xiBOR5+mN7PBiSXvvLBJGYk41XC/XxBLZhZF2GQuSv23b9EfcvHjkwCxgsPadk1zFwO2tu8SDYV7ta1zByvY5vqq5Rn+d5C/b3v13Wf8BYeJvdWEcGZ8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDQ6NDMrMDA6MDC0QHbWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA0OjQzKzAwOjAwxR3OagAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: 'input[name="picture"]',
      imdb: {
        selector: 'input[name="imdbid"]'
      },
      douban: {
        selector: 'input[name="doubanid"]'
      },
      tags: {
        chinese_audio: 'input[type="checkbox"][name="span[]"][value="5"]',
        chinese_subtitle: 'input[type="checkbox"][name="span[]"][value="6"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "405",
          tv: "406",
          tvPack: "406",
          documentary: "408",
          concert: "409",
          sport: "410",
          cartoon: "407",
          variety: "412",
          music: "411"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "10",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "10",
          dd: "10",
          "dd+": "10",
          flac: "1",
          dts: "3",
          truehd: "11",
          lpcm: "5",
          dtshdma: "3",
          atmos: "3",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "11",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "1",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          btschool: "1",
          zone: "13",
          btshd: "2",
          btstv: "3",
          btspad: "4",
          wiki: "5",
          hdchina: "6",
          hdbint: "7",
          mteam: "9",
          cmct: "10",
          ourbits: "11",
          other: "12"
        }
      }
    },
    BYR: {
      url: "https://byr.pt",
      host: "byr.pt",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
      }
    },
    Bdc: {
      url: "https://broadcity.in",
      host: "broadcity.in",
      siteType: "Bdc",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxMX1XFD5QAABLtJREFUOMs11FtvXFcBhuF3rX2aPcdte8b2xIc4cRIl8di1pbg0QQJEUVGlChASSL2g6v/ggt4gfglcAAKJG0gFEpSUEtJUNK1NfIo99ng84/GcPMc9s9davTD9fsCr7+oR7k9/YQAwBiMkGoHuXmIuSojWOQx7YBQIgbEshJ+EzDRM5LFTAQKN0ZqvZ1+1DEgbVITXrzMRtkhOOjizy+D54LoYYaGiEdcDn5Qj2Dqusn/RIUrnsD0PdARGYGNAWDY6HBAbNFiOjXl9/T652Wu4qQAZ85GWhdKaTDzG7WySjBjz+ctd/viPZzyr1GhHE1h+GozCNlIgtMa0qohOFWd+FiuTh0weP53AHg/oVEoYY1h5tMlrd5cJEh73C/fIBin0n/7F80oXpQWOLbDste99YLp1TLXIeDCgYWfZO21wcHpO+7LF4fYWf/j17/j7k6fEgzRezCPSiiCX5eatBRgNcDrbJNQ+vguWtfLtDyjvobod0lMzPLh/g598a433337Iu29+g0ert0lNZDhpXhKk4hzu71MqlVkvLJIaPWE59hGbkx+T0Gc8O81h02tiOheAZIykcrDNl4My333tJv1Oi3a7ybs/fItuOKTVHXB4VMIdbBM/fcGo/pQpv0Jf9qh15ijWAmw6FzAagBswjKBZq5FYyjKZTuFnAobDkN5lm+LxMXgT3F0Y8Mb0Z+jKkJ1ynvYgTbmRZb95EyN9bNNrg9YYYWHbDou5PD94520cx0aNQoJUkpNSid2jCtPXIn60csYb0zWev1rgRfcdnnzyBWrYRiWTBF4fW0QjMBrCPmlLsX7vFg83N/jk6afsF0/YWC2wVihQuL9Gr/tvArlFZ+jzm/9skJxJcnzSJDbeI51vortz2FJKLBXCRZXRoE513qN6dkaz1WJ6eob5uTylwwNebr9k/UaRqcSYSkNw8GqH709X+NV7RxSLdX7/DM5rOWxleWQnJymsr/Bg83U2H2ywsHidVDpNsVTmww//yuPHf+Nw65BFf8hYWXxzNeSXiWMSjuKLQ8WfP43x/CiJyXiI7Js/M4WM4dHKMrfu3MESgnqjQeO8ylHxmK2dPXYPioRDwWzW8J2NPg/uDBFa0u4n+OiF4LNdaDrXcG6vYbupACV7VM9r9LodKuc1vny5y3m5jNGaiWyW1cJd6o1Lms0Bj5/H+ed2hOe5xJNztJtdhN3Az8QZJ6cQzo9/btSrz1mSbVaXZpnM5Wh3+7i2RSadYnZmhqmJNHvFUy5aXcIwAgOuazM3naF5fsZ/X5XZCZOEcyvYuD4iv8y1nOBhYZ7r1xcJIwXGYEmJ7/skEnHmF5cY9PsoFSEAbcAShqOjODvDOMOGREoLWxiFTE2wc9mi+ZePSXR/i+M4eH4chEQI8GIxhJCMwyFKRWilGA2HhGFINzVPLb2ESAQIrbCN1iAt6iZGredCqYNoV7DV6ApWQFoWUlro/8eMECjbx2Ty4PhYmTiWlKAVthACoxVOPIm4sYKZmkGf/g9TL2H6bUw0ItIKDAjbRfguIp7BnppHzt1DpLNX0qsxQogrsQWgozFCWohgBpkIMI0S5uIEc3mBGfUBEG4ckc4isguIyXlwvKvHOkIIAQa+AvwANNpBILcLAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjE5OjIzKzAwOjAwAUZk1AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzoxOToyMyswMDowMHAb3GgAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        imdbOptionKey: "t_genre",
        nameOptionKey: "t_name",
        params: {
          imdb: "{imdb}",
          search_area: "{optionKey}"
        }
      },
      seedDomSelector: "#details>table>tbody>tr:nth-child(11)",
      name: {
        selector: "#subject"
      },
      description: {
        selector: 'textarea[name="message"]'
      },
      imdb: {
        selector: 'input[name="t_link"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"]'
      },
      videoType: {
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "6",
          web: "5",
          hdtv: "4",
          dvd: "7",
          dvdrip: "7",
          other: "15"
        }
      },
      resolution: {
        map: {
          "2160p": {
            remux: "2",
            encode: "2",
            web: "6"
          },
          "1080p": {
            remux: "4",
            hdtv: "4",
            encode: "4",
            web: "5"
          },
          "720p": {
            hdtv: "4",
            encode: "4",
            web: "5"
          },
          "576p": {
            encode: "23",
            web: "5",
            dvdrip: "36",
            dvd: "10"
          },
          "480p": {
            encode: "23",
            web: "5",
            dvdrip: "36",
            dvd: "10"
          }
        }
      }
    },
    BeiTai: {
      url: "https://www.beitai.pt",
      host: "beitai.pt",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: false,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      }
    },
    BeyondHD: {
      url: "https://beyond-hd.me",
      host: "beyond-hd.me",
      siteType: "F3NIX",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACMVBMVEUAAAAJIO///wAAAP8IGvAWQ9wWQdsYSNgYSNkWQNgUPd4vgrlGuZU6n6w1kbMVPdwVPdsZRNEYRNUWQtkVQNkGGPGu/zQIHugZStkeV9EhXc4iYcwiYsshYMwgXM4eVdEYRtgSOeEeVtIiYcwkZskkZskiYMwdU9MRNuEVP9wgWs8jZcojZcofWdAUPt4RMt4fWs4kZskkZskQMeMeVc8kZckjZModU9IiYMsiYMwXRdkeVc8fZMcdVNAhW8qxwvNljuBTg9o/dtUgW80iX8n+/v/6+v709f7K1fgiYMsiYMoiYssiYMsiYssiX8siYMsgXMwgW8weVM8kZckdUs8XQtciYMwXQtgdU9MjZModVNEQMeIfWM0fWM0QMOEVOtQfWc0fWM4UOtkSNt4cUtEhXswkZckiYcsdVNARNt4WQNgdUs4gWswhXssiYcoiYcsiYMogXMweVs8YSNUkZ8klaMgkZ8glaMklZ8kkaMglZ8gjZ8hbidxJfNgtbM3B0PSete8kZssiZsgfZMdnkt729/7j5/xGeNkpacw6c9JMf9dnkd7N2vX//////v8ras0jZshKetrL1fjx8/36+v7+/v9GetYnaMp0muLr7/z+/v7k6vpnk9wjZslrk+Du8f3p7vxfi9w0cNDY4PnZ4vk1cdBNgdbu8vzv8f3s7/xJftYhZchgjdzr7f2vwPJVgtxTgtulufDo6/1mkN5GeNhcht4oZ8wmZstUgttHetgkZsmOuILKAAAAdHRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcbLvo9O3DcR4IXcz6+9JmCQ6N9viWEQeN/P0KXfX4aM3TIm7+dbr+/v7+wOf+/v7+6/T28/fr7L++cvtzIdEhafdjCZGMCA+RjA4IYNL6zF0IH2697Pb057prG30aCesAAAABYktHRI0bDOLVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QQKBwYCrXu2GgAAAXtJREFUGNNjYGBgYGSSkJSSlpGRlZNXYGZhAANWRSVllZJSIChTVVPXYAOJsWtqaZeWlpeXlZWXl5bq6OpxMDBw6hsYllaUl1eWlABlKkqNdI25GLhNTEFiVdU1tdUVIFEzcx4GBQuQWElZXX1DY2U5SNTSisFapbS8rLqpuaW1rd2mqbqsvFTVlsGurLyso7Oru6e3z97B0akfyHVmcCktnzBx0uQpU3t7Xd3cPaZNKC/1ZPAC6p4+Y2bvrN6pU3tnz6kA6vdm8AE5ce68+b1AsGBhE8ixvgx+QMHy6kWLQYJLllZXAQX9GQLKqqrKm5Yt752/onflqiagirJAhqDg0qry1WvWrlu/YeOmzavLq0qDQxhC1UqrSids2bqtqWn7jp0TgI4PC2fgjdABKt0FsqGsCSQWGcXHwB8dAwwQUDABAZARHBsnwMAgGJ8QCRUDBp12YpIQKECFk1NS08pAgVyikp6RKQIJelHmrOyc3Lz8gsKiYjFxoAAAdfCapAG3hnMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDY6MDIrMDA6MDCSiKOlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA2OjAyKzAwOjAw49UbGQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: ".table-details tr:last",
      needDoubanInfo: true,
      uploadPath: "/upload",
      search: {
        path: "/torrents/all",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          imdb: "{imdb}",
          search: "{name}",
          sorting: "size",
          direction: "desc",
          doSearch: "Search"
        }
      },
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2-Disc Set": "2_disc_set",
          "2D/3D Edition": "2d_3d_edition",
          "2in1": "2_in_1",
          "3D": "3d",
          "3D Anaglyph": "3d_anaglyph",
          "3D Full SBS": "3d_full_sbs",
          "3D Half OU": "3d_half_ou",
          "3D Half SBS": "3d_half_sbs",
          "4K Remaster": "4k_remaster",
          "4K Restoration": "4k_restoration",
          "Digital Extras": "extras",
          "Director's Cut": "director_s_cut",
          "Dolby Atmos": "dolby_atmos",
          "Dolby Vision": "dolby_vision",
          "Dual Audio": "dual_audio",
          "English Dub": "english_dub",
          "Extended Cut": "extended_edition",
          "Extended Edition": "extended_edition",
          Extras: "extras",
          HDR10: "hdr",
          "HDR10+": "hdr10_plus",
          "Masters of Cinema": "masters_of_cinema",
          Scene: "scene",
          "The Criterion Collection": "the_criterion_collection",
          "Theatrical Cut": "theatrical_cut",
          "Two-Disc Set": "two_disc_set",
          Remux: "remux",
          Rifftrax: "rifftrax",
          Uncut: "uncut",
          Unrated: "unrated",
          "Warner Archive Collection": "warner_archive_collection",
          Commentary: "with_commentary"
        }
      },
      targetInfo: {
        editionTags: {
          "2d_3d_edition": "2D3D",
          "2_in_1": "2in1",
          "3d": "3D",
          "3d_anaglyph": "3D",
          "3d_full_sbs": "3D",
          "3d_half_ou": "3D",
          "3d_half_sbs": "3D",
          "4k_remaster": "4kRemaster",
          director_s_cut: "Director",
          dual_audio: "DualAudio",
          english_dub: "EnglishDub",
          extended_edition: "Extended",
          extras: "Extras",
          hybrid: "Hybrid",
          scene: "Scene",
          theatrical_cut: "Theatrical",
          uncut: "Uncut",
          unrated: "Unrated",
          webdl: "WEBDL",
          webrip: "WEBRip",
          with_commentary: "Commentary"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#upload-form-description"
      },
      imdb: {
        selector: "#imdbauto"
      },
      tmdb: {
        selector: "#tmdbauto"
      },
      mediaInfo: {
        selector: "#mediainfo"
      },
      anonymous: {
        selector: 'input[name="anonymous"]'
      },
      videoType: {
        selector: "#category_id",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      category: {
        selector: "#autotype",
        map: {
          BD100: "UHD 100",
          BD66: "UHD 66",
          UHD50: "UHD 50",
          BD50: "BD 50",
          BD25: "BD 25",
          DVD5: "DVD 5",
          DVD9: "DVD 9",
          remux: [
            "UHD Remux",
            "BD Remux",
            "DVD Remux"
          ],
          encode: [
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          web: [
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hdtv: [
            "2160p",
            "1080p",
            "1080i",
            "720p"
          ],
          dvd: [
            "DVD 9",
            "DVD 5",
            "DVD Remux"
          ],
          dvdrip: [
            "480p"
          ],
          other: ""
        }
      },
      source: {
        selector: "#autosource",
        map: {
          uhdbluray: [
            "Blu-ray"
          ],
          bluray: [
            "Blu-ray",
            "BD 50",
            "BD 25",
            "BD Remux",
            "UHD 100",
            "UHD 66",
            "UHD 50",
            "UHD Remux",
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hdtv: [
            "HDTV",
            "2160p",
            "1080p",
            "1080i",
            "720p"
          ],
          dvd: [
            "DVD",
            "DVD 9",
            "DVD 5",
            "DVD Remux",
            "480p"
          ],
          web: [
            "WEB",
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hddvd: "HD-DVD"
        }
      },
      resolution: {
        map: {
          "2160p": [
            "UHD 100",
            "UHD 66",
            "UHD 50",
            "UHD Remux",
            "2160p"
          ],
          "1080p": [
            "BD 50",
            "BD 25",
            "BD Remux",
            "1080p"
          ],
          "1080i": [
            "BD 50",
            "BD 25",
            "BD Remux",
            "1080i"
          ],
          "720p": [
            "720p"
          ],
          "576p": [
            "576p"
          ],
          "540p": [
            "540p"
          ],
          "480p": [
            "DVD 9",
            "DVD 5",
            "DVD Remux",
            "480p"
          ],
          other: [
            "Other"
          ]
        }
      }
    },
    Bib: {
      url: " https://bibliotik.me",
      host: "bibliotik.me",
      siteType: "Bib",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBwgUxywuxQAAA51JREFUOMvNlM1rXGUUxn/nvfe99733zkxnmk6bxDRaUGwWUsEiSPcF0X+g24JLN4LbLtwJurXQ7rqxuhTcuKiWWlxJaamC1CRtmpjJfGSSSe6dO/fjfV20paDQgiuf1QPnPL8DB86B/7vkZQ3Xrl0DaAEXRVzH97WNopgkSZib61qt9dfW2j/PnHnr5cDLl7/CWtvRWn+odfCl7/tdrQOiKCRJGiRJo/aU+qyy9vb+5DAYDXr/Bl65cvWZ7YIoa8vzwFXt69CYBqEJiSKNMYaytK6ZRLZG3P7kgMPJHv6z9A8/3sTzPGpbqwf37/u+1l+AOy/iKc9TQbPVxDnBGB9jQmazgtpGUtZ44/GAg4OUY91jz4FKKZTnnZ3l+aWqKn1r7Tta6+NBEJA0EowxhKHBGIPnefh+gOeHjHeHOGfpdueIIvMEeP36N4x62+equv54Vsw+qOpaBcpDeepp2MdEBiWKoigJQyGOI8bjMc5ZWq0WsUmwucX79d5v79+/e+e1qio/cs5eyNJDMSYiSRJ83wdxKOVjTBNbW0QcSinyPKfX69Fut4miiKqo0U7j7+2NvyuKgtFwoOYXFul05gjCgMgYiqIgz6dY65jslxw9GtFoBBwcHPJ4YwNfa5TnkaUZZVXS7R7H//mnG/6gv0OWZQxHu8RxTKvVYmVlhcXFBeq6ZjQa4zjAmAbD4ZCtrS3iOGZhYZE8z8nzKUkco0SQG7d+caPhgI2H6zxaX2c42CH0PY7PL7DwyiLLy6+yvHyKophSVRVpmlKWJe0jRzgxP0+apsxmM+qqYprnyKPersvSlOGgT2/7L3Z2tulvbbLd20bhOP3mKc6++za1i3j4cIP0MCXQAVprmq0mYRjSbrdptloIIKuPd74XkVopddrBG/ks59HaGg/++J29QR8lOUFkUapDv79LlmUA2Nqitc/c3BxLJ0+ytLREp9NB1jb7HlADnzjnPn3qTygRfzLZ597dO9y+dZOqLGi32wBMsynW1pRFQRzHJHGMDgI8z3tyemubfZxzLRFpACeBb4Fla21VFIVMp5ma7E+kKGZM9saMd4eMxyPWV1exRY7WIToMnwOfaW2zD2Ccc+8BsYjKlafO4dylsqy8uq4oi4KimFGWBVmakmUp6WFKmh4wy7MXf5vVxzsAr4vIBRFRAKIUSsSKSEeEi0VZHZlmGdNpSjHLX/4PXzDoGPC5iMyLSAUgIv8N+HQ1AN4/a38DST6z5HJSpzwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDg6MjArMDA6MDBZ+4VCAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA4OjIwKzAwOjAwKKY9/gAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload",
      name: {
        selector: "#TitleField"
      },
      description: {
        selector: "#DescriptionField"
      },
      anonymous: {
        selector: "#AnonymousField"
      },
      image: {
        selector: "#ImageField"
      },
      format: {
        selector: "#FormatField",
        map: {
          epub: "15",
          mobi: "16",
          pdf: "2",
          azw3: "21"
        }
      }
    },
    Blutopia: {
      url: "https://blutopia.cc",
      host: "blutopia.(xyz|cc)",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      uploadPath: "/torrents/create?category_id=1",
      needDoubanInfo: true,
      seedDomSelector: ".torrent__buttons+.panelV2",
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anon"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "12",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "12",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "11",
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    CHDBits: {
      url: "https://ptchdbits.co",
      host: "ptchdbits.co",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA81BMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD0AAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAARAAAjAADaAAD/ICBmiIgEBAQDAwMBAQEAAAAAAAAAAAD/AAD/3d39/v7GxsYAAAAAAAD/AAD/5OT/////AAAAAAADAwMCAgIBAQG5ubmAgIBaWlq6urq1tbWysrI0NDT///9/f3/7+/tJSUnLy8tRUVFOTk6mpqb19fXe3t7d3d3c3Nzu7u69vb0hISEdHR0XFxeOjo5X4OIMAAAAM3RSTlMAgbIHAnne59jwjna/7aAVK0RCQQ1VtrUFA7L7/PhdGBgDAwW2/unnnQaxGKDt6LawIeA+sl6aAAAAAWJLR0QyQNJMyAAAAAd0SU1FB+UECQo4D4hi7WcAAACoSURBVBjTY2BgYDRGBUzMDCysbGiC7EwMjBzGxpxc3HDAymNszACU4uXjFxAUggBhEVExcZCgmISklIk0GMjIyskrKIIExZWUVUzNTExMzE1NVdXUNTRBglraOroWlkBRK2sbWzsTPX2QoIGhkb29jamJiYO9vaMTUAdc0NnF1ckNXdDdw9PLG13Qx9fPPwBdEKuZ6IJYnYTV8Vi9iRkgWIMOayBjiw4AMGtCDVTI3J4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMDlUMTA6NTY6MTUrMDA6MDBQcxNEAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTA5VDEwOjU2OjE1KzAwOjAwIS6r+AAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(6)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: 'input[name="cnlang"]',
        chinese_subtitle: 'input[name="cnsub"]',
        diy: 'input[name="diy"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406",
          music: "406"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "5",
          h265: "5",
          x264: "1",
          x265: "5",
          mpeg2: "4",
          mpeg4: "6",
          vc1: "2",
          xvid: "6"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "7",
          dd: "4",
          "dd+": "7",
          flac: "1",
          dts: "3",
          truehd: "11",
          lpcm: "13",
          dtshdma: "10",
          atmos: "10",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "19"
          ],
          bluray: [
            "1"
          ],
          remux: [
            "3"
          ],
          encode: [
            "4"
          ],
          web: [
            "18"
          ],
          hdtv: [
            "6"
          ]
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "6"
          ],
          "1080p": [
            "1"
          ],
          "1080i": [
            "2"
          ],
          "720p": [
            "3"
          ],
          "480p": [
            "5"
          ]
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "8",
          US: "3",
          EU: "7",
          HK: "5",
          TW: "9",
          JP: "4",
          KR: "6",
          OT: "0"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          chdbits: "14",
          sgnb: "13",
          remux: "1",
          chdtv: "2",
          chdpad: "15",
          chdweb: "12",
          chdhktv: "11",
          stbox: "10",
          onehd: "8",
          blucook: "16",
          hqc: "17",
          gbt: "18",
          kan: "19"
        }
      }
    },
    CinemaZ: {
      url: "https://cinemaz.to",
      host: "cinemaz.to",
      siteType: "AvistaZ",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAABGdBTUEAALGPC/xhBQAAAAJiS0dEAP+Hj8y/AAAAB3RJTUUH5QwGCikNXab0zAAAAL1JREFUGNNlyi1IA3EAxuFnHzoE3WSw4hBsBpOIzWTUZBaFlctL64LdImJfH1ZBZ7YLNneMQ8OF3dzcQNC/QZGh7y8+bwFbTkVKEg0ndsRScjZdSiR2DS26ta7iSMyFKws4lNnDsjtN8mpeTNGX6SOTqlJQciyzpGlD1bN9B87FzGsZGBvpmhhJReZUoK4nCD4FwYNtZ9qw6kn4bagnuC/6u7IyPvL/4N0bct8wy7HIjdcixrrWhJ/Lo45rK18qoT8Iilms5wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMi0wNlQxMDo0MToxMyswMDowMGagtagAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTItMDZUMTA6NDE6MTMrMDA6MDAX/Q0UAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "#content-area .block:last table:first>tbody>tr:nth-child(3)",
      needDoubanInfo: true,
      search: {
        path: "/torrents",
        params: {
          search: "{imdb}",
          in: "1",
          order: "size",
          sort: "desc"
        }
      }
    },
    Cinematik: {
      url: "https://cinematik.net",
      host: "cinematik.net",
      siteType: "Cinematik",
      icon: "data:image/png;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8ACAgIAA0NDQATExMAFBQUABsbGwAfHx8AJycnACoqKgAtLS0AMTExADU1NQA5OTkAPj4+AEFBQQBFRUUASEhIAE1NTQBRUVEAVVVVAFlZWQBdXV0AYWFhAGVlZQBpaWkAbm5uAHJycgB1dXUAenp6AH5+fgCCgoIAhoaGAImJiQCOjo4AkpKRAJSUlACdnZ0ApaWlAKioqACsrKwAsrKyALS0tAC8vLwAxcXFAM3NzQDa2toA6enoAO/u7QD+/v4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/ykgICAfHx8fICv///////8iJiAZGRkYGRgiKf//////IBsZFBQUFBQSIC4p/////yIkGxQQEhISEB0wLib///8gGRUQDQ0NDQ0SFBkfKf//ICIZDBQdEgwMCQwYGxv//x8dFQkZMC0fDQkJFRsZ//8fHxUFGDAwMCwYBxUbGP//Hx8YAhgwMDAwIgUVHxj//x0VDTEVMDAqFQUCEBUV//8dIhgxDSkVAzExMRUgFf//HRAJMTECMTExMTEMEBX//x0lGTExMTExMTExGSQU//8dEgwxMTExMTExMQwQFP//HSAVMTExMTExMTEVIBX//yYYGBUYGBgYGBUYGBQg/4Af//+AD///gAf/P4AD//+AAf85gAH//4AB//+AAf//gAH/P4AB++eAAb5fgAFc6YABvl+AAVc6gAE/v4AB/z8=",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "div.odiv_1 + table >tbody tr:nth-child(3n)",
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        params: {
          search: "{imdb}",
          cat: 0,
          incldead: 1,
          srchdtls: 1
        }
      }
    },
    Concertos: {
      url: "https://concertos.live",
      host: "concertos.live",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,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rRvmotBO9rKvAe39kDEM7dv4twRt539nXA9abmZahZabmUah5WamVWi5mWkVWm5mGoWWm5lWoeVmplVouZlpFFpuZlqFlpuZRqHlZqZVaLmZaRVabmYahZabmVah5WamUWi5mWkVWm5mWoWWm5lGoeVmplVouZlpFFpuZlqFlpuZVqHlZqZRaLmZaRVabmZahZabmUah5WamVWi5mWkUWm5mWoWWm5lWoeVmplFouZlpFVpuZhqFlpuZVqHlZqZVaLmZaRRabmZahZabmUah5WamVWi5mWkVWm5mGoWWm5mPpas/zCs/nqA/xpnS8Ju69C9khqnUdh3WhAAAAAFvck5UAc+id5oAAACZSURBVDjL1dOxEQMxCATAU0AJ9EMJCkT/rfzYL/HcRXbgwGTsD9L8cAKocnHvmdRbMrz6DiMFUsAFLBlGMlSfdOADLvAMbLCfwnIBCEAgBCYYFgQgEAIBhgmB+HcYwWBtDVGZaGAKrpCfg803jAO2t1hw1npGTMEVKgn3p9XA7kw8gHZJ/f4k6A8D34BX4HbZSSTN9H7fXnUBXz+QkWPfUykAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTAtMjdUMDM6NDc6MzUrMDA6MDBKPrQ3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEwLTI3VDAzOjQ3OjM1KzAwOjAwO2MMiwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0xMC0yN1QwMzo0NzozNSswMDowMGx2LVQAAAATdEVYdGRjOmZvcm1hdABpbWFnZS9wbmf/uRs+AAAAFXRFWHRwaG90b3Nob3A6Q29sb3JNb2RlADNWArNAAAAAJnRFWHRwaG90b3Nob3A6SUNDUHJvZmlsZQBzUkdCIElFQzYxOTY2LTIuMRwvbAsAAAAQdEVYdHhtcDpDb2xvclNwYWNlADEFDsjRAAAAKHRFWHR4bXA6Q3JlYXRlRGF0ZQAyMDE4LTA0LTE1VDE4OjE0OjIxKzAyOjAwX6YhzgAAADN0RVh0eG1wOkNyZWF0b3JUb29sAEFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpmllTCQAAACp0RVh0eG1wOk1ldGFkYXRhRGF0ZQAyMDE4LTA0LTE1VDE4OjMzOjE2KzAyOjAwJmTVnAAAACh0RVh0eG1wOk1vZGlmeURhdGUAMjAxOC0wNC0xNVQxODozMzoxNiswMjowMBrAhiIAAAAWdEVYdHhtcDpQaXhlbFhEaW1lbnNpb24ANjTJIcZzAAAAFnRFWHR4bXA6UGl4ZWxZRGltZW5zaW9uADY0FLcf9gAAAEt0RVh0eG1wTU06RG9jdW1lbnRJRABhZG9iZTpkb2NpZDpwaG90b3Nob3A6MGI0NjQyYjktODE1OS0xMTdiLWI3MzQtOWVjODc3YWYyZDliEBg3pQAAAD10RVh0eG1wTU06SW5zdGFuY2VJRAB4bXAuaWlkOjlmMThhNDc5LWIwYTUtNDczMS1hNjcxLTZhYTllMjAyNjdhMl6RzKYAAABFdEVYdHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRAB4bXAuZGlkOmMwOGUxNmM1LTZkNGYtNGVlMy04ZGVkLWYzMTJiZWIyMWVlOSZ+IrEAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: true,
      seedDomSelector: "div.torrent > div.buttons.mbox.mbox--small-bottom",
      uploadPath: "/upload",
      needDoubanInfo: false,
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdb: "{imdb}",
          order_by: "size"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "div.sceditor-container textarea"
      },
      imdb: {
        selector: 'input[name="imdb"]'
      },
      tmdb: {
        selector: 'input[name="tmdb"]'
      },
      mediaInfo: {
        selector: "#mediainfo"
      },
      anonymous: {
        selector: 'input[name="anonymous"]'
      },
      category: {
        selector: 'select[name="type_id"]',
        map: {
          BD100: "1",
          BD66: "2",
          UHD50: "3",
          BD50: "4",
          BD25: "5",
          remux: [
            "12",
            "7"
          ],
          encode: [
            "8",
            "10",
            "11",
            "13"
          ],
          web: "9",
          hdtv: "17",
          dvd: [
            "14",
            "16"
          ],
          dvdrip: "13",
          other: ""
        }
      }
    },
    DicMusic: {
      url: "https://dicmusic.com",
      host: "dicmusic.com",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB0VBMVEUAAABRyvRWzPVd0PRQyvRdz/V83fiA3/h+3vil7vt32/d/3vhRyfVRyfRQyfVRyPVSy/NNzvBQy/RRyvNdx/BcxvFSzvgA//9RyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRQyvRRyvRRyvRRyvRRyvRRyvRRyvRSy/VUzPRRyvRRyvRRyvR73fiB3/lRyvRRyvRRyvRRyvRUy/Rl0/Z53PiC4PmF4fmF4fmA3/iC4PmF4vqF4fmD4PlRyvRRyvRRyvRQyvRe0PV73fiA3/h+3vh+3vht1vdazvVSyvRs1vZ/3vh+3vhRyvRPyfRQyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyfRRyvRRyvRQy/RRyvRRyvRRyvNRyfNQyvRSyvRSy/ZRttpRqcdVzPRg0PVq1fZw2Pdz2fd02vd12vh02vh00+90z+ly2ff///+GemWQAAAAh3RSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABLmt8WBYGi/v8w0AJg+iRUDw1GggrWZ72+vTw1WkEGV2y5/JNdNKfAlaZiUlUxv7IDh+OFxWT9eczjK6505EQit33+fv7+/v5/f37/ukOjUNFS1FRUVCB8dtmUDTreOXCPjbxMAskEfiWBXOqAzMzDrfyAAAAAWJLR0SamN9nEgAAAAd0SU1FB+cKGgg3G6bwFqAAAAE1SURBVCjPY2AYHoARBnBIS0hKScvI4lLAKCev0K6opIzVDJCIiqpCe7uauoamljaqPEhSR1dP36AdCAyNjE1MzYDyUFNApLmFpZViOxxY28CkQUDW1k6hHQXYOzAyODo5u6gwMsq5urmjSnZ0engyMXh5KxrY+/j6+QNFurrau2Ggp7cvIJAZ6Jeg9vbgEJD6/gkTJ02eMmXq1ClAMG36jGmhYUC7wyMi2xWjDKJjYuPi4+MTEmdOTooHgeT4lFSQ09KC29MzMrOyc3Jzc/PyC9oLi4pzIaAE5CXJ0nYZRhZWNnZ2dg7OsvKKSi5udgjgBoVHVXVpDTSAeBhr6+p5+fgRoSXAmNHQ2ASXBgJBIaTAFGZsbtHGFYUMDEKtbfWMjLy4pEVEgeaJ4Uwh4kBAv/RIPQAAlh1hyJQd92oAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTAtMjZUMDg6NTU6MjYrMDA6MDA7po/7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEwLTI2VDA4OjU1OjI3KzAwOjAw7Iw88wAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0xMC0yNlQwODo1NToyNyswMDowMLuZHSwAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{name}"
        }
      }
    },
    DiscFan: {
      url: "https://discfan.net",
      host: "discfan.net",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzkJYndFrgAAAwxJREFUOMt9lFlvJEUQhLOOrj6qp+duH2Ps1bJIIOD//xOeOBZ7oe2Zcc/0XXfyYEu7sBbxlqH8lEopFAQR4S29+oS8jOStHf4m9iI9TagUBRdEEsVpJAQh5P9grbVVOhKJSAVaF+/3pnt4qNpjXFx8+HD7zV2c8DdgRDyfz1VVCRFflJdcCESCwQXVHY/HX5qn3451fap/+vEHKfMXhL6SgF1zru7v6/rcNk3XNICBc8oCjqN56vXAARnW9enjH/dKqX/BMCk4PEmjYuoHNT63J6UnoBQI1q07ekhkNi+KvJCB4vF49N6/wgig2zZV6oLhNecJpX3b1afngL4x6rEbJpGuN5vNuiyKpRBCKTVN4+vPzphmaCgEGUUbgjGxfxn76f7TaVYb5ZrZspyx3VU5X8wjRiLnInTdYS9lzgHAWFM7HdAzChknGeO5MRMAR5JsN5YxpaZ5JBbOiVGlWnMaOq2m8ZIDgJ4mZY1BxwPrECgBT0mayovr3Xq9rqrq14+/R+OptI6gJeAogcFmahg4ACjvD88nPekQggveaTeT8lKkIo6BkCRNMAQ1tBO2hAfCkdNoghA5ywGAEXJ8PNXns7EOrY8ciquNny+qx2oYuqf9HoBM0eyhI2IcGdo4QpWwPMs4AMhMUkJNP4rA1nF0M8vuVmuTZVqNfz7XRo95Khe7azVM/fkc+j511rM8zyQHgCxNv73eRXUzj/ilzHflKru5g91l0zf4d3VrdZQIxUW2TgYp9dAPbb8py0gIDgCUsfffvRfHukC/nC/ysvTbjUjTDEOR95lWmdJ+aE1eZEmSCeEDrMvt52wvtxv/8/difyhmhduuaJ4QQO99ANBA02DkMBrKIC/6pt8sV7Ni9hmmhC5vbgYhFOFQFCllIQR0DgmxlARLYgzS2upwSOWsvLogQL7INkAkxOzqSiexHUeLGBCRECRA4sSzqLX6NE6L5er23S3jryfJf5okhGCMGbpOGWOMmaYxTJOgpNhs56t1kmVf9gH5uoZeHKP1qJRzTjCWScmF+LqJ/gFiT9/X+5vOiQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo1NzowOSswMDowMA4aMCMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NTc6MDkrMDA6MDB/R4ifAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      category: {
        selector: "#browsecat1",
        map: {
          tv: "411",
          tvPack: "411",
          documentary: "413",
          cartoon: "419",
          sport: "417",
          concert: "414",
          variety: "416"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "2",
          bluray: "3",
          remux: "0",
          encode: "10",
          web: "9",
          hdtv: "1",
          dvd: "4",
          hddvd: "4",
          dvdrip: "10",
          other: "0"
        }
      },
      area: {
        selector: "#browsecat",
        map: {
          CN: "401",
          US: "410",
          EU: "410",
          HK: "404",
          TW: "405",
          JP: "403",
          KR: "406"
        }
      }
    },
    EMP: {
      url: "https://www.empornium.is",
      host: "empornium.(is|me|sx)",
      siteType: "gazelle",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php"
    },
    FBCD: {
      url: "https://pt.fbcd.ga",
      host: "pt.fbcd.ga",
      siteType: "NexusPHP",
      icon: "data:image/ico;base64,AAABAAEAgIAAAAEAIAAoCAEAFgAAACgAAACAAAAAAAEAAAEAIAAAAAAAAAABABMLAAATCwAAAAAAAAAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8CAgL/AgIC/wICAv8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AAAA/xMTE/83Nzf/BAQE/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/CQkJ/wgJCf8FBQX/CQkJ/wYGBv8HBwf/FhYW/0FBQf8ICAj/CwsL/wICAv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wAAAP8sLCz/LSws/yAfH/81NDT/Gxoa/zk4OP8WFRX/PDw8/xMTE/9BQUH/CAgI/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AAAA/ysrK/8sKir/IB4e/zQyMv8cGhr/OTc3/xgVFf89Ozv/EhMT/0BAQP8JCQn/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8AAAD/LS0t/y8tLf8jISH/NjQ0/xwaGv88Ojr/GRcX/0A+Pv8TExP/Q0ND/wgICP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8mJib/FxYW/yIhIf8bGRn/GxkZ/x8eHv8WFRX/IyIi/xESEv8pKSn/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgIC/wICAv8AAAD/AwMD/wEBAf8CAgL/AQEB/wMDA/8AAAD/BAQE/wEBAf8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8AAAD/AQEB/wAAAP8BAQH/AAAA/wEBAf8AAAD/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AgIC/wMDA/8DAwP/AwMD/wMDA/8CAgL/AQEB/wEBAf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AQEB/wEBAf8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8CAgL/AwMD/wMDA/8CAgL/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8BAQH/AQEB/wEBAf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wEBAf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wEBAf8AAAD/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wEBAf8BAQH/AQEB/wEBAf8BAQH/AQEB/wEBAf8BAQH/AAAA/wEBAf8BAQH/AAAA/wEBAf8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wMDA/8AAAD/AAAA/wAAAP8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wICAv8DAwP/BAQE/wQEBP8EBAT/BAQE/wQEBP8EBAT/BgYG/wYGBv8FBQX/BAQE/wMDA/8CAgL/AgIC/wEBAf8BAQH/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8CAgL/AgIC/wICAv8BAQH/AQEB/wMDA/8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgIC/wQEBP8EBAT/BAQE/wQEBP8EBAT/BwcH/wQEBP8AAAD/AAAA/wEBAf8GBgb/BwcH/wQEBP8EBAT/BAQE/wMDA/8DAwP/AwMD/wMDA/8DAwP/AwMD/wMDA/8DAwP/AgIC/wMDA/8DAwP/AgIC/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8DAwP/BAQE/wQEBP8DAwP/AAAA/wAAAP8AAAD/AQEB/wMDA/8CAgL/AQEB/wEBAf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AgIC/wICAv8BAQH/AQEB/wMDA/8AAAD/CgoK/0hISP9PT0//FBQU/wAAAP8DAwP/BgYG/wUFBf8EBAT/BAQE/wQEBP8EBAT/BAQE/wQEBP8EBAT/BAQE/wQEBP8EBAT/BAQE/wQEBP8DAwP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8BAQH/AQEB/wICAv8EBAT/AgIC/wAAAP8AAAD/AAAA/wAAAP8bGxv/IiIi/x8fH/8GBgb/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgIC/wICAv8AAAD/AAAA/wAAAP8AAAD/AQEB/wEBAf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAA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Af8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wQEBP8AAAD/hYWF/+jo6P/y8vL/3d3d/+vr6/9tbW3/AAAA/wQEBP8CAgL/AAAA/yUlJf+5ubn/jIyM/4+Pj/+goKD/Li4u/wAAAP8FBQX/AwMD/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AAAA/wEBAf8CAgL/AQEB/6qqqv/V1dX/7e3t/+Hh4f/X19f/5ubm/1NTU/8AAAD/AwMD/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wAAAP8TExP/tbW1/93d3f/v7+//4ODg/+jo6P8gICD/AAAA/wICAv8DAwP/AAAA/2hoaP+7u7v/hISE/6ys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AP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8BAQH/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AQEB/wAAAP9ycnL/yMjI/7W1tf/V1dX/X19f/wAAAP8GBgb/BAQE/wQEBP8EBAT/BQUF/wEBAf8AAAD/Pz8//6Wlpf+5ubn/ycnJ/7y8vP+rq6v/goKC/1ZWVv8lJSX/AAAA/wICAv8BAQH/AAAA/wAAAP8DAwP/AAAA/5WVlf/i4uL/1tbW/9bW1v+jo6P/RkZG/wAAAP8DAwP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AQEB/wYGBv9SUlL/qamp/9HR0f/Hx8f/MDAw/wAAAP8FBQX/BQUF/wQEBP8EBAT/BwcH/wYG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AP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8CAgL/AwMD/wYGBv8FBQX/AAAA/wAAAP8UFBT/XV1d/7CwsP+4uLj/kpKS/1dXV/8uLi7/FhYW/wQEBP8GBgb/AgIC/wAAAP8AAAD/ERER/21tbf/Ly8v/r6+v/0VFRf8JCQn/AgIC/wEBAf8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AgIC/wQEBP8FBQX/BQUF/wEBAf8AAAD/BgYG/z8/P/9/f3//mJiY/7i4uP+/v7//n5+f/5ubm/+Ghob/eXl5/42Njf+srKz/kJCQ/z8/P/8AAAD/AAAA/wAAAP8CAgL/AgIC/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8BAQH/AgIC/wMDA/8EBAT/BQUF/wcHB/8DAwP/AAAA/wAAAP8JCQn/ICAg/zIyMv8vLy//IiIi/ysrK/80NDT/Pz8//xMTE/8AAAD/AAAA/wICAv8DAwP/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wAAAP8AAAD/AQEB/wICAv8EBAT/BAQE/wQEBP8GBgb/BAQE/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wMDA/8CAgL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AQEB/wEBAf8CAgL/AwMD/wMDA/8EBAT/BQUF/wUFBf8DAwP/AgIC/wEBAf8BAQH/AQEB/wICAv8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AQEB/wICAv8DAwP/BAQE/wQEBP8DAwP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AAAA/wAAAP8BAQH/AgIC/wICAv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8BAQH/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: "input[value=16]",
        chinese_subtitle: "input[value=32]",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "408",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "7",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "11",
          vhs: "8",
          hddvd: "8"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "15",
          hevc: "14",
          mpeg2: "17",
          mpeg4: "1",
          vc1: "16",
          xvid: "5"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "19",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "15",
          web: "10",
          hdtv: "5",
          dvd: "2",
          dvdrip: "15",
          other: "11"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "10",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      }
    },
    FL: {
      url: "https://filelist.io",
      host: "filelist.io",
      siteType: "FL",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABAlBMVEUsg6Qsg6MsgqMsWWssRU8sR1IsJiYsKSosLS8sLC4rLS8rLjErLjArLTAsKSkrMjYpSVcjeZsig6oihKsje54oS1okb40nWGwsKissKCkrNDknV2ofm8sifqIlaYQkbIglZ4IoUWIhj7okbIknVWgglsQoTFstIiAoT18laoUrNTogl8UmWm8qNz4qNz0qNjwmXnQglMElaYUsKCgqOkIlaIIfmsogmMcglMIjfJ8mYXgsJycpQUwfnMwpSFUqPkclZ4EsJSQsKy0rKisqNj0oTl4sJCIrMDMnUWIgkb0hi7Ula4glaoYpP0grNDojdZUpRlMsKiosLC0igqgpRlL///+rTVq6AAAAAWJLR0RVkwS4MwAAAAd0SU1FB+UEDAMIEgwtfPAAAADJSURBVBjTbZHHFoIwFAUDAoGoqGAv2BV7r1iw9+7/f4uKiKDMIos5bzM3AGD4DxgAmIUgDRAWDOAEBQ1QBA5wEtIGIKlIRkMnEbK+QDY7o0nW4XRxHO/2eH1+TQaCoXBEiMbiiSSrk6l0JkshMZGDX5n3FYqlcqVaq39lo9lqd7q9TF8vpYF7KIijsbctTyCczt6X82p4sWRX6822vtsfJEXO/MfT+YKYq8xz3O1OqUXIhhj6+SoJahH9DlRTP/J/ELPpTEc2+44Hf1AYDR9uHSMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MDg6MTgrMDA6MDCjgoMzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjA4OjE4KzAwOjAw0t87jwAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        imdbOptionKey: "3",
        nameOptionKey: "0",
        params: {
          search: "{imdb}",
          searchin: "{optionKey}",
          sort: "3"
        }
      }
    },
    GPW: {
      url: "https://greatposterwall.com",
      host: "greatposterwall.com",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABVlBMVEUAAAAvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMH////T/m9bAAAAcHRSTlMAABScbxoq5/nNlouiawwn4/36fQENv7PZH3D85e83GcnmK5OtCcbdOWzyWjjfowdURS3wQ3PcxQ8bYuGdBChjj5rWqqu2ICRMCL0y29cCprcje/v30U/+znJJX/boSPQGEsM6CpX1hBGN4FCw6p41N9CYMAAAAAFiS0dEca8HXOIAAAAHdElNRQflBg8QJipZPSzlAAABIUlEQVQoz13R11bCQBAG4AyCYkGToKImWBAsCAQLKmLsLRbsohKw9zbvf+WWILv+V3u+zJmdnSgKCfga/AGgUcRAY1OwuaW1LdQuOXSoiKhperhTdOjqJhyJYE+vxNBnIJomRvvlLgODSDMUkxmGGccTMvtGqI6O/Sse14kmJ0C+MZWmxRmrrlYsOzlF58PpGaE2N2sk0wbluXmB8wsF5FmkncFesoE1Xg5yXmGcWE2xiyG/xnndZtUbm1vbO+Tg7HJW9yhDzthXD8iheOg1PzomG3dOTs/OL+j3sMely6vrctytZAOsefXGc9R0Mmrmlg0Kd/coxHzgKwAou3V1/bU/BI9PRk2fX5y/t8LrW5Rf+h5yhA2A9fH5VdIK3z9Frr/KLlYZgS4NmAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0xNVQxNjozODo0MiswMDowMN+dGPkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMTVUMTY6Mzg6NDIrMDA6MDCuwKBFAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{imdb}",
          order_by: "size",
          order_way: "desc",
          group_results: 1,
          action: "basic",
          searchsubmit: 1
        }
      },
      needDoubanInfo: true,
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2D/3D\u7248": "2d_3d_edition",
          "4K\u4FEE\u590D\u7248": "4k_restoration",
          "4K\u91CD\u5236\u7248": "4k_remaster",
          DIY: "diy",
          "DTS:X": "dts_x",
          "HDR10+": "hdr10plus",
          HDR10: "hdr10",
          Remux: "remux",
          Rifftrax: "rifftrax",
          \u534A\u9AD83D: "3d_half_ou",
          \u534A\u5BBD3D: "3d_half_sbs",
          \u6807\u51C6\u6536\u85CF: "the_criterion_collection",
          \u91CD\u5236\u7248: "remaster",
          \u5BFC\u6F14\u526A\u8F91\u7248: "director_s_cut",
          \u7535\u5F71\u5927\u5E08: "masters_of_cinema",
          \u675C\u6BD4\u5168\u666F\u58F0: "dolby_atmos",
          \u675C\u6BD4\u89C6\u754C: "dolby_vision",
          \u989D\u5916\u5185\u5BB9: "extras",
          \u4E8C\u5408\u4E00: "2_in_1",
          \u7EA2\u84DD3D: "3d_anaglyph",
          \u534E\u7EB3\u6863\u6848\u9986: "warner_archive_collection",
          \u52A0\u957F\u7248: "extended_edition",
          \u8BC4\u8BBA\u97F3\u8F68: "with_commentary",
          \u5168\u5BBD3D: "3d_full_sbs",
          \u53CC\u789F\u5957\u88C5: "2_disc_set",
          \u53CC\u97F3\u8F68: "dual_audio",
          \u672A\u5206\u7EA7\u7248: "unrated",
          \u672A\u5220\u51CF\u7248: "uncut",
          \u82F1\u8BED\u914D\u97F3: "english_dub",
          \u5F71\u9662\u7248: "theatrical_cut",
          \u4E2D\u5B57: "chinese_subtitle"
        }
      },
      targetInfo: {
        editionTags: {
          "10_bit": "10_bit",
          "2_disc_set": "2_disc_set",
          "2d_3d_edition": "2d_3d_edition",
          "2_in_1": "2_in_1",
          "3d": "3d",
          "3d_anaglyph": "3d_anaglyph",
          "3d_full_sbs": "3d_full_sbs",
          "3d_half_ou": "3d_half_ou",
          "3d_half_sbs": "3d_half_sbs",
          "4k_remaster": "4k_remaster",
          "4k_restoration": "4k_restoration",
          director_s_cut: "director_s_cut",
          dolby_atmos: "dolby_atmos",
          dolby_vision: "dolby_vision",
          dual_audio: "dual_audio",
          english_dub: "english_dub",
          extended_edition: "extended_edition",
          extras: "extras",
          hdr10: "hdr10",
          hdr10_plus: "hdr10plus",
          masters_of_cinema: "masters_of_cinema",
          scene: null,
          the_criterion_collection: "the_criterion_collection",
          theatrical_cut: "theatrical_cut",
          two_disc_set: "2_disc_set",
          remux: null,
          rifftrax: "rifftrax",
          uncut: "uncut",
          unrated: "unrated",
          warner_archive_collection: "warner_archive_collection",
          with_commentary: "with_commentary"
        }
      },
      description: {
        selector: "#release_desc"
      },
      imdb: {
        selector: "#imdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo[]"]'
      },
      category: {
        selector: "#releasetype",
        map: {
          movie: "1",
          tv: "3",
          tvPack: "3",
          concert: "5"
        }
      },
      source: {
        selector: "#source",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          web: "WEB",
          hdtv: "HDTV",
          hddvd: "HD-DVD",
          dvd: "DVD",
          other: "Other"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "H.264",
          hevc: "H.265",
          x264: "x264",
          x265: "x265",
          h265: "H.265",
          mpeg2: "Other",
          mpeg4: "H.264",
          vc1: "Other",
          xvid: "xvid"
        }
      },
      resolution: {
        selector: "#resolution",
        map: {
          NTSC: "NTSC",
          PAL: "PAL",
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p"
        }
      },
      format: {
        selector: "#container",
        map: {
          mkv: "MKV",
          mp4: "MP4",
          avi: "AVI",
          ts: "TS",
          wmv: "WMV",
          vob: "VOB IFO",
          iso: "ISO",
          mpg: "MPG",
          m2ts: "m2ts"
        }
      },
      videoType: {
        selector: "#processing",
        map: {
          encode: "Encode",
          remux: "Remux",
          DIY: "DIY",
          bluray: "Untouched",
          uhdbluray: "Untouched",
          dvd: "Untouched",
          dvdrip: "Encode"
        }
      }
    },
    HD4FANS: {
      url: "https://pt.hd4fans.org",
      host: "hd4fans.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "405"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          hddvd: "2",
          remux: "3",
          encode: "7",
          web: "7",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: ""
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "1",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "5",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          chd: "2",
          mysilu: "3",
          wiki: "4",
          other: "5",
          cmct: "6",
          r2ts: "7",
          kbits: "8"
        }
      }
    },
    HDAI: {
      url: "http://www.hd.ai",
      host: "hd.ai",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACLlBMVEUnJyciIiInJycnJycnJycnJycnJycoKCgnJycnJycnJycnJycmJiYmJiYmJiYlJSUmJiYkJCQjIyMjIyMjIyMjIyMiIiIiIiIiIiIiIiIhISEiIiIhISEhISEhISEhHx8eQFUaercdUnQhIiIhISEhISEoKCgnJycmJiYlJSUyMjJAQEAkJCQ/Pz+Hh4fCwcHh4OBSUlKtra1ubWxlb3PP298+Pj7Nzc2Zm50cTF8Wg61zwd0WhK4cTmKZnJ2NjY38+/q0y9Mpn8whpdia0+ib0+gpn820y9UzMzO4t7eYoaWGwNar2eqt2OjA4OvD4eyr2Oir2OmGwdiYo6dDQ0OBf38hTV8WlsiHyOHR5e2Yz+OXz+TO5OwWlMYiQU6Bf34jIyNDQkJ/i5AccpYWlMiGxt/J4uqTy+GXzeLP5OsXksUiQU8zMjK0vMCTrLeHvdO12Oat1OS92+e72ua11+Wx1uWFvtWWoqe3trYiJiiKmKD08vG8z9gymMgilcuPxd2Zyt8ll8wslsexydT18/IjIyIhKC07U1/KycmdoqQbUGoUe61erNBosdMUe64ZUGuPlJc9PT0hISEiIiIjIiIiKSwcUWtTWV2sq6tkZGRQYGi0xs69zdRVZGxeXl6lpaVTU1MeWHccUGyFhYW5uLjY19bY19e6ubmEhIQjISEhNkIbdKQePlAiISBBQUEdVXQbc6UhMjwhIB8gICAhISAhKzEbbJwcZ5MhKjD///8cBd9jAAAAJnRSTlMAAA9wx+bs7Q6V+fjF5ezt7e3t7OXGcPgOlfkPcMfm7O3t7e3t7NLV0KEAAAABYktHRLk6uBZgAAAAB3RJTUUH5QQKBykeq2bSOAAAAXFJREFUGNNVi2VbAkEURkexAywMRGydWQdbbMHuxq6xu7u7exe7uzt/nrvKF8+n957nHgA0eVraOrpqdLS1eJoA6OkbuP3DQF8P8Azd/4BQPQx5wOh3IER5eFAI/R5GwJh7wlJPL29vL08p5qQx4EMIsY+vn39AgL+frw9mTz4QIIhlgUHBIaGhYeERgTIMkQCYQITlisio6JjY6Lh4hRwjaMLJhMSk5JTUtPSMzKzsxAROChBW5uTm5RcUFhXnl5SWKTGbCxApr6isqq6prauvbmgsUxJWmmLc1NzS2tbe0dnV3dPbR2Fsysn+gcGh4ZHRsfGJySk54aQZmZ6ZnZtfWFxaXlldm1unCTED5oxqY3Nre2d3b//g8OiYZhjGHFgwKtXJqfTs/OLy6lpKM4QwFkBIyM3t3f0D9fhIMWzLIgSWVmzw9Pzy+vbGpSxWlsDaRkS/f3x+fdNqRDbWQMNWbCexd3B0cnZhcZXYiW01fgC8EXLoIVrAZQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0MTozMCswMDowMNmd3ZQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDE6MzArMDA6MDCowGUoAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/Torrents.upload",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      search: {
        path: "/Torrents.index",
        imdbOptionKey: "9",
        nameOptionKey: "1",
        params: {
          name: "{name}",
          search_area: "{optionKey}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: 'input[name="poster"]',
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      mediaInfo: {
        selector: 'textarea[name="nfo"]'
      },
      screenshots: {
        selector: 'textarea[name="screenshot"]'
      },
      tags: {
        chinese_audio: 'input[type="checkbox"][name="tag[cn]"]',
        chinese_subtitle: 'input[type="checkbox"][name="tag[zz]"]'
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "4",
          concert: "6",
          sport: "7",
          cartoon: "5",
          variety: "3"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "2",
          hevc: "1",
          x264: "2",
          x265: "1",
          h265: "1",
          mpeg2: "5",
          mpeg4: "2",
          vc1: "3",
          xvid: "4",
          dvd: "5"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "10",
          ac3: "11",
          dd: "11",
          "dd+": "11",
          flac: "7",
          dts: "5",
          truehd: "4",
          lpcm: "6",
          dtshdma: "2",
          atmos: "3",
          dtsx: "1"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "5",
          web: "4",
          hdtv: "6",
          dvd: "7",
          dvdrip: "10",
          other: "0",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "6"
        }
      },
      area: {
        selector: 'select[name="source_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          other: "1",
          ao: "20",
          beitai: "18",
          beyondhd: "19",
          beast: "23",
          chd: "2",
          chdbits: "3",
          cmct: "4",
          frds: "5",
          fltth: "17",
          hdai: "6",
          hdchina: "7",
          hdhome: "8",
          hdsky: "9",
          lemonhd: "28",
          leaguehd: "29",
          mteam: "10",
          nypt: "24",
          ngb: "26",
          ourtv: "11",
          ourbits: "12",
          pter: "13",
          pthome: "14",
          putao: "22",
          strife: "21",
          tjupt: "15",
          ttg: "16",
          tlf: "30",
          u2: "31",
          wiki: "25"
        }
      }
    },
    HDArea: {
      url: "https://hdarea.club",
      host: "hdarea.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBhQINJhF4AAABH1JREFUOMuNlEtsVGUYht//P/85c86c6bQz7UynMx2mLdALt2IFLZabNaAmGgRMJDFhoe41LtgYNiYsSIxRdxIJMZHISgwmLgjQCLFSC5XWQikNLQidTi+203Yu5/p/LlTUoMi7+r7vTd58m/dheAxRaeavxbMBkoDQAMYAACyYeGCzxwok+nNUYS/qIJ8jELHBmA2AGGOPF/ggKPuDjvmxFgx93SHDTT7VJct87mwdgvEsi7TNILZlGrU7cwAWxSNfO7kbAGIA64bEDkxPbHVE5bLnhZbN/K1WuHM5WNlJZL+7I5Vjg6X1hwYEANBkH1CZUtD/uU73B3Rv1XMuhRJF+ck+n3W0t1M5fxTFhaT0dLUcCFueUP1gcSbIrLtpMLmZHHBZsf6mD3Gak2cBS/eAhfE6OIX9IHmEmHhDKmqSH6OQF+1Y7Si1taVUl5jf9i7chu0/Gw6/ZFU+7UsW4vDBpVoNJ9QqnGBGCCgB4PirQLJut5TikBtsDC2knqzRqjIT+sCnLtPERhKGpeYm1EB6x0Uv1nICeTYumXsDo0NvwkWlHVuDUuypnODiG4Gx08DhsXqc6O7E8nQLk8Izez/cFFi6H0Q5yzhDo2q5KtkeuGr+KpPrbmvJddcxmm9lcBySgG82lpxE980oygMCdy5yZPu7oATXMs+BWpgUyvCZDAVERsICt8sAN1BO7ZBOpH7RBgrapbeisOc2EuyAb8QAIzWG2o7+vOOWBaLNKn76rJPKS62kmPD1GscJt9kU5JqWH1G1wgSnQJCKrbtKMMPn64EhzPc/Czv/PHwZtOJd8EKNNyoC6COmEEdkVRNmb7f5vhJdXnOwmDt4dnhp70dfMT0+otiWTQKQWsim1JY+O9N9C0AIRmwtypMr4EnFij1TLsS2DlUAg4wx4hg+dQAl2WBHm1FueGKYatLvmQqd0+9d9pT8lOEHamCnNpeFHu4RApMYfL8N5HcSMdU1MuBGoo/F24anFvMIaxzCUyOrYSRDXqSl4GW2XqkuLF8IFr20FWk+oNge+WacCmv3ZgXDucTC1TByPS9h7vp26RqslNguSTN7TA3XiFcBAIRX0dRLqU1VqGlz1Xjb98bgkTDGT65zV72+4Bupa1LRVL9uZbZq6HCa2XMvUHFir7RKaSe0QdqpXXMUTF099Rq7/84p+XuXrdyoWg7Xb+NcqHpAu6v+eCiNkY+PU+WGCTe956qr1whl9lp7YOpCA1n5uOSmaletd0rpl2eVzJ5zzIx/QK47UmUKCIVDlGqbXQC9LiBD82MRokAXyAywheFObeHGBs3njEjT3OAKUVi5X9iJnVOoaO41BM5A6D1SwRSTKoTC/kkbf/RLcCMunMXbza419zabvrxHWRyv9dVqFFMvOqhcPQIzcd6tSPc64fRojUBWYchLQIb+C18zPgEcGjx3o37l6BbP4/tcsyHpxNq/peqmPlM3rkQZfiHA4uzfyffQ9W8w5XeX8QqAxnoTXygcswAkY49m8kM89OQfBofkvnuaCMz1IMEZfML/6jelxwpRbOI1GgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNjoyMDowOCswMDowML4c7OgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDY6MjA6MDgrMDA6MDDPQVRUAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "300",
            "401",
            "415",
            "416",
            "410",
            "411",
            "414",
            "412",
            "413",
            "417"
          ],
          tv: [
            "402",
            "403"
          ],
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "7",
          x264: "7",
          hevc: "6",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "0",
          dvd: "0"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "11",
          dd: "5",
          "dd+": "4",
          flac: "1",
          dts: "3",
          truehd: "7",
          lpcm: "8",
          dtshdma: "4",
          atmos: "10",
          dtsx: "0"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "1",
            "300"
          ],
          bluray: [
            "1",
            "401"
          ],
          remux: [
            "3",
            "415"
          ],
          encode: "7",
          web: [
            "9",
            "412"
          ],
          hdtv: [
            "5",
            "413"
          ],
          dvd: [
            "2",
            "414"
          ],
          dvdrip: "6",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": [
            "1",
            "410"
          ],
          "1080i": "2",
          "720p": [
            "3",
            "411"
          ],
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          epic: "1",
          hdarea: "2",
          hdwing: "3",
          wiki: "4",
          ttg: "5",
          other: "6",
          mteam: "7",
          hdapad: "8",
          chd: "9",
          hdaccess: "10",
          hdatv: "11",
          cxcy: "12",
          cmct: "13"
        }
      }
    },
    HDAtmos: {
      url: "https://hdatmos.club",
      host: "hdatmos.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACqVBMVEUAerwqYXVnYVNybF9uaFtjXUxTXlcyYnQOb54Ae7wMcKJYaWi0rqbUz8fTz8fSzcXNycG/urKemY1bcXERb50sYnSOioHf29Lt6d/s6N/m4tnBvLFNcntrb2bFwLjt6eHu6eHt6eDr597q5t3n49qRkINrf3+1t7C5u7W6u7S+urG9urG5urTEw7vj39br59/s6eCuqZ0Qc6Uib5Ijb5EkbIxQZGN8d2qAem6JhXlDaXMibpEwaoGVmpLl4disp5sAe70OcKBscWnEv7fV0MjV0cnMx706a3sAe74IcqdjdnXTzcTq59+Mj4UBe7wBerskZoGSj4bi3dTv6+O5urIibpAAerscZod4enLW0cnu6+PPy8JFcoABebg9Y26zrKLp5dyOl5EMcqUCeLcbZodaY12uqJ/t6uHk4Nh3jY4Pb54JcqZdb27Iwrji3tVggYgKbZ4yX21obGavqaDi3dXd2dF9kJIVcZ0Wa5N/f3Xb1s7Lx70zboYvY3WDfXLFwLft6ODKycFhfYESb50AebouZ36emY6nraYWZolMbXXCvLOdoJcTZ44Cd7VIZGi6tKvr5t14jY4HcqgxbIO6tKm6tqprdG/SzcTs6N7e2dBJc38AebsUa5WOk4vn4tns6ODQy8I+dYoAeLgeZoaMi4Lf2tK+vLMncZISa5R3fnnb1czMx743c40AebkCebg2ZXWrpJno5NuSl44YY4IcZYRHXmCcmI6vsKcabpUHc6pYa2vDvbTk4NecnJNnbWd9eW+po5ra1c1nhIoGc6sRbpt3eG3Z1Mza1cze2dHh3dSAk5UUcJ0qa4ajn5Xn5Nzu6uLt6uLv6+Tp5d7Y1MyxtK1hgIgUcZ8lbYyTkYSxrqOxraOwraOtqp+XlIV9iIFReYUfaowGdKz///88yl8CAAAAAWJLR0TixgGeHAAAAAd0SU1FB+UECgcrNELreWwAAAGKSURBVBjTY2BgZGJGABZWNnYOTgYubh5eOODjFxAUEhZhEBUTl5BEBlLSMgyycvIKCvJgoKCgqKSspKyiyqCmrqGhoamlraWtoaGjq6evrGxgyGBkbGJsamZuYWFpZW1sY2unpCxvz8DJwODg6OTs4urmzuDh6eWtpOTjy+Dn5+8QEBikGBwS6hAWHhGpFBUdAxTkjI2LT1CST0xKTklNk0rPyMwCCjpk5+RKSublFxQWFZcEl5aVMzD4cTpUVFYppVfX1NbVSzU0NjUDrfHjbGltk1JSaO/o7FJWUuru8eD0Bwr29vUnKE2YOGnyFEklxanWDJx+DH4OjtOmz5CcOWv2nLnzlOYvWLgIKMjpsHjJUqX0Zcs9VqxcpSS/es1akOC69Rs2Kslv2rxl67Y8peDtOxyAgg47d+1WUtqzd9/+AweV5EsOHXbwAwoeOXoMGDLHp59Qlg8+eeo0JydQMOzM2XPnL1w4H3zx0uUrV68B7QYKMly/cfPW7ds379y9d//BQwZOf6AgACIJgNAMLRaxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQzOjUyKzAwOjAwjJgVBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0Mzo1MiswMDowMP3FrbsAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          h265: "10",
          x264: "1",
          x265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "20",
          ac3: "22",
          dd: "23",
          "dd+": "23",
          flac: "17",
          dts: "14",
          truehd: "13",
          lpcm: "15",
          dtshdma: "10",
          atmos: "11",
          dtsx: "12"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hdtv: "5",
          dvd: "6",
          hddvd: "2",
          dvdrip: "13",
          other: "13"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "15",
          "2160p": "10",
          "1080p": "11",
          "1080i": "12",
          "720p": "13",
          "576p": "14",
          "480p": "14"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "3",
          US: "4",
          EU: "8",
          HK: "5",
          TW: "3",
          JP: "5",
          KR: "6",
          OT: "9"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "6",
          bluray: "6",
          hdtv: "3",
          dvd: "8",
          web: "2",
          vhs: "12",
          hddvd: "7"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          other: "22"
        }
      }
    },
    HDBits: {
      url: "https://hdbits.org",
      host: "hdbits.org",
      siteType: "HDB",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACUlBMVEWwxdaswdKswtKtwtKtwdKtwtOovc6juMmit8miuMmes8SftMWtv86qvMues8Omucmwwc+htcaywtC3xtO3x9Oxw9CYrb6fs8Pd5OnQ2uKXrL29y9Xn7PCpusiousjq7vHs8PPi6Ozo7PDp7vHDz9qdscGSp7iarr7g5uvS2+KTp7mRpre8ydTs8PKltsXF0NmesMCktsTG0dry9fbCzteTqLmMobKVqLje5OnP2N+LoLGJnrC3xM/r7vGgscC4xc+Jn7GLoLKOo7PN1t2ZrLuFmqyPorLd4ufY3+SfsL6er73Fz9ebrLrq7fC1wsyEmauGm6yFmquot8P3+PmltMF/lKWJnKzb4OX19/jk6ezw8vTs7/GVp7WWp7Xp7O+xvsh+k6SAlaZ+k6Wpt8N4jZ+DlqbZ3+TO1dyHmqmFmKi1wcro6+6QorDn6+6tusR3jZ55jp94jZ6Yqbb2+PmdrLlyh5h9kaDX3eLFztVwhpeptcDm6u2LnauptsBxhpdziJlyh5m2wcqGmKdxh5hsgZJ3i5rW2+DDy9NtgZNrgJGlsr3l6eyGl6WntL5ug5Nyh5eYp7O6xMxxhZZme4xyhZXU2t+/yM9ne4xkeougrrjk6OuCk6GBkqDk5+vP1tvV29/d4uW5w8p0h5ZnfIxgdYZleYqLm6eCkqBhdoZhdod2iJeRn6trf49rfo6Uoq2dqrWeqrWWo69/kJ5hdYdbcIFZbn9Zb4Bab4BYbn9ab4FYbX9YbX5XbX9Wa3xRZndNYnJMYnJNYXJNYXNNYnNJXm////9b9tfLAAAAAWJLR0TFYwsrdwAAAAd0SU1FB+UECgcqMrKT7RgAAAFGSURBVBjTY2DABhjBgImRkRlEszAyszIyMbBhAQzsSICDkxNMM3Bx8/DycXHxCwgKCgmLiPJzAQGDmLiEpJiYlLSMrJy8gqKSsoqqmBiDmrqGppaato6unp6CvoGhkbGJqRqDmbmFpZWVtY2tnZ2tvYOjk7OSixWDq5u7h6enl7e8j4+vn39AYFBwSCBDaFh4RGRkZFR0TGxcfEJiUmxwcihDSmpaekZGZlZ2Tk5uXn5BYVFxSSFDaVl5RWlpZVV1TU11bV19Q6NvUzNDS2tbe0dHZ1d3T093b1//hOqJk1oYJk+ZOm369BkzZ82ekz133vwFCxdNXsywZOmy5StWLlm1es3ades3bNy0dMmKzQxbtmzdtmXLlu07dm7ZtXvPDhB7C8NeLIBhHxbAsP/AgYP79x86fPjggcOHDwHpw/sPMxzBAgDlBZmERX8RVgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0Mjo1MCswMDowMPTFbxAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDI6NTArMDA6MDCFmNesAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#details >tbody >tr:contains(Last seeded)",
      search: {
        path: "/browse.php",
        params: {
          sort: "size",
          d: "DESC",
          search: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: "#imdb"
      },
      mediaInfo: {
        selector: 'textarea[name="techinfo"]'
      },
      category: {
        selector: "#type_category",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "3",
          concert: "4",
          sport: "5",
          cartoon: "1"
        }
      },
      videoCodec: {
        selector: "#type_codec",
        map: {
          h264: "1",
          h265: "5",
          hevc: "5",
          x264: "1",
          x265: "5",
          mpeg2: "2",
          vc1: "3",
          xvid: "4",
          bluray: "1",
          uhdbluray: "5",
          vp9: "6"
        }
      },
      videoType: {
        selector: "#type_medium",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "5",
          encode: "3",
          web: "6",
          hdtv: "4"
        }
      }
    },
    HDChina: {
      url: "https://hdchina.org",
      host: "hdchina.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACPVBMVEUQYakSYqkRYqkPYKgTY6oRYamIsNRpm8kHW6YjbrCgwN0+f7ldlMS90+e+1Oe70uY9frkGWqUKXaceaq6oxd/G2epjl8YFWqWPtdYEWaQsc7Pf6vNSjcGDrdLl7vWRtteNs9ZHhbwudbSGr9OPtdeUuNgAVaIocbGHsNQLXaff6fMmb7BrncmQtte80+eevtwibK9FhLzj7PVSjMDA1ei3z+X3+vze6fPk7fX4+vxOir+0zeRRjMBtn8ro8PYLXqcMXqeLstUAU6Elb7AKXaZQi8BtnsqErtPW5PBbk8RaksOjwt1flcVTjcGTt9iOtNapxuCAq9EpcbLH2utKh75yoszg6vTd6PIDWKRNib7g6/Tm7vZ5ps8kbrAOYKgXZqscaa0sdLMNX6gYZqsrc7ItdLMdaq4LXaYOXqcMXaYIWqUNX6cOX6cKXKYLXKUqgMA1jsoNXqY0jMgqgL8VZ646k84dcbUofr4zi8gWaK4fc7Yid7lEoNdOq98rgcAUZq1auehFodYLW6Qcb7NnyfMsgsFCndRYt+YdcbQthMILW6URYqpWtOZBnNRZuOkbbrNWtedEn9ZlxvMrgcFBm9RWteYccLQ2j8sSZKtXtudDn9YQYqkbbrJYt+hmx/Rt0Po6lM5ZuOdBnNMgdLdNqd4ZbLFCndUIV6JAm9JYuOdAmtNCnNRDntYyicZFoNc+l9EXaa9gwe1DndVEn9cwiMUccLNoyvRSr+I0jMkWaa4KWqQXaq9Mqd1Zuen///9eDam/AAAAAWJLR0S+pNyDwwAAAAd0SU1FB+UECgYZKlRWekkAAAGBSURBVBjTY2BgZGJmYGFlYmFhYWUGsliAXAZGNnYOTi5uHl4+fgFBIWERUTFxoBSvhKSUtIysnLyEgqKSsoSKKjsTUFBBTV1aRoNPU5NPQ0ZLW01Hl5GBRU/fwNDIWMOEkdFEQ0ZaSpOJkYGBxdTM3MLSCiHIDLKO39rG1s4GLmjvIASyyNHJ2RxoposL0ExzZzVXNyaY7e4enl7ePr52tr5+/kCLAgLFg4JDQu3Cwq0iIqWjomMcGBgYYoXjWNTjExKlpOKTklOkUtPimBmYHdIzmO0zM+2FsrJzMjWzcpOACpnz8gsKGYqKC0tKy8orKkurMoCCDNU1tXX1DY1NzS2tbe0dLZ1dQLHunt7yvv4JE5v6J02eMnXapOkzgI7vnjlr9pwZc2GC8+YvyAGqXLho8ZKlM5ctX9pSvGLltEmrVq9hYmBYO3Hd+g3tGzdN7F2zecvWbduX7QDZvmNNBsOquXNrdy7bsWv3nr1r84BBz8wAVM7U3d0NpIFWdAMJAMLpbshyyXdQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjI1OjQyKzAwOjAweA92GAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjoyNTo0MiswMDowMAlSzqQAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: ".table_details>tbody>tr:nth-child(1)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrent_list>tbody>tr",
          url: '.tbname td a[href*="details.php?id="]',
          name: '.tbname td a[href*="details.php?id="]',
          size: ".t_size"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: "#cover",
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "20",
            "17",
            "16",
            "9",
            "410",
            "27"
          ],
          tv: [
            "13",
            "25",
            "26",
            "24",
            "27"
          ],
          tvPack: [
            "20",
            "21",
            "22",
            "23",
            "27"
          ],
          documentary: [
            "20",
            "5",
            "27"
          ],
          concert: "402",
          sport: "15",
          cartoon: "14",
          variety: "401",
          music: "408",
          ebook: "404",
          other: "409"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "6",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: [
            "1",
            "27"
          ],
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "8",
          dd: "8",
          "dd+": "8",
          dts: "3",
          truehd: "13",
          lpcm: "11",
          dtshdma: "12",
          atmos: "15",
          dtsx: "14",
          flac: "1"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "11",
            "20",
            "410"
          ],
          bluray: [
            "11",
            "20"
          ],
          remux: "6",
          encode: "5",
          web: "21",
          hdtv: "13",
          dvd: "14",
          dvdrip: "4",
          other: "15"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "17",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23",
            "410"
          ],
          "1080p": [
            "11",
            "17",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "1080i": [
            "12",
            "16",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "720p": [
            "13",
            "9",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "576p": "15",
          "480p": "15"
        }
      },
      area: {
        map: {
          CN: [
            "25",
            "22"
          ],
          US: [
            "13",
            "21"
          ],
          EU: [
            "13",
            "21"
          ],
          HK: [
            "25",
            "22"
          ],
          TW: [
            "25",
            "22"
          ],
          JP: [
            "24",
            "23"
          ],
          KR: [
            "26",
            "23"
          ]
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdchina: "15",
          hdctv: "16",
          ihd: "12",
          hdwing: "10",
          hdwtv: "11",
          kishd: "17",
          openmv: "7",
          hdc: "22",
          diy: "23",
          khq: "6",
          exren: "30",
          joma: "26",
          anonymous: "25",
          crss: "24",
          ebp: "18",
          don: "19",
          esir: "20",
          trollhd: "29",
          wiki: "9",
          beast: "4",
          cmct: "2",
          ngb: "8",
          lu9998: "21",
          taichi: "28",
          u2: "27",
          enichi: "31",
          arey: "32",
          other: "5"
        }
      }
    },
    HDDolby: {
      url: "https://www.hddolby.com",
      host: "hddolby.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBAoGHTIjVicbAAABTUlEQVQY01WOvy9DURzFz/feW0/1pY2gogaLX4lBJBZCqiKxITGYTGIx+wOsRpbGarEwV0SExCTR+LU0GoIYMLw8vFfv1b1fgz6p73DyzUnOOR/SBEL9MVhR+Kz/mdTRpOhhwSUYFgAMJLhhK6sQ3qUWrcfDewDpqR65U64AfG2POlw9HgS69gI287LAAgCYZXY1TitzMcMAIKLJsf6OKcG/IKo2iea0bo7gRERS8fyv6P+Ll0pPV/UmCRIv+bcgXyaiWid9XNgP2wXgdGm5jxwCwDdtDclUQiqllIwnU1Zin4mdg5BBYOBX5USGjPa0HXv/Tn3H6FM3sRUoqehpo7Nx4ER0u7nkpp3xx89m2wVcf+ZyNzN9dO16TuOrWA9bWACsWTATf/jc6g5/5hTLtaB42zN5Xhqxi6bi9Q59jcaJDLORVNUWNJGRxCD8AK0whyYuCRA4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjI5OjUwKzAwOjAwOQaHIQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjoyOTo1MCswMDowMEhbP50AAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      tags: {
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        chinese_subtitle: "#tag_zz",
        cantonese_audio: "#tag_yy",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "3",
          hevc: "2",
          x265: "4",
          h265: "2",
          mpeg2: "6",
          mpeg4: "0",
          vc1: "5",
          xvid: "0",
          dvd: "0"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "10",
          web: "6",
          hdtv: "5",
          dvd: "8",
          dvdrip: "8",
          other: "0"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "5",
          dd: "5",
          "dd+": "14",
          flac: "7",
          dts: "4",
          truehd: "2",
          lpcm: "3",
          dtshdma: "1",
          atmos: "2",
          dtsx: "1"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          dream: "1",
          hdo: "9",
          dbtv: "10",
          nazorip: "12",
          mteam: "2",
          frds: "7",
          wiki: "4",
          beast: "11",
          chd: "5",
          cmct: "6",
          pthome: "3",
          other: "8"
        }
      }
    },
    HDF: {
      url: "https://hdf.world",
      host: "hdf.world",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxUG6ZvEkQAABCJJREFUOMt9lc1rXFUUwH/3vq958zIz+ZhJZkzS1Jo0ta0iSCm40YK2SxH3grhUBBf+G/0LBKkFty5cuKq40SIKRdtS0pCpmXxNMpP5yrzv9+510WmLbfG3Oodz4d574PyO4CkCpAUqAyEkQtiobAlYBxqTQwfABrADpIDiOQQv4gEfYdhX0PkKKveAwqQWAT7wD/AL8MMkf4r5JKi89yXpwf3XVJ5+koyOrmohLwrUlA766HEHYRfRaQRagxBjVHYBw1oTUn6HkFs6CZ+9cPrdz9CwKgWfStRXIg0KlhRCCEHQaTHcuoO9sEY2OkLnOcLx0EJr6ZYjhLyuc/2tEGxlu39hVN++hjq4W3SXzn/uzs1/PbNyxp5vzIvlshS1aQ+tNf1Oh9L6Owi7iFGqYTfWsOpnsBvnDLS+LFQ6Nk1+t+ZOZaZVmpVWpfZxxU6uuU7kCHwdOnN46Ygci8BLMUqzlOqLeCurqCTAHLWRhxukvUzE7mwhma1dy5JkE62+N0yn4EydOvuFlw4/KKQjM3crwsoj0Tk+YfdRk9FwgLtynvqMw1x0wNR4D8c/QgZ9oaOx0EKg3XKN0tw4PWz+ZI5am0vilYvLBddxpqSJCELsYoFMl9Gqx4w3xdyrb1AOW0iRo1WApVOM6SWcapHU8vCdGSfQ1vK401oyVRKe7e82vfn1tyjNn0aGPkWvBoakXvQoFzTeTIXIWMC3PbR0sd0Yr7LMfK1KZhRp9SJ29vc8lURrJipfoPvIKb9+jnpjic4opVoymC07GLmFK8ZoUzOqryKHA3KjgmHaTNcWeXNRME5MjodNou6+Q5YsmGgFg0NkPMY0BJoMSyi0dFHCIVMZ5ODhU5l2oFLDVy6hPUs3GLB7sM/2xh8Mtm6jtcIE3UYncRDD/liyedAlHwOFnDyLIR6CkLimIjag3byPPwyoXXifuFple6fNwVGLLDyO0LptTAblap7rM71+n85RC0Pm6KBDt/WA7c27DDotKgVFH5vtjb85uvcbYTCiK1zCxCdOA1Jhb+iToxsmsAvsHO/ci9nfdMzqMsPKJXJius0HdFqPcLwp5qtFholFHEVkUZ/uxq8UCmUapxYpV+tRZJRaIhnvmUAC/AycR2WXVRLqSJuMw1T4QQIqIklMHh6OiQa3SdrNxzOrU9yTPW2c2MKW1h0r9m/J+mpqABrYBBoIeVkUyobROCfC3Q2RHG491plKSXr75IM2pAGg0UrpeHSsR71+eNLv3bQqtW+U30+f9DADdrCKoTaLl3KlrKzTFISDZ17KU1D55P7H6DyNVJJcz3NuJO2tTrp/D+NpdXa9P/Gcr/yejd+bRucOL+cE+BO4iUpvkIyapP7/CvZD4ApwepK/TLC3gB+fF6z4b/j0OxKwgEVg7bkV8BDYm7TphRXwL0hsE/fwC5NaAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjIxOjA2KzAwOjAwm25q+wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzoyMTowNiswMDowMOoz0kcAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          order_way: "desc",
          order_by: "time",
          searchstr: "{name}",
          group_results: "1",
          action: "basic"
        }
      }
    },
    HDFans: {
      url: "https://hdfans.org",
      host: "hdfans.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~font table:first>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "403",
          concert: "441",
          sport: "418",
          cartoon: "417",
          variety: "416",
          app: "419",
          ebook: "423",
          audioBook: "405"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "3",
          x264: "2",
          x265: "4",
          h265: "3",
          mpeg2: "10",
          mpeg4: "11",
          vc1: "5",
          xvid: "12"
        }
      },
      source: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          hdtv: "6",
          dvd: "7",
          web: "5",
          vhs: "10",
          hddvd: "17",
          cd: "9",
          sacd: "16"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "11",
          ac3: "10",
          dd: "21",
          "dd+": "21",
          flac: "12",
          dts: "2",
          truehd: "6",
          lpcm: "7",
          dtshdma: "4",
          atmos: "1",
          dtsx: "3",
          ape: "13",
          wav: "14",
          mp3: "17",
          m4a: "5",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "3",
          remux: "10",
          encode: "9",
          web: "7",
          hdtv: "6",
          dvd: "17",
          dvdrip: "17",
          other: "10"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "1",
          "2160p": [
            "2",
            "10",
            "9"
          ],
          "1080p": [
            "3",
            "5",
            "8"
          ],
          "1080i": [
            "4",
            "5",
            "8"
          ],
          "720p": [
            "5",
            "11"
          ],
          "576p": "6",
          "480p": "6"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "8",
          HK: "4",
          TW: "5",
          JP: "6",
          KR: "7",
          OT: "9"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdfans: "9",
          hdf: "10",
          chd: "1",
          hdc: "2",
          ttg: "19",
          wiki: "3",
          beast: "4",
          cmct: "5",
          frds: "6",
          hdsky: "7",
          ourbits: "17",
          hdhome: "18",
          pthome: "16",
          tlf: "8",
          pter: "20",
          pbk: "21"
        }
      }
    },
    HDHome: {
      url: "https://hdhome.org",
      host: "hdhome.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tag_zz",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "411",
            "412",
            "413",
            "414",
            "415",
            "450",
            "499",
            "416"
          ],
          tv: [
            "425",
            "426",
            "471",
            "427",
            "428",
            "429",
            "430",
            "452",
            "431"
          ],
          tvPack: [
            "432",
            "433",
            "434",
            "435",
            "436",
            "437",
            "438",
            "502"
          ],
          documentary: [
            "417",
            "418",
            "419",
            "420",
            "421",
            "451",
            "500",
            "422"
          ],
          concert: "441",
          sport: [
            "442",
            "443"
          ],
          cartoon: [
            "444",
            "445",
            "446",
            "447",
            "448",
            "454",
            "449",
            "501"
          ],
          variety: ""
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "12",
          x264: "1",
          x265: "2",
          h265: "2",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "3",
          xvid: "5",
          dvd: "5"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "9",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "7",
          vhs: "8",
          hddvd: "8"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "15",
          dd: "15",
          "dd+": "15",
          dts: "3",
          truehd: "13",
          lpcm: "14",
          dtshdma: "11",
          atmos: "12",
          dtsx: "17"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "10",
            "499",
            "500",
            "502",
            "501"
          ],
          bluray: [
            "1",
            "450",
            "451",
            "452",
            "453",
            "454"
          ],
          remux: [
            "3",
            "415",
            "421",
            "430",
            "437",
            "448"
          ],
          encode: [
            "7",
            "411",
            "412",
            "413",
            "414",
            "416",
            "417",
            "418",
            "419",
            "420",
            "422",
            "425",
            "426",
            "471",
            "427",
            "428",
            "429",
            "431",
            "432",
            "433",
            "434",
            "435",
            "436",
            "438",
            "444",
            "445",
            "446",
            "447",
            "449"
          ],
          web: [
            "11",
            "411",
            "412",
            "413",
            "414",
            "416",
            "417",
            "418",
            "419",
            "420",
            "422",
            "425",
            "426",
            "471",
            "427",
            "429",
            "431",
            "432",
            "433",
            "434",
            "436",
            "438",
            "444",
            "445",
            "446",
            "447",
            "449"
          ],
          hdtv: [
            "5",
            "412",
            "413",
            "416",
            "418",
            "419",
            "422",
            "424",
            "426",
            "471",
            "427",
            "428",
            "431",
            "433",
            "434",
            "435",
            "438",
            "442",
            "443",
            "445",
            "446",
            "449"
          ],
          dvd: [
            "",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          dvdrip: [
            "7",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "1",
            "499",
            "416",
            "500",
            "422",
            "431",
            "438",
            "502",
            "449",
            "501"
          ],
          "1080p": [
            "2",
            "414",
            "420",
            "429",
            "436",
            "447"
          ],
          "1080i": [
            "3",
            "424",
            "428",
            "435",
            "443"
          ],
          "720p": [
            "4",
            "413",
            "419",
            "423",
            "427",
            "434",
            "442",
            "446"
          ],
          "576p": [
            "5",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          "480p": [
            "5",
            "411",
            "417",
            "425",
            "432",
            "444"
          ]
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          "3201": "20",
          "969154968": "22",
          hdhome: "1",
          hdh: "2",
          hdhtv: "3",
          hdhpad: "4",
          hdhweb: "12",
          shma: "17",
          tvman: "21",
          arin: "19",
          ttg: "6",
          mteam: "7",
          other: "11"
        }
      }
    },
    HDMaYi: {
      url: "http://hdmayi.com",
      host: "hdmayi.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "2",
          x264: "6",
          hevc: "3",
          x265: "5",
          h265: "1",
          mpeg2: "7",
          mpeg4: "4",
          vc1: "7",
          xvid: "7",
          dvd: "7"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "4",
          web: "5",
          hdtv: "6",
          dvd: "7",
          dvdrip: "4",
          other: "0",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hds: "1",
          chd: "2",
          mt: "3",
          wiki: "4",
          cmct: "5",
          cnxp: "6",
          hdh: "7",
          fgt: "8",
          mz: "9",
          other: "10"
        }
      }
    },
    HDPOST: {
      url: "https://pt.hdpost.top",
      host: "hdpost.top",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5QQKBy0Lotfz1wAABIZJREFUOMuNlG1olXUYxn/3//+cs3Oec852ztnRc1LnGG5Zrm2uQvAF0pAUgla+VRZIHyJm1IciiCj8FJWJxqhPUX2QBFHJXqBC0KnlG7nM0XRo6hw62XA76s52Xp7nuftgWkZFv0/3/eG6uLjhvoS/8fI7fQBWlbs10CWB8iCQAwKBQTEcNSLdIgyool1vzLlDL7eGl947he8rxkpj4GunNTxRHXPqamtCTtx1UFWuF3yu5sul8Un/N4VtxsgnqnoFhA9fv/dPwxffP42tCuEVy8tQ3s+lwy3zW2ponhUnVR0i5AgolCsBI/kyJ/rHOdZ3LRi74R0UI6+g2oMIH712D9K5pR/xFRWWC3w8tzE+47FFU8imw/wbqsqFoSJfHBjhzKXJk2JknaAnFMEERvBDptE3srH17sSMp5Zm/9MMQERomBbl2WU5GmZEW33h3cAx6cAKxquyxhNZn51S1dKxIEPCdW4Ly+UylUrl9u77PqVSCVUFYGoqTMfCDPFEaKkn8jQCBrhXQubxBc015P6S7PTp03R1dbFz5048zwOgu7ubTZs2cfjwYYIgAKBpWpS2xrj1raz1wjbjeEYWJ6OmrilrKJeKBHoz2cDAAIsWLSKXy6GqqCqzZ88mk8kwNDTE8PAwyWQSa4T2WXEOnS80Fz1tdzTsPFApjjib3t7MlUsXicfjrF27lunTp3Po0CHK5TLr1q3DdV2OHDnCmTNnWLx4MXv37mX37t3U1qa5Z+583NSSRKGgbaZi9K76+iydLzzPxMQEHR0dNDc347oura2tbNmyhf3793P27Fk2bNhAMpmksbGRnp4eYrEYq1etZtf2z5mYvGY0bHOOZ8W30QgNDQ0kEgnq6+uJRqNs376d3t5eLl68SH9/P8lkkgsXLrBjxw7y+TylUom+vj527dpFW3s7oVQN+QKBE4TM4FgloOQrcPNWiUSC0dFRtm7diuu6ZLNZXNdl6tSp7Nu3j2QySVNTE3V1dXR2duJm69l8fNL3HW/QwZGjQ8XgueEiVfe3t1NTU0MkEmHlypWMjY1RXV3NvHnzSKVSrF+/nt7eXtasWUOhUGDmzJnc19LCkctFRr2JPCFzQlZ8PdSg8M2KxticJ2dFsNZijKFUKlEoFFBVqqursdaSz+cBqKqqIhKJoBqg4tD1yzUOXirucYRVpug6530r2/ZdKem5AhhjbovS6TS1tbWEQiGMMaTTadLpNLFYDGstjhPi2EiJn0YrRRzzme+Y6ybkK+KYT4Yruv/TswUuT/j8X07lK2w9N8ENZYdY+VKNYHxrCBy5gpVXf73undx8apzefAX/j/f6J8qB8sNIiQ/6xxksBnuMlbd8RyYqEXuzvh7tvkoAGLTNh43JsHl4QSbszK8NM9M1RK2gwLinnC/4HBgpc3y0XCxUdKcV3gQGAoFvH8r8WbCPHMvjTPogpH14WuGZqJXmVNjEY44YVbjhqZ+vBPmSrz0Cn1n4CigEyQjftcbubOxbLP9xFLGKepIJoD2ANpScQmCEQQM/C5wU9Hoghu8Xpu7Q/w5HIu8yT4GwdgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NToxMSswMDowMDQkcScAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDU6MTErMDA6MDBFecmbAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: '#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr:last',
      search: {
        path: "/torrents",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anonymous"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "12",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    HDRoute: {
      url: "http://hdroute.org",
      host: "hdroute.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBy01Y7bufAAAA3xJREFUOMttlc1vlFUUxn/nzjCoTEsnQClBIehIaNTG+hU0rkwXsNBo4n9QF40kuGFh3GqIC1aYEBKtf4NxA4su1ESNCSHYBBrxI7akQK3tQJwO7cw593Hxvh1a40nu5r3v+b3PPc9z8xpb6oPTpwEMaAIngQnDRkEHAQSLwJzQDOISxm+Azp//rM8wgFPvnwITyBpmvA28Z9gYqC7+t9qSZoEvJL6iohZuXLh4Afvkw49ZWF0gWdpvZmeASWUaGYGs0LWlUgLDyi21QNOIc5Hz0qE9h6jOL88DNMLyGdBUSlYfGa4xOFD5L4v19czyao/2mhdHMxrAlCQQZ+eX51vVzsY6O6s73sGYBOqVZLzx+gAvjg0ibSeudYKFxQ2+/eEec7+uUW7XgUmhuY1e58uUzI56xKR7NNwdj0ASZuWQzfqrvqvKs8d28e6b+zj8eI1ez3F33L0RHpMVakdTRJyI8DEPxz0I974yMyNn0XngbGwEADnD8N4aLzxXxyz3e9x9zCNOVMN9AijcFFQq6SEQaK85X1++A8BbJw6we2AHACPDNVIqgMVAqSNNVD18lBImoBoJKfdD1e1mbi894LFHq2Rps5leL+M93wrEYLTq7gc3hy6Bb1EIkCVee6nBM6NDDA3WkEASN27ep73WLd/tx+tgNTw2BYLAq9rursRAvdI/KsDV2VW++3GJbq+HmRXNpcqqeyyCmpvQqle2AQXkrL6SnMWNX+5xZ6lDsodRLXmLycPnPAKP0q3whzMskXf/6tDtFc8qFeNoc5DaDhUOR7HKyM2lHDETEe3wElrmsH/Zzbg6u8L8rXY/m8eagzz9ZJ2eO+FB2duOiJkUEZfDfTbC+19j2w0Ryysdvvn+Nu4ZCYZ27+SV8b2kJDyKU+XIsxFxOZl0M3JMe0RrU2GWSjdLozz46cpdbi0WKiV4eXyY/ft2FgojWpFjOiVu2qvHjwNqCPtIYipVqB95YoDG0COA6HaD3//8h84Dp3lkkN1ldHIWf8zf5979XtuMi5idBVrWPPAUew7vRZH3C86AJiPU0Bb7UjIMiKxyGsIwUrKWGdMY58zS0vrKCpXVdosDIyNkaQ10RWLB0D6Mhhk1K7MoCQPMwIy2GVdAnwo+t6y/s8TP169vxqeo8efHMcyEmkInzZiQGAU2b9MiMAfMAJeg+AVcu3atz/gXdAVC3vg+5BoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDU6NTIrMDA6MDCBhmVAAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ1OjUyKzAwOjAw8Nvd/AAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          s: "{name}",
          dp: "0",
          add: "0",
          action: "s",
          or: "4",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title_eng"
      },
      subtitle: {
        selector: 'input[name="title_sub"]'
      },
      description: {
        selector: 'textarea[name="description"]'
      },
      poster: 'input[name="poster_big"]',
      imdb: {
        selector: "#upload-imdb_url"
      },
      anonymous: {
        selector: 'input[name="is_anonymous"]'
      },
      tags: {
        chinese_audio: 'input[name="is_mandrain"]',
        cantonese_audio: 'input[name="is_cantonese"]',
        diy: 'input[name="is_diyed"]',
        chinese_subtitle: 'input[name="is_chs_sub_incl"]'
      },
      category: {
        selector: "#type_category",
        map: {
          movie: "1",
          tv: "3",
          tvPack: "3",
          documentary: "2",
          concert: "5",
          sport: "6",
          cartoon: "4",
          variety: "9"
        }
      },
      videoCodec: {
        selector: "#type_codec",
        map: {
          h264: "1",
          hevc: "7",
          x264: "1",
          x265: "7",
          h265: "7",
          mpeg2: "3",
          mpeg4: "1",
          vc1: "2",
          xvid: "4",
          dvd: "3"
        }
      },
      audioCodec: {
        selector: "#type_audio",
        map: {
          aac: "9",
          ac3: "5",
          dd: "5",
          "dd+": "5",
          flac: "7",
          dts: "4",
          truehd: "3",
          lpcm: "1",
          dtshdma: "2",
          atmos: "2",
          dtsx: "4"
        }
      },
      videoType: {
        selector: "#type_medium",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "4",
          web: "6",
          hddvd: "6",
          hdtv: "3",
          dvd: "6",
          dvdrip: "6",
          other: "6"
        }
      },
      resolution: {
        selector: "#type_resolution",
        map: {
          "2160p": "7",
          "1080p": "1",
          "1080i": "2",
          "720p": "4",
          "576p": "6",
          "480p": "6"
        }
      }
    },
    HDSpace: {
      url: "https://hd-space.org",
      host: "hd-space.org",
      siteType: "HDSpace",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACK1BMVEUAAABMUFBITExMTFBOUFJQUlRSUlZQUFRMTlBUVFhaWlxKTE5ERkhISEw6PD48PkA8PEA+PkJAQkRCQkZEREhUVlhcXGBGRkg4OjxSVFZYWlxWVlpcYGBYWFxAQERiZGZwcHRoaGxEREZsbnBqam5gYGRwdHRsbHAgICIYGBgsLCweHh48PDxkZmh4eHyEhIgkJCREREQ0NDYqKiooKCgyMjRcXmBkZGimpqpUVFYuLi5gYmRqamoyMjJQUFBwcHA0NDReXmBISEg4ODhucHBsbGxwcnBwdHBeYGJmaGpGREZAQEB4fHyanJyIjIxgZGRISkxoamxYWFp+foKMjI5kZGS+wL6mqqiMkI52eHhMTEyEiIiYnJxUVFR4eHjO0tCoqqqQkpJ0dHScnKBISkpITE5ucHJ0dHhgYGJOTEx4enyQkpSYmJiQkJDc4ODY2NjAxMSgpKR8fICAhIRKSkxGSEp0eHgAAACIiIzk5OS4uLhydHQ4ODwmJiY8PD4ICAiChIaAgIQMDAwwMDC0tLi4uLx2dnb0+PTs8PDg4ODAxMAUFBSsrLDExMiQlJTk6Ojo7OzY3NiwtLQgICCcoKCoqKxgYGDw9PDc4NzMzMxQUFIcHBw4NjaMjJDAwMCwsLCanJ5AQkI0ODh4eHqQkJSgoKDM0NCkpKiUlJiwsLTY2NzIyMjAwMSUmJjU2NhscHBobGyIjIrQ0NB8gIDIyMz4+Py8vLy8vMD///8yzIHDAAAAAXRSTlMAQObYZgAAAAFiS0dEuE2/JvYAAAAHdElNRQflBhsHHAEWOn7hAAADz0lEQVRIx+3U63vTVBwH8JGeJD1J7+s5HU3SJKyX3bJWuXQuULRTaew2DGMD2ym6ame7S12HnIHILoBON0Bx3p3zAjjFu0z/PYN75M35B3jB91WeJ+dzvvklT05Ly6M8VNnDMC7AAsABlndDAbhFHjAer+jz+wPBUGuYArzIu92i6EIsDznEA57HrDcS8Xpa/W2Q8YcosJcHbpcIoyxEEsfKCkQuxu31eFqDgYAnFqQBhDwAIqtwURVCSdOjrOhlmHA45HMS8O+jG1iWBTyHOFZShKjcHpcQEL2RcDjmDbbFfHQDCzjIKhLLQYjlhKwlEynkFplIuJWJ+QK+GN3AKYiTEAc7OrswjupJjBHkGMbtDOBr87XSDZKAkMK6UHd3jwKB0Qu9eyASXZCJhfyxIA0k6Dw7EtIok3lMER7PdKns/sxuDhwMxYIUOIQQxjDb90R/PzAPH+nPHc31P8iTQQ8FnsIYJ2QzmR8YSDz9zMDAs8ecqwcJ8RRIFBKyahnqc8V8avBwsTg0fOy4gDjAs88Xi8V9LgoYhUJWtVN6Pn9i5ORoPjd26vQLVi6fNw2plM9HvDQwE4ZhJ0dLpdHy+Iull86MvfzKRK6Uq1QEplR69TUKHDeztl2dfL1Wq09N12ozs4035pq1GkrPI6ZWO/smBSzTiqfONfcTsjA3SMj0+fONC28RcpHFchchb9PAsFKXFgmVc0vL9QwhJZYCcXtld8mBE/8vXrlMFucntSwhGQnSr7XTKVZzhFhXrhLyzrurq++93006dVntIAQoiAIXCRmwtYNkbf3adUKGbtz44MObhBwx5MvOjYJwiAIfOdtO6ovE3Pj4E0Ian372+dgSIT1ffOkUy0KUBmtkpZL+iqxsLi10k46vG2e25s7ujtIWbxcUGnSSxW+ccbXm/SG/vb5+dXzpO2f1Wo9qVG2MVQoE/tvNuzzx/fJ0uXdkemg+GdctKxWfrKRNu3mLArcvEdIdUdX65tSMVtWWysl2S7WrWnLuTt/QlfU5CvyQHpmaMOvb2+nlCdNSq71xPR4fKQ//+NPd9TuzfU36w2VTOsSVn08aVtU21JRm2/Xh7V/WZ3/dKN8e1ywKqGpC5BPbCwWc7dUtvaqltOXNcnpmY3vwt9+Pzv9BgUnTAghzvIKxJpvOn2HdL6nG25u3hk+f+nOLAgLggYB5SZE4XpBxQVWzhlHXtM0LjWtjd7f+osBeFkDn8HOOYZdz9kkKLuhNo14Zv7ez07i5qcoUYEUQdYmAYUS3m+Pl9gIu2NmZe3/P7qz+kzYKiZZHeajyL1zy+j56IdRgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA2LTI3VDA3OjI4OjAxKzAwOjAwPxKVSgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNi0yN1QwNzoyODowMSswMDowME5PLfYAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#mcol>table>tbody>tr:last table:first>tbody>tr:nth-child(2)",
      needDoubanInfo: true,
      uploadPath: "/index.php?page=upload",
      search: {
        path: "/index.php",
        imdbOptionKey: "2",
        nameOptionKey: "0",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          search: "{imdb}",
          page: "torrents",
          options: "{optionKey}",
          order: 4,
          by: 2
        }
      },
      name: {
        selector: "#filename"
      },
      imdb: {
        selector: 'input[name="imdb"]'
      },
      description: {
        selector: 'textarea[name="info"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      category: {
        selector: 'select[name="category"]',
        map: {
          movie: [
            "15",
            "40",
            "16",
            "18",
            "19",
            "41"
          ],
          tv: [
            "15",
            "40",
            "16",
            "21",
            "22"
          ],
          tvPack: [
            "15",
            "40",
            "16",
            "21",
            "22"
          ],
          documentary: [
            "15",
            "40",
            "16",
            "24",
            "25"
          ],
          cartoon: [
            "15",
            "40",
            "16",
            "27",
            "28"
          ],
          concert: [
            "15",
            "40",
            "16",
            "31"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "15"
          ],
          bluray: [
            "15"
          ],
          remux: [
            "40"
          ],
          encode: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ],
          web: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ],
          hdtv: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ]
        }
      },
      resolution: {
        map: {
          "2160p": [
            "15",
            "40",
            "16",
            "41"
          ],
          "1080p": [
            "19",
            "22",
            "25",
            "28",
            "31"
          ],
          "1080i": [
            "19",
            "22",
            "25",
            "28",
            "31"
          ],
          "720p": [
            "18",
            "21",
            "24",
            "24",
            "31"
          ]
        }
      }
    },
    HDT: {
      url: "https://hd-torrents.org",
      host: "hd-torrents.org",
      siteType: "HDT",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBAoHLibMJfxhAAABTklEQVQoz4XSz2oTURzF8c+dyUwSqSUKitJuqq5cFxfWt/BpfCxfwa2CC3VjsUWptYUqJmlmzEzujIuk+SNIzg/u6svh3PP7BSQSrS0KEq+8UG0DSb3Wbp/Ounn6j0erWWZagpkducDSBGqlWrsC+/btm4mIolpEpuvKD5N1cOBYgSBq5DJRqWvP3RUYpGpXDlz76UBuz67SNx/RE7Q3YKvS9cxXlUMDDxUmHrsUzVYgqVyw44GhXbkzb5ReemRsuvp1kMpE9z13pO+DPxpDx3pG6s16glThrU+eKhWmOnouVIuiOjfVRsHQqXe6BvqeqGW+CxKYv/N6K5+dmzpz4rc7bvviAtmq8EYjl3svap0Izt0ycSnom61vpjBxqFSj0WrQc0/fL+P1jIVTI6l2EaTRChLRyPU62BgrZMLGBbeL7W/UMz+G/yvZftlz/QVf65MTdoZVvQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NjozOCswMDowMAiuiIoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDY6MzgrMDA6MDB58zA2AAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: ".listadetails>tbody>tr:nth-child(2)",
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "2",
        nameOptionKey: "3",
        params: {
          search: "{imdb}",
          options: "{optionKey}",
          order: "size",
          by: "DESC"
        }
      },
      name: {
        selector: 'input[name="filename"]'
      },
      imdb: {
        selector: 'input[name="infosite"]'
      },
      description: {
        selector: 'textarea[name="info"]'
      },
      tags: {
        hdr: 'input[name="HDR10"]',
        hdr10_plus: 'input[name="HDR10Plus"]',
        dolby_vision: 'input[name="DolbyVision"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      category: {
        selector: 'select[name="category"]',
        map: {
          movie: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          tv: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ],
          tvPack: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ],
          documentary: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          cartoon: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          concert: [
            "61",
            "62",
            "66",
            "57",
            "45",
            "44"
          ],
          variety: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "70",
            "72"
          ],
          bluray: [
            "1",
            "59",
            "61"
          ],
          remux: [
            "71",
            "2",
            "62",
            "73",
            "60"
          ],
          encode: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ],
          web: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ],
          hdtv: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ]
        }
      },
      resolution: {
        map: {
          "2160p": [
            "70",
            "72",
            "71",
            "73",
            "64",
            "65",
            "66"
          ],
          "1080p": [
            "1",
            "59",
            "61",
            "2",
            "60",
            "62",
            "5",
            "30",
            "57"
          ],
          "1080i": [
            "1",
            "59",
            "61",
            "2",
            "60",
            "62",
            "5",
            "30",
            "57"
          ],
          "720p": [
            "3",
            "38",
            "45"
          ]
        }
      }
    },
    HDTime: {
      url: "https://hdtime.org",
      host: "hdtime.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABnlBMVEVyICB6Hh57HR2GGhqKGBiLGBiRJiajTEx+IiKeQkKDLS2BKiqYOjp9ISGYODiNHh6PFxeQFxeuWlqzYWGeNjaxXl6iQECSHx+nSUm1ZGS0Y2OtV1eaMDCTIyOuV1e0ZGTt4eH59fW7dHTz7OzIlJSXLy/Vr6/////+/f3y6enJmJicNDSbOzvq19fStbX28PDjzs7izMzw5ub17+/CioqeQ0PRq6vhysrz6+vizc3gysrBlZXl09OpU1OjRka0amrn1NTfxsakSUmfPDyjRESqVVXu4uLcvr6pVlaiRETfysqXKSmSHR27dXX8+vqsVVWZKyvq3Nz37+/y5eX9/PytVlbx6Oj38vKwXFz+/v77+Pj59PSsVlbw5+f38/OwXV37+fnWs7O8gYH48/OQGBixYGCvW1uZMTHLm5vr3d2pUFDFiIjBgIDPoqL17u7Tra2bNDT8+/vkz8+tXFyRGxvRr6/ZvLyvXl7XubnXurq4d3eVKCi+hYXbv7/Zvb2mSUmTISGWJyfQra2aMzOcNTWVJCSQGhqXKiqRGhqbMzMP6rAIAAAAEHRSTlPB4en7/f39/en96en96f39DMn6iQAAAAFiS0dEJy0PqCMAAAAHdElNRQflBgoEEjQ06RnvAAABJUlEQVQ4y2NgYGTCAxgZGBiZWVhxAhZmRgYmFgE8gIWJgYlVQBAnEGAdNgrYhIRFgGxRYTFxCUkgkJKWEZSVkwQDeXYOBiZOBUUloAJlRRVVNXUg0NDU0tbRVYcAPS40BfoGhkbqxiamZuYGiuoWllbW3GgKbGzt7B3UHZ2cXVzd1N09PHl40RR4eQv6+PoZ+QsKBgSqq6mCHcmpoBEUHBwcAlMgGBoWHoGqIDIqOjpaA64gJjYuHlVBQmJSUlIyTEFKqr5+GqoCFDekpGeoZ2bhVKCQnZObF5JfgFMBCBQWFZcgK+ArLSsHKqiorKquqQWCOq36BiC/sam2phqsgL+5pRUo0KLt3dbeAgTa3uB46uhsaW8bNAmGcgWEsh7BzEso+wMAFb1rT/22c/EAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDYtMTBUMDQ6MTg6NTErMDA6MDD9uTIQAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA2LTEwVDA0OjE4OjUxKzAwOjAwjOSKrAAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      tags: {
        diy: 'input[type="checkbox"][name="tags[]"][value="8"]',
        chinese_audio: 'input[type="checkbox"][name="tags[]"][value="16"]',
        chinese_subtitle: 'input[type="checkbox"][name="tags[]"][value="32"]',
        hdr: 'input[type="checkbox"][name="tags[]"][value="64"]',
        hdr10_plus: 'input[type="checkbox"][name="tags[]"][value="64"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "12",
          x264: "10",
          x265: "12",
          h265: "12",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1 ",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "7",
          hddvd: "2",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "0"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdtime: "6",
          hdt: "12",
          vtime: "15",
          padtime: "7",
          cmct: "8",
          wiki: "4",
          beast: "3",
          chd: "2",
          other: "5"
        }
      }
    },
    HDU: {
      url: "https://pt.hdupt.com",
      host: "hdupt.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBy8jpVQ5rwAABFlJREFUOMs9lElvXMcBhL9e3j4LZ6gR6SFpLhITWU4gKTSyIRdHgZBTfpN/UZBrTrEBI4ccAmRBLjYgWZFEUZztLTNv6dfdOVAI6lKnQhUKVeIPFydeSokQAqUU86NPePyTSx59/oD9/QFCAEhQA2Q6QURjOgP//vs/+POf/shmtcYLiUfgvUdN48FXjZP0QvOjx5c8f/FrLh/OiAOLNS3O1HR1gbM9QkY4r7HWs394xGCyR1WWrLeGzkmcDFDDwfQrGUb87OkjXjz/gulQ0m+XeG9x3mO6FtM2dKan2Va024reGHpCDo+OOdiL0GHKphHIcIgeTA958ctHfPmLh0i34+b1W7Q3hFFI0xlUlCKlQoUe6x29rXH+hmBUk+7N6KxkOJ5yehpzu2nRz3/zhC9//pBYtbx/ec3bl69wXc1klLLZ9axqwafn53jZkiZDrn94xfHZGYYcnU3wwNff/oXj8yuy0R76d7+6JFaecl1S5iVKK9J4iJWCk4tT5iJmnTfsjOX9as3X3/yNLxYfuHr2BKtb9sZzjk9OeP3uB84uforeFRtcqGi7HofEiwCnY1abNYv8FYfzQzSCemepW8vDkwmZavjvd/+iWP+VbHbO1WdPWVXf4zzodtdQrXdUZYlH8iFvuF0uMX3Htqg4Wu44nB9Q5i1CaT6dZbi25s37FZvSsHj7PU+GF1w9u+LNokW/eXnDeDagqg14i1URr2/f0vUObywqbHAqp1hucb5nfqBpasdt0bIVI75b52z/+R9+/9tjpFLI63crwnTM/aMzVoVhU3UEcYIOI5I0w1rB8npNvioo25Ztp1hXnrIVOBWRjWc0dU1RNQgp0Pkq5/rNguHekKKs2eQlaRKjXI0wHtEZTNNRNTXjyQFNo+gaSW8EWg/Znw7IhiNaGyKQaNc23F7fUOxKrO2YjDKqakfvHML1aC/AexIdEBByuyhZFTmdjrE7x/mDU87OT+/miUCbvmNbViSjmPnhPcp8w2axwjQN2nmQIUpp9pOMUGl6oTAyIBhO+ezzZ5xdXKD13RcIAdpYg7UtUQB917Je5pjWIKxFeEU6mqC8QFpDNrrP+JMfcxanDGbHjOcH6NgjhUAiEEIgvfc02x1lXrL4sKTKS2xrwAm0CkkmBzROki9zgnjK+PwpgQyJtCAbSAZZRJaGpGlAmgToNA5o6o5iVdK3Dar3RCrAek+UjghHM+Ryzfj+KcHsnGg8xfdL9g5HJEmA+OjMA8IL9CgOabYFN+9uieMI7yVeWIIoYrg/xxrBeP+M8fEDiDPiCO4/vkSFdyXcAe6OUyBT4UiVp9gULFYFTddje0iye0gZY27ek907ITu+JBuNiBOPDhXcyQDgAbwHPDrWinESkemGqjXsrCUMIorVmmaZk4QZu+2aqQcZBCgl8fiPEfnI/q+KFl6QRSF7SURtGpwVWCydLSFMcL0nXrzGrG+I9oc4LzEteOfw3uOtA+9xzoJ1/A9EnjRTvBUMaAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NzozNSswMDowMIa7gnQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDc6MzUrMDA6MDD35jrIAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "14",
          x264: "16",
          x265: "14",
          h265: "14",
          mpeg2: "18",
          mpeg4: "18",
          vc1: "2",
          xvid: "3",
          dvd: "18"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "2",
          dd: "2",
          "dd+": "2",
          flac: "7",
          dts: "4",
          truehd: "3",
          lpcm: "11",
          dtshdma: "1",
          atmos: "17",
          dtsx: "16"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "11",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hddvd: "2",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          IND: "6",
          SEA: "8",
          OT: "7"
        }
      }
    },
    HDZone: {
      url: "http://hdzone.me",
      host: "hdzone.me",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "411",
            "412",
            "413",
            "414",
            "415",
            "450",
            "499",
            "416"
          ],
          tv: [
            "425",
            "426",
            "471",
            "427",
            "428",
            "429",
            "430",
            "452",
            "431"
          ],
          tvPack: [
            "432",
            "433",
            "434",
            "435",
            "436",
            "437",
            "438"
          ],
          documentary: [
            "417",
            "418",
            "419",
            "420",
            "421",
            "451",
            "500",
            "422"
          ],
          concert: "441",
          sport: [
            "442",
            "443"
          ],
          cartoon: [
            "444",
            "445",
            "446",
            "447",
            "448",
            "454",
            "449",
            "501"
          ],
          variety: ""
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "12",
          x264: "1",
          x265: "2",
          h265: "2",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "3",
          xvid: "5",
          dvd: "5"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "9",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "7",
          vhs: "8",
          hddvd: "8"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "15",
          dd: "15",
          "dd+": "15",
          dts: "3",
          truehd: "13",
          lpcm: "14",
          dtshdma: "11",
          atmos: "11",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "10",
            "499",
            "500",
            "502",
            "501"
          ],
          bluray: [
            "1",
            "450",
            "451",
            "452",
            "453",
            "454"
          ],
          remux: [
            "3",
            "415",
            "421",
            "430",
            "437",
            "448"
          ],
          encode: [
            "7",
            "411",
            "412",
            "413",
            "414",
            "416",
            "417",
            "418",
            "419",
            "420",
            "422",
            "425",
            "426",
            "471",
            "427",
            "428",
            "429",
            "431",
            "432",
            "433",
            "434",
            "435",
            "436",
            "438",
            "444",
            "445",
            "446",
            "447",
            "449"
          ],
          web: [
            "11",
            "411",
            "412",
            "413",
            "414",
            "416",
            "417",
            "418",
            "419",
            "420",
            "422",
            "425",
            "426",
            "471",
            "427",
            "429",
            "431",
            "432",
            "433",
            "434",
            "436",
            "438",
            "444",
            "445",
            "446",
            "447",
            "449"
          ],
          hdtv: [
            "5",
            "412",
            "413",
            "416",
            "418",
            "419",
            "422",
            "424",
            "426",
            "471",
            "427",
            "428",
            "431",
            "433",
            "434",
            "435",
            "438",
            "442",
            "443",
            "445",
            "446",
            "449"
          ],
          dvd: [
            "",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          dvdrip: [
            "7",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "1",
            "499",
            "416",
            "500",
            "422",
            "431",
            "438",
            "502",
            "449",
            "501"
          ],
          "1080p": [
            "2",
            "414",
            "420",
            "429",
            "436",
            "447"
          ],
          "1080i": [
            "3",
            "424",
            "428",
            "435",
            "443"
          ],
          "720p": [
            "4",
            "413",
            "419",
            "423",
            "427",
            "434",
            "442",
            "446"
          ],
          "576p": [
            "5",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          "480p": [
            "5",
            "411",
            "417",
            "425",
            "432",
            "444"
          ]
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdzone: "1",
          hdz: "2",
          hdztv: "3",
          ttg: "6",
          mteam: "7",
          other: "11"
        }
      }
    },
    HH: {
      url: "https://hhanclub.top",
      host: "hhanclub.top",
      siteType: "HanHan",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB+FBMVEX/////+/r/8O3/5N/+08z+xLr/8O7//f3/6eb+z8f+uq7+rp//rJ3+rZ//saT+tqn/t6r+ppb+jHj/eWL/bVT/ZUv/XkP+oZH//Pv//fz+2NH+mYj/b1f/X0P/aE7+fmf/XED/Wj3/Wj7+gGr/XEH/Wz//XD//Wz7/blX+497+1Mz+a1L/WT3+hXD+2dL+sqX+3tj/Zkv/Ykf+zsb+vrP/XkL+i3b+5N//tan/6+j/X0T+w7n+z8b/Y0j+jnv+6uf/clr/taj/8vD/dV3+vbL+5eD+kn//eGD/9/X/e2X+vLH/8/H+f2n+lYL/9PP/fWf/WTz+taj/+vn/gWv+vbH+l4X/+Pf+iHT/a1L+x73/hnH+vLD+mIb+4tz/3tj/5uH/7uv/+/v+inb+wLX+wrj+moj//Pz+u7D/n4/+m4n/kn/+h3L+w7j//v3+jXn+pJT+nIr/Vjr/Vzv/r6H+kHz/YEX+yL7+4t3/b1b+no3//v7+lIH/sKL+k4H+zMP+oJD+m4r+zsX+xrz+o5P+opL+sKL+p5j+qpz/ZEn+0sr+19H+mIf+rJ3/Z03+2tT+7er+inX/cVj/ZUr+i3f+dFz/6uf/6ub+uq3+rqD+nIv9fmj+cVn/YUb/ZEr/alH+6ub+4Nr+zcT+wrf+zcX+1M3/08z/0cn/9vQySTsrAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+cKGggqKOZMG6oAAAFmSURBVBjTTdHlW4IxEADwEwMVu8BA907nizrrtVHs7sLuwG4xUFGxu7v733TDL+7Lbb/dPffcBvB/2chs7ewd+E7u6OSscHF1c/fw9PL28fVTqsA/IDBIHRyCBIxxUGgYCRc1ERAZRUUaHRNMEMKxcfEsSAmQmIQQTU7x4ZiaxoM2HTJ0DDOzskWGObl5GKGkfCjQEEQLZUWYZxaXcCyFsnKMaEVlFSVidU1tncCwHkAhIqpvaNQ1ZXs3q1oY+iUCtLLyNnl7R2daV0N3D0VI3QvQxxr1GwYGh4ZHRsfGqbW7fIJlThq8piidnoFZhsY5mF9guGhaYie8DCssSGaYM7LyVVj7Qz3HdbBw3IBNjlvWO10GOPGJtmFH4LODkuHuHuz7EiQcGA45Kv1ZATk6hpNoLFDp9Iy9BDm/0BBSfXkFcH1ze3f/8Kg1GqVdSXp6HjHLrb9genl9e7dYPj6/vr9efwB+AedbWaa0tk+DAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTEwLTI2VDA4OjQyOjM5KzAwOjAwIhY7NQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0xMC0yNlQwODo0Mjo0MCswMDowMMwWz0MAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMTAtMjZUMDg6NDI6NDArMDA6MDCbA+6cAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      needDoubanInfo: true,
      seedDomSelector: ".bg-content_bg div.leading-6:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      }
    },
    HaresClub: {
      url: "https://club.hares.top",
      host: "hares.top",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~.layui-row:first table:first>tbody>tr:nth-child(6)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          search_mode: "0"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="pt_gen[imdb][link]"]'
      },
      douban: {
        selector: 'input[name="pt_gen[douban][link]"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      screenshots: {
        selector: 'textarea[name="screenshots"]'
      },
      tags: {
        chinese_audio: 'input[name="tags[]"][value="32"]',
        cantonese_audio: 'input[name="tags[]"][value="64"]',
        diy: 'input[name="tags[]"][value="1024"]',
        hdr: 'input[name="tags[]"][value="4096"]',
        hdr10_plus: 'input[name="tags[]"][value="8192"]',
        dolby_vision: 'input[name="tags[]"][value="16384"]',
        chinese_subtitle: 'input[name="tags[]"][value="256"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "409",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          x264: "8",
          x265: "7",
          h265: "6",
          mpeg2: "4",
          mpeg4: "9",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "13",
          dd: "13",
          mp3: "4",
          "dd+": "13",
          flac: "1",
          dts: "3",
          truehd: "9",
          lpcm: "14",
          dtshdma: "11",
          atmos: "8",
          dtsx: "10",
          ape: "2",
          ogg: "5",
          wav: "15"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "2",
          bluray: "2",
          remux: "3",
          encode: "4",
          web: "5",
          hdtv: "8",
          dvd: "0",
          dvdrip: "0",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "5",
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "4",
          EU: "4",
          HK: "2",
          TW: "3",
          JP: "7",
          KR: "7",
          OT: "10"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          chd: "4",
          hds: "5",
          wiki: "6",
          cmct: "8",
          beast: "9",
          hdc: "10",
          frds: "11",
          pter: "12",
          bhd: "13",
          pth: "14",
          other: "15"
        }
      }
    },
    KEEPFRDS: {
      url: "https://pt.keepfrds.com",
      host: "keepfrds.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACDVBMVEX////8/Pz19fXs7Oz09PT+/v7p6enQ0NC7u7uwsLCvr6+6urrOzs7n5+f7+/v6+vri4uKrq6uBgYFzc3N5eXl6enp0dHR/f3+np6be3t75+fjj4+OSkpJ8fHyhoaHh4eHT09OlpaV+fn2Li4ve3t3s8PXu8vfh5uu6vsKLjY+3uLjl5eX5+fm8vLyLjY6zt7vf4+isvtSOp8WCnsB+mbl6kKyutb3c3d7v7u7m5ubY2NjY2NfP0NGqsrt1jKd8lreCnr+OqMWcss1chLAvZZ4uZp9ahbPS3ejOzs+3trbLy8ugoKCioqHBwsPK1eJXg7EtZZ8uZJ5bhLCds83t8faoxt9Yl8g/icJ2qtLh6vGwr697e3uNjY3FxcWRkZGenp3MzMvf6fFyqNE8h8FXlseoxd78/f7f7PWPweJWpdZ7uuDh7fWzs7OampqoqKipqamXl5enp6fk8fh4uN9Uo9X6/P3Q6PaQzex3xenX7ffP0dLR0NDW1ta5ubna2trx8fH1+PnY8Pp0xOqOzOz1/P/L5vKUwtaxwMfa3N329fX39/f4+Pjq7e6xwsmOvtLJ5fD2/P/x8/PDyMuMjpC0tLX29va2t7eKjo67wcPu8PH9/P3m5eWXlpabm5vKysrd3d3MzMyQkI/h4OCxsbGGhoZ4eHiEhISurq79/f3U1NTAwMC1tbW/v7/q6urw8PAgqDn/AAAAAWJLR0QAiAUdSAAAAAd0SU1FB+UECgYrK84hHq4AAAEbSURBVBjTY2AgFTAyMTOzMCKLsDKysXNwcnHz8PKxwgX5BQSFhEVExcQlJKXAoqysDIzSMrJy7PICCopKyir8IBFVVTV1DU0tbR1WVj42XT19AzVVVQZDI2MTUzNzC2ZLeStrG1s7ewdHQwYnZxdXN3cPTw4vbm8fXz//gMCgYIaQ0LDwiMio6JhYwbj4hMSk5JTUEIa09IzMrOyc3Lz8gsJY7aLikoz0NAbW0rLyisqq6hqO2rr6hsam5rJSkKtaWtvaOzq7tHm7GXp6+/onQNw+cdLkKfJTWVm7pKdNnzET6qFZs+dEz503f/4Cb9mFi/jg3tRevERs6VKxZcsFdOCeZ13BvHLV6tVrFNYysqIEVHf9uu4VJIc4AFHVRtljPRexAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjQzOjQzKzAwOjAwO9PHqAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjo0Mzo0MyswMDowMEqOfxQAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      needDoubanInfo: true,
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="small_descr"]'
      },
      subtitle: {
        selector: "#name"
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "408",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "7",
          vhs: "8",
          hddvd: "8"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "3",
          hevc: "0",
          x264: "3",
          x265: "0",
          h265: "0",
          mpeg2: "17",
          mpeg4: "1",
          vc1: "16",
          xvid: "5"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "0",
          "2160p": "7",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "5",
          "480p": "5"
        }
      }
    },
    KG: {
      url: "https://karagarga.in",
      host: "karagarga.in",
      siteType: "KG",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC0FBMVEUAAADMzMyDgIDBxMSAgIB6gID/4uIAgICAhYXNzc2IiIiXl5eDg4O/v7/BwcHAwMCFhYXGxsbS0tK5ubl7e3tzc3P////Ly8vMzMzMzMzMzMzMzMxvamqlpKSmpqZaWlqChYXP0tJ/gICChYVISUkTExMFBQWJh4fJycmDhYV+hYU9iIhXWloAhIQAgIDNzc3Q0NCsrKxVV1cdDg56OTk4OTkODQ1bAAA9REQAhYWSkpJfX18QEBB4eHiLi4uVlJSZmpqNjY15eXkODg5hYWEgICCIQEC9u7vBxMQ/Pz+CgoJGRkYVeXmuuLjq1NQAAAAZGRljXl5iqKi+v7/BwMBWVlaNjY2IiIiIiIhoaGihoaGMjIycoKCwsLDJw8PAwMC/v7/AwMDAwMCWlpaLi4uDg4PGxsbHx8fDw8PIyMiwsLDAwMDAwMDAwMDAwMC/v7+8vLzAwMDAwMC8vLy4uLi3t7eQkJCenp7BwcHAwMDAwMDAwMDBwcHBwcHPz8+NjY2Hh4eEhISnp6fBwcHAwMDAwMB7e3t7e3t7e3uqqqqHh4dhYWH8/Pyjo6N5eXmAgIB/f3+AgICbm5uKiorCwsLDw8OMjIy9vb3///////+JiYl/f39/f3+AgICwsLCioqK6urq/v7+amprw8PDMzMy/v7/AwMDExMR5eXmAgIDKysp/f3+AgICvr6+hoaG/v7++vr7BwcHAwMDExMR5eXmAgICpqakUFBQRQkIAAAABAABrJiYoQUEAHR0SERGKiopaW1sMBgZOHh4aCwsMAABKLS1OTk45OTlTUVEBDg4BYGAIISE9AAAJCQkDAwMODg4FBQUHBwcLCwsBAwMCDg5TAwNCOTk+Pj5bW1tZWVleXl4rKysWFxdYV1dcWVl3WFg7Ozs8PDxzc3PFxcW2trbAwMC4uLiHh4eIiIiMjIyPj4+zs7OdnZ2/v78GBgb///+lKbQMAAAAtnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTUEIDo3hNxoOBqD3++TnchSh7eSBAgFag32O8PCOfIhfJExJTMrhHQ6N+/v++sYaBp33vCADtuicX5oUv3t/dbruiNi6nO+WikT90FgtpehaxPfEwV7dRgKc9f786eDlxx0BHQkRkfleFR4aAwJ63elXD39/g4iIidzagX9/g1oB3Le5ubO3F6TuswxDUSMVTIEDAwMEBrawIHRE97mnD1YAAAABYktHRBZ80agZAAAAB3RJTUUH5QQMAwUgcVRTPQAAAThJREFUGNNjYKAaYJSQlJJmRBFiYpKR3SYnr6DIjBBjYVVSVtmuqqauwcYOF+TQ1NLesXPnrt06unpgAU59A0MjY5M9e/eZmplbWAIFuaysbWzt9h84eOjwkaP2DtwgVTyOTsecXVyPnzh56vQZN3cPXpCgp5f32XPnL1y8dPnK1Ws+vn58IEH/gOs3bty8dfvO3Xv3A4OCQ/hBgg8ehoaFh0dEPoqKjomNi09ITAIKJ6ekCggKpqU/zsjMevI0Oyc3DyiYXyDEwl9YVPyspLSsvKKyir8aKFhTy8cgLFxX//xFQ2NTc0srP8w3Im3tHS87u7pFYQI9vX39EyZOejV5ytRp02fMFAMLvn4za/acufPmty9YuOjt4iVLly1fsZLh3fNVYqvXrF3XJr5+w9uNm/Kfbt6yFQBipHYOvCm+yAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMlQwMzowNToyOCswMDowMNjzD2AAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTJUMDM6MDU6MjgrMDA6MDCprrfcAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: ".outer h1~table:first>tbody>tr:nth-child(6)",
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        imdbOptionKey: "imdb",
        nameOptionKey: "title",
        params: {
          search: "{imdb}",
          search_type: "{optionKey}",
          sort: "size",
          d: "DESC"
        }
      },
      source: {
        selector: "select[name='source']",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          hdtv: "TV",
          dvd: "DVD",
          web: "WEB",
          vhs: "VHS",
          hddvd: "HD-DVD",
          other: "Other"
        }
      },
      resolution: {
        selector: "select[name='hdrip']",
        map: {
          "720p": "1",
          "1080p": "2",
          bluray: "3"
        }
      },
      genres: {
        map: {
          Action: "4",
          Adventure: "55",
          Animation: "5",
          Arthouse: "6",
          Camp: "43",
          Classics: "8",
          Comedy: "9",
          Crime: "10",
          Cult: "11",
          Documentary: "20",
          Drama: "12",
          Epic: "44",
          Erotica: "13",
          Experimental: "51",
          Exploitation: "47",
          Fantasy: "14",
          "Film Noir": "15",
          Giallo: "53",
          Horror: "17",
          "Martial Arts": "18",
          Musical: "19",
          Mystery: "54",
          Performance: "60",
          Philosophy: "48",
          Politics: "49",
          Romance: "50",
          "Sci-Fi": "21",
          Short: "22",
          Silent: "23",
          Thriller: "24",
          TV: "25",
          "Video Art": "56",
          War: "26",
          Western: "27"
        }
      },
      country: {
        map: {
          USA: "2",
          UK: "12",
          Germany: "7",
          Italy: "9",
          "---": "255",
          Abkhazia: "119",
          Afghanistan: "54",
          "Akrotiri and Dhekelia": "120",
          "Aland Islands": "121",
          Albania: "65",
          Algeria: "35",
          "American Samoa": "122",
          Andorra: "68",
          Angola: "36",
          Anguilla: "123",
          "Antigua Barbuda": "89",
          Argentina: "19",
          Armenia: "124",
          Aruba: "125",
          "Ascension Island": "126",
          Australia: "20",
          Austria: "37",
          Azerbaijan: "118",
          Bahamas: "82",
          Bahrain: "127",
          Bangladesh: "86",
          Barbados: "85",
          Belarus: "129",
          Belgium: "16",
          Belize: "34",
          Benin: "116",
          Bermuda: "130",
          Bhutan: "131",
          Bolivia: "132",
          "Bosnia Herzegovina": "67",
          Botswana: "133",
          Brazil: "18",
          "British Virgin Islands": "134",
          Brunei: "135",
          Bulgaria: "104",
          "Burkina Faso": "60",
          Burundi: "136",
          Cambodia: "84",
          Cameroon: "137",
          Canada: "5",
          "Cape Verde": "138",
          "Cayman Islands": "139",
          "Central African Republic": "140",
          Chad: "114",
          Chile: "51",
          China: "8",
          "Christmas Island": "141",
          "Cocos (Keeling) Islands": "142",
          Colombia: "99",
          Comoros: "143",
          "Congo (Brazzaville)": "53",
          "Congo-Kinshasa (Zaire)": "252",
          "Cook Islands": "144",
          "Costa Rica": "102",
          "Cote d'Ivoire": "145",
          Croatia: "97",
          Cuba: "52",
          Cyprus: "146",
          "Czech Republic": "46",
          Denmark: "10",
          Djibouti: "147",
          Dominica: "148",
          "Dominican Republic": "41",
          Ecuador: "81",
          Egypt: "103",
          "El Salvador": "149",
          "Equatorial Guinea": "150",
          Eritrea: "151",
          Estonia: "98",
          Ethiopia: "112",
          "European Union": "253",
          "Falkland Islands": "153",
          "Faroe Islands": "111",
          Fiji: "152",
          Finland: "4",
          France: "6",
          "French Polynesia": "154",
          Gabon: "155",
          Gambia: "156",
          Georgia: "108",
          Ghana: "157",
          Gibraltar: "158",
          Greece: "42",
          Greenland: "159",
          Grenada: "160",
          Guam: "161",
          Guatemala: "43",
          Guernsey: "162",
          Guinea: "113",
          "Guinea-Bissau": "163",
          Guyana: "164",
          Haiti: "165",
          Honduras: "79",
          "Hong Kong": "33",
          Hungary: "74",
          Iceland: "62",
          India: "70",
          Indonesia: "166",
          Iran: "107",
          Iraq: "167",
          Ireland: "13",
          "Isla de Muerte": "105",
          "Isle of Man": "168",
          Israel: "44",
          Jamaica: "31",
          Japan: "17",
          Jersey: "170",
          Jordan: "169",
          Kazakhstan: "110",
          Kenya: "172",
          Kiribati: "58",
          Kosovo: "173",
          Kuwait: "171",
          Kyrgyzstan: "80",
          Laos: "87",
          Latvia: "101",
          Lebanon: "100",
          Lesotho: "174",
          Liberia: "175",
          Libya: "176",
          Liechtenstein: "177",
          Lithuania: "69",
          Luxembourg: "32",
          Macau: "178",
          Macedonia: "179",
          Madagascar: "180",
          Malawi: "181",
          Malaysia: "40",
          Maldives: "182",
          Mali: "115",
          Malta: "183",
          "Marshall Islands": "184",
          Mauritania: "185",
          Mauritius: "186",
          Mayotte: "187",
          Mexico: "25",
          Micronesia: "188",
          Moldova: "189",
          Monaco: "190",
          Mongolia: "109",
          Montenegro: "257",
          Montserrat: "191",
          Morocco: "192",
          Mozambique: "193",
          Myanmar: "194",
          "Nagorno-Karabakh": "195",
          Namibia: "196",
          Nauru: "63",
          Nepal: "197",
          Netherlands: "15",
          "Netherlands Antilles": "71",
          "New Caledonia": "198",
          "New Zealand": "21",
          Nicaragua: "199",
          Niger: "200",
          Nigeria: "61",
          Niue: "201",
          "Norfolk Island": "202",
          "North Korea": "96",
          "Northern Cyprus": "203",
          "Northern Mariana Islands": "204",
          Norway: "11",
          Oman: "205",
          Pakistan: "45",
          Palau: "207",
          Palestine: "208",
          Panama: "206",
          "Papua New Guinea": "209",
          Paraguay: "90",
          Peru: "83",
          Philippines: "59",
          "Pitcairn Islands": "210",
          Poland: "14",
          Portugal: "24",
          "Puerto Rico": "50",
          Qatar: "211",
          Romania: "75",
          Russia: "3",
          Rwanda: "212",
          "Saint Helena": "213",
          "Saint Kitts and Nevis": "214",
          "Saint Lucia": "215",
          "Saint Vincent and the Grenadines": "217",
          "Saint-Pierre and Miquelon": "216",
          Samoa: "39",
          "San Marino": "219",
          "S\xE3o Tom\xE9 and Pr\xEDncipe": "220",
          "Saudi Arabia": "221",
          Sealand: "258",
          Senegal: "94",
          Serbia: "256",
          "Serbia and Montenegro": "47",
          Seychelles: "48",
          "Sierra Leone": "222",
          Singapore: "26",
          Slovakia: "223",
          Slovenia: "64",
          "Solomon Islands": "224",
          Somalia: "225",
          Somaliland: "226",
          "South Africa": "29",
          "South Korea": "30",
          "South Ossetia": "227",
          Spain: "23",
          "Sri Lanka": "228",
          Sudan: "229",
          Suriname: "230",
          Svalbard: "231",
          Swaziland: "232",
          Sweden: "1",
          Switzerland: "57",
          Syria: "233",
          Taiwan: "49",
          Tajikistan: "234",
          Tanzania: "235",
          Thailand: "93",
          "Timor-Leste": "236",
          Togo: "95",
          Tokelau: "237",
          Tonga: "238",
          Transnistria: "239",
          "Trinidad & Tobago": "78",
          "Tristan da Cunha": "240",
          Tunisia: "106",
          Turkey: "55",
          Turkmenistan: "66",
          "Turks and Caicos Islands": "241",
          Tuvalu: "242",
          Uganda: "243",
          Ukraine: "72",
          "United Arab Emirates": "244",
          "United Kingdom": "12",
          Uruguay: "88",
          USSR: "92",
          Uzbekistan: "56",
          Vanuatu: "76",
          "Various/International": "117",
          "Vatican City": "245",
          Venezuela: "73",
          Vietnam: "77",
          "Virgin Islands": "246",
          "Wallis and Futuna": "247",
          "Western Sahara": "248",
          World: "254",
          Yemen: "249",
          Yugoslavia: "38",
          Zambia: "250",
          Zimbabwe: "251"
        }
      }
    },
    KamePT: {
      url: "https://kamept.com",
      host: "kamept.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5woaCDQq3ANFWQAAA51JREFUOMuFlFtT21YUhb+jI8m2ZMtXCgYMLiEpoXGmTXpvc5k8NP83nabT5z4ktNOZUEiDSyBASInxVb7JliWdPNDSIZB0v+9v1t577SWivlK8XUpRPzyg9uI5Uig+WFomlZ9GN02klFzQcVr6eZZi5+kfvNx6RKcxwNQNOo1jMsVl9HicfHGGzFQBKbULwWeAQkDP7fLjTw/x/SZSxEnG4kR+Ej3hYcZD3GaVZKHG4uVLWLZ1DnpO4cT3Oaw1qfVa5BybsqPRFQFmzyNvJkBoHB3UGY0Drt2ooOtnEdrbwFCBFXPA9RnXBZlElkuX85ixGENvwsALaHZ6bG5s0TiuI8T7FAqo1RpY2XlyKRepBDNzWeyE5OVhC8OwAPizusloErBS+YjiXPE9QAXttotumkwtzJMQJo2+wAs8XNfDtgTSEMzNZ9l+XsN1+yilTpS8a4cIDeH1ycmQccKmulcnbQrSlk2gedjJGKufXKPV9pBSQwhx5jDnRrbtOLbmE26/gDmDhZkUmcIUBccilYpz3Gyy93QbiwAnlfz/KxuGTmQlCRbLeJFkdSrNF5VZYjN5QqGRPMjw994OKqojwiFHe7tMlxbRpHwHUNdpDSJc36TvNikcBdy8WsDrJxhhUixPUyjlufLlDbKFHLXdA8beECuVQqkLbGMYOmEUYoo4s9oS3X3JDw/XqVYPSU3PEs9m0E2TmdIcSkU4hTwT33+3D3VdR0UKW4ZUygtUVu5QKi/TbtVoN+pomkQJSafRIAxCpCkZDvqoSF0AVBCGIaFSGGmL8m2HlfsWXb3O2q/rvKjuYpgG6XwGIQTyny8JggkKdXaHvu/zfOsvnlV38YOQtjtg7fctLKPHk18eIzqKaDSh+bpJMpPEyeUYj8YM3QEpJ40QJ9pE1FdKCFhff8aDBz/THY4ZKYO+e4QxbjFvm7ivenx37ytu3LnJwFdsbO7Q6nQYtlxu3bvDZ7e+PQWeKozCkFFkoAwd1WuTtyM+vVLi69UVJk6OYqlITAo6geLRbxvs7B4wl7X45u5tlOL0p0+BuqFj2xbK87GcJJmEQyqboa9Myh+WaB++RkQhZNLksmnE1Y/RpES3nTPZKP5N7PF4zP7+Kx6vrbO1vcfn15e5VlklHHuISZdISyAIkVpEqxeyt/+KTm/I9/fvsrS0cB4oxElabzzZpNXuUrm+QiabJYoiAt9H03WUikApNKnjeUMEYCdTaNp/ZnkDkeWj+pSQ1t4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTAtMjZUMDg6NTI6NDIrMDA6MDDrWrkWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEwLTI2VDA4OjUyOjQyKzAwOjAwmgcBqgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0xMC0yNlQwODo1Mjo0MiswMDowMM0SIHUAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table>tbody>tr:nth-child(4)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      }
    },
    LST: {
      url: "https://lst.gg",
      host: "lst.gg",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABXFBMVEUAAAAAAAEAAQABAAABAQAAAAAAAAEBAAEAAAAAAQAAAQABAAAAAAEAAAAAAQAAAAABAAAAAAAAAAABAQALCgoKCgoBAADQ0dC2treTkpMoKSmBgICAgIABAACTk5MAAACTkpIBAQEAAAEBAQEAAAEAAQABAAAAAQABAAABAAEAAQABAAAAAAEBAAEBAAEBAAAAAAABAQEAAQAAAAEBAQAEBAQhICAREREAAQH8/PwoKCk+Pz/q6ur//v/9/P13d3d2dnbz8vLz8/Pz8/I3NzexsbH+//5gYWBVVVVISEgyMjJoaGny8/Pg4OBoaWn///5/fn7////p6eiQkZEUFBTp6enJyMg3NjdQUVCys7L8/fzGx8bJyciEhYRgYGE0NDVra2ppaGlHR0bo6Ojs7e37+vr9/Pz9/f2NjY14eXn8/P309PRnZmfV1dXIycgNDQ0gICEHBwcDAgMCAgOj429fAAAALnRSTlMAAAAAADCX2fn52ZcJmv7+CQnCmjD+MJiX2dn5+fnZ2ZeXMP6aCcKa/pqX2fmXK9ig8QAAAAFiS0dEUZRpfCoAAAAHdElNRQfnChsDMwGLF6JaAAAA90lEQVQY0xWOZ1PDMBiD3yQEWiBNE/YsZc9Y2AbMCIXSsqEUCLPsvdf/v8PRJ+k53UlEZJBdXZNI1tbZJsUy6p1UwIBJuE46Bp7POVjAIQDf06AhCCAk4syZY1Bjk7ZianoGUgmZaqaW2Tnw+YVwMbe0nF/Jt1JbWBCiuLq2vrG5tb2z204dpYJke+X9g0MgOmJJ6iwdM6ZOTs/OJaIK66Lu8sXl1fXN7d09gqjCM9Tz8Pj0/PIavr1DfXwiS72unhdf3z+A/P3rs/UxgIGr+Bh4v0XWgK+gNIrxYLqKTMsbciG4ZGp4xCPdIDLt0bHEeGbCtkwy/wE9US4qeYwieAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0xMC0yN1QwMzo1MTowMSswMDowMPxuOEAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMTAtMjdUMDM6NTE6MDErMDA6MDCNM4D8AAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTEwLTI3VDAzOjUxOjAxKzAwOjAw2iahIwAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: "#meta-info+.meta-general>.panel:first",
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mal: {
        selector: "#automal"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anonymous"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "3",
          other: "7"
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    MDU: {
      url: "https://monikadesign.uk",
      host: "monikadesign.uk",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: "#meta-info+.meta-general>.panel:first",
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: "#title"
      },
      subtitle: {
        selector: 'input[name="subhead"]'
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mal: {
        selector: "#automal"
      },
      bgm: {
        selector: "#bgm"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      bdinfo: {
        selector: 'textarea[name="bdinfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anonymous"]'
      },
      category: {
        selector: "#autocat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "",
          dvd: "",
          dvdrip: "",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    MTV: {
      url: "https://www.morethantv.me",
      host: "morethantv.me",
      siteType: "gazelle",
      asSource: true,
      asTarget: false,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents/browse",
        params: {
          searchtext: "{imdb}",
          title: "{name}"
        }
      },
      icon: "data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAABMLAAATCwAAAAAAAAAAAAAiHaEEIh2hYCIdoaEiHaGaIh2hmCIdoZgiHaGYIh2hmCIdoZgiHaGYIh2hlyIdoZUiHaHAIh2htiIdoUEAAAAAIh2hJyIdoW0iHaFsIh2hbCIdoWsiHaFrIh2hayIdoWsiHaFrIh2hayIdoWoiHaFbIh2hsyIdof8iHaH7Ih2hQSIdoQciHaEDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiHaG8Ih2h/yIdoZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIh2hoSIdof8iHaGeAAAAAAAAAAAAAAAAIh2hIiIdoZkiHaGZIh2hIiIdoSIiHaGZIh2hiAAAAAAAAAAAAAAAACIdoaEiHaH/Ih2hngAAAAAAAAAAAAAAACIdoaoiHaH/Ih2h/yIdoUQiHaF3Ih2h/yIdof8iHaFEAAAAAAAAAAAiHaGiIh2h/yIdoZ4AAAAAAAAAAAAAAAAiHaG7Ih2h/yIdoREAAAAAIh2h7iIdof8iHaH/Ih2hqgAAAAAAAAAAIh2hoiIdof8iHaGeAAAAAAAAAAAAAAAAIh2huyIdof8AAAAAIh2hVSIdof8iHaGZIh2hzCIdof8iHaERAAAAACIdoaEiHaH/Ih2hngAAAAAAAAAAIh2hZiIdod0iHaH/Ih2hmSIdobsiHaH/Ih2hVSIdoXciHaH/Ih2hdwAAAAAiHaGhIh2h/yIdoZ4AAAAAAAAAACIdoZkiHaH/Ih2h/yIdof8iHaH/Ih2h7gAAAAAiHaEzIh2h/yIdobsAAAAAIh2hoSIdof8iHaGeAAAAAAAAAAAAAAAAIh2huyIdof8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIdoaEiHaH/Ih2hngAAAAAAAAAAAAAAACIdobsiHaH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiHaGhIh2h/yIdoZ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIh2hoSIdof8iHaGeIh2hCyIdoQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIdocUiHaH/Ih2hlSIdoSMiHaFwIh2hfSIdoXEiHaF3Ih2heiIdoXkiHaF5Ih2heSIdoXoiHaFzIh2hYiIdocIiHaH/Ih2h5yIdoS4AAAAAIh2hLyIdoXoiHaGMIh2hcyIdoXMiHaFzIh2hcyIdoXMiHaFyIh2heSIdoY0iHaFsIh2hSSIdoQoAAAAAAAEgNgAAb2Q/+CA1//hTdOA4cGngGCA54hhHZeQIaW7ACG50wIgAUOf4Q0Xn+E9S//hFVj/4PTYAAFJPgAFTUw=="
    },
    MTeam: {
      url: "https://kp.m-team.cc",
      host: "m-team.cc",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABdFBMVEUAAAACAgCCajIDAgEHBgImHw5XSCFcSyNTRCAeGAtpVihSQx9yXSxaSSJxXStZSSKxkUR9ZzCafjvNqE+TeDihhD6niUAdFwsAAAAGBQJ3Yi46MBYAAAAHBQJqVyhmVCcAAAAAAAA1LBSGbjMAAAAgGwx1YC0AAAAAAABENxqNdDYAAAAnIA9NPx0IBwMzKROmiUBSQx8IBgMaFQqCajLOqU86MBa9m0lEOBqSeDhyXStsWSlVRSAuJhJrWClxXCtmVCcjHQ1kUiZvWyoqIxBVRiByXixmVCckHg7rwFruw1zvxFzjulf0yV72yl/uw1v0yF7tw1v1yV74zGD3y1/3yl/1yV/4y1/5zGDxxl3lvFjku1jwxVzIpE3qwFrWsFL5zWDCn0vft1bHpE3MqE/Wr1LvxVz4zF/ctVXet1ZKPBzas1Tyx11ZSSK4l0f6zWDdtlVJPBzYsVNYSCK2lUbetlVIOxvXsFNXSCG1lEXpv1r///+72WvcAAAASXRSTlMAAAAAAKvo6uaQ+OL75/vn++v2/vX5+ogrXOazQ1/e2RsBoO85geUyDrfyRI3Hb6f5y2GA7P79/vz9+/nkwfn7+e35++73+/ejS5QV5gAAAAFiS0dEe0/StfwAAAAHdElNRQflBAoGJSzOxqaDAAAA40lEQVQY02NgZWNHAxycDFyeXqjA24ebgcfXDw348zLwBaALBvKTJhjkFxwSHBoU5hceEREaBFMZKSAoFBXq5ycsIhodAhUMFxOXkJSKCY6VlpGViwuFCEbKKzAoKsUnKKswMqkmRkAEA9TUmTU0kxK0tFkUdZKhgiEpunr6Bn4hqYZGxiZpMNvTTc3M/fyCQjIsLCPh7gzJzMoOCfLzy8nNy4c7KaSgsCgE6OzI4pIIP9IErUCCpWiC1pEBAUEZZeV+AQEB3hWVIQG+VTYMtnZ89nwOjk5W9vZ8zi6ubvZ87h4AngBo3AG4MQYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDY6Mzc6NDQrMDA6MDDepEzfAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA2OjM3OjQ0KzAwOjAwr/n0YwAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(6)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrenttr .torrentname td a[href*="details.php?id="]',
          name: '.torrenttr .torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      tags: {
        chinese_audio: "#l_dub",
        diy: "#l_diy",
        chinese_subtitle: "#l_sub"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "401",
            "419",
            "420",
            "421",
            "439"
          ],
          tv: [
            "403",
            "402",
            "435",
            "438"
          ],
          tvPack: [
            "403",
            "402",
            "435",
            "438"
          ],
          documentary: "404",
          concert: "406",
          sport: "407",
          music: "434",
          cartoon: "405",
          app: "422",
          ebook: "427",
          magazine: "427",
          audioBook: "427"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "16",
          h265: "16",
          x264: "1",
          x265: "16",
          mpeg2: "4",
          mpeg4: "15",
          vc1: "2",
          xvid: "3"
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "421",
            "438"
          ],
          bluray: [
            "421",
            "438"
          ],
          remux: [
            "439"
          ],
          encode: [
            "401",
            "419",
            "403",
            "402"
          ],
          web: [
            "419",
            "402"
          ],
          hdtv: [
            "419",
            "402"
          ],
          dvd: [
            "420",
            "435"
          ],
          dvdrip: [
            "401",
            "403"
          ],
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "6",
            "419",
            "402"
          ],
          "1080p": [
            "1",
            "419",
            "402"
          ],
          "1080i": [
            "2",
            "419",
            "402"
          ],
          "720p": [
            "3",
            "419",
            "402"
          ],
          "576p": [
            "5",
            "401",
            "403"
          ],
          "480p": [
            "5",
            "401",
            "403"
          ]
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          mteam: "9",
          mpad: "10",
          tnp: "23",
          mteamtv: "17",
          kishd: "7",
          bmdru: "6",
          onehd: "18",
          cnhk: "19",
          stbox: "20",
          r2hd: "21",
          pack: "8",
          geek: "24"
        }
      }
    },
    NPUBits: {
      url: "https://npupt.com",
      host: "npupt.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          incldead: "0",
          search: "{name}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrents_table>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(3)>center:first"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: "#small_descr"
      },
      description: {
        selector: "#descr"
      },
      anonymous: {
        selector: 'input[name="uplver"]',
        value: "yes"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403",
          music: "414",
          app: "408",
          ebook: "411",
          magazine: "411",
          audioBook: "411"
        }
      },
      area: {
        selector: "#source_sel",
        map: {
          CN: "6",
          US: "5",
          EU: "5",
          HK: "6",
          TW: "6",
          JP: "5",
          KR: "5",
          OT: "7"
        }
      },
      videoCodec: {
        selector: 4,
        map: {
          h264: "H264",
          hevc: "x265",
          x264: "x264",
          x265: "x265",
          h265: "x265",
          mpeg2: "MPEG2",
          mpeg4: "H264",
          xvid: "Xvid",
          dvd: "MPEG2"
        }
      },
      videoType: {
        selector: 2,
        map: {
          uhdbluray: "BluRay",
          bluray: "BluRay",
          remux: "Remux",
          encode: "BluRay",
          web: "WEB-DL",
          hdtv: "HDTV",
          dvd: "DVD",
          dvdrip: "DVDRip",
          other: ""
        }
      },
      resolution: {
        selector: 3,
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p"
        }
      },
      team: {
        selector: 5,
        map: {
          wiki: "WiKi",
          cmct: "CMCT",
          mteam: "MTeam",
          epic: "EPiC",
          hdchina: "HDChina",
          hds: "HDS",
          beast: "beAst",
          ctrlhd: "CtrlHD",
          chd: "CHD"
        }
      }
    },
    NYPT: {
      url: "https://nanyangpt.com",
      host: "nanyangpt.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB71BMVEVTu8ZWu8ZRusVkwctrxM2R09rW7vFTu8ZSusW44ue04eVTu8ZhwMpTu8Z5ydKFzdWs3OLR7O9Tu8bD5enN6u5lwstTu8ZTu8ZiwMpWvMZSusVTu8ZTu8ZTu8bD5up5ydJQucVSu8VSusVVu8aM0NhrxM2W1Nuf2N5Uu8Zpw83S7O98ytO54ueP0dl7ytPT7e93yNFRusVTu8ZiwMpwxs/V7fCO0dmg2d9gwMqz4OWv3uPB5eldv8llwcu64+e34eaBzNTA5emo3OFWvMdQusWw3+Sn2+HO6+6i2d9+y9PG5+tlwst7ytLT7fBvxs93ydHX7/GS09qs3eOFztbh8vTZ7/Ffv8lSusZ/zNTR7O9sxM6T09rc8PKJz9eu3uOp3OLK6e2a1tyAzNRnwsxXvMed193a7/Lf8fNcvsjE5urK6exVvMaHztZWvMa74+eY1dxSu8ZowsxYvMdjwctavchzx9BPucRQucRZvcdtxM6N0diQ0tl6ytKR09qU1NuV1Ntqw82Iz9fQ6+5Zvcie2N7H5+u44uZyx9Btxc6o2+FYvcd4ydHX7vG74+ij2d98y9PW7vFhwMrF5+ub193E5+qd197E5+vM6u3L6u1gv8nT7O90x9C04eW14eWa1t1vxc9uxc7P6+5gv8qy4OT///+e7qWjAAAAHnRSTlMAAEvO+oAXN9f3gYr55/3CaPzNFKD+10sUaMP+6DbE9n4oAAAAAWJLR0SkWb56uQAAAAd0SU1FB+UECgcwCiq8r10AAAFtSURBVBjTJdBlV0JBEAbgtbs7uc5VuZjMKhY2KIqJiV3X7sJusbs7/6gDzqfd58zOeWcZc3SKVQhxIMYnJColAHB2cWVu7qqkZLqIKalp6WrkkOHhybwwU5OVnYOYqxTztPlCQWGRN/NBtaa4pFSnLysXVIaKSmNKFTKO1TW1dfUmbGhAbGxqrmjBVkJzWzt0dHZ19yC29PZx4Jyw3zCA8uDQsBJhZNSE3I7msQyA8aykCYTJqWk7zsBs/BzQo/kFCtm/CDOEdBIselLLfy1RK1ueWFldq1tAcX1jc4vK1I6cbRt2lLG72sq9faPVajVqD9YJD2vMIB8da9SSLJ8sy7pxCTg7PTMjoHx+AYCXW7YfoZmKqzTBIlzf3ALXr91RDlskX43iaPP+4TEBOTY+Pf+j38ur4u39Q0VJsdqwjXb0D/gEUQKkFvj6XrRhIAsKDqHhtj04/Px+EoaGMYfwiMgobi+QrnUQ7RXD/gCppmlft2mUAgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0ODoxMCswMDowMGet8SMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDg6MTArMDA6MDAW8EmfAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "406",
          concert: "407",
          sport: "405",
          cartoon: "403",
          variety: "404"
        }
      }
    },
    OpenSub: {
      url: "https://www.opensubtitles.org",
      host: "opensubtitles.org",
      siteType: "subtitles",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAAAAAD/aE28AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QADzoyPqMAAAAHdElNRQflBxcLOzjtVivgAAAARElEQVQI12NggAH+D//BCMHAAjj/L2B6/w/IqGRYzuMgC2RcYpDldQBJPWSQY/l/GSw1g4PBF8jg+r+A5/1XbMbgtgsAjDUiHY8LnyYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDctMjNUMTE6NTk6NTUrMDA6MDB7fTP0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA3LTIzVDExOjU5OjU1KzAwOjAwCiCLSAAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: false,
      search: {
        path: "/en/search/sublanguageid-all/imdbid-{name}"
      }
    },
    OurBits: {
      url: "https://ourbits.club",
      host: "ourbits.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: 'input[name="picture"]',
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: "#tagGY",
        diy: "#tagDIY",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tagZZ",
        hdr: "#tagHDR10",
        hdr10_plus: "#tagHDR10P",
        dolby_vision: "#tagDB"
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "401",
          "3d": "402",
          tv: "412",
          tvPack: "405",
          documentary: "410",
          concert: "419",
          sport: "415",
          cartoon: "411",
          variety: "413",
          music: "416"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "12",
          hevc: "14",
          x264: "12",
          x265: "14",
          h265: "14",
          mpeg2: "15",
          mpeg4: "12",
          vc1: "16",
          xvid: "17",
          dvd: "18"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "7",
          ac3: "6",
          dd: "6",
          "dd+": "6",
          flac: "13",
          dts: "4",
          truehd: "2",
          lpcm: "5",
          dtshdma: "1",
          atmos: "14",
          dtsx: "21"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "4",
          encode: "7",
          web: "9",
          hdtv: "5",
          dvd: "2",
          dvdrip: "2",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      }
    },
    PTHome: {
      url: "https://www.pthome.net",
      host: "pthome.net",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABR1BMVEUAAAD/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/shv/shv/sxz/sxz/sxz/sxz/sxv/sxz/shv/shr/sx3/tB//vj7/zWv/2pH/4ab/zmz/vTz/2Y7/7s7/+e7//v3/////sx7/uS7/ujH/x1j/68T/8dX/1YL/03z/25P/zGj/6b7/7Mj/9OD//fn/shn/033/sxv/w07/8tj/1oX/1oT/vj//uCr/463//v7/893/14r/14j/8db/2Iv/vDn/57n/+vD///7//fv//fr/6b3/vDj/vTv/ymD/35//89z/xE//yV//6Lv/7MX/7Mf/uTD/0nj/+vH/7sz/1YH/3Zr/uC3/x1r/+e3/5bL/yV3/9N3/8NP/yWD/ujP/zm7/xFD/57j/4qr/wkn/vDf/tym6/awGAAAAGHRSTlMAAAEmcLXj+bYPYsPx/hWL7u6LEPTi+u42ThkjAAAAAWJLR0QnLQ+oIwAAAAd0SU1FB+UECgYoFFNqYFAAAAE4SURBVBjTZdFXW8IwFAbgpINKW1pGq0laFRSIC5xUxIkDFTfiwL33/7/2pMUrz+X7nDz58gUhhLAkK2pM02I9iixhJAbjuG6YCQKTMA09jrEwy06SaCilqbQFijO20xXGPN9z0hmMJD3ao8zvHxjM5ryULiHZCIXRoeF8ocizPjVkpJhgI6Nj4xOl8mSpOOVRU0GqsOmZ2blKmQbzhRyjREUuqbKFGue8skjIUn6ZEeKiXsJWVtcAeX19Y3PLp4RogEFju74DuNvc2z9gIbqE+odHx02xe9ISBsdVQslpu3xWATy/YCKyCpGod9m5ur7pcN6+FQiRIDy7q90/PD7x5xdPnIbwkt5HX1tv742Pz6/QkvBMUQgL4Lbvn/AWx4ZCouqgtIBVxZ5tRYX+L/nvO1xNc9Xud/wCUFAuZX3Re8sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDY6NDA6MjArMDA6MDAnY2+xAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA2OjQwOjIwKzAwOjAwVj7XDQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tag_zz",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "408",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "6",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "5",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "19",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "15",
          web: "10",
          hdtv: "5",
          dvd: "2",
          dvdrip: "15",
          other: "11"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "10",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          pthome: "19",
          pth: "21",
          pthweb: "20",
          pthtv: "22",
          pthaudio: "23",
          pthebook: "24",
          pthmusic: "25",
          other: "5"
        }
      }
    },
    PTMSG: {
      url: "https://pt.msg.vg",
      host: "msg.vg",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeFBMVEWGw/6Hw/6HxP6Fw/6Lxv6r1f6Xy/6s1v6h0f6g0P6Tyv6fz/6i0f6ez/6Lxf632/6l0v6p1P6x2P6n0/6n1P6RyP6j0f6Nxv6Vyv6j0v6w2P6f0P6h0P673f663f6Ryf6Px/6Kxf6azf6QyP6YzP6Uyv6Fwv7///+R5Vm0AAAAAWJLR0QnLQ+oIwAAAAd0SU1FB+YCAQQLEUD4N98AAABPSURBVAjXlc3XEYAgAAXBRxAUEQUDmLP9lygl6P7fHPAHASgDeMKFTDOV64LAlJV1VtdN23kE6fphnGaplxV+M7sSxxmumwKxY+xh0dfbCwB/A5hH0DsvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAyLTAxVDA0OjExOjE1KzAwOjAwiHfJQwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMi0wMVQwNDoxMToxNyswMDowMG61YNYAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "18",
          x265: "18",
          h265: "18",
          mpeg2: "4",
          mpeg4: "17",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          hddvd: "2",
          other: "11"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hds: "1",
          chd: "2",
          mysilu: "3",
          wiki: "4",
          other: "5",
          ptmsg: "6"
        }
      }
    },
    PTN: {
      url: "https://piratethenet.org",
      host: "piratethenet.org",
      siteType: "PTN",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBR0NCTVvZ8yaAAAB3UlEQVQozwXBT0hTcQDA8e977/c298I5Xchaf9S1ZRNLttmhltUQnSc9VAgFUWAgCzrYTYnOEZ0G0T/IiKi0Dv0jughJ64/YQB0q2imTwjmI2h/3tvden4/Ui4Tpczyt/qgkpA2wACvguFet+Zz4k65F2YuOc3L0qK8t5Si9U5GxUB+N9BzZlW7SH1vIZkSbMmIGBQobClV7RZQp5coUcMci72vahOvBlQN5DKYrZWXHhLejov/8lMumiDNmr/SOJUWRv2T5gqkOXztDAzor7ffZ4Dm96FSRghHn6NYvQxu60MUKIVoBuMTLu/UuWXy/Kvn5x3Y6pjpj8+xhkRH2s4Bg6M7SMICQcOPyqJ3zJGhimoc0YqIS6F6yoYNoxGRLRQEJCQkLExkLVBQnJYSGTHYtvxwN36KZDJcJMoediRl3ycsySnMzSfngWulQ6DQmZwmj0cIN5t+2nNL6N9PSwMeL0RyzZkEOc45aTFa5TRGVHnSuvxDC78GBTx43bz6ZbN0XqBiZb/n1k+fjKFSx7WbnYM/igJmyxq32USE5PLZGFyeSb6xXVp9x7GtdVKw/K74+vmD31SP7hcVvmRqkUB0Gmx9mu7EQKHgH+1djM9uCoGEHGrr6MvGM6zDAf9rgrjhkXWjnAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTI5VDEzOjA5OjUzKzAwOjAwiaGjGgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0yOVQxMzowOTo1MyswMDowMPj8G6YAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      description: {
        selector: "#descr"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      }
    },
    PTP: {
      url: "https://passthepopcorn.me",
      host: "passthepopcorn.me",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAAACAgIEBAQDAwMBAQF7e3u+vr56enoXFxecnJy6urpSUlIuLi6vr6+xsbH///+wsLAhISHg4OB2dnZCQkL8/Px6fHy8vr95ensWFhebm528vL1UVFQuLS6xr7C9vbydnJsXFxZ7e3q/v718fHsXDAoiFQ8gGQ4eHAwfHw4LCwYIDQgQGw8PGxMPHBYNHBkHDg0GCAoOFx0MEBgODxgSDxoOChIDAQGcSj7oh1zgrVng0VrU2lk6Ohc4WzB2x29auXpZv5Fc0rcpY1gXKDVYl8Vae7ZYYqhwXKxZPnYBAQKxVkj/nWv/yWf+8Wj1+WhDQxtAaTiI5oFp145n3alr89Qwc2YaLj1mr+RojtJmcsODa8hoSIkCAQOxVEf/mmn/xWX+7Wbx92ZBQho/ZzeG4X5n04tm2aVp7tAvcGQaLTxkrN9mi85kb7+AacRmR4YCAQJn073lAAAAAWJLR0QPGLoA2QAAAAd0SU1FB+UEDAMAJuVAAk0AAAC+SURBVBjTY2BgZGJkYGZiYWFmZmFhYgZzGRhZ2dg5OLm4eXh5ebi5ODnY2ViBivj4BQSF+IVFREVFhPmFBAX4+YDKxcQlJKWkZWTl5GRl5BUUlZRVgPpV1dQ1NLW0dXT19A0MjYxNTM0YGMwtLK2sbWzt7B0cnZxdXN3cPTy9GMy9fXz9/AMCg4JDQsPCIyKjomNiGczj4hMSk5JTUtPSMzKzsnNy8/IL6CiI1UnYHI/Vm1gDBHvQYQtkbNEBAFOfVLHCxSMQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjAwOjM4KzAwOjAw8nDEugAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzowMDozOCswMDowMIMtfAYAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          searchstr: "{imdb}"
        }
      },
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2-Disc Set": "2_disc_set",
          "2D/3D Edition": "2d_3d_edition",
          "2in1": "2_in_1",
          "3D": "3d",
          "3D Anaglyph": "3d_anaglyph",
          "3D Full SBS": "3d_full_sbs",
          "3D Half OU": "3d_half_ou",
          "3D Half SBS": "3d_half_sbs",
          "4K Remaster": "4k_remaster",
          "4K Restoration": "4k_restoration",
          "Director's Cut": "director_s_cut",
          "Dolby Atmos": "dolby_atmos",
          "Dolby Vision": "dolby_vision",
          "Dual Audio": "dual_audio",
          "English Dub": "english_dub",
          "Extended Cut": "extended_edition",
          "Extended Edition": "extended_edition",
          Extras: "extras",
          HDR10: "hdr10",
          "HDR10+": "hdr10_plus",
          "Masters of Cinema": "masters_of_cinema",
          Scene: "scene",
          "The Criterion Collection": "the_criterion_collection",
          "Theatrical Cut": "theatrical_cut",
          Trumpable: null,
          "Two-Disc Set": "two_disc_set",
          Remux: "remux",
          Rifftrax: "rifftrax",
          Uncut: "uncut",
          Unrated: "unrated",
          "Warner Archive Collection": "warner_archive_collection",
          "With Commentary": "with_commentary"
        }
      },
      description: {
        selector: "#release_desc"
      },
      poster: "#image",
      imdb: {
        selector: "#imdb"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      mediaInfo: {
        selector: "#Media_BDInfo"
      },
      screenshots: {
        selector: "#url_vimages"
      },
      category: {
        selector: "#categories",
        map: {
          movie: "Feature Film",
          tv: "Miniseries",
          tvPack: "Miniseries",
          documentary: "Feature Film",
          concert: "Live Performance"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "H.264",
          hevc: "H.265",
          x264: "x264",
          x265: "x265",
          h265: "H.265",
          mpeg2: "Other",
          mpeg4: "H.264",
          vc1: "Other",
          xvid: "XviD",
          DVD5: "DVD5",
          DVD9: "DVD9",
          BD100: "BD100",
          BD66: "BD66",
          BD50: "BD50",
          BD25: "BD25"
        }
      },
      source: {
        selector: "#source",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          hdtv: "HDTV",
          dvd: "DVD",
          web: "WEB",
          vhs: "VHS",
          hddvd: "HD-DVD"
        }
      },
      resolution: {
        selector: "#resolution",
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p",
          NTSC: "NTSC",
          PAL: "PAL",
          other: "Other"
        }
      }
    },
    PTSBAO: {
      url: "https://ptsbao.club",
      host: "ptsbao.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBiwfoNR83AAABVJJREFUOMtNlVtsVNcVhr+99zlnPL6Mz4wBu1zsEpvB9hjHxLeYEFzapDWkTqNEFFoUhHGLlD60VZuXoEhVeKFBVQtRE1tIEEIkEqnKQxrJiSBxXCfFTl1gggHjxJdxgrGxPXicsWcyMz5n9wFSsaRf618vS1r/w7cE91VzczM9PT3U19V5f/u731fl+fIeUUptKihYscqb7SWVSs0sxuODExMT/z5+7G9Xr1wZTG7fvp2enp7/7xDfmf1t+zn9+mnZ0dlZEwqF2sZGR1r6L/SuXYjFPKsKi0TLzieprtmstdapdDp18040+kE4HH79V+3t4fb2dvfkyZMAKIDW1lbGxyPW8Vde2V39YM1fp6du/fTNU52Bm5EvjcTigpj8OsKVK2GC5ZVizbpiw/JYAZ8vv2HNmjWPtrS0xN46e3a4vr7eGR4eRkkpSCaTxuHDh39ZWlp21OPxPHCu65+M3Bgky+NBKYllmiQTi5iWh811DUghMQwDr9e70h/wb6kKVd3u7Oy4Fo/HXek4Li8cOtRYXFzyojKMIq01y5kUUgo0gAaNRklJOpXCdVw0kEgsMTs7g6t1UUWo8sWXXz7aqLXG2LNnT/6vDx48aJhmGYAQgtCmGsL/7SeTSSGlBC2wPB6qqmtACPo+7eW9d99h9vYU+XaAx36ys2xDsPzg/ra2q+q5536ztbik5A/KUD4lFUIICotWk52TzfTUTRKJJbTrUlPbSOvTu7kxdI1Xjx1lejKCk0kRuzPH4OeXWVlYtKKiMjSg2g4c2Gf7/Ts0Ws3OzjA9NYWQgtCmzVRVb0YAyxmHZ36xj5xcH2+c7GDq5jhZHg9S3c3SWc6glOktr6yKGF6vd2MymTDOf9DFQP8nfJtM4rNtHt7SzPbHfsyuvQeIzt7GX7CS3o8/5PrgZSzTQKMRWqCFRgiBZZlGbp5vo9r77LP7Lg70l5977x20k8aQkEouMXzjKuHLF8nJ8VG2IYgUgnQ6xVJ8gfk7UZzlZQBc7ZLl9fLEz3aJVYXfGzeWFhe/GR2+rpVCGEoBYBgGytAsLUQRaKRUfDURoXTDRsorDnFpoI8Lvd3Mzc3g8+Xzgx+10NC0VX81MRE3ksnkDa83KwPC0mgEAq01rutS17iV2vqHCYcvcqrz75SsL2VH61M0bNlGXeMjJBNLZOfkkJuXTzqdzsRisSG1bVuzLF637vGJyEh+MpFAa43WLqvXFvP07n0IKXn7zVNEZyaZm5lm4LM+5mMLVISqsf0BTNPCdV0SS0uTAwP/Oa5S6dSdlpadpcHy0EOgRW5uHpVVD/LEUz9n9boSPu3tpv+TbkxTYRgKoV3GRoaxAysoLQuitcZxHH1r6tY/Ol597Q3j/PkP438+cuTEtubmLbv2BkNojWlZgCCVThEZ/RKhXQQKNEgpka7D6BdDZB7fgZSC+Dfxoc/6+k90d38UN0xDAVx6raPjpfKKir+YllXspjMoKVFKYdt+EKC1BiFA383Ztv33Tk1OhMOX//T883+8NHDho7u0CQaD+syZM1/U1dWN2fl2mWEYhYAUUmLbfr4eH2MhNo/WLhpN8fcfYMeTz7iO41zr77vw0tnTJ97/4aONyjQNRwFEo1EJeN/v6pqem5sbzMvNdbKysvxKqux82zY2VoTI8+Vh2wEqKjfxUEMT42Oj4lzXu4nI6FAwELB3aa0LhBDXvwOsCRQA+YAFZNfW1q5tamrasH79+hJ/IOCzLIvYfHR5+tZkcnxsJL24MO9YHsu1THPZMNS3Qoh/CSE+Fvd9AOOeFCDvI/r9swss3+vOPS0fO/KC/vzqMFpr/gfBWD3aoENSLwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNjo0NDozMSswMDowMERVxOEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDY6NDQ6MzErMDA6MDA1CHxdAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(7)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: "#small_descr"
      },
      description: {
        selector: "textarea[tabindex]"
      },
      imdb: {
        selector: 'input[name="imdburl"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_subtitle: 'input[type="checkbox"][name="zz"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "0"
        }
      },
      source: {
        selector: "#medium_sel",
        map: {
          uhdbluray: "10",
          bluray: "1",
          hdtv: "5",
          dvd: "3",
          web: "2",
          vhs: "9",
          hddvd: "9"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          x264: "1",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "5",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: "#audiocodec_sel",
        map: {
          aac: "6",
          ac3: "11",
          dd: "10",
          "dd+": "10",
          dts: "3",
          truehd: "9",
          lpcm: "12",
          dtshdma: "8",
          atmos: "8",
          dtsx: "13",
          flac: "1"
        }
      },
      videoType: {
        selector: "#processing_sel",
        map: {
          uhdbluray: "5",
          bluray: "5",
          remux: "1",
          encode: "2",
          web: "2",
          hdtv: "3",
          dvd: "3",
          dvdrip: "3",
          other: "3"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "5",
            "92"
          ],
          "1080p": [
            "1",
            "3"
          ],
          "1080i": "1",
          "720p": [
            "2",
            "91"
          ],
          "576p": "3",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          ffansbd: "8",
          ops: "11",
          ffansweb: "12",
          ffanstv: "13",
          hqc: "10",
          ttg: "3",
          hdc: "6",
          chd: "2",
          hdsky: "9",
          cmct: "4",
          frds: "5",
          other: "7",
          ffansdvd: "14",
          fhdmv: "15",
          enichi: "16"
        }
      }
    },
    PTer: {
      url: "https://pterclub.com",
      host: "pterclub.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACu1BMVEUAAAD////Cl3f/sZv/88f/NgD/z6j/VAD/AAD/++v/NwCGe33/rGgAAAX/6dgABBr/zqgTL1vxCACLblsAAAwAEzYAAgiZgmoCAwX9AAAFBAb7q3IEAAADAgL217wFAAD//////////////f///f////9IPkDRiEj/mTr/lTr/lTr9mz3InGrZlFv9tXP/3r0AAAAkGh27YRL7gBBsUTKpVBb/exP/j0D/xJIAAAE5KiX1ewT5eQLpfhxhSzbOagv/lU3/7dkAAAArIBqFUSWNUh9+TCOtXxv5fgy0aimFTh6OUh6NWzJROCbneA3/gCf/yp0EAAABAAIAABQAABUNDB2YVhz7hiDCpYoAAAAAABIAAAsTFBmlXRv/fBX/vYQbGB+4ZRb/iCT/+eUBDx6PVSH/fhz/wowAAAAwJyP0jjnTuKXvx6kABUtfOybTcBP/hTD/1K0AAAJONCH8fwaPXCikcUz/unz/rnPpjT/dcg7/cQn/lUf///8AABVqQSL5gQ1iSCy1XhL/eAr+cgr+dgf+fSb/zKQAChyFTyHndw9bQi/TbwvrdgrrfC77rXUUFhumXBrFbhBhQCy8bByuYRWxYhiuYBunXh+OXDSai38AAAAsIB+kXQ9dRzqogmIjHRstKCgOFyoAAyAAAAk9KyPShTM1O0gAAAtWOSP+nksAAwxxRyPtcxv7pmwDAgNALB5zRyZnPh2WYzz82LoEAAABAAEAAAUAAAP/dwD/dAH/cwH/cgDTdRX2fAT+eAD/eAD+dwD4eAP0ewX2egT/eQD/bwb9ewH/egD/dAD/fQD/dgD+fgH/dQD/fAD/cwD+fgPUcRP+cwP/ewDpdgr+ewLzeQX+fAD+eQD9bwP7fQT/fwD/fQH+fQT0ewb/fgHBZxP/fgLYcRD/egfufAv+dgznew3ndwb///9+450wAAAAuXRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkNDA4HASCOq6ipq2FhZxcCh/r8yuT4vjQVtf7+99b3tRYnq8fCyvH70sLBpNv981gIHBsXafLnTRYYH6n1/HOC/NEhafX3Xw+pui4IB5D+zSYdxv7PwHBdj+36egIw3P3c8Pf2/LIaUO773Pfrlx9y+/Tj9e3hyJdGBwOR87dgNikaBw+xuyEkz4ZA6PVdQ6WmqX0YBw0LDAI5k3AAAAABYktHRAH/Ai3eAAAAB3RJTUUH5QQKBzAvYbh7GgAAAUJJREFUGNNjYMAGGBkVFJWgQFlFlZERJMikpq6hqQUGmto6unr6zCwMDAaGRjt37dq9e/euXXuMTUzNzC1YGRksrfbus7bZf+DgocNHbO3sjx5zcGRjcHJ2cXVzP37Uw9PL28fX78RJ/wB2hsCg4JDQsFOnwyMio6JjYs+cjYvnANllkJB47nxSMicDQ0rqhbNp6VwgwYzMi+cuZWXncOfm5V8+X1DIAxTjLSq+cqKktKy8orLq6oHqmlo+oCB/Xf21Aw2NTc0trddv3GxrFwDpFuzovHW0q7vn9p2793r7+oXAfmKYMPH+uUmTp0ydNn3GzFnCYCGR2XMenHs4d978BQsXLRaFhojYkqWPTjxetlycESmYJFasfHLi6SpJZDEGqdVrnj1fu04aWUxGdv2GjZs2b5FDEZTfum37jtkMBAEAezt4kKiqYGgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDg6NDYrMDA6MDBMncp9AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ4OjQ2KzAwOjAwPcBywQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: "#guoyu",
        diy: "#diy",
        cantonese_audio: "#yueyu",
        chinese_subtitle: "#zhongzi"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "404",
          tvPack: "404",
          documentary: "402",
          concert: "406",
          sport: "407",
          cartoon: "403",
          variety: "405",
          music: "406"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "6",
          web: "5",
          hdtv: "4",
          dvd: "7",
          dvdrip: "7",
          other: "15"
        }
      },
      area: {
        selector: 'select[name="team_sel"]',
        map: {
          CN: "1",
          US: "4",
          EU: "4",
          HK: "2",
          TW: "3",
          JP: "6",
          KR: "5",
          IND: "7",
          OT: "8"
        }
      }
    },
    PrivateHD: {
      url: "https://privatehd.to",
      host: "privatehd.to",
      siteType: "AvistaZ",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACDVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAQFGPyRwZTsXFQxVTS1nXTYpJRVwZTp5bT93az52aj51aj14bD9NRSgEAwIhHQ7FrlbUvF4rJhMDAwGfjUblymWPfj7RuV3jyWXiyGPgxmPfxmLLtFktJxM1LRDWt0HRskAqJA2chTDmxUaskzTPsD/Ss0B/bipwYSZ5aCnHqj7YuUJCORQ0LAzUsTDPri82LQwMCgIODAISDwOfhSTivjSojSbMqy/CoywcFwYPDQOxlSjYtTFCNw80KwnQrCbXsSe5mSGxkh+ykx/NqiXbtSiliR7JpiTAnyMbFwUPDQKwkiDWsSdBNgw0KgfQqhzYsB3Bnhu7mRq8mhrbsx6lhxbJpBvAnRobFgMQDQKxkRjXsB1CNgk1KgXVrBTSqRM8MAYSDwIVEQIYFAKigg/kuBWqiRDOphPEnhIcFgIQDQGzkBDarxRDNgY1KgPZrQzTqQwrIgIDAwCefgnpug2uiwnRpwvUqgyAZgZwWQV5YAXKoQvbrwxDNgMiGwHKoAXZrAUsIwEEAwCigATquQaSdATWqQXouAXntwbltQbltQXRpQUuJAECAQBJOQB0WwEYEgBYRQBrVAErIgBzWwB9YwF7YQF6YAF8YQFQPwD///9sRWxwAAAAE3RSTlMAD2jG8P0cpvgOpWf292nCxe3vW6icJgAAAAFiS0dErrlrk6cAAAAHdElNRQflBR0MDgqXgh1XAAABKUlEQVQY02NgYGBkYmZhFYYCVhZmJkYGIGBj5xBGARzsbAwMnFzCGICdk4GbB1OYl4+BXxgLEGAQxCYsxMAqIiomLiwsIiEpJS0jKycvL6egqMTKIKysoqomLKyuoamlraOrp6+vp2dgKMwgbGRsYgoUNjO3sLSytrGxsbWzdwAKOzo5u7i6uXt4enn7+ALN9fMPCAQKBwWHhIaFh0dERkXHxAKF4+ITEoHCSckpqWlp6ckZmVnZOUDh3Lz8AqBwYVFxSWlZeUVlVXVNLVC4rr6hESjc1NzSKizc1t7R2dXd09vb29c/YSJQeNLkKVOFhadNnzFz1uw5c+fNmztv/gJhBtaFixYvERZeuHTZ8hUrV60GgjVrp7Hi8jyOoMIRsDiiAUekYY9iAOujViqpcnSrAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTI5VDEyOjE0OjEwKzAwOjAw1eU6iAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0yOVQxMjoxNDoxMCswMDowMKS4gjQAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "#content-area .block:last table:first>tbody>tr:nth-child(3)",
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        params: {
          search: "{name}",
          in: "1",
          order: "size",
          sort: "desc"
        }
      }
    },
    PuTao: {
      url: "https://pt.sjtu.edu.cn",
      host: "sjtu.edu.cn",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      seedDomSelector: "h1~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "401",
            "402",
            "403"
          ],
          tv: [
            "407",
            "408",
            "409",
            "410"
          ],
          tvPack: [
            "407",
            "408",
            "409",
            "410"
          ],
          documentary: "406",
          concert: "427",
          cartoon: "431",
          app: "434",
          sport: "432",
          music: [
            "420",
            "421",
            "422"
          ],
          variety: [
            "411",
            "412",
            "413",
            "414"
          ]
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "1",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "9",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "11",
          hdtv: "5",
          dvd: "6",
          dvdrip: "7",
          hddvd: "2",
          other: "4"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        map: {
          CN: [
            "401",
            "409",
            "411",
            "420"
          ],
          US: [
            "402",
            "410",
            "413",
            "422"
          ],
          EU: [
            "402",
            "410",
            "413",
            "422"
          ],
          HK: [
            "403",
            "407",
            "412",
            "420"
          ],
          TW: [
            "403",
            "407",
            "412",
            "420"
          ],
          JP: [
            "403",
            "408",
            "414",
            "421"
          ],
          KR: [
            "403",
            "408",
            "414",
            "421"
          ]
        }
      }
    },
    R3SUB: {
      url: "https://r3sub.com",
      host: "r3sub.com",
      siteType: "subtitles",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAEaklEQVR4nNWUe0zTVxTHf8zxcsOxyYQsLr6yzL2dj8w5kKnJfEyBgW+GmsmyCFkFUbQRBEqhlVrqWqGAkE6KOGq1pKniBItO0XYWeSjSIqwFaSn0Vyi1QOXR7/Ij6lDm/t9Jbs4v9+Z+fufc7zmHIP5Xlp+f787lcr2PHj3qIxaLp1GrvLzcRyaT+VZWVk6Xy+V+IpHIV6PRTJVIJFP+E5aSkvKKTCbdcKroVGZ+zsmzguM5ZXz+cWaO4JfDJwuKzkjK5PdLiqX6I8nJZQpF+QoAvgCmPAG7PQeTSCTeKpVqpcFgqbdYrNZeq/VRT0+P3WK1dnX39nX2WCz9pMUKkuzDX23t/SXic6qkQ8l5WUzmJutg57sAPKiA/klVInlDqayJaTf04kUbnbQDaJtboVFrbJLSshvpaRmJAPwBeI9DAXhy2Qc/yTy8WyQtznusvCCD8pIcN6ov435dPR5c08CoNWDAPjgJfLexGeyM7Pr8XN5ak8n0tsvl8iSuX69am0HfnLRtlfdwxFduoNamYC/s+vYdHNmxHFcSaFCXnkdXh3kc4gIw8gTocIzgqlLdF0+jFcvPnVtos9neIg7s+vxW3NY52h++IbA5iMCmQALhSwl894U7YjYuxv3bWjyyDWNk1IUx6glcGPdjFBlAv20AVZVqR1ryocKcHM4SYueG90xRawJsUV8TiFpJIHIFgfULCER8ORXZjHj02weepUgxxib4p9bf7wBfIDTnFxZuJfb9uDY9NjKwcMf6uW2hyzxc4csIxGz+GAXZSWhqrHt29SnI9YJgAyOAyeIAM4P9iM/n76ZE8a+6plmYsHcPI2TFvKuhwQG69KS9vbfv6CYGMcmGR4EmnWFEUXWrT35Z/SBx//4LubmCCKKjo8MbwOsPSXLmzZt/BhcIhTuYmcfExb/JzYZuO3oHBjHodMI55HQNDjldducQuu1DUNfrwWLxTBFh686yWBmxUqk0rKamZsl4h9y7d8+DJMlpbW1mf5PJNEskOh2WemBn2aHoRWClxoLDYQ9ncQW9Wcf4PdkcpjOT/j22rJ6HjesW3+Bx+bSKiorVKpVqUXNz8+zxwgbgRrWRXq/3AuAlEolXlRyLkV7JXo1yRhBo25eT0dHRp9MZqbykPSEPlbz1yIv9APRdgbeyeMKfamtrFzU1Nc1qb29/c1I/U16mUCyQFzEEF7jbH4sTl2JfZNDthARavKjgRGQabWN1BSdkTBgXBMbPYZeERb9u02q1841Go191dbXXvw4Ko9Hud74kL5xzMKo0LWbd76zkOHbJmTOhcvnFVTz2EfoJ+hYFPXrDxZSDsanKP5TBer1+NgCfl04g6gDAaw4HAvRGy/zGRu2ndXV1H+l0urkkSc40dA3NaTGYPrxz9+5nDQ0N77e2ts5oaWnxfG5AvGDUm7pTQnV1dc0wm83+drvdT6/X+1osFp/Ozs7pT/epVI1G41SCIF4Ke04oqgKov1MewKtU9NQ3VW6UiBqNxn1iqn8DP4ZZROQMmnUAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/movie.php",
        params: {
          id: "{imdb}"
        }
      }
    },
    RED: {
      url: "https://redacted.ch",
      host: "redacted.ch",
      siteType: "gazelle",
      icon: "data:image/png;base64,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CaSQOILvX1UNa/D9wHRgZ2pqWlFWVrY1eJNo9J5EIiEjGh26KCLVwKlhk8E0Ev88bYDJg6LfSeIITnmCWU2xbDuH9Tctn7sthg3gX0VnSK9SS2AvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTEwLTI2VDA4OjU5OjEyKzAwOjAwW1pMhQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0xMC0yNlQwODo1OToxMiswMDowMCoH9DkAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMTAtMjZUMDg6NTk6MTIrMDA6MDB9EtXmAAAAE3RFWHRkYzpmb3JtYXQAaW1hZ2UvcG5n/7kbPgAAABV0RVh0cGhvdG9zaG9wOkNvbG9yTW9kZQAzVgKzQAAAACZ0RVh0cGhvdG9zaG9wOklDQ1Byb2ZpbGUAc1JHQiBJRUM2MTk2Ni0yLjEcL2wLAAAAEHRFWHR4bXA6Q29sb3JTcGFjZQAxBQ7I0QAAACh0RVh0eG1wOkNyZWF0ZURhdGUAMjAxNi0xMS0yNFQwMzozMjoxNS0wNTowMCzxTqAAAAAudEVYdHhtcDpDcmVhdG9yVG9vbABBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaClYcSB0AAAAKnRFWHR4bXA6TWV0YWRhdGFEYXRlADIwMTYtMTEtMjRUMDQ6NDE6MzgtMDU6MDA4Ju9CAAAAKHRFWHR4bXA6TW9kaWZ5RGF0ZQAyMDE2LTExLTI0VDA0OjQxOjM4LTA1OjAwBIK8/AAAABZ0RVh0eG1wOlBpeGVsWERpbWVuc2lvbgAzMl01lwMAAAAWdEVYdHhtcDpQaXhlbFlEaW1lbnNpb24AMzKAo06GAAAAPnRFWHR4bXBNTTpEZXJpdmVkRnJvbQB4bXAuZGlkOmI1ZGM1Mjk4LTViZDEtNDI2ZS1hODE5LTZmZmM4OTA0ZmJhOThL8L8AAAA9dEVYdHhtcE1NOkRvY3VtZW50SUQAeG1wLmRpZDpiNWRjNTI5OC01YmQxLTQyNmUtYTgxOS02ZmZjODkwNGZiYTkCKwxvAAAAPXRFWHR4bXBNTTpJbnN0YW5jZUlEAHhtcC5paWQ6Mjc3NjNmZDAtYmM5Yi00N2FjLWFjNWItNzAxMGU0ZGE5NGY4ZKHHGQAAAEV0RVh0eG1wTU06T3JpZ2luYWxEb2N1bWVudElEAHhtcC5kaWQ6YjVkYzUyOTgtNWJkMS00MjZlLWE4MTktNmZmYzg5MDRmYmE5DvZinAAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{name}"
        }
      }
    },
    RedLeaves: {
      url: "https://leaves.red",
      host: "leaves.red",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="pt_gen"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: "#leaves-tag5",
        diy: "#leaves-tag4",
        cantonese_audio: "#leaves-tag18",
        chinese_subtitle: "#leaves-tag6",
        HDR: "#leaves-tag7",
        DolbyVision: "#leaves-tag17"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: [
            "402",
            "403"
          ],
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          music: [
            "406",
            "408",
            "409"
          ]
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "1",
          x265: "10",
          h265: "10",
          mpeg2: "5",
          mpeg4: "4",
          vc1: "2",
          xvid: "3",
          dvd: "5"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel[5]"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "8",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "6"
        }
      },
      area: {
        selector: 'select[name="processing_sel[5]"]',
        map: {
          CN: "2",
          US: "3",
          EU: "3",
          HK: "1",
          TW: "1",
          JP: "4",
          KR: "5",
          IND: "6",
          OT: "6"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel[5]"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      }
    },
    SC: {
      url: "https://secret-cinema.pw",
      host: "secret-cinema.pw",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAAAAAAgK5ejAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBw0KAxGGHdK7AAAAuklEQVQoz2MUY8AHmBhGpbEAFgYGBgaGjZwYEt/9EdIauHQzijEwMDBwMWJI/P+G0P2NgYGBgaFM6lkXg2w6z5Iz2JzW8qjgYgZDw4aCGBM0pzEwMDAwPLE4upPB/eYZhgKEGDM3nHnmf1ziZ8GPVzA9xsDAwMBgsnMnw9zpAQwMsgyPsei2SxHwur/JT082+cAnVI9BgKz1nTMMDCYqK9D9TSBQS9kwJH51I3TfxKJRnQjDB3Fioqk0ADLEKO5/ENcdAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA3LTEzVDEwOjAzOjE3KzAwOjAwgNGSrQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNy0xM1QxMDowMzoxNyswMDowMPGMKhEAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          searchsubmit: 1,
          filter_cat: 1,
          groupname: "{name}",
          cataloguenumber: "{imdb}",
          order_by: "size",
          order_way: "desc",
          tags_type: 0
        }
      }
    },
    SSD: {
      url: "https://springsunday.net",
      host: "springsunday.net",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBjAw7XIc2AAAA6pJREFUOMt11F+o33UdBvDX8/19f2dtMk87W42tieco889GgQtBAhllobmzLBsUEiyoLrLQiXgT5J0RQU23izQk6sLdhYbbWTIxhtnUvCiqZcPtKDQw286O4M7Ozu/8vu8ufktc4Ac+F++L53m/P5/neT/xf2dyer+mu6jS26o8KD6PFn/Bz+kdZngXBspvZ2ceuAzf+2Cx5SeLlmdfIc2NeCIxGfl15PnwcXyTWod7IvN0L05cv9O5E4ff52g/SHjh6OOkWUX9AFeV3KOGf9T0kSfV8N6oH2IcR6pb1vRWXDbh+4Qbd/1CFhZUsoX6AmbIv6V3vepgWfKsqlvx5f/hOlw9vV/DyqiL7dT0Pui7cGGr5FNRnyg+ivmob0vGVbUYo0LWU+epzzW9Fad1y39vGFJfwb4WG1R3L7Ub8ziiakyyXpo9iQXSqmqLldSakk34ZLidejCsVs6WeqJV3U+jdqnqV/IC3gxV3F7V7SrNgWb+tXe7j91m9und8K+p6f1/HV4xcbh3/uwq1W2P+hF1JT6SqR17z6ZqAio5iT+HncqYOF+8FHmG/L6a5mRqODh1cA+YuvMxMkTuwEPK9zO1Y++BlK+KMdSlG0QVyUgQ3iIvFM/hb2ROvNsOx5eWm3N9ZRKnexOb7/hDcUasCVegjwaRS48f1RPi02FnuHskQt3WZXELhnhdaiFTd+51aY71uAGTiU3YhA1Ghl6L1UYNV6ItJYWkMFfM4MctvpR4+5ajD7x6bPu+t5tmg/rPa6zb2KSMYVWpcbI16roamXp9uFZsHTWttal8Q2xs8F08/vL2R29Ou0p1p2+xdsNkStcNlxa7qrnZQ3tmpXmp0hzHJDVZnKJ5uDihKBXc0ER1KTdF/crye9+h7qO+FgNp+t6cGSmq6Z0zWPgdnsK28HUsYV4iyXzJky164gzey2iH1xSTpf1nkreumX5svrioGyynv3IFOVk1PI5t1OawDs+RXybts20lr5AD0syouga3Rm3GDioli7igXBRXUiewiKERdqbkH3n96LwbP6uV3iM0y1Fder25Gg52UDeVHJFmP915NbJRsaxyVfhecVzVq3hn9tD9o2954zfa2YP3LcG1O/dJk9Swrq6yTWpjqlNpHu0P5s4MxtaIrKbbXUzgYcOld9J+SHxV1WhHiHhaeapSD6nhZwb98WOpbqm4GdfhEZpn9FY4dfD+DyPEcFglz1NvJHWs5AS+hS/WKML+RH4mXqQbzB66PP7hvxsRnTJglc+dAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjQ4OjQ4KzAwOjAwwTRopQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjo0ODo0OCswMDowMLBp0BkAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(6)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: "#small_descr"
      },
      description: {
        selector: "#descr"
      },
      poster: "#url_poster",
      imdb: {
        selector: "#url"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      mediaInfo: {
        selector: "#Media_BDInfo"
      },
      screenshots: {
        selector: "#url_vimages"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "501",
          tv: "502",
          tvPack: "502",
          documentary: "503",
          concert: "507",
          sport: "506",
          cartoon: "504",
          variety: "505",
          music: "508"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "2",
          hevc: "1",
          x264: "2",
          x265: "1",
          h265: "1",
          mpeg2: "4",
          mpeg4: "2",
          vc1: "3",
          xvid: "",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "5",
          ac3: "4",
          dd: "4",
          "dd+": "4",
          flac: "7",
          dts: "3",
          truehd: "2",
          lpcm: "6",
          dtshdma: "1",
          atmos: "3",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "4",
          encode: "6",
          web: "7",
          hdtv: "5",
          dvd: "3",
          dvdrip: "10",
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      area: {
        selector: 'select[name="source_sel"]',
        map: {
          CN: "1",
          US: "9",
          EU: "9",
          HK: "2",
          TW: "2",
          JP: "10",
          KR: "10",
          OT: "3"
        }
      }
    },
    SoulVoice: {
      url: "https://pt.soulvoice.club",
      host: "soulvoice.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzEdsHQb2wAAA2FJREFUOMut1FuIn9UVBfDf/r7/TKPJSJLGJrWJJo1WMKLgpcSoEYn4oq21gihSCvpii29qC0ZpQSKooeCDLwUvoKDWgigqiBeiBjUVNCApasTMkIpJkwzKjLnM5Vs+/D+pUEtf3LBhwz5ns85eax2+56gtO7oaTVZggOnwVcqM8Mf17Xdeuv/VC9BRg5bueLFIGcH+wcxc5weD5ib8Cp9jomQHXtn6bvd55uP2fvB9r6zXNgNdNz9W1W4gl1JrlVX4JMmtg7GRJpIJah3OLUL9VnkrXbaU2r51R9eZ2iBtK9386mrqjh7AD1F97uy6HGok8B4+wzFM9AcuL/WXyJnD5RTplqr6M27EYvwLX+JIeHMwaOaapCQmsB2jaMg27MU5VXVDKo1mCWzskX2FN3AQJ2C3+EcXmgrV1LTksR7dydRp5DXsJOeLZRa+oNRGfIHnsABn4Wji8ag9Cc1tFzQIjdcj9/bE/Iy6XPJ+4k0MspQk40me7wddiFk8ikcamfvDprc0cNvPW2FO1cPkN3gI46p+Qh2iaUysX4R9qpbiKJ4Jvwt3ah2MDFf9bX3d9/asZF7TjIyoGitaVSvE2Pz0VVPlwOKq+siQySmdo4rbN739H2H/L8Vfc+uoE9f+3uTev5+0csWqJZt/MTmindlzeHrBlyvXHlALDn63U74prtt8CtLQnFJVF+E0HEmy/7jRbttDN9UynEctxwx2hndqduZQjl+oXb6boUS4fvMalbal+WVVPY2HcYs4A4cfearZU2U8jPRk3IWni78aGT275mZ1e1cPB163eY3R0U4ql1TVvTgXB/C88qOqusxkVeIE6ooMey9jHr/GPemcnKL7cPUQ4bGZZnGVm4dy8VmS7Tgbl2L3ow/oovYVh4urw6LIG5jGpuLa6tJY2D+5yrreBdNJ/l1Vl/Ra+zDx4ksfUDGNv+FIcXGp0zN000C5MuXEVAyaZiCZ24BlmKuqdf1X9s/En7pkVyEV1HPFqbgFa2uoRzhD1enY33SZXYjze+YmsQsPJm6UPNuU7qkt49qVEyTTSbYmbsaTvVUncRzOK626/q41Y4mNkhb7sa/PY09uGf8vnc3u/akobc2N4cdiObW8yj7mtw9YNlXlBcUTd7/r/8XIqk+/Kaf6/Pjb/a8BRYVt72oJuZAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDk6MjkrMDA6MDCTeNgtAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ5OjI5KzAwOjAw4iVgkQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      needDoubanBookInfo: true,
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406",
          variety: "403",
          music: "408"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "2",
          h265: "2",
          x264: "1",
          x265: "2",
          mpeg2: "5",
          mpeg4: "1",
          vc1: "5",
          xvid: "5"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "3",
          "1080p": "1",
          "1080i": "2",
          "720p": "4",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hds: "1",
          chd: "2",
          frds: "3",
          cmct: "4",
          other: "5"
        }
      }
    },
    SpeedApp: {
      url: "https://speedapp.io",
      host: "speedapp.io",
      siteType: "SpeedApp",
      icon: "data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABMLAAATCwAAAAAAAAAAAACdnZ0Ao6OjA01NTXwuLi7HAAAA8QAAAOsAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOsAAADyLCwsyU5OTnujo6MDnZ2dAJiYmAw2NjbLAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/zY2NsuYmJgMRkZGkAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0ZGRpARERHjAAAA/wAAAP8AAwT/AB4p/wAhK/8AHyn/AB8p/wAfKf8AHyn/AB8p/wAfKf8AHyj/ACQs/wARFv8AGiD/ACUu/wAeKP8AHyn/AB8p/wAfKf8AHyn/AB8p/wAfKf8AHyn/AB8o/wAiLP8AHCX/AAAA/wAAAP8AAAD/ERER4wAAAPAAAAD/AAAA/wAtNf8A2f//ANH//wDK//8Ayv//AMr//wDK//8Ayv//AMr//wDJ//8A2P//AKLM/wCkzf8A7f//AMf//wDJ//8Ayv//AMr//wDK//8Ayv//AMr//wDK//8Ayf//ANb//wDM/f8AHCX/AAAA/wAAAP8AAADwAgIC7QAAAP8AAAD/ADQ8/wDj//8A1v//AND//wDQ//8A0P//AND//wDQ//8A0P//AM///wDR//8A9///AG+M/wCXuP8A+P//AM3//wDQ//8A0P//AND//wDQ//8A0P//AND//wDP//8A2///ANb//wAiLf8AAAD/AAAA/wICAu0DAwPsAAAA/wAAAP8AMDf/ANX//wDK//8AxP//AMT//wDE//8AxP//AMT//wDE//8AxP//AO///wCbuP8AAAD/AAAA/wCv0/8A6///AMH//wDE//8AxP//AMT//wDE//8AxP//AMP//wDP//8Ayf//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwN/8A1v//AMv//wDF//8Axf//AMX//wDF//8Axf//AMf//wDX//8AgZn/AAAA/wAAAP8AAAD/AAUJ/wCVtP8A2P//AMb//wDF//8Axf//AMX//wDF//8AxP//AND//wDK//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ADA3/wDW//8Ay///AMX//wDF//8Axf//AMX//wDF//8Ayf//AN7//wA/Vv8AAAD/AAAA/wAAAP8AAAD/AFt1/wDj//8Ax///AMX//wDF//8Axf//AMX//wDE//8A0P//AMr//wAfKf8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDf/ANb//wDL//8Axf//AMX//wDF//8Axf//AMX//wDE//8Azv//AN///wBKYP8AAAD/AAAA/wBief8A4///AMn//wDE//8Axf//AMX//wDF//8Axf//AMT//wDQ//8Ayv//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwN/8A1v//AMv//wDF//8Axf//AMX//wDF//8Axf//AMX//wDB//8A1f//AOz//wA1Q/8AR1n/AO7//wDQ//8Awv//AMX//wDF//8Axf//AMX//wDF//8AxP//AND//wDK//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ADA3/wDW//8Ay///AMT//wDG//8Axv//AMT//wDF//8Axf//AMP//wDR//8Avef/AJ3J/wDW//8Az///AMH//wDF//8Axf//AMX//wDE//8Axv//AMb//wDD//8A0P//AMr//wAfKf8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDf/ANb//wDK//8Aw///ANz//wDf//8Ax///AML//wDD//8A1f//ALfg/wCCqP8Ax/P/ANL//wDC//8Axf//AMX//wDF//8Awv//AMn//wDg//8A2P//AMH//wDP//8Ayv//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wA1PP8A3///AMr//wDu//8AfJn/AGmA/wDr//8Ayf//ANL//wC34f8Agqj/AMPv/wDR//8Aw///AMX//wDF//8Axf//AMH//wDR//8A4v//AGB4/wCTtf8A7P//AM3//wDJ//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ACIo/wDA6v8A+///AJy3/wAAAP8AAAD/AHeN/wD8//8At+P/AIGn/wDD7/8A0f//AMP//wDF//8Axf//AMX//wDC//8A0P//AO///wBkev8AAAD/AAUH/wCv0/8A+P//AMf//wAeKP8AAAD/AAAA/wMDA+wBAQHsAAAA/wAAAP8AKjP/AKnO/wBsgv8AAAD/AAAA/wAAAP8AAAD/AFVi/wCgy/8AxO7/ANH//wDD//8Axf//AMX//wDF//8Awv//ANP//wDX+v8ARVj/AAAA/wAAAP8AAAD/AAAB/wCatP8A7P//ACMu/wAAAP8AAAD/AQEB7AAAAOwAAAD/AAAA/wA4Q/8A8///AGd+/wAAAP8AAAD/AAAA/wAAAP8AQ1j/ANv//wDS//8Awv//AMX//wDF//8Axf//AMP//wDR//8Ax+//AJ/L/wAwQf8AAAD/AAAA/wAAAP8AAAD/AG+I/wCoyf8AHiX/AAAA/wAAAP8AAADsAwMD7AAAAP8AAAD/AC02/wDa//8A+P//AICW/wAAAP8AAAD/AGR6/wDt//8Az///AML//wDF//8Axf//AMX//wDD//8A0f//AMLu/wCAp/8Avur/AO7//wBMYf8AAAD/AAAA/wCbuf8A9v//AKXQ/wAWHP8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDj/ANT//wDP//8A7///AGd9/wBTZ/8A6P//AND//wDB//8Axf//AMX//wDF//8Aw///ANH//wDD7/8Agaf/ALfg/wDR//8A1f//AN3//wBHWv8Afpv/AO7//wDR//8A1///ACIs/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwOP8A1v//AMn//wDH//8A2f//ANv//wDL//8Awv//AMX//wDF//8Axf//AML//wDS//8AxPH/AICn/wC24f8A1f//AMP//wDB//8Azv//ANz//wDY//8AxP//AM///wDJ//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ADA4/wDW//8Ay///AMT//wDI//8AyP//AMT//wDF//8Axf//AMX//wDB//8Az///ANj//wCeyP8At+P/ANL//wDD//8Axf//AMX//wDE//8Ayf//AMf//wDD//8A0P//AMr//wAfKf8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDj/ANb//wDL//8Axf//AMX//wDF//8Axf//AMX//wDF//8Awf//AND//wDt//8ARVj/AFVl/wD7//8Ayf//AMP//wDF//8Axf//AMX//wDF//8Axf//AMT//wDQ//8Ayv//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwOP8A1v//AMv//wDF//8Axf//AMX//wDF//8Axf//AMP//wDL//8A6f//AGJ5/wAAAP8AAAD/AHWL/wDr//8Ax///AMT//wDF//8Axf//AMX//wDF//8AxP//AND//wDK//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ADA4/wDW//8Ay///AMX//wDF//8Axf//AMX//wDF//8Ayf//ANz//wBNZf8AAAD/AAAA/wAAAP8AAAD/AGd//wDh//8Axv//AMX//wDF//8Axf//AMX//wDE//8A0P//AMr//wAfKf8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDj/ANb//wDL//8Axf//AMX//wDF//8Axf//AMX//wDI//8A2v//AGd8/wAAAP8AAAD/AAAA/wAAAP8Afpj/ANz//wDG//8Axf//AMX//wDF//8Axf//AMT//wDQ//8Ayv//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwOP8A1v//AMv//wDF//8Axf//AMX//wDF//8Axf//AMT//wDH//8A8P//AH6V/wAAAP8AAAD/AJe0/wDu//8Aw///AMT//wDF//8Axf//AMX//wDF//8AxP//AND//wDK//8AHyn/AAAA/wAAAP8DAwPsAwMD7QAAAP8AAAD/ADM7/wDd//8A0f//AMv//wDL//8Ay///AMv//wDL//8Ay///AMn//wDP//8A9///AGV+/wBogf8A/f//AMr//wDK//8Ay///AMv//wDL//8Ay///AMv//wDK//8A1v//ANH//wAhLP8AAAD/AAAA/wMDA+0AAADwAAAA/wAAAP8AMTn/AOf//wDe//8A1v//ANb//wDW//8A1v//ANb//wDW//8A1v//ANT//wDa//8A9P//AKTK/wC76P8A4f//ANb//wDW//8A1v//ANb//wDW//8A1v//ANX//wDj//8A2f//AB4o/wAAAP8AAAD/AAAA8AcHB+UAAAD/AAAA/wAHCf8AMTn/ADM6/wAwN/8AMDf/ADA3/wAwN/8AMDf/ADA3/wAwN/8AMDf/AC43/wA5QP8AKDL/ACAo/wA1Ov8ALzf/ADA3/wAwN/8AMDf/ADA3/wAwN/8ALzf/ADQ7/wAuNv8AAwT/AAAA/wAAAP8HBwflVVVVowAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/1VVVaOqqqobERER6gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8RERHqqqqqG6GhoQBeXl4dNzc3nA4ODuIAAADxAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAPENDQ3iNzc3nF5eXh2hoaEAgAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAE=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "div.row.d-sm-none + div + div",
      uploadPath: "/upload",
      needDoubanInfo: false,
      search: {
        path: "/browse",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          search_area: "{optionKey}",
          search: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      description: {
        selector: "#torrentDescription_releaseInfo"
      },
      imdb: {
        selector: "#url"
      },
      mediaInfo: {
        selector: "#torrentDescription_mediaInfo"
      },
      bdinfo: {
        selector: "#torrentDescription_bdInfo"
      },
      screenshots: {
        selector: "#torrentDescription_screenshots"
      }
    },
    SubHD: {
      url: "https://subhd.tv",
      host: "subhd.tv",
      siteType: "subtitles",
      category: [
        "subtitles"
      ],
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA5FBMVEUAie0Aie4AiO0Lje4wn/FBpvIsnfAIjO4mmvCo1vnb7vzc7vzc7/yd0fgcle8Fi+6j1PjR6ftNrPMzoPFktvTk8v2Py/cBie4Tke/V6/wHi+4Ahe0Bh+1etPRwvfUGjO4HjO6h0/j1+v5kt/QNj+4ble9/w/bJ5vvo9P3q9f3B4vpRrvMSke8PkO5lt/TP6PvY7Pwfl+8Ah+0om/C94PpQrfMAhu0AhO1suvUvnvEQkO+/4frM5/tMrPPF5Pu+4PoAiO44ovG84Prg8Pze7/y33fo1ofERkO82ovFFqfIPj+7///92Ih8bAAAAAXRSTlPpmTCCugAAAAFiS0dES2kLhVAAAAAHdElNRQflBgQEKCzi8yjzAAAAgUlEQVQI1xXK5xbBQBRF4TtHlAgG0YPoojMEiRYtyvs/kOvft9faRAIRLRqLQxAzoSeNVDrDAZnN5c1CsVQGoVLVa1a90bTZrXZH75o98CPQHwyd0Xjyf+RUzrT5YrlSpNYb19ru9o6nCP7h6Hqn88UHBbje7sbjGSIgjtf7E36ZP28ZDcGwKhEtAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA2LTA0VDA0OjQwOjQ0KzAwOjAwUjx2WwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNi0wNFQwNDo0MDo0NCswMDowMCNhzucAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search/{name}"
      }
    },
    TCCF: {
      url: "https://et8.org",
      host: "et8.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzILb439SQAABFZJREFUOMuV1MlvVVUcB/DvuecO597XN7Slw6ulLdQCEqcAQQZBIzEhLnRDjNFo4tqd/4BxZ3RhjAtNTIzGGAwKYnAgBEVaEgQBGxFf6SvQuX19452Hc+69LupAE2Lgm5ztJ998T/IjPX19qCwuYuSxvXTvtkc3M017RtGNrsB1T0yNX75U6O4Jvv7qS9xtZNdsgUnYKjK5g9eyfU91bnlkqE1W1eXRU4NVR3y0AuvHu9YAyMe/+yH/8TffH8r2D76SFDdunEGezDV5avJMf1QYupRk8vcGakzPFDeO7Bl8YOuwUrwflSszmLi5AGGLWEoldeXEB7kikI+BJAKScPXFCcABWADSNaAfBr5tNhuWaQrFaNHEMTlfmXXjxdI4cWYTaeeTzwZIN1ACoUskLFAaaVQKFQmNqNW4GNSry7KR4TcnSqvg6M9nrXPHjx/d/MTTvay9tKM6US7L1//8SY6DznD744eSLTsG3XwXzUpJmlcIiqqU9ioEGc+0fz/y6bd1x36fZdom/2343ttvxYHrnukc2TqXCUVHbFbohoF1L287+Nx2OrCpr0qY4VEVSBJIaYIMlVCgBKSpZfO9Q/sloh5WmDGJy7+ugrbrAkBj7MhnFw+99jr09f19iqq+sfvhB4fWD2+Sm14AJxLweQJPxFi0AqzUPYS1SAqDuC1OoBDx34zy7YNqjEEIAU1V074Mw3BWQ0sG3CiGGQoEIkG14WN+tgJvatJuVatjYbOyQjXjzmCrZYILkTBNdZyQCzuKZTuMYYUcC3YI0+eYr7qozi+kXulirTlb/nypPD6dK3TcGTQtC0KINNQ0x4+EcHkMlwu0QoFS3cGF8XnM3KjBr4ckpus7IV3f193dWZZY+7QsU9Rr1bWgbdvgnCdM112PC+FEAhU3wpwdIKfKyLQbiAhgOjEkqSOndu98EYQtRxNnj5GcsQwA9HYw19uPwPcNpOn+7Xv2bTLaO43ysoVz11eQzzCougqbx2hYIbgnJMisIFOyjrblWvWF8g2NIFrTMLQtRGGQSLEwzYBHVhijagX4rbQEYZu4b7AHxf4O1JwISwEHdyRCM/275IQ3ugdG5lLKzqxpaBgM3LVkinRwYNvuh8CMrkrDSf+4Nh01pkoWZQq0QlYGU0lLJIhtn4hEh5z4Xboch9RoP7UGlCQJbrMeS7K86Hn+UM20B5uNGmlcHb0a3LryYezWWaSwIjqLChSauj4nSSCgRi5TpGQGStvRNWDo+0iSNAWRXIXpkyEXl9xm7bS3NHPYny2Ncd+dSvW2Dp6SLVFuHfwUJDVdqK05W3OnzyP2T67Z8J/4thmXL4xN4MLYrb8/zgMA1Kt10tFryAnRY54eSFNdUv2ZGnUWTqZe5VhKlITi/xNj9UwBABgQN+duLOjZQkVlTNc1VmeL46fprV8+2XXw+dHzJ78AuZfjmc3lYJkm3nznXbXY29OTb8sMe54/8epLLywTQkApxV987U+PhqXfyQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo1MDoxMSswMDowMBODZaMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NTA6MTErMDA6MDBi3t0fAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "622",
          tv: "623",
          tvPack: "623",
          documentary: "404",
          concert: "626",
          sport: "627",
          cartoon: "627",
          variety: "627",
          app: "625",
          ebook: "629",
          magazine: "631",
          comics: "632",
          audioBook: "633",
          onlineCourse: "634"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "7",
          hevc: "8",
          x265: "6",
          h265: "8",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "4",
          dd: "4",
          "dd+": "4",
          flac: "1",
          dts: "3",
          truehd: "9",
          lpcm: "10",
          dtshdma: "8",
          atmos: "8",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          remux: "5",
          encode: "11",
          web: "9",
          hdtv: "6",
          dvd: "7",
          dvdrip: "4",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          torrentccf: "1",
          tccf: "1",
          tlf: "2",
          bmdru: "3",
          catedu: "4",
          madfox: "5",
          other: "7"
        }
      }
    },
    TJUPT: {
      url: "https://www.tjupt.org",
      host: "tjupt.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: "#external_url"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "411",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403",
          music: "406"
        }
      }
    },
    TLF: {
      url: "https://pt.eastgame.org",
      host: "eastgame.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzMtpJtJ9QAAArNJREFUOMuVk7+OHEUQh7+q7umZm929s2wJjCAhQESEPAIJgXMewvIrOPSDIJEREPAEZEiIiMTZSZjDt3vr3Z2d/93lYJa7PVsW65J6unvU9fXv19Ut3724dIuZY1E6Ls6UhwvhwcxxMRMezRyfzD2PSsUrNNFY70eW25F1PbJpI3Ub6YbEy8stv/1xhQd+BhCm+K83jkMO37u/drToeK0fkj0ZkxGTMSZjsCnfC6iAYUQz1CCmKVWdkB2aV8gUvAJi+H0TUTEEw1DUKcELmZtsqkybZQp9NKou0vSJYUikmEgpEWNkHEfiMOA3q46uVupSqUqlrh1VM7IsHRelcH4mzAPkqiSMbjTaPtH3I+2YGMbErh5YrmraTY1fX3dkORRnSlEI60KYlcq8cJS5UuSQe6Hwgvc2HYNBNANLiMLrVc3VPxu6N3t8W7fEHmIn9LnS50JfC22uFEHJg5BlQghCnkHmBe8EVRA1khnXr3esrt4QuxafYnyeEKKASCKijCI6kH6QJF+RFDMBBEGnWhsvMyc/iZCGMdE2PV3dYzHe3pLb+PbZ7wDO4Bfv+b4ISsgnpSEoIRO88qvBEyD++PSbe/n+XWAId3t4LxMog5AJwUN2sPuheA9Y5BPQbAKGI2WZV8wS3ZDet/YhYB6OgJmSH2BOYVe1rK53VNsWETkNKGKHHlKM1PuBbT/Q1B03y4r1akfX9Kcr/PfV9nacYqTvBup9S7VtqDY1cejvven/Bf7156ujWQKLmEVICWycHFg6HWgp3gMaCbEExAlkET5GIXoEFHBOcV4AJXYQ+4jFj1Ao7q7KIVfK85zZPGCSaHYN1bqia1vgxCq7oAfrUJ7nfP7FBY8/XeA83CwrLi9hdWO316Y7HWjM5jmfPV7w9ZcPKIPj70WgaRqarkd1Au7eyX8L7wlhtfLjAQYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NTE6NDUrMDA6MDBA7iTqAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjUxOjQ1KzAwOjAwMbOcVgAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "438",
          tv: "440",
          tvPack: "440",
          documentary: "443",
          cartoon: "442",
          sport: "444",
          concert: "445",
          variety: "441",
          music: "446"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          h265: "6",
          x264: "1",
          x265: "6",
          mpeg2: "4",
          mpeg4: "0",
          vc1: "2",
          xvid: "3"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "9",
          dd: "9",
          "dd+": "9",
          flac: "1",
          dts: "10",
          truehd: "14",
          lpcm: "12",
          dtshdma: "11",
          atmos: "13",
          dtsx: "10"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "4",
          hdtv: "5",
          dvd: "6",
          hddvd: "1",
          dvdrip: "6",
          other: "9"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      }
    },
    TMDB: {
      url: "https://www.themoviedb.org",
      host: "www.themoviedb.org",
      siteType: "tmdb",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA4VBMVEUDJUEDJUEDJUEDJUECJEABI0ACI0ACIz8CIj4QNUobRFQQOU8PPFIQQlkJOFINVHAHUnEDME0TOk0oVl8rY2wpanUjbHwWZXwhr8kQqc4ET3ARN0scRlUXRFYbUWMVTWIMQVsNU28IWnoDNlQBIj8oU1xHf3kxbHJGn54fZXYVWnALTGgIZocDQF8RNkstXmUlWmYoaHQSR10NQ1wIP1oGTm4DOVcfSFVvtZxmvKpVurM1kpsWYHcPXXgKbo8ESWoLL0YqWWIpX2kiXm0USl8LP1kIPFcFQmADNFIBIj7///8y4y3nAAAAA3RSTlOL8/J7NBHxAAAAAWJLR0RKHgy1xgAAAAd0SU1FB+UEDxE0CxaidT8AAAB5SURBVAjXY2BgZIYARgYGJhZWFjZ2Ng4OFiYGFk4ubh5ePn4BQRYGViFhEVExcQlJKQ4GNmkZWTl5BUUlZXYGFVU1dQ1NLW0dXXYGFj19A0MjYxNTM6C4uYWllbWNrZ09UNzB0cnZxdXN3YMFaL6Kiic7EADNR7IXAHnLC6fWgfiqAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjUyOjA5KzAwOjAwD2XHBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo1MjowOSswMDowMH44f7sAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search?query={name}"
      }
    },
    TTG: {
      url: "https://totheglory.im",
      host: "totheglory.im",
      siteType: "TTG",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5woaCC40liGC4QAAA+FJREFUOMttlEtTVEccxX+3+5K5wzyAASKPMaLRLCAp3fhKstG8voRV2eXb+CHMB4hJ9mZhrIpVwZTCiEYepgYYYAZl7ozcV7+yuDBClV3V1b06fc7/nNPenTt37n566dL5YjEYy7LEWuNwzmGtxVpLkiSE3ZA0TdFaY63FGIPWGmMMxhiUUhhjAPA/v7ww/82tby9OT03XtNbW4cABgBCC3d0dHv/1mNbODlppjM3BlFKD8/junMOvVivVs/X6xJkzU6N8YAVBQON5A7ErEEKAB9ZahBB4nvd+4+Gw+HEcJf13PV2r1fA8ge/7AGRZhtaKdmePbrdL2OthjiRrc3QeM8xyhtYZ/O7bLq9fr+OcpTY2zvj4JADd7lt2drZZX9/gXb+PFB5OCJxzOMcpuceSjTX4B297/PPkGe29N8zPz1OrTeB5kKQJ3bAHnmB+YQGjDc5ZrHO02x0ayw0ODw/JlMJoPTDMV0oRxzFRFJNl6mhyHpMTHzM8XEYrjZACj9wrKSRra6tsbjZptVqkaYZz9j1gHo88KidXsThMsTj8IZ8IwxCVKcKwh9IZzoEzFiFFDqhPUAZwOHq9kDTJCIKAarUKDrrhAb1ej/X1NYJiwKXPLiKlIEkS9vbavNl/g38ypAOWDl68XGF7a5uz9U+4evUaOFhuLPFkcZEsU9y4eYOz9TqlUolOp8ODB3/w26+/42utjyKiT0nf2+2wtrqBL4aO3rDs7+8zXC5xdf4Lrly+wtDQEEIIpqamaTabSClzyc45+v0+GxvrBEEBay2rq6uEvRDw8qh4sLAwD3jMTM9SKpUGeY2iiHeHh8RxnDME6Pf7rDxfodlsopSi2WwyMjKClDKvoSc4d+48vvSR0idNU1ZePGd5aZl2p83Ll/+SpmkOaIwhiRP6/T7xf/Hg1UKhAB6DahU+CoC8ent7O9y//wutnRblUoVyucz169dyU5RSeF4uTUqJ7/s45zDGcDwSz/MGsUmzlK2tLZ49fcr3P3zHrdu3CYIivbCXMzwGVFqdqlOSJERRRJZlSCmQ0kcIgZSScqXC9MwU9foss9N1yuUqZtYgL1y48GMQBGestcNpmp7qplKKg4MDXr16xaNHf6KNYmxslFKpTCEIqNVGmZwcZ3RkjFKpnKs7KfkkGOTONxoNlpaWiKKIza1NCoWAr778mtGRUa5fu0mcRARBcTAO3xgjtdae53mDxuSgZiA773rEw4ePqNVqlMsl5s6dp1yuUCpVMMbQ7rTZ3t5Czs3N/RQEwQRQHHxDJ9pzXEcpJd0wpLXdIo4iZmZnqFSqSF8SxxGLi39z7+d7/A+iMsWK5Inr3gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0xMC0yNlQwODo0Njo1MiswMDowMO+VxjIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMTAtMjZUMDg6NDY6NTIrMDA6MDCeyH6OAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTEwLTI2VDA4OjQ2OjUyKzAwOjAwyd1fUQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#main_table h1~table:first>tbody>tr:nth-child(2)",
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        replaceKey: [
          "tt",
          "imdb"
        ],
        params: {
          search_field: "{imdb}",
          sort: "5",
          type: "desc",
          c: "M"
        },
        result: {
          list: "#torrent_table>tbody>tr",
          url: '.name_left a[href*="/t/"]',
          name: '.name_left a[href*="/t/"] b',
          size: "td:nth-child(7)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="subtitle"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="imdb_c"]'
      },
      anonymous: {
        selector: 'select[name="anonymity"]',
        value: "yes"
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: [
            "51",
            "52",
            "53",
            "54",
            "108",
            "109"
          ],
          tv: [
            "69",
            "70",
            "73",
            "74",
            "75",
            "76"
          ],
          tvPack: [
            "87",
            "88",
            "99",
            "90"
          ],
          documentary: [
            "62",
            "63",
            "67"
          ],
          concert: "59",
          sport: "57",
          cartoon: "58",
          music: "83",
          variety: [
            "103",
            "60",
            "101"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "109"
          ],
          bluray: [
            "54",
            "109",
            "67"
          ],
          remux: [
            "53",
            "108",
            "63",
            "70",
            "75"
          ],
          encode: [
            "53",
            "63",
            "70",
            "75",
            "52",
            "62",
            "69",
            "76",
            "108"
          ],
          web: [
            "53",
            "62",
            "63",
            "70",
            "75",
            "52",
            "69",
            "76",
            "108",
            "87",
            "88",
            "99",
            "90"
          ],
          hdtv: [
            "53",
            "63",
            "70",
            "75",
            "52",
            "62",
            "69",
            "76",
            "108",
            "87",
            "88",
            "99",
            "90"
          ],
          dvd: [
            "51"
          ],
          dvdrip: [
            "51"
          ],
          other: ""
        }
      },
      resolution: {
        map: {
          "2160p": [
            "108",
            "109",
            "67"
          ],
          "1080p": [
            "53",
            "63",
            "70",
            "75",
            "54",
            "67",
            "87",
            "88",
            "99",
            "90"
          ],
          "1080i": [
            "53",
            "63",
            "70",
            "75",
            "87",
            "88",
            "99",
            "90"
          ],
          "720p": [
            "52",
            "62",
            "69",
            "76",
            "87",
            "88",
            "99",
            "90"
          ],
          "576p": "51",
          "480p": "51"
        }
      },
      area: {
        map: {
          CN: [
            "76",
            "75",
            "90"
          ],
          US: [
            "69",
            "70",
            "87"
          ],
          EU: [
            "69",
            "70",
            "87"
          ],
          HK: [
            "76",
            "75",
            "90"
          ],
          TW: [
            "76",
            "75",
            "90"
          ],
          JP: [
            "73",
            "88",
            "101"
          ],
          KR: [
            "74",
            "99",
            "103"
          ],
          OT: ""
        }
      }
    },
    TeamHD: {
      url: "https://teamhd.org",
      host: "teamhd.org",
      siteType: "TeamHD",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA/1BMVEUnb4xDgZs/fpkdaIc5epUtc48haokeaYcwdJFXj6ZTjKQvdJAha4keaIcwdZE1eJRAf5knbozu8/bV4+kdaIe1zdd4pLcydpLs8vUmboyFrb44Y3s4Y3qbU1CcU1Cxy9KAqrne6elPiaCudHH9/fj39O/59vHr3trBlJD17+qdVVK1f3zx6OTGnpqzfXn38+6dV1Tk7u3R4OP3+vb6+POrb2yVucRDgZrk7eycVFH59/KscG2vdHH49O+eV1Wrbmrr39rKpKD8/Pfv5ODz7Oj07ejIoZ0qcI0lbYsuc48ha4mdVlOkYl+iXluCq7w3eZUkbYuGrr+iwc3a5uv////JDiEOAAAAEnRSTlP8/Pz8/Pz8/Pz8/Pz8/Pz8/Pxv/XQeAAAAAWJLR0RU5AOIpQAAAAd0SU1FB+UGFAUQNy7SYEwAAACnSURBVBjTXc/VDsJAEAXQHYo7Q3G6uBUvUtyd4v//LyxsQlru25xkjBAAk2AGsFgBwGYH4kAMiiHEcAQxGosjEUSeRJLnBxL9RiJCKs3KTDaXLxRLZT1UqFyt1Q1AaaPZYtBWFKXDQe72GPRVVR1wGI7GxpbJdGaA+WKpG7pab7a7z9r9gcHxdNa0Cz/s/3S83thX9wfiU3whOgm43OxvjxfAJ/gBAm8tFB1sxKb5KwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0yMFQwNToxNjo1NSswMDowMJkzpLEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMjBUMDU6MTY6NTUrMDA6MDDobhwNAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: false,
      seedDomSelector: "#details_hop",
      needDoubanInfo: true,
      search: {
        path: "/browse",
        params: {
          incldead: "0",
          search: "{name}"
        }
      }
    },
    UHDBits: {
      url: "https://uhdbits.org",
      host: "uhdbits.org",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxYgELsSrwAABEJJREFUOMtFlE1vXeUVhZ/9fp1zP3x9bcc2TnCCQwIFVIUCA0/opEiIEYNW7RipP6I/pr+AYVVVQkJCKghKFYKliEBCCIkTwHEcfJPre4/PeT92BwZ3S1ta0paewdJaW8796e8fqTF3xZgdEXZw/tuU3eStC4+7v16+pquyTydBAcRGibMRN//Vk/v/bbxIN7JFLir6uyzltULZcoj8xtfVlg/uDYP+nFPZV7F708ff7d2cf3Io7pujeaEDsBV+9nB90Oy/suTN1prx5qw3ds0UWY6xGzWlqRzGjF3wvqq9tSgpa9FSPa0rOwk1U+849oX4C9CFntR17Ydd1V80Po2tFStZUMjSttFhaK0V65213ggWMVqqcfBm7CtwDlwBABvAVxAqS+VrrE9gFRXFRltEpHWiCAgCiChGBSOCtWAtGAdOQQHrwVhBrCBGUCOcXH5ZVXF1cNTBYq1BtWCMMHCWqupjQx9jLKQMAsY6bOjj6gF+1MOGjBhFYyFppswU985rZ1lcWuSbvSO+3v2ZzdWad14/y4C3WdOa4ZOap7c/BWBpa5v+md8zXP8tg/ULLJ5fwQZL6TIPvrjFtfc/xL3wzAJLZ0bsTTtiVvrBcuX8AvOyyqCbEPQamj8DIIwuYOwV6vHLjF9YpOka5s0R/ZURy69usnHvMk7g1IOiiuqJ1hwx1TLDZ7dZO44AjM5tczxZoW0j88mUr/7xCQffPWDjyiXWX3mO5UsbONUTUDn1FYoquTvCjs6ydP49hpf+AoDrDXm4c5/5wWPSFCaf3+fgi9v0msB4ZQVjDU4B7wyDyrHQ8wxqhzGC8YFuNmH/xnUefX8TgOXnXyLOBhjnsc6ysLpEe26dhdVlQq8mNhH3w/5Ttq9s8vqLz/DnN7cYBIOXwpPOUuJdjvc/YO/qPwGoeu/iwx/w/YssXRyz/bc/EqcNvTMjjmZTfvzgU9zVW/s8v7nMq5fXGFihnWau3pswnXdU4TqL0x1Mvo0CzcEOc12jmxWauERvdQEzMLSzQ/au32H3PzdwN/dmvP/vO3z29UN6wdAmZfeJ8py/w8bwY9bct9RjBaA5vMX8wDPZ/ZHm43XcwCBWKF1i+sMBj27s4giBW4eJO9MploKKRaoRG/VdSvmSFB6AP6lenu0SJy3N/cjh7QjSghRISooRjzmJTV17enXAG8gYojhc8LjKYB2nYzy42hDqmt5wiLHhtClt09A1EacKIoI1gjGg+msy5VSj/4eigmAwCEYMGEUsiDEg4FTV5VxMzBktkFTpSqIjEVG6BO2v3yZBPC7ENhK7DqsJyUBSSsoGVedQPcopPY2dHGdKU9QcR5W209J0aNMlujZRAFzBxLb4rkt1jG0/k2qESjL9nFOlqHWiZVdjfNzldI8Yd0vRn5If7bUD96j07MQ75vmYqEAd8GD7KbLYpPlqys2GCOtB/KZSzhfR1f8B1roU+C5nEcAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MjI6MzIrMDA6MDAKmfIIAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjIyOjMyKzAwOjAwe8RKtAAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          order_way: "desc",
          order_by: "size",
          searchstr: "{imdb}"
        }
      },
      needDoubanInfo: true,
      description: {
        selector: "#release_desc"
      },
      imdb: {
        selector: "#imdbid"
      },
      anonymous: {
        selector: "#anonymous"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      category: {
        selector: "#categories",
        map: {
          movie: "0",
          tv: "2",
          tvPack: "2",
          music: "1"
        }
      },
      videoType: {
        selector: "#media",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          remux: "Remux",
          encode: "Encode",
          web: "WEB-DL",
          hdtv: "HDTV",
          dvdrip: "Encode",
          other: "Others"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "AVC/H.264",
          hevc: "HEVC",
          x264: "x264",
          x265: "x265",
          h265: "HEVC",
          mpeg2: "MPEG-2",
          mpeg4: "AVC/H.264",
          vc1: "VC-1",
          dvd: "MPEG"
        }
      },
      resolution: {
        selector: "#format",
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "Others",
          "480p": "Others"
        }
      }
    },
    ZHUQUE: {
      url: "https://zhuque.in",
      host: "zhuque.in",
      siteType: "TNode",
      icon: "data:image/png;base64,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",
      asSource: false,
      asTarget: true,
      seedDomSelector: "div.layout-container > div > form",
      uploadPath: "/torrent/upload",
      needDoubanInfo: false,
      search: {
        path: "/torrent/search",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          search_area: "{optionKey}",
          search: "{imdb}"
        }
      },
      name: {
        selector: "#form_item_title"
      },
      subtitle: {
        selector: "#form_item_subtitle"
      },
      description: {
        selector: "#form_item_note"
      },
      anonymous: {
        selector: "#form_item_anonymous"
      },
      imdb: {
        selector: 'input[placeholder="tt123456"]'
      },
      douban: {
        selector: "#form_item_doubanid"
      },
      tmdb: {
        selector: ".ant-space.ant-space-horizontal.ant-space-align-center >.ant-space-item:last-child > input"
      },
      screenshots: {
        selector: "#form_item_screenshot"
      },
      mediaInfo: {
        selector: "#form_item_mediainfo"
      },
      tags: {
        chinese_audio: 'input.ant-checkbox-input[value="603"]',
        chinese_subtitle: 'input.ant-checkbox-input[value="604"]',
        hdr: 'input.ant-checkbox-input[value="613"]',
        dolby_vision: 'input.ant-checkbox-input[value="611"]'
      },
      category: {
        selector: "#form_item_category",
        map: {
          movie: "\u7535\u5F71",
          tv: "\u7535\u89C6\u5267",
          tvPack: "\u7535\u89C6\u5267",
          cartoon: "\u52A8\u753B",
          concert: "\u5176\u5B83",
          documentary: "\u5176\u5B83",
          variety: "\u5176\u5B83"
        }
      },
      videoType: {
        selector: "#rc_select_9",
        map: {
          uhdbluray: "UHD Blu-ray",
          bluray: "Blu-ray",
          remux: "Remux",
          hdtv: "HDTV",
          web: "WEB-DL",
          webrip: "Encode",
          encode: "Encode"
        }
      },
      videoCodec: {
        selector: "#rc_select_10",
        map: {
          h264: "H264",
          hevc: "H265",
          x264: "x264",
          x265: "x265",
          h265: "H265",
          mpeg2: "Other",
          mpeg4: "H265",
          vc1: "Other",
          xvid: "Other",
          dvd: "Other"
        }
      },
      audioCodec: {
        selector: "#rc_select_3",
        map: {
          aac: "AAC",
          ac3: "AC3",
          dd: "AC3",
          "dd+": "DDP",
          dts: "DTS",
          truehd: "TrueHD",
          lpcm: "LPCM",
          flac: "FLAC",
          dtshdma: "DTS-HD MA",
          atmos: "TrueHD Atmos",
          dtsx: "DTS-X",
          mp3: "Other"
        }
      },
      resolution: {
        selector: "#rc_select_12"
      }
    },
    fearnopeer: {
      url: "https://fearnopeer.com",
      host: "fearnopeer.com",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAPoAAAD6AG1e1JrAAACnklEQVR4nK1UO0hjURA9KRIw6EOUYIgWaqVRMRjBQtFnWgujkCLgBwsRERRMZZIiiJqAKIiVqPgjLAiSNJqPIClsBBtFxC4WtjYr2OlZ5vKy7Kq7G1wHhvvevJnz5pw79wIfmwWADmADwBWA7wBejPXKiOtG3j/NBsADIAwgBSAP4BnAq7HmjXjYyLP9CcgEoAxA0ChiEZ438suM+t9Mgt8APBYJVvBHo67sLc3gJ8D4C2iwQN9saFEszb/R9wigbrVaQ1VVVWxoaGBLS4vy1tZWut1utZaWlr4DqK2tVXlNTU2qrq6ujpqmhQRww263p0dGRnh0dMREIsHd3V3u7OwwmUxyb29PFQmIyWSixWJRz0tLS8xms9zf3+fy8jLX19fp8XjSAnitaVq+v7+ft7e3jMVibGxspNlspnRdUlKingXE4XBQfizvq6urzGQyHB8fZ2VlJS8vL7m1tSW08VRdXf08Pz/P+/t7lej3+xVdKQwEApyYmGB9fT1dLhcPDg5ot9t5eHjIeDzOrq4uFX94eODi4qLMKV6cTufr8fExb25uVPuDg4NKF5vNxlwux7OzMw4PD7O3t5fb29tsb29X3Z2cnHB6eprBYJCbm5vs6emR4cdTR0fHs4CJhkJJqIpWAiBFqVSKKysrnJycVBRHR0d5fn6u9J6ZmeHs7Czb2tqkRnV43dfXl7+7u+PU1BQrKip+7mIkEuHc3BwHBga4tramKIoUIsvFxQXHxsbej47P59uIRqPp09NTRaWwi6LT0NAQu7u71dh4vV6Gw2G1YQsLCwpU1/W3gGl0dnbqbrc71NzcTKvVqkZDPgqwaFiYwfLyctbU1Khdl+7FNU17Cxj68KQUQD97Ur78LMOwL71txL78PizYf93YPwA8btamn3E35AAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/torrents/create?category_id=1",
      needDoubanInfo: true,
      seedDomSelector: ".torrent__buttons+.panelV2",
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anon"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "12",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "12",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "11",
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    iTS: {
      url: "http://shadowthein.net",
      host: "shadowthein.net",
      siteType: "its",
      asSource: false,
      asTarget: true,
      icon: "data:image/png;base64,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",
      seedDomSelector: "h1~.line>tbody>tr:nth-child(2)",
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        params: {
          incldead: 1,
          search: "{imdb}",
          search_in: "names",
          sort: 5,
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      imdb: {
        selector: 'input[name="imdblink"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      tags: {
        hdr: 'input[name="HDR10"]',
        hdr10_plus: 'input[name="HDR10Plus"]',
        dolby_vision: 'input[name="DolbyVision"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "68",
          tv: "65",
          concert: "61",
          music: "6",
          ebook: "26"
        }
      }
    },
    "nzbs.in": {
      url: "https://nzbs.in",
      host: "nzbs.in",
      siteType: "nzb",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QATwB9ALSzxfhxAAAAB3RJTUUH5QQMAx4c9w3kIAAAA6xJREFUOMt1lM9rVFcUxz/nvDszieOYMUrGxAR/RU0VreBCUFIo7UIRUqEroUJLVyJ02x9QaKHrLtq/oKUUpKvSdV0VoRulBEG0JJpR44+aTExiMvPuPaeLN5lQ2x54D+65j885993v+crZz645/4ju0gUnQ9SpkHCB3DLMQTAQB4TivRnhXzDf3DaLHB6pcumtfYgIP/x6j9tzy2gmuNOD8r/ALs9RUkqc2Fdj6tQog+M7cHHezSO/XH/A9OwLyDJwR16Bhk2WI9284hwcrTJ1apTjxxt81emwps7nx3YylSDv3Ofu43VS7wcVUAG0B3PBXcgEdg2U+PDsOG+cGOZ5jDQ9Z94TC9GYPN7g/XMHGa4HsgzEpfsUWMWLAgJkRBp14eOLRzi6t455YixkvBeUDzTjoAZM4OieOh9fPMbueongEe0d2VEXBxGiJQ4M93PlwhH276pRDoqIUBI4Hyqcz8pk4kWulLGnsZXL70ywf2QL0SJO0WIIYiQpcWhvjbdf38nE2CC5wbV7OQ9XjLGqMDlWwgWuz0XmVpzRmjM5Eji8ZzvnTo9RuvGMO3OriIBcvnrPV2NgohE4s7ePTJU7C86NVomyRE7WE2utZRZXE82lyFJHKKVF1m/+xMulBXB43mrzvNVBRAhP/rxBa1XJZw2ZEYI4TR/gafU1tvc7z1S4df8FFRfWOhGLQifvMHv/MU8ePcQMREGl0Ka8+dGPLgJu4BF2bqvwyaWTfDc/xPXH4O40thpfninz/bTx2wPh9AhcmVjn66u3eLq0hoj0pBMqtRHEQUjgTq3ex67hBvZXiRUvdDW/bnz7B8wsBVZESJlTq1aIrrSjdIHFTQfFMTXcHHMnOkR3zCF1P3uZC7/PG6iCFrmeiHFMQLsWEBbtNn1a5VA2jmrGYKmfIMpudY5oQivGtpoytyDUvMPDFBBXRKAeKvSFosKGEtU1kHmZdjTWUyK5kQHJnVUzDg8KX5wOTGw3TIr8RrQt8TLltGOkHXPaMUfrNk7wBo/IabLGI1smx5g3ZSaVaXnG8Bbn08nAYCOw7IrjGLBiOQ+8TVPWadKmSZuAOI6jruCyOUTuuAnujgoM90MVw5KSKG5VETIE9WLaem4jPccohrqkwtSBjKODcGAAgijgXNgPx3Yo+waUssRNrxHpWe0rBiu0c2N6ZpGhWomhLSC5cPNusTckzlDVsQjTsx3aeexZ3n8arIjSWja++fk2Ilb07pvFpGt1LoAX4A3xbMTfU7u3vspnhj4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MzA6MjcrMDA6MDBRcNLMAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjMwOjI3KzAwOjAwIC1qcAAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search/{name}",
        params: {
          t: -1,
          ob: "size_desc"
        }
      }
    },
    zimuku: {
      url: "http://zimuku.org",
      host: "zimuku.org",
      siteType: "subtitles",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAACXlBMVEUbbZ0ZbJwAWpCpx9n///4DWIoZbJ0abJwEXpP6/P3///+5yNEAW5EIYZbK1NlMgJ8QaJsZa5wDXpQAQ3rd4+b///0AUIMDXpMYbJ0OZJcYX4kYbJ4LYZQTR2UYbqEabJ0AWo8FQGIab6EAGC4ALU8ALU0ALE0AIUMAPWIBXJETTW4WcKYZcKIacKMMZpoKRmkZbqARZZcJRGUnd6YWaZoNZJcMY5YJYZUIYpUeU3MYbaAPZ5qjq7CnpKOZlZNCa4MOWodzjJuBhol8foAISG0bb6EabZ0KYJIHW4wAV4pbmLshUm8MZ50NZJgOZpkbbZ4SaJtYkrUjVHIXbaAPZpgrUGYVPVQOOlQKOFMLOFMAK0oiRVr08vBeX2AJTXUbb6AXbqEYb6IZcKMSa6AAXJWHtdC4sawAHzQMYpUbcKIRZ5k4fqjs8vZFTE8APWYac6gbbp4Ya5sgb53l3dkCHzAOZJgccaMIYZUBXJICXZIASoWkpKQAEjcAY50CXpQCXJIWa50HYJTW4+z9/f33+fr2+Prz9vjy8/T1/P/9/f4oapEXa53n7fM1YHgVbJ/09/s5ZHwVa50+c5NXZm9DW2k/WWk+WWkqSVv5+fmLkpc1U2Q/WmpOZXNmdn+EiIoLQ2QacKEVa5wSap4TbKAUbKD6+/xthJMJaKASa58QaZ0OZZn7/PxxhpQPaJwOZZcAVY32+PlmnLyArcdqnr1kmrtwhZIGYJTf6O5OanoTa59tnboAMU8acKIWapsoc5/99PA6Q0cQZpgSaZyFkplXanY2VGYJNU8ANlsSaJobbp8uYKy2AAAAAWJLR0QKaND0VgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+UGBAQjFV4CeTAAAAGYSURBVDjLY2BAAEYmZhZWNgacgJ2Dk4uLmwebDBTw8nFxcfELsMMBVF6QAwqEhEW4uETFxGF8DgmIzZJcuICUNFiBDE4FsnIgBfIKOBUoKoHt4AEylVVUUYGaOlBUA6yAXRPI1NLW0UUBOnpAUX0DsBsMgUwjYxNTM2RgbgEUtbQCm2BtY2tnj2G/g6OTs4sr2A1u7h6eXhgKvH18/VxhQekfEIihICgYObDdQkLDwiMigSAiKjoGJB8bF48SHW4JiUkgkJySCpJOS8/IxBqhWdk5IPncvPwClMiEsQqLQNLFJaVlyBLs5ZoVlVBQBZSvrqmtA3MqNOsbQAoam7iaW1ohoA2ooL0Dwm7p5OLq6gYq4OjBGVlcvX0gBf24FUwAKZg4afKUqdMgYPoMLq6ZsyDs2XPmzpu/AOSIhYsWL4GClKVcXMuWQzkrVq5SQg+HitVcXGvW4k74lCrIWheyfgMeBVkbN23eAvTaVlwKtm2H+H3HThwKQnZBFOzeg0PB3n0g6f0HDvrjUMB+6PCRo8eOnziJKgwAyLSNK8OfEhgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDYtMDRUMDQ6MzU6MjErMDA6MDAJeY68AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA2LTA0VDA0OjM1OjIxKzAwOjAweCQ2AAAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search",
        params: {
          q: "{imdb}"
        }
      }
    },
    \u8C46\u74E3\u7535\u5F71: {
      url: "https://search.douban.com",
      host: "search.douban.com",
      siteType: "douban",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEUWgSUAdQ4AdA0AdQ0NfR1sr3aZyKCWx50KexlUn110r3tyrnlWn14LehoAdhAegiuGuYuRwJaOvpOOv5OGuowhgiwCdhEAdg8wjT3j7+WgyqRdo2Fgpmadx5/i7+QHdRR3sn8efyojgi9zsHvf7eIJdRUpiTbS5dWz1biv0rRipmnw9/FPmlgngzPu9e9cpWYMdRcHehcdhCtLnVbY6dp1r3wthTZInVQihC4VeR8oizaq0LDR5dTY6dvV59jO49Gr0LApizYhhjAwjz07lUg6lUc6lUj///+7fLO6AAAAAWJLR0RHYL3JewAAAAd0SU1FB+UEDxExDPWxFNkAAAB/SURBVAjXFcbZAoFAAAXQWyqEKEtDTMJUyF7WCm3//0nMeTqAINY4UQAkWalziiyh0VRbnNruQOv2dKNv6IPhCCYZT6ypNaPE/p/OnYWzXBEG0/Wov/ap5zJo9mYb7IL9gR1xOl/C6BqFt/sDz1ecpO80iT9fZHlRVkVVFnn2A2t6DyUkoLRcAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjQ5OjEyKzAwOjAw+Ka3VAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo0OToxMiswMDowMIn7D+gAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/movie/subject_search",
        params: {
          search_text: "{imdb}"
        }
      }
    },
    \u8C46\u74E3\u8BFB\u4E66: {
      url: "https://search.douban.com",
      host: "search.douban.com",
      siteType: "doubanBook",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEUWgSUAdQ4AdA0AdQ0NfR1sr3aZyKCWx50KexlUn110r3tyrnlWn14LehoAdhAegiuGuYuRwJaOvpOOv5OGuowhgiwCdhEAdg8wjT3j7+WgyqRdo2Fgpmadx5/i7+QHdRR3sn8efyojgi9zsHvf7eIJdRUpiTbS5dWz1biv0rRipmnw9/FPmlgngzPu9e9cpWYMdRcHehcdhCtLnVbY6dp1r3wthTZInVQihC4VeR8oizaq0LDR5dTY6dvV59jO49Gr0LApizYhhjAwjz07lUg6lUc6lUj///+7fLO6AAAAAWJLR0RHYL3JewAAAAd0SU1FB+UEDxExDPWxFNkAAAB/SURBVAjXFcbZAoFAAAXQWyqEKEtDTMJUyF7WCm3//0nMeTqAINY4UQAkWalziiyh0VRbnNruQOv2dKNv6IPhCCYZT6ypNaPE/p/OnYWzXBEG0/Wov/ap5zJo9mYb7IL9gR1xOl/C6BqFt/sDz1ecpO80iT9fZHlRVkVVFnn2A2t6DyUkoLRcAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjQ5OjEyKzAwOjAw+Ka3VAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo0OToxMiswMDowMIn7D+gAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/book/subject_search?search_text={name}"
      }
    }
  };

  // src/const.ts
  var TORRENT_INFO = {
    title: "",
    subtitle: "",
    description: "",
    originalDescription: "",
    year: "",
    category: "",
    videoType: "",
    format: "",
    source: "",
    videoCodec: "",
    audioCodec: "",
    resolution: "",
    area: "",
    doubanUrl: "",
    doubanInfo: "",
    imdbUrl: "",
    tags: {
      diy: false,
      chinese_audio: false,
      cantonese_audio: false,
      chinese_subtitle: false,
      dolby_atoms: false,
      dts_x: false,
      hdr: false,
      dolby_vision: false
    },
    otherTags: {},
    mediaInfo: "",
    mediaInfos: [],
    screenshots: [],
    comparisons: [],
    movieAkaName: "",
    movieName: "",
    sourceSite: "",
    sourceSiteType: "",
    size: 0,
    isForbidden: false,
    poster: ""
  };
  var DOUBAN_SUGGEST_API = "https://www.douban.com/search?cat=1002&q={query}";
  var DOUBAN_MOBILE_API = "https://m.douban.com/rexxar/api/v2";
  var PT_GEN_API = "https://media.pttool.workers.dev";
  var TMDB_API_URL = "https://api.tmdb.org";
  var TMDB_API_KEY = "3d62cb1443c6b34b61262ab332aaf78c";
  var USE_CHINESE = /zh|zh-cn|zh-hk|zh-tw/.test(navigator.language.toLowerCase());
  var getSiteName = (host) => {
    let siteName = "";
    try {
      Object.keys(PT_SITE).forEach((key) => {
        const siteKey = key;
        const hostName = PT_SITE[siteKey].host;
        const matchReg = new RegExp(hostName, "i");
        if (hostName && host.match(matchReg)) {
          siteName = siteKey;
        }
      });
      return siteName;
    } catch (error) {
      if (error.message !== "end loop") {
        console.log(error);
      }
      return "";
    }
  };
  var getSortedSiteKeys = () => {
    return Object.keys(PT_SITE).sort((a3, b3) => {
      const isChineseReg = /[\u4e00-\u9fa5]+/;
      if (isChineseReg.test(a3) && !isChineseReg.test(b3)) {
        return 1;
      }
      if (!isChineseReg.test(a3) && isChineseReg.test(b3)) {
        return -1;
      }
      return a3.toLowerCase().localeCompare(b3.toLowerCase());
    });
  };
  var SORTED_SITE_KEYS = getSortedSiteKeys();
  var EUROPE_LIST = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "UK", "Vatican City"];
  var CURRENT_SITE_NAME = getSiteName(location.host);
  var CURRENT_SITE_INFO = PT_SITE[CURRENT_SITE_NAME];
  var HDB_TEAM = ["Chotab", "CRiSC", "CtrlHD", "DON", "EA", "EbP", "Geek", "LolHD", "NTb", "RightSiZE", "SA89", "SbR", "TayTo", "VietHD"];

  // src/common.ts
  init_preact_shim();

  // src/i18n.json
  var i18n_default = {
    en_US: {
      \u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25: "Failed to get Douban link",
      \u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25: "Failed to get Douban ID",
      \u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25: "Failed to get Douban data",
      \u7F3A\u5C11IMDB\u4FE1\u606F: "Missing IMDB information",
      \u83B7\u53D6\u5931\u8D25: "Request failed",
      \u83B7\u53D6\u6210\u529F: "Data request successful",
      \u8BF7\u6C42\u5931\u8D25: "Request failed",
      "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5": "Upload failed, please try again",
      ptpimg\u4E0A\u4F20\u5931\u8D25: "PtpImg upload failed",
      \u8BF7\u5230\u914D\u7F6E\u9762\u677F\u4E2D\u586B\u5165ptpimg\u7684api_key: "Please enter the API_KEY of ptpimg in the setting panel",
      \u5C01\u9762\u4E0A\u4F20\u5931\u8D25: "Failed to upload poster",
      "\u6570\u636E\u52A0\u8F7D\u4E2D...": "Loading data...",
      \u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25: "Failed to get list of images",
      "\u8F6C\u6362\u4E2D...": "Converting...",
      "\u8F6C\u6362\u6210\u529F\uFF01": "Converted!",
      "\u83B7\u53D6\u4E2D...": "Requesting...",
      \u7F3A\u5C11\u8C46\u74E3\u94FE\u63A5: "Missing Douban link",
      "\u672C\u79CD\u5B50\u53EF\u80FD\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F": "Transfer of this torrent may be prohibited, are you sure to continue?",
      \u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210: "Please wait for the page to load",
      \u624B\u52A8\u8F93\u5165\u8C46\u74E3\u94FE\u63A5: "Enter the Douban link",
      \u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB: "Get data of Douban",
      \u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB: "Get data of Douban Book",
      \u8F6C\u7F29\u7565\u56FE: "Convert to thumbnails",
      \u5FEB\u901F\u68C0\u7D22: "Quick search",
      \u4E00\u952E\u7FA4\u8F6C: "Batch transfer",
      \u5FEB\u6377\u64CD\u4F5C: "Quick operation",
      \u4E00\u952E\u8F6C\u79CD: "Transfer to",
      \u8F6C\u79CD\u7AD9\u70B9\u542F\u7528: "Select sites for the 'Transfer to' section",
      \u6279\u91CF\u8F6C\u79CD\u542F\u7528: "Select sites for the 'Batch transfer' button",
      \u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9: "One-click batch transfer to the selected sites below",
      \u7AD9\u70B9\u641C\u7D22\u542F\u7528: "Select sites for the 'Quick search' section",
      \u56FE\u5E8A\u914D\u7F6E: "Image Host Settings",
      "\u5982\u4F55\u83B7\u53D6\uFF1F": "How to get it?",
      \u989D\u5916\u529F\u80FD\u5173\u95ED: "Turn off extra features",
      \u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD: "Remove the 'Convert to thumbnails' button",
      \u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A: "Remove the icons",
      \u5173\u95ED\u8F6C\u5B58ptpimg\u529F\u80FD: "Remove the 'Upload screenshots to ptpimg' button",
      \u4FDD\u5B58: "Save",
      \u53D6\u6D88: "Cancel",
      \u9519\u8BEF: "Error",
      \u6210\u529F: "Success",
      \u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25: "Failed to save local site settings",
      \u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868: "Please set up the batch transfer list first",
      "\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C": "The transfer pages have been opened, please go to the corresponding page to operate",
      \u63D0\u793A: "Hint",
      \u8F6C\u5B58\u622A\u56FE: "Upload screenshots to another host",
      \u65E0\u9700\u8F6C\u5B58: "No need to upload",
      "\u4E0A\u4F20\u4E2D\uFF0C\u8BF7\u7A0D\u5019...": "Uploading, be patient",
      \u4E0D\u663E\u793A\u81F4\u8C22\u5185\u5BB9: "Do not include thanks",
      \u62F7\u8D1D: "Copy",
      \u5DF2\u62F7\u8D1D: "Copied",
      \u4E0D\u663E\u793A\u8C46\u74E3\u6309\u94AE\u548C\u8C46\u74E3\u94FE\u63A5: "Hide Douban button & link field",
      \u8BF7\u586B\u5199\u6B63\u786E\u94FE\u63A5: "Please fill the correct link",
      \u6279\u91CF\u68C0\u7D22: "Batch search",
      \u540C\u65F6\u6253\u5F00\u591A\u4E2A\u641C\u7D22\u6807\u7B7E\u9875: "Open multiple search tabs at the same time",
      \u8C46\u74E3\u914D\u7F6E: "Douban Config",
      \u8C46\u74E3Cookie: "Douban Cookie",
      \u8BF7\u914D\u7F6E\u8C46\u74E3Cookie: "Please configure douban cookie",
      \u5173\u95ED\u5FEB\u901F\u68C0\u7D22: "Disable QuickSearch"
    },
    zh_CN: {
      \u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25: "\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25",
      \u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25: "\u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25",
      \u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25: "\u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25",
      \u7F3A\u5C11IMDB\u4FE1\u606F: "\u7F3A\u5C11IMDB\u4FE1\u606F",
      \u83B7\u53D6\u5931\u8D25: "\u83B7\u53D6\u5931\u8D25",
      \u83B7\u53D6\u6210\u529F: "\u83B7\u53D6\u6210\u529F",
      \u8BF7\u6C42\u5931\u8D25: "\u8BF7\u6C42\u5931\u8D25",
      "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5": "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
      ptpimg\u4E0A\u4F20\u5931\u8D25: "ptpimg\u4E0A\u4F20\u5931\u8D25",
      \u8BF7\u5230\u914D\u7F6E\u9762\u677F\u4E2D\u586B\u5165ptpimg\u7684api_key: "\u8BF7\u5230\u914D\u7F6E\u9762\u677F\u4E2D\u586B\u5165ptpimg\u7684api_key",
      \u5C01\u9762\u4E0A\u4F20\u5931\u8D25: "\u5C01\u9762\u4E0A\u4F20\u5931\u8D25",
      "\u6570\u636E\u52A0\u8F7D\u4E2D...": "\u6570\u636E\u52A0\u8F7D\u4E2D...",
      \u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25: "\u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25",
      "\u8F6C\u6362\u4E2D...": "\u8F6C\u6362\u4E2D...",
      "\u8F6C\u6362\u6210\u529F\uFF01": "\u8F6C\u6362\u6210\u529F\uFF01",
      "\u83B7\u53D6\u4E2D...": "\u83B7\u53D6\u4E2D...",
      \u7F3A\u5C11\u8C46\u74E3\u94FE\u63A5: "\u7F3A\u5C11\u8C46\u74E3\u94FE\u63A5",
      "\u672C\u79CD\u5B50\u53EF\u80FD\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F": "\u672C\u79CD\u5B50\u53EF\u80FD\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F",
      \u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210: "\u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210",
      \u624B\u52A8\u8F93\u5165\u8C46\u74E3\u94FE\u63A5: "\u624B\u52A8\u8F93\u5165\u8C46\u74E3\u94FE\u63A5",
      \u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB: "\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB",
      \u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB: "\u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB",
      \u8F6C\u7F29\u7565\u56FE: "\u8F6C\u7F29\u7565\u56FE",
      \u5FEB\u901F\u68C0\u7D22: "\u5FEB\u901F\u68C0\u7D22",
      \u4E00\u952E\u7FA4\u8F6C: "\u4E00\u952E\u7FA4\u8F6C",
      \u5FEB\u6377\u64CD\u4F5C: "\u5FEB\u6377\u64CD\u4F5C",
      \u4E00\u952E\u8F6C\u79CD: "\u4E00\u952E\u8F6C\u79CD",
      \u8F6C\u79CD\u7AD9\u70B9\u542F\u7528: "\u8F6C\u79CD\u7AD9\u70B9\u542F\u7528",
      \u6279\u91CF\u8F6C\u79CD\u542F\u7528: "\u6279\u91CF\u8F6C\u79CD\u542F\u7528",
      \u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9: "\u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9",
      \u7AD9\u70B9\u641C\u7D22\u542F\u7528: "\u7AD9\u70B9\u641C\u7D22\u542F\u7528",
      \u56FE\u5E8A\u914D\u7F6E: "\u56FE\u5E8A\u914D\u7F6E",
      "\u5982\u4F55\u83B7\u53D6\uFF1F": "\u5982\u4F55\u83B7\u53D6\uFF1F",
      \u989D\u5916\u529F\u80FD\u5173\u95ED: "\u989D\u5916\u529F\u80FD\u5173\u95ED",
      \u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD: "\u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD",
      \u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A: "\u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A",
      \u5173\u95ED\u8F6C\u5B58ptpimg\u529F\u80FD: "\u5173\u95ED\u8F6C\u5B58ptpimg\u529F\u80FD",
      \u4FDD\u5B58: "\u4FDD\u5B58",
      \u53D6\u6D88: "\u53D6\u6D88",
      \u9519\u8BEF: "\u9519\u8BEF",
      \u6210\u529F: "\u6210\u529F",
      \u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25: "\u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25",
      \u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868: "\u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868",
      "\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C": "\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C",
      \u63D0\u793A: "\u63D0\u793A",
      \u8F6C\u5B58\u622A\u56FE: "\u8F6C\u5B58\u622A\u56FE",
      \u65E0\u9700\u8F6C\u5B58: "\u65E0\u9700\u8F6C\u5B58",
      "\u4E0A\u4F20\u4E2D\uFF0C\u8BF7\u7A0D\u5019...": "\u4E0A\u4F20\u4E2D\uFF0C\u8BF7\u7A0D\u5019...",
      \u4E0D\u663E\u793A\u81F4\u8C22\u5185\u5BB9: "\u4E0D\u663E\u793A\u81F4\u8C22\u5185\u5BB9",
      \u62F7\u8D1D: "\u62F7\u8D1D",
      \u5DF2\u62F7\u8D1D: "\u5DF2\u62F7\u8D1D",
      \u4E0D\u663E\u793A\u8C46\u74E3\u6309\u94AE\u548C\u8C46\u74E3\u94FE\u63A5: "\u4E0D\u663E\u793A\u8C46\u74E3\u6309\u94AE\u548C\u8C46\u74E3\u94FE\u63A5",
      \u8BF7\u586B\u5199\u6B63\u786E\u94FE\u63A5: "\u8BF7\u586B\u5199\u6B63\u786E\u94FE\u63A5",
      \u6279\u91CF\u68C0\u7D22: "\u6279\u91CF\u68C0\u7D22",
      \u540C\u65F6\u6253\u5F00\u591A\u4E2A\u641C\u7D22\u6807\u7B7E\u9875: "\u540C\u65F6\u6253\u5F00\u591A\u4E2A\u641C\u7D22\u6807\u7B7E\u9875",
      \u8C46\u74E3\u914D\u7F6E: "\u8C46\u74E3\u914D\u7F6E",
      \u8C46\u74E3Cookie: "\u8C46\u74E3Cookie",
      \u8BF7\u914D\u7F6E\u8C46\u74E3Cookie: "\u8BF7\u914D\u7F6E\u8C46\u74E3Cookie",
      \u5173\u95ED\u5FEB\u901F\u68C0\u7D22: "\u5173\u95ED\u5FEB\u901F\u68C0\u7D22"
    }
  };

  // src/components/Notification.tsx
  init_preact_shim();

  // node_modules/rc-notification/es/index.js
  init_preact_shim();

  // node_modules/rc-notification/es/Notification.js
  init_preact_shim();

  // node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
  init_preact_shim();

  // node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
  init_preact_shim();
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i3;
    for (i3 = 0; i3 < sourceKeys.length; i3++) {
      key = sourceKeys[i3];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }

  // node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i3;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i3 = 0; i3 < sourceSymbolKeys.length; i3++) {
        key = sourceSymbolKeys[i3];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }

  // node_modules/@babel/runtime/helpers/esm/defineProperty.js
  init_preact_shim();
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  // node_modules/@babel/runtime/helpers/esm/classCallCheck.js
  init_preact_shim();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  // node_modules/@babel/runtime/helpers/esm/createClass.js
  init_preact_shim();
  function _defineProperties(target, props) {
    for (var i3 = 0; i3 < props.length; i3++) {
      var descriptor = props[i3];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  // node_modules/@babel/runtime/helpers/esm/inherits.js
  init_preact_shim();

  // node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
  init_preact_shim();
  function _setPrototypeOf(o3, p3) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o4, p4) {
      o4.__proto__ = p4;
      return o4;
    };
    return _setPrototypeOf(o3, p3);
  }

  // node_modules/@babel/runtime/helpers/esm/inherits.js
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass)
      _setPrototypeOf(subClass, superClass);
  }

  // node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
  init_preact_shim();

  // node_modules/@babel/runtime/helpers/esm/typeof.js
  init_preact_shim();
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }

  // node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
  init_preact_shim();
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  // node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }

  // node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
  init_preact_shim();
  function _getPrototypeOf(o3) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o4) {
      return o4.__proto__ || Object.getPrototypeOf(o4);
    };
    return _getPrototypeOf(o3);
  }

  // node_modules/react/index.mjs
  init_preact_shim();

  // node_modules/preact/compat/dist/compat.module.js
  init_preact_shim();

  // node_modules/preact/hooks/dist/hooks.module.js
  init_preact_shim();
  init_preact_module();
  var t2;
  var u2;
  var r2;
  var o2;
  var i2 = 0;
  var c2 = [];
  var f2 = l.__b;
  var e2 = l.__r;
  var a2 = l.diffed;
  var v2 = l.__c;
  var l2 = l.unmount;
  function m2(t3, r3) {
    l.__h && l.__h(u2, t3, i2 || r3), i2 = 0;
    var o3 = u2.__H || (u2.__H = { __: [], __h: [] });
    return t3 >= o3.__.length && o3.__.push({}), o3.__[t3];
  }
  function d2(n2) {
    return i2 = 1, p2(z2, n2);
  }
  function p2(n2, r3, o3) {
    var i3 = m2(t2++, 2);
    return i3.t = n2, i3.__c || (i3.__ = [o3 ? o3(r3) : z2(void 0, r3), function(n3) {
      var t3 = i3.t(i3.__[0], n3);
      i3.__[0] !== t3 && (i3.__ = [t3, i3.__[1]], i3.__c.setState({}));
    }], i3.__c = u2), i3.__;
  }
  function y2(r3, o3) {
    var i3 = m2(t2++, 3);
    !l.__s && w2(i3.__H, o3) && (i3.__ = r3, i3.u = o3, u2.__H.__h.push(i3));
  }
  function h2(r3, o3) {
    var i3 = m2(t2++, 4);
    !l.__s && w2(i3.__H, o3) && (i3.__ = r3, i3.u = o3, u2.__h.push(i3));
  }
  function s2(n2) {
    return i2 = 5, A2(function() {
      return { current: n2 };
    }, []);
  }
  function _2(n2, t3, u3) {
    i2 = 6, h2(function() {
      return typeof n2 == "function" ? (n2(t3()), function() {
        return n2(null);
      }) : n2 ? (n2.current = t3(), function() {
        return n2.current = null;
      }) : void 0;
    }, u3 == null ? u3 : u3.concat(n2));
  }
  function A2(n2, u3) {
    var r3 = m2(t2++, 7);
    return w2(r3.__H, u3) ? (r3.o = n2(), r3.u = u3, r3.__h = n2, r3.o) : r3.__;
  }
  function F(n2, t3) {
    return i2 = 8, A2(function() {
      return n2;
    }, t3);
  }
  function T2(n2) {
    var r3 = u2.context[n2.__c], o3 = m2(t2++, 9);
    return o3.c = n2, r3 ? (o3.__ == null && (o3.__ = true, r3.sub(u2)), r3.props.value) : n2.__;
  }
  function q2(t3, u3) {
    l.useDebugValue && l.useDebugValue(u3 ? u3(t3) : t3);
  }
  function b2() {
    for (var t3; t3 = c2.shift(); )
      if (t3.__P)
        try {
          t3.__H.__h.forEach(j2), t3.__H.__h.forEach(k2), t3.__H.__h = [];
        } catch (u3) {
          t3.__H.__h = [], l.__e(u3, t3.__v);
        }
  }
  l.__b = function(n2) {
    u2 = null, f2 && f2(n2);
  }, l.__r = function(n2) {
    e2 && e2(n2), t2 = 0;
    var o3 = (u2 = n2.__c).__H;
    o3 && (r2 === u2 ? (o3.__h = [], u2.__h = [], o3.__.forEach(function(n3) {
      n3.o = n3.u = void 0;
    })) : (o3.__.forEach(function(n3) {
      n3.u && (n3.__H = n3.u), n3.o && (n3.__ = n3.o), n3.o = n3.u = void 0;
    }), o3.__h.forEach(j2), o3.__h.forEach(k2), o3.__h = [])), r2 = u2;
  }, l.diffed = function(t3) {
    a2 && a2(t3);
    var i3 = t3.__c;
    i3 && i3.__H && i3.__H.__h.length && (c2.push(i3) !== 1 && o2 === l.requestAnimationFrame || ((o2 = l.requestAnimationFrame) || function(n2) {
      var t4, u3 = function() {
        clearTimeout(r3), g2 && cancelAnimationFrame(t4), setTimeout(n2);
      }, r3 = setTimeout(u3, 100);
      g2 && (t4 = requestAnimationFrame(u3));
    })(b2)), u2 = null, r2 = null;
  }, l.__c = function(t3, u3) {
    u3.some(function(t4) {
      try {
        t4.__H && t4.__H.__.forEach(function(n2) {
          n2.u && (n2.__H = n2.u), n2.o && (n2.__ = n2.o), n2.o = n2.u = void 0;
        }), t4.__h.forEach(j2), t4.__h = t4.__h.filter(function(n2) {
          return !n2.__ || k2(n2);
        });
      } catch (r3) {
        u3.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), u3 = [], l.__e(r3, t4.__v);
      }
    }), v2 && v2(t3, u3);
  }, l.unmount = function(t3) {
    l2 && l2(t3);
    var u3, r3 = t3.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n2) {
      try {
        j2(n2);
      } catch (n3) {
        u3 = n3;
      }
    }), u3 && l.__e(u3, r3.__v));
  };
  var g2 = typeof requestAnimationFrame == "function";
  function j2(n2) {
    var t3 = u2, r3 = n2.__c;
    typeof r3 == "function" && (n2.__c = void 0, r3()), u2 = t3;
  }
  function k2(n2) {
    var t3 = u2;
    n2.__c = n2.__(), u2 = t3;
  }
  function w2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, u3) {
      return t4 !== n2[u3];
    });
  }
  function z2(n2, t3) {
    return typeof t3 == "function" ? t3(n2) : t3;
  }

  // node_modules/preact/compat/dist/compat.module.js
  init_preact_module();
  init_preact_module();
  function C2(n2, t3) {
    for (var e3 in t3)
      n2[e3] = t3[e3];
    return n2;
  }
  function S2(n2, t3) {
    for (var e3 in n2)
      if (e3 !== "__source" && !(e3 in t3))
        return true;
    for (var r3 in t3)
      if (r3 !== "__source" && n2[r3] !== t3[r3])
        return true;
    return false;
  }
  function E(n2) {
    this.props = n2;
  }
  function g3(n2, t3) {
    function e3(n3) {
      var e4 = this.props.ref, r4 = e4 == n3.ref;
      return !r4 && e4 && (e4.call ? e4(null) : e4.current = null), t3 ? !t3(this.props, n3) || !r4 : S2(this.props, n3);
    }
    function r3(t4) {
      return this.shouldComponentUpdate = e3, v(n2, t4);
    }
    return r3.displayName = "Memo(" + (n2.displayName || n2.name) + ")", r3.prototype.isReactComponent = true, r3.__f = true, r3;
  }
  (E.prototype = new _()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n2, t3) {
    return S2(this.props, n2) || S2(this.state, t3);
  };
  var w3 = l.__b;
  l.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), w3 && w3(n2);
  };
  var R = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  function x2(n2) {
    function t3(t4) {
      var e3 = C2({}, t4);
      return delete e3.ref, n2(e3, t4.ref || null);
    }
    return t3.$$typeof = R, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t3;
  }
  var N2 = function(n2, t3) {
    return n2 == null ? null : A(A(n2).map(t3));
  };
  var k3 = { map: N2, forEach: N2, count: function(n2) {
    return n2 ? A(n2).length : 0;
  }, only: function(n2) {
    var t3 = A(n2);
    if (t3.length !== 1)
      throw "Children.only";
    return t3[0];
  }, toArray: A };
  var A3 = l.__e;
  l.__e = function(n2, t3, e3, r3) {
    if (n2.then) {
      for (var u3, o3 = t3; o3 = o3.__; )
        if ((u3 = o3.__c) && u3.__c)
          return t3.__e == null && (t3.__e = e3.__e, t3.__k = e3.__k), u3.__c(n2, t3);
    }
    A3(n2, t3, e3, r3);
  };
  var O2 = l.unmount;
  function L2() {
    this.__u = 0, this.t = null, this.__b = null;
  }
  function U(n2) {
    var t3 = n2.__.__c;
    return t3 && t3.__e && t3.__e(n2);
  }
  function F2(n2) {
    var t3, e3, r3;
    function u3(u4) {
      if (t3 || (t3 = n2()).then(function(n3) {
        e3 = n3.default || n3;
      }, function(n3) {
        r3 = n3;
      }), r3)
        throw r3;
      if (!e3)
        throw t3;
      return v(e3, u4);
    }
    return u3.displayName = "Lazy", u3.__f = true, u3;
  }
  function M2() {
    this.u = null, this.o = null;
  }
  l.unmount = function(n2) {
    var t3 = n2.__c;
    t3 && t3.__R && t3.__R(), t3 && n2.__h === true && (n2.type = null), O2 && O2(n2);
  }, (L2.prototype = new _()).__c = function(n2, t3) {
    var e3 = t3.__c, r3 = this;
    r3.t == null && (r3.t = []), r3.t.push(e3);
    var u3 = U(r3.__v), o3 = false, i3 = function() {
      o3 || (o3 = true, e3.__R = null, u3 ? u3(l3) : l3());
    };
    e3.__R = i3;
    var l3 = function() {
      if (!--r3.__u) {
        if (r3.state.__e) {
          var n3 = r3.state.__e;
          r3.__v.__k[0] = function n4(t5, e4, r4) {
            return t5 && (t5.__v = null, t5.__k = t5.__k && t5.__k.map(function(t6) {
              return n4(t6, e4, r4);
            }), t5.__c && t5.__c.__P === e4 && (t5.__e && r4.insertBefore(t5.__e, t5.__d), t5.__c.__e = true, t5.__c.__P = r4)), t5;
          }(n3, n3.__c.__P, n3.__c.__O);
        }
        var t4;
        for (r3.setState({ __e: r3.__b = null }); t4 = r3.t.pop(); )
          t4.forceUpdate();
      }
    }, f3 = t3.__h === true;
    r3.__u++ || f3 || r3.setState({ __e: r3.__b = r3.__v.__k[0] }), n2.then(i3, i3);
  }, L2.prototype.componentWillUnmount = function() {
    this.t = [];
  }, L2.prototype.render = function(n2, t3) {
    if (this.__b) {
      if (this.__v.__k) {
        var e3 = document.createElement("div"), r3 = this.__v.__k[0].__c;
        this.__v.__k[0] = function n3(t4, e4, r4) {
          return t4 && (t4.__c && t4.__c.__H && (t4.__c.__H.__.forEach(function(n4) {
            typeof n4.__c == "function" && n4.__c();
          }), t4.__c.__H = null), (t4 = C2({}, t4)).__c != null && (t4.__c.__P === r4 && (t4.__c.__P = e4), t4.__c = null), t4.__k = t4.__k && t4.__k.map(function(t5) {
            return n3(t5, e4, r4);
          })), t4;
        }(this.__b, e3, r3.__O = r3.__P);
      }
      this.__b = null;
    }
    var u3 = t3.__e && v(d, null, n2.fallback);
    return u3 && (u3.__h = null), [v(d, null, t3.__e ? null : n2.children), u3];
  };
  var T3 = function(n2, t3, e3) {
    if (++e3[1] === e3[0] && n2.o.delete(t3), n2.props.revealOrder && (n2.props.revealOrder[0] !== "t" || !n2.o.size))
      for (e3 = n2.u; e3; ) {
        for (; e3.length > 3; )
          e3.pop()();
        if (e3[1] < e3[0])
          break;
        n2.u = e3 = e3[2];
      }
  };
  function D2(n2) {
    return this.getChildContext = function() {
      return n2.context;
    }, n2.children;
  }
  function I2(n2) {
    var t3 = this, e3 = n2.i;
    t3.componentWillUnmount = function() {
      S(null, t3.l), t3.l = null, t3.i = null;
    }, t3.i && t3.i !== e3 && t3.componentWillUnmount(), n2.__v ? (t3.l || (t3.i = e3, t3.l = { nodeType: 1, parentNode: e3, childNodes: [], appendChild: function(n3) {
      this.childNodes.push(n3), t3.i.appendChild(n3);
    }, insertBefore: function(n3, e4) {
      this.childNodes.push(n3), t3.i.appendChild(n3);
    }, removeChild: function(n3) {
      this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), t3.i.removeChild(n3);
    } }), S(v(D2, { context: t3.context }, n2.__v), t3.l)) : t3.l && t3.componentWillUnmount();
  }
  function W(n2, t3) {
    var e3 = v(I2, { __v: n2, i: t3 });
    return e3.containerInfo = t3, e3;
  }
  (M2.prototype = new _()).__e = function(n2) {
    var t3 = this, e3 = U(t3.__v), r3 = t3.o.get(n2);
    return r3[0]++, function(u3) {
      var o3 = function() {
        t3.props.revealOrder ? (r3.push(u3), T3(t3, n2, r3)) : u3();
      };
      e3 ? e3(o3) : o3();
    };
  }, M2.prototype.render = function(n2) {
    this.u = null, this.o = /* @__PURE__ */ new Map();
    var t3 = A(n2.children);
    n2.revealOrder && n2.revealOrder[0] === "b" && t3.reverse();
    for (var e3 = t3.length; e3--; )
      this.o.set(t3[e3], this.u = [1, 0, this.u]);
    return n2.children;
  }, M2.prototype.componentDidUpdate = M2.prototype.componentDidMount = function() {
    var n2 = this;
    this.o.forEach(function(t3, e3) {
      T3(n2, e3, t3);
    });
  };
  var P2 = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element") || 60103;
  var V = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
  var j3 = typeof document != "undefined";
  var z3 = function(n2) {
    return (typeof Symbol != "undefined" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(n2);
  };
  function B2(n2, t3, e3) {
    return t3.__k == null && (t3.textContent = ""), S(n2, t3), typeof e3 == "function" && e3(), n2 ? n2.__c : null;
  }
  function $3(n2, t3, e3) {
    return q(n2, t3), typeof e3 == "function" && e3(), n2 ? n2.__c : null;
  }
  _.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n2) {
    Object.defineProperty(_.prototype, n2, { configurable: true, get: function() {
      return this["UNSAFE_" + n2];
    }, set: function(t3) {
      Object.defineProperty(this, n2, { configurable: true, writable: true, value: t3 });
    } });
  });
  var H2 = l.event;
  function Z() {
  }
  function Y() {
    return this.cancelBubble;
  }
  function q3() {
    return this.defaultPrevented;
  }
  l.event = function(n2) {
    return H2 && (n2 = H2(n2)), n2.persist = Z, n2.isPropagationStopped = Y, n2.isDefaultPrevented = q3, n2.nativeEvent = n2;
  };
  var G;
  var J = { configurable: true, get: function() {
    return this.class;
  } };
  var K = l.vnode;
  l.vnode = function(n2) {
    var t3 = n2.type, e3 = n2.props, r3 = e3;
    if (typeof t3 == "string") {
      var u3 = t3.indexOf("-") === -1;
      for (var o3 in r3 = {}, e3) {
        var i3 = e3[o3];
        j3 && o3 === "children" && t3 === "noscript" || o3 === "value" && "defaultValue" in e3 && i3 == null || (o3 === "defaultValue" && "value" in e3 && e3.value == null ? o3 = "value" : o3 === "download" && i3 === true ? i3 = "" : /ondoubleclick/i.test(o3) ? o3 = "ondblclick" : /^onchange(textarea|input)/i.test(o3 + t3) && !z3(e3.type) ? o3 = "oninput" : /^onfocus$/i.test(o3) ? o3 = "onfocusin" : /^onblur$/i.test(o3) ? o3 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o3) ? o3 = o3.toLowerCase() : u3 && V.test(o3) ? o3 = o3.replace(/[A-Z0-9]/, "-$&").toLowerCase() : i3 === null && (i3 = void 0), /^oninput/i.test(o3) && (o3 = o3.toLowerCase(), r3[o3] && (o3 = "oninputCapture")), r3[o3] = i3);
      }
      t3 == "select" && r3.multiple && Array.isArray(r3.value) && (r3.value = A(e3.children).forEach(function(n3) {
        n3.props.selected = r3.value.indexOf(n3.props.value) != -1;
      })), t3 == "select" && r3.defaultValue != null && (r3.value = A(e3.children).forEach(function(n3) {
        n3.props.selected = r3.multiple ? r3.defaultValue.indexOf(n3.props.value) != -1 : r3.defaultValue == n3.props.value;
      })), n2.props = r3, e3.class != e3.className && (J.enumerable = "className" in e3, e3.className != null && (r3.class = e3.className), Object.defineProperty(r3, "className", J));
    }
    n2.$$typeof = P2, K && K(n2);
  };
  var Q = l.__r;
  l.__r = function(n2) {
    Q && Q(n2), G = n2.__c;
  };
  var X = { ReactCurrentDispatcher: { current: { readContext: function(n2) {
    return G.__n[n2.__c].props.value;
  } } } };
  function tn(n2) {
    return v.bind(null, n2);
  }
  function en(n2) {
    return !!n2 && n2.$$typeof === P2;
  }
  function rn(n2) {
    return en(n2) ? B.apply(null, arguments) : n2;
  }
  function un(n2) {
    return !!n2.__k && (S(null, n2), true);
  }
  function on(n2) {
    return n2 && (n2.base || n2.nodeType === 1 && n2) || null;
  }
  var ln = function(n2, t3) {
    return n2(t3);
  };
  var fn = function(n2, t3) {
    return n2(t3);
  };
  var compat_module_default = { useState: d2, useReducer: p2, useEffect: y2, useLayoutEffect: h2, useRef: s2, useImperativeHandle: _2, useMemo: A2, useCallback: F, useContext: T2, useDebugValue: q2, version: "17.0.2", Children: k3, render: B2, hydrate: $3, unmountComponentAtNode: un, createPortal: W, createElement: v, createContext: D, createFactory: tn, cloneElement: rn, createRef: p, Fragment: d, isValidElement: en, findDOMNode: on, Component: _, PureComponent: E, memo: g3, forwardRef: x2, flushSync: fn, unstable_batchedUpdates: ln, StrictMode: d, Suspense: L2, SuspenseList: M2, lazy: F2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X };

  // node_modules/react-dom/index.mjs
  init_preact_shim();

  // node_modules/rc-animate/es/Animate.js
  init_preact_shim();

  // node_modules/rc-animate/node_modules/rc-util/es/unsafeLifecyclesPolyfill.js
  init_preact_shim();
  var unsafeLifecyclesPolyfill = function unsafeLifecyclesPolyfill2(Component) {
    var prototype = Component.prototype;
    if (!prototype || !prototype.isReactComponent) {
      throw new Error("Can only polyfill class components");
    }
    if (typeof prototype.componentWillReceiveProps !== "function") {
      return Component;
    }
    if (!compat_module_default.Profiler) {
      return Component;
    }
    prototype.UNSAFE_componentWillReceiveProps = prototype.componentWillReceiveProps;
    delete prototype.componentWillReceiveProps;
    return Component;
  };
  var unsafeLifecyclesPolyfill_default = unsafeLifecyclesPolyfill;

  // node_modules/rc-animate/es/ChildrenUtils.js
  init_preact_shim();
  function toArrayChildren(children) {
    var ret = [];
    compat_module_default.Children.forEach(children, function(child) {
      ret.push(child);
    });
    return ret;
  }
  function findChildInChildrenByKey(children, key) {
    var ret = null;
    if (children) {
      children.forEach(function(child) {
        if (ret) {
          return;
        }
        if (child && child.key === key) {
          ret = child;
        }
      });
    }
    return ret;
  }
  function findShownChildInChildrenByKey(children, key, showProp) {
    var ret = null;
    if (children) {
      children.forEach(function(child) {
        if (child && child.key === key && child.props[showProp]) {
          if (ret) {
            throw new Error("two child with same key for <rc-animate> children");
          }
          ret = child;
        }
      });
    }
    return ret;
  }
  function isSameChildren(c1, c22, showProp) {
    var same = c1.length === c22.length;
    if (same) {
      c1.forEach(function(child, index) {
        var child2 = c22[index];
        if (child && child2) {
          if (child && !child2 || !child && child2) {
            same = false;
          } else if (child.key !== child2.key) {
            same = false;
          } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
            same = false;
          }
        }
      });
    }
    return same;
  }
  function mergeChildren(prev, next) {
    var ret = [];
    var nextChildrenPending = {};
    var pendingChildren = [];
    prev.forEach(function(child) {
      if (child && findChildInChildrenByKey(next, child.key)) {
        if (pendingChildren.length) {
          nextChildrenPending[child.key] = pendingChildren;
          pendingChildren = [];
        }
      } else {
        pendingChildren.push(child);
      }
    });
    next.forEach(function(child) {
      if (child && Object.prototype.hasOwnProperty.call(nextChildrenPending, child.key)) {
        ret = ret.concat(nextChildrenPending[child.key]);
      }
      ret.push(child);
    });
    ret = ret.concat(pendingChildren);
    return ret;
  }

  // node_modules/rc-animate/es/AnimateChild.js
  init_preact_shim();

  // node_modules/@ant-design/css-animation/es/index.js
  init_preact_shim();

  // node_modules/@ant-design/css-animation/es/Event.js
  init_preact_shim();
  var START_EVENT_NAME_MAP = {
    transitionstart: {
      transition: "transitionstart",
      WebkitTransition: "webkitTransitionStart",
      MozTransition: "mozTransitionStart",
      OTransition: "oTransitionStart",
      msTransition: "MSTransitionStart"
    },
    animationstart: {
      animation: "animationstart",
      WebkitAnimation: "webkitAnimationStart",
      MozAnimation: "mozAnimationStart",
      OAnimation: "oAnimationStart",
      msAnimation: "MSAnimationStart"
    }
  };
  var END_EVENT_NAME_MAP = {
    transitionend: {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "mozTransitionEnd",
      OTransition: "oTransitionEnd",
      msTransition: "MSTransitionEnd"
    },
    animationend: {
      animation: "animationend",
      WebkitAnimation: "webkitAnimationEnd",
      MozAnimation: "mozAnimationEnd",
      OAnimation: "oAnimationEnd",
      msAnimation: "MSAnimationEnd"
    }
  };
  var startEvents = [];
  var endEvents = [];
  function detectEvents() {
    var testEl = document.createElement("div");
    var style = testEl.style;
    if (!("AnimationEvent" in window)) {
      delete START_EVENT_NAME_MAP.animationstart.animation;
      delete END_EVENT_NAME_MAP.animationend.animation;
    }
    if (!("TransitionEvent" in window)) {
      delete START_EVENT_NAME_MAP.transitionstart.transition;
      delete END_EVENT_NAME_MAP.transitionend.transition;
    }
    function process2(EVENT_NAME_MAP, events) {
      for (var baseEventName in EVENT_NAME_MAP) {
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
          var baseEvents = EVENT_NAME_MAP[baseEventName];
          for (var styleName in baseEvents) {
            if (styleName in style) {
              events.push(baseEvents[styleName]);
              break;
            }
          }
        }
      }
    }
    process2(START_EVENT_NAME_MAP, startEvents);
    process2(END_EVENT_NAME_MAP, endEvents);
  }
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    detectEvents();
  }
  function addEventListener(node, eventName, eventListener) {
    node.addEventListener(eventName, eventListener, false);
  }
  function removeEventListener(node, eventName, eventListener) {
    node.removeEventListener(eventName, eventListener, false);
  }
  var TransitionEvents = {
    startEvents,
    addStartEventListener: function addStartEventListener(node, eventListener) {
      if (startEvents.length === 0) {
        window.setTimeout(eventListener, 0);
        return;
      }
      startEvents.forEach(function(startEvent) {
        addEventListener(node, startEvent, eventListener);
      });
    },
    removeStartEventListener: function removeStartEventListener(node, eventListener) {
      if (startEvents.length === 0) {
        return;
      }
      startEvents.forEach(function(startEvent) {
        removeEventListener(node, startEvent, eventListener);
      });
    },
    endEvents,
    addEndEventListener: function addEndEventListener(node, eventListener) {
      if (endEvents.length === 0) {
        window.setTimeout(eventListener, 0);
        return;
      }
      endEvents.forEach(function(endEvent) {
        addEventListener(node, endEvent, eventListener);
      });
    },
    removeEndEventListener: function removeEndEventListener(node, eventListener) {
      if (endEvents.length === 0) {
        return;
      }
      endEvents.forEach(function(endEvent) {
        removeEventListener(node, endEvent, eventListener);
      });
    }
  };
  var Event_default = TransitionEvents;

  // node_modules/@ant-design/css-animation/es/index.js
  var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var isCssAnimationSupported = Event_default.endEvents.length !== 0;
  var capitalPrefixes = [
    "Webkit",
    "Moz",
    "O",
    "ms"
  ];
  var prefixes = ["-webkit-", "-moz-", "-o-", "ms-", ""];
  function getStyleProperty(node, name) {
    var style = window.getComputedStyle(node, null);
    var ret = "";
    for (var i3 = 0; i3 < prefixes.length; i3++) {
      ret = style.getPropertyValue(prefixes[i3] + name);
      if (ret) {
        break;
      }
    }
    return ret;
  }
  function fixBrowserByTimeout(node) {
    if (isCssAnimationSupported) {
      var transitionDelay = parseFloat(getStyleProperty(node, "transition-delay")) || 0;
      var transitionDuration = parseFloat(getStyleProperty(node, "transition-duration")) || 0;
      var animationDelay = parseFloat(getStyleProperty(node, "animation-delay")) || 0;
      var animationDuration = parseFloat(getStyleProperty(node, "animation-duration")) || 0;
      var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
      node.rcEndAnimTimeout = setTimeout(function() {
        node.rcEndAnimTimeout = null;
        if (node.rcEndListener) {
          node.rcEndListener();
        }
      }, time * 1e3 + 200);
    }
  }
  function clearBrowserBugTimeout(node) {
    if (node.rcEndAnimTimeout) {
      clearTimeout(node.rcEndAnimTimeout);
      node.rcEndAnimTimeout = null;
    }
  }
  var cssAnimation = function cssAnimation2(node, transitionName, endCallback) {
    var nameIsObj = (typeof transitionName === "undefined" ? "undefined" : _typeof2(transitionName)) === "object";
    var className = nameIsObj ? transitionName.name : transitionName;
    var activeClassName = nameIsObj ? transitionName.active : transitionName + "-active";
    var end = endCallback;
    var start = void 0;
    var active = void 0;
    if (endCallback && Object.prototype.toString.call(endCallback) === "[object Object]") {
      end = endCallback.end;
      start = endCallback.start;
      active = endCallback.active;
    }
    if (node.rcEndListener) {
      node.rcEndListener();
    }
    node.rcEndListener = function(e3) {
      if (e3 && e3.target !== node) {
        return;
      }
      if (node.rcAnimTimeout) {
        clearTimeout(node.rcAnimTimeout);
        node.rcAnimTimeout = null;
      }
      clearBrowserBugTimeout(node);
      node.classList.remove(className);
      node.classList.remove(activeClassName);
      Event_default.removeEndEventListener(node, node.rcEndListener);
      node.rcEndListener = null;
      if (end) {
        end();
      }
    };
    Event_default.addEndEventListener(node, node.rcEndListener);
    if (start) {
      start();
    }
    node.classList.add(className);
    node.rcAnimTimeout = setTimeout(function() {
      node.rcAnimTimeout = null;
      node.classList.add(activeClassName);
      if (active) {
        active();
      }
      fixBrowserByTimeout(node);
    }, 0);
    return {
      stop: function stop() {
        if (node.rcEndListener) {
          node.rcEndListener();
        }
      }
    };
  };
  cssAnimation.style = function(node, style, callback) {
    if (node.rcEndListener) {
      node.rcEndListener();
    }
    node.rcEndListener = function(e3) {
      if (e3 && e3.target !== node) {
        return;
      }
      if (node.rcAnimTimeout) {
        clearTimeout(node.rcAnimTimeout);
        node.rcAnimTimeout = null;
      }
      clearBrowserBugTimeout(node);
      Event_default.removeEndEventListener(node, node.rcEndListener);
      node.rcEndListener = null;
      if (callback) {
        callback();
      }
    };
    Event_default.addEndEventListener(node, node.rcEndListener);
    node.rcAnimTimeout = setTimeout(function() {
      for (var s3 in style) {
        if (style.hasOwnProperty(s3)) {
          node.style[s3] = style[s3];
        }
      }
      node.rcAnimTimeout = null;
      fixBrowserByTimeout(node);
    }, 0);
  };
  cssAnimation.setTransition = function(node, p3, value) {
    var property = p3;
    var v3 = value;
    if (value === void 0) {
      v3 = property;
      property = "";
    }
    property = property || "";
    capitalPrefixes.forEach(function(prefix) {
      node.style[prefix + "Transition" + property] = v3;
    });
  };
  cssAnimation.isCssAnimationSupported = isCssAnimationSupported;
  var es_default = cssAnimation;

  // node_modules/rc-animate/es/util/animate.js
  init_preact_shim();
  var util = {
    isAppearSupported: function isAppearSupported(props) {
      return props.transitionName && props.transitionAppear || props.animation.appear;
    },
    isEnterSupported: function isEnterSupported(props) {
      return props.transitionName && props.transitionEnter || props.animation.enter;
    },
    isLeaveSupported: function isLeaveSupported(props) {
      return props.transitionName && props.transitionLeave || props.animation.leave;
    },
    allowAppearCallback: function allowAppearCallback(props) {
      return props.transitionAppear || props.animation.appear;
    },
    allowEnterCallback: function allowEnterCallback(props) {
      return props.transitionEnter || props.animation.enter;
    },
    allowLeaveCallback: function allowLeaveCallback(props) {
      return props.transitionLeave || props.animation.leave;
    }
  };
  var animate_default = util;

  // node_modules/rc-animate/es/AnimateChild.js
  var _createClass2 = function() {
    function defineProperties(target, props) {
      for (var i3 = 0; i3 < props.length; i3++) {
        var descriptor = props[i3];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn2(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var transitionMap = {
    enter: "transitionEnter",
    appear: "transitionAppear",
    leave: "transitionLeave"
  };
  var AnimateChild = function(_React$Component) {
    _inherits2(AnimateChild2, _React$Component);
    function AnimateChild2() {
      _classCallCheck2(this, AnimateChild2);
      return _possibleConstructorReturn2(this, (AnimateChild2.__proto__ || Object.getPrototypeOf(AnimateChild2)).apply(this, arguments));
    }
    _createClass2(AnimateChild2, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.stop();
      }
    }, {
      key: "componentWillEnter",
      value: function componentWillEnter(done) {
        if (animate_default.isEnterSupported(this.props)) {
          this.transition("enter", done);
        } else {
          done();
        }
      }
    }, {
      key: "componentWillAppear",
      value: function componentWillAppear(done) {
        if (animate_default.isAppearSupported(this.props)) {
          this.transition("appear", done);
        } else {
          done();
        }
      }
    }, {
      key: "componentWillLeave",
      value: function componentWillLeave(done) {
        if (animate_default.isLeaveSupported(this.props)) {
          this.transition("leave", done);
        } else {
          done();
        }
      }
    }, {
      key: "transition",
      value: function transition(animationType, finishCallback) {
        var _this2 = this;
        var node = compat_module_default.findDOMNode(this);
        var props = this.props;
        var transitionName = props.transitionName;
        var nameIsObj = typeof transitionName === "object";
        this.stop();
        var end = function end2() {
          _this2.stopper = null;
          finishCallback();
        };
        if ((isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
          var name = nameIsObj ? transitionName[animationType] : transitionName + "-" + animationType;
          var activeName = name + "-active";
          if (nameIsObj && transitionName[animationType + "Active"]) {
            activeName = transitionName[animationType + "Active"];
          }
          this.stopper = es_default(node, {
            name,
            active: activeName
          }, end);
        } else {
          this.stopper = props.animation[animationType](node, end);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var stopper = this.stopper;
        if (stopper) {
          this.stopper = null;
          stopper.stop();
        }
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);
    return AnimateChild2;
  }(compat_module_default.Component);
  var AnimateChild_default = AnimateChild;

  // node_modules/rc-animate/es/Animate.js
  var _extends = Object.assign || function(target) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = arguments[i3];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass3 = function() {
    function defineProperties(target, props) {
      for (var i3 = 0; i3 < props.length; i3++) {
        var descriptor = props[i3];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classCallCheck3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn3(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits3(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var defaultKey = "rc_animate_" + Date.now();
  function getChildrenFromProps(props) {
    var children = props.children;
    if (compat_module_default.isValidElement(children)) {
      if (!children.key) {
        return compat_module_default.cloneElement(children, {
          key: defaultKey
        });
      }
    }
    return children;
  }
  function noop() {
  }
  var Animate = function(_React$Component) {
    _inherits3(Animate2, _React$Component);
    function Animate2(props) {
      _classCallCheck3(this, Animate2);
      var _this = _possibleConstructorReturn3(this, (Animate2.__proto__ || Object.getPrototypeOf(Animate2)).call(this, props));
      _initialiseProps.call(_this);
      _this.currentlyAnimatingKeys = {};
      _this.keysToEnter = [];
      _this.keysToLeave = [];
      _this.state = {
        children: toArrayChildren(getChildrenFromProps(props))
      };
      _this.childrenRefs = {};
      return _this;
    }
    _createClass3(Animate2, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        var showProp = this.props.showProp;
        var children = this.state.children;
        if (showProp) {
          children = children.filter(function(child) {
            return !!child.props[showProp];
          });
        }
        children.forEach(function(child) {
          if (child) {
            _this2.performAppear(child.key);
          }
        });
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var _this3 = this;
        this.nextProps = nextProps;
        var nextChildren = toArrayChildren(getChildrenFromProps(nextProps));
        var props = this.props;
        if (props.exclusive) {
          Object.keys(this.currentlyAnimatingKeys).forEach(function(key) {
            _this3.stop(key);
          });
        }
        var showProp = props.showProp;
        var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
        var currentChildren = props.exclusive ? toArrayChildren(getChildrenFromProps(props)) : this.state.children;
        var newChildren = [];
        if (showProp) {
          currentChildren.forEach(function(currentChild) {
            var nextChild = currentChild && findChildInChildrenByKey(nextChildren, currentChild.key);
            var newChild = void 0;
            if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
              newChild = compat_module_default.cloneElement(nextChild || currentChild, _defineProperty2({}, showProp, true));
            } else {
              newChild = nextChild;
            }
            if (newChild) {
              newChildren.push(newChild);
            }
          });
          nextChildren.forEach(function(nextChild) {
            if (!nextChild || !findChildInChildrenByKey(currentChildren, nextChild.key)) {
              newChildren.push(nextChild);
            }
          });
        } else {
          newChildren = mergeChildren(currentChildren, nextChildren);
        }
        this.setState({
          children: newChildren
        });
        nextChildren.forEach(function(child) {
          var key = child && child.key;
          if (child && currentlyAnimatingKeys[key]) {
            return;
          }
          var hasPrev = child && findChildInChildrenByKey(currentChildren, key);
          if (showProp) {
            var showInNext = child.props[showProp];
            if (hasPrev) {
              var showInNow = findShownChildInChildrenByKey(currentChildren, key, showProp);
              if (!showInNow && showInNext) {
                _this3.keysToEnter.push(key);
              }
            } else if (showInNext) {
              _this3.keysToEnter.push(key);
            }
          } else if (!hasPrev) {
            _this3.keysToEnter.push(key);
          }
        });
        currentChildren.forEach(function(child) {
          var key = child && child.key;
          if (child && currentlyAnimatingKeys[key]) {
            return;
          }
          var hasNext = child && findChildInChildrenByKey(nextChildren, key);
          if (showProp) {
            var showInNow = child.props[showProp];
            if (hasNext) {
              var showInNext = findShownChildInChildrenByKey(nextChildren, key, showProp);
              if (!showInNext && showInNow) {
                _this3.keysToLeave.push(key);
              }
            } else if (showInNow) {
              _this3.keysToLeave.push(key);
            }
          } else if (!hasNext) {
            _this3.keysToLeave.push(key);
          }
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var keysToEnter = this.keysToEnter;
        this.keysToEnter = [];
        keysToEnter.forEach(this.performEnter);
        var keysToLeave = this.keysToLeave;
        this.keysToLeave = [];
        keysToLeave.forEach(this.performLeave);
      }
    }, {
      key: "isValidChildByKey",
      value: function isValidChildByKey(currentChildren, key) {
        var showProp = this.props.showProp;
        if (showProp) {
          return findShownChildInChildrenByKey(currentChildren, key, showProp);
        }
        return findChildInChildrenByKey(currentChildren, key);
      }
    }, {
      key: "stop",
      value: function stop(key) {
        delete this.currentlyAnimatingKeys[key];
        var component = this.childrenRefs[key];
        if (component) {
          component.stop();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;
        var props = this.props;
        this.nextProps = props;
        var stateChildren = this.state.children;
        var children = null;
        if (stateChildren) {
          children = stateChildren.map(function(child) {
            if (child === null || child === void 0) {
              return child;
            }
            if (!child.key) {
              throw new Error("must set key for <rc-animate> children");
            }
            return compat_module_default.createElement(AnimateChild_default, {
              key: child.key,
              ref: function ref(node) {
                _this4.childrenRefs[child.key] = node;
              },
              animation: props.animation,
              transitionName: props.transitionName,
              transitionEnter: props.transitionEnter,
              transitionAppear: props.transitionAppear,
              transitionLeave: props.transitionLeave
            }, child);
          });
        }
        var Component = props.component;
        if (Component) {
          var passedProps = props;
          if (typeof Component === "string") {
            passedProps = _extends({
              className: props.className,
              style: props.style
            }, props.componentProps);
          }
          return compat_module_default.createElement(Component, passedProps, children);
        }
        return children[0] || null;
      }
    }]);
    return Animate2;
  }(compat_module_default.Component);
  Animate.isAnimate = true;
  Animate.defaultProps = {
    animation: {},
    component: "span",
    componentProps: {},
    transitionEnter: true,
    transitionLeave: true,
    transitionAppear: false,
    onEnd: noop,
    onEnter: noop,
    onLeave: noop,
    onAppear: noop
  };
  var _initialiseProps = function _initialiseProps2() {
    var _this5 = this;
    this.performEnter = function(key) {
      if (_this5.childrenRefs[key]) {
        _this5.currentlyAnimatingKeys[key] = true;
        _this5.childrenRefs[key].componentWillEnter(_this5.handleDoneAdding.bind(_this5, key, "enter"));
      }
    };
    this.performAppear = function(key) {
      if (_this5.childrenRefs[key]) {
        _this5.currentlyAnimatingKeys[key] = true;
        _this5.childrenRefs[key].componentWillAppear(_this5.handleDoneAdding.bind(_this5, key, "appear"));
      }
    };
    this.handleDoneAdding = function(key, type) {
      var props = _this5.props;
      delete _this5.currentlyAnimatingKeys[key];
      if (props.exclusive && props !== _this5.nextProps) {
        return;
      }
      var currentChildren = toArrayChildren(getChildrenFromProps(props));
      if (!_this5.isValidChildByKey(currentChildren, key)) {
        _this5.performLeave(key);
      } else if (type === "appear") {
        if (animate_default.allowAppearCallback(props)) {
          props.onAppear(key);
          props.onEnd(key, true);
        }
      } else if (animate_default.allowEnterCallback(props)) {
        props.onEnter(key);
        props.onEnd(key, true);
      }
    };
    this.performLeave = function(key) {
      if (_this5.childrenRefs[key]) {
        _this5.currentlyAnimatingKeys[key] = true;
        _this5.childrenRefs[key].componentWillLeave(_this5.handleDoneLeaving.bind(_this5, key));
      }
    };
    this.handleDoneLeaving = function(key) {
      var props = _this5.props;
      delete _this5.currentlyAnimatingKeys[key];
      if (props.exclusive && props !== _this5.nextProps) {
        return;
      }
      var currentChildren = toArrayChildren(getChildrenFromProps(props));
      if (_this5.isValidChildByKey(currentChildren, key)) {
        _this5.performEnter(key);
      } else {
        var end = function end2() {
          if (animate_default.allowLeaveCallback(props)) {
            props.onLeave(key);
            props.onEnd(key, false);
          }
        };
        if (!isSameChildren(_this5.state.children, currentChildren, props.showProp)) {
          _this5.setState({
            children: currentChildren
          }, end);
        } else {
          end();
        }
      }
    };
  };
  var Animate_default = unsafeLifecyclesPolyfill_default(Animate);

  // node_modules/rc-util/es/createChainedFunction.js
  init_preact_shim();
  function createChainedFunction() {
    var args = [].slice.call(arguments, 0);
    if (args.length === 1) {
      return args[0];
    }
    return function chainedFunction() {
      for (var i3 = 0; i3 < args.length; i3++) {
        if (args[i3] && args[i3].apply) {
          args[i3].apply(this, arguments);
        }
      }
    };
  }

  // node_modules/rc-notification/es/Notification.js
  var import_classnames2 = __toESM(require_classnames());

  // node_modules/rc-notification/es/Notice.js
  init_preact_shim();
  var import_classnames = __toESM(require_classnames());
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function() {
      var Super = _getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      }));
      return true;
    } catch (e3) {
      return false;
    }
  }
  var Notice = /* @__PURE__ */ function(_Component) {
    _inherits(Notice2, _Component);
    var _super = _createSuper(Notice2);
    function Notice2() {
      var _this;
      _classCallCheck(this, Notice2);
      _this = _super.apply(this, arguments);
      _this.closeTimer = null;
      _this.close = function(e3) {
        if (e3) {
          e3.stopPropagation();
        }
        _this.clearCloseTimer();
        var onClose2 = _this.props.onClose;
        if (onClose2) {
          onClose2();
        }
      };
      _this.startCloseTimer = function() {
        if (_this.props.duration) {
          _this.closeTimer = window.setTimeout(function() {
            _this.close();
          }, _this.props.duration * 1e3);
        }
      };
      _this.clearCloseTimer = function() {
        if (_this.closeTimer) {
          clearTimeout(_this.closeTimer);
          _this.closeTimer = null;
        }
      };
      return _this;
    }
    _createClass(Notice2, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.startCloseTimer();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.duration !== prevProps.duration || this.props.update) {
          this.restartCloseTimer();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearCloseTimer();
      }
    }, {
      key: "restartCloseTimer",
      value: function restartCloseTimer() {
        this.clearCloseTimer();
        this.startCloseTimer();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var _this$props = this.props, prefixCls = _this$props.prefixCls, className = _this$props.className, closable = _this$props.closable, closeIcon = _this$props.closeIcon, style = _this$props.style, onClick = _this$props.onClick, children = _this$props.children, holder = _this$props.holder;
        var componentClass = "".concat(prefixCls, "-notice");
        var dataOrAriaAttributeProps = Object.keys(this.props).reduce(function(acc, key) {
          if (key.substr(0, 5) === "data-" || key.substr(0, 5) === "aria-" || key === "role") {
            acc[key] = _this2.props[key];
          }
          return acc;
        }, {});
        var node = compat_module_default.createElement("div", Object.assign({
          className: (0, import_classnames.default)(componentClass, className, _defineProperty({}, "".concat(componentClass, "-closable"), closable)),
          style,
          onMouseEnter: this.clearCloseTimer,
          onMouseLeave: this.startCloseTimer,
          onClick
        }, dataOrAriaAttributeProps), compat_module_default.createElement("div", {
          className: "".concat(componentClass, "-content")
        }, children), closable ? compat_module_default.createElement("a", {
          tabIndex: 0,
          onClick: this.close,
          className: "".concat(componentClass, "-close")
        }, closeIcon || compat_module_default.createElement("span", {
          className: "".concat(componentClass, "-close-x")
        })) : null);
        if (holder) {
          return compat_module_default.createPortal(node, holder);
        }
        return node;
      }
    }]);
    return Notice2;
  }(_);
  Notice.defaultProps = {
    onClose: function onClose() {
    },
    duration: 1.5,
    style: {
      right: "50%"
    }
  };

  // node_modules/rc-notification/es/useNotification.js
  init_preact_shim();

  // node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
  init_preact_shim();

  // node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
  init_preact_shim();

  // node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
  init_preact_shim();
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
      arr2[i3] = arr[i3];
    }
    return arr2;
  }

  // node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }

  // node_modules/@babel/runtime/helpers/esm/iterableToArray.js
  init_preact_shim();
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }

  // node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
  init_preact_shim();
  function _unsupportedIterableToArray(o3, minLen) {
    if (!o3)
      return;
    if (typeof o3 === "string")
      return _arrayLikeToArray(o3, minLen);
    var n2 = Object.prototype.toString.call(o3).slice(8, -1);
    if (n2 === "Object" && o3.constructor)
      n2 = o3.constructor.name;
    if (n2 === "Map" || n2 === "Set")
      return Array.from(o3);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return _arrayLikeToArray(o3, minLen);
  }

  // node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
  init_preact_shim();
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  // node_modules/@babel/runtime/helpers/esm/slicedToArray.js
  init_preact_shim();

  // node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
  init_preact_shim();
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }

  // node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
  init_preact_shim();
  function _iterableToArrayLimit(arr, i3) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i3 && _arr.length === i3)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }

  // node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
  init_preact_shim();
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // node_modules/@babel/runtime/helpers/esm/slicedToArray.js
  function _slicedToArray(arr, i3) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i3) || _unsupportedIterableToArray(arr, i3) || _nonIterableRest();
  }

  // node_modules/rc-notification/es/useNotification.js
  function useNotification(notificationInstance) {
    var createdRef = s2({});
    var _React$useState = d2([]), _React$useState2 = _slicedToArray(_React$useState, 2), elements = _React$useState2[0], setElements = _React$useState2[1];
    function notify(noticeProps) {
      notificationInstance.add(noticeProps, function(div, props) {
        var key = props.key;
        if (div && !createdRef.current[key]) {
          var noticeEle = v(Notice, Object.assign({}, props, {
            holder: div
          }));
          createdRef.current[key] = noticeEle;
          setElements(function(originElements) {
            return [].concat(_toConsumableArray(originElements), [noticeEle]);
          });
        }
      });
    }
    return [notify, v(d, null, elements)];
  }

  // node_modules/rc-notification/es/Notification.js
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = arguments[i3] != null ? arguments[i3] : {};
      if (i3 % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _createSuper2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct2();
    return function() {
      var Super = _getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _isNativeReflectConstruct2() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      }));
      return true;
    } catch (e3) {
      return false;
    }
  }
  var seed = 0;
  var now = Date.now();
  function getUuid() {
    var id = seed;
    seed += 1;
    return "rcNotification_".concat(now, "_").concat(id);
  }
  var Notification = /* @__PURE__ */ function(_Component) {
    _inherits(Notification2, _Component);
    var _super = _createSuper2(Notification2);
    function Notification2() {
      var _this;
      _classCallCheck(this, Notification2);
      _this = _super.apply(this, arguments);
      _this.state = {
        notices: []
      };
      _this.hookRefs = /* @__PURE__ */ new Map();
      _this.add = function(notice2, holderCallback) {
        notice2.key = notice2.key || getUuid();
        var key = notice2.key;
        var maxCount = _this.props.maxCount;
        _this.setState(function(previousState) {
          var notices = previousState.notices;
          var noticeIndex = notices.map(function(v3) {
            return v3.notice.key;
          }).indexOf(key);
          var updatedNotices = notices.concat();
          if (noticeIndex !== -1) {
            updatedNotices.splice(noticeIndex, 1, {
              notice: notice2,
              holderCallback
            });
          } else {
            if (maxCount && notices.length >= maxCount) {
              notice2.updateKey = updatedNotices[0].notice.updateKey || updatedNotices[0].notice.key;
              updatedNotices.shift();
            }
            updatedNotices.push({
              notice: notice2,
              holderCallback
            });
          }
          return {
            notices: updatedNotices
          };
        });
      };
      _this.remove = function(key) {
        _this.setState(function(previousState) {
          return {
            notices: previousState.notices.filter(function(_ref) {
              var notice2 = _ref.notice;
              return notice2.key !== key;
            })
          };
        });
      };
      return _this;
    }
    _createClass(Notification2, [{
      key: "getTransitionName",
      value: function getTransitionName() {
        var _this$props = this.props, prefixCls = _this$props.prefixCls, animation = _this$props.animation;
        var transitionName = this.props.transitionName;
        if (!transitionName && animation) {
          transitionName = "".concat(prefixCls, "-").concat(animation);
        }
        return transitionName;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var notices = this.state.notices;
        var _this$props2 = this.props, prefixCls = _this$props2.prefixCls, className = _this$props2.className, closeIcon = _this$props2.closeIcon, style = _this$props2.style;
        var noticeNodes = notices.map(function(_ref2, index) {
          var notice2 = _ref2.notice, holderCallback = _ref2.holderCallback;
          var update = Boolean(index === notices.length - 1 && notice2.updateKey);
          var key = notice2.updateKey ? notice2.updateKey : notice2.key;
          var onClose2 = createChainedFunction(_this2.remove.bind(_this2, notice2.key), notice2.onClose);
          var noticeProps = _objectSpread(_objectSpread(_objectSpread({
            prefixCls,
            closeIcon
          }, notice2), notice2.props), {}, {
            key,
            update,
            onClose: onClose2,
            onClick: notice2.onClick,
            children: notice2.content
          });
          if (holderCallback) {
            return compat_module_default.createElement("div", {
              key,
              className: "".concat(prefixCls, "-hook-holder"),
              ref: function ref(div) {
                if (typeof key === "undefined") {
                  return;
                }
                if (div) {
                  _this2.hookRefs.set(key, div);
                  holderCallback(div, noticeProps);
                } else {
                  _this2.hookRefs.delete(key);
                }
              }
            });
          }
          return compat_module_default.createElement(Notice, Object.assign({}, noticeProps));
        });
        return compat_module_default.createElement("div", {
          className: (0, import_classnames2.default)(prefixCls, className),
          style
        }, compat_module_default.createElement(Animate_default, {
          transitionName: this.getTransitionName()
        }, noticeNodes));
      }
    }]);
    return Notification2;
  }(_);
  Notification.defaultProps = {
    prefixCls: "rc-notification",
    animation: "fade",
    style: {
      top: 65,
      left: "50%"
    }
  };
  Notification.newInstance = function newNotificationInstance(properties, callback) {
    var _ref3 = properties || {}, getContainer = _ref3.getContainer, props = _objectWithoutProperties(_ref3, ["getContainer"]);
    var div = document.createElement("div");
    if (getContainer) {
      var root = getContainer();
      root.appendChild(div);
    } else {
      document.body.appendChild(div);
    }
    var called = false;
    function ref(notification2) {
      if (called) {
        return;
      }
      called = true;
      callback({
        notice: function notice2(noticeProps) {
          notification2.add(noticeProps);
        },
        removeNotice: function removeNotice(key) {
          notification2.remove(key);
        },
        component: notification2,
        destroy: function destroy() {
          compat_module_default.unmountComponentAtNode(div);
          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
        },
        useNotification: function useNotification2() {
          return useNotification(notification2);
        }
      });
    }
    if (false) {
      properties.TEST_RENDER(compat_module_default.createElement(Notification, Object.assign({}, props, {
        ref
      })));
      return;
    }
    compat_module_default.render(compat_module_default.createElement(Notification, Object.assign({}, props, {
      ref
    })), div);
  };
  var Notification_default = Notification;

  // node_modules/rc-notification/es/index.js
  var es_default2 = Notification_default;

  // src/assets/close.svg
  init_preact_shim();
  var SvgClose = (props) => /* @__PURE__ */ v("svg", __spreadValues({
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    width: 200,
    height: 200
  }, props), /* @__PURE__ */ v("path", {
    d: "M806.4 172.8 172.8 806.4c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l633.6-633.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0z",
    fill: "#333"
  }), /* @__PURE__ */ v("path", {
    d: "M172.8 172.8c-12.8 12.8-12.8 32 0 44.8l633.6 633.6c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L217.6 172.8c-12.8-12.8-32-12.8-44.8 0z",
    fill: "#333"
  }));
  var close_default = SvgClose;

  // src/components/Notification.tsx
  var defaultDuration = 3;
  var notification = null;
  var getNoticeProps = (args) => {
    const {
      duration: durationArg,
      description,
      message
    } = args;
    const key = `key${Date.now()}`;
    const duration = durationArg === void 0 ? defaultDuration : durationArg;
    return {
      content: /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("div", {
        className: "notification-message"
      }, message), /* @__PURE__ */ v("div", {
        className: "notification-description"
      }, description)),
      key,
      duration,
      closable: true,
      closeIcon: /* @__PURE__ */ v(close_default, null),
      style: {
        right: 0
      },
      onClose: () => {
        notification.removeNotice(key);
      }
    };
  };
  es_default2.newInstance({
    prefixCls: "easy-notification",
    style: {
      right: "0px",
      top: "24px"
    }
  }, (n2) => {
    notification = n2;
  });
  var notice = (options) => {
    notification.notice(getNoticeProps(options));
  };
  var NotificationApi = {
    open: notice
  };
  var Notification_default2 = NotificationApi;

  // src/common.ts
  var formatTorrentTitle = (title) => {
    return title.replace(/\.(?!(\d+))/ig, " ").replace(/\.(?=\d{4}|48|57|72|2k|4k|7.1|6.1|5.1|4.1|2.0|1.0)/ig, " ").trim();
  };
  var handleError = (error) => {
    Notification_default2.open({
      description: error.message || error
    });
  };
  var getDoubanInfo = async (doubanUrl) => {
    try {
      if (doubanUrl) {
        const doubanInfo = await getMobileDoubanInfo(doubanUrl);
        return doubanInfo;
      }
      throw $t("\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25");
    } catch (error) {
      handleError(error);
    }
  };
  var getDoubanBookInfo = async (doubanUrl) => {
    const reqUrl = `${PT_GEN_API}?url=${doubanUrl}`;
    const data = await fetch(reqUrl, {
      responseType: "json"
    });
    const { chinese_title, origin_title } = data;
    let foreignTitle = "";
    if (chinese_title !== origin_title) {
      foreignTitle = origin_title;
    }
    if (data) {
      return __spreadProps(__spreadValues({}, data), {
        chineseTitle: chinese_title,
        foreignTitle
      });
    }
  };
  var getDoubanAwards = async (doubanId) => {
    const data = await fetch(`https://movie.douban.com/subject/${doubanId}/awards`, {
      responseType: void 0
    });
    const doc = new DOMParser().parseFromString(data, "text/html");
    const linkDom = doc.querySelector("#content > div > div.article");
    return linkDom == null ? void 0 : linkDom.innerHTML.replace(/[ \n]/g, "").replace(/<\/li><li>/g, "</li> <li>").replace(/<\/a><span/g, "</a> <span").replace(/<(div|ul)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/ +\n/g, "\n").trim();
  };
  var getIMDBFromDouban = async (doubanLink) => {
    var _a3, _b2, _c, _d;
    const doubanPage = await fetch(doubanLink, {
      responseType: void 0
    });
    const dom = new DOMParser().parseFromString(doubanPage, "text/html");
    const imdbId = (_d = (_c = (_b2 = (_a3 = jQuery('#info span.pl:contains("IMDb")', dom)[0]) == null ? void 0 : _a3.nextSibling) == null ? void 0 : _b2.nodeValue) == null ? void 0 : _c.trim()) != null ? _d : "";
    return imdbId;
  };
  var getMobileDoubanInfo = async (doubanUrl, imdbLink) => {
    var _a3, _b2, _c, _d;
    try {
      if (doubanUrl) {
        const doubanId = (_b2 = (_a3 = doubanUrl.match(/subject\/(\d+)/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
        if (!doubanId) {
          throw $t("\u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25");
        }
        const url = `${DOUBAN_MOBILE_API}/movie/${doubanId}/`;
        const options = {
          headers: {
            Referer: `https://m.douban.com/movie/subject/${doubanId}`
          },
          cookie: "",
          anonymous: false
        };
        const cookie = getValue("easy-seed.douban-cookie", false);
        const ckValue = (_d = (_c = cookie == null ? void 0 : cookie.match(/ck=([^;]+)?/)) == null ? void 0 : _c[1]) != null ? _d : "";
        if (cookie) {
          options.cookie = cookie;
          options.anonymous = true;
        }
        const data = await fetch(`${url}?for_mobile=1&ck=${ckValue}`, options);
        if (data && data.title === "\u672A\u77E5\u7535\u5F71") {
          throw $t("\u8BF7\u914D\u7F6E\u8C46\u74E3Cookie");
        }
        if (data && data.id) {
          const creditsData = await fetch(`${url}/credits`, options);
          data.credits = creditsData.credits;
          const awards = await getDoubanAwards(doubanId);
          data.awards = awards;
          return await formatDoubanInfo(data);
        }
        throw $t("\u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25");
      } else {
        throw $t("\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25");
      }
    } catch (error) {
      handleError(error);
    }
  };
  var getIMDBRating = async (imdbId) => {
    var _a3, _b2, _c, _d;
    const url = `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json`;
    const data = await fetch(url, {
      responseType: void 0
    });
    const { resource } = (_b2 = JSON.parse((_a3 = data.match(/[^(]+\((.+)\)/)) == null ? void 0 : _a3[1])) != null ? _b2 : {};
    return {
      count: resource.ratingCount,
      value: resource.rating,
      id: (_d = (_c = resource.id.match(/tt\d+/)) == null ? void 0 : _c[0]) != null ? _d : ""
    };
  };
  var formatDoubanInfo = async (data) => {
    const {
      rating,
      pubdate,
      year,
      languages,
      genres,
      title,
      intro,
      actors,
      durations,
      cover_url,
      countries,
      url,
      original_title,
      directors,
      aka,
      episodes_count,
      credits,
      awards
    } = data;
    const { imdbUrl } = TORRENT_INFO;
    let imdbId = "";
    if (!imdbUrl) {
      imdbId = await getIMDBFromDouban(url);
    } else {
      imdbId = getIMDBIdByUrl(imdbUrl);
    }
    const imdbRate = await getIMDBRating(imdbId);
    let foreignTitle = "";
    if (title !== original_title) {
      foreignTitle = original_title;
    }
    let poster = cover_url;
    if (poster.includes("img3")) {
      poster = poster.replace("img3", "img1").replace(/m(_ratio_poster)/, "l$1");
    }
    const formatData = {
      imdbId: imdbRate.id,
      imdbLink: `https://www.imdb.com/title/${imdbRate.id}/`,
      imdbAverageRating: imdbRate.value,
      imdbVotes: imdbRate.count,
      imdbRating: `${imdbRate.value}/10 from ${imdbRate.count} users`,
      chineseTitle: title,
      foreignTitle,
      aka,
      transTitle: Array.from(/* @__PURE__ */ new Set([original_title ? title : "", ...aka])).filter(Boolean),
      thisTitle: [original_title || title],
      year,
      playDate: pubdate,
      region: countries.join(" / "),
      genre: genres,
      language: languages,
      episodes: episodes_count > 0 ? `${episodes_count}` : "",
      duration: durations.join(" / "),
      introduction: intro,
      doubanLink: url,
      doubanRatingAverage: rating.value,
      doubanVotes: `${rating.count}`,
      doubanRating: `${rating.value}/10 from ${rating.count} users`,
      poster,
      director: directors,
      cast: actors,
      writer: [],
      credits,
      awards
    };
    formatData.format = getDoubanFormat(formatData);
    return formatData;
  };
  var getDoubanFormat = (data) => {
    const {
      poster,
      thisTitle,
      transTitle,
      genre,
      year: movieYear,
      region,
      language,
      playDate,
      imdbRating,
      imdbLink,
      doubanRating,
      doubanLink,
      episodes: showEpisodes,
      duration: movieDuration,
      introduction,
      awards,
      tags,
      credits = []
    } = data;
    const spaceStr = "\xA0".repeat(7);
    const creditsData = credits.map((credit) => {
      const celebrity = credit.celebrities.map((item) => {
        return `${item.name} ${item.latin_name}`;
      });
      const repeatMap = {
        2: 7,
        3: 2,
        4: 0,
        5: 0
      };
      const celebrityKey = credit.title.split("").join("\xA0".repeat((repeatMap == null ? void 0 : repeatMap[credit.title.length]) || 0));
      const celebrityValue = celebrity.join(`
${"\xA0".repeat(24)}`).trim();
      return `\u25CE${celebrityKey}${spaceStr}${celebrityValue}`;
    });
    let descr = poster ? `[img]${poster}[/img]

` : "";
    descr += transTitle ? `\u25CE\u8BD1${spaceStr}\u540D${spaceStr}${transTitle.join(" / ")}
` : "";
    descr += thisTitle ? `\u25CE\u7247${spaceStr}\u540D${spaceStr}${thisTitle.join(" / ")}
` : "";
    descr += movieYear ? `\u25CE\u5E74${spaceStr}\u4EE3${spaceStr}${movieYear.trim()}
` : "";
    descr += region ? `\u25CE\u4EA7${spaceStr}\u5730${spaceStr}${region}
` : "";
    descr += genre ? `\u25CE\u7C7B${spaceStr}\u522B${spaceStr}${genre.join(" / ")}
` : "";
    descr += language ? `\u25CE\u8BED${spaceStr}\u8A00${spaceStr}${language.join(" / ")}
` : "";
    descr += playDate ? `\u25CE\u4E0A\u6620\u65E5\u671F${spaceStr} ${playDate.join(" / ")}
` : "";
    descr += imdbRating ? `\u25CEIMDb\u8BC4\u5206${spaceStr}${imdbRating}
` : "";
    descr += imdbLink ? `\u25CEIMDb\u94FE\u63A5${spaceStr}${imdbLink}
` : "";
    descr += doubanRating ? `\u25CE\u8C46\u74E3\u8BC4\u5206${spaceStr} ${doubanRating}
` : "";
    descr += doubanLink ? `\u25CE\u8C46\u74E3\u94FE\u63A5${spaceStr} ${doubanLink}
` : "";
    descr += showEpisodes ? `\u25CE\u96C6${spaceStr}\u6570${spaceStr}${showEpisodes}
` : "";
    descr += movieDuration ? `\u25CE\u7247${spaceStr}\u957F${spaceStr}${movieDuration}
` : "";
    descr += creditsData.length > 0 ? creditsData.join("\n") : "";
    descr += tags && tags.length > 0 ? `
\u25CE\u6807${spaceStr}\u7B7E${spaceStr}${tags.join(" | ")} 
` : "";
    descr += introduction ? `
\u25CE\u7B80${spaceStr}\u4ECB

  ${introduction.replace(/\n/g, `
${"\xA0".repeat(2)}`)} 
` : "";
    descr += awards ? `
\u25CE\u83B7\u5956\u60C5\u51B5

\u3000\u3000${awards.replace(/\n/g, `
${"\xA0".repeat(6)}`)} 
` : "";
    return descr.trim();
  };
  var getDoubanIdByIMDB = async (query) => {
    var _a3, _b2, _c, _d;
    try {
      const imdbId = getIMDBIdByUrl(query);
      const params = imdbId || query;
      const url = DOUBAN_SUGGEST_API.replace("{query}", params);
      const options = {
        cookie: "",
        anonymous: false,
        responseType: void 0
      };
      const cookie = getValue("easy-seed.douban-cookie", false);
      if (cookie) {
        options.cookie = cookie;
        options.anonymous = true;
      }
      const data = await fetch(url, options);
      const doc = new DOMParser().parseFromString(data, "text/html");
      const linkDom = doc.querySelector(".result-list .result h3 a");
      if (!linkDom) {
        throw $t("\u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25");
      } else {
        const { href, textContent } = linkDom;
        const season = (_b2 = (_a3 = textContent == null ? void 0 : textContent.match(/第(.+?)季/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
        const doubanId = (_d = (_c = decodeURIComponent(href).match(/subject\/(\d+)/)) == null ? void 0 : _c[1]) != null ? _d : "";
        return {
          id: doubanId,
          season,
          title: textContent || ""
        };
      }
    } catch (error) {
      handleError(error);
    }
  };
  var getIMDBData = async (imdbUrl) => {
    try {
      if (!imdbUrl) {
        throw new Error("$t(\u7F3A\u5C11IMDB\u4FE1\u606F)");
      }
      const data = await fetch(`${PT_GEN_API}?url=${imdbUrl}`);
      if (data && data.success) {
        return data;
      }
      throw data.error || $t("\u8BF7\u6C42\u5931\u8D25");
    } catch (error) {
      handleError(error);
    }
  };
  var transferImgs = async (screenshot, authToken, imgHost = "https://imgbb.com/json") => {
    try {
      const isHdbHost = !!screenshot.match(/i\.hdbits\.org/);
      const formData = new FormData();
      if (isHdbHost || imgHost.includes("gifyu")) {
        const promiseArray = [urlToFile(screenshot)];
        const [fileData] = await Promise.all(promiseArray);
        formData.append("type", "file");
        formData.append("source", fileData);
      } else {
        formData.append("type", "url");
        formData.append("source", screenshot);
      }
      formData.append("action", "upload");
      formData.append("timestamp", `${Date.now()}`);
      formData.append("auth_token", authToken);
      const res = await fetch(imgHost, {
        method: "POST",
        data: formData,
        timeout: 3e5
      });
      if (res.status_txt !== "OK") {
        throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
      if (res.image) {
        return res.image;
      }
      throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
    } catch (error) {
      console.log("err:", error);
      handleError(error);
    }
  };
  var uploadToPixhost = async (screenshots) => {
    try {
      const params = encodeURI(`imgs=${screenshots.join("\n")}&content_type=1&max_th_size=300`);
      const res = await fetch("https://pixhost.to/remote/", {
        method: "POST",
        data: params,
        timeout: 3e5,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        responseType: void 0
      });
      const data = res.match(/(upload_results = )({.*})(;)/);
      if (!data) {
        throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
      let imgResultList = [];
      if (data && data.length) {
        imgResultList = JSON.parse(data[2]).images;
        if (imgResultList.length < 1) {
          throw new Error($t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
        }
        return imgResultList;
      }
      throw new Error($t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
    } catch (error) {
      handleError(error);
    }
  };
  var uploadToImgbox = async (screenshot, authToken, tokenSecret) => {
    const file = await urlToFile(screenshot);
    const { token_id, token_secret } = tokenSecret;
    const options = {
      method: "POST",
      headers: {
        "X-CSRF-Token": authToken
      }
    };
    const formData = new FormData();
    formData.append("token_id", token_id);
    formData.append("token_secret", token_secret);
    formData.append("content_type", "1");
    formData.append("thumbnail_size", "350r");
    formData.append("gallery_id", "null");
    formData.append("gallery_secret", "null");
    formData.append("comments_enabled", "0");
    formData.append("files[]", file);
    options.data = formData;
    const data = await fetch("https://imgbox.com/upload/process", options);
    if (data && data.files && data.files.length) {
      return data.files[0];
    }
  };
  var uploadToHDB = async (screenshots, galleryName) => {
    const apiUrl = "https://img.hdbits.org/upload_api.php";
    try {
      const promiseArray = screenshots.map((item) => {
        return urlToFile(item);
      });
      const files = await Promise.all(promiseArray);
      const firstFile = files.shift();
      const formData = new FormData();
      formData.append("galleryoption", "1");
      formData.append("galleryname", galleryName);
      formData.append("images_files[]", firstFile);
      const firstResp = await fetch(apiUrl, {
        data: formData,
        method: "POST",
        responseType: void 0
      });
      if (firstResp.includes("error")) {
        throw firstResp;
      }
      const reqs = files.map((file) => {
        const formData2 = new FormData();
        formData2.append("galleryoption", "2");
        formData2.append("galleryname", galleryName);
        formData2.append("images_files[]", file);
        return fetch(apiUrl, {
          data: formData2,
          method: "POST",
          responseType: void 0
        });
      });
      const resp = await Promise.all(reqs);
      const respStr = resp.join("");
      if (respStr.includes("error")) {
        throw respStr;
      }
      return firstResp + respStr;
    } catch (error) {
      handleError(error);
    }
  };
  var getPreciseCategory = (torrentInfo2, category) => {
    var _a3, _b2;
    const { description, title, subtitle, doubanInfo } = torrentInfo2;
    const movieGenre = (_b2 = (_a3 = (description + doubanInfo).match(/(类\s+别)\s+(.+)?/)) == null ? void 0 : _a3[2]) != null ? _b2 : "";
    if (movieGenre.match(/动画/)) {
      return "cartoon";
    } else if (movieGenre.match(/纪录/)) {
      return "documentary";
    } else if ((subtitle == null ? void 0 : subtitle.match(/全.+?集/)) || title.match(/s0?\d{1,2}[^(e|.e)]/i)) {
      return "tvPack";
    }
    if (category == null ? void 0 : category.match(/tv/)) {
      if (title.match(/(s0?\d{1,2})?e(p)?\d{1,2}/i) || (subtitle == null ? void 0 : subtitle.match(/第[^\s]集/))) {
        return "tv";
      }
      return "tvPack";
    }
    return category;
  };
  var getUrlParam = (key) => {
    const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
    const regArray = location.search.substring(1).match(reg);
    if (regArray) {
      return decodeURIComponent(regArray[2]);
    }
    return "";
  };
  var getAudioCodecFromTitle = (title) => {
    if (!title) {
      return "";
    }
    title = title.replace(/:|-|\s/g, "");
    if (title.match(/atmos/i)) {
      return "atmos";
    } else if (title.match(/dtshdma/i)) {
      return "dtshdma";
    } else if (title.match(/dtsx/i)) {
      return "dtsx";
    } else if (title.match(/dts/i)) {
      return "dts";
    } else if (title.match(/truehd/i)) {
      return "truehd";
    } else if (title.match(/lpcm/i)) {
      return "lpcm";
    } else if (title.match(/flac/i)) {
      return "flac";
    } else if (title.match(/aac/i)) {
      return "aac";
    } else if (title.match(/DD\+|DDP|DolbyDigitalPlus/i)) {
      return "dd+";
    } else if (title.match(/DD|DolbyDigital/i)) {
      return "dd";
    } else if (title.match(/ac3/i)) {
      return "ac3";
    }
    return "";
  };
  var getVideoCodecFromTitle = (title, videoType = "") => {
    title = title.replace(/\.|-/g, "");
    if (title.match(/x264/i) || title.match(/h264|avc/i) && videoType === "encode") {
      return "x264";
    } else if (title.match(/h264|AVC/i)) {
      return "h264";
    } else if (title.match(/x265/i) || title.match(/h265|hevc/i) && videoType === "encode") {
      return "x265";
    } else if (title.match(/hevc|h265/i)) {
      return "hevc";
    } else if (title.match(/vc-?1/i)) {
      return "vc1";
    } else if (title.match(/mpeg-?2/i)) {
      return "mpeg2";
    } else if (title.match(/mpeg-?4/i)) {
      return "mpeg4";
    } else if (title.match(/vvc/i)) {
      return "vvc";
    }
    return "";
  };
  var getFilterImages = (bbcode) => {
    var _a3;
    if (!bbcode) {
      return [];
    }
    let allImages = Array.from((_a3 = bbcode.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g)) != null ? _a3 : []);
    if (allImages && allImages.length > 0) {
      allImages = allImages.map((img) => {
        if (img.match(/\[url=.+?\]/)) {
          return `${img}[/url]`;
        }
        return img;
      });
      return allImages.filter((item) => {
        return !item.match(/poster\.jpg|2019\/01\/04\/info\.png|MoreScreens|PTer\.png|ms\.png|trans\.gif|PTerREMUX\.png|PTerWEB\.png|CS\.png|Ourbits_info|GDJT|douban|logo|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/);
      });
    }
    return [];
  };
  var getScreenshotsFromBBCode = async (bbcode) => {
    const allImages = getFilterImages(bbcode);
    if (allImages && allImages.length > 0) {
      const result = [];
      for (const img of allImages) {
        const originalUrl = await getOriginalImgUrl(img);
        if (originalUrl !== void 0) {
          result.push(originalUrl);
        }
      }
      return result;
    }
    return [];
  };
  var getOriginalImgUrl = async (urlBBcode) => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    let imgUrl = urlBBcode;
    if (urlBBcode.match(/\[url=http(s)*:.+/)) {
      imgUrl = (_b2 = (_a3 = urlBBcode.match(/=(([^\]])+)/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
      if (imgUrl.match(/img\.hdbits\.org/)) {
        const imgId = (_d = (_c = urlBBcode.match(/\[url=https:\/\/img\.hdbits\.org\/(\w+)?\]/)) == null ? void 0 : _c[1]) != null ? _d : "";
        imgUrl = `https://i.hdbits.org/${imgId}.png`;
      } else if (urlBBcode.match(/img\.pterclub\.com/)) {
        imgUrl = (_f = (_e = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _e[1]) != null ? _f : "";
        imgUrl = imgUrl.replace(/\.th/g, "");
      } else if (urlBBcode.match(/https?:\/\/imgbox\.com/)) {
        imgUrl = (_h = (_g = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _g[1]) != null ? _h : "";
        imgUrl = imgUrl.replace(/thumbs(\d)/, "images$1").replace(/_t(\.png)/, "_o.png");
      } else if (imgUrl.match(/imagebam\.com/)) {
        const originalPage = await fetch(imgUrl, {
          responseType: void 0
        });
        const doc = new DOMParser().parseFromString(originalPage, "text/html");
        imgUrl = jQuery(".main-image", doc).attr("src");
      } else if (imgUrl.match(/beyondhd\.co/)) {
        imgUrl = (_j = (_i = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _i[1]) != null ? _j : "";
        imgUrl = imgUrl.replace(/\.(th|md)\.(png|jpg|gif)/, ".$2");
      } else if (!imgUrl.match(/\.(jpg|png|gif|bmp|webp)$/)) {
        imgUrl = (_l = (_k = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _k[1]) != null ? _l : "";
      } else if (urlBBcode.match(/https:\/\/pixhost\.to/)) {
        const hostNumber = (_m = urlBBcode.match(/img\]https:\/\/t(\d+)\./)) == null ? void 0 : _m[1];
        imgUrl = imgUrl.replace(/(pixhost\.to)\/show/, `img${hostNumber}.$1/images`);
      }
    } else if (urlBBcode.match(/\[img\]/)) {
      imgUrl = (_o = (_n = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _n[1]) != null ? _o : "";
    }
    return imgUrl;
  };
  var getSourceFromTitle = (title) => {
    if (title.match(/(uhd|2160|4k).*(blu(-)?ray|remux)/i)) {
      return "uhdbluray";
    } else if (title.match(/blu(-)?ray|remux/i)) {
      return "bluray";
    } else if (title.match(/hdtv/i)) {
      return "hdtv";
    } else if (title.match(/web(-?(rip|dl))+/i)) {
      return "web";
    } else if (title.match(/hddvd/i)) {
      return "hddvd";
    } else if (title.match(/dvd/i)) {
      return "dvd";
    } else if (title.match(/vhs/i)) {
      return "vhs";
    }
    return "other";
  };
  var getSubTitle = (data) => {
    var _a3, _b2;
    const { chineseTitle, thisTitle: originalTitle, transTitle } = data;
    let title = "";
    if (chineseTitle.match(/[\u4e00-\u9fa5]+/)) {
      title += chineseTitle;
    }
    const moreTitle = originalTitle.concat(transTitle).filter((item) => title !== item);
    let seasonEpisode = (_b2 = (_a3 = TORRENT_INFO.title.match(/S\d+EP?(\d+)?/i)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
    seasonEpisode = seasonEpisode.replace(/^0/i, "");
    const episode = seasonEpisode ? ` \u7B2C${seasonEpisode}\u96C6` : "";
    const hardcodedSub = TORRENT_INFO.hardcodedSub ? "| \u786C\u5B57\u5E55" : "";
    return `${title}${moreTitle.length > 0 ? "/" : ""}${moreTitle.join("/")}${episode} ${hardcodedSub}`;
  };
  var getAreaCode = (area) => {
    const europeList = EUROPE_LIST;
    if (area) {
      if (area.match(/USA|US|Canada|CA|美国|加拿大|United States/i)) {
        return "US";
      } else if (europeList.includes(area) || area.match(/欧|英|法|德|俄|意|苏联|EU/i)) {
        return "EU";
      } else if (area.match(/Japan|日本|JP/i)) {
        return "JP";
      } else if (area.match(/Korea|韩国|KR/i)) {
        return "KR";
      } else if (area.match(/Taiwan|台湾|TW/i)) {
        return "TW";
      } else if (area.match(/Hong\s?Kong|香港|HK/i)) {
        return "HK";
      } else if (area.match(/CN|China|大陆|中|内地|Mainland/i)) {
        return "CN";
      }
    }
    return "OT";
  };
  var getBDType = (size) => {
    const GBSize = size / 1e9;
    if (GBSize < 5) {
      return "DVD5";
    } else if (GBSize < 9) {
      return "DVD9";
    } else if (GBSize < 25) {
      return "BD25";
    } else if (GBSize < 50) {
      return "BD50";
    } else if (GBSize < 66) {
      return "BD66";
    } else if (GBSize < 100) {
      return "BD100";
    }
  };
  var getTMDBIdByIMDBId = async (imdbid) => {
    try {
      const url = `${TMDB_API_URL}/3/find/${imdbid}?api_key=${TMDB_API_KEY}&language=en&external_source=imdb_id`;
      const data = await fetch(url);
      const isMovie = data.movie_results && data.movie_results.length > 0;
      const isTV = data.tv_results && data.tv_results.length > 0;
      if (!isMovie && !isTV) {
        throw $t("\u8BF7\u6C42\u5931\u8D25");
      }
      const tmdbData = isMovie ? data.movie_results[0] : data.tv_results[0];
      return tmdbData;
    } catch (error) {
      return {};
    }
  };
  var getTMDBVideos = async (tmdbId) => {
    const url = `${TMDB_API_URL}/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en`;
    const data = await fetch(url);
    return data.results || [];
  };
  var getIMDBIdByUrl = (imdbLink) => {
    const imdbIdArray = /tt\d+/.exec(imdbLink);
    if (imdbIdArray && imdbIdArray[0]) {
      return imdbIdArray[0];
    }
    return "";
  };
  var getSize = (size) => {
    if (!size) {
      return 0;
    }
    if (size.match(/T/i)) {
      return parseFloat(size) * 1024 * 1024 * 1024 * 1024 || 0;
    } else if (size.match(/G/i)) {
      return parseFloat(size) * 1024 * 1024 * 1024 || 0;
    } else if (size.match(/M/i)) {
      return parseFloat(size) * 1024 * 1024 || 0;
    } else if (size.match(/K/i)) {
      return parseFloat(size) * 1024 || 0;
    }
    return 0;
  };
  var getInfoFromMediaInfo = (mediaInfo) => {
    var _a3, _b2, _c;
    if (!mediaInfo) {
      return {};
    }
    const mediaArray = mediaInfo.split(/\n\s*\n/).filter((item) => !!item.trim());
    const [generalPart, videoPart] = mediaArray;
    const secondVideoPart = mediaArray.filter((item) => item.startsWith("Video #2"));
    const [audioPart, ...otherAudioPart] = mediaArray.filter((item) => item.startsWith("Audio"));
    const textPart = mediaArray.filter((item) => item.startsWith("Text"));
    const completeName = getMediaValueByKey("Complete name", generalPart);
    const format = (_c = (_b2 = (_a3 = completeName == null ? void 0 : completeName.match(/\.(\w+)$/i)) == null ? void 0 : _a3[1]) == null ? void 0 : _b2.toLowerCase()) != null ? _c : "";
    const fileName = completeName.replace(/\.\w+$/i, "");
    const fileSize = getSize(getMediaValueByKey("File size", generalPart));
    const { videoCodec, hdrFormat, isDV } = getVideoCodecByMediaInfo(videoPart, generalPart, secondVideoPart);
    const { audioCodec, channelName, languageArray } = getAudioCodecByMediaInfo(audioPart, otherAudioPart);
    const subtitleLanguageArray = textPart.map((item) => {
      return getMediaValueByKey("Language", item);
    }).filter((sub) => !!sub);
    const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
    const resolution = getResolution(videoPart);
    return {
      fileName,
      fileSize,
      format,
      subtitles: subtitleLanguageArray,
      videoCodec,
      audioCodec,
      resolution,
      mediaTags
    };
  };
  var getMediaValueByKey = (key, mediaInfo) => {
    var _a3, _b2;
    if (!mediaInfo) {
      return "";
    }
    const keyRegStr = key.replace(/\s/, "\\s*").replace(/(\(|\))/g, "\\$1");
    const reg = new RegExp(`${keyRegStr}\\s*:\\s([^\\n]+)`, "i");
    return (_b2 = (_a3 = mediaInfo.match(reg)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
  };
  var getResolution = (mediaInfo) => {
    const height = parseInt(getMediaValueByKey("Height", mediaInfo).replace(/\s/g, ""), 10);
    const width = parseInt(getMediaValueByKey("Width", mediaInfo).replace(/\s/g, ""), 10);
    const ScanType = getMediaValueByKey("Scan type", mediaInfo);
    if (height > 1080) {
      return "2160p";
    } else if (height > 720 && (ScanType === "Progressive" || !ScanType)) {
      return "1080p";
    } else if (height > 720 && ScanType !== "Progressive") {
      return "1080i";
    } else if (height > 576 || width > 1024) {
      return "720p";
    } else if (height > 480 || width === 1024) {
      return "576p";
    } else if (width >= 840 || height === 480) {
      return "480p";
    } else if (width && height) {
      return `${width}x${height}`;
    }
    return "";
  };
  var getMediaTags = (audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV) => {
    const hasChineseAudio = languageArray.includes("Chinese");
    const hasChineseSubtitle = subtitleLanguageArray.includes("Chinese");
    const mediaTags = {};
    if (hasChineseAudio) {
      mediaTags.chinese_audio = true;
    }
    if (languageArray.includes("Cantonese")) {
      mediaTags.cantonese_audio = true;
    }
    if (hasChineseSubtitle) {
      mediaTags.chinese_subtitle = true;
    }
    if (hdrFormat) {
      if (hdrFormat.match(/HDR10\+/i)) {
        mediaTags.hdr10_plus = true;
      } else if (hdrFormat.match(/HDR/i)) {
        mediaTags.hdr = true;
      }
    }
    if (isDV) {
      mediaTags.dolby_vision = true;
    }
    if (audioCodec.match(/dtsx|atmos/ig)) {
      mediaTags.dts_x = true;
    } else if (audioCodec.match(/atmos/ig)) {
      mediaTags.dolby_atmos = true;
    }
    return mediaTags;
  };
  var getVideoCodecByMediaInfo = (mainVideo, generalPart, secondVideo) => {
    const generalFormat = getMediaValueByKey("Format", generalPart);
    const videoFormat = getMediaValueByKey("Format", mainVideo);
    const videoFormatVersion = getMediaValueByKey("Format version", mainVideo);
    const videoCodeId = getMediaValueByKey("Codec ID", mainVideo);
    const hdrFormat = getMediaValueByKey("HDR format", mainVideo);
    const isDV = hdrFormat.match(/Dolby\s*Vision/i) || secondVideo.length > 0 && getMediaValueByKey("HDR format", secondVideo[0]).match(/Dolby\s*Vision/i);
    const isEncoded = !!getMediaValueByKey("Encoding settings", mainVideo);
    let videoCodec = "";
    if (generalFormat === "DVD Video") {
      videoCodec = "mpeg2";
    } else if (generalFormat === "MPEG-4") {
      videoCodec = "mpeg4";
    } else if (videoFormat === "MPEG Video" && videoFormatVersion === "Version 2") {
      videoCodec = "mpeg2";
    } else if (videoCodeId.match(/xvid/i)) {
      videoCodec = "xvid";
    } else if (videoFormat.match(/HEVC/i) && !isEncoded) {
      videoCodec = "hevc";
    } else if (videoFormat.match(/HEVC/i) && isEncoded) {
      videoCodec = "x265";
    } else if (videoFormat.match(/AVC/i) && isEncoded) {
      videoCodec = "x264";
    } else if (videoFormat.match(/AVC/i) && !isEncoded) {
      videoCodec = "h264";
    } else if (videoFormat.match(/VC-1/i)) {
      videoCodec = "vc1";
    } else if (videoFormat.match(/vvc/i)) {
      videoCodec = "vvc";
    }
    return {
      videoCodec,
      hdrFormat,
      isDV: !!isDV
    };
  };
  var getAudioCodecByMediaInfo = (mainAudio, otherAudio) => {
    const audioFormat = getMediaValueByKey("Format", mainAudio);
    const audioChannels = getMediaValueByKey("Channel(s)", mainAudio);
    const commercialName = getMediaValueByKey("Commercial name", mainAudio);
    const formateProfile = getMediaValueByKey("Format profile", mainAudio);
    const languageArray = [mainAudio, ...otherAudio].map((item) => {
      return getMediaValueByKey("Language", item);
    });
    let channelName = "";
    let audioCodec = "";
    const channelNumber = parseInt(audioChannels, 10);
    if (channelNumber && channelNumber >= 6) {
      channelName = `${channelNumber - 1}.1`;
    } else {
      channelName = `${channelNumber}.0`;
    }
    if (audioFormat.match(/MLP FBA/i) && commercialName.match(/Dolby Atmos/i)) {
      audioCodec = "atmos";
    } else if (audioFormat.match(/MLP FBA/i) && !commercialName.match(/Dolby Atmos/i)) {
      audioCodec = "truehd";
    } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital Plus/i)) {
      audioCodec = "dd+";
    } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital/i)) {
      audioCodec = "dd";
    } else if (audioFormat.match(/AC-3/i)) {
      audioCodec = "ac3";
    } else if (audioFormat.match(/DTS XLL X/i)) {
      audioCodec = "dtsx";
    } else if (audioFormat.match(/DTS/i) && commercialName.match(/DTS-HD Master Audio/i)) {
      audioCodec = "dtshdma";
    } else if (audioFormat.match(/DTS/i) && formateProfile.match(/MA \/ Core/i)) {
      audioCodec = "dtshdma";
    } else if (audioFormat.match(/DTS/i)) {
      audioCodec = "dts";
    } else if (audioFormat.match(/FLAC/i)) {
      audioCodec = "flac";
    } else if (audioFormat.match(/AAC/i)) {
      audioCodec = "aac";
    } else if (audioFormat.match(/LPCM/i)) {
      audioCodec = "lpcm";
    }
    return {
      audioCodec,
      channelName,
      languageArray
    };
  };
  var getInfoFromBDInfo = (bdInfo) => {
    var _a3, _b2, _c, _d, _e;
    if (!bdInfo) {
      return {};
    }
    const splitArray = bdInfo.split("Disc Title");
    if (splitArray.length > 2) {
      bdInfo = splitArray[1];
    }
    const videoMatch = bdInfo.match(/VIDEO:(\s|Codec|Bitrate|Description|Language|-)*((.|\n)*)AUDIO:/i);
    const hasFileInfo = bdInfo.match(/FILES:/i);
    const subtitleReg = new RegExp(`SUBTITLE(S)*:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${hasFileInfo ? "FILES:" : ""}`, "i");
    const subtitleMatch = bdInfo.match(subtitleReg);
    const audioReg = new RegExp(`AUDIO:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${subtitleMatch ? "(SUBTITLE(S)?)" : hasFileInfo ? "FILES:" : ""}`, "i");
    const audioMatch = bdInfo.match(audioReg);
    const fileSize = (_b2 = (_a3 = bdInfo.match(/Disc\s*Size:\s*((\d|,| )+)bytes/)) == null ? void 0 : _a3[1]) == null ? void 0 : _b2.replace(/,/g, "");
    const quickSummaryStyle = !bdInfo.match(/PLAYLIST REPORT/i);
    const videoPart = splitBDMediaInfo(videoMatch, 2);
    const [mainVideo = "", otherVideo = ""] = videoPart;
    const videoCodec = mainVideo.match(/2160/) ? "hevc" : "h264";
    const hdrFormat = (_d = (_c = mainVideo.match(/\/\s*HDR(\d)*(\+)*\s*\//i)) == null ? void 0 : _c[0]) != null ? _d : "";
    const isDV = !!otherVideo.match(/\/\s*Dolby\s*Vision\s*/i);
    const audioPart = splitBDMediaInfo(audioMatch, 2);
    const subtitlePart = splitBDMediaInfo(subtitleMatch, 3);
    const resolution = (_e = mainVideo.match(/\d{3,4}(p|i)/)) == null ? void 0 : _e[0];
    const { audioCodec = "", channelName = "", languageArray = [] } = getBDAudioInfo(audioPart, quickSummaryStyle);
    const subtitleLanguageArray = subtitlePart.map((item) => {
      var _a4, _b3, _c2, _d2;
      const quickStyleMatch = (_b3 = (_a4 = item.match(/(\w+)\s*\//)) == null ? void 0 : _a4[1]) != null ? _b3 : "";
      const normalMatch = (_d2 = (_c2 = item.match(/Graphics\s*(\w+)\s*(\d|\.)+\s*kbps/i)) == null ? void 0 : _c2[1]) != null ? _d2 : "";
      const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
      return language;
    }).filter((sub) => !!sub);
    const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
    return {
      fileSize,
      videoCodec,
      subtitles: subtitleLanguageArray,
      audioCodec,
      resolution,
      mediaTags,
      format: "m2ts"
    };
  };
  var splitBDMediaInfo = (matchArray, matchIndex) => {
    var _a3, _b2;
    return (_b2 = (_a3 = matchArray == null ? void 0 : matchArray[matchIndex]) == null ? void 0 : _a3.split("\n").filter((item) => !!item)) != null ? _b2 : [];
  };
  var getBDAudioInfo = (audioPart, quickSummaryStyle) => {
    var _a3, _b2;
    if (audioPart.length < 1) {
      return {};
    }
    const sortArray = audioPart.sort((a3, b3) => {
      var _a4, _b3, _c, _d;
      const firstBitrate = parseInt((_b3 = (_a4 = a3.match(/\/\s*(\d+)\s*kbps/i)) == null ? void 0 : _a4[1]) != null ? _b3 : "", 10);
      const lastBitrate = parseInt((_d = (_c = b3.match(/\/\s*(\d+)\s*kbps/i)) == null ? void 0 : _c[1]) != null ? _d : "", 10);
      return lastBitrate - firstBitrate;
    });
    const [mainAudio, secondAudio] = sortArray;
    const mainAudioCodec = getAudioCodecFromTitle(mainAudio);
    const secondAudioCodec = getAudioCodecFromTitle(secondAudio);
    let audioCodec = mainAudioCodec;
    let channelName = (_a3 = mainAudio.match(/\d\.\d/)) == null ? void 0 : _a3[0];
    if (mainAudioCodec === "lpcm" && secondAudioCodec === "dtshdma") {
      audioCodec = secondAudioCodec;
      channelName = (_b2 = mainAudio.match(/\d\.\d/)) == null ? void 0 : _b2[0];
    }
    const languageArray = sortArray.map((item) => {
      var _a4, _b3, _c, _d;
      const quickStyleMatch = (_b3 = (_a4 = item.match(/(\w+)\s*\//)) == null ? void 0 : _a4[1]) != null ? _b3 : "";
      const normalMatch = (_d = (_c = item.match(/Audio\s*(\w+)\s*\d+\s*kbps/)) == null ? void 0 : _c[1]) != null ? _d : "";
      const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
      return language;
    });
    return {
      audioCodec,
      channelName,
      languageArray
    };
  };
  var wrappingBBCodeTag = ({ pre, post }, preTag, poTag) => {
    const isPre = typeof pre !== "undefined" && pre !== null;
    const isPost = typeof post !== "undefined" && post !== null;
    if (isPre) {
      pre.unshift(preTag);
    }
    if (isPost) {
      post.push(poTag);
    }
  };
  var getFilterBBCode = (content) => {
    var _a3;
    if (content) {
      const bbCodes = htmlToBBCode(content);
      return (_a3 = bbCodes == null ? void 0 : bbCodes.replace(/\[quote\]((.|\n)*?)\[\/quote\]/g, (match, p1) => {
        if (p1 && p1.match(/温馨提示|郑重|PT站|网上搜集|本种子|商业盈利|商业用途|带宽|寬帶|法律责任|Quote:|正版|商用|注明|后果|负责/)) {
          return "";
        }
        return match;
      })) != null ? _a3 : "";
    }
    return "";
  };
  var rgb2hex = (rgb) => {
    var _a3;
    const result = (_a3 = rgb == null ? void 0 : rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) != null ? _a3 : [];
    return result.length === 4 ? `#${`0${parseInt(result[1], 10).toString(16)}`.slice(-2)}${`0${parseInt(result[2], 10).toString(16)}`.slice(-2)}${`0${parseInt(result[3], 10).toString(16)}`.slice(-2)}` : "";
  };
  var ensureProperColor = (color) => {
    if (/rgba?/.test(color))
      return rgb2hex(color);
    return color;
  };
  var htmlToBBCode = (node) => {
    var _a3, _b2, _c, _d, _e;
    const bbCodes = [];
    const pre = [];
    const post = [];
    const pp = wrappingBBCodeTag.bind(null, { pre, post });
    switch (node.nodeType) {
      case 1: {
        switch (node.tagName.toUpperCase()) {
          case "SCRIPT": {
            return "";
          }
          case "UL": {
            pp(null, null);
            break;
          }
          case "OL": {
            pp("[list=1]", "[/list]");
            break;
          }
          case "LI": {
            const { className } = node;
            if (CURRENT_SITE_INFO.siteType === "UNIT3D" && className) {
              return `[quote]${(_a3 = node == null ? void 0 : node.textContent) == null ? void 0 : _a3.trim()}[/quote]`;
            }
            pp("[*]", "\n");
            break;
          }
          case "B": {
            pp("[b]", "[/b]");
            break;
          }
          case "U": {
            pp("[u]", "[/u]");
            break;
          }
          case "I": {
            pp("[i]", "[/i]");
            break;
          }
          case "DIV": {
            const { className, id } = node;
            if (className === "codemain") {
              if (node.children[0] && node.children[0].tagName === "PRE") {
                pp("");
                break;
              } else {
                return "";
              }
            } else if (className === "hidden" && CURRENT_SITE_NAME === "HDT") {
              pp("\n[quote]", "[/quote]");
              break;
            } else if (className.match("spoiler") && CURRENT_SITE_NAME === "KG") {
              if (className === "spoiler-content") {
                pp("\n[quote]", "[/quote]");
              } else if (className === "spoiler-header") {
                return "";
              }
              break;
            } else if (CURRENT_SITE_NAME === "BeyondHD") {
              if (className === "spoilerChild") {
                if (node.children[0].tagName.toUpperCase() === "BLOCKQUOTE" || node.children[0].tagName.toUpperCase() === "PRE")
                  pp("\n", "");
                else
                  pp("\n[quote]", "[/quote]");
              } else if (id === "screenMain") {
                return "\n";
              } else if (className === "spoilerHide") {
                return "";
              }
              break;
            } else if (className === "spoiler-text" && CURRENT_SITE_INFO.siteType === "AvistaZ") {
              pp("\n[quote]", "[/quote]");
              break;
            } else if (className === "spoiler-toggle" && CURRENT_SITE_INFO.siteType === "AvistaZ") {
              return "";
            } else if (className.match(/codetop|highlight/) && CURRENT_SITE_INFO.siteType === "Bdc") {
              return "";
            } else {
              pp("\n", "\n");
              break;
            }
          }
          case "P": {
            pp("\n");
            break;
          }
          case "BR": {
            if (CURRENT_SITE_INFO.siteType === "NexusPHP" && CURRENT_SITE_NAME !== "OurBits" || ((_b2 = CURRENT_SITE_NAME) == null ? void 0 : _b2.match(/^(UHDBits|HDBits|BTN)/))) {
              pp("");
            } else {
              pp("\n");
            }
            break;
          }
          case "SPAN": {
            pp(null, null);
            break;
          }
          case "BLOCKQUOTE":
          case "PRE":
          case "FIELDSET": {
            pp("[quote]", "[/quote]");
            break;
          }
          case "CENTER": {
            pp("[center]", "[/center]");
            break;
          }
          case "TD": {
            if (((_c = CURRENT_SITE_NAME) == null ? void 0 : _c.match(/^(TTG|HDBits|KG|HDSpace)/)) || CURRENT_SITE_NAME === "HDT" || CURRENT_SITE_INFO.siteType === "UNIT3D") {
              pp("[quote]", "[/quote]");
              break;
            } else if (CURRENT_SITE_NAME.match(/EMP|Bdc/)) {
              pp("");
              break;
            } else {
              return "";
            }
          }
          case "IMG": {
            let imgUrl = "";
            const { src, title } = node;
            const dataSrc = node.getAttribute("data-src") || node.getAttribute("data-echo");
            const layerSrc = node.getAttribute("layer-src");
            if (title === ":m:") {
              return ":m:";
            }
            if (layerSrc) {
              imgUrl = layerSrc;
            } else if (dataSrc) {
              imgUrl = dataSrc.match(/(http(s)?:)?\/\//) ? dataSrc : `${location.origin}/${dataSrc}`;
            } else if (src && src.match(/broadcity\.eu\/images\/44846549843542759058\.png/)) {
              return "";
            } else if (src && !src.match(/ico_\w+.gif|jinzhuan|thumbsup|kralimarko/)) {
              imgUrl = src;
            } else {
              return "";
            }
            return `[img]${imgUrl}[/img]`;
          }
          case "FONT": {
            const { color: color2, size } = node;
            if (color2) {
              pp(`[color=${ensureProperColor(color2)}]`, "[/color]");
            }
            if (size) {
              pp(`[size=${size}]`, "[/size]");
            }
            break;
          }
          case "A": {
            const { href, textContent } = node;
            if (href && href.length > 0) {
              if (CURRENT_SITE_NAME === "HDSpace") {
                const div = jQuery(node).find("div");
                if (div[0] && div.attr("id")) {
                  const imgUrl = div.find("img").attr("src");
                  return `[url=${href}][img]${imgUrl}[/img][/url]`;
                }
              } else if (href.match(/javascript:void/) || textContent === "show" && CURRENT_SITE_NAME === "HDT") {
                return "";
              } else {
                pp(`[url=${href}]`, "[/url]");
              }
            }
            break;
          }
          case "H1": {
            pp('[b][size="7"]', "[/size][/b]\n");
            break;
          }
          case "H2": {
            pp('[b][size="6"]', "[/size][/b]\n");
            break;
          }
          case "H3": {
            pp('[b][size="5"]', "[/size][/b]\n");
            break;
          }
          case "H4": {
            pp('[b][size="4"]', "[/size][/b]\n");
            break;
          }
        }
        const { textAlign, fontWeight, fontStyle, textDecoration, color } = node.style;
        if (textAlign) {
          switch (textAlign.toUpperCase()) {
            case "LEFT": {
              pp("[left]", "[/left]");
              break;
            }
            case "RIGHT": {
              pp("[right]", "[/right]");
              break;
            }
            case "CENTER": {
              pp("[center]", "[/center]");
              break;
            }
          }
        }
        if (fontWeight === "bold" || ~~fontWeight >= 600) {
          pp("[b]", "[/b]");
        }
        if (fontStyle === "italic")
          pp("[i]", "[/i]");
        if (textDecoration === "underline")
          pp("[u]", "[/u]");
        if (color && color.trim() !== "")
          pp(`[color=${ensureProperColor(color)}]`, "[/color]");
        break;
      }
      case 3: {
        if ((_e = (_d = node == null ? void 0 : node.textContent) == null ? void 0 : _d.trim()) == null ? void 0 : _e.match(/^(引用|Quote|代码|代碼|Show|Hide|Hidden text|Hidden content|\[show\]|\[Show\])/)) {
          return "";
        }
        return node.textContent;
      }
      default:
        return null;
    }
    node.childNodes.forEach((node2) => {
      const code = htmlToBBCode(node2);
      if (code) {
        bbCodes.push(code);
      }
    });
    return pre.concat(bbCodes).concat(post).join("");
  };
  var getTagsFromSubtitle = (title) => {
    const tags = {};
    if (title.match(/diy/i)) {
      tags.diy = true;
    }
    if (title.match(/国配|国语|普通话|国粤/i) && !title.match(/多国语言/)) {
      tags.chinese_audio = true;
    }
    if (title.match(/Atmos|杜比全景声/i)) {
      tags.dolby_atoms = true;
    }
    if (title.match(/HDR/i)) {
      if (title.match(/HDR10\+/i)) {
        tags.hdr10_plus = true;
      } else {
        tags.hdr = true;
      }
    }
    if (title.match(/DoVi|(Dolby\s*Vision)|杜比视界/i)) {
      tags.dolby_vision = true;
    }
    if (title.match(/粤/i)) {
      tags.cantonese_audio = true;
    }
    if (title.match(/简繁|繁简|繁体|简体|中字|中英|中文/i) && !title.match(/无中(字|文)/)) {
      tags.chinese_subtitle = true;
    }
    if (title.match(/Criterion|CC标准/i)) {
      tags.the_criterion_collection = true;
    }
    if (title.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|禁止转载|exclusive/)) {
      tags.exclusive = true;
    }
    return tags;
  };
  var getBDInfoOrMediaInfo = (bbcode) => {
    var _a3, _b2, _c;
    const quoteList = (_a3 = bbcode == null ? void 0 : bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g)) != null ? _a3 : [];
    let bdinfo = "";
    let mediaInfo = "";
    quoteList.forEach((quote) => {
      const quoteContent = quote.replace(/\[\/?quote\]/g, "").replace(/\u200D/g, "");
      if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
        bdinfo += quoteContent;
      }
      if (quoteContent.match(/(Unique\s*ID)|(Codec\s*ID)|(Stream\s*size)/i)) {
        mediaInfo += quoteContent;
      }
    });
    if (!bdinfo) {
      bdinfo = (_c = (_b2 = bbcode.match(/Disc\s+(Info|Title|Label)[^[]+/i)) == null ? void 0 : _b2[0]) != null ? _c : "";
    }
    if (bdinfo) {
      bdinfo = bdinfo.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, "");
    }
    if (mediaInfo) {
      mediaInfo = mediaInfo.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, "");
    }
    return {
      bdinfo,
      mediaInfo
    };
  };
  var replaceRegSymbols = (string) => {
    return string.replace(/([*.?+$^[\](){}|\\/])/g, "\\$1");
  };
  var getRtIdFromTitle = async (title, tv, year) => {
    var _a3;
    console.log("%s", title, year);
    const MAX_YEAR_DIFF = 2;
    tv = tv || false;
    const yearVal = parseInt(year, 10) || 1800;
    const url = `https://www.rottentomatoes.com/api/private/v2.0/search/?limit=2&q=${title}`;
    const data = await fetch(url);
    const movies = tv ? data.tvSeries : data.movies;
    if (!Array.isArray(movies) || movies.length < 1) {
      console.log("no search results");
      return {};
    }
    const sorted = movies.concat();
    if (year && sorted) {
      sorted.sort((a3, b3) => {
        if (Math.abs(a3.year - yearVal) !== Math.abs(b3.year - yearVal)) {
          return Math.abs(a3.year - yearVal) - Math.abs(b3.year - yearVal);
        }
        return b3.year - a3.year;
      });
    }
    let bestMatch, closeMatch;
    for (const m3 of sorted) {
      m3.title = m3.title || m3.name;
      if (m3.title.toLowerCase() === title.toLowerCase()) {
        bestMatch = bestMatch || m3;
        console.log("bestMatch", bestMatch);
      } else if (m3.title.toLowerCase().startsWith(title.toLowerCase())) {
        closeMatch = closeMatch || m3;
        console.log("closeMatch", closeMatch);
      }
      if (bestMatch && closeMatch) {
        break;
      }
    }
    const yearComp = (imdb, rt) => {
      return rt - imdb <= MAX_YEAR_DIFF && imdb - rt < MAX_YEAR_DIFF;
    };
    if (yearVal && (!bestMatch || !yearComp(yearVal, bestMatch.year))) {
      if (closeMatch && yearComp(yearVal, closeMatch.year)) {
        bestMatch = closeMatch;
      } else if (yearComp(yearVal, sorted[0].year)) {
        bestMatch = sorted[0];
      }
    }
    bestMatch = bestMatch || closeMatch || movies[0];
    if (bestMatch) {
      const id = bestMatch && bestMatch.url.replace(/\/s\d{2}\/?$/, "");
      const score = (_a3 = bestMatch == null ? void 0 : bestMatch.meterScore) != null ? _a3 : "0";
      return {
        id,
        score
      };
    }
    console.log("no match found on rt");
    return {};
  };
  var uploadToPtpImg = async (imgArray, isFiles = false) => {
    try {
      const apiKey = getValue("easy-seed.ptp-img-api-key", false);
      if (!apiKey) {
        Notification_default2.open({
          message: $t("ptpimg\u4E0A\u4F20\u5931\u8D25"),
          description: $t("\u8BF7\u5230\u914D\u7F6E\u9762\u677F\u4E2D\u586B\u5165ptpimg\u7684api_key")
        });
        return;
      }
      const options = {
        method: "POST",
        responseType: "json"
      };
      if (isFiles) {
        const formData = new FormData();
        imgArray.forEach((img, index) => {
          formData.append(`file-upload[${index}]`, img);
        });
        formData.append("api_key", apiKey);
        options.data = formData;
      } else {
        const data2 = `link-upload=${imgArray.join("\n")}&api_key=${apiKey}`;
        options.headers = {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        };
        options.data = data2;
      }
      const data = await fetch("https://ptpimg.me/upload.php", options);
      if (!data) {
        throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
      let imgResultList = [];
      if (data && data.length) {
        imgResultList = data.map((img) => {
          return `https://ptpimg.me/${img.code}.${img.ext}`;
        });
        return imgResultList;
      }
      throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
    } catch (error) {
      handleError(error);
    }
  };
  var $t = (key) => {
    const languageKey = USE_CHINESE ? "zh_CN" : "en_US";
    return i18n_default[languageKey][key] || key;
  };
  var urlToFile = async (url) => {
    var _a3, _b2;
    const filename = (_b2 = (_a3 = url.match(/\/([^/]+)$/)) == null ? void 0 : _a3[1]) != null ? _b2 : "filename";
    const data = await fetch(url, {
      responseType: "blob"
    });
    const file = new File([data], filename, { type: data.type });
    return file;
  };
  var saveScreenshotsToPtpimg = async (imgArray) => {
    try {
      const isHdbHost = !!imgArray[0].match(/i\.hdbits\.org/);
      const isPtpHost = !!imgArray[0].match(/ptpimg\.me/);
      if (isPtpHost) {
        throw $t("\u65E0\u9700\u8F6C\u5B58");
      } else if (isHdbHost) {
        const promiseArray = imgArray.map((item) => {
          return urlToFile(item);
        });
        const fileArray = await Promise.all(promiseArray);
        const data = uploadToPtpImg(fileArray, true);
        return data;
      } else {
        const data = await uploadToPtpImg(imgArray);
        return data;
      }
    } catch (error) {
      handleError(error);
    }
  };
  var getValue = (key, needParse = true) => {
    const data = GM_getValue(key);
    if (data && needParse) {
      return JSON.parse(data);
    }
    return data;
  };
  var fetch = (url, options) => {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest(__spreadProps(__spreadValues({
        method: "GET",
        url,
        responseType: "json"
      }, options), {
        onload: (res) => {
          const { statusText, status, response } = res;
          if (status !== 200) {
            reject(new Error(statusText || `${status}`));
          } else {
            resolve(response);
          }
        },
        ontimeout: () => {
          reject(new Error("timeout"));
        },
        onerror: (error) => {
          reject(error);
        }
      }));
    });
  };
  var getTvSeasonData = async (data) => {
    var _a3, _b2;
    const { title: torrentTitle } = TORRENT_INFO;
    const { season = "", title } = data;
    if (season) {
      const seasonNumber = (_b2 = (_a3 = torrentTitle.match(/S(?!eason)?0?(\d+)\.?(EP?\d+)?/i)) == null ? void 0 : _a3[1]) != null ? _b2 : "1";
      if (parseInt(seasonNumber, 10) === 1) {
        return data;
      }
      const query = title.replace(/第.+?季/, `\u7B2C${seasonNumber}\u5B63`);
      const response = await getDoubanIdByIMDB(query);
      return response;
    }
  };

  // src/target/index.ts
  init_preact_shim();

  // src/target/helper.ts
  init_preact_shim();

  // src/target/common.ts
  init_preact_shim();
  var getScreenshotsBBCode = (imgArray) => {
    return imgArray.map((img) => {
      if (img.match(/\[url=.+\]/i)) {
        return img;
      }
      return `[img]${img}[/img]`;
    });
  };
  var getTeamName = (info) => {
    var _a3, _b2, _c;
    const teamMatch = info.title.match(/-([^-]+)$/);
    let teamName = (_c = (_b2 = (_a3 = teamMatch == null ? void 0 : teamMatch[1]) == null ? void 0 : _a3.replace(/-/g, "")) == null ? void 0 : _b2.split("@")) != null ? _c : "";
    if (teamName) {
      teamName = teamName.length > 1 ? teamName[1] : teamName[0];
    } else {
      teamName = "other";
    }
    return teamName;
  };
  var matchSelectForm = (siteInfo, movieInfo, key, selectArray) => {
    const valueArray = siteInfo[key] ? siteInfo[key].map[movieInfo[key]] : "";
    if (Array.isArray(valueArray) && selectArray) {
      if (siteInfo[key].selector) {
        jQuery(siteInfo[key].selector).val(valueArray.shift());
      }
      if (selectArray.length > 1) {
        selectArray = selectArray.filter((item) => valueArray.includes(item));
      }
    } else if (siteInfo[key] && siteInfo[key].selector) {
      jQuery(siteInfo[key].selector).val(valueArray);
    }
    return selectArray;
  };
  function buildPTPDescription(info) {
    let text = info.originalDescription || "";
    text = text.replace(/http:\/\/ptpimg\.me/g, "https://ptpimg.me");
    for (const mediainfo of info.mediaInfos) {
      text = text.replace(mediainfo, "");
    }
    text = text.replace(/\[(mediainfo|bdinfo)\][\s\S]*?\[\/(mediainfo|bdinfo)\]/gi, "");
    text = text.replace(/^(?!\[img\])https:\/\/ptpimg.me.*?png(?!\[\/img\])$/gim, (imgUrl) => {
      return `[img]${imgUrl}[/img]`;
    });
    text = text.replace(/\[comparison.*\][\s\S]*\[\/comparison\]/gi, (comparisonText) => {
      return comparisonText.replace(/\[img\]/g, "").replace(/\[\/img\]/g, "").split("https://ptpimg.me").join("\nhttps://ptpimg.me").replace(/\s*\n\s*/g, "\n");
    });
    text = text.replace(/\[hide(.*)?\]\s*\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\[\/hide\]/gi, (imgText) => {
      var _a3;
      const imgs = [];
      for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
        imgs.push(urlMatch[1]);
      }
      const rawTitle = ((_a3 = imgText.match(/^\[hide=(.*?)\]/)) == null ? void 0 : _a3[1]) || "";
      const comparisonTitles = rawTitle.trim().split(/\||\/|,|vs\.?| - /i).map((v3) => v3.trim());
      if (comparisonTitles.length >= 2) {
        return `[comparison=${comparisonTitles.join(", ")}]
${imgs.join("\n")}
[/comparison]
`;
      }
      const hideTitle = rawTitle ? `=${rawTitle}` : "";
      return `[hide${hideTitle}]
[img]${imgs.join("[/img]\n[img]")}[/img]
[/hide]
`;
    });
    text = `${text}

`;
    text = text.replace(/\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\n\n/gi, (imgText) => {
      const imgs = [];
      for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
        imgs.push(urlMatch[1]);
      }
      return `[hide]
[img]${imgs.join("[/img]\n[img]")}[/img]
[/hide]
`;
    });
    text = text.replace(/\[img=(.+)?\](\n\n)?/gi, "[img]$1[/img]");
    text = text.replace(/\[(\/)?IMG\]/g, "[$1img]");
    text = text.replace(/\n\s*\n/g, "\n\n");
    return text.trim();
  }
  var isChineseTacker = (siteType) => {
    return siteType.match(/NexusPHP|TTG|TNode/);
  };
  var filterNexusDescription = (info) => {
    const { description } = info;
    let filterDescription = "";
    const quoteList = description.match(/\[quote(=\w+)?\](.|\n)+?\[\/quote\]/g);
    if (quoteList && quoteList.length > 0) {
      quoteList.forEach((quote) => {
        const isMediaInfoOrBDInfo = quote.match(/Disc\s?Size|\.mpls|Unique\s?ID|唯一ID|Resolution/i);
        if (!quote.match(/[\u4e00-\u9fa5]+/i) || isMediaInfoOrBDInfo) {
          filterDescription += `${quote}
`;
        }
      });
    }
    const allImages = getFilterImages(description);
    return `${filterDescription}
${allImages.join("")}`;
  };
  var filterEmptyTags = (description) => {
    const reg = new RegExp("\\[([a-zA-Z]+\\d?)(?:=(?:\\w|\\s)+)?\\]\\s*\\[\\/(\\w+)\\]", "g");
    if (description.match(reg)) {
      description = description.replace(reg, (_match, p1, p22) => {
        if (p1 === p22) {
          return "";
        }
        return _match;
      });
      return filterEmptyTags(description);
    }
    return description;
  };
  var fixTorrentTitle = (title, isWebSource) => {
    let fixedTitle = title.replace(" DoVi ", " DV ").replace(" DDP ", " DD+ ");
    if (isWebSource)
      fixedTitle = fixedTitle.replace(" HEVC", " H.265");
    return fixedTitle;
  };

  // src/target/site-operations.ts
  init_preact_shim();

  // src/target/its.ts
  init_preact_shim();
  var its_default = async (info) => {
    var _a3, _b2, _c, _d, _e, _f, _g;
    let template = `[center]

  [img]$poster$[/img]
  
  [url=$imdbUrl$][img]https://i.ibb.co/KD855ZM/IMDb-Logo-2016.png[/img][/url][size=3]$imdbScore$[/size][*][url=$rtUrl$][img]https://i.ibb.co/BwtmdcV/rottentomatoes-logo.png[/img][/url][size=3]$rtScore$[/size][*][size=3][url=$tmdbUrl$][img]https://i.ibb.co/HhgF1gC/tmdb-logo.png[/img][/url]$tmdbScore$[/size]


  [color=DarkOrange][size=2]\u25E2 SYNOPSIS \u25E3[/size][/color]
  $synopsis$
  
  [color=DarkOrange][size=2]\u25E2 TRAILER \u25E3[/size][/color]
  [youtube]$youtubeUrl$[/youtube]

  [color=DarkOrange][size=2]\u25E2 SCREENSHOTS \u25E3[/size][/color]
  [box][hide]$SCREENSHOTS$[/hide][/box]
  
  [/center]`;
    const collectionMap = {};
    jQuery('select[name="collection_id1"] option').each(function() {
      const option = jQuery(this);
      collectionMap[option.text()] = option.val();
    });
    const collectionValueArr = [];
    const teamName = getTeamName(info);
    if (collectionMap[teamName]) {
      collectionValueArr.push(collectionMap[teamName]);
    }
    const { imdbUrl, category, screenshots, comparisons = [], resolution, movieName } = info;
    if (!resolution.match(/2160|1080|720/) && category === "movie") {
      jQuery('select[name="type"]').val("67");
    }
    const screenshotsBBCode = getScreenshotsBBCode(screenshots);
    template = template.replace("$SCREENSHOTS$", screenshotsBBCode.join("\n"));
    const comparisonImgs = comparisons.flatMap((v3) => v3.imgs);
    if (comparisonImgs.length > 0) {
      const comparisonImgsBBCode = getScreenshotsBBCode(comparisonImgs);
      template = template.replace(/(\[\/center\])$/, `[color=DarkOrange][size=2]\u25E2 COMPARISONS \u25E3[/size][/color]


    [box][hide]${comparisonImgsBBCode.join(" ")}[/hide][/box]

$1`);
    }
    if (category.match(/tv|movie|cartoon|documentary/)) {
      jQuery('textarea[name="descr"]').val($t("\u6570\u636E\u52A0\u8F7D\u4E2D..."));
      try {
        const replaceParams = {
          tmdbUrl: "",
          tmdbScore: "0",
          imdbScore: "0",
          imdbUrl,
          poster: "",
          synopsis: "",
          rtUrl: "",
          rtScore: "0",
          youtubeUrl: ""
        };
        const imdbData = await getIMDBData(imdbUrl);
        if (imdbData) {
          const {
            poster = "",
            imdb_rating_average: imdbRate,
            description = "",
            directors = [],
            details,
            aka,
            year
          } = imdbData;
          let language = details.Languages || "";
          language = (_c = (_b2 = (_a3 = language == null ? void 0 : language.split("|")) == null ? void 0 : _a3[0]) == null ? void 0 : _b2.trim()) != null ? _c : "";
          const director = directors.map((item) => item.name)[0];
          if (collectionMap[director]) {
            collectionValueArr.push(collectionMap[director]);
          }
          if (collectionMap[language]) {
            collectionValueArr.push(collectionMap[language]);
          }
          collectionValueArr.forEach((value, index) => {
            jQuery(`select[name="collection_id${index + 1}"]`).val(value);
          });
          replaceParams.poster = poster;
          replaceParams.synopsis = description;
          replaceParams.imdbScore = imdbRate;
          const searchMovieName = movieName || ((_d = aka.filter((item) => item.country.match(/(World-wide)|UK|USA/))) == null ? void 0 : _d[0].title);
          const rtInfo = await getRtIdFromTitle(searchMovieName, !!category.match(/tv/), year);
          const { score = 0, id = "" } = rtInfo;
          replaceParams.rtScore = `${score}%`;
          replaceParams.rtUrl = `https://www.rottentomatoes.com/${id}`;
          const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key") || "";
          if (ptpImgApiKey) {
            const ptpImgPoster = await uploadToPtpImg([poster]);
            replaceParams.poster = ptpImgPoster ? ptpImgPoster[0] : "";
          }
        }
        const imdbId = getIMDBIdByUrl(imdbUrl);
        const { id: tmdbId, vote_average: tmdbRate } = await getTMDBIdByIMDBId(imdbId);
        if (tmdbId) {
          replaceParams.tmdbUrl = `https://www.themoviedb.org/movie/${tmdbId}`;
          replaceParams.tmdbScore = tmdbRate;
          const videos = await getTMDBVideos(tmdbId);
          const youtubeId = (_g = (_f = (_e = videos.filter((video) => video.site === "YouTube")) == null ? void 0 : _e[0]) == null ? void 0 : _f.key) != null ? _g : "";
          if (youtubeId.length > 0) {
            replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
          }
        }
        Object.keys(replaceParams).forEach((key) => {
          template = template.replace(`$${key}$`, replaceParams[key] || "");
        });
        jQuery('textarea[name="descr"]').val(template);
      } catch (error) {
        jQuery('textarea[name="descr"]').val(error.message);
      }
    }
  };

  // src/target/tjupt.ts
  init_preact_shim();
  var tjupt_default = (info) => {
    const domTimeout = setTimeout(() => {
      var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      if (jQuery("#ename")) {
        const { title, description, doubanInfo, category, resolution } = info;
        jQuery("#ename").val(title);
        const fullDescription = description + doubanInfo;
        let area = (_b2 = (_a3 = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a3[2]) != null ? _b2 : "";
        area = area.replace(/\[\/?.+?\]/g, "");
        const originalName = (_d = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d : "";
        const translateName = (_h = (_g = (_f = (_e = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
        const castArray = (_l = (_k = (_j = (_i = fullDescription.match(/(主\s+演)\s+([^◎]+)/)) == null ? void 0 : _i[2]) == null ? void 0 : _j.split("\n")) == null ? void 0 : _k.filter((item) => !!item)) != null ? _l : [];
        const language = (_n = (_m = fullDescription.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _m[2]) != null ? _n : "";
        const castStr = castArray.map((item) => {
          var _a4;
          return (_a4 = item.trim().split(/\s+/)) == null ? void 0 : _a4[0];
        }).join("/");
        if (area) {
          if (category === "movie") {
            jQuery("#district").val(area.replace(/,/g, "/").replace(/中国/, ""));
          } else if (category.match(/tv/)) {
            let selector = "";
            if (area.match(/大陆/)) {
              selector = "#specificcat1";
            } else if (area.match(/台|港/)) {
              selector = "#specificcat2";
            } else if (area.match(/美国/)) {
              selector = "#specificcat3";
            } else if (area.match(/英国/)) {
              selector = "#specificcat7";
            } else if (area.match(/日本/)) {
              selector = "#specificcat4";
            } else if (area.match(/韩国/)) {
              selector = "#specificcat5";
            } else {
              selector = "#specificcat6";
            }
            jQuery(selector).attr("checked", "true");
            getcheckboxvalue("specificcat");
          } else if (category.match(/variety/)) {
            const districtMap = {
              CN: "#district1",
              HK: "#district2",
              TW: "#district2",
              JP: "#district4",
              KR: "#district4",
              US: "#district3",
              EU: "#district3",
              OT: "#district5"
            };
            jQuery(districtMap[info.area]).attr("checked", "true");
            getcheckboxvalue("district");
          }
        }
        if (jQuery("#format")) {
          if (category.match(/variety/)) {
            if (resolution.match(/720/)) {
              jQuery("#format3").attr("checked", "true");
            } else if (resolution.match(/1080/)) {
              jQuery("#format5").attr("checked", "true");
            }
            getcheckboxvalue("format");
          } else if (category.match(/documentary/)) {
            if (resolution.match(/720/)) {
              jQuery("#format2").attr("checked", "true");
            } else if (resolution.match(/1080/)) {
              jQuery("#format1").attr("checked", "true");
            }
            getradiovalue("format");
          }
        }
        if (jQuery("#language")) {
          let selector = "";
          if (language) {
            if (language.match(/汉语/)) {
              selector = "#language1";
            } else if (language.match(/粤/)) {
              selector = "#language2";
            } else if (language.match(/英语/)) {
              selector = "#language3";
            } else if (language.match(/日语/)) {
              selector = "#language4";
            } else if (language.match(/韩语/)) {
              selector = "#language5";
            }
            jQuery(selector).attr("checked", "true");
            getcheckboxvalue("language");
          }
        }
        if (category.match(/variety/)) {
          jQuery("#tvshowsguest").val(castStr);
        }
        let chineseName = originalName;
        if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
          chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
        }
        jQuery("#cname").val(chineseName);
        clearTimeout(domTimeout);
      }
    }, 2e3);
  };

  // src/target/hdr.ts
  init_preact_shim();
  var hdr_default = (info) => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const { description, doubanInfo } = info;
    const fullDescription = description + doubanInfo;
    const imdbRank = (_b2 = (_a3 = fullDescription.match(/IMDb评分\s+(\d(\.\d)?)/i)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
    jQuery("#upload-imdb").val(imdbRank);
    const originalName = (_d = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d : "";
    const translateName = (_h = (_g = (_f = (_e = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
    const summary = (_l = (_k = (_j = (_i = fullDescription.match(/(简\s+介)\s+([^[◎]+)/)) == null ? void 0 : _i[2]) == null ? void 0 : _j.split("/")) == null ? void 0 : _k[0]) != null ? _l : "";
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : originalName;
    }
    jQuery("#title_chs").val(chineseName);
    jQuery("#upload_introduction").val(summary);
  };

  // src/target/bib.ts
  init_preact_shim();
  var bib_default = (info) => {
    var _a3;
    if (!info.doubanBookInfo) {
      return;
    }
    const { year, pager, translator, author, publisher, ISBN, book_intro: intro, poster } = info.doubanBookInfo;
    jQuery("#AuthorsField").val(author.join(","));
    jQuery("#PublishersField").val(publisher);
    jQuery("#IsbnField").val(ISBN);
    jQuery("#YearField").val(year);
    jQuery("#PagesField").val(pager);
    jQuery("#LanguageField").val("17");
    jQuery("#inputFileID").replaceWith('<textarea name="DescriptionField" id="DescriptionField" rows="15" cols="90"></textarea>');
    jQuery("#TranslatorsField").val(translator.join(","));
    jQuery("#DescriptionField").val(intro);
    jQuery("#ImageField").val(poster);
    const event = new Event("change");
    (_a3 = document.getElementById("DescriptionField")) == null ? void 0 : _a3.dispatchEvent(event);
  };

  // src/target/ptn.ts
  init_preact_shim();
  var ptn_default = (info) => {
    const { resolution, videoType, source } = info;
    let format = "";
    const formatMap = {
      remux: "Remux",
      web: "WebRip",
      dvd: "DVDR",
      dvdrip: "DVDRip",
      "720p": "720P",
      "1080p": "1080P",
      "2160p": "2160P"
    };
    if (videoType.match(/bluray/)) {
      format = "BluRay";
    } else if (videoType === "encode" && source === "bluray") {
      format = formatMap[resolution];
    } else {
      format = formatMap[videoType] || "";
    }
    jQuery("#format").val(format);
  };

  // src/target/site-operations.ts
  var currentSiteInfo = CURRENT_SITE_INFO;
  var SITE_OPERATIONS = {
    PTSBAO: {
      beforeHandler: () => {
        if (localStorage.getItem("autosave")) {
          localStorage.removeItem("autosave");
        }
      },
      afterHandler: (info) => {
        jQuery('a[data-sceditor-command="source"]')[0].click();
        jQuery(currentSiteInfo.description.selector).val(info.description);
      }
    },
    Concertos: {
      handleDescription: (info) => {
        let { description, mediaInfo } = info;
        jQuery("#add").trigger("click");
        jQuery(".sceditor-button.sceditor-button-source.has-icon")[0].click();
        description = description.replace(mediaInfo.trim(), "");
        return description;
      }
    },
    PTer: {
      handleDescription: (info) => {
        var _a3, _b2;
        let description = info.description;
        const { mediaInfo, bdinfo } = getBDInfoOrMediaInfo(description);
        description = description.replace(`[quote]${mediaInfo}[/quote]`, `[hide=mediainfo]${mediaInfo}[/hide]`);
        description = description.replace(`[quote]${bdinfo}[/quote]`, `[hide=BDInfo]${bdinfo}[/hide]`);
        if ((_a3 = info.comparisons) == null ? void 0 : _a3.length) {
          for (const comparison of info.comparisons) {
            const { title, imgs } = comparison;
            const titleCount = (_b2 = title == null ? void 0 : title.split(",").length) != null ? _b2 : "";
            imgs.forEach((img) => {
              description = description.replace(`[img]${img}[/img]`, `[img${titleCount}]${img}[/img]`);
            });
          }
        }
        return description;
      },
      titleHandler: (info) => {
        const isWebSource = !!info.source.match(/web/gi);
        const title = fixTorrentTitle(info.title, isWebSource);
        info.title = title;
        return info;
      },
      afterHandler: (info) => {
        var _a3, _b2;
        const language = (_b2 = (_a3 = info.description.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _a3[2]) != null ? _b2 : "";
        if (!language.match(/英语/) && info.area === "EU") {
          jQuery(currentSiteInfo.area.selector).val("8");
        }
      }
    },
    Blutopia: {
      titleHandler: (info) => {
        const isWebSource = !!info.source.match(/web/gi);
        const title = fixTorrentTitle(info.title, isWebSource);
        info.title = title;
        return info;
      }
    },
    fearnopeer: {
      titleHandler: (info) => {
        const isWebSource = !!info.source.match(/web/gi);
        const title = fixTorrentTitle(info.title, isWebSource);
        info.title = title;
        return info;
      }
    },
    Aither: {
      titleHandler: (info) => {
        const isWebSource = !!info.source.match(/web/gi);
        const title = fixTorrentTitle(info.title, isWebSource);
        info.title = title;
        return info;
      }
    },
    KEEPFRDS: {
      handleDescription: (info) => {
        var _a3, _b2, _c;
        let { description, screenshots } = info;
        const currentSiteInfo7 = CURRENT_SITE_INFO;
        description = description.replaceAll(/\[\/?(center|code)\]/g, "");
        if (info.sourceSite === "PTP") {
          description = (_b2 = (_a3 = info == null ? void 0 : info.originalDescription) == null ? void 0 : _a3.replace(/^(\s+)/g, "")) != null ? _b2 : "";
          description = filterEmptyTags(description);
          description = description.replace(/http:\/\/ptpimg/g, "https://ptpimg");
          screenshots.forEach((screenshot) => {
            const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, "i");
            if (!description.match(regStr)) {
              const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, "i");
              if (description.match(regOldFormat)) {
                description = description.replace(regOldFormat, `[img]${screenshot}[/img]`);
              } else {
                description = description.replace(new RegExp(`(?<!\\[img\\])${screenshot}`, "gi"), `[img]${screenshot}[/img]`);
              }
            }
          });
        }
        jQuery("#torrent").on("change", () => {
          jQuery(currentSiteInfo7.name.selector).val(info.title);
          if (info.subtitle)
            jQuery(currentSiteInfo7.subtitle.selector).val(info.subtitle);
        });
        (_c = info.mediaInfos) == null ? void 0 : _c.forEach((mediaInfo) => {
          description = description.replace(`[quote]${mediaInfo}[/quote]`, `${mediaInfo}`).replace(`${mediaInfo}`, `[mediainfo]${mediaInfo}[/mediainfo]`);
        });
        return description;
      },
      titleHandler: (info) => {
        if (info.category === "music") {
          const { title, subtitle } = info;
          info.subtitle = title;
          if (subtitle !== void 0)
            info.title = subtitle;
        }
        return info;
      }
    },
    SpeedApp: {
      handleDescription: (info) => {
        let { description } = info;
        description = description.replace(/\[url.*\[\/url\]/g, "").replace(/\[img.*\[\/img\]/g, "").replace(/\[\/?(i|b|center|quote|size|color)\]/g, "").replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, "").replace(/\n\n*/g, "\n");
        return description;
      },
      afterHandler: (info) => {
        if (info.imdbId) {
          jQuery(currentSiteInfo.imdb.selector).val(`https://www.imdb.com/title/${info.imdbId}/`);
        }
      }
    },
    PTN: {
      handleDescription: (info) => {
        let { description, imdbUrl } = info;
        description = `${imdbUrl}

${description}`;
        return description;
      },
      afterHandler: (info) => {
        ptn_default(info);
      }
    },
    HDT: {
      handleDescription: (info) => {
        let { description } = info;
        description = description.replace(/(\[\/img\])(\[img\])/g, "$1 $2").replace(/(\[\/url\])(\[url)/g, "$1 $2");
        return description;
      },
      afterHandler: (info) => {
        if (info.category !== "tvPack") {
          jQuery('select[name="season"').val("true");
        }
        if (info.imdbId) {
          jQuery(currentSiteInfo.imdb.selector).val(`https://www.imdb.com/title/${info.imdbId}/`);
        }
      }
    },
    HDRoute: {
      afterHandler: (info) => {
        hdr_default(info);
      }
    },
    HDBits: {
      titleHandler: (info) => {
        let mediaTitle = info.title.replace(/([^\d]+)\s+([12][90]\d{2})/, (match, p1, p22) => {
          return `${info.movieName || info.movieAkaName} ${p22}`;
        });
        if (info.videoType === "remux") {
          mediaTitle = mediaTitle.replace(/\s+(bluray|blu-ray)/ig, "");
        }
        info.title = mediaTitle;
        return info;
      }
    },
    SSD: {
      afterHandler: (info) => {
        if (info.category === "tvPack" || info.title.match(/Trilogy|Collection/i) || info.subtitle && info.subtitle.match(/合集/)) {
          jQuery('input[name="pack"]').attr("checked", "true");
        }
        jQuery(currentSiteInfo.imdb.selector).val(info.doubanUrl || info.imdbUrl);
        jQuery(currentSiteInfo.screenshots.selector).val(info.screenshots.join("\n"));
      }
    },
    HDAI: {
      afterHandler: (info) => {
        const { doubanUrl, imdbUrl, isBluray, screenshots } = info;
        jQuery(currentSiteInfo.imdb.selector).val(doubanUrl || imdbUrl);
        jQuery(currentSiteInfo.screenshots.selector).val(screenshots.join("\n"));
        if (isBluray) {
          jQuery('input[type="checkbox"][name="tag[o]"]').attr("checked", "true");
        }
      }
    },
    HDU: {
      afterHandler: (info) => {
        let videoTypeValue = "";
        const { resolution, videoType, category } = info;
        const isTV = category.match(/tv/);
        if (videoType === "remux") {
          if (resolution === "2160p") {
            videoTypeValue = isTV ? "16" : "15";
          } else {
            videoTypeValue = isTV ? "12" : "3";
          }
        }
        if (isTV) {
          if (videoType === "encode") {
            videoTypeValue = "14";
          } else if (videoType === "web") {
            videoTypeValue = "13";
          }
        }
        if (videoTypeValue) {
          jQuery(currentSiteInfo.videoType.selector).val(videoTypeValue);
        }
      }
    },
    TJUPT: {
      afterHandler: (info) => {
        jQuery("#browsecat").trigger("change");
        tjupt_default(info);
      }
    },
    NYPT: {
      afterHandler: (info) => {
        jQuery("#browsecat").trigger("change");
        const domTimeout = setTimeout(() => {
          const catMap = {
            movie: "#movie_enname",
            tv: "#series_enname",
            tvPack: "#series_enname",
            documentary: "#doc_enname",
            variety: "#show_enname",
            cartoon: "#anime_enname"
          };
          const selector = catMap[info.category];
          if (selector) {
            jQuery(selector).val(info.title);
          }
          clearTimeout(domTimeout);
        }, 2e3);
      }
    },
    iTS: {
      afterHandler: (info) => {
        its_default(info);
      }
    },
    UHDBits: {
      afterHandler: (info) => {
        jQuery(currentSiteInfo.imdb.selector).val(info.imdbId || "");
        if (info.title.match(/web-?rip/i)) {
          jQuery(currentSiteInfo.videoType.selector).val("WEBRip");
        }
        const teamName = getTeamName(info);
        jQuery("#team").val(teamName === "other" ? "Unknown" : teamName);
        jQuery("#imdb_button").trigger("click");
      }
    },
    "52pt": {
      afterHandler: (info) => {
        const { tags, videoType, resolution } = info;
        let videoTypeValue = videoType;
        if (videoType.match(/bluray/)) {
          if (tags.chinese_audio || tags.cantonese_audio || tags.chinese_subtitle) {
            videoTypeValue = videoType === "bluray" ? "14" : "15";
          }
        } else if (videoType === "remux" && resolution === "2160p") {
          videoTypeValue = "5";
        }
        jQuery(currentSiteInfo.videoType.selector).val(videoTypeValue);
      }
    },
    BTSCHOOL: {
      afterHandler: (info) => {
        var _a3, _b2;
        jQuery(currentSiteInfo.imdb.selector).val(info.imdbId || "");
        if (info.doubanUrl) {
          const doubanId = (_b2 = (_a3 = info.doubanUrl.match(/\/(\d+)/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
          jQuery(currentSiteInfo.douban.selector).val(doubanId);
        }
      }
    },
    HDTime: {
      afterHandler: (info) => {
        if (info.videoType.match(/bluray/i)) {
          jQuery(currentSiteInfo.category.selector).val("424");
        }
      }
    },
    RedLeaves: {
      afterHandler: (info) => {
        try {
          jQuery(currentSiteInfo.category.selector).trigger("change");
        } catch (err) {
        }
        jQuery("tr.mode_5").css("display", "");
      }
    },
    HDFans: {
      afterHandler: (info) => {
        const { videoType, resolution, tags } = info;
        if (videoType === "remux") {
          jQuery(currentSiteInfo.videoType.selector).val(resolution === "2160p" ? "10" : "8");
        } else if (videoType === "encode") {
          const map = {
            "2160p": "9",
            "1080p": "5",
            "1080i": "5",
            "720p": "11"
          };
          jQuery(currentSiteInfo.videoType.selector).val(map[resolution] || "16");
        }
        if (tags.diy) {
          jQuery(currentSiteInfo.videoType.selector).val(resolution === "2160p" ? "2" : "4");
        }
      }
    },
    Bib: {
      afterHandler: (info) => {
        if (info.doubanBookInfo) {
          bib_default(info);
        }
      }
    },
    HaresClub: {
      afterHandler: (info) => {
        jQuery(".modesw").trigger("click");
        jQuery(currentSiteInfo.screenshots.selector).val(info.screenshots.join("\n"));
        if (layui) {
          setTimeout(() => {
            layui.form.render("select");
            layui.form.render("checkbox");
          }, 1e3);
        }
      }
    }
  };

  // src/target/helper.ts
  var ExportHelper = class {
    constructor(info) {
      this.info = info;
      this.currentSiteInfo = CURRENT_SITE_INFO;
      this.operation = SITE_OPERATIONS[CURRENT_SITE_NAME];
    }
    prepareToFillInfo() {
      var _a3;
      if ((_a3 = this.operation) == null ? void 0 : _a3.beforeHandler) {
        this.operation.beforeHandler();
      }
    }
    fillTeamName() {
      const teamConfig = this.currentSiteInfo.team;
      const teamName = getTeamName(this.info);
      if (teamName && teamConfig) {
        const formateTeamName = teamConfig.map[teamName.toLowerCase()];
        const matchValue = formateTeamName || teamConfig.map.other;
        if (HDB_TEAM.includes(teamName) && CURRENT_SITE_NAME === "BTSCHOOL") {
          jQuery(teamConfig.selector).val(teamConfig.map.hdbint);
          return;
        }
        if (CURRENT_SITE_NAME === "HDAI" && !formateTeamName) {
          jQuery('input[name="team"]').val(teamName);
          return;
        }
        if (CURRENT_SITE_NAME === "UHDBits") {
          jQuery("#team").val(teamName === "other" ? "Unknown" : teamName);
          return;
        }
        if (matchValue) {
          jQuery(teamConfig.selector).val(matchValue.toLowerCase());
        }
      }
    }
    disableTorrentChange() {
      var _a3, _b2;
      const nameSelector = (_b2 = (_a3 = this.currentSiteInfo.name) == null ? void 0 : _a3.selector) != null ? _b2 : "";
      if (nameSelector.match(/^#\w+/)) {
        const nameDom = jQuery(nameSelector).clone().attr("name", "").hide();
        jQuery(nameSelector).attr("id", "").after(nameDom);
      }
    }
    getThanksQuote() {
      const isChineseSite = isChineseTacker(this.currentSiteInfo.siteType) || CURRENT_SITE_NAME.match(/HDPOST|GPW/);
      let thanksQuote = `\u8F6C\u81EA[b]${this.info.sourceSite}[/b]\uFF0C\u611F\u8C22\u539F\u53D1\u5E03\u8005\uFF01`;
      if (!isChineseSite) {
        thanksQuote = `Torrent from [b]${this.info.sourceSite}[/b].
All thanks to the original uploader\uFF01`;
      }
      return `[quote]${thanksQuote}[/quote]

`;
    }
    getChineseName() {
      var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
      const { description, subtitle } = this.info;
      const originalName = (_b2 = (_a3 = description.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _a3[2]) != null ? _b2 : "";
      const translateName = (_f = (_e = (_d = (_c = description.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _c[2]) == null ? void 0 : _d.split("/")) == null ? void 0 : _e[0]) != null ? _f : "";
      let chineseName = originalName;
      if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
        chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
      }
      if (chineseName === "" && subtitle !== "" && subtitle !== void 0) {
        chineseName = (_j = (_i = (_h = (_g = this.info) == null ? void 0 : _g.subtitle) == null ? void 0 : _h.replaceAll(/【|】.*/g, "").split("/")) == null ? void 0 : _i[0]) != null ? _j : "";
      }
      return chineseName.trim();
    }
    torrentTitleHandler() {
      var _a3;
      let fixedTitle = this.info.title.replace("H 265", "H.265").replace("H 264", "H.264");
      this.info.title = fixedTitle;
      if ((_a3 = this.operation) == null ? void 0 : _a3.titleHandler) {
        this.info = this.operation.titleHandler(this.info);
      }
      if (this.currentSiteInfo.name) {
        if (CURRENT_SITE_NAME.match(/SSD|iTS|HDChina/)) {
          fixedTitle = fixedTitle.replace(/\s/ig, ".");
        } else if (CURRENT_SITE_NAME.match(/PuTao/)) {
          fixedTitle = `[${this.getChineseName()}]${fixedTitle}`;
        }
        jQuery(this.currentSiteInfo.name.selector).val(fixedTitle);
      }
      this.info.title = fixedTitle;
      return this.info;
    }
    imdbHandler() {
      var _a3, _b2, _c;
      const imdbSelector = (_b2 = (_a3 = this.currentSiteInfo) == null ? void 0 : _a3.imdb) == null ? void 0 : _b2.selector;
      if (!imdbSelector) {
        return;
      }
      const imdbId = getIMDBIdByUrl(this.info.imdbUrl || "");
      this.info.imdbId = imdbId;
      if (CURRENT_SITE_NAME.match(/HDRoute|HDSpace/)) {
        jQuery(imdbSelector).val((_c = imdbId == null ? void 0 : imdbId.replace("tt", "")) != null ? _c : "");
      } else if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|HDPOST|ACM|Aither|Concertos|MDU|LST/)) {
        let tmdbId = "";
        const fillIMDBId = this.currentSiteInfo.siteType === "UNIT3D" ? imdbId.replace("tt", "") : imdbId;
        jQuery(imdbSelector).val(fillIMDBId);
        getTMDBIdByIMDBId(imdbId).then((data) => {
          tmdbId = data.id;
          jQuery(this.currentSiteInfo.tmdb.selector).val(tmdbId);
        });
        if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither|MDU|LST/)) {
          jQuery("#torrent").on("change", () => {
            jQuery(imdbSelector).val(fillIMDBId);
            jQuery(this.currentSiteInfo.tmdb.selector).val(tmdbId);
            jQuery("#automal").val(0);
          });
        }
      } else {
        jQuery(imdbSelector).val(this.info.imdbUrl || "");
      }
    }
    fillBasicAttributes() {
      const commonInfoKeys = ["subtitle", "douban", "area", "audioCodec"];
      commonInfoKeys.forEach((key) => {
        const siteInfo = this.currentSiteInfo[key];
        if (siteInfo && siteInfo.selector) {
          let value = this.info[key];
          if (key === "douban") {
            value = this.info.doubanUrl;
          } else if (key === "area" || key === "audioCodec") {
            value = siteInfo.map[value];
          }
          jQuery(siteInfo.selector).val(value);
        }
      });
    }
    descriptionHandler() {
      var _a3, _b2, _c;
      let { mediaInfo, isBluray, screenshots = [], description = "", doubanInfo, poster } = this.info;
      if (description) {
        description = description.replace(/^(\s+)/g, "");
        if (isChineseTacker(this.currentSiteInfo.siteType) && CURRENT_SITE_NAME !== "SSD") {
          if (doubanInfo) {
            description = `${doubanInfo}
${description}`;
          }
        } else {
          const { sourceSiteType } = this.info;
          if (isChineseTacker(sourceSiteType) && CURRENT_SITE_NAME !== "Bib") {
            description = filterNexusDescription(this.info);
          }
        }
      }
      if (this.currentSiteInfo.mediaInfo) {
        if (CURRENT_SITE_NAME.match(/^(Blutopia|fearnopeer|Aither|MDU)/)) {
          const selector = isBluray ? 'textarea[name="bdinfo"]' : this.currentSiteInfo.mediaInfo.selector;
          jQuery(selector).val(mediaInfo);
          description = description.replace(mediaInfo.trim(), "");
        } else if (isBluray && CURRENT_SITE_NAME.match(/^(SpeedApp)/)) {
          jQuery(this.currentSiteInfo.bdinfo.selector).val(mediaInfo);
          this.info.mediaInfo = "";
        } else if (!(isBluray && CURRENT_SITE_NAME.match(/^(HDBits)/))) {
          jQuery(this.currentSiteInfo.mediaInfo.selector).val(mediaInfo);
          description = description.replace(mediaInfo.trim(), "");
        }
      }
      if (this.currentSiteInfo.screenshots) {
        screenshots.forEach((img) => {
          if (description.includes(img)) {
            description = description.replace(img, "");
            if (!img.match(/\[url=.+?\[url]/)) {
              description = description.replace(/\[img\]\[\/img\]\n*/g, "");
            }
          }
        });
      }
      if (this.currentSiteInfo.poster) {
        if (!poster) {
          const doubanPosterImage = (description + doubanInfo).match(/\[img\](http[^[]+?(poster|(img\d\.doubanio))[^[]+?)\[\/img\]/);
          if (doubanPosterImage && doubanPosterImage[1]) {
            poster = doubanPosterImage[1];
          } else {
            poster = (_b2 = (_a3 = description.match(/\[img\](.+?)\[\/img\]/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
          }
        }
        if (poster) {
          jQuery(this.currentSiteInfo.poster).val(poster);
          if (CURRENT_SITE_NAME === "HDRoute") {
            jQuery('input[name="poster"]').val(poster);
            description = description.replace(poster, "");
          }
        }
      }
      if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither|MDU/)) {
        if (this.info.sourceSite === "PTP") {
          description = buildPTPDescription(this.info);
        }
        if (screenshots.length > 0) {
          screenshots.forEach((img) => {
            const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](
*)?`);
            if (description.match(regStr)) {
              description = description.replace(regStr, (p1, p22) => {
                return `[url=${p22}][img=350x350]${p22}[/img][/url]`;
              });
            }
          });
        }
        if (description.match(/mobile\.webp\[\/img/gi)) {
          description = description.replace(/\[img\]/g, "[img=350x350]");
        }
      }
      if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither/)) {
        description = description.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, "[$2]$3[/$2]");
        description = description.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p22) => {
          const slash = p1 || "";
          return p22 ? `${p22}: [${slash}spoiler]` : `[${slash}spoiler]`;
        });
      }
      if ((_c = this.operation) == null ? void 0 : _c.handleDescription) {
        description = this.operation.handleDescription(__spreadProps(__spreadValues({}, this.info), {
          description
        }));
      }
      description = filterEmptyTags(description);
      const thanksQuoteClosed = GM_getValue("easy-seed.thanks-quote-closed") || "";
      if (!thanksQuoteClosed && this.info.sourceSite !== void 0) {
        description = this.getThanksQuote() + description.trim();
      }
      jQuery(this.currentSiteInfo.description.selector).val(description);
      this.info = __spreadProps(__spreadValues({}, this.info), {
        description
      });
    }
    categoryHandler() {
      const { isBluray, category, videoType } = this.info;
      if (CURRENT_SITE_NAME.match(/ACM|Concertos/i)) {
        this.info.category = videoType;
        this.info.videoType = category;
        if (isBluray) {
          let bdType = getBDType(this.info.size);
          if (videoType === "uhdbluray" && bdType === "BD50") {
            bdType = "uhd50";
          }
          this.info.category = bdType || "";
        }
      }
      if (this.currentSiteInfo.category) {
        const category2 = this.currentSiteInfo.category.map[this.info.category];
        const keyArray = ["videoCodec", "videoType", "resolution", "source", "area"];
        let finalSelectArray = [];
        if (Array.isArray(category2)) {
          finalSelectArray = [...category2];
          keyArray.forEach((key) => {
            finalSelectArray = matchSelectForm(this.currentSiteInfo, this.info, key, finalSelectArray);
            if (finalSelectArray.length === 1) {
              jQuery(this.currentSiteInfo.category.selector).val(finalSelectArray[0]);
            }
          });
        } else {
          [...keyArray, "category"].forEach((key) => {
            matchSelectForm(this.currentSiteInfo, this.info, key, finalSelectArray);
          });
        }
      }
    }
    fillRemainingInfo() {
      if (this.currentSiteInfo.format) {
        const formatData = this.currentSiteInfo.format;
        jQuery(formatData.selector).val(formatData.map[this.info.format]);
      }
      if (this.currentSiteInfo.image) {
        jQuery(this.currentSiteInfo.image.selector).val(this.info.image || "");
      }
      if (this.currentSiteInfo.anonymous) {
        const { selector, value = "" } = this.currentSiteInfo.anonymous;
        if (value) {
          jQuery(selector).val(value);
        } else {
          jQuery(selector).attr("checked", "true");
        }
      }
      if (this.currentSiteInfo.tags) {
        Object.keys(this.info.tags).forEach((key) => {
          if (this.info.tags[key] && this.currentSiteInfo.tags[key]) {
            jQuery(this.currentSiteInfo.tags[key]).attr("checked", "true");
          }
        });
      }
      this.fillTeamName();
      if (CURRENT_SITE_NAME.match(/HDHome|HDZone|PTHome|SoulVoice|1PTBA|HDAtmos|3Wmg/i)) {
        setTimeout(() => {
          var _a3;
          const event = new Event("change");
          (_a3 = document.querySelector(this.currentSiteInfo.category.selector)) == null ? void 0 : _a3.dispatchEvent(event);
        }, 1e3);
      }
    }
    dealWithMoreSites() {
      var _a3, _b2, _c, _d, _e;
      if ((_a3 = this.operation) == null ? void 0 : _a3.afterHandler) {
        this.operation.afterHandler(this.info);
      }
      if (CURRENT_SITE_NAME.match(/PTHome|1PTBA|52pt|Audiences/i)) {
        if (this.info.tags.diy) {
          let categoryValue = "";
          if (CURRENT_SITE_NAME.match(/Audiences|PTHome/)) {
            categoryValue = this.info.videoType === "bluray" ? "14" : "13";
          } else if (CURRENT_SITE_NAME === "1PTBA") {
            categoryValue = this.info.videoType === "bluray" ? "1" : "4";
          } else if (CURRENT_SITE_NAME === "52pt") {
            categoryValue = this.info.videoType === "bluray" ? "2" : "12";
          }
          jQuery(this.currentSiteInfo.videoType.selector).val(categoryValue);
        }
      }
      if (this.currentSiteInfo.siteType === "UNIT3D" && this.info.category.match(/tv/)) {
        const season = (_c = (_b2 = this.info.title.match(/S0?(\d{1,2})/i)) == null ? void 0 : _b2[1]) != null ? _c : 1;
        const episode = (_e = (_d = this.info.title.match(/EP?0?(\d{1,3})/i)) == null ? void 0 : _d[1]) != null ? _e : 0;
        jQuery("#season_number").val(season);
        jQuery("#episode_number").val(episode);
      }
      if (CURRENT_SITE_NAME.match(/HDHome|HDZone/)) {
        if (this.info.title.match(/iPad/i)) {
          const categoryMap = {
            movie: "412",
            tv: "426",
            tvPack: "433",
            documentary: "418"
          };
          const ipadCat = categoryMap[this.info.category];
          if (ipadCat) {
            jQuery("#browsecat").val(ipadCat);
          }
        }
      }
    }
  };

  // src/target/ptp.ts
  init_preact_shim();
  var ptp_default = async (info) => {
    const currentSiteInfo7 = PT_SITE.PTP;
    const {
      title,
      imdbUrl,
      tags,
      size,
      videoCodec = "",
      videoType,
      resolution
    } = info;
    const groupId = getUrlParam("groupid");
    if (!groupId) {
      jQuery(currentSiteInfo7.imdb.selector).val(imdbUrl || 0);
      AutoFill();
    }
    info.resolution = getResolution2(resolution, videoType, title);
    info.videoCodec = getVideoCodec(videoCodec, videoType, size);
    const keyArray = ["category", "source", "videoCodec", "resolution"];
    keyArray.forEach((key) => {
      const { selector = "", map } = currentSiteInfo7[key];
      if (map) {
        const mapValue = map[info[key]];
        jQuery(selector).val(mapValue);
      } else {
        jQuery(selector).val(info[key]);
      }
    });
    const description = getDescription(info);
    jQuery(currentSiteInfo7.description.selector).val(description);
    const editionInfo = getEditionInfo(videoType, tags);
    if (editionInfo.length > 0) {
      jQuery("#remaster").attr("checked", "true");
      Remaster();
      editionInfo.forEach((edition) => {
        const event = new Event("click");
        jQuery(`#remaster_tags a:contains("${edition}")`)[0].dispatchEvent(event);
      });
    }
    const infoFromMediaInfoinfo = getInfoFromMediaInfo(info.mediaInfo);
    if (infoFromMediaInfoinfo.subtitles && infoFromMediaInfoinfo.subtitles[0]) {
      infoFromMediaInfoinfo.subtitles.forEach((subtitle) => {
        if (subtitle !== "English" && jQuery(`.languageselector li:contains(${subtitle})`)[0]) {
          jQuery(`.languageselector li:contains(${subtitle}) input`).attr("checked", "true");
        }
      });
    }
  };
  var getEditionInfo = (videoType, tags) => {
    const editionInfo = [];
    if (videoType === "remux") {
      editionInfo.push("Remux");
    }
    if (tags.hdr) {
      editionInfo.push("HDR10");
    }
    if (tags.hdr10_plus) {
      editionInfo.push("HDR10+");
    }
    if (tags.dolby_vision) {
      editionInfo.push("Dolby Vision");
    }
    if (tags.dolby_atmos) {
      editionInfo.push("Dolby Atmos");
    }
    if (tags.dts_x) {
      editionInfo.push("DTS:X");
    }
    return editionInfo;
  };
  var getVideoCodec = (videoCodec, videoType, size) => {
    if (videoType === "bluray") {
      return getBDType(size);
    } else if (videoType === "dvd") {
      const GBSize = size / 1e9;
      if (GBSize < 5) {
        return "DVD5";
      }
      return "DVD9";
    }
    return videoCodec;
  };
  var getResolution2 = (resolution, videoType, title) => {
    if (videoType === "DVD" && title.match(/NTSC/i)) {
      return "NTSC";
    } else if (videoType === "DVD" && title.match(/PAL/i)) {
      return "PAL";
    }
    return resolution;
  };
  var getDescription = (info) => {
    const { mediaInfo, comparisons, screenshots } = info;
    let filterDescription = "";
    if (mediaInfo) {
      filterDescription += `[mediainfo]${mediaInfo}[/mediainfo]`;
    }
    if (comparisons && comparisons.length > 0) {
      for (const comparison of comparisons) {
        filterDescription += `
${comparison.reason}[comparison=${comparison.title}]
${comparison.imgs.join("\n")}
[/comparison]

`;
      }
    }
    return `${filterDescription}
${screenshots.map((item) => `[img]${item}[/img]`).join("\n")}`;
  };

  // src/target/gpw.ts
  init_preact_shim();
  var currentSiteInfo2 = PT_SITE.GPW;
  var gpw_default = async (info) => {
    const isUploadSuccess = !jQuery("#mediainfo")[0];
    if (isUploadSuccess) {
      return;
    }
    transformInfo(info);
    const isAddFormat = getUrlParam("groupid");
    if (!isAddFormat) {
      jQuery(currentSiteInfo2.imdb.selector).val(info.imdbUrl || 0);
      jQuery("#imdb_button").trigger("click");
      jQuery("#upload .collapse").show();
    }
    jQuery(currentSiteInfo2.category.selector).val(currentSiteInfo2.category.map[info.category]);
    fillEditionInfo(info);
    fillMediaInfo(info);
    if (!jQuery(currentSiteInfo2.source.selector).val()) {
      handleNoAutoCheck(info);
    }
    fillScene(info);
    fillProcessing(info);
    fillDescription(info);
    jQuery(".u-bbcodePreview-button").trigger("click");
  };
  function buildDescription(info) {
    let description = "";
    if (info.comparisons && info.comparisons.length > 0) {
      for (const comparison of info.comparisons) {
        description += `${comparison.reason}[comparison=${comparison.title}]
${comparison.imgs.join("\n")}
[/comparison]

`;
      }
    }
    if (info.screenshots.length > 0) {
      description += `${info.screenshots.map((v3) => `[img]${v3}[/img]`).join("\n")}

`;
    }
    return description.trim();
  }
  function fillEditionInfo(info) {
    const editionTags = Object.keys(info.tags).map((tag) => info.tags[tag] && currentSiteInfo2.targetInfo.editionTags[tag]).filter(Boolean);
    let otherTag;
    if (Object.keys(info.otherTags).length > 0) {
      otherTag = Object.keys(info.otherTags).join(", ");
    }
    if (editionTags.length > 0 || otherTag) {
      jQuery("#movie_edition_information").trigger("click");
    }
    if (editionTags.length > 0) {
      for (const tag of editionTags) {
        jQuery(`#movie_remaster_tags a[onclick*="'${tag}'"]`).trigger("click");
      }
    }
    if (otherTag) {
      jQuery("#other-button").trigger("click");
      jQuery("[name=remaster_custom_title]").val(otherTag);
    }
  }
  function fillMediaInfo(info) {
    if (!info.mediaInfos) {
      return;
    }
    for (let i3 = 1; i3 < info.mediaInfos.length; i3++) {
      jQuery("#add-mediainfo")[0].click();
    }
    const textareas = Array.from(jQuery('[name="mediainfo[]"]'));
    for (const [index, textarea] of textareas.entries()) {
      textarea.value = info.mediaInfos[index];
      textarea.dispatchEvent(new Event("input"));
    }
    jQuery('[name="mediainfo[]"]')[0].dispatchEvent(new Event("change"));
  }
  function fillScene(info) {
    if (info.tags.scene) {
      jQuery("#scene").prop("checked", true);
    }
  }
  function fillProcessing(info) {
    let { videoType, size, source, tags } = info;
    if (source.match(/bluray|hddvd|dvd/)) {
      if (tags.diy) {
        videoType = "DIY";
      }
      const videoTypeConfig = currentSiteInfo2.videoType;
      const { selector, map } = videoTypeConfig;
      jQuery(selector).val(map[videoType]);
      jQuery(selector)[0].dispatchEvent(new Event("change"));
      if (map[videoType] === "Untouched") {
        const bdType = getBDType(size);
        jQuery('select[name="processing_other"]').val(bdType || "");
      }
      jQuery(selector)[0].dispatchEvent(new Event("input"));
    }
  }
  function handleNoAutoCheck(info) {
    var _a3;
    const {
      mediaInfo,
      videoType
    } = info;
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { format = "", subtitles = [] } = getInfoFunc(mediaInfo);
    info.format = getFormat(format, videoType);
    const keyArray = ["source", "videoCodec", "format", "resolution"];
    keyArray.forEach((key) => {
      var _a4, _b2;
      const { selector = "", map } = currentSiteInfo2[key];
      if (map) {
        const mapValue = map[info[key]];
        jQuery(selector).val(mapValue);
        if (key === "videoCodec" && mapValue === "Other") {
          document.querySelector(selector).dispatchEvent(new Event("change"));
          jQuery('input[name="codec_other"]').val((_b2 = (_a4 = info[key]) == null ? void 0 : _a4.toUpperCase()) != null ? _b2 : "");
        }
      } else {
        jQuery(selector).val(info[key] || "");
      }
    });
    if (subtitles.length > 0) {
      jQuery("#mixed_subtitles").attr("checked", "true");
      jQuery('input[name="subtitles[]"][type="checkbox"]').each(function() {
        var _a4, _b2;
        const language = (_b2 = (_a4 = jQuery(this).attr("id")) == null ? void 0 : _a4.replace(/^\S|(_\S)/g, (letter) => letter.replace("_", " ").toUpperCase())) != null ? _b2 : "";
        if (subtitles.includes(language)) {
          jQuery(this).attr("checked", "true");
        }
      });
      const event = new Event("change");
      (_a3 = document.querySelector("#mixed_subtitles")) == null ? void 0 : _a3.dispatchEvent(event);
      const chineseLanguages = subtitles.filter((item) => item.match(/Chinese|Traditional|Simplified/i));
      if (chineseLanguages.length === 1 && chineseLanguages[0] === "Chinese") {
        const selector = chineseLanguages[0].match(/Traditional/i) ? "#chinese_traditional" : "#chinese_simplified";
        jQuery(selector).attr("checked", "true");
      } else if (chineseLanguages.length >= 2) {
        jQuery("#chinese_traditional,#chinese_simplified").attr("checked", "true");
      }
    }
  }
  var getFormat = (format, videoType) => {
    if (videoType.match(/bluray/) && format !== "iso") {
      format = "m2ts";
    } else if (videoType.match(/dvd/)) {
      format = "vob";
    }
    return format || "mkv";
  };
  function transformInfo(info) {
    if (info.mediaInfos && info.mediaInfos.length === 0 && info.mediaInfo) {
      info.mediaInfos = [info.mediaInfo];
    }
    if (["encode", "remux"].includes(info.videoType) && info.mediaInfos) {
      const newMediaInfos = [];
      for (const mediaInfo of info.mediaInfos) {
        if (mediaInfo.match(/Disc Title|Disc Label/i)) {
          continue;
        }
        newMediaInfos.push(mediaInfo);
      }
      info.mediaInfos = newMediaInfos;
    }
  }
  function fillDescription(info) {
    let description = "";
    if (info.sourceSite === "PTP") {
      description = buildPTPDescription(info);
    } else if (info.sourceSite === "BeyondHD") {
      description = info.originalDescription || "";
    } else {
      description = buildDescription(info);
    }
    jQuery(currentSiteInfo2.description.selector).val(description);
    jQuery(currentSiteInfo2.description.selector)[0].dispatchEvent(new Event("input"));
  }

  // src/target/npubits.ts
  init_preact_shim();
  var npubits_default = (info) => {
    var _a3, _b2;
    const currentSiteInfo7 = PT_SITE.NPUBits;
    let { title, year, movieName, category, doubanInfo, description, subtitle } = info;
    jQuery(currentSiteInfo7.subtitle.selector).val(subtitle || "");
    if (doubanInfo) {
      description = `${doubanInfo}
${description}`;
    }
    jQuery(currentSiteInfo7.description.selector).val(description);
    jQuery("#torrent_name_checkbox").attr("checked", "true");
    jQuery(currentSiteInfo7.name.selector).val(title);
    jQuery(currentSiteInfo7.category.selector).val(currentSiteInfo7.category.map[category]);
    jQuery(currentSiteInfo7.category.selector)[0].dispatchEvent(new Event("change"));
    if (category.match(/tv/)) {
      const districtMap = {
        CN: "23",
        HK: "24",
        TW: "24",
        JP: "26",
        KR: "27",
        US: "25",
        EU: "65",
        OT: "63"
      };
      jQuery(currentSiteInfo7.area.selector).val(districtMap[info.area]);
    } else if (category.match(/movie/)) {
      jQuery(currentSiteInfo7.area.selector).val(currentSiteInfo7.area.map[info.area]);
    }
    jQuery(currentSiteInfo7.area.selector)[0].dispatchEvent(new Event("change"));
    const keyArray = ["videoCodec", "videoType", "resolution"];
    keyArray.forEach((key) => {
      const { selector, map } = currentSiteInfo7[key];
      fill_field(selector, map[info[key]]);
    });
    const teamName = getTeamName(info);
    const teamConfig = currentSiteInfo7.team;
    jQuery(`${teamConfig.selector}`).val(teamConfig.map[teamName]);
    jQuery("#torrent_name_field0").val(movieName);
    if (category === "movie") {
      jQuery("#torrent_name_field1").val(year);
    } else if (category.match(/tv/)) {
      const episode = (_b2 = (_a3 = title.match(/S\d+(E\d+)?/i)) == null ? void 0 : _a3[0]) != null ? _b2 : "";
      jQuery("#torrent_name_field1").val(episode);
    }
    jQuery('input[name="uplver"]').attr("checked", "true");
  };

  // src/target/byr.ts
  init_preact_shim();
  var byr_default = (info) => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const currentSiteInfo7 = PT_SITE.BYR;
    const {
      title,
      description,
      doubanInfo,
      category,
      videoType,
      mediaInfo,
      subtitle,
      imdbUrl,
      doubanUrl
    } = info;
    jQuery(currentSiteInfo7.subtitle.selector).val(subtitle || "");
    jQuery(currentSiteInfo7.imdb.selector).val(imdbUrl || "");
    jQuery(currentSiteInfo7.douban.selector).val(doubanUrl || "");
    CKEDITOR.on("instanceReady", () => {
      CKEDITOR.instances.descr.setData(bbcode2Html(description));
    });
    jQuery("#ename0day").val(title);
    const fullDescription = description + doubanInfo;
    let area = (_b2 = (_a3 = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a3[2]) != null ? _b2 : "";
    area = area.replace(/\[\/?.+?\]/g, "");
    const originalName = (_d = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d : "";
    const translateName = (_h = (_g = (_f = (_e = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
    const movieType = (_j = (_i = fullDescription.match(/(类\s+别)\s+(.+)/)) == null ? void 0 : _i[2]) != null ? _j : "";
    const language = (_l = (_k = fullDescription.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _k[2]) != null ? _l : "";
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
    }
    if (category.match(/movie/)) {
      let selector = "";
      if (area.match(/华语|台|港/)) {
        selector = "\u534E\u8BED";
      } else if (area.match(/日本|韩国|泰国/)) {
        selector = "\u4E9A\u6D32";
      } else if (area.match(/美国|加拿大/)) {
        selector = "\u5317\u7F8E";
      } else if (area.match(/欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "\u6B27\u6D32";
      } else {
        selector = "\u5176\u4ED6";
      }
      const typeMap = {
        \u534E\u8BED: "11",
        \u6B27\u6D32: "12",
        \u5317\u7F8E: "13",
        \u4E9A\u6D32: "14",
        \u5176\u4ED6: "1"
      };
      jQuery('select[name="second_type"]').val(typeMap[selector]);
      jQuery('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      const movieTypeArr = movieType.split(/\s\//);
      jQuery("#movie_type").val(movieTypeArr.join("/"));
      fillField(selector, category === "movie" ? "movie_country" : "show_country");
      jQuery("#movie_cname").val(chineseName);
    } else if (category.match(/tv/)) {
      let selector = "movie_country";
      if (area.match(/大陆/)) {
        selector = "\u5927\u9646";
      } else if (area.match(/台|港/)) {
        selector = "\u6E2F\u53F0";
      } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "\u6B27\u7F8E";
      } else if (area.match(/日本|韩国/)) {
        selector = "\u65E5\u97E9";
      } else {
        selector = "\u5176\u4ED6";
      }
      const typeMap = {
        \u5927\u9646: "15",
        \u6E2F\u53F0: "16",
        \u6B27\u7F8E: "17",
        \u65E5\u97E9: "18",
        \u5176\u4ED6: "2"
      };
      jQuery('select[name="second_type"]').val(typeMap[selector]);
      jQuery('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      fillField(selector, "tv_type");
      jQuery("#tv_ename").val(title);
      jQuery("#cname").val(chineseName);
      const episode = (_n = (_m = title.match(/S\d+(E\d+)?/i)) == null ? void 0 : _m[0]) != null ? _n : "";
      jQuery("#tv_season").val(episode);
      const isBluray = videoType.match(/bluray/i);
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { format } = getInfoFunc(mediaInfo);
      fillField((format == null ? void 0 : format.toUpperCase()) || "MKV", "tv_filetype");
    } else if (category.match(/variety/)) {
      let selector = "";
      if (area.match(/大陆/)) {
        selector = "\u5927\u9646";
      } else if (area.match(/台|港/)) {
        selector = "\u6E2F\u53F0";
      } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "\u6B27\u7F8E";
      } else if (area.match(/日本|韩国/)) {
        selector = "\u65E5\u97E9";
      } else {
        selector = "\u5176\u4ED6";
      }
      const typeMap = {
        \u5927\u9646: "27",
        \u6E2F\u53F0: "29",
        \u6B27\u7F8E: "30",
        \u65E5\u97E9: "28",
        \u5176\u4ED6: "5"
      };
      jQuery('select[name="second_type"]').val(typeMap[selector]);
      jQuery('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      fillField(selector, "show_country");
      jQuery("#show_cname").val(chineseName);
      jQuery("#show_ename").val(title);
      let languageVal = "";
      if (language.match(/汉语/)) {
        languageVal = "\u56FD\u8BED";
      } else if (language.match(/粤/)) {
        languageVal = "\u7CA4\u8BED";
      } else if (language.match(/英语/)) {
        languageVal = "\u82F1\u8BED";
      } else if (language.match(/日语/)) {
        languageVal = "\u65E5\u8BED";
      } else if (language.match(/韩语/)) {
        languageVal = "\u97E9\u8BED";
      }
      fillField(languageVal, "show_language");
    }
    function bbcode2Html(bbcode) {
      let html = bbcode.replace(/\[\*\]([^\n]+)/ig, "<li>$1</li>");
      html = html.replace(/(\r\n)|\n/g, "<br>");
      html = html.replace(/\[(quote|hide=.+?)\]/ig, "<fieldset><legend>\u5F15\u7528</legend>");
      html = html.replace(/\[(\/)(quote|hide)\]/ig, "<$1fieldset>");
      html = html.replace(/(?!\[url=(http(s)*:\/{2}.+?)\])\[img\](.+?)\[\/img]\[url\]/g, '<a href="$1"><img src="$2"/></a>');
      html = html.replace(/\[img\](.+?)\[\/img]/g, '<img src="$1"/>');
      html = html.replace(/\[(\/)?(left|right|center)\]/ig, "<$1$2>");
      html = html.replace(/\[(\/)?b\]/ig, "<$1strong>");
      html = html.replace(/\[color=(.+?)\]/ig, '<span style="color: $1">').replace(/\[\/color\]/g, "</span>");
      html = html.replace(/\[size=(.+?)\]/ig, '<font size="$1">').replace(/\[\/size\]/g, "</font>");
      html = html.replace(/\[url=(.+?)\](.+?)\[\/url\]/ig, '<a href="$1">$2</a>');
      return html;
    }
  };

  // src/target/sc.ts
  init_preact_shim();
  var sc_default = async (info) => {
    const { imdbUrl = "" } = info;
    const imdbId = getIMDBIdByUrl(imdbUrl);
    jQuery("#catalogue_number").val(imdbId);
    jQuery("#imdb_autofill").trigger("click");
    fillMedia(info);
    jQuery(".modesw").trigger("click");
    jQuery("#release_desc").val(buildDescription2(info));
    await fillIMDb(imdbUrl);
  };
  function buildDescription2(info) {
    const { screenshots, mediaInfo } = info;
    let description = "";
    if (screenshots.length > 0) {
      description = screenshots.slice(0, 3).map((img) => {
        return `[img]${img}[/img]`;
      }).join("");
    }
    if (mediaInfo) {
      description += `

[hide=MediaInfo]${mediaInfo}[/hide]`;
    }
    return description;
  }
  function fillMedia(info) {
    const { videoType, resolution } = info;
    let value;
    if (videoType.match(/bluray/i)) {
      value = "BDMV";
    } else if (videoType === "DVD") {
      value = "DVD-R";
    } else if (parseInt(resolution, 10) < 720) {
      value = "SD";
    } else {
      value = resolution;
    }
    jQuery("#media").val(value);
  }
  async function fillIMDb(imdbUrl) {
    var _a3, _b2, _c, _d;
    if (imdbUrl) {
      const imdbData = await getIMDBData(imdbUrl);
      if (imdbData && ((_a3 = imdbData == null ? void 0 : imdbData.details) == null ? void 0 : _a3.country)) {
        jQuery("#country").val(imdbData.details.country);
      }
      const akaName = imdbData && ((_b2 = imdbData == null ? void 0 : imdbData.details) == null ? void 0 : _b2["Also known as"]);
      const originalName = (_c = imdbData == null ? void 0 : imdbData.name) != null ? _c : "";
      if (akaName && akaName !== originalName) {
        jQuery("#alternate_title").val(imdbData.details["Also known as"]);
        jQuery("#title").val(originalName);
      }
      if (imdbData && imdbData.poster) {
        let poster;
        const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key");
        if (ptpImgApiKey) {
          poster = await uploadToPtpImg([imdbData.poster]);
        } else {
          const gifyuHtml = await fetch("https://gifyu.com", {
            responseType: void 0
          });
          const authToken = (_d = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)) == null ? void 0 : _d[1];
          const data = await transferImgs(imdbData.poster, authToken, "https://gifyu.com/json");
          poster = data.url;
        }
        jQuery("#image").val(poster);
      }
    }
  }

  // src/target/kg.ts
  init_preact_shim();
  var kg_default = async (info) => {
    const { imdbUrl, screenshots, mediaInfo, resolution, source, videoType } = info;
    const siteInfo = PT_SITE.KG;
    if (imdbUrl) {
      jQuery('input[type="submit"][value="next >>"]').hide().after("<p>loading...</p>");
      jQuery('input[name="title"]').val(imdbUrl);
      const formData = new FormData();
      formData.append("upstep", "2");
      formData.append("type", "1");
      formData.append("title", imdbUrl);
      const doc = await fetch(`${PT_SITE.KG.url}/upload.php`, {
        method: "POST",
        responseType: void 0,
        data: formData
      });
      const uploadPage = new DOMParser().parseFromString(doc, "text/html");
      jQuery("#upside+div").html(jQuery("#upside+div", uploadPage).html());
      const imdbData = await getIMDBData(imdbUrl);
      if (imdbData) {
        const { country, Languages: languages } = imdbData.details;
        jQuery('input[name="lang"]').val(languages);
        let { description, genre, poster = "" } = imdbData;
        const genreMap = siteInfo.genres.map;
        const countryMap = siteInfo.country.map;
        let countryValue = "";
        if (country) {
          countryValue = country.split(",")[0];
          if (countryValue === "United States") {
            countryValue = "USA";
          } else if (countryValue === "United Kingdom") {
            countryValue = "UK";
          }
        }
        if (!poster) {
          poster = info.poster || "";
        }
        jQuery('select[name="country_id"]').val(countryMap[countryValue]);
        const descriptionBBCode = `[img]${poster}[/img]
      
Synopsis:
[quote]${description}[/quote]
      

${screenshots.map((img) => `[img]${encodeURI(img)}[/img]`).join("")}`;
        jQuery("#bbcodetextarea").html(descriptionBBCode);
        const [mainGenre, otherGenre = ""] = genre;
        jQuery('select[name="genre_main_id"]').val(genreMap[mainGenre]);
        jQuery('select[name="subgenre"]').val(genreMap[otherGenre]);
      }
      jQuery(siteInfo.source.selector).val(siteInfo.source.map[source]);
      if (!videoType.match("bluray")) {
        jQuery(siteInfo.resolution.selector).val(siteInfo.resolution.map[resolution]);
      } else {
        jQuery(siteInfo.resolution.selector).val("3");
      }
      const isBluray = videoType.match(/bluray/i);
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { subtitles = [] } = getInfoFunc(mediaInfo);
      if (subtitles.length) {
        jQuery('input[name="subs"]').val(subtitles.join(","));
      }
      if (videoType === "dvd") {
        jQuery('input[name="dvdr"]').attr("checked", "true");
      }
      const specs = videoType === "dvd" ? buildDvdSpecs(info) : mediaInfo;
      jQuery("#ripspecs").val(specs);
    }
  };
  function buildDvdSpecs(info) {
    var _a3, _b2, _c, _d, _e, _f, _g, _h, _i;
    const { mediaInfo, size, audioCodec } = info;
    const scanType = mediaInfo.includes("NTSC") ? "NTSC" : "PAL";
    const dvdType = getBDType(size);
    const audioChannelNumber = ((_a3 = mediaInfo.match(/Channel\(s\)\s+:\s+(\d)/)) == null ? void 0 : _a3[1]) || "2";
    const audioName = `${audioCodec == null ? void 0 : audioCodec.toUpperCase()} ${audioChannelNumber === "6" ? "5.1" : `${audioChannelNumber}.0`}`;
    const IFOMediaInfo = ((_b2 = info.mediaInfos) == null ? void 0 : _b2.find((info2) => info2.includes(".IFO"))) || info.mediaInfo;
    const runtime = (_e = (_d = (_c = IFOMediaInfo.match(/Duration\s*?:([^\n]+)/)) == null ? void 0 : _c[1]) == null ? void 0 : _d.replace(/\s/g, "")) != null ? _e : "";
    const hour = (_g = (_f = runtime.match(/(\d)+h/)) == null ? void 0 : _f[1]) != null ? _g : "00";
    const minute = (_i = (_h = runtime.match(/(\d+)(mn|min)/)) == null ? void 0 : _h[1]) != null ? _i : "";
    return `DVD Label:
DVD Format: ${dvdType} ${scanType}
DVD Audio: ${audioName}
Program(s): Unknown
Menus: Untouched
Video: Untouched
Audio: Untouched
DVD extras: Untouched
Extras contain: 
DVD runtime(s): ${+hour < 10 ? `0${hour}` : hour}:${minute}`;
  }

  // src/target/bhd.ts
  init_preact_shim();
  var currentSiteInfo3 = PT_SITE.BeyondHD;
  var bhd_default = (info) => {
    let title = info.title;
    if (info.videoType === "dvd") {
      title = buildDVDTitle(info);
    }
    jQuery(currentSiteInfo3.name.selector).val(title);
    fillSpecs(info);
    fillTMDBId(info);
    fillMediaInfo2(info);
    selectTag(info);
    fillDescription2(info);
    jQuery(currentSiteInfo3.anonymous.selector).attr("checked", "true");
    if (info.videoType === "tvPack") {
      jQuery('input[name="pack"]').attr("checked", "true");
    }
    jQuery("#torrent").on("change", () => {
      let title2 = info.title;
      if (info.videoType === "dvd") {
        title2 = buildDVDTitle(info);
      }
      jQuery(currentSiteInfo3.name.selector).val(title2);
      const categoryMap = currentSiteInfo3.category.map;
      const categoryValueArr = categoryMap[info.category];
      const keyArray = ["resolution"];
      let finalSelectArray = [];
      if (Array.isArray(categoryValueArr)) {
        finalSelectArray = [...categoryValueArr];
        keyArray.forEach((key) => {
          finalSelectArray = matchSelectForm(currentSiteInfo3, info, key, finalSelectArray);
          console.log(finalSelectArray);
          if (finalSelectArray.length === 1) {
            jQuery(currentSiteInfo3.category.selector).val(finalSelectArray[0]);
          }
        });
      } else {
        [...keyArray, "category"].forEach((key) => {
          matchSelectForm(currentSiteInfo3, info, key, finalSelectArray);
        });
      }
    });
  };
  function fillTMDBId(info) {
    const imdbId = getIMDBIdByUrl(info.imdbUrl || "");
    jQuery(currentSiteInfo3.imdb.selector).val(imdbId);
    getTMDBIdByIMDBId(imdbId).then((data) => {
      jQuery(currentSiteInfo3.tmdb.selector).val(data.id);
    });
  }
  function fillMediaInfo2(info) {
    jQuery(currentSiteInfo3.mediaInfo.selector).val(info.mediaInfo);
  }
  function fillSpecs(info) {
    const { category, videoType } = info;
    const isBluray = videoType.match(/bluray/i);
    info.category = videoType;
    info.videoType = category;
    if (isBluray || videoType === "dvd") {
      let bdType = getBDType(info.size);
      if (videoType === "uhdbluray" && bdType === "BD50") {
        bdType = "UHD50";
      }
      info.category = bdType || "";
    }
    const categoryMap = currentSiteInfo3.category.map;
    const categoryValueArr = categoryMap[info.category];
    const keyArray = ["videoType", "resolution", "source", "category"];
    let finalSelectArray = [];
    if (Array.isArray(categoryValueArr)) {
      finalSelectArray = [...categoryValueArr];
      keyArray.forEach((key) => {
        finalSelectArray = matchSelectForm(currentSiteInfo3, info, key, finalSelectArray);
        if (finalSelectArray.length === 1) {
          jQuery(currentSiteInfo3.category.selector).val(finalSelectArray[0]);
        }
      });
    } else {
      [...keyArray, "category"].forEach((key) => {
        matchSelectForm(currentSiteInfo3, info, key, finalSelectArray);
      });
    }
  }
  function selectTag(info) {
    const editionTags = Object.keys(info.tags).map((tag) => info.tags[tag] && currentSiteInfo3.targetInfo.editionTags[tag]).filter(Boolean);
    const editionOption = Array.from(jQuery('select[name="edition"] option')).map((opt) => jQuery(opt).attr("value"));
    if (editionTags.length > 0) {
      for (const tag of editionTags) {
        setTimeout(() => {
          var _a3;
          (_a3 = document.querySelector(`.bhd-tag #${tag}`)) == null ? void 0 : _a3.dispatchEvent(new Event("click"));
        }, 0);
        if (editionOption.includes(tag)) {
          jQuery('select[name="edition"]').val(tag);
        }
      }
    }
  }
  function fillDescription2(info) {
    let description = info.description;
    if (info.sourceSite === "PTP") {
      description = buildPTPDescription(info);
    } else if (info.sourceSite.match(/BeyondHD|UHDBits/)) {
      description = info.originalDescription || "";
    } else {
      description = buildDescription3(info);
    }
    if (info.screenshots.length > 0) {
      info.screenshots.forEach((img) => {
        const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](
*)?`);
        if (description.match(regStr)) {
          description = description.replace(regStr, (p1, p22) => {
            return `[url=${p22}][img=350x350]${p22}[/img][/url]`;
          });
        }
      });
    }
    jQuery(currentSiteInfo3.description.selector).val(description);
    jQuery(currentSiteInfo3.description.selector)[0].dispatchEvent(new Event("input"));
  }
  function buildDescription3(info) {
    let description = info.description;
    const { sourceSiteType } = info;
    if (isChineseTacker(sourceSiteType)) {
      description = filterNexusDescription(info);
    }
    description = description.replace(`[quote]${info.mediaInfo}[/quote]`, "").replace(/\[url.*\[\/url\]/g, "").replace(/\[img.*\[\/img\]/g, "");
    const { comparisons, screenshots } = info;
    if (comparisons && comparisons.length > 0) {
      for (const comparison of comparisons) {
        description += `
${comparison.reason}[comparison=${comparison.title}]
${comparison.imgs.join("\n")}
[/comparison]

`;
      }
    }
    if (screenshots.length > 0) {
      description += `${screenshots.map((v3) => `[img]${v3}[/img]`).join("\n")}

`;
    }
    return description.trim();
  }
  function buildDVDTitle(info) {
    var _a3;
    const { movieName, movieAkaName, year, mediaInfo, size, audioCodec } = info;
    const scanType = mediaInfo.includes("NTSC") ? "NTSC" : "PAL";
    const dvdType = getBDType(size);
    const audioChannelNumber = ((_a3 = mediaInfo.match(/Channel\(s\)\s+:\s+(\d)/)) == null ? void 0 : _a3[1]) || "2";
    const audio = audioCodec === "ac3" ? "dd" : audioCodec;
    const audioName = `${audio == null ? void 0 : audio.toUpperCase()}${audioChannelNumber === "6" ? "5.1" : `${audioChannelNumber}.0`}`;
    const akaName = movieAkaName ? ` AKA ${movieAkaName} ` : " ";
    return `${movieName}${akaName}${year} ${scanType} ${dvdType} ${audioName}`;
  }

  // src/target/bdc.ts
  init_preact_shim();
  var currentSiteInfo4 = PT_SITE.Bdc;
  var bdc_default = async (info) => {
    jQuery(currentSiteInfo4.name.selector).val(info.title);
    jQuery(currentSiteInfo4.imdb.selector).val(info.imdbUrl || "");
    jQuery(currentSiteInfo4.anonymous.selector).attr("checked", "true");
    fillCategory(info);
    fillDescription3(info);
  };
  function fillCategory(info) {
    const { resolution, videoType, category } = info;
    const teamName = getTeamName(info);
    let categoryValue = "";
    if (teamName === "PTer") {
      categoryValue = "40";
    } else if (videoType.match(/bluray/)) {
      categoryValue = "31";
    } else if (category.match(/tv/)) {
      categoryValue = "19";
    } else {
      categoryValue = `${currentSiteInfo4.resolution.map[resolution][videoType]}`;
    }
    jQuery('select[name="category"]').val(categoryValue);
  }
  async function fillDescription3(info) {
    var _a3, _b2, _c;
    jQuery(currentSiteInfo4.description.selector).val($t("\u6570\u636E\u52A0\u8F7D\u4E2D..."));
    let template = `
  [align=center][color=#FF0000][size=large][font=Trebuchet MS][b]${info.title}[/b][/font][/size][/color]
  
  [URL=$originalPoster$][IMG]$poster$[/IMG][/URL]
  
  
  [img]https://images.broadcity.eu/images/82619845736635909964.png[/img]
  [size=medium]$synopsis$[/size]
  
  [img]https://images.broadcity.eu/images/87704049718067240949.png[/img]
  
  [php]${info.mediaInfo}[/php][/align]
  
  [align=center][img]https://images.broadcity.eu/images/11622644009097018297.png[/img] 
  $screenshots$
  [/align]
  [align=center][img]https://images.broadcity.eu/images/54926797285164478472.png[/img]
  [youtube]$youtubeUrl$[/youtube]
  [/align]
  [align=center][img]https://images.broadcity.eu/images/44846549843542759058.png[/img]
  [/align]
  `;
    const { imdbUrl, screenshots } = info;
    const screenshotsBBCode = getScreenshotsBBCode(screenshots);
    template = template.replace("$screenshots$", screenshotsBBCode.join("\n"));
    try {
      const replaceParams = {
        synopsis: "",
        youtubeUrl: "",
        poster: "",
        originalPoster: ""
      };
      const imdbId = getIMDBIdByUrl(imdbUrl);
      const { id: tmdbId, overview, poster_path: posterPath } = await getTMDBIdByIMDBId(imdbId);
      if (tmdbId) {
        const poster = `https://image.tmdb.org/t/p/w500${posterPath}`;
        const originalPoster = `https://image.tmdb.org/t/p/original${posterPath}`;
        replaceParams.poster = poster;
        replaceParams.synopsis = overview;
        replaceParams.originalPoster = originalPoster;
        jQuery('input[name="t_image_url"]').val(poster);
        const videos = await getTMDBVideos(tmdbId);
        const youtubeId = (_c = (_b2 = (_a3 = videos.filter((video) => video.site === "YouTube")) == null ? void 0 : _a3[0]) == null ? void 0 : _b2.key) != null ? _c : "";
        if (youtubeId.length > 0) {
          replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
        }
        Object.keys(replaceParams).forEach((key) => {
          template = template.replace(`$${key}$`, replaceParams[key] || "");
        });
        setTimeout(() => {
          tinymce.activeEditor.setContent(template);
        }, 0);
      }
    } catch (error) {
      jQuery(currentSiteInfo4.description.selector).val(error.message);
    }
  }

  // src/target/zhuque.ts
  init_preact_shim();
  var currentSiteInfo5 = PT_SITE.ZHUQUE;
  var zhuque_default = (info) => {
    const targetNode = document;
    const imdbId = getIMDBIdByUrl(info.imdbUrl || "");
    const insert = new MutationObserver((mutationRecords) => {
      jQuery("input.ant-select-selection-search-input[id]").each(function() {
        this.dispatchEvent(new Event("keydown"));
      });
      jQuery(currentSiteInfo5.name.selector).val(info.title);
      jQuery(currentSiteInfo5.name.selector)[0].dispatchEvent(new Event("input"));
      jQuery(currentSiteInfo5.imdb.selector).val(imdbId);
      jQuery(currentSiteInfo5.imdb.selector)[0].dispatchEvent(new Event("input"));
      if (info.subtitle) {
        jQuery(currentSiteInfo5.subtitle.selector).val(info.subtitle);
        jQuery(currentSiteInfo5.subtitle.selector)[0].dispatchEvent(new Event("input"));
      }
      let screenshotStr = "";
      if (info.screenshots.length > 0) {
        info.screenshots.forEach((img) => {
          screenshotStr += `${img}
`;
        });
      }
      jQuery(currentSiteInfo5.screenshots.selector).val(screenshotStr);
      jQuery(currentSiteInfo5.screenshots.selector)[0].dispatchEvent(new Event("input"));
      fillMediaInfo3(info);
      fillDescription4(info);
      const selectNodeParent = document.querySelector("form");
      const select = new MutationObserver(async (mutationRecords2) => {
        var _a3;
        const { category: categoryConfig } = currentSiteInfo5;
        jQuery(`div.ant-select-item-option-content:contains(${categoryConfig.map[info.category]})`).click();
        const keyArray = ["videoType", "videoCodec", "audioCodec"];
        select.disconnect();
        const sleep = (ms) => {
          return new Promise((resolve) => setTimeout(resolve, ms));
        };
        const { tags } = currentSiteInfo5;
        for (const tag in info.tags) {
          if (tags[tag]) {
            await sleep(100).then((v3) => jQuery(tags[tag])[0].click());
          }
        }
        keyArray.forEach((key) => {
          const { map } = currentSiteInfo5[key];
          if (map) {
            const mapValue = map[info[key]];
            if (mapValue) {
              if (key !== "videoType" && jQuery(`div.ant-select-item-option-content:contains(${mapValue})`).length > 0) {
                jQuery(`div.ant-select-item-option-content:contains(${mapValue})`)[0].click();
              } else if (mapValue === "Blu-ray") {
                jQuery(`div.ant-select-item-option-content:contains(${mapValue})`)[2].click();
              } else if (jQuery(`div.ant-select-item-option-content:contains(${mapValue})`).length > 0) {
                jQuery(`div.ant-select-item-option-content:contains(${mapValue})`)[0].click();
              }
            }
          }
        });
        if (info.resolution !== "")
          (_a3 = jQuery(`div.ant-select-item-option-content:contains(${info.resolution})`)[0]) == null ? void 0 : _a3.click();
      });
      if (selectNodeParent) {
        select.observe(selectNodeParent, { attributes: false, childList: true, subtree: true, characterDataOldValue: false });
      }
      insert.disconnect();
    });
    insert.observe(targetNode, { attributes: false, childList: false, subtree: true, characterDataOldValue: false });
  };
  function fillMediaInfo3(info) {
    jQuery(currentSiteInfo5.mediaInfo.selector).val(info.mediaInfo);
    jQuery(currentSiteInfo5.mediaInfo.selector)[0].dispatchEvent(new Event("input"));
  }
  function fillDescription4(info) {
    let description = info.description.replace(`[quote]${info.mediaInfo}[/quote]`, "").trim();
    if (info.mediaInfos && info.mediaInfos[1]) {
      info.mediaInfos.forEach((mediaInfo) => {
        description = description.replace(`[quote]${mediaInfo}[/quote]`, "");
      });
    }
    if (info.sourceSite === "PTP") {
      description = buildPTPDescription(info);
      description = description.replace(/\[comparison[^[]*\[\/comparison\]/gi, "");
    } else if (info.sourceSite.match(/BeyondHD|UHDBits/)) {
      description = info.originalDescription || "";
    }
    description = description.replace(/\[url.*\[\/url\]/g, "").replace(/\[img.*\[\/img\]/g, "").replace(/\[\/?(i|b|center|quote|size|color)\]/g, "").replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, "").replace(/\n\n*/g, "\n");
    description = description.replace(/Screen(shot)?s:(\s*)\n?/gi, "").trim();
    if (info.sourceSite === "KEEPFRDS") {
      description = description.replace(/截图对比:[^\n]*\n?/gi, "");
    }
    if (description !== "")
      description = `\`\`\`
${description}
\`\`\``;
    if (info.comparisons && info.comparisons[0]) {
      for (const comparison in info.comparisons) {
        description += `
\u5BF9\u6BD4\u56FE ${info.comparisons[comparison].title}

`;
        for (const img in info.comparisons[comparison].imgs) {
          description += `${info.comparisons[comparison].imgs[img]}

`;
        }
      }
    }
    const thanksQuoteClosed = GM_getValue("easy-seed.thanks-quote-closed") || "";
    if (!thanksQuoteClosed && info.sourceSite !== void 0) {
      description = `\`\`\`
\u8F6C\u81EA ${info.sourceSite} \uFF0C\u611F\u8C22\u539F\u53D1\u5E03\u8005\uFF01
\`\`\`
${description}`;
    }
    jQuery(currentSiteInfo5.description.selector).val(description);
    jQuery(currentSiteInfo5.description.selector)[0].dispatchEvent(new Event("input"));
  }

  // src/target/autofill.ts
  init_preact_shim();
  async function autoFillDoubanInfo(selfDom, info) {
    try {
      jQuery(selfDom).text($t("\u83B7\u53D6\u4E2D..."));
      const {
        imdbUrl,
        movieName,
        doubanUrl,
        description: descriptionData,
        title: torrentTitle
      } = info;
      if (!imdbUrl && !doubanUrl) {
        throw new Error($t("\u8BF7\u586B\u5199\u6B63\u786E\u94FE\u63A5"));
      }
      let doubanLink = "";
      if (doubanUrl && doubanUrl.match(/movie\.douban\.com/)) {
        doubanLink = doubanUrl;
      } else {
        const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
        if (doubanData) {
          let { id, season = "" } = doubanData;
          const tvData = await getTvSeasonData(doubanData);
          if (season && tvData) {
            id = tvData && tvData.id;
          }
          doubanLink = `https://movie.douban.com/subject/${id}`;
        }
      }
      if (doubanLink) {
        const {
          douban,
          imdb,
          subtitle,
          description,
          name
        } = CURRENT_SITE_INFO;
        if (CURRENT_SITE_NAME === "SSD") {
          jQuery(imdb.selector).val(doubanLink);
        } else {
          jQuery(douban == null ? void 0 : douban.selector).val(doubanLink);
        }
        if (!(descriptionData == null ? void 0 : descriptionData.match(/(片|译)\s*名/))) {
          const movieData = await getDoubanInfo(doubanLink);
          if (movieData) {
            Notification_default2.open({
              message: $t("\u6210\u529F"),
              description: $t("\u83B7\u53D6\u6210\u529F")
            });
            const imdbLink = movieData.imdbLink;
            if (jQuery(imdb.selector).val() !== imdbLink && CURRENT_SITE_NAME !== "SSD") {
              jQuery(imdb.selector).val(imdbLink);
            }
            const torrentSubtitle = getSubTitle(movieData);
            if (CURRENT_SITE_NAME === "TTG") {
              jQuery(name.selector).val(`${torrentTitle || ""}[${torrentSubtitle}]`);
            } else {
              jQuery(subtitle.selector).val(torrentSubtitle);
            }
            if (CURRENT_SITE_NAME !== "SSD") {
              jQuery(description.selector).val(`${movieData.format}
${jQuery(description.selector).val()}`);
            }
          }
        } else {
          Notification_default2.open({
            message: $t("\u6210\u529F"),
            description: $t("\u83B7\u53D6\u6210\u529F")
          });
        }
      }
    } catch (error) {
      Notification_default2.open({
        message: $t("\u9519\u8BEF"),
        description: error.message
      });
    } finally {
      jQuery(selfDom).text($t("\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB"));
    }
  }
  var autofill_default = (info) => {
    if (info.doubanInfo) {
      return;
    }
    if (CURRENT_SITE_INFO.siteType.match(/NexusPHP|TTG/)) {
      const { imdb, douban } = CURRENT_SITE_INFO;
      let selector = jQuery("");
      if (douban && (douban.selector && jQuery(douban.selector)) && jQuery(douban.selector).val()) {
        selector = jQuery(douban.selector);
      } else if (imdb) {
        selector = jQuery(imdb.selector);
      }
      if (selector) {
        selector.after(`<span id="auto-fill-douban">${$t("\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB")}</span>`);
      }
      jQuery("#auto-fill-douban").on("click", (e3) => {
        const url = selector.val();
        if (url.match(/subject\/(\d+)/)) {
          info.doubanUrl = url;
        } else if (url.match(/imdb\.com\/title\/tt\d+/)) {
          info.imdbUrl = url;
        }
        autoFillDoubanInfo(jQuery("#auto-fill-douban"), info);
      });
    }
  };

  // src/target/index.ts
  var siteHandlers = {
    PTP: ptp_default,
    GPW: gpw_default,
    NPUBits: npubits_default,
    BYR: byr_default,
    SC: sc_default,
    KG: kg_default,
    BeyondHD: bhd_default,
    Bdc: bdc_default,
    ZHUQUE: zhuque_default
  };
  var fillTargetForm = (info) => {
    var _a3;
    autofill_default(info || {});
    if (!info) {
      return;
    }
    console.log(info);
    const handler = siteHandlers[CURRENT_SITE_NAME];
    if (handler) {
      handler(info);
    }
    const targetTorrentInfo = __spreadValues({}, info);
    const isBluray = !!((_a3 = info == null ? void 0 : info.videoType) == null ? void 0 : _a3.match(/bluray/i));
    targetTorrentInfo.isBluray = isBluray;
    const targetHelper = new ExportHelper(targetTorrentInfo);
    targetHelper.prepareToFillInfo();
    targetHelper.torrentTitleHandler();
    targetHelper.imdbHandler();
    targetHelper.descriptionHandler();
    targetHelper.disableTorrentChange();
    targetHelper.fillBasicAttributes();
    targetHelper.categoryHandler();
    targetHelper.fillRemainingInfo();
    targetHelper.dealWithMoreSites();
  };

  // src/source/index.ts
  init_preact_shim();

  // src/source/ptp.ts
  init_preact_shim();
  var ptp_default2 = async () => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h;
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const torrentDom = jQuery(`#torrent_${torrentId}`);
    const ptpMovieTitle = (_d = (_c = (_b2 = (_a3 = jQuery(".page__title").text()) == null ? void 0 : _a3.match(/]?([^[]+)/)) == null ? void 0 : _b2[1]) == null ? void 0 : _c.trim()) != null ? _d : "";
    const [movieName, movieAkaName = ""] = ptpMovieTitle.split(" AKA ");
    const mediaInfoArray = [];
    torrentDom.find(".mediainfo.mediainfo--in-release-description").next("blockquote").each(function() {
      const textContent = jQuery(this).text();
      if (textContent.match(/(Codec\s*ID)|mpls|(Stream\s*size)|Video/i)) {
        mediaInfoArray.push(textContent);
      }
    });
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.movieAkaName = movieAkaName;
    TORRENT_INFO.imdbUrl = (_f = (_e = jQuery("#imdb-title-link")) == null ? void 0 : _e.attr("href")) != null ? _f : "";
    TORRENT_INFO.year = (_h = (_g = jQuery(".page__title").text().match(/\[(\d+)\]/)) == null ? void 0 : _g[1]) != null ? _h : "";
    const torrentHeaderDom = jQuery(`#group_torrent_header_${torrentId}`);
    TORRENT_INFO.category = getPTPType();
    const screenshots = getPTPImage();
    getDescription2(torrentId).then((res) => {
      var _a4, _b3, _c2;
      const releaseName = torrentHeaderDom.data("releasename");
      const releaseGroup = getReleaseGroup(releaseName);
      const descriptionData = formatDescriptionData(res, screenshots, mediaInfoArray);
      TORRENT_INFO.description = descriptionData;
      const infoArray = torrentHeaderDom.find("#PermaLinkedTorrentToggler").text().trim().split(" / ");
      const [codes, container, source, resolution, ...otherInfo] = infoArray;
      const isRemux = otherInfo.includes("Remux");
      const { knownTags, otherTags } = getTags(otherInfo, [releaseGroup]);
      TORRENT_INFO.videoType = source === "WEB" ? "web" : getVideoType(container, isRemux, codes, source);
      const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
      TORRENT_INFO.tags = __spreadValues({}, knownTags);
      TORRENT_INFO.otherTags = otherTags;
      TORRENT_INFO.resolution = resolution;
      const mediaInfoOrBDInfo = mediaInfoArray.filter((media) => {
        return TORRENT_INFO.videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
      });
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo.join("\n\n").trim();
      TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo.map((v3) => v3.trim());
      const infoFromMediaInfoinfo = getInfoFromMediaInfo(TORRENT_INFO.mediaInfo);
      if (infoFromMediaInfoinfo.subtitles) {
        for (let i3 = 0; i3 < ((_a4 = infoFromMediaInfoinfo.subtitles) == null ? void 0 : _a4.length); i3++) {
          if (/Chinese|Traditional|Simplified|Cantonese|Mandarin/i.test(infoFromMediaInfoinfo.subtitles[i3])) {
            TORRENT_INFO.tags.chinese_subtitle = true;
            break;
          }
        }
      }
      const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo.join("\n\n"));
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.tags = __spreadValues(__spreadValues({}, TORRENT_INFO.tags), mediaTags);
      const torrentName = formatTorrentTitle(releaseName);
      TORRENT_INFO.title = torrentName;
      TORRENT_INFO.source = getPTPSource(source, codes, resolution);
      const size = (_c2 = (_b3 = torrentHeaderDom.find(".nobr span").attr("title")) == null ? void 0 : _b3.replace(/[^\d]/g, "")) != null ? _c2 : "";
      TORRENT_INFO.size = parseFloat(size);
      TORRENT_INFO.screenshots = screenshots;
      TORRENT_INFO.poster = jQuery(".sidebar-cover-image").attr("src") || "";
      console.log(TORRENT_INFO);
    });
    let country = [];
    const matchArray = jQuery("#movieinfo div").text().match(/Country:\s+([^\n]+)/);
    if (matchArray && matchArray.length > 0) {
      country = matchArray == null ? void 0 : matchArray[1].replace(/(,)\s+/g, "$1").split(",");
    }
    TORRENT_INFO.area = getAreaCode(country == null ? void 0 : country[0]);
    const trumpReason = jQuery(`#trumpable_${torrentId} span`).text() || "";
    TORRENT_INFO.hardcodedSub = trumpReason.includes("Hardcoded Subtitles");
    return TORRENT_INFO;
  };
  var getPTPType = () => {
    const typeMap = {
      "Feature Film": "movie",
      "Short Film": "movie",
      "Stand-up Comedy": "other",
      Miniseries: "tvPack",
      "Live Performance": "concert",
      "Movie Collection": "movie"
    };
    const ptpType = jQuery("#torrent-table .basic-movie-list__torrent-edition__main").eq(0).text();
    return typeMap[ptpType];
  };
  var getPTPImage = () => {
    var _a3;
    const imgList = [];
    const torrentInfoPanel = jQuery(".movie-page__torrent__panel");
    const imageDom = torrentInfoPanel.find(".bbcode__image");
    for (let i3 = 0; i3 < imageDom.length; i3++) {
      const parent = imageDom[i3].parentElement;
      if ((parent == null ? void 0 : parent.tagName) === "A" && ((_a3 = parent == null ? void 0 : parent.getAttribute("href")) == null ? void 0 : _a3.match(/\.png$/))) {
        imgList.push(parent.getAttribute("href") || "");
      } else {
        const imgDom = imageDom[i3];
        const imgSrc = imgDom.getAttribute("src") || imgDom.getAttribute("alt");
        imgList.push(imgSrc || "");
      }
    }
    return imgList;
  };
  var getPTPSource = (source, codes, resolution) => {
    if (codes.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
      return "uhdbluray";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  var getVideoType = (container, isRemux, codes, source) => {
    let type = "";
    if (isRemux) {
      type = "remux";
    } else if (codes.match(/BD50|BD25/ig)) {
      type = "bluray";
    } else if (codes.match(/BD66|BD100/ig)) {
      type = "uhdbluray";
    } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
      type = "dvdrip";
    } else if (codes.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
      type = "dvd";
    } else if (container.match(/MKV|MP4/i)) {
      type = "encode";
    }
    return type;
  };
  var getDescription2 = async (id) => {
    const url = `${PT_SITE.PTP.url}/torrents.php?action=get_description&id=${id}`;
    const data = await fetch(url, {
      responseType: void 0
    });
    if (data) {
      const element = document.createElement("span");
      element.innerHTML = data;
      return element.innerText || element.textContent || "";
    }
    return "";
  };
  var formatDescriptionData = (data, screenshots, mediaInfoArray) => {
    let descriptionData = data.replace(/\r\n/g, "\n");
    descriptionData = descriptionData.split("\n").map((line) => {
      return line.trim();
    }).join("\n").replace(/http:\/\/ptpimg.me/g, "https://ptpimg.me");
    TORRENT_INFO.originalDescription = descriptionData;
    screenshots.forEach((screenshot) => {
      const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, "i");
      if (!descriptionData.match(regStr)) {
        const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, "i");
        if (descriptionData.match(regOldFormat)) {
          descriptionData = descriptionData.replace(regOldFormat, `[img]${screenshot}[/img]`);
        } else {
          descriptionData = descriptionData.replace(new RegExp(`(?<!\\[img\\])${screenshot}`, "g"), `[img]${screenshot}[/img]`);
        }
      }
    });
    descriptionData = descriptionData.replace(/\[(\/)?mediainfo\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p22) => {
      const slash = p1 || "";
      return p22 ? `${p22}: [${slash}quote]` : `[${slash}quote]`;
    });
    descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, "[quote][$2]$3[/$2][/quote]");
    const comparisonArray = descriptionData.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n)+?)\[\/comparison\]/ig) || [];
    const comparisons = [];
    comparisonArray.forEach((item) => {
      var _a3, _b2, _c, _d;
      descriptionData = descriptionData.replace(item, item.replace(/\s/g, ""));
      const reason = (_b2 = (_a3 = item.match(/(\n.*\n)?\[comparison=/i)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
      const title = (_d = (_c = item.match(/\[comparison=(.*?)\]/i)) == null ? void 0 : _c[1]) != null ? _d : "";
      const comparisonImgArray = item.replace(/\[\/?comparison(=(.+?))?\]/ig, "").split(/[ \r\n]/);
      const imgs = [];
      Array.from(new Set(comparisonImgArray)).forEach((item2) => {
        const formatImg = item2.replace(/\s*/g, "");
        if (item2.match(/^https?.+/)) {
          imgs.push(formatImg);
          descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item2}`, "gi"), `[img]${formatImg}[/img]`);
        } else if (item2.match(/^\[img\]/i)) {
          imgs.push(formatImg.replace(/\[\/?img\]/g, ""));
        }
      });
      comparisons.push({
        title,
        imgs,
        reason
      });
    });
    TORRENT_INFO.comparisons = comparisons;
    descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/ig, "\n[b]$1 Comparison:[/b]\n").replace(/\[\/comparison\]/ig, "");
    mediaInfoArray.forEach((mediaInfo) => {
      const regStr = new RegExp(`\\[quote\\]\\s*?${replaceRegSymbols(mediaInfo).slice(0, 1e4)}`, "i");
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(mediaInfo, `[quote]${mediaInfo}[/quote]`);
      }
    });
    if (TORRENT_INFO.category === "concert") {
      descriptionData = `${jQuery("#synopsis").text()}
${descriptionData}`;
    }
    return descriptionData;
  };
  function getTags(rawTags, exclude = []) {
    const { editionTags } = PT_SITE.PTP.sourceInfo;
    const knownTags = {};
    const otherTags = {};
    for (const rawTag of rawTags) {
      const tag = editionTags[rawTag];
      if (tag) {
        knownTags[tag] = true;
      } else if (tag === null || exclude.includes(rawTag) || rawTag.match(/Freeleech|Halfleech|Half-Leech/i)) {
      } else {
        otherTags[rawTag] = true;
      }
    }
    return {
      knownTags,
      otherTags
    };
  }
  function getReleaseGroup(releasename) {
    var _a3, _b2;
    return (_b2 = (_a3 = releasename.match(/-(\w+?)$/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
  }

  // src/source/bhd.ts
  init_preact_shim();
  var bhd_default2 = async () => {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const basicInfo = getBasicInfo();
    const editionTags = getEditionTags(basicInfo);
    const { Category, Name, Source, Type, Size } = basicInfo;
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.title = formatTorrentTitle(Name);
    const tags = getTagsFromSubtitle(TORRENT_INFO.title);
    const TMDBYear = jQuery(".movie-heading a:last").text();
    const movieName = jQuery(".movie-heading a:first").text();
    if (!TMDBYear) {
      const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
      TORRENT_INFO.year = matchYear ? matchYear[0] : "";
    } else {
      TORRENT_INFO.year = TMDBYear;
    }
    const descriptionDom = jQuery(".panel-heading:contains(Description)").next(".panel-body").find(".forced-nfo");
    const descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    TORRENT_INFO.comparisons = getComparisonImgs();
    const { category: movieCat, countries, imdbUrl } = getMovieDetails();
    TORRENT_INFO.movieName = movieName;
    let category = Category.toLowerCase().replace(/s/, "");
    category = movieCat === "Animation" ? "cartoon" : category;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSource(Source, Type);
    TORRENT_INFO.area = getAreaCode(countries);
    TORRENT_INFO.videoType = getVideoType2(Source, Type);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const mediaInfo = jQuery("#stats-full code").text();
    TORRENT_INFO.mediaInfo = mediaInfo;
    TORRENT_INFO.mediaInfos = [mediaInfo];
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
    TORRENT_INFO.originalDescription = `${descriptionBBCode}`;
    TORRENT_INFO.description = `
[quote]${mediaInfo}[/quote]
${descriptionBBCode}`;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, resolution = "", mediaTags } = getInfoFunc(mediaInfo);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = __spreadValues(__spreadValues(__spreadValues({}, tags), mediaTags), editionTags.knownTags);
    TORRENT_INFO.otherTags = editionTags.otherTags;
    TORRENT_INFO.imdbUrl = imdbUrl;
  };
  var getBasicInfo = () => {
    const basicInfo = {
      Category: "",
      Name: "",
      Source: "",
      Type: "",
      Size: "",
      Video: "",
      Audio: "",
      Hybrid: "",
      Edition: "",
      Region: "",
      Extras: ""
    };
    jQuery(".dotborder").each((index, element) => {
      const key = jQuery(element).find("td:first").text();
      const value = jQuery(element).find("td:last").text();
      basicInfo[key] = value.replace(/\n/g, "").trim();
    });
    console.log(basicInfo);
    return basicInfo;
  };
  var getMovieDetails = () => {
    const infoList = jQuery(".movie-details a");
    const movieDetail = {
      category: "",
      countries: "",
      imdbUrl: ""
    };
    movieDetail.imdbUrl = jQuery('span.badge-meta[title*="IMDb"] > a').attr("href") || "";
    infoList.each((index, element) => {
      var _a3, _b2;
      const urlParams = (_b2 = (_a3 = jQuery(element).attr("href")) == null ? void 0 : _a3.replace(/.+\//g, "").split("=")) != null ? _b2 : "";
      if (urlParams.length > 1) {
        let key = decodeURI(urlParams[0]);
        const value = urlParams[1];
        if (key === "g[]") {
          key = "category";
        }
        movieDetail[key] = value;
      }
    });
    return movieDetail;
  };
  var getSource = (source, resolution) => {
    if (resolution.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/UHD/i)) {
      return "uhdbluray";
    }
    if (source.match(/WEB|WEB-DL/i)) {
      return "web";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  var getVideoType2 = (source, type) => {
    type = type.replace(/\s/g, "");
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/BD50|BD25/i)) {
      return "bluray";
    } else if (type.match(/UHD50|UHD66|UHD100/i)) {
      return "uhdbluray";
    } else if (type.match(/DVD5|DVD9/i)) {
      return "dvd";
    } else if (source.match(/WEB|WEB-DL/i)) {
      return "web";
    } else if (type.match(/\d{3,4}p/i)) {
      return "encode";
    }
    return type;
  };
  var getEditionTags = (basicInfo) => {
    const editionTags = PT_SITE.BeyondHD.sourceInfo.editionTags;
    const knownTags = {};
    const otherTags = {
      Hybrid: false
    };
    const { Video, Audio, Edition, Extras, Hybrid } = basicInfo;
    const text = [Video, Audio, Edition, Extras].filter((v3) => Boolean(v3)).join(" / ");
    const mediaTags = Object.entries(editionTags);
    for (const [source, target] of mediaTags) {
      if (text.includes(source)) {
        knownTags[target] = true;
      }
    }
    if (Hybrid) {
      otherTags.Hybrid = true;
    }
    if (knownTags.hdr10_plus && knownTags.hdr) {
      delete knownTags.hdr;
    }
    return {
      knownTags,
      otherTags
    };
  };
  function getComparisonImgs() {
    var _a3, _b2;
    const title = (_b2 = (_a3 = jQuery("#screenMain .screenParent").text()) == null ? void 0 : _a3.replace(/\[Show\]|Comparison/g, "")) == null ? void 0 : _b2.trim();
    const imgs = Array.from(jQuery(".screenComparison img")).map((img) => {
      var _a4, _b3;
      return (_b3 = (_a4 = jQuery(img)) == null ? void 0 : _a4.attr("src")) != null ? _b3 : "";
    });
    if (title !== "") {
      return [
        {
          title,
          imgs,
          reason: ""
        }
      ];
    }
  }

  // src/source/hdb.ts
  init_preact_shim();
  var hdb_default = async () => {
    var _a3, _b2;
    const torrentId = getUrlParam("id");
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const editDom = jQuery("#details tr").has("a:contains(Edit torrent)");
    const descriptionDom = editDom.length > 0 ? editDom.prev() : jQuery("#details >tbody >tr:contains(tags) + tr");
    let descriptionBBCode = getFilterBBCode(descriptionDom.find(">td")[0]);
    descriptionBBCode = (_b2 = (_a3 = descriptionBBCode.match(/\[quote\]((.|\n)+)\[\/quote\]/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
    TORRENT_INFO.description = descriptionBBCode;
    const { size, category, videoType } = getBasicInfo2();
    const title = jQuery("h1").eq(0).text();
    TORRENT_INFO.title = formatTorrentTitle(title);
    const tags = getTagsFromSubtitle(title);
    const isMovieType = jQuery(".contentlayout h1").length > 0;
    const IMDBLinkDom = isMovieType ? jQuery(".contentlayout h1") : jQuery("#details .showlinks li").eq(1);
    if (isMovieType) {
      const IMDBYear = IMDBLinkDom.prop("lastChild").nodeValue.replace(/\s|\(|\)/g, "");
      const movieName = IMDBLinkDom.find("a").text();
      TORRENT_INFO.movieName = movieName;
      if (!IMDBYear) {
        const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
        TORRENT_INFO.year = matchYear ? matchYear[0] : "";
      } else {
        TORRENT_INFO.year = IMDBYear;
      }
    }
    TORRENT_INFO.imdbUrl = IMDBLinkDom.find("a").attr("href") || "";
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.videoType = videoType;
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { bdinfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    if (!isBluray) {
      getMediaInfo(torrentId).then((data) => {
        if (data) {
          TORRENT_INFO.mediaInfo = data;
          descriptionBBCode += `
[quote]${data}[/quote]`;
          TORRENT_INFO.description = descriptionBBCode;
          const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(TORRENT_INFO.mediaInfo);
          TORRENT_INFO.videoCodec = videoCodec;
          TORRENT_INFO.audioCodec = audioCodec;
          TORRENT_INFO.resolution = resolution || "";
          TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), mediaTags);
        }
      });
    } else {
      TORRENT_INFO.mediaInfo = bdinfo;
      const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(bdinfo || descriptionBBCode);
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.resolution = resolution || "";
      TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), mediaTags);
    }
    TORRENT_INFO.size = size;
    TORRENT_INFO.screenshots = await getImages(descriptionBBCode);
  };
  var getBasicInfo2 = () => {
    const videoTypeMap = {
      "Blu-ray/HD DVD": "bluray",
      Capture: "hdtv",
      Encode: "encode",
      Remux: "remux",
      "WEB-DL": "web"
    };
    const info = jQuery("th:contains(Category)").next().text();
    const size = jQuery("th:contains(Size)").eq(0).next().text();
    const splitArray = info.split("(");
    const category = splitArray[0].trim().toLowerCase();
    const videoCodec = splitArray[1].split(",")[0].toLowerCase().replace(/\./g, "");
    const videoType = splitArray[1].split(",")[1].replace(/\)/g, "").trim();
    return {
      size: getSize(size),
      category,
      videoCodec,
      videoType: videoTypeMap[videoType]
    };
  };
  var getMediaInfo = async (torrentId) => {
    const res = await fetch(`https://hdbits.org/details/mediainfo?id=${torrentId}`, {
      responseType: void 0
    });
    const data = res.replace(/\r\n/g, "\n");
    return data || "";
  };
  var getImages = async (description) => {
    const screenshots = await getScreenshotsFromBBCode(description);
    return screenshots;
  };

  // src/source/tik.ts
  init_preact_shim();
  var tik_default = async () => {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const typeText = jQuery("td.heading:contains(Type)").eq(0).next().text();
    const isMovie = typeText !== "TV-Series";
    const tags = [];
    jQuery("td.heading:contains(Tags)").eq(0).next().children().each((_3, child) => {
      tags.push(child.textContent);
    });
    const size = jQuery("td.heading:contains(Size)").eq(0).next().text().replace(/[0-9.]+ GB\s+\(([0-9,]+) bytes\)/i, (_3, size2) => size2.replace(/,/g, ""));
    const title = jQuery("h1").eq(0).text();
    const imdbNumber = jQuery('span:contains("IMDB id:") a').text();
    const descContainer = jQuery("td.heading:contains(Description)").eq(0).next();
    const desc = descContainer.text();
    const rawDesc = descContainer.html();
    TORRENT_INFO.mediaInfo = jQuery("td[style~=dotted]").text();
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFromBDInfo(TORRENT_INFO.mediaInfo);
    TORRENT_INFO.size = parseInt(size, 10);
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.description = desc;
    TORRENT_INFO.screenshots = getImagesFromDesc(rawDesc);
    TORRENT_INFO.year = jQuery("span.gr_hsep:contains(Year)").text().replace("Year: ", "").trim();
    TORRENT_INFO.movieName = jQuery("div.gr_tdsep h1:first-child").text();
    TORRENT_INFO.imdbUrl = `https://www.imdb.com/title/tt${imdbNumber}/`;
    TORRENT_INFO.category = isMovie ? "movie" : "tvPack";
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.videoType = tags.includes("Blu-ray") ? "bluray" : "dvd";
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = mediaTags;
  };
  function getImagesFromDesc(desc) {
    const screenshots = [];
    if (!desc) {
      return screenshots;
    }
    const matches = desc.match(/[a-z0-9]{32}/g);
    if (!matches) {
      return screenshots;
    }
    for (const m3 of matches) {
      screenshots.push(`https://hostik.cinematik.net/gal/ori/${m3[0]}/${m3[1]}/${m3}.jpg`);
    }
    return screenshots;
  }

  // src/source/ttg.ts
  init_preact_shim();
  var ttg_default = async () => {
    var _a3, _b2, _c, _d, _e;
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const headTitle = jQuery("#main_table h1").eq(0).text();
    const title = formatTorrentTitle((_b2 = (_a3 = headTitle.match(/[^[]+/)) == null ? void 0 : _a3[0]) != null ? _b2 : "");
    TORRENT_INFO.title = title;
    TORRENT_INFO.subtitle = headTitle.replace(title, "").replace(/\[|\]/g, "");
    const tags = getTagsFromSubtitle(TORRENT_INFO.subtitle + TORRENT_INFO.title);
    const mediaTecInfo = getTorrentValueDom("\u7C7B\u578B").text();
    const { category, area, videoType } = getCategoryAndArea(mediaTecInfo);
    TORRENT_INFO.area = area;
    TORRENT_INFO.videoType = getVideoType3(title, videoType);
    const year = (_c = TORRENT_INFO.title.match(/(18|19|20)\d{2}/g)) != null ? _c : [];
    TORRENT_INFO.year = year ? year.pop() : "";
    const imdbUrl = getTorrentValueDom("IMDb").find("a").attr("href");
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    const sizeStr = (_e = (_d = getTorrentValueDom("\u5C3A\u5BF8").text().match(/\(((\d|,)+)\s*字节\)/i)) == null ? void 0 : _d[1]) != null ? _e : "";
    TORRENT_INFO.size = parseInt(sizeStr.replace(/,/g, ""), 10);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    TORRENT_INFO.isForbidden = !!jQuery("#kt_d").text().match(/禁转/);
    window.onload = async () => {
      var _a4, _b3, _c2, _d2, _e2, _f, _g;
      const descriptionDom = jQuery("#kt_d");
      const bbCodes = getFilterBBCode(descriptionDom[0]);
      if (!imdbUrl) {
        TORRENT_INFO.imdbUrl = (_a4 = bbCodes.match(/https:\/\/www\.imdb\.com\/title\/tt\d+/)) == null ? void 0 : _a4[0];
      } else {
        TORRENT_INFO.imdbUrl = imdbUrl;
      }
      const description = getDescription3(bbCodes, title);
      TORRENT_INFO.description = description;
      const comparisons = getComparisonImgs2(description);
      TORRENT_INFO.comparisons = comparisons;
      const doubanUrl = (_b3 = bbCodes.match(/https:\/\/(movie\.)?douban.com\/subject\/\d+/)) == null ? void 0 : _b3[0];
      if (doubanUrl) {
        TORRENT_INFO.doubanUrl = doubanUrl;
      }
      const areaMatch = (_c2 = bbCodes.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _c2[2];
      if (areaMatch) {
        TORRENT_INFO.area = getAreaCode(areaMatch);
      }
      if (!category) {
        TORRENT_INFO.category = getCategoryFromDesc(bbCodes);
      } else {
        TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
      }
      const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(bbCodes);
      const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
      if (mediaInfoOrBDInfo) {
        TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
        const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        TORRENT_INFO.resolution = resolution || "";
        TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), mediaTags);
      } else {
        let resolution = (_e2 = (_d2 = TORRENT_INFO.title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _d2[0]) != null ? _e2 : "";
        if (!resolution && resolution.match(/4k|uhd/i)) {
          resolution = "2160p";
        }
        TORRENT_INFO.resolution = resolution;
        TORRENT_INFO.audioCodec = getAudioCodecFromTitle(TORRENT_INFO.title);
        if (bbCodes.match(/VIDEO(\.| )*CODEC/i)) {
          const matchCodec = (_f = bbCodes.match(/VIDEO(\.| )*CODEC\.*:?\s*([^\s_:]+)?/i)) == null ? void 0 : _f[2];
          if (matchCodec) {
            TORRENT_INFO.videoCodec = matchCodec.replace(/\.|-/g, "").toLowerCase();
          } else {
            const { title: title2 } = TORRENT_INFO;
            TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title2);
          }
        }
        if (bbCodes.match(/AUDIO\s*CODEC/i)) {
          const matchCodec = (_g = bbCodes.match(/AUDIO\s*CODEC\.*:?\s*(.+)/i)) == null ? void 0 : _g[1];
          if (matchCodec) {
            TORRENT_INFO.audioCodec = getAudioCodecFromTitle(matchCodec);
          }
        }
      }
      let screenshots = await getImages2(bbCodes);
      comparisons.forEach((comparison) => {
        screenshots = screenshots.filter((img) => !comparison.imgs.includes(img));
      });
      TORRENT_INFO.screenshots = screenshots;
    };
  };
  var getCategoryAndArea = (mediaInfo) => {
    let category = "";
    let area = "";
    let videoType = "";
    if (mediaInfo.match(/电影/)) {
      category = "movie";
    } else if (mediaInfo.match(/剧包/)) {
      category = "tvPack";
    } else if (mediaInfo.match(/剧/)) {
      category = "tv";
    } else if (mediaInfo.match(/纪录/)) {
      category = "documentary";
    } else if (mediaInfo.match(/综艺/)) {
      category = "variety";
    } else if (mediaInfo.match(/体育/)) {
      category = "sport";
    } else if (mediaInfo.match(/演唱会/)) {
      category = "concert";
    } else if (mediaInfo.match(/动漫/)) {
      category = "cartoon";
    }
    if (mediaInfo.match(/韩/)) {
      area = "KR";
    } else if (mediaInfo.match(/日/)) {
      area = "JP";
    } else if (mediaInfo.match(/华/)) {
      area = "CN";
    } else if (mediaInfo.match(/欧/)) {
      area = "US";
    }
    if (mediaInfo.match(/UHD原盘/i)) {
      videoType = "uhdbluray";
    } else if (mediaInfo.match(/bluray原盘/i)) {
      videoType = "bluray";
    } else if (mediaInfo.match(/DVD/i)) {
      videoType = "dvd";
    }
    return {
      category,
      area,
      videoType
    };
  };
  var getImages2 = (bbcode) => {
    var _a3, _b2;
    if (bbcode.match(/More\.Screens/i)) {
      const moreScreen = (_b2 = (_a3 = bbcode.match(/\.More\.Screens\[\/u\]\[\/color\]\n((.|\n)+\[\/(url|img)\])/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
      return getScreenshotsFromBBCode(moreScreen);
    }
    return getScreenshotsFromBBCode(bbcode);
  };
  var getVideoType3 = (title, videoType) => {
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/remux/i)) {
      return "remux";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return videoType;
  };
  var getTorrentValueDom = (key) => {
    return jQuery(`#main_table td.heading:contains(${key})`).next();
  };
  var getCategoryFromDesc = (desc) => {
    let category = "movie";
    const { title, subtitle } = TORRENT_INFO;
    if (title.match(/s0?\d{1,2}/i) || desc.match(/集\s*数/)) {
      if (title.match(/s0?\d{1,2}e0\d{1,2}/i) || (subtitle == null ? void 0 : subtitle.match(/第[^\s]集/))) {
        category = "tv";
      } else {
        category = "tvPack";
      }
    } else if (desc.match(/动画/)) {
      category = "cartoon";
    } else if (desc.match(/纪录/)) {
      category = "documentary";
    }
    return category;
  };
  function getDescription3(bbcode, title) {
    var _a3, _b2, _c, _d, _e, _f;
    const discountMatch = (_b2 = (_a3 = bbcode.match(/\[color=\w+\]本种子.+?\[\/color\]/)) == null ? void 0 : _a3[0]) != null ? _b2 : "";
    if (discountMatch) {
      bbcode = bbcode.replace(discountMatch, "");
    }
    const noneSenseNumberMatch = (_d = (_c = bbcode.match(/@\d+?\(\d+?\)/)) == null ? void 0 : _c[0]) != null ? _d : "";
    if (noneSenseNumberMatch) {
      bbcode = bbcode.replace(noneSenseNumberMatch, "");
    }
    if (title.match(/-WiKi$/)) {
      const doubanPart = (_f = (_e = bbcode.match(/◎译\s+名(.|\n)+/)) == null ? void 0 : _e[0]) != null ? _f : "";
      bbcode = bbcode.replace(doubanPart, "");
      bbcode = bbcode.replace(/(\[img\].+?\[\/img\])/, `$1

${doubanPart}`);
    }
    return bbcode;
  }
  function getComparisonImgs2(description) {
    var _a3, _b2, _c;
    const comparisonPart = (_a3 = description.match(/\.Comparisons(.|\n)+\[\/img\]\[\/url\]/)) == null ? void 0 : _a3[0];
    if (!comparisonPart) {
      return [];
    }
    const title = (_c = (_b2 = comparisonPart.match(/(\[color=.+?\])(.+?)\[\/color\]/g)) == null ? void 0 : _b2.map((item) => {
      var _a4, _b3;
      return (_b3 = (_a4 = item.match(/\[color=.+?\](.+?)\[\/color\]/)) == null ? void 0 : _a4[1]) != null ? _b3 : "";
    })) != null ? _c : [];
    const comparisonImgArray = [];
    const allImages = comparisonPart == null ? void 0 : comparisonPart.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g);
    if (allImages && allImages.length > 0) {
      allImages.forEach((img) => {
        var _a4;
        const matchUrl = (_a4 = img.match(/\[url=(.+?)\]/)) == null ? void 0 : _a4[1];
        if (matchUrl) {
          comparisonImgArray.push(matchUrl);
        }
      });
    }
    return [{
      imgs: comparisonImgArray,
      title: title.join(","),
      reason: ""
    }];
  }

  // src/source/unit3d.ts
  init_preact_shim();
  var unit3d_default = async () => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h;
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const { Category, Name, Type, Size, Resolution } = getBasicInfo3();
    TORRENT_INFO.size = getSize(Size);
    let title = formatTorrentTitle(Name);
    const tags = getTagsFromSubtitle(TORRENT_INFO.title);
    const category = getCategory(Category);
    const videoType = getVideoType4(Type, Resolution);
    let IMDBYear = jQuery(".movie-heading span:last").text();
    let movieName = jQuery(".movie-heading span:first").text();
    let imdbUrl = jQuery(".movie-details a:contains(IMDB)").attr("href");
    let poster = jQuery(".movie-poster").attr("src");
    if (CURRENT_SITE_NAME === "HDPOST") {
      const englishTitle = (_b2 = (_a3 = title.match(/[\s\W\d]+(.+)/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
      TORRENT_INFO.subtitle = (_c = title.replace(englishTitle, "")) == null ? void 0 : _c.trim();
      title = englishTitle;
    }
    if (CURRENT_SITE_NAME === "ACM") {
      title = title.replace(/\/\s+\W+/, "");
    }
    if (CURRENT_SITE_NAME === "MDU") {
      title = jQuery("h1.text-center").text().trim();
      TORRENT_INFO.subtitle = jQuery("h2.text-center").text().trim();
    }
    if (!IMDBYear) {
      const matchYear = TORRENT_INFO.title.match(/(19|20)\d{2}/g);
      IMDBYear = (_d = matchYear == null ? void 0 : matchYear.pop()) != null ? _d : "";
    } else {
      IMDBYear = IMDBYear.replace(/\(|\)|\s/g, "");
    }
    const resolution = (_f = (_e = Resolution.match(/\d+(i|p)/i)) == null ? void 0 : _e[0]) != null ? _f : "";
    let descriptionDom = jQuery(".fa-sticky-note").parents(".panel-heading").siblings(".table-responsive").find(".panel-body").clone();
    descriptionDom.find("#collection_waypoint").remove();
    let mediaInfoOrBDInfo = jQuery(".decoda-code code").text();
    if (CURRENT_SITE_NAME.match(/Blutopia|Aither|fearnopeer/i)) {
      const title2 = jQuery(".meta__title").text().trim();
      movieName = title2.replace(/\(.+\)/g, "");
      IMDBYear = (_h = (_g = title2.match(/\((\d{4})\)/)) == null ? void 0 : _g[1]) != null ? _h : "";
      imdbUrl = jQuery(".meta__imdb a").attr("href");
      descriptionDom = jQuery(".panel__body.bbcode-rendered");
      mediaInfoOrBDInfo = jQuery(".bbcode-rendered code").text();
      poster = jQuery(".meta__poster-link img").attr("src");
    }
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    if (mediaInfoOrBDInfo) {
      descriptionBBCode = `
[quote]${mediaInfoOrBDInfo}[/quote]${descriptionBBCode}`;
    }
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
    TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), mediaTags);
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
    TORRENT_INFO.title = title;
    TORRENT_INFO.year = IMDBYear;
    TORRENT_INFO.movieName = CURRENT_SITE_NAME === "HDPOST" ? "" : movieName;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.poster = poster;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSourceFromTitle(title);
    TORRENT_INFO.videoType = videoType.toLowerCase();
    TORRENT_INFO.description = descriptionBBCode;
    const fullInformation = TORRENT_INFO.subtitle + descriptionBBCode;
    const isForbidden = fullInformation.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|请勿转载|禁止转载|exclusive/);
    TORRENT_INFO.isForbidden = !!isForbidden;
  };
  var getBasicInfo3 = () => {
    const basicInfo = {
      Category: "",
      Name: "",
      Type: "",
      Size: "",
      Resolution: ""
    };
    const keyMap = {
      Name: "Name",
      \u540D\u79F0: "Name",
      \u540D\u7A31: "Name",
      Size: "Size",
      \u4F53\u79EF: "Size",
      \u9AD4\u7A4D: "Size",
      size: "Size",
      Category: "Category",
      \u7C7B\u522B: "Category",
      \u985E\u5225: "Category",
      category: "Category",
      Type: "Type",
      \u89C4\u683C: "Type",
      \u898F\u683C: "Type",
      type: "Type",
      Resolution: "Resolution",
      resolution: "Resolution"
    };
    if (!CURRENT_SITE_NAME.match(/Blutopia|Aither|fearnopeer/i)) {
      const lineSelector = jQuery('#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr');
      lineSelector.each((index, element) => {
        var _a3, _b2, _c;
        const key = jQuery(element).find("td:first").text().replace(/\s|\n/g, "");
        const basicKey = keyMap[key];
        if (basicKey) {
          let value = jQuery(element).find("td:last").text();
          if (basicKey === "Name") {
            value = (_c = (_b2 = (_a3 = jQuery(element).find("td:last")[0]) == null ? void 0 : _a3.firstChild) == null ? void 0 : _b2.textContent) != null ? _c : "";
          }
          basicInfo[basicKey] = value.replace(/\n/g, "").trim();
        }
      });
    } else {
      const formats = jQuery(".torrent__tags li");
      formats.each((index, item) => {
        var _a3;
        const className = (_a3 = jQuery(item).attr("class")) == null ? void 0 : _a3.replace("torrent__", "");
        basicInfo[keyMap[className]] = jQuery(item).text().trim();
      });
      const title = jQuery("h1.torrent__name").text().trim();
      basicInfo.Name = title;
      console.log(basicInfo);
    }
    return basicInfo;
  };
  var getCategory = (key) => {
    if (!key) {
      return "";
    }
    if (key.match(/movie|电影/i)) {
      return "movie";
    } else if (key.match(/tv|电视|剧集/i)) {
      return "tv";
    }
    return "";
  };
  var getVideoType4 = (type, resolution) => {
    type = type.replace(/\s/g, "");
    if (type.match(/FullDisc|BD/g)) {
      if (resolution.match(/2160p/i)) {
        return "uhdbluray";
      } else if (resolution.match(/1080/)) {
        return "bluray";
      }
      return "dvd";
    } else if (type.match(/Encode/i)) {
      return "encode";
    } else if (type.match(/web/i)) {
      return "web";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    } else if (type.match(/DVD/i)) {
      return "dvd";
    }
    return type;
  };

  // src/source/nexusphp.ts
  init_preact_shim();

  // src/source/helper.ts
  init_preact_shim();
  var getVideoType5 = (videoType) => {
    if (!videoType) {
      return "";
    }
    videoType = videoType.replace(/[.-]/g, "").toLowerCase();
    if (videoType.match(/encode|x264|x265|bdrip|hdrip|压制/ig)) {
      return "encode";
    } else if (videoType.match(/remux/ig)) {
      return "remux";
    } else if (videoType.match(/uhd|ultra/ig)) {
      return "uhdbluray";
    } else if (videoType.match(/blu|discs/ig)) {
      return "bluray";
    } else if (videoType.match(/webdl/ig)) {
      return "web";
    } else if (videoType.match(/hdtv/ig)) {
      return "hdtv";
    } else if (videoType.match(/dvdr/ig)) {
      return "dvdrip";
    } else if (videoType.match(/dvd/ig)) {
      return "dvd";
    }
    return "";
  };
  var getCategory2 = (category) => {
    if (!category) {
      return "";
    }
    category = category.replace(/[.-]/g, "").toLowerCase();
    if (category.match(/movie|bd|ultra|电影/ig)) {
      return "movie";
    } else if (category.match(/综艺/ig)) {
      return "variety";
    } else if (category.match(/tv|drama|剧集|电视/ig)) {
      return "tv";
    } else if (category.match(/TVSeries/ig)) {
      return "tvPack";
    } else if (category.match(/document|纪录|紀錄|Doc/ig)) {
      return "documentary";
    } else if (category.match(/sport|体育/ig)) {
      return "sport";
    } else if (category.match(/mv|演唱|concert/ig)) {
      return "concert";
    } else if (category.match(/anim|动(画|漫)/ig)) {
      return "cartoon";
    } else if (category.match(/App|软件|Software|軟體/ig)) {
      return "app";
    } else if (category.match(/电子书|小说|Ebook/ig)) {
      return "ebook";
    } else if (category.match(/有声书|AudioBook/ig)) {
      return "audiobook";
    } else if (category.match(/杂志|magazine/ig)) {
      return "magazine";
    } else if (category.match(/漫画|comics/ig)) {
      return "comics";
    } else if (category.match(/公开课/ig)) {
      return "onlineCourse";
    } else if (category.match(/资料/ig)) {
      return "ebook";
    }
    return "";
  };
  var getResolution3 = (resolution) => {
    resolution = resolution.toLowerCase();
    if (resolution.match(/4k|2160|UHD/ig)) {
      return "2160p";
    } else if (resolution.match(/1080(p)?/ig)) {
      return "1080p";
    } else if (resolution.match(/1080i/ig)) {
      return "1080i";
    } else if (resolution.match(/720(p)?/ig)) {
      return "720p";
    } else if (resolution.match(/sd/ig)) {
      return "480p";
    }
    return resolution;
  };
  var getFormat2 = (data) => {
    if (data.match(/pdf/i)) {
      return "pdf";
    } else if (data.match(/EPUB/i)) {
      return "epub";
    } else if (data.match(/MOBI/i)) {
      return "mobi";
    } else if (data.match(/mp3/i)) {
      return "mp3";
    } else if (data.match(/mp4/i)) {
      return "mp4";
    } else if (data.match(/txt/i)) {
      return "txt";
    } else if (data.match(/azw3/i)) {
      return "azw3";
    } else if (data.match(/镜像/i)) {
      return "iso";
    }
    return "other";
  };

  // src/source/nexusphp.ts
  var nexusphp_default = async () => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
    let title = formatTorrentTitle((_b2 = (_a3 = jQuery("#top").text().split(/\s{3,}/)) == null ? void 0 : _a3[0]) == null ? void 0 : _b2.trim());
    let metaInfo = jQuery("td.rowhead:contains('\u57FA\u672C\u4FE1\u606F'), td.rowhead:contains('\u57FA\u672C\u8CC7\u8A0A'),.layui-table td:contains('\u57FA\u672C\u4FE1\u606F')").next().text().replace(/：/g, ":");
    let subtitle = jQuery("td.rowhead:contains('\u526F\u6807\u9898'), td.rowhead:contains('\u526F\u6A19\u984C')").next().text();
    let siteImdbUrl = jQuery("#kimdb>a").attr("href");
    let descriptionBBCode = getFilterBBCode(jQuery("#kdescr")[0]);
    if (CURRENT_SITE_NAME === "MTeam") {
      descriptionBBCode = descriptionBBCode.replace(/https:\/\/\w+?\.m-team\.cc\/imagecache.php\?url=/g, "").replace(/(http(s)?)%3A/g, "$1:").replace(/%2F/g, "/");
    }
    if (CURRENT_SITE_NAME === "HDArea") {
      title = (_d = (_c = jQuery("h1#top").text().split(/\s{3,}/)) == null ? void 0 : _c[0]) == null ? void 0 : _d.trim();
    }
    if (CURRENT_SITE_NAME === "PuTao") {
      title = formatTorrentTitle((_e = jQuery("h1").text().replace(/\[.+?\]|\(.+?\)/g, "")) == null ? void 0 : _e.trim());
    }
    if (CURRENT_SITE_NAME === "TJUPT") {
      const matchArray = title.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
      const realTitle = (_g = (_f = matchArray.filter((item) => item.match(/\.| /))) == null ? void 0 : _f[0]) != null ? _g : "";
      title = realTitle.replace(/\[|\]/g, "");
    }
    if (CURRENT_SITE_NAME === "PTer") {
      if (jQuery("#descrcopyandpaster")[0]) {
        descriptionBBCode = (_h = jQuery("#descrcopyandpaster").val()) == null ? void 0 : _h.replace(/hide(=(MediaInfo|BDInfo))?\]/ig, "quote]");
      } else {
        descriptionBBCode = getFilterBBCode(jQuery("#kdescr")[0]);
      }
      descriptionBBCode = descriptionBBCode.replace(/\[img\d\]/g, "[img]");
    }
    if (CURRENT_SITE_NAME === "HDChina") {
      const meta = [];
      jQuery("li:contains('\u57FA\u672C\u4FE1\u606F'):last").next("li").children("i").each(function() {
        meta.push(jQuery(this).text().replace("\uFF1A", ":"));
      });
      metaInfo = meta.join("\xA0\xA0\xA0");
      subtitle = jQuery("#top").next("h3").text();
    }
    if (CURRENT_SITE_NAME === "OurBits") {
      siteImdbUrl = jQuery(".imdbnew2 a:first").attr("href");
      TORRENT_INFO.doubanUrl = jQuery("#doubaninfo .doubannew a").attr("href");
      if (TORRENT_INFO.doubanUrl) {
        const doubanInfo = getFilterBBCode((_i = jQuery(".doubannew2 .doubaninfo")) == null ? void 0 : _i[0]);
        const doubanPoster = `[img]${jQuery("#doubaninfo .doubannew a img").attr("src")}[/img]
`;
        TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo;
      }
    }
    if (CURRENT_SITE_NAME === "KEEPFRDS") {
      [title, subtitle] = [subtitle, title];
      siteImdbUrl = jQuery("#kimdb .imdbwp__link").attr("href");
      TORRENT_INFO.doubanUrl = jQuery("#kdouban .imdbwp__link").attr("href");
      const element = document.createElement("div");
      jQuery(element).html(jQuery("#outer td").has("#kdescr").html());
      descriptionBBCode = getFilterBBCode(element);
      descriptionBBCode = descriptionBBCode.replace("  [url=", "\n  [url=").replace(/\[\/img\]\[\/url\]\n/g, "[/img][/url]");
      const mediainfo = jQuery("div.codemain > pre:contains('Unique ID')");
      if (mediainfo[0]) {
        TORRENT_INFO.mediaInfo = mediainfo.text();
        mediainfo.each(function() {
          var _a4;
          (_a4 = TORRENT_INFO.mediaInfos) == null ? void 0 : _a4.push(jQuery(this).text());
        });
      }
      descriptionBBCode = descriptionBBCode.replace(/ 截图对比\(点击空白处展开\)/g, "\u622A\u56FE\u5BF9\u6BD4");
      const comparisonArray = jQuery("fieldset[onclick]").toArray() || [];
      const comparisons = [];
      comparisonArray.forEach((item) => {
        const imgs = [];
        jQuery(item).find("a").toArray().forEach((img) => {
          if (img.href)
            imgs.push(img.href);
        });
        const title2 = jQuery(item).find("legend").text().replace(" \u622A\u56FE\u5BF9\u6BD4(\u70B9\u51FB\u7A7A\u767D\u5904\u5C55\u5F00):", "").trim();
        const reason = "";
        comparisons.push({
          title: title2,
          imgs,
          reason
        });
      });
      TORRENT_INFO.comparisons = comparisons;
      if (!descriptionBBCode.match("\u8C46\u74E3\u8BC4\u5206")) {
        const imdbRate = jQuery("#kimdb span.imdbwp__rating").text().replace("\nRating: ", "");
        const doubanInfo = jQuery("#kdouban .imdbwp__content").text().replace(/\n{2,}/g, "\n").replace(/\n[0-9]?[0-9]\.[0-9]\n/g, "\n").replace(/\n/g, "\n\u25CE").replace(/\n◎$/, "\n").replace("\u25CERating:", `\u25CEIMDb\u94FE\u63A5:${siteImdbUrl}
\u25CEIMDb\u8BC4\u5206: ${imdbRate}
\u25CE\u8C46\u74E3\u94FE\u63A5: ${TORRENT_INFO.doubanUrl}
\u25CE\u8C46\u74E3\u8BC4\u5206:`);
        const postUrl = (_k = (_j = jQuery("#kimdb img.imdbwp__img")) == null ? void 0 : _j.attr("src")) != null ? _k : "";
        const doubanPoster = postUrl ? `[img]${postUrl}[/img]
` : "";
        TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo;
      }
      descriptionBBCode = descriptionBBCode.replace(/\[quote\]GeneralVideo[^[]*\[\/quote\]/, "");
    }
    if (CURRENT_SITE_NAME === "SSD") {
      TORRENT_INFO.doubanUrl = jQuery(".douban_info a:contains('://movie.douban.com/subject/')").attr("href");
      const doubanInfo = getFilterBBCode((_l = jQuery(".douban-info artical")) == null ? void 0 : _l[0]);
      const postUrl = (_n = (_m = jQuery("#kposter").find("img")) == null ? void 0 : _m.attr("src")) != null ? _n : "";
      const doubanPoster = postUrl ? `[img]${postUrl}[/img]
` : "";
      TORRENT_INFO.doubanInfo = doubanPoster + (doubanInfo == null ? void 0 : doubanInfo.replace(/\n{2,}/g, "\n"));
      if (descriptionBBCode === "" || descriptionBBCode === void 0) {
        let extraTextInfo = getFilterBBCode((_o = jQuery(".torrent-extra-text-container .extra-text")) == null ? void 0 : _o[0]);
        extraTextInfo = extraTextInfo ? `
[quote]${extraTextInfo}[/quote]
` : "";
        const extraScreenshotDom = jQuery(".screenshot").find("img");
        const imgs = [];
        if (extraScreenshotDom) {
          extraScreenshotDom.each((index, item) => {
            var _a4, _b3;
            imgs.push(`[img]${(_b3 = (_a4 = jQuery(item).attr("src")) == null ? void 0 : _a4.trim()) != null ? _b3 : ""}[/img]`);
          });
        }
        const extraScreenshot = imgs.join("");
        const mediaInfo = jQuery("section[data-group='mediainfo'] .codemain").text();
        const extraMediaInfo = `
[quote]${mediaInfo}[/quote]
`;
        TORRENT_INFO.mediaInfo = mediaInfo;
        descriptionBBCode = extraTextInfo + extraMediaInfo + extraScreenshot;
      }
      siteImdbUrl = jQuery(".douban_info a:contains('://www.imdb.com/title/')").attr("href");
    }
    if (CURRENT_SITE_NAME === "HaresClub") {
      subtitle = jQuery("h3.layui-font-16:first").text();
      const extraScreenshotDom = jQuery("#layer-photos-demo").find("img");
      const imgs = [];
      if (extraScreenshotDom) {
        extraScreenshotDom.each((index, item) => {
          var _a4, _b3;
          imgs.push(`[img]${(_b3 = (_a4 = jQuery(item).attr("src")) == null ? void 0 : _a4.trim()) != null ? _b3 : ""}[/img]`);
        });
      }
      const extraScreenshot = imgs.join("");
      descriptionBBCode = getFilterBBCode(jQuery(".layui-colla-content:first")[0]);
      const extraMediaInfo = (_q = (_p = jQuery("#kfmedia").html()) == null ? void 0 : _p.replace(/<br>/g, "\n")) != null ? _q : "";
      descriptionBBCode = `${descriptionBBCode}
[quote]${extraMediaInfo}[/quote]
${extraScreenshot}`;
      TORRENT_INFO.doubanUrl = jQuery('.layui-interval a[href*="douban.com/subject"]').attr("href");
      TORRENT_INFO.mediaInfo = extraMediaInfo;
      siteImdbUrl = jQuery('.layui-interval a[href*="imdb.com/title"]').attr("href");
    }
    const year = (_r = title == null ? void 0 : title.match(/(19|20)\d{2}/g)) != null ? _r : [];
    const { category, videoType, videoCodec, audioCodec, resolution, processing, size } = getMetaInfo(metaInfo);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const doubanUrl = (_s = descriptionBBCode.match(/https:\/\/((movie|book)\.)?douban\.com\/subject\/\d+/)) == null ? void 0 : _s[0];
    if (doubanUrl) {
      TORRENT_INFO.doubanUrl = doubanUrl;
    }
    const imdbUrl = (_t = descriptionBBCode.match(/http(s)?:\/\/www\.imdb\.com\/title\/tt\d+/)) == null ? void 0 : _t[0];
    if (imdbUrl) {
      TORRENT_INFO.imdbUrl = imdbUrl;
    } else if (siteImdbUrl) {
      TORRENT_INFO.imdbUrl = siteImdbUrl.match(/www\.imdb\.com\/title/) ? siteImdbUrl : "";
    }
    TORRENT_INFO.year = year.length > 0 ? year.pop() : "";
    TORRENT_INFO.title = title;
    TORRENT_INFO.subtitle = subtitle;
    TORRENT_INFO.description = descriptionBBCode;
    const originalName = (_v = (_u = descriptionBBCode.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _u[2]) != null ? _v : "";
    const translateName = (_x = (_w = descriptionBBCode.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _w[2]) != null ? _x : "";
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      TORRENT_INFO.movieName = originalName;
    } else {
      TORRENT_INFO.movieName = (_A = (_z = (_y = translateName.match(/(\w|\s){2,}/)) == null ? void 0 : _y[0]) == null ? void 0 : _z.trim()) != null ? _A : "";
    }
    const fullInformation = jQuery("#top").text() + subtitle + descriptionBBCode;
    const isForbidden = fullInformation.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|exclusive/);
    TORRENT_INFO.isForbidden = !!isForbidden;
    if (!processing || processing.match(/raw|encode/)) {
      const areaMatch = (_B = descriptionBBCode.match(/(产\s+地|国\s+家)】?\s*(.+)/)) == null ? void 0 : _B[2];
      if (areaMatch) {
        TORRENT_INFO.area = getAreaCode(areaMatch);
      }
    } else {
      TORRENT_INFO.area = getAreaCode(processing);
    }
    const specificCategory = getPreciseCategory(TORRENT_INFO, getCategory2(category || descriptionBBCode));
    TORRENT_INFO.category = specificCategory;
    TORRENT_INFO.videoType = getVideoType5(videoType || TORRENT_INFO.title);
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.size = size ? getSize(size) : 0;
    if (CURRENT_SITE_NAME === "KEEPFRDS") {
      TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode.replace(/\[quote\]截图对比[^\n]*\n[^\n]*/gi, ""));
    } else
      TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
    const tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
    const pageTags = getTagsFromPage();
    TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), pageTags);
    if (!TORRENT_INFO.isForbidden && TORRENT_INFO.tags.exclusive) {
      TORRENT_INFO.isForbidden = true;
    }
    const infoFromMediaInfoinfo = getInfoFromMediaInfo(TORRENT_INFO.mediaInfo);
    if (infoFromMediaInfoinfo.subtitles) {
      for (let i3 = 0; i3 < ((_C = infoFromMediaInfoinfo.subtitles) == null ? void 0 : _C.length); i3++) {
        if (/Chinese|Traditional|Simplified|Cantonese|Mandarin/i.test(infoFromMediaInfoinfo.subtitles[i3])) {
          TORRENT_INFO.tags.chinese_subtitle = true;
          break;
        }
      }
    }
    if (CURRENT_SITE_NAME.match(/beitai/i)) {
      if (descriptionBBCode.match(/VIDEO\s*(\.)?CODEC/i)) {
        const matchCodec = (_D = descriptionBBCode.match(/VIDEO\s*(\.)?CODEC\.*:?\s*([^\s_,]+)?/i)) == null ? void 0 : _D[2];
        if (matchCodec) {
          let videoCodec2 = matchCodec.replace(/\.|-/g, "").toLowerCase();
          videoCodec2 = videoCodec2.match(/hevc/i) ? "x265" : videoCodec2;
          videoCodec2 = videoCodec2.match(/mpeg4/i) ? "x264" : videoCodec2;
          TORRENT_INFO.videoCodec = videoCodec2;
        }
      }
    } else {
      TORRENT_INFO.videoCodec = getVideoCodecFromTitle(TORRENT_INFO.title || videoCodec, TORRENT_INFO.videoType);
    }
    TORRENT_INFO.resolution = getResolution3(resolution || TORRENT_INFO.title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec || TORRENT_INFO.title);
    const isBluray = !!TORRENT_INFO.videoType.match(/bluray/i);
    if (TORRENT_INFO.mediaInfo) {
      getSpecsFromMediainfo(isBluray);
    } else {
      const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);
      const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
      if (mediaInfoOrBDInfo) {
        TORRENT_INFO.mediaInfo = CURRENT_SITE_NAME === "HaresClub" ? mediaInfoOrBDInfo : mediaInfoOrBDInfo;
        getSpecsFromMediainfo(isBluray);
      }
    }
    if (CURRENT_SITE_NAME === "TCCF") {
      TORRENT_INFO.format = getFormat2(videoType);
    } else {
      TORRENT_INFO.format = getFormat2(jQuery("#top").text() + subtitle);
    }
  };
  var getMetaInfo = (metaInfo) => {
    let resolutionKey = "\u5206\u8FA8\u7387|\u89E3\u6790\u5EA6|\u683C\u5F0F";
    let videoTypeKey = "\u5A92\u4ECB|\u6765\u6E90|\u8D28\u91CF";
    if (CURRENT_SITE_NAME === "SSD") {
      resolutionKey = "\u5206\u8FA8\u7387|\u89E3\u6790\u5EA6";
      videoTypeKey = "\u683C\u5F0F";
    }
    if (CURRENT_SITE_NAME === "KEEPFRDS") {
      videoTypeKey = "encode";
    }
    if (CURRENT_SITE_NAME.match(/TLF|HDAI|HDHome|HDZone/i)) {
      videoTypeKey = "\u5A92\u4ECB";
    }
    if (CURRENT_SITE_NAME.match(/HDFans/)) {
      videoTypeKey = "\u6765\u6E90";
    }
    const category = getMetaValue("\u7C7B\u578B|\u5206\u7C7B|\u985E\u5225", metaInfo);
    const videoType = getMetaValue(videoTypeKey, metaInfo);
    const videoCodec = getMetaValue("\u7F16\u7801|\u7DE8\u78BC", metaInfo);
    const audioCodec = getMetaValue("\u97F3\u9891|\u97F3\u9891\u7F16\u7801", metaInfo);
    const resolution = getMetaValue(resolutionKey, metaInfo);
    const processing = getMetaValue("\u5904\u7406|\u8655\u7406|\u5730\u533A", metaInfo);
    const size = getMetaValue("\u5927\u5C0F", metaInfo);
    console.log({
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      processing,
      size
    });
    return {
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      processing,
      size
    };
  };
  var getMetaValue = (key, metaInfo) => {
    var _a3, _b2;
    let regStr = `(${key}):\\s?([^\u4E00-\u9FA5]+)?`;
    if (key.match(/大小/)) {
      regStr = `(${key}):\\s?((\\d|\\.)+\\s+(G|M|T|K)(i)?B)`;
    }
    if (CURRENT_SITE_NAME.match(/KEEPFRDS|TJUPT|PTSBAO|PTHome|HDTime|BTSCHOOL|TLF|HDAI|SoulVoice|PuTao/) && key.match(/类型/)) {
      regStr = `(${key}):\\s?([^\\s]+)?`;
    }
    if (CURRENT_SITE_NAME === "PTer" && key.match(/类型|地区/)) {
      regStr = `(${key}):\\s?([^\\s]+)?`;
    }
    if (CURRENT_SITE_NAME === "TCCF" && key.match(/类型/)) {
      regStr = `(${key}):(.+?)\\s{2,}`;
    }
    if (CURRENT_SITE_NAME === "HDFans" && key.match(/来源/)) {
      regStr = `(${key}):(.+?)\\s{2,}`;
    }
    if (CURRENT_SITE_NAME === "HDChina" && key.match(/类型/)) {
      regStr = `(${key}):.+?([^\u4E00-\u9FA5]+)`;
    }
    const reg = new RegExp(regStr, "i");
    const matchValue = (_b2 = (_a3 = metaInfo.match(reg)) == null ? void 0 : _a3[2]) != null ? _b2 : "";
    if (matchValue) {
      return matchValue.replace(/\s/g, "").trim().toLowerCase();
    }
    return "";
  };
  var getTagsFromPage = () => {
    let tags = {};
    if (CURRENT_SITE_NAME === "PTer") {
      const tagImgs = jQuery("td.rowhead:contains('\u7C7B\u522B\u4E0E\u6807\u7B7E')").next().find("img");
      const links = Array.from(tagImgs.map((index, item) => {
        var _a3, _b2;
        return (_b2 = (_a3 = jQuery(item).attr("src")) == null ? void 0 : _a3.replace(/(lang\/chs\/)|(\.gif)/g, "")) != null ? _b2 : "";
      }));
      if (links.includes("pter-zz")) {
        tags.chinese_subtitle = true;
      }
      if (links.includes("pter-gy")) {
        tags.chinese_audio = true;
      }
      if (links.includes("pter-yy")) {
        tags.cantonese_audio = true;
      }
      if (links.includes("pter-diy")) {
        tags.diy = true;
      }
    } else {
      const tagText = jQuery("td.rowhead:contains('\u6807\u7B7E')").next().text();
      tags = getTagsFromSubtitle(tagText);
    }
    return tags;
  };
  function getSpecsFromMediainfo(isBluray) {
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(TORRENT_INFO.mediaInfo);
    if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.resolution = resolution || "";
      TORRENT_INFO.tags = __spreadValues(__spreadValues({}, TORRENT_INFO.tags), mediaTags);
    }
  }

  // src/source/hdt.ts
  init_preact_shim();
  var hdt_default = async () => {
    var _a3, _b2, _c, _d, _e, _f;
    const title = document.title.replace(/HD-Torrents.org\s*-/ig, "").trim();
    const imdbInfoDom = jQuery("#IMDBDetailsInfoHideShowTR .imdbnew2");
    const imdbUlrDom = imdbInfoDom.find(">a");
    const imdbUrl = imdbUlrDom.attr("href") || "";
    const movieName = imdbUlrDom.text();
    const year = (_b2 = (_a3 = imdbInfoDom.text().match(/Year:\s*(\d{4})/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
    const country = (_d = (_c = imdbInfoDom.text().match(/Country:\s*([^\n]+)/)) == null ? void 0 : _c[1]) != null ? _d : "";
    const { Category, Size, Genre } = getBasicInfo4();
    let tags = getTagsFromSubtitle(title);
    let category = Category.toLowerCase().split(/\s|\//)[0];
    category = Genre.match(/Animation/i) ? "cartoon" : category;
    const videoType = getVideoType6(Category, title);
    const source = getSourceFromTitle(title);
    let resolution = (_f = (_e = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _e[0]) != null ? _f : "";
    if (!resolution && (resolution == null ? void 0 : resolution.match(/4k|uhd/i))) {
      resolution = "2160p";
    }
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const descriptionDom = jQuery("#technicalInfoHideShowTR");
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    descriptionBBCode = descriptionBBCode.replace(/\[center\]((?:.|\n)+?)\[\/center\]/g, (match, p1) => {
      if (p1.match(/(keep seeding)|(spank your ass)/)) {
        return "";
      }
      return match;
    });
    const isBluray = videoType.match(/bluray/i);
    const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : TORRENT_INFO.mediaInfo || mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
      if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        resolution = mediaResolution || "";
        tags = __spreadValues(__spreadValues({}, tags), mediaTags);
      }
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.source = source;
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
  };
  var getBasicInfo4 = () => {
    const basicInfo = {
      Category: "",
      Size: "",
      Title: "",
      Genre: ""
    };
    jQuery(".detailsleft").each((index, element) => {
      const key = jQuery(element).text().replace(/:/g, "").trim();
      const value = jQuery(element).next("td").text();
      if (value) {
        basicInfo[key] = value.replace(/\n/g, "").trim();
      }
    });
    return basicInfo;
  };
  var getVideoType6 = (type, title) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/UHD\/Blu-Ray/i)) {
      return "uhdbluray";
    } else if (type.match(/Blu-Ray/i)) {
      return "bluray";
    }
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };

  // src/source/kg.ts
  init_preact_shim();
  var kg_default2 = async () => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
    const {
      InternetLink,
      Year,
      Type,
      Genres,
      Source,
      Size,
      Filename = "",
      RipSpecs = "",
      Subtitles,
      "Language(s)": language
    } = getBasicInfo5();
    const torrentFileDom = getBasicInfoDom("Download").find("a.index");
    const torrentFileName = torrentFileDom.text().replace(/\.torrent$/, "");
    const fileName = Filename.replace(/\.\w+$/, "");
    const title = formatTorrentTitle(fileName || torrentFileName);
    const imdbUrl = (InternetLink == null ? void 0 : InternetLink.match(/imdb/)) ? InternetLink : "";
    const [movieName, movieAkaName = ""] = (_a3 = jQuery(".outer h1").text().split("- ")) == null ? void 0 : _a3[1].replace(/\(\d+\)/, "").trim().split(/AKA/i);
    const country = jQuery(".outer h1 img").attr("alt") || "";
    const year = Year;
    const size = (_c = (_b2 = Size.match(/\((.+?)\)/)) == null ? void 0 : _b2[1].replace(/,|(bytes)/g, "")) != null ? _c : "";
    let tags = getTagsFromSubtitle(title);
    if (Subtitles.match(/Chinese/i)) {
      tags.chinese_subtitle = true;
    }
    if (language.match(/Chinese|Mandarin/i)) {
      tags.chinese_audio = true;
    }
    if (language.match(/Cantonese/)) {
      tags.cantonese_audio = true;
    }
    let category = Type.toLowerCase();
    category = Genres.match(/Animation/i) ? "cartoon" : category;
    const mediaInfo = jQuery("div.mediainfo").text();
    let source = Source.replace(/-/g, "").toLowerCase();
    if (source === "tv") {
      source = "hdtv";
    }
    let genreVideoType = (_f = (_e = (_d = getBasicInfoDom("Genres").find("tr td>img").attr("src")) == null ? void 0 : _d.match(/genreimages\/(\w+)\.\w+/)) == null ? void 0 : _e[1]) != null ? _f : "";
    genreVideoType = RipSpecs.match(/DVD\sFormat/) ? "dvdr" : genreVideoType;
    const videoType = getVideoType7(title, source, genreVideoType, !!mediaInfo);
    let resolution = (_h = (_g = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _g[0]) != null ? _h : "";
    if (!resolution && resolution.match(/4k|uhd/i)) {
      resolution = "2160p";
    }
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    if (genreVideoType === "dvdr" && RipSpecs) {
      TORRENT_INFO.videoCodec = "mpeg2";
      const audioCodec = (_j = (_i = RipSpecs.match(/DVD\sAudio:(.+)/)) == null ? void 0 : _i[1]) != null ? _j : "";
      TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec);
      resolution = "480p";
    }
    const descriptionDom = getBasicInfoDom("Description");
    let descriptionBBCode = getFilterBBCode(descriptionDom.find("article")[0]);
    descriptionBBCode = descriptionBBCode.replace(/(.|\n)+?_{5,}/g, "");
    const isBluray = videoType.match(/bluray/i);
    const { bdinfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
      if (videoCodec !== "" && audioCodec !== "" && mediaResolution !== "") {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        resolution = mediaResolution || "";
        tags = __spreadValues(__spreadValues({}, tags), mediaTags);
      }
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName.trim();
    TORRENT_INFO.movieAkaName = movieAkaName.trim();
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = Number(size);
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
  };
  var getBasicInfo5 = () => {
    const basicInfo = {};
    jQuery(".outer h1~table:first>tbody>tr").each((index, element) => {
      const key = jQuery(element).find("td.heading").text().replace(/\s/g, "");
      const value = jQuery(element).find("td.heading").next("td").text();
      if (value) {
        basicInfo[key] = value.replace(/\n/g, "").trim();
      }
    });
    return basicInfo;
  };
  var getVideoType7 = (title, source, genreVideoType, hasMediainfo) => {
    if (source) {
      if (source === "bluray") {
        const blurayFlag = genreVideoType === "bluray" || !hasMediainfo;
        return blurayFlag ? "bluray" : "encode";
      } else if (source === "dvd") {
        const dvdFlag = genreVideoType === "dvdr" || !hasMediainfo;
        return dvdFlag ? "dvd" : "dvdrip";
      }
      return source;
    }
    if (title.match(/UHD/i) && title.match(/Blu-Ray/i)) {
      return "uhdbluray";
    } else if (title.match(/Blu-Ray/i)) {
      return "bluray";
    } else if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };
  var getBasicInfoDom = (key) => {
    return jQuery(`.outer h1~table:first>tbody>tr td:contains(${key})`).next("td");
  };

  // src/source/uhd.ts
  init_preact_shim();
  var uhd_default = async () => {
    var _a3, _b2, _c, _d, _e, _f;
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const torrentFilePathDom = jQuery(`#files_${torrentId} .filelist_path`);
    const torrentFileDom = jQuery(`#files_${torrentId} .filelist_table>tbody>tr:nth-child(2) td`).eq(0);
    const torrentFileName = ((_a3 = torrentFilePathDom.text()) == null ? void 0 : _a3.replace(/\//g, "")) || ((_b2 = torrentFileDom.text()) == null ? void 0 : _b2.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, ""));
    const title = formatTorrentTitle(torrentFileName);
    const imdbUrl = jQuery(".imovie_title .tooltip.imdb_icon").attr("href") || "";
    const titleText = jQuery("#scontent h2").text();
    const [movieName = "", movieAkaName = ""] = (_d = (_c = titleText.match(/(.+?)\[/)) == null ? void 0 : _c[1].split("/")) != null ? _d : [];
    const year = (_f = (_e = titleText.match(/\[(\d+)\]/)) == null ? void 0 : _e[1]) != null ? _f : "";
    let tags = getTagsFromSubtitle(title);
    const source = getSourceFromTitle(title);
    const category = title.match(/Season\s+\d+/) ? "tv" : "movie";
    const size = getSize(jQuery(`#torrent${torrentId} td`).eq(1).text());
    const infoArray = jQuery(`#torrent${torrentId} td:first-child>a`).text().replace(/\s/g, "").split("/");
    let [resolution, ...specArray] = infoArray;
    let videoType = specArray.join("|");
    videoType = getVideoType8(videoType, resolution);
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const descriptionDom = jQuery(`#torrent_${torrentId} #description`);
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    descriptionBBCode = descriptionBBCode.replace(/https?:\/\/anonym\.to\/\?/g, "");
    TORRENT_INFO.originalDescription = descriptionBBCode;
    getMediaInfo2(torrentId).then(async (data) => {
      if (data) {
        TORRENT_INFO.mediaInfo = data;
        TORRENT_INFO.description = `${descriptionBBCode}
[quote]${data}[/quote]`;
        TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
        TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
        const isBluray = data.match(/\.(iso|m2ts|mpls)/i);
        const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
        const { videoCodec, audioCodec, mediaTags, resolution: mediaResolution } = getInfoFunc(data);
        if (resolution === "mHD" && mediaResolution) {
          resolution = mediaResolution;
        }
        if (videoCodec !== "" && audioCodec !== "") {
          TORRENT_INFO.videoCodec = videoCodec;
          TORRENT_INFO.audioCodec = audioCodec;
          tags = __spreadValues(__spreadValues({}, tags), mediaTags);
        }
      }
      TORRENT_INFO.tags = tags;
      TORRENT_INFO.resolution = resolution;
    });
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = title;
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName.trim();
    TORRENT_INFO.movieAkaName = movieAkaName.trim();
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = size;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.videoType = videoType;
  };
  var getMediaInfo2 = async (torrentId) => {
    const url = `/torrents.php?action=mediainfo&id=${torrentId}`;
    const data = await fetch(url, {
      responseType: void 0
    });
    return data || "";
  };
  var getVideoType8 = (videoType, resolution) => {
    videoType = videoType.replace("-", "").toLowerCase();
    if (videoType.match(/bluray/)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
      return "bluray";
    } else if (videoType.match(/web/)) {
      return "web";
    } else if (videoType.match(/x264|x265/)) {
      return "encode";
    } else if (videoType.match(/WEB/i)) {
      return "web";
    }
    return videoType;
  };

  // src/source/btn.ts
  init_preact_shim();
  var btn_default = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const torrentInfo2 = getTorrentInfo(torrentId);
    const showInfo = await getShowInfo();
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    Object.assign(TORRENT_INFO, torrentInfo2);
    Object.assign(TORRENT_INFO, showInfo);
    return TORRENT_INFO;
  };
  function getTorrentInfo(torrentId) {
    var _a3, _b2, _c;
    const torrentName = jQuery(`#torrent_${torrentId}`).prev().find("> td").text().replace(/»/, "").trim();
    const { container, source, size } = getSpecs(torrentId);
    const seasonTitle = jQuery("#content > div > h2").contents().last().text().trim();
    const [season = "", year = ""] = (_b2 = (_a3 = seasonTitle == null ? void 0 : seasonTitle.match(/(.*) \[(\d+)\]/)) == null ? void 0 : _a3.slice(1)) != null ? _b2 : [];
    const movieName = (_c = jQuery("#content > div > h2 > a > img").attr("alt")) == null ? void 0 : _c.replace(/\(\d+\)/, "").trim();
    const description = getFilterBBCode(jQuery(`#torrent_${torrentId} > td > blockquote`).last()[0]);
    const videoType = getVideoType9({ torrentName, source });
    const isBluray = videoType.match(/bluray/i);
    const mediaInfoOrBDInfo = getBDInfoOrMediaInfo(description);
    const mediaInfo = isBluray ? mediaInfoOrBDInfo.bdinfo : mediaInfoOrBDInfo.mediaInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { resolution, videoCodec, audioCodec, mediaTags: tags } = getInfoFunc(mediaInfo);
    const category = getCategory3(season);
    const sourceFrom = getSourceFromTitle(torrentName);
    return {
      title: formatTorrentTitle(torrentName),
      format: container.toLowerCase(),
      source: sourceFrom,
      size: getSize(size),
      resolution,
      year,
      movieName,
      description,
      videoType,
      mediaInfo,
      videoCodec,
      audioCodec,
      tags,
      category
    };
  }
  async function getShowInfo() {
    var _a3;
    const seriesUrl = jQuery("#content > .thin > h2 > a").prop("href");
    const html = await fetch(seriesUrl, {
      responseType: void 0
    });
    const infoHtml = html.match(/Series Info[\s\S]*?(<ul[\s\S]+?<\/ul>)/)[1];
    const infoDom = new DOMParser().parseFromString(infoHtml, "text/html");
    const info = Object.fromEntries(Array.from(infoDom.querySelectorAll("tr")).map((tr) => {
      const tds = Array.from(tr.children);
      return [tds[0].innerText.trim(), tds[1]];
    }));
    const country = info["Country:"].innerText;
    const imdbUrl = (_a3 = info["External Links:"].innerHTML.match(/https:\/\/www\.imdb\.com\/title\/tt\d+/)) == null ? void 0 : _a3[0];
    return {
      area: getAreaCode(country),
      imdbUrl
    };
  }
  var getVideoType9 = ({ torrentName = "", source = "" }) => {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (["BD50", "BD25"].includes(source)) {
      return "bluray";
    } else if (["BD66", "BD100"].includes(source)) {
      return "uhdbluray";
    } else if (["WEB-DL"].includes(source)) {
      return "web";
    } else if (["HDTV"].includes(source)) {
      return "encode";
    }
    return "";
  };
  function getCategory3(season) {
    return season.match(/season/i) ? "tvPack" : "tv";
  }
  function getSpecs(torrentId) {
    const specsDom = jQuery(`#torrent_${torrentId}`).prev().prev();
    const rawSpecs = specsDom.find("> td > a").text().replace(/»/, "").split("/").map((v3) => v3.trim());
    const specs = rawSpecs.filter((v3) => !["NFO"].includes(v3));
    const size = specsDom.find("> td").next("td").text().replace(/\s/g, "");
    const [container, videoCodec, source, resolution, group] = specs;
    return {
      container,
      videoCodec,
      source,
      resolution,
      group,
      size
    };
  }

  // src/source/avistaz.ts
  init_preact_shim();
  var avistaz_default = async () => {
    const torrentInfo2 = await getTorrentInfo2();
    torrentInfo2.category = getPreciseCategory(torrentInfo2, torrentInfo2.category);
    Object.assign(TORRENT_INFO, torrentInfo2);
  };
  var getTorrentInfo2 = async () => {
    var _a3, _b2, _c, _d, _e;
    const imdbUrl = (_c = (_b2 = (_a3 = jQuery('.badge-extra a[href*="www.imdb.com/title"]').attr("href")) == null ? void 0 : _a3.split("?")) == null ? void 0 : _b2[1]) != null ? _c : "";
    const movieTitle = jQuery(".block-titled h3 a").text();
    const movieName = movieTitle.split("(")[0].trim();
    const year = (_e = (_d = movieTitle.match(/\((\d+)\)/)) == null ? void 0 : _d[1]) != null ? _e : "";
    let { Type, "File Size": size, Title, "Video Quality": resolution, "Rip Type": videoType } = getBasicInfo6();
    const category = Type == null ? void 0 : Type.toLowerCase().replace("-", "");
    const title = formatTorrentTitle(Title);
    videoType = getVideoType10(videoType, resolution);
    const country = jQuery(".fa-flag~.badge-extra:first a").text();
    const area = getAreaCode(country);
    const source = getSourceFromTitle(title);
    const tags = getTagsFromSubtitle(title);
    const mediaInfoOrBDInfo = jQuery("#collapseMediaInfo pre").text();
    const screenshotsBBCode = jQuery("#collapseScreens a").map(function() {
      return `[url=${jQuery(this).attr("href")}][img]${jQuery(this).find("img").attr("src")}[/img][/url]`;
    }).get();
    const screenshots = await getScreenshotsFromBBCode(screenshotsBBCode.join("\n"));
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
    const descriptionBBCode = getFilterBBCode(jQuery(".torrent-desc")[0]);
    const description = `${descriptionBBCode}

[quote]${mediaInfoOrBDInfo}[/quote]

${screenshotsBBCode.join("")}`;
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      imdbUrl,
      movieName,
      year,
      size: getSize(size),
      category,
      videoType,
      resolution,
      area,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfo: mediaInfoOrBDInfo,
      description,
      tags: __spreadValues(__spreadValues({}, tags), mediaTags)
    };
  };
  var getBasicInfo6 = () => {
    const basicInfo = {
      Type: "",
      "File Size": "",
      Title: "",
      "Video Quality": "",
      resolution: "",
      "Rip Type": ""
    };
    jQuery("#content-area .block:last table:first>tbody>tr").each((index, element) => {
      const key = jQuery(element).find("td:first").text();
      const value = jQuery(element).find("td:last").text();
      basicInfo[key] = value.replace(/\n/g, "").trim();
    });
    return basicInfo;
  };
  var getVideoType10 = (type, resolution) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/BluRay\s*Raw/i)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
      return "bluray";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    } else if (type.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (type.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (type.match(/DVD/)) {
      return "dvd";
    } else if (type.match(/rip/i)) {
      return "encode";
    }
    return "";
  };

  // src/source/teamhd.ts
  init_preact_shim();
  var teamhd_default = async () => {
    const torrentInfo2 = await getTorrentInfo3();
    torrentInfo2.category = getPreciseCategory(torrentInfo2, torrentInfo2.category);
    try {
      let { movieName = "", year } = torrentInfo2;
      movieName = movieName.toLowerCase().replace(/\s/g, "_");
      const url = `https://v2.sg.media-imdb.com/suggestion/${movieName[0]}/${movieName}_${year}.json`;
      const imdbSearch = await fetch(url);
      if (imdbSearch && imdbSearch.d.length) {
        torrentInfo2.imdbUrl = `https://www.imdb.com/title/${imdbSearch.d[0].id}`;
      }
    } catch (error) {
      console.log(error);
    }
    Object.assign(TORRENT_INFO, torrentInfo2);
  };
  var getTorrentInfo3 = async () => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const basicInfoText = jQuery(".download").text().replace(/.+?\//g, "").trim();
    const year = (_b2 = (_a3 = basicInfoText.match(/\((\d{4})\)/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
    const movieName = (_d = (_c = basicInfoText.match(/(.+)\(\d{4}\)/)) == null ? void 0 : _c[1].trim()) != null ? _d : "";
    const resolution = (_f = (_e = basicInfoText.match(/(\s*(\d+(p|i)))$/i)) == null ? void 0 : _e[2]) != null ? _f : "";
    const videoType = getVideoType11(basicInfoText, resolution);
    const size = getSize((_h = (_g = jQuery("#details_hop").text().match(/-\s*(.+?GB)/)) == null ? void 0 : _g[1]) != null ? _h : "");
    const category = getCategory4(jQuery('#details_hop a[href*="browse/cat"]').attr("href") || "");
    const fileName = (_l = (_k = (_j = (_i = jQuery(".download").attr("href")) == null ? void 0 : _i.match(/name=(.+)/)) == null ? void 0 : _j[1].replace(/\.torrent/g, "")) == null ? void 0 : _k.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, "")) != null ? _l : "";
    const title = formatTorrentTitle(fileName);
    const source = getSourceFromTitle(title);
    const tags = getTagsFromSubtitle(title);
    const isBluray = videoType.match(/bluray/i);
    const mediaInfo = jQuery('.card-header:contains("MediaInfo") + .card-collapse .card-body').text();
    const bdInfo = jQuery('.card-header:contains("BDInfo") + .card-collapse .card-body').text();
    const eacLogs = jQuery('.card-header:contains("eac3to Log") + .card-collapse .card-body').text();
    const mediaInfoOrBDInfo = isBluray ? bdInfo : mediaInfo;
    const screenshotsBBCode = jQuery('#details a[href*="teamhd.org/redirector.php"]').map(function() {
      var _a4;
      const url = (_a4 = jQuery(this).attr("href")) == null ? void 0 : _a4.replace(/.+?url=/g, "");
      return `[url=${url}][img]${jQuery(this).find("img").attr("src")}[/img][/url]`;
    }).get();
    const screenshots = await getScreenshotsFromBBCode(screenshotsBBCode.join("\n"));
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
    const description = `[quote]${eacLogs}[/quote]

[quote]${mediaInfoOrBDInfo}[/quote]

${screenshotsBBCode.join("")}`;
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      movieName,
      year,
      size,
      category,
      videoType,
      resolution,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfo: mediaInfoOrBDInfo,
      mediaInfos: [mediaInfoOrBDInfo],
      description,
      tags: __spreadValues(__spreadValues({}, tags), mediaTags),
      imdbUrl: ""
    };
  };
  var getCategory4 = (link) => {
    var _a3, _b2;
    const catNum = (_b2 = (_a3 = link == null ? void 0 : link.match(/cat(\d+)/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
    const map = {
      29: "movie",
      25: "cartoon",
      28: "document",
      31: "sport",
      32: "tv",
      33: "tvPack"
    };
    return map[parseInt(catNum, 10)] || "";
  };
  var getVideoType11 = (type, resolution) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/Blu-Ray.+?Disc/i)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
      return "bluray";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    } else if (type.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (type.match(/rip/i)) {
      return "encode";
    }
    return "";
  };

  // src/source/hdspace.ts
  init_preact_shim();
  var hdspace_default = async () => {
    var _a3, _b2, _c, _d, _e, _f;
    const { Name, Category, Size, Description } = getBasicInfo7();
    const title = formatTorrentTitle(Name);
    let tags = getTagsFromSubtitle(title);
    const category = getCategory5(Category, title);
    let resolution = (_a3 = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _a3[0];
    if (!resolution && title.match(/4k|uhd/i)) {
      resolution = "2160p";
    }
    const videoType = getVideoType12(Category, title);
    const source = getSourceFromTitle(title);
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const div = document.createElement("div");
    div.innerHTML = Description.html();
    jQuery(div).find('#slidenfo,a[href*="#nfo"]').remove();
    const descriptionBBCode = getFilterBBCode(div);
    const isBluray = videoType.match(/bluray/i);
    const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : TORRENT_INFO.mediaInfo || mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
      if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        resolution = mediaResolution;
        tags = __spreadValues(__spreadValues({}, tags), mediaTags);
      }
    }
    const imdbId = (_d = (_c = (_b2 = jQuery("#imdb").next("script").text()) == null ? void 0 : _b2.match(/mid=(\d+)/)) == null ? void 0 : _c[1]) != null ? _d : "";
    const imdbData = await fetch(`${CURRENT_SITE_INFO.url}/getimdb.php?mid=${imdbId}`, {
      responseType: void 0
    });
    const imdbDom = new DOMParser().parseFromString(imdbData, "text/html");
    const imdbUlrDom = jQuery('a[href*="imdb.com/title"]', imdbDom);
    const imdbUrl = imdbUlrDom.attr("href");
    const movieName = imdbUlrDom.text().replace(/\(\d+\)/g, "");
    const year = (_f = (_e = imdbUlrDom.text().match(/\((\d{4})\)/)) == null ? void 0 : _e[1]) != null ? _f : "";
    const country = jQuery('td:contains("Country")', imdbDom).next("td").text();
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution || "";
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl || "";
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
  };
  var getBasicInfo7 = () => {
    const basicInfo = {
      Name: "",
      Category: "",
      Size: "",
      Description: jQuery("")
    };
    jQuery("#mcol .header").each(function() {
      var _a3;
      const key = jQuery(this).text().trim();
      if (!basicInfo[key]) {
        if (key === "Description") {
          basicInfo.Description = jQuery(this).next("td");
        } else {
          basicInfo[key] = (_a3 = jQuery(this).next("td").text()) == null ? void 0 : _a3.replace(/\n/g, "").trim();
        }
      }
    });
    return basicInfo;
  };
  var getCategory5 = (cat, title) => {
    if (cat.match(/movie/i)) {
      return "movie";
    } else if (cat.match(/hdtv/i)) {
      return "tv";
    } else if (cat.match(/doc/i)) {
      return "documentary";
    } else if (cat.match(/Animation/i)) {
      return "cartoon";
    } else if (cat.match(/Music\sVideos/i)) {
      return "concert";
    } else if (title.match(/S\d+(E\d+)?/i)) {
      return "tv";
    }
    return "movie";
  };
  var getVideoType12 = (type, title) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/Blu-Ray/i) && title.match(/2160p|4k|uhd/i)) {
      return "uhdbluray";
    } else if (type.match(/Blu-Ray/i)) {
      return "bluray";
    }
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/blu-ray/i) && title.match(/2160p|4k|uhd/i)) {
      return "uhdbluray";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };

  // src/source/gpw.ts
  init_preact_shim();
  var gpw_default2 = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const data = await getTorrentInfo4(torrentId);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    Object.assign(TORRENT_INFO, data);
  };
  var getTorrentInfo4 = async (torrentId) => {
    const { response } = await fetch(`/ajax.php?action=torrent&id=${torrentId}`);
    const { torrent, group } = response;
    const { name: movieName, year, conver: poster, releaseType, region, imdbId, doubanId } = group;
    const imdbUrl = `https://www.imdb.com/title${imdbId}`;
    const doubanUrl = `https://movie.douban.com/subject/${doubanId}`;
    const area = getAreaCode(region);
    let { description, fileList, filePath, size, source, resolution, processing, container, mediainfos } = torrent;
    fileList = fileList.replace(/\.\w+?{{{\d+}}}/g, "");
    const title = formatTorrentTitle(filePath.replace(/\[.+\]/g, "") || fileList);
    const category = getCategory6(releaseType);
    const torrentHeaderDom = jQuery(`#torrent${torrentId}`);
    const infoArray = torrentHeaderDom.find(".specs").text().trim().split(" / ").slice(4);
    const isRemux = processing.includes("Remux");
    const videoType = source === "WEB" ? "web" : getVideoType13(container, isRemux, source, resolution, processing);
    source = getSource2(source, processing, resolution);
    const { knownTags, otherTags } = getTags2(infoArray, ["\u53EF\u66FF\u4EE3", "\u7279\u8272"]);
    const tags = __spreadValues({}, knownTags);
    const torrentDom = jQuery(`#torrent_detail_${torrentId}`).find("#subtitles_box").next("blockquote");
    const screenshots = getScreenshots(torrentDom);
    const mediaInfoArray = mediainfos.map((info) => info.replace(/\r\n/g, "\n"));
    const isBluray = videoType.match(/bluray/i);
    const mediaInfoOrBDInfo = mediaInfoArray.filter((media) => {
      return videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
    });
    const mediaInfo = mediaInfoOrBDInfo.join("\n\n").trim();
    const mediaInfos = mediaInfoOrBDInfo.map((v3) => v3.trim());
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo.join("\n\n"));
    const descriptionData = formatDescriptionData2(description, screenshots, mediaInfoArray);
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      imdbUrl,
      doubanUrl,
      movieName,
      year,
      size,
      category,
      poster,
      videoType,
      resolution,
      area,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfo,
      mediaInfos,
      description: descriptionData,
      tags: __spreadValues(__spreadValues({}, tags), mediaTags),
      otherTags
    };
  };
  var getCategory6 = (releaseType) => {
    const typeMap = {
      \u957F\u7247: "movie",
      \u77ED\u7247: "movie",
      \u5355\u53E3\u559C\u5267: "other",
      \u8FF7\u4F60\u5267: "tvPack",
      \u73B0\u573A\u6F14\u51FA: "concert",
      \u7535\u5F71\u96C6: "movie"
    };
    return typeMap[releaseType];
  };
  var getScreenshots = (torrentDom) => {
    var _a3;
    const imgList = [];
    const imageDom = torrentDom.find(".scale_image");
    for (let i3 = 0; i3 < imageDom.length; i3++) {
      const parent = imageDom[i3].parentElement;
      if ((parent == null ? void 0 : parent.tagName) === "A" && ((_a3 = parent == null ? void 0 : parent.getAttribute("href")) == null ? void 0 : _a3.match(/\.png$/))) {
        imgList.push(parent.getAttribute("href") || "");
      } else {
        imgList.push(imageDom[i3].getAttribute("src") || "");
      }
    }
    return imgList;
  };
  var getSource2 = (source, codes, resolution) => {
    if (codes.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
      return "uhdbluray";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  var getVideoType13 = (container, isRemux, source, resolution, processing) => {
    let type = "";
    if (isRemux) {
      type = "remux";
    } else if (processing.match(/DIY/ig)) {
      type = resolution === "2160p" ? "uhdbluray" : "bluray";
    } else if (processing.match(/BD50|BD25/ig)) {
      type = "bluray";
    } else if (processing.match(/BD66|BD100/ig) || source.match(/Blu-ray/i) && processing.match(/DIY/i)) {
      type = "uhdbluray";
    } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
      type = "dvdrip";
    } else if (processing.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
      type = "dvd";
    } else if (container.match(/MKV|MP4/i)) {
      type = "encode";
    }
    return type;
  };
  var formatDescriptionData2 = (data, screenshots, mediaInfoArray) => {
    const element = document.createElement("span");
    element.innerHTML = data;
    let descriptionData = element.textContent || "";
    descriptionData = descriptionData == null ? void 0 : descriptionData.replace(/\r\n/g, "\n");
    descriptionData = descriptionData.split("\n").map((line) => {
      return line.trim();
    }).join("\n");
    TORRENT_INFO.originalDescription = descriptionData;
    screenshots.forEach((screenshot) => {
      const regStr = new RegExp(`\\[img\\]${screenshot}\\[\\/img\\]`, "i");
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(new RegExp(screenshot, "g"), `[img]${screenshot}[/img]`);
      }
    });
    descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p22) => {
      const slash = p1 || "";
      return p22 ? `${p22}: [${slash}quote]` : `[${slash}quote]`;
    });
    descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, "[$2]$3[/$2]");
    const comparisonArray = descriptionData.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n)+?)\[\/comparison\]/ig) || [];
    const comparisons = [];
    comparisonArray.forEach((item) => {
      var _a3, _b2, _c, _d;
      descriptionData = descriptionData.replace(item, item.replace(/\s/g, ""));
      const reason = (_b2 = (_a3 = item.match(/(\n.*\n)?\[comparison=/i)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
      const title = (_d = (_c = item.match(/\[comparison=(.*?)\]/i)) == null ? void 0 : _c[1]) != null ? _d : "";
      const comparisonImgArray = item.replace(/\[\/?comparison(=(.+?))?\]/ig, "").split(/[ \r\n]/);
      const imgs = [];
      Array.from(new Set(comparisonImgArray)).forEach((item2) => {
        const formatImg = item2.replace(/\s*/g, "");
        if (item2.match(/^https?.+/)) {
          imgs.push(formatImg);
          descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item2}`, "gi"), `[img]${formatImg}[/img]`);
        } else if (item2.match(/^\[img\]/i)) {
          imgs.push(formatImg.replace(/\[\/?img\]/g, ""));
        }
      });
      comparisons.push({
        title,
        imgs,
        reason
      });
    });
    TORRENT_INFO.comparisons = comparisons;
    descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/ig, "\n[b]$1 Comparison:[/b]\n").replace(/\[\/comparison\]/ig, "");
    mediaInfoArray.forEach((mediaInfo) => {
      descriptionData += `[quote]${mediaInfo}[/quote]`;
    });
    if (TORRENT_INFO.category === "concert") {
      descriptionData = `${jQuery("#synopsis").text()}
${descriptionData}`;
    }
    return descriptionData;
  };
  function getTags2(rawTags, exclude = []) {
    const knownTags = {};
    const otherTags = {};
    const { editionTags } = PT_SITE.GPW.sourceInfo;
    for (const rawTag of rawTags) {
      const tag = editionTags[rawTag];
      if (tag) {
        knownTags[tag] = true;
      } else if (tag === null || exclude.includes(rawTag) || rawTag.match(/(-\d+%)|免费|DVD|BD/i)) {
      } else {
        otherTags[rawTag] = true;
      }
    }
    return {
      knownTags,
      otherTags
    };
  }

  // src/source/emp.ts
  init_preact_shim();
  var emp_default = async () => {
    const torrentId = getUrlParam("id");
    if (!torrentId) {
      return false;
    }
    const title = jQuery(".details h2").text().trim();
    const descriptionBBCode = getFilterBBCode(jQuery(`#content${torrentId}`)[0]);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = title;
    TORRENT_INFO.description = descriptionBBCode.replace(/\[color=#ffffff\]/g, "[color=#000]");
  };

  // src/source/bdc.ts
  init_preact_shim();
  var bdc_default2 = async () => {
    const torrentInfo2 = await getTorrentInfo5();
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = PT_SITE.Bdc.siteType;
    const imdbInfo = getIMDBInfo();
    Object.assign(TORRENT_INFO, torrentInfo2, imdbInfo);
    return TORRENT_INFO;
  };
  async function getTorrentInfo5() {
    var _a3, _b2;
    const containerDom = jQuery(".yui-content #details");
    const torrentName = containerDom.find(">table>tbody>tr:first").text();
    const size = containerDom.find(">table:first-child>tbody>tr:nth-child(5) td:last").text();
    const isTV = (_a3 = containerDom.find(">table:first-child>tbody>tr:nth-child(4) td:last").text()) == null ? void 0 : _a3.includes("TV");
    const source = getSourceFromTitle(torrentName);
    const videoCodec = getVideoCodecFromTitle(torrentName);
    const audioCodec = getAudioCodecFromTitle(torrentName);
    const videoType = getVideoType14({ torrentName, source });
    const description = getFilterBBCode(containerDom.find("table").eq(4).find("tr:last-child td")[0]);
    const isBluray = videoType.match(/bluray/i);
    const mediaInfoOrBDInfo = getBDInfoOrMediaInfo(description);
    const mediaInfo = isBluray ? mediaInfoOrBDInfo.bdinfo : mediaInfoOrBDInfo.mediaInfo;
    const screenshots = await getScreenshotsFromBBCode(description);
    const tags = getTagsFromSubtitle(torrentName);
    const year = (_b2 = torrentName.match(/(18|19|20)\d{2}/g)) != null ? _b2 : [];
    return {
      title: formatTorrentTitle(torrentName),
      size: getSize(size),
      source,
      videoCodec,
      audioCodec,
      videoType,
      description,
      mediaInfo,
      resolution: getResolution4(torrentName),
      tags,
      screenshots,
      category: isTV ? "tv" : "movie",
      year: year.pop() || ""
    };
  }
  function getVideoType14({ torrentName = "", source = "" }) {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (["BD50", "BD25"].includes(source)) {
      return "bluray";
    } else if (["BD66", "BD100"].includes(source)) {
      return "uhdbluray";
    } else if (["web"].includes(source)) {
      return "web";
    } else if (["HDTV"].includes(source)) {
      return "hdtv";
    }
    return "encode";
  }
  function getResolution4(title) {
    title = title.toLowerCase();
    if (title.match(/4k|2160|UHD/ig)) {
      return "2160p";
    } else if (title.match(/1080(p)?/ig)) {
      return "1080p";
    } else if (title.match(/1080i/ig)) {
      return "1080i";
    } else if (title.match(/720(p)?/ig)) {
      return "720p";
    } else if (title.match(/sd/ig)) {
      return "480p";
    }
    return "";
  }
  function getIMDBInfo() {
    const infoDom = jQuery("#imdbdetails tr td").last();
    const imdbUrl = infoDom.find('a[href*="imdb.com/title"]').attr("href");
    const info = Object.fromEntries(Array.from(infoDom.find("b")).map((text) => {
      var _a3, _b2, _c;
      return [jQuery(text).text().replace(":", ""), (_c = (_b2 = (_a3 = jQuery(text)[0]) == null ? void 0 : _a3.nextSibling) == null ? void 0 : _b2.nodeValue) == null ? void 0 : _c.trim()];
    }));
    const movieName = jQuery("#imdbdetails tr").first().text();
    return {
      imdbUrl,
      movieName,
      area: getAreaCode(info.Country)
    };
  }

  // src/source/red.ts
  init_preact_shim();
  var red_default = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    try {
      TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
      TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
      const torrentInfo2 = await getTorrentInfo6(torrentId);
      Object.assign(TORRENT_INFO, torrentInfo2);
    } catch (error) {
      console.log(error);
    }
  };
  async function getTorrentInfo6(torrentId) {
    const { response } = await fetch(`/ajax.php?action=torrent&id=${torrentId}`);
    const { torrent, group } = response;
    const { name, year, wikiImage, musicInfo, categoryName, bbBody, tags, wikiBody } = group;
    const { format, media, encoding } = torrent;
    const catMap = {
      Applications: "app",
      "E-Books": "ebook",
      Audiobooks: "audioBook",
      Comics: "comics",
      Music: "music",
      "E-Learning Videos": "other",
      Comedy: "other"
    };
    const div = document.createElement("div");
    div.innerHTML = wikiBody;
    let description = bbBody || htmlToBBCode(div);
    description = `[img]${wikiImage}[/img]
${description}`;
    const log = await fetch(`/torrents.php?action=loglist&torrentid=${torrentId}`, {
      responseType: void 0
    });
    const logDiv = document.createElement("div");
    logDiv.innerHTML = log;
    const logBBcode = htmlToBBCode(logDiv);
    return {
      title: jQuery(".header h2").text(),
      subtitle: `${jQuery(`#torrent${torrentId}`).prev().find("strong").contents().last().text().trim()} / ${jQuery(`#torrent${torrentId} td:first-child a[onclick*="$("]`).text()}`,
      year: `${year}`,
      poster: wikiImage,
      description,
      category: catMap[categoryName] || "other",
      audioCodec: format.toLowerCase(),
      videoType: media.toLowerCase().replace("-", ""),
      musicInfo: {
        name,
        tags,
        artists: musicInfo.artists.map((item) => item.name),
        media,
        encoding,
        log: logBBcode
      }
    };
  }

  // src/source/mtv.ts
  init_preact_shim();
  var mtv_default = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const torrentInfo2 = await getTorrentInfo7(torrentId);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    Object.assign(TORRENT_INFO, torrentInfo2);
    return TORRENT_INFO;
  };
  async function getTorrentInfo7(torrentId) {
    var _a3, _b2;
    const imdbUrl = jQuery('.metalinks a[href*="imdb.com/title"]').attr("href");
    const torrentContainer = jQuery(`#torrent${torrentId}`);
    const [showName] = (_b2 = (_a3 = jQuery(".details>h2").text()) == null ? void 0 : _a3.split("-")) != null ? _b2 : [];
    const torrentName = torrentContainer.find(".permalink").text().trim();
    const size = torrentContainer.find(">td").eq(1).text().trim();
    const source = getSourceFromTitle(torrentName);
    const descriptionContainer = jQuery(`#content${torrentId}`).clone();
    descriptionContainer.find(">div").remove();
    const description = getFilterBBCode(descriptionContainer[0]);
    const screenshots = await getScreenshotsFromBBCode(description);
    const isBluray = !!jQuery(`#files_${torrentId}`).text().match(/\.(iso|m2ts|mpls)/i);
    const videoType = getVideoType15({ torrentName, source, isBluray });
    const mediaInfo = jQuery("div.mediainfo").text();
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { resolution, videoCodec, audioCodec, mediaTags: tags } = mediaInfo ? getInfoFunc(mediaInfo) : getSpecsFromTitle(torrentName);
    const category = getCategory7(torrentName);
    return {
      title: formatTorrentTitle(torrentName),
      imdbUrl,
      source,
      size: getSize(size),
      resolution,
      movieName: showName.replace(/\n/g, "").trim(),
      description,
      videoType,
      mediaInfo,
      videoCodec,
      audioCodec,
      tags,
      screenshots,
      category
    };
  }
  var getVideoType15 = ({ torrentName = "", source = "", isBluray = false }) => {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (source.match(/bluray/) && !isBluray) {
      return "encode";
    }
    return source;
  };
  function getCategory7(season) {
    return season.match(/S\d+E(P)\d+/i) ? "tv" : "tvPack";
  }
  function getSpecsFromTitle(torrentName) {
    var _a3;
    return {
      videoCodec: getVideoCodecFromTitle(torrentName),
      audioCodec: getAudioCodecFromTitle(torrentName),
      mediaTags: getTagsFromSubtitle(torrentName),
      resolution: (_a3 = torrentName.match(/\d{3,4}(p|i)/)) == null ? void 0 : _a3[0]
    };
  }

  // src/source/speedapp.ts
  init_preact_shim();
  var speedapp_default = async () => {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const imdbUrl = jQuery('a[href*="imdb.com/title"]').attr("href");
    const movieName = jQuery("div.container > div.row div.cover-body h1.text-emphasis").text().trim();
    const torrentName = jQuery("h5.text-emphasis").text().trim();
    const source = getSourceFromTitle(torrentName);
    const descriptionContainer = jQuery("div.description.description-modern");
    const descriptionBBCode = getFilterBBCode(descriptionContainer[0]);
    const extraScreenshotDom = jQuery(descriptionContainer[0]).find("img");
    const imgs = [];
    if (extraScreenshotDom) {
      extraScreenshotDom.each((index, item) => {
        var _a3, _b2;
        if (!/\.svg/.test(jQuery(item).attr("src") || ""))
          imgs.push(`[img]${(_b2 = (_a3 = jQuery(item).attr("src")) == null ? void 0 : _a3.trim()) != null ? _b2 : ""}[/img]`);
      });
    }
    const extraScreenshot = imgs.join("");
    const screenshots = await getScreenshotsFromBBCode(extraScreenshot);
    const isBluray = !!jQuery('span.nav-text:contains("BD Info")');
    const videoType = getVideoType16({ torrentName, source, isBluray });
    const mediaInfo = jQuery("div.mediainfo").text();
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { resolution, videoCodec, audioCodec } = mediaInfo ? getInfoFunc(mediaInfo) : getSpecsFromTitle2(torrentName);
    TORRENT_INFO.mediaInfo = "";
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.description = descriptionBBCode.replace(/\n\n*/g, "\n").replace(/\s+/g, "").trim().replace(/\[img\]https:\/\/speedapp\.io\/img\/descr\/(screens|release_info)\.svg\[\/img\]/g, "").replace("[img]https://speedapp.io/img/descr/release_info.svg[/img]", "").replace(/original\.(png|webp)\]\n?\[img\]/g, "original.webp][img]").replace(/original\.(png|webp)\[\/img\]\n?\[\/url\]/g, "mobile.webp[/img][/url]").replace(/\[\/url\]\n*/g, "[/url]");
    TORRENT_INFO.screenshots = screenshots;
    TORRENT_INFO.title = torrentName;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.resolution = resolution || "";
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.poster = jQuery(".movie-poster").attr("src");
    TORRENT_INFO.videoType = videoType.toLowerCase();
  };
  var getVideoType16 = ({ torrentName = "", source = "", isBluray = false }) => {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (source.match(/bluray/) && !isBluray) {
      return "encode";
    }
    return source;
  };
  function getSpecsFromTitle2(torrentName) {
    var _a3;
    return {
      videoCodec: getVideoCodecFromTitle(torrentName),
      audioCodec: getAudioCodecFromTitle(torrentName),
      mediaTags: getTagsFromSubtitle(torrentName),
      resolution: (_a3 = torrentName.match(/\d{3,4}(p|i)/)) == null ? void 0 : _a3[0]
    };
  }

  // src/source/hh.ts
  init_preact_shim();
  var hh_default = async () => {
    var _a3, _b2, _c, _d, _e, _f, _g, _h, _i;
    const title = formatTorrentTitle(((_a3 = document.title.match(/"(.+)"/)) == null ? void 0 : _a3[1]) || "");
    const subTitle = jQuery("div.font-bold.leading-6:contains('\u526F\u6807\u9898')").next().text().replace(/：/g, ":");
    const imbdDom = jQuery('#kimdb a[href*="imdb.com/title"]');
    const siteImdbUrl = (_b2 = imbdDom == null ? void 0 : imbdDom.attr("href")) != null ? _b2 : "";
    const movieName = (_d = (_c = imbdDom == null ? void 0 : imbdDom.text()) == null ? void 0 : _c.replace(/\n|\s/g, "")) != null ? _d : "";
    const metaInfo = getMetaInfo2();
    const isBluray = !!((_e = metaInfo.videoType) == null ? void 0 : _e.match(/bluray/i));
    const mediaInfo = jQuery("#mediainfo-raw code").text() || "";
    const specs = getSpecsFromMediainfo2(isBluray, mediaInfo);
    if (Object.keys(specs).length > 0) {
      Object.assign(metaInfo, specs);
    }
    const { category, videoType, videoCodec, audioCodec, resolution, size } = metaInfo;
    const formatSize = getSize(size);
    const year = (_f = title == null ? void 0 : title.match(/(19|20)\d{2}/g)) != null ? _f : [];
    const screenshots = jQuery("#screenshot-content img").toArray().map((el) => jQuery(el).attr("src")).filter((url) => url && url !== "");
    const doubanUrl = (_g = jQuery("#douban_info-content").prev().find('a[href*="douban.com"]').attr("href")) != null ? _g : "";
    let description = `
    [quote]${mediaInfo}[/quote]
  `;
    screenshots.forEach((url) => {
      description += `[img]${url}[/img]`;
    });
    const tags = getTagsFromPage2();
    Object.assign(TORRENT_INFO, {
      title,
      subtitle: subTitle,
      imdbUrl: siteImdbUrl,
      description,
      year: year.length > 0 ? year.pop() : "",
      source: getSourceFromTitle(title),
      mediaInfo,
      screenshots,
      movieName,
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: TORRENT_INFO.sourceSiteType,
      category: getCategory2(category),
      size: formatSize,
      tags: __spreadValues(__spreadValues({}, specs.mediaTags), tags),
      videoType: getVideoType5(videoType),
      videoCodec,
      audioCodec,
      resolution,
      doubanUrl,
      poster: (_i = (_h = jQuery("#cover-content")) == null ? void 0 : _h.attr("src")) != null ? _i : ""
    });
  };
  var getMetaInfo2 = () => {
    const meta = getMetaValue2();
    const category = meta["\u7C7B\u578B"];
    const videoType = meta["\u6765\u6E90"];
    const videoCodec = meta["\u7F16\u7801"];
    const audioCodec = meta["\u97F3\u9891\u7F16\u7801"];
    const resolution = meta["\u5206\u8FA8\u7387"];
    const processing = meta["\u5904\u7406"];
    const size = meta["\u5927\u5C0F"];
    console.log({
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      size
    });
    return {
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      processing,
      size
    };
  };
  var getMetaValue2 = () => {
    const result = {};
    jQuery("div.font-bold.leading-6:contains('\u57FA\u672C\u4FE1\u606F')").next().find("div span").each((index, el) => {
      if (index % 2 === 0) {
        const key = jQuery(el).text().replace(/:|：/g, "").trim();
        result[key] = jQuery(el).next().text();
      }
    });
    return result;
  };
  function getSpecsFromMediainfo2(isBluray, mediaInfo) {
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfo);
    if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
      return {
        videoCodec,
        audioCodec,
        resolution,
        mediaTags
      };
    }
    return {};
  }
  var getTagsFromPage2 = () => {
    const tags = {};
    const tagText = jQuery("div.font-bold.leading-6:contains('\u6807\u7B7E')").next().text();
    if (tagText.includes("\u4E2D\u5B57")) {
      tags.chinese_subtitle = true;
    }
    if (tagText.includes("\u56FD\u8BED")) {
      tags.chinese_audio = true;
    }
    if (tagText.includes("\u7CA4\u8BED")) {
      tags.cantonese_audio = true;
    }
    if (tagText.includes("DIY")) {
      tags.diy = true;
    }
    if (tagText.includes("\u675C\u6BD4\u89C6\u754C")) {
      tags.dolbyVision = true;
    }
    if (tagText.includes("HDR")) {
      tags.dolbyVision = true;
    }
    return tags;
  };

  // src/source/index.ts
  var siteNameMap = {
    BeyondHD: bhd_default2,
    HDBits: hdb_default,
    Cinematik: tik_default,
    TTG: ttg_default,
    HDT: hdt_default,
    KG: kg_default2,
    UHDBits: uhd_default,
    PTP: ptp_default2,
    BTN: btn_default,
    TeamHD: teamhd_default,
    HDSpace: hdspace_default,
    GPW: gpw_default2,
    EMP: emp_default,
    Bdc: bdc_default2,
    RED: red_default,
    DicMusic: red_default,
    MTV: mtv_default,
    SpeedApp: speedapp_default,
    HH: hh_default
  };
  var siteTypeInfoMap = {
    NexusPHP: nexusphp_default,
    UNIT3D: unit3d_default,
    AvistaZ: avistaz_default
  };
  var getTorrentInfo8 = () => Promise.resolve();
  if (!CURRENT_SITE_INFO) {
    console.log("do nothing");
  } else if (siteNameMap[CURRENT_SITE_NAME]) {
    getTorrentInfo8 = siteNameMap[CURRENT_SITE_NAME];
  } else if (siteTypeInfoMap[CURRENT_SITE_INFO.siteType]) {
    getTorrentInfo8 = siteTypeInfoMap[CURRENT_SITE_INFO.siteType];
  }
  var source_default = getTorrentInfo8;

  // src/site-dom/quick-search.ts
  init_preact_shim();
  var filterBluTorrent = (imdb = "", name = "") => {
    if (imdb) {
      jQuery("#imdb").val(imdb);
    } else if (name) {
      jQuery("#search").val(name);
    }
    const token = jQuery('meta[name="csrf_token"]').attr("content");
    const url = `${CURRENT_SITE_INFO.url}/torrents/filter?search=${name}&imdb=${imdb}&_token=${token}&sorting=size&direction=desc`;
    fetch(url, {
      responseType: void 0
    }).then((data) => {
      jQuery("#facetedSearch").html(data);
    });
  };
  var fillSearchImdb = () => {
    const imdbParam = getUrlParam("imdb");
    const nameParam = getUrlParam("name");
    const searchType = getUrlParam("search_area");
    if (imdbParam || nameParam) {
      if (CURRENT_SITE_INFO.siteType === "UNIT3D" && CURRENT_SITE_NAME !== "Blutopia") {
        filterBluTorrent(imdbParam, nameParam);
      } else if (CURRENT_SITE_NAME === "Bdc") {
        jQuery("#tsstac").val(imdbParam);
        jQuery("#search_type").val(searchType);
      } else if (CURRENT_SITE_NAME === "HDAI") {
        jQuery('input[name="keyword"]').val(imdbParam || nameParam);
        jQuery('select[name="keyword_area"]').val(searchType);
      } else if (CURRENT_SITE_NAME === "PTN") {
        jQuery("#movieimdb").val(imdbParam);
        jQuery("#moviename").val(nameParam);
      }
    }
  };

  // src/site-dom/ptpimg.tsx
  init_preact_shim();
  init_preact_module();
  var _a;
  if (location.host === "ptpimg.me") {
    const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key") || "";
    if (!ptpImgApiKey) {
      const div = document.createElement("div");
      S(/* @__PURE__ */ v("div", {
        class: "ptp-api-key-btn"
      }, /* @__PURE__ */ v("button", {
        class: "btn btn-info",
        onClick: () => {
          const apiKey = jQuery("#api_key").val();
          GM_setValue("easy-seed.ptp-img-api-key", apiKey);
          Notification_default2.open({
            message: "Success!",
            description: "Saved to EasyUpload."
          });
        }
      }, /* @__PURE__ */ v("i", {
        class: "glyphicon glyphicon-floppy-saved"
      }), /* @__PURE__ */ v("span", null, "Save ApiKey"))), div);
      (_a = document.querySelector("#form_file_upload")) == null ? void 0 : _a.appendChild(div);
    }
  }

  // src/style.ts
  init_preact_shim();
  var style_default = GM_addStyle(`
td.title-td{
  min-width: 80px;
  vertical-align: middle !important;
}
td.title-td h4{
  text-align: right;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#seed-dom button{
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 6px 16px;
  font-size: 13px;
  border-radius: 4px;
  margin:0;
  margin-right: 5px;
}
#seed-dom button:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff
}
#seed-dom button.is-disabled, #seed-dom button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.site-list,.search-list{
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.site-list .site-icon{
  width: 12px;
  margin-right: 5px;
}
.search-list .site-icon{
  width: 12px;
  margin-right: 5px;
}
.ptp-search-list{
  display: flex;
  align-items: center;
  padding-top:10px;
  justify-content: center;
}
.ptp-search-list h4{
  margin: 0;
  min-width: 60px;
  margin-right: 15px;
}
#seed-dom li,.search-list li,.site-list li {
  font-weight: 600;
  line-height: 24px;
  margin-right: 5px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding: 0px;
  display: flex;
  align-items: center;
}
#seed-dom li a,.search-list li a,.site-list li a {
  padding-right: 3px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.search-list li:last-child span{
  display: none;
}
.easy-seed-function-list{
  display: flex;
  justify-content: space-around; 
  padding: 6px 20px;
  flex-wrap: wrap;
}
.easy-seed-function-list button{
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin:0;
  margin-right: 5px;
}
.easy-seed-function-list button:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff
}
.easy-seed-function-list button.is-disabled, .easy-seed-function-list button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.function-list-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.function-list-item input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 34px;
    line-height: 40px;
    outline: none;
    width: 200px;
    padding: 0 12px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.function-list-item select{
  border: 0;
  font-family: inherit;
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  text-transform: none;
}
.function-list-item input::placeholder {
  color: #c0c4cc
}
.function-list-item input:hover {
  border-color: #c0c4cc
}
.function-list-item input:focus {
    outline: none;
    border-color: #409eff
}
.hdb-tr{
  display: flex;
}
.hdb-tr td:last-child{
  flex: 1;
}
.hdb-tr td:first-child>h4{
  width:100px;
}
.function-list-item h4{
  margin: 0;
  padding: 0;
  margin-right: 10px;
  font-weight: 600;
  font-size: 14px;
}
.upload-section,.douban-section,.douban-book-section{
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-section #nsfw{
  margin-left: 0;
  position: static;
}
.upload-section label{
  padding-left: 0;
}
#kdescr img{
  max-width: 100%;
}
.easy-seed-setting-btn{
  display: inline-flex;
  align-items: center;
  margin-left: 3px;
}
svg.setting-svg{
  height: 20px;
  width: 20px;
  vertical-align: middle;
  animation: 5s linear rotate infinite;
  cursor: pointer;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  };
}
.easy-seed-setting-panel{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: rgba(0,0,0,0.5);
  color: #000;
}
#batch-seed-btn,#auto-fill-douban{
  border-color: transparent;
  color: #409eff;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  font-weight: 600;
  cursor: pointer;
}
#batch-seed-btn:hover,#auto-fill-douban:hover {
  color: #66b1ff;
  border-color: transparent;
  background-color: transparent
}
#batch-seed-btn:active,#auto-fill-douban:active {
  color: #3a8ee6;
  background-color: transparent
}
#auto-fill-douban{
  font-size: 14px;
  display:inline-block;
}
.easy-seed-setting-panel *{
  padding: 0;
  margin: 0;
}
.easy-seed-setting-panel input[type="text"]{
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 34px;
  line-height: 40px;
  outline: none;
  width: 200px;
  padding: 0 12px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.easy-seed-setting-panel input[type="text"]::placeholder {
  color: #c0c4cc
}
.easy-seed-setting-panel input[type="text"]:hover {
  border-color: #c0c4cc
}
.easy-seed-setting-panel input[type="text"]:focus {
    outline: none;
    border-color: #409eff
}
.easy-seed-setting-panel h3,.easy-seed-setting-panel h1{ 
  color: #000;
  margin-bottom: 15px;
}
.easy-seed-setting-panel .panel-content-wrap{
  margin-top: 200px;
  max-width: 800px;
  box-sizing: border-box;
  margin: 50px auto;
  border-radius: 8px;
  background: #fff;
  position: relative;
  text-align:center;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  padding: 20px 10px 10px 20px;
}
.easy-seed-setting-panel .panel-content{
  height: 500px;
  overflow-y: auto;
}
.easy-seed-setting-panel .panel-content ul{
  list-style: none;
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0 10px;
}
.easy-seed-setting-panel .panel-content li{
  width: 90px;
  text-align: left;
  margin-bottom: 10px;
}
.easy-seed-setting-panel .panel-content label{
  cursor: pointer;
  color: #000 !important;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.easy-seed-setting-panel .panel-content label input{
  margin: 0;
  margin-right: 3px;
  padding:0;
}
.panel-content p{
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
}
.easy-seed-setting-panel button{
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin:0;
  margin-right: 5px;
  margin-bottom: 10px;
}
.easy-seed-setting-panel button:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff
}
.easy-seed-setting-panel .confirm-btns {
  padding-top: 15px;
}
.easy-seed-setting-panel .img-upload-setting{
  margin-bottom: 10px;
}
.easy-seed-setting-panel .img-upload-setting label{
  justify-content: center;
}
.easy-seed-setting-panel .img-upload-setting label input{
  margin-left: 8px;
  margin-right: 8px;
}
.easy-seed-setting-panel .img-upload-setting label a{
  color: #000;
  font-weight: 500;
}
.easy-seed-setting-panel .img-upload-setting label a:hover{
  color: #f7d584;
}
.feature-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 50px;
}
.feature-list .site-enable-setting{
  width: 250px;
  padding-top: 5px;
  margin-bottom: 8px;
  text-align: center;
}
.easy-seed-setting-panel .save-setting-btn{
  background-color: #007bff;
  border-color: #007bff;
  color:#fff;
}
.easy-seed-setting-panel .save-setting-btn:hover{
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff
}
.ptp-api-key-btn{
  text-align: center;
}
.easy-notification{
  box-sizing: border-box;
  position: fixed;
  transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
  overflow: hidden;
  right:0;
  margin: 0 24px 0 0;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  z-index: 2010;
}
.easy-notification-enter{
  right: 16px;
  transform: translateX(0);
}
.easy-notification-notice{
    position: relative;
    width: 300px;
    max-width: calc(100vw - 48px);
    margin-bottom: 16px;
    margin-left: auto;
    padding: 16px 24px;
    overflow: hidden;
    line-height: 1.5715;
    word-wrap: break-word;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.notification-message {
  margin-bottom: 8px;
  color: #000000d9;
  font-size: 16px;
  line-height: 24px;
}

.notification-description{
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  text-align: justify;
  padding-right: 10px;
}

.notification-description p {
  margin: 0
}

.easy-notification-notice-close svg {
  height: 14px;
  width: 14px;
  font-size: 14px
}
.easy-notification-notice-close {
  position: absolute;
  top: 13px;
  right: 15px;
  cursor: pointer;
  color: #909399;
  font-size: 16px
}

.easy-notification-notice-close:hover {
  color: #606266
}
#transfer-progress{
  display: none;
}
.custom-site{
  display: flex;
  align-items: center;
  width: 100%;
}
.custom-site h4{
  flex-shrink: 0;
  margin: 0;
  line-height: initial;
  margin-right: 10px;
}
.custom-site .easy-seed-function-list{
  flex: 1;
}
.custom-site img{
  border-radius: 0px;
}
tr.pad[id*="torrent_"]{
  font-family: 'Proxima Nova','Lato','Segoe UI',sans-serif;
}
.easy-seed-function-list .copy-img{
  margin-left: 5px;
}
.quick-search{
  cursor: pointer;
  color: #409eff;
  font-weight: 600;
}
.ptp-title-wrapper{
  position: relative;
}
#seed-dom .ptp-title-wrapper h4{
  position: absolute;
  left:0;
  top: 0;
  margin: 0 !important;
  display: flex !important;
  align-items: center;
  line-height: 24px;
}
#seed-dom .ptp-title-wrapper .site-list li:first-child{
  padding: 0;
  padding-left: 80px;
}
#seed-dom .ptp-title-wrapper .search-list li:first-child{
  padding-left: 65px;
}
#seed-dom.use-eng .ptp-title-wrapper .site-list li:first-child{
  padding: 0;
  padding-left: 90px;
}
#seed-dom.use-eng  .ptp-title-wrapper .search-list li:first-child{
  padding-left: 85px;
}
#batch-search-btn{
  color: #409eff;
  padding-left: 0;
  padding-right: 0;
  font-weight: 600;
  cursor: pointer;
}
.douban-config {
  display: flex;
  justify-content: center;
}
.douban-config textarea{
  resize: none;
  width: 300px;
  height: 100px;
  margin-left: 6px;
}
`);

  // src/components/Container.tsx
  init_preact_shim();

  // src/components/FunctionList.tsx
  init_preact_shim();

  // src/components/Douban.tsx
  init_preact_shim();
  var getTvSeasonData2 = async (data) => {
    var _a3, _b2;
    const { title: torrentTitle } = TORRENT_INFO;
    const { season = "", title } = data;
    if (season) {
      const seasonNumber = (_b2 = (_a3 = torrentTitle.match(/S(?!eason)?0?(\d+)\.?(EP?\d+)?/i)) == null ? void 0 : _a3[1]) != null ? _b2 : "1";
      if (parseInt(seasonNumber, 10) === 1) {
        return data;
      }
      const query = title.replace(/第.+?季/, `\u7B2C${seasonNumber}\u5B63`);
      const response = await getDoubanIdByIMDB(query);
      return response;
    }
  };
  var updateTorrentInfo = (data) => {
    var _a3, _b2;
    const desc = data.format;
    TORRENT_INFO.doubanInfo = data.format;
    TORRENT_INFO.subtitle = getSubTitle(data);
    const areaMatch = (_b2 = (_a3 = desc == null ? void 0 : desc.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a3[2]) != null ? _b2 : "";
    if (areaMatch) {
      TORRENT_INFO.area = getAreaCode(areaMatch);
    }
    const category = TORRENT_INFO.category;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  };
  var Douban = () => {
    const [btnText, setBtnText] = d2("\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB");
    const [bookBtnText, setBookBtnText] = d2("\u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB");
    const [btnDisable, setBtnDisable] = d2(false);
    const [searchValue, setSearchValue] = d2("");
    const doubanClosed = GM_getValue("easy-seed.douban-closed") || "";
    const { needDoubanBookInfo, needDoubanInfo } = CURRENT_SITE_INFO;
    const showSearch = (needDoubanBookInfo || needDoubanInfo || !TORRENT_INFO.doubanUrl) && !doubanClosed;
    const getDoubanData = async () => {
      try {
        setBtnText("\u83B7\u53D6\u4E2D...");
        setBtnDisable(true);
        const scriptDoubanLink = jQuery(".douban-dom").attr("douban-link");
        const doubanLink = jQuery(".page__title>a").attr("href") || scriptDoubanLink || TORRENT_INFO.doubanUrl || searchValue;
        let doubanUrl = "";
        if (doubanLink && doubanLink.match(/movie\.douban\.com/)) {
          doubanUrl = doubanLink;
        } else {
          const { imdbUrl, movieName } = TORRENT_INFO;
          const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
          if (doubanData) {
            let { id, season = "" } = doubanData;
            if (season) {
              const tvData = await getTvSeasonData2(doubanData);
              if (tvData) {
                id = tvData.id;
              }
            }
            doubanUrl = `https://movie.douban.com/subject/${id}`;
          }
        }
        if (doubanUrl) {
          TORRENT_INFO.doubanUrl = doubanUrl;
          setSearchValue(doubanUrl);
          if (!TORRENT_INFO.description.match(/(片|译)\s*名/)) {
            const movieData = await getDoubanInfo(doubanUrl);
            if (movieData) {
              Notification_default2.open({
                message: $t("\u6210\u529F"),
                description: $t("\u83B7\u53D6\u6210\u529F")
              });
              updateTorrentInfo(movieData);
            }
          } else {
            Notification_default2.open({
              message: $t("\u6210\u529F"),
              description: $t("\u83B7\u53D6\u6210\u529F")
            });
          }
        }
      } catch (error) {
      } finally {
        setBtnText("\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB");
        setBtnDisable(false);
      }
    };
    const getBookData = () => {
      let { doubanUrl } = TORRENT_INFO;
      if (!doubanUrl) {
        doubanUrl = searchValue;
      } else {
        setSearchValue(doubanUrl);
      }
      if (doubanUrl) {
        setBookBtnText("\u83B7\u53D6\u4E2D...");
        setBtnDisable(true);
        getDoubanBookInfo(doubanUrl).then((data) => {
          if (data) {
            TORRENT_INFO.title = data.chineseTitle || data.foreignTitle;
            TORRENT_INFO.poster = data.poster;
            TORRENT_INFO.description = data.book_intro || "";
            TORRENT_INFO.doubanBookInfo = data || null;
          }
          Notification_default2.open({
            message: $t("\u6210\u529F"),
            description: $t("\u83B7\u53D6\u6210\u529F")
          });
        }).catch((error) => {
          console.log(error);
          Notification_default2.open({
            message: $t("\u9519\u8BEF"),
            description: error.message
          });
        }).finally(() => {
          setBookBtnText("\u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB");
          setBtnDisable(false);
        });
      } else {
        Notification_default2.open({
          message: $t("\u9519\u8BEF"),
          description: $t("\u7F3A\u5C11\u8C46\u74E3\u94FE\u63A5")
        });
      }
    };
    return showSearch ? /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("div", {
      className: "function-list-item"
    }, /* @__PURE__ */ v("div", {
      className: "douban-section"
    }, /* @__PURE__ */ v("input", {
      type: "text",
      placeholder: $t("\u624B\u52A8\u8F93\u5165\u8C46\u74E3\u94FE\u63A5"),
      value: searchValue,
      onChange: (e3) => setSearchValue(e3.target.value)
    }))), /* @__PURE__ */ v("div", {
      className: "function-list-item"
    }, /* @__PURE__ */ v("div", {
      className: "douban-section"
    }, showSearch && CURRENT_SITE_NAME !== "SoulVoice" && /* @__PURE__ */ v("button", {
      id: "douban-info",
      disabled: btnDisable,
      className: btnDisable ? "is-disabled" : "",
      onClick: getDoubanData
    }, $t(btnText)), showSearch && CURRENT_SITE_NAME === "SoulVoice" && /* @__PURE__ */ v("button", {
      disabled: btnDisable,
      className: btnDisable ? "is-disabled" : "",
      id: "douban-book-info",
      onClick: getBookData
    }, $t(bookBtnText))))) : null;
  };
  var Douban_default = Douban;

  // src/components/Transfer.tsx
  init_preact_shim();
  var Transfer = () => {
    const [imgHost, setImgHost] = d2("imgbox");
    const [btnDisable, setBtnDisable] = d2(false);
    const [btnText, setBtnText] = d2("\u8F6C\u7F29\u7565\u56FE");
    const [progress, setProgress] = d2(-1);
    const [imgList, setImgList] = d2([]);
    const getThumbnailImgs = async () => {
      var _a3, _b2, _c;
      try {
        const comparisons = TORRENT_INFO.comparisons || [];
        const allImgs = TORRENT_INFO.screenshots.concat(...comparisons.map((v3) => v3.imgs));
        const imgList2 = [...new Set(allImgs)];
        setImgList(imgList2);
        if (imgList2.length < 1) {
          throw new Error($t("\u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25"));
        }
        setBtnText("\u8F6C\u6362\u4E2D...");
        setBtnDisable(true);
        setProgress(0);
        const hostMap = {
          imgbb: "https://imgbb.com/json",
          gifyu: "https://gifyu.com/json",
          pixhost: "https://pixhost.to",
          imgbox: "https://imgbox.com",
          HDB: "https://img.hdbits.org"
        };
        const selectHost = hostMap[imgHost];
        let uploadedImgs = [];
        let authToken, tokenSecret;
        if (imgHost.match(/imgbb|gifyu/)) {
          const rawHtml = await fetch(selectHost.replace("/json", ""), {
            responseType: void 0
          });
          authToken = (_a3 = rawHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(\w+)"/)) == null ? void 0 : _a3[1];
        } else if (imgHost === "imgbox") {
          const rawHtml = await fetch("https://imgbox.com", {
            responseType: void 0
          });
          authToken = (_b2 = rawHtml.match(/content="(.+)" name="csrf-token"/)) == null ? void 0 : _b2[1];
          tokenSecret = await fetch("https://imgbox.com/ajax/token/generate", {
            responseType: "json",
            method: "POST",
            headers: {
              "X-CSRF-Token": authToken
            }
          });
        }
        if (imgHost === "HDB") {
          const imgContent = await uploadToHDB(imgList2, TORRENT_INFO.title);
          uploadedImgs = (_c = imgContent == null ? void 0 : imgContent.split("\n")) != null ? _c : [];
        } else {
          for (let index = 0; index < imgList2.length; index++) {
            let data;
            if (imgHost.match(/imgbb|gifyu/)) {
              const transferData = await transferImgs(imgList2[index], authToken, selectHost);
              data = `[url=${transferData.url}][img]${transferData.thumb.url}[/img][/url]`;
            } else if (imgHost === "pixhost") {
              const [transferData] = await uploadToPixhost([imgList2[index]]);
              data = `[url=${transferData.show_url}][img]${transferData.th_url}[/img][/url]`;
            } else if (imgHost === "imgbox") {
              const transferData = await uploadToImgbox(imgList2[index], authToken, tokenSecret);
              data = `[url=${transferData.original_url}][img]${transferData.thumbnail_url}[/img][/url]`;
            }
            if (data) {
              uploadedImgs.push(data);
              setProgress(uploadedImgs.length);
            }
          }
        }
        if (uploadedImgs.length) {
          TORRENT_INFO.screenshots = uploadedImgs.slice(0, TORRENT_INFO.screenshots.length);
          let { description } = TORRENT_INFO;
          imgList2.forEach((img, index) => {
            var _a4, _b3;
            if (img.match(/i\.hdbits\.org/)) {
              const imgId = (_b3 = (_a4 = img.match(/i\.hdbits\.org\/(.+)\./)) == null ? void 0 : _a4[1]) != null ? _b3 : "";
              const urlReg = new RegExp(`\\[url=https://img.hdbits.org/${imgId}\\].+?\\[\\/url\\]
*`, "ig");
              if (description.match(urlReg)) {
                description = description.replace(urlReg, uploadedImgs[index] || "");
              }
            } else if (description.includes(img)) {
              const urlReg = new RegExp(`\\[url=${img}\\].+?\\[\\/url\\]
*`, "ig");
              if (description.match(urlReg)) {
                description = description.replace(urlReg, uploadedImgs[index] || "");
              } else {
                description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]
*`, "ig"), uploadedImgs[index] || "");
              }
            }
          });
          TORRENT_INFO.description = description;
          Notification_default2.open({
            message: $t("\u6210\u529F"),
            description: $t("\u8F6C\u6362\u6210\u529F\uFF01")
          });
        }
      } catch (error) {
        Notification_default2.open({
          message: $t("\u9519\u8BEF"),
          description: error.message
        });
      } finally {
        setBtnText("\u8F6C\u7F29\u7565\u56FE");
        setBtnDisable(false);
      }
    };
    const transferImgClosed = getValue("easy-seed.transfer-img-closed", false) || "";
    return !(transferImgClosed || CURRENT_SITE_NAME === "BTN") ? /* @__PURE__ */ v("div", {
      className: "function-list-item"
    }, /* @__PURE__ */ v("div", {
      className: "upload-section"
    }, /* @__PURE__ */ v("button", {
      className: btnDisable ? "is-disabled" : "",
      onClick: getThumbnailImgs,
      disabled: btnDisable
    }, $t(btnText)), /* @__PURE__ */ v("select", {
      value: imgHost,
      onChange: (e3) => setImgHost(e3.target.value)
    }, /* @__PURE__ */ v("option", {
      value: "imgbox"
    }, "imgbox"), /* @__PURE__ */ v("option", {
      value: "imgbb"
    }, "imgbb"), /* @__PURE__ */ v("option", {
      value: "gifyu"
    }, "gifyu"), /* @__PURE__ */ v("option", {
      value: "pixhost"
    }, "pixhost"), /* @__PURE__ */ v("option", {
      value: "HDB"
    }, "HDB")), /* @__PURE__ */ v("div", {
      id: "transfer-progress",
      hidden: progress < 0
    }, `${progress} / ${imgList.length}`))) : null;
  };
  var Transfer_default = Transfer;

  // src/components/UploadImg.tsx
  init_preact_shim();
  var UploadImg = () => {
    const [selectHost, setSelectHost] = d2("ptpimg");
    const [btnDisable, setBtnDisable] = d2(false);
    const [btnText, setBtnText] = d2("\u8F6C\u5B58\u622A\u56FE");
    const [canCopy, setCanCopy] = d2(false);
    const [screenBBCode, setScreenBBCode] = d2([]);
    const [copyText, setCopyText] = d2("\u62F7\u8D1D");
    const uploadScreenshotsToAnother = async () => {
      var _a3;
      const screenshots = TORRENT_INFO.screenshots;
      setBtnText("\u4E0A\u4F20\u4E2D\uFF0C\u8BF7\u7A0D\u5019...");
      setBtnDisable(true);
      try {
        setCanCopy(false);
        setCopyText("\u62F7\u8D1D");
        const imgData = [];
        if (selectHost === "ptpimg") {
          for (let index = 0; index < screenshots.length; index++) {
            const originalImg = await getOriginalImgUrl(screenshots[index]);
            const data = await saveScreenshotsToPtpimg([originalImg]);
            if (data) {
              imgData.push(data[0]);
            } else {
              return;
            }
          }
        } else {
          const gifyuHtml = await fetch("https://gifyu.com", {
            responseType: void 0
          });
          const authToken = (_a3 = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)) == null ? void 0 : _a3[1];
          for (let index = 0; index < screenshots.length; index++) {
            const originalImg = await getOriginalImgUrl(screenshots[index]);
            const data = await transferImgs(originalImg, authToken, "https://gifyu.com/json");
            if (data) {
              imgData.push(data.url);
            }
          }
        }
        if (imgData.length > 0) {
          Notification_default2.open({
            message: $t("\u6210\u529F"),
            description: ""
          });
        }
        let { description, originalDescription } = TORRENT_INFO;
        TORRENT_INFO.screenshots = imgData;
        const screenBBcodeArray = imgData.map((img) => {
          return `[img]${img}[/img]`;
        });
        setScreenBBCode(screenBBcodeArray);
        setCanCopy(true);
        const allImages = description.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/ig);
        if (allImages && allImages.length > 0) {
          allImages.forEach((img) => {
            if (img.match(/\[url=.+?\]/)) {
              img += "[/url]";
            }
            originalDescription = originalDescription == null ? void 0 : originalDescription.replace(img, "");
            description = description.replace(img, "");
          });
        }
        TORRENT_INFO.originalDescription = `${originalDescription}
${screenBBcodeArray.join("")}`;
        TORRENT_INFO.description = `${description}
${screenBBcodeArray.join("")}`;
      } catch (error) {
        Notification_default2.open({
          message: $t("\u9519\u8BEF"),
          description: error.message
        });
      } finally {
        setBtnText("\u8F6C\u5B58\u622A\u56FE");
        setBtnDisable(false);
      }
    };
    const uploadImgClosed = GM_getValue("easy-seed.upload-img-closed") || "";
    return !(uploadImgClosed || CURRENT_SITE_NAME === "BTN") ? /* @__PURE__ */ v("div", {
      className: "function-list-item"
    }, /* @__PURE__ */ v("div", {
      className: "upload-section"
    }, /* @__PURE__ */ v("button", {
      disabled: btnDisable,
      className: btnDisable ? "is-disabled" : "",
      onClick: uploadScreenshotsToAnother
    }, $t(btnText)), /* @__PURE__ */ v("select", {
      value: selectHost,
      onChange: (e3) => setSelectHost(e3.target.value)
    }, /* @__PURE__ */ v("option", {
      value: "ptpimg"
    }, "ptpimg"), /* @__PURE__ */ v("option", {
      value: "gifyu"
    }, "gifyu")), /* @__PURE__ */ v("button", {
      className: "copy-img",
      hidden: !canCopy,
      onClick: () => {
        GM_setClipboard(screenBBCode.join(""));
        setCopyText("\u5DF2\u62F7\u8D1D");
      }
    }, $t(copyText)))) : null;
  };
  var UploadImg_default = UploadImg;

  // src/components/FunctionList.tsx
  var FunctionList = () => {
    return /* @__PURE__ */ v("section", {
      className: "easy-seed-function-list"
    }, /* @__PURE__ */ v(Douban_default, null), /* @__PURE__ */ v(Transfer_default, null), /* @__PURE__ */ v(UploadImg_default, null));
  };
  var FunctionList_default = FunctionList;

  // src/components/SearchList.tsx
  init_preact_shim();

  // src/components/common.ts
  init_preact_shim();
  var getQuickSearchUrl = (siteName) => {
    const siteInfo = PT_SITE[siteName];
    const searchConfig = siteInfo.search;
    const { params = {}, imdbOptionKey, nameOptionKey, path, replaceKey } = searchConfig;
    let imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
    let searchKeyWord = "";
    const { movieAkaName, movieName, title } = TORRENT_INFO;
    if (imdbId && !siteName.match(/(nzbs.in|HDF|TMDB|豆瓣读书|TeamHD|NPUBits)$/) && siteInfo.siteType !== "AvistaZ") {
      if (replaceKey) {
        searchKeyWord = imdbId.replace(replaceKey[0], replaceKey[1]);
      } else {
        searchKeyWord = imdbId;
      }
    } else {
      searchKeyWord = movieAkaName || movieName || title;
      imdbId = "";
    }
    let searchParams = Object.keys(params).map((key) => {
      return `${key}=${params[key]}`;
    }).join("&");
    if (imdbId) {
      searchParams = searchParams.replace(/\w+={name}&{0,1}?/, "").replace(/{imdb}/, searchKeyWord).replace(/{optionKey}/, imdbOptionKey || "");
    } else {
      if (searchParams.match(/{name}/)) {
        searchParams = searchParams.replace(/\w+={imdb}&{0,1}?/, "").replace(/{name}/, searchKeyWord);
      } else {
        searchParams = searchParams.replace(/{imdb}/, searchKeyWord);
      }
      searchParams = searchParams.replace(/{optionKey}/, nameOptionKey || "");
    }
    let url = `${siteInfo.url + path}${searchParams ? `?${searchParams}` : ""}`;
    if (siteName.match(/nzb|TMDB|豆瓣读书|SubHD|OpenSub/)) {
      url = url.replace(/{name}/, searchKeyWord);
    }
    return url;
  };

  // src/components/SearchList.tsx
  var SearchList = () => {
    const handleSearchClickEvent = (siteName) => {
      let openUrl = "";
      const attrUrl = jQuery(`.search-list li>a[data-site="${siteName}"]`).data("url");
      if (attrUrl) {
        openUrl = attrUrl;
      } else {
        openUrl = getQuickSearchUrl(siteName);
      }
      GM_openInTab(openUrl);
    };
    const searchListSetting = getValue("easy-seed.enabled-search-site-list");
    const searchSitesEnabled = searchListSetting || [];
    const siteFaviconClosed = getValue("easy-seed.site-favicon-closed", false);
    const getSearchSites = () => {
      const commonSites = [];
      const subtitlesSites = [];
      SORTED_SITE_KEYS.forEach((siteName) => {
        const siteInfo = PT_SITE[siteName];
        if (siteInfo.search) {
          if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
            if (siteInfo.siteType === "subtitles") {
              subtitlesSites.push(siteName);
            } else {
              commonSites.push(siteName);
            }
          }
        }
      });
      return {
        commonSites,
        subtitlesSites
      };
    };
    const batchSearchClick = () => {
      const { commonSites, subtitlesSites } = getSearchSites();
      [...commonSites, ...subtitlesSites].forEach((site) => {
        handleSearchClickEvent(site);
      });
    };
    return /* @__PURE__ */ v(d, null, ["commonSites", "subtitlesSites"].map((key, index) => {
      const siteList = getSearchSites()[key];
      return siteList.length > 0 ? /* @__PURE__ */ v("ul", {
        className: "search-list"
      }, siteList.map((siteName) => {
        const siteInfo = PT_SITE[siteName];
        const favIcon = !siteFaviconClosed && siteInfo.icon ? siteInfo.icon : "";
        return /* @__PURE__ */ v("li", {
          key: siteName
        }, /* @__PURE__ */ v("a", {
          "data-site": siteName,
          onClick: () => handleSearchClickEvent(siteName)
        }, !!favIcon && /* @__PURE__ */ v("img", {
          src: favIcon,
          className: "site-icon"
        }), siteName), /* @__PURE__ */ v("span", null, "|"));
      }), index === 0 && /* @__PURE__ */ v("li", {
        id: "batch-search-btn",
        onClick: batchSearchClick,
        title: $t("\u540C\u65F6\u6253\u5F00\u591A\u4E2A\u641C\u7D22\u6807\u7B7E\u9875")
      }, $t("\u6279\u91CF\u68C0\u7D22"))) : "";
    }));
  };
  var SearchList_default = SearchList;

  // src/components/UploadSiteList.tsx
  init_preact_shim();
  var getPTPGroupId = async (imdbUrl) => {
    if (!imdbUrl) {
      return "";
    }
    const imdbId = getIMDBIdByUrl(imdbUrl);
    if (imdbId) {
      const url = `${PT_SITE.PTP.url}/torrents.php?searchstr=${imdbId}&grouping=0&json=noredirect`;
      const data = await fetch(url);
      if (data && data.Movies && data.Movies.length > 0) {
        return data.Movies[0].GroupId;
      }
      return "";
    }
    return "";
  };
  var openBatchSeedTabs = () => {
    const batchSeedSetting = getValue("easy-seed.enabled-batch-seed-sites") || [];
    if (batchSeedSetting.length === 0) {
      Notification_default2.open({
        message: $t("\u9519\u8BEF"),
        description: $t("\u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868")
      });
      return false;
    }
    SORTED_SITE_KEYS.forEach((siteName) => {
      const siteInfo = PT_SITE[siteName];
      const { url, uploadPath = "" } = siteInfo;
      if (siteInfo.asTarget) {
        if (batchSeedSetting.includes(siteName)) {
          const timestamp = `${Date.now()}`;
          GM_setValue("uploadInfo", TORRENT_INFO);
          GM_openInTab(`${url + uploadPath}#timestamp=${timestamp}`);
        }
      }
    });
    Notification_default2.open({
      message: $t("\u6210\u529F"),
      description: $t("\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C")
    });
  };
  var getGPWGroupId = async (imdbUrl) => {
    if (!imdbUrl) {
      return "";
    }
    const imdbId = getIMDBIdByUrl(imdbUrl);
    if (imdbId) {
      const url = `${PT_SITE.GPW.url}/upload.php?action=movie_info&imdbid=${imdbId}&check_only=1`;
      const data = await fetch(url);
      if (data && data.response && data.response.GroupID) {
        return data.response.GroupID;
      }
      return "";
    }
    return "";
  };
  var UploadSiteList = () => {
    const handleSiteClickEvent = async (url) => {
      if (url.match(/hdpost|blutopia|fearnopeer|asiancinema|monikadesign|lst/)) {
        const catMap = {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "1"
        };
        const path = catMap[TORRENT_INFO.category] || "1";
        url = url.replace("1", path);
      }
      if (url.match(/aither/)) {
        const catMap = {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "1",
          concert: "1",
          sport: "9",
          cartoon: "1",
          app: "10",
          ebook: "11",
          magazine: "11",
          audioBook: "14"
        };
        const path = catMap[TORRENT_INFO.category] || "1";
        url = url.replace("1", path);
      }
      if (url.match(/bibliotik/)) {
        const catMap = {
          ebook: "ebooks",
          magazine: "magazines",
          audioBook: "audiobooks"
        };
        url = url.replace("/upload", `/upload/${catMap[TORRENT_INFO.category] || "ebooks"}`);
      }
      if (url.match(PT_SITE.BYR.host)) {
        const catMap = {
          movie: "408",
          tv: "401",
          tvPack: "401",
          documentary: "410",
          concert: "402",
          sport: "409",
          cartoon: "404",
          variety: "405"
        };
        url = url.replace("/upload.php", `/upload.php?type=${catMap[TORRENT_INFO.category]}`);
      }
      if (url.match(PT_SITE.PTP.host)) {
        const groupId = await getPTPGroupId(TORRENT_INFO.imdbUrl);
        url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
      }
      if (url.match(PT_SITE.GPW.host)) {
        const groupId = await getGPWGroupId(TORRENT_INFO.imdbUrl);
        if (groupId) {
          url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
        }
      }
      if (TORRENT_INFO.isForbidden) {
        const result = window.confirm($t("\u672C\u79CD\u5B50\u53EF\u80FD\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F"));
        if (!result) {
          return;
        }
      }
      if (CURRENT_SITE_NAME === "TTG" && !TORRENT_INFO.description) {
        Notification_default2.open({
          description: $t("\u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210")
        });
        return;
      }
      const timestamp = `${Date.now()}`;
      GM_setValue("uploadInfo", TORRENT_INFO);
      url = `${url}#timestamp=${timestamp}`;
      GM_openInTab(url);
    };
    const targetSitesEnabled = getValue("easy-seed.enabled-target-sites") || [];
    const siteFaviconClosed = getValue("easy-seed.site-favicon-closed", false) || "";
    return /* @__PURE__ */ v("ul", {
      className: "site-list"
    }, SORTED_SITE_KEYS.map((siteName) => {
      const siteInfo = PT_SITE[siteName];
      const { url, uploadPath } = siteInfo;
      const favIcon = siteFaviconClosed === "" && siteInfo.icon ? siteInfo.icon : "";
      if (siteInfo.asTarget) {
        if (targetSitesEnabled.length === 0 || targetSitesEnabled.includes(siteName)) {
          return /* @__PURE__ */ v("li", {
            key: siteName
          }, /* @__PURE__ */ v("a", {
            className: "site-item",
            onClick: () => handleSiteClickEvent(`${url}${uploadPath}`)
          }, !!favIcon && /* @__PURE__ */ v("img", {
            src: favIcon,
            className: "site-icon"
          }), siteName), /* @__PURE__ */ v("span", null, "|"));
        }
      }
      return "";
    }), /* @__PURE__ */ v("li", null, /* @__PURE__ */ v("button", {
      id: "batch-seed-btn",
      onClick: openBatchSeedTabs
    }, $t("\u4E00\u952E\u7FA4\u8F6C"))));
  };
  var UploadSiteList_default = UploadSiteList;

  // src/components/SettingPanel.tsx
  init_preact_shim();

  // src/components/conf/index.ts
  init_preact_shim();
  var SiteListConfig = [
    {
      name: "enabled-target-sites",
      class: "target-sites-enable-list",
      title: "\u8F6C\u79CD\u7AD9\u70B9\u542F\u7528",
      key: "targetEnabled"
    },
    {
      name: "enabled-search-site-list",
      class: "search-sites-enable-list",
      title: "\u7AD9\u70B9\u641C\u7D22\u542F\u7528",
      key: "searchEnabled"
    },
    {
      name: "enabled-batch-seed-sites",
      class: "batch-seed-sites-enable-list",
      title: "\u6279\u91CF\u8F6C\u79CD\u542F\u7528",
      key: "batchEnabled",
      des: "\u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9"
    }
  ];
  var FeatureSwitchList = [
    {
      name: "quick-search-closed",
      des: "\u5173\u95ED\u5FEB\u901F\u68C0\u7D22",
      type: "checkbox",
      key: "quickSearchClosed"
    },
    {
      name: "transfer-img-closed",
      des: "\u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD",
      type: "checkbox",
      key: "transferImgClosed"
    },
    {
      name: "upload-img-closed",
      des: "\u5173\u95ED\u8F6C\u5B58ptpimg\u529F\u80FD",
      type: "checkbox",
      key: "uploadImgClosed"
    },
    {
      name: "site-favicon-closed",
      des: "\u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A",
      type: "checkbox",
      key: "siteFaviconClosed"
    },
    {
      name: "thanks-quote-closed",
      des: "\u4E0D\u663E\u793A\u81F4\u8C22\u5185\u5BB9",
      type: "checkbox",
      key: "thanksQuoteClosed"
    },
    {
      name: "douban-closed",
      des: "\u4E0D\u663E\u793A\u8C46\u74E3\u6309\u94AE\u548C\u8C46\u74E3\u94FE\u63A5",
      type: "checkbox",
      key: "doubanClosed"
    }
  ];

  // src/components/SettingPanel.tsx
  var SettingPanel = (props) => {
    const getSiteSetList = () => {
      const targetSitesEnabled = getValue("easy-seed.enabled-target-sites") || [];
      const batchSeedSiteEnabled = getValue("easy-seed.enabled-batch-seed-sites") || [];
      const searchSitesEnabled = getValue("easy-seed.enabled-search-site-list") || [];
      return SORTED_SITE_KEYS.map((site) => {
        const targetEnabled = targetSitesEnabled.includes(site);
        const batchEnabled = batchSeedSiteEnabled.includes(site);
        const searchEnabled = searchSitesEnabled.includes(site);
        return {
          site,
          targetEnabled,
          batchEnabled,
          searchEnabled
        };
      });
    };
    const getFeatureList = () => {
      return FeatureSwitchList.map((feature) => {
        const isChecked = getValue(`easy-seed.${feature.name}`, false) || false;
        return __spreadProps(__spreadValues({}, feature), {
          checked: !!isChecked
        });
      });
    };
    const featureList = getFeatureList();
    const siteList = getSiteSetList();
    const { closePanel } = props;
    const [ptpImgApiKey, setPtpImgApiKey] = d2(getValue("easy-seed.ptp-img-api-key", false) || "");
    const [doubanCookie, setDoubanCookie] = d2(getValue("easy-seed.douban-cookie", false) || "");
    const saveSetting = () => {
      const targetSitesEnabled = [];
      const searchSitesEnabled = [];
      const batchSeedSiteEnabled = [];
      siteList.forEach(({ site, targetEnabled, batchEnabled, searchEnabled }) => {
        if (batchEnabled) {
          batchSeedSiteEnabled.push(site);
        }
        if (searchEnabled) {
          searchSitesEnabled.push(site);
        }
        if (targetEnabled) {
          targetSitesEnabled.push(site);
        }
      });
      try {
        GM_setValue("easy-seed.enabled-target-sites", JSON.stringify(targetSitesEnabled));
        GM_setValue("easy-seed.enabled-search-site-list", JSON.stringify(searchSitesEnabled));
        GM_setValue("easy-seed.enabled-batch-seed-sites", JSON.stringify(batchSeedSiteEnabled));
        GM_setValue("easy-seed.ptp-img-api-key", ptpImgApiKey);
        GM_setValue("easy-seed.douban-cookie", doubanCookie);
        featureList.forEach((feature) => {
          GM_setValue(`easy-seed.${feature.name}`, feature.checked ? "checked" : "");
        });
        window.location.reload();
      } catch (error) {
        Notification_default2.open({
          message: $t("\u9519\u8BEF"),
          description: $t("\u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25")
        });
      }
    };
    const handleCheckChange = (key, index) => {
      const siteInfo = siteList[index];
      siteInfo[key] = !siteInfo[key];
      siteList[index] = siteInfo;
    };
    const handleFeatureChange = (index) => {
      const featureInfo = featureList[index];
      featureInfo.checked = !featureInfo.checked;
      featureList[index] = featureInfo;
    };
    return /* @__PURE__ */ v("div", {
      className: "easy-seed-setting-panel"
    }, /* @__PURE__ */ v("div", {
      className: "panel-content-wrap"
    }, /* @__PURE__ */ v("div", {
      className: "panel-content"
    }, SiteListConfig.map((config) => {
      return /* @__PURE__ */ v("div", {
        key: config.name
      }, /* @__PURE__ */ v("h3", null, $t(config.title)), config.des && /* @__PURE__ */ v("p", null, $t(config.des)), /* @__PURE__ */ v("section", {
        className: "site-enable-setting"
      }, /* @__PURE__ */ v("ul", {
        className: config.class
      }, siteList.map((siteInfo, index) => {
        const siteData = PT_SITE[siteInfo.site];
        if (siteData.asTarget && config.key !== "searchEnabled" || config.key === "searchEnabled" && siteData.search) {
          return /* @__PURE__ */ v("li", {
            key: siteInfo.site
          }, /* @__PURE__ */ v("label", null, /* @__PURE__ */ v("input", {
            onChange: () => handleCheckChange(config.key, index),
            name: "target-site-enabled",
            type: "checkbox",
            checked: siteInfo[config.key]
          }), siteInfo.site));
        }
        return "";
      }))));
    }), /* @__PURE__ */ v("h3", null, $t("\u56FE\u5E8A\u914D\u7F6E")), /* @__PURE__ */ v("section", {
      className: "site-enable-setting img-upload-setting"
    }, /* @__PURE__ */ v("label", null, "ptpimg ApiKey:", /* @__PURE__ */ v("input", {
      name: "ptp-img-api-key",
      type: "text",
      value: ptpImgApiKey,
      onChange: (e3) => setPtpImgApiKey(e3.target.value)
    }), /* @__PURE__ */ v("a", {
      target: "_blank",
      href: "https://github.com/techmovie/easy-seed/wiki/%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96ptpimg%E7%9A%84apiKey",
      rel: "noreferrer"
    }, $t("\u5982\u4F55\u83B7\u53D6\uFF1F")))), /* @__PURE__ */ v("h3", null, $t("\u989D\u5916\u529F\u80FD\u5173\u95ED")), /* @__PURE__ */ v("div", {
      className: "feature-list"
    }, featureList.map((feature, index) => {
      return /* @__PURE__ */ v("section", {
        className: "site-enable-setting",
        key: feature.name
      }, /* @__PURE__ */ v("label", null, /* @__PURE__ */ v("input", {
        onChange: () => handleFeatureChange(index),
        name: feature.name,
        type: feature.type,
        checked: feature.checked
      }), $t(feature.des)));
    })), /* @__PURE__ */ v("h3", null, $t("\u8C46\u74E3\u914D\u7F6E")), /* @__PURE__ */ v("div", {
      className: "douban-config"
    }, /* @__PURE__ */ v("label", null, $t("\u8C46\u74E3Cookie"), /* @__PURE__ */ v("textarea", {
      value: doubanCookie,
      onChange: (e3) => setDoubanCookie(e3.target.value)
    })))), /* @__PURE__ */ v("div", {
      className: "confirm-btns"
    }, /* @__PURE__ */ v("button", {
      onClick: closePanel
    }, $t("\u53D6\u6D88")), /* @__PURE__ */ v("button", {
      onClick: saveSetting,
      className: "save-setting-btn"
    }, $t("\u4FDD\u5B58")))));
  };
  var SettingPanel_default = SettingPanel;

  // src/assets/setting.svg
  init_preact_shim();
  var SvgSetting = (props) => /* @__PURE__ */ v("svg", __spreadValues({
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    width: 200,
    height: 200
  }, props), /* @__PURE__ */ v("path", {
    d: "M636.211 847.77c5.735-42.548 39.885-76.75 82.432-82.381 20.122-2.663 39.22.87 55.655 9.011 32.563 16.077 72.345 4.864 92.313-25.395a375.948 375.948 0 0 0 22.221-38.4c16.691-33.127 4.813-72.807-25.754-93.85a79.944 79.944 0 0 1-4.198-3.072c-34.202-26.265-46.848-73.216-30.26-113.05 7.732-18.636 20.327-33.28 35.482-43.417 30.31-20.275 40.704-60.467 24.218-92.98a383.375 383.375 0 0 0-19.302-33.74c-20.224-31.54-60.468-42.138-94.516-26.42a102.363 102.363 0 0 1-4.761 2.049c-39.936 15.974-86.63 2.97-112.487-31.437-12.083-16.077-18.33-34.304-19.404-52.429-2.15-36.505-31.693-65.69-68.148-67.993a388.598 388.598 0 0 0-47.974-.052c-36.915 2.253-65.178 32.205-68.25 69.07-.153 1.689-.307 3.378-.563 5.068-5.734 42.394-39.731 76.442-82.073 82.227-20.02 2.714-39.066-.717-55.45-8.704-32.563-15.82-72.192-4.505-92.006 25.754a386.852 386.852 0 0 0-22.17 38.502c-16.538 32.973-4.864 72.397 25.395 93.543a120.61 120.61 0 0 1 4.096 3.02c33.69 26.112 46.131 72.397 30.106 111.872-7.629 18.79-20.173 33.639-35.38 43.93-29.951 20.275-39.884 60.211-23.603 92.467 5.94 11.725 12.39 23.091 19.456 34.1 20.07 31.385 59.956 42.035 93.901 26.623a76.381 76.381 0 0 1 4.71-1.996c39.68-15.668 85.863-2.765 111.668 31.232 12.288 16.23 18.637 34.61 19.712 52.94 2.099 36.352 31.744 65.23 68.096 67.687 8.601.563 17.254.87 25.958.87 7.475 0 14.9-.205 22.323-.665 36.813-2.15 65.024-32.103 68.096-68.864.052-1.69.256-3.43.461-5.12z",
    fill: "#FFF7E6"
  }), /* @__PURE__ */ v("path", {
    d: "M387.994 514.816a127.795 127.795 0 1 0 255.59 0 127.795 127.795 0 1 0-255.59 0Z",
    fill: "#FD973F"
  }), /* @__PURE__ */ v("path", {
    d: "M515.789 668.211c-84.583 0-153.395-68.813-153.395-153.395 0-84.582 68.812-153.395 153.395-153.395s153.395 68.813 153.395 153.395c-.051 84.582-68.813 153.395-153.395 153.395zm0-255.539c-56.32 0-102.195 45.824-102.195 102.195s45.824 102.195 102.195 102.195 102.195-45.824 102.195-102.195-45.875-102.195-102.195-102.195zm370.38 24.525c-6.041 0-12.083-2.1-16.947-6.4a25.6 25.6 0 0 1-2.201-36.147c14.899-16.845 18.073-41.575 7.936-61.543a388.557 388.557 0 0 0-20.224-35.328c-12.442-19.405-35.533-29.03-58.778-24.576a25.605 25.605 0 0 1-29.952-20.326 25.605 25.605 0 0 1 20.327-29.952c43.98-8.397 87.705 10.086 111.513 47.206a437.184 437.184 0 0 1 22.784 39.834c19.559 38.553 13.415 86.22-15.257 118.63-5.12 5.683-12.135 8.602-19.2 8.602z",
    fill: "#44454A"
  }), /* @__PURE__ */ v("path", {
    d: "M515.789 968.448c-10.189 0-20.48-.358-30.618-1.024-53.709-3.635-96.563-46.387-99.635-99.43-.922-16.18-6.758-31.693-16.794-44.954-21.913-28.877-60.774-39.731-94.515-26.42a46.724 46.724 0 0 0-3.993 1.69c-50.125 22.784-107.623 6.298-136.704-39.116a459.955 459.955 0 0 1-22.938-40.244c-24.064-47.667-9.114-105.984 34.816-135.68 13.363-9.062 23.757-21.964 30.003-37.324 13.62-33.536 3.175-72.448-25.497-94.72a78.127 78.127 0 0 0-3.533-2.612c-45.005-31.436-60.365-88.883-36.506-136.55a450.35 450.35 0 0 1 26.163-45.466c29.236-44.646 87.296-60.825 135.015-37.683 14.438 7.015 30.72 9.523 47.104 7.322 35.993-4.915 64.563-33.536 69.478-69.632a61.27 61.27 0 0 0 .461-4.301c4.66-54.886 46.643-97.075 99.942-100.352 18.688-1.126 37.837-1.126 56.628.102 53.76 3.43 96.665 46.336 99.788 99.79.922 15.974 6.656 31.385 16.487 44.543 14.438 19.2 37.632 31.232 62.157 32.205 14.13.563 25.139 12.493 24.576 26.573-.564 14.131-12.698 25.088-26.573 24.576-40.295-1.587-77.159-20.787-101.069-52.685-15.923-21.197-25.14-46.182-26.675-72.243-1.639-27.648-23.962-49.869-51.917-51.661-16.64-1.075-33.69-1.075-50.227-.051-27.7 1.69-49.613 24.166-52.07 53.453-.205 2.252-.461 4.608-.769 6.912-7.987 58.828-54.579 105.472-113.305 113.51-26.42 3.584-52.787-.563-76.39-11.98-24.628-11.93-54.682-3.534-69.837 19.66a404.157 404.157 0 0 0-23.194 40.294c-12.39 24.781-3.994 54.938 20.02 71.68a144.56 144.56 0 0 1 5.631 4.148c46.643 36.198 63.744 99.737 41.472 154.419-10.086 24.78-26.931 45.67-48.742 60.416-22.63 15.309-30.26 45.517-17.818 70.246 6.144 12.186 13.005 24.167 20.378 35.687 15.257 23.808 45.67 32.256 72.397 20.172 2.099-.921 4.25-1.843 6.4-2.713 55.04-21.709 118.374-3.994 154.112 43.11 16.23 21.402 25.6 46.592 27.084 72.96 1.588 27.341 23.91 49.408 51.968 51.303a405.713 405.713 0 0 0 50.535.256c27.545-1.588 49.305-24.013 51.763-53.248.205-2.356.46-4.66.768-6.964 7.987-59.136 54.784-105.83 113.818-113.664 26.521-3.532 53.043.768 76.646 12.442 24.627 12.186 54.784 3.84 70.042-19.405 8.499-12.902 16.332-26.419 23.244-40.192 12.544-24.883 3.994-55.142-20.326-71.885a109.227 109.227 0 0 1-5.734-4.198c-47.565-36.557-64.717-100.71-41.728-155.955a25.559 25.559 0 0 1 33.484-13.773 25.559 25.559 0 0 1 13.773 33.485c-13.875 33.382-3.123 73.625 25.651 95.693a58.07 58.07 0 0 0 3.584 2.61c45.62 31.438 61.184 89.14 37.018 137.114a464.45 464.45 0 0 1-26.214 45.312c-29.492 44.75-87.706 60.724-135.476 37.172-14.49-7.168-30.873-9.78-47.257-7.578-35.635 4.71-64.973 34.048-69.786 69.734a67.705 67.705 0 0 0-.46 4.404c-4.557 54.835-46.541 96.972-99.79 100.044-8.755.41-17.612.666-26.316.666z",
    fill: "#44454A"
  }));
  var setting_default = SvgSetting;

  // src/components/Container.tsx
  var Container = () => {
    var _a3, _b2;
    const [settingPanelOpen, setSettingPanelOpen] = d2(false);
    const isNexusPHP = CURRENT_SITE_INFO.siteType.match(/NexusPHP|AvistaZ/) || ((_a3 = CURRENT_SITE_NAME) == null ? void 0 : _a3.match(/BeyondHD|TTG|Blutopia|HDPOST|Aither|ACM|KG|iTS|MDU|LST|fearnopeer/));
    const isHDB = CURRENT_SITE_NAME === "HDBits";
    const baseTitleClass = ["title-td"];
    const baseContentClass = ["easy-seed-td"];
    if (isNexusPHP) {
      baseTitleClass.push("rowhead", "nowrap");
      baseContentClass.push("rowfollow");
    } else if (CURRENT_SITE_NAME === "HDT") {
      baseTitleClass.push("detailsleft");
      baseContentClass.push("detailshash");
    } else if (CURRENT_SITE_NAME === "HDSpace") {
      baseTitleClass.push("header");
      baseContentClass.push("lista");
    } else if (isHDB) {
      baseTitleClass.push("rowfollow", "hdb-td");
      baseContentClass.push("rowfollow", "hdb-td");
    }
    const openSettingPanel = () => {
      setSettingPanelOpen(true);
    };
    const closePanel = () => {
      setSettingPanelOpen(false);
    };
    const checkQuickResult = () => {
      let searchListSetting = getValue("easy-seed.enabled-search-site-list");
      if (searchListSetting.length === 0) {
        searchListSetting = SORTED_SITE_KEYS;
      }
      searchListSetting.forEach(async (site) => {
        var _a4;
        const siteInfo = PT_SITE[site];
        const resultConfig = (_a4 = siteInfo.search) == null ? void 0 : _a4.result;
        const siteUrl = siteInfo.url;
        if (resultConfig) {
          const { list, name, size, url: urlDom } = resultConfig;
          const { title, size: searchSize } = TORRENT_INFO;
          const url = getQuickSearchUrl(site);
          const domString = await fetch(url, {
            responseType: void 0
          });
          const dom = new DOMParser().parseFromString(domString, "text/html");
          const torrentList = jQuery(list, dom);
          const sameTorrent = Array.prototype.find.call(torrentList, (item) => {
            var _a5, _b3, _c, _d, _e;
            let torrentName;
            if (site === "TTG") {
              torrentName = (_c = (_b3 = (_a5 = jQuery(item).find(name).prop("firstChild")) == null ? void 0 : _a5.textContent) == null ? void 0 : _b3.trim()) != null ? _c : "";
            } else {
              torrentName = jQuery(item).find(name).attr("title") || jQuery(item).find(name).text();
            }
            if (site === "TJUPT") {
              const matchArray = torrentName.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
              const realTitle = (_e = (_d = matchArray.filter((item2) => item2.match(/\.| /))) == null ? void 0 : _d[0]) != null ? _e : "";
              torrentName = realTitle.replace(/\[|\]/g, "");
            }
            torrentName = torrentName == null ? void 0 : torrentName.replace(/\s|\./g, "");
            const sizeBytes = getSize(jQuery(item).find(size).text());
            return torrentName === (title == null ? void 0 : title.replace(/\s|\./g, "")) && Math.abs(sizeBytes - searchSize) < Math.pow(1024, 2) * 1e3;
          });
          if (sameTorrent) {
            const url2 = `${siteUrl}/${jQuery(sameTorrent).find(urlDom).attr("href")}`;
            jQuery(`.search-list li>a[data-site=${site}]`).attr("data-url", url2).css("color", "#218380");
          } else {
            jQuery(`.search-list li>a[data-site=${site}]`).css("color", "#D81159");
          }
        }
      });
    };
    const Title = () => {
      return /* @__PURE__ */ v("h4", null, $t("\u4E00\u952E\u8F6C\u79CD"), /* @__PURE__ */ v("span", {
        id: "easy-seed-setting",
        className: "easy-seed-setting-btn"
      }), /* @__PURE__ */ v(setting_default, {
        onClick: openSettingPanel,
        className: "setting-svg"
      }));
    };
    const quickSearchClosed = getValue("easy-seed.quick-search-closed", false) || "";
    return /* @__PURE__ */ v(d, null, CURRENT_SITE_NAME === "HH" && /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("div", {
      class: "font-bold leading-6"
    }, /* @__PURE__ */ v(Title, null)), /* @__PURE__ */ v("div", {
      class: "font-bold leading-6"
    }, /* @__PURE__ */ v(UploadSiteList_default, null)), /* @__PURE__ */ v("div", {
      class: "font-bold leading-6"
    }, $t("\u5FEB\u6377\u64CD\u4F5C")), /* @__PURE__ */ v("div", {
      class: "font-bold leading-6"
    }, /* @__PURE__ */ v(FunctionList_default, null)), /* @__PURE__ */ v("div", {
      class: "font-bold leading-6"
    }, $t("\u5FEB\u901F\u68C0\u7D22")), /* @__PURE__ */ v("div", {
      class: "font-bold leading-6"
    }, /* @__PURE__ */ v(SearchList_default, null))), (isNexusPHP || isHDB || ((_b2 = CURRENT_SITE_NAME) == null ? void 0 : _b2.match(/(HDSpace|HDT)$/))) && /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("tr", {
      className: isHDB ? "hdb-tr" : ""
    }, /* @__PURE__ */ v("td", {
      className: baseTitleClass.join(" ")
    }, /* @__PURE__ */ v(Title, null)), /* @__PURE__ */ v("td", {
      className: baseContentClass.join(" ")
    }, /* @__PURE__ */ v("div", {
      id: "seed-dom",
      className: !USE_CHINESE ? "use-eng" : ""
    }, /* @__PURE__ */ v(UploadSiteList_default, null)))), /* @__PURE__ */ v("tr", {
      className: isHDB ? "hdb-tr" : ""
    }, /* @__PURE__ */ v("td", {
      className: baseTitleClass.join(" ")
    }, /* @__PURE__ */ v("h4", null, $t("\u5FEB\u6377\u64CD\u4F5C"))), /* @__PURE__ */ v("td", {
      className: baseContentClass.join(" ")
    }, /* @__PURE__ */ v(FunctionList_default, null))), !quickSearchClosed && /* @__PURE__ */ v("tr", {
      className: isHDB ? "hdb-tr" : ""
    }, /* @__PURE__ */ v("td", {
      className: baseTitleClass.join(" ")
    }, /* @__PURE__ */ v("h4", {
      className: "quick-search",
      onClick: checkQuickResult
    }, $t("\u5FEB\u901F\u68C0\u7D22"))), /* @__PURE__ */ v("td", {
      className: baseContentClass.join(" ")
    }, /* @__PURE__ */ v(SearchList_default, null)))), CURRENT_SITE_NAME === "Cinematik" && /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("td", {
      className: "rowhead"
    }, /* @__PURE__ */ v(Title, null)), /* @__PURE__ */ v("td", null, /* @__PURE__ */ v(UploadSiteList_default, null))), /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("td", {
      className: "rowhead"
    }, $t("\u5FEB\u6377\u64CD\u4F5C")), /* @__PURE__ */ v("td", null, /* @__PURE__ */ v(FunctionList_default, null))), !quickSearchClosed && /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("td", {
      className: "rowhead"
    }, /* @__PURE__ */ v("h4", {
      className: "quick-search",
      onClick: checkQuickResult
    }, $t("\u5FEB\u901F\u68C0\u7D22"))), /* @__PURE__ */ v("td", null, /* @__PURE__ */ v(SearchList_default, null)))), CURRENT_SITE_NAME === "TeamHD" && /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v(Title, null), /* @__PURE__ */ v("div", {
      className: "easy-seed-td",
      style: { flexWrap: "wrap" }
    }, /* @__PURE__ */ v("div", {
      id: "seed-dom",
      className: !USE_CHINESE ? "use-eng" : ""
    }, /* @__PURE__ */ v(UploadSiteList_default, null)))), /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v("h4", null, $t("\u5FEB\u6377\u64CD\u4F5C")), /* @__PURE__ */ v(FunctionList_default, null)), !quickSearchClosed && /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v("h4", {
      onClick: checkQuickResult
    }, $t("\u5FEB\u901F\u68C0\u7D22")), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v(SearchList_default, null)))), CURRENT_SITE_NAME === "SpeedApp" && /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v(Title, null), /* @__PURE__ */ v("div", {
      className: "easy-seed-td",
      style: { flexWrap: "wrap" }
    }, /* @__PURE__ */ v("div", {
      id: "seed-dom",
      className: !USE_CHINESE ? "use-eng" : ""
    }, /* @__PURE__ */ v(UploadSiteList_default, null)))), /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v("h4", null, $t("\u5FEB\u6377\u64CD\u4F5C")), /* @__PURE__ */ v(FunctionList_default, null)), !quickSearchClosed && /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v("h4", {
      onClick: checkQuickResult
    }, $t("\u5FEB\u901F\u68C0\u7D22")), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v(SearchList_default, null)))), CURRENT_SITE_NAME === "Bdc" && /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("td", {
      colSpan: 4
    }, /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v(Title, null), /* @__PURE__ */ v("div", {
      className: "easy-seed-td",
      style: { flexWrap: "wrap" }
    }, /* @__PURE__ */ v("div", {
      id: "seed-dom",
      className: !USE_CHINESE ? "use-eng" : ""
    }, /* @__PURE__ */ v(UploadSiteList_default, null)))), /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v("h4", null, $t("\u5FEB\u6377\u64CD\u4F5C")), /* @__PURE__ */ v(FunctionList_default, null)), !quickSearchClosed && /* @__PURE__ */ v("div", {
      className: "custom-site"
    }, /* @__PURE__ */ v("h4", {
      onClick: checkQuickResult
    }, $t("\u5FEB\u901F\u68C0\u7D22")), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v(SearchList_default, null)))))), CURRENT_SITE_INFO.siteType === "gazelle" && /* @__PURE__ */ v("div", {
      id: "seed-dom",
      className: ["movie-page__torrent__panel", !USE_CHINESE ? "use-eng" : ""].join(" ")
    }, /* @__PURE__ */ v("div", {
      className: "ptp-title-wrapper"
    }, /* @__PURE__ */ v(Title, null), /* @__PURE__ */ v(UploadSiteList_default, null)), CURRENT_SITE_NAME !== "EMP" && /* @__PURE__ */ v(FunctionList_default, null), /* @__PURE__ */ v("div", {
      class: "ptp-search-list"
    }, !quickSearchClosed && /* @__PURE__ */ v("div", {
      class: "ptp-title-wrapper"
    }, /* @__PURE__ */ v("h4", {
      className: "quick-search",
      onClick: checkQuickResult
    }, $t("\u5FEB\u901F\u68C0\u7D22")), /* @__PURE__ */ v(SearchList_default, null)))), /* @__PURE__ */ v("div", {
      style: { display: settingPanelOpen ? "block" : "none" }
    }, /* @__PURE__ */ v(SettingPanel_default, {
      closePanel
    })));
  };
  var Container_default = Container;

  // src/index.tsx
  var currentSiteInfo6 = CURRENT_SITE_INFO;
  var torrentInfoMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
  var timestampMatchArray = location.hash && location.hash.match(/(^|#)timestamp=([^#]*)(#|$)/);
  var torrentTimestamp = timestampMatchArray && timestampMatchArray.length > 0 ? timestampMatchArray[2] : null;
  var torrentInfoRaw = torrentInfoMatchArray && torrentInfoMatchArray.length > 0 ? torrentInfoMatchArray[2] : null;
  var torrentInfo = null;
  var _a2, _b;
  if (CURRENT_SITE_NAME) {
    fillSearchImdb();
    if (currentSiteInfo6.asTarget) {
      if (torrentInfoRaw) {
        torrentInfo = JSON.parse(decodeURIComponent(torrentInfoRaw));
      } else if (torrentTimestamp) {
        torrentInfo = GM_getValue("uploadInfo");
      }
      fillTargetForm(torrentInfo);
    }
    if (currentSiteInfo6.asSource && !location.href.match(/upload/ig) && !(currentSiteInfo6.search && location.pathname.match(currentSiteInfo6.search.path) && (getUrlParam("imdb") || getUrlParam("name")))) {
      source_default().then(() => {
        console.log(TORRENT_INFO);
      });
      let refNode = jQuery(currentSiteInfo6.seedDomSelector)[0];
      const app = document.createElement("div");
      S(/* @__PURE__ */ v(Container_default, null), app);
      if (["PTP", "BTN", "GPW", "EMP", "RED", "DicMusic", "MTV"].includes(CURRENT_SITE_NAME)) {
        const torrentId = getUrlParam("torrentid");
        if (CURRENT_SITE_NAME === "GPW") {
          refNode = document.querySelector(`#torrent_detail_${torrentId} >td`);
        } else if (CURRENT_SITE_NAME === "EMP") {
          const groupId = getUrlParam("id");
          refNode = document.querySelector(`.groupid_${groupId}.torrentdetails>td`);
        } else if (CURRENT_SITE_NAME === "MTV") {
          refNode = document.querySelector(`#torrentinfo${torrentId}>td`);
        } else {
          refNode = document.querySelector(`#torrent_${torrentId} >td`);
        }
        refNode == null ? void 0 : refNode.prepend(app);
      } else if (CURRENT_SITE_NAME === "UHDBits") {
        const torrentId = getUrlParam("torrentid");
        jQuery(`#torrent_${torrentId} >td`).prepend(document.createElement("blockquote"));
        (_a2 = jQuery(`#torrent_${torrentId} >td blockquote:first`)) == null ? void 0 : _a2.prepend(app);
      } else if (CURRENT_SITE_NAME === "SpeedApp") {
        const div = document.createElement("div");
        div.setAttribute("class", "row col-md-12 mt-5");
        app.setAttribute("class", "card-body card");
        div.appendChild(app);
        (_b = refNode == null ? void 0 : refNode.parentNode) == null ? void 0 : _b.insertBefore(div, refNode);
      } else {
        Array.from(app.childNodes).forEach((child) => {
          var _a3;
          (_a3 = refNode == null ? void 0 : refNode.parentNode) == null ? void 0 : _a3.insertBefore(child, refNode);
        });
      }
    }
  }
})();
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
