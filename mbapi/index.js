var express = require('express');
var bodyParser = require('body-parser');
var expressMongoDb = require('express-mongo-db');


// inicializa o expresss
var app = express();

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/cadastro'));

//libera acesso à API de qualquer host/cliente. Para conectar com o Front-End geral.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// inicializa o servidor na porta especificada
app.listen(3000, function() {
  console.log('Acesse o servidor http://localhost:3000');
});

// importa controllers
var usuariosController = require('./controllers/usuarios.js');

// cria enpoints para funcoes de controllers
app.get('/usuario', usuariosController.listar);
app.post('/usuario', usuariosController.criar);
// app.get('/usuario/:id', usuariosController.recuperar);
// app.delete('/usuario/:id', usuariosController.apagar);
