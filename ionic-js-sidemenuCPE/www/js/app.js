// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
       

        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        try {
            db = $cordovaSQLite.openDB({ name: "winelove.db", location: 'default' });
        } catch (error) {
            alert(error);
        }
        try {
            //$cordovaSQLite.execute(db, 'DROP TABLE Vins', []);
            //$cordovaSQLite.execute(db, 'DROP TABLE Tags', []);
            //$cordovaSQLite.execute(db, 'DROP TABLE Favoris', []);
            //$cordovaSQLite.execute(db, 'DROP TABLE Utilisateurs', []);
            //$cordovaSQLite.execute(db, 'DROP TABLE Photos', []);
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Vins (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, appellation TEXT, millesime INTEGER, viticulteur TEXT, lieu TEXT, date TEXT, note INTEGER, couleur TEXT)');
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Favoris (id INTEGER PRIMARY KEY AUTOINCREMENT, vinId INTEGER, utilisateurId INTEGER)');
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Tags (id INTEGER PRIMARY KEY AUTOINCREMENT, vinId INTEGER, texte TEXT)');
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Utilisateurs (id INTEGER PRIMARY KEY AUTOINCREMENT, login TEXT, mdp TEXT, nom TEXT)');
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Photos (id INTEGER PRIMARY KEY AUTOINCREMENT, vinId INTEGER, url TEXT)');
        }
        catch (error) {
            alert("Error creating table->" + error);
        }

        localStorage.clear();
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

        .state('app.connexion', {
            url: '/connexion',
            views: {
                'menuContent': {
                    templateUrl: 'templates/connexion.html',
                    controller: 'ConnexionCtrl'
                }
            }
        })

           .state('app.inscription', {
               url: '/inscription',
               views: {
                   'menuContent': {
                       templateUrl: 'templates/inscription.html',
                       controller: 'InscriptionCtrl'
                   }
               }
           })

   
         .state('app.recherches', {
             cache: false,
             url: '/recherches',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/recherches.html',
                     controller: 'RecherchesCtrl'
                 }
             }
         })


    .state('app.ajouter', {
        cache: false,
        url: '/ajouter',
        views: {
            'menuContent': {
                templateUrl: 'templates/ajouter.html',
                controller: 'AjouterCtrl'
            }
        }
    })


         .state('app.listes', {
             cache: false,
             url: '/listes',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/listes.html',
                     controller: 'ListesCtrl'
                 }
             }
         })

 .state('app.liste', {
     cache: false,
     url: '/listes/:listeId/:couleur',
     views: {
         'menuContent': {
             templateUrl: 'templates/liste.html',
             controller: 'ListeCtrl'
         }
     }
 })

.state('app.carte', {
    cache: false,
            url: '/carte',
            views: {
                'menuContent': {
                    templateUrl: 'templates/carte.html',
                    controller: 'CarteCtrl'
                }
            }
        })

    .state('app.details', {
         cache: false,
        url: '/listes/:listeId/:couleur/:vinId',
        views: {
            'menuContent': {
                templateUrl: 'templates/details.html',
                controller: 'DetailsCtrl'
            }
        }
    })

    .state('app.favoris', {
        cache: false,
        url: '/favoris',
        views: {
            'menuContent': {
                templateUrl: 'templates/favoris.html',
                controller: 'FavorisCtrl'
            }
        }
    })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/connexion');
});
