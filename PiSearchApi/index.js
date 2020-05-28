var app = angular.module('app_tl', ['ngAnimate', 'angular-loading-bar', 'toaster', 'angular-toArrayFilter', 'angularMoment', 'angular-inview']);

app.controller('ctrl_tl', ['$scope', '$http', 'toaster', function ($scope, $http, toaster) {

	$scope.data = {};
	$scope.SizeFilters = [{'label':'100 mil', 'id':'100'}, {'label':'500 mil', 'id':'500'}, {'label':'1 bil', 'id':'1000'}, {'label':'2 bil', 'id':'2000'}, {'label':'5 bil', 'id':'5000'}, {'label':'10 bil', 'id':'10000'}];
	$scope.BlockSizes = [{'label':'10Mb', 'id':'10'}, {'label':'100Mb', 'id':'100'}, {'label':'250Mb', 'id':'250'}];
	$scope.ParallelSizes = [{'label':'1', 'id':'1'}, {'label':'4', 'id':'4'}, {'label':'8', 'id':'8'}, {'label':'16', 'id':'16'}];
	$scope.SearchAlgorithms = [{'label':'IndexOf()', 'id':'indexof'}, {'label':'Knuth-Morris-Pratt', 'id':'kmp'}, {'label':'Boyer-Moore', 'id':'bom'}];

	$scope.Settings = JSON.parse(localStorage.getItem('settings') || '{}');
	$scope.Settings.SizeFilter = $scope.Settings.SizeFilter || "500";
	$scope.Settings.BlockSize = $scope.Settings.BlockSize || "100";
	$scope.Settings.Pattern = $scope.Settings.Pattern || '0123456';
	$scope.Settings.Parallelism = $scope.Settings.Parallelism || '4';
	$scope.Settings.SearchAlgorithm = $scope.Settings.SearchAlgorithm || 'bom';

	$scope.PostRequest = function (url, data) {
		var req = {
			method: 'post',
			url: url,
			headers: { 'Content-Type': 'application/json' },
			data: data
		}
		return req;
	}

	$scope.GetRequest = function (method, data) {
		var req = {
			method: 'get',
			url: method
		}
		return req;
	}
	
	$scope.SaveSettings = function () {
		localStorage.setItem('settings', JSON.stringify($scope.Settings));
	}
	
	$scope.Search = function () {
		
		$scope.SaveSettings();
		
		var req = $scope.GetRequest('http://s815756813.websitehome.co.uk/pisearch/api/search/' 
			+ $scope.Settings.SearchAlgorithm + '/' 
			+ $scope.Settings.SizeFilter + '/' 
			+ $scope.Settings.BlockSize + '/' 
			+ $scope.Settings.Parallelism + '/' 
			+ $scope.Settings.Pattern, {});

		$http(req)
			.success(function (data) {
				$scope.data = data;
			})
			.error(function (data) {
				toaster.pop('error', 'Error', data);
			});

	}

}]);