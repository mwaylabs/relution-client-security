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
 * @name relutionAuth:$relutionAuthLauncher
 * @description Configuration for the relutionAuth module
 */
angular.module('relutionAuth')
  .provider('$relutionAuthLauncher', function () {
    var provider = this;
    provider.iconSet = null;
    provider.forwardStateAfterLogin = null;
    provider.forwardStateAfterLogout = null;
    provider.loginUrl = null;
    provider.logoutUrl = null;

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

    provider.formViews = {
      PLACEHOLDER_LABELS: 'placeholder_label.html',
      INLINE_LABELS: 'inline_labels.html',
      STACKED_LABELS: 'stacked_label.html',
      FLOATING_LABELS: 'floating_labels.html',
      INSET_LABELS: 'inset_labels.html',
      INPUT_ICONS: 'input_icons.html'
    };
    provider.setLayoutStyle = function (key) {
      if (!key) {
        provider.setLayoutStyle(provider.formViews.PLACEHOLDER_LABELS);
      }
      provider.view = '/' + provider.formViews[key];
    };

    provider.$get = function () {
      return provider;
    };
  });
