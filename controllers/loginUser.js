const bcrypt = require("bcrypt")
const User = require("../models/User")

module.exports = (req, res) => {
  const {username, password} = req.body;
  User.findOne({username: username}, (err, foundUser) => {
    if (foundUser) {
      bcrypt.compare(password, foundUser.password, (error, same) => {
        if (same) {
          req.session.userId = foundUser._id
          res.redirect('/')
        } else {
          res.redirect('/auth/login')
        }
      })
    } else {
      res.redirect('/auth/login')
    }
  })
}
