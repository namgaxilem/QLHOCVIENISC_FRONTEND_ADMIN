adminApp.controller('hocvienController', ['$scope', '$http', '$resource', '$rootScope', 'docService', function($scope, $http, $resource, $rootScope, docService) {
  $rootScope.title = 'Học viên';

  $scope.hocvienThem = {
    password : "",
    tgcothedilam : "",
    email : "",
    diachi : "",
    matruong : "",
    sdt : "",
    ho : "",
    tenlot : "",
    makhoahoc : "",
    gioitinh : "",
    ngaysinh : "",
    ten : "",
    anhdaidien : "avatar.png",
    mahv : "",
    type : "",
    accounttype : "0"
  };

  $scope.hocvienSua = {
    password : "",
    tgcothedilam : "",
    email : "",
    diachi : "",
    matruong : "",
    sdt : "",
    ho : "",
    tenlot : "",
    makhoahoc : "",
    gioitinh : "",
    ngaysinh : "",
    ten : "",
    anhdaidien : "avatar.png",
    mahv : "",
    type : "",
    accounttype : "0"
  };

  $scope.hocvienXem = {
    password : "",
    tgcothedilam : "",
    email : "",
    diachi : "",
    matruong : "",
    sdt : "",
    ho : "",
    tenlot : "",
    makhoahoc : "",
    gioitinh : "",
    ngaysinh : "",
    ten : "",
    anhdaidien : "",
    mahv : "",
    type : "",
    accounttype : "0"
  };

  function fetchAllStudents() {
    $scope.hocvienpage = $resource('http://localhost:8080/hocvien').query(function(data) {
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

  $scope.timkiemHocvien = function() {
    $http.get("http://localhost:8080/timkiemhocvien/" + $scope.timkiemhocvien).then(
      function(response) {
        var timkiem = response.data;
        alert(timkiem.ho + " " + timkiem.tenlot + " " + timkiem.ten);
      },
      function() {
        alert("Mã học viên chưa chính xác! Vui lòng nhập lại!");
      });
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

  $scope.createStudent = function() {
    User = $resource(
      "http://localhost:8080/themhocvien", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    console.log($scope.hocvienThem);

    if ($scope.hocvienThem.password != "" &&
    $scope.hocvienThem.email != "" &&
    $scope.hocvienThem.matruong != "" &&
    $scope.hocvienThem.sdt != "" &&
    $scope.hocvienThem.ho != "" &&
    $scope.hocvienThem.makhoahoc != "" &&
    $scope.hocvienThem.ngaysinh != "" &&
    $scope.hocvienThem.ten != "" &&
    $scope.hocvienThem.mahv != "" &&
    $scope.hocvienThem.type != "") {
      if ($scope.anhdaidien == "avatar.png") {

      } else {
        if ($scope.gioitinh == "Nam") {
          $scope.anhdaidien = "avatar.png";
        } else {
          $scope.anhdaidien = "female.jpg";
        }
      }

      var hocvienThem = angular.toJson($scope.hocvienThem);
      $scope.Message = User.save(hocvienThem);

      location.reload();
    } else {
      alert("Vui lòng nhập đủ các trường bắt buộc!");
    }
  };

  $scope.xoahocvien = function(Student) {
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

  $scope.xemhocvien = function(student) {
    $scope.hocvienXem = angular.copy(student);
    $scope.hocvienXem.ngaysinh = new Date($scope.hocvienXem.ngaysinh);
    $scope.hocvienXem.tgcothedilam = new Date($scope.hocvienXem.tgcothedilam);
  }

  $scope.suahocvien = function(student) {
    $scope.hocvienSua = angular.copy(student);
    $scope.hocvienSua.ngaysinh = new Date($scope.hocvienSua.ngaysinh);
    $scope.hocvienSua.tgcothedilam = new Date($scope.hocvienSua.tgcothedilam);
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

    if ($scope.hocvienSua.password != "" &&
    $scope.hocvienSua.email != "" &&
    $scope.hocvienSua.matruong != "" &&
    $scope.hocvienSua.sdt != "" &&
    $scope.hocvienSua.ho != "" &&
    $scope.hocvienSua.makhoahoc != "" &&
    $scope.hocvienSua.ngaysinh != "" &&
    $scope.hocvienSua.ten != "" &&
    $scope.hocvienSua.type != "") {
      if ($scope.anhdaidien == "avatar.png" || $scope.anhdaidien == "female.jpg") {
        if ($scope.gioitinh == "Nam") {
          $scope.anhdaidien = "avatar.png";
        } else {
          $scope.anhdaidien = "female.jpg";
        }
      } else {

      }

      $scope.Message = User.save({
        id: $scope.hocvienSua.mahv
      }, $scope.hocvienSua);
      location.reload();
    } else {
      alert("Vui lòng nhập đủ các trường bắt buộc!");
    }
  };

  $scope.pageNo = 0;
  $scope.pageSize = 200;
  $scope.total = $scope.hocvienpage.length / $scope.pageSize;
  $scope.typeSort = 1;
  $scope.sortBy = "MAHV";
  $scope.makhoahoc = "ISC09";
  $scope.arrSLHocvien = [];

  $scope.changeCourse = function() {
    $scope.typeSort = 1;
    getHocvienPage();
  };

  $scope.changeSortPage = function(SortPage) {
    if ($scope.typeSort == 1) {
      $scope.typeSort = 2;
    } else if ($scope.typeSort == 2) {
      $scope.typeSort = 1;
    }
    $scope.sortBy = SortPage;
    console.log($scope.makhoahoc);
    getHocvienPage();
  };

  function getHocvienPage() {
    $http.get("http://localhost:8080/hocvien2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize + "&typeSort=" + $scope.typeSort + "&makhoahoc=" + $scope.makhoahoc + "&sortBy=" + $scope.sortBy).then(
      function(response) {
        $scope.hocvienpage = response.data;
        $scope.soluonghienthi = response.data.length;
      },
      function(err) {
        var error = err;
      });
  }
  getHocvienPage();

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
