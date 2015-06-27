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
 * @ngdoc interface
 * @name relutionClientSecurity
 * @description A Login/Logout Module for Relution LiveData. Works well with generator-m check the Readme for more instructions
 */
angular.module('relutionClientSecurity', []);

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
.directive('relutionLogOutButton', ["$relutionAuthLauncher", "$q", "LoginService", function ($relutionAuthLauncher, $q, LoginService) {
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
}]);

/**
 * Created by pascalbrewing on 22/06/15
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
 * @name relutionClientSecurity:Base64
 */
angular.module('relutionClientSecurity')
  .factory('Base64', function () {
    /* jshint ignore:start */
    // jscs:disable
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
      /**
       * @ngdoc method
       * @name encode
       * @methodOf relutionClientSecurity:Base64
       */
      encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
      },
      /**
       * @ngdoc method
       * @name decode
       * @methodOf relutionClientSecurity:Base64
       */
      decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
          window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }

          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
      }
    };
    /* jshint ignore:end */
    // jscs:enable
  });

/**
 * Created by pascalbrewing on 24/06/15
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
 * @name relutionClientSecurity:$relutionSecurityConfig
 * @description Configuration for the relutionAuth module
 */
angular.module('relutionClientSecurity')
  .provider('$relutionSecurityConfig', function () {
    var provider = this;
    /**
     * @ngdoc property
     * @name iconSet
     * @description available Icons
     * @propertyOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.iconSet = null;
    /**
     * @ngdoc property
     * @name forwardStateAfterLogin
     * @description the redirect url after login is successfull
     * @propertyOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.forwardStateAfterLogin = null;
    /**
     * @ngdoc property
     * @name forwardStateAfterLogout
     * @description the redirect url after logout
     * @propertyOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.forwardStateAfterLogout = null;
    /**
     * @ngdoc property
     * @name loginUrl
     * @description the server login url
     * @propertyOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.loginUrl = null;
    /**
     * @ngdoc property
     * @name loginUrl
     * @description the server logout url
     * @propertyOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.logoutUrl = null;
    /**
     * @ngdoc property
     * @name icons
     * @description the standard icon set
     * @propertyOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.icons =
    {
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
    };
    /**
     * @ngdoc property
     * @name formViews
     * @description available form views
     * @propertyOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.formViews = {
      PLACEHOLDER_LABELS: 'placeholder_label.html',
      INLINE_LABELS: 'inline_labels.html',
      STACKED_LABELS: 'stacked_label.html',
      FLOATING_LABELS: 'floating_labels.html',
      INSET_LABELS: 'inset_labels.html',
      INPUT_ICONS: 'input_icons.html'
    };
    /**
     * @ngdoc method
     * @name setIcons
     * @description set the icons by Platform
     * @methodOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.setIcons = function (key, icons) {
      provider.iconSet = ionic.Platform.isAndroid() ? provider.icons.android : provider.icons.ios;
      if (!key && !icons) {
        return provider.iconSet;
      }
      if (key) {
        provider.iconSet = provider.icons[key];
        if (icons) {
          return provider.iconSet.assign(icons);
        }
      }
    };
    /**
     * @ngdoc method
     * @name setLayoutStyle
     * @description standard view
     * @methodOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.setLayoutStyle = function (key) {
      if (!key) {
        provider.setLayoutStyle(provider.formViews.PLACEHOLDER_LABELS);
      }
      provider.view = provider.formViews[key];
    };
    /**
     * @ngdoc method
     * @name $get
     * @description init the provider
     * @methodOf relutionClientSecurity:$relutionSecurityConfig
     */
    provider.$get = function () {
      return provider;
    };
  });

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
  .service('LoginService', ["$q", "$state", "Base64", "$rootScope", "$relutionSecurityConfig", function LoginService($q, $state, Base64, $rootScope, $relutionSecurityConfig) {
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
  }]
);
