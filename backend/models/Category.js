//se crea el esquema(collection) del contenido de la base de datos y se importa unicamente eso
//hacia el controlador

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true,
            maxlength: 32,
            unique: true
        }
        
    },
    {timestamps: true}
);

module.exports = mongoose.model('Category', categorySchema);