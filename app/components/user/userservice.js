var app = angular.module('myApp');

app.service('UserService', function($resource, AuthService, $http) {

    // La url viene desde el config en el index.html.
    let url = config.myUserApi;

    console.log(url);
    console.log('Instancio el Servicio');
    console.log(AuthService.token);

    $http.defaults.headers.common.Authorization = AuthService.token;

    return $resource(url, {}, {
    });



});
