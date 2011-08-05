class window.Runner
  constructor: (@code) ->

  run: ->
    # child_process = require("child_process")
    # child_process.spawn("/usr/bin/env ruby", ["/Users/ron/Developer/chromeless/examples/kidsruby/test.rb"])

    subprocess = require "vendor/jetpack-subprocess/lib/subprocess"
    p = subprocess.call {
      command: 'echo',

      # Print stdin and our env variable
      arguments:   ['$@', '$ENV_TEST'],
      environment: ['ENV_TEST=OK'],

      stdin: subprocess.WritablePipe ->
        this.write "stdin"
        this.close()

      stdout: subprocess.ReadablePipe (data) ->
        # data should be equal to: "stdin OK"

      stderr: subprocess.ReadablePipe (data) ->


      onFinished: subprocess.Terminate ->

      mergeStderr: false
    }
