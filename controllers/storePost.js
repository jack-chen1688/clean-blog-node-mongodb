const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
  let image = req.files.image;
  // console.log(image)
  image.mv(__dirname + '/public/img/' + image.name, async (err) => {
    await BlogPost.create({
      ...req.body,
      image: '/img/' + image.name
    })
    res.redirect('/')
  })
}
