(function() {
  window.Runner = (function() {
    function Runner(code) {
      this.code = code;
    }
    Runner.prototype.run = function() {
      var p, subprocess;
      subprocess = require("vendor/jetpack-subprocess/lib/subprocess");
      return p = subprocess.call({
        command: 'echo',
        arguments: ['$@', '$ENV_TEST'],
        environment: ['ENV_TEST=OK'],
        stdin: subprocess.WritablePipe(function() {
          this.write("stdin");
          return this.close();
        }),
        stdout: subprocess.ReadablePipe(function(data) {}),
        stderr: subprocess.ReadablePipe(function(data) {}),
        onFinished: subprocess.Terminate(function() {}),
        mergeStderr: false
      });
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
