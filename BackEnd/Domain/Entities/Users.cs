﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Users
    {
        [Key]
        public int id { get; set; }
        public int employeeid { get; set; }
        private string passwordHash { get; set; }
        private string passwordSalt { get; set; }
        public string email { get; set; }
        public Users()
        {

        }
        public Users(int id, int employeeid, string email)
        {
            this.id = id;
            this.employeeid = employeeid;
            this.email = email;
        }

        public async Task createPasswordHash(string password)
        {
            using(var hmac = new HMACSHA256())
            {
                var bufferSalt = hmac.Key;
                this.passwordSalt = Convert.ToBase64String(bufferSalt);
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                this.passwordHash = Convert.ToBase64String(hash);
            }
        }

        public async Task<bool> verifyPassword(string password)
        {
            var key = Convert.FromBase64String(this.passwordSalt);
            using(var hmac = new HMACSHA256(key))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                var hash = Convert.FromBase64String(this.passwordHash);
                return computedHash.SequenceEqual(hash);
            }
        }
        public async Task SetPasswordHash(string passwordHash)
        {
            this.passwordHash = passwordHash;
        }
        public async Task SetPasswordSalt(string passwordSalt)
        {
            this.passwordSalt = passwordSalt;
        }
    }
}
