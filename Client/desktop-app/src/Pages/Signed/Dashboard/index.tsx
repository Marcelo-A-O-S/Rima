import AuthContext from "../../../Context/AuthContext";
import { ThemeDarkContext } from "../../../Context/ThemeContext";
import { useContext } from "react";
import Style from './Dashboard.module.css'

export default function Dashboard(){
    const {themeCurrent } = useContext(ThemeDarkContext)
    const { user } = useContext(AuthContext)
    return(
    <main className={`${Style.main} ${themeCurrent}`}>
        <div >
            <h4 className={Style.title}>Olá {user?.roles[0].roleName}  {user?.firstName} {user?.lastName}!</h4>
        </div>
    </main>)
}
