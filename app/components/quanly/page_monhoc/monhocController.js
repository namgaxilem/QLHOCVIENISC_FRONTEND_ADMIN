adminApp.controller('monhocController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = 'Môn học';

  function tatModal() {
    $('#Xoa').modal('hide');
    $('#Them').modal('hide');
    $('#CapNhat').modal('hide');
  }

  $scope.pageNo = 0;
  $scope.pageSize = 50;
  $scope.total = 0;

  function getMonhocPage() {
    $http.get("http://localhost:8080/monhoc2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.soluonghienthi = response.data.length;
        $scope.monhocpage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getMonhocPage();

  $scope.createMonHoc = function() {
    User = $resource(
      "http://localhost:8080/monhoc", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.tenmh = $scope.tenmh;
    user.sogio = $scope.sogio;
    user.sotc = $scope.sotc;
    user.mamh = $scope.mamh;

    $scope.Message = User.save(user).$promise.then(() => {
      tatModal();
      getMonhocPage();
      alert('Thêm môn học thành công');
    });
  };

  $scope.setMaMHDelete = function(Student) {
    $scope.MaMHDelete = Student;
  };
  $scope.deleteMonHoc = function() {
    User = $resource(
      "http://localhost:8080/monhoc/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaMHDelete
    }).$promise.then(() => {
      tatModal();
      getMonhocPage();
      alert('Xóa môn học thành công');
    });
  };

  $scope.refAdd = function() {
    $scope.mamh = "";
    $scope.tenmh = "";
    $scope.sogio = "";
    $scope.sotc = "";
  };

  $scope.getMaMH = function(student) {
    $scope.tenmh = student.tenmh;
    $scope.sogio = student.sogio;
    $scope.sotc = student.sotc;

    $scope.uMaMH = student.mamh;
    return $scope.uMaMH;
  }
  $scope.updateMonHoc = function() {
    User = $resource(
      "http://localhost:8080/monhoc/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.tenmh = $scope.tenmh;
    user.sogio = $scope.sogio;
    user.sotc = $scope.sotc;
    user.mamh = $scope.uMaMH;

    $scope.Message = User.save({
      id: $scope.uMaMH
    }, user).$promise.then(() => {
      tatModal();
      getMonhocPage();
      alert('Sửa môn học thành công');
    });
  };

  function getCountMonhoc() {
    $http.get("http://localhost:8080/monhoc").then(
      function(response) {
        $scope.soluonghocvien = response.data.length;
        $scope.total = response.data.length / $scope.pageSize;
        getSLHocvien();
      },
      function(err) {
        var error = err;
      });
  }
  getCountMonhoc();

  $scope.pageSize = '5';
  $scope.changePageSize = function(PageSize) {
    $scope.pageNo = 0;
    $scope.temp2 = 1;
    $scope.arrSLHocvien = [];
    $scope.pageSize = PageSize;
    getCountMonhoc();
    getMonhocPage();
  };

  function getSTT() {
    $scope.temp2 = 1;
  }
  getSTT();

  $scope.numb = function(So) {
    $scope.temp = So + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    $scope.pageNo = So;
    getMonhocPage();
  };

  $scope.arrSLHocvien = [];

  function getSLHocvien() {
    for (var i = 0; i < $scope.total; i++) {
      $scope.arrSLHocvien[i] = i;

    }
  }
  getSLHocvien();

  $scope.nextCount = function() {
    getCountMonhoc();
    if ($scope.pageNo < $scope.total) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.total) {
        $scope.pageNo--;
      } else {
        $scope.temp = $scope.pageNo + 1;
        $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
        getMonhocPage();
      }
    } else {
      $scope.pageNo = $scope.total;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getMonhocPage();
    }
  };

  $scope.preCount = function() {
    getCountMonhoc();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getMonhocPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getMonhocPage();
    }
  };

}]);
