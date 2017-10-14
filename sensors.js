const rpio = require('rpio');
const Mcp3008 = require('mcp3008.js');

const channel = 5;

let adc;

exports.init = function init() {
  console.log('Init sensors...');
  rpio.spiBegin();
  adc = new Mcp3008();
};

exports.check = function check() {
  adc.read(channel, value => {
    console.log('ADC check', value);
  });
  return 0;
};
