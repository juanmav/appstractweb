'use strict';

angular.module('myApp.sidemenu', ['ngRoute'])
    .component('sidemenu', {
        templateUrl: 'components/sidemenu/sidemenu.html',
        controller: sideMenuCtrl,
        bindings: {
            hero: '='
        }
    });

function sideMenuCtrl($rootScope, $route, $mdSidenav, $location, AuthService) {
    console.log('sidemenu!!');

    $rootScope.$on('sidemenu', function() {
        console.log('Lets Open Menu');
        $mdSidenav('leftMenu').open();
    });

    this.goToView = function(url) {
        console.log(url);
        $location.path(url);
        $mdSidenav('leftMenu').close();
    };

    this.logOut = function() {
        console.log('logout');
        $mdSidenav('leftMenu').close();

        localStorage.removeItem("firebase:session::<host-name>");
        firebase.auth().signOut();

        AuthService.logged = false;
        AuthService.user = null;

        $location.path('/login');
        $route.reload();
    };

}
