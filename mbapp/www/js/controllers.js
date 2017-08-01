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

.controller("ExampleController", function($scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
  [65, 59, 80, 81, 56, 55, 40],
  [28, 48, 40, 19, 86, 27, 90]
];
});
