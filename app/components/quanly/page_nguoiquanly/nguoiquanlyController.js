adminApp.controller('nguoiquanlyController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = 'Người quản lý';

  function tatModal() {
    $('#Xoa').modal('hide');
    $('#Them').modal('hide');
    $('#CapNhat').modal('hide');
  }

  $scope.pageNo = 0;
  $scope.pageSize = 50;
  $scope.total = 0;

  function getNguoiQuanLyPage() {
    $http.get("http://localhost:8080/nguoiquanly2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.nguoiquanlypage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getNguoiQuanLyPage();

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

  function fetchAllManager() {
    $scope.nguoiquanly = $resource('http://localhost:8080/nguoiquanly').query(function(data) {
      return data;
    });
  };
  fetchAllManager();

  $scope.createNguoiQuanLy = function() {
    User = $resource(
      "http://localhost:8080/createnguoiquanly", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.manql = $scope.manql;
    user.ho = $scope.ho;
    user.tenlot = $scope.tenlot;
    user.ten = $scope.ten;
    user.diachi = $scope.diachi;
    user.email = $scope.email;
    user.sdt = $scope.sdt;
    user.luong = $scope.luong;
    user.hsluong = $scope.hsluong;
    user.ngaysinh = $scope.ngaysinh;
    user.noisinh = $scope.noisinh;
    user.cmnd = $scope.cmnd;
    user.gioitinh = $scope.gioitinh;
    user.ngayvaolam = $scope.ngayvaolam;
    user.password = $scope.password;
    user.accounttype = $scope.SelectLoaiTaiKhoan;
    $scope.Message = User.save(user).$promise.then(() => {
      tatModal();
      getNguoiQuanLyPage();
      alert('Thêm người quản lý thành công');
    });
  };

  //lấy mã người quản lý
  $scope.getMaNQL = function(manql) {
    $scope.MaNQLDelete = manql;
  };

  $scope.deleteNguoiQuanLy = function() {
    User = $resource(
      "http://localhost:8080/daletenguoiquanly/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaNQLDelete
    }).$promise.then(() => {
      tatModal();
      getNguoiQuanLyPage();
      alert('Xóa người quản lý thành công');
    });
  };

  $scope.refAdd = function() {
    $scope.manql = "";
    $scope.ho = "";
    $scope.tenlot = "";
    $scope.ten = "";
    $scope.gioitinh = "Nam";
    $scope.diachi = "";
    $scope.email = "";
    $scope.sdt = "";
    $scope.luong = "";
    $scope.hsluong = "";
    $scope.ngaysinh = "";
    $scope.noisinh = "";
    $scope.cmnd = "";
    $scope.ngaysinh = "";
    $scope.ngayvaolam = "";
    $scope.password = "";
    $scope.SelectLoaiTaiKhoan = "";
  };

  //lấy thông tin người quản lý hiện tại
  $scope.getNQL = function(nguoiquanly) {
    $scope.manql = nguoiquanly.manql;
    $scope.ho = nguoiquanly.ho;
    $scope.gioitinh = nguoiquanly.gioitinh;
    $scope.tenlot = nguoiquanly.tenlot;
    $scope.ten = nguoiquanly.ten;
    $scope.diachi = nguoiquanly.diachi;
    $scope.email = nguoiquanly.email;
    $scope.sdt = nguoiquanly.sdt;
    $scope.luong = nguoiquanly.luong;
    $scope.hsluong = nguoiquanly.hsluong;
    $scope.ngaysinh = new Date(nguoiquanly.ngaysinh);
    $scope.noisinh = nguoiquanly.noisinh;
    $scope.cmnd = nguoiquanly.cmnd;
    $scope.ngayvaolam = new Date(nguoiquanly.ngayvaolam);
    $scope.password = nguoiquanly.password;
    $scope.SelectLoaiTaiKhoan = nguoiquanly.SelectLoaiTaiKhoan;
    return $scope.manql;
  }

  $scope.updateNguoiQuanLy = function() {
    User = $resource(
      "http://localhost:8080/updatenguoiquanly/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.ho = $scope.ho;
    user.tenlot = $scope.tenlot;
    user.ten = $scope.ten;
    user.diachi = $scope.diachi;
    user.email = $scope.email;
    user.sdt = $scope.sdt;
    user.luong = $scope.luong;
    user.hsluong = $scope.hsluong;
    user.ngaysinh = $scope.ngaysinh;
    user.noisinh = $scope.noisinh;
    user.cmnd = $scope.cmnd;
    user.ngaysinh = $scope.ngaysinh;
    user.ngayvaolam = $scope.ngayvaolam;
    user.password = $scope.password;
    user.SelectLoaiTaiKhoan = $scope.SelectLoaiTaiKhoan;
    user.manql = $scope.manql;

    $scope.Message = User.save({
      id: $scope.manql
    }, user).$promise.then(() => {
      tatModal();
      getNguoiQuanLyPage();
      alert('Sửa người quản lý thành công');
    });
  };

  //sắp xếp dữ liệu sử dụng header click
  $scope.sortColumn = 'ho';
  $scope.reverse = false;

  $scope.sortData = function(column) {
    if ($scope.sortColumn == column)
      $scope.reverse = !$scope.reverse;
    else
      $scope.reverse = false;
    $scope.sortColumn = column;
  }

  $scope.selectPhanTrang = function(SelectPhanTrang) {
    $scope.pageSize = SelectPhanTrang;
  }

  function getCountNguoiQuanLy() {
    $http.get("http://localhost:8080/nguoiquanly").then(
      function(response) {

        $scope.total = response.data.length / $scope.pageSize;
        getSLNguoiQuanLy();
      },
      function(err) {
        var error = err;
      });
  }
  getCountNguoiQuanLy();

  $scope.numb = function(So) {
    $scope.pageNo = So;
    getNguoiQuanLyPage();
  };

  $scope.arrSLNguoiQuanLy = [];

  function getSLNguoiQuanLy() {
    for (var i = 0; i < $scope.total; i++) {
      $scope.arrSLNguoiQuanLy[i] = i;

    }
  }
  getSLNguoiQuanLy();

  $scope.nextCount = function() {
    getCountNguoiQuanLy();
    if ($scope.pageNo < $scope.total) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.total) {
        $scope.pageNo--;
      }
      getNguoiQuanLyPage();
    } else {
      $scope.pageNo = $scope.total;
      getNguoiQuanLyPage();
    }
  };

  $scope.preCount = function() {
    getCountNguoiQuanLy();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getNguoiQuanLyPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getNguoiQuanLyPage();
    }
  };

  $scope.changePage = function() {
    getCountNguoiQuanLy();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getNguoiQuanLyPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getNguoiQuanLyPage();
    }
  };

}]);
