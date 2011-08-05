# var server = new KidsRubyServer();
# server.start();

selectTab = (id) -> ($ "#tabs").tabs("select", id) unless ($ "#tabs").tabs("option", "selected") is id


deleteLastStdIn = ->
  str = ($ "#stdin").html()
  newStr = str.substring 0, str.length-1
  ($ "#stdin").html newStr

updateStdIn = (newHtml) ->
  if not ($ "#stdin").length
    updateStdOut "<div id='stdin'></div>"
  ($ "#stdin").append newHtml

cutStdInToStdOut = ->
  copyStdIntoStdOut()
  removeStdIn()

removeStdIn = -> ($ "#stdin").remove()

copyStdIntoStdOut = -> ($ "#stdout").append ($ "#stdin").html()

updateStdOut = (newHtml) -> ($ "#stdout").append unescape(newHtml)

updateStdErr = (newHtml) -> ($ "#stderr").append unescape(newHtml)

clearOutputs = -> ($ "#stdout, #stderr").html ""

submitRubyCode = (editor) ->
  ruby = editor.getCode()
  new window.Runner(ruby).run()


getEditor = ->
  ($ "#rubycode").data "editor"

clearCode = ->
  getEditor().setCode ""

addCode = (code) ->
  getEditor().setCode getEditor().getCode() + "\n" + code

initTurtle = ->
  turtle = new Pen("turtle-canvas")
  turtle.center()
  ($ "#turtle").data "turtle", turtle
  selectTab(2)

callTurtle = (arguments) ->
  turtle = ($ "#turtle").data "turtle"
  command = Array::shift.call arguments
  turtle[command].apply turtle, arguments

getTurtle = ->
  ($ "#turtle").data "turtle"

setTurtleBackground = (color) ->
  ($ "#turtle").css "backgroundColor", unescape(color)


jQuery ->
  docWidth = ($ "body").width()
  docHeight = ($ document).height()

  # ($ "#rubycode").data "editor", editor

  # Set the output width
  ($ "#output").width = docWidth

  tabs = ($ "#tabs").tabs()
  ($ "#tabs").data "mytabs", tabs

  ($ "#run").click (e) ->
    selectTab(1)
    clearOutputs()
    # submitRubyCode(editor)

  # ($ "#open").click (e) -> openRubyCode editor

  # ($ "#save").click (e) -> saveRubyCode editor

  # initTurtle()

  # initServer()

  selectTab(0)  # default to help tab
