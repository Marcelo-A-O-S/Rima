import Style from './Notifications.module.css'
import { ThemeDarkContext } from '../../Context/ThemeContext';
import { useContext } from 'react';

export default function Notifications(){
    const {themeCurrent } = useContext(ThemeDarkContext);
    return(
        <div className={`${themeCurrent} ${Style.notification}`}>
            <label htmlFor="">Teste</label>
        </div>
    )
}
