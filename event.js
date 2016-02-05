'use strict';

const EventEmitter = require('events');
const getData = require('./get-data');
const i2c = require('i2c-bus');

const Sensor = class extends EventEmitter {
  constructor (options) {
    super();
    const bus = i2c.openSync(options.busNumber);
    const interval = Number.isFinite(options.interval) ? options.interval : 1000;
    const intervalID = setInterval(() => {
      getData(bus, (err, data) => {
        if (err) {
          this.emit('error', err);
        } else {
          this.emit('data', `${JSON.stringify(data)}\n`);
        }
      });
    }, interval);
    process.on('SIGINT', () => {
      clearInterval(intervalID);
      bus.closeSync();
    });
  }
};

module.exports = Sensor;
