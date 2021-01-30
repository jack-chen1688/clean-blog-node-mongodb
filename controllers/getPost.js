const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
  // res.sendFile(__dirname +'/pages/post.html')
  blogpost = await BlogPost.findById(req.params.id).populate('userid')
  res.render('post', {
    blogpost
  })
}
