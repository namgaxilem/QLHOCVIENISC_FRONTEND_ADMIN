var adminApp = angular.module("adminApp", ["ngRoute", "ngResource", "ui.router"]);
adminApp.constant('apiBaseUrl', 'http://localhost:8080');
adminApp.run(function($rootScope) {
  // $rootScope.domainService = "http://localhost:8080/";
});
adminApp.factory('docService', ['$http', '$q', 'urls', function($http, $q, urls) {

  var factory = {
    saveDoc: saveDoc,
    findDoc: findDoc
  };

  return factory;

  function saveDoc(file) {
    var deferred = $q.defer();
    var formData = new FormData();
    formData.append('file', file);

    $http.post(urls.DOC_URL + 'upload', formData, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      })
      .then(
        function(response) {
          deferred.resolve(response.data);
        },
        function(errResponse) {
          alert(errResponse.data.errorMessage);
          deferred.reject(errResponse);
        }
      );
    return deferred.promise;
  };

  function findDoc(docId) {
    var deferred = $q.defer();
    $http.get(urls.DOC_URL + '/' + docId)
      .then(
        function(response) {
          deferred.resolve(response.data);
        },
        function(errResponse) {
          alert(errResponse.data.errorMessage);
          deferred.reject(errResponse);
        }
      );
    return deferred.promise;
  }
}]);
