// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

   
         .state('app.recherches', {
             url: '/recherches',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/recherches.html',
                     controller: 'RecherchesCtrl'
                 }
             }
         })


         .state('app.recherche', {
             url: '/recherche',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/recherche.html',
                     controller: 'RechercheCtrl'
                 }
             }
         })
    .state('app.ajouter', {
        url: '/ajouter',
        views: {
            'menuContent': {
                templateUrl: 'templates/ajouter.html',
                controller: 'AjouterCtrl'
            }
        }
    })


         .state('app.listes', {
             url: '/listes',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/listes.html',
                     controller: 'ListesCtrl'
                 }
             }
         })

 .state('app.liste', {
     url: '/listes/:listeId/:couleur',
     views: {
         'menuContent': {
             templateUrl: 'templates/liste.html',
             controller: 'ListeCtrl'
         }
     }
 })

.state('app.carte', {
            url: '/carte',
            views: {
                'menuContent': {
                    templateUrl: 'templates/carte.html',
                    controller: 'CarteCtrl'
                }
            }
        })

    .state('app.details', {
        url: '/listes/:listeId/:couleur/:vinId',
     views: {
         'menuContent': {
             templateUrl: 'templates/details.html',
             controller: 'DetailsCtrl'
         }
     }
      });

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/listes');
});
