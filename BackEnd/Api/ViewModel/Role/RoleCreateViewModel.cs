using System.ComponentModel.DataAnnotations;

namespace Api.ViewModel.Role
{
    public class RoleCreateViewModel
    {
        [Required(ErrorMessage = "O nome da função é obrigatório")]
        public string roleName { get; set; }
        [Required(ErrorMessage = "A especificação de que tipo é a função, é obrigatório")]
        public string typeName { get; set; }
    }
}
