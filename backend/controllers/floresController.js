const Flores = require('../models/Flores');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dberrorHandler')
//con fs(file sistem) podemos elegir imagenes desde el SO
const fs = require('fs');
const formidable = require('formidable');


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Imagen no pudo ser cargada"
            })
        }

        const { nombre, descripcion, precio, categoria, cantidad } = fields;
        let flores = new Flores(fields);

        // 1KB = 1000 bytes
        // 1MB = 1,000,000 bytes 
        // 1 Byte = 8 bits

        if (files.foto) {
            if (files.foto.size > 1000000) {
                return res.status(400).json({
                    error: "La imagen debe tener menos de 1mb de tamaño"
                })
            }
            flores.foto.data = fs.readFileSync(files.foto.filepath);
            flores.foto.contentType = files.foto.mimetype;
        }

        flores.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);
        })

    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : 'nombre';

    Flores.find()
        .select('-foto')
        .populate('categoria')
        .sort([[sortBy, order]])
        .exec((err, flores) => {
            if (err) {
                return res.status(400).json({
                    error: 'No se encontraron las flores'
                })
            }
            res.json( flores );
        })
}

exports.read = (req,res) =>{
    req.flores.foto = undefined;
    return res.json(req.flores);
}

exports.remove = (req,res) =>{
    let flores = req.flores;
    flores.remove((err, deletedFlores) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'La flor a sido eliminada'
        })
    })
}

exports.floresById = (req,res,next,id) =>{
    Flores.findById(id)
        .populate('categoria')
        .exec((err, flores) =>{
            if(err || !flores){
                return res.json({
                    error: 'Flores no encontradas o no existen'
                });
            }
            req.flores = flores;
            next();
    })
}

exports.foto = (req,res,next)=>{
    if(req.flores.foto.data){
        res.set('Content-Type', req.flores.foto.contentType);
        return res.send(req.flores.foto.data);
    }
    next();
}