const express = require('express');

const sensors = require('./sensors');

const app = express();

sensors.init();

app.get('/check', (req, res) => {
  res.send(sensors.check());
});

app.get('/', (req, res) => {
  res.send('Gardener Ready!');
});

app.listen(3000, () => {
  console.log('Pepper Check listening on port 3000!');
});
