angular.module('ProLifeMonitor').controller('MainNavCtrl', MainNavCtrl);

function MainNavCtrl ($scope, $meteor, $reactive) {
    $reactive(this).attach($scope);
   
    $scope.helpers({
      isLoggedIn () {
        return Meteor.userId() !== null;
      },
      currentUser2 () {
        return Meteor.user();
      }
    });

    $scope.logout = () => {
      Accounts.logout();
    };
};