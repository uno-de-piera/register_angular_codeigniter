var app = angular.module("app", []);

//damos configuración de ruteo a nuestro sistema de login
app.config(function($routeProvider){
    $routeProvider.when("/register", {
        controller : "registerController",
        templateUrl : "templates/register.html"
    });
});