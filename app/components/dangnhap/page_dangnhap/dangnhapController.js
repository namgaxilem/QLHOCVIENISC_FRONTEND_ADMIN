adminApp.controller('dangnhapController', ['$scope','$http', '$resource', '$window', function($scope, $http, $resource, $window) {
  $scope.username = '';
  $scope.password = '';

  console.log('dang nhap contrlller');

  $scope.dangnhap = function() {
    if($scope.username == "admin" &&
        $scope.password == "admin") {
          $window.location.href = '#!/hocvien';
        }
        else {
          alert('Tên đăng nhập hoặc mật khẩu chưa đúng!');
        }
  };
}]);
