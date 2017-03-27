'use strict';

angular.module('myApp.header', ['ngRoute'])
.component('header', {
    templateUrl: 'components/header/header.html',
    controller: headerCtrl,
    bindings: {
        hero: '='
    }
});

function headerCtrl($rootScope, $scope, firebase) {
    console.log('header!');

    var firebaseUser = firebase.auth().currentUser;

    if (firebaseUser) {
        $scope.logged = true;
        $scope.displayName = firebaseUser.displayName;
        $scope.email = firebaseUser.email;
        $scope.photoURL = firebaseUser.photoURL;
    } else {
        $scope.logged = false;
        $scope.displayName = '';
        $scope.email = '';
        $scope.photoURL = '';
    }

    this.open = function(){
        console.log('Open Menu');
        $rootScope.$broadcast('sidemenu');
    }
}
