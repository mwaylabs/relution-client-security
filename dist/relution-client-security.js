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
angular.module('relutionClientSecurity', ['ui.router', 'pascalprecht.translate']);

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
 * @name $relutionSecurityConfig
 * @description Configuration for the relutionAuth module
 */
angular.module('relutionClientSecurity')
  .provider('$relutionSecurityConfig', function () {
    var provider = this;
    /**
     * @ngdoc property
     * @name iconSet
     * @description available Icons
     * @propertyOf $relutionSecurityConfig
     */
    provider.iconSet = null;
    /**
     * @ngdoc property
     * @name forwardStateAfterLogin
     * @description the redirect url after login is successfull
     * @propertyOf $relutionSecurityConfig
     */
    provider.forwardStateAfterLogin = null;
    /**
     * @ngdoc property
     * @name forwardStateAfterLogout
     * @description the redirect url after logout
     * @propertyOf $relutionSecurityConfig
     */
    provider.forwardStateAfterLogout = null;
    /**
     * @ngdoc property
     * @name loginUrl
     * @description the server login url
     * @propertyOf $relutionSecurityConfig
     */
    provider.loginUrl = null;
    /**
     * @ngdoc property
     * @name loginUrl
     * @description the server logout url
     * @propertyOf $relutionSecurityConfig
     */
    provider.logoutUrl = null;
    /**
     * @ngdoc property
     * @name icons
     * @description the standard icon set
     * @propertyOf $relutionSecurityConfig
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
     * @propertyOf $relutionSecurityConfig
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
     * @methodOf $relutionSecurityConfig
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
     * @methodOf $relutionSecurityConfig
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
     * @methodOf $relutionSecurityConfig
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
 * @name HeaderService
 * @requires $q
 * @description Simple Service to set the User Informations
 */
angular.module('relutionClientSecurity')
  .service('HeaderService', ["$q", function HeaderService($q) {
    var self = this;
    /**
     * @ngdoc property
     * @name XGoferUser
     * @description the user uuid
     * @propertyOf HeaderService
     * @returns {String} or null
     */
    this.XGoferUser = null;
    /**
     * @ngdoc property
     * @name XServer
     * @propertyOf HeaderService
     * @returns {String} or null
     */
    this.XServer = null;
    /**
     * @ngdoc property
     * @name XRelutionVersion
     * @description used Relution Version
     * @propertyOf HeaderService
     * @returns {String} or null
     */
    this.XRelutionVersion = null;
    /**
     * @ngdoc method
     * @name init
     * @description initial the Service require the response on complete
     * @methodOf HeaderService
     */
    this.init = function (resp) {
     this.XGoferUser = resp.getResponseHeader('X-Gofer-User');
     this.XServer = resp.getResponseHeader('X-Server');
     this.XRelutionVersion = resp.getResponseHeader('X-Relution-Version');
    };
    /**
     * @ngdoc method
     * @name reset
     * @description reset the Service
     * @methodOf HeaderService
     */
    this.reset = function () {
      this.XGoferUser = null;
      this.XServer = null;
      this.XRelutionVersion = null;
    };
  }]
);

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
  .service('LoginService', ["$q", "$state", "Base64", "$rootScope", "$relutionSecurityConfig", "UserService", "HeaderService", function LoginService($q, $state, Base64, $rootScope, $relutionSecurityConfig, UserService, HeaderService) {
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
  }]
);

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
 * @name UserService
 * @requires $q
 * @description Simple Service to set the User Informations
 */
angular.module('relutionClientSecurity')
  .service('UserService', ["$q", function UserService($q) {
    var self = this;
    /**
     * @ngdoc property
     * @name user
     * @description the response user
     * @propertyOf UserService
     * @returns {Object} or null
     */
    this.user = null;
    /**
     * @ngdoc property
     * @name roles
     * @description all roles
     * @propertyOf UserService
     * @returns {Array} or null
     */
    this.roles = null;
    /**
     * @ngdoc property
     * @name organization
     * @description the user organization
     * @propertyOf UserService
     * @returns {Object} or null
     */
    this.organization = null;
    /**
     * @ngdoc method
     * @name _setUser
     * @private
     * @description set User
     * @methodOf UserService
     */
    var _setUser = function (user) {
      self.user = user;
    };
    /**
     * @ngdoc method
     * @name getUser
     * @description get the User
     * @methodOf UserService
     */
    this.getUser = function () {
      return this.user;
    };

    var _setRoles = function (roles) {
      self.roles = roles;
    };
    /**
     * @ngdoc method
     * @name getRoles
     * @description get the Roles
     * @methodOf UserService
     */
    this.getRoles = function () {
      return this.roles;
    };
    var _setOrganization = function (organization) {
      self.organization = organization;
    };
    /**
     * @ngdoc method
     * @name getOrganization
     * @description get the Organization
     * @methodOf UserService
     */
    this.getOrganization = function () {
      return this.organization;
    };
    /**
     * @ngdoc method
     * @private
     * @name _getProperty
     * @description get a Property by type name
     * @methodOf UserService
     */
    var _getProperty = function (type, property) {
      return self[type][property] ? self[type][property] : false;
    };
    /**
     * @ngdoc method
     * @private
     * @name _getPropertyByObject
     * @description get a Property by type name
     * @methodOf UserService
     */
    var _getPropertyByObject = function (object, property) {
      return object[property] ? object[property] : false;
    };
    /**
     * @ngdoc method
     * @private
     * @name _getProperties
     * @description get a Properties by Array<name>
     * @methodOf UserService
     */
    var _getProperties = function (type, properties) {
      if (!Array.isArray(properties)) {
        return console.error('Properties from ' + type + 'must be a Array')
      }
      var temp = [];
      properties.forEach(function (property) {
        temp.push(_getProperty(type, property));
      });
      return temp;
    };
    /**
     * @ngdoc method
     * @name getUserProperty
     * @description get the User Property
     * @methodOf UserService
     */
    this.getUserProperty = function (property) {
      return _getProperty('user', property);
    };
    /**
     * @ngdoc method
     * @name getUserProperties
     * @description get properties from User by Array of Properties
     * @methodOf UserService
     */
    this.getUserProperties = function (properties) {
      return _getProperties('user', properties);
    };
    /**
     * @ngdoc method
     * @name getRolesProperty
     * @description get properties from Roles by property
     * @methodOf UserService
     */
    this.getRolesProperty = function (property) {
      var roles = [];
      this.roles.forEach(function (role) {
        var temp = {};
        temp[property] = _getPropertyByObject(role, property);
        roles.push(temp);
      });
      return roles;
    };
    /**
     * @ngdoc method
     * @name getOrganizationProperty
     * @description get the Organization Property
     * @methodOf UserService
     */
    this.getOrganizationProperty = function (property) {
      return _getProperty('organization', property);
    };
    /**
     * @ngdoc method
     * @name getOrganizationProperties
     * @description get properties from Organization by Array of Properties
     * @methodOf UserService
     */
    this.getOrganizationProperties = function (properties) {
      return _getProperties('organization', properties);
    };
    /**
     * @ngdoc method
     * @name init
     * @description initial  the Service
     * @methodOf UserService
     */
    this.init = function (resp) {
      return $q.all([
        _setUser(resp.user),
        _setRoles(resp.roles.roles),
        _setOrganization(resp.organization)
      ]);
    };
    /**
     * @ngdoc method
     * @name reset
     * @description reset the Service
     * @methodOf UserService
     */
    this.reset = function () {
      return $q.all([
        _setUser(null),
        _setRoles(null),
        _setOrganization(null)
      ]);
    };
  }]
);

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
 * @name Base64
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
       * @methodOf Base64
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
       * @methodOf Base64
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
.directive('relutionLogOutButton', ["$relutionSecurityConfig", "$q", "LoginService", function ($relutionSecurityConfig, $q, LoginService) {
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
}]);
