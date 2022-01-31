const
    { ArtifactArchiver } = require('@serenity-js/core'),
    { Photographer, TakePhotosOfInteractions } = require('@serenity-js/protractor'),
    { SerenityBDDReporter } = require('@serenity-js/serenity-bdd'),
    isCI = require('is-ci');

exports.config = {
    //config remote selenium grid
    baseUrl: 'https://tm4j2git-dev.scapp-corp.swisscom.com/',
    seleniumAddress: 'https://sgrid.scapp-corp.swisscom.com/wd/hub',

    //chromeDriver: 'chrome',

    //config for jenkins test
    //baseUrl: 'https://tm4j2git-dev.scapp-corp.swisscom.com/',
    //chromeDriver: '/srv/chromedriver',


    SELENIUM_PROMISE_MANAGER: false,

    //when using selenium Grid false is required,
    directConnect: false,

    // https://github.com/angular/protractor/blob/master/docs/timeouts.md
    allScriptsTimeout: 110000,

    framework:      'custom',
    frameworkPath:  require.resolve('@serenity-js/protractor/adapter'),

    specs: [ 'features/**/*.feature' ],
    //specs: [ 'features/*.feature' ],

    serenity: {
        runner: 'cucumber',
        crew: [
            ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
            Photographer.whoWill(TakePhotosOfInteractions),     // or Photographer.whoWill(TakePhotosOfFailures),
            new SerenityBDDReporter(),
        ]
    },

    /**
     * If you're interacting with a non-Angular application,
     * uncomment the below onPrepare section,
     * which disables Angular-specific test synchronisation.
     */

     // onPrepare: function() {
     //     browser.waitForAngularEnabled(false);
     // },

    cucumberOpts: {
        require: [ 'features/**/*.ts', ],
        'require-module':   [ 'ts-node/register'],
        tags:    ['~@wip'],
        strict:  false,
    },

    capabilities: {
        browserName: 'chrome',

        // see https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities#loggingpreferences-json-object
        loggingPrefs: {
            browser: 'SEVERE' // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
        },

        chromeOptions: {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--log-level=3',
                '--disable-gpu',
                '--window-size=1920,1080',
            ].concat(isCI ? ['--headless'] : [])    // run in headless mode on the CI server
        }
    }
};
