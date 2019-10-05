adminApp.controller('khoahocController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = 'Khóa học';

  $scope.pageNo = 0;
  $scope.pageSize = 50;
  $scope.total = 0;

  getKhoaHocPage();

  function fetchAllCourse() {
    $scope.chuyennganh = $resource('http://localhost:8080/chuyennganh').query(function(data) {
      return data;
    });
  };
  fetchAllCourse();

  $scope.seletedChuyenNganh = "";
  $scope.statusChuyenNganh = "";
  $scope.selectChuyenNganh = function(SelectChuyenNganh) {
    $scope.seletedChuyenNganh = SelectChuyenNganh;
    for (var i = 0; i < $scope.chuyennganh.length; i++) {
      if ($scope.seletedChuyenNganh == $scope.chuyennganh[i].id) {
        $scope.resultChuyenNganh = $scope.chuyennganh[i];
        return $scope.resultChuyenNganh;
        $scope.statusChuyenNganh = 1;
      } else {

      }
    }
    if ($scope.statusChuyenNganh == 1) {
      alert("Tim thay");
    } else {
      alert("Khong tim thay");
    }

  }

  function tatModal() {
    $('#Xoa').modal('hide');
    $('#Them').modal('hide');
    $('#CapNhat').modal('hide');
  }

  $scope.createKhoaHoc = function() {
    User = $resource(
      "http://localhost:8080/khoahoc", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.ngaybd = $scope.ngaybd;
    user.ngaykt = $scope.ngaykt;
    user.chuyennganh_ID = $scope.resultChuyenNganh.id;
    user.tenkhoahoc = $scope.tenkhoahoc;
    user.makhoahoc = $scope.makhoahoc;

    $scope.Message = User.save(user).$promise.then(() => {
      tatModal();
      getKhoaHocPage();
      alert('Thêm khóa học thành công');
    });

  };

  $scope.updateKhoaHoc = function() {
    User = $resource(
      "http://localhost:8080/khoahoc/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.tenkhoahoc = $scope.tenkhoahoc;
    user.ngaybd = $scope.ngaybd;
    user.ngaykt = $scope.ngaykt;
    user.chuyennganh_ID = $scope.SelectChuyenNganh;
    user.makhoahoc = $scope.uMaKhoaHoc;

    $scope.Message = User.save({
      id: $scope.uMaKhoaHoc
    }, user).$promise.then(() => {
      tatModal();
      getKhoaHocPage();
      alert('Sửa khóa học thành công');
    });;
  };

  $scope.deleteKhoaHoc = function() {
    User = $resource(
      "http://localhost:8080/khoahoc/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaKhoaHocDelete
    }).$promise.then(() => {
      tatModal();
      getKhoaHocPage();
      alert('Thêm khóa học thành công');
    });;
  };

  $scope.setMaKhoaHocDelete = function(Student) {
    $scope.MaKhoaHocDelete = Student;
    return $scope.MaKhoaHocDelete;
  };

  $scope.refAdd = function() {
    $scope.makhoahoc = "";
    $scope.tenkhoahoc = "";
    $scope.ngaybd = "";
    $scope.ngaykt = "";
  };

  $scope.getMaKhoaHoc = function(student) {
    $scope.tenkhoahoc = student.tenkhoahoc;
    $scope.ngaybd = new Date(student.ngaybd);
    $scope.ngaykt = new Date(student.ngaykt);
    $scope.SelectChuyenNganh = student.chuyennganh_ID + '';

    $scope.uMaKhoaHoc = student.makhoahoc;
    return $scope.uMaKhoaHoc;
  };

  $scope.tenChuyennganh = function(idChuyennganh) {
    for (var i = 0; i < $scope.chuyennganh.length; i++) {
      if (idChuyennganh == $scope.chuyennganh[i].id) {
        $scope.Change = $scope.chuyennganh[i].tencn;
      } else {

      }
    }
  }

  function getCountHocvien() {
    $http.get("http://localhost:8080/khoahoc").then(
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
    getKhoaHocPage();
  };

  function getSTT() {
    $scope.temp2 = 1;
  }
  getSTT();

  function getKhoaHocPage() {
    $http.get("http://localhost:8080/khoahoc2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.soluonghienthi = response.data.length;
        $scope.khoahocpage = response.data;
      },
      function(err) {
        var error = err;
      });
  }

  $scope.numb = function(So) {
    $scope.temp = So + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    $scope.pageNo = So;
    getKhoaHocPage();
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
        getKhoaHocPage();
      }
    } else {
      $scope.pageNo = $scope.total;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getKhoaHocPage();
    }
  };

  $scope.preCount = function() {
    getCountHocvien();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getKhoaHocPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getKhoaHocPage();
    }
  };

}]);
