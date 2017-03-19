'use strict';

angular.module('myApp.orders', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/orders', {
            template: '<orders></orders>'
        });
    }])
    .component('orders', {
        templateUrl: 'orders/orders.html',
        controller: ordersCtrl,
        bindings: {
            hero: '='
        }
    });

function ordersCtrl($rootScope, $mdSidenav, $location) {
    console.log('ordersCtrl!!');
}

