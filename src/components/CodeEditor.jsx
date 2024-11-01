import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; // Example style, you can use another

function CodeEditor({ text, setText }) {
    
  return (
        text.length > 0 &&
        <Editor
        value={text}
        onValueChange={(text) => setText(text)}
        highlight={(text) => Prism.highlight(text, Prism.languages.javascript, 'javascript')}
        padding={10}
        style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
        }}
        />
    );
}

export default CodeEditor;
