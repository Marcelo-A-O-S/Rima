import ButtonTheme from "../../../Components/ButtonTheme"
import Style from "./Configuration.module.css"
import { ThemeDarkContext } from "../../../Context/ThemeContext"
import {useContext} from 'react'
export default function Configuration(){
    const { themeCurrent } = useContext(ThemeDarkContext);
    return(
        <main className={`${Style.main} ${themeCurrent}`}>
            <div className={Style.form}>
                <div className={Style.item_conf}>
                    <label htmlFor="">Alterar tema:</label>
                    <ButtonTheme/>
                </div>
                <div className={Style.item_conf}>
                    <label htmlFor="">Sair da sua conta? </label>
                    <button  className={Style.button}>Deslogar</button>
                </div>
            </div>
        </main>
    )
}
