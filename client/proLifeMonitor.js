
/*-----------------------------------------------*/
/*                INITIATE APP                   */
/*-----------------------------------------------*/

angular.module('ProLifeMonitor',['angular-meteor', 'accounts.ui', 'angular-meteor.auth', 'ui.router']);

function onReady() {
  angular.bootstrap(document, ['ProLifeMonitor'], {
    strictDi: true
  });
}
 
if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);


  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });


/*-----------------------------------------------*/
/*                  ROUTER                       */
/*-----------------------------------------------*/

angular.module('ProLifeMonitor').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('state1', {
      url: '/state1',
      templateUrl: 'client/views/state1.html'
    });

  $urlRouterProvider.otherwise("/");
});

/*-----------------------------------------------*/
/*                  MAIN NAV                     */
/*-----------------------------------------------*/

angular.module('ProLifeMonitor').directive('mainNav', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/main-nav.html',
      controllerAs: 'MainNavCtrl'
    }
  });

angular.module('ProLifeMonitor').controller('MainNavCtrl', ['$scope', '$meteor', '$reactive',
  function ($scope, $meteor, $reactive) {
}]);


/*-----------------------------------------------*/
/*                     TO DO                     */
/*-----------------------------------------------*/


angular.module('ProLifeMonitor').controller('TodosListCtrl', ['$scope', '$meteor', '$reactive',
  function ($scope, $meteor, $reactive) {

    $reactive(this).attach($scope);

    this.subscribe('tasks');

    /*$scope.tasks = $meteor.collection(function() {
      return Tasks.find($scope.getReactively('query'), {sort: {createdAt: -1}})
    });
    */

    $scope.helpers({
      tasks() {
        return Tasks.find($scope.getReactively('query'), {sort: {createdAt: -1}})
      }
    });


    $scope.addTask = function (newTask) {
      Meteor.call('addTask', newTask);
    };

    $scope.deleteTask = function (task) {
      Meteor.call('deleteTask', task._id);
    };

    $scope.setChecked = function (task) {
      Meteor.call('setChecked', task._id, !task.checked);
    };

    $scope.setPrivate = function (task) {
      Meteor.call('setPrivate', task._id, !task.private);
    };

    $scope.$watch('hideCompleted', function() {
      if ($scope.hideCompleted)
        $scope.query = {checked: {$ne: true}};
      else
        $scope.query = {};
    });

    $scope.incompleteCount = function () {
      return Tasks.find({ checked: {$ne: true} }).count();
    };

  }]);

angular.module('ProLifeMonitor').directive('todosList', function() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/todos-list.html',
      controllerAs: 'TodosListCtrl'
    }
  });



