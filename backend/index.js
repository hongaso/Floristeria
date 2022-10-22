//importar librerias
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./database');

require('dotenv').config();
//cors sirve para saber que la informacion del frontend y backend se esta cruzando
const cors = require('cors');

//usar metodos de las librerias
const app = express();

//Puerto de escucha
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


//Configuracion de rutas
app.use('/api/category', require('./routes/category'));
app.use('/api/flores', require('./routes/flores'));
app.use('/api/auth', require('./routes/auth'));

//inicializando server
app.listen(app.get('port'), function(req, res){
    console.log(`Servidor ejecutando en el puerto ${app.get('port')}`);
});