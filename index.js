const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const pool = require("./database/database");
const session = require("express-session");
const flash = require("connect-flash");
// const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const env = require("dotenv").config();
const static = require("./routes/static");
const homeController = require("./controllers/homeController");
const connectController = require("./controllers/hireMeController")
const MongoStore = require("connect-mongo")
const dotenv = require("dotenv").config();
const homeRoutes = require("./routes/homeRoute")
const connectRoutes = require("./routes/connectRoute")

const app = express();

/* **************************************
 * Middleware
 ************************************** */
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout/layouts");
app.use(express.urlencoded({ extended: true }));

/* Flash Messages */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL, 
    ttl: 14 * 24 * 60 * 60 
  }),
  cookie: {
    secure: false, // set to true in production with HTTPS
    httpOnly: true
  }
}));

app.use(flash());


/* **************************************
 * Routes
 ************************************** */
app.use(static);
app.use(homeRoutes);
app.use(connectRoutes);

/* ****************************************
 * Local Server Information
 **************************************** */
const port = process.env.PORT || PORT;
const host = process.env.HOST || "localhost";

/* ****************************************
 * Confirm Server is Running
 **************************************** */
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});

/* ****************************************
 * Initialized database
 **************************************** */

pool.initDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
