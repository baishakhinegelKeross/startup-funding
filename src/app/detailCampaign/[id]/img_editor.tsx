"use client"
import Classes from './page.module.css';
import { ImgEditorProps } from './types';

const ImgEditor: React.FC<ImgEditorProps> = ({id, cache}) => {

    /*

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

    */


    return(
        <div className="relative">
            <div id={`imgOutputDiv-${id}`} className={`${Classes.img_output} hidden`}>
                <div className={`${Classes.edit_txt} absolute top-[20%] right-0`}>
                    <span className='p-2' onClick={()=>{ showImgEditor(id) }}>
                        Edit
                    </span>
                </div>
                <p id={`imgOutput-${id}`}>
                </p>
            </div>
            <div id={`imgInputDiv-${id}`}>
                <div className="imgTools p-2 bg-[#9e9e9e]">
                    <button type='button' className={Classes.tool_button}>Save</button>
                </div>
                <input type="file" id={`imgContent-${id}`} />
            </div>
        </div>
    )
}

const showImgEditor = function(uuid: string){

    console.log(uuid);
}



export default ImgEditor;