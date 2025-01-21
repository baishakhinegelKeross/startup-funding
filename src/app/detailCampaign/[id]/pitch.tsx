'use client'

import ReactDOM from 'react-dom/client';
//import SlateEditor from "./slate_editor";
import TextEditor from './text_editor';

const drag = function(event: DragEvent | React.DragEvent<HTMLDivElement>) {
    console.log('dragged id: ', (event.target as HTMLDivElement).id);

    if (event.dataTransfer) {
        event.dataTransfer.setData("text", (event.target as HTMLDivElement).id);
      } else {
        console.error("dataTransfer is null.");
      }
}

const allowDrop = function(event: React.DragEvent<HTMLDivElement>){
    event.preventDefault();
}

const drop = function(event: React.DragEvent<HTMLDivElement>){
    event.preventDefault();
    debugger;
     
    const addTextNode = function(clonedElement: HTMLElement){
        // Create a container for the SlateEditor inside the cloned element
        const editorContainer = document.createElement('div');
        editorContainer.style.width = '100%';
        editorContainer.style.height = '100%';
        editorContainer.style.border = '1px solid black';
        //editorContainer.style.padding = '10px';
        //editorContainer.style.marginTop = '10px';

        // Append the container to the cloned element
        clonedElement.appendChild(editorContainer);

        // Render the SlateEditor component into the editor container
        const root = ReactDOM.createRoot(editorContainer); // Use ReactDOM.render(editorContainer, <SlateEditor />) for React 17
        //root.render(<SlateEditor />);
        root.render(<TextEditor />);
    }

    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const itemType = draggedElement?.dataset.type;

    if(draggedElement){
        const clonedElement = draggedElement.cloneNode(true) as HTMLElement;

        clonedElement.innerHTML = '';
        clonedElement.addEventListener('dragstart', (event) => drag(event));
        clonedElement.id = `cloned-${Date.now()}`; // Ensure unique ID for cloned elements

        (event.target as HTMLDivElement).appendChild(clonedElement);

        switch(itemType){
            case 'TXT':
                addTextNode(clonedElement);
                break;
        }
    }
}

const dropToTrash = function(event: React.DragEvent<HTMLDivElement>){
    event.preventDefault();
    //debugger;

    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    if(draggedElement){
        console.log("Dropped ", data);

        // Check if the dragged element is inside the pitchDeck
        const pitchDeck = document.getElementById("pitchDeck");

        if (pitchDeck && pitchDeck.contains(draggedElement)) {
            pitchDeck.removeChild(draggedElement); // Remove the element from pitchDeck
        }
    }
}

const PITCH = () => {

    return (
        <div>
            <div className="bg-black grid grid-cols-2">
                {/* Drop deck */}
                <div id="pitchDeck" className="border border-white me-2" onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}></div>
                
                {/* Draggable items */}
                <div className="border border-white p-2">
                    <div id="drag1" data-type="TXT" className="border border-white p-2 mb-2" draggable onDragStart={(event => drag(event))}>Text</div>
                    <div id="drag2" className="border border-white p-2 mb-2" draggable onDragStart={(event => drag(event))}>Img</div>
                    <div id="drag3" className="border border-white p-2 mb-2" draggable onDragStart={(event => drag(event))}>List</div>
                    <div id="drag4" className="border border-white p-2 mb-4" draggable onDragStart={(event => drag(event))}>Youtube</div>
                    <div id="trash" className="border border-white p-2 h-40" onDragOver={(event) => allowDrop(event)} onDrop={(event) => dropToTrash(event)}>Trash</div>
                </div>
            </div>
        </div>
        
    )
}

export default PITCH;