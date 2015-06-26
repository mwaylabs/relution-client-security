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
#####Forms
available Layout Styles
[PLACEHOLDER_LABELS](http://ionicframework.com/docs/components/#forms-placeholder-labels)
[INLINE_LABELS](http://ionicframework.com/docs/components/#forms-inline-labels)
[STACKED_LABELS](http://ionicframework.com/docs/components/#forms-stacked-labels)
[FLOATING_LABELS](http://ionicframework.com/docs/components/#forms-floating-labels)
[INSET_LABELS](http://ionicframework.com/docs/components/#inset-forms)
[INPUT_ICONS](http://ionicframework.com/docs/components/#input-icons)
default is PLACEHOLDER_LABELS
`````
$relutionAuthLauncherProvider.setLayoutStyle();
`````
example:
`````
$relutionAuthLauncherProvider.setLayoutStyle('INPUT_ICONS');
`````
#####Icons
default icons check [ionic Icons](http://ionicons.com/)
`````
  android: {
    login: 'ion-log-in',
    username: 'ion-android-person',
    password: 'ion-lock-combination',
    organization: 'ion-briefcase',
    logout: 'ion-log-out'
  },
  ios: {
    login: 'ion-log-in',
    username: 'ion-ios-person',
    password: 'ion-lock-combination',
    organization: 'ion-briefcase',
    logout: 'ion-log-out'
  }
`````
example
`````
$relutionAuthLauncherProvider.setIcons();
//or
$relutionAuthLauncherProvider.setIcons('android', {
	login: 'my cutom icon' ...
});
$relutionAuthLauncherProvider.setIcons('ios', {
	login: 'my cutom icon' ...
});
`````
#####Redirect after
add your $state

After Login redirect:
`````
$relutionAuthLauncherProvider.forwardStateAfterLogin = 'tab.messenger';
`````
After Logout redirect:
`````
$relutionAuthLauncherProvider.forwardStateAfterLogout = 'auth.login';
`````
#####Server Urls
Login
`````
$relutionAuthLauncherProvider.loginUrl = 'http://coredev.mwaysolutions.com/rest/....';
`````
Logout
`````
$relutionAuthLauncherProvider.logoutUrl = 'http://coredev.mwaysolutions.com/rest/....';
`````

Full example
````
angular.module('app', [])
.config(function ($relutionAuthLauncherProvider) {
    //$relutionAuthLauncherProvider.setLayoutStyle('STACKED_LABELS');
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

