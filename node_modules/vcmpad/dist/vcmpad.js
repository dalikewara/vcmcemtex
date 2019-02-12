(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vcmpad = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/**
 * @n number required - max length
 * @val string|integer required - value used
 * @a string optional - char to be repeated
 * @b true|false optional - slicing direction
 */
exports.left = function (n, val, a, b) {
  val = (!val && val !== 0) ? '' : val + '';
  a = (!a && a !== 0) ? ' ' : String(a);
  b = (typeof b === 'boolean') ? b : true;
  var len = val.length;

  if (len == n) return val;
  if (len > n) return (b === true) ? val.slice(0, n) : val.slice(len - n, len);

  var str = a.repeat(n - len) + val;
  var strLen = str.length;

  return (strLen > n) ? ((b === true) ? str.slice(0, n) : str.slice(strLen - n, strLen)) : str.slice(strLen - n, strLen);
};

/**
 * @n number required - max length
 * @val string|integer required - value used
 * @a string optional - char to be repeated
 * @b true|false optional - slicing direction
 */
exports.right = function (n, val, a, b) {
  val = (!val && val !== 0) ? '' : val + '';
  a = (!a && a !== 0) ? ' ' : String(a);
  b = (typeof b === 'boolean') ? b : true;
  var len = val.length;

  if (len == n) return val;
  if (len > n) return (b === true) ? val.slice(0, n) : val.slice(len - n, len);

  var str = val + a.repeat(n - len);
  var strLen = str.length;
  
  return (strLen > n) ? ((b === true) ? str.slice(0, n) : str.slice(strLen - n, strLen)) : str.slice(0, n);
};
},{}]},{},[1])(1)
});
