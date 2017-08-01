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
exports.salvar = function (req, res) {
  req.db.collection('dados').save(req.body, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }
    res.sendStatus(201);
  });
};
