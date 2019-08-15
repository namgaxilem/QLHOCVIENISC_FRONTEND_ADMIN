var adminApp = angular.module("adminApp", ["ngRoute"]);
rootApp.run(function($rootScope) {
  $rootScope.domainService = "localhost:8080/";
});
