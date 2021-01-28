const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const BlogPost = require('./models/BlogPost')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const validateMiddleWare = require('./controllers/validateMiddleWare')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)

mongoose.connect('mongodb://localhost/my_database',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(3000, ()=> {
  console.log("App listening on port 3000")
})

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
