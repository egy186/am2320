'use strict';

const i2c = require('i2c-bus');
const getData = require('./get-data');

const read = async busNumber => {
  const bus = await i2c.openPromisified(busNumber);
  const data = await getData(bus);
  await bus.close();
  return data;
};

module.exports = read;
