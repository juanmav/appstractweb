var app = angular.module('myApp');

app.service('UserService', function($resource, AuthService, $http) {

    let url = 'https://celebstore-api.herokuapp.com/api/v1/admin/users';

    console.log('Instacion Servicio');
    console.log(AuthService.token);

    $http.defaults.headers.common.Authorization = AuthService.token;

    return $resource(url, {}, {
    });



});
