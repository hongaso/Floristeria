const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        maxlength: 32
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    contrasenia_criptada:{
        type: String,
        required: true
    },
    salt: String, //sirve para aumentar el nivel de seguridad de la contraseña encriptada
    rol:{
        type: Number,
        default: 0
    },
    inventario:{
        type: Array,
        default: []
    }
},
{timestamps: true}
);

userSchema.virtual('contrasenia')
.set(function(contrasenia){
    this._contrasenia = contrasenia;
    this.salt = uuidv1();
    this.contrasenia_criptada = this.contraseniaEncriptada(contrasenia);
})
.get(function(){
    return this._contrasenia;
});

userSchema.methods = {
    authenticate: function(plainText){
        return this.contraseniaEncriptada(plainText) == this.contrasenia_criptada;
    },

    contraseniaEncriptada: function(contrasenia){
        if(!contrasenia) return '';
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(contrasenia)
            .digest('hex')
        }catch(err){
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);