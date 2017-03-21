'use strict';

angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            template: '<users></users>'
        });
    }])
    .component('users', {
        templateUrl: 'users/users.html',
        controller: usersCtrl,
        bindings: {
            hero: '='
        }
    });

    function usersCtrl($scope, firebase, $firebaseArray, $mdDialog) {
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

            this.promise = $firebaseArray(firebase.database().ref().child("users")).$loaded()
                .then(result => {
                    console.log('Data firebase');
                    if (result){
                        return result.map(formatUser);
                    } else {
                        return [];
                    }
                })
                .then(users => {
                    this.items = users;
                })
                .catch( e => {
                    console.error(e);
                })
        };

        function formatUser(user) {
            user.name = user.name;
            user.email = user.email;

            return user;
        }


        this.edit = function(){
            $mdDialog.show({
                template: '<user-form item="item"></user-form>',
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
                template: '<user-form></user-form>',
            })
                .then(() => {
                    this.getItems()
                });
        };

        this.remove = function () {
            console.log('Eliminación Implementame')
        }
    }
