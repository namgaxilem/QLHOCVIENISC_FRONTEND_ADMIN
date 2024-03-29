adminApp.controller('doanhnghiepController', ['$scope', '$rootScope', '$http', '$resource', '$window', function($scope, $rootScope, $http, $resource, $window) {
  $rootScope.title = 'Doanh nghiệp';

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

  $scope.doanhnghieppage = [];

  function fetchAllBusiness() {
    $http.get("http://localhost:8080/doanhnghiep2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.doanhnghieppage = response.data;
      },
      function(err) {
        var error = err;
      });
  };
  fetchAllBusiness();

  //thêm doanh nghiệp mới
  $scope.createDoanhNghiep = function() {
    User = $resource(
      "http://localhost:8080/createdoanhnghiep", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );
    var user = {};
    // user.id = $scope.id;
    user.tendoanhnghiep = $scope.tendoanhnghiep;
    user.diachi = $scope.diachi;
    user.sdt = $scope.sdt;
    $scope.Message = User.save(user).$promise.then(() => {
      tatModal();
      fetchAllBusiness();
      alert('Tạo doanh nghiệp thành công');
    });
  };

  $scope.setMaDNDelete = function(id) {
    $scope.MaDNDelete = id;
  };

  //xóa doanh nghiệp
  $scope.deleteDoanhNghiep = function() {
    User = $resource(
      "http://localhost:8080/deletedoanhnghiep/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );
    $scope.Message = User.delete({
      id: $scope.MaDNDelete
    }).$promise.then(() => {
      tatModal();
      fetchAllBusiness();
      alert('Xóa doanh nghiệp thành công');
    });
  };

  //reset lại các input
  $scope.refAdd = function() {
    $scope.id = "";
    $scope.tendoanhnghiep = "";
    $scope.diachi = "";
    $scope.sdt = "";
  };

  //lấy doanh ngiệp tương ứng
  $scope.getMaDN = function(doanhnghiep) {
    $scope.tendoanhnghiep = doanhnghiep.tendoanhnghiep;
    $scope.diachi = doanhnghiep.diachi;
    $scope.sdt = doanhnghiep.sdt;
    $scope.id = doanhnghiep.id;
    return $scope.id;
  }

  //cập nhật lại dữ liệu thay đổi
  $scope.updateDoanhNghiep = function() {
    User = $resource(
      "http://localhost:8080/updatedoanhnghiep/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.tendoanhnghiep = $scope.tendoanhnghiep;
    user.diachi = $scope.diachi;
    user.sdt = $scope.sdt;
    user.id = $scope.id;

    $scope.Message = User.save({
      id: $scope.id
    }, user).$promise.then(() => {
      tatModal();
      fetchAllBusiness();
      alert('Sửa doanh nghiệp thành công');
    });
  };

  //sắp xếp dữ liệu sử dụng header click
  $scope.sortColumn = 'tendoanhnghiep';
  $scope.reverse = false;

  $scope.sortData = function(column) {
    if ($scope.sortColumn == column)
      $scope.reverse = !$scope.reverse;
    else
      $scope.reverse = false;
    $scope.sortColumn = column;
  }

  //phân trang
  $scope.selectPhanTrang = function(SelectPhanTrang) {
    $scope.pageSize = SelectPhanTrang;
  }

  function getCountDoanhNghiep() {
    $http.get("http://localhost:8080/doanhnghiep").then(
      function(response) {

        $scope.total = response.data.length / $scope.pageSize;
        getSLDoanhNghiep();
      },
      function(err) {
        var error = err;
      });
  }
  getCountDoanhNghiep();

  function getDoanhNghiepPage() {
    $http.get("http://localhost:8080/doanhnghiep2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.doanhnghieppage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getDoanhNghiepPage();

  $scope.numb = function(So) {
    $scope.pageNo = So;
    getDoanhNghiepPage();
  };

  $scope.arrSLDoanhNghiep = [];

  function getSLDoanhNghiep() {
    for (var i = 0; i < $scope.total; i++) {
      $scope.arrSLDoanhNghiep[i] = i;

    }
  }
  getSLDoanhNghiep();

  $scope.nextCount = function() {
    getCountDoanhNghiep();
    //alert($scope.pageNo);
    if ($scope.pageNo < $scope.total) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.total) {
        $scope.pageNo--;
      }
      getDoanhNghiepPage();
    } else {
      $scope.pageNo = $scope.total;
      getDoanhNghiepPage();
    }
  };

  $scope.preCount = function() {
    getCountDoanhNghiep();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getDoanhNghiepPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getDoanhNghiepPage();
    }
  };

  //change page
  $scope.changePage = function() {
    getCountDoanhNghiep();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getDoanhNghiepPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getDoanhNghiepPage();
    }
  };
}]);
