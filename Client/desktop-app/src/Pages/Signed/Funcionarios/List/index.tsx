import { useContext } from "react"
import { ThemeDarkContext } from "../../../../Context/ThemeContext"


export default function ListEmployee(){
    const { themeCurrent } = useContext(ThemeDarkContext);
    return(
    <main className={themeCurrent}>
    </main>
    )
}
