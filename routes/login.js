const router = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const Error = require('../loggers/error.logger.js')

let errorLogger = new Error()

router.post("/login", async (req, res) => {
    try {
      console.log(req.session.isUserPay)
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
            try {
              res.redirect('/')
            }
            catch(e) {
              errorLogger.serverError(res, e)
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
      errorLogger.serverError(res, e)
    }
  });
  
module.exports = router;