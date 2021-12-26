const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const oracionSchema = new Schema({
    nombre: { type: String, required: true},
    motivo: { type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Oracion',oracionSchema);