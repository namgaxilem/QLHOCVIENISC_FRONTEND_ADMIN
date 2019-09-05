adminApp.controller('gopyController', ['$scope', '$rootScope', '$http', '$resource', 'apiBaseUrl', function($scope, $rootScope, $http, $resource, apiBaseUrl) {
  $rootScope.title = 'Góp ý';

  $scope.loadData = function() {
    $http.get(apiBaseUrl + '/gopy').then(function(res){
      $scope.gopyList = res.data;
    });
  }


  $scope.model = {};
  $scope.createGopY = function() {
  $http.post(apiBaseUrl + '/add_gopy', $scope.model).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.model = null;
    $scope.loadData();
  }, function(err) {

  });
}

$scope.setGopYDelete = function(maGopY){
  $scope.maGopYDelete = maGopY;
}

$scope.deleteGopY =  function(maGopY){
  $http.delete(apiBaseUrl + '/delete_gopy/' + maGopY).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.loadData();
  }, function(err) {

  });
}

$scope.showModel = {};
$scope.loadDataForShow = function(maGopY) {
  $http.get(apiBaseUrl + '/gopy/' + maGopY).then(function(res){
    $scope.showModel = res.data;
  });
}

/*$scope.editTN = function(maTinhNang){
  var url = apiBaseUrl + '/update_tinhnang/' + $scope.editModel.id;
  $http.put(url, $scope.editModel).then(function(res){
    console.log('success ', res);
    //location.reload();
    $scope.loadData();
  }, function(err) {

  });
}*/

  $scope.loadData();

  }]);
