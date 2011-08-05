(function() {
  const ui = require("ui");  var currentFile, editor, editorSession, file, menu, openFile, saveFile;
  menu = require("menu");
  editor = null;
  editorSession = null;
  currentFile = null;
  saveFile = function() {
    var data, fp, stream;
    data = editorSession.getValue();
    if (!currentFile) {
      const filePicker = require('file-picker');
      fp = filePicker.FilePicker("New file", "save");
      fp.show(function(x) {
        if (x != null) {
          return currentFile = x;
        } else {
          return console.log("user selected nothing! (canceled dialog)");
        }
      });
      console.log("file = " + currentFile);
      stream = require("file").open(currentFile, "w");
      try {
        return stream.write(data);
      } finally {
        stream.close();
      }
    }
  };
  openFile = function() {
    const filePicker = require("file-picker");    var fp, i, stringData, _ref, _results;
    fp = filePicker.FilePicker();
    fp.title = "Hi!  Pick some files!";
    fp.mode = "multiple";
    fp.show(function(x) {
      if (!x) {
        return null;
      }
    });
    console.log("you picked " + x.length + " files");
    _results = [];
    for (i = 1, _ref = x.length; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
      currentFile = "" + x[i];
      stringData = require("file").read(currentFile);
      _results.push(editorSession.setValue(stringData));
    }
    return _results;
  };
  file = menu.Menu({
    parent: ui.getMenu(),
    label: "File",
    children: [
      menu.Menu({
        label: "Open File",
        hotkey: "accel-o",
        onClick: function(e) {
          return openFile();
        }
      }), menu.Menu({
        label: "Save",
        hotkey: "accel-s",
        onClick: function(e) {
          return saveFile();
        }
      })
    ]
  });
}).call(this);
