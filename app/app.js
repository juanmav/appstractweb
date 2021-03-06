'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [

    // External dependencies
    'ngRoute',
    'ngResource',
    'ngMaterial',
    'md.data.table',
    'ngLodash',
    'ngFileUpload',

    // Views & components
    'myApp.version',
    'myApp.header',
    'myApp.sidemenu',
    'myApp.orders',
    'myApp.users',
    'myApp.celebrities',
    'myApp.login',

    // Services
    'firebase'
])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        console.log('Router Config');
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/login'});
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
