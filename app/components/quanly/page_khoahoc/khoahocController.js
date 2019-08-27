adminApp.controller('khoahocController', ['$scope', '$http', '$resource', function($scope, $http, $resource) {

  function fetchAllStudents() {
    $scope.hocvien = $resource('http://localhost:8080/hocvien').query(function(data) {
      return data;
    });
  };
  fetchAllStudents();

  function fetchAllStudentsType() {
    $scope.loaihocvien = $resource('http://localhost:8080/danhmuchocvien').query(function(data) {
      return data;
    });
  };
  fetchAllStudentsType();

  function fetchAllSchool() {
    $scope.truonghoc = $resource('http://localhost:8080/truonghoc').query(function(data) {
      return data;
    });
  };
  fetchAllSchool();

  function fetchAllAccounttype() {
    $scope.loaitaikhoan = $resource('http://localhost:8080/loaitaikhoan').query(function(data) {
      return data;
    });
  };
  fetchAllAccounttype();

  function fetchAllCourse() {
    $scope.khoahoc = $resource('http://localhost:8080/khoahoc').query(function(data) {
      return data;
    });
  };

  fetchAllCourse();

  function fetchAllCourse() {
    $scope.chuyennganh = $resource('http://localhost:8080/chuyennganh').query(function(data) {
      return data;
    });
  };
  fetchAllCourse();

  $scope.refresh = function() {
    fetchAllStudents();
  };

  $scope.seletedLoaitaikhoan = "";
  $scope.statusAccounttype = "";
  $scope.selectLoaiTaiKhoan = function(SelectLoaiTaiKhoan) {
    $scope.seletedLoaitaikhoan = SelectLoaiTaiKhoan;
    for (var i = 0; i < $scope.loaitaikhoan.length; i++) {
      if ($scope.seletedLoaitaikhoan == $scope.loaitaikhoan[i].id) {
        $scope.resultLoaitk = $scope.loaitaikhoan[i];
        return $scope.resultLoaitk;
        $scope.statusAccounttype = 1;
      } else {

      }
    }
    if ($scope.statusAccounttype == 1) {
      alert("Tim thay");
    } else {
      alert("Khong tim thay");
    }

  }

  $scope.seletedKhoahoc = "";
  $scope.statusCourse = "";
  $scope.selectKhoaHoc = function(SelectKhoaHoc) {
    $scope.seletedKhoahoc = SelectKhoaHoc;
    for (var i = 0; i < $scope.loaitaikhoan.length; i++) {
      if ($scope.seletedKhoahoc == $scope.khoahoc[i].makhoahoc) {
        $scope.resultKhoaHoc = $scope.khoahoc[i];
        return $scope.resultKhoaHoc;
        $scope.statusCourse = 1;
      } else {

      }
    }
    if ($scope.statusCourse == 1) {
      alert("Tim thay");
    } else {
      alert("Khong tim thay");
    }

  }

  $scope.seletedLoaiHocVien = "";
  $scope.statusStudentType = "";
  $scope.selectLoaiHocVien = function(SelectLoaiHocVien) {
    $scope.seletedLoaiHocVien = SelectLoaiHocVien;
    for (var i = 0; i < $scope.loaihocvien.length; i++) {
      if ($scope.seletedLoaiHocVien == $scope.loaihocvien[i].id) {
        $scope.resultLoaiHocVien = $scope.loaihocvien[i];
        return $scope.resultLoaiHocVien;
        $scope.statusStudentType = 1;
      } else {

      }
    }
    if ($scope.statusStudentType == 1) {
      alert("Tim thay");
    } else {
      alert("Khong tim thay");
    }

  }

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
    user.chuyennganh = $scope.resultChuyenNganh;
    user.ngaybd = $scope.ngaybd;
    user.ngaykt = $scope.ngaykt;
    user.chuyennganh_ID = $scope.resultChuyenNganh.id;
    user.tenkhoahoc = $scope.tenkhoahoc;
    user.makhoahoc = $scope.makhoahoc;

    $scope.Message = User.save(user);

    location.reload();
  };

  $scope.setMaKhoaHocDelete = function(Student) {
    $scope.MaKhoaHocDelete = Student;
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
    });
    location.reload();
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
    $scope.chuyennganh_id = student.idchuyennganh;

    $scope.uMaKhoaHoc = student.makhoahoc;
    return $scope.uMaKhoaHoc;
  }
  $scope.updateKhoaHoc = function() {
    //console.log($scope.MaHV);
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
    user.chuyennganh = $scope.resultChuyenNganh;
    user.chuyennganh_ID = $scope.resultChuyenNganh.id;
    user.makhoahoc = $scope.uMaKhoaHoc;

    $scope.Message = User.save({
      id: $scope.uMaKhoaHoc
    }, user);
    location.reload();
  };

  $scope.pageNo = 0;
  $scope.pageSize = 2;
  $scope.total = 0;

  function getCountHocvien() {
    $http.get("http://localhost:8080/khoahoc").then(
      function(response) {

        $scope.total = response.data.length / $scope.pageSize;
        getSLHocvien();
      },
      function(err) {
        var error = err;
      });
  }
  getCountHocvien();

  function getHocvienPage() {
    $http.get("http://localhost:8080/khoahoc2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.khoahocpage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getHocvienPage();

  $scope.numb = function(So) {
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
    //alert($scope.pageNo);
    if ($scope.pageNo < $scope.total) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.total) {
        $scope.pageNo--;
      }
      getHocvienPage();
    } else {
      $scope.pageNo = $scope.total;
      getHocvienPage();
    }
  };

  $scope.preCount = function() {
    getCountHocvien();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getHocvienPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getHocvienPage();
    }
  };

}]);
