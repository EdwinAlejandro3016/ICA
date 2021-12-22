const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('inicio');
});

router.get('/ministerios',(req,res)=>{
    res.render('inicio');
});

router.get('/adoradores',(req,res)=>{
    res.render('inicio');
});

module.exports = router;