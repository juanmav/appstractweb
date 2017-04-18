'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            template: '<login></login>'
        });
    }])
    .component('login', {
        templateUrl: 'login/login.html',
        controller: loginCtrl,
    });

function loginCtrl($scope, $location, firebase, $firebaseAuth, AuthService) {

    this.googleConnect = function() {
        // login with Google
        $firebaseAuth().$signInWithPopup("google", {
            scope: ['email']
        })
            .then(function(authData) {
                // handle authData in onAuth handler in app.js in run method with Auth.$onAuth(function(authData) { ... });
                console.log("Authenticated successfully with payload:", authData);

                firebase.database().ref()
                    .child("users")
                    .orderByChild('email')
                    .equalTo(authData.user.email)
                    .once('value')
                    .then( snapshot => {
                        let users = snapshot.val();
                        if (users){
                            let user = users[Object.keys(users)[0]];
                            if (user.admin) {
                                console.log('Es admin');
                                AuthService.logged = true;
                                AuthService.user = authData.user;
                                $location.path('/orders');
                                $scope.$apply();
                            } else {
                                $scope.err = 'El usuario no es Admin';
                                $scope.$apply();
                            }
                        } else {
                            $scope.err = 'El usuario no es Admin';
                            $scope.$apply();
                        }
                    });
            })
            .catch(function(err) {
                $scope.err = 'Error code: ' + err.code + '. ' + err.message;
            });
    };
}
