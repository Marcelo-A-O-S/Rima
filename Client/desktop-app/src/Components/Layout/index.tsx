import { Outlet } from "react-router-dom"
import Header from "../Header"
import { Component, ReactNode } from 'react'
import Footer from "../Footer"
import Container from "../Container"
import About from "../../Pages/Signed/About"
import HeaderDrop from "../HeaderDrop"
import Notifications from "../Notifications"
interface ILayout{
    children: ReactNode
}

export default function Layout(props: ILayout){
    return(
    <Container>
        <HeaderDrop/>
            {props.children}
        <Notifications/>
    </Container>)
}
