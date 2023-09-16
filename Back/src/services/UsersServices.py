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
                return "Usuário salvo com sucesso!";
            else:
                await self.usersRepository.Update(entity);
                return "Usuário atualizado com sucesso!";
        except Exception as e:
            print(e);
    async def Delete(self, entity:Users):
        try:
            await self.usersRepository.Delete(Tables.USERS.value, entity.id);
            return "Usuário deletado com sucesso!";
        except Exception as ex:
            print("Error: ", ex);
    async def GetAll(self):
        try:
            listUsers : list[Users] = []
            result = await self.usersRepository.List(Tables.USERS.value);
            if result.__len__() > 0:
                for item in result:
                    user = Users(item['id'], item['employeeid'])
                    user.passwordHash = item['passwordHash'];
                    user.passwordSalt = item['passwordSalt'];
                    listUsers.append(user);
            return result
        except Exception as ex:
            print("Error :", ex );
    async def GetById(self, id: int):
        try:
            busca = await self.usersRepository.FindById(Tables.USERS.value, id);
            if busca != None:
                for item in busca:
                    user = Users(item['id'], item['employeeid']);
                    user.passwordHash = item['passwordHash'];
                    user.passwordSalt = item['passwordSalt'];
                return user;
            else:
                return None;
        except Exception as ex:
            print("Error: ", ex);
