'use strict';

const i2c = require('i2c-bus');
const getData = require('./get-data');

const read = (busNumber, callback) => new Promise((resolve, reject) => {
  const bus = i2c.openSync(busNumber);
  getData(bus, (err, data) => {
    if (typeof callback === 'function') {
      callback(err, data);
    }
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
    bus.closeSync();
  });
});

module.exports = read;
