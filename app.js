const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Wit, log } = require('node-wit');
const dotenv = require('dotenv');

// Cargamos las variables de entorno
dotenv.config();

const witAIClient = new Wit({
  accessToken: process.env.WIT_AI_ACCESS_TOKEN,
  logger: new log.Logger(log.DEBUG),
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, _res, next) => {
  req.wit = witAIClient;

  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
