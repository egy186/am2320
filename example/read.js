'use strict';

const am2320 = require('../index');

const BUS_NUMBER = 1;

am2320.read(BUS_NUMBER).then(data => {
  console.log(data);
}, err => {
  console.error(err);
});
