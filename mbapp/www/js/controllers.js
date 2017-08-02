angular.module('starter.controllers', [])



.controller('ChatsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
    // Chats.remove(chat);
  // };
})

.controller('ChatDetailCtrl', function($scope, $stateParams) {
  // $scope.chat = Chats.get($stateParams.chatId);
})


.controller('DashCtrl', function($scope, $state, $http, Cadastro){
  $scope.dados = {};

  $scope.salvar = function(){
    console.log($scope.dados);
       $http.post('http://localhost:3000/usuario', $scope.dados).then(function(resposta){
         $state.go('tab.chats');
       })
     }
})

.controller("ExampleController", function($scope, $http, $interval) {
  $scope.dados = {
    "choros": [],
    "movimentos": []
  };

  $http.get('http://localhost:3000/dados').then(function(resposta){
    for(var i = 0; i <= resposta.data.length-1; i++){
      $scope.dados.choros.push(resposta.data[i].choro);
      $scope.dados.movimentos.push(resposta.data[i].movimento);
    }
    // console.log($scope.dados);
  })

  $scope.labels = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm"];
  $scope.series = ['Choro', 'Movimento'];
  $scope.data = [
  [2, 0, 1, 2],
  [0, 2, 1, 0]
];

$interval(function(){
  for(var j = 0; j <= 27; j++){
    $scope.data[0].push($scope.dados.choros[j]);
  }

  for(var k = 0; k <= 31; k++){
    $scope.data[1].push($scope.dados.movimentos[j]);
  }

  // console.log('1');
  // console.log($scope.data);
}, 1000, 1);


// $scope.data[0].push(0)
});
