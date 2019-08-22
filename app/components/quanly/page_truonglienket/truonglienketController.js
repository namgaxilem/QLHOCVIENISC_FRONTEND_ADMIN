adminApp.controller("truonglienketController", function($scope, $rootScope, $http){

  $scope.truongs = [];

  _refreshTruonglienket();

  function _refreshTruonglienket() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/truonglienket'
    }).then(
      function(res) {
        $scope.truongs = res.data;
      },
      function(res) {
        console.log("Error: " + res.status + " : " + res.data);
      }
    );
  }

});
