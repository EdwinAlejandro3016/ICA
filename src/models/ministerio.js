const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ministerioSchema = new Schema({
    titulo: { type: String, required: true},
    info: { type: String, required: true},
    filename: { type: String, required: true}, // direcion de imagen para la vista
    carpeta: {type:String, required: true}, //direcion de la carpeta donde se encuentra el ministerio
    dire: {type:String, required: true}, //direcion donde se encuentra la imagen del ministerio
    obras: { type: Array, required: true},
    claseTarget:  { type: String, required: true},
    claseDots:  { type: String, required: true},
    clasePrev:  { type: String, required: true},
    claseNext:  { type: String, required: true},
    date: {type: Date, default: Date.now}
});

ministerioSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '');
    })

module.exports = mongoose.model('Ministerio',ministerioSchema);