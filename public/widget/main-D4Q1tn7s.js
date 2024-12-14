import * as be from "react";
import ct, { forwardRef as hc, createElement as Qs, useState as Ee, useRef as Zs, useEffect as Fe } from "react";
import dc from "react-dom";
var ke = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function fc(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function mc(n) {
  if (n.__esModule) return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(t, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), t;
}
var Nn = { exports: {} }, Ut = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ei;
function gc() {
  if (ei) return Ut;
  ei = 1;
  var n = ct, e = Symbol.for("react.element"), t = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, s = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(o, c, l) {
    var u, h = {}, f = null, m = null;
    l !== void 0 && (f = "" + l), c.key !== void 0 && (f = "" + c.key), c.ref !== void 0 && (m = c.ref);
    for (u in c) r.call(c, u) && !i.hasOwnProperty(u) && (h[u] = c[u]);
    if (o && o.defaultProps) for (u in c = o.defaultProps, c) h[u] === void 0 && (h[u] = c[u]);
    return { $$typeof: e, type: o, key: f, ref: m, props: h, _owner: s.current };
  }
  return Ut.Fragment = t, Ut.jsx = a, Ut.jsxs = a, Ut;
}
var Bt = {}, ti;
function pc() {
  if (ti) return Bt;
  ti = 1;
  var n = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return n.NODE_ENV !== "production" && function() {
    var e = ct, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), c = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), g = Symbol.iterator, _ = "@@iterator";
    function T(d) {
      if (d === null || typeof d != "object")
        return null;
      var y = g && d[g] || d[_];
      return typeof y == "function" ? y : null;
    }
    var w = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(d) {
      {
        for (var y = arguments.length, b = new Array(y > 1 ? y - 1 : 0), R = 1; R < y; R++)
          b[R - 1] = arguments[R];
        v("error", d, b);
      }
    }
    function v(d, y, b) {
      {
        var R = w.ReactDebugCurrentFrame, W = R.getStackAddendum();
        W !== "" && (y += "%s", b = b.concat([W]));
        var V = b.map(function(L) {
          return String(L);
        });
        V.unshift("Warning: " + y), Function.prototype.apply.call(console[d], console, V);
      }
    }
    var E = !1, k = !1, x = !1, B = !1, U = !1, $;
    $ = Symbol.for("react.module.reference");
    function j(d) {
      return !!(typeof d == "string" || typeof d == "function" || d === s || d === a || U || d === i || d === u || d === h || B || d === p || E || k || x || typeof d == "object" && d !== null && (d.$$typeof === m || d.$$typeof === f || d.$$typeof === o || d.$$typeof === c || d.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      d.$$typeof === $ || d.getModuleId !== void 0));
    }
    function de(d, y, b) {
      var R = d.displayName;
      if (R)
        return R;
      var W = y.displayName || y.name || "";
      return W !== "" ? b + "(" + W + ")" : b;
    }
    function le(d) {
      return d.displayName || "Context";
    }
    function te(d) {
      if (d == null)
        return null;
      if (typeof d.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof d == "function")
        return d.displayName || d.name || null;
      if (typeof d == "string")
        return d;
      switch (d) {
        case s:
          return "Fragment";
        case r:
          return "Portal";
        case a:
          return "Profiler";
        case i:
          return "StrictMode";
        case u:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case c:
            var y = d;
            return le(y) + ".Consumer";
          case o:
            var b = d;
            return le(b._context) + ".Provider";
          case l:
            return de(d, d.render, "ForwardRef");
          case f:
            var R = d.displayName || null;
            return R !== null ? R : te(d.type) || "Memo";
          case m: {
            var W = d, V = W._payload, L = W._init;
            try {
              return te(L(V));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ae = Object.assign, Le = 0, He, oe, dt, ft, P, O, Y;
    function ue() {
    }
    ue.__reactDisabledLog = !0;
    function gr() {
      {
        if (Le === 0) {
          He = console.log, oe = console.info, dt = console.warn, ft = console.error, P = console.group, O = console.groupCollapsed, Y = console.groupEnd;
          var d = {
            configurable: !0,
            enumerable: !0,
            value: ue,
            writable: !0
          };
          Object.defineProperties(console, {
            info: d,
            log: d,
            warn: d,
            error: d,
            group: d,
            groupCollapsed: d,
            groupEnd: d
          });
        }
        Le++;
      }
    }
    function on() {
      {
        if (Le--, Le === 0) {
          var d = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ae({}, d, {
              value: He
            }),
            info: ae({}, d, {
              value: oe
            }),
            warn: ae({}, d, {
              value: dt
            }),
            error: ae({}, d, {
              value: ft
            }),
            group: ae({}, d, {
              value: P
            }),
            groupCollapsed: ae({}, d, {
              value: O
            }),
            groupEnd: ae({}, d, {
              value: Y
            })
          });
        }
        Le < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mt = w.ReactCurrentDispatcher, cn;
    function pr(d, y, b) {
      {
        if (cn === void 0)
          try {
            throw Error();
          } catch (W) {
            var R = W.stack.trim().match(/\n( *(at )?)/);
            cn = R && R[1] || "";
          }
        return `
` + cn + d;
      }
    }
    var ln = !1, _r;
    {
      var Uo = typeof WeakMap == "function" ? WeakMap : Map;
      _r = new Uo();
    }
    function Ls(d, y) {
      if (!d || ln)
        return "";
      {
        var b = _r.get(d);
        if (b !== void 0)
          return b;
      }
      var R;
      ln = !0;
      var W = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var V;
      V = mt.current, mt.current = null, gr();
      try {
        if (y) {
          var L = function() {
            throw Error();
          };
          if (Object.defineProperty(L.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(L, []);
            } catch (fe) {
              R = fe;
            }
            Reflect.construct(d, [], L);
          } else {
            try {
              L.call();
            } catch (fe) {
              R = fe;
            }
            d.call(L.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (fe) {
            R = fe;
          }
          d();
        }
      } catch (fe) {
        if (fe && R && typeof fe.stack == "string") {
          for (var D = fe.stack.split(`
`), he = R.stack.split(`
`), K = D.length - 1, X = he.length - 1; K >= 1 && X >= 0 && D[K] !== he[X]; )
            X--;
          for (; K >= 1 && X >= 0; K--, X--)
            if (D[K] !== he[X]) {
              if (K !== 1 || X !== 1)
                do
                  if (K--, X--, X < 0 || D[K] !== he[X]) {
                    var Se = `
` + D[K].replace(" at new ", " at ");
                    return d.displayName && Se.includes("<anonymous>") && (Se = Se.replace("<anonymous>", d.displayName)), typeof d == "function" && _r.set(d, Se), Se;
                  }
                while (K >= 1 && X >= 0);
              break;
            }
        }
      } finally {
        ln = !1, mt.current = V, on(), Error.prepareStackTrace = W;
      }
      var pt = d ? d.displayName || d.name : "", Ze = pt ? pr(pt) : "";
      return typeof d == "function" && _r.set(d, Ze), Ze;
    }
    function Bo(d, y, b) {
      return Ls(d, !1);
    }
    function Wo(d) {
      var y = d.prototype;
      return !!(y && y.isReactComponent);
    }
    function yr(d, y, b) {
      if (d == null)
        return "";
      if (typeof d == "function")
        return Ls(d, Wo(d));
      if (typeof d == "string")
        return pr(d);
      switch (d) {
        case u:
          return pr("Suspense");
        case h:
          return pr("SuspenseList");
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case l:
            return Bo(d.render);
          case f:
            return yr(d.type, y, b);
          case m: {
            var R = d, W = R._payload, V = R._init;
            try {
              return yr(V(W), y, b);
            } catch {
            }
          }
        }
      return "";
    }
    var Lt = Object.prototype.hasOwnProperty, Fs = {}, Us = w.ReactDebugCurrentFrame;
    function wr(d) {
      if (d) {
        var y = d._owner, b = yr(d.type, d._source, y ? y.type : null);
        Us.setExtraStackFrame(b);
      } else
        Us.setExtraStackFrame(null);
    }
    function qo(d, y, b, R, W) {
      {
        var V = Function.call.bind(Lt);
        for (var L in d)
          if (V(d, L)) {
            var D = void 0;
            try {
              if (typeof d[L] != "function") {
                var he = Error((R || "React class") + ": " + b + " type `" + L + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[L] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw he.name = "Invariant Violation", he;
              }
              D = d[L](y, L, R, b, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (K) {
              D = K;
            }
            D && !(D instanceof Error) && (wr(W), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", R || "React class", b, L, typeof D), wr(null)), D instanceof Error && !(D.message in Fs) && (Fs[D.message] = !0, wr(W), S("Failed %s type: %s", b, D.message), wr(null));
          }
      }
    }
    var Ho = Array.isArray;
    function un(d) {
      return Ho(d);
    }
    function Jo(d) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, b = y && d[Symbol.toStringTag] || d.constructor.name || "Object";
        return b;
      }
    }
    function Vo(d) {
      try {
        return Bs(d), !1;
      } catch {
        return !0;
      }
    }
    function Bs(d) {
      return "" + d;
    }
    function Ws(d) {
      if (Vo(d))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Jo(d)), Bs(d);
    }
    var Ft = w.ReactCurrentOwner, zo = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, qs, Hs, hn;
    hn = {};
    function Yo(d) {
      if (Lt.call(d, "ref")) {
        var y = Object.getOwnPropertyDescriptor(d, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return d.ref !== void 0;
    }
    function Go(d) {
      if (Lt.call(d, "key")) {
        var y = Object.getOwnPropertyDescriptor(d, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return d.key !== void 0;
    }
    function Ko(d, y) {
      if (typeof d.ref == "string" && Ft.current && y && Ft.current.stateNode !== y) {
        var b = te(Ft.current.type);
        hn[b] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', te(Ft.current.type), d.ref), hn[b] = !0);
      }
    }
    function Xo(d, y) {
      {
        var b = function() {
          qs || (qs = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        b.isReactWarning = !0, Object.defineProperty(d, "key", {
          get: b,
          configurable: !0
        });
      }
    }
    function Qo(d, y) {
      {
        var b = function() {
          Hs || (Hs = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        b.isReactWarning = !0, Object.defineProperty(d, "ref", {
          get: b,
          configurable: !0
        });
      }
    }
    var Zo = function(d, y, b, R, W, V, L) {
      var D = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: d,
        key: y,
        ref: b,
        props: L,
        // Record the component responsible for creating this element.
        _owner: V
      };
      return D._store = {}, Object.defineProperty(D._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(D, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.defineProperty(D, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: W
      }), Object.freeze && (Object.freeze(D.props), Object.freeze(D)), D;
    };
    function ec(d, y, b, R, W) {
      {
        var V, L = {}, D = null, he = null;
        b !== void 0 && (Ws(b), D = "" + b), Go(y) && (Ws(y.key), D = "" + y.key), Yo(y) && (he = y.ref, Ko(y, W));
        for (V in y)
          Lt.call(y, V) && !zo.hasOwnProperty(V) && (L[V] = y[V]);
        if (d && d.defaultProps) {
          var K = d.defaultProps;
          for (V in K)
            L[V] === void 0 && (L[V] = K[V]);
        }
        if (D || he) {
          var X = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
          D && Xo(L, X), he && Qo(L, X);
        }
        return Zo(d, D, he, W, R, Ft.current, L);
      }
    }
    var dn = w.ReactCurrentOwner, Js = w.ReactDebugCurrentFrame;
    function gt(d) {
      if (d) {
        var y = d._owner, b = yr(d.type, d._source, y ? y.type : null);
        Js.setExtraStackFrame(b);
      } else
        Js.setExtraStackFrame(null);
    }
    var fn;
    fn = !1;
    function mn(d) {
      return typeof d == "object" && d !== null && d.$$typeof === t;
    }
    function Vs() {
      {
        if (dn.current) {
          var d = te(dn.current.type);
          if (d)
            return `

Check the render method of \`` + d + "`.";
        }
        return "";
      }
    }
    function tc(d) {
      return "";
    }
    var zs = {};
    function rc(d) {
      {
        var y = Vs();
        if (!y) {
          var b = typeof d == "string" ? d : d.displayName || d.name;
          b && (y = `

Check the top-level render call using <` + b + ">.");
        }
        return y;
      }
    }
    function Ys(d, y) {
      {
        if (!d._store || d._store.validated || d.key != null)
          return;
        d._store.validated = !0;
        var b = rc(y);
        if (zs[b])
          return;
        zs[b] = !0;
        var R = "";
        d && d._owner && d._owner !== dn.current && (R = " It was passed a child from " + te(d._owner.type) + "."), gt(d), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', b, R), gt(null);
      }
    }
    function Gs(d, y) {
      {
        if (typeof d != "object")
          return;
        if (un(d))
          for (var b = 0; b < d.length; b++) {
            var R = d[b];
            mn(R) && Ys(R, y);
          }
        else if (mn(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var W = T(d);
          if (typeof W == "function" && W !== d.entries)
            for (var V = W.call(d), L; !(L = V.next()).done; )
              mn(L.value) && Ys(L.value, y);
        }
      }
    }
    function nc(d) {
      {
        var y = d.type;
        if (y == null || typeof y == "string")
          return;
        var b;
        if (typeof y == "function")
          b = y.propTypes;
        else if (typeof y == "object" && (y.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === f))
          b = y.propTypes;
        else
          return;
        if (b) {
          var R = te(y);
          qo(b, d.props, "prop", R, d);
        } else if (y.PropTypes !== void 0 && !fn) {
          fn = !0;
          var W = te(y);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", W || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function sc(d) {
      {
        for (var y = Object.keys(d.props), b = 0; b < y.length; b++) {
          var R = y[b];
          if (R !== "children" && R !== "key") {
            gt(d), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", R), gt(null);
            break;
          }
        }
        d.ref !== null && (gt(d), S("Invalid attribute `ref` supplied to `React.Fragment`."), gt(null));
      }
    }
    var Ks = {};
    function Xs(d, y, b, R, W, V) {
      {
        var L = j(d);
        if (!L) {
          var D = "";
          (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (D += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var he = tc();
          he ? D += he : D += Vs();
          var K;
          d === null ? K = "null" : un(d) ? K = "array" : d !== void 0 && d.$$typeof === t ? (K = "<" + (te(d.type) || "Unknown") + " />", D = " Did you accidentally export a JSX literal instead of a component?") : K = typeof d, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", K, D);
        }
        var X = ec(d, y, b, W, V);
        if (X == null)
          return X;
        if (L) {
          var Se = y.children;
          if (Se !== void 0)
            if (R)
              if (un(Se)) {
                for (var pt = 0; pt < Se.length; pt++)
                  Gs(Se[pt], d);
                Object.freeze && Object.freeze(Se);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Gs(Se, d);
        }
        if (Lt.call(y, "key")) {
          var Ze = te(d), fe = Object.keys(y).filter(function(uc) {
            return uc !== "key";
          }), gn = fe.length > 0 ? "{key: someKey, " + fe.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ks[Ze + gn]) {
            var lc = fe.length > 0 ? "{" + fe.join(": ..., ") + ": ...}" : "{}";
            S(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, gn, Ze, lc, Ze), Ks[Ze + gn] = !0;
          }
        }
        return d === s ? sc(X) : nc(X), X;
      }
    }
    function ic(d, y, b) {
      return Xs(d, y, b, !0);
    }
    function ac(d, y, b) {
      return Xs(d, y, b, !1);
    }
    var oc = ac, cc = ic;
    Bt.Fragment = s, Bt.jsx = oc, Bt.jsxs = cc;
  }(), Bt;
}
var _c = {};
_c.NODE_ENV === "production" ? Nn.exports = gc() : Nn.exports = pc();
var A = Nn.exports, Ln, yc = {}, vr = dc;
if (yc.NODE_ENV === "production")
  Ln = vr.createRoot, vr.hydrateRoot;
else {
  var ri = vr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Ln = function(n, e) {
    ri.usingClientEntryPoint = !0;
    try {
      return vr.createRoot(n, e);
    } finally {
      ri.usingClientEntryPoint = !1;
    }
  };
}
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var wc = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vc = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim(), Jr = (n, e) => {
  const t = hc(
    ({
      color: r = "currentColor",
      size: s = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: a,
      className: o = "",
      children: c,
      ...l
    }, u) => Qs(
      "svg",
      {
        ref: u,
        ...wc,
        width: s,
        height: s,
        stroke: r,
        strokeWidth: a ? Number(i) * 24 / Number(s) : i,
        className: ["lucide", `lucide-${vc(n)}`, o].join(" "),
        ...l
      },
      [
        ...e.map(([h, f]) => Qs(h, f)),
        ...Array.isArray(c) ? c : [c]
      ]
    )
  );
  return t.displayName = `${n}`, t;
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bc = Jr("Archive", [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sc = Jr("MessageSquarePlus", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ec = Jr("MessageSquare", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xc = Jr("Send", [
  ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
  ["path", { d: "M22 2 11 13", key: "nzbqef" }]
]), kc = (n) => {
  let e;
  return n ? e = n : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => It).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
};
class us extends Error {
  constructor(e, t = "FunctionsError", r) {
    super(e), this.name = t, this.context = r;
  }
}
class Oc extends us {
  constructor(e) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", e);
  }
}
class Pc extends us {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class Cc extends us {
  constructor(e) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e);
  }
}
var Fn;
(function(n) {
  n.Any = "any", n.ApNortheast1 = "ap-northeast-1", n.ApNortheast2 = "ap-northeast-2", n.ApSouth1 = "ap-south-1", n.ApSoutheast1 = "ap-southeast-1", n.ApSoutheast2 = "ap-southeast-2", n.CaCentral1 = "ca-central-1", n.EuCentral1 = "eu-central-1", n.EuWest1 = "eu-west-1", n.EuWest2 = "eu-west-2", n.EuWest3 = "eu-west-3", n.SaEast1 = "sa-east-1", n.UsEast1 = "us-east-1", n.UsWest1 = "us-west-1", n.UsWest2 = "us-west-2";
})(Fn || (Fn = {}));
var Ac = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function o(u) {
      try {
        l(r.next(u));
      } catch (h) {
        a(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        a(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(o, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
};
class Tc {
  constructor(e, { headers: t = {}, customFetch: r, region: s = Fn.Any } = {}) {
    this.url = e, this.headers = t, this.region = s, this.fetch = kc(r);
  }
  /**
   * Updates the authorization header
   * @param token - the new jwt token sent in the authorisation header
   */
  setAuth(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  /**
   * Invokes a function
   * @param functionName - The name of the Function to invoke.
   * @param options - Options for invoking the Function.
   */
  invoke(e, t = {}) {
    var r;
    return Ac(this, void 0, void 0, function* () {
      try {
        const { headers: s, method: i, body: a } = t;
        let o = {}, { region: c } = t;
        c || (c = this.region), c && c !== "any" && (o["x-region"] = c);
        let l;
        a && (s && !Object.prototype.hasOwnProperty.call(s, "Content-Type") || !s) && (typeof Blob < "u" && a instanceof Blob || a instanceof ArrayBuffer ? (o["Content-Type"] = "application/octet-stream", l = a) : typeof a == "string" ? (o["Content-Type"] = "text/plain", l = a) : typeof FormData < "u" && a instanceof FormData ? l = a : (o["Content-Type"] = "application/json", l = JSON.stringify(a)));
        const u = yield this.fetch(`${this.url}/${e}`, {
          method: i || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, o), this.headers), s),
          body: l
        }).catch((p) => {
          throw new Oc(p);
        }), h = u.headers.get("x-relay-error");
        if (h && h === "true")
          throw new Pc(u);
        if (!u.ok)
          throw new Cc(u);
        let f = ((r = u.headers.get("Content-Type")) !== null && r !== void 0 ? r : "text/plain").split(";")[0].trim(), m;
        return f === "application/json" ? m = yield u.json() : f === "application/octet-stream" ? m = yield u.blob() : f === "text/event-stream" ? m = u : f === "multipart/form-data" ? m = yield u.formData() : m = yield u.text(), { data: m, error: null };
      } catch (s) {
        return { data: null, error: s };
      }
    });
  }
}
var pe = {}, hs = {}, Vr = {}, or = {}, zr = {}, Yr = {}, Rc = function() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}, Rt = Rc();
const $c = Rt.fetch, ea = Rt.fetch.bind(Rt), ta = Rt.Headers, Ic = Rt.Request, jc = Rt.Response, It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Headers: ta,
  Request: Ic,
  Response: jc,
  default: ea,
  fetch: $c
}, Symbol.toStringTag, { value: "Module" })), Dc = /* @__PURE__ */ mc(It);
var Gr = {};
Object.defineProperty(Gr, "__esModule", { value: !0 });
class Mc extends Error {
  constructor(e) {
    super(e.message), this.name = "PostgrestError", this.details = e.details, this.hint = e.hint, this.code = e.code;
  }
}
Gr.default = Mc;
var ra = ke && ke.__importDefault || function(n) {
  return n && n.__esModule ? n : { default: n };
};
Object.defineProperty(Yr, "__esModule", { value: !0 });
const Nc = ra(Dc), Lc = ra(Gr);
let Fc = class {
  constructor(e) {
    this.shouldThrowOnError = !1, this.method = e.method, this.url = e.url, this.headers = e.headers, this.schema = e.schema, this.body = e.body, this.shouldThrowOnError = e.shouldThrowOnError, this.signal = e.signal, this.isMaybeSingle = e.isMaybeSingle, e.fetch ? this.fetch = e.fetch : typeof fetch > "u" ? this.fetch = Nc.default : this.fetch = fetch;
  }
  /**
   * If there's an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   *
   * {@link https://github.com/supabase/supabase-js/issues/92}
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Set an HTTP header for the request.
   */
  setHeader(e, t) {
    return this.headers = Object.assign({}, this.headers), this.headers[e] = t, this;
  }
  then(e, t) {
    this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers["Accept-Profile"] = this.schema : this.headers["Content-Profile"] = this.schema), this.method !== "GET" && this.method !== "HEAD" && (this.headers["Content-Type"] = "application/json");
    const r = this.fetch;
    let s = r(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then(async (i) => {
      var a, o, c;
      let l = null, u = null, h = null, f = i.status, m = i.statusText;
      if (i.ok) {
        if (this.method !== "HEAD") {
          const T = await i.text();
          T === "" || (this.headers.Accept === "text/csv" || this.headers.Accept && this.headers.Accept.includes("application/vnd.pgrst.plan+text") ? u = T : u = JSON.parse(T));
        }
        const g = (a = this.headers.Prefer) === null || a === void 0 ? void 0 : a.match(/count=(exact|planned|estimated)/), _ = (o = i.headers.get("content-range")) === null || o === void 0 ? void 0 : o.split("/");
        g && _ && _.length > 1 && (h = parseInt(_[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(u) && (u.length > 1 ? (l = {
          // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
          code: "PGRST116",
          details: `Results contain ${u.length} rows, application/vnd.pgrst.object+json requires 1 row`,
          hint: null,
          message: "JSON object requested, multiple (or no) rows returned"
        }, u = null, h = null, f = 406, m = "Not Acceptable") : u.length === 1 ? u = u[0] : u = null);
      } else {
        const g = await i.text();
        try {
          l = JSON.parse(g), Array.isArray(l) && i.status === 404 && (u = [], l = null, f = 200, m = "OK");
        } catch {
          i.status === 404 && g === "" ? (f = 204, m = "No Content") : l = {
            message: g
          };
        }
        if (l && this.isMaybeSingle && (!((c = l == null ? void 0 : l.details) === null || c === void 0) && c.includes("0 rows")) && (l = null, f = 200, m = "OK"), l && this.shouldThrowOnError)
          throw new Lc.default(l);
      }
      return {
        error: l,
        data: u,
        count: h,
        status: f,
        statusText: m
      };
    });
    return this.shouldThrowOnError || (s = s.catch((i) => {
      var a, o, c;
      return {
        error: {
          message: `${(a = i == null ? void 0 : i.name) !== null && a !== void 0 ? a : "FetchError"}: ${i == null ? void 0 : i.message}`,
          details: `${(o = i == null ? void 0 : i.stack) !== null && o !== void 0 ? o : ""}`,
          hint: "",
          code: `${(c = i == null ? void 0 : i.code) !== null && c !== void 0 ? c : ""}`
        },
        data: null,
        count: null,
        status: 0,
        statusText: ""
      };
    })), s.then(e, t);
  }
};
Yr.default = Fc;
var Uc = ke && ke.__importDefault || function(n) {
  return n && n.__esModule ? n : { default: n };
};
Object.defineProperty(zr, "__esModule", { value: !0 });
const Bc = Uc(Yr);
let Wc = class extends Bc.default {
  /**
   * Perform a SELECT on the query result.
   *
   * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
   * return modified rows. By calling this method, modified rows are returned in
   * `data`.
   *
   * @param columns - The columns to retrieve, separated by commas
   */
  select(e) {
    let t = !1;
    const r = (e ?? "*").split("").map((s) => /\s/.test(s) && !t ? "" : (s === '"' && (t = !t), s)).join("");
    return this.url.searchParams.set("select", r), this.headers.Prefer && (this.headers.Prefer += ","), this.headers.Prefer += "return=representation", this;
  }
  /**
   * Order the query result by `column`.
   *
   * You can call this method multiple times to order by multiple columns.
   *
   * You can order referenced tables, but it only affects the ordering of the
   * parent table if you use `!inner` in the query.
   *
   * @param column - The column to order by
   * @param options - Named parameters
   * @param options.ascending - If `true`, the result will be in ascending order
   * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
   * `null`s appear last.
   * @param options.referencedTable - Set this to order a referenced table by
   * its columns
   * @param options.foreignTable - Deprecated, use `options.referencedTable`
   * instead
   */
  order(e, { ascending: t = !0, nullsFirst: r, foreignTable: s, referencedTable: i = s } = {}) {
    const a = i ? `${i}.order` : "order", o = this.url.searchParams.get(a);
    return this.url.searchParams.set(a, `${o ? `${o},` : ""}${e}.${t ? "asc" : "desc"}${r === void 0 ? "" : r ? ".nullsfirst" : ".nullslast"}`), this;
  }
  /**
   * Limit the query result by `count`.
   *
   * @param count - The maximum number of rows to return
   * @param options - Named parameters
   * @param options.referencedTable - Set this to limit rows of referenced
   * tables instead of the parent table
   * @param options.foreignTable - Deprecated, use `options.referencedTable`
   * instead
   */
  limit(e, { foreignTable: t, referencedTable: r = t } = {}) {
    const s = typeof r > "u" ? "limit" : `${r}.limit`;
    return this.url.searchParams.set(s, `${e}`), this;
  }
  /**
   * Limit the query result by starting at an offset `from` and ending at the offset `to`.
   * Only records within this range are returned.
   * This respects the query order and if there is no order clause the range could behave unexpectedly.
   * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
   * and fourth rows of the query.
   *
   * @param from - The starting index from which to limit the result
   * @param to - The last index to which to limit the result
   * @param options - Named parameters
   * @param options.referencedTable - Set this to limit rows of referenced
   * tables instead of the parent table
   * @param options.foreignTable - Deprecated, use `options.referencedTable`
   * instead
   */
  range(e, t, { foreignTable: r, referencedTable: s = r } = {}) {
    const i = typeof s > "u" ? "offset" : `${s}.offset`, a = typeof s > "u" ? "limit" : `${s}.limit`;
    return this.url.searchParams.set(i, `${e}`), this.url.searchParams.set(a, `${t - e + 1}`), this;
  }
  /**
   * Set the AbortSignal for the fetch request.
   *
   * @param signal - The AbortSignal to use for the fetch request
   */
  abortSignal(e) {
    return this.signal = e, this;
  }
  /**
   * Return `data` as a single object instead of an array of objects.
   *
   * Query result must be one row (e.g. using `.limit(1)`), otherwise this
   * returns an error.
   */
  single() {
    return this.headers.Accept = "application/vnd.pgrst.object+json", this;
  }
  /**
   * Return `data` as a single object instead of an array of objects.
   *
   * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
   * this returns an error.
   */
  maybeSingle() {
    return this.method === "GET" ? this.headers.Accept = "application/json" : this.headers.Accept = "application/vnd.pgrst.object+json", this.isMaybeSingle = !0, this;
  }
  /**
   * Return `data` as a string in CSV format.
   */
  csv() {
    return this.headers.Accept = "text/csv", this;
  }
  /**
   * Return `data` as an object in [GeoJSON](https://geojson.org) format.
   */
  geojson() {
    return this.headers.Accept = "application/geo+json", this;
  }
  /**
   * Return `data` as the EXPLAIN plan for the query.
   *
   * You need to enable the
   * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
   * setting before using this method.
   *
   * @param options - Named parameters
   *
   * @param options.analyze - If `true`, the query will be executed and the
   * actual run time will be returned
   *
   * @param options.verbose - If `true`, the query identifier will be returned
   * and `data` will include the output columns of the query
   *
   * @param options.settings - If `true`, include information on configuration
   * parameters that affect query planning
   *
   * @param options.buffers - If `true`, include information on buffer usage
   *
   * @param options.wal - If `true`, include information on WAL record generation
   *
   * @param options.format - The format of the output, can be `"text"` (default)
   * or `"json"`
   */
  explain({ analyze: e = !1, verbose: t = !1, settings: r = !1, buffers: s = !1, wal: i = !1, format: a = "text" } = {}) {
    var o;
    const c = [
      e ? "analyze" : null,
      t ? "verbose" : null,
      r ? "settings" : null,
      s ? "buffers" : null,
      i ? "wal" : null
    ].filter(Boolean).join("|"), l = (o = this.headers.Accept) !== null && o !== void 0 ? o : "application/json";
    return this.headers.Accept = `application/vnd.pgrst.plan+${a}; for="${l}"; options=${c};`, a === "json" ? this : this;
  }
  /**
   * Rollback the query.
   *
   * `data` will still be returned, but the query is not committed.
   */
  rollback() {
    var e;
    return ((e = this.headers.Prefer) !== null && e !== void 0 ? e : "").trim().length > 0 ? this.headers.Prefer += ",tx=rollback" : this.headers.Prefer = "tx=rollback", this;
  }
  /**
   * Override the type of the returned `data`.
   *
   * @typeParam NewResult - The new result type to override with
   */
  returns() {
    return this;
  }
};
zr.default = Wc;
var qc = ke && ke.__importDefault || function(n) {
  return n && n.__esModule ? n : { default: n };
};
Object.defineProperty(or, "__esModule", { value: !0 });
const Hc = qc(zr);
let Jc = class extends Hc.default {
  /**
   * Match only rows where `column` is equal to `value`.
   *
   * To check if the value of `column` is NULL, you should use `.is()` instead.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  eq(e, t) {
    return this.url.searchParams.append(e, `eq.${t}`), this;
  }
  /**
   * Match only rows where `column` is not equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  neq(e, t) {
    return this.url.searchParams.append(e, `neq.${t}`), this;
  }
  /**
   * Match only rows where `column` is greater than `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  gt(e, t) {
    return this.url.searchParams.append(e, `gt.${t}`), this;
  }
  /**
   * Match only rows where `column` is greater than or equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  gte(e, t) {
    return this.url.searchParams.append(e, `gte.${t}`), this;
  }
  /**
   * Match only rows where `column` is less than `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  lt(e, t) {
    return this.url.searchParams.append(e, `lt.${t}`), this;
  }
  /**
   * Match only rows where `column` is less than or equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  lte(e, t) {
    return this.url.searchParams.append(e, `lte.${t}`), this;
  }
  /**
   * Match only rows where `column` matches `pattern` case-sensitively.
   *
   * @param column - The column to filter on
   * @param pattern - The pattern to match with
   */
  like(e, t) {
    return this.url.searchParams.append(e, `like.${t}`), this;
  }
  /**
   * Match only rows where `column` matches all of `patterns` case-sensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  likeAllOf(e, t) {
    return this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this;
  }
  /**
   * Match only rows where `column` matches any of `patterns` case-sensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  likeAnyOf(e, t) {
    return this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this;
  }
  /**
   * Match only rows where `column` matches `pattern` case-insensitively.
   *
   * @param column - The column to filter on
   * @param pattern - The pattern to match with
   */
  ilike(e, t) {
    return this.url.searchParams.append(e, `ilike.${t}`), this;
  }
  /**
   * Match only rows where `column` matches all of `patterns` case-insensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  ilikeAllOf(e, t) {
    return this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this;
  }
  /**
   * Match only rows where `column` matches any of `patterns` case-insensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  ilikeAnyOf(e, t) {
    return this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this;
  }
  /**
   * Match only rows where `column` IS `value`.
   *
   * For non-boolean columns, this is only relevant for checking if the value of
   * `column` is NULL by setting `value` to `null`.
   *
   * For boolean columns, you can also set `value` to `true` or `false` and it
   * will behave the same way as `.eq()`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  is(e, t) {
    return this.url.searchParams.append(e, `is.${t}`), this;
  }
  /**
   * Match only rows where `column` is included in the `values` array.
   *
   * @param column - The column to filter on
   * @param values - The values array to filter with
   */
  in(e, t) {
    const r = Array.from(new Set(t)).map((s) => typeof s == "string" && new RegExp("[,()]").test(s) ? `"${s}"` : `${s}`).join(",");
    return this.url.searchParams.append(e, `in.(${r})`), this;
  }
  /**
   * Only relevant for jsonb, array, and range columns. Match only rows where
   * `column` contains every element appearing in `value`.
   *
   * @param column - The jsonb, array, or range column to filter on
   * @param value - The jsonb, array, or range value to filter with
   */
  contains(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `cs.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`) : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`), this;
  }
  /**
   * Only relevant for jsonb, array, and range columns. Match only rows where
   * every element appearing in `column` is contained by `value`.
   *
   * @param column - The jsonb, array, or range column to filter on
   * @param value - The jsonb, array, or range value to filter with
   */
  containedBy(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `cd.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`) : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is greater than any element in `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeGt(e, t) {
    return this.url.searchParams.append(e, `sr.${t}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is either contained in `range` or greater than any element in
   * `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeGte(e, t) {
    return this.url.searchParams.append(e, `nxl.${t}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is less than any element in `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeLt(e, t) {
    return this.url.searchParams.append(e, `sl.${t}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is either contained in `range` or less than any element in
   * `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeLte(e, t) {
    return this.url.searchParams.append(e, `nxr.${t}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where `column` is
   * mutually exclusive to `range` and there can be no element between the two
   * ranges.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeAdjacent(e, t) {
    return this.url.searchParams.append(e, `adj.${t}`), this;
  }
  /**
   * Only relevant for array and range columns. Match only rows where
   * `column` and `value` have an element in common.
   *
   * @param column - The array or range column to filter on
   * @param value - The array or range value to filter with
   */
  overlaps(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `ov.${t}`) : this.url.searchParams.append(e, `ov.{${t.join(",")}}`), this;
  }
  /**
   * Only relevant for text and tsvector columns. Match only rows where
   * `column` matches the query string in `query`.
   *
   * @param column - The text or tsvector column to filter on
   * @param query - The query text to match with
   * @param options - Named parameters
   * @param options.config - The text search configuration to use
   * @param options.type - Change how the `query` text is interpreted
   */
  textSearch(e, t, { config: r, type: s } = {}) {
    let i = "";
    s === "plain" ? i = "pl" : s === "phrase" ? i = "ph" : s === "websearch" && (i = "w");
    const a = r === void 0 ? "" : `(${r})`;
    return this.url.searchParams.append(e, `${i}fts${a}.${t}`), this;
  }
  /**
   * Match only rows where each column in `query` keys is equal to its
   * associated value. Shorthand for multiple `.eq()`s.
   *
   * @param query - The object to filter with, with column names as keys mapped
   * to their filter values
   */
  match(e) {
    return Object.entries(e).forEach(([t, r]) => {
      this.url.searchParams.append(t, `eq.${r}`);
    }), this;
  }
  /**
   * Match only rows which doesn't satisfy the filter.
   *
   * Unlike most filters, `opearator` and `value` are used as-is and need to
   * follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure they are properly sanitized.
   *
   * @param column - The column to filter on
   * @param operator - The operator to be negated to filter with, following
   * PostgREST syntax
   * @param value - The value to filter with, following PostgREST syntax
   */
  not(e, t, r) {
    return this.url.searchParams.append(e, `not.${t}.${r}`), this;
  }
  /**
   * Match only rows which satisfy at least one of the filters.
   *
   * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure it's properly sanitized.
   *
   * It's currently not possible to do an `.or()` filter across multiple tables.
   *
   * @param filters - The filters to use, following PostgREST syntax
   * @param options - Named parameters
   * @param options.referencedTable - Set this to filter on referenced tables
   * instead of the parent table
   * @param options.foreignTable - Deprecated, use `referencedTable` instead
   */
  or(e, { foreignTable: t, referencedTable: r = t } = {}) {
    const s = r ? `${r}.or` : "or";
    return this.url.searchParams.append(s, `(${e})`), this;
  }
  /**
   * Match only rows which satisfy the filter. This is an escape hatch - you
   * should use the specific filter methods wherever possible.
   *
   * Unlike most filters, `opearator` and `value` are used as-is and need to
   * follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure they are properly sanitized.
   *
   * @param column - The column to filter on
   * @param operator - The operator to filter with, following PostgREST syntax
   * @param value - The value to filter with, following PostgREST syntax
   */
  filter(e, t, r) {
    return this.url.searchParams.append(e, `${t}.${r}`), this;
  }
};
or.default = Jc;
var Vc = ke && ke.__importDefault || function(n) {
  return n && n.__esModule ? n : { default: n };
};
Object.defineProperty(Vr, "__esModule", { value: !0 });
const Wt = Vc(or);
let zc = class {
  constructor(e, { headers: t = {}, schema: r, fetch: s }) {
    this.url = e, this.headers = t, this.schema = r, this.fetch = s;
  }
  /**
   * Perform a SELECT query on the table or view.
   *
   * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
   *
   * @param options - Named parameters
   *
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   *
   * @param options.count - Count algorithm to use to count rows in the table or view.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  select(e, { head: t = !1, count: r } = {}) {
    const s = t ? "HEAD" : "GET";
    let i = !1;
    const a = (e ?? "*").split("").map((o) => /\s/.test(o) && !i ? "" : (o === '"' && (i = !i), o)).join("");
    return this.url.searchParams.set("select", a), r && (this.headers.Prefer = `count=${r}`), new Wt.default({
      method: s,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
  /**
   * Perform an INSERT into the table or view.
   *
   * By default, inserted rows are not returned. To return it, chain the call
   * with `.select()`.
   *
   * @param values - The values to insert. Pass an object to insert a single row
   * or an array to insert multiple rows.
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count inserted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   *
   * @param options.defaultToNull - Make missing fields default to `null`.
   * Otherwise, use the default value for the column. Only applies for bulk
   * inserts.
   */
  insert(e, { count: t, defaultToNull: r = !0 } = {}) {
    const s = "POST", i = [];
    if (this.headers.Prefer && i.push(this.headers.Prefer), t && i.push(`count=${t}`), r || i.push("missing=default"), this.headers.Prefer = i.join(","), Array.isArray(e)) {
      const a = e.reduce((o, c) => o.concat(Object.keys(c)), []);
      if (a.length > 0) {
        const o = [...new Set(a)].map((c) => `"${c}"`);
        this.url.searchParams.set("columns", o.join(","));
      }
    }
    return new Wt.default({
      method: s,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
  /**
   * Perform an UPSERT on the table or view. Depending on the column(s) passed
   * to `onConflict`, `.upsert()` allows you to perform the equivalent of
   * `.insert()` if a row with the corresponding `onConflict` columns doesn't
   * exist, or if it does exist, perform an alternative action depending on
   * `ignoreDuplicates`.
   *
   * By default, upserted rows are not returned. To return it, chain the call
   * with `.select()`.
   *
   * @param values - The values to upsert with. Pass an object to upsert a
   * single row or an array to upsert multiple rows.
   *
   * @param options - Named parameters
   *
   * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
   * duplicate rows are determined. Two rows are duplicates if all the
   * `onConflict` columns are equal.
   *
   * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
   * `false`, duplicate rows are merged with existing rows.
   *
   * @param options.count - Count algorithm to use to count upserted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   *
   * @param options.defaultToNull - Make missing fields default to `null`.
   * Otherwise, use the default value for the column. This only applies when
   * inserting new rows, not when merging with existing rows under
   * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
   */
  upsert(e, { onConflict: t, ignoreDuplicates: r = !1, count: s, defaultToNull: i = !0 } = {}) {
    const a = "POST", o = [`resolution=${r ? "ignore" : "merge"}-duplicates`];
    if (t !== void 0 && this.url.searchParams.set("on_conflict", t), this.headers.Prefer && o.push(this.headers.Prefer), s && o.push(`count=${s}`), i || o.push("missing=default"), this.headers.Prefer = o.join(","), Array.isArray(e)) {
      const c = e.reduce((l, u) => l.concat(Object.keys(u)), []);
      if (c.length > 0) {
        const l = [...new Set(c)].map((u) => `"${u}"`);
        this.url.searchParams.set("columns", l.join(","));
      }
    }
    return new Wt.default({
      method: a,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
  /**
   * Perform an UPDATE on the table or view.
   *
   * By default, updated rows are not returned. To return it, chain the call
   * with `.select()` after filters.
   *
   * @param values - The values to update with
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count updated rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  update(e, { count: t } = {}) {
    const r = "PATCH", s = [];
    return this.headers.Prefer && s.push(this.headers.Prefer), t && s.push(`count=${t}`), this.headers.Prefer = s.join(","), new Wt.default({
      method: r,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
  /**
   * Perform a DELETE on the table or view.
   *
   * By default, deleted rows are not returned. To return it, chain the call
   * with `.select()` after filters.
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count deleted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  delete({ count: e } = {}) {
    const t = "DELETE", r = [];
    return e && r.push(`count=${e}`), this.headers.Prefer && r.unshift(this.headers.Prefer), this.headers.Prefer = r.join(","), new Wt.default({
      method: t,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
};
Vr.default = zc;
var Kr = {}, Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.version = void 0;
Xr.version = "0.0.0-automated";
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.DEFAULT_HEADERS = void 0;
const Yc = Xr;
Kr.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${Yc.version}` };
var na = ke && ke.__importDefault || function(n) {
  return n && n.__esModule ? n : { default: n };
};
Object.defineProperty(hs, "__esModule", { value: !0 });
const Gc = na(Vr), Kc = na(or), Xc = Kr;
let Qc = class sa {
  // TODO: Add back shouldThrowOnError once we figure out the typings
  /**
   * Creates a PostgREST client.
   *
   * @param url - URL of the PostgREST endpoint
   * @param options - Named parameters
   * @param options.headers - Custom headers
   * @param options.schema - Postgres schema to switch to
   * @param options.fetch - Custom fetch
   */
  constructor(e, { headers: t = {}, schema: r, fetch: s } = {}) {
    this.url = e, this.headers = Object.assign(Object.assign({}, Xc.DEFAULT_HEADERS), t), this.schemaName = r, this.fetch = s;
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(e) {
    const t = new URL(`${this.url}/${e}`);
    return new Gc.default(t, {
      headers: Object.assign({}, this.headers),
      schema: this.schemaName,
      fetch: this.fetch
    });
  }
  /**
   * Select a schema to query or perform an function (rpc) call.
   *
   * The schema needs to be on the list of exposed schemas inside Supabase.
   *
   * @param schema - The schema to query
   */
  schema(e) {
    return new sa(this.url, {
      headers: this.headers,
      schema: e,
      fetch: this.fetch
    });
  }
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.get - When set to `true`, the function will be called with
   * read-only access mode.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(e, t = {}, { head: r = !1, get: s = !1, count: i } = {}) {
    let a;
    const o = new URL(`${this.url}/rpc/${e}`);
    let c;
    r || s ? (a = r ? "HEAD" : "GET", Object.entries(t).filter(([u, h]) => h !== void 0).map(([u, h]) => [u, Array.isArray(h) ? `{${h.join(",")}}` : `${h}`]).forEach(([u, h]) => {
      o.searchParams.append(u, h);
    })) : (a = "POST", c = t);
    const l = Object.assign({}, this.headers);
    return i && (l.Prefer = `count=${i}`), new Kc.default({
      method: a,
      url: o,
      headers: l,
      schema: this.schemaName,
      body: c,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
};
hs.default = Qc;
var jt = ke && ke.__importDefault || function(n) {
  return n && n.__esModule ? n : { default: n };
};
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.PostgrestError = pe.PostgrestBuilder = pe.PostgrestTransformBuilder = pe.PostgrestFilterBuilder = pe.PostgrestQueryBuilder = pe.PostgrestClient = void 0;
const ia = jt(hs);
pe.PostgrestClient = ia.default;
const aa = jt(Vr);
pe.PostgrestQueryBuilder = aa.default;
const oa = jt(or);
pe.PostgrestFilterBuilder = oa.default;
const ca = jt(zr);
pe.PostgrestTransformBuilder = ca.default;
const la = jt(Yr);
pe.PostgrestBuilder = la.default;
const ua = jt(Gr);
pe.PostgrestError = ua.default;
var Zc = pe.default = {
  PostgrestClient: ia.default,
  PostgrestQueryBuilder: aa.default,
  PostgrestFilterBuilder: oa.default,
  PostgrestTransformBuilder: ca.default,
  PostgrestBuilder: la.default,
  PostgrestError: ua.default
};
const {
  PostgrestClient: el,
  PostgrestQueryBuilder: Wf,
  PostgrestFilterBuilder: qf,
  PostgrestTransformBuilder: Hf,
  PostgrestBuilder: Jf
} = Zc, tl = "2.10.7", rl = { "X-Client-Info": `realtime-js/${tl}` }, nl = "1.0.0", ha = 1e4, sl = 1e3;
var Ot;
(function(n) {
  n[n.connecting = 0] = "connecting", n[n.open = 1] = "open", n[n.closing = 2] = "closing", n[n.closed = 3] = "closed";
})(Ot || (Ot = {}));
var we;
(function(n) {
  n.closed = "closed", n.errored = "errored", n.joined = "joined", n.joining = "joining", n.leaving = "leaving";
})(we || (we = {}));
var Ae;
(function(n) {
  n.close = "phx_close", n.error = "phx_error", n.join = "phx_join", n.reply = "phx_reply", n.leave = "phx_leave", n.access_token = "access_token";
})(Ae || (Ae = {}));
var Un;
(function(n) {
  n.websocket = "websocket";
})(Un || (Un = {}));
var nt;
(function(n) {
  n.Connecting = "connecting", n.Open = "open", n.Closing = "closing", n.Closed = "closed";
})(nt || (nt = {}));
class il {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(e, t) {
    return e.constructor === ArrayBuffer ? t(this._binaryDecode(e)) : t(typeof e == "string" ? JSON.parse(e) : {});
  }
  _binaryDecode(e) {
    const t = new DataView(e), r = new TextDecoder();
    return this._decodeBroadcast(e, t, r);
  }
  _decodeBroadcast(e, t, r) {
    const s = t.getUint8(1), i = t.getUint8(2);
    let a = this.HEADER_LENGTH + 2;
    const o = r.decode(e.slice(a, a + s));
    a = a + s;
    const c = r.decode(e.slice(a, a + i));
    a = a + i;
    const l = JSON.parse(r.decode(e.slice(a, e.byteLength)));
    return { ref: null, topic: o, event: c, payload: l };
  }
}
class da {
  constructor(e, t) {
    this.callback = e, this.timerCalc = t, this.timer = void 0, this.tries = 0, this.callback = e, this.timerCalc = t;
  }
  reset() {
    this.tries = 0, clearTimeout(this.timer);
  }
  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout() {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.tries = this.tries + 1, this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}
var z;
(function(n) {
  n.abstime = "abstime", n.bool = "bool", n.date = "date", n.daterange = "daterange", n.float4 = "float4", n.float8 = "float8", n.int2 = "int2", n.int4 = "int4", n.int4range = "int4range", n.int8 = "int8", n.int8range = "int8range", n.json = "json", n.jsonb = "jsonb", n.money = "money", n.numeric = "numeric", n.oid = "oid", n.reltime = "reltime", n.text = "text", n.time = "time", n.timestamp = "timestamp", n.timestamptz = "timestamptz", n.timetz = "timetz", n.tsrange = "tsrange", n.tstzrange = "tstzrange";
})(z || (z = {}));
const ni = (n, e, t = {}) => {
  var r;
  const s = (r = t.skipTypes) !== null && r !== void 0 ? r : [];
  return Object.keys(e).reduce((i, a) => (i[a] = al(a, n, e, s), i), {});
}, al = (n, e, t, r) => {
  const s = e.find((o) => o.name === n), i = s == null ? void 0 : s.type, a = t[n];
  return i && !r.includes(i) ? fa(i, a) : Bn(a);
}, fa = (n, e) => {
  if (n.charAt(0) === "_") {
    const t = n.slice(1, n.length);
    return ul(e, t);
  }
  switch (n) {
    case z.bool:
      return ol(e);
    case z.float4:
    case z.float8:
    case z.int2:
    case z.int4:
    case z.int8:
    case z.numeric:
    case z.oid:
      return cl(e);
    case z.json:
    case z.jsonb:
      return ll(e);
    case z.timestamp:
      return hl(e);
    case z.abstime:
    case z.date:
    case z.daterange:
    case z.int4range:
    case z.int8range:
    case z.money:
    case z.reltime:
    case z.text:
    case z.time:
    case z.timestamptz:
    case z.timetz:
    case z.tsrange:
    case z.tstzrange:
      return Bn(e);
    default:
      return Bn(e);
  }
}, Bn = (n) => n, ol = (n) => {
  switch (n) {
    case "t":
      return !0;
    case "f":
      return !1;
    default:
      return n;
  }
}, cl = (n) => {
  if (typeof n == "string") {
    const e = parseFloat(n);
    if (!Number.isNaN(e))
      return e;
  }
  return n;
}, ll = (n) => {
  if (typeof n == "string")
    try {
      return JSON.parse(n);
    } catch (e) {
      return console.log(`JSON parse error: ${e}`), n;
    }
  return n;
}, ul = (n, e) => {
  if (typeof n != "string")
    return n;
  const t = n.length - 1, r = n[t];
  if (n[0] === "{" && r === "}") {
    let i;
    const a = n.slice(1, t);
    try {
      i = JSON.parse("[" + a + "]");
    } catch {
      i = a ? a.split(",") : [];
    }
    return i.map((o) => fa(e, o));
  }
  return n;
}, hl = (n) => typeof n == "string" ? n.replace(" ", "T") : n, ma = (n) => {
  let e = n;
  return e = e.replace(/^ws/i, "http"), e = e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, ""), e.replace(/\/+$/, "");
};
class pn {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(e, t, r = {}, s = ha) {
    this.channel = e, this.event = t, this.payload = r, this.timeout = s, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
  }
  resend(e) {
    this.timeout = e, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = !1, this.send();
  }
  send() {
    this._hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel._joinRef()
    }));
  }
  updatePayload(e) {
    this.payload = Object.assign(Object.assign({}, this.payload), e);
  }
  receive(e, t) {
    var r;
    return this._hasReceived(e) && t((r = this.receivedResp) === null || r === void 0 ? void 0 : r.response), this.recHooks.push({ status: e, callback: t }), this;
  }
  startTimeout() {
    if (this.timeoutTimer)
      return;
    this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref);
    const e = (t) => {
      this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = t, this._matchReceive(t);
    };
    this.channel._on(this.refEvent, {}, e), this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(e, t) {
    this.refEvent && this.channel._trigger(this.refEvent, { status: e, response: t });
  }
  destroy() {
    this._cancelRefEvent(), this._cancelTimeout();
  }
  _cancelRefEvent() {
    this.refEvent && this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
  }
  _matchReceive({ status: e, response: t }) {
    this.recHooks.filter((r) => r.status === e).forEach((r) => r.callback(t));
  }
  _hasReceived(e) {
    return this.receivedResp && this.receivedResp.status === e;
  }
}
var si;
(function(n) {
  n.SYNC = "sync", n.JOIN = "join", n.LEAVE = "leave";
})(si || (si = {}));
class Zt {
  /**
   * Initializes the Presence.
   *
   * @param channel - The RealtimeChannel
   * @param opts - The options,
   *        for example `{events: {state: 'state', diff: 'diff'}}`
   */
  constructor(e, t) {
    this.channel = e, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.caller = {
      onJoin: () => {
      },
      onLeave: () => {
      },
      onSync: () => {
      }
    };
    const r = (t == null ? void 0 : t.events) || {
      state: "presence_state",
      diff: "presence_diff"
    };
    this.channel._on(r.state, {}, (s) => {
      const { onJoin: i, onLeave: a, onSync: o } = this.caller;
      this.joinRef = this.channel._joinRef(), this.state = Zt.syncState(this.state, s, i, a), this.pendingDiffs.forEach((c) => {
        this.state = Zt.syncDiff(this.state, c, i, a);
      }), this.pendingDiffs = [], o();
    }), this.channel._on(r.diff, {}, (s) => {
      const { onJoin: i, onLeave: a, onSync: o } = this.caller;
      this.inPendingSyncState() ? this.pendingDiffs.push(s) : (this.state = Zt.syncDiff(this.state, s, i, a), o());
    }), this.onJoin((s, i, a) => {
      this.channel._trigger("presence", {
        event: "join",
        key: s,
        currentPresences: i,
        newPresences: a
      });
    }), this.onLeave((s, i, a) => {
      this.channel._trigger("presence", {
        event: "leave",
        key: s,
        currentPresences: i,
        leftPresences: a
      });
    }), this.onSync(() => {
      this.channel._trigger("presence", { event: "sync" });
    });
  }
  /**
   * Used to sync the list of presences on the server with the
   * client's state.
   *
   * An optional `onJoin` and `onLeave` callback can be provided to
   * react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @internal
   */
  static syncState(e, t, r, s) {
    const i = this.cloneDeep(e), a = this.transformState(t), o = {}, c = {};
    return this.map(i, (l, u) => {
      a[l] || (c[l] = u);
    }), this.map(a, (l, u) => {
      const h = i[l];
      if (h) {
        const f = u.map((_) => _.presence_ref), m = h.map((_) => _.presence_ref), p = u.filter((_) => m.indexOf(_.presence_ref) < 0), g = h.filter((_) => f.indexOf(_.presence_ref) < 0);
        p.length > 0 && (o[l] = p), g.length > 0 && (c[l] = g);
      } else
        o[l] = u;
    }), this.syncDiff(i, { joins: o, leaves: c }, r, s);
  }
  /**
   * Used to sync a diff of presence join and leave events from the
   * server, as they happen.
   *
   * Like `syncState`, `syncDiff` accepts optional `onJoin` and
   * `onLeave` callbacks to react to a user joining or leaving from a
   * device.
   *
   * @internal
   */
  static syncDiff(e, t, r, s) {
    const { joins: i, leaves: a } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves)
    };
    return r || (r = () => {
    }), s || (s = () => {
    }), this.map(i, (o, c) => {
      var l;
      const u = (l = e[o]) !== null && l !== void 0 ? l : [];
      if (e[o] = this.cloneDeep(c), u.length > 0) {
        const h = e[o].map((m) => m.presence_ref), f = u.filter((m) => h.indexOf(m.presence_ref) < 0);
        e[o].unshift(...f);
      }
      r(o, u, c);
    }), this.map(a, (o, c) => {
      let l = e[o];
      if (!l)
        return;
      const u = c.map((h) => h.presence_ref);
      l = l.filter((h) => u.indexOf(h.presence_ref) < 0), e[o] = l, s(o, l, c), l.length === 0 && delete e[o];
    }), e;
  }
  /** @internal */
  static map(e, t) {
    return Object.getOwnPropertyNames(e).map((r) => t(r, e[r]));
  }
  /**
   * Remove 'metas' key
   * Change 'phx_ref' to 'presence_ref'
   * Remove 'phx_ref' and 'phx_ref_prev'
   *
   * @example
   * // returns {
   *  abc123: [
   *    { presence_ref: '2', user_id: 1 },
   *    { presence_ref: '3', user_id: 2 }
   *  ]
   * }
   * RealtimePresence.transformState({
   *  abc123: {
   *    metas: [
   *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
   *      { phx_ref: '3', user_id: 2 }
   *    ]
   *  }
   * })
   *
   * @internal
   */
  static transformState(e) {
    return e = this.cloneDeep(e), Object.getOwnPropertyNames(e).reduce((t, r) => {
      const s = e[r];
      return "metas" in s ? t[r] = s.metas.map((i) => (i.presence_ref = i.phx_ref, delete i.phx_ref, delete i.phx_ref_prev, i)) : t[r] = s, t;
    }, {});
  }
  /** @internal */
  static cloneDeep(e) {
    return JSON.parse(JSON.stringify(e));
  }
  /** @internal */
  onJoin(e) {
    this.caller.onJoin = e;
  }
  /** @internal */
  onLeave(e) {
    this.caller.onLeave = e;
  }
  /** @internal */
  onSync(e) {
    this.caller.onSync = e;
  }
  /** @internal */
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
}
var ii;
(function(n) {
  n.ALL = "*", n.INSERT = "INSERT", n.UPDATE = "UPDATE", n.DELETE = "DELETE";
})(ii || (ii = {}));
var ai;
(function(n) {
  n.BROADCAST = "broadcast", n.PRESENCE = "presence", n.POSTGRES_CHANGES = "postgres_changes", n.SYSTEM = "system";
})(ai || (ai = {}));
var oi;
(function(n) {
  n.SUBSCRIBED = "SUBSCRIBED", n.TIMED_OUT = "TIMED_OUT", n.CLOSED = "CLOSED", n.CHANNEL_ERROR = "CHANNEL_ERROR";
})(oi || (oi = {}));
class ds {
  constructor(e, t = { config: {} }, r) {
    this.topic = e, this.params = t, this.socket = r, this.bindings = {}, this.state = we.closed, this.joinedOnce = !1, this.pushBuffer = [], this.subTopic = e.replace(/^realtime:/i, ""), this.params.config = Object.assign({
      broadcast: { ack: !1, self: !1 },
      presence: { key: "" },
      private: !1
    }, t.config), this.timeout = this.socket.timeout, this.joinPush = new pn(this, Ae.join, this.params, this.timeout), this.rejoinTimer = new da(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
      this.state = we.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((s) => s.send()), this.pushBuffer = [];
    }), this._onClose(() => {
      this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = we.closed, this.socket._remove(this);
    }), this._onError((s) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, s), this.state = we.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("timeout", () => {
      this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = we.errored, this.rejoinTimer.scheduleTimeout());
    }), this._on(Ae.reply, {}, (s, i) => {
      this._trigger(this._replyEventName(i), s);
    }), this.presence = new Zt(this), this.broadcastEndpointURL = ma(this.socket.endPoint) + "/api/broadcast", this.private = this.params.config.private || !1;
  }
  /** Subscribe registers your client with the server */
  subscribe(e, t = this.timeout) {
    var r, s;
    if (this.socket.isConnected() || this.socket.connect(), this.joinedOnce)
      throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
    {
      const { config: { broadcast: i, presence: a, private: o } } = this.params;
      this._onError((u) => e && e("CHANNEL_ERROR", u)), this._onClose(() => e && e("CLOSED"));
      const c = {}, l = {
        broadcast: i,
        presence: a,
        postgres_changes: (s = (r = this.bindings.postgres_changes) === null || r === void 0 ? void 0 : r.map((u) => u.filter)) !== null && s !== void 0 ? s : [],
        private: o
      };
      this.socket.accessToken && (c.access_token = this.socket.accessToken), this.updateJoinPayload(Object.assign({ config: l }, c)), this.joinedOnce = !0, this._rejoin(t), this.joinPush.receive("ok", ({ postgres_changes: u }) => {
        var h;
        if (this.socket.accessToken && this.socket.setAuth(this.socket.accessToken), u === void 0) {
          e && e("SUBSCRIBED");
          return;
        } else {
          const f = this.bindings.postgres_changes, m = (h = f == null ? void 0 : f.length) !== null && h !== void 0 ? h : 0, p = [];
          for (let g = 0; g < m; g++) {
            const _ = f[g], { filter: { event: T, schema: w, table: S, filter: v } } = _, E = u && u[g];
            if (E && E.event === T && E.schema === w && E.table === S && E.filter === v)
              p.push(Object.assign(Object.assign({}, _), { id: E.id }));
            else {
              this.unsubscribe(), e && e("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = p, e && e("SUBSCRIBED");
          return;
        }
      }).receive("error", (u) => {
        e && e("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(u).join(", ") || "error")));
      }).receive("timeout", () => {
        e && e("TIMED_OUT");
      });
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  async track(e, t = {}) {
    return await this.send({
      type: "presence",
      event: "track",
      payload: e
    }, t.timeout || this.timeout);
  }
  async untrack(e = {}) {
    return await this.send({
      type: "presence",
      event: "untrack"
    }, e);
  }
  on(e, t, r) {
    return this._on(e, t, r);
  }
  /**
   * Sends a message into the channel.
   *
   * @param args Arguments to send to channel
   * @param args.type The type of event to send
   * @param args.event The name of the event being sent
   * @param args.payload Payload to be sent
   * @param opts Options to be used during the send process
   */
  async send(e, t = {}) {
    var r, s;
    if (!this._canPush() && e.type === "broadcast") {
      const { event: i, payload: a } = e, o = {
        method: "POST",
        headers: {
          Authorization: this.socket.accessToken ? `Bearer ${this.socket.accessToken}` : "",
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event: i,
              payload: a,
              private: this.private
            }
          ]
        })
      };
      try {
        const c = await this._fetchWithTimeout(this.broadcastEndpointURL, o, (r = t.timeout) !== null && r !== void 0 ? r : this.timeout);
        return await ((s = c.body) === null || s === void 0 ? void 0 : s.cancel()), c.ok ? "ok" : "error";
      } catch (c) {
        return c.name === "AbortError" ? "timed out" : "error";
      }
    } else
      return new Promise((i) => {
        var a, o, c;
        const l = this._push(e.type, e, t.timeout || this.timeout);
        e.type === "broadcast" && !(!((c = (o = (a = this.params) === null || a === void 0 ? void 0 : a.config) === null || o === void 0 ? void 0 : o.broadcast) === null || c === void 0) && c.ack) && i("ok"), l.receive("ok", () => i("ok")), l.receive("error", () => i("error")), l.receive("timeout", () => i("timed out"));
      });
  }
  updateJoinPayload(e) {
    this.joinPush.updatePayload(e);
  }
  /**
   * Leaves the channel.
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */
  unsubscribe(e = this.timeout) {
    this.state = we.leaving;
    const t = () => {
      this.socket.log("channel", `leave ${this.topic}`), this._trigger(Ae.close, "leave", this._joinRef());
    };
    return this.rejoinTimer.reset(), this.joinPush.destroy(), new Promise((r) => {
      const s = new pn(this, Ae.leave, {}, e);
      s.receive("ok", () => {
        t(), r("ok");
      }).receive("timeout", () => {
        t(), r("timed out");
      }).receive("error", () => {
        r("error");
      }), s.send(), this._canPush() || s.trigger("ok", {});
    });
  }
  /** @internal */
  async _fetchWithTimeout(e, t, r) {
    const s = new AbortController(), i = setTimeout(() => s.abort(), r), a = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: s.signal }));
    return clearTimeout(i), a;
  }
  /** @internal */
  _push(e, t, r = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let s = new pn(this, e, t, r);
    return this._canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)), s;
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   *
   * @internal
   */
  _onMessage(e, t, r) {
    return t;
  }
  /** @internal */
  _isMember(e) {
    return this.topic === e;
  }
  /** @internal */
  _joinRef() {
    return this.joinPush.ref;
  }
  /** @internal */
  _trigger(e, t, r) {
    var s, i;
    const a = e.toLocaleLowerCase(), { close: o, error: c, leave: l, join: u } = Ae;
    if (r && [o, c, l, u].indexOf(a) >= 0 && r !== this._joinRef())
      return;
    let f = this._onMessage(a, t, r);
    if (t && !f)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(a) ? (s = this.bindings.postgres_changes) === null || s === void 0 || s.filter((m) => {
      var p, g, _;
      return ((p = m.filter) === null || p === void 0 ? void 0 : p.event) === "*" || ((_ = (g = m.filter) === null || g === void 0 ? void 0 : g.event) === null || _ === void 0 ? void 0 : _.toLocaleLowerCase()) === a;
    }).map((m) => m.callback(f, r)) : (i = this.bindings[a]) === null || i === void 0 || i.filter((m) => {
      var p, g, _, T, w, S;
      if (["broadcast", "presence", "postgres_changes"].includes(a))
        if ("id" in m) {
          const v = m.id, E = (p = m.filter) === null || p === void 0 ? void 0 : p.event;
          return v && ((g = t.ids) === null || g === void 0 ? void 0 : g.includes(v)) && (E === "*" || (E == null ? void 0 : E.toLocaleLowerCase()) === ((_ = t.data) === null || _ === void 0 ? void 0 : _.type.toLocaleLowerCase()));
        } else {
          const v = (w = (T = m == null ? void 0 : m.filter) === null || T === void 0 ? void 0 : T.event) === null || w === void 0 ? void 0 : w.toLocaleLowerCase();
          return v === "*" || v === ((S = t == null ? void 0 : t.event) === null || S === void 0 ? void 0 : S.toLocaleLowerCase());
        }
      else
        return m.type.toLocaleLowerCase() === a;
    }).map((m) => {
      if (typeof f == "object" && "ids" in f) {
        const p = f.data, { schema: g, table: _, commit_timestamp: T, type: w, errors: S } = p;
        f = Object.assign(Object.assign({}, {
          schema: g,
          table: _,
          commit_timestamp: T,
          eventType: w,
          new: {},
          old: {},
          errors: S
        }), this._getPayloadRecords(p));
      }
      m.callback(f, r);
    });
  }
  /** @internal */
  _isClosed() {
    return this.state === we.closed;
  }
  /** @internal */
  _isJoined() {
    return this.state === we.joined;
  }
  /** @internal */
  _isJoining() {
    return this.state === we.joining;
  }
  /** @internal */
  _isLeaving() {
    return this.state === we.leaving;
  }
  /** @internal */
  _replyEventName(e) {
    return `chan_reply_${e}`;
  }
  /** @internal */
  _on(e, t, r) {
    const s = e.toLocaleLowerCase(), i = {
      type: s,
      filter: t,
      callback: r
    };
    return this.bindings[s] ? this.bindings[s].push(i) : this.bindings[s] = [i], this;
  }
  /** @internal */
  _off(e, t) {
    const r = e.toLocaleLowerCase();
    return this.bindings[r] = this.bindings[r].filter((s) => {
      var i;
      return !(((i = s.type) === null || i === void 0 ? void 0 : i.toLocaleLowerCase()) === r && ds.isEqual(s.filter, t));
    }), this;
  }
  /** @internal */
  static isEqual(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return !1;
    for (const r in e)
      if (e[r] !== t[r])
        return !1;
    return !0;
  }
  /** @internal */
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
  }
  /**
   * Registers a callback that will be executed when the channel closes.
   *
   * @internal
   */
  _onClose(e) {
    this._on(Ae.close, {}, e);
  }
  /**
   * Registers a callback that will be executed when the channel encounteres an error.
   *
   * @internal
   */
  _onError(e) {
    this._on(Ae.error, {}, (t) => e(t));
  }
  /**
   * Returns `true` if the socket is connected and the channel has been joined.
   *
   * @internal
   */
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  /** @internal */
  _rejoin(e = this.timeout) {
    this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = we.joining, this.joinPush.resend(e));
  }
  /** @internal */
  _getPayloadRecords(e) {
    const t = {
      new: {},
      old: {}
    };
    return (e.type === "INSERT" || e.type === "UPDATE") && (t.new = ni(e.columns, e.record)), (e.type === "UPDATE" || e.type === "DELETE") && (t.old = ni(e.columns, e.old_record)), t;
  }
}
const dl = () => {
}, fl = typeof WebSocket < "u", ml = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class gl {
  /**
   * Initializes the Socket.
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket.
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers The optional headers to pass when connecting.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   * @param options.worker Use Web Worker to set a side flow. Defaults to false.
   * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
   */
  constructor(e, t) {
    var r;
    this.accessToken = null, this.apiKey = null, this.channels = [], this.endPoint = "", this.httpEndpoint = "", this.headers = rl, this.params = {}, this.timeout = ha, this.heartbeatIntervalMs = 3e4, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.ref = 0, this.logger = dl, this.conn = null, this.sendBuffer = [], this.serializer = new il(), this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    }, this._resolveFetch = (i) => {
      let a;
      return i ? a = i : typeof fetch > "u" ? a = (...o) => Promise.resolve().then(() => It).then(({ default: c }) => c(...o)) : a = fetch, (...o) => a(...o);
    }, this.endPoint = `${e}/${Un.websocket}`, this.httpEndpoint = ma(e), t != null && t.transport ? this.transport = t.transport : this.transport = null, t != null && t.params && (this.params = t.params), t != null && t.headers && (this.headers = Object.assign(Object.assign({}, this.headers), t.headers)), t != null && t.timeout && (this.timeout = t.timeout), t != null && t.logger && (this.logger = t.logger), t != null && t.heartbeatIntervalMs && (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
    const s = (r = t == null ? void 0 : t.params) === null || r === void 0 ? void 0 : r.apikey;
    if (s && (this.accessToken = s, this.apiKey = s), this.reconnectAfterMs = t != null && t.reconnectAfterMs ? t.reconnectAfterMs : (i) => [1e3, 2e3, 5e3, 1e4][i - 1] || 1e4, this.encode = t != null && t.encode ? t.encode : (i, a) => a(JSON.stringify(i)), this.decode = t != null && t.decode ? t.decode : this.serializer.decode.bind(this.serializer), this.reconnectTimer = new da(async () => {
      this.disconnect(), this.connect();
    }, this.reconnectAfterMs), this.fetch = this._resolveFetch(t == null ? void 0 : t.fetch), t != null && t.worker) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      this.worker = (t == null ? void 0 : t.worker) || !1, this.workerUrl = t == null ? void 0 : t.workerUrl;
    }
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (!this.conn) {
      if (this.transport) {
        this.conn = new this.transport(this._endPointURL(), void 0, {
          headers: this.headers
        });
        return;
      }
      if (fl) {
        this.conn = new WebSocket(this._endPointURL()), this.setupConnection();
        return;
      }
      this.conn = new pl(this._endPointURL(), void 0, {
        close: () => {
          this.conn = null;
        }
      }), import("./browser-Dgp-qzTg.js").then((e) => e.b).then(({ default: e }) => {
        this.conn = new e(this._endPointURL(), void 0, {
          headers: this.headers
        }), this.setupConnection();
      });
    }
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(e, t) {
    this.conn && (this.conn.onclose = function() {
    }, e ? this.conn.close(e, t ?? "") : this.conn.close(), this.conn = null, this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.reset());
  }
  /**
   * Returns all created channels
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Unsubscribes and removes a single channel
   * @param channel A RealtimeChannel instance
   */
  async removeChannel(e) {
    const t = await e.unsubscribe();
    return this.channels.length === 0 && this.disconnect(), t;
  }
  /**
   * Unsubscribes and removes all channels
   */
  async removeAllChannels() {
    const e = await Promise.all(this.channels.map((t) => t.unsubscribe()));
    return this.disconnect(), e;
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(e, t, r) {
    this.logger(e, t, r);
  }
  /**
   * Returns the current state of the socket.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case Ot.connecting:
        return nt.Connecting;
      case Ot.open:
        return nt.Open;
      case Ot.closing:
        return nt.Closing;
      default:
        return nt.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === nt.Open;
  }
  channel(e, t = { config: {} }) {
    const r = new ds(`realtime:${e}`, t, this);
    return this.channels.push(r), r;
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(e) {
    const { topic: t, event: r, payload: s, ref: i } = e, a = () => {
      this.encode(e, (o) => {
        var c;
        (c = this.conn) === null || c === void 0 || c.send(o);
      });
    };
    this.log("push", `${t} ${r} (${i})`, s), this.isConnected() ? a() : this.sendBuffer.push(a);
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * @param token A JWT string.
   */
  setAuth(e) {
    this.accessToken = e, this.channels.forEach((t) => {
      e && t.updateJoinPayload({ access_token: e }), t.joinedOnce && t._isJoined() && t._push(Ae.access_token, { access_token: e });
    });
  }
  /**
   * Return the next message ref, accounting for overflows
   *
   * @internal
   */
  _makeRef() {
    let e = this.ref + 1;
    return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString();
  }
  /**
   * Unsubscribe from channels with the specified topic.
   *
   * @internal
   */
  _leaveOpenTopic(e) {
    let t = this.channels.find((r) => r.topic === e && (r._isJoined() || r._isJoining()));
    t && (this.log("transport", `leaving duplicate topic "${e}"`), t.unsubscribe());
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   *
   * @internal
   */
  _remove(e) {
    this.channels = this.channels.filter((t) => t._joinRef() !== e._joinRef());
  }
  /**
   * Sets up connection handlers.
   *
   * @internal
   */
  setupConnection() {
    this.conn && (this.conn.binaryType = "arraybuffer", this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e) => this._onConnError(e), this.conn.onmessage = (e) => this._onConnMessage(e), this.conn.onclose = (e) => this._onConnClose(e));
  }
  /**
   * Returns the URL of the websocket.
   *
   * @internal
   */
  _endPointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: nl }));
  }
  /** @internal */
  _onConnMessage(e) {
    this.decode(e.data, (t) => {
      let { topic: r, event: s, payload: i, ref: a } = t;
      (a && a === this.pendingHeartbeatRef || s === (i == null ? void 0 : i.type)) && (this.pendingHeartbeatRef = null), this.log("receive", `${i.status || ""} ${r} ${s} ${a && "(" + a + ")" || ""}`, i), this.channels.filter((o) => o._isMember(r)).forEach((o) => o._trigger(s, i, a)), this.stateChangeCallbacks.message.forEach((o) => o(t));
    });
  }
  /** @internal */
  async _onConnOpen() {
    if (this.log("transport", `connected to ${this._endPointURL()}`), this._flushSendBuffer(), this.reconnectTimer.reset(), !this.worker)
      this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
    else {
      this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
      const e = this._workerObjectUrl(this.workerUrl);
      this.workerRef = new Worker(e), this.workerRef.onerror = (t) => {
        this.log("worker", "worker error", t.message), this.workerRef.terminate();
      }, this.workerRef.onmessage = (t) => {
        t.data.event === "keepAlive" && this._sendHeartbeat();
      }, this.workerRef.postMessage({
        event: "start",
        interval: this.heartbeatIntervalMs
      });
    }
    this.stateChangeCallbacks.open.forEach((e) => e());
  }
  /** @internal */
  _onConnClose(e) {
    this.log("transport", "close", e), this._triggerChanError(), this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach((t) => t(e));
  }
  /** @internal */
  _onConnError(e) {
    this.log("transport", e.message), this._triggerChanError(), this.stateChangeCallbacks.error.forEach((t) => t(e));
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach((e) => e._trigger(Ae.error));
  }
  /** @internal */
  _appendParams(e, t) {
    if (Object.keys(t).length === 0)
      return e;
    const r = e.match(/\?/) ? "&" : "?", s = new URLSearchParams(t);
    return `${e}${r}${s}`;
  }
  /** @internal */
  _flushSendBuffer() {
    this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e) => e()), this.sendBuffer = []);
  }
  /** @internal */
  _sendHeartbeat() {
    var e;
    if (this.isConnected()) {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), (e = this.conn) === null || e === void 0 || e.close(sl, "hearbeat timeout");
        return;
      }
      this.pendingHeartbeatRef = this._makeRef(), this.push({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: this.pendingHeartbeatRef
      }), this.setAuth(this.accessToken);
    }
  }
  _workerObjectUrl(e) {
    let t;
    if (e)
      t = e;
    else {
      const r = new Blob([ml], { type: "application/javascript" });
      t = URL.createObjectURL(r);
    }
    return t;
  }
}
class pl {
  constructor(e, t, r) {
    this.binaryType = "arraybuffer", this.onclose = () => {
    }, this.onerror = () => {
    }, this.onmessage = () => {
    }, this.onopen = () => {
    }, this.readyState = Ot.connecting, this.send = () => {
    }, this.url = null, this.url = e, this.close = r.close;
  }
}
class fs extends Error {
  constructor(e) {
    super(e), this.__isStorageError = !0, this.name = "StorageError";
  }
}
function ne(n) {
  return typeof n == "object" && n !== null && "__isStorageError" in n;
}
class _l extends fs {
  constructor(e, t) {
    super(e), this.name = "StorageApiError", this.status = t;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
}
class Wn extends fs {
  constructor(e, t) {
    super(e), this.name = "StorageUnknownError", this.originalError = t;
  }
}
var yl = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function o(u) {
      try {
        l(r.next(u));
      } catch (h) {
        a(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        a(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(o, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
};
const ga = (n) => {
  let e;
  return n ? e = n : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => It).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
}, wl = () => yl(void 0, void 0, void 0, function* () {
  return typeof Response > "u" ? (yield Promise.resolve().then(() => It)).Response : Response;
}), qn = (n) => {
  if (Array.isArray(n))
    return n.map((t) => qn(t));
  if (typeof n == "function" || n !== Object(n))
    return n;
  const e = {};
  return Object.entries(n).forEach(([t, r]) => {
    const s = t.replace(/([-_][a-z])/gi, (i) => i.toUpperCase().replace(/[-_]/g, ""));
    e[s] = qn(r);
  }), e;
};
var lt = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function o(u) {
      try {
        l(r.next(u));
      } catch (h) {
        a(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        a(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(o, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
};
const _n = (n) => n.msg || n.message || n.error_description || n.error || JSON.stringify(n), vl = (n, e, t) => lt(void 0, void 0, void 0, function* () {
  const r = yield wl();
  n instanceof r && !(t != null && t.noResolveJson) ? n.json().then((s) => {
    e(new _l(_n(s), n.status || 500));
  }).catch((s) => {
    e(new Wn(_n(s), s));
  }) : e(new Wn(_n(n), n));
}), bl = (n, e, t, r) => {
  const s = { method: n, headers: (e == null ? void 0 : e.headers) || {} };
  return n === "GET" ? s : (s.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), r && (s.body = JSON.stringify(r)), Object.assign(Object.assign({}, s), t));
};
function cr(n, e, t, r, s, i) {
  return lt(this, void 0, void 0, function* () {
    return new Promise((a, o) => {
      n(t, bl(e, r, s, i)).then((c) => {
        if (!c.ok)
          throw c;
        return r != null && r.noResolveJson ? c : c.json();
      }).then((c) => a(c)).catch((c) => vl(c, o, r));
    });
  });
}
function Fr(n, e, t, r) {
  return lt(this, void 0, void 0, function* () {
    return cr(n, "GET", e, t, r);
  });
}
function Ge(n, e, t, r, s) {
  return lt(this, void 0, void 0, function* () {
    return cr(n, "POST", e, r, s, t);
  });
}
function Sl(n, e, t, r, s) {
  return lt(this, void 0, void 0, function* () {
    return cr(n, "PUT", e, r, s, t);
  });
}
function El(n, e, t, r) {
  return lt(this, void 0, void 0, function* () {
    return cr(n, "HEAD", e, Object.assign(Object.assign({}, t), { noResolveJson: !0 }), r);
  });
}
function pa(n, e, t, r, s) {
  return lt(this, void 0, void 0, function* () {
    return cr(n, "DELETE", e, r, s, t);
  });
}
var me = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function o(u) {
      try {
        l(r.next(u));
      } catch (h) {
        a(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        a(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(o, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
};
const xl = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
}, ci = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: !1
};
class kl {
  constructor(e, t = {}, r, s) {
    this.url = e, this.headers = t, this.bucketId = r, this.fetch = ga(s);
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(e, t, r, s) {
    return me(this, void 0, void 0, function* () {
      try {
        let i;
        const a = Object.assign(Object.assign({}, ci), s);
        let o = Object.assign(Object.assign({}, this.headers), e === "POST" && { "x-upsert": String(a.upsert) });
        const c = a.metadata;
        typeof Blob < "u" && r instanceof Blob ? (i = new FormData(), i.append("cacheControl", a.cacheControl), c && i.append("metadata", this.encodeMetadata(c)), i.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (i = r, i.append("cacheControl", a.cacheControl), c && i.append("metadata", this.encodeMetadata(c))) : (i = r, o["cache-control"] = `max-age=${a.cacheControl}`, o["content-type"] = a.contentType, c && (o["x-metadata"] = this.toBase64(this.encodeMetadata(c)))), s != null && s.headers && (o = Object.assign(Object.assign({}, o), s.headers));
        const l = this._removeEmptyFolders(t), u = this._getFinalPath(l), h = yield this.fetch(`${this.url}/object/${u}`, Object.assign({ method: e, body: i, headers: o }, a != null && a.duplex ? { duplex: a.duplex } : {})), f = yield h.json();
        return h.ok ? {
          data: { path: l, id: f.Id, fullPath: f.Key },
          error: null
        } : { data: null, error: f };
      } catch (i) {
        if (ne(i))
          return { data: null, error: i };
        throw i;
      }
    });
  }
  /**
   * Uploads a file to an existing bucket.
   *
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  upload(e, t, r) {
    return me(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, r);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(e, t, r, s) {
    return me(this, void 0, void 0, function* () {
      const i = this._removeEmptyFolders(e), a = this._getFinalPath(i), o = new URL(this.url + `/object/upload/sign/${a}`);
      o.searchParams.set("token", t);
      try {
        let c;
        const l = Object.assign({ upsert: ci.upsert }, s), u = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(l.upsert) });
        typeof Blob < "u" && r instanceof Blob ? (c = new FormData(), c.append("cacheControl", l.cacheControl), c.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (c = r, c.append("cacheControl", l.cacheControl)) : (c = r, u["cache-control"] = `max-age=${l.cacheControl}`, u["content-type"] = l.contentType);
        const h = yield this.fetch(o.toString(), {
          method: "PUT",
          body: c,
          headers: u
        }), f = yield h.json();
        return h.ok ? {
          data: { path: i, fullPath: f.Key },
          error: null
        } : { data: null, error: f };
      } catch (c) {
        if (ne(c))
          return { data: null, error: c };
        throw c;
      }
    });
  }
  /**
   * Creates a signed upload URL.
   * Signed upload URLs can be used to upload files to the bucket without further authentication.
   * They are valid for 2 hours.
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
   */
  createSignedUploadUrl(e, t) {
    return me(this, void 0, void 0, function* () {
      try {
        let r = this._getFinalPath(e);
        const s = Object.assign({}, this.headers);
        t != null && t.upsert && (s["x-upsert"] = "true");
        const i = yield Ge(this.fetch, `${this.url}/object/upload/sign/${r}`, {}, { headers: s }), a = new URL(this.url + i.url), o = a.searchParams.get("token");
        if (!o)
          throw new fs("No token returned by API");
        return { data: { signedUrl: a.toString(), path: e, token: o }, error: null };
      } catch (r) {
        if (ne(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  update(e, t, r) {
    return me(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", e, t, r);
    });
  }
  /**
   * Moves an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   * @param options The destination options.
   */
  move(e, t, r) {
    return me(this, void 0, void 0, function* () {
      try {
        return { data: yield Ge(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: r == null ? void 0 : r.destinationBucket
        }, { headers: this.headers }), error: null };
      } catch (s) {
        if (ne(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Copies an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
   * @param options The destination options.
   */
  copy(e, t, r) {
    return me(this, void 0, void 0, function* () {
      try {
        return { data: { path: (yield Ge(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: r == null ? void 0 : r.destinationBucket
        }, { headers: this.headers })).Key }, error: null };
      } catch (s) {
        if (ne(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  createSignedUrl(e, t, r) {
    return me(this, void 0, void 0, function* () {
      try {
        let s = this._getFinalPath(e), i = yield Ge(this.fetch, `${this.url}/object/sign/${s}`, Object.assign({ expiresIn: t }, r != null && r.transform ? { transform: r.transform } : {}), { headers: this.headers });
        const a = r != null && r.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
        return i = { signedUrl: encodeURI(`${this.url}${i.signedURL}${a}`) }, { data: i, error: null };
      } catch (s) {
        if (ne(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
   * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   */
  createSignedUrls(e, t, r) {
    return me(this, void 0, void 0, function* () {
      try {
        const s = yield Ge(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }), i = r != null && r.download ? `&download=${r.download === !0 ? "" : r.download}` : "";
        return {
          data: s.map((a) => Object.assign(Object.assign({}, a), { signedUrl: a.signedURL ? encodeURI(`${this.url}${a.signedURL}${i}`) : null })),
          error: null
        };
      } catch (s) {
        if (ne(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
   *
   * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
   * @param options.transform Transform the asset before serving it to the client.
   */
  download(e, t) {
    return me(this, void 0, void 0, function* () {
      const s = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object", i = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {}), a = i ? `?${i}` : "";
      try {
        const o = this._getFinalPath(e);
        return { data: yield (yield Fr(this.fetch, `${this.url}/${s}/${o}${a}`, {
          headers: this.headers,
          noResolveJson: !0
        })).blob(), error: null };
      } catch (o) {
        if (ne(o))
          return { data: null, error: o };
        throw o;
      }
    });
  }
  /**
   * Retrieves the details of an existing file.
   * @param path
   */
  info(e) {
    return me(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        const r = yield Fr(this.fetch, `${this.url}/object/info/${t}`, {
          headers: this.headers
        });
        return { data: qn(r), error: null };
      } catch (r) {
        if (ne(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  /**
   * Checks the existence of a file.
   * @param path
   */
  exists(e) {
    return me(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        return yield El(this.fetch, `${this.url}/object/${t}`, {
          headers: this.headers
        }), { data: !0, error: null };
      } catch (r) {
        if (ne(r) && r instanceof Wn) {
          const s = r.originalError;
          if ([400, 404].includes(s == null ? void 0 : s.status))
            return { data: !1, error: r };
        }
        throw r;
      }
    });
  }
  /**
   * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
   * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
   *
   * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
   * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  getPublicUrl(e, t) {
    const r = this._getFinalPath(e), s = [], i = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
    i !== "" && s.push(i);
    const o = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object", c = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
    c !== "" && s.push(c);
    let l = s.join("&");
    return l !== "" && (l = `?${l}`), {
      data: { publicUrl: encodeURI(`${this.url}/${o}/public/${r}${l}`) }
    };
  }
  /**
   * Deletes files within the same bucket
   *
   * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
   */
  remove(e) {
    return me(this, void 0, void 0, function* () {
      try {
        return { data: yield pa(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e }, { headers: this.headers }), error: null };
      } catch (t) {
        if (ne(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Get file metadata
   * @param id the file id to retrieve metadata
   */
  // async getMetadata(
  //   id: string
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Update file metadata
   * @param id the file id to update metadata
   * @param meta the new file metadata
   */
  // async updateMetadata(
  //   id: string,
  //   meta: Metadata
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await post(
  //       this.fetch,
  //       `${this.url}/metadata/${id}`,
  //       { ...meta },
  //       { headers: this.headers }
  //     )
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Lists all the files within a bucket.
   * @param path The folder path.
   */
  list(e, t, r) {
    return me(this, void 0, void 0, function* () {
      try {
        const s = Object.assign(Object.assign(Object.assign({}, xl), t), { prefix: e || "" });
        return { data: yield Ge(this.fetch, `${this.url}/object/list/${this.bucketId}`, s, { headers: this.headers }, r), error: null };
      } catch (s) {
        if (ne(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  encodeMetadata(e) {
    return JSON.stringify(e);
  }
  toBase64(e) {
    return typeof Buffer < "u" ? Buffer.from(e).toString("base64") : btoa(e);
  }
  _getFinalPath(e) {
    return `${this.bucketId}/${e}`;
  }
  _removeEmptyFolders(e) {
    return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(e) {
    const t = [];
    return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), e.resize && t.push(`resize=${e.resize}`), e.format && t.push(`format=${e.format}`), e.quality && t.push(`quality=${e.quality}`), t.join("&");
  }
}
const Ol = "2.7.1", Pl = { "X-Client-Info": `storage-js/${Ol}` };
var _t = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function o(u) {
      try {
        l(r.next(u));
      } catch (h) {
        a(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        a(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(o, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
};
class Cl {
  constructor(e, t = {}, r) {
    this.url = e, this.headers = Object.assign(Object.assign({}, Pl), t), this.fetch = ga(r);
  }
  /**
   * Retrieves the details of all Storage buckets within an existing project.
   */
  listBuckets() {
    return _t(this, void 0, void 0, function* () {
      try {
        return { data: yield Fr(this.fetch, `${this.url}/bucket`, { headers: this.headers }), error: null };
      } catch (e) {
        if (ne(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
  /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */
  getBucket(e) {
    return _t(this, void 0, void 0, function* () {
      try {
        return { data: yield Fr(this.fetch, `${this.url}/bucket/${e}`, { headers: this.headers }), error: null };
      } catch (t) {
        if (ne(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   * @returns newly created bucket id
   */
  createBucket(e, t = {
    public: !1
  }) {
    return _t(this, void 0, void 0, function* () {
      try {
        return { data: yield Ge(this.fetch, `${this.url}/bucket`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (r) {
        if (ne(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  /**
   * Updates a Storage bucket
   *
   * @param id A unique identifier for the bucket you are updating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   */
  updateBucket(e, t) {
    return _t(this, void 0, void 0, function* () {
      try {
        return { data: yield Sl(this.fetch, `${this.url}/bucket/${e}`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (r) {
        if (ne(r))
          return { data: null, error: r };
        throw r;
      }
    });
  }
  /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */
  emptyBucket(e) {
    return _t(this, void 0, void 0, function* () {
      try {
        return { data: yield Ge(this.fetch, `${this.url}/bucket/${e}/empty`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (ne(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */
  deleteBucket(e) {
    return _t(this, void 0, void 0, function* () {
      try {
        return { data: yield pa(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (ne(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
}
class Al extends Cl {
  constructor(e, t = {}, r) {
    super(e, t, r);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(e) {
    return new kl(this.url, this.headers, e, this.fetch);
  }
}
const Tl = "2.46.1";
let Vt = "";
typeof Deno < "u" ? Vt = "deno" : typeof document < "u" ? Vt = "web" : typeof navigator < "u" && navigator.product === "ReactNative" ? Vt = "react-native" : Vt = "node";
const Rl = { "X-Client-Info": `supabase-js-${Vt}/${Tl}` }, $l = {
  headers: Rl
}, Il = {
  schema: "public"
}, jl = {
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  flowType: "implicit"
}, Dl = {};
var Ml = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function o(u) {
      try {
        l(r.next(u));
      } catch (h) {
        a(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        a(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(o, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
};
const Nl = (n) => {
  let e;
  return n ? e = n : typeof fetch > "u" ? e = ea : e = fetch, (...t) => e(...t);
}, Ll = () => typeof Headers > "u" ? ta : Headers, Fl = (n, e, t) => {
  const r = Nl(t), s = Ll();
  return (i, a) => Ml(void 0, void 0, void 0, function* () {
    var o;
    const c = (o = yield e()) !== null && o !== void 0 ? o : n;
    let l = new s(a == null ? void 0 : a.headers);
    return l.has("apikey") || l.set("apikey", n), l.has("Authorization") || l.set("Authorization", `Bearer ${c}`), r(i, Object.assign(Object.assign({}, a), { headers: l }));
  });
};
var Ul = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function o(u) {
      try {
        l(r.next(u));
      } catch (h) {
        a(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        a(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(o, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
};
function Bl(n) {
  return n.replace(/\/$/, "");
}
function Wl(n, e) {
  const { db: t, auth: r, realtime: s, global: i } = n, { db: a, auth: o, realtime: c, global: l } = e, u = {
    db: Object.assign(Object.assign({}, a), t),
    auth: Object.assign(Object.assign({}, o), r),
    realtime: Object.assign(Object.assign({}, c), s),
    global: Object.assign(Object.assign({}, l), i),
    accessToken: () => Ul(this, void 0, void 0, function* () {
      return "";
    })
  };
  return n.accessToken ? u.accessToken = n.accessToken : delete u.accessToken, u;
}
const _a = "2.65.1", ql = "http://localhost:9999", Hl = "supabase.auth.token", Jl = { "X-Client-Info": `gotrue-js/${_a}` }, li = 10, Hn = "X-Supabase-Api-Version", ya = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
};
function Vl(n) {
  return Math.round(Date.now() / 1e3) + n;
}
function zl() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
    const e = Math.random() * 16 | 0;
    return (n == "x" ? e : e & 3 | 8).toString(16);
  });
}
const Oe = () => typeof document < "u", et = {
  tested: !1,
  writable: !1
}, er = () => {
  if (!Oe())
    return !1;
  try {
    if (typeof globalThis.localStorage != "object")
      return !1;
  } catch {
    return !1;
  }
  if (et.tested)
    return et.writable;
  const n = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(n, n), globalThis.localStorage.removeItem(n), et.tested = !0, et.writable = !0;
  } catch {
    et.tested = !0, et.writable = !1;
  }
  return et.writable;
};
function yn(n) {
  const e = {}, t = new URL(n);
  if (t.hash && t.hash[0] === "#")
    try {
      new URLSearchParams(t.hash.substring(1)).forEach((s, i) => {
        e[i] = s;
      });
    } catch {
    }
  return t.searchParams.forEach((r, s) => {
    e[s] = r;
  }), e;
}
const wa = (n) => {
  let e;
  return n ? e = n : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => It).then(({ default: r }) => r(...t)) : e = fetch, (...t) => e(...t);
}, Yl = (n) => typeof n == "object" && n !== null && "status" in n && "ok" in n && "json" in n && typeof n.json == "function", va = async (n, e, t) => {
  await n.setItem(e, JSON.stringify(t));
}, br = async (n, e) => {
  const t = await n.getItem(e);
  if (!t)
    return null;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, Sr = async (n, e) => {
  await n.removeItem(e);
};
function Gl(n) {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let t = "", r, s, i, a, o, c, l, u = 0;
  for (n = n.replace("-", "+").replace("_", "/"); u < n.length; )
    a = e.indexOf(n.charAt(u++)), o = e.indexOf(n.charAt(u++)), c = e.indexOf(n.charAt(u++)), l = e.indexOf(n.charAt(u++)), r = a << 2 | o >> 4, s = (o & 15) << 4 | c >> 2, i = (c & 3) << 6 | l, t = t + String.fromCharCode(r), c != 64 && s != 0 && (t = t + String.fromCharCode(s)), l != 64 && i != 0 && (t = t + String.fromCharCode(i));
  return t;
}
class Qr {
  constructor() {
    this.promise = new Qr.promiseConstructor((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
Qr.promiseConstructor = Promise;
function ui(n) {
  const e = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i, t = n.split(".");
  if (t.length !== 3)
    throw new Error("JWT is not valid: not a JWT structure");
  if (!e.test(t[1]))
    throw new Error("JWT is not valid: payload is not in base64url format");
  const r = t[1];
  return JSON.parse(Gl(r));
}
async function Kl(n) {
  return await new Promise((e) => {
    setTimeout(() => e(null), n);
  });
}
function Xl(n, e) {
  return new Promise((r, s) => {
    (async () => {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const a = await n(i);
          if (!e(i, null, a)) {
            r(a);
            return;
          }
        } catch (a) {
          if (!e(i, a)) {
            s(a);
            return;
          }
        }
    })();
  });
}
function Ql(n) {
  return ("0" + n.toString(16)).substr(-2);
}
function Zl() {
  const e = new Uint32Array(56);
  if (typeof crypto > "u") {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", r = t.length;
    let s = "";
    for (let i = 0; i < 56; i++)
      s += t.charAt(Math.floor(Math.random() * r));
    return s;
  }
  return crypto.getRandomValues(e), Array.from(e, Ql).join("");
}
async function eu(n) {
  const t = new TextEncoder().encode(n), r = await crypto.subtle.digest("SHA-256", t), s = new Uint8Array(r);
  return Array.from(s).map((i) => String.fromCharCode(i)).join("");
}
function tu(n) {
  return btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function ru(n) {
  if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u"))
    return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), n;
  const t = await eu(n);
  return tu(t);
}
async function yt(n, e, t = !1) {
  const r = Zl();
  let s = r;
  t && (s += "/PASSWORD_RECOVERY"), await va(n, `${e}-code-verifier`, s);
  const i = await ru(r);
  return [i, r === i ? "plain" : "s256"];
}
const nu = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function su(n) {
  const e = n.headers.get(Hn);
  if (!e || !e.match(nu))
    return null;
  try {
    return /* @__PURE__ */ new Date(`${e}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
class ms extends Error {
  constructor(e, t, r) {
    super(e), this.__isAuthError = !0, this.name = "AuthError", this.status = t, this.code = r;
  }
}
function I(n) {
  return typeof n == "object" && n !== null && "__isAuthError" in n;
}
class iu extends ms {
  constructor(e, t, r) {
    super(e, t, r), this.name = "AuthApiError", this.status = t, this.code = r;
  }
}
function au(n) {
  return I(n) && n.name === "AuthApiError";
}
class ba extends ms {
  constructor(e, t) {
    super(e), this.name = "AuthUnknownError", this.originalError = t;
  }
}
class ut extends ms {
  constructor(e, t, r, s) {
    super(e, r, s), this.name = t, this.status = r;
  }
}
class ze extends ut {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
function ou(n) {
  return I(n) && n.name === "AuthSessionMissingError";
}
class wn extends ut {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
}
class Er extends ut {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class xr extends ut {
  constructor(e, t = null) {
    super(e, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
class hi extends ut {
  constructor(e, t = null) {
    super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
class Jn extends ut {
  constructor(e, t) {
    super(e, "AuthRetryableFetchError", t, void 0);
  }
}
function vn(n) {
  return I(n) && n.name === "AuthRetryableFetchError";
}
class di extends ut {
  constructor(e, t, r) {
    super(e, "AuthWeakPasswordError", t, "weak_password"), this.reasons = r;
  }
}
var cu = function(n, e) {
  var t = {};
  for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(n); s < r.length; s++)
      e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[s]) && (t[r[s]] = n[r[s]]);
  return t;
};
const tt = (n) => n.msg || n.message || n.error_description || n.error || JSON.stringify(n), lu = [502, 503, 504];
async function fi(n) {
  var e;
  if (!Yl(n))
    throw new Jn(tt(n), 0);
  if (lu.includes(n.status))
    throw new Jn(tt(n), n.status);
  let t;
  try {
    t = await n.json();
  } catch (i) {
    throw new ba(tt(i), i);
  }
  let r;
  const s = su(n);
  if (s && s.getTime() >= ya["2024-01-01"].timestamp && typeof t == "object" && t && typeof t.code == "string" ? r = t.code : typeof t == "object" && t && typeof t.error_code == "string" && (r = t.error_code), r) {
    if (r === "weak_password")
      throw new di(tt(t), n.status, ((e = t.weak_password) === null || e === void 0 ? void 0 : e.reasons) || []);
    if (r === "session_not_found")
      throw new ze();
  } else if (typeof t == "object" && t && typeof t.weak_password == "object" && t.weak_password && Array.isArray(t.weak_password.reasons) && t.weak_password.reasons.length && t.weak_password.reasons.reduce((i, a) => i && typeof a == "string", !0))
    throw new di(tt(t), n.status, t.weak_password.reasons);
  throw new iu(tt(t), n.status || 500, r);
}
const uu = (n, e, t, r) => {
  const s = { method: n, headers: (e == null ? void 0 : e.headers) || {} };
  return n === "GET" ? s : (s.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, e == null ? void 0 : e.headers), s.body = JSON.stringify(r), Object.assign(Object.assign({}, s), t));
};
async function N(n, e, t, r) {
  var s;
  const i = Object.assign({}, r == null ? void 0 : r.headers);
  i[Hn] || (i[Hn] = ya["2024-01-01"].name), r != null && r.jwt && (i.Authorization = `Bearer ${r.jwt}`);
  const a = (s = r == null ? void 0 : r.query) !== null && s !== void 0 ? s : {};
  r != null && r.redirectTo && (a.redirect_to = r.redirectTo);
  const o = Object.keys(a).length ? "?" + new URLSearchParams(a).toString() : "", c = await hu(n, e, t + o, {
    headers: i,
    noResolveJson: r == null ? void 0 : r.noResolveJson
  }, {}, r == null ? void 0 : r.body);
  return r != null && r.xform ? r == null ? void 0 : r.xform(c) : { data: Object.assign({}, c), error: null };
}
async function hu(n, e, t, r, s, i) {
  const a = uu(e, r, s, i);
  let o;
  try {
    o = await n(t, Object.assign({}, a));
  } catch (c) {
    throw console.error(c), new Jn(tt(c), 0);
  }
  if (o.ok || await fi(o), r != null && r.noResolveJson)
    return o;
  try {
    return await o.json();
  } catch (c) {
    await fi(c);
  }
}
function Ye(n) {
  var e;
  let t = null;
  gu(n) && (t = Object.assign({}, n), n.expires_at || (t.expires_at = Vl(n.expires_in)));
  const r = (e = n.user) !== null && e !== void 0 ? e : n;
  return { data: { session: t, user: r }, error: null };
}
function mi(n) {
  const e = Ye(n);
  return !e.error && n.weak_password && typeof n.weak_password == "object" && Array.isArray(n.weak_password.reasons) && n.weak_password.reasons.length && n.weak_password.message && typeof n.weak_password.message == "string" && n.weak_password.reasons.reduce((t, r) => t && typeof r == "string", !0) && (e.data.weak_password = n.weak_password), e;
}
function Ke(n) {
  var e;
  return { data: { user: (e = n.user) !== null && e !== void 0 ? e : n }, error: null };
}
function du(n) {
  return { data: n, error: null };
}
function fu(n) {
  const { action_link: e, email_otp: t, hashed_token: r, redirect_to: s, verification_type: i } = n, a = cu(n, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), o = {
    action_link: e,
    email_otp: t,
    hashed_token: r,
    redirect_to: s,
    verification_type: i
  }, c = Object.assign({}, a);
  return {
    data: {
      properties: o,
      user: c
    },
    error: null
  };
}
function mu(n) {
  return n;
}
function gu(n) {
  return n.access_token && n.refresh_token && n.expires_in;
}
var pu = function(n, e) {
  var t = {};
  for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(n); s < r.length; s++)
      e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[s]) && (t[r[s]] = n[r[s]]);
  return t;
};
class _u {
  constructor({ url: e = "", headers: t = {}, fetch: r }) {
    this.url = e, this.headers = t, this.fetch = wa(r), this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(e, t = "global") {
    try {
      return await N(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
        headers: this.headers,
        jwt: e,
        noResolveJson: !0
      }), { data: null, error: null };
    } catch (r) {
      if (I(r))
        return { data: null, error: r };
      throw r;
    }
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param options Additional options to be included when inviting.
   */
  async inviteUserByEmail(e, t = {}) {
    try {
      return await N(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: e, data: t.data },
        headers: this.headers,
        redirectTo: t.redirectTo,
        xform: Ke
      });
    } catch (r) {
      if (I(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  /**
   * Generates email links and OTPs to be sent via a custom email provider.
   * @param email The user's email.
   * @param options.password User password. For signup only.
   * @param options.data Optional user metadata. For signup only.
   * @param options.redirectTo The redirect url which should be appended to the generated link
   */
  async generateLink(e) {
    try {
      const { options: t } = e, r = pu(e, ["options"]), s = Object.assign(Object.assign({}, r), t);
      return "newEmail" in r && (s.new_email = r == null ? void 0 : r.newEmail, delete s.newEmail), await N(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body: s,
        headers: this.headers,
        xform: fu,
        redirectTo: t == null ? void 0 : t.redirectTo
      });
    } catch (t) {
      if (I(t))
        return {
          data: {
            properties: null,
            user: null
          },
          error: t
        };
      throw t;
    }
  }
  // User Admin API
  /**
   * Creates a new user.
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async createUser(e) {
    try {
      return await N(this.fetch, "POST", `${this.url}/admin/users`, {
        body: e,
        headers: this.headers,
        xform: Ke
      });
    } catch (t) {
      if (I(t))
        return { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
   */
  async listUsers(e) {
    var t, r, s, i, a, o, c;
    try {
      const l = { nextPage: null, lastPage: 0, total: 0 }, u = await N(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (r = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && r !== void 0 ? r : "",
          per_page: (i = (s = e == null ? void 0 : e.perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && i !== void 0 ? i : ""
        },
        xform: mu
      });
      if (u.error)
        throw u.error;
      const h = await u.json(), f = (a = u.headers.get("x-total-count")) !== null && a !== void 0 ? a : 0, m = (c = (o = u.headers.get("link")) === null || o === void 0 ? void 0 : o.split(",")) !== null && c !== void 0 ? c : [];
      return m.length > 0 && (m.forEach((p) => {
        const g = parseInt(p.split(";")[0].split("=")[1].substring(0, 1)), _ = JSON.parse(p.split(";")[1].split("=")[1]);
        l[`${_}Page`] = g;
      }), l.total = parseInt(f)), { data: Object.assign(Object.assign({}, h), l), error: null };
    } catch (l) {
      if (I(l))
        return { data: { users: [] }, error: l };
      throw l;
    }
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async getUserById(e) {
    try {
      return await N(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        xform: Ke
      });
    } catch (t) {
      if (I(t))
        return { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async updateUserById(e, t) {
    try {
      return await N(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
        body: t,
        headers: this.headers,
        xform: Ke
      });
    } catch (r) {
      if (I(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * @param id The user id you want to remove.
   * @param shouldSoftDelete If true, then the user will be soft-deleted (setting `deleted_at` to the current timestamp and disabling their account while preserving their data) from the auth schema.
   * Defaults to false for backward compatibility.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async deleteUser(e, t = !1) {
    try {
      return await N(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        body: {
          should_soft_delete: t
        },
        xform: Ke
      });
    } catch (r) {
      if (I(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(e) {
    try {
      const { data: t, error: r } = await N(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
        headers: this.headers,
        xform: (s) => ({ data: { factors: s }, error: null })
      });
      return { data: t, error: r };
    } catch (t) {
      if (I(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _deleteFactor(e) {
    try {
      return { data: await N(this.fetch, "DELETE", `${this.url}/admin/users/${e.userId}/factors/${e.id}`, {
        headers: this.headers
      }), error: null };
    } catch (t) {
      if (I(t))
        return { data: null, error: t };
      throw t;
    }
  }
}
const yu = {
  getItem: (n) => er() ? globalThis.localStorage.getItem(n) : null,
  setItem: (n, e) => {
    er() && globalThis.localStorage.setItem(n, e);
  },
  removeItem: (n) => {
    er() && globalThis.localStorage.removeItem(n);
  }
};
function gi(n = {}) {
  return {
    getItem: (e) => n[e] || null,
    setItem: (e, t) => {
      n[e] = t;
    },
    removeItem: (e) => {
      delete n[e];
    }
  };
}
function wu() {
  if (typeof globalThis != "object")
    try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get: function() {
          return this;
        },
        configurable: !0
      }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
    } catch {
      typeof self < "u" && (self.globalThis = self);
    }
}
const wt = {
  /**
   * @experimental
   */
  debug: !!(globalThis && er() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};
class Sa extends Error {
  constructor(e) {
    super(e), this.isAcquireTimeout = !0;
  }
}
class vu extends Sa {
}
async function bu(n, e, t) {
  wt.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", n, e);
  const r = new globalThis.AbortController();
  return e > 0 && setTimeout(() => {
    r.abort(), wt.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", n);
  }, e), await globalThis.navigator.locks.request(n, e === 0 ? {
    mode: "exclusive",
    ifAvailable: !0
  } : {
    mode: "exclusive",
    signal: r.signal
  }, async (s) => {
    if (s) {
      wt.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", n, s.name);
      try {
        return await t();
      } finally {
        wt.debug && console.log("@supabase/gotrue-js: navigatorLock: released", n, s.name);
      }
    } else {
      if (e === 0)
        throw wt.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", n), new vu(`Acquiring an exclusive Navigator LockManager lock "${n}" immediately failed`);
      if (wt.debug)
        try {
          const i = await globalThis.navigator.locks.query();
          console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(i, null, "  "));
        } catch (i) {
          console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", i);
        }
      return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await t();
    }
  });
}
wu();
const Su = {
  url: ql,
  storageKey: Hl,
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  headers: Jl,
  flowType: "implicit",
  debug: !1,
  hasCustomAuthorizationHeader: !1
}, qt = 30 * 1e3, pi = 3;
async function _i(n, e, t) {
  return await t();
}
class nr {
  /**
   * Create a new client for use in the browser.
   */
  constructor(e) {
    var t, r;
    this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = nr.nextInstanceID, nr.nextInstanceID += 1, this.instanceID > 0 && Oe() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    const s = Object.assign(Object.assign({}, Su), e);
    if (this.logDebugMessages = !!s.debug, typeof s.debug == "function" && (this.logger = s.debug), this.persistSession = s.persistSession, this.storageKey = s.storageKey, this.autoRefreshToken = s.autoRefreshToken, this.admin = new _u({
      url: s.url,
      headers: s.headers,
      fetch: s.fetch
    }), this.url = s.url, this.headers = s.headers, this.fetch = wa(s.fetch), this.lock = s.lock || _i, this.detectSessionInUrl = s.detectSessionInUrl, this.flowType = s.flowType, this.hasCustomAuthorizationHeader = s.hasCustomAuthorizationHeader, s.lock ? this.lock = s.lock : Oe() && (!((t = globalThis == null ? void 0 : globalThis.navigator) === null || t === void 0) && t.locks) ? this.lock = bu : this.lock = _i, this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    }, this.persistSession ? s.storage ? this.storage = s.storage : er() ? this.storage = yu : (this.memoryStorage = {}, this.storage = gi(this.memoryStorage)) : (this.memoryStorage = {}, this.storage = gi(this.memoryStorage)), Oe() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (i) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", i);
      }
      (r = this.broadcastChannel) === null || r === void 0 || r.addEventListener("message", async (i) => {
        this._debug("received broadcast notification from other tab or client", i), await this._notifyAllSubscribers(i.data.event, i.data.session, !1);
      });
    }
    this.initialize();
  }
  _debug(...e) {
    return this.logDebugMessages && this.logger(`GoTrueClient@${this.instanceID} (${_a}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...e), this;
  }
  /**
   * Initializes the client session either from the url or from storage.
   * This method is automatically called when instantiating the client, but should also be called
   * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
   */
  async initialize() {
    return this.initializePromise ? await this.initializePromise : (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))(), await this.initializePromise);
  }
  /**
   * IMPORTANT:
   * 1. Never throw in this method, as it is called from the constructor
   * 2. Never return a session from this method as it would be cached over
   *    the whole lifetime of the client
   */
  async _initialize() {
    try {
      const e = Oe() ? await this._isPKCEFlow() : !1;
      if (this._debug("#_initialize()", "begin", "is PKCE flow", e), e || this.detectSessionInUrl && this._isImplicitGrantFlow()) {
        const { data: t, error: r } = await this._getSessionFromURL(e);
        if (r)
          return this._debug("#_initialize()", "error detecting session from URL", r), (r == null ? void 0 : r.code) === "identity_already_exists" ? { error: r } : (await this._removeSession(), { error: r });
        const { session: s, redirectType: i } = t;
        return this._debug("#_initialize()", "detected session in URL", s, "redirect type", i), await this._saveSession(s), setTimeout(async () => {
          i === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", s) : await this._notifyAllSubscribers("SIGNED_IN", s);
        }, 0), { error: null };
      }
      return await this._recoverAndRefresh(), { error: null };
    } catch (e) {
      return I(e) ? { error: e } : {
        error: new ba("Unexpected error during initialization", e)
      };
    } finally {
      await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
    }
  }
  /**
   * Creates a new anonymous user.
   *
   * @returns A session where the is_anonymous claim in the access token JWT set to true
   */
  async signInAnonymously(e) {
    var t, r, s;
    try {
      const i = await N(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (r = (t = e == null ? void 0 : e.options) === null || t === void 0 ? void 0 : t.data) !== null && r !== void 0 ? r : {},
          gotrue_meta_security: { captcha_token: (s = e == null ? void 0 : e.options) === null || s === void 0 ? void 0 : s.captchaToken }
        },
        xform: Ye
      }), { data: a, error: o } = i;
      if (o || !a)
        return { data: { user: null, session: null }, error: o };
      const c = a.session, l = a.user;
      return a.session && (await this._saveSession(a.session), await this._notifyAllSubscribers("SIGNED_IN", c)), { data: { user: l, session: c }, error: null };
    } catch (i) {
      if (I(i))
        return { data: { user: null, session: null }, error: i };
      throw i;
    }
  }
  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  async signUp(e) {
    var t, r, s;
    try {
      let i;
      if ("email" in e) {
        const { email: u, password: h, options: f } = e;
        let m = null, p = null;
        this.flowType === "pkce" && ([m, p] = await yt(this.storage, this.storageKey)), i = await N(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: f == null ? void 0 : f.emailRedirectTo,
          body: {
            email: u,
            password: h,
            data: (t = f == null ? void 0 : f.data) !== null && t !== void 0 ? t : {},
            gotrue_meta_security: { captcha_token: f == null ? void 0 : f.captchaToken },
            code_challenge: m,
            code_challenge_method: p
          },
          xform: Ye
        });
      } else if ("phone" in e) {
        const { phone: u, password: h, options: f } = e;
        i = await N(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: u,
            password: h,
            data: (r = f == null ? void 0 : f.data) !== null && r !== void 0 ? r : {},
            channel: (s = f == null ? void 0 : f.channel) !== null && s !== void 0 ? s : "sms",
            gotrue_meta_security: { captcha_token: f == null ? void 0 : f.captchaToken }
          },
          xform: Ye
        });
      } else
        throw new Er("You must provide either an email or phone number and a password");
      const { data: a, error: o } = i;
      if (o || !a)
        return { data: { user: null, session: null }, error: o };
      const c = a.session, l = a.user;
      return a.session && (await this._saveSession(a.session), await this._notifyAllSubscribers("SIGNED_IN", c)), { data: { user: l, session: c }, error: null };
    } catch (i) {
      if (I(i))
        return { data: { user: null, session: null }, error: i };
      throw i;
    }
  }
  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  async signInWithPassword(e) {
    try {
      let t;
      if ("email" in e) {
        const { email: i, password: a, options: o } = e;
        t = await N(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email: i,
            password: a,
            gotrue_meta_security: { captcha_token: o == null ? void 0 : o.captchaToken }
          },
          xform: mi
        });
      } else if ("phone" in e) {
        const { phone: i, password: a, options: o } = e;
        t = await N(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone: i,
            password: a,
            gotrue_meta_security: { captcha_token: o == null ? void 0 : o.captchaToken }
          },
          xform: mi
        });
      } else
        throw new Er("You must provide either an email or phone number and a password");
      const { data: r, error: s } = t;
      return s ? { data: { user: null, session: null }, error: s } : !r || !r.session || !r.user ? { data: { user: null, session: null }, error: new wn() } : (r.session && (await this._saveSession(r.session), await this._notifyAllSubscribers("SIGNED_IN", r.session)), {
        data: Object.assign({ user: r.user, session: r.session }, r.weak_password ? { weakPassword: r.weak_password } : null),
        error: s
      });
    } catch (t) {
      if (I(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Log in an existing user via a third-party provider.
   * This method supports the PKCE flow.
   */
  async signInWithOAuth(e) {
    var t, r, s, i;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
      scopes: (r = e.options) === null || r === void 0 ? void 0 : r.scopes,
      queryParams: (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
      skipBrowserRedirect: (i = e.options) === null || i === void 0 ? void 0 : i.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(e) {
    return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e));
  }
  async _exchangeCodeForSession(e) {
    const t = await br(this.storage, `${this.storageKey}-code-verifier`), [r, s] = (t ?? "").split("/");
    try {
      const { data: i, error: a } = await N(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: e,
          code_verifier: r
        },
        xform: Ye
      });
      if (await Sr(this.storage, `${this.storageKey}-code-verifier`), a)
        throw a;
      return !i || !i.session || !i.user ? {
        data: { user: null, session: null, redirectType: null },
        error: new wn()
      } : (i.session && (await this._saveSession(i.session), await this._notifyAllSubscribers("SIGNED_IN", i.session)), { data: Object.assign(Object.assign({}, i), { redirectType: s ?? null }), error: a });
    } catch (i) {
      if (I(i))
        return { data: { user: null, session: null, redirectType: null }, error: i };
      throw i;
    }
  }
  /**
   * Allows signing in with an OIDC ID token. The authentication provider used
   * should be enabled and configured.
   */
  async signInWithIdToken(e) {
    try {
      const { options: t, provider: r, token: s, access_token: i, nonce: a } = e, o = await N(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider: r,
          id_token: s,
          access_token: i,
          nonce: a,
          gotrue_meta_security: { captcha_token: t == null ? void 0 : t.captchaToken }
        },
        xform: Ye
      }), { data: c, error: l } = o;
      return l ? { data: { user: null, session: null }, error: l } : !c || !c.session || !c.user ? {
        data: { user: null, session: null },
        error: new wn()
      } : (c.session && (await this._saveSession(c.session), await this._notifyAllSubscribers("SIGNED_IN", c.session)), { data: c, error: l });
    } catch (t) {
      if (I(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Log in a user using magiclink or a one-time password (OTP).
   *
   * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
   * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
   * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or, that the account
   * can only be accessed via social login.
   *
   * Do note that you will need to configure a Whatsapp sender on Twilio
   * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
   * channel is not supported on other providers
   * at this time.
   * This method supports PKCE when an email is passed.
   */
  async signInWithOtp(e) {
    var t, r, s, i, a;
    try {
      if ("email" in e) {
        const { email: o, options: c } = e;
        let l = null, u = null;
        this.flowType === "pkce" && ([l, u] = await yt(this.storage, this.storageKey));
        const { error: h } = await N(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: o,
            data: (t = c == null ? void 0 : c.data) !== null && t !== void 0 ? t : {},
            create_user: (r = c == null ? void 0 : c.shouldCreateUser) !== null && r !== void 0 ? r : !0,
            gotrue_meta_security: { captcha_token: c == null ? void 0 : c.captchaToken },
            code_challenge: l,
            code_challenge_method: u
          },
          redirectTo: c == null ? void 0 : c.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: h };
      }
      if ("phone" in e) {
        const { phone: o, options: c } = e, { data: l, error: u } = await N(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone: o,
            data: (s = c == null ? void 0 : c.data) !== null && s !== void 0 ? s : {},
            create_user: (i = c == null ? void 0 : c.shouldCreateUser) !== null && i !== void 0 ? i : !0,
            gotrue_meta_security: { captcha_token: c == null ? void 0 : c.captchaToken },
            channel: (a = c == null ? void 0 : c.channel) !== null && a !== void 0 ? a : "sms"
          }
        });
        return { data: { user: null, session: null, messageId: l == null ? void 0 : l.message_id }, error: u };
      }
      throw new Er("You must provide either an email or phone number.");
    } catch (o) {
      if (I(o))
        return { data: { user: null, session: null }, error: o };
      throw o;
    }
  }
  /**
   * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
   */
  async verifyOtp(e) {
    var t, r;
    try {
      let s, i;
      "options" in e && (s = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo, i = (r = e.options) === null || r === void 0 ? void 0 : r.captchaToken);
      const { data: a, error: o } = await N(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, e), { gotrue_meta_security: { captcha_token: i } }),
        redirectTo: s,
        xform: Ye
      });
      if (o)
        throw o;
      if (!a)
        throw new Error("An error occurred on token verification.");
      const c = a.session, l = a.user;
      return c != null && c.access_token && (await this._saveSession(c), await this._notifyAllSubscribers(e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", c)), { data: { user: l, session: c }, error: null };
    } catch (s) {
      if (I(s))
        return { data: { user: null, session: null }, error: s };
      throw s;
    }
  }
  /**
   * Attempts a single-sign on using an enterprise Identity Provider. A
   * successful SSO attempt will redirect the current page to the identity
   * provider authorization page. The redirect URL is implementation and SSO
   * protocol specific.
   *
   * You can use it by providing a SSO domain. Typically you can extract this
   * domain by asking users for their email address. If this domain is
   * registered on the Auth instance the redirect will use that organization's
   * currently active SSO Identity Provider for the login.
   *
   * If you have built an organization-specific login page, you can use the
   * organization's SSO Identity Provider UUID directly instead.
   */
  async signInWithSSO(e) {
    var t, r, s;
    try {
      let i = null, a = null;
      return this.flowType === "pkce" && ([i, a] = await yt(this.storage, this.storageKey)), await N(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e ? { provider_id: e.providerId } : null), "domain" in e ? { domain: e.domain } : null), { redirect_to: (r = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !== null && r !== void 0 ? r : void 0 }), !((s = e == null ? void 0 : e.options) === null || s === void 0) && s.captchaToken ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } } : null), { skip_http_redirect: !0, code_challenge: i, code_challenge_method: a }),
        headers: this.headers,
        xform: du
      });
    } catch (i) {
      if (I(i))
        return { data: null, error: i };
      throw i;
    }
  }
  /**
   * Sends a reauthentication OTP to the user's email or phone number.
   * Requires the user to be signed-in.
   */
  async reauthenticate() {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (e) => {
        const { data: { session: t }, error: r } = e;
        if (r)
          throw r;
        if (!t)
          throw new ze();
        const { error: s } = await N(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: t.access_token
        });
        return { data: { user: null, session: null }, error: s };
      });
    } catch (e) {
      if (I(e))
        return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  /**
   * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
   */
  async resend(e) {
    try {
      const t = `${this.url}/resend`;
      if ("email" in e) {
        const { email: r, type: s, options: i } = e, { error: a } = await N(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            email: r,
            type: s,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          },
          redirectTo: i == null ? void 0 : i.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: a };
      } else if ("phone" in e) {
        const { phone: r, type: s, options: i } = e, { data: a, error: o } = await N(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            phone: r,
            type: s,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          }
        });
        return { data: { user: null, session: null, messageId: a == null ? void 0 : a.message_id }, error: o };
      }
      throw new Er("You must provide either an email or phone number and a type");
    } catch (t) {
      if (I(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Returns the session, refreshing it if necessary.
   *
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   *
   * **IMPORTANT:** This method loads values directly from the storage attached
   * to the client. If that storage is based on request cookies for example,
   * the values in it may not be authentic and therefore it's strongly advised
   * against using this method and its results in such circumstances. A warning
   * will be emitted if this is detected. Use {@link #getUser()} instead.
   */
  async getSession() {
    return await this.initializePromise, await this._acquireLock(-1, async () => this._useSession(async (t) => t));
  }
  /**
   * Acquires a global lock based on the storage key.
   */
  async _acquireLock(e, t) {
    this._debug("#_acquireLock", "begin", e);
    try {
      if (this.lockAcquired) {
        const r = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), s = (async () => (await r, await t()))();
        return this.pendingInLock.push((async () => {
          try {
            await s;
          } catch {
          }
        })()), s;
      }
      return await this.lock(`lock:${this.storageKey}`, e, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = !0;
          const r = t();
          for (this.pendingInLock.push((async () => {
            try {
              await r;
            } catch {
            }
          })()), await r; this.pendingInLock.length; ) {
            const s = [...this.pendingInLock];
            await Promise.all(s), this.pendingInLock.splice(0, s.length);
          }
          return await r;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = !1;
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  /**
   * Use instead of {@link #getSession} inside the library. It is
   * semantically usually what you want, as getting a session involves some
   * processing afterwards that requires only one client operating on the
   * session at once across multiple tabs or processes.
   */
  async _useSession(e) {
    this._debug("#_useSession", "begin");
    try {
      const t = await this.__loadSession();
      return await e(t);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  /**
   * NEVER USE DIRECTLY!
   *
   * Always use {@link #_useSession}.
   */
  async __loadSession() {
    this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
    try {
      let e = null;
      const t = await br(this.storage, this.storageKey);
      if (this._debug("#getSession()", "session from storage", t), t !== null && (this._isValidSession(t) ? e = t : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e)
        return { data: { session: null }, error: null };
      const r = e.expires_at ? e.expires_at <= Date.now() / 1e3 : !1;
      if (this._debug("#__loadSession()", `session has${r ? "" : " not"} expired`, "expires_at", e.expires_at), !r) {
        if (this.storage.isServer) {
          let a = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (c, l, u) => (!a && l === "user" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), a = !0, this.suppressGetSessionWarning = !0), Reflect.get(c, l, u))
          });
        }
        return { data: { session: e }, error: null };
      }
      const { session: s, error: i } = await this._callRefreshToken(e.refresh_token);
      return i ? { data: { session: null }, error: i } : { data: { session: s }, error: null };
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  /**
   * Gets the current user details if there is an existing session. This method
   * performs a network request to the Supabase Auth server, so the returned
   * value is authentic and can be used to base authorization rules on.
   *
   * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
   */
  async getUser(e) {
    return e ? await this._getUser(e) : (await this.initializePromise, await this._acquireLock(-1, async () => await this._getUser()));
  }
  async _getUser(e) {
    try {
      return e ? await N(this.fetch, "GET", `${this.url}/user`, {
        headers: this.headers,
        jwt: e,
        xform: Ke
      }) : await this._useSession(async (t) => {
        var r, s, i;
        const { data: a, error: o } = t;
        if (o)
          throw o;
        return !(!((r = a.session) === null || r === void 0) && r.access_token) && !this.hasCustomAuthorizationHeader ? { data: { user: null }, error: new ze() } : await N(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (i = (s = a.session) === null || s === void 0 ? void 0 : s.access_token) !== null && i !== void 0 ? i : void 0,
          xform: Ke
        });
      });
    } catch (t) {
      if (I(t))
        return ou(t) && (await this._removeSession(), await Sr(this.storage, `${this.storageKey}-code-verifier`)), { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Updates user data for a logged in user.
   */
  async updateUser(e, t = {}) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e, t));
  }
  async _updateUser(e, t = {}) {
    try {
      return await this._useSession(async (r) => {
        const { data: s, error: i } = r;
        if (i)
          throw i;
        if (!s.session)
          throw new ze();
        const a = s.session;
        let o = null, c = null;
        this.flowType === "pkce" && e.email != null && ([o, c] = await yt(this.storage, this.storageKey));
        const { data: l, error: u } = await N(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: t == null ? void 0 : t.emailRedirectTo,
          body: Object.assign(Object.assign({}, e), { code_challenge: o, code_challenge_method: c }),
          jwt: a.access_token,
          xform: Ke
        });
        if (u)
          throw u;
        return a.user = l.user, await this._saveSession(a), await this._notifyAllSubscribers("USER_UPDATED", a), { data: { user: a.user }, error: null };
      });
    } catch (r) {
      if (I(r))
        return { data: { user: null }, error: r };
      throw r;
    }
  }
  /**
   * Decodes a JWT (without performing any validation).
   */
  _decodeJWT(e) {
    return ui(e);
  }
  /**
   * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
   * If the refresh token or access token in the current session is invalid, an error will be thrown.
   * @param currentSession The current session that minimally contains an access token and refresh token.
   */
  async setSession(e) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e));
  }
  async _setSession(e) {
    try {
      if (!e.access_token || !e.refresh_token)
        throw new ze();
      const t = Date.now() / 1e3;
      let r = t, s = !0, i = null;
      const a = ui(e.access_token);
      if (a.exp && (r = a.exp, s = r <= t), s) {
        const { session: o, error: c } = await this._callRefreshToken(e.refresh_token);
        if (c)
          return { data: { user: null, session: null }, error: c };
        if (!o)
          return { data: { user: null, session: null }, error: null };
        i = o;
      } else {
        const { data: o, error: c } = await this._getUser(e.access_token);
        if (c)
          throw c;
        i = {
          access_token: e.access_token,
          refresh_token: e.refresh_token,
          user: o.user,
          token_type: "bearer",
          expires_in: r - t,
          expires_at: r
        }, await this._saveSession(i), await this._notifyAllSubscribers("SIGNED_IN", i);
      }
      return { data: { user: i.user, session: i }, error: null };
    } catch (t) {
      if (I(t))
        return { data: { session: null, user: null }, error: t };
      throw t;
    }
  }
  /**
   * Returns a new session, regardless of expiry status.
   * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
   * If the current session's refresh token is invalid, an error will be thrown.
   * @param currentSession The current session. If passed in, it must contain a refresh token.
   */
  async refreshSession(e) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e));
  }
  async _refreshSession(e) {
    try {
      return await this._useSession(async (t) => {
        var r;
        if (!e) {
          const { data: a, error: o } = t;
          if (o)
            throw o;
          e = (r = a.session) !== null && r !== void 0 ? r : void 0;
        }
        if (!(e != null && e.refresh_token))
          throw new ze();
        const { session: s, error: i } = await this._callRefreshToken(e.refresh_token);
        return i ? { data: { user: null, session: null }, error: i } : s ? { data: { user: s.user, session: s }, error: null } : { data: { user: null, session: null }, error: null };
      });
    } catch (t) {
      if (I(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Gets the session data from a URL string
   */
  async _getSessionFromURL(e) {
    try {
      if (!Oe())
        throw new xr("No browser detected.");
      if (this.flowType === "implicit" && !this._isImplicitGrantFlow())
        throw new xr("Not a valid implicit grant flow url.");
      if (this.flowType == "pkce" && !e)
        throw new hi("Not a valid PKCE flow url.");
      const t = yn(window.location.href);
      if (e) {
        if (!t.code)
          throw new hi("No code detected.");
        const { data: w, error: S } = await this._exchangeCodeForSession(t.code);
        if (S)
          throw S;
        const v = new URL(window.location.href);
        return v.searchParams.delete("code"), window.history.replaceState(window.history.state, "", v.toString()), { data: { session: w.session, redirectType: null }, error: null };
      }
      if (t.error || t.error_description || t.error_code)
        throw new xr(t.error_description || "Error in URL with unspecified error_description", {
          error: t.error || "unspecified_error",
          code: t.error_code || "unspecified_code"
        });
      const { provider_token: r, provider_refresh_token: s, access_token: i, refresh_token: a, expires_in: o, expires_at: c, token_type: l } = t;
      if (!i || !o || !a || !l)
        throw new xr("No session defined in URL");
      const u = Math.round(Date.now() / 1e3), h = parseInt(o);
      let f = u + h;
      c && (f = parseInt(c));
      const m = f - u;
      m * 1e3 <= qt && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${m}s, should have been closer to ${h}s`);
      const p = f - h;
      u - p >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", p, f, u) : u - p < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", p, f, u);
      const { data: g, error: _ } = await this._getUser(i);
      if (_)
        throw _;
      const T = {
        provider_token: r,
        provider_refresh_token: s,
        access_token: i,
        expires_in: h,
        expires_at: f,
        refresh_token: a,
        token_type: l,
        user: g.user
      };
      return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), { data: { session: T, redirectType: t.type }, error: null };
    } catch (t) {
      if (I(t))
        return { data: { session: null, redirectType: null }, error: t };
      throw t;
    }
  }
  /**
   * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
   */
  _isImplicitGrantFlow() {
    const e = yn(window.location.href);
    return !!(Oe() && (e.access_token || e.error_description));
  }
  /**
   * Checks if the current URL and backing storage contain parameters given by a PKCE flow
   */
  async _isPKCEFlow() {
    const e = yn(window.location.href), t = await br(this.storage, `${this.storageKey}-code-verifier`);
    return !!(e.code && t);
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
   *
   * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
   * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
   *
   * If using `others` scope, no `SIGNED_OUT` event is fired!
   */
  async signOut(e = { scope: "global" }) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e));
  }
  async _signOut({ scope: e } = { scope: "global" }) {
    return await this._useSession(async (t) => {
      var r;
      const { data: s, error: i } = t;
      if (i)
        return { error: i };
      const a = (r = s.session) === null || r === void 0 ? void 0 : r.access_token;
      if (a) {
        const { error: o } = await this.admin.signOut(a, e);
        if (o && !(au(o) && (o.status === 404 || o.status === 401 || o.status === 403)))
          return { error: o };
      }
      return e !== "others" && (await this._removeSession(), await Sr(this.storage, `${this.storageKey}-code-verifier`)), { error: null };
    });
  }
  /**
   * Receive a notification every time an auth event happens.
   * @param callback A callback function to be invoked when an auth event happens.
   */
  onAuthStateChange(e) {
    const t = zl(), r = {
      id: t,
      callback: e,
      unsubscribe: () => {
        this._debug("#unsubscribe()", "state change callback with id removed", t), this.stateChangeEmitters.delete(t);
      }
    };
    return this._debug("#onAuthStateChange()", "registered callback with id", t), this.stateChangeEmitters.set(t, r), (async () => (await this.initializePromise, await this._acquireLock(-1, async () => {
      this._emitInitialSession(t);
    })))(), { data: { subscription: r } };
  }
  async _emitInitialSession(e) {
    return await this._useSession(async (t) => {
      var r, s;
      try {
        const { data: { session: i }, error: a } = t;
        if (a)
          throw a;
        await ((r = this.stateChangeEmitters.get(e)) === null || r === void 0 ? void 0 : r.callback("INITIAL_SESSION", i)), this._debug("INITIAL_SESSION", "callback id", e, "session", i);
      } catch (i) {
        await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0 ? void 0 : s.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", i), console.error(i);
      }
    });
  }
  /**
   * Sends a password reset request to an email address. This method supports the PKCE flow.
   *
   * @param email The email address of the user.
   * @param options.redirectTo The URL to send the user to after they click the password reset link.
   * @param options.captchaToken Verification token received when the user completes the captcha on the site.
   */
  async resetPasswordForEmail(e, t = {}) {
    let r = null, s = null;
    this.flowType === "pkce" && ([r, s] = await yt(
      this.storage,
      this.storageKey,
      !0
      // isPasswordRecovery
    ));
    try {
      return await N(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: r,
          code_challenge_method: s,
          gotrue_meta_security: { captcha_token: t.captchaToken }
        },
        headers: this.headers,
        redirectTo: t.redirectTo
      });
    } catch (i) {
      if (I(i))
        return { data: null, error: i };
      throw i;
    }
  }
  /**
   * Gets all the identities linked to a user.
   */
  async getUserIdentities() {
    var e;
    try {
      const { data: t, error: r } = await this.getUser();
      if (r)
        throw r;
      return { data: { identities: (e = t.user.identities) !== null && e !== void 0 ? e : [] }, error: null };
    } catch (t) {
      if (I(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Links an oauth identity to an existing user.
   * This method supports the PKCE flow.
   */
  async linkIdentity(e) {
    var t;
    try {
      const { data: r, error: s } = await this._useSession(async (i) => {
        var a, o, c, l, u;
        const { data: h, error: f } = i;
        if (f)
          throw f;
        const m = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e.provider, {
          redirectTo: (a = e.options) === null || a === void 0 ? void 0 : a.redirectTo,
          scopes: (o = e.options) === null || o === void 0 ? void 0 : o.scopes,
          queryParams: (c = e.options) === null || c === void 0 ? void 0 : c.queryParams,
          skipBrowserRedirect: !0
        });
        return await N(this.fetch, "GET", m, {
          headers: this.headers,
          jwt: (u = (l = h.session) === null || l === void 0 ? void 0 : l.access_token) !== null && u !== void 0 ? u : void 0
        });
      });
      if (s)
        throw s;
      return Oe() && !(!((t = e.options) === null || t === void 0) && t.skipBrowserRedirect) && window.location.assign(r == null ? void 0 : r.url), { data: { provider: e.provider, url: r == null ? void 0 : r.url }, error: null };
    } catch (r) {
      if (I(r))
        return { data: { provider: e.provider, url: null }, error: r };
      throw r;
    }
  }
  /**
   * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
   */
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (t) => {
        var r, s;
        const { data: i, error: a } = t;
        if (a)
          throw a;
        return await N(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, {
          headers: this.headers,
          jwt: (s = (r = i.session) === null || r === void 0 ? void 0 : r.access_token) !== null && s !== void 0 ? s : void 0
        });
      });
    } catch (t) {
      if (I(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */
  async _refreshAccessToken(e) {
    const t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
    this._debug(t, "begin");
    try {
      const r = Date.now();
      return await Xl(async (s) => (s > 0 && await Kl(200 * Math.pow(2, s - 1)), this._debug(t, "refreshing attempt", s), await N(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
        body: { refresh_token: e },
        headers: this.headers,
        xform: Ye
      })), (s, i) => {
        const a = 200 * Math.pow(2, s);
        return i && vn(i) && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + a - r < qt;
      });
    } catch (r) {
      if (this._debug(t, "error", r), I(r))
        return { data: { session: null, user: null }, error: r };
      throw r;
    } finally {
      this._debug(t, "end");
    }
  }
  _isValidSession(e) {
    return typeof e == "object" && e !== null && "access_token" in e && "refresh_token" in e && "expires_at" in e;
  }
  async _handleProviderSignIn(e, t) {
    const r = await this._getUrlForProvider(`${this.url}/authorize`, e, {
      redirectTo: t.redirectTo,
      scopes: t.scopes,
      queryParams: t.queryParams
    });
    return this._debug("#_handleProviderSignIn()", "provider", e, "options", t, "url", r), Oe() && !t.skipBrowserRedirect && window.location.assign(r), { data: { provider: e, url: r }, error: null };
  }
  /**
   * Recovers the session from LocalStorage and refreshes the token
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  async _recoverAndRefresh() {
    var e;
    const t = "#_recoverAndRefresh()";
    this._debug(t, "begin");
    try {
      const r = await br(this.storage, this.storageKey);
      if (this._debug(t, "session from storage", r), !this._isValidSession(r)) {
        this._debug(t, "session is not valid"), r !== null && await this._removeSession();
        return;
      }
      const s = Math.round(Date.now() / 1e3), i = ((e = r.expires_at) !== null && e !== void 0 ? e : 1 / 0) < s + li;
      if (this._debug(t, `session has${i ? "" : " not"} expired with margin of ${li}s`), i) {
        if (this.autoRefreshToken && r.refresh_token) {
          const { error: a } = await this._callRefreshToken(r.refresh_token);
          a && (console.error(a), vn(a) || (this._debug(t, "refresh failed with a non-retryable error, removing the session", a), await this._removeSession()));
        }
      } else
        await this._notifyAllSubscribers("SIGNED_IN", r);
    } catch (r) {
      this._debug(t, "error", r), console.error(r);
      return;
    } finally {
      this._debug(t, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, r;
    if (!e)
      throw new ze();
    if (this.refreshingDeferred)
      return this.refreshingDeferred.promise;
    const s = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(s, "begin");
    try {
      this.refreshingDeferred = new Qr();
      const { data: i, error: a } = await this._refreshAccessToken(e);
      if (a)
        throw a;
      if (!i.session)
        throw new ze();
      await this._saveSession(i.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", i.session);
      const o = { session: i.session, error: null };
      return this.refreshingDeferred.resolve(o), o;
    } catch (i) {
      if (this._debug(s, "error", i), I(i)) {
        const a = { session: null, error: i };
        return vn(i) || await this._removeSession(), (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(a), a;
      }
      throw (r = this.refreshingDeferred) === null || r === void 0 || r.reject(i), i;
    } finally {
      this.refreshingDeferred = null, this._debug(s, "end");
    }
  }
  async _notifyAllSubscribers(e, t, r = !0) {
    const s = `#_notifyAllSubscribers(${e})`;
    this._debug(s, "begin", t, `broadcast = ${r}`);
    try {
      this.broadcastChannel && r && this.broadcastChannel.postMessage({ event: e, session: t });
      const i = [], a = Array.from(this.stateChangeEmitters.values()).map(async (o) => {
        try {
          await o.callback(e, t);
        } catch (c) {
          i.push(c);
        }
      });
      if (await Promise.all(a), i.length > 0) {
        for (let o = 0; o < i.length; o += 1)
          console.error(i[o]);
        throw i[0];
      }
    } finally {
      this._debug(s, "end");
    }
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  async _saveSession(e) {
    this._debug("#_saveSession()", e), this.suppressGetSessionWarning = !0, await va(this.storage, this.storageKey, e);
  }
  async _removeSession() {
    this._debug("#_removeSession()"), await Sr(this.storage, this.storageKey), await this._notifyAllSubscribers("SIGNED_OUT", null);
  }
  /**
   * Removes any registered visibilitychange callback.
   *
   * {@see #startAutoRefresh}
   * {@see #stopAutoRefresh}
   */
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e && Oe() && (window != null && window.removeEventListener) && window.removeEventListener("visibilitychange", e);
    } catch (t) {
      console.error("removing visibilitychange callback failed", t);
    }
  }
  /**
   * This is the private implementation of {@link #startAutoRefresh}. Use this
   * within the library.
   */
  async _startAutoRefresh() {
    await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
    const e = setInterval(() => this._autoRefreshTokenTick(), qt);
    this.autoRefreshTicker = e, e && typeof e == "object" && typeof e.unref == "function" ? e.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(e), setTimeout(async () => {
      await this.initializePromise, await this._autoRefreshTokenTick();
    }, 0);
  }
  /**
   * This is the private implementation of {@link #stopAutoRefresh}. Use this
   * within the library.
   */
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const e = this.autoRefreshTicker;
    this.autoRefreshTicker = null, e && clearInterval(e);
  }
  /**
   * Starts an auto-refresh process in the background. The session is checked
   * every few seconds. Close to the time of expiration a process is started to
   * refresh the session. If refreshing fails it will be retried for as long as
   * necessary.
   *
   * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
   * to call this function, it will be called for you.
   *
   * On browsers the refresh process works only when the tab/window is in the
   * foreground to conserve resources as well as prevent race conditions and
   * flooding auth with requests. If you call this method any managed
   * visibility change callback will be removed and you must manage visibility
   * changes on your own.
   *
   * On non-browser platforms the refresh process works *continuously* in the
   * background, which may not be desirable. You should hook into your
   * platform's foreground indication mechanism and call these methods
   * appropriately to conserve resources.
   *
   * {@see #stopAutoRefresh}
   */
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
  }
  /**
   * Stops an active auto refresh process running in the background (if any).
   *
   * If you call this method any managed visibility change callback will be
   * removed and you must manage visibility changes on your own.
   *
   * See {@link #startAutoRefresh} for more details.
   */
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
  }
  /**
   * Runs the auto refresh token tick.
   */
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const e = Date.now();
          try {
            return await this._useSession(async (t) => {
              const { data: { session: r } } = t;
              if (!r || !r.refresh_token || !r.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const s = Math.floor((r.expires_at * 1e3 - e) / qt);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${s} ticks, a tick lasts ${qt}ms, refresh threshold is ${pi} ticks`), s <= pi && await this._callRefreshToken(r.refresh_token);
            });
          } catch (t) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", t);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (e.isAcquireTimeout || e instanceof Sa)
        this._debug("auto refresh token tick lock not available");
      else
        throw e;
    }
  }
  /**
   * Registers callbacks on the browser / platform, which in-turn run
   * algorithms when the browser window/tab are in foreground. On non-browser
   * platforms it assumes always foreground.
   */
  async _handleVisibilityChange() {
    if (this._debug("#_handleVisibilityChange()"), !Oe() || !(window != null && window.addEventListener))
      return this.autoRefreshToken && this.startAutoRefresh(), !1;
    try {
      this.visibilityChangedCallback = async () => await this._onVisibilityChanged(!1), window == null || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(!0);
    } catch (e) {
      console.error("_handleVisibilityChange", e);
    }
  }
  /**
   * Callback registered with `window.addEventListener('visibilitychange')`.
   */
  async _onVisibilityChanged(e) {
    const t = `#_onVisibilityChanged(${e})`;
    this._debug(t, "visibilityState", document.visibilityState), document.visibilityState === "visible" ? (this.autoRefreshToken && this._startAutoRefresh(), e || (await this.initializePromise, await this._acquireLock(-1, async () => {
      if (document.visibilityState !== "visible") {
        this._debug(t, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
        return;
      }
      await this._recoverAndRefresh();
    }))) : document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh();
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param options.scopes A space-separated list of scopes granted to the OAuth application.
   * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
   */
  async _getUrlForProvider(e, t, r) {
    const s = [`provider=${encodeURIComponent(t)}`];
    if (r != null && r.redirectTo && s.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`), r != null && r.scopes && s.push(`scopes=${encodeURIComponent(r.scopes)}`), this.flowType === "pkce") {
      const [i, a] = await yt(this.storage, this.storageKey), o = new URLSearchParams({
        code_challenge: `${encodeURIComponent(i)}`,
        code_challenge_method: `${encodeURIComponent(a)}`
      });
      s.push(o.toString());
    }
    if (r != null && r.queryParams) {
      const i = new URLSearchParams(r.queryParams);
      s.push(i.toString());
    }
    return r != null && r.skipBrowserRedirect && s.push(`skip_http_redirect=${r.skipBrowserRedirect}`), `${e}?${s.join("&")}`;
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r;
        const { data: s, error: i } = t;
        return i ? { data: null, error: i } : await N(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
          headers: this.headers,
          jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
        });
      });
    } catch (t) {
      if (I(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (t) => {
        var r, s;
        const { data: i, error: a } = t;
        if (a)
          return { data: null, error: a };
        const o = Object.assign({ friendly_name: e.friendlyName, factor_type: e.factorType }, e.factorType === "phone" ? { phone: e.phone } : { issuer: e.issuer }), { data: c, error: l } = await N(this.fetch, "POST", `${this.url}/factors`, {
          body: o,
          headers: this.headers,
          jwt: (r = i == null ? void 0 : i.session) === null || r === void 0 ? void 0 : r.access_token
        });
        return l ? { data: null, error: l } : (e.factorType === "totp" && (!((s = c == null ? void 0 : c.totp) === null || s === void 0) && s.qr_code) && (c.totp.qr_code = `data:image/svg+xml;utf-8,${c.totp.qr_code}`), { data: c, error: null });
      });
    } catch (t) {
      if (I(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * {@see GoTrueMFAApi#verify}
   */
  async _verify(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var r;
          const { data: s, error: i } = t;
          if (i)
            return { data: null, error: i };
          const { data: a, error: o } = await N(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
            body: { code: e.code, challenge_id: e.challengeId },
            headers: this.headers,
            jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
          });
          return o ? { data: null, error: o } : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + a.expires_in }, a)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", a), { data: a, error: o });
        });
      } catch (t) {
        if (I(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challenge}
   */
  async _challenge(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var r;
          const { data: s, error: i } = t;
          return i ? { data: null, error: i } : await N(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
            body: { channel: e.channel },
            headers: this.headers,
            jwt: (r = s == null ? void 0 : s.session) === null || r === void 0 ? void 0 : r.access_token
          });
        });
      } catch (t) {
        if (I(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challengeAndVerify}
   */
  async _challengeAndVerify(e) {
    const { data: t, error: r } = await this._challenge({
      factorId: e.factorId
    });
    return r ? { data: null, error: r } : await this._verify({
      factorId: e.factorId,
      challengeId: t.id,
      code: e.code
    });
  }
  /**
   * {@see GoTrueMFAApi#listFactors}
   */
  async _listFactors() {
    const { data: { user: e }, error: t } = await this.getUser();
    if (t)
      return { data: null, error: t };
    const r = (e == null ? void 0 : e.factors) || [], s = r.filter((a) => a.factor_type === "totp" && a.status === "verified"), i = r.filter((a) => a.factor_type === "phone" && a.status === "verified");
    return {
      data: {
        all: r,
        totp: s,
        phone: i
      },
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(-1, async () => await this._useSession(async (e) => {
      var t, r;
      const { data: { session: s }, error: i } = e;
      if (i)
        return { data: null, error: i };
      if (!s)
        return {
          data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
          error: null
        };
      const a = this._decodeJWT(s.access_token);
      let o = null;
      a.aal && (o = a.aal);
      let c = o;
      ((r = (t = s.user.factors) === null || t === void 0 ? void 0 : t.filter((h) => h.status === "verified")) !== null && r !== void 0 ? r : []).length > 0 && (c = "aal2");
      const u = a.amr || [];
      return { data: { currentLevel: o, nextLevel: c, currentAuthenticationMethods: u }, error: null };
    }));
  }
}
nr.nextInstanceID = 0;
const Eu = nr;
class xu extends Eu {
  constructor(e) {
    super(e);
  }
}
var ku = function(n, e, t, r) {
  function s(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function o(u) {
      try {
        l(r.next(u));
      } catch (h) {
        a(h);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (h) {
        a(h);
      }
    }
    function l(u) {
      u.done ? i(u.value) : s(u.value).then(o, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
};
class Ou {
  /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(e, t, r) {
    var s, i, a;
    if (this.supabaseUrl = e, this.supabaseKey = t, !e)
      throw new Error("supabaseUrl is required.");
    if (!t)
      throw new Error("supabaseKey is required.");
    const o = Bl(e);
    this.realtimeUrl = `${o}/realtime/v1`.replace(/^http/i, "ws"), this.authUrl = `${o}/auth/v1`, this.storageUrl = `${o}/storage/v1`, this.functionsUrl = `${o}/functions/v1`;
    const c = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`, l = {
      db: Il,
      realtime: Dl,
      auth: Object.assign(Object.assign({}, jl), { storageKey: c }),
      global: $l
    }, u = Wl(r ?? {}, l);
    this.storageKey = (s = u.auth.storageKey) !== null && s !== void 0 ? s : "", this.headers = (i = u.global.headers) !== null && i !== void 0 ? i : {}, u.accessToken ? (this.accessToken = u.accessToken, this.auth = new Proxy({}, {
      get: (h, f) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(f)} is not possible`);
      }
    })) : this.auth = this._initSupabaseAuthClient((a = u.auth) !== null && a !== void 0 ? a : {}, this.headers, u.global.fetch), this.fetch = Fl(t, this._getAccessToken.bind(this), u.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, u.realtime)), this.rest = new el(`${o}/rest/v1`, {
      headers: this.headers,
      schema: u.db.schema,
      fetch: this.fetch
    }), u.accessToken || this._listenForAuthEvents();
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new Tc(this.functionsUrl, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  /**
   * Supabase Storage allows you to manage user-generated content, such as photos or videos.
   */
  get storage() {
    return new Al(this.storageUrl, this.headers, this.fetch);
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(e) {
    return this.rest.from(e);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.schema
  /**
   * Select a schema to query or perform an function (rpc) call.
   *
   * The schema needs to be on the list of exposed schemas inside Supabase.
   *
   * @param schema - The schema to query
   */
  schema(e) {
    return this.rest.schema(e);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.rpc
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.get - When set to `true`, the function will be called with
   * read-only access mode.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(e, t = {}, r = {}) {
    return this.rest.rpc(e, t, r);
  }
  /**
   * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
   *
   * @param {string} name - The name of the Realtime channel.
   * @param {Object} opts - The options to pass to the Realtime channel.
   *
   */
  channel(e, t = { config: {} }) {
    return this.realtime.channel(e, t);
  }
  /**
   * Returns all Realtime channels.
   */
  getChannels() {
    return this.realtime.getChannels();
  }
  /**
   * Unsubscribes and removes Realtime channel from Realtime client.
   *
   * @param {RealtimeChannel} channel - The name of the Realtime channel.
   *
   */
  removeChannel(e) {
    return this.realtime.removeChannel(e);
  }
  /**
   * Unsubscribes and removes all Realtime channels from Realtime client.
   */
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var e, t;
    return ku(this, void 0, void 0, function* () {
      if (this.accessToken)
        return yield this.accessToken();
      const { data: r } = yield this.auth.getSession();
      return (t = (e = r.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : null;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: r, storage: s, storageKey: i, flowType: a, lock: o, debug: c }, l, u) {
    var h;
    const f = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new xu({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, f), l),
      storageKey: i,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: r,
      storage: s,
      flowType: a,
      lock: o,
      debug: c,
      fetch: u,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      hasCustomAuthorizationHeader: (h = "Authorization" in this.headers) !== null && h !== void 0 ? h : !1
    });
  }
  _initRealtimeClient(e) {
    return new gl(this.realtimeUrl, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, e == null ? void 0 : e.params) }));
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((t, r) => {
      this._handleTokenChanged(t, "CLIENT", r == null ? void 0 : r.access_token);
    });
  }
  _handleTokenChanged(e, t, r) {
    (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== r ? (this.realtime.setAuth(r ?? null), this.changedAccessToken = r) : e === "SIGNED_OUT" && (this.realtime.setAuth(this.supabaseKey), t == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0);
  }
}
const Pu = (n, e, t) => new Ou(n, e, t), Cu = "https://zozodfjzxzlwzkhmfhwh.supabase.co", Au = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvem9kZmp6eHpsd3praG1maHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNDM3MjMsImV4cCI6MjA0NzYxOTcyM30.ywmi4WD1fZN3hRu-krtGmY1-IYSJSODh1tKK4Ytt18Q", Q = Pu(Cu, Au);
function $e(n) {
  const e = Object.prototype.toString.call(n);
  return n instanceof Date || typeof n == "object" && e === "[object Date]" ? new n.constructor(+n) : typeof n == "number" || e === "[object Number]" || typeof n == "string" || e === "[object String]" ? new Date(n) : /* @__PURE__ */ new Date(NaN);
}
function at(n, e) {
  return n instanceof Date ? new n.constructor(e) : new Date(e);
}
const Ea = 6048e5, Tu = 864e5;
let Ru = {};
function Zr() {
  return Ru;
}
function sr(n, e) {
  var o, c, l, u;
  const t = Zr(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? t.weekStartsOn ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, s = $e(n), i = s.getDay(), a = (i < r ? 7 : 0) + i - r;
  return s.setDate(s.getDate() - a), s.setHours(0, 0, 0, 0), s;
}
function Ur(n) {
  return sr(n, { weekStartsOn: 1 });
}
function xa(n) {
  const e = $e(n), t = e.getFullYear(), r = at(n, 0);
  r.setFullYear(t + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Ur(r), i = at(n, 0);
  i.setFullYear(t, 0, 4), i.setHours(0, 0, 0, 0);
  const a = Ur(i);
  return e.getTime() >= s.getTime() ? t + 1 : e.getTime() >= a.getTime() ? t : t - 1;
}
function yi(n) {
  const e = $e(n);
  return e.setHours(0, 0, 0, 0), e;
}
function wi(n) {
  const e = $e(n), t = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return t.setUTCFullYear(e.getFullYear()), +n - +t;
}
function $u(n, e) {
  const t = yi(n), r = yi(e), s = +t - wi(t), i = +r - wi(r);
  return Math.round((s - i) / Tu);
}
function Iu(n) {
  const e = xa(n), t = at(n, 0);
  return t.setFullYear(e, 0, 4), t.setHours(0, 0, 0, 0), Ur(t);
}
function ju(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function Du(n) {
  if (!ju(n) && typeof n != "number")
    return !1;
  const e = $e(n);
  return !isNaN(Number(e));
}
function Mu(n) {
  const e = $e(n), t = at(n, 0);
  return t.setFullYear(e.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
const Nu = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, Lu = (n, e, t) => {
  let r;
  const s = Nu[n];
  return typeof s == "string" ? r = s : e === 1 ? r = s.one : r = s.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + r : r + " ago" : r;
};
function bn(n) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : n.defaultWidth;
    return n.formats[t] || n.formats[n.defaultWidth];
  };
}
const Fu = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Uu = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Bu = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Wu = {
  date: bn({
    formats: Fu,
    defaultWidth: "full"
  }),
  time: bn({
    formats: Uu,
    defaultWidth: "full"
  }),
  dateTime: bn({
    formats: Bu,
    defaultWidth: "full"
  })
}, qu = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Hu = (n, e, t, r) => qu[n];
function Ht(n) {
  return (e, t) => {
    const r = t != null && t.context ? String(t.context) : "standalone";
    let s;
    if (r === "formatting" && n.formattingValues) {
      const a = n.defaultFormattingWidth || n.defaultWidth, o = t != null && t.width ? String(t.width) : a;
      s = n.formattingValues[o] || n.formattingValues[a];
    } else {
      const a = n.defaultWidth, o = t != null && t.width ? String(t.width) : n.defaultWidth;
      s = n.values[o] || n.values[a];
    }
    const i = n.argumentCallback ? n.argumentCallback(e) : e;
    return s[i];
  };
}
const Ju = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Vu = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, zu = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Yu = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Gu = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Ku = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Xu = (n, e) => {
  const t = Number(n), r = t % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return t + "st";
      case 2:
        return t + "nd";
      case 3:
        return t + "rd";
    }
  return t + "th";
}, Qu = {
  ordinalNumber: Xu,
  era: Ht({
    values: Ju,
    defaultWidth: "wide"
  }),
  quarter: Ht({
    values: Vu,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: Ht({
    values: zu,
    defaultWidth: "wide"
  }),
  day: Ht({
    values: Yu,
    defaultWidth: "wide"
  }),
  dayPeriod: Ht({
    values: Gu,
    defaultWidth: "wide",
    formattingValues: Ku,
    defaultFormattingWidth: "wide"
  })
};
function Jt(n) {
  return (e, t = {}) => {
    const r = t.width, s = r && n.matchPatterns[r] || n.matchPatterns[n.defaultMatchWidth], i = e.match(s);
    if (!i)
      return null;
    const a = i[0], o = r && n.parsePatterns[r] || n.parsePatterns[n.defaultParseWidth], c = Array.isArray(o) ? eh(o, (h) => h.test(a)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      Zu(o, (h) => h.test(a))
    );
    let l;
    l = n.valueCallback ? n.valueCallback(c) : c, l = t.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      t.valueCallback(l)
    ) : l;
    const u = e.slice(a.length);
    return { value: l, rest: u };
  };
}
function Zu(n, e) {
  for (const t in n)
    if (Object.prototype.hasOwnProperty.call(n, t) && e(n[t]))
      return t;
}
function eh(n, e) {
  for (let t = 0; t < n.length; t++)
    if (e(n[t]))
      return t;
}
function th(n) {
  return (e, t = {}) => {
    const r = e.match(n.matchPattern);
    if (!r) return null;
    const s = r[0], i = e.match(n.parsePattern);
    if (!i) return null;
    let a = n.valueCallback ? n.valueCallback(i[0]) : i[0];
    a = t.valueCallback ? t.valueCallback(a) : a;
    const o = e.slice(s.length);
    return { value: a, rest: o };
  };
}
const rh = /^(\d+)(th|st|nd|rd)?/i, nh = /\d+/i, sh = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ih = {
  any: [/^b/i, /^(a|c)/i]
}, ah = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, oh = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ch = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, lh = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, uh = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, hh = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, dh = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, fh = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, mh = {
  ordinalNumber: th({
    matchPattern: rh,
    parsePattern: nh,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: Jt({
    matchPatterns: sh,
    defaultMatchWidth: "wide",
    parsePatterns: ih,
    defaultParseWidth: "any"
  }),
  quarter: Jt({
    matchPatterns: ah,
    defaultMatchWidth: "wide",
    parsePatterns: oh,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: Jt({
    matchPatterns: ch,
    defaultMatchWidth: "wide",
    parsePatterns: lh,
    defaultParseWidth: "any"
  }),
  day: Jt({
    matchPatterns: uh,
    defaultMatchWidth: "wide",
    parsePatterns: hh,
    defaultParseWidth: "any"
  }),
  dayPeriod: Jt({
    matchPatterns: dh,
    defaultMatchWidth: "any",
    parsePatterns: fh,
    defaultParseWidth: "any"
  })
}, gh = {
  code: "en-US",
  formatDistance: Lu,
  formatLong: Wu,
  formatRelative: Hu,
  localize: Qu,
  match: mh,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function ph(n) {
  const e = $e(n);
  return $u(e, Mu(e)) + 1;
}
function _h(n) {
  const e = $e(n), t = +Ur(e) - +Iu(e);
  return Math.round(t / Ea) + 1;
}
function ka(n, e) {
  var u, h, f, m;
  const t = $e(n), r = t.getFullYear(), s = Zr(), i = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((h = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : h.firstWeekContainsDate) ?? s.firstWeekContainsDate ?? ((m = (f = s.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, a = at(n, 0);
  a.setFullYear(r + 1, 0, i), a.setHours(0, 0, 0, 0);
  const o = sr(a, e), c = at(n, 0);
  c.setFullYear(r, 0, i), c.setHours(0, 0, 0, 0);
  const l = sr(c, e);
  return t.getTime() >= o.getTime() ? r + 1 : t.getTime() >= l.getTime() ? r : r - 1;
}
function yh(n, e) {
  var o, c, l, u;
  const t = Zr(), r = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((c = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : c.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((u = (l = t.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, s = ka(n, e), i = at(n, 0);
  return i.setFullYear(s, 0, r), i.setHours(0, 0, 0, 0), sr(i, e);
}
function wh(n, e) {
  const t = $e(n), r = +sr(t, e) - +yh(t, e);
  return Math.round(r / Ea) + 1;
}
function q(n, e) {
  const t = n < 0 ? "-" : "", r = Math.abs(n).toString().padStart(e, "0");
  return t + r;
}
const Je = {
  // Year
  y(n, e) {
    const t = n.getFullYear(), r = t > 0 ? t : 1 - t;
    return q(e === "yy" ? r % 100 : r, e.length);
  },
  // Month
  M(n, e) {
    const t = n.getMonth();
    return e === "M" ? String(t + 1) : q(t + 1, 2);
  },
  // Day of the month
  d(n, e) {
    return q(n.getDate(), e.length);
  },
  // AM or PM
  a(n, e) {
    const t = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.toUpperCase();
      case "aaa":
        return t;
      case "aaaaa":
        return t[0];
      case "aaaa":
      default:
        return t === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(n, e) {
    return q(n.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(n, e) {
    return q(n.getHours(), e.length);
  },
  // Minute
  m(n, e) {
    return q(n.getMinutes(), e.length);
  },
  // Second
  s(n, e) {
    return q(n.getSeconds(), e.length);
  },
  // Fraction of second
  S(n, e) {
    const t = e.length, r = n.getMilliseconds(), s = Math.trunc(
      r * Math.pow(10, t - 3)
    );
    return q(s, e.length);
  }
}, vt = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, vi = {
  // Era
  G: function(n, e, t) {
    const r = n.getFullYear() > 0 ? 1 : 0;
    switch (e) {
      case "G":
      case "GG":
      case "GGG":
        return t.era(r, { width: "abbreviated" });
      case "GGGGG":
        return t.era(r, { width: "narrow" });
      case "GGGG":
      default:
        return t.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(n, e, t) {
    if (e === "yo") {
      const r = n.getFullYear(), s = r > 0 ? r : 1 - r;
      return t.ordinalNumber(s, { unit: "year" });
    }
    return Je.y(n, e);
  },
  // Local week-numbering year
  Y: function(n, e, t, r) {
    const s = ka(n, r), i = s > 0 ? s : 1 - s;
    if (e === "YY") {
      const a = i % 100;
      return q(a, 2);
    }
    return e === "Yo" ? t.ordinalNumber(i, { unit: "year" }) : q(i, e.length);
  },
  // ISO week-numbering year
  R: function(n, e) {
    const t = xa(n);
    return q(t, e.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(n, e) {
    const t = n.getFullYear();
    return q(t, e.length);
  },
  // Quarter
  Q: function(n, e, t) {
    const r = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(r);
      case "QQ":
        return q(r, 2);
      case "Qo":
        return t.ordinalNumber(r, { unit: "quarter" });
      case "QQQ":
        return t.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return t.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return t.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(n, e, t) {
    const r = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "q":
        return String(r);
      case "qq":
        return q(r, 2);
      case "qo":
        return t.ordinalNumber(r, { unit: "quarter" });
      case "qqq":
        return t.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return t.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return t.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(n, e, t) {
    const r = n.getMonth();
    switch (e) {
      case "M":
      case "MM":
        return Je.M(n, e);
      case "Mo":
        return t.ordinalNumber(r + 1, { unit: "month" });
      case "MMM":
        return t.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return t.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return t.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(n, e, t) {
    const r = n.getMonth();
    switch (e) {
      case "L":
        return String(r + 1);
      case "LL":
        return q(r + 1, 2);
      case "Lo":
        return t.ordinalNumber(r + 1, { unit: "month" });
      case "LLL":
        return t.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return t.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return t.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(n, e, t, r) {
    const s = wh(n, r);
    return e === "wo" ? t.ordinalNumber(s, { unit: "week" }) : q(s, e.length);
  },
  // ISO week of year
  I: function(n, e, t) {
    const r = _h(n);
    return e === "Io" ? t.ordinalNumber(r, { unit: "week" }) : q(r, e.length);
  },
  // Day of the month
  d: function(n, e, t) {
    return e === "do" ? t.ordinalNumber(n.getDate(), { unit: "date" }) : Je.d(n, e);
  },
  // Day of year
  D: function(n, e, t) {
    const r = ph(n);
    return e === "Do" ? t.ordinalNumber(r, { unit: "dayOfYear" }) : q(r, e.length);
  },
  // Day of week
  E: function(n, e, t) {
    const r = n.getDay();
    switch (e) {
      case "E":
      case "EE":
      case "EEE":
        return t.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return t.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return t.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return t.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(n, e, t, r) {
    const s = n.getDay(), i = (s - r.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "e":
        return String(i);
      case "ee":
        return q(i, 2);
      case "eo":
        return t.ordinalNumber(i, { unit: "day" });
      case "eee":
        return t.day(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return t.day(s, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return t.day(s, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return t.day(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(n, e, t, r) {
    const s = n.getDay(), i = (s - r.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "c":
        return String(i);
      case "cc":
        return q(i, e.length);
      case "co":
        return t.ordinalNumber(i, { unit: "day" });
      case "ccc":
        return t.day(s, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return t.day(s, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return t.day(s, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return t.day(s, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(n, e, t) {
    const r = n.getDay(), s = r === 0 ? 7 : r;
    switch (e) {
      case "i":
        return String(s);
      case "ii":
        return q(s, e.length);
      case "io":
        return t.ordinalNumber(s, { unit: "day" });
      case "iii":
        return t.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return t.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return t.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return t.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(n, e, t) {
    const s = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return t.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return t.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return t.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(n, e, t) {
    const r = n.getHours();
    let s;
    switch (r === 12 ? s = vt.noon : r === 0 ? s = vt.midnight : s = r / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return t.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return t.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return t.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return t.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(n, e, t) {
    const r = n.getHours();
    let s;
    switch (r >= 17 ? s = vt.evening : r >= 12 ? s = vt.afternoon : r >= 4 ? s = vt.morning : s = vt.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return t.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return t.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return t.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(n, e, t) {
    if (e === "ho") {
      let r = n.getHours() % 12;
      return r === 0 && (r = 12), t.ordinalNumber(r, { unit: "hour" });
    }
    return Je.h(n, e);
  },
  // Hour [0-23]
  H: function(n, e, t) {
    return e === "Ho" ? t.ordinalNumber(n.getHours(), { unit: "hour" }) : Je.H(n, e);
  },
  // Hour [0-11]
  K: function(n, e, t) {
    const r = n.getHours() % 12;
    return e === "Ko" ? t.ordinalNumber(r, { unit: "hour" }) : q(r, e.length);
  },
  // Hour [1-24]
  k: function(n, e, t) {
    let r = n.getHours();
    return r === 0 && (r = 24), e === "ko" ? t.ordinalNumber(r, { unit: "hour" }) : q(r, e.length);
  },
  // Minute
  m: function(n, e, t) {
    return e === "mo" ? t.ordinalNumber(n.getMinutes(), { unit: "minute" }) : Je.m(n, e);
  },
  // Second
  s: function(n, e, t) {
    return e === "so" ? t.ordinalNumber(n.getSeconds(), { unit: "second" }) : Je.s(n, e);
  },
  // Fraction of second
  S: function(n, e) {
    return Je.S(n, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, e, t) {
    const r = n.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (e) {
      case "X":
        return Si(r);
      case "XXXX":
      case "XX":
        return rt(r);
      case "XXXXX":
      case "XXX":
      default:
        return rt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(n, e, t) {
    const r = n.getTimezoneOffset();
    switch (e) {
      case "x":
        return Si(r);
      case "xxxx":
      case "xx":
        return rt(r);
      case "xxxxx":
      case "xxx":
      default:
        return rt(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(n, e, t) {
    const r = n.getTimezoneOffset();
    switch (e) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + bi(r, ":");
      case "OOOO":
      default:
        return "GMT" + rt(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(n, e, t) {
    const r = n.getTimezoneOffset();
    switch (e) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + bi(r, ":");
      case "zzzz":
      default:
        return "GMT" + rt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(n, e, t) {
    const r = Math.trunc(n.getTime() / 1e3);
    return q(r, e.length);
  },
  // Milliseconds timestamp
  T: function(n, e, t) {
    const r = n.getTime();
    return q(r, e.length);
  }
};
function bi(n, e = "") {
  const t = n > 0 ? "-" : "+", r = Math.abs(n), s = Math.trunc(r / 60), i = r % 60;
  return i === 0 ? t + String(s) : t + String(s) + e + q(i, 2);
}
function Si(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + q(Math.abs(n) / 60, 2) : rt(n, e);
}
function rt(n, e = "") {
  const t = n > 0 ? "-" : "+", r = Math.abs(n), s = q(Math.trunc(r / 60), 2), i = q(r % 60, 2);
  return t + s + e + i;
}
const Ei = (n, e) => {
  switch (n) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, Oa = (n, e) => {
  switch (n) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, vh = (n, e) => {
  const t = n.match(/(P+)(p+)?/) || [], r = t[1], s = t[2];
  if (!s)
    return Ei(n, e);
  let i;
  switch (r) {
    case "P":
      i = e.dateTime({ width: "short" });
      break;
    case "PP":
      i = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = e.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", Ei(r, e)).replace("{{time}}", Oa(s, e));
}, bh = {
  p: Oa,
  P: vh
}, Sh = /^D+$/, Eh = /^Y+$/, xh = ["D", "DD", "YY", "YYYY"];
function kh(n) {
  return Sh.test(n);
}
function Oh(n) {
  return Eh.test(n);
}
function Ph(n, e, t) {
  const r = Ch(n, e, t);
  if (console.warn(r), xh.includes(n)) throw new RangeError(r);
}
function Ch(n, e, t) {
  const r = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${r} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Ah = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Th = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Rh = /^'([^]*?)'?$/, $h = /''/g, Ih = /[a-zA-Z]/;
function kr(n, e, t) {
  var u, h, f, m;
  const r = Zr(), s = r.locale ?? gh, i = r.firstWeekContainsDate ?? ((h = (u = r.locale) == null ? void 0 : u.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, a = r.weekStartsOn ?? ((m = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : m.weekStartsOn) ?? 0, o = $e(n);
  if (!Du(o))
    throw new RangeError("Invalid time value");
  let c = e.match(Th).map((p) => {
    const g = p[0];
    if (g === "p" || g === "P") {
      const _ = bh[g];
      return _(p, s.formatLong);
    }
    return p;
  }).join("").match(Ah).map((p) => {
    if (p === "''")
      return { isToken: !1, value: "'" };
    const g = p[0];
    if (g === "'")
      return { isToken: !1, value: jh(p) };
    if (vi[g])
      return { isToken: !0, value: p };
    if (g.match(Ih))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + g + "`"
      );
    return { isToken: !1, value: p };
  });
  s.localize.preprocessor && (c = s.localize.preprocessor(o, c));
  const l = {
    firstWeekContainsDate: i,
    weekStartsOn: a,
    locale: s
  };
  return c.map((p) => {
    if (!p.isToken) return p.value;
    const g = p.value;
    (Oh(g) || kh(g)) && Ph(g, e, String(n));
    const _ = vi[g[0]];
    return _(o, g, s.localize, l);
  }).join("");
}
function jh(n) {
  const e = n.match(Rh);
  return e ? e[1].replace($h, "'") : n;
}
const Dh = { BASE_URL: "./", DEV: !1, MODE: "production", PROD: !0, SSR: !1, VITE_OPENAI_API_KEY: "", VITE_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvem9kZmp6eHpsd3praG1maHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNDM3MjMsImV4cCI6MjA0NzYxOTcyM30.ywmi4WD1fZN3hRu-krtGmY1-IYSJSODh1tKK4Ytt18Q", VITE_SUPABASE_URL: "https://zozodfjzxzlwzkhmfhwh.supabase.co" }, xi = (n) => {
  let e;
  const t = /* @__PURE__ */ new Set(), r = (u, h) => {
    const f = typeof u == "function" ? u(e) : u;
    if (!Object.is(f, e)) {
      const m = e;
      e = h ?? (typeof f != "object" || f === null) ? f : Object.assign({}, e, f), t.forEach((p) => p(e, m));
    }
  }, s = () => e, c = { setState: r, getState: s, getInitialState: () => l, subscribe: (u) => (t.add(u), () => t.delete(u)), destroy: () => {
    (Dh ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), t.clear();
  } }, l = e = n(r, s, c);
  return c;
}, Mh = (n) => n ? xi(n) : xi;
var Vn = { exports: {} }, Sn = {}, Or = { exports: {} }, En = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ki;
function Nh() {
  if (ki) return En;
  ki = 1;
  var n = ct;
  function e(h, f) {
    return h === f && (h !== 0 || 1 / h === 1 / f) || h !== h && f !== f;
  }
  var t = typeof Object.is == "function" ? Object.is : e, r = n.useState, s = n.useEffect, i = n.useLayoutEffect, a = n.useDebugValue;
  function o(h, f) {
    var m = f(), p = r({ inst: { value: m, getSnapshot: f } }), g = p[0].inst, _ = p[1];
    return i(function() {
      g.value = m, g.getSnapshot = f, c(g) && _({ inst: g });
    }, [h, m, f]), s(function() {
      return c(g) && _({ inst: g }), h(function() {
        c(g) && _({ inst: g });
      });
    }, [h]), a(m), m;
  }
  function c(h) {
    var f = h.getSnapshot;
    h = h.value;
    try {
      var m = f();
      return !t(h, m);
    } catch {
      return !0;
    }
  }
  function l(h, f) {
    return f();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : o;
  return En.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : u, En;
}
var xn = {}, Oi;
function Lh() {
  if (Oi) return xn;
  Oi = 1;
  var n = {};
  /**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return n.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = ct, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(v) {
      {
        for (var E = arguments.length, k = new Array(E > 1 ? E - 1 : 0), x = 1; x < E; x++)
          k[x - 1] = arguments[x];
        s("error", v, k);
      }
    }
    function s(v, E, k) {
      {
        var x = t.ReactDebugCurrentFrame, B = x.getStackAddendum();
        B !== "" && (E += "%s", k = k.concat([B]));
        var U = k.map(function($) {
          return String($);
        });
        U.unshift("Warning: " + E), Function.prototype.apply.call(console[v], console, U);
      }
    }
    function i(v, E) {
      return v === E && (v !== 0 || 1 / v === 1 / E) || v !== v && E !== E;
    }
    var a = typeof Object.is == "function" ? Object.is : i, o = e.useState, c = e.useEffect, l = e.useLayoutEffect, u = e.useDebugValue, h = !1, f = !1;
    function m(v, E, k) {
      h || e.startTransition !== void 0 && (h = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var x = E();
      if (!f) {
        var B = E();
        a(x, B) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), f = !0);
      }
      var U = o({
        inst: {
          value: x,
          getSnapshot: E
        }
      }), $ = U[0].inst, j = U[1];
      return l(function() {
        $.value = x, $.getSnapshot = E, p($) && j({
          inst: $
        });
      }, [v, x, E]), c(function() {
        p($) && j({
          inst: $
        });
        var de = function() {
          p($) && j({
            inst: $
          });
        };
        return v(de);
      }, [v]), u(x), x;
    }
    function p(v) {
      var E = v.getSnapshot, k = v.value;
      try {
        var x = E();
        return !a(k, x);
      } catch {
        return !0;
      }
    }
    function g(v, E, k) {
      return E();
    }
    var _ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", T = !_, w = T ? g : m, S = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : w;
    xn.useSyncExternalStore = S, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }(), xn;
}
var Pi;
function Pa() {
  if (Pi) return Or.exports;
  Pi = 1;
  var n = {};
  return n.NODE_ENV === "production" ? Or.exports = Nh() : Or.exports = Lh(), Or.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ci;
function Fh() {
  if (Ci) return Sn;
  Ci = 1;
  var n = ct, e = Pa();
  function t(l, u) {
    return l === u && (l !== 0 || 1 / l === 1 / u) || l !== l && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : t, s = e.useSyncExternalStore, i = n.useRef, a = n.useEffect, o = n.useMemo, c = n.useDebugValue;
  return Sn.useSyncExternalStoreWithSelector = function(l, u, h, f, m) {
    var p = i(null);
    if (p.current === null) {
      var g = { hasValue: !1, value: null };
      p.current = g;
    } else g = p.current;
    p = o(function() {
      function T(k) {
        if (!w) {
          if (w = !0, S = k, k = f(k), m !== void 0 && g.hasValue) {
            var x = g.value;
            if (m(x, k)) return v = x;
          }
          return v = k;
        }
        if (x = v, r(S, k)) return x;
        var B = f(k);
        return m !== void 0 && m(x, B) ? x : (S = k, v = B);
      }
      var w = !1, S, v, E = h === void 0 ? null : h;
      return [function() {
        return T(u());
      }, E === null ? void 0 : function() {
        return T(E());
      }];
    }, [u, h, f, m]);
    var _ = s(l, p[0], p[1]);
    return a(function() {
      g.hasValue = !0, g.value = _;
    }, [_]), c(_), _;
  }, Sn;
}
var kn = {}, Ai;
function Uh() {
  if (Ai) return kn;
  Ai = 1;
  var n = {};
  /**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return n.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = ct, t = Pa();
    function r(h, f) {
      return h === f && (h !== 0 || 1 / h === 1 / f) || h !== h && f !== f;
    }
    var s = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, a = e.useRef, o = e.useEffect, c = e.useMemo, l = e.useDebugValue;
    function u(h, f, m, p, g) {
      var _ = a(null), T;
      _.current === null ? (T = {
        hasValue: !1,
        value: null
      }, _.current = T) : T = _.current;
      var w = c(function() {
        var k = !1, x, B, U = function(le) {
          if (!k) {
            k = !0, x = le;
            var te = p(le);
            if (g !== void 0 && T.hasValue) {
              var ae = T.value;
              if (g(ae, te))
                return B = ae, ae;
            }
            return B = te, te;
          }
          var Le = x, He = B;
          if (s(Le, le))
            return He;
          var oe = p(le);
          return g !== void 0 && g(He, oe) ? He : (x = le, B = oe, oe);
        }, $ = m === void 0 ? null : m, j = function() {
          return U(f());
        }, de = $ === null ? void 0 : function() {
          return U($());
        };
        return [j, de];
      }, [f, m, p, g]), S = w[0], v = w[1], E = i(h, S, v);
      return o(function() {
        T.hasValue = !0, T.value = E;
      }, [E]), l(E), E;
    }
    kn.useSyncExternalStoreWithSelector = u, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }(), kn;
}
var Bh = {};
Bh.NODE_ENV === "production" ? Vn.exports = Fh() : Vn.exports = Uh();
var Wh = Vn.exports;
const qh = /* @__PURE__ */ fc(Wh), Ca = { BASE_URL: "./", DEV: !1, MODE: "production", PROD: !0, SSR: !1, VITE_OPENAI_API_KEY: "", VITE_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvem9kZmp6eHpsd3praG1maHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNDM3MjMsImV4cCI6MjA0NzYxOTcyM30.ywmi4WD1fZN3hRu-krtGmY1-IYSJSODh1tKK4Ytt18Q", VITE_SUPABASE_URL: "https://zozodfjzxzlwzkhmfhwh.supabase.co" }, { useDebugValue: Hh } = ct, { useSyncExternalStoreWithSelector: Jh } = qh;
let Ti = !1;
const Vh = (n) => n;
function zh(n, e = Vh, t) {
  (Ca ? "production" : void 0) !== "production" && t && !Ti && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), Ti = !0);
  const r = Jh(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    e,
    t
  );
  return Hh(r), r;
}
const Ri = (n) => {
  (Ca ? "production" : void 0) !== "production" && typeof n != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const e = typeof n == "function" ? Mh(n) : n, t = (r, s) => zh(e, r, s);
  return Object.assign(t, e), t;
}, Yh = (n) => n ? Ri(n) : Ri;
let Gh = { data: "" }, Kh = (n) => typeof window == "object" ? ((n ? n.querySelector("#_goober") : window._goober) || Object.assign((n || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : n || Gh, Xh = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, Qh = /\/\*[^]*?\*\/|  +/g, $i = /\n+/g, Xe = (n, e) => {
  let t = "", r = "", s = "";
  for (let i in n) {
    let a = n[i];
    i[0] == "@" ? i[1] == "i" ? t = i + " " + a + ";" : r += i[1] == "f" ? Xe(a, i) : i + "{" + Xe(a, i[1] == "k" ? "" : e) + "}" : typeof a == "object" ? r += Xe(a, e ? e.replace(/([^,])+/g, (o) => i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (c) => /&/.test(c) ? c.replace(/&/g, o) : o ? o + " " + c : c)) : i) : a != null && (i = /^--/.test(i) ? i : i.replace(/[A-Z]/g, "-$&").toLowerCase(), s += Xe.p ? Xe.p(i, a) : i + ":" + a + ";");
  }
  return t + (e && s ? e + "{" + s + "}" : s) + r;
}, Ue = {}, Aa = (n) => {
  if (typeof n == "object") {
    let e = "";
    for (let t in n) e += t + Aa(n[t]);
    return e;
  }
  return n;
}, Zh = (n, e, t, r, s) => {
  let i = Aa(n), a = Ue[i] || (Ue[i] = ((c) => {
    let l = 0, u = 11;
    for (; l < c.length; ) u = 101 * u + c.charCodeAt(l++) >>> 0;
    return "go" + u;
  })(i));
  if (!Ue[a]) {
    let c = i !== n ? n : ((l) => {
      let u, h, f = [{}];
      for (; u = Xh.exec(l.replace(Qh, "")); ) u[4] ? f.shift() : u[3] ? (h = u[3].replace($i, " ").trim(), f.unshift(f[0][h] = f[0][h] || {})) : f[0][u[1]] = u[2].replace($i, " ").trim();
      return f[0];
    })(n);
    Ue[a] = Xe(s ? { ["@keyframes " + a]: c } : c, t ? "" : "." + a);
  }
  let o = t && Ue.g ? Ue.g : null;
  return t && (Ue.g = Ue[a]), ((c, l, u, h) => {
    h ? l.data = l.data.replace(h, c) : l.data.indexOf(c) === -1 && (l.data = u ? c + l.data : l.data + c);
  })(Ue[a], e, r, o), a;
}, ed = (n, e, t) => n.reduce((r, s, i) => {
  let a = e[i];
  if (a && a.call) {
    let o = a(t), c = o && o.props && o.props.className || /^go/.test(o) && o;
    a = c ? "." + c : o && typeof o == "object" ? o.props ? "" : Xe(o, "") : o === !1 ? "" : o;
  }
  return r + s + (a ?? "");
}, "");
function en(n) {
  let e = this || {}, t = n.call ? n(e.p) : n;
  return Zh(t.unshift ? t.raw ? ed(t, [].slice.call(arguments, 1), e.p) : t.reduce((r, s) => Object.assign(r, s && s.call ? s(e.p) : s), {}) : t, Kh(e.target), e.g, e.o, e.k);
}
let Ta, zn, Yn;
en.bind({ g: 1 });
let qe = en.bind({ k: 1 });
function td(n, e, t, r) {
  Xe.p = e, Ta = n, zn = t, Yn = r;
}
function Qe(n, e) {
  let t = this || {};
  return function() {
    let r = arguments;
    function s(i, a) {
      let o = Object.assign({}, i), c = o.className || s.className;
      t.p = Object.assign({ theme: zn && zn() }, o), t.o = / *go\d+/.test(c), o.className = en.apply(t, r) + (c ? " " + c : "");
      let l = n;
      return n[0] && (l = o.as || n, delete o.as), Yn && l[0] && Yn(o), Ta(l, o);
    }
    return s;
  };
}
var rd = (n) => typeof n == "function", Gn = (n, e) => rd(n) ? n(e) : n, nd = /* @__PURE__ */ (() => {
  let n = 0;
  return () => (++n).toString();
})(), sd = /* @__PURE__ */ (() => {
  let n;
  return () => {
    if (n === void 0 && typeof window < "u") {
      let e = matchMedia("(prefers-reduced-motion: reduce)");
      n = !e || e.matches;
    }
    return n;
  };
})(), id = 20, $r = /* @__PURE__ */ new Map(), ad = 1e3, Ii = (n) => {
  if ($r.has(n)) return;
  let e = setTimeout(() => {
    $r.delete(n), tn({ type: 4, toastId: n });
  }, ad);
  $r.set(n, e);
}, od = (n) => {
  let e = $r.get(n);
  e && clearTimeout(e);
}, Kn = (n, e) => {
  switch (e.type) {
    case 0:
      return { ...n, toasts: [e.toast, ...n.toasts].slice(0, id) };
    case 1:
      return e.toast.id && od(e.toast.id), { ...n, toasts: n.toasts.map((i) => i.id === e.toast.id ? { ...i, ...e.toast } : i) };
    case 2:
      let { toast: t } = e;
      return n.toasts.find((i) => i.id === t.id) ? Kn(n, { type: 1, toast: t }) : Kn(n, { type: 0, toast: t });
    case 3:
      let { toastId: r } = e;
      return r ? Ii(r) : n.toasts.forEach((i) => {
        Ii(i.id);
      }), { ...n, toasts: n.toasts.map((i) => i.id === r || r === void 0 ? { ...i, visible: !1 } : i) };
    case 4:
      return e.toastId === void 0 ? { ...n, toasts: [] } : { ...n, toasts: n.toasts.filter((i) => i.id !== e.toastId) };
    case 5:
      return { ...n, pausedAt: e.time };
    case 6:
      let s = e.time - (n.pausedAt || 0);
      return { ...n, pausedAt: void 0, toasts: n.toasts.map((i) => ({ ...i, pauseDuration: i.pauseDuration + s })) };
  }
}, cd = [], On = { toasts: [], pausedAt: void 0 }, tn = (n) => {
  On = Kn(On, n), cd.forEach((e) => {
    e(On);
  });
}, ld = (n, e = "blank", t) => ({ createdAt: Date.now(), visible: !0, type: e, ariaProps: { role: "status", "aria-live": "polite" }, message: n, pauseDuration: 0, ...t, id: (t == null ? void 0 : t.id) || nd() }), lr = (n) => (e, t) => {
  let r = ld(e, n, t);
  return tn({ type: 2, toast: r }), r.id;
}, xe = (n, e) => lr("blank")(n, e);
xe.error = lr("error");
xe.success = lr("success");
xe.loading = lr("loading");
xe.custom = lr("custom");
xe.dismiss = (n) => {
  tn({ type: 3, toastId: n });
};
xe.remove = (n) => tn({ type: 4, toastId: n });
xe.promise = (n, e, t) => {
  let r = xe.loading(e.loading, { ...t, ...t == null ? void 0 : t.loading });
  return n.then((s) => (xe.success(Gn(e.success, s), { id: r, ...t, ...t == null ? void 0 : t.success }), s)).catch((s) => {
    xe.error(Gn(e.error, s), { id: r, ...t, ...t == null ? void 0 : t.error });
  }), n;
};
var ud = qe`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, hd = qe`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, dd = qe`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, fd = Qe("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(n) => n.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ud} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${hd} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(n) => n.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${dd} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`, md = qe`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, gd = Qe("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(n) => n.secondary || "#e0e0e0"};
  border-right-color: ${(n) => n.primary || "#616161"};
  animation: ${md} 1s linear infinite;
`, pd = qe`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, _d = qe`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, yd = Qe("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(n) => n.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pd} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_d} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(n) => n.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`, wd = Qe("div")`
  position: absolute;
`, vd = Qe("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, bd = qe`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, Sd = Qe("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${bd} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, Ed = ({ toast: n }) => {
  let { icon: e, type: t, iconTheme: r } = n;
  return e !== void 0 ? typeof e == "string" ? be.createElement(Sd, null, e) : e : t === "blank" ? null : be.createElement(vd, null, be.createElement(gd, { ...r }), t !== "loading" && be.createElement(wd, null, t === "error" ? be.createElement(fd, { ...r }) : be.createElement(yd, { ...r })));
}, xd = (n) => `
0% {transform: translate3d(0,${n * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, kd = (n) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${n * -150}%,-1px) scale(.6); opacity:0;}
`, Od = "0%{opacity:0;} 100%{opacity:1;}", Pd = "0%{opacity:1;} 100%{opacity:0;}", Cd = Qe("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Ad = Qe("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, Td = (n, e) => {
  let t = n.includes("top") ? 1 : -1, [r, s] = sd() ? [Od, Pd] : [xd(t), kd(t)];
  return { animation: e ? `${qe(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${qe(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)` };
};
be.memo(({ toast: n, position: e, style: t, children: r }) => {
  let s = n.height ? Td(n.position || e || "top-center", n.visible) : { opacity: 0 }, i = be.createElement(Ed, { toast: n }), a = be.createElement(Ad, { ...n.ariaProps }, Gn(n.message, n));
  return be.createElement(Cd, { className: n.className, style: { ...s, ...t, ...n.style } }, typeof r == "function" ? r({ icon: i, message: a }) : be.createElement(be.Fragment, null, i, a));
});
td(be.createElement);
en`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;
const Xn = "RFC3986", Qn = {
  RFC1738: (n) => String(n).replace(/%20/g, "+"),
  RFC3986: (n) => String(n)
}, Rd = "RFC1738", $d = Array.isArray, je = (() => {
  const n = [];
  for (let e = 0; e < 256; ++e)
    n.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return n;
})(), Pn = 1024, Id = (n, e, t, r, s) => {
  if (n.length === 0)
    return n;
  let i = n;
  if (typeof n == "symbol" ? i = Symbol.prototype.toString.call(n) : typeof n != "string" && (i = String(n)), t === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(o) {
      return "%26%23" + parseInt(o.slice(2), 16) + "%3B";
    });
  let a = "";
  for (let o = 0; o < i.length; o += Pn) {
    const c = i.length >= Pn ? i.slice(o, o + Pn) : i, l = [];
    for (let u = 0; u < c.length; ++u) {
      let h = c.charCodeAt(u);
      if (h === 45 || // -
      h === 46 || // .
      h === 95 || // _
      h === 126 || // ~
      h >= 48 && h <= 57 || // 0-9
      h >= 65 && h <= 90 || // a-z
      h >= 97 && h <= 122 || // A-Z
      s === Rd && (h === 40 || h === 41)) {
        l[l.length] = c.charAt(u);
        continue;
      }
      if (h < 128) {
        l[l.length] = je[h];
        continue;
      }
      if (h < 2048) {
        l[l.length] = je[192 | h >> 6] + je[128 | h & 63];
        continue;
      }
      if (h < 55296 || h >= 57344) {
        l[l.length] = je[224 | h >> 12] + je[128 | h >> 6 & 63] + je[128 | h & 63];
        continue;
      }
      u += 1, h = 65536 + ((h & 1023) << 10 | c.charCodeAt(u) & 1023), l[l.length] = je[240 | h >> 18] + je[128 | h >> 12 & 63] + je[128 | h >> 6 & 63] + je[128 | h & 63];
    }
    a += l.join("");
  }
  return a;
};
function jd(n) {
  return !n || typeof n != "object" ? !1 : !!(n.constructor && n.constructor.isBuffer && n.constructor.isBuffer(n));
}
function ji(n, e) {
  if ($d(n)) {
    const t = [];
    for (let r = 0; r < n.length; r += 1)
      t.push(e(n[r]));
    return t;
  }
  return e(n);
}
const Dd = Object.prototype.hasOwnProperty, Ra = {
  brackets(n) {
    return String(n) + "[]";
  },
  comma: "comma",
  indices(n, e) {
    return String(n) + "[" + e + "]";
  },
  repeat(n) {
    return String(n);
  }
}, De = Array.isArray, Md = Array.prototype.push, $a = function(n, e) {
  Md.apply(n, De(e) ? e : [e]);
}, Nd = Date.prototype.toISOString, ee = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Id,
  encodeValuesOnly: !1,
  format: Xn,
  formatter: Qn[Xn],
  /** @deprecated */
  indices: !1,
  serializeDate(n) {
    return Nd.call(n);
  },
  skipNulls: !1,
  strictNullHandling: !1
};
function Ld(n) {
  return typeof n == "string" || typeof n == "number" || typeof n == "boolean" || typeof n == "symbol" || typeof n == "bigint";
}
const Cn = {};
function Ia(n, e, t, r, s, i, a, o, c, l, u, h, f, m, p, g, _, T) {
  let w = n, S = T, v = 0, E = !1;
  for (; (S = S.get(Cn)) !== void 0 && !E; ) {
    const $ = S.get(n);
    if (v += 1, typeof $ < "u") {
      if ($ === v)
        throw new RangeError("Cyclic object value");
      E = !0;
    }
    typeof S.get(Cn) > "u" && (v = 0);
  }
  if (typeof l == "function" ? w = l(e, w) : w instanceof Date ? w = f == null ? void 0 : f(w) : t === "comma" && De(w) && (w = ji(w, function($) {
    return $ instanceof Date ? f == null ? void 0 : f($) : $;
  })), w === null) {
    if (i)
      return c && !g ? (
        // @ts-expect-error
        c(e, ee.encoder, _, "key", m)
      ) : e;
    w = "";
  }
  if (Ld(w) || jd(w)) {
    if (c) {
      const $ = g ? e : c(e, ee.encoder, _, "key", m);
      return [
        (p == null ? void 0 : p($)) + "=" + // @ts-expect-error
        (p == null ? void 0 : p(c(w, ee.encoder, _, "value", m)))
      ];
    }
    return [(p == null ? void 0 : p(e)) + "=" + (p == null ? void 0 : p(String(w)))];
  }
  const k = [];
  if (typeof w > "u")
    return k;
  let x;
  if (t === "comma" && De(w))
    g && c && (w = ji(w, c)), x = [{ value: w.length > 0 ? w.join(",") || null : void 0 }];
  else if (De(l))
    x = l;
  else {
    const $ = Object.keys(w);
    x = u ? $.sort(u) : $;
  }
  const B = o ? String(e).replace(/\./g, "%2E") : String(e), U = r && De(w) && w.length === 1 ? B + "[]" : B;
  if (s && De(w) && w.length === 0)
    return U + "[]";
  for (let $ = 0; $ < x.length; ++$) {
    const j = x[$], de = (
      // @ts-ignore
      typeof j == "object" && typeof j.value < "u" ? j.value : w[j]
    );
    if (a && de === null)
      continue;
    const le = h && o ? j.replace(/\./g, "%2E") : j, te = De(w) ? typeof t == "function" ? t(U, le) : U : U + (h ? "." + le : "[" + le + "]");
    T.set(n, v);
    const ae = /* @__PURE__ */ new WeakMap();
    ae.set(Cn, T), $a(k, Ia(
      de,
      te,
      t,
      r,
      s,
      i,
      a,
      o,
      // @ts-ignore
      t === "comma" && g && De(w) ? null : c,
      l,
      u,
      h,
      f,
      m,
      p,
      g,
      _,
      ae
    ));
  }
  return k;
}
function Fd(n = ee) {
  if (typeof n.allowEmptyArrays < "u" && typeof n.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof n.encodeDotInKeys < "u" && typeof n.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (n.encoder !== null && typeof n.encoder < "u" && typeof n.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  const e = n.charset || ee.charset;
  if (typeof n.charset < "u" && n.charset !== "utf-8" && n.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let t = Xn;
  if (typeof n.format < "u") {
    if (!Dd.call(Qn, n.format))
      throw new TypeError("Unknown format option provided.");
    t = n.format;
  }
  const r = Qn[t];
  let s = ee.filter;
  (typeof n.filter == "function" || De(n.filter)) && (s = n.filter);
  let i;
  if (n.arrayFormat && n.arrayFormat in Ra ? i = n.arrayFormat : "indices" in n ? i = n.indices ? "indices" : "repeat" : i = ee.arrayFormat, "commaRoundTrip" in n && typeof n.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  const a = typeof n.allowDots > "u" ? n.encodeDotInKeys ? !0 : ee.allowDots : !!n.allowDots;
  return {
    addQueryPrefix: typeof n.addQueryPrefix == "boolean" ? n.addQueryPrefix : ee.addQueryPrefix,
    // @ts-ignore
    allowDots: a,
    allowEmptyArrays: typeof n.allowEmptyArrays == "boolean" ? !!n.allowEmptyArrays : ee.allowEmptyArrays,
    arrayFormat: i,
    charset: e,
    charsetSentinel: typeof n.charsetSentinel == "boolean" ? n.charsetSentinel : ee.charsetSentinel,
    commaRoundTrip: !!n.commaRoundTrip,
    delimiter: typeof n.delimiter > "u" ? ee.delimiter : n.delimiter,
    encode: typeof n.encode == "boolean" ? n.encode : ee.encode,
    encodeDotInKeys: typeof n.encodeDotInKeys == "boolean" ? n.encodeDotInKeys : ee.encodeDotInKeys,
    encoder: typeof n.encoder == "function" ? n.encoder : ee.encoder,
    encodeValuesOnly: typeof n.encodeValuesOnly == "boolean" ? n.encodeValuesOnly : ee.encodeValuesOnly,
    filter: s,
    format: t,
    formatter: r,
    serializeDate: typeof n.serializeDate == "function" ? n.serializeDate : ee.serializeDate,
    skipNulls: typeof n.skipNulls == "boolean" ? n.skipNulls : ee.skipNulls,
    // @ts-ignore
    sort: typeof n.sort == "function" ? n.sort : null,
    strictNullHandling: typeof n.strictNullHandling == "boolean" ? n.strictNullHandling : ee.strictNullHandling
  };
}
function Ud(n, e = {}) {
  let t = n;
  const r = Fd(e);
  let s, i;
  typeof r.filter == "function" ? (i = r.filter, t = i("", t)) : De(r.filter) && (i = r.filter, s = i);
  const a = [];
  if (typeof t != "object" || t === null)
    return "";
  const o = Ra[r.arrayFormat], c = o === "comma" && r.commaRoundTrip;
  s || (s = Object.keys(t)), r.sort && s.sort(r.sort);
  const l = /* @__PURE__ */ new WeakMap();
  for (let f = 0; f < s.length; ++f) {
    const m = s[f];
    r.skipNulls && t[m] === null || $a(a, Ia(
      t[m],
      m,
      // @ts-expect-error
      o,
      c,
      r.allowEmptyArrays,
      r.strictNullHandling,
      r.skipNulls,
      r.encodeDotInKeys,
      r.encode ? r.encoder : null,
      r.filter,
      r.sort,
      r.allowDots,
      r.serializeDate,
      r.format,
      r.formatter,
      r.encodeValuesOnly,
      r.charset,
      l
    ));
  }
  const u = a.join(r.delimiter);
  let h = r.addQueryPrefix === !0 ? "?" : "";
  return r.charsetSentinel && (r.charset === "iso-8859-1" ? h += "utf8=%26%2310003%3B&" : h += "utf8=%E2%9C%93&"), u.length > 0 ? h + u : "";
}
const Et = "4.76.3";
let Di = !1, tr, ja, Da, Zn, Ma, Na, La, Fa, Ua;
function Bd(n, e = { auto: !1 }) {
  if (Di)
    throw new Error(`you must \`import 'openai/shims/${n.kind}'\` before importing anything else from openai`);
  if (tr)
    throw new Error(`can't \`import 'openai/shims/${n.kind}'\` after \`import 'openai/shims/${tr}'\``);
  Di = e.auto, tr = n.kind, ja = n.fetch, Da = n.FormData, Zn = n.File, Ma = n.ReadableStream, Na = n.getMultipartRequestOptions, La = n.getDefaultAgent, Fa = n.fileFromPath, Ua = n.isFsReadStream;
}
class Wd {
  constructor(e) {
    this.body = e;
  }
  get [Symbol.toStringTag]() {
    return "MultipartBody";
  }
}
function qd({ manuallyImported: n } = {}) {
  const e = n ? "You may need to use polyfills" : "Add one of these imports before your first `import … from 'openai'`:\n- `import 'openai/shims/node'` (if you're running on Node)\n- `import 'openai/shims/web'` (otherwise)\n";
  let t, r, s, i;
  try {
    t = fetch, r = Request, s = Response, i = Headers;
  } catch (a) {
    throw new Error(`this environment is missing the following Web Fetch API type: ${a.message}. ${e}`);
  }
  return {
    kind: "web",
    fetch: t,
    Request: r,
    Response: s,
    Headers: i,
    FormData: (
      // @ts-ignore
      typeof FormData < "u" ? FormData : class {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${e}`);
        }
      }
    ),
    Blob: typeof Blob < "u" ? Blob : class {
      constructor() {
        throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${e}`);
      }
    },
    File: (
      // @ts-ignore
      typeof File < "u" ? File : class {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${e}`);
        }
      }
    ),
    ReadableStream: (
      // @ts-ignore
      typeof ReadableStream < "u" ? ReadableStream : class {
        // @ts-ignore
        constructor() {
          throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${e}`);
        }
      }
    ),
    getMultipartRequestOptions: async (a, o) => ({
      ...o,
      body: new Wd(a)
    }),
    getDefaultAgent: (a) => {
    },
    fileFromPath: () => {
      throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads");
    },
    isFsReadStream: (a) => !1
  };
}
tr || Bd(qd(), { auto: !0 });
class M extends Error {
}
class ie extends M {
  constructor(e, t, r, s) {
    super(`${ie.makeMessage(e, t, r)}`), this.status = e, this.headers = s, this.request_id = s == null ? void 0 : s["x-request-id"], this.error = t;
    const i = t;
    this.code = i == null ? void 0 : i.code, this.param = i == null ? void 0 : i.param, this.type = i == null ? void 0 : i.type;
  }
  static makeMessage(e, t, r) {
    const s = t != null && t.message ? typeof t.message == "string" ? t.message : JSON.stringify(t.message) : t ? JSON.stringify(t) : r;
    return e && s ? `${e} ${s}` : e ? `${e} status code (no body)` : s || "(no status code or body)";
  }
  static generate(e, t, r, s) {
    if (!e || !s)
      return new rn({ message: r, cause: ts(t) });
    const i = t == null ? void 0 : t.error;
    return e === 400 ? new Ba(e, i, r, s) : e === 401 ? new Wa(e, i, r, s) : e === 403 ? new qa(e, i, r, s) : e === 404 ? new Ha(e, i, r, s) : e === 409 ? new Ja(e, i, r, s) : e === 422 ? new Va(e, i, r, s) : e === 429 ? new za(e, i, r, s) : e >= 500 ? new Ya(e, i, r, s) : new ie(e, i, r, s);
  }
}
class Te extends ie {
  constructor({ message: e } = {}) {
    super(void 0, void 0, e || "Request was aborted.", void 0);
  }
}
class rn extends ie {
  constructor({ message: e, cause: t }) {
    super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
  }
}
class gs extends rn {
  constructor({ message: e } = {}) {
    super({ message: e ?? "Request timed out." });
  }
}
class Ba extends ie {
}
class Wa extends ie {
}
class qa extends ie {
}
class Ha extends ie {
}
class Ja extends ie {
}
class Va extends ie {
}
class za extends ie {
}
class Ya extends ie {
}
class Ga extends M {
  constructor() {
    super("Could not parse response content as the length limit was reached");
  }
}
class Ka extends M {
  constructor() {
    super("Could not parse response content as the request was rejected by the content filter");
  }
}
class ot {
  constructor() {
    this.buffer = [], this.trailingCR = !1;
  }
  decode(e) {
    let t = this.decodeText(e);
    if (this.trailingCR && (t = "\r" + t, this.trailingCR = !1), t.endsWith("\r") && (this.trailingCR = !0, t = t.slice(0, -1)), !t)
      return [];
    const r = ot.NEWLINE_CHARS.has(t[t.length - 1] || "");
    let s = t.split(ot.NEWLINE_REGEXP);
    return r && s.pop(), s.length === 1 && !r ? (this.buffer.push(s[0]), []) : (this.buffer.length > 0 && (s = [this.buffer.join("") + s[0], ...s.slice(1)], this.buffer = []), r || (this.buffer = [s.pop() || ""]), s);
  }
  decodeText(e) {
    if (e == null)
      return "";
    if (typeof e == "string")
      return e;
    if (typeof Buffer < "u") {
      if (e instanceof Buffer)
        return e.toString();
      if (e instanceof Uint8Array)
        return Buffer.from(e).toString();
      throw new M(`Unexpected: received non-Uint8Array (${e.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
    }
    if (typeof TextDecoder < "u") {
      if (e instanceof Uint8Array || e instanceof ArrayBuffer)
        return this.textDecoder ?? (this.textDecoder = new TextDecoder("utf8")), this.textDecoder.decode(e);
      throw new M(`Unexpected: received non-Uint8Array/ArrayBuffer (${e.constructor.name}) in a web platform. Please report this error.`);
    }
    throw new M("Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.");
  }
  flush() {
    if (!this.buffer.length && !this.trailingCR)
      return [];
    const e = [this.buffer.join("")];
    return this.buffer = [], this.trailingCR = !1, e;
  }
}
ot.NEWLINE_CHARS = /* @__PURE__ */ new Set([`
`, "\r"]);
ot.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
class Ne {
  constructor(e, t) {
    this.iterator = e, this.controller = t;
  }
  static fromSSEResponse(e, t) {
    let r = !1;
    async function* s() {
      if (r)
        throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      r = !0;
      let i = !1;
      try {
        for await (const a of Hd(e, t))
          if (!i) {
            if (a.data.startsWith("[DONE]")) {
              i = !0;
              continue;
            }
            if (a.event === null) {
              let o;
              try {
                o = JSON.parse(a.data);
              } catch (c) {
                throw console.error("Could not parse message into JSON:", a.data), console.error("From chunk:", a.raw), c;
              }
              if (o && o.error)
                throw new ie(void 0, o.error, void 0, void 0);
              yield o;
            } else {
              let o;
              try {
                o = JSON.parse(a.data);
              } catch (c) {
                throw console.error("Could not parse message into JSON:", a.data), console.error("From chunk:", a.raw), c;
              }
              if (a.event == "error")
                throw new ie(void 0, o.error, o.message, void 0);
              yield { event: a.event, data: o };
            }
          }
        i = !0;
      } catch (a) {
        if (a instanceof Error && a.name === "AbortError")
          return;
        throw a;
      } finally {
        i || t.abort();
      }
    }
    return new Ne(s, t);
  }
  /**
   * Generates a Stream from a newline-separated ReadableStream
   * where each item is a JSON value.
   */
  static fromReadableStream(e, t) {
    let r = !1;
    async function* s() {
      const a = new ot(), o = Xa(e);
      for await (const c of o)
        for (const l of a.decode(c))
          yield l;
      for (const c of a.flush())
        yield c;
    }
    async function* i() {
      if (r)
        throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      r = !0;
      let a = !1;
      try {
        for await (const o of s())
          a || o && (yield JSON.parse(o));
        a = !0;
      } catch (o) {
        if (o instanceof Error && o.name === "AbortError")
          return;
        throw o;
      } finally {
        a || t.abort();
      }
    }
    return new Ne(i, t);
  }
  [Symbol.asyncIterator]() {
    return this.iterator();
  }
  /**
   * Splits the stream into two streams which can be
   * independently read from at different speeds.
   */
  tee() {
    const e = [], t = [], r = this.iterator(), s = (i) => ({
      next: () => {
        if (i.length === 0) {
          const a = r.next();
          e.push(a), t.push(a);
        }
        return i.shift();
      }
    });
    return [
      new Ne(() => s(e), this.controller),
      new Ne(() => s(t), this.controller)
    ];
  }
  /**
   * Converts this stream to a newline-separated ReadableStream of
   * JSON stringified values in the stream
   * which can be turned back into a Stream with `Stream.fromReadableStream()`.
   */
  toReadableStream() {
    const e = this;
    let t;
    const r = new TextEncoder();
    return new Ma({
      async start() {
        t = e[Symbol.asyncIterator]();
      },
      async pull(s) {
        try {
          const { value: i, done: a } = await t.next();
          if (a)
            return s.close();
          const o = r.encode(JSON.stringify(i) + `
`);
          s.enqueue(o);
        } catch (i) {
          s.error(i);
        }
      },
      async cancel() {
        var s;
        await ((s = t.return) == null ? void 0 : s.call(t));
      }
    });
  }
}
async function* Hd(n, e) {
  if (!n.body)
    throw e.abort(), new M("Attempted to iterate over a response with no body");
  const t = new zd(), r = new ot(), s = Xa(n.body);
  for await (const i of Jd(s))
    for (const a of r.decode(i)) {
      const o = t.decode(a);
      o && (yield o);
    }
  for (const i of r.flush()) {
    const a = t.decode(i);
    a && (yield a);
  }
}
async function* Jd(n) {
  let e = new Uint8Array();
  for await (const t of n) {
    if (t == null)
      continue;
    const r = t instanceof ArrayBuffer ? new Uint8Array(t) : typeof t == "string" ? new TextEncoder().encode(t) : t;
    let s = new Uint8Array(e.length + r.length);
    s.set(e), s.set(r, e.length), e = s;
    let i;
    for (; (i = Vd(e)) !== -1; )
      yield e.slice(0, i), e = e.slice(i);
  }
  e.length > 0 && (yield e);
}
function Vd(n) {
  for (let r = 0; r < n.length - 2; r++) {
    if (n[r] === 10 && n[r + 1] === 10 || n[r] === 13 && n[r + 1] === 13)
      return r + 2;
    if (n[r] === 13 && n[r + 1] === 10 && r + 3 < n.length && n[r + 2] === 13 && n[r + 3] === 10)
      return r + 4;
  }
  return -1;
}
class zd {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length)
        return null;
      const i = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], i;
    }
    if (this.chunks.push(e), e.startsWith(":"))
      return null;
    let [t, r, s] = Yd(e, ":");
    return s.startsWith(" ") && (s = s.substring(1)), t === "event" ? this.event = s : t === "data" && this.data.push(s), null;
  }
}
function Yd(n, e) {
  const t = n.indexOf(e);
  return t !== -1 ? [n.substring(0, t), e, n.substring(t + e.length)] : [n, "", ""];
}
function Xa(n) {
  if (n[Symbol.asyncIterator])
    return n;
  const e = n.getReader();
  return {
    async next() {
      try {
        const t = await e.read();
        return t != null && t.done && e.releaseLock(), t;
      } catch (t) {
        throw e.releaseLock(), t;
      }
    },
    async return() {
      const t = e.cancel();
      return e.releaseLock(), await t, { done: !0, value: void 0 };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
const Qa = (n) => n != null && typeof n == "object" && typeof n.url == "string" && typeof n.blob == "function", Za = (n) => n != null && typeof n == "object" && typeof n.name == "string" && typeof n.lastModified == "number" && nn(n), nn = (n) => n != null && typeof n == "object" && typeof n.size == "number" && typeof n.type == "string" && typeof n.text == "function" && typeof n.slice == "function" && typeof n.arrayBuffer == "function", Gd = (n) => Za(n) || Qa(n) || Ua(n);
async function eo(n, e, t) {
  var s;
  if (n = await n, Za(n))
    return n;
  if (Qa(n)) {
    const i = await n.blob();
    e || (e = new URL(n.url).pathname.split(/[\\/]/).pop() ?? "unknown_file");
    const a = nn(i) ? [await i.arrayBuffer()] : [i];
    return new Zn(a, e, t);
  }
  const r = await Kd(n);
  if (e || (e = Qd(n) ?? "unknown_file"), !(t != null && t.type)) {
    const i = (s = r[0]) == null ? void 0 : s.type;
    typeof i == "string" && (t = { ...t, type: i });
  }
  return new Zn(r, e, t);
}
async function Kd(n) {
  var t;
  let e = [];
  if (typeof n == "string" || ArrayBuffer.isView(n) || // includes Uint8Array, Buffer, etc.
  n instanceof ArrayBuffer)
    e.push(n);
  else if (nn(n))
    e.push(await n.arrayBuffer());
  else if (Zd(n))
    for await (const r of n)
      e.push(r);
  else
    throw new Error(`Unexpected data type: ${typeof n}; constructor: ${(t = n == null ? void 0 : n.constructor) == null ? void 0 : t.name}; props: ${Xd(n)}`);
  return e;
}
function Xd(n) {
  return `[${Object.getOwnPropertyNames(n).map((t) => `"${t}"`).join(", ")}]`;
}
function Qd(n) {
  var e;
  return An(n.name) || An(n.filename) || // For fs.ReadStream
  ((e = An(n.path)) == null ? void 0 : e.split(/[\\/]/).pop());
}
const An = (n) => {
  if (typeof n == "string")
    return n;
  if (typeof Buffer < "u" && n instanceof Buffer)
    return String(n);
}, Zd = (n) => n != null && typeof n == "object" && typeof n[Symbol.asyncIterator] == "function", Mi = (n) => n && typeof n == "object" && n.body && n[Symbol.toStringTag] === "MultipartBody", $t = async (n) => {
  const e = await ef(n.body);
  return Na(e, n);
}, ef = async (n) => {
  const e = new Da();
  return await Promise.all(Object.entries(n || {}).map(([t, r]) => es(e, t, r))), e;
}, es = async (n, e, t) => {
  if (t !== void 0) {
    if (t == null)
      throw new TypeError(`Received null for "${e}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof t == "string" || typeof t == "number" || typeof t == "boolean")
      n.append(e, String(t));
    else if (Gd(t)) {
      const r = await eo(t);
      n.append(e, r);
    } else if (Array.isArray(t))
      await Promise.all(t.map((r) => es(n, e + "[]", r)));
    else if (typeof t == "object")
      await Promise.all(Object.entries(t).map(([r, s]) => es(n, `${e}[${r}]`, s)));
    else
      throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${t} instead`);
  }
};
var Pt = {}, tf = function(n, e, t, r, s) {
  if (typeof e == "function" ? n !== e || !s : !e.has(n)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(n, t), t;
}, rf = function(n, e, t, r) {
  if (t === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? n !== e || !r : !e.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? r : t === "a" ? r.call(n) : r ? r.value : e.get(n);
}, Pr;
async function to(n) {
  const { response: e } = n;
  if (n.options.stream)
    return Ct("response", e.status, e.url, e.headers, e.body), n.options.__streamClass ? n.options.__streamClass.fromSSEResponse(e, n.controller) : Ne.fromSSEResponse(e, n.controller);
  if (e.status === 204)
    return null;
  if (n.options.__binaryResponse)
    return e;
  const t = e.headers.get("content-type");
  if ((t == null ? void 0 : t.includes("application/json")) || (t == null ? void 0 : t.includes("application/vnd.api+json"))) {
    const i = await e.json();
    return Ct("response", e.status, e.url, e.headers, i), ro(i, e);
  }
  const s = await e.text();
  return Ct("response", e.status, e.url, e.headers, s), s;
}
function ro(n, e) {
  return !n || typeof n != "object" || Array.isArray(n) ? n : Object.defineProperty(n, "_request_id", {
    value: e.headers.get("x-request-id"),
    enumerable: !1
  });
}
class sn extends Promise {
  constructor(e, t = to) {
    super((r) => {
      r(null);
    }), this.responsePromise = e, this.parseResponse = t;
  }
  _thenUnwrap(e) {
    return new sn(this.responsePromise, async (t) => ro(e(await this.parseResponse(t), t), t.response));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'openai'`:
   * - `import 'openai/shims/node'` (if you're running on Node)
   * - `import 'openai/shims/web'` (otherwise)
   */
  asResponse() {
    return this.responsePromise.then((e) => e.response);
  }
  /**
   * Gets the parsed response data, the raw `Response` instance and the ID of the request,
   * returned via the X-Request-ID header which is useful for debugging requests and reporting
   * issues to OpenAI.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'openai'`:
   * - `import 'openai/shims/node'` (if you're running on Node)
   * - `import 'openai/shims/web'` (otherwise)
   */
  async withResponse() {
    const [e, t] = await Promise.all([this.parse(), this.asResponse()]);
    return { data: e, response: t, request_id: t.headers.get("x-request-id") };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then(this.parseResponse)), this.parsedPromise;
  }
  then(e, t) {
    return this.parse().then(e, t);
  }
  catch(e) {
    return this.parse().catch(e);
  }
  finally(e) {
    return this.parse().finally(e);
  }
}
class nf {
  constructor({
    baseURL: e,
    maxRetries: t = 2,
    timeout: r = 6e5,
    // 10 minutes
    httpAgent: s,
    fetch: i
  }) {
    this.baseURL = e, this.maxRetries = Tn("maxRetries", t), this.timeout = Tn("timeout", r), this.httpAgent = s, this.fetch = i ?? ja;
  }
  authHeaders(e) {
    return {};
  }
  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  defaultHeaders(e) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": this.getUserAgent(),
      ...uf(),
      ...this.authHeaders(e)
    };
  }
  /**
   * Override this to add your own headers validation:
   */
  validateHeaders(e, t) {
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${mf()}`;
  }
  get(e, t) {
    return this.methodRequest("get", e, t);
  }
  post(e, t) {
    return this.methodRequest("post", e, t);
  }
  patch(e, t) {
    return this.methodRequest("patch", e, t);
  }
  put(e, t) {
    return this.methodRequest("put", e, t);
  }
  delete(e, t) {
    return this.methodRequest("delete", e, t);
  }
  methodRequest(e, t, r) {
    return this.request(Promise.resolve(r).then(async (s) => {
      const i = s && nn(s == null ? void 0 : s.body) ? new DataView(await s.body.arrayBuffer()) : (s == null ? void 0 : s.body) instanceof DataView ? s.body : (s == null ? void 0 : s.body) instanceof ArrayBuffer ? new DataView(s.body) : s && ArrayBuffer.isView(s == null ? void 0 : s.body) ? new DataView(s.body.buffer) : s == null ? void 0 : s.body;
      return { method: e, path: t, ...s, body: i };
    }));
  }
  getAPIList(e, t, r) {
    return this.requestAPIList(t, { method: "get", path: e, ...r });
  }
  calculateContentLength(e) {
    if (typeof e == "string") {
      if (typeof Buffer < "u")
        return Buffer.byteLength(e, "utf8").toString();
      if (typeof TextEncoder < "u")
        return new TextEncoder().encode(e).length.toString();
    } else if (ArrayBuffer.isView(e))
      return e.byteLength.toString();
    return null;
  }
  buildRequest(e, { retryCount: t = 0 } = {}) {
    var g;
    const { method: r, path: s, query: i, headers: a = {} } = e, o = ArrayBuffer.isView(e.body) || e.__binaryRequest && typeof e.body == "string" ? e.body : Mi(e.body) ? e.body.body : e.body ? JSON.stringify(e.body, null, 2) : null, c = this.calculateContentLength(o), l = this.buildURL(s, i);
    "timeout" in e && Tn("timeout", e.timeout);
    const u = e.timeout ?? this.timeout, h = e.httpAgent ?? this.httpAgent ?? La(l), f = u + 1e3;
    typeof ((g = h == null ? void 0 : h.options) == null ? void 0 : g.timeout) == "number" && f > (h.options.timeout ?? 0) && (h.options.timeout = f), this.idempotencyHeader && r !== "get" && (e.idempotencyKey || (e.idempotencyKey = this.defaultIdempotencyKey()), a[this.idempotencyHeader] = e.idempotencyKey);
    const m = this.buildHeaders({ options: e, headers: a, contentLength: c, retryCount: t });
    return { req: {
      method: r,
      ...o && { body: o },
      headers: m,
      ...h && { agent: h },
      // @ts-ignore node-fetch uses a custom AbortSignal type that is
      // not compatible with standard web types
      signal: e.signal ?? null
    }, url: l, timeout: u };
  }
  buildHeaders({ options: e, headers: t, contentLength: r, retryCount: s }) {
    const i = {};
    r && (i["content-length"] = r);
    const a = this.defaultHeaders(e);
    return Ui(i, a), Ui(i, t), Mi(e.body) && tr !== "node" && delete i["content-type"], Bi(a, "x-stainless-retry-count") === void 0 && Bi(t, "x-stainless-retry-count") === void 0 && (i["x-stainless-retry-count"] = String(s)), this.validateHeaders(i, t), i;
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  async prepareOptions(e) {
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  async prepareRequest(e, { url: t, options: r }) {
  }
  parseHeaders(e) {
    return e ? Symbol.iterator in e ? Object.fromEntries(Array.from(e).map((t) => [...t])) : { ...e } : {};
  }
  makeStatusError(e, t, r, s) {
    return ie.generate(e, t, r, s);
  }
  request(e, t = null) {
    return new sn(this.makeRequest(e, t));
  }
  async makeRequest(e, t) {
    var h, f;
    const r = await e, s = r.maxRetries ?? this.maxRetries;
    t == null && (t = s), await this.prepareOptions(r);
    const { req: i, url: a, timeout: o } = this.buildRequest(r, { retryCount: s - t });
    if (await this.prepareRequest(i, { url: a, options: r }), Ct("request", a, r, i.headers), (h = r.signal) != null && h.aborted)
      throw new Te();
    const c = new AbortController(), l = await this.fetchWithTimeout(a, i, o, c).catch(ts);
    if (l instanceof Error) {
      if ((f = r.signal) != null && f.aborted)
        throw new Te();
      if (t)
        return this.retryRequest(r, t);
      throw l.name === "AbortError" ? new gs() : new rn({ cause: l });
    }
    const u = af(l.headers);
    if (!l.ok) {
      if (t && this.shouldRetry(l)) {
        const w = `retrying, ${t} attempts remaining`;
        return Ct(`response (error; ${w})`, l.status, a, u), this.retryRequest(r, t, u);
      }
      const m = await l.text().catch((w) => ts(w).message), p = hf(m), g = p ? void 0 : m;
      throw Ct(`response (error; ${t ? "(error; no more retries left)" : "(error; not retryable)"})`, l.status, a, u, g), this.makeStatusError(l.status, p, g, u);
    }
    return { response: l, options: r, controller: c };
  }
  requestAPIList(e, t) {
    const r = this.makeRequest(t, null);
    return new sf(this, r, e);
  }
  buildURL(e, t) {
    const r = ff(e) ? new URL(e) : new URL(this.baseURL + (this.baseURL.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)), s = this.defaultQuery();
    return so(s) || (t = { ...s, ...t }), typeof t == "object" && t && !Array.isArray(t) && (r.search = this.stringifyQuery(t)), r.toString();
  }
  stringifyQuery(e) {
    return Object.entries(e).filter(([t, r]) => typeof r < "u").map(([t, r]) => {
      if (typeof r == "string" || typeof r == "number" || typeof r == "boolean")
        return `${encodeURIComponent(t)}=${encodeURIComponent(r)}`;
      if (r === null)
        return `${encodeURIComponent(t)}=`;
      throw new M(`Cannot stringify type ${typeof r}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
    }).join("&");
  }
  async fetchWithTimeout(e, t, r, s) {
    const { signal: i, ...a } = t || {};
    i && i.addEventListener("abort", () => s.abort());
    const o = setTimeout(() => s.abort(), r);
    return (
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      this.fetch.call(void 0, e, { signal: s.signal, ...a }).finally(() => {
        clearTimeout(o);
      })
    );
  }
  shouldRetry(e) {
    const t = e.headers.get("x-should-retry");
    return t === "true" ? !0 : t === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  }
  async retryRequest(e, t, r) {
    let s;
    const i = r == null ? void 0 : r["retry-after-ms"];
    if (i) {
      const o = parseFloat(i);
      Number.isNaN(o) || (s = o);
    }
    const a = r == null ? void 0 : r["retry-after"];
    if (a && !s) {
      const o = parseFloat(a);
      Number.isNaN(o) ? s = Date.parse(a) - Date.now() : s = o * 1e3;
    }
    if (!(s && 0 <= s && s < 60 * 1e3)) {
      const o = e.maxRetries ?? this.maxRetries;
      s = this.calculateDefaultRetryTimeoutMillis(t, o);
    }
    return await ur(s), this.makeRequest(e, t - 1);
  }
  calculateDefaultRetryTimeoutMillis(e, t) {
    const i = t - e, a = Math.min(0.5 * Math.pow(2, i), 8), o = 1 - Math.random() * 0.25;
    return a * o * 1e3;
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${Et}`;
  }
}
class no {
  constructor(e, t, r, s) {
    Pr.set(this, void 0), tf(this, Pr, e), this.options = s, this.response = t, this.body = r;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageInfo() != null : !1;
  }
  async getNextPage() {
    const e = this.nextPageInfo();
    if (!e)
      throw new M("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    const t = { ...this.options };
    if ("params" in e && typeof t.query == "object")
      t.query = { ...t.query, ...e.params };
    else if ("url" in e) {
      const r = [...Object.entries(t.query || {}), ...e.url.searchParams.entries()];
      for (const [s, i] of r)
        e.url.searchParams.set(s, i);
      t.query = void 0, t.path = e.url.toString();
    }
    return await rf(this, Pr, "f").requestAPIList(this.constructor, t);
  }
  async *iterPages() {
    let e = this;
    for (yield e; e.hasNextPage(); )
      e = await e.getNextPage(), yield e;
  }
  async *[(Pr = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const e of this.iterPages())
      for (const t of e.getPaginatedItems())
        yield t;
  }
}
class sf extends sn {
  constructor(e, t, r) {
    super(t, async (s) => new r(e, s.response, await to(s), s.options));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const e = await this;
    for await (const t of e)
      yield t;
  }
}
const af = (n) => new Proxy(Object.fromEntries(
  // @ts-ignore
  n.entries()
), {
  get(e, t) {
    const r = t.toString();
    return e[r.toLowerCase()] || e[r];
  }
}), of = {
  method: !0,
  path: !0,
  query: !0,
  body: !0,
  headers: !0,
  maxRetries: !0,
  stream: !0,
  timeout: !0,
  httpAgent: !0,
  signal: !0,
  idempotencyKey: !0,
  __binaryRequest: !0,
  __binaryResponse: !0,
  __streamClass: !0
}, _e = (n) => typeof n == "object" && n !== null && !so(n) && Object.keys(n).every((e) => io(of, e)), cf = () => {
  var e;
  if (typeof Deno < "u" && Deno.build != null)
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Et,
      "X-Stainless-OS": Li(Deno.build.os),
      "X-Stainless-Arch": Ni(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : ((e = Deno.version) == null ? void 0 : e.deno) ?? "unknown"
    };
  if (typeof EdgeRuntime < "u")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Et,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": process.version
    };
  if (Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Et,
      "X-Stainless-OS": Li(process.platform),
      "X-Stainless-Arch": Ni(process.arch),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": process.version
    };
  const n = lf();
  return n ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Et,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${n.browser}`,
    "X-Stainless-Runtime-Version": n.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Et,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function lf() {
  if (typeof navigator > "u" || !navigator)
    return null;
  const n = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key: e, pattern: t } of n) {
    const r = t.exec(navigator.userAgent);
    if (r) {
      const s = r[1] || 0, i = r[2] || 0, a = r[3] || 0;
      return { browser: e, version: `${s}.${i}.${a}` };
    }
  }
  return null;
}
const Ni = (n) => n === "x32" ? "x32" : n === "x86_64" || n === "x64" ? "x64" : n === "arm" ? "arm" : n === "aarch64" || n === "arm64" ? "arm64" : n ? `other:${n}` : "unknown", Li = (n) => (n = n.toLowerCase(), n.includes("ios") ? "iOS" : n === "android" ? "Android" : n === "darwin" ? "MacOS" : n === "win32" ? "Windows" : n === "freebsd" ? "FreeBSD" : n === "openbsd" ? "OpenBSD" : n === "linux" ? "Linux" : n ? `Other:${n}` : "Unknown");
let Fi;
const uf = () => Fi ?? (Fi = cf()), hf = (n) => {
  try {
    return JSON.parse(n);
  } catch {
    return;
  }
}, df = /^[a-z][a-z0-9+.-]*:/i, ff = (n) => df.test(n), ur = (n) => new Promise((e) => setTimeout(e, n)), Tn = (n, e) => {
  if (typeof e != "number" || !Number.isInteger(e))
    throw new M(`${n} must be an integer`);
  if (e < 0)
    throw new M(`${n} must be a positive integer`);
  return e;
}, ts = (n) => {
  if (n instanceof Error)
    return n;
  if (typeof n == "object" && n !== null)
    try {
      return new Error(JSON.stringify(n));
    } catch {
    }
  return new Error(n);
}, Cr = (n) => {
  var e, t, r, s;
  if (typeof process < "u")
    return ((e = Pt == null ? void 0 : Pt[n]) == null ? void 0 : e.trim()) ?? void 0;
  if (typeof Deno < "u")
    return (s = (r = (t = Deno.env) == null ? void 0 : t.get) == null ? void 0 : r.call(t, n)) == null ? void 0 : s.trim();
};
function so(n) {
  if (!n)
    return !0;
  for (const e in n)
    return !1;
  return !0;
}
function io(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Ui(n, e) {
  for (const t in e) {
    if (!io(e, t))
      continue;
    const r = t.toLowerCase();
    if (!r)
      continue;
    const s = e[t];
    s === null ? delete n[r] : s !== void 0 && (n[r] = s);
  }
}
function Ct(n, ...e) {
  typeof process < "u" && (Pt == null ? void 0 : Pt.DEBUG) === "true" && console.log(`OpenAI:DEBUG:${n}`, ...e);
}
const mf = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (n) => {
  const e = Math.random() * 16 | 0;
  return (n === "x" ? e : e & 3 | 8).toString(16);
}), gf = () => (
  // @ts-ignore
  typeof window < "u" && // @ts-ignore
  typeof window.document < "u" && // @ts-ignore
  typeof navigator < "u"
), pf = (n) => typeof (n == null ? void 0 : n.get) == "function", Bi = (n, e) => {
  var r;
  const t = e.toLowerCase();
  if (pf(n)) {
    const s = ((r = e[0]) == null ? void 0 : r.toUpperCase()) + e.substring(1).replace(/([^\w])(\w)/g, (i, a, o) => a + o.toUpperCase());
    for (const i of [e, t, e.toUpperCase(), s]) {
      const a = n.get(i);
      if (a)
        return a;
    }
  }
  for (const [s, i] of Object.entries(n))
    if (s.toLowerCase() === t)
      return Array.isArray(i) ? (i.length <= 1 || console.warn(`Received ${i.length} entries for the ${e} header, using the first entry.`), i[0]) : i;
};
function Rn(n) {
  return n != null && typeof n == "object" && !Array.isArray(n);
}
class _f extends no {
  constructor(e, t, r, s) {
    super(e, t, r, s), this.data = r.data || [], this.object = r.object;
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  /**
   * This page represents a response that isn't actually paginated at the API level
   * so there will never be any next page params.
   */
  nextPageParams() {
    return null;
  }
  nextPageInfo() {
    return null;
  }
}
class Ie extends no {
  constructor(e, t, r, s) {
    super(e, t, r, s), this.data = r.data || [];
  }
  getPaginatedItems() {
    return this.data ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const e = this.nextPageInfo();
    if (!e)
      return null;
    if ("params" in e)
      return e.params;
    const t = Object.fromEntries(e.url.searchParams);
    return Object.keys(t).length ? t : null;
  }
  nextPageInfo() {
    var r;
    const e = this.getPaginatedItems();
    if (!e.length)
      return null;
    const t = (r = e[e.length - 1]) == null ? void 0 : r.id;
    return t ? { params: { after: t } } : null;
  }
}
class H {
  constructor(e) {
    this._client = e;
  }
}
let ao = class extends H {
  create(e, t) {
    return this._client.post("/chat/completions", { body: e, ...t, stream: e.stream ?? !1 });
  }
}, ps = class extends H {
  constructor() {
    super(...arguments), this.completions = new ao(this._client);
  }
};
ps.Completions = ao;
class oo extends H {
  /**
   * Generates audio from the input text.
   */
  create(e, t) {
    return this._client.post("/audio/speech", { body: e, ...t, __binaryResponse: !0 });
  }
}
class co extends H {
  create(e, t) {
    return this._client.post("/audio/transcriptions", $t({ body: e, ...t }));
  }
}
class lo extends H {
  create(e, t) {
    return this._client.post("/audio/translations", $t({ body: e, ...t }));
  }
}
let hr = class extends H {
  constructor() {
    super(...arguments), this.transcriptions = new co(this._client), this.translations = new lo(this._client), this.speech = new oo(this._client);
  }
};
hr.Transcriptions = co;
hr.Translations = lo;
hr.Speech = oo;
class _s extends H {
  /**
   * Creates and executes a batch from an uploaded file of requests
   */
  create(e, t) {
    return this._client.post("/batches", { body: e, ...t });
  }
  /**
   * Retrieves a batch.
   */
  retrieve(e, t) {
    return this._client.get(`/batches/${e}`, t);
  }
  list(e = {}, t) {
    return _e(e) ? this.list({}, e) : this._client.getAPIList("/batches", ys, { query: e, ...t });
  }
  /**
   * Cancels an in-progress batch. The batch will be in status `cancelling` for up to
   * 10 minutes, before changing to `cancelled`, where it will have partial results
   * (if any) available in the output file.
   */
  cancel(e, t) {
    return this._client.post(`/batches/${e}/cancel`, t);
  }
}
class ys extends Ie {
}
_s.BatchesPage = ys;
class ws extends H {
  /**
   * Create an assistant with a model and instructions.
   */
  create(e, t) {
    return this._client.post("/assistants", {
      body: e,
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Retrieves an assistant.
   */
  retrieve(e, t) {
    return this._client.get(`/assistants/${e}`, {
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Modifies an assistant.
   */
  update(e, t, r) {
    return this._client.post(`/assistants/${e}`, {
      body: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  list(e = {}, t) {
    return _e(e) ? this.list({}, e) : this._client.getAPIList("/assistants", vs, {
      query: e,
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Delete an assistant.
   */
  del(e, t) {
    return this._client.delete(`/assistants/${e}`, {
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
}
class vs extends Ie {
}
ws.AssistantsPage = vs;
function Wi(n) {
  return typeof n.parse == "function";
}
const At = (n) => (n == null ? void 0 : n.role) === "assistant", uo = (n) => (n == null ? void 0 : n.role) === "function", ho = (n) => (n == null ? void 0 : n.role) === "tool";
var Pe = function(n, e, t, r, s) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !s) throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? n !== e || !s : !e.has(n)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? s.call(n, t) : s ? s.value = t : e.set(n, t), t;
}, G = function(n, e, t, r) {
  if (t === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? n !== e || !r : !e.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? r : t === "a" ? r.call(n) : r ? r.value : e.get(n);
}, rs, Ir, jr, zt, Yt, Dr, Gt, We, Kt, Br, Wr, xt, fo;
class mo {
  constructor() {
    rs.add(this), this.controller = new AbortController(), Ir.set(this, void 0), jr.set(this, () => {
    }), zt.set(this, () => {
    }), Yt.set(this, void 0), Dr.set(this, () => {
    }), Gt.set(this, () => {
    }), We.set(this, {}), Kt.set(this, !1), Br.set(this, !1), Wr.set(this, !1), xt.set(this, !1), Pe(this, Ir, new Promise((e, t) => {
      Pe(this, jr, e, "f"), Pe(this, zt, t, "f");
    }), "f"), Pe(this, Yt, new Promise((e, t) => {
      Pe(this, Dr, e, "f"), Pe(this, Gt, t, "f");
    }), "f"), G(this, Ir, "f").catch(() => {
    }), G(this, Yt, "f").catch(() => {
    });
  }
  _run(e) {
    setTimeout(() => {
      e().then(() => {
        this._emitFinal(), this._emit("end");
      }, G(this, rs, "m", fo).bind(this));
    }, 0);
  }
  _connected() {
    this.ended || (G(this, jr, "f").call(this), this._emit("connect"));
  }
  get ended() {
    return G(this, Kt, "f");
  }
  get errored() {
    return G(this, Br, "f");
  }
  get aborted() {
    return G(this, Wr, "f");
  }
  abort() {
    this.controller.abort();
  }
  /**
   * Adds the listener function to the end of the listeners array for the event.
   * No checks are made to see if the listener has already been added. Multiple calls passing
   * the same combination of event and listener will result in the listener being added, and
   * called, multiple times.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  on(e, t) {
    return (G(this, We, "f")[e] || (G(this, We, "f")[e] = [])).push({ listener: t }), this;
  }
  /**
   * Removes the specified listener from the listener array for the event.
   * off() will remove, at most, one instance of a listener from the listener array. If any single
   * listener has been added multiple times to the listener array for the specified event, then
   * off() must be called multiple times to remove each instance.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  off(e, t) {
    const r = G(this, We, "f")[e];
    if (!r)
      return this;
    const s = r.findIndex((i) => i.listener === t);
    return s >= 0 && r.splice(s, 1), this;
  }
  /**
   * Adds a one-time listener function for the event. The next time the event is triggered,
   * this listener is removed and then invoked.
   * @returns this ChatCompletionStream, so that calls can be chained
   */
  once(e, t) {
    return (G(this, We, "f")[e] || (G(this, We, "f")[e] = [])).push({ listener: t, once: !0 }), this;
  }
  /**
   * This is similar to `.once()`, but returns a Promise that resolves the next time
   * the event is triggered, instead of calling a listener callback.
   * @returns a Promise that resolves the next time given event is triggered,
   * or rejects if an error is emitted.  (If you request the 'error' event,
   * returns a promise that resolves with the error).
   *
   * Example:
   *
   *   const message = await stream.emitted('message') // rejects if the stream errors
   */
  emitted(e) {
    return new Promise((t, r) => {
      Pe(this, xt, !0, "f"), e !== "error" && this.once("error", r), this.once(e, t);
    });
  }
  async done() {
    Pe(this, xt, !0, "f"), await G(this, Yt, "f");
  }
  _emit(e, ...t) {
    if (G(this, Kt, "f"))
      return;
    e === "end" && (Pe(this, Kt, !0, "f"), G(this, Dr, "f").call(this));
    const r = G(this, We, "f")[e];
    if (r && (G(this, We, "f")[e] = r.filter((s) => !s.once), r.forEach(({ listener: s }) => s(...t))), e === "abort") {
      const s = t[0];
      !G(this, xt, "f") && !(r != null && r.length) && Promise.reject(s), G(this, zt, "f").call(this, s), G(this, Gt, "f").call(this, s), this._emit("end");
      return;
    }
    if (e === "error") {
      const s = t[0];
      !G(this, xt, "f") && !(r != null && r.length) && Promise.reject(s), G(this, zt, "f").call(this, s), G(this, Gt, "f").call(this, s), this._emit("end");
    }
  }
  _emitFinal() {
  }
}
Ir = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap(), Dr = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap(), We = /* @__PURE__ */ new WeakMap(), Kt = /* @__PURE__ */ new WeakMap(), Br = /* @__PURE__ */ new WeakMap(), Wr = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), rs = /* @__PURE__ */ new WeakSet(), fo = function(e) {
  if (Pe(this, Br, !0, "f"), e instanceof Error && e.name === "AbortError" && (e = new Te()), e instanceof Te)
    return Pe(this, Wr, !0, "f"), this._emit("abort", e);
  if (e instanceof M)
    return this._emit("error", e);
  if (e instanceof Error) {
    const t = new M(e.message);
    return t.cause = e, this._emit("error", t);
  }
  return this._emit("error", new M(String(e)));
};
function go(n) {
  return (n == null ? void 0 : n.$brand) === "auto-parseable-response-format";
}
function dr(n) {
  return (n == null ? void 0 : n.$brand) === "auto-parseable-tool";
}
function yf(n, e) {
  return !e || !po(e) ? {
    ...n,
    choices: n.choices.map((t) => ({
      ...t,
      message: { ...t.message, parsed: null, tool_calls: t.message.tool_calls ?? [] }
    }))
  } : bs(n, e);
}
function bs(n, e) {
  const t = n.choices.map((r) => {
    var s;
    if (r.finish_reason === "length")
      throw new Ga();
    if (r.finish_reason === "content_filter")
      throw new Ka();
    return {
      ...r,
      message: {
        ...r.message,
        tool_calls: ((s = r.message.tool_calls) == null ? void 0 : s.map((i) => vf(e, i))) ?? [],
        parsed: r.message.content && !r.message.refusal ? wf(e, r.message.content) : null
      }
    };
  });
  return { ...n, choices: t };
}
function wf(n, e) {
  var t, r;
  return ((t = n.response_format) == null ? void 0 : t.type) !== "json_schema" ? null : ((r = n.response_format) == null ? void 0 : r.type) === "json_schema" ? "$parseRaw" in n.response_format ? n.response_format.$parseRaw(e) : JSON.parse(e) : null;
}
function vf(n, e) {
  var r;
  const t = (r = n.tools) == null ? void 0 : r.find((s) => {
    var i;
    return ((i = s.function) == null ? void 0 : i.name) === e.function.name;
  });
  return {
    ...e,
    function: {
      ...e.function,
      parsed_arguments: dr(t) ? t.$parseRaw(e.function.arguments) : t != null && t.function.strict ? JSON.parse(e.function.arguments) : null
    }
  };
}
function bf(n, e) {
  var r;
  if (!n)
    return !1;
  const t = (r = n.tools) == null ? void 0 : r.find((s) => {
    var i;
    return ((i = s.function) == null ? void 0 : i.name) === e.function.name;
  });
  return dr(t) || (t == null ? void 0 : t.function.strict) || !1;
}
function po(n) {
  var e;
  return go(n.response_format) ? !0 : ((e = n.tools) == null ? void 0 : e.some((t) => dr(t) || t.type === "function" && t.function.strict === !0)) ?? !1;
}
function Sf(n) {
  for (const e of n ?? []) {
    if (e.type !== "function")
      throw new M(`Currently only \`function\` tool types support auto-parsing; Received \`${e.type}\``);
    if (e.function.strict !== !0)
      throw new M(`The \`${e.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
  }
}
var ge = function(n, e, t, r) {
  if (t === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? n !== e || !r : !e.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? r : t === "a" ? r.call(n) : r ? r.value : e.get(n);
}, ce, ns, qr, ss, is, as, _o, os;
const qi = 10;
class yo extends mo {
  constructor() {
    super(...arguments), ce.add(this), this._chatCompletions = [], this.messages = [];
  }
  _addChatCompletion(e) {
    var r;
    this._chatCompletions.push(e), this._emit("chatCompletion", e);
    const t = (r = e.choices[0]) == null ? void 0 : r.message;
    return t && this._addMessage(t), e;
  }
  _addMessage(e, t = !0) {
    if ("content" in e || (e.content = null), this.messages.push(e), t) {
      if (this._emit("message", e), (uo(e) || ho(e)) && e.content)
        this._emit("functionCallResult", e.content);
      else if (At(e) && e.function_call)
        this._emit("functionCall", e.function_call);
      else if (At(e) && e.tool_calls)
        for (const r of e.tool_calls)
          r.type === "function" && this._emit("functionCall", r.function);
    }
  }
  /**
   * @returns a promise that resolves with the final ChatCompletion, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
   */
  async finalChatCompletion() {
    await this.done();
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    if (!e)
      throw new M("stream ended without producing a ChatCompletion");
    return e;
  }
  /**
   * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalContent() {
    return await this.done(), ge(this, ce, "m", ns).call(this);
  }
  /**
   * @returns a promise that resolves with the the final assistant ChatCompletionMessage response,
   * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalMessage() {
    return await this.done(), ge(this, ce, "m", qr).call(this);
  }
  /**
   * @returns a promise that resolves with the content of the final FunctionCall, or rejects
   * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
   */
  async finalFunctionCall() {
    return await this.done(), ge(this, ce, "m", ss).call(this);
  }
  async finalFunctionCallResult() {
    return await this.done(), ge(this, ce, "m", is).call(this);
  }
  async totalUsage() {
    return await this.done(), ge(this, ce, "m", as).call(this);
  }
  allChatCompletions() {
    return [...this._chatCompletions];
  }
  _emitFinal() {
    const e = this._chatCompletions[this._chatCompletions.length - 1];
    e && this._emit("finalChatCompletion", e);
    const t = ge(this, ce, "m", qr).call(this);
    t && this._emit("finalMessage", t);
    const r = ge(this, ce, "m", ns).call(this);
    r && this._emit("finalContent", r);
    const s = ge(this, ce, "m", ss).call(this);
    s && this._emit("finalFunctionCall", s);
    const i = ge(this, ce, "m", is).call(this);
    i != null && this._emit("finalFunctionCallResult", i), this._chatCompletions.some((a) => a.usage) && this._emit("totalUsage", ge(this, ce, "m", as).call(this));
  }
  async _createChatCompletion(e, t, r) {
    const s = r == null ? void 0 : r.signal;
    s && (s.aborted && this.controller.abort(), s.addEventListener("abort", () => this.controller.abort())), ge(this, ce, "m", _o).call(this, t);
    const i = await e.chat.completions.create({ ...t, stream: !1 }, { ...r, signal: this.controller.signal });
    return this._connected(), this._addChatCompletion(bs(i, t));
  }
  async _runChatCompletion(e, t, r) {
    for (const s of t.messages)
      this._addMessage(s, !1);
    return await this._createChatCompletion(e, t, r);
  }
  async _runFunctions(e, t, r) {
    var f;
    const s = "function", { function_call: i = "auto", stream: a, ...o } = t, c = typeof i != "string" && (i == null ? void 0 : i.name), { maxChatCompletions: l = qi } = r || {}, u = {};
    for (const m of t.functions)
      u[m.name || m.function.name] = m;
    const h = t.functions.map((m) => ({
      name: m.name || m.function.name,
      parameters: m.parameters,
      description: m.description
    }));
    for (const m of t.messages)
      this._addMessage(m, !1);
    for (let m = 0; m < l; ++m) {
      const g = (f = (await this._createChatCompletion(e, {
        ...o,
        function_call: i,
        functions: h,
        messages: [...this.messages]
      }, r)).choices[0]) == null ? void 0 : f.message;
      if (!g)
        throw new M("missing message in ChatCompletion response");
      if (!g.function_call)
        return;
      const { name: _, arguments: T } = g.function_call, w = u[_];
      if (w) {
        if (c && c !== _) {
          const k = `Invalid function_call: ${JSON.stringify(_)}. ${JSON.stringify(c)} requested. Please try again`;
          this._addMessage({ role: s, name: _, content: k });
          continue;
        }
      } else {
        const k = `Invalid function_call: ${JSON.stringify(_)}. Available options are: ${h.map((x) => JSON.stringify(x.name)).join(", ")}. Please try again`;
        this._addMessage({ role: s, name: _, content: k });
        continue;
      }
      let S;
      try {
        S = Wi(w) ? await w.parse(T) : T;
      } catch (k) {
        this._addMessage({
          role: s,
          name: _,
          content: k instanceof Error ? k.message : String(k)
        });
        continue;
      }
      const v = await w.function(S, this), E = ge(this, ce, "m", os).call(this, v);
      if (this._addMessage({ role: s, name: _, content: E }), c)
        return;
    }
  }
  async _runTools(e, t, r) {
    var m, p, g;
    const s = "tool", { tool_choice: i = "auto", stream: a, ...o } = t, c = typeof i != "string" && ((m = i == null ? void 0 : i.function) == null ? void 0 : m.name), { maxChatCompletions: l = qi } = r || {}, u = t.tools.map((_) => {
      if (dr(_)) {
        if (!_.$callback)
          throw new M("Tool given to `.runTools()` that does not have an associated function");
        return {
          type: "function",
          function: {
            function: _.$callback,
            name: _.function.name,
            description: _.function.description || "",
            parameters: _.function.parameters,
            parse: _.$parseRaw,
            strict: !0
          }
        };
      }
      return _;
    }), h = {};
    for (const _ of u)
      _.type === "function" && (h[_.function.name || _.function.function.name] = _.function);
    const f = "tools" in t ? u.map((_) => _.type === "function" ? {
      type: "function",
      function: {
        name: _.function.name || _.function.function.name,
        parameters: _.function.parameters,
        description: _.function.description,
        strict: _.function.strict
      }
    } : _) : void 0;
    for (const _ of t.messages)
      this._addMessage(_, !1);
    for (let _ = 0; _ < l; ++_) {
      const w = (p = (await this._createChatCompletion(e, {
        ...o,
        tool_choice: i,
        tools: f,
        messages: [...this.messages]
      }, r)).choices[0]) == null ? void 0 : p.message;
      if (!w)
        throw new M("missing message in ChatCompletion response");
      if (!((g = w.tool_calls) != null && g.length))
        return;
      for (const S of w.tool_calls) {
        if (S.type !== "function")
          continue;
        const v = S.id, { name: E, arguments: k } = S.function, x = h[E];
        if (x) {
          if (c && c !== E) {
            const j = `Invalid tool_call: ${JSON.stringify(E)}. ${JSON.stringify(c)} requested. Please try again`;
            this._addMessage({ role: s, tool_call_id: v, content: j });
            continue;
          }
        } else {
          const j = `Invalid tool_call: ${JSON.stringify(E)}. Available options are: ${Object.keys(h).map((de) => JSON.stringify(de)).join(", ")}. Please try again`;
          this._addMessage({ role: s, tool_call_id: v, content: j });
          continue;
        }
        let B;
        try {
          B = Wi(x) ? await x.parse(k) : k;
        } catch (j) {
          const de = j instanceof Error ? j.message : String(j);
          this._addMessage({ role: s, tool_call_id: v, content: de });
          continue;
        }
        const U = await x.function(B, this), $ = ge(this, ce, "m", os).call(this, U);
        if (this._addMessage({ role: s, tool_call_id: v, content: $ }), c)
          return;
      }
    }
  }
}
ce = /* @__PURE__ */ new WeakSet(), ns = function() {
  return ge(this, ce, "m", qr).call(this).content ?? null;
}, qr = function() {
  let e = this.messages.length;
  for (; e-- > 0; ) {
    const t = this.messages[e];
    if (At(t)) {
      const { function_call: r, ...s } = t, i = {
        ...s,
        content: t.content ?? null,
        refusal: t.refusal ?? null
      };
      return r && (i.function_call = r), i;
    }
  }
  throw new M("stream ended without producing a ChatCompletionMessage with role=assistant");
}, ss = function() {
  var e, t;
  for (let r = this.messages.length - 1; r >= 0; r--) {
    const s = this.messages[r];
    if (At(s) && (s != null && s.function_call))
      return s.function_call;
    if (At(s) && ((e = s == null ? void 0 : s.tool_calls) != null && e.length))
      return (t = s.tool_calls.at(-1)) == null ? void 0 : t.function;
  }
}, is = function() {
  for (let e = this.messages.length - 1; e >= 0; e--) {
    const t = this.messages[e];
    if (uo(t) && t.content != null || ho(t) && t.content != null && typeof t.content == "string" && this.messages.some((r) => {
      var s;
      return r.role === "assistant" && ((s = r.tool_calls) == null ? void 0 : s.some((i) => i.type === "function" && i.id === t.tool_call_id));
    }))
      return t.content;
  }
}, as = function() {
  const e = {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0
  };
  for (const { usage: t } of this._chatCompletions)
    t && (e.completion_tokens += t.completion_tokens, e.prompt_tokens += t.prompt_tokens, e.total_tokens += t.total_tokens);
  return e;
}, _o = function(e) {
  if (e.n != null && e.n > 1)
    throw new M("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
}, os = function(e) {
  return typeof e == "string" ? e : e === void 0 ? "undefined" : JSON.stringify(e);
};
class ir extends yo {
  /** @deprecated - please use `runTools` instead. */
  static runFunctions(e, t, r) {
    const s = new ir(), i = {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "runFunctions" }
    };
    return s._run(() => s._runFunctions(e, t, i)), s;
  }
  static runTools(e, t, r) {
    const s = new ir(), i = {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "runTools" }
    };
    return s._run(() => s._runTools(e, t, i)), s;
  }
  _addMessage(e, t = !0) {
    super._addMessage(e, t), At(e) && e.content && this._emit("content", e.content);
  }
}
const wo = 1, vo = 2, bo = 4, So = 8, Eo = 16, xo = 32, ko = 64, Oo = 128, Po = 256, Co = Oo | Po, Ao = Eo | xo | Co | ko, To = wo | vo | Ao, Ro = bo | So, Ef = To | Ro, re = {
  STR: wo,
  NUM: vo,
  ARR: bo,
  OBJ: So,
  NULL: Eo,
  BOOL: xo,
  NAN: ko,
  INFINITY: Oo,
  MINUS_INFINITY: Po,
  INF: Co,
  SPECIAL: Ao,
  ATOM: To,
  COLLECTION: Ro,
  ALL: Ef
};
class xf extends Error {
}
class kf extends Error {
}
function Of(n, e = re.ALL) {
  if (typeof n != "string")
    throw new TypeError(`expecting str, got ${typeof n}`);
  if (!n.trim())
    throw new Error(`${n} is empty`);
  return Pf(n.trim(), e);
}
const Pf = (n, e) => {
  const t = n.length;
  let r = 0;
  const s = (f) => {
    throw new xf(`${f} at position ${r}`);
  }, i = (f) => {
    throw new kf(`${f} at position ${r}`);
  }, a = () => (h(), r >= t && s("Unexpected end of input"), n[r] === '"' ? o() : n[r] === "{" ? c() : n[r] === "[" ? l() : n.substring(r, r + 4) === "null" || re.NULL & e && t - r < 4 && "null".startsWith(n.substring(r)) ? (r += 4, null) : n.substring(r, r + 4) === "true" || re.BOOL & e && t - r < 4 && "true".startsWith(n.substring(r)) ? (r += 4, !0) : n.substring(r, r + 5) === "false" || re.BOOL & e && t - r < 5 && "false".startsWith(n.substring(r)) ? (r += 5, !1) : n.substring(r, r + 8) === "Infinity" || re.INFINITY & e && t - r < 8 && "Infinity".startsWith(n.substring(r)) ? (r += 8, 1 / 0) : n.substring(r, r + 9) === "-Infinity" || re.MINUS_INFINITY & e && 1 < t - r && t - r < 9 && "-Infinity".startsWith(n.substring(r)) ? (r += 9, -1 / 0) : n.substring(r, r + 3) === "NaN" || re.NAN & e && t - r < 3 && "NaN".startsWith(n.substring(r)) ? (r += 3, NaN) : u()), o = () => {
    const f = r;
    let m = !1;
    for (r++; r < t && (n[r] !== '"' || m && n[r - 1] === "\\"); )
      m = n[r] === "\\" ? !m : !1, r++;
    if (n.charAt(r) == '"')
      try {
        return JSON.parse(n.substring(f, ++r - Number(m)));
      } catch (p) {
        i(String(p));
      }
    else if (re.STR & e)
      try {
        return JSON.parse(n.substring(f, r - Number(m)) + '"');
      } catch {
        return JSON.parse(n.substring(f, n.lastIndexOf("\\")) + '"');
      }
    s("Unterminated string literal");
  }, c = () => {
    r++, h();
    const f = {};
    try {
      for (; n[r] !== "}"; ) {
        if (h(), r >= t && re.OBJ & e)
          return f;
        const m = o();
        h(), r++;
        try {
          const p = a();
          Object.defineProperty(f, m, { value: p, writable: !0, enumerable: !0, configurable: !0 });
        } catch (p) {
          if (re.OBJ & e)
            return f;
          throw p;
        }
        h(), n[r] === "," && r++;
      }
    } catch {
      if (re.OBJ & e)
        return f;
      s("Expected '}' at end of object");
    }
    return r++, f;
  }, l = () => {
    r++;
    const f = [];
    try {
      for (; n[r] !== "]"; )
        f.push(a()), h(), n[r] === "," && r++;
    } catch {
      if (re.ARR & e)
        return f;
      s("Expected ']' at end of array");
    }
    return r++, f;
  }, u = () => {
    if (r === 0) {
      n === "-" && re.NUM & e && s("Not sure what '-' is");
      try {
        return JSON.parse(n);
      } catch (m) {
        if (re.NUM & e)
          try {
            return n[n.length - 1] === "." ? JSON.parse(n.substring(0, n.lastIndexOf("."))) : JSON.parse(n.substring(0, n.lastIndexOf("e")));
          } catch {
          }
        i(String(m));
      }
    }
    const f = r;
    for (n[r] === "-" && r++; n[r] && !",]}".includes(n[r]); )
      r++;
    r == t && !(re.NUM & e) && s("Unterminated number literal");
    try {
      return JSON.parse(n.substring(f, r));
    } catch {
      n.substring(f, r) === "-" && re.NUM & e && s("Not sure what '-' is");
      try {
        return JSON.parse(n.substring(f, n.lastIndexOf("e")));
      } catch (p) {
        i(String(p));
      }
    }
  }, h = () => {
    for (; r < t && ` 
\r	`.includes(n[r]); )
      r++;
  };
  return a();
}, Hi = (n) => Of(n, re.ALL ^ re.NUM);
var bt = function(n, e, t, r, s) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !s) throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? n !== e || !s : !e.has(n)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? s.call(n, t) : s ? s.value = t : e.set(n, t), t;
}, J = function(n, e, t, r) {
  if (t === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? n !== e || !r : !e.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? r : t === "a" ? r.call(n) : r ? r.value : e.get(n);
}, Z, Be, St, Ve, $n, Ar, In, jn, Dn, Tr, Mn, Ji;
class ar extends yo {
  constructor(e) {
    super(), Z.add(this), Be.set(this, void 0), St.set(this, void 0), Ve.set(this, void 0), bt(this, Be, e, "f"), bt(this, St, [], "f");
  }
  get currentChatCompletionSnapshot() {
    return J(this, Ve, "f");
  }
  /**
   * Intended for use on the frontend, consuming a stream produced with
   * `.toReadableStream()` on the backend.
   *
   * Note that messages sent to the model do not appear in `.on('message')`
   * in this context.
   */
  static fromReadableStream(e) {
    const t = new ar(null);
    return t._run(() => t._fromReadableStream(e)), t;
  }
  static createChatCompletion(e, t, r) {
    const s = new ar(t);
    return s._run(() => s._runChatCompletion(e, { ...t, stream: !0 }, { ...r, headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "stream" } })), s;
  }
  async _createChatCompletion(e, t, r) {
    var a;
    super._createChatCompletion;
    const s = r == null ? void 0 : r.signal;
    s && (s.aborted && this.controller.abort(), s.addEventListener("abort", () => this.controller.abort())), J(this, Z, "m", $n).call(this);
    const i = await e.chat.completions.create({ ...t, stream: !0 }, { ...r, signal: this.controller.signal });
    this._connected();
    for await (const o of i)
      J(this, Z, "m", In).call(this, o);
    if ((a = i.controller.signal) != null && a.aborted)
      throw new Te();
    return this._addChatCompletion(J(this, Z, "m", Tr).call(this));
  }
  async _fromReadableStream(e, t) {
    var a;
    const r = t == null ? void 0 : t.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), J(this, Z, "m", $n).call(this), this._connected();
    const s = Ne.fromReadableStream(e, this.controller);
    let i;
    for await (const o of s)
      i && i !== o.id && this._addChatCompletion(J(this, Z, "m", Tr).call(this)), J(this, Z, "m", In).call(this, o), i = o.id;
    if ((a = s.controller.signal) != null && a.aborted)
      throw new Te();
    return this._addChatCompletion(J(this, Z, "m", Tr).call(this));
  }
  [(Be = /* @__PURE__ */ new WeakMap(), St = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakSet(), $n = function() {
    this.ended || bt(this, Ve, void 0, "f");
  }, Ar = function(t) {
    let r = J(this, St, "f")[t.index];
    return r || (r = {
      content_done: !1,
      refusal_done: !1,
      logprobs_content_done: !1,
      logprobs_refusal_done: !1,
      done_tool_calls: /* @__PURE__ */ new Set(),
      current_tool_call_index: null
    }, J(this, St, "f")[t.index] = r, r);
  }, In = function(t) {
    var s, i, a, o, c, l, u, h, f, m, p, g, _, T, w;
    if (this.ended)
      return;
    const r = J(this, Z, "m", Ji).call(this, t);
    this._emit("chunk", t, r);
    for (const S of t.choices) {
      const v = r.choices[S.index];
      S.delta.content != null && ((s = v.message) == null ? void 0 : s.role) === "assistant" && ((i = v.message) != null && i.content) && (this._emit("content", S.delta.content, v.message.content), this._emit("content.delta", {
        delta: S.delta.content,
        snapshot: v.message.content,
        parsed: v.message.parsed
      })), S.delta.refusal != null && ((a = v.message) == null ? void 0 : a.role) === "assistant" && ((o = v.message) != null && o.refusal) && this._emit("refusal.delta", {
        delta: S.delta.refusal,
        snapshot: v.message.refusal
      }), ((c = S.logprobs) == null ? void 0 : c.content) != null && ((l = v.message) == null ? void 0 : l.role) === "assistant" && this._emit("logprobs.content.delta", {
        content: (u = S.logprobs) == null ? void 0 : u.content,
        snapshot: ((h = v.logprobs) == null ? void 0 : h.content) ?? []
      }), ((f = S.logprobs) == null ? void 0 : f.refusal) != null && ((m = v.message) == null ? void 0 : m.role) === "assistant" && this._emit("logprobs.refusal.delta", {
        refusal: (p = S.logprobs) == null ? void 0 : p.refusal,
        snapshot: ((g = v.logprobs) == null ? void 0 : g.refusal) ?? []
      });
      const E = J(this, Z, "m", Ar).call(this, v);
      v.finish_reason && (J(this, Z, "m", Dn).call(this, v), E.current_tool_call_index != null && J(this, Z, "m", jn).call(this, v, E.current_tool_call_index));
      for (const k of S.delta.tool_calls ?? [])
        E.current_tool_call_index !== k.index && (J(this, Z, "m", Dn).call(this, v), E.current_tool_call_index != null && J(this, Z, "m", jn).call(this, v, E.current_tool_call_index)), E.current_tool_call_index = k.index;
      for (const k of S.delta.tool_calls ?? []) {
        const x = (_ = v.message.tool_calls) == null ? void 0 : _[k.index];
        x != null && x.type && ((x == null ? void 0 : x.type) === "function" ? this._emit("tool_calls.function.arguments.delta", {
          name: (T = x.function) == null ? void 0 : T.name,
          index: k.index,
          arguments: x.function.arguments,
          parsed_arguments: x.function.parsed_arguments,
          arguments_delta: ((w = k.function) == null ? void 0 : w.arguments) ?? ""
        }) : (x == null || x.type, void 0));
      }
    }
  }, jn = function(t, r) {
    var a, o, c;
    if (J(this, Z, "m", Ar).call(this, t).done_tool_calls.has(r))
      return;
    const i = (a = t.message.tool_calls) == null ? void 0 : a[r];
    if (!i)
      throw new Error("no tool call snapshot");
    if (!i.type)
      throw new Error("tool call snapshot missing `type`");
    if (i.type === "function") {
      const l = (c = (o = J(this, Be, "f")) == null ? void 0 : o.tools) == null ? void 0 : c.find((u) => u.type === "function" && u.function.name === i.function.name);
      this._emit("tool_calls.function.arguments.done", {
        name: i.function.name,
        index: r,
        arguments: i.function.arguments,
        parsed_arguments: dr(l) ? l.$parseRaw(i.function.arguments) : l != null && l.function.strict ? JSON.parse(i.function.arguments) : null
      });
    } else
      i.type;
  }, Dn = function(t) {
    var s, i;
    const r = J(this, Z, "m", Ar).call(this, t);
    if (t.message.content && !r.content_done) {
      r.content_done = !0;
      const a = J(this, Z, "m", Mn).call(this);
      this._emit("content.done", {
        content: t.message.content,
        parsed: a ? a.$parseRaw(t.message.content) : null
      });
    }
    t.message.refusal && !r.refusal_done && (r.refusal_done = !0, this._emit("refusal.done", { refusal: t.message.refusal })), (s = t.logprobs) != null && s.content && !r.logprobs_content_done && (r.logprobs_content_done = !0, this._emit("logprobs.content.done", { content: t.logprobs.content })), (i = t.logprobs) != null && i.refusal && !r.logprobs_refusal_done && (r.logprobs_refusal_done = !0, this._emit("logprobs.refusal.done", { refusal: t.logprobs.refusal }));
  }, Tr = function() {
    if (this.ended)
      throw new M("stream has ended, this shouldn't happen");
    const t = J(this, Ve, "f");
    if (!t)
      throw new M("request ended without sending any chunks");
    return bt(this, Ve, void 0, "f"), bt(this, St, [], "f"), Cf(t, J(this, Be, "f"));
  }, Mn = function() {
    var r;
    const t = (r = J(this, Be, "f")) == null ? void 0 : r.response_format;
    return go(t) ? t : null;
  }, Ji = function(t) {
    var r, s, i, a;
    let o = J(this, Ve, "f");
    const { choices: c, ...l } = t;
    o ? Object.assign(o, l) : o = bt(this, Ve, {
      ...l,
      choices: []
    }, "f");
    for (const { delta: u, finish_reason: h, index: f, logprobs: m = null, ...p } of t.choices) {
      let g = o.choices[f];
      if (g || (g = o.choices[f] = { finish_reason: h, index: f, message: {}, logprobs: m, ...p }), m)
        if (!g.logprobs)
          g.logprobs = Object.assign({}, m);
        else {
          const { content: k, refusal: x, ...B } = m;
          Object.assign(g.logprobs, B), k && ((r = g.logprobs).content ?? (r.content = []), g.logprobs.content.push(...k)), x && ((s = g.logprobs).refusal ?? (s.refusal = []), g.logprobs.refusal.push(...x));
        }
      if (h && (g.finish_reason = h, J(this, Be, "f") && po(J(this, Be, "f")))) {
        if (h === "length")
          throw new Ga();
        if (h === "content_filter")
          throw new Ka();
      }
      if (Object.assign(g, p), !u)
        continue;
      const { content: _, refusal: T, function_call: w, role: S, tool_calls: v, ...E } = u;
      if (Object.assign(g.message, E), T && (g.message.refusal = (g.message.refusal || "") + T), S && (g.message.role = S), w && (g.message.function_call ? (w.name && (g.message.function_call.name = w.name), w.arguments && ((i = g.message.function_call).arguments ?? (i.arguments = ""), g.message.function_call.arguments += w.arguments)) : g.message.function_call = w), _ && (g.message.content = (g.message.content || "") + _, !g.message.refusal && J(this, Z, "m", Mn).call(this) && (g.message.parsed = Hi(g.message.content))), v) {
        g.message.tool_calls || (g.message.tool_calls = []);
        for (const { index: k, id: x, type: B, function: U, ...$ } of v) {
          const j = (a = g.message.tool_calls)[k] ?? (a[k] = {});
          Object.assign(j, $), x && (j.id = x), B && (j.type = B), U && (j.function ?? (j.function = { name: U.name ?? "", arguments: "" })), U != null && U.name && (j.function.name = U.name), U != null && U.arguments && (j.function.arguments += U.arguments, bf(J(this, Be, "f"), j) && (j.function.parsed_arguments = Hi(j.function.arguments)));
        }
      }
    }
    return o;
  }, Symbol.asyncIterator)]() {
    const e = [], t = [];
    let r = !1;
    return this.on("chunk", (s) => {
      const i = t.shift();
      i ? i.resolve(s) : e.push(s);
    }), this.on("end", () => {
      r = !0;
      for (const s of t)
        s.resolve(void 0);
      t.length = 0;
    }), this.on("abort", (s) => {
      r = !0;
      for (const i of t)
        i.reject(s);
      t.length = 0;
    }), this.on("error", (s) => {
      r = !0;
      for (const i of t)
        i.reject(s);
      t.length = 0;
    }), {
      next: async () => e.length ? { value: e.shift(), done: !1 } : r ? { value: void 0, done: !0 } : new Promise((i, a) => t.push({ resolve: i, reject: a })).then((i) => i ? { value: i, done: !1 } : { value: void 0, done: !0 }),
      return: async () => (this.abort(), { value: void 0, done: !0 })
    };
  }
  toReadableStream() {
    return new Ne(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
}
function Cf(n, e) {
  const { id: t, choices: r, created: s, model: i, system_fingerprint: a, ...o } = n, c = {
    ...o,
    id: t,
    choices: r.map(({ message: l, finish_reason: u, index: h, logprobs: f, ...m }) => {
      if (!u)
        throw new M(`missing finish_reason for choice ${h}`);
      const { content: p = null, function_call: g, tool_calls: _, ...T } = l, w = l.role;
      if (!w)
        throw new M(`missing role for choice ${h}`);
      if (g) {
        const { arguments: S, name: v } = g;
        if (S == null)
          throw new M(`missing function_call.arguments for choice ${h}`);
        if (!v)
          throw new M(`missing function_call.name for choice ${h}`);
        return {
          ...m,
          message: {
            content: p,
            function_call: { arguments: S, name: v },
            role: w,
            refusal: l.refusal ?? null
          },
          finish_reason: u,
          index: h,
          logprobs: f
        };
      }
      return _ ? {
        ...m,
        index: h,
        finish_reason: u,
        logprobs: f,
        message: {
          ...T,
          role: w,
          content: p,
          refusal: l.refusal ?? null,
          tool_calls: _.map((S, v) => {
            const { function: E, type: k, id: x, ...B } = S, { arguments: U, name: $, ...j } = E || {};
            if (x == null)
              throw new M(`missing choices[${h}].tool_calls[${v}].id
${Rr(n)}`);
            if (k == null)
              throw new M(`missing choices[${h}].tool_calls[${v}].type
${Rr(n)}`);
            if ($ == null)
              throw new M(`missing choices[${h}].tool_calls[${v}].function.name
${Rr(n)}`);
            if (U == null)
              throw new M(`missing choices[${h}].tool_calls[${v}].function.arguments
${Rr(n)}`);
            return { ...B, id: x, type: k, function: { ...j, name: $, arguments: U } };
          })
        }
      } : {
        ...m,
        message: { ...T, content: p, role: w, refusal: l.refusal ?? null },
        finish_reason: u,
        index: h,
        logprobs: f
      };
    }),
    created: s,
    model: i,
    object: "chat.completion",
    ...a ? { system_fingerprint: a } : {}
  };
  return yf(c, e);
}
function Rr(n) {
  return JSON.stringify(n);
}
class Tt extends ar {
  static fromReadableStream(e) {
    const t = new Tt(null);
    return t._run(() => t._fromReadableStream(e)), t;
  }
  /** @deprecated - please use `runTools` instead. */
  static runFunctions(e, t, r) {
    const s = new Tt(null), i = {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "runFunctions" }
    };
    return s._run(() => s._runFunctions(e, t, i)), s;
  }
  static runTools(e, t, r) {
    const s = new Tt(
      // @ts-expect-error TODO these types are incompatible
      t
    ), i = {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "runTools" }
    };
    return s._run(() => s._runTools(e, t, i)), s;
  }
}
let $o = class extends H {
  parse(e, t) {
    return Sf(e.tools), this._client.chat.completions.create(e, {
      ...t,
      headers: {
        ...t == null ? void 0 : t.headers,
        "X-Stainless-Helper-Method": "beta.chat.completions.parse"
      }
    })._thenUnwrap((r) => bs(r, e));
  }
  runFunctions(e, t) {
    return e.stream ? Tt.runFunctions(this._client, e, t) : ir.runFunctions(this._client, e, t);
  }
  runTools(e, t) {
    return e.stream ? Tt.runTools(this._client, e, t) : ir.runTools(this._client, e, t);
  }
  /**
   * Creates a chat completion stream
   */
  stream(e, t) {
    return ar.createChatCompletion(this._client, e, t);
  }
};
class cs extends H {
  constructor() {
    super(...arguments), this.completions = new $o(this._client);
  }
}
(function(n) {
  n.Completions = $o;
})(cs || (cs = {}));
var C = function(n, e, t, r) {
  if (t === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? n !== e || !r : !e.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? r : t === "a" ? r.call(n) : r ? r.value : e.get(n);
}, ye = function(n, e, t, r, s) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !s) throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? n !== e || !s : !e.has(n)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? s.call(n, t) : s ? s.value = t : e.set(n, t), t;
}, se, ls, Me, Mr, Ce, it, kt, st, Hr, ve, Nr, Lr, rr, Xt, Qt, Vi, zi, Yi, Gi, Ki, Xi, Qi;
class Re extends mo {
  constructor() {
    super(...arguments), se.add(this), ls.set(this, []), Me.set(this, {}), Mr.set(this, {}), Ce.set(this, void 0), it.set(this, void 0), kt.set(this, void 0), st.set(this, void 0), Hr.set(this, void 0), ve.set(this, void 0), Nr.set(this, void 0), Lr.set(this, void 0), rr.set(this, void 0);
  }
  [(ls = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), Hr = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakSet(), Symbol.asyncIterator)]() {
    const e = [], t = [];
    let r = !1;
    return this.on("event", (s) => {
      const i = t.shift();
      i ? i.resolve(s) : e.push(s);
    }), this.on("end", () => {
      r = !0;
      for (const s of t)
        s.resolve(void 0);
      t.length = 0;
    }), this.on("abort", (s) => {
      r = !0;
      for (const i of t)
        i.reject(s);
      t.length = 0;
    }), this.on("error", (s) => {
      r = !0;
      for (const i of t)
        i.reject(s);
      t.length = 0;
    }), {
      next: async () => e.length ? { value: e.shift(), done: !1 } : r ? { value: void 0, done: !0 } : new Promise((i, a) => t.push({ resolve: i, reject: a })).then((i) => i ? { value: i, done: !1 } : { value: void 0, done: !0 }),
      return: async () => (this.abort(), { value: void 0, done: !0 })
    };
  }
  static fromReadableStream(e) {
    const t = new Re();
    return t._run(() => t._fromReadableStream(e)), t;
  }
  async _fromReadableStream(e, t) {
    var i;
    const r = t == null ? void 0 : t.signal;
    r && (r.aborted && this.controller.abort(), r.addEventListener("abort", () => this.controller.abort())), this._connected();
    const s = Ne.fromReadableStream(e, this.controller);
    for await (const a of s)
      C(this, se, "m", Xt).call(this, a);
    if ((i = s.controller.signal) != null && i.aborted)
      throw new Te();
    return this._addRun(C(this, se, "m", Qt).call(this));
  }
  toReadableStream() {
    return new Ne(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
  }
  static createToolAssistantStream(e, t, r, s, i) {
    const a = new Re();
    return a._run(() => a._runToolAssistantStream(e, t, r, s, {
      ...i,
      headers: { ...i == null ? void 0 : i.headers, "X-Stainless-Helper-Method": "stream" }
    })), a;
  }
  async _createToolAssistantStream(e, t, r, s, i) {
    var l;
    const a = i == null ? void 0 : i.signal;
    a && (a.aborted && this.controller.abort(), a.addEventListener("abort", () => this.controller.abort()));
    const o = { ...s, stream: !0 }, c = await e.submitToolOutputs(t, r, o, {
      ...i,
      signal: this.controller.signal
    });
    this._connected();
    for await (const u of c)
      C(this, se, "m", Xt).call(this, u);
    if ((l = c.controller.signal) != null && l.aborted)
      throw new Te();
    return this._addRun(C(this, se, "m", Qt).call(this));
  }
  static createThreadAssistantStream(e, t, r) {
    const s = new Re();
    return s._run(() => s._threadAssistantStream(e, t, {
      ...r,
      headers: { ...r == null ? void 0 : r.headers, "X-Stainless-Helper-Method": "stream" }
    })), s;
  }
  static createAssistantStream(e, t, r, s) {
    const i = new Re();
    return i._run(() => i._runAssistantStream(e, t, r, {
      ...s,
      headers: { ...s == null ? void 0 : s.headers, "X-Stainless-Helper-Method": "stream" }
    })), i;
  }
  currentEvent() {
    return C(this, Nr, "f");
  }
  currentRun() {
    return C(this, Lr, "f");
  }
  currentMessageSnapshot() {
    return C(this, Ce, "f");
  }
  currentRunStepSnapshot() {
    return C(this, rr, "f");
  }
  async finalRunSteps() {
    return await this.done(), Object.values(C(this, Me, "f"));
  }
  async finalMessages() {
    return await this.done(), Object.values(C(this, Mr, "f"));
  }
  async finalRun() {
    if (await this.done(), !C(this, it, "f"))
      throw Error("Final run was not received.");
    return C(this, it, "f");
  }
  async _createThreadAssistantStream(e, t, r) {
    var o;
    const s = r == null ? void 0 : r.signal;
    s && (s.aborted && this.controller.abort(), s.addEventListener("abort", () => this.controller.abort()));
    const i = { ...t, stream: !0 }, a = await e.createAndRun(i, { ...r, signal: this.controller.signal });
    this._connected();
    for await (const c of a)
      C(this, se, "m", Xt).call(this, c);
    if ((o = a.controller.signal) != null && o.aborted)
      throw new Te();
    return this._addRun(C(this, se, "m", Qt).call(this));
  }
  async _createAssistantStream(e, t, r, s) {
    var c;
    const i = s == null ? void 0 : s.signal;
    i && (i.aborted && this.controller.abort(), i.addEventListener("abort", () => this.controller.abort()));
    const a = { ...r, stream: !0 }, o = await e.create(t, a, { ...s, signal: this.controller.signal });
    this._connected();
    for await (const l of o)
      C(this, se, "m", Xt).call(this, l);
    if ((c = o.controller.signal) != null && c.aborted)
      throw new Te();
    return this._addRun(C(this, se, "m", Qt).call(this));
  }
  static accumulateDelta(e, t) {
    for (const [r, s] of Object.entries(t)) {
      if (!e.hasOwnProperty(r)) {
        e[r] = s;
        continue;
      }
      let i = e[r];
      if (i == null) {
        e[r] = s;
        continue;
      }
      if (r === "index" || r === "type") {
        e[r] = s;
        continue;
      }
      if (typeof i == "string" && typeof s == "string")
        i += s;
      else if (typeof i == "number" && typeof s == "number")
        i += s;
      else if (Rn(i) && Rn(s))
        i = this.accumulateDelta(i, s);
      else if (Array.isArray(i) && Array.isArray(s)) {
        if (i.every((a) => typeof a == "string" || typeof a == "number")) {
          i.push(...s);
          continue;
        }
        for (const a of s) {
          if (!Rn(a))
            throw new Error(`Expected array delta entry to be an object but got: ${a}`);
          const o = a.index;
          if (o == null)
            throw console.error(a), new Error("Expected array delta entry to have an `index` property");
          if (typeof o != "number")
            throw new Error(`Expected array delta entry \`index\` property to be a number but got ${o}`);
          const c = i[o];
          c == null ? i.push(a) : i[o] = this.accumulateDelta(c, a);
        }
        continue;
      } else
        throw Error(`Unhandled record type: ${r}, deltaValue: ${s}, accValue: ${i}`);
      e[r] = i;
    }
    return e;
  }
  _addRun(e) {
    return e;
  }
  async _threadAssistantStream(e, t, r) {
    return await this._createThreadAssistantStream(t, e, r);
  }
  async _runAssistantStream(e, t, r, s) {
    return await this._createAssistantStream(t, e, r, s);
  }
  async _runToolAssistantStream(e, t, r, s, i) {
    return await this._createToolAssistantStream(r, e, t, s, i);
  }
}
Xt = function(e) {
  if (!this.ended)
    switch (ye(this, Nr, e, "f"), C(this, se, "m", Yi).call(this, e), e.event) {
      case "thread.created":
        break;
      case "thread.run.created":
      case "thread.run.queued":
      case "thread.run.in_progress":
      case "thread.run.requires_action":
      case "thread.run.completed":
      case "thread.run.failed":
      case "thread.run.cancelling":
      case "thread.run.cancelled":
      case "thread.run.expired":
        C(this, se, "m", Qi).call(this, e);
        break;
      case "thread.run.step.created":
      case "thread.run.step.in_progress":
      case "thread.run.step.delta":
      case "thread.run.step.completed":
      case "thread.run.step.failed":
      case "thread.run.step.cancelled":
      case "thread.run.step.expired":
        C(this, se, "m", zi).call(this, e);
        break;
      case "thread.message.created":
      case "thread.message.in_progress":
      case "thread.message.delta":
      case "thread.message.completed":
      case "thread.message.incomplete":
        C(this, se, "m", Vi).call(this, e);
        break;
      case "error":
        throw new Error("Encountered an error event in event processing - errors should be processed earlier");
    }
}, Qt = function() {
  if (this.ended)
    throw new M("stream has ended, this shouldn't happen");
  if (!C(this, it, "f"))
    throw Error("Final run has not been received");
  return C(this, it, "f");
}, Vi = function(e) {
  const [t, r] = C(this, se, "m", Ki).call(this, e, C(this, Ce, "f"));
  ye(this, Ce, t, "f"), C(this, Mr, "f")[t.id] = t;
  for (const s of r) {
    const i = t.content[s.index];
    (i == null ? void 0 : i.type) == "text" && this._emit("textCreated", i.text);
  }
  switch (e.event) {
    case "thread.message.created":
      this._emit("messageCreated", e.data);
      break;
    case "thread.message.in_progress":
      break;
    case "thread.message.delta":
      if (this._emit("messageDelta", e.data.delta, t), e.data.delta.content)
        for (const s of e.data.delta.content) {
          if (s.type == "text" && s.text) {
            let i = s.text, a = t.content[s.index];
            if (a && a.type == "text")
              this._emit("textDelta", i, a.text);
            else
              throw Error("The snapshot associated with this text delta is not text or missing");
          }
          if (s.index != C(this, kt, "f")) {
            if (C(this, st, "f"))
              switch (C(this, st, "f").type) {
                case "text":
                  this._emit("textDone", C(this, st, "f").text, C(this, Ce, "f"));
                  break;
                case "image_file":
                  this._emit("imageFileDone", C(this, st, "f").image_file, C(this, Ce, "f"));
                  break;
              }
            ye(this, kt, s.index, "f");
          }
          ye(this, st, t.content[s.index], "f");
        }
      break;
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (C(this, kt, "f") !== void 0) {
        const s = e.data.content[C(this, kt, "f")];
        if (s)
          switch (s.type) {
            case "image_file":
              this._emit("imageFileDone", s.image_file, C(this, Ce, "f"));
              break;
            case "text":
              this._emit("textDone", s.text, C(this, Ce, "f"));
              break;
          }
      }
      C(this, Ce, "f") && this._emit("messageDone", e.data), ye(this, Ce, void 0, "f");
  }
}, zi = function(e) {
  const t = C(this, se, "m", Gi).call(this, e);
  switch (ye(this, rr, t, "f"), e.event) {
    case "thread.run.step.created":
      this._emit("runStepCreated", e.data);
      break;
    case "thread.run.step.delta":
      const r = e.data.delta;
      if (r.step_details && r.step_details.type == "tool_calls" && r.step_details.tool_calls && t.step_details.type == "tool_calls")
        for (const i of r.step_details.tool_calls)
          i.index == C(this, Hr, "f") ? this._emit("toolCallDelta", i, t.step_details.tool_calls[i.index]) : (C(this, ve, "f") && this._emit("toolCallDone", C(this, ve, "f")), ye(this, Hr, i.index, "f"), ye(this, ve, t.step_details.tool_calls[i.index], "f"), C(this, ve, "f") && this._emit("toolCallCreated", C(this, ve, "f")));
      this._emit("runStepDelta", e.data.delta, t);
      break;
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      ye(this, rr, void 0, "f"), e.data.step_details.type == "tool_calls" && C(this, ve, "f") && (this._emit("toolCallDone", C(this, ve, "f")), ye(this, ve, void 0, "f")), this._emit("runStepDone", e.data, t);
      break;
  }
}, Yi = function(e) {
  C(this, ls, "f").push(e), this._emit("event", e);
}, Gi = function(e) {
  switch (e.event) {
    case "thread.run.step.created":
      return C(this, Me, "f")[e.data.id] = e.data, e.data;
    case "thread.run.step.delta":
      let t = C(this, Me, "f")[e.data.id];
      if (!t)
        throw Error("Received a RunStepDelta before creation of a snapshot");
      let r = e.data;
      if (r.delta) {
        const s = Re.accumulateDelta(t, r.delta);
        C(this, Me, "f")[e.data.id] = s;
      }
      return C(this, Me, "f")[e.data.id];
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
    case "thread.run.step.in_progress":
      C(this, Me, "f")[e.data.id] = e.data;
      break;
  }
  if (C(this, Me, "f")[e.data.id])
    return C(this, Me, "f")[e.data.id];
  throw new Error("No snapshot available");
}, Ki = function(e, t) {
  let r = [];
  switch (e.event) {
    case "thread.message.created":
      return [e.data, r];
    case "thread.message.delta":
      if (!t)
        throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
      let s = e.data;
      if (s.delta.content)
        for (const i of s.delta.content)
          if (i.index in t.content) {
            let a = t.content[i.index];
            t.content[i.index] = C(this, se, "m", Xi).call(this, i, a);
          } else
            t.content[i.index] = i, r.push(i);
      return [t, r];
    case "thread.message.in_progress":
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (t)
        return [t, r];
      throw Error("Received thread message event with no existing snapshot");
  }
  throw Error("Tried to accumulate a non-message event");
}, Xi = function(e, t) {
  return Re.accumulateDelta(t, e);
}, Qi = function(e) {
  switch (ye(this, Lr, e.data, "f"), e.event) {
    case "thread.run.created":
      break;
    case "thread.run.queued":
      break;
    case "thread.run.in_progress":
      break;
    case "thread.run.requires_action":
    case "thread.run.cancelled":
    case "thread.run.failed":
    case "thread.run.completed":
    case "thread.run.expired":
      ye(this, it, e.data, "f"), C(this, ve, "f") && (this._emit("toolCallDone", C(this, ve, "f")), ye(this, ve, void 0, "f"));
      break;
  }
};
class Ss extends H {
  /**
   * Create a message.
   */
  create(e, t, r) {
    return this._client.post(`/threads/${e}/messages`, {
      body: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Retrieve a message.
   */
  retrieve(e, t, r) {
    return this._client.get(`/threads/${e}/messages/${t}`, {
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Modifies a message.
   */
  update(e, t, r, s) {
    return this._client.post(`/threads/${e}/messages/${t}`, {
      body: r,
      ...s,
      headers: { "OpenAI-Beta": "assistants=v2", ...s == null ? void 0 : s.headers }
    });
  }
  list(e, t = {}, r) {
    return _e(t) ? this.list(e, {}, t) : this._client.getAPIList(`/threads/${e}/messages`, Es, {
      query: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Deletes a message.
   */
  del(e, t, r) {
    return this._client.delete(`/threads/${e}/messages/${t}`, {
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
}
class Es extends Ie {
}
Ss.MessagesPage = Es;
class xs extends H {
  retrieve(e, t, r, s = {}, i) {
    return _e(s) ? this.retrieve(e, t, r, {}, s) : this._client.get(`/threads/${e}/runs/${t}/steps/${r}`, {
      query: s,
      ...i,
      headers: { "OpenAI-Beta": "assistants=v2", ...i == null ? void 0 : i.headers }
    });
  }
  list(e, t, r = {}, s) {
    return _e(r) ? this.list(e, t, {}, r) : this._client.getAPIList(`/threads/${e}/runs/${t}/steps`, ks, {
      query: r,
      ...s,
      headers: { "OpenAI-Beta": "assistants=v2", ...s == null ? void 0 : s.headers }
    });
  }
}
class ks extends Ie {
}
xs.RunStepsPage = ks;
class fr extends H {
  constructor() {
    super(...arguments), this.steps = new xs(this._client);
  }
  create(e, t, r) {
    const { include: s, ...i } = t;
    return this._client.post(`/threads/${e}/runs`, {
      query: { include: s },
      body: i,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers },
      stream: t.stream ?? !1
    });
  }
  /**
   * Retrieves a run.
   */
  retrieve(e, t, r) {
    return this._client.get(`/threads/${e}/runs/${t}`, {
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Modifies a run.
   */
  update(e, t, r, s) {
    return this._client.post(`/threads/${e}/runs/${t}`, {
      body: r,
      ...s,
      headers: { "OpenAI-Beta": "assistants=v2", ...s == null ? void 0 : s.headers }
    });
  }
  list(e, t = {}, r) {
    return _e(t) ? this.list(e, {}, t) : this._client.getAPIList(`/threads/${e}/runs`, Os, {
      query: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Cancels a run that is `in_progress`.
   */
  cancel(e, t, r) {
    return this._client.post(`/threads/${e}/runs/${t}/cancel`, {
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * A helper to create a run an poll for a terminal state. More information on Run
   * lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async createAndPoll(e, t, r) {
    const s = await this.create(e, t, r);
    return await this.poll(e, s.id, r);
  }
  /**
   * Create a Run stream
   *
   * @deprecated use `stream` instead
   */
  createAndStream(e, t, r) {
    return Re.createAssistantStream(e, this._client.beta.threads.runs, t, r);
  }
  /**
   * A helper to poll a run status until it reaches a terminal state. More
   * information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async poll(e, t, r) {
    const s = { ...r == null ? void 0 : r.headers, "X-Stainless-Poll-Helper": "true" };
    for (r != null && r.pollIntervalMs && (s["X-Stainless-Custom-Poll-Interval"] = r.pollIntervalMs.toString()); ; ) {
      const { data: i, response: a } = await this.retrieve(e, t, {
        ...r,
        headers: { ...r == null ? void 0 : r.headers, ...s }
      }).withResponse();
      switch (i.status) {
        case "queued":
        case "in_progress":
        case "cancelling":
          let o = 5e3;
          if (r != null && r.pollIntervalMs)
            o = r.pollIntervalMs;
          else {
            const c = a.headers.get("openai-poll-after-ms");
            if (c) {
              const l = parseInt(c);
              isNaN(l) || (o = l);
            }
          }
          await ur(o);
          break;
        case "requires_action":
        case "incomplete":
        case "cancelled":
        case "completed":
        case "failed":
        case "expired":
          return i;
      }
    }
  }
  /**
   * Create a Run stream
   */
  stream(e, t, r) {
    return Re.createAssistantStream(e, this._client.beta.threads.runs, t, r);
  }
  submitToolOutputs(e, t, r, s) {
    return this._client.post(`/threads/${e}/runs/${t}/submit_tool_outputs`, {
      body: r,
      ...s,
      headers: { "OpenAI-Beta": "assistants=v2", ...s == null ? void 0 : s.headers },
      stream: r.stream ?? !1
    });
  }
  /**
   * A helper to submit a tool output to a run and poll for a terminal run state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async submitToolOutputsAndPoll(e, t, r, s) {
    const i = await this.submitToolOutputs(e, t, r, s);
    return await this.poll(e, i.id, s);
  }
  /**
   * Submit the tool outputs from a previous run and stream the run to a terminal
   * state. More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  submitToolOutputsStream(e, t, r, s) {
    return Re.createToolAssistantStream(e, t, this._client.beta.threads.runs, r, s);
  }
}
class Os extends Ie {
}
fr.RunsPage = Os;
fr.Steps = xs;
fr.RunStepsPage = ks;
class Dt extends H {
  constructor() {
    super(...arguments), this.runs = new fr(this._client), this.messages = new Ss(this._client);
  }
  create(e = {}, t) {
    return _e(e) ? this.create({}, e) : this._client.post("/threads", {
      body: e,
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Retrieves a thread.
   */
  retrieve(e, t) {
    return this._client.get(`/threads/${e}`, {
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Modifies a thread.
   */
  update(e, t, r) {
    return this._client.post(`/threads/${e}`, {
      body: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Delete a thread.
   */
  del(e, t) {
    return this._client.delete(`/threads/${e}`, {
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  createAndRun(e, t) {
    return this._client.post("/threads/runs", {
      body: e,
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers },
      stream: e.stream ?? !1
    });
  }
  /**
   * A helper to create a thread, start a run and then poll for a terminal state.
   * More information on Run lifecycles can be found here:
   * https://platform.openai.com/docs/assistants/how-it-works/runs-and-run-steps
   */
  async createAndRunPoll(e, t) {
    const r = await this.createAndRun(e, t);
    return await this.runs.poll(r.thread_id, r.id, t);
  }
  /**
   * Create a thread and stream the run back
   */
  createAndRunStream(e, t) {
    return Re.createThreadAssistantStream(e, this._client.beta.threads, t);
  }
}
Dt.Runs = fr;
Dt.RunsPage = Os;
Dt.Messages = Ss;
Dt.MessagesPage = Es;
const Af = async (n) => {
  const e = await Promise.allSettled(n), t = e.filter((s) => s.status === "rejected");
  if (t.length) {
    for (const s of t)
      console.error(s.reason);
    throw new Error(`${t.length} promise(s) failed - see the above errors`);
  }
  const r = [];
  for (const s of e)
    s.status === "fulfilled" && r.push(s.value);
  return r;
};
let Ps = class extends H {
  /**
   * Create a vector store file by attaching a
   * [File](https://platform.openai.com/docs/api-reference/files) to a
   * [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).
   */
  create(e, t, r) {
    return this._client.post(`/vector_stores/${e}/files`, {
      body: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Retrieves a vector store file.
   */
  retrieve(e, t, r) {
    return this._client.get(`/vector_stores/${e}/files/${t}`, {
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  list(e, t = {}, r) {
    return _e(t) ? this.list(e, {}, t) : this._client.getAPIList(`/vector_stores/${e}/files`, an, {
      query: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Delete a vector store file. This will remove the file from the vector store but
   * the file itself will not be deleted. To delete the file, use the
   * [delete file](https://platform.openai.com/docs/api-reference/files/delete)
   * endpoint.
   */
  del(e, t, r) {
    return this._client.delete(`/vector_stores/${e}/files/${t}`, {
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Attach a file to the given vector store and wait for it to be processed.
   */
  async createAndPoll(e, t, r) {
    const s = await this.create(e, t, r);
    return await this.poll(e, s.id, r);
  }
  /**
   * Wait for the vector store file to finish processing.
   *
   * Note: this will return even if the file failed to process, you need to check
   * file.last_error and file.status to handle these cases
   */
  async poll(e, t, r) {
    const s = { ...r == null ? void 0 : r.headers, "X-Stainless-Poll-Helper": "true" };
    for (r != null && r.pollIntervalMs && (s["X-Stainless-Custom-Poll-Interval"] = r.pollIntervalMs.toString()); ; ) {
      const i = await this.retrieve(e, t, {
        ...r,
        headers: s
      }).withResponse(), a = i.data;
      switch (a.status) {
        case "in_progress":
          let o = 5e3;
          if (r != null && r.pollIntervalMs)
            o = r.pollIntervalMs;
          else {
            const c = i.response.headers.get("openai-poll-after-ms");
            if (c) {
              const l = parseInt(c);
              isNaN(l) || (o = l);
            }
          }
          await ur(o);
          break;
        case "failed":
        case "completed":
          return a;
      }
    }
  }
  /**
   * Upload a file to the `files` API and then attach it to the given vector store.
   *
   * Note the file will be asynchronously processed (you can use the alternative
   * polling helper method to wait for processing to complete).
   */
  async upload(e, t, r) {
    const s = await this._client.files.create({ file: t, purpose: "assistants" }, r);
    return this.create(e, { file_id: s.id }, r);
  }
  /**
   * Add a file to a vector store and poll until processing is complete.
   */
  async uploadAndPoll(e, t, r) {
    const s = await this.upload(e, t, r);
    return await this.poll(e, s.id, r);
  }
};
class an extends Ie {
}
Ps.VectorStoreFilesPage = an;
class Io extends H {
  /**
   * Create a vector store file batch.
   */
  create(e, t, r) {
    return this._client.post(`/vector_stores/${e}/file_batches`, {
      body: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Retrieves a vector store file batch.
   */
  retrieve(e, t, r) {
    return this._client.get(`/vector_stores/${e}/file_batches/${t}`, {
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Cancel a vector store file batch. This attempts to cancel the processing of
   * files in this batch as soon as possible.
   */
  cancel(e, t, r) {
    return this._client.post(`/vector_stores/${e}/file_batches/${t}/cancel`, {
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  /**
   * Create a vector store batch and poll until all files have been processed.
   */
  async createAndPoll(e, t, r) {
    const s = await this.create(e, t);
    return await this.poll(e, s.id, r);
  }
  listFiles(e, t, r = {}, s) {
    return _e(r) ? this.listFiles(e, t, {}, r) : this._client.getAPIList(`/vector_stores/${e}/file_batches/${t}/files`, an, { query: r, ...s, headers: { "OpenAI-Beta": "assistants=v2", ...s == null ? void 0 : s.headers } });
  }
  /**
   * Wait for the given file batch to be processed.
   *
   * Note: this will return even if one of the files failed to process, you need to
   * check batch.file_counts.failed_count to handle this case.
   */
  async poll(e, t, r) {
    const s = { ...r == null ? void 0 : r.headers, "X-Stainless-Poll-Helper": "true" };
    for (r != null && r.pollIntervalMs && (s["X-Stainless-Custom-Poll-Interval"] = r.pollIntervalMs.toString()); ; ) {
      const { data: i, response: a } = await this.retrieve(e, t, {
        ...r,
        headers: s
      }).withResponse();
      switch (i.status) {
        case "in_progress":
          let o = 5e3;
          if (r != null && r.pollIntervalMs)
            o = r.pollIntervalMs;
          else {
            const c = a.headers.get("openai-poll-after-ms");
            if (c) {
              const l = parseInt(c);
              isNaN(l) || (o = l);
            }
          }
          await ur(o);
          break;
        case "failed":
        case "cancelled":
        case "completed":
          return i;
      }
    }
  }
  /**
   * Uploads the given files concurrently and then creates a vector store file batch.
   *
   * The concurrency limit is configurable using the `maxConcurrency` parameter.
   */
  async uploadAndPoll(e, { files: t, fileIds: r = [] }, s) {
    if (t == null || t.length == 0)
      throw new Error("No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead");
    const i = (s == null ? void 0 : s.maxConcurrency) ?? 5, a = Math.min(i, t.length), o = this._client, c = t.values(), l = [...r];
    async function u(f) {
      for (let m of f) {
        const p = await o.files.create({ file: m, purpose: "assistants" }, s);
        l.push(p.id);
      }
    }
    const h = Array(a).fill(c).map(u);
    return await Af(h), await this.createAndPoll(e, {
      file_ids: l
    });
  }
}
class Mt extends H {
  constructor() {
    super(...arguments), this.files = new Ps(this._client), this.fileBatches = new Io(this._client);
  }
  /**
   * Create a vector store.
   */
  create(e, t) {
    return this._client.post("/vector_stores", {
      body: e,
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Retrieves a vector store.
   */
  retrieve(e, t) {
    return this._client.get(`/vector_stores/${e}`, {
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Modifies a vector store.
   */
  update(e, t, r) {
    return this._client.post(`/vector_stores/${e}`, {
      body: t,
      ...r,
      headers: { "OpenAI-Beta": "assistants=v2", ...r == null ? void 0 : r.headers }
    });
  }
  list(e = {}, t) {
    return _e(e) ? this.list({}, e) : this._client.getAPIList("/vector_stores", Cs, {
      query: e,
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Delete a vector store.
   */
  del(e, t) {
    return this._client.delete(`/vector_stores/${e}`, {
      ...t,
      headers: { "OpenAI-Beta": "assistants=v2", ...t == null ? void 0 : t.headers }
    });
  }
}
class Cs extends Ie {
}
Mt.VectorStoresPage = Cs;
Mt.Files = Ps;
Mt.VectorStoreFilesPage = an;
Mt.FileBatches = Io;
class ht extends H {
  constructor() {
    super(...arguments), this.vectorStores = new Mt(this._client), this.chat = new cs(this._client), this.assistants = new ws(this._client), this.threads = new Dt(this._client);
  }
}
ht.VectorStores = Mt;
ht.VectorStoresPage = Cs;
ht.Assistants = ws;
ht.AssistantsPage = vs;
ht.Threads = Dt;
class jo extends H {
  create(e, t) {
    return this._client.post("/completions", { body: e, ...t, stream: e.stream ?? !1 });
  }
}
class Do extends H {
  /**
   * Creates an embedding vector representing the input text.
   */
  create(e, t) {
    return this._client.post("/embeddings", { body: e, ...t });
  }
}
class As extends H {
  /**
   * Upload a file that can be used across various endpoints. Individual files can be
   * up to 512 MB, and the size of all files uploaded by one organization can be up
   * to 100 GB.
   *
   * The Assistants API supports files up to 2 million tokens and of specific file
   * types. See the
   * [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools) for
   * details.
   *
   * The Fine-tuning API only supports `.jsonl` files. The input also has certain
   * required formats for fine-tuning
   * [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input) or
   * [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input)
   * models.
   *
   * The Batch API only supports `.jsonl` files up to 200 MB in size. The input also
   * has a specific required
   * [format](https://platform.openai.com/docs/api-reference/batch/request-input).
   *
   * Please [contact us](https://help.openai.com/) if you need to increase these
   * storage limits.
   */
  create(e, t) {
    return this._client.post("/files", $t({ body: e, ...t }));
  }
  /**
   * Returns information about a specific file.
   */
  retrieve(e, t) {
    return this._client.get(`/files/${e}`, t);
  }
  list(e = {}, t) {
    return _e(e) ? this.list({}, e) : this._client.getAPIList("/files", Ts, { query: e, ...t });
  }
  /**
   * Delete a file.
   */
  del(e, t) {
    return this._client.delete(`/files/${e}`, t);
  }
  /**
   * Returns the contents of the specified file.
   */
  content(e, t) {
    return this._client.get(`/files/${e}/content`, { ...t, __binaryResponse: !0 });
  }
  /**
   * Returns the contents of the specified file.
   *
   * @deprecated The `.content()` method should be used instead
   */
  retrieveContent(e, t) {
    return this._client.get(`/files/${e}/content`, {
      ...t,
      headers: { Accept: "application/json", ...t == null ? void 0 : t.headers }
    });
  }
  /**
   * Waits for the given file to be processed, default timeout is 30 mins.
   */
  async waitForProcessing(e, { pollInterval: t = 5e3, maxWait: r = 30 * 60 * 1e3 } = {}) {
    const s = /* @__PURE__ */ new Set(["processed", "error", "deleted"]), i = Date.now();
    let a = await this.retrieve(e);
    for (; !a.status || !s.has(a.status); )
      if (await ur(t), a = await this.retrieve(e), Date.now() - i > r)
        throw new gs({
          message: `Giving up on waiting for file ${e} to finish processing after ${r} milliseconds.`
        });
    return a;
  }
}
class Ts extends Ie {
}
As.FileObjectsPage = Ts;
class Rs extends H {
  list(e, t = {}, r) {
    return _e(t) ? this.list(e, {}, t) : this._client.getAPIList(`/fine_tuning/jobs/${e}/checkpoints`, $s, { query: t, ...r });
  }
}
class $s extends Ie {
}
Rs.FineTuningJobCheckpointsPage = $s;
class Nt extends H {
  constructor() {
    super(...arguments), this.checkpoints = new Rs(this._client);
  }
  /**
   * Creates a fine-tuning job which begins the process of creating a new model from
   * a given dataset.
   *
   * Response includes details of the enqueued job including job status and the name
   * of the fine-tuned models once complete.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
   */
  create(e, t) {
    return this._client.post("/fine_tuning/jobs", { body: e, ...t });
  }
  /**
   * Get info about a fine-tuning job.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
   */
  retrieve(e, t) {
    return this._client.get(`/fine_tuning/jobs/${e}`, t);
  }
  list(e = {}, t) {
    return _e(e) ? this.list({}, e) : this._client.getAPIList("/fine_tuning/jobs", Is, { query: e, ...t });
  }
  /**
   * Immediately cancel a fine-tune job.
   */
  cancel(e, t) {
    return this._client.post(`/fine_tuning/jobs/${e}/cancel`, t);
  }
  listEvents(e, t = {}, r) {
    return _e(t) ? this.listEvents(e, {}, t) : this._client.getAPIList(`/fine_tuning/jobs/${e}/events`, js, {
      query: t,
      ...r
    });
  }
}
class Is extends Ie {
}
class js extends Ie {
}
Nt.FineTuningJobsPage = Is;
Nt.FineTuningJobEventsPage = js;
Nt.Checkpoints = Rs;
Nt.FineTuningJobCheckpointsPage = $s;
class mr extends H {
  constructor() {
    super(...arguments), this.jobs = new Nt(this._client);
  }
}
mr.Jobs = Nt;
mr.FineTuningJobsPage = Is;
mr.FineTuningJobEventsPage = js;
class Mo extends H {
  /**
   * Creates a variation of a given image.
   */
  createVariation(e, t) {
    return this._client.post("/images/variations", $t({ body: e, ...t }));
  }
  /**
   * Creates an edited or extended image given an original image and a prompt.
   */
  edit(e, t) {
    return this._client.post("/images/edits", $t({ body: e, ...t }));
  }
  /**
   * Creates an image given a prompt.
   */
  generate(e, t) {
    return this._client.post("/images/generations", { body: e, ...t });
  }
}
class Ds extends H {
  /**
   * Retrieves a model instance, providing basic information about the model such as
   * the owner and permissioning.
   */
  retrieve(e, t) {
    return this._client.get(`/models/${e}`, t);
  }
  /**
   * Lists the currently available models, and provides basic information about each
   * one such as the owner and availability.
   */
  list(e) {
    return this._client.getAPIList("/models", Ms, e);
  }
  /**
   * Delete a fine-tuned model. You must have the Owner role in your organization to
   * delete a model.
   */
  del(e, t) {
    return this._client.delete(`/models/${e}`, t);
  }
}
class Ms extends _f {
}
Ds.ModelsPage = Ms;
class No extends H {
  /**
   * Classifies if text and/or image inputs are potentially harmful. Learn more in
   * the [moderation guide](https://platform.openai.com/docs/guides/moderation).
   */
  create(e, t) {
    return this._client.post("/moderations", { body: e, ...t });
  }
}
class Lo extends H {
  /**
   * Adds a
   * [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object.
   * A Part represents a chunk of bytes from the file you are trying to upload.
   *
   * Each Part can be at most 64 MB, and you can add Parts until you hit the Upload
   * maximum of 8 GB.
   *
   * It is possible to add multiple Parts in parallel. You can decide the intended
   * order of the Parts when you
   * [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).
   */
  create(e, t, r) {
    return this._client.post(`/uploads/${e}/parts`, $t({ body: t, ...r }));
  }
}
class Ns extends H {
  constructor() {
    super(...arguments), this.parts = new Lo(this._client);
  }
  /**
   * Creates an intermediate
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object
   * that you can add
   * [Parts](https://platform.openai.com/docs/api-reference/uploads/part-object) to.
   * Currently, an Upload can accept at most 8 GB in total and expires after an hour
   * after you create it.
   *
   * Once you complete the Upload, we will create a
   * [File](https://platform.openai.com/docs/api-reference/files/object) object that
   * contains all the parts you uploaded. This File is usable in the rest of our
   * platform as a regular File object.
   *
   * For certain `purpose`s, the correct `mime_type` must be specified. Please refer
   * to documentation for the supported MIME types for your use case:
   *
   * - [Assistants](https://platform.openai.com/docs/assistants/tools/file-search#supported-files)
   *
   * For guidance on the proper filename extensions for each purpose, please follow
   * the documentation on
   * [creating a File](https://platform.openai.com/docs/api-reference/files/create).
   */
  create(e, t) {
    return this._client.post("/uploads", { body: e, ...t });
  }
  /**
   * Cancels the Upload. No Parts may be added after an Upload is cancelled.
   */
  cancel(e, t) {
    return this._client.post(`/uploads/${e}/cancel`, t);
  }
  /**
   * Completes the
   * [Upload](https://platform.openai.com/docs/api-reference/uploads/object).
   *
   * Within the returned Upload object, there is a nested
   * [File](https://platform.openai.com/docs/api-reference/files/object) object that
   * is ready to use in the rest of the platform.
   *
   * You can specify the order of the Parts by passing in an ordered list of the Part
   * IDs.
   *
   * The number of bytes uploaded upon completion must match the number of bytes
   * initially specified when creating the Upload object. No Parts may be added after
   * an Upload is completed.
   */
  complete(e, t, r) {
    return this._client.post(`/uploads/${e}/complete`, { body: t, ...r });
  }
}
Ns.Parts = Lo;
var Fo;
class F extends nf {
  /**
   * API Client for interfacing with the OpenAI API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? undefined]
   * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
   * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
   * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor({ baseURL: e = Cr("OPENAI_BASE_URL"), apiKey: t = Cr("OPENAI_API_KEY"), organization: r = Cr("OPENAI_ORG_ID") ?? null, project: s = Cr("OPENAI_PROJECT_ID") ?? null, ...i } = {}) {
    if (t === void 0)
      throw new M("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
    const a = {
      apiKey: t,
      organization: r,
      project: s,
      ...i,
      baseURL: e || "https://api.openai.com/v1"
    };
    if (!a.dangerouslyAllowBrowser && gf())
      throw new M(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
`);
    super({
      baseURL: a.baseURL,
      timeout: a.timeout ?? 6e5,
      httpAgent: a.httpAgent,
      maxRetries: a.maxRetries,
      fetch: a.fetch
    }), this.completions = new jo(this), this.chat = new ps(this), this.embeddings = new Do(this), this.files = new As(this), this.images = new Mo(this), this.audio = new hr(this), this.moderations = new No(this), this.models = new Ds(this), this.fineTuning = new mr(this), this.beta = new ht(this), this.batches = new _s(this), this.uploads = new Ns(this), this._options = a, this.apiKey = t, this.organization = r, this.project = s;
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  defaultHeaders(e) {
    return {
      ...super.defaultHeaders(e),
      "OpenAI-Organization": this.organization,
      "OpenAI-Project": this.project,
      ...this._options.defaultHeaders
    };
  }
  authHeaders(e) {
    return { Authorization: `Bearer ${this.apiKey}` };
  }
  stringifyQuery(e) {
    return Ud(e, { arrayFormat: "brackets" });
  }
}
Fo = F;
F.OpenAI = Fo;
F.DEFAULT_TIMEOUT = 6e5;
F.OpenAIError = M;
F.APIError = ie;
F.APIConnectionError = rn;
F.APIConnectionTimeoutError = gs;
F.APIUserAbortError = Te;
F.NotFoundError = Ha;
F.ConflictError = Ja;
F.RateLimitError = za;
F.BadRequestError = Ba;
F.AuthenticationError = Wa;
F.InternalServerError = Ya;
F.PermissionDeniedError = qa;
F.UnprocessableEntityError = Va;
F.toFile = eo;
F.fileFromPath = Fa;
F.Completions = jo;
F.Chat = ps;
F.Embeddings = Do;
F.Files = As;
F.FileObjectsPage = Ts;
F.Images = Mo;
F.Audio = hr;
F.Moderations = No;
F.Models = Ds;
F.ModelsPage = Ms;
F.FineTuning = mr;
F.Beta = ht;
F.Batches = _s;
F.BatchesPage = ys;
F.Uploads = Ns;
var Tf = {};
new F({
  apiKey: Tf.OPENAI_API_KEY || ""
});
const Rf = async (n, e) => {
  try {
    const t = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: n,
        conversationId: e
      })
    });
    if (!t.ok)
      throw new Error("Failed to generate response");
    return (await t.json()).response;
  } catch (t) {
    return console.error("Error generating response:", t), "Sorry, I encountered an error while processing your request.";
  }
}, $f = Yh((n, e) => ({
  isLoading: !1,
  error: null,
  sendMessage: async (t, r) => {
    n({ isLoading: !0, error: null });
    try {
      console.log("Sending user message from widget:", t);
      const s = {
        conversation_id: r,
        content: t,
        sender_type: "user",
        user_id: null
      }, { error: i } = await Q.from("messages").insert(s);
      if (i) throw i;
      const { data: a, error: o } = await Q.from("conversations").select("live_mode").eq("id", r).single();
      if (o) throw o;
      if (a.live_mode)
        console.log("Live mode enabled, skipping OpenAI response");
      else {
        console.log("Live mode disabled, generating OpenAI response");
        try {
          const l = await Rf(t, r);
          console.log("Got OpenAI response:", l);
          const u = {
            conversation_id: r,
            content: l,
            sender_type: "bot",
            user_id: null
          }, { error: h } = await Q.from("messages").insert(u);
          if (h) throw h;
        } catch (l) {
          console.error("Error generating bot response:", l), xe.error("Failed to generate bot response");
        }
      }
      const { error: c } = await Q.from("conversations").update({ last_message_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", r);
      if (c) throw c;
    } catch (s) {
      console.error("Error sending message:", s), n({ error: s.message }), xe.error("Failed to send message");
    } finally {
      n({ isLoading: !1 });
    }
  }
})), Zi = "chatbot_session_id", If = 180;
function jf({ domainId: n }) {
  const [e, t] = Ee(!1), [r, s] = Ee(""), [i, a] = Ee([]), [o, c] = Ee([]), [l, u] = Ee("history"), [h, f] = Ee(null), [m, p] = Ee(!1), [g] = Ee(/* @__PURE__ */ new Set()), [_, T] = Ee(null), [w, S] = Ee(null), v = Zs(null), [E, k] = Ee(!1), x = Zs(null), { sendMessage: B } = $f();
  Fe(() => {
    if (!w) return;
    const P = Q.channel("new-conversations").on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "conversations",
        filter: `session_id=eq.${w}`
      },
      (O) => {
        O.eventType === "INSERT" && c((Y) => [O.new, ...Y]);
      }
    ).subscribe();
    return () => {
      P.unsubscribe();
    };
  }, [w]), Fe(() => {
    if (!w) return;
    const P = Q.channel("conversations-updates").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "conversations",
        filter: `session_id=eq.${w}`
      },
      (O) => {
        O.eventType === "UPDATE" && (c(
          (Y) => Y.map(
            (ue) => ue.id === O.new.id ? { ...ue, ...O.new } : ue
          )
        ), O.new.id === h && k(O.new.status === "archived"));
      }
    ).subscribe();
    return () => {
      P.unsubscribe();
    };
  }, [w, h]), Fe(() => {
    var P;
    (P = v.current) == null || P.scrollIntoView({ behavior: "smooth" });
  }, [i]);
  const U = async () => {
    if (w)
      try {
        const { data: P, error: O } = await Q.from("conversations").select("*").eq("session_id", w).order("last_message_at", { ascending: !1 });
        if (O) throw O;
        c(P || []);
      } catch (P) {
        console.error("Error loading conversation history:", P);
      }
  };
  Fe(() => {
    w && U();
  }, [w]);
  const $ = async () => {
    a([]), f(null), k(!1), u("chat");
  }, j = () => {
    u("history"), a([]), f(null), k(!1);
  }, de = async (P) => {
    try {
      f(P.id), k(P.status === "archived");
      const { data: O } = await Q.from("messages").select("*").eq("conversation_id", P.id).order("created_at", { ascending: !0 });
      O && (a(O), g.clear(), O.forEach((Y) => g.add(Y.id))), u("chat");
    } catch (O) {
      console.error("Error loading conversation:", O);
    }
  };
  Fe(() => {
    if (!h) return;
    const P = Q.channel(`conversation-status:${h}`).on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "conversations",
        filter: `id=eq.${h}`
      },
      (O) => {
        O.new.status === "archived" ? (k(!0), le()) : k(!1);
      }
    ).subscribe();
    return () => {
      P.unsubscribe();
    };
  }, [h]), Fe(() => {
    x.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3");
  }, []);
  const le = () => {
    x.current && (x.current.currentTime = 0, x.current.play().catch((P) => {
      console.log("Error playing notification:", P);
    }));
  };
  Fe(() => {
    if (!h) {
      console.log("No conversation ID yet, skipping subscription");
      return;
    }
    console.log("Setting up subscription for conversation:", h);
    const P = Q.channel("messages").on(
      "postgres_changes",
      {
        event: "*",
        // Listen to all events (INSERT, UPDATE, DELETE)
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${h}`
      },
      (O) => {
        if (console.log("Received real-time event:", O), O.eventType === "INSERT") {
          const Y = O.new;
          console.log("New message:", Y), a((ue) => g.has(Y.id) ? (console.log("Message already exists, skipping"), ue) : (g.add(Y.id), Y.sender_type === "bot" && e && le(), console.log("Adding new message to state"), [...ue, Y]));
        }
      }
    );
    return P.subscribe((O) => {
      console.log("Subscription status:", O), O === "SUBSCRIBED" ? console.log("Successfully subscribed to messages") : O === "CLOSED" ? console.log("Subscription closed") : O === "CHANNEL_ERROR" && console.error("Subscription error");
    }), () => {
      console.log("Cleaning up subscription for conversation:", h), P.unsubscribe();
    };
  }, [h, e]), Fe(() => {
    (async () => {
      let O = localStorage.getItem(Zi);
      O || (O = window.crypto.randomUUID(), localStorage.setItem(Zi, O)), S(O), await te(O);
    })();
  }, []);
  const te = async (P) => {
    try {
      const { data: O, error: Y } = await Q.from("conversations").select("*").eq("session_id", P).eq("status", "active").order("last_message_at", { ascending: !1 }).limit(1).single();
      if (Y) {
        if (Y.code === "PGRST116")
          return;
        throw Y;
      }
      const ue = /* @__PURE__ */ new Date();
      if (ue.setDate(ue.getDate() - If), new Date(O.last_message_at) < ue) {
        await Q.from("conversations").update({ status: "archived" }).eq("id", O.id);
        return;
      }
      f(O.id);
      const { data: gr } = await Q.from("messages").select("*").eq("conversation_id", O.id).order("created_at", { ascending: !0 });
      if (gr) {
        const on = gr.filter((mt) => g.has(mt.id) ? !1 : (g.add(mt.id), !0));
        a(on);
      }
    } catch (O) {
      console.error("Error loading existing conversation:", O), T("Failed to load conversation history");
    }
  }, ae = async () => {
    try {
      const { data: { user: P } } = await Q.auth.getUser();
      if (!P) {
        await Q.auth.signInAnonymously();
        const { data: { user: ue } } = await Q.auth.getUser();
        if (!ue) throw new Error("Failed to create anonymous session");
      }
      const { data: O, error: Y } = await Q.from("conversations").insert({
        domain_id: n,
        user_id: P.id,
        session_id: w,
        // Add the session_id
        last_message_at: (/* @__PURE__ */ new Date()).toISOString(),
        status: "active"
      }).select().single();
      if (Y) throw Y;
      return O.id;
    } catch (P) {
      throw console.error("Error creating conversation:", P), P;
    }
  }, Le = async (P) => {
    try {
      p(!0), T(null);
      const { data: { user: O } } = await Q.auth.getUser();
      O || await Q.auth.signInAnonymously();
      const Y = h || await ae();
      h || f(Y), await B(P, Y), s("");
    } catch (O) {
      console.error("Error sending message:", O), T("Failed to send message. Please try again.");
    } finally {
      p(!1);
    }
  }, He = async (P) => {
    P.preventDefault(), !(!r.trim() || m) && await Le(r.trim());
  };
  Fe(() => {
    n && (async () => {
      try {
        const { data: O } = await Q.from("domain_settings").select("*").eq("domain_id", n).single();
        dt(O ? {
          chatbotName: O.chatbot_name,
          greetingMessage: O.greeting_message || "Hello! How can I help you today?",
          color: O.primary_color || "#FF6B00",
          headerTextColor: O.header_text_color || "#000000"
        } : {
          chatbotName: "Friendly Assistant",
          greetingMessage: "Hello! How can I help you today?",
          color: "#FF6B00",
          headerTextColor: "#000000"
        });
      } catch (O) {
        console.error("Error fetching chatbot config:", O), dt({
          chatbotName: "Friendly Assistant",
          greetingMessage: "Hello! How can I help you today?",
          color: "#FF6B00",
          headerTextColor: "#000000"
        });
      }
    })();
  }, [n]);
  const [oe, dt] = Ee({
    chatbotName: "Chatbot",
    greetingMessage: "Hello! How can I help you today?",
    color: "#FF6B00",
    headerTextColor: "#000000"
  }), ft = {
    backgroundColor: oe.color
  };
  return /* @__PURE__ */ A.jsxs("div", { className: "fixed bottom-6 right-6 flex flex-col items-end z-[9999]", children: [
    e && /* @__PURE__ */ A.jsxs("div", { className: "mb-4 w-[380px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden", children: [
      /* @__PURE__ */ A.jsxs("div", { className: "p-4 border-b flex items-center gap-3", style: { backgroundColor: oe.color }, children: [
        /* @__PURE__ */ A.jsxs("div", { className: "relative flex-shrink-0", children: [
          /* @__PURE__ */ A.jsx("div", { className: "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center", children: /* @__PURE__ */ A.jsx("span", { className: "text-lg", children: "🤖" }) }),
          /* @__PURE__ */ A.jsx("div", { className: "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white", style: ft })
        ] }),
        /* @__PURE__ */ A.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ A.jsx("h3", { className: "font-medium", style: { color: oe.headerTextColor }, children: oe.chatbotName }),
          /* @__PURE__ */ A.jsxs("p", { className: "text-sm", style: { color: oe.headerTextColor }, children: [
            "from ",
            oe.chatbotName
          ] })
        ] }),
        l === "chat" && /* @__PURE__ */ A.jsxs(
          "button",
          {
            onClick: j,
            className: "flex items-center gap-1 px-3 py-1.5 bg-white/20 rounded-lg text-sm",
            style: { color: oe.headerTextColor },
            children: [
              /* @__PURE__ */ A.jsx(Ec, { className: "h-4 w-4" }),
              "History"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ A.jsx("div", { className: "h-[400px] overflow-y-auto p-4 bg-gray-50 relative", children: l === "history" ? /* @__PURE__ */ A.jsxs("div", { className: "space-y-4 h-full", children: [
        /* @__PURE__ */ A.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ A.jsx("h3", { className: "font-medium text-gray-900", children: "Conversation History" }),
          /* @__PURE__ */ A.jsxs(
            "button",
            {
              onClick: $,
              className: "flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600",
              children: [
                /* @__PURE__ */ A.jsx(Sc, { className: "h-4 w-4" }),
                "Start New Chat"
              ]
            }
          )
        ] }),
        o.map((P) => /* @__PURE__ */ A.jsxs(
          "button",
          {
            onClick: () => de(P),
            className: "w-full text-left p-4 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200",
            children: [
              /* @__PURE__ */ A.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                /* @__PURE__ */ A.jsx("span", { className: "text-sm font-medium text-gray-900", children: kr(new Date(P.created_at), "PPP") }),
                /* @__PURE__ */ A.jsx("span", { className: `text-xs px-2 py-1 rounded-full ${P.status === "archived" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-600"}`, children: P.status === "archived" ? "Archived" : "Active" })
              ] }),
              /* @__PURE__ */ A.jsxs("p", { className: "text-sm text-gray-600", children: [
                "Last message: ",
                kr(new Date(P.last_message_at), "p")
              ] })
            ]
          },
          P.id
        )),
        o.length === 0 && /* @__PURE__ */ A.jsx("div", { className: "flex flex-col items-center justify-center h-full text-center", children: /* @__PURE__ */ A.jsx("p", { className: "mb-4", children: "No previous conversations found" }) })
      ] }) : /* @__PURE__ */ A.jsxs("div", { className: "space-y-4", children: [
        l === "chat" && /* @__PURE__ */ A.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ A.jsx("div", { className: "w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center", children: "🤖" }),
          /* @__PURE__ */ A.jsxs("div", { className: "bg-white p-3 rounded-lg shadow-sm max-w-[80%]", children: [
            /* @__PURE__ */ A.jsx("p", { className: "text-sm", children: oe.greetingMessage }),
            /* @__PURE__ */ A.jsx("span", { className: "text-xs text-gray-500 mt-1 block", children: kr(/* @__PURE__ */ new Date(), "h:mm a") })
          ] })
        ] }),
        i.map((P) => /* @__PURE__ */ A.jsxs(
          "div",
          {
            className: `flex gap-2 ${P.sender_type === "user" ? "justify-end" : ""}`,
            children: [
              P.sender_type === "bot" && /* @__PURE__ */ A.jsx("div", { className: "w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center", children: "🤖" }),
              /* @__PURE__ */ A.jsxs(
                "div",
                {
                  className: `p-3 rounded-lg max-w-[80%] ${P.sender_type === "user" ? "bg-orange-500 text-white ml-auto" : "bg-white shadow-sm"}`,
                  children: [
                    /* @__PURE__ */ A.jsx("p", { className: "text-sm", children: P.content }),
                    /* @__PURE__ */ A.jsx("span", { className: `text-xs mt-1 block ${P.sender_type === "user" ? "text-orange-100" : "text-gray-500"}`, children: kr(new Date(P.created_at), "h:mm a") })
                  ]
                }
              ),
              P.sender_type === "user" && /* @__PURE__ */ A.jsx("div", { className: "w-8 h-8 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center", children: "👤" })
            ]
          },
          P.id
        )),
        E && /* @__PURE__ */ A.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ A.jsxs("div", { className: "bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-2 text-gray-600", children: [
          /* @__PURE__ */ A.jsx(bc, { className: "h-4 w-4" }),
          /* @__PURE__ */ A.jsx("span", { className: "text-sm", children: "This conversation has been archived" })
        ] }) }),
        /* @__PURE__ */ A.jsx("div", { ref: v })
      ] }) }),
      l === "chat" && /* @__PURE__ */ A.jsxs("form", { onSubmit: He, className: "p-4 border-t bg-white", children: [
        /* @__PURE__ */ A.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ A.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ A.jsx(
            "input",
            {
              type: "text",
              value: r,
              onChange: (P) => s(P.target.value),
              placeholder: "Type your message...",
              className: "w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 pr-10 disabled:opacity-50 disabled:cursor-not-allowed",
              style: { "--tw-ring-color": oe.color },
              disabled: m || E
            }
          ) }),
          /* @__PURE__ */ A.jsx(
            "button",
            {
              type: "submit",
              disabled: !r.trim() || m || E,
              className: "p-2 rounded-full text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
              style: ft,
              children: m ? /* @__PURE__ */ A.jsx("div", { className: "h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ A.jsx(xc, { className: "h-5 w-5" })
            }
          )
        ] }),
        /* @__PURE__ */ A.jsx("div", { className: "text-center mt-2", children: /* @__PURE__ */ A.jsx(
          "a",
          {
            href: "https://dashboard.ai",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-sm text-gray-600 hover:text-gray-700",
            children: "Powered by Dashboard.ai"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ A.jsx(
      "button",
      {
        className: "w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg",
        style: ft,
        onClick: () => t(!e),
        children: e ? "×" : "💬"
      }
    )
  ] });
}
function Df() {
  const n = document.createElement("div");
  n.id = "chatbot-widget-root", document.body.appendChild(n);
  const e = window.CHATBOT_CONFIG || {};
  Ln(n).render(/* @__PURE__ */ A.jsx(jf, { domainId: e.domainId }));
}
Df();
export {
  fc as g
};
//# sourceMappingURL=main-D4Q1tn7s.js.map
