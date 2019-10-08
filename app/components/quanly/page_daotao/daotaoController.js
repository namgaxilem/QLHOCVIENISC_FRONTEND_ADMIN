adminApp.controller('daotaoController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = "Đào tạo";

  function tatModal() {
    $('#Xoa').modal('hide');
    $('#Them').modal('hide');
  }

  $scope.pageNo = 0;
  $scope.pageSize = 50;
  $scope.total = 0;
  $scope.arrSLTrang = [];

  function getChuyenNganhPage2() {
    $http.get("http://localhost:8080/chuyennganh2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize + "&idChuyennganh=" + $scope.idChuyennganh).then(
      function(response) {
        $scope.soluonghienthi = response.data.length;
        $scope.daotaopage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getChuyenNganhPage2();

  function getChuyenNganhPage3() {
    $http.get("http://localhost:8080/chuyennganh3?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.soluonghienthi = response.data.length;
        $scope.daotaopage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getChuyenNganhPage3();

  function getSLTrang() {
    for (var i = 0; i < $scope.total; i++) {
      $scope.arrSLTrang[i] = i;
    }
  }
  getSLTrang();

  function getCountChuyenNganh() {
    $http.get("http://localhost:8080/chuyennganh").then(
      function(response) {
        $scope.soluonghocvien = response.data.length;
        $scope.total = response.data.length / $scope.pageSize;
        getSLTrang();
      },
      function(err) {
        var error = err;
      });
  }
  getCountChuyenNganh();

  function getSTT() {
    $scope.temp2 = 1;
  }
  getSTT();

  function fetchAllMajor() {
    $scope.chuyennganh = $resource('http://localhost:8080/chuyennganh').query(function(data) {
      return data;
    });
  };
  fetchAllMajor();

  function fetchAllSubjects() {
    $scope.monhoc = $resource('http://localhost:8080/monhoc').query(function(data) {
      return data;
    });
  };
  fetchAllSubjects();

  function fetchAllEducate() {
    $scope.daotao = $resource('http://localhost:8080/daotao').query(function(data) {
      return data;
    });
  };
  fetchAllEducate();

  $scope.seletedChuyenNganh = "";
  $scope.statusChuyenNganh = "";
  $scope.selectChuyenNganh = function(SelectChuyenNganh) {
    $scope.seletedChuyenNganh = SelectChuyenNganh;
    for (var i = 0; i < $scope.chuyennganh.length; i++) {
      if ($scope.seletedChuyenNganh == $scope.chuyennganh[i].id) {
        $scope.resultChuyenNganh = $scope.chuyennganh[i];
        return $scope.resultChuyenNganh;
        $scope.statusChuyenNganh = 1;
      } else {

      }
    }
    if ($scope.statusChuyenNganh == 1) {
      alert("Tim thay");
    } else {
      alert("Khong tim thay");
    }
  }

  $scope.seletedMonHoc = "";
  $scope.statusMonHoc = "";
  $scope.selectMonHoc = function(SelectMonHoc) {
    $scope.seletedMonHoc = SelectMonHoc;
    for (var i = 0; i < $scope.monhoc.length; i++) {
      if ($scope.seletedMonHoc == $scope.monhoc[i].mamh) {
        $scope.resultMonHoc = $scope.monhoc[i];
        return $scope.resultMonHoc;
        $scope.statusMonHoc = 1;
      } else {

      }
    }
    if ($scope.statusMonHoc == 1) {
      alert("Tim thay");
    } else {
      alert("Khong tim thay");
    }

  }

  $scope.createDaoTao = function() {
    User = $resource(
      "http://localhost:8080/daotao", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.chuyennganh_ID = $scope.SelectChuyenNganh;
    user.mamh_ID = $scope.resultMonHoc.mamh;
    $scope.Message = User.save(user).$promise.then(() => {
      tatModal();
      fetchAllSubjects();
      getChuyenNganhPage3();
      alert('Thêm thành công');
    });
  };

  $scope.setMaDelete = function(IdChuyennganh, IdMonhoc) {
    $scope.TenChuyennganhDelete = IdChuyennganh.tencn;
    $scope.TenMonhocDelete = IdMonhoc.tenmh;
    $scope.MaChuyennganhDelete = IdChuyennganh;
    $scope.MaMonhocDelete = IdMonhoc;
  };
  $scope.deleteDaotao = function() {
    User = $resource(
      "http://localhost:8080/daotao/:id/:id2", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id',
            id2: '@id2'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaMonhocDelete.mamh,
      id2: $scope.MaChuyennganhDelete.id
    }).$promise.then(() => {
      tatModal();
      fetchAllSubjects();
      getChuyenNganhPage3();
      alert('Xóa môn học thành công');
    });
    //location.reload();
  };

  $scope.refAdd = function(ChuyenNganh) {
    $scope.TenCN = ChuyenNganh.tencn;
    $scope.SelectChuyenNganh = ChuyenNganh.id;
    return $scope.SelectChuyenNganh;
  };

  $scope.getMaTruong = function(student) {
    $scope.tentruong = student.tentruong;
    $scope.diachi = student.diachi;

    $scope.uMaTruong = student.matruong;
    return $scope.uMaTruong;
  }

  $scope.changePageSize = function(PageSize) {
    $scope.pageNo = 0;
    $scope.temp2 = 1;
    $scope.arrSLTrang = [];
    $scope.pageSize = PageSize;
    getCountChuyenNganh();
    getChuyenNganhPage3();
  };
  $scope.SelectChuyenNganh = 1;
  $scope.typeSort = 1;
  $scope.pageSize = '5';
  $scope.sortBy = "TENCN";
  $scope.idChuyennganh = 1;

  $scope.changeCourse = function() {
    $scope.arrSLTrang = [];
    $scope.pageNo = 0;
    $scope.temp = $scope.pageNo + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    $scope.idChuyennganh = $scope.SelectChuyenNganh;
    getChuyenNganhPage2();
  };

  $scope.getALL = function() {
    getChuyenNganhPage3();
  }

  $scope.numb = function(So) {
    $scope.temp = So + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    $scope.pageNo = So;
    getChuyenNganhPage3();
  };

  $scope.nextCount = function() {
    getCountChuyenNganh();
    if ($scope.pageNo < $scope.total) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.total) {
        $scope.pageNo--;
      } else {
        $scope.temp = $scope.pageNo + 1;
        $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
        getChuyenNganhPage3();
      }
    } else {
      $scope.pageNo = $scope.total;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getChuyenNganhPage3();
    }
  };

  $scope.preCount = function() {
    getCountChuyenNganh();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getChuyenNganhPage3();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getChuyenNganhPage3();
    }
  };

}]);
