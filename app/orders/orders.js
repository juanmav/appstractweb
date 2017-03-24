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

function ordersCtrl($rootScope, $scope, firebase, $firebaseArray, $mdDialog) {
    this.selected = [];

    this.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    this.removeFilter = function () {
        this.filter.show = false;
        this.query.filter = '';
    };

    // Miro el filtro!
    $scope.$watch(function () {
        return this.query.filter;
    }.bind(this), function () {
        this.getItems(this.query.filter);
    }.bind(this));

    /**
     * Metodos a implementar en cada Entidad.
     * */

    this.getItems = function (page, limit) {
        console.log('Obtener items Implementame');
        console.log(page);
        console.log(limit);

        this.promise = $firebaseArray(firebase.database().ref().child("orders")).$loaded()
            .then(orders => {
                this.items = orders;
            })
            .catch( e => {
                console.error(e);
            })
    };

    this.formater = function(item){
        let value = {};
        value.dt_duedate = new Date(item.dt_duedate);
        value.user = item.user[Object.keys(item.user)[0]];
        value.recipient = item.recipient[Object.keys(item.recipient)[0]];
        value.product_id = Object.keys(item.product_type)[0];
        value.celebrities = item.celebrities[Object.keys(item.celebrities)[0]];
        value.celebrities.name = value.celebrities.first_name + ' ' + value.celebrities.last_name;
        return value;
    };

    this.edit = function(){
        $mdDialog.show({
            template: '<order-form item="item" items="items"></order-form>',
            locals : {
                item: this.selected[0],
                items: this.items
            },
            controller: function (item, items, $scope) {
                $scope.item = item;
                $scope.items = items;
            }
        })
            .then(() => {
                this.getItems()
            });
    };

    this.add = function () {
        console.log('Nuevo Implementame');
        $mdDialog.show({
            template: '<order-form></order-form>',
        })
            .then(() => {
                this.getItems()
            });
    };

    this.remove = function () {
        console.log('Eleminiacion Implementame')
    };

    $rootScope.$on('orderUpdated', () => {
        this.getItems();
    })

}