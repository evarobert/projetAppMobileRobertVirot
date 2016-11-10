angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    //// Triggered in the login modal to close it
    //$scope.closeLogin = function () {
    //    $scope.modal.hide();
    //};

    //// Open the login modal
    //$scope.login = function () {
    //    $scope.modal.show();
    //};

    //// Perform the login action when the user submits the login form
    //$scope.doLogin = function () {
    //    console.log('Connexion...', $scope.loginData);

    //    // Simulate a login delay. Remove this and replace with your login
    //    // code if using a login system
    //    $timeout(function () {
    //        $scope.closeLogin();
    //    }, 1000);
    //};


})

.controller('ConnexionCtrl', function ($scope, $cordovaSQLite, $state, $rootScope) {
    $scope.connexionModel = {};
    $rootScope.connecte = false;

    $scope.connecter = function () {
        var query = "SELECT * FROM Utilisateurs WHERE login = (?) AND mdp = (?)";
        $cordovaSQLite.execute(db, query, [$scope.connexionModel.login, $scope.connexionModel.mdp]).then(function (res) {
            if (res.rows.length > 0) {

                localStorage.setItem(0, JSON.stringify(res.rows.item(0)));

                $rootScope.connecte = true;
                $rootScope.utilisateurId = JSON.parse(localStorage.getItem(0)).id;
                $state.go("app.listes", { redirect: true });
            }
            else {
                $rootScope.connecte = false;
                $rootScope.utilisateurId = 0;
                $state.go("app.inscription", { redirect: true });
                console.log(window.location.href);
               
            }

        }, function (err) {
            console.error(err);
        });
    };
})

    .controller('InscriptionCtrl', function ($scope, $cordovaSQLite, $state) {
        $scope.inscriptionModel = {};

        $scope.inscrire = function () {
            var query = "INSERT INTO Utilisateurs (login, mdp, nom) VALUES (?,?,?) ";

            $cordovaSQLite.execute(db, query, [$scope.inscriptionModel.login, $scope.inscriptionModel.mdp, $scope.inscriptionModel.nom]).then(function (res) {

                $state.go("app.connexion", { redirect: true });
            }),
                function (err) {
                }
        };
    })

    .controller('RecherchesCtrl', function ($scope, $cordovaSQLite, $rootScope, $state) {
        if ($rootScope.connecte == true) {
            $scope.searchTxt = {};

        $scope.lanceRecherches = function () {
            $scope.listRecherchetest = [];
            $scope.listRecherche = [];
            $scope.listTag = [];

            if ($scope.searchTxt.filtre == '1') {
                var query = "SELECT * FROM Vins WHERE note = (?)";
                $cordovaSQLite.execute(db, query, [$scope.searchTxt.txt]).then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            $scope.listRecherche.push(res.rows.item(i));
                        }
                    }
                }, function (err) {
                    console.error(err);
                });


            }
            if ($scope.searchTxt.filtre == '2') {
                              
                var query1 = "SELECT * FROM Tags WHERE texte LIKE (?)";
                var query2 = "SELECT * FROM Vins WHERE id = (?)";
                var txtquery1 = "%" + $scope.searchTxt.txt + "%";
                $cordovaSQLite.execute(db, query1, [txtquery1]).then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            $scope.listTag.push(res.rows.item(i));
                        }
                    }
                    $scope.listTag.forEach(function (tag) {
                        var Id = tag.vinId ;
                        $cordovaSQLite.execute(db, query2, [Id]).then(function (res) {
                            $scope.listRecherche.push(res.rows.item(0));
                            console.log($scope.listRecherche[0].nom);
                        }),
                        function (err) {
                            console.error(err);
                        }
                        });
                    
                }
                )

            };
            }

        }
        else {
            $state.go("app.connexion", { redirect: true });
        }
    })



.controller('ListesCtrl', function ($scope, $rootScope, $state) {
    if ($rootScope.connecte == true) {
        $scope.listes = [
          { title: 'Tous les vins', id: 1, couleur: "" },
          { title: 'Vins blancs', id: 2, couleur: "Blanc" },
          { title: 'Vins roses', id: 3, couleur: "Rose" },
          { title: 'Vins rouges', id: 4, couleur: "Rouge" }
        ];
    }
    else {
        $state.go("app.connexion", { redirect: true });
    }
})

.controller('ListeCtrl', function ($scope, $stateParams, $cordovaSQLite, $rootScope, $state) {
    if ($rootScope.connecte == true) {
        $scope.listeVins = [];
        $cordovaSQLite.execute(db, 'SELECT * FROM Vins')
             .then(
                 function (res) {
                     if (res.rows.length > 0) {
                         for (var i = 0; i < res.rows.length; i++) {
                             $scope.listeVins.push(res.rows.item(i));
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
    }
    else {
        $state.go("app.connexion", { redirect: true });
    }
})

.controller('AjouterCtrl', function ($scope, $stateParams, $ionicPlatform, $cordovaSQLite, $rootScope, $state) {
    if ($rootScope.connecte == true) {
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
            
            var query = "INSERT INTO Vins (nom, appellation, millesime, viticulteur, lieu, date, note, couleur) VALUES (?,?,?,?,?,?,?,?) ";
            var query2 = "INSERT INTO Tags (vinId, texte) VALUES (?,?)";
            var query3 = "INSERT INTO Photos (vinId, url) VALUES (?,?)";

            console.log("nom " + $scope.ajouterModel.nom + " appel " + $scope.ajouterModel.appellation
                + " mill " + $scope.ajouterModel.millesime + " viti " + $scope.ajouterModel.viticulteur
                + " lieu " + $scope.ajouterModel.lieu + " date " + $scope.ajouterModel.date +
                " note " + $scope.ajouterModel.note + " couleur " + $scope.ajouterModel.couleur);

            $cordovaSQLite.execute(db, query, [$scope.ajouterModel.nom, $scope.ajouterModel.appellation, $scope.ajouterModel.millesime, $scope.ajouterModel.viticulteur, $scope.ajouterModel.lieu, $scope.ajouterModel.date, $scope.ajouterModel.note, $scope.ajouterModel.couleur]).then(function (res1) {
                $scope.vinId = res1.insertId;

                $cordovaSQLite.execute(db, query3, [$scope.vinId, $scope.ajouterModel.photo]).then(function (res) {
                })
                $scope.ajouterModel.Tag.forEach(function (tag) {
                    console.log(tag);
                    $cordovaSQLite.execute(db, query2, [$scope.vinId, tag]).then(function (res) {
                    }),

                function (err) {
                    console.error(err);
                }
                })
                $scope.ajouterModel = {};
            });

        };
       
    }
    else {
        $state.go("app.connexion", { redirect: true });
    }
})

.controller('DetailsCtrl', function ($scope, $stateParams, $cordovaSQLite, $rootScope, $state) {
    if ($rootScope.connecte == true) {
        $scope.detailsModel = {};
        var query = "SELECT * FROM Vins WHERE id = (?)";
        $cordovaSQLite.execute(db, query, [$stateParams.vinId]).then(function (res) {
            $scope.detailsModel.vin = (res.rows.item(0));
        }, function (err) {
            console.error(err);
        });

        $scope.photo = {};
        var query = "SELECT * FROM Photos WHERE vinId = (?)";
        $cordovaSQLite.execute(db, query, [$stateParams.vinId]).then(function (res) {
            $scope.photo = (res.rows.item(0));
        }, function (err) {
            console.error(err);
        });

        $scope.tags = [];

        var query2 = "SELECT * FROM Tags WHERE vinId = (?)";
        $cordovaSQLite.execute(db, query2, [$stateParams.vinId]).then(function (res) {
            for (var i = 0; i < res.rows.length; i++)
            {
                $scope.tags.push(res.rows.item(i));
            }
        }, function (err) {
            console.error(err);
        });

        $scope.detailsModel.utilisateurId = JSON.parse(localStorage.getItem(0)).id;

        $scope.ajouterFavori = function () {
            console.log("ajout favori");

            var query = "INSERT INTO Favoris (vinId, utilisateurId) VALUES (?,?)";
            $cordovaSQLite.execute(db, query, [$scope.detailsModel.vin.id, $scope.detailsModel.utilisateurId]).then(function (res) {
            }, function (err) {
                console.error(err);
            });
        }
    }
    else {
        $state.go("app.connexion", { redirect: true });
    }
})

.controller('CarteCtrl', function ($scope, $rootScope, $state) {
    if ($rootScope.connecte == true) {
        function success(pos) {
            var crd = pos.coords;
            console.log('Your current position is:');
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            console.log('More or less ' + crd.accuracy + ' meters.');
            $.get("http://dev.virtualearth.net/REST/v1/Locations/" + crd.latitude + "," + crd.longitude + "?key=x1YM9wPP7jP8Zubo84cF~iNVEyFBL3uIbHd-lBU8vwg~Ap4rSG2x_BZiNfSWXEHNjgUL8-HzUVYeEvbb8dEVDmwEiazoBqjulsiYcNp_VFdW", function (data, status) {
                console.log(data);
                //console.log(data.resourceSets[0].resources[0].address.formattedAddress);
                $scope.adresse = data.resourceSets[0].resources[0].address.formattedAddress;
                console.log($scope.adresse);
                document.getElementById('adresse').innerHTML = $scope.adresse;
                $('adresse').html($scope.adresse);
            });
            Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', {

                callback: function () {
                    23
                    var map = new Microsoft.Maps.Map($('#divMap').get(0),
                    {
                        //credentials: "x1YM9wPP7jP8Zubo84cF~iNVEyFBL3uIbHd-lBU8vwg~Ap4rSG2x_BZiNfSWXEHNjgUL8-HzUVYeEvbb8dEVDmwEiazoBqjulsiYcNp_VFdW",
                        credentials: "AvwYogeHamJ_OUE_uJTXJHmBcDkmNcs2mryb2mpdOKGCCLU8sb_0Bf3BorGBVkLN",
                        mapTypeId: Microsoft.Maps.MapTypeId.road,
                        enableClickableLogo: false,
                        enableSearchLogo: false,
                        center: new Microsoft.Maps.Location(crd.latitude, crd.longitude),
                        zoom: 13,
                        theme: new Microsoft.Maps.Themes.BingTheme()
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
        function stopWatch() {
            navigator.geolocation.clearWatch();
        }
        options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
        navigator.geolocation.watchPosition(success, error, options);
    }
    else {
        $state.go("app.connexion", { redirect: true });
    }
})

.controller('FavorisCtrl', function ($scope, $ionicPlatform, $cordovaSQLite, $rootScope, $state) {
    if ($rootScope.connecte == true) {
        $scope.favoris = [];
        $scope.listRecherche = [];
        var query = 'SELECT * FROM Favoris WHERE utilisateurId = (?)';
        var query2 = "SELECT * FROM Vins WHERE id = (?)";
        $cordovaSQLite.execute(db, query, [$rootScope.utilisateurId]).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.favoris.push(res.rows.item(i));
                    //console.log("id = " + res.rows.item(i).id + " vinId = " + res.rows.item(i).vinId + " utilisateurId = " + res.rows.item(i).utilisateurId);
                }
            }
            $scope.favoris.forEach(function (fav) {
                var Id = fav.vinId;
                $cordovaSQLite.execute(db, query2, [Id]).then(function (res) {
                    $scope.listRecherche.push(res.rows.item(0));
                  
                }),
                function (err) {
                    console.error(err);
                }
            });
        });
        
    }

    else 
    {
        $state.go("app.connexion", { redirect: true });
    }

    $scope.supprFavori = function (x) {
        var query = 'DELETE FROM Favoris where vinId= (?)';
        $cordovaSQLite.execute(db, query, [x]).then(function (res) {
        }, function (err) {
            alert("error deleting row=" + err);
        });

    };
})
