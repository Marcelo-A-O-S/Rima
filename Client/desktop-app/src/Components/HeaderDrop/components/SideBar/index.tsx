import Style from './SideBar.module.css'
import { ReactNode, useContext } from 'react'
import { HamburguerContext } from "../../../../Context/HamburguerContext";
interface ISideBar{
    children:ReactNode
}
export default function SideBar(props:ISideBar){
    const {state} = useContext(HamburguerContext);
    return(
    <div className={`${Style.sidebar} ${state?Style.activate:""}`}>
        {props.children}
    </div>
    )
}
