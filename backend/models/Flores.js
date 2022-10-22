const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const floresSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            trim: true,
            require: true,
            maxlength:32
        },
        descripcion:{
            type: String,
            trim: true,
            require: true,
            maxlength: 2000
        },
        precio:{
            type: Number,
            trim:true,
            require:true,
            maxlength: 32
        },
        categoria:{
            type: ObjectId,
            ref: 'Category',
            require: true,
        },
        cantidad:{
            type:Number
        },
        foto:{
            data:Buffer,
            contentType: String
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model('Flores', floresSchema);