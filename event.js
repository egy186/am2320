'use strict';

const EventEmitter = require('events');
const getData = require('./get-data');
const i2c = require('i2c-bus');

const stringify = obj => `${JSON.stringify(obj)}\n`;

const Am2320Emitter = class extends EventEmitter {
  constructor (busNumber) {
    super();
    this.busPromise = i2c.openPromisified(busNumber);
  }

  async end () {
    const bus = await this.busPromise;
    await bus.close();
  }

  async read () {
    const bus = await this.busPromise;
    try {
      const data = await getData(bus);
      this.emit('result', stringify(data));
    } catch (err) {
      this.emit('error', stringify({
        message: err.message,
        name: err.name,
        stack: err.stack
      }));
    }
  }
};

const event = busNumber => {
  const emitter = new Am2320Emitter(busNumber);
  return emitter;
};

module.exports = event;
