var Jasmine = require("jasmine")

function JasmineRunnerPlugin(options) {
  // No options at the moment
}

JasmineRunnerPlugin.prototype.exitCode = function(code) {
  if (code === 0) {
    console.log("Passed.");
  } else {
    console.log("Failed.");
  }
};

JasmineRunnerPlugin.prototype.runSpecs = function(specs) {
  var jasmine = new Jasmine();
  eval(specs);

  jasmine.configureDefaultReporter({ showColors: jasmine.showingColors });

  var jasmineRunner = this;
  jasmine.exitCodeReporter.onComplete(function(passed) {
    if(passed) {
      jasmine.exit(0, process.platform, process.version, jasmineRunner.exitCode, require('exit'));
    } else {
      jasmine.exit(1, process.platform, process.version, jasmineRunner.exitCode, require('exit'));
    }
  });

  jasmine.addReporter(jasmine.exitCodeReporter);
  jasmine.env.execute();
};

JasmineRunnerPlugin.prototype.apply = function(compiler) {
  var jasmineRunner = this;
  compiler.plugin('after-emit', function(compilation, callback) {
    var source = compilation.assets["spec.bundle.js"];
    jasmineRunner.runSpecs(source.source());
    callback();
  });
};

module.exports = JasmineRunnerPlugin;
