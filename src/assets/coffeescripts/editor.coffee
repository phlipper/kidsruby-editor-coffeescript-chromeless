# var server = new KidsRubyServer();
# server.start();

selectTab = (id) ->
  if ($ "#tabs").data("mytabs").tabs("option", "selected") != id
    ($ "#tabs").data("mytabs").tabs("select", id);

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

removeStdIn = ->
  ($ "#stdin").remove()

copyStdIntoStdOut = ->
  ($ "#stdout").append ($ "#stdin").html()

updateStdOut = (newHtml) ->
  ($ "#stdout").append unescape(newHtml)

updateStdErr = (newHtml) ->
  ($ "#stderr").append unescape(newHtml)

clearOutputs = ->
  $.each ["stdout", "stderr"], (i, item) ->
    ($ "#" + item).html ""

submitRubyCode = (editor) ->
  ruby = editor.getCode()
  new Runner(ruby).run()

openRubyCode = ->
  # todo: implement this using Titanium
  # QTApi['openRubyFile(QString)']("");

saveRubyCode = (editor) ->
  # todo: implement this using Titanium
  # var ruby = editor.getCode();
  # QTApi['saveRubyFile(QString)'](ruby);

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

initServer = ->
  # var server = new KidsRubyServer();
  # server.start();

jQuery ->
  docWidth = ($ "body").width()
  docHeight = ($ document).height()

  CodeMirrorConfig.stylesheet = "lib/assets/stylesheets/rubycolors.css";  # this will allow us to dynamically change style at runtime

  codemirror_options =
    parserfile: ["../../js/tokenizeruby.js", "../../js/parseruby.js"]
    path: "codemirror/js/"
    lineNumbers: true
    textWrapping: false
    indentUnit: 2
    tabMode: "indent"
    content: ($ "#rubycode").val()
    parserConfig: {},
    width: docWidth,
    height: "95%",
    iframeClass: "editor-window",
    autoMatchParens: true

  editor = CodeMirror.fromTextArea "rubycode", codemirror_options

  ($ "#rubycode").data "editor", editor

  # Set the output width
  ($ "#output").width = docWidth

  tabs = ($ "#tabs").tabs()
  ($ "#tabs").data "mytabs", tabs

  ($ "#run").click (e) ->
    selectTab(1)
    clearOutputs()
    submitRubyCode(editor)

  ($ "#open").click (e) -> openRubyCode editor

  ($ "#save").click (e) -> saveRubyCode editor

  initTurtle()

  initServer()

  selectTab(0)  # default to help tab
