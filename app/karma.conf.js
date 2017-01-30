// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      //require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul'),
      require('karma-mocha-reporter'),
      require('angular-cli/plugins/karma')
    ],
    phantomJsLauncher: {
      exitOnResourceError: true
    },
    files: [
      'https://maps.googleapis.com/maps/api/js?sensor=false',
      './src/maps.googleapis.com-maps-api.js',
      {pattern: './src/test.ts', watched: false}
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: [
      'mocha', 'karma-remap-istanbul'//, 'dots'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'], //'PhantomJS'
    singleRun: false,
    mime: {'text/x-typescript': ['ts', 'tsx']}
  });
};
