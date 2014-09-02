// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('yornApp', ['ionic', 'app.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.
    state('welcome', {
      url: '/',
      templateUrl: 'templates/welcome.html',
      controller: 'WelcomeController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignUpController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .state('forgetpass', {
      url: '/forgetpass',
      templateUrl: 'templates/forgetpass.html',
      controller: 'ForgetPassController'
    })
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'templates/home.html',
      controller: 'AppController'
    })
    .state('app.index', {
      url: '/index',
      views: {
        "menuContent": {
          templateUrl: 'templates/app-index.html'
        }
      }
    })
    .state('app.setting', {
      url: '/settings',
      views: {
        "menuContent": {
          templateUrl: 'templates/user/setting.html'
        }
      }
    })
    .state('app.user', {
      url: '/:name',
      views: {
        "menuContent": {
          templateUrl: 'templates/user/index.html'
        }
      }
    })
    .state('app.user.questions', {
      url: '/questions',
      views: {
        "menuContent": {
          templateUrl: 'templates/user/questions.html'
        }
      }
    })

})
