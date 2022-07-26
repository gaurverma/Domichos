require('dotenv').config;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const ejs = require("ejs");
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');
const passportInit = require('./app/config/passport');

// Database connection
const url = "mongodb://0.0.0.0:27017/pizaa";
const connection = mongoose.connection;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connection succesfull");
}).catch((e)=>{
    console.log(e);
    console.log("No connection");
});

let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: 'thisissomevalue',
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

//Passport config
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

require('./routes/web')(app);


app.listen(4000,()=>{
    console.log(`Listening on ${PORT}`);
});