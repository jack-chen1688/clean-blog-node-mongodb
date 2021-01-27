const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  username: String,
  datePosted: { /* Can declare property type with an object because we
                  need 'default' */
    type: Date,
    default: new Date(),
  },
  image: String,
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost
