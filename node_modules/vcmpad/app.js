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