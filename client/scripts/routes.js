/*-----------------------------------------------*/
/*                  ROUTER                       */
/*-----------------------------------------------*/

angular.module('ProLifeMonitor').config(config);

function config($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'client/views/home.html'
    })
    .state('state1', {
      url: '/state1',
      templateUrl: 'client/views/state1.html'
    })
    .state('toDo', {
      url: '/todo',
      templateUrl: 'client/views/todo-app.html',
      controller: 'TodosListCtrl as todos',
    })
    .state('login', {
      url: '/login',
      template: '<login></login>'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'client/views/admin.html',
      controller: 'AdminController as admin',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireValidUser(function(user) {
            if (user.username==='test123') {
              return true;
            }
            return 'UNAUTHORIZED';
          });
        }]
      }
    });

  $urlRouterProvider.otherwise("/");
};


angular.module('ProLifeMonitor').run(run);

function run($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $meteor.requireUser() promise is rejected
    // or the custom error, and redirect the user back to the login page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('login');
        break;
      case "FORBIDDEN":
        $state.go('forbidden');
        break;
      case "UNAUTHORIZED":
        $state.go('home');
        break;
      default:
        $state.go('internal-client-error');
    }
  });
};
