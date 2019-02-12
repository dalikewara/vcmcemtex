"use strict";

const vcmcemtex = require('./app.js');

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
    data: [
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
    ]
  },
  footer: {
    record: { type: 'lpz', length: 1, value: '3' },
    totalData: { type: 'lpz', length: 11, countAllData: true },
    totalAmount: { type: 'lpz', length: 11, countFromDetail: 'testAmount' }
  }
}).then(cemtex => {
  console.log("'" + cemtex + "'");
});