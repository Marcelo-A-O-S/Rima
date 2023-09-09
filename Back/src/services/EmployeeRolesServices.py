from services.Repositories.EmployeeRolesRepository import EmployeeRolesRepository;
from domain.Entities.EmployeeRoles import EmployeRoles;
class EmployeeRolesServices:
    def __init__(self) -> None:
        self.emploRolesRepository = EmployeeRolesRepository();

    async def Save(self, entity: EmployeRoles):
        try:
            if(entity.id == 0 ):
                await self.emploRolesRepository.Save(entity);
            else:
                await self.emploRolesRepository.Update(entity);
        except Exception as e:
            print(e)
