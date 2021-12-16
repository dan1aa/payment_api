const router = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const Error = require('../loggers/error.logger.js')
const { body, validationResult } = require('express-validator')

let errorLogger = new Error()

router.get('/register', (req, res) => {
  try {
    res.render('register', {
      title: 'Register',
      cssFileName: 'register',
      error: req.flash('registerError')
    })
  }
  catch (e) {
    errorLogger.serverError(res, e)
  }
})

router.post("/register",
  body('username').isLength({min: 3, max: 100}).isString().notEmpty().escape().trim(),
  body('password').isLength({ min: 8, max: 100 }).notEmpty().escape().trim(),
  body('email').isEmail().normalizeEmail().notEmpty().escape().trim(),
  async (req, res) => {

  try {
    const { username, password, repeat_password, email } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


    const nameCandidate = await User.findOne({ name: username })
    const emailCandidate = await User.findOne({ email })

    console.log(nameCandidate, emailCandidate)

    if (nameCandidate || emailCandidate) {
      req.flash('registerError', 'User already exist!')
      res.redirect('/register')
    }
    else {
      if (password !== repeat_password) {
        req.flash('registerError', 'Passwords don`t match!')
        res.redirect('/register')
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: username,
        password: hashPassword,
        email: email,
      });

      req.session.user = user;
      req.session.isAuth = true;
      req.session.save(e => {
        if (e) errorLogger.serverError(res, e)
      })

      await user.save();
      res.redirect(`/`);
    }
  }
  catch (e) {
    errorLogger.serverError(res, e)
  }
});


module.exports = router;