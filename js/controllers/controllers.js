//en nuestro controlador inyectamos registerUsers para poder utilizar
//la función newRegister pasando los datos del formulario con $scope.user
app.controller("registerController", function($scope, registerUsers){
    $scope.registerUser = function(){
        registerUsers.newRegister($scope.user);
    }
})

//esto simplemente es para lanzar un mensaje si el login falla, se puede extender para darle más uso
app.factory("mensajesFlash", function($rootScope){
    return {
        show_success : function(message){
            $rootScope.flash_success = message;
        },
        show_error : function(message){
            $rootScope.flash_error = message;
        },
        clear : function(){
            $rootScope.flash_success = "";
            $rootScope.flash_error = "";
        }
    }
});

//factoria para registrar usuarios a la que le inyectamos la otra factoria
//mensajesFlash para poder hacer uso de sus funciones
app.factory("registerUsers", function($http, mensajesFlash){
    return {
        newRegister : function(user){
            return $http({
                url: 'http://localhost/register_angular_ci/register/registerUser',
                method: "POST",
                data : "email="+user.email+"&password="+user.password+"&nombre="+user.nombre,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                    if(data.respuesta == "success"){
                        mensajesFlash.clear();
                        mensajesFlash.show_success("El registro se ha procesado correctamente.");
                    }else if(data.respuesta == "exists"){
                        mensajesFlash.clear();
                        mensajesFlash.show_error("El email introducido ya existe en la bd.");
                    }else if(data.respuesta == "error_form"){
                        mensajesFlash.show_error("Ha ocurrido algún error al realizar el registro!.");
                    }
                }).error(function(){
                    mensajesFlash.show_error("Ha ocurrido algún error al realizar el registro!.");
                })
        }
    }
})