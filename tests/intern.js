define({
    //basePath: 'soylent',
    // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
    maxConcurrency: 5,

    // Configuration options for the module loader; any AMD configuration options supported by the AMD loader in use
    // can be used here.
    // If you want to use a different loader than the default loader, see
    // <https://theintern.github.io/intern/#option-useLoader> for instruction
    loaderOptions: {
        // Packages that should be registered with the loader in each testing environment
      packages: [{name: 'express_mvc', location: '.'}]
    },

    // Non-functional test suite(s) to run in each browser
    suites: [
        'tests/unit/emvc',
        'tests/unit/emvc/server',
    ],
    reporters: ['Pretty'],

    // Functional test suite(s) to execute against each browser once non-functional tests are completed
    //functionalSuites: [ /* 'myPackage/tests/functional' */ ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:node_modules|tests|test)\//
});
