using Domain.Entities;

namespace Api.ViewModel
{
    public class UserViewModel
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public List<Roles> roles { get; set; }
    }
}
