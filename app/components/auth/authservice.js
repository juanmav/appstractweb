var app = angular.module('myApp');

app.service('AuthService', function($location, firebase) {

    this.logged = false;
    this.user = null;
    this.token = null;

    this.checkLogin = function() {
        if (this.logged || firebase.auth().currentUser) {
            this.logged = true;
            this.user = firebase.auth().currentUser;
            firebase.auth().currentUser.getToken(true).then(token => {
                this.token = token;
            });
        } else {
            $location.path('/login');
        }
    };


});
