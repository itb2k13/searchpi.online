var app = angular.module('app_tl', ['ngAnimate', 'angular-loading-bar', 'toaster', 'angular-toArrayFilter', 'angularMoment', 'angular-inview']);

app.controller('ctrl_tl', ['$scope', '$http', '$window', 'toaster', function ($scope, $http, $window, toaster) {

    $scope.data = null;
    $scope.SizeFilters = [{ 'label': '100 mil', 'id': '100000000' }, { 'label': '500 mil', 'id': '500000000' }, { 'label': '1 bil', 'id': '1000000000' }];
    $scope.BlockSizes = [{ 'label': '100Mb', 'id': '100000000' }, { 'label': '250Mb', 'id': '250000000' }];
    $scope.ParallelSizes = [{ 'label': '1', 'id': '1' }, { 'label': '4', 'id': '4' }, { 'label': '8', 'id': '8' }, { 'label': '16', 'id': '16' }];
    $scope.SearchAlgorithms = [{ 'label': 'IndexOf()', 'id': 'indexof' }, { 'label': 'Knuth-Morris-Pratt', 'id': 'kmp' }, { 'label': 'Boyer-Moore', 'id': 'bom' }];

    $scope.Settings = JSON.parse(localStorage.getItem('settings') || '{}');
    $scope.Settings.SizeFilter = $scope.Settings.SizeFilter || "500000000";
    $scope.Settings.BlockSize = $scope.Settings.BlockSize || "100000000";
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

        var req = $scope.PostRequest('https://am067tgen3.execute-api.us-east-1.amazonaws.com/default/searchpi-online-filesearch', {
            "blockSize": $scope.Settings.BlockSize,
            "maxLength": $scope.Settings.SizeFilter,
            "needle": $scope.Settings.Pattern,
            "key": "pi-billion.txt"
        });

        $window.gtag('event', 'search', {
            'event_category': 'engagement',
            'event_label': $scope.Settings.Pattern
        });

        $http(req)
            .success(function (data) {
                $scope.data = data;
            })
            .error(function (data) {
                toaster.pop('error', 'Error', data);
            });

    }

}]);
