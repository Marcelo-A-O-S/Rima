using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class EmployeeRoles
    {
        [Key]
        public int id { get; set; }
        public int employeeid { get; set; }
        public int roleid { get; set; }
    }
}
