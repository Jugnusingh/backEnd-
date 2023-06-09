const express = require("express")
const router = express.Router()

const requiresLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    } else {
      return res.redirect('/login');
    }
  };
  
  module.exports = requiresLogin;
  