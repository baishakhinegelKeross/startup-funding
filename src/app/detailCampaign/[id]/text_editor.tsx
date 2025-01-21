"use client"
import Classes from './page.module.css';

const uuid = Date.now();

type EditorCacheType = { 
    [key: number]: HTMLInputElement 
};

const editorCache: EditorCacheType = {};

const TextEditor = () => {
    return (
        <div>
            <div id={`textInputDiv-${uuid}`}>
                <div className="textTools p-2 bg-[#9e9e9e]">
                    <button type="button" className={Classes.tool_button} onClick={increaseFontSize}>Aa+</button>
                    <button type="button" className={Classes.tool_button} onClick={decreaseFontSize}>Aa-</button>
                    <button type='button' className={Classes.tool_button} onClick={save}>Save</button>
                </div>
                <input type='text' id={`textContent-${uuid}`} className={Classes.text_content} placeholder={'Type something...'} />
            </div>
            <div id={`textOutputDiv-${uuid}`} className='hidden'>
                <p id={`textOutput-${uuid}`}>
                </p>
            </div>
            
        </div>
    )
}

const increaseFontSize = function(){
    let textEditor: HTMLInputElement | null;
    
    if(!editorCache[uuid]){
        textEditor = document.getElementById(`textContent-${uuid}`) as HTMLInputElement;
        editorCache[uuid] = textEditor;
    }
    else{
        textEditor = editorCache[uuid];
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

const decreaseFontSize = function(){
    let textEditor: HTMLInputElement | null;
    
    if(!editorCache[uuid]){
        textEditor = document.getElementById(`textContent-${uuid}`) as HTMLInputElement;
        editorCache[uuid] = textEditor;
    }
    else{
        textEditor = editorCache[uuid];
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

const save = function(){
    debugger;
    let textEditor: HTMLInputElement | null;
    
    if(!editorCache[uuid]){
        textEditor = document.getElementById(`textContent-${uuid}`) as HTMLInputElement;
        editorCache[uuid] = textEditor;
    }
    else{
        textEditor = editorCache[uuid];
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