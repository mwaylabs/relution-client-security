/**
 * Created by pascalbrewing on 08/10/14.
 */
describe('LoginService', function () {
  var LoginService, UserService;
  beforeEach(module('relutionClientSecurity'));
  beforeEach(inject(function (_$state_, _$q_, _LoginService_, _UserService_, _$relutionSecurityConfig_) {
    $q = _$q_;

    $state = _$state_;
    UserService = _UserService_;
    LoginService = _LoginService_;
    $relutionSecurityConfig = _$relutionSecurityConfig_;
    $relutionSecurityConfig.setLayoutStyle('INPUT_ICONS');
    $relutionSecurityConfig.setIcons();
    $relutionSecurityConfig.forwardStateAfterLogin = 'tab.messenger';
    $relutionSecurityConfig.forwardStateAfterLogout = 'auth.login';
    $relutionSecurityConfig.loginUrl = 'http://localhost:3000/login';
    $relutionSecurityConfig.logoutUrl = 'http://localhost:3000/logout';
    LoginService.form.username.value = 'pascal';
    LoginService.form.password.value = 'foobar';
  }));

  describe('Constructor', function () {
    it('login on the server', function () {
      LoginService.secureLogin().then(function (resp) {
        LoginService.success(resp);
        expect(LoginService.isLoggedIn).to.be.true;
        assert.deepEqual(UserService.user, resp.user);
        assert.deepEqual(UserService.roles, resp.roles.roles);
      });
    });
    
    it('logout on the server', function () {
      LoginService.secureLogout().then(function (resp) {});
      expect(LoginService.isLoggedIn).to.be.false;
      expect(LoginService.userResponse).to.be.null;
      expect(UserService.user).is.equal(null);
      expect(UserService.organization).is.equal(null);
      expect(UserService.roles).is.equal(null);
    });
  });
});

