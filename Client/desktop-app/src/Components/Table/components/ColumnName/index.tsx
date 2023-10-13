import Style from './ColumnName.module.css'
interface IColumn{
    name:String
}

export default function ColumnName(props: IColumn){
    return(
        <td className={Style.main}>{props.name}</td>
    )
}
