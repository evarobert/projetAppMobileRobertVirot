angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

 
})

.controller('ListesCtrl', function($scope) {
  $scope.listes = [
    { title: 'Tous les vins', id: 1 },
    { title: 'Vins blancs', id: 2 },
    { title: 'Vins ros�s', id: 3 },
    { title: 'Vins rouges', id: 4 }
  ];
})

.controller('ListeCtrl', function ($scope, $stateParams) {
    $scope.listeVins = [];
    for (var j = 1; j < localStorage.length; j++) {
        $scope.listeVins[j] = localStorage.getItem(j);
    }

    console.log($scope.listeVins);
})

.controller('AjouterCtrl', function ($scope, $stateParams) {
    $scope.ajouterDonnees = {};
    $scope.ajouterVin = function () {
        //localStorage.clear();
        console.log(localStorage.length)
        localStorage.setItem(localStorage.length, JSON.stringify($scope.ajouterDonnees));
       
    };
});
