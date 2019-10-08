adminApp.controller('truonghocController', ['$scope', '$rootScope', '$http', '$resource', '$window', function($scope, $rootScope, $http, $resource, $window) {
  $rootScope.title = 'Trường học';

  if ($rootScope.logged == false || $rootScope.logged == undefined) {
    $window.location.href = '#!/dangnhap';
  }

  function tatModal() {
    $('#Xoa').modal('hide');
    $('#Them').modal('hide');
    $('#CapNhat').modal('hide');
  }

  $scope.pageNo = 0;
  $scope.pageSize = 50;
  $scope.total = 0;

  function getHocvienPage() {
    $http.get("http://localhost:8080/truonghoc2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.soluonghienthi = response.data.length;
        $scope.truonghocpage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getHocvienPage();

  $scope.createTruongHoc = function() {
    User = $resource(
      "http://localhost:8080/truonghoc", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.tentruong = $scope.tentruong;
    user.diachi = $scope.diachi;
    user.sdt = $scope.sdt;
    user.matruong = $scope.matruong;
    $scope.Message = User.save(user).$promise.then(() => {
      tatModal();
      getHocvienPage();
      alert('Thêm trường học thành công');
    });
  };

  $scope.setMaTruongDelete = function(Student) {
    $scope.MaTruongDelete = Student;
  };
  $scope.deleteTruonghoc = function() {
    User = $resource(
      "http://localhost:8080/truonghoc/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaTruongDelete
    }).$promise.then(() => {
      tatModal();
      getHocvienPage();
      alert('Xóa trường học thành công');
    });
  };
  $scope.refAdd = function() {
    $scope.matruong = "";
    $scope.tentruong = "";
    $scope.diachi = "";
    $scope.sdt = "";
  };
  $scope.getMaTruong = function(student) {
    $scope.tentruong = student.tentruong;
    $scope.diachi = student.diachi;
    $scope.sdt = parseInt(student.sdt);

    $scope.uMaTruong = student.matruong;
    return $scope.uMaTruong;
  }

  $scope.updateSchool = function() {
    User = $resource(
      "http://localhost:8080/truonghoc/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.tentruong = $scope.tentruong;
    user.diachi = $scope.diachi;
    user.sdt = $scope.sdt;
    user.matruong = $scope.uMaTruong;

    $scope.Message = User.save({
      id: $scope.uMaTruong
    }, user).$promise.then(() => {
      tatModal();
      getHocvienPage();
      alert('Sửa trường học thành công');
    });
  };

  function getCountHocvien() {
    $http.get("http://localhost:8080/truonghoc").then(
      function(response) {
        $scope.soluonghocvien = response.data.length;
        $scope.total = response.data.length / $scope.pageSize;
        getSLHocvien();
      },
      function(err) {
        var error = err;
      });
  }
  getCountHocvien();

  $scope.pageSize = '5';
  $scope.changePageSize = function(PageSize) {
    $scope.pageNo = 0;
    $scope.temp2 = 1;
    $scope.arrSLHocvien = [];
    $scope.pageSize = PageSize;
    getCountHocvien();
    getHocvienPage();
  };

  function getSTT() {
    $scope.temp2 = 1;
  }
  getSTT();

  $scope.numb = function(So) {
    $scope.temp = So + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    $scope.pageNo = So;
    getHocvienPage();
  };

  $scope.arrSLHocvien = [];

  function getSLHocvien() {
    for (var i = 0; i < $scope.total; i++) {
      $scope.arrSLHocvien[i] = i;

    }
  }
  getSLHocvien();

  $scope.nextCount = function() {
    getCountHocvien();
    if ($scope.pageNo < $scope.total) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.total) {
        $scope.pageNo--;
      } else {
        $scope.temp = $scope.pageNo + 1;
        $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
        getHocvienPage();
      }
    } else {
      $scope.pageNo = $scope.total;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getHocvienPage();
    }
  };

  $scope.preCount = function() {
    getCountHocvien();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getHocvienPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getHocvienPage();
    }
  };

}]);
