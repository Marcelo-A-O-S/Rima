using System.ComponentModel.DataAnnotations;

namespace Api.ViewModel.Authentication
{
    public class LoginViewModel
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email é obrigatório")]
        public string email { get; set; }
        [Required(ErrorMessage = "Password é obrigatório")]
        public string password { get; set; }
    }
}
