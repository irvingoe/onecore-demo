angular
    .module("formExample")
    .controller("login", login);
// Inject my dependencies
login.$inject = ["$scope", "$http"];

// Now create our controller function with all necessary logic
function login($scope, $http) {
    $scope.master = {};

    $scope.update = function (user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function () {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
}