const router = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

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
          req.session.save((err) => {
            if (err) throw err;
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
      throw new Error(e)
    }
  });
  
module.exports = router;