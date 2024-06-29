require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const connectDB = require('./server/config/db')
const session = require('express-session'); // remenber a user when he's connected
const passport = require('passport');
const MongoStore = require('connect-mongo');



// server and port initialisation and declaration
const app = express();
const port = 5000 || process.env.PORT


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    // cookie: {maxAge: new Date(Date.now() + (3600000))} (cookie expire on 1 hour)
    // ----Date.now() - 30 * 24 * 60 * 1000  (for a month) -----
}));



app.use(passport.initialize());
app.use(passport.session());

// middleware that's going to allow us transfer data from page to page
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connect to Database
connectDB();

//static files
app.use(express.static('public'));

//templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/dashboard'));


//Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404')
});

//lancing the server
app.listen(port, () => {
    console.log(`App listenning on port ${port}`)
})