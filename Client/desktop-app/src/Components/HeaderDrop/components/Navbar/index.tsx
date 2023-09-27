import {ReactNode} from 'react'
import Style from './Navbar.module.css'
interface INavbar{
    children: ReactNode
}

export default function Navbar(props:INavbar){
    return(
    <nav className={Style.nav}>
        {props.children}
    </nav>)
}
