/*-----------------------------------------------*/
/*                  ROUTER                       */
/*-----------------------------------------------*/

angular.module('ProLifeMonitor').config(config);

function config($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('root',{
      url: '',
      abstract: true,
      views: {
        'header': {
          templateUrl: 'client/views/main-nav.ng.html',
          controller: 'MainNavCtrl'
        },
        'footer':{
          templateUrl: 'client/views/footer.ng.html'
        }
      }
    })
    .state('root.home', {
      url: '/',
      views: {
        "container@" : { templateUrl: 'client/views/home.ng.html' }
      }
    })
    .state('root.toDo', {
      url: '/todo',
      views: {
        "container@" : {
          templateUrl: 'client/views/todo-app.html',
          controller: 'TodosListCtrl as todos'
        }
      }
    })
    .state('root.login', {
      url: '/login',
      views: {
        "container@" : { 
          templateUrl: 'client/views/auth/login.ng.html',
          controller: 'LoginCtrl as login',
        }
      }
    })
    .state('root.register', {
      url: '/register',
      views: {
        "container@" : { 
          templateUrl: 'client/views/auth/register.ng.html',
          controller: 'RegisterCtrl as register',
        }
      }
    })
    .state('root.editProfile', {
      url: '/editProfile',
      views: {
        "container@" : { 
          templateUrl: 'client/views/profile/edit.ng.html',
          controller: 'ProfileCtrl as profile',
        }
      }
    })
    .state('root.admin', {
      url: '/admin',
      views: {
        "container@" : { 
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
        }
      }
    });

  $urlRouterProvider.otherwise(function ($state, $location) {
    $state = "root.home";
    $location.url("/");
  });
};

/*
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
*/