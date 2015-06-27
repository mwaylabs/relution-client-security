'use strict';
/**
* @ngdoc directive
* @name relutionClientSecurity:relutionLogOutButton
*
* @description
* A logout button directive with a icon
*
* @restrict AEC
 */
angular.module('relutionClientSecurity')
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
