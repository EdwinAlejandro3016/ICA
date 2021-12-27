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
    let {carpeta,dire,obras} = req.body;
    obras.obras.forEach(async(obra)=>{
        const ext = path.extname(obra.originalname).toLocaleLowerCase();
        const filename = `${obra.filename}${ext}`;
        const direcionImages = `${carpeta}/obras/${filename}`;
        const img = await fs.unlink(direcionImages);
        console.log(img,'imagen eliminada de obras');
    });
    await fs.rmdir(`${carpeta}/obras`);
    await fs.unlink(dire); // elimina la imagen principal
    await fs.rmdir(carpeta);
    res.json({ok: true});
})  

// crear nuevo ministerio
router.post('/images/ministerios',async(req,res)=>{
    const { titulo, info } = req.body;
    const ext = path.extname(req.files.image[0].originalname).toLocaleLowerCase();
    const imageDire = req.files.image[0].path; //direcion actual de la imagen
    let {filename} = req.files.image[0];
    filename = `${filename}${ext}`; //imagen con extension
    let errors = [];
    let obras = req.files.obras;
    console.log(obras);
    const pathFolder = `src/public/img/ministerios/${titulo}`; // direcion carpeta a mover
    const targetPath = path.resolve(`src/public/img/ministerios/${titulo}/${filename}`); // direcion donde estara la imagen
    const viewImg = `/img/ministerios/${titulo}/${filename}`; // direcion para buscar imagen en la vista
    if(ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpge'){
        if(!fs.existsSync(pathFolder)){
            await fs.mkdir(pathFolder);
            await fs.rename(imageDire,targetPath);
            const obrasFolder = `src/public/img/ministerios/${titulo}/obras`;
            await fs.mkdir(obrasFolder);
            obras.forEach(async(obra)=>{
                let extObra = path.extname(obra.originalname).toLocaleLowerCase();
                let filenameObra = obra.filename;
                filenameObra =  `${filenameObra}${extObra}`;
                let targetPathObras = path.resolve(`src/public/img/ministerios/${titulo}/obras/${filenameObra}`);
                obra.direView = `/img/ministerios/${titulo}/obras/${filenameObra}`;
                await fs.rename(obra.path,targetPathObras);
            })
            const newMinisterio = await new Ministerio({ titulo, info, filename: viewImg, carpeta: pathFolder, dire: targetPath, obras}); 
            const ministerioSaved = await newMinisterio.save();
            console.log(ministerioSaved); 
        }else{
            await fs.unlink(imageDire);
            obras.forEach(async(obra)=>{
                await fs.unlink(obra.path);
            })
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

router.delete('/oracion/:id',async(req,res)=>{
    const id = req.params.id;
    try{
    const oracion = await Oracion.findByIdAndRemove({_id: id});
    if(oracion){
        res.json({estado: true, message: 'oracion eliminada'});
    }else{
        res.json({estado: false, message: 'fallo al eliminar la oracion'});
    }
    }catch(e){
        console.log(e);
    }
})
module.exports = router;