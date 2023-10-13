import { useContext, useEffect, useState } from "react"
import { ThemeDarkContext } from "../../Context/ThemeContext"
import Hamburguer from "./components/Hamburguer"
import Navbar from "./components/Navbar"
import SideBar from "./components/SideBar"
import ListItem from "./components/ListItem"
import ItemMenu from "./components/ItemMenu"
import { IItemMenu } from "./components/ItemMenu"
import ImgHome from '../../Assets/teenyicons_home-outline.svg'
import ImgBtnFunc from '../../Assets/la_users-cog.svg'
import ImgAddFunc from '../../Assets/tabler_users-plus.svg'
import ImgListFunc from '../../Assets/ph_users.svg'
import ButtonTheme from "../ButtonTheme"
import ProfileOption from "./components/ProfileOption"
import MenuLeft from "./components/MenuLeft"
import ImgBtnConfig from "../../Assets/configuration.svg"
import ImgBtnEqui from "../../Assets/duasengrenagens.svg"
export default function HeaderDrop(){
    const {themeCurrent} = useContext(ThemeDarkContext)
    const [ openFunc, setOpenFunc ] = useState(false);
    const [ openEqui, setOpenEqui ] = useState(false);
    const itensMenu : IItemMenu[] = [
        {
            imgIcon: ImgHome,
            link:"",
            textlink:"Home",
            state:undefined,
            onChance:undefined,
            item:undefined
        },
        {
            imgIcon: ImgBtnFunc,
            link:"",
            textlink:"Funcionários",
            state:openFunc,
            onChance:setOpenFunc,
            item:[
                {
                    imgIcon: ImgAddFunc,
                    link:"funcionarios/create",
                    textlink:"Gerenciar Funcionários",
                    state:undefined,
                    onChance:undefined,
                    item:undefined
                },
                {
                    imgIcon: ImgListFunc,
                    link:"funcionarios/managerRole",
                    textlink:"Gerenciar Funções",
                    state:undefined,
                    onChance:undefined,
                    item:undefined
                }

            ]
        },
        {
            imgIcon: ImgBtnEqui,
            link:"",
            textlink:"Equipamentos",
            state:openEqui,
            onChance:setOpenEqui,
            item:[
                {
                imgIcon: ImgAddFunc,
                link:"funcionarios/create",
                textlink:"Registrar Funcionário",
                state:undefined,
                onChance:undefined,
                item:undefined
                }
            ]
        },
        {
            imgIcon: ImgBtnConfig,
            link:"configuration",
            textlink:"Configurações",
            state:undefined,
            onChance:undefined,
            item:undefined
        }
    ]
    return(
        <header className={themeCurrent}>
            <Navbar>
                <MenuLeft/>
                <ProfileOption/>
            </Navbar>
            <SideBar>
                <ListItem>
                    {
                        itensMenu.map((item, index) =>{
                            return(
                                <>
                                <ItemMenu
                                    imgIcon={item.imgIcon}
                                    link={item.link}
                                    textlink={item.textlink}
                                    item={item.item}
                                    state={item.state}
                                    onChance={item.onChance}
                                    key={`${index}-${item.link}`}
                                />
                                </>
                            )
                        })
                    }
                </ListItem>
            </SideBar>
        </header>
    )
}
