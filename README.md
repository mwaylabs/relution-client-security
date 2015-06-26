###Relution Client Login
A Login/Logout Module for Relution LiveData. Works well with [generator-m](https://github.com/mwaylabs/generator-m)
Installation
===
````
bower install --save relution-client-login
````

Scripts
===
````
<script src="bower_components/relution-client-login/dist/relution-client-login.js"></script>
<script src="bower_components/relution-client-login/dist/templates.js"></script>
````
Inject
===
````
angular.module('relutionApp', [
  'relutionAuth'
])
````
Configuration
====
````
angular.module('app', [])
.config(function ($relutionAuthLauncherProvider) {
    //$relutionAuthLauncherProvider.setLayoutStyle('INPUT_ICONS');
    //$relutionAuthLauncherProvider.setLayoutStyle('PLACEHOLDER_LABELS');
    //$relutionAuthLauncherProvider.setLayoutStyle('INLINE_LABELS');
    //$relutionAuthLauncherProvider.setLayoutStyle('FLOATING_LABELS');
    //$relutionAuthLauncherProvider.setLayoutStyle('INSET_LABELS');
    $relutionAuthLauncherProvider.setLayoutStyle('INPUT_ICONS');
    $relutionAuthLauncherProvider.setIcons();
    $relutionAuthLauncherProvider.forwardStateAfterLogin = 'tab.messenger';
    $relutionAuthLauncherProvider.forwardStateAfterLogout = 'auth.login';
    $relutionAuthLauncherProvider.loginUrl = 'myloginOnServer';
    $relutionAuthLauncherProvider.logoutUrl = 'mylogoutOnServer';
````
#Login
#####Controller
please notice you have to use your Controller in 'as' mode and name it 'loginC' 
example:
````
ng-controller="LoginCtrl as loginC"
````
or in $stateProvider : 
````
angular.module('auth', ['relutionAuth'])
  .config(function ($stateProvider) {
    debugger;
    $stateProvider
      .state('auth', {
        url: '/auth',
        abstract: true,
        template: '<ion-nav-view name="auth"></ion-nav-view>'
      })
      .state('auth.login', {
        parent: 'auth',
        url: '/login',
        views: {
          'auth': {
            templateUrl: 'auth/templates/login/index.html',
            controller: 'LoginCtrl as loginC'
          }
        }
      });
  });
````
full controller
````
'use strict';
/**
 * @ngdoc controller
 * @name auth:LoginCtrl
 * @requires $scope
 * @description add your description
 */
angular.module('auth')
  .controller('LoginCtrl', function LoginCtrl($scope, $state, $filter, LoginService, AlertService, $relutionAuthLauncher) {
    var self = this;
    this.service = LoginService;
    this.getMessage = function (errors) {
      var message = 'Please check following Fields: ';
      angular.forEach(errors, function (error) {
        message += error.$name + ' ';
      });
      return message;
    };

    this.submit = function (loginform) {
      if (loginform.$valid) {
        this.service.logon();
      } else {
        AlertService.map({
          cssClass: 'assertive',
          title: 'Following Errors Occured',
          message: self.getMessage(loginform.$error.required),
          buttons: [
            {
              text: $filter('translate')('CLOSE'),
              type: 'button-positive'
            }
          ]
        });
      }
    };
    $scope.$on('$ionicView.afterEnter', function () {
      self.icons = $relutionAuthLauncher.iconSet;
      self.include = $relutionAuthLauncher.view;
    });
  });
````
View

````
<ion-view hide-nav-bar="true">
  <ion-content>
    <div ng-if="!loginC.service.isLoggedIn" ng-include="loginC.include"></div>
    <ion-list ng-if="loginC.service.isLoggedIn">
      <ion-item class="item-text-wrap">
        <p>You are already Logged in!</p>
      </ion-item>
      <ion-item ui-sref="tab.movies">
        Movies
      </ion-item>
      <ion-item ui-sref="tab.messenger">
        Chat
      </ion-item>
    </ion-list>
  </ion-content>
</ion-view>
`````

#Logout Directive

````
<ion-nav-bar class="bar-dark">
  <ion-nav-back-button>
  </ion-nav-back-button>
  <ion-nav-buttons side="secondary">
    <relution-log-out-button></relution-log-out-button>
  </ion-nav-buttons>
</ion-nav-bar>
````

