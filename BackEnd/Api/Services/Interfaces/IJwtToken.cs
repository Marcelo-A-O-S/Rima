using Api.ViewModel;
using Domain.Entities;

namespace Api.Services.Interfaces
{
    public interface IJwtToken
    {
        Task<string> CreateJwtTokenAsync(UserViewModel user);    
    }
}
