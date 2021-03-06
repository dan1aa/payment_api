const express = require("express");
const mongoose = require("mongoose");
const exhbs = require("express-handlebars");
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const bodyParser = require("body-parser");
const paypal = require("paypal-rest-sdk");
const express_session = require("express-session");
const MongoStore = require("connect-mongodb-session")(express_session);
const flash = require('connect-flash')
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;

let app = express();

const authMiddleware = require("./middlewares/auth.js");

const mainRoute = require("./routes/main");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const logoutRoute = require("./routes/logout");
const payRoute = require('./routes/pay')
const apikeyRoute = require('./routes/apikey')
const dataRoute = require('./routes/data')
const faqRoute = require('./routes/faq')

const hbs = exhbs.create({
  defaultLayout: "mainLayout",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash())

app.use(express.static(path.join(__dirname, "public")));

app.set('json spaces', 2)


const store = new MongoStore({
  collection: "sessions",
  uri: MONGODB_URI,
});

app.use(
  express_session({
    secret: process.env.SECRET_SESSION_VALUE,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware);

app.use(mainRoute);
app.use(loginRoute);
app.use(registerRoute);
app.use(logoutRoute);
app.use(payRoute);
app.use(apikeyRoute);
app.use(dataRoute);
app.use(faqRoute);

paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_SECRET
});

app.get('*', (req, res) => {
  res.status(404).render('notfound', {
    title: 'Page not found!',
    message: 'Oops, page not found!'
  })
})

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  } catch (e) {
    error.databaseConnectionError(e)
  }
}

start();

module.exports = app;