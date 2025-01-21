import Classes from './page.module.css';
import { KeyPointsProps } from './types';

const KeyPoints : React.FC<KeyPointsProps> = ({desc})=>{
    return(
        <div className={Classes.key_point}>
            <p>{desc}</p>
        </div>
    )
}

export default KeyPoints;