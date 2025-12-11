const express = require('express');
const app = express();
const userAuthRouter = require('../src/routes/userAuth.route');
const aiRouter = require('../src/routes/ai.route');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userAuthRouter);
app.use('/ai', aiRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


module.exports = app