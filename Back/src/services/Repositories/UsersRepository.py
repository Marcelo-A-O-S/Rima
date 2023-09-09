from data import BaseGenerics
from domain.Entities.Users import Users
class UsersRepository(BaseGenerics):
    def __init__(self) -> None:
        super().__init__()
