import { ThemeDarkContext } from "../../../../Context/ThemeContext"
import {useContext, useEffect, useState} from 'react'
import Style from './Create.module.css'
import Form from "./components/Form"
import InputText from "./components/InputText"
import MultiSelect from "./components/MultiSelect"
import Box from "./components/Box"
import AuthContext from "../../../../Context/AuthContext"
interface SelectValue{
    value:string,
    label:string
}
interface EmployeeCreate{
    firstName:string,
    lastName:string,
    email:string,
    roles:any[],
    password:string

}
export default function RegisterEmployee(){
    const { themeCurrent } = useContext(ThemeDarkContext)
    const {user} = useContext(AuthContext);
    const [data, setData ] = useState<any[]>([])
    const [selectValue, setSelectValue ] = useState([])
    const [ create, setCreate ] = useState<EmployeeCreate>({} as EmployeeCreate)
    const [ enableUser, setEnableUser ] = useState(true);
    useEffect(()=>{

        fetch('https://localhost:7205/api/Roles/GetRoles',{
        }).then((res)=>res.json()).then((array:any[])=> {
            const optionList = array.map(item => ({ value: { roleName: item.roleName , typeid: item.typeid }, label: item.roleName }));
            setData(optionList);
        })
    },[])
    useEffect(()=>{
    },[create])
    useEffect(()=>{
        if(selectValue.length > 0){
            const novoRoles = selectValue.map((item: any) => {
                if(item.value.typeid === 2){
                    setEnableUser(false);
                }else{
                    setEnableUser(true)
                }
                return item.value
            });
            setCreate(prevState=>{
                return { ...prevState, roles: novoRoles };
            })
        }else{
            setEnableUser(true)
        }
    },[selectValue])
    async function Register(){

    }
    return(
        <main className={`${Style.main} ${themeCurrent}`}>
            <Form vertical={false} border={true}>
                <Box vertical={false} border={true} expand={true} padding="small">
                    <Box vertical={true} border={false} expand={true}>
                    <InputText
                    name="Nome: "
                    placeholder="Digite aqui o nome"
                    element="text"
                    value={create?.firstName}
                    onChange={(e)=>setCreate((prevState)=>{
                        return { ...prevState,firstName: e.target.value}
                    })}
                    required={true} />
                    <InputText
                    name="Sobrenome: "
                    placeholder="Digite aqui o sobrenome"
                    element="text"
                    value={create?.lastName}
                    onChange={(e)=>setCreate((prevState)=>{
                        return { ...prevState,lastName: e.target.value}
                    })}
                    required={true}/>

                    <MultiSelect
                    options={data}
                    name="Funções: "
                    value={selectValue}
                    onChange={setSelectValue}
                    placeholder="Selecione as funções do funcionário"/>
                    </Box>
                    <Box vertical={true} border={false} expand={true}>
                    <InputText
                        name="Email: "
                        placeholder="Digite aqui o email"
                        element="email"
                        value={create?.email}
                        onChange={(e)=>setCreate((prevState)=>{
                            return { ...prevState,email: e.target.value}
                        })}
                        required={true}
                        disabled={enableUser}/>
                    <InputText
                        name="Senha: "
                        placeholder="Digite aqui a senha"
                        element="text"
                        disabled={enableUser}
                    />
                    <InputText
                        name="Confirme a senha: "
                        placeholder="Repita aqui a senha"
                        element="password"
                        disabled={enableUser}
                    />
                    <Box padding="medium" expand={true} border={false}>
                        <button>Update</ button>
                        <button onClick={Register}>Registrar</ button>
                    </Box>
                    </Box>
                </Box>
            </Form>
            <Box vertical={true} border={true} padding="medium">
                <Box vertical={true} border={true} padding="none">

                </Box>
            </Box>
        </main>
    )
}
