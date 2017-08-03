app.controller('profileController', ['$scope', '$http','LoggedUser', '$localStorage', '$window','api_url',function($scope, $http, LoggedUser, $localStorage, $window, api_url){
	if($localStorage.user){
		$scope.iflogin = true;
		$scope.key = $localStorage.key;
		LoggedUser.user = $localStorage.user;
		LoggedUser.islogged = true;
		$window.location.href = '#/home';
	}else{
		$scope.iflogin = false;
		$scope.key = '';
		LoggedUser.user = {};
		LoggedUser.islogged = false
		$window.location.href = '#/';
	}

	$scope.postRegister = function(){}


	$scope.postLogin = function(){
		$http({
		  	method: 'POST',
		  	url: api_url.url+'/login',
		  	headers: {'Content-Type': 'application/json'},
		  	data:{"email":$scope.log_email, "password":$scope.log_pwd}
		}).then(
			function successCallback(success) {
				$scope.iflogin = true;
				$scope.key = success.data.token;
				$localStorage.$default({
		          	user: success.data.data
		        });
		        $localStorage.$default({
		          	key:success.data.token
		        });
				console.log($scope);
				$window.location.href = '#/home';
			},
			function errorCallback(error) {
				$scope.iflogin = false;
				LoggedUser.islogged = false;
				LoggedUser.key = '';
				LoggedUser.user = {};
				alert(error.data.message);
			}
		);
	}

}]);