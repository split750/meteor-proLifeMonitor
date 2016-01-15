/*-----------------------------------------------*/
/*                   PROFILE                     */
/*-----------------------------------------------*/


angular.module('ProLifeMonitor').controller('ProfileCtrl', ProfileCtrl);


function ProfileCtrl($scope, $meteor, $reactive) {

  $reactive(this).attach($scope);

  $scope.helpers({
    userProfile () {
      return Meteor.user();
    }
  });


  $scope.updateProfile = function (updateProfile) {
    Meteor.call('updateProfile', updateProfile);
  };
}