import { ThemeDarkContext } from "../../../../Context/ThemeContext"
import {useContext} from 'react'
import Style from './Create.module.css'
import Form from "./components/Form"
import InputText from "./components/InputText"
import Select from "react-select"
import MultiSelect from "./components/MultiSelect"
export default function RegisterEmployee(){
    const { themeCurrent } = useContext(ThemeDarkContext)
    const options = [
        {value:"teste", label:"Teste"},
        {value:"map", label:"Map"},
        {value:"gap", label:"Gap"}
    ]
    return(
        <main className={`${Style.main} ${themeCurrent}`}>
            <Form>
                <InputText
                name="Nome: "
                placeholder="Digite aqui o nome"
                element="text"
                required={true} />
                <InputText
                name="Sobrenome: "
                placeholder="Digite aqui o sobrenome"
                element="text"
                required={true}/>
                <InputText
                name="Email: "
                placeholder="Digite aqui o email"
                element="email"
                required={true}/>
                <MultiSelect
                name="Funções: "
                placeholder="Selecione a função do funcionário"/>
            </Form>
        </main>
    )
}
