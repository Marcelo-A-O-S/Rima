from services.EmployeesServices import EmployeesServices;
from services.RolesServices import RolesServices;
from services.UsersServices import UsersServices;
from services.EmployeeRolesServices import EmployeeRolesServices;
from domain.Entities.Employees import Employees;
from domain.Entities.EmployeeRoles import EmployeeRoles;
from domain.Entities.Users import Users;
from domain.Enums.ERoles import ERoles

async def InitializeUsersAdmin():

    employeeservices = EmployeesServices();
    roleservices = RolesServices();
    userservices = UsersServices();
    emrolesservices = EmployeeRolesServices();
    result = await employeeservices.VerifyEmailExists("administrador@admin.com");
    if result == False:
        employeeAdmin = Employees(0, "Admin","Administrador","administrador@admin.com");
        await employeeservices.Save(employeeAdmin);
        employeeAdmin = await employeeservices.GetByEmail("administrador@admin.com");
        role = await roleservices.GetRoleByRoleName(ERoles.ADMIN.value);
        employeerole = EmployeeRoles(0,employeeAdmin.id,role.id);
        await emrolesservices.Save(employeerole);
        user = Users(0, employeeAdmin.id);
        await user.createPasswordHash('123456');
        await userservices.Save(user);
