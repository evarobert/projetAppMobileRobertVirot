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
    .controller('RechercheCtrl', function ($scope) {
        var maListRecherche = []
        for (i = 1; i < localStorage.length; i++)
        {
            maListRecherche[i-1] = JSON.parse(localStorage[i]);
        }
        $scope.listRecherche = maListRecherche;
        $scope.searchTxt = '';
        $scope.searchTag = '';


    })


.controller('ListesCtrl', function($scope) {
  $scope.listes = [
    { title: 'Tous les vins', id: 1, couleur: "" },
    { title: 'Vins blancs', id: 2, couleur: "Blanc" },
    { title: 'Vins rosés', id: 3, couleur: "Rosé" },
    { title: 'Vins rouges', id: 4, couleur: "Rouge" }
  ];
})

.controller('ListeCtrl', function ($scope, $stateParams) {
    $scope.listeVins = [];
    for (var j = 1; j < localStorage.length; j++) {
        $scope.listeVins[j] = JSON.parse(localStorage.getItem(j));
    }

    console.log($scope);
    console.log($stateParams);
    
    $scope.location = window.location.hash;
    $scope.couleurVin = $stateParams.couleur;

 
    //console.log($scope.listeVins);
})

.controller('AjouterCtrl', function ($scope, $stateParams) {
    $scope.ajouterDonnees = {};
    $scope.ajouterDonnees.Tag = [];

    if ($scope.ajouterDonnees.Tag[0] != "undefined")
    {
        document.getElementById("ajouterDonnees.Tag[1]").style.visibility = "hidden";
    }
    if ($scope.ajouterDonnees.Tag[1] != "undefined") {
        document.getElementById("ajouterDonnees.Tag[2]").style.visibility = "hidden";
    }
    $scope.onchange = function () {

        document.getElementById("ajouterDonnees.Tag[1]").style.visibility = "visible";
    }
    $scope.onchange1 = function () {

        document.getElementById("ajouterDonnees.Tag[2]").style.visibility = "visible";
    }
  
    $scope.ajouterModel = {};
    $scope.ajouterVin = function () {
        //localStorage.clear();

        $scope.ajouterModel.id = localStorage.length;
        localStorage.setItem($scope.ajouterModel.id, JSON.stringify($scope.ajouterModel));
       
        $scope.ajouterModel = {}
        alert("Vin ajouté");
    };

    // The date picker (read the docs)
    $('.datepicker').pickadate();
})

.controller('DetailsCtrl', function ($scope, $stateParams) {
    $scope.detailsModel = {};

    $scope.detailsModel.vin = JSON.parse(localStorage.getItem($stateParams.vinId));
});
