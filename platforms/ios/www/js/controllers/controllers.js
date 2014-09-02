angular.module('app.controllers', ['app.services'])
    .controller('WelcomeController', function($scope) {

    })
    .controller('SignUpController', function($rootScope, $scope, Auth, $timeout, $state) {
        $scope.doSignUp = function(signUpData) {
            Auth.signUp(signUpData)
                .then(function(user) {
                    console.log(user);
                    $rootScope.currentUser = {
                        id: user.id,
                        name: user.attributes.username,
                        email: user.attributes.email,
                        createAt: user.createAt,
                        updateAt: user.updateAt
                    };
                    $scope.hasNotification = true;
                    $timeout(function() {
                        $state.go('app.index');
                    }, 1500);
                }, function(error) {
                    console.log(error);
                    alert("Something goes wrong here!");
                });
        };
        $scope.cancelSignup = function() {
            $state.go('welcome');
        }
    })
    .controller('LoginController', function($rootScope, $scope, Auth, $timeout, $state) {
        $scope.doLogin = function(loginData) {
            Auth.login(loginData)
                .then(function(user) {
                    $state.go('app.index');
                }, function(error) {

                })
        };

        $scope.cancelLogin = function() {
            $state.go('welcome');
        }
    })
    .controller('ForgetPassController', function($scope, $state) {
        $scope.cancelForgetPass = function() {
            $state.go('login');
        }
    })

    .controller('AppController', function($rootScope, $scope, $state, Auth) {
        Auth.currentUser()
            .then(function(user) {
                // console.log(user);
                $scope.currentUser = {
                   id: user.id,
                   name: user.attributes.username,
                   email: user.attributes.email,
                   emailActive: user.attributes.emailVerified,
                   createAt: user.createAt,
                   updateAt: user.updateAt
                };
            }, function(error) {
                alert(error);
            });

        $scope.doLogout = function() {
            Auth.logout();
            $state.go('welcome');
        };
    })
    .controller('SettingController', function($scope) {

    })

    .controller('PostController', function($scope, $cordovaGeolocation, $cordovaCapture) {
        $scope.getCurrentLocation = function() {
            $cordovaGeolocation.getCurrentPosition()
            .then(function(position) {
            }, function(error) {
                console.log(error);
            });
        };

        $scope.attachPhoto = function() {
            var options = {limit: 3};
            $cordovaCapture.captureImage(options)
            .then(function(imageData) {
                console.log(imageData);
            }, function(err) {
                console.log(err);
            })
        };

        $scope.attachVideo = function() {
            var options = {limit: 3, duration: 15};
            $cordovaCapture.captureVideo(options)
                .then(function(videoData) {
                    console.log(videoData);
                }, function(err) {
                    console.log(err);
                })
        }
    })
