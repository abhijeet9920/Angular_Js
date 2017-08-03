app.controller('homeController', ['$scope', '$http','LoggedUser', '$localStorage', '$window','api_url',function($scope, $http, LoggedUser, $localStorage, $window, api_url){
	$scope.title = "What is Lorem Ipsum";
	$scope.content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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
	$scope.user = LoggedUser.user;

	$scope.paid = {};

	$http({
	  	method: 'GET',
	  	url: api_url.url+'/paid/items',
	  	headers: {'Authorization': 'Bearer '+$localStorage.key}
	}).then(
		function successCallback(success) {
			$scope.paid = success.data;
		},
		function errorCallback(error) {
			$scope.paid = error.data;
		}
	);
}]);