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
    .controller('RecherchesCtrl', function ($scope) {
        $scope.searchTxt = {};
        //    $scope.recherches = [
        //{ title: 'Recherche par Note', id: 1 },
        //{ title: 'Recherche par Tag', id: 2},
        //    ];
        
        $scope.lancerecherches = function () {
            $scope.listRecherchetest = [];
            $scope.listRecherche = [];

            if ($scope.searchTxt.filtre == 'note') {
                j = 0;
                for (i = 1; i < localStorage.length; i++) {
                    $scope.listRecherchetest[i - 1] = JSON.parse(localStorage.getItem(i));
                    if ($scope.listRecherchetest[i - 1].note == $scope.searchTxt.txt)
                    {
                        $scope.listRecherche[j] = $scope.listRecherchetest[i - 1];
                        j++;
                    }
                }
            }
            if ($scope.searchTxt.filtre == 'Tag') {
                j = 0;
                //localStorage.removeItem(0);
                //console.log(localStorage);
                //$scope.listRecherchetest = JSON.parse(localStorage);
                //console.log($scope.listRecherchetest);
                //for ( i=0; i< $scope.listRecherchetest ;i++ )
                //{
                //    if ($scope.listRecherchetest[i].Tag.indexOf($scope.searchTxt.txt) != -1)
                //    {
                //        $scope.listRecherche[j] = $scope.listRecherchetest[i];
                //        j++;
                //    }
                //};
                for (i = 1; i < localStorage.length; i++) {
                    $scope.listRecherchetest[i - 1] = JSON.parse(localStorage.getItem(i));
                    console.log($scope.listRecherchetest[i - 1]);
                    console.log(localStorage);

                    if ($scope.listRecherchetest[i - 1].Tag.indexOf($scope.searchTxt.txt) != -1) {
                           $scope.listRecherche[j] = $scope.listRecherchetest[i - 1];
                         j++;
                    }
                }
            }
            console.log($scope.listRecherche);
        
        }
    })

    .controller('RechercheCtrl', function ($scope,$stateParams) {
    
        $scope.listRecherche = [];
        for (i = 1; i < localStorage.length; i++)
        {
            $scope.listRecherche[i-1] = JSON.parse(localStorage.getItem(i));
         }
        
            
            if ($stateParams.rechercheId == 1) {
                $scope.typerecherche = "'note'";
            }
            if ($stateParams.rechercheId == 2)
            { $scope.typerecherche = 'Tag' }
            console.log($scope.typerecherche);
            console.log($scope);
        
    })


.controller('ListesCtrl', function ($scope) {
    $scope.listes = [
      { title: 'Tous les vins', id: 1, couleur: "" },
      { title: 'Vins blancs', id: 2, couleur: "Blanc" },
      { title: 'Vins rosés', id: 3, couleur: "Rosé" },
      { title: 'Vins rouges', id: 4, couleur: "Rouge" }
    ];
})

.controller('ListeCtrl', function ($scope, $stateParams, $cordovaSQLite) {
    $scope.listeVins = [];
    $cordovaSQLite.execute(db, 'SELECT * FROM Vins')
         .then(
             function (res) {
                 if (res.rows.length > 0) {
                     for (var i = 0; i < res.rows.length; i++) {
                         $scope.listeVins.push(res.rows.item(i));
                         //console.log("id = " + res.rows.item(i).id + " nom = " + res.rows.item(i).nom + " appellation = " + res.rows.item(i).appellation);
                     }
                 }
             },
             function (error) {
                 console.log("Error on SELECT-> " + error.message);
             });
    $scope.location = window.location.hash;
    $scope.couleurVin = $stateParams.couleur;

    $scope.sortType = 'appellation';
    $scope.sortReverse = false;

})

.controller('AjouterCtrl', function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite) {
    $scope.ajouterModel = {};
    $scope.ajouterModel.Tag = [];
    document.getElementById("ajouterModel.Tag[1]").style.visibility = "hidden";
    document.getElementById("ajouterModel.Tag[2]").style.visibility = "hidden";
    $scope.onchange = function () {

        document.getElementById("ajouterModel.Tag[1]").style.visibility = "visible";
    }
    $scope.onchange1 = function () {

        document.getElementById("ajouterModel.Tag[2]").style.visibility = "visible";
    }

    $scope.ajouterModel.nom = "";
    $scope.ajouterModel.appellation = "";
    $scope.ajouterModel.viticulteur = "";
    $scope.ajouterModel.lieu = "";
    $scope.ajouterModel.millesime = "";
    $scope.ajouterModel.date = "";
    $scope.ajouterModel.couleur = "";
    $scope.ajouterModel.note = "";

    $scope.ajouterVin = function () {
        console.log("add");

        var query = "INSERT INTO Vins (nom, appellation, millesime, viticulteur, lieu, date, note, couleur) VALUES (?,?,?,?,?,?,?,?)";

        console.log("nom " + $scope.ajouterModel.nom + " appel " + $scope.ajouterModel.appellation
            + " mill " + $scope.ajouterModel.millesime + " viti " + $scope.ajouterModel.viticulteur
            + " lieu " + $scope.ajouterModel.lieu + " date " + $scope.ajouterModel.date +
            " note " + $scope.ajouterModel.note + " couleur " + $scope.ajouterModel.couleur);

        $cordovaSQLite.execute(db, query, [$scope.ajouterModel.nom, $scope.ajouterModel.appellation, $scope.ajouterModel.millesime, $scope.ajouterModel.viticulteur, $scope.ajouterModel.lieu, $scope.ajouterModel.date, $scope.ajouterModel.note, $scope.ajouterModel.couleur]).then(function (res) {
            console.log("inserted");
        }, function (err) {
            console.error(err);
        });
            
       
        $scope.ajouterModel = {}
        document.getElementById("ajouterModel.Tag[1]").style.visibility = "hidden";
        document.getElementById("ajouterModel.Tag[2]").style.visibility = "hidden";
        alert("Vin ajouté");
    };
})

.controller('DetailsCtrl', function ($scope, $stateParams, $cordovaSQLite) {
    $scope.detailsModel = {};
    var query = "SELECT * FROM Vins WHERE id = (?)";
    $cordovaSQLite.execute(db, query, [$stateParams.vinId]).then(function (res) {
        $scope.detailsModel.vin = (res.rows.item(0));
    }, function (err) {
        console.error(err);
    });

    $scope.detailsModel.utilisateurId = 1;

    $scope.ajouterFavori = function () {
        console.log("ajout favori");

        var query = "INSERT INTO Favoris (vinId, utilisateurId) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [$scope.detailsModel.vin.id, $scope.detailsModel.utilisateurId]).then(function (res) {
            console.log("inserted");
        }, function (err) {
            console.error(err);
        });

    }
})

.controller('CarteCtrl', function ($scope) {
    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');
        Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', {

            callback: function () {
                23
                var map = new Microsoft.Maps.Map($('#divMap').get(0),
                {
                    credentials: "x1YM9wPP7jP8Zubo84cF~iNVEyFBL3uIbHd-lBU8vwg~Ap4rSG2x_BZiNfSWXEHNjgUL8-HzUVYeEvbb8dEVDmwEiazoBqjulsiYcNp_VFdW",
                    mapTypeId: Microsoft.Maps.MapTypeId.road,
                    enableClickableLogo: false,
                    enableSearchLogo: false,
                    center: new Microsoft.Maps.Location(crd.latitude, crd.longitude),
                    zoom: 13,
                    theme: new Microsoft.Maps.Themes.BingTheme()
                });
                Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
                    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
                    var reverseGeocodeRequestOptions = {
                        location: new Microsoft.Maps.Location(crd.latitude, crd.longitude),
                        callback: function (answer, userData) {
                            map.setView({ bounds: answer.bestView });
                            map.entities.push(new Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location));
                            document.getElementById('printoutPanel').innerHTML =
                                answer.address.formattedAddress;
                        }
                    };
                
                    searchManager.reverseGeocode(reverseGeocodeRequestOptions);
                    console.log(searchManager.reverseGeocode(reverseGeocodeRequestOptions));
                });
                var mapCenter = map.getCenter();
                var epingle = new Microsoft.Maps.Pushpin(
                mapCenter,
                { width: 50, height: 50 }
                );
                map.entities.push(epingle);
                }
                
        });
    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.watchPosition(success, error);


})

.controller('FavorisCtrl', function ($scope, $ionicPlatform, $cordovaSQLite) {
    $scope.favoris = [];

    $cordovaSQLite.execute(db, 'SELECT * FROM Favoris')
      .then(
          function (res) {
              if (res.rows.length > 0) {
                  for (var i = 0; i < res.rows.length; i++) {
                      $scope.favoris.push(res.rows.item(i));
                      console.log("id = " + res.rows.item(i).id + " vinId = " + res.rows.item(i).vinId + " utilisateurId = " + res.rows.item(i).utilisateurId);
                  }
              }
          },
          function (error) {
              console.log("Error on SELECT-> " + error.message);
          });

    //var query = "DROP TABLE Favoris";
    //$cordovaSQLite.execute(db, query, []).then(function (res) {
    //    console.log("deleted");
    //}, function (err) {
    //    console.error(err);
    //});

   

    

    //$scope.removeItem = function (x) {

    //    var query = "delete from Favoris where id='" + $scope.favoris[x] + "'";
    //    $cordovaSQLite.execute(db, query, []).then(function (res) {

    //    }, function (err) {
    //        alert("error deleting row=" + err);
    //    });

    //    $scope.todos.splice(x, 1);
    //    $scope.errortext = "";

    //};
})
