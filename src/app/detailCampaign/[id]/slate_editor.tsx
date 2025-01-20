// Import React dependencies.
import React, { useState, useCallback, JSX } from 'react';
// Import the Slate editor factory.
import { createEditor, Transforms, Text, Editor, BaseEditor } from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

// Define custom types for elements and text
type CustomElement = 
  | { type: 'paragraph'; children: CustomText[] }
  | { type: 'heading'; level: number; children: CustomText[] };
type CustomText = { text: string; bold?: boolean; italic?: boolean };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Initial value for the editor
const initialValue: CustomElement[] = [
    {
        type: 'heading',
        level: 1,
        children: [{ text: 'Heading 1 Example' }],
    },
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    }
];

// Function to toggle formatting (bold, italic, etc.)
function toggleFormat(editor: ReactEditor, format: keyof CustomText) {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? undefined : true },
    { match: Text.isText, split: true }
  );
}

// Check if a format is active
function isFormatActive(editor: ReactEditor, format: keyof CustomText) {
    const [match] = Array.from(
      Editor.nodes(editor, {
        match: (node) => Text.isText(node) && node[format] === true,
        mode: 'all',
      })
    );
    return !!match;
  }
  

const SlateEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: RenderElementProps) => {
    const { attributes, children, element } = props;

    // Type guard to check if the element is a heading
    const isHeadingElement = (
      elem: CustomElement
    ): elem is { type: 'heading'; level: number; children: CustomText[] } => {
      return elem.type === 'heading' && typeof elem.level === 'number' && Array.isArray(elem.children);
    };

    if (isHeadingElement(element)) {
      // Dynamically assign the heading tag and cast it to string for JSX compatibility
      const Tag = `h${element.level}` as keyof JSX.IntrinsicElements;

      if (typeof Tag === 'string') {
        return React.createElement(Tag, attributes, children);
      }
    }

    // Default to rendering a paragraph
    return <p {...attributes}>{children}</p>;
}, []);




  const renderLeaf = useCallback((props: RenderLeafProps) => {
    let { children } = props;
    if (props.leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (props.leaf.italic) {
      children = <em>{children}</em>;
    }
    return <span {...props.attributes}>{children}</span>;
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case 'b': {
          event.preventDefault();
          toggleFormat(editor, 'bold');
          break;
        }
        case 'i': {
          event.preventDefault();
          toggleFormat(editor, 'italic');
          break;
        }
      }
    }
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
      />
    </Slate>
  );
};

export default SlateEditor;
