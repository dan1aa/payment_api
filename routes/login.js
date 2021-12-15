const router = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const Error = require('../loggers/error.logger.js')

let errorLogger = new Error()

router.get('/login', (req, res) => {
  try {
      res.render('login', {
          title: 'Log in',
          cssFileName: 'login',
          error: req.flash('loginError')
      })
  }
  catch(e) {
      error.serverError(res, e)
  }
})


router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      // await loginSchema.validateAsync(username, password)
      const candidate = await User.findOne({
        name: username
      });
      if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password)
  
        if (areSame) {
          req.session.user = candidate;
          req.session.isAuth = true;
          req.session.save(e => {
            if(e) errorLogger.serverError(res, e)
            try {
              res.redirect('/')
            }
            catch(e) {
              errorLogger.serverError(res, e)
            }
          });
        } 
        else {
          req.flash('loginError', 'Incorrect name of password!')
          res.redirect('/login')
        }
      } 
      else {
        req.flash('loginError', 'Incorrect name of password!')
        res.redirect('/login')
      }
    } 
    catch (e) {
      errorLogger.serverError(res, e)
    }
  });
  
module.exports = router;