/*-----------------------------------------------*/
/*                INITIATE APP                   */
/*-----------------------------------------------*/

angular.module('ProLifeMonitor',['angular-meteor', 'accounts.ui', 'angular-meteor.auth', 'ui.router']);

function onReady() {
  angular.bootstrap(document, ['ProLifeMonitor'], {
    strictDi: true
  });
}
 
if (Meteor.isCordova) {
  angular.element(document).on("deviceready", onReady);
}
else {
  angular.element(document).ready(onReady);
}