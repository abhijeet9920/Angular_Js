var app = angular.module('myApp', []);
app.directive('validatenumber', function() {
    return{
        restrict: 'A',
        require: 'ngModel',
        link:function(scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if (/^[\d]{10,10}$/.test(ngModelValue)) {
                    ctrl.$setValidity('numvalidater', true);
                } else {
                    ctrl.$setValidity('numvalidater', false);
                }
                //console.log(ctrl);
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);  
        }
    };
});

app.directive('validatemail', function() {
    return{
        restrict: 'A',
        require: 'ngModel',
        link:function(scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if (/^[a-z_\.\d]+@[a-z]+[\.]+(com)$/.test(ngModelValue)) {
                    ctrl.$setValidity('mailvalidater', true);
                } else {
                    ctrl.$setValidity('mailvalidater', false);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);  
        }
    };
});

app.directive('validatepwd', function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        link:function(scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if (/^[A-z0-9_@./#&+-]{8,16}$/.test(ngModelValue)) {
                    ctrl.$setValidity('pwdvalidater', true);
                } else {
                    ctrl.$setValidity('pwdvalidater', false);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
});

app.controller('regController', ['$scope',function($scope){
    $scope.pwdtype = "password";
    $scope.gclass = "glyphicon-eye-open";
    $scope.pwdtitle = "Show Password";
    $scope.showPwd = function(){
        if($scope.pwdtype == 'password'){
            $scope.pwdtype = "text";
            $scope.gclass = "glyphicon-eye-close";
            $scope.pwdtitle = "Hide Password";
        }else{
            $scope.pwdtype = "password";
            $scope.gclass = "glyphicon-eye-open";
            $scope.pwdtitle = "Show Password";
        }
    }
    $scope.postReg = function(){
        alert("Form submitted");
    }
}]);