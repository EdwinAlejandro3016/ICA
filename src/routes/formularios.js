const router = require('express').Router();
const path = require('path');
const fs = require('fs-extra');
const Ministerio = require('../models/ministerio');
const Oracion = require('../models/oracion');

                            //MINISTERIOS

// encontrar ministerio para la traer datos de la vista
router.post('/ministerio/info',async(req,res)=>{
    const infoMinisterio = await Ministerio.findOne(req.body);
    res.json(infoMinisterio);
})

//eliminar ministerio
router.delete('/ministerio/eliminar/:id',async(req,res)=>{
    const id = req.params.id;
    const filename = req.params.titulo;
    try{
        const ministerioDB = await Ministerio.findByIdAndDelete({_id: id});
        if(ministerioDB){
            res.json({estado: true, message: 'ministerio eliminado'});
        }else{
            res.json({estado: false, message: 'fallo al eliminar ministerio'});
        }
    }catch(e){
        console.log(e);
    }
})

// eliminar carpeta del ministerio
router.post('/ministerio/eliminar',async(req,res)=>{
    let {carpeta,dire} = req.body;
    // filename = path.resolve(carpeta);
    await fs.unlink(dire);
    await fs.rmdir(carpeta);
    res.json({ok: true});
})  

// crear nuevo ministerio
router.post('/images/ministerios',async(req,res)=>{
    const { titulo, info } = req.body;
    const ext = path.extname(req.file.originalname).toLocaleLowerCase();
    const imageDire = req.file.path; //direcion actual de la imagen
    let {filename} = req.file;
    filename = `${filename}${ext}`; //imagen con extension
    let errors = [];
    const pathFolder = `src/public/img/ministerios/${titulo}`; // direcion carpeta a mover
    const targetPath = path.resolve(`src/public/img/ministerios/${titulo}/${filename}`); // direcion donde estara la imagen
    const viewImg = `/img/ministerios/${titulo}/${filename}`; // direcion para buscar imagen en la vista
    if(ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpge'){

        if(!fs.existsSync(pathFolder)){
            await fs.mkdir(pathFolder);
            await fs.rename(imageDire,targetPath);
            const newMinisterio = await new Ministerio({ titulo, info, filename: viewImg, carpeta: pathFolder, dire: targetPath}); 
            const ministerioSaved = await newMinisterio.save();
        }else{
            await fs.unlink(imageDire);
            errors.push({message: "Ya hay otro ministerio con este nombre"});
        } 

    }else{
        errors.push({message: "Este formato de imagén no esta permitido"});
    }
    res.redirect('/');
});

                            // MOTIVO DE ORACION
router.post('/oracion',async(req,res)=>{
    const newOracion = await new Oracion(req.body);
    const oracionSaved = await newOracion.save();
    console.log(oracionSaved);
    res.redirect('/');

})
module.exports = router;