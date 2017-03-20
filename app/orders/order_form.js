angular.module('myApp.orders')
    .component('orderForm', {
        templateUrl: 'orders/order_form.html',
        controller: ordersFormCtrl,
        bindings: {
            item: '='
        }
    });


// https://material.angularjs.org/latest/demo/dialog
function ordersFormCtrl($mdDialog) {
    console.log('Order form!');

    this.cancel = function() {
        console.log('cancelo');
        $mdDialog.cancel();
    };

    this.save = function() {
        console.log('Salvo');
        $mdDialog.cancel();
    };
}