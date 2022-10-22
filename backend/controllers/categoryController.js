const Category = require('../models/Category');
//con este modulo llamamos al archivo dberrorHandler para capturar posibles errores de la db
const {errorHandler} = require('../helpers/dberrorHandler')

//metodo para crear una nueva categoria
exports.create = (req, res) => {
    const category = new Category(req.body)
    console.log(category);
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json({data});
    })
  }

//metodo para listar todas las categorias
exports.list = (req,res) =>{
    Category.find().exec((err,data) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({data});
    })
}

//metodo para eliminar categorias
exports.remove = (req,res) =>{
    let category = req.category;
    category.remove((err,data) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'La categoria a sido eliminada'
        })
    })
}
//metodo para obtener el id de la categoria para el remove
exports.categoryById = (req,res, next, id) =>{
    Category.findById(id).exec((err, category) =>{
        if (err || !category){
            return res.status(400).json({
                error: 'La categoria no se encontro o no existe'
            })
        };
        req.category = category;
        next();
    })
}

//metodo para editar categorias