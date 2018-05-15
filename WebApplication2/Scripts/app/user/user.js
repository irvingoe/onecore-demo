angular
    .module("formExample")
    .controller("addUser", , function ($scope, $http, $window) {
        addUser.$inject = ["$scope", "$http"];

        $scope.addUser = function () {
            $scope.user = {};
            $scope.CreateUser = function () {

                debugger
                var usuario = {
                    "correoElectronico": $scope.correoElectronico,
                    "usuario1": $scope.usuario1,
                    "contrasena": $scope.contrasena,
                    "estatus": $scope.estatus,
                    "sexo": $scope.sexo,
                    "fechaCreacion": $scope.fechaCreacion
                }


                var post = $http({
                    method: "POST",
                    url: "/Home/Create",
                    dataType: 'json',
                    data: { user: usuario },
                    headers: { "Content-Type": "application/json" }
                });

                post.success(function (data, status) {
                    $window.alert("Hello: " + data.Name + " .\nCurrent Date and Time: " + data.DateTime);
                });

                post.error(function (data, status) {
                    $window.alert(data.Message);
                });
            }
        }

    });



//var app = angular.module('formExample', [])
//app.controller('addUser', function ($scope, $http, $window) {
//    $scope.ButtonClick = function () {
//        var post = $http({
//            method: "POST",
//            url: "/Home/AjaxMethod",
//            dataType: 'json',
//            data: { name: $scope.Name },
//            headers: { "Content-Type": "application/json" }
//        });

//        post.success(function (data, status) {
//            $window.alert("Hello: " + data.Name + " .\nCurrent Date and Time: " + data.DateTime);
//        });

//        post.error(function (data, status) {
//            $window.alert(data.Message);
//        });
//    }
//});

//function isOkPass(p) {

//        var anUpperCase = /[A-Z]/;
//        var aLowerCase = /[a-z]/;
//        var aNumber = /[0-9]/;
//        var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
//        var obj = {};
//        obj.result = true;

//        if (p.length < 10) {
//            obj.result = false;
//            obj.error = "La longitud mínima es de 10 caracteres!"
//            return obj;
//        }

//        var numUpper = 0;
//        var numLower = 0;
//        var numNums = 0;
//        var numSpecials = 0;

//        for (var i = 0; i < p.length; i++) {

//            if (anUpperCase.test(p[i]))
//                numUpper++;
//            else if (aLowerCase.test(p[i]))
//                numLower++;
//            else if (aNumber.test(p[i]))
//                numNums++;
//            else if (aSpecial.test(p[i]))
//                numSpecials++;
//        }



//        if (numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1) {
//            obj.result = false;
//            obj.error = "El formato no cumple los requisitos";
//            return obj;
//        }

//        return obj;

//    }


