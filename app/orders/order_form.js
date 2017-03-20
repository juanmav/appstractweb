angular.module('myApp.orders')
    .component('orderForm', {
        templateUrl: 'orders/order_form.html',
        controller: ordersFormCtrl
    });


// https://material.angularjs.org/latest/demo/dialog
function ordersFormCtrl() {
    console.log('Order form!');


    this.cancel = function() {
        $mdDialog.cancel();
    };

    this.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}