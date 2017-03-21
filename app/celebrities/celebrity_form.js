angular.module('myApp.users')
    .component('celebrityForm', {
        templateUrl: 'celebrities/celebrity_form.html',
        controller: celebritiesFormCtrl,
        bindings: {
            item: '<'
        }
    });


// https://material.angularjs.org/latest/demo/dialog
function celebritiesFormCtrl($mdDialog) {
    console.log('Celebrity form!');

    this.cancel = function() {
        console.log('cancelo');
        $mdDialog.cancel();
    };

    this.save = function() {
        console.log('Salvo');
        $mdDialog.cancel();
    };
}
