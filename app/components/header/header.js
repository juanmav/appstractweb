'use strict';

angular.module('myApp.header', ['ngRoute'])
    .component('header', {
        templateUrl: 'components/header/header.html',
        controller: headerCtrl,
        bindings: {
            hero: '='
        }
    });

function headerCtrl($rootScope, $scope, firebase, AuthService) {
    console.log('header!');

    this.authservice = AuthService;

    this.open = function() {
        console.log('Open Menu');
        $rootScope.$broadcast('sidemenu');
    }
}
