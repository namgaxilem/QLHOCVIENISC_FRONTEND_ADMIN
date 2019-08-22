var adminApp = angular.module("adminApp", ["ngRoute"]);

rootApp.run(function($rootScope) {
  $rootScope.domainService = "http://localhost:8080/";
});
