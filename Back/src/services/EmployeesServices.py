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
            else:
                await self.employeesRepository.Update(entity);

        except Exception as e:
            print(e);
    async def GetAll(self):
        try:
            listEmployees: List[Employees] = [];
            list = await self.employeesRepository.List(Tables.EMPLOYEES.value);
            if(list.count > 0):
                for item in list:
                    print(item)

        except Exception as e:
            print(e);
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
