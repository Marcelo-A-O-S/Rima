from services.Repositories.typesRolesRepository import typeRolesRepository
from domain.Entities.typesRoles import typesRoles
from domain.Enums import Tables
class typesRolesServices:
    def __init__(self) -> None:
        self.typesRolesRepository = typeRolesRepository();

    async def Save(self, entity: typesRoles):
        try:
            if(entity.id == 0):
                await self.typesRolesRepository.Save(entity);
                return "Tipo de função salva com sucesso!"
            else:
                await self.typesRolesRepository.Update(entity);
                return "Tipo de função atualizada com sucesso!"
        except Exception as e:
            print("Error: ", e);

    async def GetAll(self):
        try:
            listTypeRole:list[typesRoles] = [];
            lista = await self.typesRolesRepository.List(Tables.TYPESROLES.value);
            if(lista.__len__() > 0):
                for item in lista:
                    typeRole = typesRoles(item['id'], item['typeName'])
                    listTypeRole.append(typeRole);
                return listTypeRole;
            return lista
        except Exception as e:
            print("Error: ",e )

    async def VerifyTypeRoleNameExists(self, typeName):
        try:
            result = await self.typesRolesRepository.CheckPerProperty(Tables.TYPESROLES.value, 'typeName', typeName)
            return result;
        except Exception as e:
            print("Error: ",e );

    async def GetTypeRoleByTypeName(self,typeName):
        try:
            result = await self.typesRolesRepository.FindBy(Tables.TYPESROLES.value, 'typeName',typeName);
            if result != None:
                typerole = typesRoles(result['id'],result['typeName']);
                return typerole;
            return None
        except Exception as e:
            print("Error: ",e );
    async def Delete(self, id):
        try:
            await self.typesRolesRepository.Delete(Tables.TYPESROLES.value, id);
            return "Tipo de função deletada com Sucesso!";
        except Exception as e:
            print("Error: ", e);
