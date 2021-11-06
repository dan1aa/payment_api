var express = require('express')
var mongoose = require('mongoose')
var exhbs = require('express-handlebars')
var Handlebars = require('handlebars')
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI
const mainRoute = require('./routes/main')

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

app.use(mainRoute)

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