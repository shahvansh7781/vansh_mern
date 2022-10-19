const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();

module.exports = () => {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie:{secure:true}
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};

