from domain.Entities.Employees import Employees
from data.Generic.Generics import BaseGenerics


class EmployeesRepository(BaseGenerics):
    def __init__(self) -> None:
        super().__init__()
