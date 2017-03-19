'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [

    // External dependencies
    'ngRoute',
    'ngMaterial',

    // Views & components
    'myApp.version',
    'myApp.header',
    'myApp.sidemenu',
    'myApp.orders',
    'myApp.users',
    'myApp.celebrities'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        console.log('Router Config');
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/users'});
    }])
    .config(function ($mdThemingProvider) {
        console.log('Theming Congig');
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('purple')
            .warnPalette('red');
    })
    .config(function($mdIconProvider) {
        // https://materialdesignicons.com/
        $mdIconProvider
            .defaultIconSet('./mdi.svg')
    });


