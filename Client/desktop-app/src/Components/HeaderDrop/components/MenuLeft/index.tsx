import Hamburguer from "../Hamburguer"
import Style from './MenuLeft.module.css'
import Logo from "../Logo"
export default function MenuLeft(){
    return(
        <div className={Style.main}>
            <Hamburguer
            />
            <Logo/>
        </div>
    )
}
