var gmap = angular.module('gmap', []);
gmap.directive('myCountries', ['$http',function($http){
	return {
		replace: true,
		scope:{
			data: '=data'
		},
		template: '<li class="list-group-option" value="{{data.alpha2Code}}">{{data.name}}</li>',
	}
}]);

gmap.directive('sel', ['$http',function($http) {
      return {
        template: '<select class="form-control" ng-model="country" ng-options="c.name for c in countries"></select>',
        restrict: 'E',
        scope: {
           selectedValue: '='
        },
        link:function(scope,elem,attrs){
        	$http.get('https://restcountries.eu/rest/v1/all').then(function(response){
        		scope.countries = response.data
           		//console.log(response.data);
        	});
        }
    };
}]);



gmap.controller('mapController', function($scope, $http){
	$scope.isloaded = true;
	//$scope.country = $scope.countries[0].value;


	$scope.loadCountry = function(){
		$scope.isloaded = false;
		$http.get('https://restcountries.eu/rest/v1/all').then(function(response){
    		$scope.countries2 = response.data
       		/*console.log(response.data);*/
			$scope.isloaded = true;
    	});
	}


	$scope.loadStates = function(){
		$scope.isloaded = false;
		$http({
		  	method: 'GET',
		  	url: 'https://www.whizapi.com/api/v2/util/ui/in/indian-states-list?project-app-key=jjqxh8wincbkbh41n62awbm7'
		}).then(
			function successCallback(success) {
				$scope.isloaded = true;
				$scope.state = success.data.Data;
				//console.log(success.data.Data);
			},
			function errorCallback(error) {
				alert("Oops!! API missing");
			}
		)
	}
	$scope.loadCities = function(){
		$scope.isloaded = false;
		$http({
			method: "GET",
			url: "https://www.whizapi.com/api/v2/util/ui/in/indian-city-by-state?project-app-key=jjqxh8wincbkbh41n62awbm7&stateid="+$scope.selected_state,
		}).then(
			function successCallback(success){
				$scope.isloaded = true;
				$scope.city = success.data.Data;
				//console.log(success.data.Data);
			},
			function errorCallback(error){
				alert('Oops!! API missing');
			}
		)
	}
	//$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	$scope.loadMap = function(){
		$scope.isloaded = false;
		$http({
			method: 'GET',
			url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+$scope.selected_city,
		}).then(
			function successCallback(success){
				$scope.isloaded = true;
				console.log(success.data.results);
			},
			function errorCallback(error){
				alert('Oops!! API missing');
			}
		)
	}
});