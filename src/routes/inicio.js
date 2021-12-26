const router = require('express').Router();
const Ministerio = require('../models/ministerio');

router.get('/',async(req,res)=>{
    const ministerios = await Ministerio.find();
    res.render('inicio',{ministerios});
});


module.exports = router;