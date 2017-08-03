var app = angular.module('myApp', ['ngStorage']);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/main.html',
        controller: 'profileController'
    }).when('/login', {
        templateUrl: 'views/showlogin.html',
        controller: 'homeController'
    }).when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'profileController'
    }).otherwise({
        redirectTo: '/home'
    });
}]);
app.service('LoggedUser', function () {
    return {
        islogged:'',
        key:'',
        user:{}
    };
})