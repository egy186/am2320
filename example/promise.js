'use strict';

const am2320 = require('../index');

const busNumber = 1;

am2320(busNumber).then(data => {
  console.log(data);
}, err => {
  console.error(err);
});
