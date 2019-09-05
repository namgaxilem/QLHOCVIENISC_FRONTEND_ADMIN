adminApp.controller('dangnhapController', ['$scope', '$rootScope', '$http', '$resource', '$window', function($scope, $rootScope, $http, $resource, $window) {
  $rootScope.title = 'Đăng nhập';
  
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
