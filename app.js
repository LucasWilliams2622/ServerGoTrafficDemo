let createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2/promise');
var indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const config = require('./config.json');
const session = require('express-session');
const Sequelize = require('sequelize');

<<<<<<< HEAD


dotenv.config();
let createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mysql = require("mysql2/promise");
var indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
const config = require("./config.json");
const session = require("express-session");
const { Sequelize, DataTypes } = require("sequelize");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const payOS = require("./utils/payos");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');



dotenv.config();
=======
>>>>>>> parent of 267efd9 (a)
initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database, dialect } = config.database;
  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host: host,
<<<<<<< HEAD
    dialect: dialect,
    dialect: dialect,
=======
    dialect: dialect
>>>>>>> parent of 267efd9 (a)
  });
  module.exports = db = {};

  // init models and add them to the exported db object

  await sequelize.sync({ alter: true });

  try {
    await sequelize.authenticate();
    console.log('===> Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


// API
<<<<<<< HEAD
let UserAPIRouter = require("./routes/api/UserAPI");
let CarBrandAPIRouter = require("./routes/api/CarBrandAPI");
let CarAPIRouter = require("./routes/api/CarAPI");
let BookingAPIRouter = require("./routes/api/BookingAPI");
let FavoriteCarAPIRouter = require("./routes/api/FavoriteCarAPI");
let ReviewAPIRouter = require("./routes/api/ReviewAPI");
let NotificationAPIRouter = require("./routes/api/NotificationAPI");
let NotificationBookingAPIRouter = require("./routes/api/NotificationBookingAPI");
let AddressAPIRouter = require("./routes/api/AddressAPI");
let PaymentAPIRouter = require("./routes/api/PaymentAPI");
let RevenueAPIRouter = require("./routes/api/RevenueAPI");

const db = require("./components/indexModel");
const { log } = require("console");
let UserAPIRouter = require("./routes/api/UserAPI");
let CarBrandAPIRouter = require("./routes/api/CarBrandAPI");
let CarAPIRouter = require("./routes/api/CarAPI");
let BookingAPIRouter = require("./routes/api/BookingAPI");
let FavoriteCarAPIRouter = require("./routes/api/FavoriteCarAPI");
let ReviewAPIRouter = require("./routes/api/ReviewAPI");
let NotificationAPIRouter = require("./routes/api/NotificationAPI");
let NotificationBookingAPIRouter = require("./routes/api/NotificationBookingAPI");
let AddressAPIRouter = require("./routes/api/AddressAPI");
let PaymentAPIRouter = require("./routes/api/PaymentAPI");
let RevenueAPIRouter = require("./routes/api/RevenueAPI");

const db = require("./components/indexModel");
const { log } = require("console");
=======
let UserAPIRouter = require('./routes/api/UserAPI')
>>>>>>> parent of 267efd9 (a)

// CPANEL


var app = express();

// view engine setup
<<<<<<< HEAD
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(
  session({
    secret: "iloveyou",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "iloveyou",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRouter);
// API
app.use("/", indexRouter);
// API
// http://localhost:3000/user/api
app.use("/user/api", UserAPIRouter);
app.use("/user/api", UserAPIRouter);
=======
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
// API 
// http://localhost:3000/user/api
app.use('/user/api', UserAPIRouter);
>>>>>>> parent of 267efd9 (a)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
<<<<<<< HEAD
  // set locals, only providing er~ror in development
  // set locals, only providing er~ror in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  res.render("error");
=======
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
>>>>>>> parent of 267efd9 (a)
});

module.exports = app;
