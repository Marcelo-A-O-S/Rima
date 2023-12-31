﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Services.IServices
{
    public interface IUsersServices : IServices<Users>
    {
        Task<bool> verifyEmailExists(string email);
        Task<Users> GetByEmail(string email);
    }
}
