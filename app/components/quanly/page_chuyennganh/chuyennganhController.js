adminApp.controller("chuyennganhController", function($scope, $rootScope, $http) {

  $scope.chuyennganhs = [];

  $scope.monhocThem = {
    mamh: "",
    tenmh: "",
    sogio: ""
  };

  _refreshChuyennganh();

  function _refreshChuyennganh() {
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
      data: angular.toJson($scope.truongThem),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    _refreshChuyennganh();

    $scope.monhocThem = {
      mamh: "",
      tenmh: "",
      sogio: ""
    };

  };

  _success = function() {
    _refreshMonhoc();
  };

  _error = function(res) {
    alert('Lỗi gì đó ' + res.status);
  };

});
