import { useContext } from "react"
import Style from "./BellOption.module.css"
import { BellContext } from "../../../../Context/BellContext"


export default function BellOption(){
    const { onChange, state} = useContext(BellContext);
    return(
        <div className={Style.main}>
            <img src={""} alt={""}/>
        </div>
    )
}
