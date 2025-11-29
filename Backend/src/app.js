const express = require('express');
const app = express();
const aiRouter = require('../src/routes/ai.route');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ai', aiRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


module.exports = app