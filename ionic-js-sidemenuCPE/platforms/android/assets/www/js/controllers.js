angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/connexion.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Connexion...', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };


})
    .controller('RechercheCtrl', function ($scope) {


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


    //console.log($stateParams);

    $scope.location = window.location.hash;
    $scope.couleurVin = $stateParams.couleur;

    $scope.sortType = 'appellation';
    $scope.sortReverse = false;

    console.log($scope);
    //console.log($scope.listeVins);
})

.controller('AjouterCtrl', function ($scope, $stateParams) {
    $scope.ajouterModel = {};
    $scope.ajouterModel.Tag = [];

    //if ($scope.ajouterModel.Tag[0] != "undefined") {
    //    document.getElementById("ajouterModel.Tag[1]").style.visibility = "hidden";
    //}
    //if ($scope.ajouterModel.Tag[1] != "undefined") {
    //    document.getElementById("ajouterModel.Tag[2]").style.visibility = "hidden";
    //}
    //$scope.onchange = function () {

    //    document.getElementById("ajouterModel.Tag[1]").style.visibility = "visible";
    //}
    //$scope.onchange1 = function () {

    //    document.getElementById("ajouterModel.Tag[2]").style.visibility = "visible";
    //}

    //$scope.ajouterVin = function () {
    //    //localStorage.clear();

    //    $scope.ajouterModel.id = localStorage.length;
    //    localStorage.setItem($scope.ajouterModel.id, JSON.stringify($scope.ajouterModel));

    //    $scope.ajouterModel = {}
    //    alert("Vin ajouté");
    //};

    $scope.ajouterVin = function () {
        console.log("add");

        var query = "INSERT INTO Vins (nom, appellation, millesime, viticulteur, lieu, date, note, couleur) VALUES (?,?,?,?,?,?,?,?)";

        console.log("nom " + $scope.ajouterModel.nom + " appel " + $scope.ajouterModel.appellation
            + " mill " + $scope.ajouterModel.millesime + " viti " + $scope.ajouterModel.viticulteur
            + " lieu " + $scope.ajouterModel.lieu + " date " + $scope.ajouterModel.date +
            " note " + $scope.ajouterModel.note + " couleur " + $scope.ajouterModel.couleur);

        //$cordovaSQLite.execute(db, query, [$scope.ajouterModel.nom, $scope.ajouterModel.appellation, $scope.ajouterModel.millesime, $scope.ajouterModel.viticulteur, $scope.ajouterModel.lieu, $scope.ajouterModel.date, 2, $scope.ajouterModel.couleur]).then(function (res) {
        //    console.log("inserted");
        //}, function (err) {
        //    console.error(err);
        //});

    };

    $scope.vins = [];
    $cordovaSQLite.execute(db, 'SELECT * FROM Vins')
         .then(
             function (res) {
                 if (res.rows.length > 0) {
                     for (var i = 0; i < res.rows.length; i++) {
                         $scope.vins.push(res.rows.item(i));
                         //console.log("id = " + res.rows.item(i).id + " nom = " + res.rows.item(i).nom + " appellation = " + res.rows.item(i).appellation);
                     }
                 }
             },
             function (error) {
                 console.log("Error on SELECT-> " + error.message);
             });

})

.controller('DetailsCtrl', function ($scope, $stateParams) {
    $scope.detailsModel = {};

    $scope.detailsModel.vin = JSON.parse(localStorage.getItem($stateParams.vinId));
})

.controller('FavorisCtrl', function ($scope, $ionicPlatform, $cordovaSQLite) {

    $scope.favorisModel = {};
     $ionicPlatform.ready(function(){
        $cordovaSQLite.execute(db, 'SELECT * FROM Favoris')
          .then(
              function(res) {
                  if (res.rows.length > 0) {
                      for (var i = 0; i < res.rows.length; i++) {
                          $scope.favoris.push(res.rows.item(i));
                          console.log("id = " + res.rows.item(i).id + " vinId = " + res.rows.item(i).vinId + " utilisateurId = " + res.rows.item(i).utilisateurId);
                      }
                  }
              },
              function(error) {
                  console.log("Error on SELECT-> " + error.message);
              });

        //var query = "DROP TABLE Favoris";
        //$cordovaSQLite.execute(db, query, []).then(function (res) {
        //    console.log("deleted");
        //}, function (err) {
        //    console.error(err);
        //});

        $scope.favoris = [];

        $scope.addTodo = function () {
                console.log("add");

                var query = "INSERT INTO Favoris (vinId, utilisateurId) VALUES (?,?)";
                $cordovaSQLite.execute(db, query, [$scope.favorisModel.vinId, $scope.favorisModel.utilisateurId]).then(function (res) {
                    console.log("inserted");
                }, function (err) {
                    console.error(err);
                });

        } 

        //$scope.removeItem = function (x) {

        //    var query = "delete from Favoris where id='" + $scope.favoris[x] + "'";
        //    $cordovaSQLite.execute(db, query, []).then(function (res) {

        //    }, function (err) {
        //        alert("error deleting row=" + err);
        //    });

        //    $scope.todos.splice(x, 1);
        //    $scope.errortext = "";

        //};
    });
}
)
