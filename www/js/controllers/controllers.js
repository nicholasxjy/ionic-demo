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
        }
    })
    .controller('LoginController', function($rootScope, $scope, Auth, $timeout, $state) {
        $scope.doLogin = function(loginData) {
            Auth.login(loginData)
                .then(function(user) {
                    $state.go('app.index');
                }, function(error) {

                })
        }
    })
    .controller('ForgetPassController', function($scope) {

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
        }
    })
    .controller('SettingController', function($scope) {

    })
