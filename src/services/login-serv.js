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
 * @name LoginService
 * @requires $q
 * @requires $state
 * @requires Base64
 * @requires $rootScope
 * @requires $relutionSecurityConfig
 * @description Simple Service to login and logout on relution server and store the result in the  LoginService.userResponse
 */
angular.module('relutionClientSecurity')
  .service('LoginService', function LoginService($q, $state, Base64, $rootScope, $relutionSecurityConfig, UserService, HeaderService) {
    var self = this;
    /**
     * @ngdoc property
     * @name userResponse
     * @description the response user
     * @propertyOf LoginService
     * @returns {Object} {user:, roles, orhganization ..
     */
    this.userResponse = null;
    /**
     * @ngdoc property
     * @name header
     * @description the response header
     * @propertyOf LoginService
     * @returns {Object} {'X-Gofer-User' ...
     */
    this.header = null;
    /**
     * @ngdoc property
     * @name isLoggedIn
     * @description bool if the user is loggedIn
     * @propertyOf LoginService
     * @returns {boolean} true/false
     */
    this.isLoggedIn = false;
    /**
     * @ngdoc property
     * @name basicAuth
     * @description a base64 hash
     * @propertyOf LoginService
     */
    this.basicAuth = null;
    /**
     * @ngdoc property
     * @name form
     * @description the form fields
     * @propertyOf LoginService
     * @returns {Object} {{username: {value: *, type: string, required: boolean}, password: {value: null, type: string, required: boolean}}}
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
     * @methodOf LoginService
     */
    this.setUsername = function (username) {
      self.form.username.value = username;
    };
    /**
     * @ngdoc method
     * @name setPassword
     * @description set the password
     * @methodOf LoginService
     */
    this.setPassword = function (password) {
      self.form.password.value = password;
    };
    /**
     * @ngdoc method
     * @name clearCredentials
     * @description remove the Basic auth from the Header
     * @methodOf LoginService
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
     * @methodOf LoginService
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
     * @methodOf LoginService
     */
    this.success = function (resp) {
      self.userResponse = resp;
      self.isLoggedIn = true;
      //console.log('resp', resp);
      return $q.when(UserService.init(resp)).then(function () {
        return $state.go($relutionSecurityConfig.forwardStateAfterLogin);
      });
    };
    /**
     * @ngdoc method
     * @name complete
     * @description login succesfully
     * @methodOf LoginService
     */
    this.complete = function (resp, xhr) {
      HeaderService.init(resp);
      return self.header = resp.getAllResponseHeaders();
    };
    /**
     * @ngdoc method
     * @name error
     * @description login failed
     * @methodOf LoginService
     */
    this.error = function (e) {
      //console.log(e);
      return console.error('Login failed', e);
    };
    /**
     * @ngdoc method
     * @name successLogout
     * @description logout succesfully
     * @methodOf LoginService
     */
    this.successLogout = function () {
      self.userResponse = null;
      self.isLoggedIn = false;
      $q.all([UserService.reset(), HeaderService.reset()]).then(function () {
        return $state.go($relutionSecurityConfig.forwardStateAfterLogout);
      });
    };
    /**
     * @ngdoc method
     * @name errorLogout
     * @description logout failed
     * @methodOf LoginService
     */
    this.errorLogout = function (e) {
      return console.error('Logout failed', e);
    };
    /**
     * @ngdoc method
     * @name secureLogin
     * @description login on Server with Credentials
     * @methodOf LoginService
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
          'Content-Type': 'application/json',//USE JSON Stadard,
          'Access-Control-Allow-Origin': '*'
        },
        url: $relutionSecurityConfig.loginUrl,
        data: JSON.stringify(params),
        success: self.success,
        error: self.error,
        complete: self.complete,
        dataType: 'json'
      });
    };
    /**
     * @ngdoc method
     * @name secureLogout
     * @description logout on Server
     * @methodOf LoginService
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
