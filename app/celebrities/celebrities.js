'use strict';

angular.module('myApp.celebrities', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/celebrities', {
            template: '<celebrities></celebrities>'
        });
    }])
    .component('celebrities', {
        templateUrl: 'celebrities/celebrities.html',
        controller: celebritiesCtrl,
        bindings: {
            hero: '='
        }
    });

function celebritiesCtrl($rootScope, $mdSidenav, $location) {
    console.log('celebritiesCtrl!!');
}

