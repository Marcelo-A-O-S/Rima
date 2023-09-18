import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Style from './Header.module.css'
import ButtonTheme from "../ButtonTheme";
import AuthContext from "../../Context/AuthContext";
import ImgLogo from "../../Assets/LogoEmpresa 1.svg"
import imghome from "../../Assets/teenyicons_home-outline.svg"
import imgUser from "../../Assets/ph_user-light.svg"
import imgBtnFuncionarios from "../../Assets/la_users-cog.svg"
import imgAddFuncionarios from "../../Assets/tabler_users-plus.svg"
import { ThemeDarkContext } from "../../Context/ThemeContext";
export default function Header(){
    const { user } = useContext(AuthContext);
    const { themeCurrent } = useContext(ThemeDarkContext)
    const [ open, setOpen] = useState(false)
    return(<>
    <header className={`${Style.header} ${themeCurrent}`}>
        <nav className={Style.navigation}>
            <div className={Style.perfil}>
                <div className={`${Style.Hamburguer} ${open? Style.Open: ""}`} onClick={()=>setOpen(!open)}>
                        <span className={`${Style.line} ${Style.line1}`}/>
                        <span className={`${Style.line} ${Style.line2}`}/>
                        <span className={`${Style.line} ${Style.line3}`}/>
                </div>
                <div className={Style.menu_item}>
                    <img src={imgUser} alt="" className={Style.icon}/>
                    <p className={Style.user_name} >{user?.firstName}</p>
                </div>
            </div>
            <div className={Style.Logo} >
                <img  src={ImgLogo} alt="Rima" className={Style.Logo_img}/>
                <Link to='/Signed' className={Style.Logo_title} >Rima</Link>
            </div>
            <ul className={`${Style.Menu} ${ open === true? Style.Menu_dropdown: ""}`}>
                <div className={`${Style.Hamburguer} ${open? Style.Open: ""}`} onClick={()=>setOpen(!open)}>
                        <span className={`${Style.line} ${Style.line1}`}/>
                        <span className={`${Style.line} ${Style.line2}`}/>
                        <span className={`${Style.line} ${Style.line3}`}/>
                </div>
                <li className={Style.menu_item}>
                    <div className={Style.menu_item}>
                        <img className={Style.icon} src={imghome} alt="Home"/>
                        <Link to='/Signed/dashboard' className={Style.link_name} >Principal</Link>
                    </div>
                </li>
                <li className={Style.menu_item}>
                    <div className={Style.menu_item}>
                        <img className={Style.icon} src={imgBtnFuncionarios} alt="Funcionários"/>
                        <button className={`${Style.button_dropdown} ${Style.link_name}`}>Funcionários</button>
                    </div>
                </li>
                <li className={Style.dropdown}>
                    <div className={Style.item_dropdown}>
                        <img className={Style.icon} src={imgAddFuncionarios} alt="Funcionários"/>
                        <Link to='/Signed/funcionario/create' className={Style.link_name} >Adicionar Funcionário</Link>
                    </div>
                    <div className={Style.item_dropdown}>
                        <img className={Style.icon} src={imgAddFuncionarios} alt="Funcionários"/>
                        <Link to='/Signed/funcionario' className={Style.link_name} >Adicionar Funcionário</Link>
                    </div>
                </li>
                <li className={Style.menu_item}>
                    <div>
                        <Link to='/Signed/about' className={Style.link_name} >Equipamentos</Link>
                    </div>
                </li>
                <li className={Style.menu_item}><ButtonTheme/></li>
            </ul>

        </nav>
    </header>
    </>)
}
