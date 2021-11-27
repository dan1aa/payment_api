const router = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const Error = require('../loggers/error')

let error = new Error()

router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({
        name: username
      });
      if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password)
  
        if (areSame) {
          req.session.user = candidate;
          req.session.isAuth = true;
          req.session.save((e) => {
            if (e) error.error(res, e)
            else {
              res.redirect("/");
            }
          });
        } else {
          console.log("Login error");
        }
      } else {
        console.log("Login error");
      }
    } 
    catch (e) {
      error.error(res, e)
    }
  });
  
module.exports = router;