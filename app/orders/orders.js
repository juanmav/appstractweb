'use strict';

angular.module('myApp.orders', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/orders', {
            template: '<orders></orders>'
        });
    }])
    .component('orders', {
        templateUrl: 'orders/orders.html',
        controller: ordersCtrl
    });

function ordersCtrl($rootScope, $scope, firebase, $firebaseArray, $mdDialog, AuthService) {

    AuthService.checkLogin();

    this.filter = {
        show: false,
        value: ''
    };

    this.selected = [];

    this.query = {
        order: 'status',
        limit: 15,
        page: 1
    };

    this.removeFilter = function() {
        this.filter.show = false;
        this.filter.value = '';
    };

    // Miro el filtro!
    $scope.$watch(function() {
        return this.filter.value;
    }.bind(this), function() {
        this.getItems(this.filter.value);
    }.bind(this));

    /**
     * Metodos a implementar en cada Entidad.
     * */

    this.getItems = function(page, limit) {
        console.log('Obtener items Implementame');
        console.log(page);
        console.log(limit);

        this.items = $firebaseArray(firebase.database().ref().child("orders"));

        this.promise = this.items.$loaded()
    };

    this.formater = function(item) {
        let value = {};
        value.user = item.user[Object.keys(item.user)[0]];
        value.recipient = item.recipient[Object.keys(item.recipient)[0]];
        value.product_id = Object.keys(item.product_type)[0];
        value.celebrities = item.celebrities[Object.keys(item.celebrities)[0]];
        value.celebrities.name = value.celebrities.first_name + ' ' + value.celebrities.last_name;
        return value;
    };

    this.edit = function() {
        $mdDialog.show({
                template: '<order-form item="item" items="items"></order-form>',
                locals: {
                    item: this.selected[0],
                    items: this.items
                },
                controller: function(item, items, $scope) {
                    $scope.item = item;
                    $scope.items = items;
                }
            })

            .then(() => {
                this.getItems()
            });
    };

    this.add = function() {
        console.log('Nuevo Implementame');
        $mdDialog.show({
                template: '<order-form></order-form>',
            })
            .then(() => {
                this.getItems()
            });
    };

    this.remove = function() {
        console.log('Eleminiacion Implementame')
    };

    $rootScope.$on('orderUpdated', () => {
        this.getItems();
    })

}
