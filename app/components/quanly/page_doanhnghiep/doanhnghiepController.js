adminApp.controller("doanhnghiepController", function($scope, $rootScope, $http) {

  $scope.doanhnghieps = [];

  $scope.doanhnghiepThem = {
    id: "",
    tendoanhnghiep: "",
    diachi: "",
    sdt: ""
  };

  $scope.doanhnghiepSua = {
    id: "",
    tendoanhnghiep: "",
    diachi: "",
    sdt: ""
  };

  _refreshDoanhnghiep();

  function _refreshDoanhnghiep() {
    $http({
      method: 'GET',
      url: $rootScope.domainService + 'doanhnghiep'
    }).then(
      function(res) {
        $scope.doanhnghieps = res.data;
      },
      function(res) {
        console.log("Error: " + res.status + " : " + res.data);
      }
    );
  }

  $scope.themdoanhnghiep = function() {
    $http({
      method: 'POST',
      url: $rootScope.domainService + 'taodoanhnghiep',
      data: angular.toJson($scope.doanhnghiepThem),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshDoanhnghiep();

    $scope.doanhnghiepThem = {
      id: "",
      tendoanhnghiep: "",
      diachi: "",
      sdt: ""
    };

  };

  $scope.xoadoanhnghiep = function(doanhnghiep) {
    $http({
      method: 'DELETE',
      url: $rootScope.domainService + 'xoadoanhnghiep/' + doanhnghiep.id
    }).then(_success, _error);

    _refreshDoanhnghiep();

  };

  $scope.suadoanhnghiep = function() {
    $http({
      method: 'PUT',
      url: $rootScope.domainService + 'suadoanhnghiep/' + $scope.idSua,
      data: angular.toJson($scope.doanhnghiepSua),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshDoanhnghiep();

  };

  $scope.suadoanhnghieppopup = function(doanhnghiep) {
    $scope.idSua = angular.copy(doanhnghiep.id);
    $scope.doanhnghiepSua = angular.copy(doanhnghiep);
  };

  _success = function() {
    _refreshDoanhnghiep();
  };

  _error = function(res) {
    alert('Lỗi gì đó ' + res.status);
  };

});
