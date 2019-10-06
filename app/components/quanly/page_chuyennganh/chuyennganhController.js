adminApp.controller('chuyennganhController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = 'Chuyên ngành';

  function tatModal() {
    $('#Xoa').modal('hide');
    $('#Them').modal('hide');
    $('#CapNhat').modal('hide');
  }

  $scope.pageNo = 0;
  $scope.pageSize = 50;
  $scope.total = 0;

  function getChuyenNganhPage() {
    $http.get("http://localhost:8080/chuyennganh3?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.soluonghienthi = response.data.length;
        $scope.chuyennganhpage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getChuyenNganhPage();

  $scope.createChuyennganh = function() {
    User = $resource(
      "http://localhost:8080/chuyennganh", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.tencn = $scope.tenchuyennganh;
    $scope.Message = User.save(user).$promise.then(() => {
      tatModal();
      getChuyenNganhPage();
      alert('Thêm chuyên ngành thành công');
    });
  };

  $scope.setMaDelete = function(IdChuyennganh) {
    $scope.MaChuyennganhDelete = IdChuyennganh;
  };
  $scope.deleteChuyennganh = function() {
    User = $resource(
      "http://localhost:8080/chuyennganh/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaChuyennganhDelete
    }).$promise.then(() => {
      tatModal();
      getChuyenNganhPage();
      alert('Xóa chuyên ngành thành công');
    });
  };
  $scope.refAdd = function() {
    $scope.tenchuyennganh = "";
  };

  $scope.getMaChuyennganh = function(student) {
    $scope.machuyennganh = student.id;
    $scope.tenchuyennganh = student.tencn;

    $scope.uMaChuyennganh = student.id;
    return $scope.uMaChuyennganh;
  }
  $scope.updateChuyennganh = function() {
    User = $resource(
      "http://localhost:8080/chuyennganh/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.tencn = $scope.tenchuyennganh;
    user.id = $scope.uMaChuyennganh;

    $scope.Message = User.save({
      id: $scope.uMaChuyennganh
    }, user).$promise.then(() => {
      tatModal();
      getChuyenNganhPage();
      alert('Sửa chuyên ngành thành công');
    });
  };

  function getCountHocvien() {
    $http.get("http://localhost:8080/chuyennganh").then(
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
    getChuyenNganhPage();
  };

  function getSTT() {
    $scope.temp2 = 1;
  }
  getSTT();

  $scope.numb = function(So) {
    $scope.temp = So + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    $scope.pageNo = So;
    getChuyenNganhPage();
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
      } else {
        $scope.temp = $scope.pageNo + 1;
        $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
        getChuyenNganhPage();
      }
    } else {
      $scope.pageNo = $scope.total;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getChuyenNganhPage();
    }
  };

  $scope.preCount = function() {
    getCountHocvien();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getChuyenNganhPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getChuyenNganhPage();
    }
  };

}]);
