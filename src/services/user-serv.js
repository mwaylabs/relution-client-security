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
  .service('UserService', function UserService($q) {
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
  }
);
