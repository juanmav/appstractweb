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

function ordersCtrl($scope, firebase, $firebaseArray, $mdDialog) {
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
            .then(result => {
                console.log('Data firebase');
                if (result){
                    return result.map(formatOrder);
                } else {
                    return [];
                }
            })
            .then(orders => {
                this.items = orders;
            })
            .catch( e => {
                console.error(e);
            })
    };

    function formatOrder(order) {
        order.dt_duedate = new Date(order.dt_duedate);
        order.user = order.user[Object.keys(order.user)[0]];
        order.recipient = order.recipient[Object.keys(order.recipient)[0]];
        order.product_id = Object.keys(order.product_type)[0];
        order.celebrities = order.celebrities[Object.keys(order.celebrities)[0]];
        order.celebrities.name = order.celebrities.first_name + ' ' + order.celebrities.last_name;
        return order;
    }

    this.edit = function(){
        $mdDialog.show({
            template: '<order-form item="item"></order-form>',
            locals : { item: this.selected[0] },
            controller: function (item, $scope) {
                $scope.item = item;
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
    }
}