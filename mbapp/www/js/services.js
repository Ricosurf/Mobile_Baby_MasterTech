angular.module('starter.services', [])

.factory('Cadastro', function() {
  // Might use a resource here that returns a JSON array
  var usuario;

  return {

    inicializar: function(dados){
      usuario = dados;
    },
    usuario: function(id){
      return usuario;
    }

  }
});
