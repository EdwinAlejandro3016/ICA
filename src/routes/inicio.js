const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('inicio');
});

module.exports = router;