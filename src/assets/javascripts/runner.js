(function() {
  var Runner;
  Runner = (function() {
    function Runner(code) {
      this.code = code;
    }
    Runner.prototype.run = function() {
      var child_process;
      child_process = require("child_process");
      return child_process.spawn("/usr/bin/env ruby", ["/Users/ron/Developer/chromeless/examples/kidsruby/test.rb"]);
    };
    Runner.prototype.saveCode = function() {
      var fileName, tempDir;
      tempDir = "";
      fileName = "";
      return fileName;
    };
    Runner.prototype.buildCode = function(code) {
      var newCode;
      newCode = "";
      return newCode;
    };
    return Runner;
  })();
}).call(this);
