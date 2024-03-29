adminApp.controller('giangvienController', ['$scope', '$http', '$resource', 'apiBaseUrl', '$rootScope', 'docService', '$window', function($scope, $http, $resource, apiBaseUrl, $rootScope, docService, $window) {
  $rootScope.title = 'Giảng viên';

  if ($rootScope.logged == false || $rootScope.logged == undefined) {
    $window.location.href = '#!/dangnhap';
  }

  $scope.model = {
    ho: "",
    tenlot: "",
    ten: "",
    gioitinh: "",
    ngaysinh: "",
    sdt: "",
    email: "",
    diachi: "",
    password: "",
    accounttype: "",
    macbgv: ""
  };

  $scope.loadData = function() {
    $http.get(apiBaseUrl + '/canbogiangvien').then(function(res) {
      $scope.canbogiangvienList = res.data;
    });
  }

  $scope.loadDataSearch = function(macbgv) {
    var url = apiBaseUrl + '/canbogiangvien/' + macbgv;
    $http.get(url, macbgv).then(function(res) {
      console.log('success ', res);

    }, function(err) {

    });
  }

  $scope.searchCBGV = function(macbgv) {
    var url = apiBaseUrl + '/canbogiangvien/' + $scope.searchModel.macbgv;
    $http.get(url, $scope.editModel).then(function(res) {

      console.log('success ', res);
      $scope.resultCBGV = res.data;

      console.log($scope.resultCBGV);

    }, function(err) {
      alert("Không tìm thấy học viên!");
    });
  }

  $scope.createCBGV = function() {
    if (($scope.model.ho == "") ||
      ($scope.model.ten == "") ||
      ($scope.model.sdt == "") ||
      ($scope.model.email == "") ||
      ($scope.model.macbgv == "") ||
      ($scope.model.password == "") ||
      ($scope.model.diachi == "")) {
      alert("Vui lòng nhập đủ các trường bắt buộc!");
    } else {
      $scope.model.accounttype = 1;
      $http.post(apiBaseUrl + '/add_canbogiangvien', $scope.model).then(function(res) {
        tatModal();
        getGiangVienPage();
        alert('Thêm giảng viên thành công');
      }, function(err) {
        alert("Kiểm tra lại các trường");
      });
    }
  }

  $scope.loadDataForEdit = function(macbgv) {
    $http.get(apiBaseUrl + '/canbogiangvien/' + macbgv).then(function(res) {
      $scope.editModel = res.data;
      $scope.editModel.ngaysinh = new Date(res.data.ngaysinh);
      $scope.editModel.ngayvaolam = new Date(res.data.ngayvaolam);
    });
  }

  $scope.editCBGV = function(maCBGV) {
    if ($scope.editModel.ho == null ||
      $scope.editModel.ten == null ||
      $scope.editModel.sdt == null ||
      $scope.editModel.email == null ||
      $scope.editModel.macbgv == null ||
      $scope.editModel.password == null) {
      alert("Vui lòng nhập đủ các trường bắt buộc!");
    } else {
      var url = apiBaseUrl + '/update_canbogiangvien/' + $scope.editModel.macbgv;
      $http.put(url, $scope.editModel).then(function(res) {
        tatModal();
        getGiangVienPage();
        alert('Sửa giảng viên thành công');
      }, function(err) {

      });
    }
  }

  $scope.setCBGVDelete = function(maCBGV) {
    $scope.maCBGVDelete = maCBGV;
  }

  $scope.deleteCBGV = function(maCBGV) {
    $http.delete(apiBaseUrl + '/delete_canbogiangvien/' + maCBGV).then(function(res) {
      tatModal();
      getGiangVienPage();
      alert('Xóa giảng viên thành công');
    }, function(err) {

    });
  }

  function tatModal() {
    $('#XoaCBGV').modal('hide');
    $('#ThemCBGV').modal('hide');
    $('#CapNhatCBGV').modal('hide');
  }

  $scope.loadData();

  $scope.pageNo = 0;
  $scope.pageSize = 10;
  $scope.total = 0;

  function getCountGiangVien() {
    $http.get("http://localhost:8080/canbogiangvien").then(
      function(response) {
        $scope.soluonggiangvien = response.data.length;
        $scope.total = response.data.length / $scope.pageSize;
        getSLGiangVien();
      },
      function(err) {
        var error = err;
      });
  }
  getCountGiangVien();

  $scope.changePageSize = function(PageSize) {
    $scope.pageNo = 0;
    $scope.temp2 = 1;
    $scope.arrSLGiangVien = [];
    $scope.pageSize = PageSize;
    getCountGiangVien();
    getGiangVienPage();
  };
  $scope.pageSize = '10';
  $scope.sortBy = "MACBGV";
  $scope.typeSort = 1;
  $scope.changeCourse = function() {
    $scope.typeSort = 1;
    $scope.arrSLGiangVien = [];
    $scope.pageNo = 0;
    $scope.temp = $scope.pageNo + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    getGiangVienPage();
  };

  $scope.changeSortPage = function(SortPage) {
    if ($scope.typeSort == 1) {
      $scope.typeSort = 2;
    } else if ($scope.typeSort == 2) {
      $scope.typeSort = 1;
    }
    $scope.sortBy = SortPage;
    getGiangVienPage();
  };

  function getGiangVienPage() {
    $http.get("http://localhost:8080/canbogiangvien2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize + "&typeSort=" + $scope.typeSort + "&sortBy=" + $scope.sortBy).then(
      function(response) {
        $scope.soluonghienthi = response.data.length;
        $scope.giangvienpage = response.data;
      },
      function(err) {
        var error = err;
      });
  }
  getGiangVienPage();

  function getSTT() {
    $scope.temp2 = 1;
  }
  getSTT();

  $scope.numb = function(So) {
    $scope.temp = So + 1;
    $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
    $scope.pageNo = So;
    getGiangVienPage();
  };

  $scope.arrSLGiangVien = [];

  function getSLGiangVien() {
    for (var i = 0; i < $scope.total; i++) {
      $scope.arrSLGiangVien[i] = i;

    }
  }
  getSLGiangVien();

  $scope.nextCount = function() {
    getCountGiangVien();
    if ($scope.pageNo < $scope.total) {
      $scope.pageNo++;
      if ($scope.pageNo >= $scope.total) {
        $scope.pageNo--;
      } else {
        $scope.temp = $scope.pageNo + 1;
        $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
        getGiangVienPage();
      }
    } else {
      $scope.pageNo = $scope.total;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getGiangVienPage();
    }
  };

  $scope.preCount = function() {
    getCountGiangVien();
    if ($scope.pageNo > 0) {
      $scope.pageNo--;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getGiangVienPage();
      if ($scope.pageNo < 0) {
        $scope.pageNo = 0;
      }
    } else {
      $scope.pageNo = 0;
      $scope.temp = $scope.pageNo + 1;
      $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
      getGiangVienPage();
    }
  };

  // remove and change class
  $scope.sortClass = function(Sort) {
    if ($scope.sortBy == Sort) {
      if ($scope.typeSort == 2) {
        return 'arrow-down';
      } else {
        return 'arrow-up';
      }
    }

  }
}]);

adminApp.constant('urls', {
  DOC_URL: 'http://localhost:8080/doc/'
});
adminApp.directive('cOnChange', function() {
  'use strict';

  return {
    restrict: "A",
    scope: {
      cOnChange: '&'
    },
    link: function(scope, element) {
      element.on('change', function() {
        scope.cOnChange();
      });
    }
  };
});

adminApp.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);
