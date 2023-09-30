interface IColumnValue{
    value:any
}
export default function ColumnValue(props:IColumnValue){
    return(
        <td>{props.value}</td>
    )
}
