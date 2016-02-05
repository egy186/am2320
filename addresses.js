'use strict';

const addresses = {
  ADDR: 0xB8 >> 1,
  H_HUMID: 0x00,
  L_HUMID: 0x01,
  H_TEMP: 0x02,
  L_TEMP: 0x03,
  READ_COUNT: 0x04,
  READ_FUNC: 0x03
};

module.exports = addresses;