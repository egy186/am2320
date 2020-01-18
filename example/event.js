'use strict';

const am2320 = require('../index');

const BUS_NUMBER = 1;
const interval = 1000;

const emitter = am2320.event(BUS_NUMBER);

emitter.on('result', data => {
  console.log(JSON.parse(data));
});
emitter.on('error', err => {
  console.error(JSON.parse(err));
});

const intervalID = setInterval(() => {
  emitter.read();
}, interval);

setTimeout(async () => {
  clearInterval(intervalID);
  await emitter.end();
}, interval * 5);
