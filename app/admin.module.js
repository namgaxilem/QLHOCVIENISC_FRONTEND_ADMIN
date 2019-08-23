var adminApp = angular.module("adminApp", ["ngRoute"]);

adminApp.run(function($rootScope) {
  $rootScope.domainService = "http://localhost:8080/";
});
