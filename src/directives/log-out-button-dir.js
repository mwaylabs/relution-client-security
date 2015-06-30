'use strict';
/**
* @ngdoc directive
* @name relutionLogOutButton
*
* @description
* A logout button directive with a icon
*
* @restrict E
 */
angular.module('relutionClientSecurity')
.directive('relutionLogOutButton', function ($relutionSecurityConfig, $q, LoginService) {
  return {
    template: '<button ng-click="logout();" class="button button-icon icon {{icon}}"></button>',
    restrict: 'E',
    link: function postLink (scope) {
      scope.icon = $relutionSecurityConfig.iconSet.logout;
      scope.logout = function () {
        return LoginService.secureLogout();
      };
    }
  };
});
