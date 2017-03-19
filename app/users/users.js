'use strict';

angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            template: '<users></users>'
        });
    }])
    .component('users', {
        templateUrl: 'users/users.html',
        controller: usersCtrl,
        bindings: {
            hero: '='
        }
    });

function usersCtrl($rootScope, $mdSidenav, $location) {
    console.log('usersCtrl!!');
}

