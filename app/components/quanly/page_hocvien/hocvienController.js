adminApp.controller("hocvienController", function($scope, $rootScope, $http){

  $scope.hocviens = [];

  _refreshHocvien();

  function _refreshHocvien() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/hocvien'
    }).then(
      function(res) {
        console.log('thanh cong');
        $scope.hocviens = res.data;
      },
      function(res) {
        console.log("Error: " + res.status + " : " + res.data);
      }
    );
  }

});
