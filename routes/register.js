const router = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')


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
      req.session.save((err) => {
        if (err) {throw new Error(e)}
        else {
          console.log('session loaded')
        }
      })

      await user.save();
      res.redirect(`/`);
    }
  }
  catch(e) {
    throw new Error(e)
  }
});

module.exports = router;