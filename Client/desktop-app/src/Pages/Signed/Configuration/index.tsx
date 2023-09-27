import ButtonTheme from "../../../Components/ButtonTheme"
import Style from "./Configuration.module.css"
import { ThemeDarkContext } from "../../../Context/ThemeContext"
import AuthContext from "../../../Context/AuthContext"
import {useContext} from 'react'
export default function Configuration(){
    const { themeCurrent } = useContext(ThemeDarkContext);
    const { SignOut } = useContext(AuthContext);
    async function loggout() {
        await SignOut();
    }
    return(
        <main className={`${Style.main} ${themeCurrent}`}>
            <div className={Style.form}>
                <div className={Style.item_conf}>
                    <label htmlFor="">Alterar tema:</label>
                    <ButtonTheme/>
                </div>
                <div className={Style.item_conf}>
                    <label htmlFor="">Sair da sua conta? </label>
                    <button onClick={()=> loggout} className={Style.button}>Deslogar</button>
                </div>
            </div>
        </main>
    )
}
