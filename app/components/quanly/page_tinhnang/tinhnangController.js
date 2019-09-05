adminApp.controller('tinhnangController', ['$scope', '$rootScope', '$http', '$resource', 'apiBaseUrl', function($scope, $rootScope, $http, $resource, apiBaseUrl) {
  $rootScope.title = 'Tính năng';
  
  $scope.loadData = function() {
    $http.get(apiBaseUrl + '/tinhnang').then(function(res){
      $scope.tinhnangList = res.data;
    });
  }

  $scope.seletedLoaitaikhoan="";
  $scope.statusAccounttype="";
  $scope.selectLoaiTaiKhoan = function(SelectLoaiTaiKhoan)
  {
     $scope.seletedLoaitaikhoan = SelectLoaiTaiKhoan;
     for (var i = 0; i < $scope.loaitaikhoanList.length; i++) {
       if($scope.seletedLoaitaikhoan==$scope.loaitaikhoanList[i].id)
      {
        $scope.resultLoaitk=$scope.loaitaikhoanList[i];
        return $scope.resultLoaitk;
        $scope.statusAccounttype=1;
      }
      else {

      }
     }
     if($scope.statusAccounttype==1)
     {
       alert("Tim thay");
     }
     else {
       alert("Khong tim thay");
     }

  }

  $scope.loaitaikhoanList = {};
  $scope.loadLoaiTaiKhoan = function() {
    $http.get(apiBaseUrl + '/loaitaikhoan/').then(function(res){
      $scope.loaitaikhoanList = res.data;
    });
  }

  $scope.model = {};
  $scope.createTN = function() {
  $http.post(apiBaseUrl + '/add_tinhnang', $scope.model).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.model = null;
    $scope.loadData();
  }, function(err) {

  });
}

$scope.setTinhNangDelete = function(maTinhNang){
  $scope.maTinhNangDelete = maTinhNang;
}

$scope.deleteTinhNang =  function(maTinhNang){
  $http.delete(apiBaseUrl + '/delete_tinhnang/' + maTinhNang).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.loadData();
  }, function(err) {

  });
}

$scope.editModel = {};
$scope.loadDataForEdit = function(maTinhNang) {
  $http.get(apiBaseUrl + '/tinhnang/' + maTinhNang).then(function(res){
    $scope.editModel = res.data;
  });
}

$scope.editTN = function(maTinhNang){
  var url = apiBaseUrl + '/update_tinhnang/' + $scope.editModel.id;
  $http.put(url, $scope.editModel).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.loadData();
  }, function(err) {

  });
}

  $scope.loadData();
  $scope.loadLoaiTaiKhoan();

  }]);
