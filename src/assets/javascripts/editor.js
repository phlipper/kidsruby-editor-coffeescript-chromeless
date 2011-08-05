(function() {
  var addCode, callTurtle, clearCode, clearOutputs, copyStdIntoStdOut, cutStdInToStdOut, deleteLastStdIn, getEditor, getTurtle, initTurtle, removeStdIn, selectTab, setTurtleBackground, submitRubyCode, updateStdErr, updateStdIn, updateStdOut;
  selectTab = function(id) {
    if (($("#tabs")).tabs("option", "selected") !== id) {
      return ($("#tabs")).tabs("select", id);
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
    return ($("#stdout, #stderr")).html("");
  };
  submitRubyCode = function(editor) {
    var ruby;
    ruby = editor.getCode();
    return new window.Runner(ruby).run();
  };
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
  jQuery(function() {
    var docHeight, docWidth, tabs;
    docWidth = ($("body")).width();
    docHeight = ($(document)).height();
    ($("#output")).width = docWidth;
    tabs = ($("#tabs")).tabs();
    ($("#tabs")).data("mytabs", tabs);
    ($("#run")).click(function(e) {
      selectTab(1);
      return clearOutputs();
    });
    return selectTab(0);
  });
}).call(this);
