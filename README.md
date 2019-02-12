[![npm package](https://nodei.co/npm/vcmcemtex.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vcmcemtex/)

[![version](https://img.shields.io/npm/v/vcmcemtex.svg?style=flat)](https://img.shields.io/npm/v/vcmcemtex.svg?style=flat)
[![build](https://img.shields.io/circleci/project/github/dalikewara/vcmcemtex.svg?style=flat)](https://img.shields.io/circleci/project/github/dalikewara/vcmcemtex.svg?style=flat)
[![language](https://img.shields.io/github/languages/top/dalikewara/vcmcemtex.svg?style=flat)](https://img.shields.io/github/languages/top/dalikewara/vcmcemtex.svg?style=flat)
[![download](https://img.shields.io/npm/dt/vcmcemtex.svg?style=flat)](https://img.shields.io/npm/dt/vcmcemtex.svg?style=flat)
[![dependents](https://img.shields.io/librariesio/dependents/npm/vcmcemtex.svg?style=flat)](https://img.shields.io/librariesio/dependents/npm/vcmcemtex.svg?style=flat)
[![issue](https://img.shields.io/github/issues/dalikewara/vcmcemtex.svg?style=flat)](https://img.shields.io/github/issues/dalikewara/vcmcemtex.svg?style=flat)
[![last_commit](https://img.shields.io/github/last-commit/dalikewara/vcmcemtex.svg?style=flat)](https://img.shields.io/github/last-commit/dalikewara/vcmcemtex.svg?style=flat)
[![license](https://img.shields.io/npm/l/vcmcemtex.svg?style=flat)](https://img.shields.io/npm/l/vcmcemtex.svg?style=flat)

# An universal & customable cemtext generator for batch transactions
`Cemtext` file format is a format used by banks to allow for batch transactions. Some bank have adopted this format by default, but each others can have a different format style. This module allows you to create a cemtext format by your own style&mdash;that means you can use it to meet your bank cemtext requirements. This module is fast, easy to understand, and more humanable.

### Installation
NPM

```console
npm install vcmcemtex --save
```

Browser

```js
// Bower
bower install vcmcemtex --save
```

### Initialization
NPM

```js
const vcmcemtex = require('vcmcemtex');
```

Browser

```js
// Bower
<script src="bower_components/vcmcemtex/dist/vcmcemtex.min.js"></script>
```

# Quickstart

```js
vcmcemtex(params, options[optional]).then(cemtex => {
  console.log(cemtex);
});
```

- Arguments
  - *object* **params**
    - *object* **header** [optional]
    - *object* **detail** [optional]
      - *object* **keys**
      - *array* **data**
    - *object* **footer** [optional]
  - *object* **options** [optional]
    - *string* **charlen** [optional]
      - *default* 160
    - *boolean* **enter** [optional]
      - *default* false
      - If *true* will add `\n` (enter) at every end of string.

- Attributes
  - *string* **type**
    - *lps* | *lpz* | *rps* | *rpz*
    - *default* rps
    - LPS (*Left Padding Space*)
    - LPZ (*Left Padding Zero*)
    - RPS (*Right Padding Space*)
    - RPZ (*Right Padding Zero*)
  - *number* **length**
  - *string|integer* **value**
    - *default* ''
  - *string|integer* **default**
    - *default* ''
    - The default value to be used if there is no given value.
  - *string* **countFromDetail**
    - Use this if you want to count a number value from a key in params `detail`. You can see the usage on examples bellow.
    - Only works on `header` and `footer`.
  - *boolean* **countAllData**
    - *default* false
    - This will count all data in params `detail` and made it as a value.
    - Only works on `header` and `footer`.
  - *boolean* **removeDot**
    - *default* false
    - This will remove all dots.
  - *boolean* **removeSpace**
    - *default* false
    - This will remove all spaces.
  - *boolean* **decimal**
    - *default* true
    - This will convert float or decimal format to number.

Each successful generated row in a cemtext has length that equal to `charlen`&mdash;default is 160 characters. So it is 160 header length, 160 detail length (per 1 row), and 160 footer length. Example:

```js
// string | length 4
'char'
// string | length 8
'username'

// and the cemtext output will be like this (in single string/one row):

'charusername                                                                                                                                                    '
```

You can change default `charlen` value by passing an options in second argument.

A simple cemtext format can be done like this:

```js
vcmcemtex({
  header: {
    header1: { type: 'lps', length: 10, value: 'header' }
  },
  detail: {
    keys: {
      detail1: { type: 'lps', length: 10 }
    },
    data: [
      {
        detail1: 'detail'
      }
    ]
  },
  footer: {
    footer1: { type: 'lps', length: 10, value: 'footer' }
  }
}).then(cemtex => {
  console.log(cemtex);
});

// output
// '    header                                                                                                                                                          detail                                                                                                                                                          footer                                                                                                                                                      '
```

`params` object has 3 main keys; `header`, `detail`, and `footer`. You don't have to use them (optional), but it's always good to use them for best practice style.

If you prefer to use key `detail`, the key must have key `keys` and `data`. `keys` is an object, and the `data` must be an array object. The object keys between `keys` and `data` should be same, for example if `keys` has a key called `detail1`, then key `data` should contains a key called `detail1`&mdash;similliar to attribute `value` in `header` and `footer`.

You can see other examples bellow:

```js
var data = [
  {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    accountNumber: '123456789',
    testAmount: '12500'
  },
  {
    name: 'John Smith',
    username: 'johnsmith',
    email: 'johnsmith@email.com',
    accountNumber: '123456789',
    testAmount: '12500'
  },
  {
    name: 'John Adam',
  }
];

vcmcemtex({
  header: {
    record: { type: 'lps', length: 1, value: '1' },
    branch: { type: 'lpz', value: '1234' },
    name: { type: 'rps', value: 'HEADER NAME' },
    date: { type: 'lpz', value: '20190211' },
    test1: { type: 'rps', value: 'test1' },
    test2: { type: 'rps', value: 'test2' }
  },
  detail: {
    keys: {
      name: { type: 'rps', length: 10, default: '' },
      username: { type: 'rps', length: 10, default: '' },
      email: { type: 'rps', length: 20, default: '' },
      accountNumber: { type: 'lpz', length: 10, default: '' },
      testAmount: { type: 'lpz', length: 10, default: '' }
    },
    data: data
  },
  footer: {
    record: { type: 'lpz', length: 1, value: '3' },
    totalData: { type: 'lpz', length: 11, countAllData: true },
    totalAmount: { type: 'lpz', length: 11, countFromDetail: 'testAmount' }
  }
}, {
  charlen: 200
}).then(cemtex => {
  console.log(cemtex);
});

// output
// '11234HEADER NAME20190211test1test2                                                                                                                                                                      John Doe  johndoe   johndoe@email.com   01234567890000012500                                                                                                                                            John Smithjohnsmith johnsmith@email.com 01234567890000012500                                                                                                                                            John Adam                               00000000000000000000                                                                                                                                            30000000000300000025000                                                                                                                                                                                 '
```

Using an option `enter`:

```js
vcmcemtex({
  header: {
    testHeader: { type: 'lps', length: 1, value: '1' },
    branch: { type: 'lpz', value: '1234' },
    name: { type: 'rps', value: 'HEADER NAME' },
    date: { type: 'rpz', value: '20190211' },
    test1: { type: 'rps', value: 'test1' },
    test2: { type: 'rps', value: 'test2' }
  },
  footer: {
    thisIsFooter: { type: 'lps', length: 1, value: '3' },
    footer1: { type: 'lpz', value: '1000000' },
    footer2: { type: 'rps', value: '2000000' }
  }
}, {
  enter: true
}).then(cemtex => {
  console.log(cemtex);
});

// output
// 11234HEADER NAME20190211test1test2                                                                                                                              
// 310000002000000                                                                                                                                                 
```

# Release

### Changelog
See [https://github.com/dalikewara/vcmcemtex/blob/master/CHANGELOG.md](https://github.com/dalikewara/vcmcemtex/blob/master/CHANGELOG.md).

### Credits
Copyright &copy; 2019 [Dali Kewara](https://www.dalikewara.com).

### License
[MIT License](https://github.com/dalikewara/vcmcemtex/blob/master/LICENSE)