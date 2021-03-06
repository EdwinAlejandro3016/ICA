// inicializaciones
const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
require('dotenv').config();  
require('./config/passport');


const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yzk7a.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(uri)
.then(()=>{console.log("database connected!")}) 
.catch(e=>console.log(e));

// settings
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exhbs.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./helpers/helpers')
}));
app.set('view engine','.hbs');


// middlewares 
app.use(multer({dest: path.join(__dirname,'public/img/temp')}).fields([{name: 'image', maxCount: 1},{name: 'obras',maxCount: 8},{name: 'obrasN',maxCount: 8}])); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({ 
    secret: 'mysecret',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

app.use(passport.initialize(require('./config/passport')));
app.use(passport.session());

// Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.user;
    next();
})


// routes
app.use('/',require('./routes/inicio'));  
app.use('/users',require('./routes/users'));
app.use('/form',require('./routes/formularios'));
app.use('/ministerios',require('./routes/ministerios')); 

//static files
app.use(express.static(__dirname + '/public'));

// Listening
app.listen(port,()=>{
    console.log('servidor en puerto',port); 
})