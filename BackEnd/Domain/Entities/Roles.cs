using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Roles
    {
        [Key]
        public int id { get; set; }
        public string roleName { get; set; }
        public int typeid { get; set; }
        public Roles()
        {

        }
        public Roles(int id, string roleName, int typeid)
        {
            this.id = id;
            this.roleName = roleName;
            this.typeid = typeid;
        }
    }
}
