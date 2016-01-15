/*-----------------------------------------------*/
/*                     TODOS                     */
/*-----------------------------------------------*/

angular.module('ProLifeMonitor').directive('todosList', todosList);

function todosList() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/todos-list.html',
      controllerAs: 'TodosListCtrl'
    }
};