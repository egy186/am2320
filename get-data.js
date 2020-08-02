'use strict';

const addrs = require('./addresses');
const crc = require('crc');

const sleep = msec => new Promise(resolve => {
  setTimeout(resolve, msec);
});

const HEAD_COUNT = 0x02;
const READ_COUNT = 0x04;
const CRC_COUNT = 0x02;
const readLength = HEAD_COUNT + READ_COUNT + CRC_COUNT;

const getData = async bus => {
  await bus.scan(addrs.ADDR);
  await sleep(5);
  const writeBuffer = Buffer.from([
    addrs.READ_FUNC,
    addrs.H_HUMID,
    READ_COUNT
  ]);
  await bus.i2cWrite(addrs.ADDR, writeBuffer.length, writeBuffer);
  await sleep(5);
  const { buffer } = await bus.i2cRead(addrs.ADDR, readLength, Buffer.alloc(readLength));
  if (buffer.readUInt16LE(readLength - CRC_COUNT) !== crc.crc16modbus(buffer.slice(0, readLength - CRC_COUNT))) {
    throw new Error('CRC Error');
  }
  const data = {
    datetime: new Date(),
    humidity: buffer.readUInt16BE(HEAD_COUNT + addrs.H_HUMID) / 10,
    temperature: buffer.readUInt16BE(HEAD_COUNT + addrs.H_TEMP) / 10
  };
  return data;
};

module.exports = getData;
