adminApp.controller('dangnhapController', ['$scope', '$rootScope', '$http', '$resource', '$window', function($scope, $rootScope, $http, $resource, $window) {
  $rootScope.title = 'Đăng nhập';

  $scope.dangnhapdata = {
    password: "",
    mahv: ""
  };

  $scope.loaitaikhoan = 2;

  if ($rootScope.logged == true) {
    $window.location.href = '#!/hocvien';
  }

  $rootScope.$watch("logged", function() {
    if($rootScope.logged == true) {
      $window.location.href = '#!/hocvien';
    }
    else if ($rootScope.logged == false){
      $window.location.href = '#!/dangnhap';
    }
  });

  $scope.dangnhap = function() {
    $http({
      method: 'POST',
      data: $scope.dangnhapdata,
      url: 'http://localhost:8080/dangnhap/' + $scope.loaitaikhoan
    }).then(function(response) {
      console.log(response.data);
      console.log($scope.loaitaikhoan);
      $rootScope.logged = response.data;
      if ($rootScope.logged == false){
        alert("Sai tên tài khoản hoặc mật khẩu");
      }
      // if ($rootScope.logged == true) {
      //   $window.location.href = '#!/hocvien';
      // } else {
      //
      // }
    }, function(response) {
      alert('Lỗi gì đó!');
    });
  };
}]);
