var ObjectID = require('mongodb').ObjectID;
// lista choro e movimento
exports.listar = function (req, res, $scope) {
  req.db.collection('dados').find().toArray(function(err, result) {
    if (err) {
      return console.log(err);
    };
    res.send(result);
  });
};
// cria dados de choro e movimento
exports.criar = function (req, res) {
  var dados = req.query;
  dados.datetime = new Date();
  console.log(dados);
  req.db.collection('dados').save(dados, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }
    res.sendStatus(201);
  });
};
