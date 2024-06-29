require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// server and port initialisation and declaration
const app = express();
const port = 5000 || process.env.PORT

// middleware that's going to allow us transfer data from page to page
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static files
app.use(express.static('public'));

//templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));


//Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404')
});

//lancing the server
app.listen(port, () => {
    console.log(`App listenning on port ${port}`)
})