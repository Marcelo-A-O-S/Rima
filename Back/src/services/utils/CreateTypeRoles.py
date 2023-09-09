from services.typesRolesServices import typesRolesServices;
from domain.Enums.EtypeRoles import EtypesRoles
from domain.Entities.typesRoles import typesRoles

async def CreateTypeRoles():
    result:any;
    services = typesRolesServices();
    propriedades = [propriedade for propriedade in EtypesRoles.__members__.values()];
    for prop in propriedades:
        result = await services.VerifyTypeRoleNameExists(prop.value);
        if result == False:
            typeRole = typesRoles(0 , prop.value);
            await services.Save(typeRole);
