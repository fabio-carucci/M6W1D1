import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ onContentChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Funzione per gestire i cambiamenti nell'editor
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const contentState = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    // Converti il contenuto in HTML e passalo al genitore
    const htmlContent = draftToHtml(rawContent);
    onContentChange(htmlContent);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="rich-text-editor-wrapper"
        editorClassName="rich-text-editor"
      />
    </div>
  );
};

export default RichTextEditor;