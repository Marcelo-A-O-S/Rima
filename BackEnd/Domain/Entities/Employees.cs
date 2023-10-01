using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Employees
    {
        [Key]
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        private string code { get; set; } 

        public Employees()
        {

        }
        public async Task GenerateCode()
        {
            this.code = new Guid().ToString();
        }
        public string GetCode()
        {
            return this.code;
        }
        public void SetCode(string code)
        {
            this.code = code;
        }
        
    }
}
