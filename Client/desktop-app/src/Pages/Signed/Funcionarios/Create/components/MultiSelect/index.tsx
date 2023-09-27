import Select from "react-select"
import AsyncSelect  from "react-select/async"
import Style from "./MultiSelect.module.css"
interface IMultiSelect{
    name:string,
    placeholder:string
}

export default function MultiSelect(props: IMultiSelect){
    return(
        <div className={Style.main}>
            <label htmlFor={props.name}>{props.name}</label>
            <AsyncSelect
            className={Style.select}
            placeholder={props.placeholder}
            id={props.name}/>
        </div>
    )
}
