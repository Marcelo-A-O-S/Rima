using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class EmployeeRoles
    {
        public int id { get; set; }
        public int employeeid { get; set; }
        public int roleid { get; set; }
    }
}
