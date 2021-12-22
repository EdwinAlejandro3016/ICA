const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');
router.get('/signup',(req,res)=>{
    res.render('signup',{ocultar: true});
}); 

// router.post('/signup',isAuthenticated,async(req,res)=>{
//     const {password,nombre} = req.body;
//     const newUser = new User({nombre, password});
//     newUser.password = await newUser.encryptPassword(password);
//     await newUser.save();
//     res.redirect('/');
// });

router.get('/admin',(req,res)=>{
    res.render('signin');
});

router.post('/admin',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/users/admin'
}));


router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})
module.exports = router;