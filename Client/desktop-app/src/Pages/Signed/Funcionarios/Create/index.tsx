import { ThemeDarkContext } from "../../../../Context/ThemeContext"
import {useContext} from 'react'
import Style from './Create.module.css'

export default function RegisterEmployee(){
    const { themeCurrent } = useContext(ThemeDarkContext)
    return(
        <main className={`${Style.main} ${themeCurrent}`}>
            <form className={Style.form}>
                <li>
                    <label htmlFor="">Nome</label>
                    <input type="text" name="" id="" />
                </li>
                <li>
                    <label htmlFor="">Sobrenome</label>
                    <input type="text" name="" id="" />
                </li>
            </form>
        </main>
    )
}
