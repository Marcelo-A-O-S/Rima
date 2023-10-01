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
        public EmployeeRoles()
        {

        }
        public EmployeeRoles(int id, int employeeid, int roleid)
        {
            this.id = id;
            this.employeeid = employeeid;
            this.roleid = roleid;
        }
    }
}
