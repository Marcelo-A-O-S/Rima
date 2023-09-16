from services.Repositories.EmployeeRolesRepository import EmployeeRolesRepository;
from domain.Entities.EmployeeRoles import EmployeeRoles;
from domain.Enums.Tables import Tables
class EmployeeRolesServices:
    def __init__(self) -> None:
        self.emploRolesRepository = EmployeeRolesRepository();

    async def Save(self, entity: EmployeeRoles):
        try:
            if(entity.id == 0 ):
                await self.emploRolesRepository.Save(entity);
                return "Relação de função com funcionário salva com sucesso!";
            else:
                await self.emploRolesRepository.Update(entity);
                return "Relação de função com funcionário atualizada com sucesso!";
        except Exception as e:
            print(e)
    async def Delete(self, id: id):
        try:
            await self.emploRolesRepository.Delete(Tables.EMPLOYEEROLES.value,id);
            return "Relação de funcção com funcionário deletada com sucesso!";
        except Exception as ex:
            print("Error: ", ex);
    async def GetById(self, id):
        try:
            busca = await self.emploRolesRepository.FindById(Tables.EMPLOYEEROLES.value, id);
            if busca != None:
                for item in busca:
                    emploroles = EmployeeRoles(item['id'],item['employeeid'],item['roleid']);
                return emploroles;
            else:
                return None;
        except Exception as ex:
            print("Error: ", ex);
    async def GetAll(self):
        try:
            listEmploRoles : list[EmployeeRoles] = [];
            lista = await self.emploRolesRepository.List(Tables.EMPLOYEEROLES.value);
            if lista.__len__() > 0:
                for item in lista:
                    emploroles = EmployeeRoles(item['id'],item['employeeid'],item['roleid']);
                    listEmploRoles.append(emploroles);
                return listEmploRoles;
            else:
                return lista;
        except Exception as ex:
            print("Error: ", ex);
