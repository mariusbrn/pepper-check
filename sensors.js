const rpio = require('rpio');

exports.init = function init() {
  console.log('Init sensors...');
  rpio.open(11, rpio.INPUT);
};

exports.check = function check() {
  return { pin11: rpio.read(11) };
};
