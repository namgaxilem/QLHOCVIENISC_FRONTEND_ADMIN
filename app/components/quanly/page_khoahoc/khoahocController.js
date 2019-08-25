adminApp.controller("khoahocController", function($scope, $rootScope, $http) {

  $scope.khoahocs = [];

  $scope.khoahocThem = {
    makhoahoc: "",
    tennkhoahoc: "",
    ngaybd: "",
    ngaykt: "",
    chuyennganh: ""
  };

  $scope.khoahocSua = {
    makhoahoc: "",
    tennkhoahoc: "",
    ngaybd: "",
    ngaykt: "",
    chuyennganh: ""
  };

  $scope.chuyennganhs = {
    id: "",
    tencn: ""
  };

  _refreshKhoahoc();

  function _refreshKhoahoc() {
    $http({
      method: 'GET',
      url: $rootScope.domainService + 'khoahoc'
    }).then(
      function(res) {
        $scope.khoahocs = res.data;
      },
      function(res) {
        console.log("Error: " + res.status + " : " + res.data);
      }
    );

    $http({
      method: 'GET',
      url: $rootScope.domainService + 'chuyennganh'
    }).then(
      function(res) {
        $scope.chuyennganhs = res.data;
      },
      function(res) {
        console.log("Error: " + res.status + " : " + res.data);
      }
    );
  }

  $scope.themkhoahoc = function() {
    $http({
      method: 'POST',
      url: $rootScope.domainService + 'taokhoahoc',
      data: angular.toJson($scope.khoahocThem),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshKhoahoc();

    $scope.khoahocThem = {
      makhoahoc: "",
      tennkhoahoc: "",
      ngaybd: "",
      ngaykt: "",
      chuyennganh: ""
    };

  };

  $scope.xoakhoahoc = function(khoahoc) {
    $http({
      method: 'DELETE',
      url: $rootScope.domainService + 'xoakhoahoc/' + khoahoc.makhoahoc
    }).then(_success, _error);

    _refreshKhoahoc();

  };

  $scope.suakhoahoc = function() {
    $http({
      method: 'PUT',
      url: $rootScope.domainService + 'suakhoahoc/' + $scope.idSua,
      data: angular.toJson($scope.doanhnghiepSua),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshKhoahoc();

  };

  $scope.suakhoahocpopup = function(khoahoc) {
    $scope.idSua = angular.copy(khoahoc.makhoahoc);
    $scope.khoahocSua = angular.copy(khoahoc);
  };

  _success = function() {
    _refreshKhoahoc();
  };

  _error = function(res) {
    alert('Lỗi gì đó ' + res.status);
  };

});
