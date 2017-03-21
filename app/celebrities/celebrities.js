'use strict';

angular.module('myApp.celebrities', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/celebrities', {
            template: '<celebrities></celebrities>'
        });
    }])
    .component('celebrities', {
        templateUrl: 'celebrities/celebrities.html',
        controller: celebritiesCtrl,
        bindings: {
            hero: '='
        }
    });

    function celebritiesCtrl($scope, firebase, $firebaseArray, $mdDialog) {
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

            this.promise = $firebaseArray(firebase.database().ref().child("celebrities")).$loaded()
                .then(result => {
                    console.log('Data firebase');
                    if (result){
                        return result.map(formatCelebrity);
                    } else {
                        return [];
                    }
                })
                .then(celebrities => {
                    this.items = celebrities;
                })
                .catch( e => {
                    console.error(e);
                })
        };

        function formatCelebrity(celebrity) {
          celebrity.name = celebrity.first_name + ' ' + celebrity.last_name;
          celebrity.products = Object.keys(celebrity.product_types).join(', ');
          return celebrity;
        }

        this.edit = function(){
            $mdDialog.show({
                template: '<celebrity-form item="item"></celebrity-form>',
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
                template: '<celebrity-form></celebrity-form>',
            })
                .then(() => {
                    this.getItems()
                });
        };

        this.remove = function () {
            console.log('Eliminación Implementame')
        }
    }
