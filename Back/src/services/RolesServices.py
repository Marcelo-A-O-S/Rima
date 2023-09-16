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
    async def GetById(self, id: int):
        try:
            busca = await self.rolesRepository.FindById(Tables.ROLES.value,id);
            if busca != None:
                for item in busca:
                    role = Roles(item['id'], item['roleName'], item['typeid']);
                return role
            return busca;
        except Exception as ex:
            print("Error :",ex);
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
    async def GetAll(self):
        try:
            listRoles:list[Roles]= []
            lista = await self.rolesRepository.List(Tables.ROLES.value);
            if lista.__len__() > 0:
                for item in lista:
                    role = Roles(item['id'],item['roleName'],item['typeid']);
                    listRoles.append(role);
                return listRoles;
            return listRoles;
        except Exception as ex:
            print(ex)

    async def CheckExistsRole(self, role: Roles):
        try:
            check = await self.rolesRepository.CheckExistsEntityWithId(role);
            return check;
        except Exception as ex:
            print(ex);

    async def CheckPropertyRoleExists(self, role:Roles):
        try:
            exists = await self.rolesRepository.CheckExistsEntity(role);
            return exists;
        except Exception as ex:
            print(ex);
