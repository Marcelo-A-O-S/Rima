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
            else:
                await self.typesRolesRepository.Update(entity);
        except Exception as e:
            print("Error: ", e)

    async def GetAll(self):
        try:
            list = await self.typesRolesRepository.List(Tables.TYPESROLES);
            return list
        except Exception as e:
            print("Error: ",e )
