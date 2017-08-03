var app = angular.module('myApp', ['ngStorage']);

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/reg-log.html',
        controller: 'profileController'
    }).when('/home', {
        templateUrl: 'views/dashboard.html',
        controller: 'homeController'
    }).when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'userController'
    }).when('/paid', {
        templateUrl: 'views/paid.html',
        controller: 'paidController'
    }).when('/assets', {
        templateUrl: 'views/assets.html',
        controller: 'assetController'
    }).otherwise({
        redirectTo: '/'
    });
}]);


app.service('LoggedUser', function () {
    return {
        islogged:'',
        key:'',
        user:{}
    };
});


app.directive('email', function() {
    return{
        restrict: 'A',
        require: 'ngModel',
        link:function(scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if (/^([a-zA-Z0-9]\w+)(@)([a-zA-Z]\w+).([a-z]{3})$/.test(ngModelValue)) {
                    ctrl.$setValidity('emailvalidater', true);
                } else {
                    ctrl.$setValidity('emailvalidater', false);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);  
        }
    };
});

app.filter('dateToISO', function() {
    return function(input) {
        return new Date(input).toISOString();
    };
});
