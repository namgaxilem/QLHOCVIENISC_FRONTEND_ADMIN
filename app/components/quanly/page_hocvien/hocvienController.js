adminApp.controller('hocvienController', ['$scope', '$http', '$resource', function($scope, $http, $resource) {

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
    for (var i = 0; i < $scope.khoahoc.length; i++) {
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

  $scope.seletedTruongHoc = "";
  $scope.statusSchool = "";
  $scope.selectTruongHoc = function(SelectTruongHoc) {
    $scope.seletedTruongHoc = SelectTruongHoc;
    for (var i = 0; i < $scope.truonghoc.length; i++) {
      if ($scope.seletedTruongHoc == $scope.truonghoc[i].matruong) {
        $scope.resultTruongHoc = $scope.truonghoc[i];
        return $scope.resultTruongHoc;
        $scope.statusSchool = 1;
      } else {

      }
    }
    if ($scope.statusSchool == 1) {
      alert("Tim thay");
    } else {
      alert("Khong tim thay");
    }

  }

  $scope.searchStudent = function() {
    $scope.status = "";
    for (var i = 0; i < $scope.hocvien.length; i++) {
      if ($scope.Seach.toString() == $scope.hocvien[i].mahv.toString()) {
        $scope.status = 1;
      } else {

      }
    }
    if ($scope.status == 1) {
      window.location = "#!result";
    } else {
      alert("Không tìm thấy học viên!");
    }
  };

  $scope.createStudent = function() {
    User = $resource(
      "http://localhost:8080/hocvien", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.truonghoc = $scope.resultTruongHoc;
    user.khoahoc = $scope.resultKhoaHoc;
    user.loaitaikhoan = $scope.resultLoaitk;
    user.danhmuchocvien = $scope.resultLoaiHocVien;
    user.password = $scope.password;
    user.tgcothedilam = $scope.tgcothedilam;
    user.email = $scope.email;
    user.diachi = $scope.diachi;
    user.matruong = $scope.resultTruongHoc.matruong;
    user.sdt = $scope.sdt;
    user.ho = $scope.ho;
    user.tenlot = $scope.tenlot;
    user.makhoahoc = $scope.resultKhoaHoc.makhoahoc;
    user.gioitinh = $scope.gioitinh;
    user.ngaysinh = $scope.ngaysinh;
    user.noisinh = $scope.noisinh;
    user.cmnd = $scope.cmnd;
    user.ten = $scope.ten;
    user.mahv = $scope.mahv;
    user.type = $scope.resultLoaiHocVien.id;
    user.accounttype = $scope.resultLoaitk.id;
    $scope.Message = User.save(user);

    location.reload();
  };

  $scope.setMaHVDelete = function(Student) {
    $scope.MaHVDelete = Student;
  };
  $scope.deleteStudent = function() {
    User = $resource(
      "http://localhost:8080/hocvien/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaHVDelete
    });
    location.reload();
  };
  $scope.refAdd = function() {
    $scope.password = "";
    $scope.tgcothedilam = "";
    $scope.email = "";
    $scope.diachi = "";
    $scope.sdt = "";
    $scope.ho = "";
    $scope.tenlot = "";
    $scope.gioitinh = "Nam";
    $scope.ngaysinh = "";
    $scope.noisinh = "";
    $scope.cmnd = "";
    $scope.ten = "";
    $scope.mahv = "";
  };
  $scope.changeAccountType = function() {
    for (var i = 0; i < $scope.hocvien.length; i++) {
      if ($scope.Seach.toString() == $scope.hocvien[i].mahv.toString()) {
        $scope.ResultSearch = $scope.hocvien[i];
        $scope.status = 1;
      } else {

      }
    }
    if ($scope.status == 1) {
      User = $resource(
        "http://localhost:8080/hocvien/:id", {}, {
          save: {
            method: 'PUT',
            params: {
              id: '@id'
            }
          }
        }
      );

      var user = {};
      $scope.selectTruongHoc($scope.ResultSearch.matruong);
      $scope.selectKhoaHoc($scope.ResultSearch.makhoahoc);
      $scope.selectLoaiHocVien($scope.ResultSearch.type);

      user.truonghoc = $scope.resultTruongHoc;
      user.khoahoc = $scope.resultKhoaHoc;
      user.loaitaikhoan = $scope.resultLoaitk;
      user.danhmuchocvien = $scope.resultLoaiHocVien;

      user.matruong = $scope.resultTruongHoc.matruong;
      user.makhoahoc = $scope.resultKhoaHoc.makhoahoc;
      user.accounttype = $scope.resultLoaitk.id;
      user.type = $scope.ResultSearch.type;

      user.password = $scope.ResultSearch.password;
      user.tgcothedilam = $scope.ResultSearch.tgcothedilam;
      user.email = $scope.ResultSearch.email;
      user.diachi = $scope.ResultSearch.diachi;
      user.sdt = $scope.ResultSearch.sdt;
      user.ho = $scope.ResultSearch.ho;
      user.tenlot = $scope.ResultSearch.tenlot;
      user.gioitinh = $scope.ResultSearch.gioitinh;
      user.ngaysinh = $scope.ResultSearch.ngaysinh;
      user.noisinh = $scope.ResultSearch.noisinh;
      user.cmnd = $scope.ResultSearch.cmnd;
      user.ten = $scope.ResultSearch.ten;
      user.mahv = $scope.Seach.toString();

      $scope.Message = User.save({
        id: $scope.Seach.toString()
      }, user);
      location.reload();
    } else {
      alert("Học viên không tồn tại!");
    }
  };
  $scope.getMaHV = function(student) {
    $scope.password = student.password;
    $scope.tgcothedilam = student.tgcothedilam;
    $scope.email = student.email;
    $scope.diachi = student.diachi;
    $scope.sdt = student.sdt;
    $scope.ho = student.ho;
    $scope.tenlot = student.tenlot;
    $scope.gioitinh = student.gioitinh;
    $scope.ngaysinh = new Date(student.ngaysinh);
    $scope.tgcothedilam = new Date(student.tgcothedilam);
    $scope.noisinh = student.noisinh;
    $scope.cmnd = student.cmnd;
    $scope.ten = student.ten;

    $scope.uMaHV = student.mahv;
    return $scope.uMaHV;
  }
  $scope.updateStudent = function() {
    //console.log($scope.MaHV);
    User = $resource(
      "http://localhost:8080/hocvien/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.truonghoc = $scope.resultTruongHoc;
    user.khoahoc = $scope.resultKhoaHoc;
    user.loaitaikhoan = $scope.resultLoaitk;
    user.danhmuchocvien = $scope.resultLoaiHocVien;
    user.password = $scope.password;
    user.tgcothedilam = $scope.tgcothedilam;
    user.email = $scope.email;
    user.diachi = $scope.diachi;
    user.matruong = $scope.resultTruongHoc.matruong;
    user.sdt = $scope.sdt;
    user.ho = $scope.ho;
    user.tenlot = $scope.tenlot;
    user.makhoahoc = $scope.resultKhoaHoc.makhoahoc;
    user.gioitinh = $scope.gioitinh;
    user.ngaysinh = $scope.ngaysinh;
    user.noisinh = $scope.noisinh;
    user.cmnd = $scope.cmnd;
    user.ten = $scope.ten;
    user.type = $scope.resultLoaiHocVien.id;
    user.accounttype = $scope.resultLoaitk.id;
    user.mahv = $scope.uMaHV;

    $scope.Message = User.save({
      id: $scope.uMaHV
    }, user);
    location.reload();
  };

  $scope.pageNo = 0;
  $scope.pageSize = 5;
  $scope.total = 0;

  function getCountHocvien() {
    $http.get("http://localhost:8080/hocvien").then(
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
    $http.get("http://localhost:8080/hocvien2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.hocvienpage = response.data;
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
