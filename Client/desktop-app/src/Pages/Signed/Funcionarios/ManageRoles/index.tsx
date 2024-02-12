import { useContext, useEffect, useState } from "react"
import { ThemeDarkContext } from "../../../../Context/ThemeContext"
import Style from './ManageRoles.module.css'
import Form from "../Create/components/Form";
import Box from "../Create/components/Box";
import InputText from "../Create/components/InputText";
import MultiSelect from "../Create/components/MultiSelect";
import { ApiBackPrivate } from "../../../../Api/Api";
import AuthContext from "../../../../Context/AuthContext";
import ButtonCustom from "../../../../Components/ButtonCustom";
import Table from "../../../../Components/Table";
import TableHeader from "../../../../Components/Table/components/TableHeader";
import ColumnName from "../../../../Components/Table/components/ColumnName";
import TableBody from "../../../../Components/Table/components/TableBody";
import ColumnValue from "../../../../Components/Table/components/ColumnValue";

interface ICreateType {
    id:number;
    roleName:string;
    typeName:string
}
export default function ManageRoles(){
    const [ typeRoles, setTypeRoles ] = useState<any[]>();
    const [ createType, setCreateType ] = useState<ICreateType>({} as ICreateType)
    const { themeCurrent } = useContext(ThemeDarkContext);
    const { user } = useContext(AuthContext);
    useEffect(()=>{
        if(user !== null){
            const api = ApiBackPrivate(user);
            api.get("/TypesRoles/GetTypes")
            .then(response =>{
                const data : any[] = response.data;
                const typeRoleList = data.map(item => ({value: item.typeName, label: item.typeName}));
                setTypeRoles(typeRoleList);
            })
            .catch(err=>{
                console.log(err)
            });
        }
    },[])
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(user !== null){
            const api = ApiBackPrivate(user);
            var button : any = e.nativeEvent;
            if(button.submitter.name === "Salvar"){
                console.log(createType)
                await api.post("/Roles/CreateRole",{
                    roleName: createType.roleName,
                    typeName: createType.typeName
                })
                .then(response =>{
                    console.log(response.data);
                }).catch(err =>{
                    console.log(err);
                })
            }
            if(button.submitter.name === "Atualizar"){
                await api.post("/Roles/CreateRole",{
                    id: createType.id,
                    roleName: createType.roleName,
                    typeName: createType.typeName
                })
                .then(response =>{
                    console.log(response.data);
                }).catch(err =>{
                    console.log(err);
                })
            }
        }
    }
    return(
        <main className={`${Style.main} ${themeCurrent}`}>
            <Form onSubmit={handleSubmit} vertical={true} border={true} >
                <Box vertical={false} border={true} padding="none" expand={true}>
                    <Box vertical={false} padding={'large'}>
                        <Box vertical={false} expand={true}>
                            <InputText
                            name="Nome da Função: "
                            placeholder="Digite aqui a função"
                            element="text"
                            value={createType.roleName}
                            required={false}
                            onChange={(e)=>setCreateType(prev=>{
                                return { ...prev,roleName: e.target.value}
                            })}
                            />
                        </Box>
                        <Box vertical={true} expand={true}>
                            <MultiSelect
                                options={typeRoles}
                                onChange={(e)=>setCreateType(prev=>{
                                    return { ...prev,typeName: e.target.value}
                                })}
                                name="Tipo da Função: "
                                placeholder="Selecione o tipo da função"
                                isMulti={false}
                            />
                            <Box padding="small" center={true}>
                                <ButtonCustom
                                title="Salvar"
                                type="submit"/>
                                <ButtonCustom
                                title="Atualizar"
                                type="submit"/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Form>
            <Box vertical={true} border={true} padding="medium">
                <Box expand={true}>
                    <Table border={true}>
                        <TableHeader expand={false} border={false} >
                            <ColumnName name={" Nome da função "}/>
                            <ColumnName name={" Tipo de função "}/>
 
                        </TableHeader>
                        <TableBody>
                            <ColumnValue value={"teste"}/>
                            <ColumnValue value={"teste"}/>
                        </TableBody>
                        <TableBody>
                            <ColumnValue value={"teste"}/>
                            <ColumnValue value={"teste"}/>
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </main>
    )
}
