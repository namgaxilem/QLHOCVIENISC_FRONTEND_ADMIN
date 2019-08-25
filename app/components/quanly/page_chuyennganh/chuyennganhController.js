adminApp.controller("chuyennganhController", function($scope, $rootScope, $http) {

  $scope.chuyennganhs = [];

  $scope.chuyennganhThem = {
    id: "",
    tencn: ""
  };

  _refreshChuyennganh();

  function _refreshChuyennganh() {
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

  $scope.themchuyennganh = function() {
    $http({
      method: 'POST',
      url: $rootScope.domainService + 'taochuyennganh',
      data: angular.toJson($scope.chuyennganhThem),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshChuyennganh();

    $scope.chuyennganhThem = {
      id: "",
      tencn: ""
    };

  };

  $scope.xoachuyennganh = function(chuyennganh) {
    $http({
      method: 'DELETE',
      url: $rootScope.domainService + 'xoachuyennganh/' + chuyennganh.id
    }).then(_success, _error);

    _refreshChuyennganh();

  };

  $scope.suachuyennganh = function() {
    $http({
      method: 'PUT',
      url: $rootScope.domainService + 'suachuyennganh/' + $scope.suaId,
      data: angular.toJson($scope.chuyennganhSua),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshChuyennganh();

  };

  $scope.suachuyennganhpopup = function(chuyennganh) {
    $scope.suaId = angular.copy(chuyennganh.id);
    $scope.chuyennganhSua = angular.copy(chuyennganh);

  };

  _success = function() {
    _refreshChuyennganh();
  };

  _error = function(res) {
    alert('Lỗi gì đó ' + res.status);
  };

});
