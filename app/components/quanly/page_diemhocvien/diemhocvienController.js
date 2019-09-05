adminApp.controller('diemhocvienController', ['$scope', '$rootScope', '$http', '$resource', '$filter', function($scope, $rootScope, $http, $resource, $filter) {
  $rootScope.title = 'Điểm môn học';

  $scope.mamh = "";
  $scope.makh = "";
  $scope.showdiem = false;

  $scope.diemmonhocSua = {
    id: "",
    diemgk: "",
    diemhp: "",
    ngaynhap: "",
    ketqua: "",
    mahv: "",
    mamh: "",
    magv: "",
    makh: "",
    tengv: "",
    tenhv: "",
    tenmh: "",
    tenkh: ""
  }

  function _thaydoiKhoaHoc() {
    if ($scope.makh != "" && $scope.mamh != "") {
      $scope.showdiem = true;

      $scope.diemmonhocFilter = [];
      for (var i = 0; i < $scope.diemmonhoc.length; i++) {
        if ($scope.diemmonhoc[i].makh == $scope.makh &&
          $scope.diemmonhoc[i].mamh == $scope.mamh) {
          $scope.diemmonhoc[i].diemgk == null ? ($scope.diemmonhoc[i].diemgk = "#") : $scope.diemmonhoc[i].diemgk;
          $scope.diemmonhoc[i].diemhp == null ? ($scope.diemmonhoc[i].diemhp = "#") : $scope.diemmonhoc[i].diemhp;
          $scope.diemmonhoc[i].ketqua == null ? ($scope.diemmonhoc[i].ketqua = "#") : $scope.diemmonhoc[i].ketqua;

          $scope.diemmonhocFilter.push($scope.diemmonhoc[i]);
          console.log($scope.diemmonhocFilter);
        }
      }

    }
  }

  function _thaydoiKetqua() {
    var diemgk = Number($scope.diemmonhocSua.diemgk);
    var diemhp = Number($scope.diemmonhocSua.diemhp);

    if(Number.isNaN(diemgk) || Number.isNaN(diemhp)) {
        $scope.diemmonhocSua.ketqua = "RỚT";
    }
    else {
      var diemtrungbinh = (diemgk + diemhp) / 2;
      console.log(diemtrungbinh);
    }

    if(diemtrungbinh >= 5) {
      $scope.diemmonhocSua.ketqua = "ĐẬU";
    }
    else if (diemtrungbinh < 5) {
      $scope.diemmonhocSua.ketqua = "RỚT";
    }
  }

  $scope.$watch("mamh", function() {
    _thaydoiKhoaHoc();
  });

  $scope.$watch("makh", function() {
    _thaydoiKhoaHoc();
  });

  $scope.$watch("diemmonhocSua.diemgk", function() {
    _thaydoiKetqua();
  });

  $scope.$watch("diemmonhocSua.diemhp", function() {
    _thaydoiKetqua();
  });

  function fetchDiemMonHoc() {
    $scope.diemmonhoc = $resource('http://localhost:8080/diemmonhoc').query(function(data) {
      return data;
    });
  };
  fetchDiemMonHoc();

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

  $scope.updateDiemMonHoc = function() {
    $http({
      method: "PUT",
      url: "http://localhost:8080/diemmonhoc/" + $scope.diemmonhocSua.id,
      data: angular.toJson($scope.diemmonhocSua),
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

  $scope.suapopupDiemMonHoc = function(row) {
    $scope.diemmonhocSua = angular.copy(row);
  }

}]);
