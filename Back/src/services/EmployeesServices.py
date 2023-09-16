from services.Repositories.EmployeesRepository import EmployeesRepository;
from domain.Entities.Employees import Employees;
from typing import List
from domain.Enums.Tables import Tables
class EmployeesServices:
    def __init__(self) -> None:
        self.employeesRepository = EmployeesRepository();
    async def Save(self, entity: Employees):
        try:
            if(entity.id == 0):
                await self.employeesRepository.Save(entity);
                return "Funcionário salvo com sucesso!";
            else:
                await self.employeesRepository.Update(entity);
                return "Funcionário atualizado com sucesso!";

        except Exception as e:
            print(e);

    async def Delete(self, id:int):
        try:
            await self.employeesRepository.Delete(Tables.EMPLOYEES.value, id);
            return "Funcionário deletado com sucesso!";
        except Exception as ex:
            print("Error: ", ex);
    async def GetAll(self):
        try:
            listEmployees: list[Employees] = [];
            lista = await self.employeesRepository.List(Tables.EMPLOYEES.value);
            if lista.__len__() > 0:
                for item in lista:
                    employee = Employees(item['id'], item['firstName'], item['lastName'], item['email']);
                    listEmployees.append(employee);
                return listEmployees;
            return lista;

        except Exception as e:
            print(e);

    async def GetById(self, id:int):
        try:
            busca = await self.employeesRepository.FindById(Tables.EMPLOYEES.value,id);
            if busca != None:
                for item in busca:
                    employee = Employees(item['id'], item['firstName'], item['lastName'], item['email'])
                return employee;
            return busca;
        except Exception as ex:
            print("Error: ", ex)
        return
    async def VerifyEmailExists(self,email:str):
        try:
            result = await self.employeesRepository.CheckPerProperty(Tables.EMPLOYEES.value, 'email', email);
            return result;
        except Exception as e:
            print(e);
    async def GetByEmail(self, email):
        try:
            result = await self.employeesRepository.FindBy(Tables.EMPLOYEES.value,'email',email);
            if result != None:
                employee = Employees(result['id'], result['firstName'], result['lastName'], result['email']);
                return employee;
            return None;
        except Exception as e:
            print(e);
    async def CheckEmployeeExists(self):
        return

    async def CheckPropertiesEmployeeExists(self):
        return
