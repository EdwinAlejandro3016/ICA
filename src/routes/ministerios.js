const router = require('express').Router();
const Ministerio = require('../models/ministerio');
const Oracion = require('../models/oracion');

router.get('/',async(req,res)=>{
    const ministerios = await Ministerio.find().sort({date: -1});
    const oraciones = await Oracion.find().sort({date: -1});
    res.render('ministerios',{ministerios, oraciones});
});


module.exports = router;