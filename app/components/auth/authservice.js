var app = angular.module('myApp');

app.service('AuthService', function($location, firebase) {

    this.logged = false;
    this.user = null;

    this.checkLogin = function() {
        if (!firebase.auth().currentUser) {
            $location.path('/login');
        } else {
            this.logged = true;
            this.user = firebase.auth().currentUser;
        }
    };

});
