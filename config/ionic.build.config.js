var pkg = require('./../node_modules/ionic-sdk/package.json');
var fs = require('fs');

var DISCOURSE_FILE = __dirname + '/../node_modules/ionic-sdk/config/DISCOURSE_POST_URL';

module.exports = {
  dist: 'dist',
  releasePostUrl: fs.readFileSync(DISCOURSE_FILE).toString(),
  releasePostFile: DISCOURSE_FILE,

  protractorPort: 8876,

  banner:
    '/*!\n' +
    ' * Copyright 2014 Drifty Co.\n' +
    ' * http://drifty.com/\n' +
    ' *\n' +
    ' * Ionic, v<%= pkg.version %>\n' +
    ' * A powerful HTML5 mobile app framework.\n' +
    ' * http://ionicframework.com/\n' +
    ' *\n' +
    ' * By @maxlynch, @benjsperry, @adamdbradley <3\n' +
    ' *\n' +
    ' * Licensed under the MIT license. Please see LICENSE for more information.\n'+
    ' *\n' +
    ' */\n\n',
  bundleBanner:
    '/*!\n' +
    ' * ionic.bundle.js is a concatenation of:\n' +
    ' * ionic.js, angular.js, angular-animate.js,\n'+
    ' * angular-sanitize.js, angular-ui-router.js,\n'+
    ' * and ionic-angular.js\n'+
    ' */\n\n',
  closureStart: '(function() {\n',
  closureEnd: '\n})();',

  ionicFiles: [
    // Base
    'node_modules/ionic-sdk/js/ionic.js',

    // Utils
    'node_modules/ionic-sdk/js/utils/delegateService.js',
    'node_modules/ionic-sdk/js/utils/dom.js',
    'node_modules/ionic-sdk/js/utils/events.js',
    'node_modules/ionic-sdk/js/utils/gestures.js',
    'node_modules/ionic-sdk/js/utils/platform.js',
    'node_modules/ionic-sdk/js/utils/poly.js',
    'node_modules/ionic-sdk/js/utils/tap.js',
    'node_modules/ionic-sdk/js/utils/activator.js',
    'node_modules/ionic-sdk/js/utils/utils.js',
    'node_modules/ionic-sdk/js/utils/list.js',
    'node_modules/ionic-sdk/js/utils/keyboard.js',
    'node_modules/ionic-sdk/js/utils/viewport.js',

    // Views
    'node_modules/ionic-sdk/js/views/view.js',
    'node_modules/ionic-sdk/js/views/scrollView.js',
    'node_modules/ionic-sdk/js/views/scrollViewNative.js',
    'node_modules/ionic-sdk/js/views/listView.js',
    'node_modules/ionic-sdk/js/views/modalView.js',
    'node_modules/ionic-sdk/js/views/sideMenuView.js',
    'node_modules/ionic-sdk/js/views/sliderView.js',
    'node_modules/ionic-sdk/js/views/toggleView.js'
  ],

  angularIonicFiles: [
    'node_modules/ionic-sdk/js/angular/*.js',
    'node_modules/ionic-sdk/js/angular/service/**/*.js',
    'node_modules/ionic-sdk/js/angular/controller/**/*.js',
    'node_modules/ionic-sdk/js/angular/directive/**/*.js'
  ],

  //Which vendor files to include in dist, used by build
  //Matched relative to config/lib/
  vendorFiles: [
    'node_modules/ionic-sdk/js/angular/angular-animate.js',
    'node_modules/ionic-sdk/js/angular/angular-animate.min.js',
    'node_modules/ionic-sdk/js/angular/angular-resource.js',
    'node_modules/ionic-sdk/js/angular/angular-resource.min.js',
    'node_modules/ionic-sdk/js/angular/angular-sanitize.js',
    'node_modules/ionic-sdk/js/angular/angular-sanitize.min.js',
    'node_modules/ionic-sdk/js/angular/angular.js',
    'node_modules/ionic-sdk/js/angular/angular.min.js',
    'node_modules/ionic-sdk/js/angular-ui/angular-ui-router.js',
    'node_modules/ionic-sdk/js/angular-ui/angular-ui-router.min.js',
    'fonts/ionicons.eot',
    'fonts/ionicons.svg',
    'fonts/ionicons.ttf',
    'fonts/ionicons.woff'
  ],

  ionicBundleFiles: [
    'node_modules/ionic-sdk/js/ionic.js',
    'node_modules/ionic-sdk/js/angular/angular.js',
    'node_modules/ionic-sdk/js/angular/angular-animate.js',
    'node_modules/ionic-sdk/js/angular/angular-sanitize.js',
    'node_modules/ionic-sdk/js/angular-ui/angular-ui-router.js',
    'node_modules/ionic-sdk/js/ionic-angular.js'
  ],

  //Exclamation can be no longer than 14 chars
  exclamations: [
    "Aah","Ah","Aha","All right","Aw","Ay","Aye","Bah","Boy","By golly","Boom","Cheerio","Cheers","Come on","Crikey","Dear me","Egads","Fiddle-dee-dee","Gadzooks","Gangway","G'day","Gee whiz","Gesundheit","Get outta here","Gosh","Gracious","Great","Gulp","Ha","Ha-ha","Hah","Harrumph","Hey","Hooray","Hurray","Huzzah","I say","Look","Look here","Long time","Lordy","Most certainly","My my","My word","Oh","Oh-oh","Oh no","Okay","Okey-dokey","Ooh","Oye","Phew","Quite","Ready","Right on","Roger that","Rumble","Say","See ya","Snap","Sup","Ta-da","Take that","Tally ho","Thanks","Toodles","Touche","Tut-tut","Very nice","Very well","Voila","Vroom","Well done","Well, well","Whoa","Whoopee","Whew","Word up","Wow","Wuzzup","Ya","Yea","Yeah","Yippee","Yo","Yoo-hoo","You bet","You don't say","You know","Yow","Yum","Yummy","Zap","Zounds","Zowie"
  ],

  //Message can be no longer than it is. Currently it's 126 chars with the short git urls,
  //and can have up to a 14 char long exclamation prepended.
  releaseMessage: function() {
    return this.exclamations[Math.floor(Math.random()*this.exclamations.length)] + '! ' +
      'Just released @IonicFramework v' + pkg.version + ' "' + pkg.codename + '"! ' +
      this.releasePostUrl;
  },

};
