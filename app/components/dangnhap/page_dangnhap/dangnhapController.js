adminApp.controller('dangnhapController', ['$scope','$http', '$resource', '$window', function($scope, $http, $resource, $window) {
  $scope.username = 'admin';
  $scope.password = 'admin';

  $scope.dangnhap = function() {
    $window.location.href = '#!/hocvien';
  };
}]);
