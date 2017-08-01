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
  $scope.labels = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
  $scope.series = ['Choro', 'Movimento'];
  $scope.data = [
  [2, 2, 2, 0, 0, 2, 2],
  [1, 1, 1, 1, 0, 1, 1]
];
});
