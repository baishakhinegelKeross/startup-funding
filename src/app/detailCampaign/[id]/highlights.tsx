import Classes from './page.module.css';
import { HighlightsProps } from './types';

const Highlights: React.FC<HighlightsProps> = ({title, desc})=>{
    return(
        <div>
            <div className={Classes.highlight_card}>
                <h3 className={Classes.h3}>{title}</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default Highlights;