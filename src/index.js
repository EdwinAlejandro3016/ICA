// inicializaciones
const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const port = process.env.PORT || 3000;

require('dotenv').config(); 

// settings
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exhbs.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

// middlewares

// routes
app.use('/',require('./routes/inicio'));

//static files
app.use(express.static(__dirname + '/public'));

// Listening
app.listen(port,()=>{
    console.log('servidor en puerto',port);
})