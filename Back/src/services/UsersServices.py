from services.Repositories.UsersRepository import UsersRepository;
from domain.Entities.Users import Users;
from domain.Enums.Tables import Tables;


class UsersServices:
    def __init__(self) -> None:
        self.usersRepository = UsersRepository();

    async def Save(self, entity: Users):
        try:
            if(entity.id == 0):
                await self.usersRepository.Save(entity);
            else:
                await self.usersRepository.Update(entity);

        except Exception as e:
            print(e);
