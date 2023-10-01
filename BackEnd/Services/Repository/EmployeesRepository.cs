﻿using Bussines.Repository.IRepository;
using Database.Generics;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussines.Repository
{
    public class EmployeesRepository : Generics<Employees>, IEmployeesRepository
    {
    }
}
