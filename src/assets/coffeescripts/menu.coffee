`const ui = require("ui")`
menu = require "menu"

editor = null
editorSession = null
currentFile = null

# window.onload = function() {
#     var JavaScriptMode = reqace("ace/mode/javascript").Mode;
#
#     editor = ace.edit("editor");
#     editor.setTheme("ace/theme/twilight");
#     editorSession = editor.getSession();
#     editorSession.setMode(new JavaScriptMode());
# };

# http://groups.google.com/group/ace-discuss/msg/3d10daf9bd019b3d
saveFile = ->
  data = editorSession.getValue()
  if not currentFile
    `const filePicker = require('file-picker')`
    fp = filePicker.FilePicker "New file", "save"
    fp.show (x) ->
      if x? then currentFile = x else console.log "user selected nothing! (canceled dialog)"

    console.log "file = #{currentFile}"
    stream = require("file").open currentFile, "w"
    try
      stream.write data
    finally
      stream.close()


openFile = ->
  `const filePicker = require("file-picker")`
  fp = filePicker.FilePicker()

  # Set the dialog title and selection mode
  fp.title = "Hi!  Pick some files!"
  fp.mode = "multiple"
  fp.show (x) ->
    # Check if the user selected nothing.
    return null if not x

  console.log "you picked #{x.length} files"

  for i in [1..x.length]
    currentFile = "" + x[i]
    stringData = require("file").read currentFile
    editorSession.setValue stringData


file = menu.Menu
  parent: ui.getMenu()
  label: "File"
  children: [
    menu.Menu
      label: "Open File"
      hotkey: "accel-o"
      onClick: (e) -> openFile()

    menu.Menu
      label: "Save"
      hotkey: "accel-s"
      onClick: (e) -> saveFile()
  ]
