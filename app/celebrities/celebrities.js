'use strict';

angular.module('myApp.celebrities', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/celebrities', {
            template: '<celebrities></celebrities>'
        });
    }])
    .component('celebrities', {
        templateUrl: 'celebrities/celebrities.html',
        controller: celebritiesCtrl
    });

function celebritiesCtrl($scope, firebase, $firebaseArray, $mdDialog, AuthService, $rootScope) {

    AuthService.checkLogin();

    this.selected = [];

    this.query = {
        order: 'name',
        limit: 15,
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
        this.items = $firebaseArray(firebase.database().ref().child("celebrities"));
        this.promise = this.items.$loaded()
    };

    this.formater = function(celebrity) {
        let value = {};
        value.name = celebrity.first_name + ' ' + celebrity.last_name;
        if (celebrity.product_types){
            value.products = Object.keys(celebrity.product_types).filter((key) => {
                    return celebrity.product_types[key].active;
                }
            ).join(', ');
        } else {
            value.products = '';
        }
        return value;
    };



    this.edit = function(){
        $mdDialog.show({
            template: '<celebrity-form item="item" items="items" id="8080"></celebrity-form>',
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
            template: '<celebrity-form items="items" id="8080" ></celebrity-form>',
            locals : {
                items: this.items
            },
            controller: function (items, $scope) {
                $scope.items = items;
            }
        })
            .then(() => {
                this.getItems()
            });
    };

    this.askToConfirm = function(message) {
        var confirm = $mdDialog.confirm({
            title: 'Remove',
            ariaLabel: 'Alert',
            content: message,
            clickOutsideToClose: true,
            ok: 'Yes',
            cancel: 'Cancel'
        });

        return $mdDialog.show(confirm)
    };

    this.remove = function () {
        console.log('Eliminación Implementame');

        this.askToConfirm('Are you sure?').then(() => {
            this.items.$remove(this.selected[0]);
        });
    };

    $rootScope.$on('celebrityUpdated', () => {
        console.log('reload');
        this.selected = [];
        this.getItems();
    })
}
