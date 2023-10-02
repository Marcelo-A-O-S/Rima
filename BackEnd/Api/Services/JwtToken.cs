using Api.Services.Interfaces;
using Domain.Entities;

namespace Api.Services
{
    public class JwtToken : IJwtToken
    {
        private readonly IConfiguration config;

        public JwtToken(IConfiguration config)
        {
            this.config = config;
        }
        public async Task<string> CreateJwtTokenAsync(Users user)
        {
            throw new NotImplementedException();
        }
    }
}
