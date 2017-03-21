angular.module('myApp.users')
    .component('userForm', {
        templateUrl: 'users/user_form.html',
        controller: usersFormCtrl,
        bindings: {
            item: '<'
        }
    });


// https://material.angularjs.org/latest/demo/dialog
function usersFormCtrl($mdDialog) {
    console.log('User form!');

    this.cancel = function() {
        console.log('cancelo');
        $mdDialog.cancel();
    };

    this.save = function() {
        console.log('Salvo');
        $mdDialog.cancel();
    };
}
