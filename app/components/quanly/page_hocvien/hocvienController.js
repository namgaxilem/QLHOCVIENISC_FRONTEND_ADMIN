adminApp.controller('hocvienController', ['$scope', '$http', '$resource', '$rootScope', 'docService', function($scope, $http, $resource, $rootScope, docService) {
  $rootScope.title = 'Học viên';

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

$scope.timkiemhocvien="";
$scope.timkiemHocvien= function(idHocvien){
  $http.get("http://localhost:8080/timkiemhocvien/" + idHocvien).then(
    function(response) {
      $scope.timkiem = response.data;
      alert($scope.timkiem.ho+" "+$scope.timkiem.tenlot+" "+$scope.timkiem.ten);
    },
    function() {
      alert("Mã học viên chưa chính xác! Vui lòng nhập lại!");
    });
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
        $scope.SelectKhoaHoc = $scope.khoahoc[i].makhoahoc;
        return $scope.SelectKhoaHoc;
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
        $scope.SelectLoaiHocVien = $scope.loaihocvien[i].id;
        return $scope.SelectLoaiHocVien;
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
        $scope.SelectTruongHoc = $scope.truonghoc[i].matruong;
        return $scope.SelectTruongHoc;
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

  //Upload file
  $scope.file = '';

  $scope.upload = function() {
    var file = $scope.file;
    var type = file.type;
    if (type.slice(0, 5) == "image") {
      docService.saveDoc(file)
        .then(
          function(response) {
            $scope.anhdaidien = file.name;
            return $scope.anhdaidien;
          },
          function(errResponse) {
            alert("Upload fail!");
          }
        );
    } else {
      alert("Vui lòng chọn đúng định dạng hình ảnh!");
    }
  };
  //End upload file

  $scope.anhdaidien = "avatar.png";
  $scope.diachi = "trống";
  $scope.tenlot = "trống";
  $scope.noisinh = "trống";
  $scope.tgcothedilam = new Date('2019-01-01');

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
    if ($scope.password != "" && $scope.email != "" && $scope.SelectTruongHoc != "" && $scope.sdt != "" && $scope.ho != "" && $scope.SelectKhoaHoc != "" && $scope.ngaysinh != "" && $scope.cmnd != "" && $scope.ten != "" && $scope.mahv != "" && $scope.SelectLoaiHocVien != "") {
      if ($scope.anhdaidien == "avatar.png") {
        if ($scope.gioitinh == "Nam") {
          $scope.anhdaidien = "avatar.png";
        } else {
          $scope.anhdaidien = "female.jpg";
        }
      } else {

      }
      user.password = $scope.password;
      user.tgcothedilam = $scope.tgcothedilam;
      user.email = $scope.email;
      user.diachi = $scope.diachi;
      user.matruong = $scope.SelectTruongHoc;
      user.sdt = $scope.sdt;
      user.ho = $scope.ho;
      user.tenlot = $scope.tenlot;
      user.makhoahoc = $scope.SelectKhoaHoc;
      user.gioitinh = $scope.gioitinh;
      user.ngaysinh = $scope.ngaysinh;
      user.noisinh = $scope.noisinh;
      user.cmnd = $scope.cmnd;
      user.ten = $scope.ten;
      user.anhdaidien = $scope.anhdaidien;
      user.mahv = $scope.mahv;
      user.type = $scope.SelectLoaiHocVien;
      user.accounttype = 0;

      $scope.Message = User.save(user);

      location.reload();
    } else {
      alert("Vui lòng nhập đủ các trường bắt buộc!");
    }

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
    $scope.SelectKhoaHoc = "";
    $scope.SelectTruongHoc = "";
    $scope.SelectLoaiHocVien = "";
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
    $scope.SelectKhoaHoc = student.makhoahoc;
    $scope.SelectTruongHoc = student.matruong;
    $scope.SelectLoaiTaiKhoan = student.accounttype;
    $scope.SelectLoaiHocVien = student.type;
    $scope.mahv = student.mahv;
    $scope.anhdaidien = student.anhdaidien;

    $scope.uMaHV = student.mahv;
    return $scope.uMaHV;
  }
  $scope.updateStudent = function() {
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
    if ($scope.password != "" && $scope.email != "" && $scope.SelectTruongHoc != "" && $scope.sdt != "" && $scope.ho != "" && $scope.SelectKhoaHoc != "" && $scope.ngaysinh != "" && $scope.cmnd != "" && $scope.ten != "" && $scope.mahv != "" && $scope.SelectLoaiHocVien != "") {
      if ($scope.anhdaidien == "avatar.png" || $scope.anhdaidien == "female.jpg") {
        if ($scope.gioitinh == "Nam") {
          $scope.anhdaidien = "avatar.png";
        }
        else
        {
          $scope.anhdaidien = "female.jpg";
        }
      }
      else
      {

      }
      user.anhdaidien = $scope.anhdaidien;
      user.password = $scope.password;
      user.tgcothedilam = $scope.tgcothedilam;
      user.email = $scope.email;
      user.diachi = $scope.diachi;
      user.matruong = $scope.SelectTruongHoc;
      user.sdt = $scope.sdt;
      user.ho = $scope.ho;
      user.tenlot = $scope.tenlot;
      user.makhoahoc = $scope.SelectKhoaHoc;
      user.gioitinh = $scope.gioitinh;
      user.ngaysinh = $scope.ngaysinh;
      user.noisinh = $scope.noisinh;
      user.cmnd = $scope.cmnd;
      user.ten = $scope.ten;
      user.type = $scope.SelectLoaiHocVien;
      user.accounttype = 0;

      user.mahv = $scope.uMaHV;

      $scope.Message = User.save({
        id: $scope.uMaHV
      }, user);
      location.reload();
    } else {
      alert("Vui lòng nhập đủ các trường bắt buộc!");
    }
  };



  $scope.pageNo = 0;
  $scope.pageSize = 10;
  $scope.total = 0;

  function getCountHocvien() {
    $http.get("http://localhost:8080/hocvien").then(
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

  $scope.changePageSize = function(PageSize) {
    $scope.pageNo = 0;
    $scope.temp2 = 1;
    $scope.arrSLHocvien = [];
    $scope.pageSize = PageSize;
    getCountHocvien();
    getHocvienPage();
  };
  $scope.SelectKhoaHoc2 = "ISC09";
  $scope.typeSort = 1;
  $scope.pageSize = '10';
  $scope.sortBy = "MAHV";
  $scope.maKH = "ISC09";

  $scope.changeCourse = function() {
    $scope.typeSort = 1;
    $scope.arrSLHocvien = [];
    $scope.pageNo = 0;
    $scope.temp = $scope.pageNo + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    $scope.maKH = $scope.SelectKhoaHoc;
    getHocvienPage();
  };

  $scope.changeSortPage = function(SortPage) {
    if ($scope.typeSort == 1) {
      $scope.typeSort = 2;
    } else if ($scope.typeSort == 2) {
      $scope.typeSort = 1;
    }
    $scope.sortBy = SortPage;
    getHocvienPage();
  };

  function getHocvienPage() {
    $http.get("http://localhost:8080/hocvien2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize + "&typeSort=" + $scope.typeSort + "&maKH=" + $scope.maKH + "&sortBy=" + $scope.sortBy).then(
      function(response) {
        $scope.soluonghienthi = response.data.length;
        $scope.hocvienpage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getHocvienPage();

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

  // remove and change class
  $scope.sortClass = function(Sort) {
    if ($scope.sortBy == Sort) {
      if ($scope.typeSort == 2) {
        return 'arrow-down';
      } else {
        return 'arrow-up';
      }
    }

  }

}]);




adminApp.constant('urls', {
  DOC_URL: 'http://localhost:8080/doc/'
});
// adminApp.directive('cOnChange', function() {
//   'use strict';
//
//   return {
//     restrict: "A", replace: false,
//     scope: {
//       cOnChange: '&'
//     },
//     link: function(scope, element) {
//       element.on('change', function() {
//         scope.cOnChange();
//       });
//     }
//   };
// });

adminApp.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);
