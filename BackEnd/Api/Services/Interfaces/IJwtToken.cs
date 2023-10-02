using Domain.Entities;

namespace Api.Services.Interfaces
{
    public interface IJwtToken
    {
        Task<string> CreateJwtTokenAsync(Users user);    
    }
}
