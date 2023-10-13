import Select from "react-select"
import AsyncSelect  from "react-select/async"
import Style from "./MultiSelect.module.css"
interface IMultiSelect{
    name:string,
    placeholder:string,
    options?:any[],
    value?:any,
    isMulti: boolean,
    onChange?(newValue:any): void,
    loadOptions?():Promise<any[]>
}

export default function MultiSelect(props: IMultiSelect){

    return(
        <div className={Style.main}>
            <label htmlFor={props.name}>{props.name}</label>
            <Select
            className={Style.select}
            placeholder={props.placeholder}
            options={props.options}
            id={props.name}
            value={props.value}
            onChange={(value) => {
                if(props.onChange !== undefined){
                    props.onChange(value)
                }
            }}
            isMulti ={props.isMulti}/>
        </div>
    )
}
