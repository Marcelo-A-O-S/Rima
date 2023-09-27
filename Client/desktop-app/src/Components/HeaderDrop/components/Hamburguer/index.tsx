import Style from './Hamburguer.module.css';
import { HamburguerContext } from '../../../../Context/HamburguerContext';
import { useContext } from 'react';


export default function Hamburguer(){
    const { onChange, state } = useContext(HamburguerContext);
    return(
        <div className={Style.main}>
            <input className={Style.input} type="checkbox" name="" id="check" />
            <label className={Style.hamburguer} htmlFor="check" onClick={()=>onChange(!state)}>
                <span className={Style.line}></span>
                <span className={Style.line}></span>
                <span className={Style.line}></span>
            </label>
        </div>
    )
}
