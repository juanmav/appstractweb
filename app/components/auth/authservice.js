var app = angular.module('myApp');

app.service('AuthService', function($location, firebase) {

    this.logged;
    this.user;

    this.checkLogin = function() {
        if (!firebase.auth().currentUser) {
            $location.path('/login');
        }
    };

});
