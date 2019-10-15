using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BugTracker.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BugTracker.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private Context context;
        public UserController(Context context)
        {
            this.context = context;
        }
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] User NewUser)
        {
            if(ModelState.IsValid)
            {
                // Check if Email already exists.
                if(context.Users.Any(u => u.Email == NewUser.Email))
                {
                    ModelState.AddModelError("Email", "already in use, please log in.");
                    return BadRequest(JsonConvert.SerializeObject(ModelState));
                }
                // Hash password.
                PasswordHasher<User> Hasher = new PasswordHasher<User>();
                NewUser.Password = Hasher.HashPassword(NewUser, NewUser.Password);
                context.Add(NewUser);
                context.SaveChanges();
                // Send User to Client for locastorage.
                return Ok(JsonConvert.SerializeObject(
                    NewUser,
                    Formatting.Indented,
                    new JsonSerializerSettings 
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }
                ));
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] Login TryUser)
        {
            if(ModelState.IsValid)
            {
                // Find user that matches Email provided.
                User FindUserByEmail = context.Users.FirstOrDefault(u => u.Email == TryUser.Email);
                // Check if email does not exist.
                if(FindUserByEmail == null)
                {
                    ModelState.AddModelError("Email", "does not exist, please register.");
                    return BadRequest(JsonConvert.SerializeObject(ModelState));
                }
                // Convert string to hash and compare against hashed hassword.
                var hasher = new PasswordHasher<User>();
                var result = hasher.VerifyHashedPassword(FindUserByEmail, FindUserByEmail.Password, TryUser.Password);
                if(result == PasswordVerificationResult.Success)
                {
                    return Ok(JsonConvert.SerializeObject(
                        FindUserByEmail, 
                        Formatting.Indented, 
                        new JsonSerializerSettings 
                            { 
                                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                            }
                    ));
                }
                ModelState.AddModelError("Password", "incorrect.");
                return BadRequest(JsonConvert.SerializeObject(ModelState));
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

    }

}