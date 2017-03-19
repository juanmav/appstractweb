'use strict';

angular.module('myApp.header', ['ngRoute'])
    .component('header', {
        templateUrl: 'components/header/header.html',
        controller: headerCtrl,
        bindings: {
            hero: '='
        }
    });

function headerCtrl($rootScope) {
    console.log('header!');

    this.open = function(){
        console.log('Open Menu');
        $rootScope.$broadcast('sidemenu');
    }
}