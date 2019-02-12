[![npm package](https://nodei.co/npm/vcmpad.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vcmpad/)

[![version](https://img.shields.io/npm/v/vcmpad.svg?style=flat)](https://img.shields.io/npm/v/vcmpad.svg?style=flat)
[![build](https://img.shields.io/circleci/project/github/dalikewara/vcmpad.svg?style=flat)](https://img.shields.io/circleci/project/github/dalikewara/vcmpad.svg?style=flat)
[![language](https://img.shields.io/github/languages/top/dalikewara/vcmpad.svg?style=flat)](https://img.shields.io/github/languages/top/dalikewara/vcmpad.svg?style=flat)
[![download](https://img.shields.io/npm/dt/vcmpad.svg?style=flat)](https://img.shields.io/npm/dt/vcmpad.svg?style=flat)
[![dependents](https://img.shields.io/librariesio/dependents/npm/vcmpad.svg?style=flat)](https://img.shields.io/librariesio/dependents/npm/vcmpad.svg?style=flat)
[![issue](https://img.shields.io/github/issues/dalikewara/vcmpad.svg?style=flat)](https://img.shields.io/github/issues/dalikewara/vcmpad.svg?style=flat)
[![last_commit](https://img.shields.io/github/last-commit/dalikewara/vcmpad.svg?style=flat)](https://img.shields.io/github/last-commit/dalikewara/vcmpad.svg?style=flat)
[![license](https://img.shields.io/npm/l/vcmpad.svg?style=flat)](https://img.shields.io/npm/l/vcmpad.svg?style=flat)

# Fast, lightweight, and customable string padding generator
String padding generator with custom Left/Right-Padding style. It allows you to generate string padding format such as LPS *(Left Padding Space)*, LPZ *(Left Padding Zero)*, RPS *(Right Padding Space)*, and RPZ *(Right Padding Zero)*&mdash;or even you can create your own custom format.

### Installation
NPM

```console
npm install vcmpad --save
```

Browser

```js
// Bower
bower install vcmpad --save
```

### Initialization
NPM

```js
const vcmpad = require('vcmpad');
```

Browser

```js
// Bower
<script src="bower_components/vcmpad/dist/vcmpad.min.js"></script>
```

# Quickstart
There are two basic functions (`vcmpad.left` and `vcmpad.right`) to create String-Padding format using `vcmpad`, and they're absolutelly easy to use.

```js
vcmpad.left(n, val, format[optional], direction[optional]);
```

- Arguments
  - *string|integer* **n**
  - *string|integer* **val**
  - *string|integer* **format** [optional]
    - *default* space | ' '
  - *boolean* **direction** [optional]
    - *default* true
    - only takes effect if `val.length > n`.
    - if *false*, return last `n.length` characters.

### Left-Padding
A simple LPS format can be done like this:

```js
var str = vcmpad.left(10, 'test');

console.log(str); // output '      test'
```

Next, you may try to make other Left-Padding combinations, for example:

```js
vcmpad.left(10, 'test', '0'); // output '000000test'

vcmpad.left(10, 'test', 'left'); // output 'leftleftle'

vcmpad.left(10, 'test', 'left', false); // output 'ftlefttest'

vcmpad.left(10, 'test1234567890'); // output 'test123456'
```

### Right-Padding
A simple RPS format can be done like this:

```js
var str = vcmpad.right(10, 'test');

console.log(str); // output 'test      '
```

Next, you may try to make other Right-Padding combinations, for example:

```js
vcmpad.right(10, 'test', '0'); // output 'test000000'

vcmpad.right(10, 'test', 'right'); // output 'testrightr'

vcmpad.right(10, 'test', 'right', false); // output 'rightright'

vcmpad.right(10, 'test1234567890'); // output 'test123456'
```

### Direction
The `direction` argument gives you option where string position should be returned if length of result or value higger than the number of `n` argument&mdash;basicly, it is first `n length` characters or last `n length` charatecrs.

```js
vcmpad.left(10, 'test1234567890'); // output 'test123456'

vcmpad.left(10, 'test1234567890', false); // output '1234567890'

vcmpad.left(10, 'test', 'left'); // output 'leftleftle'

vcmpad.left(10, 'test', 'left', false); // output 'ftlefttest'
```

# Release

### Changelog
See [https://github.com/dalikewara/vcmpad/blob/master/CHANGELOG.md](https://github.com/dalikewara/vcmpad/blob/master/CHANGELOG.md).

### Credits
Copyright &copy; 2019 [Dali Kewara](https://www.dalikewara.com).

### License
[MIT License](https://github.com/dalikewara/vcmpad/blob/master/LICENSE)