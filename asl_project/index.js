const { request, response } = require('express')
const express = require('express')
const app = express()
const { Quiz } = require('./src/models')
const { Question } = require('./src/models')
const quizzesCtrl = require('./src/controllers/quizzes')
const questionsCtrl = require('./src/controllers/questions')
const choicesCtrl = require('./src/controllers/choices')
const authCtrl = require('./src/controllers/auth')
const bodyParser = require('body-parser')
const session = require('express-session')
app.use(session({
    saveUninitialized: false,
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
}))

app.set(bodyParser.urlencoded({ extended: false }))
app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')

app.use(express.static('public'))
// //GET / http/1.1

app.get('/',(request, response, next) => { 
    console.log(request.session.access_token)
    response.render('home/home')})
//     //response.send('Home Page!')
// })
// app.get('/', async (request, response) => {
//     const quest = await Question.findByPk()
//     response.render('home/home', {quest})
//     //response.send('Home Page!')
// })

app.use('/quizzes', quizzesCtrl)
app.use('/questions', questionsCtrl)
app.use('/choices', choicesCtrl)
app.use('/auth', authCtrl)



app.listen(3000)


//NOTES
// app.post('/', (request,response) => {
//     response.send('Home Page! POST...')
// })

// GET /products/nike-large-white-shoe HTTP/1.1
// app.get('/products', (request,response) => {
//     response.send('All products...')
// })

// app.post('/products', (request,response) => {
//     response.send('Created a new product...')
// })

// app.post('/products/:productName', (request,response) => {
//     response.send('Updated a product with an id of ' + request.params.productName)
// })

//ASSIGNMENT