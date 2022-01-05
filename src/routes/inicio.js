const router = require('express').Router();
const Ministerio = require('../models/ministerio');
const Oracion = require('../models/oracion');

router.get('/',async(req,res)=>{
    const ministerios = await Ministerio.find().sort({date: -1});
    const oraciones = await Oracion.find().sort({date: -1});
    res.render('inicio',{ministerios, oraciones});
});

router.get('/sobre-nosotros',(req,res)=>{
    res.render('inicio',{sobre: true});
})

module.exports = router;