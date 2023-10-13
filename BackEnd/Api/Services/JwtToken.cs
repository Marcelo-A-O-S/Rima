using Api.Services.Interfaces;
using Api.ViewModel;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services
{
    public class JwtToken : IJwtToken
    {
        private readonly IConfiguration config;

        public JwtToken(IConfiguration config)
        {
            this.config = config;
        }
        public async Task<string> CreateJwtTokenAsync(UserViewModel user)
        {
            var key = this.config.GetValue<string>("JWTkey:Key");
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("firstName", user.firstName));
            claims.Add(new Claim("lastName", user.lastName));
            claims.Add(new Claim("email", user.email));
            foreach (var role in user.roles)
            {
                claims.Add(new Claim("role", role.roleName));
            }
            var keyjwt = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config.GetSection("JWTkey:Key").Value));
            var credential = new SigningCredentials(keyjwt,SecurityAlgorithms.HmacSha256Signature);
            var jwt = new JwtSecurityToken(
                claims: claims,
                signingCredentials: credential,
                expires: DateTime.Now.AddHours(8)
                ) ;
            var token = new JwtSecurityTokenHandler().WriteToken(jwt);
            return token;
        }
    }
}
