var adminApp = angular.module("adminApp", ["ngRoute", "ngResource"]);

adminApp.run(function($rootScope) {
  $rootScope.domainService = "http://localhost:8080/";
});
