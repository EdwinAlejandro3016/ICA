const router = require('express').Router();
const path = require('path');
const fs = require('fs-extra');
const Ministerio = require('../models/ministerio');
const Oracion = require('../models/oracion');
const { json } = require('express');

                            //MINISTERIOS

// encontrar ministerio para la traer datos de la vista
router.post('/ministerio/info',async(req,res)=>{
    const infoMinisterio = await Ministerio.findOne(req.body);
    res.json(infoMinisterio);
})

//eliminar ministerio
router.delete('/ministerio/eliminar/:id',async(req,res)=>{
    try{
    const id = req.params.id;
    const ministerio = await Ministerio.findOne({_id: id});
    const {carpeta,dire,obras} = ministerio;

    await fs.unlink(dire); // elimina la imagen principal

    await obras.forEach(async(obra)=>{
        const ext = path.extname(obra.originalname).toLocaleLowerCase();
        const filename = `${obra.filename}${ext}`;
        const direcionImages = `${carpeta}/obras/${filename}`;
        await fs.unlink(direcionImages);
        console.log(direcionImages,'imagen eliminada de obras');
        try{
            await fs.rmdir(`${carpeta}/obras`);
            await fs.rmdir(carpeta);
        }catch(e){
            console.log(e);
        }
    })
  
    try{
        const ministerioDB = await Ministerio.findByIdAndDelete({_id: id});
        req.flash('success_msg','Ministerio eliminado correctamente');
        res.json({ok: true});
    }catch(e){
        req.flash('error_msg','Error al eliminar Ministerio');
        res.json({ok: false});
    } 

    }catch(e){
        console.log(e);
    }
})

//editar info ministerio

router.post('/ministerio/editar',async(req,res)=>{
    try{
    const {id,info} = req.body;
    const ministerio = await Ministerio.findOne({_id: id});
    ministerio.info = info;
    const ministerioDB = await Ministerio.findByIdAndUpdate(id,ministerio,{useFindAndModifiy: false});
    req.flash('success_msg','Ministerio Actualizado correctamente');
    res.json({msg: 'ok'});
    }catch(e){
        req.flash('error_msg','No se ah podido editar la información');
        res.json(false);
    }
})
// crear nuevo ministerio
router.post('/images/ministerios',async(req,res)=>{
    try{
        const { titulo, info } = req.body;
        const ext = path.extname(req.files.image[0].originalname).toLocaleLowerCase();
        const imageDire = req.files.image[0].path; //direcion actual de la imagen
        let {filename} = req.files.image[0];
        filename = `${filename}${ext}`; //imagen con extension
        let errors = [];
        let obras = req.files.obras;
        const pathFolder = `src/public/img/ministerios/${titulo}`;  // direcion carpeta a mover
        const targetPath = path.resolve(`src/public/img/ministerios/${titulo}/${filename}`); // direcion donde estara la imagen
        const viewImg = `/img/ministerios/${titulo}/${filename}`; // direcion para buscar imagen en la vista

        const espacios = titulo.replace(/\s/g,'-');
        ///clases para carousel
        const claseTarget = `glider-info-${espacios}`;
        const claseDots = `dots-info-${espacios}`;
        const clasePrev = `glider-prev-info-${espacios}`;
        const claseNext = `glider-next-info-${espacios}`; 


        if(ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpeg'){
                if(!fs.existsSync(pathFolder)){
                    await fs.mkdir(pathFolder,0o776);
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
                    const newMinisterio = await new Ministerio
                    ({ titulo, info, filename: viewImg, carpeta: pathFolder, dire: targetPath, obras,
                        claseTarget,claseDots,clasePrev,claseNext }); 
                    const ministerioSaved = await newMinisterio.save();
                    req.flash('success_msg','Ministerio creado correctamente');
                    res.redirect('/');
                }else{
                    await fs.unlink(imageDire);
                    obras.forEach(async(obra)=>{
                        await fs.unlink(obra.path);
                    })
                    req.flash('error_msg','Ya hay otro ministerio con este nombre');
                    res.redirect('/');
                } 

            }else{
                req.flash('error_msg','Este formato de imagén no esta permitido');
                res.redirect('/');
            }

    }catch(e){
        res.send(e);
    }

});


                            // MOTIVO DE ORACION
router.post('/oracion',async(req,res)=>{
    const newOracion = await new Oracion(req.body);
    const oracionSaved = await newOracion.save();
    req.flash('success_msg','Oración enviada correctamente');
    res.redirect('/');

})

router.delete('/oracion/:id',async(req,res)=>{
    const id = req.params.id;
    try{
    const oracion = await Oracion.findByIdAndRemove({_id: id});
    if(oracion){
        req.flash('success_msg','Oración eliminada correctamente');
        res.json({estado: true, message: 'oracion eliminada'});
    }else{
        req.flash('error_msg','fallo al eliminar la oracion');
        res.json({estado: false, message: 'fallo al eliminar la oracion'});
    }
    }catch(e){
        console.log(e);
    }
})

router.post('/images/otra/:id',async(req,res)=>{
    try{
    const files = req.files.obrasN;
    const id = req.params.id;
    const ministerio = await Ministerio.findOne({_id: id});
    const obras = ministerio.obras;

    const {titulo} = ministerio;
    files.forEach(async(obra)=>{
        let extObra = path.extname(obra.originalname).toLocaleLowerCase();
        let filenameObra = obra.filename;
        filenameObra =  `${filenameObra}${extObra}`;
        let targetPathObras = path.resolve(`src/public/img/ministerios/${titulo}/obras/${filenameObra}`);
        obra.direView = `/img/ministerios/${titulo}/obras/${filenameObra}`;
        await fs.rename(obra.path,targetPathObras);
    });

    const obrasTotales = [...files,...obras];
    ministerio.obras = obrasTotales;

    const ministerioUpdate = await Ministerio.findByIdAndUpdate(id,ministerio,{useFindAndModifiy: false});
    /////configurar en midlewares
    req.flash('success_msg','Ministerio Actualizado correctamente');
    res.redirect('/');

    }catch(e){ 
        console.log(e); 
        req.flash('error_msg','El Ministerio no pudo ser Actualizado');
        res.redirect('/');
    }
})


router.get('/image/vista/:filename/:id',async(req,res)=>{
    try{
    const {filename,id} = req.params;
    console.log(req.params);
    const ministerio = await Ministerio.findOne({_id: id});
    const {obras} = ministerio;
    let dire = "";
    const img = obras.map(obra=>{
        if(obra.filename === filename){
            dire = obra.direView;
        }
    });
    res.render('unique-image',{image: dire,bloquear: true,filename,id});
    }catch(e){
        console.log(e);
    }
})

router.post('/image/eliminar',async(req,res)=>{
    try{
    const {id,filename} = req.body;
    const ministerio = await Ministerio.findOne({_id: id});
    const {obras,titulo} = ministerio;
    let dire = "";



    for(let i = 0; i < obras.length; i++){
        if(obras[i].filename === filename){
            dire = obras[i].direView;  
            ////direcion a eliminar
            let targetPathObras = path.resolve(`src/public/${dire}`);
            obras.splice(i,1);
            ministerio.obras = obras;

            ////termina

            const ministerioDB = await Ministerio.findByIdAndUpdate(id,ministerio,{useFindAndModifiy: false});
            await fs.unlink(targetPathObras);
            req.flash('success_msg','Imágen eliminada correctamente');
            res.json({msg: 'ok'});
            return false; 
        }
    }

    }catch(e){
        console.log(e);
        req.flash('error_msg','La Imágen no pudo ser eliminada');
        res.json(false);
    }
})
module.exports = router; 