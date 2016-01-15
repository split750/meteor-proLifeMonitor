/*-----------------------------------------------*/
/*                  MAIN NAV                     */
/*-----------------------------------------------*/

angular.module('ProLifeMonitor').directive('mainNav', mainNav);

function mainNav() {
    return {
      restrict: 'E',
      templateUrl: 'client/views/main-nav.html',
      controllerAs: 'MainNavCtrl as mainNav'
    }
};