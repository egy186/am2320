'use strict';

const am2320 = require('../index');

const busNumber = 1;

// Promise or callback
am2320(busNumber, (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
});
