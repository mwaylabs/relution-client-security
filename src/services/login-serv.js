/**
 * Created by Pascal Brewing
 * Copyright (c)
 * 2015
 * M-Way Solutions GmbH. All rights reserved.
 * http://www.mwaysolutions.com
 * Redistribution and use in source and binary forms, with or without
 * modification, are not permitted.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';
/**
 * @ngdoc service
 * @name relutionClientSecurity:LoginService
 * @requires $q
 * @requires $state
 * @requires Base64
 * @requires $rootScope
 * @requires $relutionSecurityConfig
 * @description Simple Service to login and logout on relution server and store the result in the  LoginService.userResponse
 */
angular.module('relutionClientSecurity')
  .service('LoginService', function LoginService($q, $state, Base64, $rootScope, $relutionSecurityConfig) {
    var self = this;
    /**
     * @ngdoc property
     * @name userResponse
     * @description the response user
     * @propertyOf relutionClientSecurity:LoginService
     */
    this.userResponse = null;
    /**
     * @ngdoc property
     * @name isLoggedIn
     * @description bool if the user is loggedIn
     * @propertyOf relutionClientSecurity:LoginService
     */
    this.isLoggedIn = false;
    /**
     * @ngdoc property
     * @name basicAuth
     * @description a base64 hash
     * @propertyOf relutionClientSecurity:LoginService
     */
    this.basicAuth = null;
    /**
     * @ngdoc property
     * @name form
     * @description the form fields
     * @propertyOf relutionClientSecurity:LoginService
     */
    this.form = {
      username: {
        value: $rootScope.globals ? $rootScope.globals.username : null,
        type: 'text',
        required: true
      },
      password: {
        value: null,
        type: 'password',
        required: true
      }
    };
    /**
     * @ngdoc method
     * @name setUsername
     * @description set the username
     * @methodOf relutionClientSecurity:LoginService
     */
    this.setUsername = function (username) {
      self.form.username.value = username;
    };
    /**
     * @ngdoc method
     * @name setPassword
     * @description set the password
     * @methodOf relutionClientSecurity:LoginService
     */
    this.setPassword = function (password) {
      self.form.password.value = password;
    };
    /**
     * @ngdoc method
     * @name clearCredentials
     * @description remove the Basic auth from the Header
     * @methodOf relutionClientSecurity:LoginService
     */
    this.clearCredentials = function () {
      jQuery.ajaxSetup({
        headers: {
          'Authorization': 'Basic '
        }
      });
    };
    /**
     * @ngdoc method
     * @name logon
     * @description set credentials the use post to connect
     * @methodOf relutionClientSecurity:LoginService
     */
    this.logon = function () {
      self.basicAuth = Base64.encode(self.form.username.value + ':' + self.form.password.value);
      jQuery.ajaxSetup({
        xhrFields: {
          withCredentials: true//add Cookie JSESSIONID
        }
      });
      return self.secureLogin();
    };
    /**
     * @ngdoc method
     * @name success
     * @description login succesfully
     * @methodOf relutionClientSecurity:LoginService
     */
    this.success = function (resp) {
      self.userResponse = resp;
      return $state.go($relutionSecurityConfig.forwardStateAfterLogin);
    };
    /**
     * @ngdoc method
     * @name error
     * @description login failed
     * @methodOf relutionClientSecurity:LoginService
     */
    this.error = function (e) {
      return console.error('Login failed', e);
    };
    /**
     * @ngdoc method
     * @name successLogout
     * @description logout succesfully
     * @methodOf relutionClientSecurity:LoginService
     */
    this.successLogout = function () {
      self.user = null;
      console.log('logged out');
      return $state.go($relutionSecurityConfig.forwardStateAfterLogout);
    };
    /**
     * @ngdoc method
     * @name errorLogout
     * @description logout failed
     * @methodOf relutionClientSecurity:LoginService
     */
    this.errorLogout = function (e) {
      return console.error('Logout failed', e);
    };
    /**
     * @ngdoc method
     * @name secureLogin
     * @description login on Server with Credentials
     * @methodOf relutionClientSecurity:LoginService
     */
    this.secureLogin = function () {
      if (!$relutionSecurityConfig.loginUrl) {
        console.error('please configure your loginUrl, $relutionSecurityConfig.loginUrl = secureloginUrl');
        return $q.when(false);
      }
      var params = {
        userName: self.form.username.value,
        password: self.form.password.value
      };
      return jQuery.ajax({
        type: 'POST',
        headers: {
          'Content-Type': 'application/json'//USE JSON Stadard
        },
        url: $relutionSecurityConfig.loginUrl,
        data: JSON.stringify(params),
        success: self.success,
        error: self.error,
        dataType: 'json'
      });
    };
    /**
     * @ngdoc method
     * @name secureLogout
     * @description logout on Server
     * @methodOf relutionClientSecurity:LoginService
     */
    this.secureLogout = function () {
      if (!$relutionSecurityConfig.logoutUrl) {
        console.error('please configure your logoutUrl, $relutionSecurityConfig.logoutUrl = secureloginUrl');
        return $q.when(false);
      }
      return jQuery.post($relutionSecurityConfig.logoutUrl, self.successLogout);
    };
  }
);
