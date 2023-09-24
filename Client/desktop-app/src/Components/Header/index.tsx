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
import imglistFuncionarios from "../../Assets/ph_users.svg"
import { ThemeDarkContext } from "../../Context/ThemeContext";
import imgBtnEquipamentos from "../../Assets/duasengrenagens.svg";
import imgBtnConfiguration from "../../Assets/configuration.svg"
export default function Header(){
    const { user } = useContext(AuthContext);
    const { themeCurrent } = useContext(ThemeDarkContext);
    const [ openDrop, setOpenDrop] = useState(false);
    const [ openFuncionarios, setOpenFuncionarios] = useState(false);
    const [ openEquipamentos, setOpenEquipamentos] = useState(false);

    return(<>
    <header className={`${Style.header} ${themeCurrent}`}>
        <nav className={Style.navigation}>
            <div className={Style.menu}>
                <div className={Style.hamburguer}>
                    <input type="checkbox" id="check" onChangeCapture={()=>{setOpenDrop(!openDrop)}}/>
                    <label className={Style.check} htmlFor="check">
                        <span className={`${Style.line} ${openDrop?Style.burguer1:""}`}/>
                        <span className={`${Style.line} ${openDrop?Style.burguer2:""}`}/>
                        <span className={`${Style.line} ${openDrop?Style.burguer3:""}`}/>
                    </label>
                </div>
                <div>
                    <img src={ImgLogo} alt="" className={Style.logo}/>
                </div>
            </div>
            <div className={`${Style.menu_drop} ${openDrop?Style.open:""}`}>
                <ul className={Style.itens_menu_drop}>
                    <li className={Style.item_menu_drop}>
                        <Link className={Style.link} to="">
                            <img className={Style.icon}  src={imghome} alt="" />
                            <span className={Style.textlink}>Home</span>
                        </Link>
                    </li>
                    <li className={Style.item_menu_drop}>
                        <label  className={Style.link}  onClick={()=>{ setOpenFuncionarios(!openFuncionarios)}}>
                            <img className={Style.icon} src={imgBtnFuncionarios} alt="" />
                            <span className={Style.textlink}> Funcionarios</span>
                        </label>
                        <div className={`${Style.list_item} ${openFuncionarios?Style.open:""}`}>
                        <Link  className={Style.link} to="funcionarios/create">
                            <img className={Style.icon} src={imgAddFuncionarios} alt="" />
                            <span  className={Style.textlink}> Registrar Funcionarios</span>
                        </Link>
                        <Link  className={Style.link} to="funcionarios">
                            <img className={Style.icon} src={imglistFuncionarios} alt="" />
                            <span  className={Style.textlink}> Listar Funcionarios</span>
                        </Link>
                        </div>
                    </li>
                    <li className={Style.item_menu_drop}>
                        <label className={Style.link}  onClick={()=>{ setOpenEquipamentos(!openEquipamentos)}}>
                            <img className={Style.icon}  src={imgBtnEquipamentos} alt="" />
                            <span className={Style.textlink}>Equipamentos</span>
                        </label>
                        <div className={`${Style.list_item} ${openEquipamentos?Style.open:""}`}>
                        <Link  className={Style.link} to="">
                            <img className={Style.icon} src={imgAddFuncionarios} alt="" />
                            <span  className={Style.textlink}> Registrar Equipamento</span>
                        </Link>
                        <Link  className={Style.link} to="">
                            <img className={Style.icon} src={imglistFuncionarios} alt="" />
                            <span  className={Style.textlink}> Listar Equipamentos</span>
                        </Link>
                        </div>
                    </li>
                    <li className={Style.item_menu_drop}>
                        <Link className={Style.link} to="configuration">
                            <img className={Style.icon}  src={imgBtnConfiguration} alt="" />
                            <span className={Style.textlink}>Configurações</span>
                        </Link>
                    </li>
                    <li className={Style.item_menu_drop}>
                        <ButtonTheme/>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    </>)
}
