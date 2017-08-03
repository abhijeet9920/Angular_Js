app.controller('assetController', ['$scope', '$http','$filter','LoggedUser', '$localStorage', '$window','api_url',function($scope, $http, $filter,LoggedUser, $localStorage, $window, api_url){
	$scope.title = "What is Lorem Ipsum";
	$scope.content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

	if($localStorage.user){
		$scope.iflogin = true;
		$scope.key = $localStorage.key;
		LoggedUser.user = $localStorage.user;
		LoggedUser.islogged = true;
		$window.location.href = '#/assets';
	}else{
		$scope.iflogin = false;
		$scope.key = '';
		LoggedUser.user = {};
		LoggedUser.islogged = false
		$window.location.href = '#/';
	}
	$scope.user = LoggedUser.user;
	$scope.category = {}
	$scope.assets = {};
	$scope.curcat = 1;
	$scope.states = {};
	$scope.cnt = 0;
	$scope.curasset = 0;
	$scope.detailasset = {}
	


	$http({
	  	method: 'GET',
	  	url: api_url.url+'/category/states',
	}).then(
		function successCallback(success) {
			$scope.category = success.data.category;
			$scope.assets = success.data.states;
		},
		function errorCallback(error) {
			$scope.category = error.data;
			$scope.assets = error.data;
		}
	);

	$http({
	  	method: 'GET',
	  	url: api_url.url+'/getallstates',
	  	headers: {'Authorization': 'Bearer '+$localStorage.key}
	}).then(
		function successCallback(success) {
			$scope.states = success.data;
		},
		function errorCallback(error) {
			$scope.states = error.data;
		}
	);


	$scope.assetByStates = function(state, items){
		var result = {};
		var cnt = 0;
		angular.forEach(items, function(value, key) {
		    if (value.hasOwnProperty('st_id') && value.st_id==state){
		        result[key] = value;
		        cnt++;
		    }
		});
		$scope.cnt = cnt;
		return result;
	}

	
	$scope.filterSecId = function(items) {
        var result = {};
        angular.forEach(items, function(value, key) {
            if (value.hasOwnProperty('category_id') && value.category_id==$scope.curcat){
                result[key] = value;
            }
        });
        return result;
    }

    $scope.setCategory = function(category){
    	$scope.curcat = category;
    }

    var indexedTeams = [];
    $scope.filterTeams = function(player) {
        var teamIsNew = indexedTeams.indexOf(player.st_name) == -1;
        if (teamIsNew) {
            indexedTeams.push(player);
        }
    }

    $scope.getAsset = function(id){
	    $http({
	      	method: 'GET',
	      	url: api_url.url+'/getassets/'+id,
	      	headers: {'Authorization': 'Bearer '+$localStorage.key}
	    }).then(
	    	function successCallback(success) {
	    		$scope.detailasset = success.data.data;
	    	},
	    	function errorCallback(error) {
	    		$scope.detailasset = error.data;
	    	}
	    );
    }

    $scope.likeAndFav = function(id, action){
    	date = new Date();
    	url = ''
    	if(action == 'like'){
    		url = api_url.url+'/savelike';
    	}
    	else if(action == 'favorite'){
    		url = api_url.url+'/markfavorite'
    	}
    	$http({
    	  	method: 'POST',
    	  	url: url,
    	  	headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+$localStorage.key},
    	  	data:{"asset_id":id, "date":$filter('date')(date, "yyyy-MM-dd h:m:s")}
    	}).then(
    		function successCallback(success) {
    			console.log("successCallback");
    			console.log(success.data);
    			alert(success.data.message);
    		},
    		function errorCallback(error) {
    			console.log("errorCallback");
    			console.log(error.data);
    			alert(error.data.message);
    		}
    	);
    }


    $scope.postComment = function(id){
    	var date = new Date();
    	$http({
    	  	method: 'POST',
    	  	url: api_url.url+'/savecomment',
    	  	headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+$localStorage.key},
    	  	data:{"asset_id":id, "date":$filter('date')(date, "yyyy-MM-dd h:m:s"), "comment":$scope.text}
    	}).then(
    		function successCallback(success) {
    			console.log("successCallback");
    			console.log(success.data);
    			alert(success.data.message);
    		},
    		function errorCallback(error) {
    			console.log(error.data);
    			//alert(error.data.message);
    		}
    	);
    }


}]);

app.filter('toUpper', function(){
    return function(item){
        return item.toUpperCase();
    }
});