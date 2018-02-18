'use strict';

const Am2320 = require('../event');

const busNumber = 1;

const am2320 = new Am2320({
  busNumber,
  interval: 1000 // Ms
});

am2320.on('data', data => {
  console.log(data);
});
am2320.on('error', err => {
  console.error(err);
});
