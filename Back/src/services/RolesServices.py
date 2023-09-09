from services.Repositories.RolesRepository import RolesRepository;
from domain.Entities.Roles import Roles;
from domain.Enums.Tables import Tables;


class RolesServices:
    def __init__(self) -> None:
        self.rolesRepository = RolesRepository();

    async def Save(self, entity: Roles):
        try:
            if(entity.id == 0):
                await self.rolesRepository.Save(entity);
                return "Função salva com sucesso!";
            else:
                await self.rolesRepository.Update(entity);
                return "Função atualiza com sucesso!";
        except Exception as e:
            print(e)
    async def VerifyRoleNameExists(self,roleName: str):
        result = await self.rolesRepository.CheckPerProperty(Tables.ROLES.value, 'roleName', roleName);
        if result == True:
            return True;
        return False;

    async def GetRoleByRoleName(self, roleName: str):
        try:
            result: any;
            result = await self.rolesRepository.FindBy(Tables.ROLES.value, 'roleName', roleName);
            if result != None:
                role = Roles(result['id'], result['roleName'],result['typeid']);
                return role;
            return None;
        except Exception as e:
            print(e);
    async def Delete(self, id):
        try:
            await self.rolesRepository.Delete(Tables.ROLES.value, id);
            return "Deletado com sucesso!"
        except Exception as e:
            print(e)
