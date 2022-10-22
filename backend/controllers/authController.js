const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dberrorHandler');

// sign up /registrarse
exports.signup = (req,res) =>{
    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((error, user) =>{
        console.log('alcanzo el punto final de registro')
        if(error){
            return res.status(400).json({
                message: 'Por favor revise los campos, hubo algun error'
            })
        }
        user.salt = undefined;
        user.contrasenia_criptada = undefined;
        res.json({
            user
        })
    })
}

//sign in /login
exports.signin = (req,res) =>{
    //encontrar el usuario basado en el email
    const {email, contrasenia} = req.body //{email: email, contrasenia: contraswnia}
    // aqui se agrega el email del body al email del objeto y lo mismo para la contrasenia
    User.findOne({email}, (error, user) =>{
        if(error || !user){
            return res.status(400).json({
                error: 'No existe un usuario con ese email'
            });
        }
        //si el usuario se encuentra y hace match el email y la contrasenia
        //se crea el metodo de autenticacion el user model
        if(!user.authenticate(contrasenia)) {
            return res.status(401).json({
                error: 'El email o la contraseña no coinciden'
            });
        }
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        //persistir el token como 't' en la cookie con fecha de caducidad
        res.cookie('t', token, {expire: new Date() + 9999})
        //retornar como respuesta el usuario con el token al frontend
        const {_id, nombre, email, rol} = user
        return res.json({token, user: {_id, email, nombre, rol}})
    });
}

exports.signout = (req, res) =>{
    res.clearCookie('t')
    res.json({message: 'Signout Suces'})
};

exports.userById = (req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'Usuario no encontrado'
            })
        }
        req.profile = user;
        next();
    })
}

/*
exports.isAdmin = (req,res,next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error: 'Acceso denegado'
        });
    }
    next();
}
*/