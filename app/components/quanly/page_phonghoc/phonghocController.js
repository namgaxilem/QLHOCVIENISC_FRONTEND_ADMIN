adminApp.controller('phonghocController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = 'Phòng học';

  function fetchAllClassroom() {
    $scope.phonghoc = $resource('http://localhost:8080/phonghoc').query(function(data) {
      return data;
    });
  };
  fetchAllClassroom();

  $scope.createPhonngHoc = function() {
    User = $resource(
      "http://localhost:8080/createphonghoc", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.maphg = $scope.maphg;
    user.tenphg = $scope.tenphg;
    $scope.Message = User.save(user);
    location.reload();
  };

  $scope.setMaPHDelete = function(maphg) {
    $scope.MaPHDelete = maphg;
  };

  $scope.deletePhongHoc = function() {
    User = $resource(
      "http://localhost:8080/deletephonghoc/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaPHDelete
    });
    location.reload();
  };

  $scope.refAdd = function() {
    $scope.mamh = "";
    $scope.tenmh = "";
    $scope.sogio = "";
  };

  $scope.getMaPH = function(phonghoc) {
    $scope.tenphg = phonghoc.tenphg;
    $scope.uMaPH = phonghoc.maphg;
    return $scope.uMaPH;
  }
  $scope.updatePhongHoc = function() {
    User = $resource(
      "http://localhost:8080/updatephonghoc/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.tenphg = $scope.tenphg;
    user.maphg = $scope.uMaPH;

    $scope.Message = User.save({
      id: $scope.uMaPH
    }, user);
    location.reload();
  };

  //sắp xếp dữ liệu sử dụng header click
  $scope.sortColumn = 'maphg';
  $scope.reverse = false;

  $scope.sortData = function(column) {
    if ($scope.sortColumn == column)
      $scope.reverse = !$scope.reverse;
    else
      $scope.reverse = false;
    $scope.sortColumn = column;
  }
  $scope.pageNo = 0;
  $scope.pageSize = 5;
  $scope.total = 0;

  $scope.selectPhanTrang = function(SelectPhanTrang) {
    $scope.pageSize = SelectPhanTrang;
  }

  function getCountPhongHoc() {
    $http.get("http://localhost:8080/phonghoc").then(
      function(response) {

        $scope.total = response.data.length / $scope.pageSize;
        console.log("Total: " + $scope.total);
        getSLPhongHoc();
      },
      function(err) {
        var error = err;
      });
  }
  getCountPhongHoc();

  function getPhongHocPage() {
    $http.get("http://localhost:8080/phonghoc2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
      function(response) {
        $scope.phonghocpage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getPhongHocPage();

  $scope.numb = function(So) {
    $scope.pageNo = So;
    getPhongHocPage();
  };

  $scope.arrSLPhongHoc = [];

  function getSLPhongHoc() {
    console.log($scope.total);
    for (var i = 0; i < $scope.total; i++) {
      $scope.arrSLPhongHoc[i] = i;

    }
  }
  getSLPhongHoc();

  $scope.nextCount = function() {
    getCountPhongHoc();
    //alert($scope.pageNo);
    if ($scope.pageNo < $scope.total) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.total) {
        $scope.pageNo--;
      }
      getPhongHocPage();
    } else {
      $scope.pageNo = $scope.total;
      getPhongHocPage();
    }
  };

  $scope.preCount = function() {
    getCountPhongHoc();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getPhongHocPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getPhongHocPage();
    }
  };

  $scope.changePage = function() {
    getCountPhongHoc();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      getPhongHocPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      getPhongHocPage();
    }
  };

}]);
