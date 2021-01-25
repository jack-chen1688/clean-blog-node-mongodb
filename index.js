const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const BlogPost = require('./models/BlogPost.js')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost/my_database',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

app.listen(3000, ()=> {
  console.log("App listening on port 3000")
})

app.get('/', async (req, res) => {
  // res.sendFile(__dirname +'/pages/index.html')
  const blogposts = await BlogPost.find({})
  res.render('index', {
    blogposts // This means blogposts:blogposts
  });
})

app.get('/about', (req, res) => {
  // res.sendFile(__dirname +'/pages/about.html')
  res.render('about')
})

app.get('/contact', (req, res) => {
  // res.sendFile(__dirname +'/pages/contact.html')
  res.render('contact');
})

app.get('/post', (req, res) => {
  // res.sendFile(__dirname +'/pages/post.html')
  res.render('post')
})

app.get('/posts/new', (req, res) => {
  // res.sendFile(__dirname +'/pages/post.html')
  res.render('create')
})

// app.post('/posts/store', (req, res) => {
//   BlogPost.create(req.body, (error, blogpost) => {
//     res.redirect('/')
//   })
// })

app.post('/posts/store', async (req, res) => {
  await BlogPost.create(req.body)
  res.redirect('/')
})
