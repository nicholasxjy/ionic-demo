// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('yornApp', ['ionic', 'app.controllers', 'ngCordova'])

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
  // $rootScope.$on('$stateChangeStart', function() {
  //   $ionicLoading.show({
  //     templateUrl: 'templates/loading.html'
  //   });
  // });
  // $rootScope.$on('$stateChangeSuccess', function() {
  //   $ionicLoading.hide();
  // })
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
      url: '/setting',
      views: {
        "menuContent": {
          templateUrl: 'templates/user/setting.html',
          controller: 'SettingController'
        }
      }
    })
    .state('app.post', {
      url: '/post',
      views: {
        'menuContent': {
          templateUrl: 'templates/post.html',
          controller: 'PostController'
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
    .state('app.userquestions', {
      url: '/:name/questions',
      views: {
        "menuContent": {
          templateUrl: 'templates/user/questions.html'
        }
      }
    })
    .state('app.userqrcode', {
        url: '/:name/qrcode',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/qrcode.html',
                controller: 'QRCodeController'
            }
        }
    })
    .state('app.setavatar', {
        url: '/setting/avatar',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/setting-avatar.html'
            }
        }
    })
    .state('app.setgender', {
        url: '/setting/gender',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/gender.html',
                controller: 'SetGenderController'
            }
        }
    })
    .state('app.setlocation', {
        url: '/setting/location',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/location.html',
                controller: 'SetLocationController'
            }
        }
    })
    .state('app.setprofile', {
        url: '/setting/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/user/profile.html',
                controller: 'SetProfileController'
            }
        }
    })

})
