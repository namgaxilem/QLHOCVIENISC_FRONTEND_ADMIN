adminApp.controller('giangvienController', ['$scope','$http', '$resource', 'apiBaseUrl', function($scope, $http, $resource, apiBaseUrl) {

  $scope.loadData = function() {
    $http.get(apiBaseUrl + '/canbogiangvien').then(function(res){
      $scope.canbogiangvienList = res.data;
    });
  }

  $scope.model = {};
  $scope.createCBGV = function() {

  $http.post(apiBaseUrl + '/add_canbogiangvien', $scope.model).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.model = null;
    $scope.loadData();
  }, function(err) {

  });
}

$scope.editModel = {};
$scope.loadDataForEdit = function(macbgv) {
  $http.get(apiBaseUrl + '/canbogiangvien/' + macbgv).then(function(res){
    $scope.editModel = res.data;
  });
}


$scope.editCBGV = function(maCBGV){
  var url = apiBaseUrl + '/update_canbogiangvien/' + $scope.editModel.macbgv;
  $http.put(url, $scope.editModel).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.loadData();
  }, function(err) {

  });
}

$scope.setCBGVDelete = function(maCBGV){
  $scope.maCBGVDelete = maCBGV;
}

$scope.deleteCBGV =  function(maCBGV){
  $http.delete(apiBaseUrl + '/delete_canbogiangvien/' + maCBGV).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.loadData();
  }, function(err) {

  });
}


  $scope.loadData();


  }]);
