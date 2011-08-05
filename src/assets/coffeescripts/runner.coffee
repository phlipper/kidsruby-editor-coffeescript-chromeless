class Runner
  constructor: (@code) ->

  run: ->
    child_process = require("child_process")
    child_process.spawn("/usr/bin/env ruby", ["/Users/ron/Developer/chromeless/examples/kidsruby/test.rb"])

  saveCode: ->
    tempDir  = ""
    fileName = ""
    # file.write @buildCode(@code)
    fileName

  buildCode: (code) ->
    newCode = ""
    newCode
