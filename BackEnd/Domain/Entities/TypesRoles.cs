using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class TypesRoles
    {
        [Key]
        public int id { get; set; }
        public string typeName { get; set; }

        public TypesRoles()
        {

        }
        public TypesRoles(int id, string typeName)
        {
            this.id = id;
            this.typeName = typeName;
        }
    }
}
