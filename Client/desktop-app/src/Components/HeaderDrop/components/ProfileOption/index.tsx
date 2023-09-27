import { useContext } from "react"
import AuthContext from "../../../../Context/AuthContext"
import Style from './ProfileOption.module.css'



export default function ProfileOption(){
    const {user} = useContext(AuthContext)
    return(
        <div className={Style.main}>
            <label>{user?.firstName}</label>
            <label htmlFor="">{user?.lastName}</label>
        </div>
    )
}
