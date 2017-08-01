var ObjectID = require('mongodb').ObjectID;

// lista usuarios
exports.listar = function (req, res) {
  req.db.collection('usuario').find().toArray(function(err, result) {
    if (err) {
      return console.log(err)
    };

    res.send(result);
  });
};


// cria um usuari
exports.criar = function (req, res) {
  var usuarios = req.body;

  req.db.collection('usuario').save(usuarios, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    return res.send(req.body);
  });
};


//
// // remove um usuario utilizando o id
// exports.apagar = function (req, res) {
//   var id = req.params.id;
//
//   req.db.collection('usuario').remove({_id: ObjectID(id)}, {justOne: true}, function(err, result) {
//     if (err) {
//       return res.sendStatus(503);
//     }
//
//     res.sendStatus(200);
//   });
// };
//
// // recupera um usuario utilizando o id
// exports.recuperar = function (req, res) {
//   var id = req.params.id;
//
//   req.db.collection('usuario').findOne({_id: ObjectID(id)}, function(err, result) {
//     if (err) {
//       return res.sendStatus(503);
//     }
//
//     if (!result) {
//       return res.send(404);
//     }
//
//     result.senha = '<confidencial>';
//
//     res.send(result);
//   });
// };
