app.controller('homeController', ['$scope', '$http','LoggedUser', '$localStorage', '$window', function($scope, $http, LoggedUser, $localStorage, $window){
	if($localStorage.user){
		$scope.iflogin = true;
		$scope.key = $localStorage.key;
		LoggedUser.user = $localStorage.user;
		/*console.log(LoggedUser.user);*/
		LoggedUser.islogged = true;
	}else{
		$scope.iflogin = false;
		$scope.key = '';
		LoggedUser.user = {};
		LoggedUser.islogged = false
	}
	$scope.postLogin = function(){
		$http({
		  	method: 'POST',
		  	//url: 'http://localhost/imoves/public/index.php/api/login',
		  	url: 'http://local33.samaiapp.com/api/login',
		  	headers: {'Content-Type': 'application/json',},
		  	data:{"email":$scope.username, "password":$scope.password}
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
				$window.location.reload();
			},
			function errorCallback(error) {
				$scope.iflogin = false;
				LoggedUser.islogged = false;
				LoggedUser.key = '';
				LoggedUser.user = {};
				alert("Invalid credentials");
			}
		);
	},
	$scope.loggout = function(){
		delete $localStorage.user;
		delete $localStorage.key;
		$window.location.reload();
	}
}]);


app.controller('profileController', ['$scope', 'LoggedUser',function($scope,LoggedUser){
	$scope.title = "What is Lorem Ipsum";
	$scope.content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
	$scope.iflogin = LoggedUser.islogged;
	$scope.user = LoggedUser.user;
}]);