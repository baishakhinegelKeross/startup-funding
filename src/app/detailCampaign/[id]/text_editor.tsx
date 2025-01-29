"use client"
import Classes from './page.module.css';
import { TextEditorProps } from './types';

type EditorCacheType = { 
    [key: string]: HTMLInputElement 
};

let cacheTxtEd : EditorCacheType;

// type EditorCacheType = { 
//     [key: number]: HTMLInputElement 
// };

// const editorCache: EditorCacheType = {};

const TextEditor: React.FC<TextEditorProps> = ({id, cache}) => {
    cacheTxtEd = cache;

    return (
        <div className='relative'>
            <div id={`textOutputDiv-${id}`} className={`${Classes.txt_output} hidden`}>
                <div className={`${Classes.edit_txt} absolute top-[20%] right-0`}>
                    <span className='p-2' onClick={()=>{ showTextEditor(id) }}>
                        Edit
                    </span>
                </div>
                <p id={`textOutput-${id}`}>
                </p>
            </div>
            <div id={`textInputDiv-${id}`}>
                <div className="textTools p-2 bg-[#9e9e9e]">
                    <button type="button" className={Classes.tool_button} onClick={()=>{ increaseFontSize(id) }}>Aa+</button>
                    <button type="button" className={Classes.tool_button} onClick={()=>{ decreaseFontSize(id) }}>Aa-</button>
                    <button type='button' className={Classes.tool_button} onClick={()=>{ save(id) }}>Save</button>
                </div>
                <input type='text' id={`textContent-${id}`} className={Classes["text_content-2"]} placeholder={'Type something...'} />
            </div>
        </div>
    )
}

const showTextEditor = function(uuid: string){
    debugger;
    const textEditor = cacheTxtEd[uuid];

    if (textEditor) {
        const outputDiv = document.getElementById(`textOutputDiv-${uuid}`)
        const inputDiv = document.getElementById(`textInputDiv-${uuid}`);

        inputDiv?.classList.remove('hidden');
        outputDiv?.classList.add('hidden');
    }
}

const increaseFontSize = function(uuid: string){
    let textEditor: HTMLInputElement | null;
    
    if(!cacheTxtEd[uuid]){
        textEditor = document.getElementById(`textContent-${uuid}`) as HTMLInputElement;
        cacheTxtEd[uuid] = textEditor;
    }
    else{
        textEditor = cacheTxtEd[uuid];
    }

    if (textEditor) {
        // Get the current font size
        const currentFontSize = window.getComputedStyle(textEditor).fontSize;

        // Parse the font size as a number and add 1
        const newFontSize = parseFloat(currentFontSize) + 1;

        // Apply the new font size
        textEditor.style.fontSize = `${newFontSize}px`;
    }
}

const decreaseFontSize = function(uuid: string){
    let textEditor: HTMLInputElement | null;
    
    if(!cacheTxtEd[uuid]){
        textEditor = document.getElementById(`textContent-${uuid}`) as HTMLInputElement;
        cacheTxtEd[uuid] = textEditor;
    }
    else{
        textEditor = cacheTxtEd[uuid];
    }

    if (textEditor) {
        // Get the current font size
        const currentFontSize = window.getComputedStyle(textEditor).fontSize;

        // Parse the font size as a number and subtract 1
        const newFontSize = parseFloat(currentFontSize) - 1;

        // Apply the new font size
        textEditor.style.fontSize = `${newFontSize}px`;
    }
}

const save = function(uuid: string){
    debugger;
    let textEditor: HTMLInputElement | null;
    
    if(!cacheTxtEd[uuid]){
        textEditor = document.getElementById(`textContent-${uuid}`) as HTMLInputElement;
        cacheTxtEd[uuid] = textEditor;
    }
    else{
        textEditor = cacheTxtEd[uuid];
    }

    if(textEditor){
        const outputDiv = document.getElementById(`textOutputDiv-${uuid}`)
        const inputDiv = document.getElementById(`textInputDiv-${uuid}`);
        const output = document.getElementById(`textOutput-${uuid}`);

        if(output){
            output.innerText = textEditor.value;

            // Iterate through only the required styles and apply them to the target element
            const requiredStyles = ['font-size', 'color'];

            // Get all computed styles of the source element
            const computedStyles = window.getComputedStyle(textEditor);

            // Iterate through all the styles and apply them to the target element
            //for (const property of Array.from(computedStyles)) {
                //output.style.setProperty(property, computedStyles.getPropertyValue(property));

                requiredStyles.forEach((property) => {
                    output.style.setProperty(property, computedStyles.getPropertyValue(property));
                });
            //}

            outputDiv?.classList.remove('hidden');
            inputDiv?.classList.add('hidden');
        }
    }
}

export default TextEditor;