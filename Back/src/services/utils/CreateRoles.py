from services.RolesServices import RolesServices;
from services.typesRolesServices import typesRolesServices;
from domain.Enums.ERoles import ERoles;
from domain.Enums.EtypeRoles import EtypesRoles;
from domain.Entities.Roles import Roles;
async def CreateRoles():
    result:any;
    rolesservices = RolesServices();
    typeservices = typesRolesServices();
    propriedades = [propriedade for propriedade in ERoles.__members__.values()];
    #propriedades_visiveis = [nome for nome in propriedades if not nome.("__")]
    for prop in propriedades:
        result = await rolesservices.VerifyRoleNameExists(prop.value);
        if result == False:
            role: Roles;
            operacional = await typeservices.GetTypeRoleByTypeName(EtypesRoles.OPERACIONAL.value)
            admin = await typeservices.GetTypeRoleByTypeName(EtypesRoles.ADIMINISTRATIVA.value)
            if prop.value == ERoles.GESTOR.value:
                role = Roles(0, prop.value, admin.id);
            elif prop.value == ERoles.ADMIN.value:
                role = Roles(0, prop.value, admin.id);
            elif prop.value == ERoles.DESENVOLVEDOR.value:
                role = Roles(0, prop.value, admin.id);
            elif prop.value == ERoles.SECRETARIO.value:
                role = Roles(0, prop.value, admin.id);
            elif prop.value == ERoles.MECANICOA.value:
                role = Roles(0, prop.value, operacional.id);
            elif prop.value == ERoles.MECANICOI.value:
                role = Roles(0, prop.value, operacional.id);
            elif prop.value == ERoles.ELETROMECANICO.value:
                role = Roles(0, prop.value, operacional.id);
            elif prop.value == ERoles.SOLDADOR.value:
                role = Roles(0, prop.value, operacional.id);
            elif prop.value == ERoles.CARPINTEIRO.value:
                role = Roles(0, prop.value, operacional.id);

            await rolesservices.Save(role)
