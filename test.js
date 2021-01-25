const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

BlogPost.create({
  title: "A test",
  body: 'A test blog'
}, async (error, blogpost) => {
  if (!error)
    console.log(blogpost)
})

BlogPost.find({}, async (err, blogpost) => {
  if (!err)
    console.log("find blogs: ", blogpost)
})
