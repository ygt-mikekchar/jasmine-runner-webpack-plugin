# A Jasmine runner for webpack

This plugin will run your Jasmine tests in Node.js
whenever you build your project with webpack.

## How to use

In you webpack.config.js, simply add the plugin as
follows:

```
path = require("path");
JasmineRunnerPlugin = require("jasmine-runner-webpack-plugin");

module.exports = {
  // Normal webpack config goes here.  For example:
  entry: {
    // Using an array here is a hack to allow the second entry
    // to require the first, which is normally what you want when
    // you are testing.
    production: [ path.join(__dirname, "/src/production.js") ],
    spec: path.join(__dirname, "/spec/spec.js") ]
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "[name].bundle.js"
  },
  // Add you plugins here, including the JasmineRunnerPlugin
  plugins: [
    new JasmineRunnerPlugin({
      options: {
        // Specify here what spec bundles you want to test
        // Note: This is not implemented yet.  It is currently
        //       hard coded to "spec.bundle.js"
        specs: ["spec.bundle.js"]
      }
    });
  ]
};
```

## Why would I use webpack for server side development?

Normally, if you are just running you code in node,
it makes sense to write the files and run them
directly.  However, if you are using a transpiler,
this causes some problems.  You need to transpile
all of your code to Javascript before you can
run tests with Jasmine.  This can be a slow process
if you have a lot of code.  Webpack provides a convenient
way to plugin loaders to do transpilation (among other
things), and its watch mode allows you to only
process the modules that have changed.
This plugin allows you to take the output of webpack
and run the tests in jasmine with Node.

## Future directions

### Running the client code in Node

If you are using webpack to compile assets for the client
side, you might also find it beneficial to run the tests
in node (using something like jsdom to give you a DOM).
jasmine-runner-webpack-plugin will eventually allow
you to halt compilation if the tests fail.  Potentially
this can be used as a continuous deployment environment.
