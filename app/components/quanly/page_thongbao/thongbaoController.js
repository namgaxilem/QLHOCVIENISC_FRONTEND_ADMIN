adminApp.controller('thongbaoController', ['$scope', '$rootScope', '$http', '$resource', '$window', function($scope, $rootScope, $http, $resource, $window) {
  $rootScope.title = 'Thông báo';

  if ($rootScope.logged == false || $rootScope.logged == undefined) {
    $window.location.href = '#!/dangnhap';
  }

  function tatModal() {
    $('#Xoa').modal('hide');
    $('#Them').modal('hide');
  }

  $scope.thongbaoThem = {
    tieude: "",
    noidung: "",
    nguoidang: "",
    ngaydang: "",
    makhoahoc: ""
  };

  $scope.pageNo = 0;
  $scope.pageSize = 50;
  $scope.totalpage = 0;
  $scope.arrSLThongBao = [];

  function getThongBaoPage() {
    $http.get("http://localhost:8080/thongbao2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.thongbao = response.data;
        //Đánh số thứ tự
        $scope.thongbao.stt = [];
        var stt = $scope.pageNo * $scope.pageSize;
        for (var i = 0; i < $scope.pageSize; i++) {
          stt++;
          $scope.thongbao.stt[i] = stt;
        }

      },
      function(err) {
        var error = err;
      });
  }
  getThongBaoPage();

  function fetchAllKhoaHoc() {
    $scope.khoahoc = $resource('http://localhost:8080/khoahoc').query(function(data) {
      return data;
    });
  };
  fetchAllKhoaHoc();

  $scope.createThongBao = function() {
    ThongBao = $resource(
      "http://localhost:8080/thongbao", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    $scope.thongbaoThem.nguoidang = "1";
    $scope.thongbaoThem.ngaydang = new Date();

    $scope.Message = ThongBao.save($scope.thongbaoThem).$promise.then(() => {
      tatModal();
      getThongBaoPage();
      alert('Thêm thống báo thành công');
    });
  };

  $scope.setMaThongBaoDelete = function(id) {
    $scope.MaThongBaoDelete = id;
  };
  $scope.deleteThongBao = function() {
    User = $resource(
      "http://localhost:8080/thongbao/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaThongBaoDelete
    }).$promise.then(() => {
      tatModal();
      getThongBaoPage();
      alert('Xóa thông báo thành công');
    });
  };
  $scope.refAdd = function() {
    $scope.thongbaoThem = {
      tieude: "",
      noidung: "",
      nguoidang: "",
      ngaydang: "",
      makhoahoc: ""
    };
  };

  $scope.xemThongBao = function(row) {
    $scope.thongbaoXem = angular.copy(row);
  }

  function getCountThongBao() {
    $http.get("http://localhost:8080/thongbao").then(
      function(response) {
        $scope.totalpage = response.data.length / $scope.pageSize;

        for (var i = 0; i < $scope.totalpage; i++) {
          $scope.arrSLThongBao[i] = i;
        }
      },
      function(err) {
        alert(err);
      });
  }
  getCountThongBao();

  $scope.numb = function(So) {
    $scope.pageNo = So;
    getThongBaoPage();
  };

  $scope.nextCount = function() {
    getCountThongBao();
    //alert($scope.pageNo);
    if ($scope.pageNo < $scope.totalpage) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.totalpage) {
        $scope.pageNo--;
      }
      getThongBaoPage();
    } else {
      $scope.pageNo = $scope.totalpage;
      getThongBaoPage();
    }
  };

  $scope.preCount = function() {
    getCountThongBao();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getThongBaoPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getThongBaoPage();
    }
  };

}]);

//Format time
adminApp.filter('formatTime', function($filter) {
  return function(time, format) {
    var parts = time.split(':');
    var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
    return $filter('date')(date, format || 'hh:mm');
  };
});
