const router = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const Error = require('../loggers/error')

let error = new Error()

router.post("/register", async (req, res) => {
  try {

    const { username, password, email } = req.body;

    const nameCandidate = await User.findOne({ name: username })
    const emailCandidate = await User.findOne({ email })

    if(nameCandidate || emailCandidate) {
      res.json({message: 'Already register'})
      res.redirect('/')
    }
    else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name: username,
        password: hashPassword,
        email: email,
      });

      req.session.user = user;
      req.session.isAuth = true;
      req.session.isUserPay = false;
      req.session.save((e) => {
        if (e) error.error(res, e)
        else {
          console.log('session loaded')
        }
      })

      await user.save();
      res.redirect(`/`);
    }
  }
  catch(e) {
    error.error(res, e)
  }
});

module.exports = router;