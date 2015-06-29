/**
 * Created by pascalbrewing on 29/06/15
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
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var username = 'pascal', password = 'foobar';
var response = {
  "user": {
    "aclEntries": ["58256249-6d1a-4aea-857a-fb7f709a1a13:rw", "user.anonymous:r"],
    "uuid": "1c341954-e83c-4dd8-a5e7-e958806a36fc",
    "name": "pascal",
    "givenName": "Pascal",
    "surname": "Brewing",
    "organizationUuid": "f5b2a9a3-f1aa-4cbb-9928-072c35d480a2",
    "email": "pp@nnn.de",
    "country": "Germany",
    "lastLoggedTime": 1435569772959,
    "locked": false,
    "activated": true,
    "readonly": false,
    "version": 125,
    "effectivePermissions": "*",
    "preferences": {}
  },
  "organization": {
    "uuid": "f5b2a9a3-f1aa-4cbb-9928-072c35d480a2",
    "aclEntries": ["58256249-6d1a-4aea-857a-fb7f709a1a13:rw"],
    "name": "mway",
    "uniqueName": "mway",
    "address": {"country": "Germany"},
    "billingSettings": {
      "billingAddress": {"country": "Germany"},
      "billingPerson": {
        "phone": ["0711/5632456"],
        "mobilePhone": ["012312"],
        "email": ["pascal.brewing@mwaysolutions.com"]
      },
      "currency": "EUR"
    },
    "technicalPerson": {
      "phone": ["0711/5632456"],
      "mobilePhone": ["012312"],
      "email": ["pascal.brewing@mwaysolutions.com"]
    },
    "assetPath": "/organizations/mway",
    "reportLocaleString": "de_DE",
    "defaultRoles": ["58256249-6d1a-4aea-857a-fb7f709a1a13"],
    "version": 2,
    "effectivePermissions": "*",
    "createdDate": 1425315327000,
    "modifiedDate": 1425315335000,
    "propertyMap": {},
    "createdUser": "d46a7b93-fc2d-4349-b4f3-f418c8eab728",
    "modifiedUser": "d46a7b93-fc2d-4349-b4f3-f418c8eab728"
  },
  "roles": {
    "roles": [{
      "uuid": "0084201a-36d2-4c34-9cd2-73466243c1b9",
      "name": "USERS",
      "systemPermission": false
    }, {
      "uuid": "27caebee-20a5-49ec-82f7-8c587cdbd7bd",
      "name": "DEVELOPERS",
      "systemPermission": false
    }, {
      "uuid": "58256249-6d1a-4aea-857a-fb7f709a1a13",
      "name": "MWAY",
      "systemPermission": false
    }]
  }
};
app.use('/login', function (req, res, next) {
  console.log(req.headers.origin);
  if(req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    oneof = true;
  }
  if(req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    oneof = true;
  }
  if(req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    oneof = true;
  }
  if(oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }
  console.log(req.body, req.body.length == 2, req.body.password === password && req.body.userName === username);
  res.status(200).json(response);
  //if (req.body && req.body.password === password && req.body.userName === username) {
  //
  //} else {
  //  res.status(401).json('fail');
  //}
});
app.use('/logout', function (req, res) {
  if(req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    oneof = true;
  }
  if(req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    oneof = true;
  }
  if(req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    oneof = true;
  }
  if(oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }
  res.status(200).json({status: 'success'});
});
app.listen(3000);
