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

function loginCtrl($rootScope, $route, $scope, $location, $firebaseObject, $firebaseAuth) {

    this.googleConnect = function() {
        // login with Google
        $firebaseAuth().$signInWithPopup("google", {scope: ['email']}).then(function(authData) {
            // handle authData in onAuth handler in app.js in run method with Auth.$onAuth(function(authData) { ... });
            console.log("Authenticated successfully with payload:", authData);
            $location.path('/orders');
        })
        .catch(function(err) {
            $scope.err = 'Error code: ' + err.code + '. ' + err.message;
        });
    };
}
