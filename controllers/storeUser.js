const User = require("../models/User")


module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const validationErrors = Object.keys(error.errors).map(
        key => error.errors[key].message)
      // Writen to the flash
      req.flash('validationErrors', validationErrors)
      res.redirect('/auth/register')
    } else {
      res.redirect('/')
    }
  })
}
