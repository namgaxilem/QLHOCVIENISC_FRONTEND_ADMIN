adminApp.controller('thongbaoController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = 'Thông báo';

  $scope.thongbaoThem = {
    tieude: "",
    noidung: "",
    nguoidang: "",
    ngaydang: "",
    makhoahoc: ""
  };

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
    //var thongbaoThem = angular.toJson($scope.thongbaoThem);

    $scope.Message = ThongBao.save($scope.thongbaoThem);

    location.reload();
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
    });
    location.reload();
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

  //Phân trang

  $scope.pageNo = 0;
  $scope.pageSize = 5;
  $scope.totalpage = 0;
  $scope.arrSLThongBao = [];

  function getCountThongBao() {
    $http.get("http://localhost:8080/thongbao").then(
      function(response) {
        $scope.totalpage = response.data.length / $scope.pageSize;

        for (var i = 0; i < $scope.totalpage; i++) {
          $scope.arrSLThongBao[i] = i;
        }
      },
      function(err) {
        console.log(err);
      });
  }
  getCountThongBao();

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
