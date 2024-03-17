// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = function (config) {
  config.set({
    // files: [
    //   { pattern: 'app/**/*.component.(ts|html)' },
    //   { pattern: 'app/**/*.service.ts' },
    // ],
    basePath: '',
    frameworks: [
      'jasmine',
      '@angular-devkit/build-angular',
      'karma-typescript',
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-typescript'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [require('karma-typescript-angular2-transform')],
      },
      compilerOptions: {
        lib: ['ES2015', 'DOM'],
      },
      reports: {
        'html-spa': 'coverage',
      },
    },
    client: {
      jasmine: {},
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      dir: './coverage',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    reporters: ['progress', 'kjhtml', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
