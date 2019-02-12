(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vcmloop = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/**
 * @x number required - start number from
 * @n number required - stop number
 * @fn function required - looping callback
 * @end function optional - executed while synchronous looping ended
 * @delay number optional - the delay number of interval funtion
 */
module.exports = function (x, n, fn, end, delay) {
  var task = setInterval(function () {
    if (x < n) return fn(x++);

    clearInterval(task);

    if (end) end();
  }, Number(delay) || 0);
};
},{}]},{},[1])(1)
});
