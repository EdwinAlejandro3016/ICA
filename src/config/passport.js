const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'nombre'
},async(nombre,password,done)=>{
    const user = await User.findOne({nombre});
    if(!user){
        return done(null,false,{message: 'admin invalido'});
    }else{  
        const match = await user.matchPassword(password);
        if(match){
            return done(null,user);
        }else{
            return done(null,false, {message: 'admin invalido'});
        }

    }
})); 


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,User)=>{
        done(err,User);
    })
})