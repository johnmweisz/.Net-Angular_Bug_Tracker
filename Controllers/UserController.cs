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

		private IActionResult OkJson(object ToJson) {
			return Ok(JsonConvert.SerializeObject(
				ToJson,
				Formatting.Indented,
				new JsonSerializerSettings 
					{
						ReferenceLoopHandling = ReferenceLoopHandling.Ignore
					}
			));
		}

        [HttpPost("[action]")]
        public IActionResult Register([FromBody] User NewUser)
        {
            if(ModelState.IsValid)
            {
                if(context.Users.Any(u => u.Email == NewUser.Email))
                {
                    ModelState.AddModelError("Email", "Email already in use, please log in.");
                    return BadRequest(JsonConvert.SerializeObject(ModelState));
                }
                PasswordHasher<User> Hasher = new PasswordHasher<User>();
                NewUser.Password = Hasher.HashPassword(NewUser, NewUser.Password);
                context.Add(NewUser);
                context.SaveChanges();
                return OkJson(NewUser);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] Login TryUser)
        {
            if(ModelState.IsValid)
            {
                User FindUserByEmail = context.Users.FirstOrDefault(u => u.Email == TryUser.Email);
                if(FindUserByEmail == null)
                {
                    ModelState.AddModelError("Email", "Email does not exist, please register.");
                    return BadRequest(JsonConvert.SerializeObject(ModelState));
                }
                var hasher = new PasswordHasher<User>();
                var result = hasher.VerifyHashedPassword(FindUserByEmail, FindUserByEmail.Password, TryUser.Password);
                if(result == PasswordVerificationResult.Success)
                {
                return OkJson(FindUserByEmail);
                }
                ModelState.AddModelError("Password", "Password incorrect, please try again.");
                return BadRequest(JsonConvert.SerializeObject(ModelState));
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

        [HttpGet("[action]/{UserId}")]
        public IActionResult Profile(int UserId)
        {
            User User = context.Users
            .Include(u => u.Created)
                .ThenInclude(b => b.Project)
                    .ThenInclude(b => b.Bugs)
            .Include(u => u.Contributors)
                .ThenInclude(a => a.Project)
                    .ThenInclude(b => b.Bugs)
            .FirstOrDefault(u => u.UserId == UserId);
            return OkJson(User);
        }

        [HttpPut("[action]")]
        public IActionResult Edit([FromBody] EditUser EditUser)
        {
            if (ModelState.IsValid)
            {
                User User = context.Users.FirstOrDefault(u => u.UserId == EditUser.UserId);
                User.FirstName = EditUser.FirstName;
                User.LastName = EditUser.LastName;
                User.Email = EditUser.Email;
                User.UpdatedAt = DateTime.Now;
                context.SaveChanges();
                return OkJson(User);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
        }

        [HttpDelete("[action]/{UserId}")]
        public IActionResult Delete(int UserId)
        {
            User User = context.Users.FirstOrDefault(u => u.UserId == UserId);
            context.Remove(User);
            context.SaveChanges();
            return Ok();
        }

    }
}