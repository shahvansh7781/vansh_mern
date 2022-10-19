const passport = require('passport');
const User = require('../models/userModel');

module.exports = () => {
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
}

// module.exports = passAuth;