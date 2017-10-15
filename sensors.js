const rpio = require('rpio');

function read(channel) {
  const sendBuffer = new Buffer([0x01, (8 + channel) << 4, 0x01]);
  const recieveBuffer = new Buffer(sendBuffer.length);

  // Send TX buffer and recieve RX buffer
  rpio.spiTransfer(sendBuffer, recieveBuffer, sendBuffer.length);

  // Extract value from output buffer. Ignore first byte.
  const [junk, MSB, LSB] = recieveBuffer;

  // Ignore first six bits of MSB, bit shift MSB 8 positions and
  // finally combine LSB and MSB to get a full 10 bit value
  const value = ((MSB & 3) << 8) + LSB;

  return value.toString();
}

function readPct(channel) {
  const value = read(channel);

  return `${100 - Math.round(value / 1023 * 100)}%`;
}

exports.init = function init() {
  console.log('Init sensors...');

  rpio.spiBegin();
  //rpio.spiChipSelect(0);                  /* Use CE0 (slave 0) */
  //rpio.spiSetCSPolarity(0, rpio.LOW);    /* Commonly chip enable (CE) pins are active low, and this is the default. */
  //rpio.spiSetClockDivider(256);           /* MCP3008 max is ~1MHz, 256 == 0.98MHz */
  //rpio.spiSetDataMode(0);
};

exports.check = function check() {
  return {
    channel5: readPct(5),
    channel6: readPct(6)
  };
};
