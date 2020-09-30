import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
import './RichTextField.css'

export const RichTextField = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor()
  }, []);

  return (
    <div onClick={focusEditor}>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
      />
    </div>
  );
}
