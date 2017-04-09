var app = angular.module('myApp');

app.service('UserService', function($resource, AuthService) {

    let url = 'https://celebstore-api.herokuapp.com/api/v1/admin/users';

    console.log('Instacion Servicio');
    console.log(AuthService.token);

    return $resource(url, {}, {
        headers: {
            Authorization: AuthService.token
        }
    });

});
