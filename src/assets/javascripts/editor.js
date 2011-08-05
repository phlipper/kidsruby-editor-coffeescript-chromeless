(function() {
  var addCode, callTurtle, clearCode, clearOutputs, copyStdIntoStdOut, cutStdInToStdOut, deleteLastStdIn, getEditor, getTurtle, initServer, initTurtle, openRubyCode, removeStdIn, saveRubyCode, selectTab, setTurtleBackground, submitRubyCode, updateStdErr, updateStdIn, updateStdOut;
  selectTab = function(id) {
    if (($("#tabs")).data("mytabs").tabs("option", "selected") !== id) {
      return ($("#tabs")).data("mytabs").tabs("select", id);
    }
  };
  deleteLastStdIn = function() {
    var newStr, str;
    str = ($("#stdin")).html();
    newStr = str.substring(0, str.length - 1);
    return ($("#stdin")).html(newStr);
  };
  updateStdIn = function(newHtml) {
    if (!($("#stdin")).length) {
      updateStdOut("<div id='stdin'></div>");
    }
    return ($("#stdin")).append(newHtml);
  };
  cutStdInToStdOut = function() {
    copyStdIntoStdOut();
    return removeStdIn();
  };
  removeStdIn = function() {
    return ($("#stdin")).remove();
  };
  copyStdIntoStdOut = function() {
    return ($("#stdout")).append(($("#stdin")).html());
  };
  updateStdOut = function(newHtml) {
    return ($("#stdout")).append(unescape(newHtml));
  };
  updateStdErr = function(newHtml) {
    return ($("#stderr")).append(unescape(newHtml));
  };
  clearOutputs = function() {
    return $.each(["stdout", "stderr"], function(i, item) {
      return ($("#" + item)).html("");
    });
  };
  submitRubyCode = function(editor) {
    var ruby;
    ruby = editor.getCode();
    return new Runner(ruby).run();
  };
  openRubyCode = function() {};
  saveRubyCode = function(editor) {};
  getEditor = function() {
    return ($("#rubycode")).data("editor");
  };
  clearCode = function() {
    return getEditor().setCode("");
  };
  addCode = function(code) {
    return getEditor().setCode(getEditor().getCode() + "\n" + code);
  };
  initTurtle = function() {
    var turtle;
    turtle = new Pen("turtle-canvas");
    turtle.center();
    ($("#turtle")).data("turtle", turtle);
    return selectTab(2);
  };
  callTurtle = function(arguments) {
    var command, turtle;
    turtle = ($("#turtle")).data("turtle");
    command = Array.prototype.shift.call(arguments);
    return turtle[command].apply(turtle, arguments);
  };
  getTurtle = function() {
    return ($("#turtle")).data("turtle");
  };
  setTurtleBackground = function(color) {
    return ($("#turtle")).css("backgroundColor", unescape(color));
  };
  initServer = function() {};
  jQuery(function() {
    var codemirror_options, docHeight, docWidth, editor, tabs;
    docWidth = ($("body")).width();
    docHeight = ($(document)).height();
    CodeMirrorConfig.stylesheet = "lib/assets/stylesheets/rubycolors.css";
    codemirror_options = {
      parserfile: ["../../js/tokenizeruby.js", "../../js/parseruby.js"],
      path: "codemirror/js/",
      lineNumbers: true,
      textWrapping: false,
      indentUnit: 2,
      tabMode: "indent",
      content: ($("#rubycode")).val(),
      parserConfig: {},
      width: docWidth,
      height: "95%",
      iframeClass: "editor-window",
      autoMatchParens: true
    };
    editor = CodeMirror.fromTextArea("rubycode", codemirror_options);
    ($("#rubycode")).data("editor", editor);
    ($("#output")).width = docWidth;
    tabs = ($("#tabs")).tabs();
    ($("#tabs")).data("mytabs", tabs);
    ($("#run")).click(function(e) {
      selectTab(1);
      clearOutputs();
      return submitRubyCode(editor);
    });
    ($("#open")).click(function(e) {
      return openRubyCode(editor);
    });
    ($("#save")).click(function(e) {
      return saveRubyCode(editor);
    });
    initTurtle();
    initServer();
    return selectTab(0);
  });
}).call(this);
