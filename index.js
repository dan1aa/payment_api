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
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;

let app = express();

const authMiddleware = require("./middlewares/auth.js");
const apikeyMiddleware = require("./middlewares/apikey.js");

const Error = require('./loggers/error')

let error = new Error()

const mainRoute = require("./routes/main");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const logoutRoute = require("./routes/logout");
const payRoute = require('./routes/pay')

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

app.use(express.static(path.join(__dirname, "public")));

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
app.use(apikeyMiddleware);

app.use(mainRoute);
app.use(loginRoute);
app.use(registerRoute);
app.use(logoutRoute);
app.use(payRoute);

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AeM3JPrAhTzUVMqmUrvsaIq3onuTGCLwsPUFLHpDBdLgv8-MpvqTTYWtbv3TXCb4GEH2K-JtzQ4sxNiU',
  'client_secret': 'EMlW5DQoejJ-1a-0neAN7YxrqyQv_N8SQN41YpjSO2JzSY1wlLUMIBXkbsOcxMixb4izP4ZCdt5Kx2WM'
});

app.get('*', (req, res) => {
  res.render('notfound', {
    title: 'Page not found!'
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
    error.error(res, e)
  }
}

start();
