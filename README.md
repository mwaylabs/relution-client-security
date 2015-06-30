###Relution Client Security
[![Bower version](https://badge.fury.io/bo/relution-client-security.svg)](http://badge.fury.io/bo/relution-client-security) [![Build Status][travis-image]][travis-url]

A Login/Logout Module for Relution LiveData. Works well with [generator-m](https://github.com/mwaylabs/generator-m)
Installation
===
````
bower install --save relution-client-security
````

###[Docs](http://mwaylabs.github.io/relution-client-security)

Scripts
===
````
<script src="bower_components/relution-client-login/dist/relution-client-security.js"></script>
<script src="bower_components/relution-client-login/dist/templates.js"></script>
````
Inject
===
````
angular.module('relutionApp', [
  'relutionClientSecurity'
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
$relutionSecurityConfigProvider.setLayoutStyle();
`````
example:
`````
$relutionSecurityConfigProvider.setLayoutStyle('INPUT_ICONS');
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
$relutionSecurityConfigProvider.setIcons();
//or
$relutionSecurityConfigProvider.setIcons('android', {
	login: 'my cutom icon' ...
});
$relutionSecurityConfigProvider.setIcons('ios', {
	login: 'my cutom icon' ...
});
`````
#####Redirect after
add your $state

After Login redirect:
`````
$relutionSecurityConfigProvider.forwardStateAfterLogin = 'tab.messenger';
`````
After Logout redirect:
`````
$relutionSecurityConfigProvider.forwardStateAfterLogout = 'auth.login';
`````
#####Server Urls
Login
`````
$relutionSecurityConfigProvider.loginUrl = 'http://coredev.mwaysolutions.com/rest/....';
`````
Logout
`````
$relutionSecurityConfigProvider.logoutUrl = 'http://coredev.mwaysolutions.com/rest/....';
`````

Full example
````
angular.module('app', [])
.config(function ($relutionSecurityConfigProvider) {
    //$relutionSecurityConfigProvider.setLayoutStyle('STACKED_LABELS');
    //$relutionSecurityConfigProvider.setLayoutStyle('PLACEHOLDER_LABELS');
    //$relutionSecurityConfigProvider.setLayoutStyle('INLINE_LABELS');
    //$relutionSecurityConfigProvider.setLayoutStyle('FLOATING_LABELS');
    //$relutionSecurityConfigProvider.setLayoutStyle('INSET_LABELS');
    $relutionSecurityConfigProvider.setLayoutStyle('INPUT_ICONS');
    $relutionSecurityConfigProvider.setIcons();
    $relutionSecurityConfigProvider.forwardStateAfterLogin = 'tab.messenger';
    $relutionSecurityConfigProvider.forwardStateAfterLogout = 'auth.login';
    $relutionSecurityConfigProvider.loginUrl = 'myloginOnServer';
    $relutionSecurityConfigProvider.logoutUrl = 'mylogoutOnServer';
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
angular.module('auth', ['relutionClientSecurity'])
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
  .controller('LoginCtrl', function LoginCtrl($scope, $state, $filter, LoginService, AlertService, $relutionSecurityConfig) {
    var self = this;
    this.service = LoginService;
    
    //error handling form not valid
    this.getMessage = function (errors) {
      var message = 'Please check following Fields: ';
      angular.forEach(errors, function (error) {
        message += error.$name + ' ';
      });
      return message;
    };
    
    //submit form you get the form
    this.submit = function (loginform) {
      if (loginform.$valid) {
        this.service.logon();
      } else {
        //form not valid
        alert(self.getMessage(loginform.$error.required));
      }
    };
    
    //set view set icons
    $scope.$on('$ionicView.afterEnter', function () {
      self.icons = $relutionSecurityConfig.iconSet;
      self.include = $relutionSecurityConfig.view;
    });
  });
````
View

````
<div ng-if="!loginC.service.isLoggedIn" ng-include="loginC.include"></div>
````
ion view example:

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
````

#Logout Directive

````
<relution-log-out-button></relution-log-out-button>
````
navbar example:

````
<ion-nav-bar class="bar-dark">
  <ion-nav-back-button>
  </ion-nav-back-button>
  <ion-nav-buttons side="secondary">
    <relution-log-out-button></relution-log-out-button>
  </ion-nav-buttons>
</ion-nav-bar>
````

###User Information
the Userservice will be filled in after succesfully Login available Methods check the [documentation](http://mwaylabs.github.io/relution-client-security).

###Available Translation Keys
````
{{Username}}
{{Password}}
{{Login}}
````

[travis-url]: https://travis-ci.org/mwaylabs/relution-client-security
[travis-image]: https://travis-ci.org/mwaylabs/relution-client-security.svg?branch=master
