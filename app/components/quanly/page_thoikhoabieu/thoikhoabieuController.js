adminApp.controller('thoikhoabieuController', ['$scope', '$rootScope', '$http', '$resource', '$filter', function($scope, $rootScope, $http, $resource, $filter) {
  $rootScope.title = 'Thời khóa biểu';

  $scope.thoikhoabieuThem = {
    id: "",
    giokt: "",
    macbgv: "",
    tencbgv: "",
    ngayhoc: "",
    giobd: "",
    tenkhoahoc: "",
    tenmonhoc: "",
    makhoahoc: "",
    tenphg: "",
    mamh: "",
    maphg: ""
  };

  $scope.thoikhoabieuSua = {
    id: "",
    giokt: "",
    macbgv: "",
    tencbgv: "",
    ngayhoc: "",
    giobd: "",
    tenkhoahoc: "",
    tenmonhoc: "",
    makhoahoc: "",
    tenphg: "",
    mamh: "",
    maphg: ""
  };

  $scope.$watch("thoikhoabieuThem.giobd", function() {
    var hour = $scope.thoikhoabieuThem.giobd.getHours();
    var minute = $scope.thoikhoabieuThem.giobd.getMinutes();

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minute < 10) {
      minute = "0" + minute;
    }

    var second = "00"

    var date = hour + ":" + minute + ":" + second;
    $scope.thoikhoabieuThem.giobd = date;
    console.log($scope.thoikhoabieuThem.giobd);
  });

  $scope.$watch("thoikhoabieuThem.giokt", function() {
    var hour = $scope.thoikhoabieuThem.giokt.getHours();
    var minute = $scope.thoikhoabieuThem.giokt.getMinutes();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    var second = "00"

    var date = hour + ":" + minute + ":" + second;
    $scope.thoikhoabieuThem.giokt = date;
  });

  function fetchAllGiangVien() {
    $scope.giangvien = $resource('http://localhost:8080/canbogiangvien').query(function(data) {
      return data;
    });
  };
  fetchAllGiangVien();

  function fetchAllPhongHoc() {
    $scope.phonghoc = $resource('http://localhost:8080/phonghoc').query(function(data) {
      return data;
    });
  };
  fetchAllPhongHoc();

  function fetchAllMonHoc() {
    $scope.monhoc = $resource('http://localhost:8080/monhoc').query(function(data) {
      return data;
    });
  };
  fetchAllMonHoc();

  function fetchAllKhoaHoc() {
    $scope.khoahoc = $resource('http://localhost:8080/khoahoc').query(function(data) {
      return data;
    });
  };
  fetchAllKhoaHoc();

  $scope.createThoiKhoaBieu = function() {
    ThoiKhoaBieu = $resource(
      "http://localhost:8080/thoikhoabieu", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );
    console.log($scope.thoikhoabieuThem);
    $scope.Message = ThoiKhoaBieu.save($scope.thoikhoabieuThem);

    location.reload();
  };

  $scope.deleteThoiKhoaBieu = function() {
    User = $resource(
      "http://localhost:8080/thoikhoabieu/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaThoiKhoaBieuDelete
    });
    location.reload();
  };

  $scope.updateThoiKhoaBieu = function() {
    // ThoiKhoaBieu = $resource(
    //   "http://localhost:8080/thoikhoabieu/:id", {}, {
    //     save: {
    //       method: 'PUT',
    //       params: {
    //         id: '@id'
    //       }
    //     }
    //   }
    // );
    //
    // $scope.Message = ThoiKhoaBieu.save({
    //   id: $scope.thoikhoabieuSua.id
    // }, $scope.thoikhoabieuSua);

    console.log($scope.thoikhoabieuSua);

    var hour = $scope.thoikhoabieuSua.giobd.getHours();
    var minute = $scope.thoikhoabieuSua.giobd.getMinutes();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    var date = hour + ":" + minute + ":00";
    $scope.thoikhoabieuSua.giobd = date;

    var hour = $scope.thoikhoabieuSua.giokt.getHours();
    var minute = $scope.thoikhoabieuSua.giokt.getMinutes();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    var date = hour + ":" + minute + ":00";
    $scope.thoikhoabieuSua.giokt = date;

    $http({
      method: "PUT",
      url: "http://localhost:8080/thoikhoabieu/" + $scope.thoikhoabieuSua.id,
      data: angular.toJson($scope.thoikhoabieuSua),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function() {
      console.log('success');
    }, function() {
      console.log('fail');
    });

    location.reload();
  };

  $scope.setMaThoiKhoaBieuDelete = function(ThoiKhoaBieu) {
    $scope.MaThoiKhoaBieuDelete = ThoiKhoaBieu;
  };

  $scope.suaThoiKhoaBieu = function(row) {
    $scope.thoikhoabieuSua = angular.copy(row);
    var giobd = $scope.thoikhoabieuSua.giobd;
    var parts = [];
    var parts = giobd.split(':');
    parts[2] = "00"
    $scope.thoikhoabieuSua.giobd = new Date();
    $scope.thoikhoabieuSua.giobd.setHours(parts[0]);
    $scope.thoikhoabieuSua.giobd.setMinutes(parts[1]);
    $scope.thoikhoabieuSua.giobd.setSeconds(parts[2]);

    var giokt = $scope.thoikhoabieuSua.giokt;
    var parts = [];
    var parts = giokt.split(':');
    parts[2] = "00"
    $scope.thoikhoabieuSua.giokt = new Date();
    $scope.thoikhoabieuSua.giokt.setHours(parts[0]);
    $scope.thoikhoabieuSua.giokt.setMinutes(parts[1]);
    $scope.thoikhoabieuSua.giokt.setSeconds(parts[2]);

    // $scope.thoikhoabieuSua.giobd = $filter('date')($scope.thoikhoabieuSua.giobd, 'HH:mm');
    // $scope.thoikhoabieuSua.giokt = $filter('date')($scope.thoikhoabieuSua.giokt, 'HH:mm');
    console.log($scope.thoikhoabieuSua);

  }

  //Phân trang

  $scope.pageNo = 0;
  $scope.pageSize = 5;
  $scope.totalpage = 0;
  $scope.arrSLThoiKhoaBieu = [];

  function getCountThoiKhoaBieu() {
    $http.get("http://localhost:8080/thoikhoabieu").then(
      function(response) {
        $scope.totalpage = response.data.length / $scope.pageSize;

        for (var i = 0; i < $scope.totalpage; i++) {
          $scope.arrSLThoiKhoaBieu[i] = i;
        }
      },
      function(err) {
        console.log(err);
      });
  }
  getCountThoiKhoaBieu();

  function getThoiKhoaBieuPage() {
    $http.get("http://localhost:8080/thoikhoabieu2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.thoikhoabieu = response.data;
        //Đánh số thứ tự
        $scope.thoikhoabieu.stt = [];
        var stt = $scope.pageNo * $scope.pageSize;
        for (var i = 0; i < $scope.pageSize; i++) {
          stt++;
          $scope.thoikhoabieu.stt[i] = stt;
        }
      },
      function(err) {
        var error = err;
      });

  }
  getThoiKhoaBieuPage();

  $scope.numb = function(So) {
    $scope.pageNo = So;
    getThoiKhoaBieuPage();
  };

  $scope.nextCount = function() {
    getCountThoiKhoaBieu();
    //alert($scope.pageNo);
    if ($scope.pageNo < $scope.totalpage) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.totalpage) {
        $scope.pageNo--;
      }
      getThoiKhoaBieuPage();
    } else {
      $scope.pageNo = $scope.totalpage;
      getThoiKhoaBieuPage();
    }
  };

  $scope.preCount = function() {
    getCountThoiKhoaBieu();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getThoiKhoaBieuPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getThoiKhoaBieuPage();
    }
  };

}]);

//Format time
// adminApp.filter('formatTime', function($filter) {
//   return function(time, format) {
//     var parts = time.split(':');
//     var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
//     return $filter('date')(date, format || 'HH:mm');
//   };
// });
