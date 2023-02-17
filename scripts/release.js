// var injectUserInfo = {
//     accessToken: ''
// };

/**
 * A = e
 * P = m
 * p = p1
 * v = v1
 * b = l
 * z = z1
 * q = B
 * h = x
 * d = d1
 * x = p
 * h = x
 * T = b
 * C = P
 */

const AppData = {
  cacheData: {
    visitors: 123, // 随便写一个
  },
  auth: {
    user: '12121212121212', // 随便写一个
  },
  globalData: {
    domain: 'https://bdkq.leanpay.cn/',
    service: 'weixin-miniapp-bdkq',
    apiSecret: 'vGpN60+B%V1dZrJxMTm~PdKa$p9-4&z1',
    imgUrlApi: 'http://resource.leanpay.cn/',
    version: 'default',
    shake: !0,
  },
};

function e (A, e, t) {
  return (
    e in A
      ? Object.defineProperty(A, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      })
      : (A[e] = t),
    A
  );
}

function CryptoJS () {
  var t =
    t ||
    (function (t, e) {
      const r =
          Object.create ||
          (function () {
            function t () {}
            return function (e) {
              let r;
              return (t.prototype = e), (r = new t()), (t.prototype = null), r;
            };
          })();
      const i = {};
      const n = (i.lib = {});
      const o = (n.Base = {
        extend (t) {
          const e = r(this);
          return (
            t && e.mixIn(t),
            (e.hasOwnProperty('init') && this.init !== e.init) ||
                (e.init = function () {
                  e.$super.init.apply(this, arguments);
                }),
            (e.init.prototype = e),
            (e.$super = this),
            e
          );
        },
        create () {
          const t = this.extend();
          return t.init.apply(t, arguments), t;
        },
        init () {},
        mixIn (t) {
          for (const e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
          t.hasOwnProperty('toString') && (this.toString = t.toString);
        },
        clone () {
          return this.init.prototype.extend(this);
        },
      });
      var s = (n.WordArray = o.extend({
        init (t, e) {
          (t = this.words = t || []),
          (this.sigBytes = void 0 != e ? e : 4 * t.length);
        },
        toString (t) {
          return (t || a).stringify(this);
        },
        concat (t) {
          const e = this.words;
          const r = t.words;
          const i = this.sigBytes;
          const n = t.sigBytes;
          if ((this.clamp(), i % 4)) {
            for (s = 0; s < n; s++) {
              const o = (r[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
              e[(i + s) >>> 2] |= o << (24 - ((i + s) % 4) * 8);
            }
          } else for (var s = 0; s < n; s += 4) e[(i + s) >>> 2] = r[s >>> 2];
          return (this.sigBytes += n), this;
        },
        clamp () {
          const e = this.words;
          const r = this.sigBytes;
          (e[r >>> 2] &= 4294967295 << (32 - (r % 4) * 8)),
          (e.length = t.ceil(r / 4));
        },
        clone () {
          const t = o.clone.call(this);
          return (t.words = this.words.slice(0)), t;
        },
        random (e) {
          for (var r, i = [], n = 0; n < e; n += 4) {
            const o = (function (e) {
              var e = e;
              let r = 987654321;
              const i = 4294967295;
              return function () {
                let n =
                    (((r = (36969 * (65535 & r) + (r >> 16)) & i) << 16) +
                      (e = (18e3 * (65535 & e) + (e >> 16)) & i)) &
                    i;
                return (
                  (n /= 4294967296), (n += 0.5) * (t.random() > 0.5 ? 1 : -1)
                );
              };
            })(4294967296 * (r || t.random()));
            (r = 987654071 * o()), i.push((4294967296 * o()) | 0);
          }
          return new s.init(i, e);
        },
      }));
      const c = (i.enc = {});
      var a = (c.Hex = {
        stringify (t) {
          for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
            const o = (e[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
            i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16));
          }
          return i.join('');
        },
        parse (t) {
          for (var e = t.length, r = [], i = 0; i < e; i += 2) { r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << (24 - (i % 8) * 4); }
          return new s.init(r, e / 2);
        },
      });
      const h = (c.Latin1 = {
        stringify (t) {
          for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
            const o = (e[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
            i.push(String.fromCharCode(o));
          }
          return i.join('');
        },
        parse (t) {
          for (var e = t.length, r = [], i = 0; i < e; i++) { r[i >>> 2] |= (255 & t.charCodeAt(i)) << (24 - (i % 4) * 8); }
          return new s.init(r, e);
        },
      });
      const l = (c.Utf8 = {
        stringify (t) {
          try {
            return decodeURIComponent(escape(h.stringify(t)));
          } catch (t) {
            throw new Error('Malformed UTF-8 data');
          }
        },
        parse (t) {
          return h.parse(unescape(encodeURIComponent(t)));
        },
      });
      const f = (n.BufferedBlockAlgorithm = o.extend({
        reset () {
          (this._data = new s.init()), (this._nDataBytes = 0);
        },
        _append (t) {
          typeof t === 'string' && (t = l.parse(t)),
          this._data.concat(t),
          (this._nDataBytes += t.sigBytes);
        },
        _process (e) {
          const r = this._data;
          const i = r.words;
          const n = r.sigBytes;
          const o = this.blockSize;
          let c = n / (4 * o);
          const a =
                (c = e ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0)) *
                o;
          const h = t.min(4 * a, n);
          if (a) {
            for (let l = 0; l < a; l += o) this._doProcessBlock(i, l);
            var f = i.splice(0, a);
            r.sigBytes -= h;
          }
          return new s.init(f, h);
        },
        clone () {
          const t = o.clone.call(this);
          return (t._data = this._data.clone()), t;
        },
        _minBufferSize: 0,
      }));
      var u =
          ((n.Hasher = f.extend({
            cfg: o.extend(),
            init (t) {
              (this.cfg = this.cfg.extend(t)), this.reset();
            },
            reset () {
              f.reset.call(this), this._doReset();
            },
            update (t) {
              return this._append(t), this._process(), this;
            },
            finalize (t) {
              return t && this._append(t), this._doFinalize();
            },
            blockSize: 16,
            _createHelper (t) {
              return function (e, r) {
                return new t.init(r).finalize(e);
              };
            },
            _createHmacHelper (t) {
              return function (e, r) {
                return new u.HMAC.init(t, r).finalize(e);
              };
            },
          })),
          (i.algo = {}));
      return i;
    })(Math);
  return (
    (function () {
      function e (t, e, r) {
        for (var n = [], o = 0, s = 0; s < e; s++) {
          if (s % 4) {
            const c = r[t.charCodeAt(s - 1)] << ((s % 4) * 2);
            const a = r[t.charCodeAt(s)] >>> (6 - (s % 4) * 2);
            (n[o >>> 2] |= (c | a) << (24 - (o % 4) * 8)), o++;
          }
        }
        return i.create(n, o);
      }
      const r = t;
      var i = r.lib.WordArray;
      r.enc.Base64 = {
        stringify (t) {
          const e = t.words;
          const r = t.sigBytes;
          const i = this._map;
          t.clamp();
          for (var n = [], o = 0; o < r; o += 3) {
            for (
              let s =
                  (((e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
                  (((e[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) <<
                    8) |
                  ((e[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
                c = 0;
              c < 4 && o + 0.75 * c < r;
              c++
            ) { n.push(i.charAt((s >>> (6 * (3 - c))) & 63)); }
          }
          const a = i.charAt(64);
          if (a) for (; n.length % 4;) n.push(a);
          return n.join('');
        },
        parse (t) {
          let r = t.length;
          const i = this._map;
          let n = this._reverseMap;
          if (!n) {
            n = this._reverseMap = [];
            for (let o = 0; o < i.length; o++) n[i.charCodeAt(o)] = o;
          }
          const s = i.charAt(64);
          if (s) {
            const c = t.indexOf(s);
            c !== -1 && (r = c);
          }
          return e(t, r, n);
        },
        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      };
    })(),
    (function (e) {
      function r (t, e, r, i, n, o, s) {
        const c = t + ((e & r) | (~e & i)) + n + s;
        return ((c << o) | (c >>> (32 - o))) + e;
      }
      function i (t, e, r, i, n, o, s) {
        const c = t + ((e & i) | (r & ~i)) + n + s;
        return ((c << o) | (c >>> (32 - o))) + e;
      }
      function n (t, e, r, i, n, o, s) {
        const c = t + (e ^ r ^ i) + n + s;
        return ((c << o) | (c >>> (32 - o))) + e;
      }
      function o (t, e, r, i, n, o, s) {
        const c = t + (r ^ (e | ~i)) + n + s;
        return ((c << o) | (c >>> (32 - o))) + e;
      }
      const s = t;
      const c = s.lib;
      const a = c.WordArray;
      const h = c.Hasher;
      const l = s.algo;
      const f = [];
      !(function () {
        for (let t = 0; t < 64; t++) { f[t] = (4294967296 * e.abs(e.sin(t + 1))) | 0; }
      })();
      const u = (l.MD5 = h.extend({
        _doReset () {
          this._hash = new a.init([
            1732584193, 4023233417, 2562383102, 271733878,
          ]);
        },
        _doProcessBlock (t, e) {
          for (let s = 0; s < 16; s++) {
            const c = e + s;
            const a = t[c];
            t[c] =
              (16711935 & ((a << 8) | (a >>> 24))) |
              (4278255360 & ((a << 24) | (a >>> 8)));
          }
          const h = this._hash.words;
          const l = t[e + 0];
          const u = t[e + 1];
          const d = t[e + 2];
          const p = t[e + 3];
          const _ = t[e + 4];
          const v = t[e + 5];
          const y = t[e + 6];
          const g = t[e + 7];
          const B = t[e + 8];
          const w = t[e + 9];
          const k = t[e + 10];
          const S = t[e + 11];
          const m = t[e + 12];
          const x = t[e + 13];
          const b = t[e + 14];
          const H = t[e + 15];
          let z = h[0];
          let A = h[1];
          let C = h[2];
          let D = h[3];
          (A = o(
            (A = o(
              (A = o(
                (A = o(
                  (A = n(
                    (A = n(
                      (A = n(
                        (A = n(
                          (A = i(
                            (A = i(
                              (A = i(
                                (A = i(
                                  (A = r(
                                    (A = r(
                                      (A = r(
                                        (A = r(
                                          A,
                                          (C = r(
                                            C,
                                            (D = r(
                                              D,
                                              (z = r(z, A, C, D, l, 7, f[0])),
                                              A,
                                              C,
                                              u,
                                              12,
                                              f[1],
                                            )),
                                            z,
                                            A,
                                            d,
                                            17,
                                            f[2],
                                          )),
                                          D,
                                          z,
                                          p,
                                          22,
                                          f[3],
                                        )),
                                        (C = r(
                                          C,
                                          (D = r(
                                            D,
                                            (z = r(z, A, C, D, _, 7, f[4])),
                                            A,
                                            C,
                                            v,
                                            12,
                                            f[5],
                                          )),
                                          z,
                                          A,
                                          y,
                                          17,
                                          f[6],
                                        )),
                                        D,
                                        z,
                                        g,
                                        22,
                                        f[7],
                                      )),
                                      (C = r(
                                        C,
                                        (D = r(
                                          D,
                                          (z = r(z, A, C, D, B, 7, f[8])),
                                          A,
                                          C,
                                          w,
                                          12,
                                          f[9],
                                        )),
                                        z,
                                        A,
                                        k,
                                        17,
                                        f[10],
                                      )),
                                      D,
                                      z,
                                      S,
                                      22,
                                      f[11],
                                    )),
                                    (C = r(
                                      C,
                                      (D = r(
                                        D,
                                        (z = r(z, A, C, D, m, 7, f[12])),
                                        A,
                                        C,
                                        x,
                                        12,
                                        f[13],
                                      )),
                                      z,
                                      A,
                                      b,
                                      17,
                                      f[14],
                                    )),
                                    D,
                                    z,
                                    H,
                                    22,
                                    f[15],
                                  )),
                                  (C = i(
                                    C,
                                    (D = i(
                                      D,
                                      (z = i(z, A, C, D, u, 5, f[16])),
                                      A,
                                      C,
                                      y,
                                      9,
                                      f[17],
                                    )),
                                    z,
                                    A,
                                    S,
                                    14,
                                    f[18],
                                  )),
                                  D,
                                  z,
                                  l,
                                  20,
                                  f[19],
                                )),
                                (C = i(
                                  C,
                                  (D = i(
                                    D,
                                    (z = i(z, A, C, D, v, 5, f[20])),
                                    A,
                                    C,
                                    k,
                                    9,
                                    f[21],
                                  )),
                                  z,
                                  A,
                                  H,
                                  14,
                                  f[22],
                                )),
                                D,
                                z,
                                _,
                                20,
                                f[23],
                              )),
                              (C = i(
                                C,
                                (D = i(
                                  D,
                                  (z = i(z, A, C, D, w, 5, f[24])),
                                  A,
                                  C,
                                  b,
                                  9,
                                  f[25],
                                )),
                                z,
                                A,
                                p,
                                14,
                                f[26],
                              )),
                              D,
                              z,
                              B,
                              20,
                              f[27],
                            )),
                            (C = i(
                              C,
                              (D = i(
                                D,
                                (z = i(z, A, C, D, x, 5, f[28])),
                                A,
                                C,
                                d,
                                9,
                                f[29],
                              )),
                              z,
                              A,
                              g,
                              14,
                              f[30],
                            )),
                            D,
                            z,
                            m,
                            20,
                            f[31],
                          )),
                          (C = n(
                            C,
                            (D = n(
                              D,
                              (z = n(z, A, C, D, v, 4, f[32])),
                              A,
                              C,
                              B,
                              11,
                              f[33],
                            )),
                            z,
                            A,
                            S,
                            16,
                            f[34],
                          )),
                          D,
                          z,
                          b,
                          23,
                          f[35],
                        )),
                        (C = n(
                          C,
                          (D = n(
                            D,
                            (z = n(z, A, C, D, u, 4, f[36])),
                            A,
                            C,
                            _,
                            11,
                            f[37],
                          )),
                          z,
                          A,
                          g,
                          16,
                          f[38],
                        )),
                        D,
                        z,
                        k,
                        23,
                        f[39],
                      )),
                      (C = n(
                        C,
                        (D = n(
                          D,
                          (z = n(z, A, C, D, x, 4, f[40])),
                          A,
                          C,
                          l,
                          11,
                          f[41],
                        )),
                        z,
                        A,
                        p,
                        16,
                        f[42],
                      )),
                      D,
                      z,
                      y,
                      23,
                      f[43],
                    )),
                    (C = n(
                      C,
                      (D = n(
                        D,
                        (z = n(z, A, C, D, w, 4, f[44])),
                        A,
                        C,
                        m,
                        11,
                        f[45],
                      )),
                      z,
                      A,
                      H,
                      16,
                      f[46],
                    )),
                    D,
                    z,
                    d,
                    23,
                    f[47],
                  )),
                  (C = o(
                    C,
                    (D = o(
                      D,
                      (z = o(z, A, C, D, l, 6, f[48])),
                      A,
                      C,
                      g,
                      10,
                      f[49],
                    )),
                    z,
                    A,
                    b,
                    15,
                    f[50],
                  )),
                  D,
                  z,
                  v,
                  21,
                  f[51],
                )),
                (C = o(
                  C,
                  (D = o(
                    D,
                    (z = o(z, A, C, D, m, 6, f[52])),
                    A,
                    C,
                    p,
                    10,
                    f[53],
                  )),
                  z,
                  A,
                  k,
                  15,
                  f[54],
                )),
                D,
                z,
                u,
                21,
                f[55],
              )),
              (C = o(
                C,
                (D = o(
                  D,
                  (z = o(z, A, C, D, B, 6, f[56])),
                  A,
                  C,
                  H,
                  10,
                  f[57],
                )),
                z,
                A,
                y,
                15,
                f[58],
              )),
              D,
              z,
              x,
              21,
              f[59],
            )),
            (C = o(
              C,
              (D = o(D, (z = o(z, A, C, D, _, 6, f[60])), A, C, S, 10, f[61])),
              z,
              A,
              d,
              15,
              f[62],
            )),
            D,
            z,
            w,
            21,
            f[63],
          )),
          (h[0] = (h[0] + z) | 0),
          (h[1] = (h[1] + A) | 0),
          (h[2] = (h[2] + C) | 0),
          (h[3] = (h[3] + D) | 0);
        },
        _doFinalize () {
          const t = this._data;
          const r = t.words;
          const i = 8 * this._nDataBytes;
          const n = 8 * t.sigBytes;
          r[n >>> 5] |= 128 << (24 - (n % 32));
          const o = e.floor(i / 4294967296);
          const s = i;
          (r[15 + (((n + 64) >>> 9) << 4)] =
            (16711935 & ((o << 8) | (o >>> 24))) |
            (4278255360 & ((o << 24) | (o >>> 8)))),
          (r[14 + (((n + 64) >>> 9) << 4)] =
              (16711935 & ((s << 8) | (s >>> 24))) |
              (4278255360 & ((s << 24) | (s >>> 8)))),
          (t.sigBytes = 4 * (r.length + 1)),
          this._process();
          for (var c = this._hash, a = c.words, h = 0; h < 4; h++) {
            const l = a[h];
            a[h] =
              (16711935 & ((l << 8) | (l >>> 24))) |
              (4278255360 & ((l << 24) | (l >>> 8)));
          }
          return c;
        },
        clone () {
          const t = h.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        },
      }));
      (s.MD5 = h._createHelper(u)), (s.HmacMD5 = h._createHmacHelper(u));
    })(Math),
    (function () {
      const e = t;
      const r = e.lib;
      const i = r.WordArray;
      const n = r.Hasher;
      const o = [];
      const s = (e.algo.SHA1 = n.extend({
        _doReset () {
          this._hash = new i.init([
            1732584193, 4023233417, 2562383102, 271733878, 3285377520,
          ]);
        },
        _doProcessBlock (t, e) {
          for (
            var r = this._hash.words,
              i = r[0],
              n = r[1],
              s = r[2],
              c = r[3],
              a = r[4],
              h = 0;
            h < 80;
            h++
          ) {
            if (h < 16) o[h] = 0 | t[e + h];
            else {
              const l = o[h - 3] ^ o[h - 8] ^ o[h - 14] ^ o[h - 16];
              o[h] = (l << 1) | (l >>> 31);
            }
            let f = ((i << 5) | (i >>> 27)) + a + o[h];
            (f +=
                h < 20
                  ? 1518500249 + ((n & s) | (~n & c))
                  : h < 40
                    ? 1859775393 + (n ^ s ^ c)
                    : h < 60
                      ? ((n & s) | (n & c) | (s & c)) - 1894007588
                      : (n ^ s ^ c) - 899497514),
            (a = c),
            (c = s),
            (s = (n << 30) | (n >>> 2)),
            (n = i),
            (i = f);
          }
          (r[0] = (r[0] + i) | 0),
          (r[1] = (r[1] + n) | 0),
          (r[2] = (r[2] + s) | 0),
          (r[3] = (r[3] + c) | 0),
          (r[4] = (r[4] + a) | 0);
        },
        _doFinalize () {
          const t = this._data;
          const e = t.words;
          const r = 8 * this._nDataBytes;
          const i = 8 * t.sigBytes;
          return (
            (e[i >>> 5] |= 128 << (24 - (i % 32))),
            (e[14 + (((i + 64) >>> 9) << 4)] = Math.floor(r / 4294967296)),
            (e[15 + (((i + 64) >>> 9) << 4)] = r),
            (t.sigBytes = 4 * e.length),
            this._process(),
            this._hash
          );
        },
        clone () {
          const t = n.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        },
      }));
      (e.SHA1 = n._createHelper(s)), (e.HmacSHA1 = n._createHmacHelper(s));
    })(),
    (function (e) {
      const r = t;
      const i = r.lib;
      const n = i.WordArray;
      const o = i.Hasher;
      const s = r.algo;
      const c = [];
      const a = [];
      !(function () {
        function t (t) {
          return (4294967296 * (t - (0 | t))) | 0;
        }
        for (let r = 2, i = 0; i < 64;) {
          (function (t) {
            for (let r = e.sqrt(t), i = 2; i <= r; i++) if (!(t % i)) return !1;
            return !0;
          })(r) &&
            (i < 8 && (c[i] = t(e.pow(r, 0.5))),
            (a[i] = t(e.pow(r, 1 / 3))),
            i++),
          r++;
        }
      })();
      const h = [];
      const l = (s.SHA256 = o.extend({
        _doReset () {
          this._hash = new n.init(c.slice(0));
        },
        _doProcessBlock (t, e) {
          for (
            var r = this._hash.words,
              i = r[0],
              n = r[1],
              o = r[2],
              s = r[3],
              c = r[4],
              l = r[5],
              f = r[6],
              u = r[7],
              d = 0;
            d < 64;
            d++
          ) {
            if (d < 16) h[d] = 0 | t[e + d];
            else {
              const p = h[d - 15];
              const _ =
                    ((p << 25) | (p >>> 7)) ^
                    ((p << 14) | (p >>> 18)) ^
                    (p >>> 3);
              const v = h[d - 2];
              const y =
                    ((v << 15) | (v >>> 17)) ^
                    ((v << 13) | (v >>> 19)) ^
                    (v >>> 10);
              h[d] = _ + h[d - 7] + y + h[d - 16];
            }
            const g = (i & n) ^ (i & o) ^ (n & o);
            const B =
                  ((i << 30) | (i >>> 2)) ^
                  ((i << 19) | (i >>> 13)) ^
                  ((i << 10) | (i >>> 22));
            const w =
                  u +
                  (((c << 26) | (c >>> 6)) ^
                    ((c << 21) | (c >>> 11)) ^
                    ((c << 7) | (c >>> 25))) +
                  ((c & l) ^ (~c & f)) +
                  a[d] +
                  h[d];
            (u = f),
            (f = l),
            (l = c),
            (c = (s + w) | 0),
            (s = o),
            (o = n),
            (n = i),
            (i = (w + (B + g)) | 0);
          }
          (r[0] = (r[0] + i) | 0),
          (r[1] = (r[1] + n) | 0),
          (r[2] = (r[2] + o) | 0),
          (r[3] = (r[3] + s) | 0),
          (r[4] = (r[4] + c) | 0),
          (r[5] = (r[5] + l) | 0),
          (r[6] = (r[6] + f) | 0),
          (r[7] = (r[7] + u) | 0);
        },
        _doFinalize () {
          const t = this._data;
          const r = t.words;
          const i = 8 * this._nDataBytes;
          const n = 8 * t.sigBytes;
          return (
            (r[n >>> 5] |= 128 << (24 - (n % 32))),
            (r[14 + (((n + 64) >>> 9) << 4)] = e.floor(i / 4294967296)),
            (r[15 + (((n + 64) >>> 9) << 4)] = i),
            (t.sigBytes = 4 * r.length),
            this._process(),
            this._hash
          );
        },
        clone () {
          const t = o.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        },
      }));
      (r.SHA256 = o._createHelper(l)), (r.HmacSHA256 = o._createHmacHelper(l));
    })(Math),
    (function () {
      function e (t) {
        return ((t << 8) & 4278255360) | ((t >>> 8) & 16711935);
      }
      const r = t;
      const i = r.lib.WordArray;
      const n = r.enc;
      n.Utf16 = n.Utf16BE = {
        stringify (t) {
          for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n += 2) {
            const o = (e[n >>> 2] >>> (16 - (n % 4) * 8)) & 65535;
            i.push(String.fromCharCode(o));
          }
          return i.join('');
        },
        parse (t) {
          for (var e = t.length, r = [], n = 0; n < e; n++) { r[n >>> 1] |= t.charCodeAt(n) << (16 - (n % 2) * 16); }
          return i.create(r, 2 * e);
        },
      };
      n.Utf16LE = {
        stringify (t) {
          for (var r = t.words, i = t.sigBytes, n = [], o = 0; o < i; o += 2) {
            const s = e((r[o >>> 2] >>> (16 - (o % 4) * 8)) & 65535);
            n.push(String.fromCharCode(s));
          }
          return n.join('');
        },
        parse (t) {
          for (var r = t.length, n = [], o = 0; o < r; o++) { n[o >>> 1] |= e(t.charCodeAt(o) << (16 - (o % 2) * 16)); }
          return i.create(n, 2 * r);
        },
      };
    })(),
    (function () {
      if (typeof ArrayBuffer === 'function') {
        const e = t.lib.WordArray;
        const r = e.init;
        (e.init = function (t) {
          if (
            (t instanceof ArrayBuffer && (t = new Uint8Array(t)),
            (t instanceof Int8Array ||
              (typeof Uint8ClampedArray !== 'undefined' &&
                t instanceof Uint8ClampedArray) ||
              t instanceof Int16Array ||
              t instanceof Uint16Array ||
              t instanceof Int32Array ||
              t instanceof Uint32Array ||
              t instanceof Float32Array ||
              t instanceof Float64Array) &&
              (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)),
            t instanceof Uint8Array)
          ) {
            for (var e = t.byteLength, i = [], n = 0; n < e; n++) { i[n >>> 2] |= t[n] << (24 - (n % 4) * 8); }
            r.call(this, i, e);
          } else r.apply(this, arguments);
        }).prototype = e;
      }
    })(),
    (function (e) {
      function r (t, e, r) {
        return t ^ e ^ r;
      }
      function i (t, e, r) {
        return (t & e) | (~t & r);
      }
      function n (t, e, r) {
        return (t | ~e) ^ r;
      }
      function o (t, e, r) {
        return (t & r) | (e & ~r);
      }
      function s (t, e, r) {
        return t ^ (e | ~r);
      }
      function c (t, e) {
        return (t << e) | (t >>> (32 - e));
      }
      const a = t;
      const h = a.lib;
      const l = h.WordArray;
      const f = h.Hasher;
      const u = a.algo;
      const d = l.create([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
        6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7,
        0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5,
        6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
      ]);
      const p = l.create([
        5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
        13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
        12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
        14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
      ]);
      const _ = l.create([
        11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
        11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
        15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5,
        6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5,
        6,
      ]);
      const v = l.create([
        8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
        12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14,
        12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9,
        12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
      ]);
      const y = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
      const g = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
      const B = (u.RIPEMD160 = f.extend({
        _doReset () {
          this._hash = l.create([
            1732584193, 4023233417, 2562383102, 271733878, 3285377520,
          ]);
        },
        _doProcessBlock (t, e) {
          for (F = 0; F < 16; F++) {
            const a = e + F;
            const h = t[a];
            t[a] =
                (16711935 & ((h << 8) | (h >>> 24))) |
                (4278255360 & ((h << 24) | (h >>> 8)));
          }
          let l;
          let f;
          let u;
          let B;
          let w;
          let k;
          let S;
          let m;
          let x;
          let b;
          const H = this._hash.words;
          const z = y.words;
          const A = g.words;
          const C = d.words;
          const D = p.words;
          const R = _.words;
          const E = v.words;
          (k = l = H[0]),
          (S = f = H[1]),
          (m = u = H[2]),
          (x = B = H[3]),
          (b = w = H[4]);
          for (var M, F = 0; F < 80; F += 1) {
            (M = (l + t[e + C[F]]) | 0),
            (M +=
                  F < 16
                    ? r(f, u, B) + z[0]
                    : F < 32
                      ? i(f, u, B) + z[1]
                      : F < 48
                        ? n(f, u, B) + z[2]
                        : F < 64
                          ? o(f, u, B) + z[3]
                          : s(f, u, B) + z[4]),
            (M = ((M = c((M |= 0), R[F])) + w) | 0),
            (l = w),
            (w = B),
            (B = c(u, 10)),
            (u = f),
            (f = M),
            (M = (k + t[e + D[F]]) | 0),
            (M +=
                  F < 16
                    ? s(S, m, x) + A[0]
                    : F < 32
                      ? o(S, m, x) + A[1]
                      : F < 48
                        ? n(S, m, x) + A[2]
                        : F < 64
                          ? i(S, m, x) + A[3]
                          : r(S, m, x) + A[4]),
            (M = ((M = c((M |= 0), E[F])) + b) | 0),
            (k = b),
            (b = x),
            (x = c(m, 10)),
            (m = S),
            (S = M);
          }
          (M = (H[1] + u + x) | 0),
          (H[1] = (H[2] + B + b) | 0),
          (H[2] = (H[3] + w + k) | 0),
          (H[3] = (H[4] + l + S) | 0),
          (H[4] = (H[0] + f + m) | 0),
          (H[0] = M);
        },
        _doFinalize () {
          const t = this._data;
          const e = t.words;
          const r = 8 * this._nDataBytes;
          const i = 8 * t.sigBytes;
          (e[i >>> 5] |= 128 << (24 - (i % 32))),
          (e[14 + (((i + 64) >>> 9) << 4)] =
                (16711935 & ((r << 8) | (r >>> 24))) |
                (4278255360 & ((r << 24) | (r >>> 8)))),
          (t.sigBytes = 4 * (e.length + 1)),
          this._process();
          for (var n = this._hash, o = n.words, s = 0; s < 5; s++) {
            const c = o[s];
            o[s] =
                (16711935 & ((c << 8) | (c >>> 24))) |
                (4278255360 & ((c << 24) | (c >>> 8)));
          }
          return n;
        },
        clone () {
          const t = f.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        },
      }));
      (a.RIPEMD160 = f._createHelper(B)),
      (a.HmacRIPEMD160 = f._createHmacHelper(B));
    })(Math),
    (function () {
      const e = t;
      const r = e.lib.Base;
      const i = e.enc.Utf8;
      e.algo.HMAC = r.extend({
        init (t, e) {
          (t = this._hasher = new t.init()),
          typeof e === 'string' && (e = i.parse(e));
          const r = t.blockSize;
          const n = 4 * r;
          e.sigBytes > n && (e = t.finalize(e)), e.clamp();
          for (
            var o = (this._oKey = e.clone()),
              s = (this._iKey = e.clone()),
              c = o.words,
              a = s.words,
              h = 0;
            h < r;
            h++
          ) { (c[h] ^= 1549556828), (a[h] ^= 909522486); }
          (o.sigBytes = s.sigBytes = n), this.reset();
        },
        reset () {
          const t = this._hasher;
          t.reset(), t.update(this._iKey);
        },
        update (t) {
          return this._hasher.update(t), this;
        },
        finalize (t) {
          const e = this._hasher;
          const r = e.finalize(t);
          return e.reset(), e.finalize(this._oKey.clone().concat(r));
        },
      });
    })(),
    (function () {
      const e = t;
      const r = e.lib;
      const i = r.Base;
      const n = r.WordArray;
      const o = e.algo;
      const s = o.SHA1;
      const c = o.HMAC;
      const a = (o.PBKDF2 = i.extend({
        cfg: i.extend({
          keySize: 4,
          hasher: s,
          iterations: 1,
        }),
        init (t) {
          this.cfg = this.cfg.extend(t);
        },
        compute (t, e) {
          for (
            var r = this.cfg,
              i = c.create(r.hasher, t),
              o = n.create(),
              s = n.create([1]),
              a = o.words,
              h = s.words,
              l = r.keySize,
              f = r.iterations;
            a.length < l;

          ) {
            const u = i.update(e).finalize(s);
            i.reset();
            for (let d = u.words, p = d.length, _ = u, v = 1; v < f; v++) {
              (_ = i.finalize(_)), i.reset();
              for (let y = _.words, g = 0; g < p; g++) d[g] ^= y[g];
            }
            o.concat(u), h[0]++;
          }
          return (o.sigBytes = 4 * l), o;
        },
      }));
      e.PBKDF2 = function (t, e, r) {
        return a.create(r).compute(t, e);
      };
    })(),
    (function () {
      const e = t;
      const r = e.lib;
      const i = r.Base;
      const n = r.WordArray;
      const o = e.algo;
      const s = o.MD5;
      const c = (o.EvpKDF = i.extend({
        cfg: i.extend({
          keySize: 4,
          hasher: s,
          iterations: 1,
        }),
        init (t) {
          this.cfg = this.cfg.extend(t);
        },
        compute (t, e) {
          for (
            var r = this.cfg,
              i = r.hasher.create(),
              o = n.create(),
              s = o.words,
              c = r.keySize,
              a = r.iterations;
            s.length < c;

          ) {
            h && i.update(h);
            var h = i.update(t).finalize(e);
            i.reset();
            for (let l = 1; l < a; l++) (h = i.finalize(h)), i.reset();
            o.concat(h);
          }
          return (o.sigBytes = 4 * c), o;
        },
      }));
      e.EvpKDF = function (t, e, r) {
        return c.create(r).compute(t, e);
      };
    })(),
    (function () {
      const e = t;
      const r = e.lib.WordArray;
      const i = e.algo;
      const n = i.SHA256;
      const o = (i.SHA224 = n.extend({
        _doReset () {
          this._hash = new r.init([
            3238371032, 914150663, 812702999, 4144912697, 4290775857,
            1750603025, 1694076839, 3204075428,
          ]);
        },
        _doFinalize () {
          const t = n._doFinalize.call(this);
          return (t.sigBytes -= 4), t;
        },
      }));
      (e.SHA224 = n._createHelper(o)), (e.HmacSHA224 = n._createHmacHelper(o));
    })(),
    (function (e) {
      const r = t;
      const i = r.lib;
      const n = i.Base;
      const o = i.WordArray;
      const s = (r.x64 = {});
      (s.Word = n.extend({
        init (t, e) {
          (this.high = t), (this.low = e);
        },
      })),
      (s.WordArray = n.extend({
        init (t, e) {
          (t = this.words = t || []),
          (this.sigBytes = void 0 != e ? e : 8 * t.length);
        },
        toX32 () {
          for (var t = this.words, e = t.length, r = [], i = 0; i < e; i++) {
            const n = t[i];
            r.push(n.high), r.push(n.low);
          }
          return o.create(r, this.sigBytes);
        },
        clone () {
          for (
            var t = n.clone.call(this),
              e = (t.words = this.words.slice(0)),
              r = e.length,
              i = 0;
            i < r;
            i++
          ) { e[i] = e[i].clone(); }
          return t;
        },
      }));
    })(),
    (function (e) {
      const r = t;
      const i = r.lib;
      const n = i.WordArray;
      const o = i.Hasher;
      const s = r.x64.Word;
      const c = r.algo;
      const a = [];
      const h = [];
      const l = [];
      !(function () {
        for (var t = 1, e = 0, r = 0; r < 24; r++) {
          a[t + 5 * e] = (((r + 1) * (r + 2)) / 2) % 64;
          const i = (2 * t + 3 * e) % 5;
          (t = e % 5), (e = i);
        }
        for (t = 0; t < 5; t++) { for (e = 0; e < 5; e++) h[t + 5 * e] = e + ((2 * t + 3 * e) % 5) * 5; }
        for (let n = 1, o = 0; o < 24; o++) {
          for (var c = 0, f = 0, u = 0; u < 7; u++) {
            if (1 & n) {
              const d = (1 << u) - 1;
              d < 32 ? (f ^= 1 << d) : (c ^= 1 << (d - 32));
            }
            128 & n ? (n = (n << 1) ^ 113) : (n <<= 1);
          }
          l[o] = s.create(c, f);
        }
      })();
      const f = [];
      !(function () {
        for (let t = 0; t < 25; t++) f[t] = s.create();
      })();
      const u = (c.SHA3 = o.extend({
        cfg: o.cfg.extend({
          outputLength: 512,
        }),
        _doReset () {
          for (let t = (this._state = []), e = 0; e < 25; e++) { t[e] = new s.init(); }
          this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
        },
        _doProcessBlock (t, e) {
          for (var r = this._state, i = this.blockSize / 2, n = 0; n < i; n++) {
            let o = t[e + 2 * n];
            let s = t[e + 2 * n + 1];
            (o =
              (16711935 & ((o << 8) | (o >>> 24))) |
              (4278255360 & ((o << 24) | (o >>> 8)))),
            (s =
                (16711935 & ((s << 8) | (s >>> 24))) |
                (4278255360 & ((s << 24) | (s >>> 8)))),
            ((A = r[n]).high ^= s),
            (A.low ^= o);
          }
          for (let c = 0; c < 24; c++) {
            for (z = 0; z < 5; z++) {
              for (var u = 0, d = 0, p = 0; p < 5; p++) { (u ^= (A = r[z + 5 * p]).high), (d ^= A.low); }
              const _ = f[z];
              (_.high = u), (_.low = d);
            }
            for (z = 0; z < 5; z++) {
              for (
                var v = f[(z + 4) % 5],
                  y = f[(z + 1) % 5],
                  g = y.high,
                  B = y.low,
                  u = v.high ^ ((g << 1) | (B >>> 31)),
                  d = v.low ^ ((B << 1) | (g >>> 31)),
                  p = 0;
                p < 5;
                p++
              ) { ((A = r[z + 5 * p]).high ^= u), (A.low ^= d); }
            }
            for (var w = 1; w < 25; w++) {
              const k = (A = r[w]).high;
              const S = A.low;
              const m = a[w];
              if (m < 32) {
                var u = (k << m) | (S >>> (32 - m));
                var d = (S << m) | (k >>> (32 - m));
              } else {
                var u = (S << (m - 32)) | (k >>> (64 - m));
                var d = (k << (m - 32)) | (S >>> (64 - m));
              }
              const x = f[h[w]];
              (x.high = u), (x.low = d);
            }
            const b = f[0];
            const H = r[0];
            (b.high = H.high), (b.low = H.low);
            for (var z = 0; z < 5; z++) {
              for (p = 0; p < 5; p++) {
                var A = r[(w = z + 5 * p)];
                const C = f[w];
                const D = f[((z + 1) % 5) + 5 * p];
                const R = f[((z + 2) % 5) + 5 * p];
                (A.high = C.high ^ (~D.high & R.high)),
                (A.low = C.low ^ (~D.low & R.low));
              }
            }
            var A = r[0];
            const E = l[c];
            (A.high ^= E.high), (A.low ^= E.low);
          }
        },
        _doFinalize () {
          const t = this._data;
          const r = t.words;
          const i = (this._nDataBytes, 8 * t.sigBytes);
          const o = 32 * this.blockSize;
          (r[i >>> 5] |= 1 << (24 - (i % 32))),
          (r[((e.ceil((i + 1) / o) * o) >>> 5) - 1] |= 128),
          (t.sigBytes = 4 * r.length),
          this._process();
          for (
            var s = this._state,
              c = this.cfg.outputLength / 8,
              a = c / 8,
              h = [],
              l = 0;
            l < a;
            l++
          ) {
            const f = s[l];
            let u = f.high;
            let d = f.low;
            (u =
              (16711935 & ((u << 8) | (u >>> 24))) |
              (4278255360 & ((u << 24) | (u >>> 8)))),
            (d =
                (16711935 & ((d << 8) | (d >>> 24))) |
                (4278255360 & ((d << 24) | (d >>> 8)))),
            h.push(d),
            h.push(u);
          }
          return new n.init(h, c);
        },
        clone () {
          for (
            var t = o.clone.call(this),
              e = (t._state = this._state.slice(0)),
              r = 0;
            r < 25;
            r++
          ) { e[r] = e[r].clone(); }
          return t;
        },
      }));
      (r.SHA3 = o._createHelper(u)), (r.HmacSHA3 = o._createHmacHelper(u));
    })(Math),
    (function () {
      function e () {
        return o.create.apply(o, arguments);
      }
      const r = t;
      const i = r.lib.Hasher;
      const n = r.x64;
      var o = n.Word;
      const s = n.WordArray;
      const c = r.algo;
      const a = [
        e(1116352408, 3609767458),
        e(1899447441, 602891725),
        e(3049323471, 3964484399),
        e(3921009573, 2173295548),
        e(961987163, 4081628472),
        e(1508970993, 3053834265),
        e(2453635748, 2937671579),
        e(2870763221, 3664609560),
        e(3624381080, 2734883394),
        e(310598401, 1164996542),
        e(607225278, 1323610764),
        e(1426881987, 3590304994),
        e(1925078388, 4068182383),
        e(2162078206, 991336113),
        e(2614888103, 633803317),
        e(3248222580, 3479774868),
        e(3835390401, 2666613458),
        e(4022224774, 944711139),
        e(264347078, 2341262773),
        e(604807628, 2007800933),
        e(770255983, 1495990901),
        e(1249150122, 1856431235),
        e(1555081692, 3175218132),
        e(1996064986, 2198950837),
        e(2554220882, 3999719339),
        e(2821834349, 766784016),
        e(2952996808, 2566594879),
        e(3210313671, 3203337956),
        e(3336571891, 1034457026),
        e(3584528711, 2466948901),
        e(113926993, 3758326383),
        e(338241895, 168717936),
        e(666307205, 1188179964),
        e(773529912, 1546045734),
        e(1294757372, 1522805485),
        e(1396182291, 2643833823),
        e(1695183700, 2343527390),
        e(1986661051, 1014477480),
        e(2177026350, 1206759142),
        e(2456956037, 344077627),
        e(2730485921, 1290863460),
        e(2820302411, 3158454273),
        e(3259730800, 3505952657),
        e(3345764771, 106217008),
        e(3516065817, 3606008344),
        e(3600352804, 1432725776),
        e(4094571909, 1467031594),
        e(275423344, 851169720),
        e(430227734, 3100823752),
        e(506948616, 1363258195),
        e(659060556, 3750685593),
        e(883997877, 3785050280),
        e(958139571, 3318307427),
        e(1322822218, 3812723403),
        e(1537002063, 2003034995),
        e(1747873779, 3602036899),
        e(1955562222, 1575990012),
        e(2024104815, 1125592928),
        e(2227730452, 2716904306),
        e(2361852424, 442776044),
        e(2428436474, 593698344),
        e(2756734187, 3733110249),
        e(3204031479, 2999351573),
        e(3329325298, 3815920427),
        e(3391569614, 3928383900),
        e(3515267271, 566280711),
        e(3940187606, 3454069534),
        e(4118630271, 4000239992),
        e(116418474, 1914138554),
        e(174292421, 2731055270),
        e(289380356, 3203993006),
        e(460393269, 320620315),
        e(685471733, 587496836),
        e(852142971, 1086792851),
        e(1017036298, 365543100),
        e(1126000580, 2618297676),
        e(1288033470, 3409855158),
        e(1501505948, 4234509866),
        e(1607167915, 987167468),
        e(1816402316, 1246189591),
      ];
      const h = [];
      !(function () {
        for (let t = 0; t < 80; t++) h[t] = e();
      })();
      const l = (c.SHA512 = i.extend({
        _doReset () {
          this._hash = new s.init([
            new o.init(1779033703, 4089235720),
            new o.init(3144134277, 2227873595),
            new o.init(1013904242, 4271175723),
            new o.init(2773480762, 1595750129),
            new o.init(1359893119, 2917565137),
            new o.init(2600822924, 725511199),
            new o.init(528734635, 4215389547),
            new o.init(1541459225, 327033209),
          ]);
        },
        _doProcessBlock (t, e) {
          for (
            var r = this._hash.words,
              i = r[0],
              n = r[1],
              o = r[2],
              s = r[3],
              c = r[4],
              l = r[5],
              f = r[6],
              u = r[7],
              d = i.high,
              p = i.low,
              _ = n.high,
              v = n.low,
              y = o.high,
              g = o.low,
              B = s.high,
              w = s.low,
              k = c.high,
              S = c.low,
              m = l.high,
              x = l.low,
              b = f.high,
              H = f.low,
              z = u.high,
              A = u.low,
              C = d,
              D = p,
              R = _,
              E = v,
              M = y,
              F = g,
              P = B,
              W = w,
              O = k,
              U = S,
              I = m,
              K = x,
              X = b,
              L = H,
              j = z,
              N = A,
              T = 0;
            T < 80;
            T++
          ) {
            const Z = h[T];
            if (T < 16) {
              var q = (Z.high = 0 | t[e + 2 * T]);
              var G = (Z.low = 0 | t[e + 2 * T + 1]);
            } else {
              const J = h[T - 15];
              const $ = J.high;
              const Q = J.low;
              const V =
                  (($ >>> 1) | (Q << 31)) ^ (($ >>> 8) | (Q << 24)) ^ ($ >>> 7);
              const Y =
                  ((Q >>> 1) | ($ << 31)) ^
                  ((Q >>> 8) | ($ << 24)) ^
                  ((Q >>> 7) | ($ << 25));
              const tt = h[T - 2];
              const et = tt.high;
              const rt = tt.low;
              const it =
                  ((et >>> 19) | (rt << 13)) ^
                  ((et << 3) | (rt >>> 29)) ^
                  (et >>> 6);
              const nt =
                  ((rt >>> 19) | (et << 13)) ^
                  ((rt << 3) | (et >>> 29)) ^
                  ((rt >>> 6) | (et << 26));
              const ot = h[T - 7];
              const st = ot.high;
              const ct = ot.low;
              const at = h[T - 16];
              const ht = at.high;
              const lt = at.low;
              var q =
                  (q =
                    (q = V + st + ((G = Y + ct) >>> 0 < Y >>> 0 ? 1 : 0)) +
                    it +
                    ((G = G + nt) >>> 0 < nt >>> 0 ? 1 : 0)) +
                  ht +
                  ((G = G + lt) >>> 0 < lt >>> 0 ? 1 : 0);
              (Z.high = q), (Z.low = G);
            }
            const ft = (O & I) ^ (~O & X);
            const ut = (U & K) ^ (~U & L);
            const dt = (C & R) ^ (C & M) ^ (R & M);
            const pt = (D & E) ^ (D & F) ^ (E & F);
            const _t =
                ((C >>> 28) | (D << 4)) ^
                ((C << 30) | (D >>> 2)) ^
                ((C << 25) | (D >>> 7));
            const vt =
                ((D >>> 28) | (C << 4)) ^
                ((D << 30) | (C >>> 2)) ^
                ((D << 25) | (C >>> 7));
            const yt =
                ((O >>> 14) | (U << 18)) ^
                ((O >>> 18) | (U << 14)) ^
                ((O << 23) | (U >>> 9));
            const gt =
                ((U >>> 14) | (O << 18)) ^
                ((U >>> 18) | (O << 14)) ^
                ((U << 23) | (O >>> 9));
            const Bt = a[T];
            const wt = Bt.high;
            const kt = Bt.low;
            let St = N + gt;
            var mt =
                (mt =
                  (mt =
                    (mt = j + yt + (St >>> 0 < N >>> 0 ? 1 : 0)) +
                    ft +
                    ((St = St + ut) >>> 0 < ut >>> 0 ? 1 : 0)) +
                  wt +
                  ((St = St + kt) >>> 0 < kt >>> 0 ? 1 : 0)) +
                q +
                ((St = St + G) >>> 0 < G >>> 0 ? 1 : 0);
            const xt = vt + pt;
            const bt = _t + dt + (xt >>> 0 < vt >>> 0 ? 1 : 0);
            (j = X),
            (N = L),
            (X = I),
            (L = K),
            (I = O),
            (K = U),
            (O = (P + mt + ((U = (W + St) | 0) >>> 0 < W >>> 0 ? 1 : 0)) | 0),
            (P = M),
            (W = F),
            (M = R),
            (F = E),
            (R = C),
            (E = D),
            (C =
                (mt + bt + ((D = (St + xt) | 0) >>> 0 < St >>> 0 ? 1 : 0)) | 0);
          }
          (p = i.low = p + D),
          (i.high = d + C + (p >>> 0 < D >>> 0 ? 1 : 0)),
          (v = n.low = v + E),
          (n.high = _ + R + (v >>> 0 < E >>> 0 ? 1 : 0)),
          (g = o.low = g + F),
          (o.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0)),
          (w = s.low = w + W),
          (s.high = B + P + (w >>> 0 < W >>> 0 ? 1 : 0)),
          (S = c.low = S + U),
          (c.high = k + O + (S >>> 0 < U >>> 0 ? 1 : 0)),
          (x = l.low = x + K),
          (l.high = m + I + (x >>> 0 < K >>> 0 ? 1 : 0)),
          (H = f.low = H + L),
          (f.high = b + X + (H >>> 0 < L >>> 0 ? 1 : 0)),
          (A = u.low = A + N),
          (u.high = z + j + (A >>> 0 < N >>> 0 ? 1 : 0));
        },
        _doFinalize () {
          const t = this._data;
          const e = t.words;
          const r = 8 * this._nDataBytes;
          const i = 8 * t.sigBytes;
          return (
            (e[i >>> 5] |= 128 << (24 - (i % 32))),
            (e[30 + (((i + 128) >>> 10) << 5)] = Math.floor(r / 4294967296)),
            (e[31 + (((i + 128) >>> 10) << 5)] = r),
            (t.sigBytes = 4 * e.length),
            this._process(),
            this._hash.toX32()
          );
        },
        clone () {
          const t = i.clone.call(this);
          return (t._hash = this._hash.clone()), t;
        },
        blockSize: 32,
      }));
      (r.SHA512 = i._createHelper(l)), (r.HmacSHA512 = i._createHmacHelper(l));
    })(),
    (function () {
      const e = t;
      const r = e.x64;
      const i = r.Word;
      const n = r.WordArray;
      const o = e.algo;
      const s = o.SHA512;
      const c = (o.SHA384 = s.extend({
        _doReset () {
          this._hash = new n.init([
            new i.init(3418070365, 3238371032),
            new i.init(1654270250, 914150663),
            new i.init(2438529370, 812702999),
            new i.init(355462360, 4144912697),
            new i.init(1731405415, 4290775857),
            new i.init(2394180231, 1750603025),
            new i.init(3675008525, 1694076839),
            new i.init(1203062813, 3204075428),
          ]);
        },
        _doFinalize () {
          const t = s._doFinalize.call(this);
          return (t.sigBytes -= 16), t;
        },
      }));
      (e.SHA384 = s._createHelper(c)), (e.HmacSHA384 = s._createHmacHelper(c));
    })(),
    t.lib.Cipher ||
      (function (e) {
        const r = t;
        const i = r.lib;
        const n = i.Base;
        const o = i.WordArray;
        const s = i.BufferedBlockAlgorithm;
        const c = r.enc;
        const a = (c.Utf8, c.Base64);
        const h = r.algo.EvpKDF;
        const l = (i.Cipher = s.extend({
          cfg: n.extend(),
          createEncryptor (t, e) {
            return this.create(this._ENC_XFORM_MODE, t, e);
          },
          createDecryptor (t, e) {
            return this.create(this._DEC_XFORM_MODE, t, e);
          },
          init (t, e, r) {
            (this.cfg = this.cfg.extend(r)),
            (this._xformMode = t),
            (this._key = e),
            this.reset();
          },
          reset () {
            s.reset.call(this), this._doReset();
          },
          process (t) {
            return this._append(t), this._process();
          },
          finalize (t) {
            return t && this._append(t), this._doFinalize();
          },
          keySize: 4,
          ivSize: 4,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          _createHelper: (function () {
            function t (t) {
              return typeof t === 'string' ? B : y;
            }
            return function (e) {
              return {
                encrypt (r, i, n) {
                  return t(i).encrypt(e, r, i, n);
                },
                decrypt (r, i, n) {
                  return t(i).decrypt(e, r, i, n);
                },
              };
            };
          })(),
        }));
        const f =
            ((i.StreamCipher = l.extend({
              _doFinalize () {
                return this._process(!0);
              },
              blockSize: 1,
            })),
            (r.mode = {}));
        const u = (i.BlockCipherMode = n.extend({
          createEncryptor (t, e) {
            return this.Encryptor.create(t, e);
          },
          createDecryptor (t, e) {
            return this.Decryptor.create(t, e);
          },
          init (t, e) {
            (this._cipher = t), (this._iv = e);
          },
        }));
        const d = (f.CBC = (function () {
          function t (t, r, i) {
            const n = this._iv;
            if (n) {
              o = n;
              this._iv = e;
            } else var o = this._prevBlock;
            for (let s = 0; s < i; s++) t[r + s] ^= o[s];
          }
          const r = u.extend();
          return (
            (r.Encryptor = r.extend({
              processBlock (e, r) {
                const i = this._cipher;
                const n = i.blockSize;
                t.call(this, e, r, n),
                i.encryptBlock(e, r),
                (this._prevBlock = e.slice(r, r + n));
              },
            })),
            (r.Decryptor = r.extend({
              processBlock (e, r) {
                const i = this._cipher;
                const n = i.blockSize;
                const o = e.slice(r, r + n);
                i.decryptBlock(e, r),
                t.call(this, e, r, n),
                (this._prevBlock = o);
              },
            })),
            r
          );
        })());
        const p = ((r.pad = {}).Pkcs7 = {
          pad (t, e) {
            for (
              var r = 4 * e,
                i = r - (t.sigBytes % r),
                n = (i << 24) | (i << 16) | (i << 8) | i,
                s = [],
                c = 0;
              c < i;
              c += 4
            ) { s.push(n); }
            const a = o.create(s, i);
            t.concat(a);
          },
          unpad (t) {
            const e = 255 & t.words[(t.sigBytes - 1) >>> 2];
            t.sigBytes -= e;
          },
        });
        const _ =
            ((i.BlockCipher = l.extend({
              cfg: l.cfg.extend({
                mode: d,
                padding: p,
              }),
              reset () {
                l.reset.call(this);
                const t = this.cfg;
                const e = t.iv;
                const r = t.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) { i = r.createEncryptor; } else {
                  var i = r.createDecryptor;
                  this._minBufferSize = 1;
                }
                this._mode && this._mode.__creator == i
                  ? this._mode.init(this, e && e.words)
                  : ((this._mode = i.call(r, this, e && e.words)),
                  (this._mode.__creator = i));
              },
              _doProcessBlock (t, e) {
                this._mode.processBlock(t, e);
              },
              _doFinalize () {
                const t = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                  t.pad(this._data, this.blockSize);
                  e = this._process(!0);
                } else {
                  var e = this._process(!0);
                  t.unpad(e);
                }
                return e;
              },
              blockSize: 4,
            })),
            (i.CipherParams = n.extend({
              init (t) {
                this.mixIn(t);
              },
              toString (t) {
                return (t || this.formatter).stringify(this);
              },
            })));
        const v = ((r.format = {}).OpenSSL = {
          stringify (t) {
            const e = t.ciphertext;
            const r = t.salt;
            if (r) i = o.create([1398893684, 1701076831]).concat(r).concat(e);
            else var i = e;
            return i.toString(a);
          },
          parse (t) {
            const e = a.parse(t);
            const r = e.words;
            if (r[0] == 1398893684 && r[1] == 1701076831) {
              var i = o.create(r.slice(2, 4));
              r.splice(0, 4), (e.sigBytes -= 16);
            }
            return _.create({
              ciphertext: e,
              salt: i,
            });
          },
        });
        var y = (i.SerializableCipher = n.extend({
          cfg: n.extend({
            format: v,
          }),
          encrypt (t, e, r, i) {
            i = this.cfg.extend(i);
            const n = t.createEncryptor(r, i);
            const o = n.finalize(e);
            const s = n.cfg;
            return _.create({
              ciphertext: o,
              key: r,
              iv: s.iv,
              algorithm: t,
              mode: s.mode,
              padding: s.padding,
              blockSize: t.blockSize,
              formatter: i.format,
            });
          },
          decrypt (t, e, r, i) {
            return (
              (i = this.cfg.extend(i)),
              (e = this._parse(e, i.format)),
              t.createDecryptor(r, i).finalize(e.ciphertext)
            );
          },
          _parse (t, e) {
            return typeof t === 'string' ? e.parse(t, this) : t;
          },
        }));
        const g = ((r.kdf = {}).OpenSSL = {
          execute (t, e, r, i) {
            i || (i = o.random(8));
            const n = h
              .create({
                keySize: e + r,
              })
              .compute(t, i);
            const s = o.create(n.words.slice(e), 4 * r);
            return (
              (n.sigBytes = 4 * e),
              _.create({
                key: n,
                iv: s,
                salt: i,
              })
            );
          },
        });
        var B = (i.PasswordBasedCipher = y.extend({
          cfg: y.cfg.extend({
            kdf: g,
          }),
          encrypt (t, e, r, i) {
            const n = (i = this.cfg.extend(i)).kdf.execute(
              r,
              t.keySize,
              t.ivSize,
            );
            i.iv = n.iv;
            const o = y.encrypt.call(this, t, e, n.key, i);
            return o.mixIn(n), o;
          },
          decrypt (t, e, r, i) {
            (i = this.cfg.extend(i)), (e = this._parse(e, i.format));
            const n = i.kdf.execute(r, t.keySize, t.ivSize, e.salt);
            return (i.iv = n.iv), y.decrypt.call(this, t, e, n.key, i);
          },
        }));
      })(),
    (t.mode.CFB = (function () {
      function e (t, e, r, i) {
        const n = this._iv;
        if (n) {
          o = n.slice(0);
          this._iv = void 0;
        } else var o = this._prevBlock;
        i.encryptBlock(o, 0);
        for (let s = 0; s < r; s++) t[e + s] ^= o[s];
      }
      const r = t.lib.BlockCipherMode.extend();
      return (
        (r.Encryptor = r.extend({
          processBlock (t, r) {
            const i = this._cipher;
            const n = i.blockSize;
            e.call(this, t, r, n, i), (this._prevBlock = t.slice(r, r + n));
          },
        })),
        (r.Decryptor = r.extend({
          processBlock (t, r) {
            const i = this._cipher;
            const n = i.blockSize;
            const o = t.slice(r, r + n);
            e.call(this, t, r, n, i), (this._prevBlock = o);
          },
        })),
        r
      );
    })()),
    (t.mode.ECB = (function () {
      const e = t.lib.BlockCipherMode.extend();
      return (
        (e.Encryptor = e.extend({
          processBlock (t, e) {
            this._cipher.encryptBlock(t, e);
          },
        })),
        (e.Decryptor = e.extend({
          processBlock (t, e) {
            this._cipher.decryptBlock(t, e);
          },
        })),
        e
      );
    })()),
    (t.pad.AnsiX923 = {
      pad (t, e) {
        const r = t.sigBytes;
        const i = 4 * e;
        const n = i - (r % i);
        const o = r + n - 1;
        t.clamp(),
        (t.words[o >>> 2] |= n << (24 - (o % 4) * 8)),
        (t.sigBytes += n);
      },
      unpad (t) {
        const e = 255 & t.words[(t.sigBytes - 1) >>> 2];
        t.sigBytes -= e;
      },
    }),
    (t.pad.Iso10126 = {
      pad (e, r) {
        const i = 4 * r;
        const n = i - (e.sigBytes % i);
        e.concat(t.lib.WordArray.random(n - 1)).concat(
          t.lib.WordArray.create([n << 24], 1),
        );
      },
      unpad (t) {
        const e = 255 & t.words[(t.sigBytes - 1) >>> 2];
        t.sigBytes -= e;
      },
    }),
    (t.pad.Iso97971 = {
      pad (e, r) {
        e.concat(t.lib.WordArray.create([2147483648], 1)),
        t.pad.ZeroPadding.pad(e, r);
      },
      unpad (e) {
        t.pad.ZeroPadding.unpad(e), e.sigBytes--;
      },
    }),
    (t.mode.OFB = (function () {
      const e = t.lib.BlockCipherMode.extend();
      const r = (e.Encryptor = e.extend({
        processBlock (t, e) {
          const r = this._cipher;
          const i = r.blockSize;
          const n = this._iv;
          let o = this._keystream;
          n && ((o = this._keystream = n.slice(0)), (this._iv = void 0)),
          r.encryptBlock(o, 0);
          for (let s = 0; s < i; s++) t[e + s] ^= o[s];
        },
      }));
      return (e.Decryptor = r), e;
    })()),
    (t.pad.NoPadding = {
      pad () {},
      unpad () {},
    }),
    (function (e) {
      const r = t;
      const i = r.lib.CipherParams;
      const n = r.enc.Hex;
      r.format.Hex = {
        stringify (t) {
          return t.ciphertext.toString(n);
        },
        parse (t) {
          const e = n.parse(t);
          return i.create({
            ciphertext: e,
          });
        },
      };
    })(),
    (function () {
      const e = t;
      const r = e.lib.BlockCipher;
      const i = e.algo;
      const n = [];
      const o = [];
      const s = [];
      const c = [];
      const a = [];
      const h = [];
      const l = [];
      const f = [];
      const u = [];
      const d = [];
      !(function () {
        for (var t = [], e = 0; e < 256; e++) { t[e] = e < 128 ? e << 1 : (e << 1) ^ 283; }
        for (var r = 0, i = 0, e = 0; e < 256; e++) {
          let p = i ^ (i << 1) ^ (i << 2) ^ (i << 3) ^ (i << 4);
          (p = (p >>> 8) ^ (255 & p) ^ 99), (n[r] = p), (o[p] = r);
          const _ = t[r];
          const v = t[_];
          const y = t[v];
          let g = (257 * t[p]) ^ (16843008 * p);
          (s[r] = (g << 24) | (g >>> 8)),
          (c[r] = (g << 16) | (g >>> 16)),
          (a[r] = (g << 8) | (g >>> 24)),
          (h[r] = g);
          g = (16843009 * y) ^ (65537 * v) ^ (257 * _) ^ (16843008 * r);
          (l[p] = (g << 24) | (g >>> 8)),
          (f[p] = (g << 16) | (g >>> 16)),
          (u[p] = (g << 8) | (g >>> 24)),
          (d[p] = g),
          r ? ((r = _ ^ t[t[t[y ^ _]]]), (i ^= t[t[i]])) : (r = i = 1);
        }
      })();
      const p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      const _ = (i.AES = r.extend({
        _doReset () {
          if (!this._nRounds || this._keyPriorReset !== this._key) {
            for (
              var t = (this._keyPriorReset = this._key),
                e = t.words,
                r = t.sigBytes / 4,
                i = 4 * ((this._nRounds = r + 6) + 1),
                o = (this._keySchedule = []),
                s = 0;
              s < i;
              s++
            ) {
              if (s < r) o[s] = e[s];
              else {
                h = o[s - 1];
                s % r
                  ? r > 6 &&
                      s % r == 4 &&
                      (h =
                        (n[h >>> 24] << 24) |
                        (n[(h >>> 16) & 255] << 16) |
                        (n[(h >>> 8) & 255] << 8) |
                        n[255 & h])
                  : ((h =
                        (n[(h = (h << 8) | (h >>> 24)) >>> 24] << 24) |
                        (n[(h >>> 16) & 255] << 16) |
                        (n[(h >>> 8) & 255] << 8) |
                        n[255 & h]),
                  (h ^= p[(s / r) | 0] << 24)),
                (o[s] = o[s - r] ^ h);
              }
            }
            for (let c = (this._invKeySchedule = []), a = 0; a < i; a++) {
              s = i - a;
              if (a % 4) h = o[s];
              else var h = o[s - 4];
              c[a] =
                  a < 4 || s <= 4
                    ? h
                    : l[n[h >>> 24]] ^
                      f[n[(h >>> 16) & 255]] ^
                      u[n[(h >>> 8) & 255]] ^
                      d[n[255 & h]];
            }
          }
        },
        encryptBlock (t, e) {
          this._doCryptBlock(t, e, this._keySchedule, s, c, a, h, n);
        },
        decryptBlock (t, e) {
          r = t[e + 1];
          (t[e + 1] = t[e + 3]),
          (t[e + 3] = r),
          this._doCryptBlock(t, e, this._invKeySchedule, l, f, u, d, o);
          var r = t[e + 1];
          (t[e + 1] = t[e + 3]), (t[e + 3] = r);
        },
        _doCryptBlock (t, e, r, i, n, o, s, c) {
          for (
            var a = this._nRounds,
              h = t[e] ^ r[0],
              l = t[e + 1] ^ r[1],
              f = t[e + 2] ^ r[2],
              u = t[e + 3] ^ r[3],
              d = 4,
              p = 1;
            p < a;
            p++
          ) {
            var _ =
                  i[h >>> 24] ^
                  n[(l >>> 16) & 255] ^
                  o[(f >>> 8) & 255] ^
                  s[255 & u] ^
                  r[d++];
            var v =
                  i[l >>> 24] ^
                  n[(f >>> 16) & 255] ^
                  o[(u >>> 8) & 255] ^
                  s[255 & h] ^
                  r[d++];
            var y =
                  i[f >>> 24] ^
                  n[(u >>> 16) & 255] ^
                  o[(h >>> 8) & 255] ^
                  s[255 & l] ^
                  r[d++];
            var g =
                  i[u >>> 24] ^
                  n[(h >>> 16) & 255] ^
                  o[(l >>> 8) & 255] ^
                  s[255 & f] ^
                  r[d++];
            (h = _), (l = v), (f = y), (u = g);
          }
          var _ =
                ((c[h >>> 24] << 24) |
                  (c[(l >>> 16) & 255] << 16) |
                  (c[(f >>> 8) & 255] << 8) |
                  c[255 & u]) ^
                r[d++];
          var v =
                ((c[l >>> 24] << 24) |
                  (c[(f >>> 16) & 255] << 16) |
                  (c[(u >>> 8) & 255] << 8) |
                  c[255 & h]) ^
                r[d++];
          var y =
                ((c[f >>> 24] << 24) |
                  (c[(u >>> 16) & 255] << 16) |
                  (c[(h >>> 8) & 255] << 8) |
                  c[255 & l]) ^
                r[d++];
          var g =
                ((c[u >>> 24] << 24) |
                  (c[(h >>> 16) & 255] << 16) |
                  (c[(l >>> 8) & 255] << 8) |
                  c[255 & f]) ^
                r[d++];
          (t[e] = _), (t[e + 1] = v), (t[e + 2] = y), (t[e + 3] = g);
        },
        keySize: 8,
      }));
      e.AES = r._createHelper(_);
    })(),
    (function () {
      function e (t, e) {
        const r = ((this._lBlock >>> t) ^ this._rBlock) & e;
        (this._rBlock ^= r), (this._lBlock ^= r << t);
      }
      function r (t, e) {
        const r = ((this._rBlock >>> t) ^ this._lBlock) & e;
        (this._lBlock ^= r), (this._rBlock ^= r << t);
      }
      const i = t;
      const n = i.lib;
      const o = n.WordArray;
      const s = n.BlockCipher;
      const c = i.algo;
      const a = [
        57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51,
        43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7,
        62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20,
        12, 4,
      ];
      const h = [
        14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16,
        7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44,
        49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32,
      ];
      const l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
      const f = [
        {
          0: 8421888,
          268435456: 32768,
          536870912: 8421378,
          805306368: 2,
          1073741824: 512,
          1342177280: 8421890,
          1610612736: 8389122,
          1879048192: 8388608,
          2147483648: 514,
          2415919104: 8389120,
          2684354560: 33280,
          2952790016: 8421376,
          3221225472: 32770,
          3489660928: 8388610,
          3758096384: 0,
          4026531840: 33282,
          134217728: 0,
          402653184: 8421890,
          671088640: 33282,
          939524096: 32768,
          1207959552: 8421888,
          1476395008: 512,
          1744830464: 8421378,
          2013265920: 2,
          2281701376: 8389120,
          2550136832: 33280,
          2818572288: 8421376,
          3087007744: 8389122,
          3355443200: 8388610,
          3623878656: 32770,
          3892314112: 514,
          4160749568: 8388608,
          1: 32768,
          268435457: 2,
          536870913: 8421888,
          805306369: 8388608,
          1073741825: 8421378,
          1342177281: 33280,
          1610612737: 512,
          1879048193: 8389122,
          2147483649: 8421890,
          2415919105: 8421376,
          2684354561: 8388610,
          2952790017: 33282,
          3221225473: 514,
          3489660929: 8389120,
          3758096385: 32770,
          4026531841: 0,
          134217729: 8421890,
          402653185: 8421376,
          671088641: 8388608,
          939524097: 512,
          1207959553: 32768,
          1476395009: 8388610,
          1744830465: 2,
          2013265921: 33282,
          2281701377: 32770,
          2550136833: 8389122,
          2818572289: 514,
          3087007745: 8421888,
          3355443201: 8389120,
          3623878657: 0,
          3892314113: 33280,
          4160749569: 8421378,
        },
        {
          0: 1074282512,
          16777216: 16384,
          33554432: 524288,
          50331648: 1074266128,
          67108864: 1073741840,
          83886080: 1074282496,
          100663296: 1073758208,
          117440512: 16,
          134217728: 540672,
          150994944: 1073758224,
          167772160: 1073741824,
          184549376: 540688,
          201326592: 524304,
          218103808: 0,
          234881024: 16400,
          251658240: 1074266112,
          8388608: 1073758208,
          25165824: 540688,
          41943040: 16,
          58720256: 1073758224,
          75497472: 1074282512,
          92274688: 1073741824,
          109051904: 524288,
          125829120: 1074266128,
          142606336: 524304,
          159383552: 0,
          176160768: 16384,
          192937984: 1074266112,
          209715200: 1073741840,
          226492416: 540672,
          243269632: 1074282496,
          260046848: 16400,
          268435456: 0,
          285212672: 1074266128,
          301989888: 1073758224,
          318767104: 1074282496,
          335544320: 1074266112,
          352321536: 16,
          369098752: 540688,
          385875968: 16384,
          402653184: 16400,
          419430400: 524288,
          436207616: 524304,
          452984832: 1073741840,
          469762048: 540672,
          486539264: 1073758208,
          503316480: 1073741824,
          520093696: 1074282512,
          276824064: 540688,
          293601280: 524288,
          310378496: 1074266112,
          327155712: 16384,
          343932928: 1073758208,
          360710144: 1074282512,
          377487360: 16,
          394264576: 1073741824,
          411041792: 1074282496,
          427819008: 1073741840,
          444596224: 1073758224,
          461373440: 524304,
          478150656: 0,
          494927872: 16400,
          511705088: 1074266128,
          528482304: 540672,
        },
        {
          0: 260,
          1048576: 0,
          2097152: 67109120,
          3145728: 65796,
          4194304: 65540,
          5242880: 67108868,
          6291456: 67174660,
          7340032: 67174400,
          8388608: 67108864,
          9437184: 67174656,
          10485760: 65792,
          11534336: 67174404,
          12582912: 67109124,
          13631488: 65536,
          14680064: 4,
          15728640: 256,
          524288: 67174656,
          1572864: 67174404,
          2621440: 0,
          3670016: 67109120,
          4718592: 67108868,
          5767168: 65536,
          6815744: 65540,
          7864320: 260,
          8912896: 4,
          9961472: 256,
          11010048: 67174400,
          12058624: 65796,
          13107200: 65792,
          14155776: 67109124,
          15204352: 67174660,
          16252928: 67108864,
          16777216: 67174656,
          17825792: 65540,
          18874368: 65536,
          19922944: 67109120,
          20971520: 256,
          22020096: 67174660,
          23068672: 67108868,
          24117248: 0,
          25165824: 67109124,
          26214400: 67108864,
          27262976: 4,
          28311552: 65792,
          29360128: 67174400,
          30408704: 260,
          31457280: 65796,
          32505856: 67174404,
          17301504: 67108864,
          18350080: 260,
          19398656: 67174656,
          20447232: 0,
          21495808: 65540,
          22544384: 67109120,
          23592960: 256,
          24641536: 67174404,
          25690112: 65536,
          26738688: 67174660,
          27787264: 65796,
          28835840: 67108868,
          29884416: 67109124,
          30932992: 67174400,
          31981568: 4,
          33030144: 65792,
        },
        {
          0: 2151682048,
          65536: 2147487808,
          131072: 4198464,
          196608: 2151677952,
          262144: 0,
          327680: 4198400,
          393216: 2147483712,
          458752: 4194368,
          524288: 2147483648,
          589824: 4194304,
          655360: 64,
          720896: 2147487744,
          786432: 2151678016,
          851968: 4160,
          917504: 4096,
          983040: 2151682112,
          32768: 2147487808,
          98304: 64,
          163840: 2151678016,
          229376: 2147487744,
          294912: 4198400,
          360448: 2151682112,
          425984: 0,
          491520: 2151677952,
          557056: 4096,
          622592: 2151682048,
          688128: 4194304,
          753664: 4160,
          819200: 2147483648,
          884736: 4194368,
          950272: 4198464,
          1015808: 2147483712,
          1048576: 4194368,
          1114112: 4198400,
          1179648: 2147483712,
          1245184: 0,
          1310720: 4160,
          1376256: 2151678016,
          1441792: 2151682048,
          1507328: 2147487808,
          1572864: 2151682112,
          1638400: 2147483648,
          1703936: 2151677952,
          1769472: 4198464,
          1835008: 2147487744,
          1900544: 4194304,
          1966080: 64,
          2031616: 4096,
          1081344: 2151677952,
          1146880: 2151682112,
          1212416: 0,
          1277952: 4198400,
          1343488: 4194368,
          1409024: 2147483648,
          1474560: 2147487808,
          1540096: 64,
          1605632: 2147483712,
          1671168: 4096,
          1736704: 2147487744,
          1802240: 2151678016,
          1867776: 4160,
          1933312: 2151682048,
          1998848: 4194304,
          2064384: 4198464,
        },
        {
          0: 128,
          4096: 17039360,
          8192: 262144,
          12288: 536870912,
          16384: 537133184,
          20480: 16777344,
          24576: 553648256,
          28672: 262272,
          32768: 16777216,
          36864: 537133056,
          40960: 536871040,
          45056: 553910400,
          49152: 553910272,
          53248: 0,
          57344: 17039488,
          61440: 553648128,
          2048: 17039488,
          6144: 553648256,
          10240: 128,
          14336: 17039360,
          18432: 262144,
          22528: 537133184,
          26624: 553910272,
          30720: 536870912,
          34816: 537133056,
          38912: 0,
          43008: 553910400,
          47104: 16777344,
          51200: 536871040,
          55296: 553648128,
          59392: 16777216,
          63488: 262272,
          65536: 262144,
          69632: 128,
          73728: 536870912,
          77824: 553648256,
          81920: 16777344,
          86016: 553910272,
          90112: 537133184,
          94208: 16777216,
          98304: 553910400,
          102400: 553648128,
          106496: 17039360,
          110592: 537133056,
          114688: 262272,
          118784: 536871040,
          122880: 0,
          126976: 17039488,
          67584: 553648256,
          71680: 16777216,
          75776: 17039360,
          79872: 537133184,
          83968: 536870912,
          88064: 17039488,
          92160: 128,
          96256: 553910272,
          100352: 262272,
          104448: 553910400,
          108544: 0,
          112640: 553648128,
          116736: 16777344,
          120832: 262144,
          124928: 537133056,
          129024: 536871040,
        },
        {
          0: 268435464,
          256: 8192,
          512: 270532608,
          768: 270540808,
          1024: 268443648,
          1280: 2097152,
          1536: 2097160,
          1792: 268435456,
          2048: 0,
          2304: 268443656,
          2560: 2105344,
          2816: 8,
          3072: 270532616,
          3328: 2105352,
          3584: 8200,
          3840: 270540800,
          128: 270532608,
          384: 270540808,
          640: 8,
          896: 2097152,
          1152: 2105352,
          1408: 268435464,
          1664: 268443648,
          1920: 8200,
          2176: 2097160,
          2432: 8192,
          2688: 268443656,
          2944: 270532616,
          3200: 0,
          3456: 270540800,
          3712: 2105344,
          3968: 268435456,
          4096: 268443648,
          4352: 270532616,
          4608: 270540808,
          4864: 8200,
          5120: 2097152,
          5376: 268435456,
          5632: 268435464,
          5888: 2105344,
          6144: 2105352,
          6400: 0,
          6656: 8,
          6912: 270532608,
          7168: 8192,
          7424: 268443656,
          7680: 270540800,
          7936: 2097160,
          4224: 8,
          4480: 2105344,
          4736: 2097152,
          4992: 268435464,
          5248: 268443648,
          5504: 8200,
          5760: 270540808,
          6016: 270532608,
          6272: 270540800,
          6528: 270532616,
          6784: 8192,
          7040: 2105352,
          7296: 2097160,
          7552: 0,
          7808: 268435456,
          8064: 268443656,
        },
        {
          0: 1048576,
          16: 33555457,
          32: 1024,
          48: 1049601,
          64: 34604033,
          80: 0,
          96: 1,
          112: 34603009,
          128: 33555456,
          144: 1048577,
          160: 33554433,
          176: 34604032,
          192: 34603008,
          208: 1025,
          224: 1049600,
          240: 33554432,
          8: 34603009,
          24: 0,
          40: 33555457,
          56: 34604032,
          72: 1048576,
          88: 33554433,
          104: 33554432,
          120: 1025,
          136: 1049601,
          152: 33555456,
          168: 34603008,
          184: 1048577,
          200: 1024,
          216: 34604033,
          232: 1,
          248: 1049600,
          256: 33554432,
          272: 1048576,
          288: 33555457,
          304: 34603009,
          320: 1048577,
          336: 33555456,
          352: 34604032,
          368: 1049601,
          384: 1025,
          400: 34604033,
          416: 1049600,
          432: 1,
          448: 0,
          464: 34603008,
          480: 33554433,
          496: 1024,
          264: 1049600,
          280: 33555457,
          296: 34603009,
          312: 1,
          328: 33554432,
          344: 1048576,
          360: 1025,
          376: 34604032,
          392: 33554433,
          408: 34603008,
          424: 0,
          440: 34604033,
          456: 1049601,
          472: 1024,
          488: 33555456,
          504: 1048577,
        },
        {
          0: 134219808,
          1: 131072,
          2: 134217728,
          3: 32,
          4: 131104,
          5: 134350880,
          6: 134350848,
          7: 2048,
          8: 134348800,
          9: 134219776,
          10: 133120,
          11: 134348832,
          12: 2080,
          13: 0,
          14: 134217760,
          15: 133152,
          2147483648: 2048,
          2147483649: 134350880,
          2147483650: 134219808,
          2147483651: 134217728,
          2147483652: 134348800,
          2147483653: 133120,
          2147483654: 133152,
          2147483655: 32,
          2147483656: 134217760,
          2147483657: 2080,
          2147483658: 131104,
          2147483659: 134350848,
          2147483660: 0,
          2147483661: 134348832,
          2147483662: 134219776,
          2147483663: 131072,
          16: 133152,
          17: 134350848,
          18: 32,
          19: 2048,
          20: 134219776,
          21: 134217760,
          22: 134348832,
          23: 131072,
          24: 0,
          25: 131104,
          26: 134348800,
          27: 134219808,
          28: 134350880,
          29: 133120,
          30: 2080,
          31: 134217728,
          2147483664: 131072,
          2147483665: 2048,
          2147483666: 134348832,
          2147483667: 133152,
          2147483668: 32,
          2147483669: 134348800,
          2147483670: 134217728,
          2147483671: 134219808,
          2147483672: 134350880,
          2147483673: 134217760,
          2147483674: 134219776,
          2147483675: 0,
          2147483676: 133120,
          2147483677: 2080,
          2147483678: 131104,
          2147483679: 134350848,
        },
      ];
      const u = [
        4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504,
        2147483679,
      ];
      const d = (c.DES = s.extend({
        _doReset () {
          for (var t = this._key.words, e = [], r = 0; r < 56; r++) {
            const i = a[r] - 1;
            e[r] = (t[i >>> 5] >>> (31 - (i % 32))) & 1;
          }
          for (var n = (this._subKeys = []), o = 0; o < 16; o++) {
            for (var s = (n[o] = []), c = l[o], r = 0; r < 24; r++) {
              (s[(r / 6) | 0] |= e[(h[r] - 1 + c) % 28] << (31 - (r % 6))),
              (s[4 + ((r / 6) | 0)] |=
                    e[28 + ((h[r + 24] - 1 + c) % 28)] << (31 - (r % 6)));
            }
            s[0] = (s[0] << 1) | (s[0] >>> 31);
            for (r = 1; r < 7; r++) s[r] = s[r] >>> (4 * (r - 1) + 3);
            s[7] = (s[7] << 5) | (s[7] >>> 27);
          }
          for (var f = (this._invSubKeys = []), r = 0; r < 16; r++) { f[r] = n[15 - r]; }
        },
        encryptBlock (t, e) {
          this._doCryptBlock(t, e, this._subKeys);
        },
        decryptBlock (t, e) {
          this._doCryptBlock(t, e, this._invSubKeys);
        },
        _doCryptBlock (t, i, n) {
          (this._lBlock = t[i]),
          (this._rBlock = t[i + 1]),
          e.call(this, 4, 252645135),
          e.call(this, 16, 65535),
          r.call(this, 2, 858993459),
          r.call(this, 8, 16711935),
          e.call(this, 1, 1431655765);
          for (let o = 0; o < 16; o++) {
            for (
              var s = n[o], c = this._lBlock, a = this._rBlock, h = 0, l = 0;
              l < 8;
              l++
            ) { h |= f[l][((a ^ s[l]) & u[l]) >>> 0]; }
            (this._lBlock = a), (this._rBlock = c ^ h);
          }
          const d = this._lBlock;
          (this._lBlock = this._rBlock),
          (this._rBlock = d),
          e.call(this, 1, 1431655765),
          r.call(this, 8, 16711935),
          r.call(this, 2, 858993459),
          e.call(this, 16, 65535),
          e.call(this, 4, 252645135),
          (t[i] = this._lBlock),
          (t[i + 1] = this._rBlock);
        },
        keySize: 2,
        ivSize: 2,
        blockSize: 2,
      }));
      i.DES = s._createHelper(d);
      const p = (c.TripleDES = s.extend({
        _doReset () {
          const t = this._key.words;
          (this._des1 = d.createEncryptor(o.create(t.slice(0, 2)))),
          (this._des2 = d.createEncryptor(o.create(t.slice(2, 4)))),
          (this._des3 = d.createEncryptor(o.create(t.slice(4, 6))));
        },
        encryptBlock (t, e) {
          this._des1.encryptBlock(t, e),
          this._des2.decryptBlock(t, e),
          this._des3.encryptBlock(t, e);
        },
        decryptBlock (t, e) {
          this._des3.decryptBlock(t, e),
          this._des2.encryptBlock(t, e),
          this._des1.decryptBlock(t, e);
        },
        keySize: 6,
        ivSize: 2,
        blockSize: 2,
      }));
      i.TripleDES = s._createHelper(p);
    })(),
    (function () {
      function e () {
        for (
          var t = this._S, e = this._i, r = this._j, i = 0, n = 0;
          n < 4;
          n++
        ) {
          r = (r + t[(e = (e + 1) % 256)]) % 256;
          const o = t[e];
          (t[e] = t[r]),
          (t[r] = o),
          (i |= t[(t[e] + t[r]) % 256] << (24 - 8 * n));
        }
        return (this._i = e), (this._j = r), i;
      }
      const r = t;
      const i = r.lib.StreamCipher;
      const n = r.algo;
      const o = (n.RC4 = i.extend({
        _doReset () {
          for (
            var t = this._key,
              e = t.words,
              r = t.sigBytes,
              i = (this._S = []),
              n = 0;
            n < 256;
            n++
          ) { i[n] = n; }
          for (var n = 0, o = 0; n < 256; n++) {
            const s = n % r;
            const c = (e[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
            o = (o + i[n] + c) % 256;
            const a = i[n];
            (i[n] = i[o]), (i[o] = a);
          }
          this._i = this._j = 0;
        },
        _doProcessBlock (t, r) {
          t[r] ^= e.call(this);
        },
        keySize: 8,
        ivSize: 0,
      }));
      r.RC4 = i._createHelper(o);
      const s = (n.RC4Drop = o.extend({
        cfg: o.cfg.extend({
          drop: 192,
        }),
        _doReset () {
          o._doReset.call(this);
          for (let t = this.cfg.drop; t > 0; t--) e.call(this);
        },
      }));
      r.RC4Drop = i._createHelper(s);
    })(),
    (t.mode.CTRGladman = (function () {
      function e (t) {
        if (((t >> 24) & 255) == 255) {
          let e = (t >> 16) & 255;
          let r = (t >> 8) & 255;
          let i = 255 & t;
          e === 255
            ? ((e = 0), r === 255 ? ((r = 0), i === 255 ? (i = 0) : ++i) : ++r)
            : ++e,
          (t = 0),
          (t += e << 16),
          (t += r << 8),
          (t += i);
        } else t += 1 << 24;
        return t;
      }
      function r (t) {
        return (t[0] = e(t[0])) === 0 && (t[1] = e(t[1])), t;
      }
      const i = t.lib.BlockCipherMode.extend();
      const n = (i.Encryptor = i.extend({
        processBlock (t, e) {
          const i = this._cipher;
          const n = i.blockSize;
          const o = this._iv;
          let s = this._counter;
          o && ((s = this._counter = o.slice(0)), (this._iv = void 0)), r(s);
          const c = s.slice(0);
          i.encryptBlock(c, 0);
          for (let a = 0; a < n; a++) t[e + a] ^= c[a];
        },
      }));
      return (i.Decryptor = n), i;
    })()),
    (function () {
      function e () {
        for (var t = this._X, e = this._C, r = 0; r < 8; r++) o[r] = e[r];
        (e[0] = (e[0] + 1295307597 + this._b) | 0),
        (e[1] = (e[1] + 3545052371 + (e[0] >>> 0 < o[0] >>> 0 ? 1 : 0)) | 0),
        (e[2] = (e[2] + 886263092 + (e[1] >>> 0 < o[1] >>> 0 ? 1 : 0)) | 0),
        (e[3] = (e[3] + 1295307597 + (e[2] >>> 0 < o[2] >>> 0 ? 1 : 0)) | 0),
        (e[4] = (e[4] + 3545052371 + (e[3] >>> 0 < o[3] >>> 0 ? 1 : 0)) | 0),
        (e[5] = (e[5] + 886263092 + (e[4] >>> 0 < o[4] >>> 0 ? 1 : 0)) | 0),
        (e[6] = (e[6] + 1295307597 + (e[5] >>> 0 < o[5] >>> 0 ? 1 : 0)) | 0),
        (e[7] = (e[7] + 3545052371 + (e[6] >>> 0 < o[6] >>> 0 ? 1 : 0)) | 0),
        (this._b = e[7] >>> 0 < o[7] >>> 0 ? 1 : 0);
        for (r = 0; r < 8; r++) {
          const i = t[r] + e[r];
          const n = 65535 & i;
          const c = i >>> 16;
          const a = ((((n * n) >>> 17) + n * c) >>> 15) + c * c;
          const h = (((4294901760 & i) * i) | 0) + (((65535 & i) * i) | 0);
          s[r] = a ^ h;
        }
        (t[0] =
          (s[0] +
            ((s[7] << 16) | (s[7] >>> 16)) +
            ((s[6] << 16) | (s[6] >>> 16))) |
          0),
        (t[1] = (s[1] + ((s[0] << 8) | (s[0] >>> 24)) + s[7]) | 0),
        (t[2] =
            (s[2] +
              ((s[1] << 16) | (s[1] >>> 16)) +
              ((s[0] << 16) | (s[0] >>> 16))) |
            0),
        (t[3] = (s[3] + ((s[2] << 8) | (s[2] >>> 24)) + s[1]) | 0),
        (t[4] =
            (s[4] +
              ((s[3] << 16) | (s[3] >>> 16)) +
              ((s[2] << 16) | (s[2] >>> 16))) |
            0),
        (t[5] = (s[5] + ((s[4] << 8) | (s[4] >>> 24)) + s[3]) | 0),
        (t[6] =
            (s[6] +
              ((s[5] << 16) | (s[5] >>> 16)) +
              ((s[4] << 16) | (s[4] >>> 16))) |
            0),
        (t[7] = (s[7] + ((s[6] << 8) | (s[6] >>> 24)) + s[5]) | 0);
      }
      const r = t;
      const i = r.lib.StreamCipher;
      const n = [];
      var o = [];
      var s = [];
      const c = (r.algo.Rabbit = i.extend({
        _doReset () {
          for (var t = this._key.words, r = this.cfg.iv, i = 0; i < 4; i++) {
            t[i] =
                (16711935 & ((t[i] << 8) | (t[i] >>> 24))) |
                (4278255360 & ((t[i] << 24) | (t[i] >>> 8)));
          }
          const n = (this._X = [
            t[0],
            (t[3] << 16) | (t[2] >>> 16),
            t[1],
            (t[0] << 16) | (t[3] >>> 16),
            t[2],
            (t[1] << 16) | (t[0] >>> 16),
            t[3],
            (t[2] << 16) | (t[1] >>> 16),
          ]);
          const o = (this._C = [
            (t[2] << 16) | (t[2] >>> 16),
            (4294901760 & t[0]) | (65535 & t[1]),
            (t[3] << 16) | (t[3] >>> 16),
            (4294901760 & t[1]) | (65535 & t[2]),
            (t[0] << 16) | (t[0] >>> 16),
            (4294901760 & t[2]) | (65535 & t[3]),
            (t[1] << 16) | (t[1] >>> 16),
            (4294901760 & t[3]) | (65535 & t[0]),
          ]);
          this._b = 0;
          for (i = 0; i < 4; i++) e.call(this);
          for (i = 0; i < 8; i++) o[i] ^= n[(i + 4) & 7];
          if (r) {
            const s = r.words;
            const c = s[0];
            const a = s[1];
            const h =
                  (16711935 & ((c << 8) | (c >>> 24))) |
                  (4278255360 & ((c << 24) | (c >>> 8)));
            const l =
                  (16711935 & ((a << 8) | (a >>> 24))) |
                  (4278255360 & ((a << 24) | (a >>> 8)));
            const f = (h >>> 16) | (4294901760 & l);
            const u = (l << 16) | (65535 & h);
            (o[0] ^= h),
            (o[1] ^= f),
            (o[2] ^= l),
            (o[3] ^= u),
            (o[4] ^= h),
            (o[5] ^= f),
            (o[6] ^= l),
            (o[7] ^= u);
            for (i = 0; i < 4; i++) e.call(this);
          }
        },
        _doProcessBlock (t, r) {
          const i = this._X;
          e.call(this),
          (n[0] = i[0] ^ (i[5] >>> 16) ^ (i[3] << 16)),
          (n[1] = i[2] ^ (i[7] >>> 16) ^ (i[5] << 16)),
          (n[2] = i[4] ^ (i[1] >>> 16) ^ (i[7] << 16)),
          (n[3] = i[6] ^ (i[3] >>> 16) ^ (i[1] << 16));
          for (let o = 0; o < 4; o++) {
            (n[o] =
                (16711935 & ((n[o] << 8) | (n[o] >>> 24))) |
                (4278255360 & ((n[o] << 24) | (n[o] >>> 8)))),
            (t[r + o] ^= n[o]);
          }
        },
        blockSize: 4,
        ivSize: 2,
      }));
      r.Rabbit = i._createHelper(c);
    })(),
    (t.mode.CTR = (function () {
      const e = t.lib.BlockCipherMode.extend();
      const r = (e.Encryptor = e.extend({
        processBlock (t, e) {
          const r = this._cipher;
          const i = r.blockSize;
          const n = this._iv;
          let o = this._counter;
          n && ((o = this._counter = n.slice(0)), (this._iv = void 0));
          const s = o.slice(0);
          r.encryptBlock(s, 0), (o[i - 1] = (o[i - 1] + 1) | 0);
          for (let c = 0; c < i; c++) t[e + c] ^= s[c];
        },
      }));
      return (e.Decryptor = r), e;
    })()),
    (function () {
      function e () {
        for (var t = this._X, e = this._C, r = 0; r < 8; r++) o[r] = e[r];
        (e[0] = (e[0] + 1295307597 + this._b) | 0),
        (e[1] = (e[1] + 3545052371 + (e[0] >>> 0 < o[0] >>> 0 ? 1 : 0)) | 0),
        (e[2] = (e[2] + 886263092 + (e[1] >>> 0 < o[1] >>> 0 ? 1 : 0)) | 0),
        (e[3] = (e[3] + 1295307597 + (e[2] >>> 0 < o[2] >>> 0 ? 1 : 0)) | 0),
        (e[4] = (e[4] + 3545052371 + (e[3] >>> 0 < o[3] >>> 0 ? 1 : 0)) | 0),
        (e[5] = (e[5] + 886263092 + (e[4] >>> 0 < o[4] >>> 0 ? 1 : 0)) | 0),
        (e[6] = (e[6] + 1295307597 + (e[5] >>> 0 < o[5] >>> 0 ? 1 : 0)) | 0),
        (e[7] = (e[7] + 3545052371 + (e[6] >>> 0 < o[6] >>> 0 ? 1 : 0)) | 0),
        (this._b = e[7] >>> 0 < o[7] >>> 0 ? 1 : 0);
        for (r = 0; r < 8; r++) {
          const i = t[r] + e[r];
          const n = 65535 & i;
          const c = i >>> 16;
          const a = ((((n * n) >>> 17) + n * c) >>> 15) + c * c;
          const h = (((4294901760 & i) * i) | 0) + (((65535 & i) * i) | 0);
          s[r] = a ^ h;
        }
        (t[0] =
          (s[0] +
            ((s[7] << 16) | (s[7] >>> 16)) +
            ((s[6] << 16) | (s[6] >>> 16))) |
          0),
        (t[1] = (s[1] + ((s[0] << 8) | (s[0] >>> 24)) + s[7]) | 0),
        (t[2] =
            (s[2] +
              ((s[1] << 16) | (s[1] >>> 16)) +
              ((s[0] << 16) | (s[0] >>> 16))) |
            0),
        (t[3] = (s[3] + ((s[2] << 8) | (s[2] >>> 24)) + s[1]) | 0),
        (t[4] =
            (s[4] +
              ((s[3] << 16) | (s[3] >>> 16)) +
              ((s[2] << 16) | (s[2] >>> 16))) |
            0),
        (t[5] = (s[5] + ((s[4] << 8) | (s[4] >>> 24)) + s[3]) | 0),
        (t[6] =
            (s[6] +
              ((s[5] << 16) | (s[5] >>> 16)) +
              ((s[4] << 16) | (s[4] >>> 16))) |
            0),
        (t[7] = (s[7] + ((s[6] << 8) | (s[6] >>> 24)) + s[5]) | 0);
      }
      const r = t;
      const i = r.lib.StreamCipher;
      const n = [];
      var o = [];
      var s = [];
      const c = (r.algo.RabbitLegacy = i.extend({
        _doReset () {
          const t = this._key.words;
          const r = this.cfg.iv;
          const i = (this._X = [
            t[0],
            (t[3] << 16) | (t[2] >>> 16),
            t[1],
            (t[0] << 16) | (t[3] >>> 16),
            t[2],
            (t[1] << 16) | (t[0] >>> 16),
            t[3],
            (t[2] << 16) | (t[1] >>> 16),
          ]);
          const n = (this._C = [
            (t[2] << 16) | (t[2] >>> 16),
            (4294901760 & t[0]) | (65535 & t[1]),
            (t[3] << 16) | (t[3] >>> 16),
            (4294901760 & t[1]) | (65535 & t[2]),
            (t[0] << 16) | (t[0] >>> 16),
            (4294901760 & t[2]) | (65535 & t[3]),
            (t[1] << 16) | (t[1] >>> 16),
            (4294901760 & t[3]) | (65535 & t[0]),
          ]);
          this._b = 0;
          for (u = 0; u < 4; u++) e.call(this);
          for (u = 0; u < 8; u++) n[u] ^= i[(u + 4) & 7];
          if (r) {
            const o = r.words;
            const s = o[0];
            const c = o[1];
            const a =
                  (16711935 & ((s << 8) | (s >>> 24))) |
                  (4278255360 & ((s << 24) | (s >>> 8)));
            const h =
                  (16711935 & ((c << 8) | (c >>> 24))) |
                  (4278255360 & ((c << 24) | (c >>> 8)));
            const l = (a >>> 16) | (4294901760 & h);
            const f = (h << 16) | (65535 & a);
            (n[0] ^= a),
            (n[1] ^= l),
            (n[2] ^= h),
            (n[3] ^= f),
            (n[4] ^= a),
            (n[5] ^= l),
            (n[6] ^= h),
            (n[7] ^= f);
            for (var u = 0; u < 4; u++) e.call(this);
          }
        },
        _doProcessBlock (t, r) {
          const i = this._X;
          e.call(this),
          (n[0] = i[0] ^ (i[5] >>> 16) ^ (i[3] << 16)),
          (n[1] = i[2] ^ (i[7] >>> 16) ^ (i[5] << 16)),
          (n[2] = i[4] ^ (i[1] >>> 16) ^ (i[7] << 16)),
          (n[3] = i[6] ^ (i[3] >>> 16) ^ (i[1] << 16));
          for (let o = 0; o < 4; o++) {
            (n[o] =
                (16711935 & ((n[o] << 8) | (n[o] >>> 24))) |
                (4278255360 & ((n[o] << 24) | (n[o] >>> 8)))),
            (t[r + o] ^= n[o]);
          }
        },
        blockSize: 4,
        ivSize: 2,
      }));
      r.RabbitLegacy = i._createHelper(c);
    })(),
    (t.pad.ZeroPadding = {
      pad (t, e) {
        const r = 4 * e;
        t.clamp(), (t.sigBytes += r - (t.sigBytes % r || r));
      },
      unpad (t) {
        for (
          var e = t.words, r = t.sigBytes - 1;
          !((e[r >>> 2] >>> (24 - (r % 4) * 8)) & 255);

        ) { r--; }
        t.sigBytes = r + 1;
      },
    }),
    t
  );
}
function Base64JS () {
  var e =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function (e) {
        return typeof e;
      }
      : function (e) {
        return e &&
            typeof Symbol === 'function' &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
          ? 'symbol'
          : typeof e;
      };
  function e (e) {
    this.message = e;
  }
  const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  return (
    ((e.prototype = new Error()).name = 'InvalidCharacterError'),
    {
      btoa (o) {
        for (
          var n, r, f = String(o), i = 0, a = t, c = '';
          f.charAt(0 | i) || ((a = '='), i % 1);
          c += a.charAt(63 & (n >> (8 - (i % 1) * 8)))
        ) {
          if ((r = f.charCodeAt((i += 0.75))) > 255) {
            throw new e(
              "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
            );
          }
          n = (n << 8) | r;
        }
        return c;
      },
      atob (o) {
        const n = String(o).replace(/[=]+$/, '');
        if (n.length % 4 == 1) {
          throw new e(
            "'atob' failed: The string to be decoded is not correctly encoded.",
          );
        }
        for (
          var r, f, i = 0, a = 0, c = '';
          (f = n.charAt(a++));
          ~f &&
          ((r = i % 4 ? 64 * r + f : f), i++ % 4) &&
          (c += String.fromCharCode(255 & (r >> ((-2 * i) & 6))))
        ) { f = t.indexOf(f); }
        return c;
      },
    }
  );
}

if (typeof Object.assign22 !== 'function') {
  Object.defineProperty(Object, 'assign2', {
    value (target) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      const to = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index];

        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}

let GlobalDataA = {};
const wx = {
  request (params) {
    if (params) {
      const data = {
        url: params.url,
        method: params.method,
        header: params.header,
        data: params.data,
      };
      return JSON.stringify(data);
    }
    return '';
  },
  showNavigationBarLoading () {
    console.log('wx方法，加载----showNavigationBarLoading');
  },
  showLoading (type, msg) {
    console.log('wx方法，加载----showLoading');
  },
  hideNavigationBarLoading () {
    console.log('wx方法，加载----hideNavigationBarLoading');
  },
  hideLoading () {
    console.log('wx方法，加载----hideLoading');
  },
  navigateToMiniProgram () {
    console.log(
      'wx方法，加载----navigateToMiniProgram',
      JSON.stringify(arguments),
    );
  },
  getStorageSync (key) {
    console.log('wx方法，加载----getStorageSync', key);
    return GlobalDataA[key];
  },
  setStorage (data) {
    GlobalDataA[data.key] = data.data;
  },
  removeStorage (data) {
    if (GlobalDataA[data.key]) {
      delete GlobalDataA[data.key];
    }
  },
  clearStorage () {
    GlobalDataA = {};
  },
  login () {
    console.log('需要微信登录！！！');
  },
};

let A =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function (A) {
        return typeof A;
      }
      : function (A) {
        return A &&
            typeof Symbol === 'function' &&
            A.constructor === Symbol &&
            A !== Symbol.prototype
          ? 'symbol'
          : typeof A;
      };
const t = AppData;
const o = CryptoJS();
const u = Base64JS();
const c = u.atob;
const f = u.btoa;
const d = t.globalData.apiSecret;
const g = function () {
  for (var A = [], e = 0; e < 36; e++) { A[e] = '0123456789abcdef'.substr(Math.floor(16 * Math.random()), 1); }
  return (
    (A[14] = '4'),
    (A[19] = '0123456789abcdef'.substr((3 & A[19]) | 8, 1)),
    (A[8] = A[13] = A[18] = A[23] = '-'),
    A.join('')
  );
};
var l = function (e) {
  const t = new Object();
  if (l(e)) return t;
  const n = new RegExp('[?&][^&]+=?[^&]*', 'g');
  const r = e.match(n);
  if (l(r)) return t;
  for (let i = 0; i < r.length; i++) {
    const a = r[i].substring(1).split('=');
    Object.assign2(t, A({}, a[0], a.length == 2 ? a[1] : ''));
  }
  return t;
};
const v = function (A) {
  return A == null || A == null;
};
const m = function (e) {
  const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
  return v(e) ? t : A(e) == 'object' ? JSON.stringify(e) : e.toString();
};
const p = function (A) {
  return m(A).trim();
};
const x = function (A) {
  if (typeof A === 'string') {
    return m(A).split('').reverse().join('');
  }
};
const b = function (e) {
  return (
    !!v(e) || (A(e) == 'object' ? Object.keys(e).length == 0 : p(e) == '')
  );
};
const P = function (A) {
  return !b(A);
};
const F = function () {
  const A = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; const e = arguments.length > 1 ? arguments[1] : void 0;
  A
    ? wx.showNavigationBarLoading()
    : wx.showLoading({
      mask: !0,
      title: e || '玩命加载中...',
    });
};
const R = function (A) {
  A ? wx.hideNavigationBarLoading() : wx.hideLoading();
};
const z = function (A, e) {
  const t = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  if (t) {
    for (var n = !1, i = 0; i < e.length; i++) {
      if (e[i].indexOf(A) != -1 || A.indexOf(e[i]) != -1) {
        n = !0;
        break;
      }
    }
    return n;
  }
  return e.indexOf(A) != -1;
};
const h = function (A) {
  const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
  return (Array(e).join(0) + A).slice(-e);
};
const T = function (A) {
  return /^[1][0-9]{10}$/.test(A);
};
const C = function (A) {
  if (
    !A ||
      A.length !== 18 ||
      !{
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外',
      }[A.substr(0, 2)]
  ) { return !1; }
  if (
    !/^[1-9]\d{5}(1[89]|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|[Xx])$/.test(
      A,
    )
  ) { return !1; }
  for (
    var e = A.split(''),
      t = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      n = 0,
      i = 0;
    i < 17;
    i++
  ) { n += e[i] * t[i]; }
  return [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2][n % 11] == e[17].toUpperCase();
};
const w = function A () {
  const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  const n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  const i = P(e.dataInit) && e.dataInit; const r = b(e.loading) || e.loading;
  r && wx.request && F(i), e.method = e.method || 'get',
  e.contentType = (e.header || {})['content-type'] || 'application/json',
  e.data = e.data || {}, M(e);
  let a = t.globalData.domain + t.globalData.service;
  t.globalData.shake &&
      e.url.indexOf('/online') == -1 &&
      e.url.indexOf('/common') == -1 &&
      (a += `@${t.globalData.version}`);
  return wx.request({
    url: a + e.url,
    method: e.method,
    header: e.header,
    data: e.data,
    success (t) {
      if ((console.log(t), t.statusCode == 200)) {
        const i = C(e, t);
        if (i.status == 1e3 && n) {
          return void O(
            () => {
              A(e, !1);
            },
            (A) => {
              return e.fail && e.fail(A);
            },
          );
        }
        e.success && e.success(i);
      } else e.fail && e.fail(`服务器接口异常[${t.statusCode}]`);
    },
    fail (A) {
      e.fail && e.fail('网络异常，请稍后重试');
    },
    complete (A) {
      r && R(i), e.complete && e.complete(A);
    },
  });
};
var M = function (e) {
  A.url == '/wechat/login.json' && (t.globalData.version = 'default');
  const n = l(e.url);
  let i = '';
  let r = e.data;
  const a = e.method.toLowerCase();
  const o = e.contentType.toLowerCase();
  a == 'get' ||
    (a == 'post' &&
      (o == 'application/x-www-form-urlencoded' ||
        o == 'application/octet-stream'))
    ? e1(i) == 'object'
      ? Object.assign2(n, i)
      : Object.assign2(n, v(`?${i}`))
    : (e1(i) == 'object' && ((i = JSON.stringify(i)), (A.data = i)), (r = i));
  const s = m(new Date().getTime()); const u = g(); const c = j(n, i, s, u); let f = e.header || {};
  (b(e.auth) || e.auth) && (f = Object.assign(f, {
    'x-token': Z('accessToken') || '',
  })), Object.assign(f || {}, {
    'x-timestamp': s,
    'x-nonce': u,
    'x-sign': c,
  }), e.header = f;
};
var j = function (A, e, t, n) {
  const i = new Array();
  if (Object.keys(A).sort().forEach((e) => {
    const t = A[e];
    if (y(t)) {
      const n = p(t);
      i.push(`${q(e)}=${q(n)}`);
    }
  }), y(e)) {
    const r = p(e);
    i.push(q(r));
  }
  i.push(`timestamp=${t}`), i.push(`nonce=${n}`), i.push(`key=${d}`);
  const a = i.join('&'); const o = D(`${t}@@${d}`); const s = D(`${n}@@${d}`); const u = S(a);
  return D(`[${o}#${D(u)}#${s}]`);
};
var y = function (A) {
  const e = p(A).toLowerCase();
  return P(e) && !z(e, ['null', 'undefined', '{}', '[]']) && e.length <= 2048;
};
const W = function (e, n) {
  if (typeof A === 'string' && typeof e === 'string') {
    A = JSON.parse(A);
    e = JSON.parse(e);
  }
  // '/wechat/login.json' == A.url &&
  //     (t.globalData.version = e.header['x-version'] || 'default');
  let i = n.data;
  if (A(i) != 'object') {
    try {
      i = JSON.parse(i);
    } catch (A) {}
  }
  if (n.header['x-encrypt'] || !1) {
    for (var r = e.header['x-sign'] || '', a = D(x(`${r}:${d}`)).substring(8, 24).toUpperCase().split(''), o = 0; o < a.length / 2; o++) {
      const s = a[2 * o];
      a[2 * o] = a[2 * o + 1], a[2 * o + 1] = s;
    }
    const u = a.join(''); const c = i.encrypt || JSON.parse(i).encrypt; const f = B(c, u);
    try {
      i = JSON.parse(f);
    } catch (A) {
      i = f;
    }
  }
  return i;
};

const H = function (A, e, t) {
  wx.navigateToMiniProgram && wx.navigateToMiniProgram({
    appId: A,
    path: e,
    extraData: t || {},
  });
};
var O = function (A) {
  let e; const t = wx.getStorageSync && wx.getStorageSync(A) || {};
  return (t.timestamp || 0) > new Date().getTime() ? e = t.value : (e = null, I(A)),
  e;
};
const E = function (A, e) {
  const t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Number.MAX_VALUE; const n = {
    value: e,
    timestamp: new Date().getTime() + t,
  };
  wx.setStorage && wx.setStorage({
    key: A,
    data: n,
  });
};
var I = function (A) {
  wx.removeStorage && wx.removeStorage({
    key: A,
  });
};
const U = function () {
  wx.clearStorage && wx.clearStorage();
};
var Z = function (A) {
  for (var e, n = t.globalData, i = A.split('.'), r = 0; r < i.length; r++) {
    const a = n[i[r]];
    if (r == i.length - 1) P(a) && (e = a); else {
      if (b(a)) break;
      n = a;
    }
  }
  return e;
};
const V = function (A) {
  return A < 10 ? `0${A}` : `${A}`;
};
const ALL = {
  CC (a, b) {
    const obj = W(a, b);
    if (typeof obj === 'string') {
      return obj;
    }
    return JSON.stringify(obj);
  },
  timeDifference (A, e) {
    const t = A - e; const n = (Math.floor(t / 864e5), t % 864e5); const i = (Math.floor(n / 36e5),
    n % 36e5); const r = Math.floor(t / 6e4); const a = i % 6e4; const o = Math.floor(a / 1e3);
    return `${V(r)}:${V(o)}`;
  },
  replaceHtml (A) {
    return A.replace(/(<([^>]+)>)/gi, '');
  },
  throttle (A) {
    const e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
    let t = null;
    return function () {
      const n = this;
      const r = arguments;
      const i = new Date().getTime();
      (l(t) || i - t > e) && ((t = i), A.apply(n, r));
    };
  },
  debounce (A) {
    const e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
    let t = null;
    return function () {
      const n = this;
      const r = arguments;
      m(t) && clearTimeout(t),
      (t = setTimeout(() => {
        A.apply(n, r);
      }, e));
    };
  },
  uuid: g,
  getQueryParam: v,
  getQueryString (A, e) {
    if (l(A) || l(e)) return null;
    const t = new RegExp(`[?&]${e}=?([^&]*)`, 'i');
    const n = A.match(t);
    return l(n) ? null : n[1];
  },
  compare (A) {
    return function (e, t) {
      const n = e[A];
      return t[A] - n;
    };
  },
  isNone: v,
  string: m,
  trim: p,
  reverse: x,
  isEmpty: b,
  isNotEmpty: P,
  isTrue (A) {
    return !v(A) && m(A).toLowerCase() == 'true';
  },
  isFalse (A) {
    return !v(A) && m(A).toLowerCase() == 'false';
  },
  inArray: z,
  chunk (A, e) {
    for (var t = [], n = 0; n < A.length; n += e) t.push(A.slice(n, n + e));
    return t;
  },
  getWeek (A) {
    return [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ][new Date(A).getDay()];
  },
  getNoon (A) {
    return A == 1
      ? '上午'
      : A == 2
        ? '下午'
        : A == 3
          ? '昼夜'
          : A == 4
            ? '全天'
            : A;
  },
  timestampToTime (A) {
    const e = new Date(A);
    return (
      `${e.getFullYear()
      }-${
        e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1
      }-${
        e.getDate() < 10 ? `0${e.getDate()}` : e.getDate()
      } ${
        e.getHours()
      }:${
        e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes()
      }:${
        e.getSeconds() < 10 ? `0${e.getSeconds()}` : e.getSeconds()}`
    );
  },
  dateTo (A) {
    let e = A.substring(0, A.indexOf('/'));
    const t = A.substring(A.indexOf('/') + 1, A.lastIndexOf('/'));
    const n = A.substring(A.lastIndexOf('/') + 1, A.indexOf(' '));
    return (
      (e = `${e}-`) + (t < 10 ? `0${t}` : `${t}-`) + (n < 10 ? `0${n}` : n)
    );
  },
  getStandardDate (A) {
    let e = '';
    if (m(A)) {
      A = A.trim();
      const t = /^\d{4}\-[0-1]\d\-[0-3]\d\s+[0-2]\d\:[0-5]\d\:[0-5]\d\.\d+$/;
      e = /^\d{4}[0-1]\d[0-3]\d[0-2]\d[0-5]\d[0-5]\d$/.test(A)
        ? `${A.substring(0, 4)
        }-${
          A.substring(4, 6)
        }-${
          A.substring(6, 8)
        } ${
          A.substring(8, 10)
        }:${
          A.substring(10, 12)
        }:${
          A.substring(12, 14)}`
        : t.test(A)
          ? A.substring(0, A.indexOf('.'))
          : A;
    }
    return e;
  },
  getLongDate (A) {
    let e = '';
    if (m(A)) {
      A = A.trim();
      const t = /^\d{4}\-[0-1]\d\-[0-3]\d\s+[0-2]\d\:[0-5]\d\:[0-5]\d$/;
      if (/^\d{4}\-[0-1]\d\-[0-3]\d$/.test(A)) {
        e =
          (n = new Date(A)).getFullYear() +
          x(n.getMonth() + 1) +
          x(n.getDate());
      } else if (t.test(A)) {
        var n = new Date(A);
        e =
          n.getFullYear() +
          x(n.getMonth() + 1) +
          x(n.getDate()) +
          x(n.getHours()) +
          x(n.getMinutes()) +
          x(n.getSeconds());
      } else e = A;
    }
    return e;
  },
  getFormatDateTime (A) {
    const e = new Date(A);
    const t = e.getFullYear();
    const n = e.getMonth() + 1;
    const r = e.getDate();
    const i = e.getHours();
    const a = e.getMinutes();
    const o = e.getSeconds();
    return `${t}-${x(n)}-${x(r)} ${x(i)}:${x(a)}:${x(o)}`;
  },
  zeroPadding: x,
  arraySplit (A, e, t, n) {
    for (var r = [], i = [], a = 0; a < A.length; a++) {
      i.push(A[a]),
      ((a != 0 && (a + 1) % e == 0) || a == A.length - 1) &&
          (r.push(i), (i = []));
    }
    if (t && r.length > 0) {
      for (var o = r[r.length - 1], s = e - o.length, a = 0; a < s; a++) { o.push(n); }
    }
    return r;
  },
  searchByKey (A, e, t) {
    return (
      (t != '' &&
        A.filter((A) => {
          return A[e].indexOf(t) != -1;
        })) ||
      []
    );
  },
  isInTimeRange (A, e, t) {
    const n = A.split(':');
    if (n.length != 2) return !1;
    const r = e.split(':');
    if (r.length != 2) return !1;
    const i = t.split(':');
    if (r.length != 2) return !1;
    const a = new Date();
    const o = new Date();
    const s = new Date();
    return (
      a.setHours(n[0]),
      a.setMinutes(n[1]),
      o.setHours(r[0]),
      o.setMinutes(r[1]),
      s.setHours(i[0]),
      s.setMinutes(i[1]),
      s.getTime() - a.getTime() > 0 && s.getTime() - o.getTime() < 0
    );
  },
  gethw (A, e) {
    let t = '';
    const n = e.substring(0, e.indexOf('-'));
    const r = e.substring(e.indexOf('-') + 1);
    return (
      Number(A) < Number(n) && (t = 'l'), Number(A) > Number(r) && (t = 'h'), t
    );
  },
  getSex (A) {
    return parseInt(A.slice(-2, -1)) % 2 == 1 ? '1' : '2';
  },
  getAge (A) {
    const e = (`${A}`).length;
    if (e == 0) return 0;
    if (e != 15 && e != 18) return 0;
    let t = '';
    e == 18 &&
      (t = `${A.substr(6, 4)}/${A.substr(10, 2)}/${A.substr(12, 2)}`),
    e == 15 &&
        (t =
          `19${A.substr(6, 2)}/${A.substr(8, 2)}/${A.substr(10, 2)}`);
    const n = new Date(t);
    const r = new Date();
    let i = r.getFullYear() - n.getFullYear();
    return (
      (r.getMonth() < n.getMonth() ||
        (r.getMonth() == n.getMonth() && r.getDate() < n.getDate())) &&
        i--,
      i
    );
  },
  checkNumber (A, e) {
    new RegExp('^\\d+[a-z]*$');
    return (
      isNaN(e) ? new RegExp('^[0-9]+$') : new RegExp(`^[0-9]{${e}}$`)
    ).test(A);
  },
  checkPhone: b,
  checkIdCard: P,
  handlePhoneSensitive (A) {
    return b(A) ? A.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : A;
  },
  handleIdCardSensitive (A) {
    return P(A) ? A.replace(/^(\d{4})\d{10}(\d{4})$/, '$1**********$2') : A;
  },
  getInfoByIdCard (A, e) {
    if (e == 1) {
      return (
        `${A.substring(6, 10)
        }-${
          A.substring(10, 12)
        }-${
          A.substring(12, 14)}`
      );
    }
    if (e == 2) return parseInt(A.substr(16, 1)) % 2 == 1 ? '男' : '女';
    if (e == 3) {
      const t = new Date();
      const n = t.getMonth() + 1;
      const r = t.getDate();
      let i = t.getFullYear() - A.substring(6, 10) - 1;
      return (
        (A.substring(10, 12) < n ||
          (A.substring(10, 12) == n && A.substring(12, 14) <= r)) &&
          i++,
        i
      );
    }
  },
  request (A, version) {
    if (version) {
      AppData.globalData.version = version;
    }
    if (typeof A === 'string') {
      A = JSON.parse(A);
      return z(A);
    }
    z(A);
  },
  showModal (A) {
    wx.showModal({
      title: A.title || '温馨提示',
      content: A.content || '',
      showCancel: A.showCancel || !1,
      cancelText: A.cancelText || '取消',
      cancelColor: A.cancelColor || '#404040',
      confirmText: A.confirmText || '确定',
      confirmColor: A.confirmColor || '#14c79d',
      success (e) {
        A.success && A.success(e);
      },
      fail () {
        A.fail && A.fail();
      },
      complete () {
        A.complete && A.complete();
      },
    });
  },
  showToast (A) {
    wx.showToast({
      title: A.title || '提示信息',
      icon: A.icon || 'none',
      duration: A.duration || 1500,
      mask: !1,
    });
  },
  hideToast () {
    wx.hideToast();
  },
  showLoading: M,
  hideLoading: w,
  showTabBar () {
    const A = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    wx.showTabBar &&
      wx.showTabBar({
        animation: A,
      });
  },
  hideTabBar (A) {
    wx.hideTabBar &&
      wx.hideTabBar({
        animation: A,
      });
  },
  setNavigationBarTitle (A) {
    wx.setNavigationBarTitle({
      title: A || '标题',
    });
  },
  setNavigationBarColor (A, e) {
    wx.setNavigationBarColor({
      frontColor: e || '#ffffff',
      backgroundColor: A || '#14c79d',
    });
  },
  getMenuButtonBoundingClientRect () {
    return (
      wx.getMenuButtonBoundingClientRect && wx.getMenuButtonBoundingClientRect()
    );
  },
  navigateTo (A) {
    wx.navigateTo({
      url: A,
    });
  },
  navigateBack (A) {
    wx.navigateBack({
      delta: A || 1,
    });
  },
  redirectTo (A) {
    wx.redirectTo({
      url: A,
    });
  },
  reLaunch (A) {
    wx.reLaunch({
      url: A,
    });
  },
  switchTab (A) {
    wx.switchTab({
      url: A,
    });
  },
  navigateToMiniProgram: j,
  navigateBackMiniProgram (A) {
    wx.navigateBackMiniProgram &&
      wx.navigateBackMiniProgram({
        extraData: A || {},
      });
  },
  navigateToWebPage (A) {
    j(
      'wx308bd2aeb83d3345',
      `pages/jump/main?serviceId=1000836&path=${encodeURIComponent(A)}`,
    );
  },
  createAnimation () {
    const A = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return wx.createAnimation({
      delay: m(A.delay) ? A.delay : 0,
      duration: m(A.duration) ? A.duration : 400,
      timingFunction: A.timingFunction || 'ease',
    });
  },
  previewImage (A) {
    wx.previewImage({
      urls: [A],
    });
  },
  makePhoneCall (A) {
    wx.makePhoneCall({
      phoneNumber: A,
    });
  },
  scanCode (A, e, t, n) {
    wx.scanCode({
      onlyFromCamera: A.onlyFromCamera || !1,
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
      success (A) {
        e && e(A);
      },
      fail () {
        t && t();
      },
      complete () {
        n && n();
      },
    });
  },
  requestPayment (A, e, t, n) {
    wx.requestPayment({
      timeStamp: A.timeStamp,
      nonceStr: A.nonceStr,
      package: A.package,
      signType: A.signType,
      paySign: A.sign,
      success (A) {
        e && e(A);
      },
      fail (A) {
        t && t(A);
      },
      complete () {
        n && n();
      },
    });
  },
  openLocation (A) {
    wx.openLocation({
      name: A.name || '北京大学口腔医院',
      address: A.address || '北京市海淀区中关村南大街22号',
      latitude: A.latitude || 39.95227,
      longitude: A.longitude || 116.32524,
      scale: A.scale || 16,
    });
  },
  addCard (A, e, t, n) {
    wx.addCard({
      cardList: [
        {
          cardId: A,
          cardExt: e,
        },
      ],
      success (A) {
        t && t(A);
      },
      fail () {
        n && n();
      },
    });
  },
  openCard (A, e, t, n) {
    wx.openCard({
      cardList: [
        {
          cardId: A,
          code: e,
        },
      ],
      success () {
        t && t();
      },
      fail () {
        n && n();
      },
    });
  },
  getSystemInfo () {
    return wx.getSystemInfoSync();
  },
  getStorage: y,
  setStorage: W,
  removeStorage: R,
  clearStorage: F,
  selectElement (A, e, t) {
    let n = wx.createSelectorQuery();
    t && (n = n.in(t)),
    n
      .select(A)
      .fields(
        {
          size: !0,
          rect: !0,
          scrollOffset: !0,
          dataset: !0,
        },
        (A) => {
          e && e(A);
        },
      )
      .exec();
  },
  showActionSheet () {
    const A = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    wx.showActionSheet &&
      wx.showActionSheet({
        itemColor: A.itemColor || '#404040',
        itemList: A.itemList || [],
        success (e) {
          A.success && A.success(e);
        },
        fail () {
          A.fail && A.fail();
        },
        complete () {
          A.complete && A.complete();
        },
      });
  },
  onUserCaptureScreen (A) {
    wx.onUserCaptureScreen((e) => {
      A && A(e);
    });
  },
  startFacialRecognitionVerify (A, e, t, n, r) {
    wx.checkIsSupportFacialRecognition({
      success () {
        wx.startFacialRecognitionVerify({
          name: A,
          idCardNumber: e,
          checkAliveType: t,
          success (A) {
            n && n(A);
          },
          fail (A) {
            r && r(A);
          },
        });
      },
      fail (A) {
        r && r(A);
      },
    });
  },
  canIUse (A) {
    return wx.canIUse && wx.canIUse(A);
  },
  getShareMessage () {
    return {
      title: '就医更便捷、缴费少排队！',
      path: '/pages/welcome/index',
      imageUrl:
        'http://resource.leanpay.cn/INCOMM/M00/00/AF/rBsAEF5KTxyAT8aGAAEs8qtsiAw643.jpg',
    };
  },
  getGlobalData: H,
  getVisitor (A) {
    const e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    const t = H('cacheData.visitors');
    if (l(t)) {
      return {
        visitorArr: [],
        visitorSelectorArr: [],
        default: {},
      };
    }
    for (var n = {}, r = 0; r < t.length; r++) {
      (a = t[r]),
      l(n[a.visitorIdCard]) &&
          (n[a.visitorIdCard] = {
            visitorId: a.visitorId,
            visitorName: a.visitorName,
            visitorSex: a.visitorSex,
            visitorIdCard: a.visitorIdCard,
            visitorIdCardDisplay: a.visitorIdCardDisplay,
            visitorPhone: a.visitorPhone,
            visitorPhoneDisplay: a.visitorPhoneDisplay,
            visitorRelation: a.visitorRelation,
            visitorCards: [],
          }),
      n[a.visitorIdCard].visitorCards.push({
        uniqueId: a.uniqueId,
        visitorCardNo: a.visitorCardNo,
        visitorCardFlag: a.visitorCardFlag,
        visitorCardState: a.visitorCardState,
        isDefault: a.isDefault,
      });
    }
    const i = [];
    for (var a in n) i.push(n[a]);
    for (var o = [], r = 0; r < t.length; r++) {
      (a = t[r]),
      o.push({
        text: [a.visitorName, a.visitorCardNo],
        value: a.visitorId,
        disable: e && !E(a.visitorCardFlag),
      });
    }
    let s = {};
    if (m(A)) {
      for (r = 0; r < t.length; r++) {
        if ((a = t[r]).visitorId == A && (!e || E(a.visitorCardFlag))) {
          s = a;
          break;
        }
      }
    }
    if (l(s.visitorId)) {
      for (r = 0; r < t.length; r++) {
        if ((a = t[r]).isDefault && (!e || E(a.visitorCardFlag))) {
          s = a;
          break;
        }
      }
    }
    if (l(s.visitorId)) {
      for (r = 0; r < t.length; r++) {
        if (((a = t[r]), E(a.visitorCardFlag))) {
          s = a;
          break;
        }
      }
    }
    return (
      l(s.visitorId) && !e && (s = a = t[0]),
      {
        visitorArr: t,
        groupVisitorArr: i,
        visitorSelectorArr: o,
        default: s,
      }
    );
  },
  getAppById (A) {
    return n.getAppById(A);
  },
  saveFavourite (A) {
    const e = n.getAppById(A);
    l(e) ||
      wx.getStorage({
        key: 'x-use',
        complete (t) {
          let n = t.data;
          l(n) && (n = []);
          for (var r = [], i = 0; i < n.length; i++) {
            const a = n[i];
            a.appId != A && r.push(a);
          }
          r.length == 4 && r.splice(3, 1),
          r.splice(0, 0, e),
          wx.setStorage({
            key: 'x-use',
            data: r,
          });
        },
      });
  },
  getFavourite () {
    return wx.getStorageSync('x-use');
  },
  // 空图
  getUnAvailableImg () {
    return '';
  },
  selectComponent (A, e) {
    return (A.selectComponent && A.selectComponent(e)) || {};
  },
  firstRun (A, e) {
    const t = y(A) || '';
    l(t) && (W(A, Math.random()), e && e());
  },
  justRun (A, e, t) {
    if (e != 0) {
      const n = y(A) || '';
      l(n) &&
        (e < 0 ? W(A, Math.random()) : e > 0 && W(A, Math.random(), e),
        t && t());
    } else t && t();
  },
  checkSession () {
    wx.checkSession({
      fail () {
        O();
      },
    });
  },
  login: O,
  isAuthed () {
    return m(H('auth.user'));
  },
  loadToken: N,
  // getClock: function (A) {
  //     var e = o.Clock;
  //     return e.init(A), e;
  // },
  getCipherExpire () {
    return Number('60') || 0;
  },
  // encryptWithRsa: function (A, e) {
  //     var t = a.Cipher;
  //     return t.setPublicKey(e.toString()), t.encrypt(A.toString());
  // },
  // decryptWithRsa: function (A, e) {
  //     var t = a.Cipher;
  //     return t.setPrivateKey(e.toString()), t.decrypt(A.toString());
  // },
  // encryptWithAes: function (A, e) {
  //     var t = s.enc.Utf8.parse(e.toString()),
  //         n = s.enc.Utf8.parse(p(e.toString()));
  //     return s.AES.encrypt(A.toString(), t, {
  //         iv: n,
  //         mode: s.mode.CBC,
  //         padding: s.pad.Pkcs7
  //     }).toString();
  // },
  decryptWithAes: B,
  // encryptWithRc4: function (A, e) {
  //     var t = s.enc.Utf8.parse(e.toString());
  //     return s.RC4.encrypt(A.toString(), t).toString();
  // },
  // decryptWithRc4: function (A, e) {
  //     var t = s.enc.Utf8.parse(e.toString()),
  //         n = s.RC4.decrypt(A.toString(), t);
  //     return s.enc.Utf8.stringify(n);
  // },
  md5: D,
  // zip: function (A) {
  //     var e = u.gzip(A.toString(), {
  //         to: 'string'
  //     });
  //     return U(e);
  // },
  // unzip: function (A) {
  //     var e = K(A.toString());
  //     return u.ungzip(e, {
  //         to: 'string'
  //     });
  // },
  encodeBase64: S,
  decodeBase64: X,
  encodeUnicode: q,
  decodeUnicode (A) {
    for (var e = '', t = A.toString().match(/\\u[0-9a-f]{4}/gi), n = 0; n < t.length; n++) {
      const i = t[n].replace(/\\u/i, '');
      e += String.fromCharCode(parseInt(i, 16).toString(10));
    }
    return e;
  },
  sendTemplateMessage: S,
  sendTemplateMessage_yygh_done (A) {
    const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
    S({
      templateId: 'pxGLAiBKC02FE_7AUF9D7pyzUHUV8iFsLjP1YfgiXSU',
      formId: A || '',
      data: e || {},
      emphasisKeyword: 'keyword1.DATA',
      page:
        `/pages/personal-center/index?page=${
          encodeURIComponent(`/pages/personal-cent/yyjl/index?${t}`)}`,
    });
  },
  sendTemplateMessage_yygh_cancel (A) {
    const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
    S({
      templateId: 'ukSkktFGuqwUUnQ1AHnF_szkwGA7B9v74_mdFHoD5hY',
      formId: A || '',
      data: e || {},
      emphasisKeyword: 'keyword1.DATA',
      page:
        `/pages/ucenter/index?page=${
          encodeURIComponent(`/pages/yygh/ghjl/index?${t}`)}`,
    });
  },
  sendTemplateMessage_dtgh_done (A) {
    const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
    S({
      templateId: 'Ai5xOTvJ3s3J9eNvWruOptzVJkiONBBx3_xawVj1cUM',
      formId: A || '',
      data: e || {},
      emphasisKeyword: 'keyword1.DATA',
      page:
        `/pages/ucenter/index?page=${
          encodeURIComponent(`/pages/dtgh/ghjl/index?${t}`)}`,
    });
  },
  sendTemplateMessage_dtgh_cancel (A) {
    const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
    S({
      templateId: '13jCA-1wrvdQ2UkaPBc5EjLChewbuONx-hQkWRWkUNc',
      formId: A || '',
      data: e || {},
      emphasisKeyword: 'keyword1.DATA',
      page:
        `/pages/ucenter/index?page=${
          encodeURIComponent(`/pages/dtgh/ghjl/index?${t}`)}`,
    });
  },
  sendTemplateMessage_mzcz_done (A) {
    const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    S({
      templateId: 'hjf9rPLu50vd155GVONUc4AhyABoXmMvEdR4DuQvgQM',
      formId: A || '',
      data: e || {},
      emphasisKeyword: 'keyword3.DATA',
      page:
        `/pages/ucenter/index?page=${
          encodeURIComponent('/pages/mzcz/czjl/index')}`,
    });
  },
  sendTemplateMessage_zycz_done (A) {
    const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    S({
      templateId: 'Gyd5cd3tJ_inu6u4DgPGWrd__lHi7SWK7uKoM4FWobE',
      formId: A || '',
      data: e || {},
      emphasisKeyword: 'keyword3.DATA',
      page:
        `/pages/ucenter/index?page=${
          encodeURIComponent('/pages/zycz/czjl/index')}`,
    });
  },
  chunk (A, e) {
    for (var t = [], n = 0; n < A.length; n += e) t.push(A.slice(n, n + e));
    return t;
  },
  checklength (A) {
    return !(A.length < 7);
  },
  jsonObjectIsEmpty (A) {
    let e = !0;
    for (const t in A) {
      e = !1;
      break;
    }
    return e;
  },
  timeRange (A, e, t) {
    const n = A.split(':');
    if (n.length != 2) return !1;
    const r = e.split(':');
    if (r.length != 2) return !1;
    const i = t.split(':');
    if (r.length != 2) return !1;
    const a = new Date();
    const o = new Date();
    const s = new Date();
    return (
      a.setHours(n[0]),
      a.setMinutes(n[1]),
      o.setHours(r[0]),
      o.setMinutes(r[1]),
      s.setHours(i[0]),
      s.setMinutes(i[1]),
      s.getTime() - a.getTime() > 0 && s.getTime() - o.getTime() < 0
    );
  },
  splitStr (A, e) {
    const t = A.lastIndexOf('|');
    return (A = e == 0 ? A.substring(0, t) : A.substring(t + 1, A.length));
  },
  checkTidcard (A) {
    return /^[a-zA-Z][0-9]{9}$/.test(A);
  },
  checkGAidcard (A) {
    return /^([A-Z]\d{6,10}(\w1)?)$/.test(A);
  },
  timestampToTime2 (A) {
    const e = new Date(A);
    return (
      `${e.getFullYear()
      }-${
        e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1
      }-${
        e.getDate() < 10 ? `0${e.getDate()}` : e.getDate()}`
    );
  },
  getNowMonthAndDay () {
    const A = new Date();
    let e = A.getMonth() + 1;
    let t = A.getDate();
    return (
      e < 10 && (e = `0${e}`), t < 10 && (t = `0${t}`), `${e}月${t}日`
    );
  },
  searchByKey3 (A, e, t) {
    return (
      (t != '' &&
        A.filter((A) => {
          return !!A.hasOwnProperty(e) && A[e].match(t);
        })) ||
      []
    );
  },
  isEmptyObject (A) {
    return Object.keys(A).length === 0;
  },
  getCurrentPages () {
    const A = getCurrentPages();
    const e = A[A.length - 1];
    t.globalData.currentPage = `/${e.route}`;
  },
  getInviteCode () {
    return H('inviteCode') || '';
  },
  setInviteCode (A) {
    t.globalData.inviteCode = A;
  },
};
