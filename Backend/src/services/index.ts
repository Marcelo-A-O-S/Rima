import { EmployeeRoles } from '../domain/Entities/EmployeeRole'
import { Employees } from '../domain/Entities/Employees'
import { Roles } from '../domain/Entities/Roles'
import { Users } from '../domain/Entities/Users'
import { typesRoles } from '../domain/Entities/typesRoles'
import { ERoles } from '../domain/Enums/ERoles'
import { ETypeRole } from '../domain/Enums/ETypeRole'
import { EmployeeRoleServices } from './EmployeeRoleServices'
import { EmployeesServices } from './EmployeesServices'
import { RolesServices } from './RolesServices'
import { UsersServices } from './UsersServices'
import { typesRolesServices } from './typeRolesServices'

export * from './repositories'
export * from './interfaces'
export * from '../services'

export const ConfigAdmiministrativa = async() =>{
    await CreateTypeRoles();
    await CreateRoles();
    await CreateUser();
}
const CreateTypeRoles = async() => {
    let result: any;
    const typeRoleServices = new typesRolesServices();
    result = await typeRoleServices.VerifyTypeRoleNameExists(ETypeRole.ADIMINISTRATIVA);
    if(result === false){
        const typeRole = new typesRoles();
        typeRole.typeName = ETypeRole.ADIMINISTRATIVA;
        await typeRoleServices.Save(typeRole);
    }
    result = await typeRoleServices.VerifyTypeRoleNameExists(ETypeRole.OPERACIONAL);
    if(result === false){
        const typeRole = new typesRoles();
        typeRole.typeName = ETypeRole.OPERACIONAL;
        await typeRoleServices.Save(typeRole);
    }
}
const CreateRoles = async() => {
    let result:any;
    const roleServices = new RolesServices();
    const typeRoleServices = new typesRolesServices();
    result = await roleServices.VerifyRoleNameExists(ERoles.ADMIN);
    if(result === false){
        const typeRole = await typeRoleServices.GetTypeRoleByTypeName(ETypeRole.ADIMINISTRATIVA);
        const role = new Roles({
            id:0,
            roleName: ERoles.ADMIN,
            typeid: typeRole.id
        })
        await roleServices.Save(role);
    }
}

const CreateUser = async() => {
    try{
        let result:any;
        const employeeServices = new EmployeesServices();
        const roleServices = new RolesServices();
        const employeeRoleServices = new EmployeeRoleServices();
        const usersServices = new UsersServices();
        result = await employeeServices.VerifyEmailExists("administrador@admin.com")
        if(result === false){
            let employeeAdmin = new Employees();
            employeeAdmin.lastName = "Administrador";
            employeeAdmin.firstName = "Admin";
            employeeAdmin.email = "administrador@admin.com";
            await employeeServices.Save(employeeAdmin);
            employeeAdmin = await employeeServices.GetByEmail("administrador@admin.com");
            let role = await roleServices.GetRoleByRoleName(ERoles.ADMIN);
            let employeeRole = new EmployeeRoles();
            employeeRole.employeeid = employeeAdmin.id;
            employeeRole.roleid = role.id;
            console.log(employeeRole.employeeid);
            await employeeRoleServices.Save(employeeRole);
            const user = new Users();
            user.employeeid = employeeAdmin.id;
            user.createPasswordHash('123456');
            await usersServices.Save(user);
        }
    }catch(err){
        throw new Error(`${err}`);
    }
}
