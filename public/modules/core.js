angular.module('app', ['ngRoute'])
  
  .config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider
      .when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'SignupController',
        controllerAs: 'signup',
        caseInsensitiveMatch: true
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginForm',
        controllerAs: 'LoginForm',
        caseInsensitiveMatch: true
      })
      .when('/profile', {
        templateUrl: '/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
      })
      .when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'SignupController',
        controllerAs: 'SignupController',
        caseInsensitiveMatch: true
      })
      .otherwise({
        templateUrl: '/views/landing.html',
        controller: 'IndexController',
        controllerAs: 'index'
      });
    $locationProvider.html5Mode(true);
  }])

  .controller('LoginForm', ['$http', '$scope', function($http, $scope){
    $scope.login = function(){
      $http
        .post('/login', {
          email: this.email,
          password: this.password
        })
        .success(function(data){
          console.log(data);
      });
    }
  }])

  .controller('SignupController', ['$http', '$scope', function($http, $scope){
    $scope.signup = function(){
      $http
        .post('/signup', {
          email: this.email,
          password: this.password
        })
        .success(function(data){
          console.log(data);
        });
    }
  }])

  .controller('ProfileController', ['$http', '$scope', function($http, $scope){
    $http.get('/api/userData')
      .success(function(data){
        console.log(data);
        $scope.user = data;
      });
  }])

  .controller('IndexController', function($scope){

  })

  .directive('redir', ['$http', function($http){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        element.on('click', function(e){
          e.preventDefault();
          window.location = attrs.href;
        });
      }
    }
  }])

  .factory('httpResponseInterceptor', ['$q', '$location', function($q, $location){
    return {
      response: function(response){
        if (typeof response.data === 'object'){
          console.log(response);
          if (response.data.redirect){
            $location.path(response.data.redirect);
            return {} || $q.when(response);
          }
        }
        return response || $q.when(response);
      }
    };
  }])
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('httpResponseInterceptor');
  }]);
