adminApp.controller("truonglienketController", function($scope, $rootScope, $http) {

  $scope.truongs = [];

  $scope.truongThem = {
    matruong: "",
    tentruong: "",
    diachi: ""
  };

  $scope.truongSua = {
    matruong: "",
    tentruong: "",
    diachi: ""
  };

  _refreshTruonglienket();

  $scope.themtruonglienket = function() {
    $http({
      method: 'POST',
      url: $rootScope.domainService + 'themtruonglienket',
      data: angular.toJson($scope.truongThem),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    $scope.truongThem = {
      matruong: "",
      tentruong: "",
      diachi: ""
    };

  };

  $scope.suatruonglienket = function() {
    $http({
      method: 'PUT',
      url: $rootScope.domainService + 'suatruonglienket/' + $scope.truongSua.matruong,
      data: angular.toJson($scope.truongSua),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  $scope.suatruonglienketpopup = function(truongSuaa) {
    $scope.truongSua = angular.copy(truongSuaa);
  };

  $scope.xoatruonglienket = function(truong) {
    $http({
      method: 'DELETE',
      url: $rootScope.domainService + 'xoatruonglienket/' + truong.matruong
    }).then(_success, _error);

  };

  function _refreshTruonglienket() {
    $http({
      method: 'GET',
      url: $rootScope.domainService + 'truonglienket'
    }).then(
      function(res) {
        $scope.truongs = res.data;
      },
      function(res) {
        console.log("Error: " + res.status + " : " + res.data);
      }
    );
  }

  function _success(res) {
    _refreshTruonglienket();
  }

  function _error(res) {
    var data = res.data;
    var status = res.status;
    var header = res.header;
    var config = res.config;
    alert("Error: " + status + "; Data: " + data);
  }

});
