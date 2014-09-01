angular.module('app.services', [])
    .factory('Auth', ['$q', function($q){
        if (angular.isUndefined(AV)) {
            console.log("No Avos based, u should check it out!");
            return;
        }
        AV.initialize("v5x1a7uaaoimbrsuiz6w2986laifwdgqdvw0ab74gbvlyaye",
         "9gvsl3uc51l0lnv2nlqlkts538ya5bjmd0ky4p13inoxdhho");
        var authService = {

            signUp: function(signupInfo) {
                var user = new AV.User();
                var defer = $q.defer();
                user.set('username', signupInfo.name);
                user.set('email', signupInfo.email);
                user.set('password', signupInfo.password);
                user.signUp(null, {
                    success: function(user) {
                        defer.resolve(user);
                    },
                    error: function(user, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            login: function(loginInfo) {
                var defer = $q.defer();
                AV.User.logIn(loginInfo.name, loginInfo.password, {
                    success: function(user) {
                        defer.resolve(user);
                    },
                    error: function(user, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            logout: function() {
                AV.User.logOut();
            },
            currentUser: function() {
                var defer = $q.defer();
                var currentuser = AV.User.current();
                if (currentuser) {
                    defer.resolve(currentuser);
                } else {
                    defer.reject("can't find the current user");
                }
                return defer.promise;
            },
            resetPass: function(forgetpassInfo) {
                var defer = $q.defer();
                AV.User.requestPasswordReset(forgetpassInfo.email, {
                    success: function() {
                        defer.resolve("Email has been sent to user.");
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            }
        };
        return authService;
    }])