var express = require('express')
var mongoose = require('mongoose')
var exhbs = require('express-handlebars')
var Handlebars = require('handlebars')
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()
const bodyParser = require('body-parser')
const express_session = require('express-session')
const MongoStore = require('connect-mongodb-session')(express_session)
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI

const authMiddleware = require('./middlewares/auth.js')

const mainRoute = require('./routes/main')
const checkoutRoute = require('./routes/checkout')
const successRoute = require('./routes/success')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')

var app = express()

const hbs = exhbs.create({
    defaultLayout: 'mainLayout',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.use(express_session({
    secret: process.env.SECRET_SESSION_VALUE,
    resave: false,
    saveUninitialized: true,
    store
}))

app.use(mainRoute)
app.use(checkoutRoute)
app.use(successRoute)
app.use(loginRoute)
app.use(registerRoute)

app.use(authMiddleware)

app.use(express.urlencoded({extended: true}))

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })


        app.listen(PORT, 
            () => console.log(`server is running on ${PORT}`)
        )
    }

    catch(e) {
        throw new Error(e)
    }
    
}

start()