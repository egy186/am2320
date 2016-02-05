'use strict';

const addrs = require('./addresses');
const async = require('async');
const crc = require('crc');

const length = 2 + addrs.READ_COUNT + 2;

const getData = (bus, callback) => {
  async.waterfall([
    cb => bus.scan(cb),
    (devices, cb) => setTimeout(cb, 5),
    cb => {
      const buffer = new Buffer([addrs.READ_FUNC, addrs.H_HUMID, addrs.READ_COUNT]);
      bus.i2cWrite(addrs.ADDR, buffer.length, buffer, cb);
    },
    (bytesWritten, buffer, cb) => setTimeout(cb, 5),
    cb => bus.i2cRead(addrs.ADDR, length, new Buffer(length).fill(0), cb),
    (bytesRead, buffer, cb) => {
      if ((buffer[length - 1] << 8) + buffer[length - 2] !== crc.crc16modbus(buffer.slice(0, length - 2))) {
        cb(new Error('CRC Error'));
        return;
      }
      const data = {
        datetime: new Date(),
        humidity: ((buffer[addrs.H_HUMID + 2] << 8) + buffer[addrs.L_HUMID + 2]) / 10,
        temperature: ((buffer[addrs.H_TEMP + 2] << 8) + buffer[addrs.L_TEMP + 2]) / 10
      };
      cb(null, data);
    }
  ], callback);
};

module.exports = getData;
