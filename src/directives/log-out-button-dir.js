'use strict';
/**
* @ngdoc directive
* @name relutionAuth:relutionLogOutButton
*
* @description
* A logout button directive with a icon
*
* @restrict AEC
 */
angular.module('relutionAuth')
.directive('relutionLogOutButton', function ($relutionAuthLauncher, $q, LoginService) {
  return {
    template: '<button ng-click="logout();" class="button button-icon icon {{icon}}"></button>',
    restrict: 'AEC',
    link: function postLink (scope) {
      scope.icon = $relutionAuthLauncher.iconSet.logout;
      scope.logout = function () {
        return LoginService.secureLogout();
      };
    }
  };
});
