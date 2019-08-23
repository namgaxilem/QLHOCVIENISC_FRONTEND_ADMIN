adminApp.controller("monhocController", function($scope, $rootScope, $http) {

  $scope.monhocs = [];

  $scope.monhocThem = {
    mamh: "",
    tenmh: "",
    sogio: ""
  };

  $scope.monhocSua = {
    mamh: "",
    tenmh: "",
    sogio: ""
  };

  _refreshMonhoc();

  function _refreshMonhoc() {
    $http({
      method: 'GET',
      url: $rootScope.domainService + 'monhoc'
    }).then(
      function(res) {
        $scope.monhocs = res.data;
      },
      function(res) {
        console.log("Error: " + res.status + " : " + res.data);
      }
    );
  }

  $scope.themmonhoc = function() {
    $http({
      method: 'POST',
      url: $rootScope.domainService + 'themmonhoc',
      data: angular.toJson($scope.monhocThem),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshMonhoc();

    $scope.monhocThem = {
      mamh: "",
      tenmh: "",
      sogio: ""
    };

  };

  $scope.xoamonhoc = function(monhoc) {
    $http({
      method: 'DELETE',
      url: $rootScope.domainService + 'xoamonhoc/' + monhoc.mamh
    }).then(_success, _error);

    _refreshMonhoc();

  };

  $scope.suamonhoc = function() {
    $http({
      method: 'PUT',
      url: $rootScope.domainService + 'suamonhoc/' + $scope.mamhSua,
      data: angular.toJson($scope.monhocSua),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshMonhoc();

  };

  $scope.suamonhocpopup = function(monhoc) {
    $scope.mamhSua = angular.copy(monhoc.mamh);
    $scope.monhocSua = angular.copy(monhoc);
  };

  _success = function() {
    _refreshMonhoc();
  };

  _error = function(res) {
    alert('Lỗi gì đó ' + res.status);
  };

});
