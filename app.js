const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const fileUpload = require('express-fileupload')
const flash = require('connect-flash')

const BlogPost = require('./models/BlogPost')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const validateMiddleware = require('./middleware/validateMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

global.loggedIn = null;


app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use(flash())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store', validateMiddleware)
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId
  next()
})


// mongoose.connect('mongodb://localhost/my_database',{
//     useNewUrlParser: true,
//     // Below two options are added to avoid two warnings
//     // https://stackoverflow.com/questions/28839532/node-js-session-error-express-session-deprecated
//     useUnifiedTopology: true,
//     useCreateIndex:true
// })

mongoose.connect('mongodb+srv://xuehua:Test123@cluster0.wcfjv.mongodb.net/my_database?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex:true
});

let port = process.env.PORT

if (port == null || port == "") {
  port = 3000
}
app.listen(port, ()=> {
  console.log("App listening on port " + port.toString())
})

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', authMiddleware, newPostController)
// app.get('/posts/new', newPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req,res) => res.render('notfound'))
