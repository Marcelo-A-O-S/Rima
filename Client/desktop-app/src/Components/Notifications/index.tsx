import Style from './Notifications.module.css'
import { ThemeDarkContext } from '../../Context/ThemeContext';
import { useContext } from 'react';
import ItemNotification from './Components/ItemNotification';
import { BellContext } from '../../Context/BellContext';


export default function Notifications(){
    const {themeCurrent } = useContext(ThemeDarkContext);
    const { state } = useContext(BellContext);
    return(
        <div className={`${themeCurrent} ${Style.notification}`}>
            <ItemNotification
            message='Notificação da aplicação'/>
            <ItemNotification
            message='Notificação da aplicação'/>
        </div>
    )
}
