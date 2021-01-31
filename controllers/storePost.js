const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
  let image = req.files.image;
  // console.log(image)
  console.log(req.session.userid)
  image.mv(__dirname + '/../public/img/' + image.name, async (err) => {
    console.log(err)
    await BlogPost.create({
      ...req.body,
      image: '/img/' + image.name,
      userid: req.session.userId
    })
    res.redirect('/')
  })
}
