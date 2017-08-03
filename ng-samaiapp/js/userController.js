app.controller('userController', ['$scope', '$http','LoggedUser', '$localStorage', '$window','api_url',function($scope, $http, LoggedUser, $localStorage, $window, api_url){
	if($localStorage.user){
		$scope.iflogin = true;
		$scope.key = $localStorage.key;
		LoggedUser.user = $localStorage.user;
		LoggedUser.islogged = true;
		$window.location.href = '#/profile';
	}else{
		$scope.iflogin = false;
		$scope.key = '';
		LoggedUser.user = {};
		LoggedUser.islogged = false
		$window.location.href = '#/';
	}
	$scope.user = LoggedUser.user;
	
	$scope.transaction = {};
	$scope.userassets = {};

	$http({
	  	method: 'GET',
	  	url: api_url.url+'/payment/history',
	  	headers: {'Authorization': 'Bearer '+$localStorage.key}
	}).then(
		function successCallback(success) {
			$scope.transaction = success.data.data;
		},
		function errorCallback(error) {
			$scope.transaction = error.data.data;
		}
	);


	$http({
		method: 'GET',
		url: api_url.url+'/profile',
	  	headers: {'Authorization': 'Bearer '+$localStorage.key}
	}).then(
		function successCallback(success) {
			$scope.userassets = success.data.data.my_assets;
		},
		function errorCallback(error) {
			$scope.userassets = error.data.data;
		}
	);


	$scope.logOut = function(){
		delete $localStorage.user;
		delete $localStorage.key;
		$window.location.href = '#/';
	}


	$scope.updateUser = function(){
		$http({
			method: 'POST',
			url: api_url.url+'/updateprofile',
			headers: {'Authorization': 'Bearer '+$localStorage.key},
			data:{"first_name":$scope.user.first_name, "last_name":$scope.user.last_name,"country":$scope.user.country, "state":$scope.user.state, "city":$scope.user.city}
		}).then(
			function successCallback(success) {
				console.log(success.data);
			},
			function errorCallback(error) {
				$scope.iflogin = false;
				LoggedUser.islogged = false;
				LoggedUser.key = '';
				LoggedUser.user = {};
				alert(error.data.message);
			}
		)
	}

}]);