using Bussines.Repository.IRepository;
using Bussines.Services.IServices;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services
{
    public class UsersServices : IUsersServices
    {
        private readonly IUsersRepository usersRepository;

        public UsersServices(IUsersRepository usersRepository)
        {
            this.usersRepository = usersRepository;
        }
        public Task<string> Delete(Users entity)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Users>> GetAll()
        {
            List<Users> users = await this.usersRepository.All();
            return users;
        }

        public async Task<Users> GetByEmail(string email)
        {
            Users user = await this.usersRepository.FindBy("email", email);
            return user;
        }

        public async Task<Users> GetById(int id)
        {
            Users user = await this.usersRepository.SearchById(id);
            return user;
        }

        public async Task<string> Save(Users entity)
        {
            if (entity.id == 0)
            {
                await this.usersRepository.Save(entity);
                return "Usuário salva com sucesso!";
            }
            else
            {
                await this.usersRepository.Update(entity);
                return "Usuário atualizada com sucesso!";
            }
        }

        public async Task<bool> verifyEmailExists(string email)
        {
            var result = await this.usersRepository.CheckPropertyValue(email, "email");
            return result;
        }
    }
}
