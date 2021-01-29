module.exports = (req, res) => {
  if (req.session.userId) {
    res.render('create')
  } else {
    res.render('login')
  }
}

// console.log(module)
