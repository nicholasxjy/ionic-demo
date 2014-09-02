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
    .factory('UserService', ['$q','Auth', function($q, Auth){
        if (angular.isUndefined(AV)) {
            console.log("No Avos based, u should check it out!");
            return;
        }
        AV.initialize("v5x1a7uaaoimbrsuiz6w2986laifwdgqdvw0ab74gbvlyaye",
         "9gvsl3uc51l0lnv2nlqlkts538ya5bjmd0ky4p13inoxdhho");
        var userService = {
            setGender: function(gender) {
                var defer = $q.defer();
                var user = AV.User.current();
                user.set('gender', gender);
                user.save(null, {
                    success: function(user) {
                        defer.resolve(user);
                    },
                    error: function(user, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            setLocation: function(location) {
                var defer = $q.defer();
                var user = AV.User.current();
                user.set('location', location);
                user.save(null, {
                    success: function(user) {
                        defer.resolve(user);
                    },
                    error: function(user, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            setProfile: function(profile) {
                var defer = $q.defer();
                var user = AV.User.current();
                user.set('profile', profile);
                user.save(null, {
                    success: function(user) {
                        defer.resolve(user);
                    },
                    error: function(user, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            setAvatar: function(avatar) {
                var defer = $q.defer();
                var user = AV.User.current();
                user.set('avatar', avatar.url);
                user.save(null, {
                   success: function(user) {
                       defer.resolve(user);
                   },
                   error: function(user, error) {
                       defer.reject(error);
                   }
                });
                return defer.promise;
            },
            getUserInfoById: function(id) {
                var defer = $q.defer();
                var query = new AV.Query(AV.User);
                query.get(id, {
                    success: function(user) {
                        defer.resolve(user);
                    },
                    error: function(user, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            getUserInfoByName: function(name) {
                var defer = $q.defer();
                var query = new AV.Query(AV.User);
                query.equalTo('username', name);
                query.find({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            }
        };

        return userService;
    }])
    .factory('NotificationService', ['$q', function($q){
        if (angular.isUndefined(AV)) {
            console.log("No Avos based, u should check it out!");
            return;
        }
        AV.initialize("v5x1a7uaaoimbrsuiz6w2986laifwdgqdvw0ab74gbvlyaye",
         "9gvsl3uc51l0lnv2nlqlkts538ya5bjmd0ky4p13inoxdhho");

        var NotiService = {
            createAtNotification: function(notiInfo) {
                var defer = $q.defer();
                var Notification = new AV.Object.extend('Notification');
                var noti = new Notification();
                noti.set('questionid', notiInfo.questionid);
                noti.set('creatuser', notiInfo.createuser);
                noti.set('touser', notiInfo.touser);
                noti.set('hasChecked', false);
                noti.set('type', 'at')
                noti.save(null, {
                    success: function(noti) {
                        defer.resolve(noti);
                    },
                    error: function(noti, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            createLikeNotification: function(notiInfo) {
                var defer = $q.defer();
                var Notification = new AV.Object.extend('Notification');
                var noti = new Notification();
                noti.set('questionid', notiInfo.questionid);
                noti.set('creatuser', notiInfo.createuser);
                noti.set('touser', notiInfo.touser);
                noti.set('hasChecked', false);
                noti.set('type', 'like');
                noti.save(null, {
                    success: function(noti) {
                        defer.resolve(noti);
                    },
                    error: function(noti, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            createNeedAnswerNotification: function(notiInfo) {
                var defer = $q.defer();
                var Notification = new AV.Object.extend('Notification');
                var noti = new Notification();
                noti.set('questionid', notiInfo.questionid);
                noti.set('creatuser', notiInfo.createuser);
                noti.set('touser', notiInfo.touser);
                noti.set('hasChecked', false);
                noti.set('type', 'needanswer');
                noti.save(null, {
                    success: function(noti) {
                        defer.resolve(noti);
                    },
                    error: function(noti, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            createAnsweredNotification: function(notiInfo) {
                var defer = $q.defer();
                var Notification = new AV.Object.extend('Notification');
                var noti = new Notification();
                noti.set('questionid', notiInfo.questionid);
                noti.set('creatuser', notiInfo.createuser);
                noti.set('touser', notiInfo.touser);
                noti.set('hasChecked', false);
                noti.set('type', 'answered');
                noti.save(null, {
                    success: function(noti) {
                        defer.resolve(noti);
                    },
                    error: function(noti, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            createCommentNotification: function(notiInfo) {
                var defer = $q.defer();
                var Notification = new AV.Object.extend('Notification');
                var noti = new Notification();
                noti.set('questionid', notiInfo.questionid);
                noti.set('creatuser', notiInfo.createuser);
                noti.set('touser', notiInfo.touser);
                noti.set('hasChecked', false);
                noti.set('type', 'comment');
                noti.save(null, {
                    success: function(noti) {
                        defer.resolve(noti);
                    },
                    error: function(noti, error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            }
        };

        return NotiService;
    }])
    .factory('QuestionService', ['$q', 'UserService', 'NotificationService', function($q, UserService, NotificationService){
        if (angular.isUndefined(AV)) {
            console.log("No Avos based, u should check it out!");
            return;
        }
        AV.initialize("v5x1a7uaaoimbrsuiz6w2986laifwdgqdvw0ab74gbvlyaye",
         "9gvsl3uc51l0lnv2nlqlkts538ya5bjmd0ky4p13inoxdhho");
        var Question = new AV.Object.extend('Question');
        var questionService = {
            createQuestion: function(questionInfo) {
                var defer = $q.defer();
                var question = new Question();
                var currentUser = AV.User.current();
                var master = {
                    name: currentUser.attributes.name,
                    email: currentUser.attributes.email,
                    id: currentUser.id,
                    avatar: currentUser.attributes.avatar,
                    gender: currentUser.attributes.gender,
                    location: currentUser.attributes.location,
                    profile: currentUser.attributes.profile,
                    createAt: currentUser.createAt,
                    updateAt: currentUser.updateAt
                }
                if (currentUser) {
                    question.set('master', master);
                }
                UserService.getUserInfoByName(questionInfo.answerUserName)
                    .then(function(user) {
                        var answeruser = {
                          name: user.attributes.name,
                          email: user.attributes.email,
                          id: user.id,
                          avatar: user.attributes.avatar,
                          gender: user.attributes.gender,
                          location: user.attributes.location,
                          profile: user.attributes.profile,
                          createAt: user.createAt,
                          updateAt: user.updateAt
                        }
                        question.set('answeruser', answeruser);
                    }, function(error) {

                    });
                if (questionInfo.groupusers && questionInfo.groupusers.length > 0) {
                    var groupusers = [];
                    angular.forEach(questionInfo.groupusers, function(groupuser) {
                        UserService.getUserInfoByName(groupuser)
                            .then(function(user) {
                                var groupuser = {
                                  name: user.attributes.name,
                                  email: user.attributes.email,
                                  id: user.id,
                                  avatar: user.attributes.avatar,
                                  gender: user.attributes.gender,
                                  location: user.attributes.location,
                                  profile: user.attributes.profile,
                                  createAt: user.createAt,
                                  updateAt: user.updateAt
                                }
                                groupusers.push(groupuser);
                            }, function(error) {

                            });
                    });
                    question.set('groupusers', groupusers);
                }
                question.set('secure', questionInfo.secure);
                question.set('content', questionInfo.content);

                question.save(null, {
                    success: function(question) {
                        //根据情况发送notification

                        //need answer noti
                        var neednotiInfo = {
                            questionid: question.attributes.id,
                            createuser: question.attributes.master,
                            touser: question.attributes.answeruser
                        };
                        NotificationService.createNeedAnswerNotification(neednotiInfo)
                            .then(function() {
                               angular.forEach(question.groupusers, function(togroupuser) {
                                var atnotiInfo = {
                                    questionid: question.attributes.id,
                                    createuser: question.attributes.master,
                                    touser: togroupuser
                                };
                                NotificationService.createAtNotification(atnotiInfo)
                                    .then(function() {
                                        console.log("at noti send");
                                    }, function(error) {

                                    })
                                });
                                defer.resolve('ok');
                            }, function(error) {

                            })
                    },
                    error: function(question, error) {
                        defer.reject(error);
                    }
                });

                return defer.promise;

            },
            getAllQuestions: function(page) {
                page = page > 0 ? page : 1;
                var defer = $q.defer();
                var query1 = new AV.Query(Question);
                var query2 = new AV.Query(Question);
                var query3 = new AV.Query(Question);
                var currentuser = AV.User.current();
                query1.equalTo('master.id', currentuser.id);
                query2.containsAll('groupusers.id', [currentuser.id]);
                query3.equalTo('secure', 0); //secure 0: public 1: private 2: group
                var mainquery = new AV.Query.or(query1, query2, query3);
                mainquery.descending('createAt');
                mainquery.skip((page-1)*10);
                mainquery.find({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;

            },
            getQuestionsByUser: function(name, page) {
                page = page >0 ? page:1;
                var defer = $q.defer();
                //var cuser = AV.User.current();
                var query1 = new AV.Query(Question);
                var query2 = new AV.Query(Question);
                query1.equalTo('master.name', name);
                query1.equalTo('secure', 0);
                query2.equalTo('master.name', name);
                query2.containsAll('groupusers.name', [name]);
                var mainquery = new AV.Query.or(query1, query2);
                mainquery.descending('createAt');
                mainquery.skip((page-1)*10);
                mainquery.find({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            getCurrentUserQuestions: function(name, page) {
                page = page > 0 ? page:1;
                var defer = $q.defer();
                var cuser = AV.User.current();
                var query = new AV.Query(Question);
                if (cuser.name === name) {
                    query.equalTo('master.name', name);
                }
                query.descending('createAt');
                query.skip((page-1)*10);
                query.find({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            getAnswersByUser: function(name, page) {
                page = page > 0? page:1;
                var defer = $q.defer();
                var query1 = new AV.Query(Question);
                var query2 = new AV.Query(Question);
                query1.equalTo('touser.name', name);
                query1.equalTo('secure', 0);
                query2.equalTo('touser.name', name);
                query2.containsAll('groupusers.name', name);
                var mainquery = new AV.Query.or(query1, query2);
                mainquery.descending('createAt');
                mainquery.skip((page-1)*10);
                mainquery.find({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            getCurrentUserAnswers: function(name, page) {
                page = page > 0?page:1;
                var cuser = AV.User.current();
                var defer = $q.defer();
                var query = new AV.Query(Question);
                if (name === cuser.name) {
                    query.equalTo('touser.name', cuser.name);
                }

                query.descending('createAt');
                query.skip((page-1)*10);
                query.find({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            }
        }
        return questionService;
    }])