const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
  // res.sendFile(__dirname +'/pages/index.html')
  const blogposts = await BlogPost.find({})
  res.render('index', {
    blogposts // This means blogposts:blogposts
  });
}
