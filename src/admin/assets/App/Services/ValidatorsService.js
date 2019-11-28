﻿//< !--AUTHOR: Brawny Javier Mateo Reyes-- >
(function () {
    'use strict';
    angular
        .module('MicmApp')
        .factory('ValidatorsService', ValidatorsService);
    function ValidatorsService() {
        //luhn algorithm
        !function (e) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else { var n; n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, n.luhn = e() } }(function () { return function e(n, r, t) { function o(u, i) { if (!r[u]) { if (!n[u]) { var d = "function" == typeof require && require; if (!i && d) return d(u, !0); if (f) return f(u, !0); var l = new Error("Cannot find module '" + u + "'"); throw l.code = "MODULE_NOT_FOUND", l } var p = r[u] = { exports: {} }; n[u][0].call(p.exports, function (e) { var r = n[u][1][e]; return o(r ? r : e) }, p, p.exports, e, n, r, t) } return r[u].exports } for (var f = "function" == typeof require && require, u = 0; u < t.length; u++)o(t[u]); return o }({ 1: [function (e, n, r) { "use strict"; Object.defineProperty(r, "__esModule", { value: !0 }), r["default"] = function (e) { return function (n) { for (var r = n ? n.length : 0, t = 1, o = 0; r--;)o += (t ^= 1) ? e[n[r]] : parseInt(n[r], 10); return o % 10 === 0 && o > 0 } }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]), n.exports = r["default"] }, {}] }, {}, [1])(1) });

        const Validators = {
            luhn: (input) => luhn(input),
            isCedula: (input) => {
                const exceptions = ['00000000018', '11111111123', '00100759932', '00105606543', '00114272360', '00200123640', '00200409772', '00800106971', '01200004166', '01400074875', '01400000282', '03103749672', '03200066940', '03800032522', '03900192284', '04900026260', '05900072869', '07700009346', '00114532330', '03121982479', '40200700675', '40200639953', '00121581750', '00119161853', '22321581834', '00121581800', '09421581768', '22721581818', '90001200901', '00301200901', '40200452735', '40200401324', '10621581792'];
                // The input must be a string.
                if (typeof input !== 'string') return false;
                // Remove any character but digits.
                input = input.replace(/[^\d]/g, '');
                // The input must contains 11 digits.
                if (input.length !== 11) return false;
                // If the input is a match of one in the exception list, then it is valid.
                if (exceptions.indexOf(input) > -1)
                    return true;
                return Validators.luhn(input);
            },
            isEmail: (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        }
        console.log('Validators', Validators);
        return Validators;
    }
})();