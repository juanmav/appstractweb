'use strict';

describe('myApp.orders module', function() {

    beforeEach(module('myApp.orders'));

    describe('orders controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var ordersCtrl = $controller('ordersCtrl');
            expect(ordersCtrl).toBeDefined();
        }));

    });
});