adminApp.controller("hocvienController", function($scope, $rootScope, $http) {

  $scope.hocviens = [];
  $scope.hocvienThem = {
    mahv: "",
    ho: "",
    tenlot: "",
    ten: "",
    gioitinh: "",
    ngaysinh: "",
    noisinh: "",
    cmnd: "",
    sdt: "",
    email: "",
    diachi: "",
    password: "",
    tgcothedilam: "",
    truonghoc: {
      matruong: ""
    },
    loaitaikhoan: {
      id: ""
    },
    khoahoc: {
      makhoahoc: ""
    },
    danhmuchocvien: {
      id: ""
    },
    nguoihuongdan: {
      manguoihdan: ""
    }
  };

  _refreshHocvien();

  function _refreshHocvien() {
    $http({
      method: 'GET',
      url:  $rootScope.domainService + 'hocvien'
    }).then(
      function(res) {
        $scope.hocviens = res.data;
      },
      function(res) {
        console.log("Error: " + res.status + " : " + res.data);
      }
    );
  }

  $scope.themhocvien = function() {
    $http({
      method: 'POST',
      url: $rootScope.domainService + 'themhocvien',
      data: angular.toJson($scope.truongThem),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);

    $scope.truongThem = {
      mahv: "",
      ho: "",
      tenlot: "",
      ten: "",
      gioitinh: "",
      ngaysinh: "",
      noisinh: "",
      cmnd: "",
      sdt: "",
      email: "",
      diachi: "",
      password: "",
      tgcothedilam: "",
      truonghoc: {
        matruong: ""
      },
      loaitaikhoan: {
        id: ""
      },
      khoahoc: {
        makhoahoc: ""
      },
      danhmuchocvien: {
        id: ""
      },
      nguoihuongdan: {
        manguoihdan: ""
      }
    };

  };

  $scope.xoahocvien = function(hocvien) {
    $http({
      method: 'DELETE',
      url: $rootScope.domainService + 'xoahocvien/' + hocvien.mahv
    }).then(_success, _error);
  };

  $scope.themhocvienpopup = function() {
    $http({
      method: 'GET',
      url: $rootScope.domainService + 'danhmuchocvien'
    }).then(
      function(res) {
        $scope.danhmuchocvien = res.data;
      },
      function(res) {
        alert("Error: " + res.status + " : " + res.data);
      }
    );

    $http({
      method: 'GET',
      url: $rootScope.domainService + 'khoahoc'
    }).then(
      function(res) {
        $scope.khoahoc = res.data;
      },
      function(res) {
        alert("Error: " + res.status + " : " + res.data);
      }
    );

    $http({
      method: 'GET',
      url: $rootScope.domainService + 'truonglienket'
    }).then(
      function(res) {
        $scope.truonghoc = res.data;
      },
      function(res) {
        alert("Error: " + res.status + " : " + res.data);
      }
    );

    $http({
      method: 'GET',
      url: $rootScope.domainService + 'nguoihuongdan'
    }).then(
      function(res) {
        $scope.nguoihuongdan = res.data;
      },
      function(res) {
        alert("Error: " + res.status + " : " + res.data);
      }
    );

  };

  _success = function() {
    _refreshHocvien();
  };

  _error = function(res) {
    alert('Lỗi gì đó ' + res.status);
  };

});
