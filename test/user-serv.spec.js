/**
 * Created by pascalbrewing on 08/10/14.
 */
describe('UserService', function () {

  var UserService;
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
  beforeEach(module('relutionClientSecurity'));
  beforeEach(inject(function(_$state_, _$q_){
    $q = _$q_;
    $state = _$state_;
  }));

  beforeEach(inject(function (_UserService_) {
    UserService = _UserService_;
    UserService.init(response);
  }));

  describe('Constructor', function () {
    it('init the service', function () {
      //UserService.init(response);
      expect(UserService.user).is.equal(response.user);
      expect(UserService.organization).is.equal(response.organization);
      expect(UserService.roles).is.equal(response.roles.roles);
    });
    it('get a property from the user', function () {
      expect(UserService.getUserProperty('name')).is.equal('pascal');
      expect(UserService.getUserProperty('uuid')).is.equal('1c341954-e83c-4dd8-a5e7-e958806a36fc');
      expect(UserService.getUserProperty('surname')).is.equal('Brewing');
    });
    it('get properties from the user', function () {
      assert.deepEqual(UserService.getUserProperties(['name', 'uuid', 'surname']), ['pascal', '1c341954-e83c-4dd8-a5e7-e958806a36fc', 'Brewing']);
    });
    it('get a property from the organization', function () {
      expect(UserService.getOrganizationProperty('name')).is.equal('mway');
      expect(UserService.getUserProperty('uuid')).is.equal('1c341954-e83c-4dd8-a5e7-e958806a36fc');
      expect(UserService.getUserProperty('surname')).is.equal('Brewing');
    });
    it('get properties from the organization', function () {
      assert.deepEqual(UserService.getOrganizationProperties(['name']), ['mway']);
    });
    it('get properties from the roles', function () {
      assert.deepEqual(UserService.getRolesProperty('name'), [
        {name: 'USERS'},
        {name: 'DEVELOPERS'},
        {name: 'MWAY'}
      ]);
    });
    it('reset the service', function () {
      UserService.reset();
      expect(UserService.user).is.equal(null);
      expect(UserService.organization).is.equal(null);
      expect(UserService.roles).is.equal(null);
    });
  });
});

