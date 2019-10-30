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
    public class UpdateController : Controller
    {
        private Context context;
        public UpdateController(Context context)
        {
            this.context = context;
        }

		private IActionResult OkJson(object ToJSON) {
			return Ok(JsonConvert.SerializeObject(
				ToJSON,
				Formatting.Indented,
				new JsonSerializerSettings 
					{
						ReferenceLoopHandling = ReferenceLoopHandling.Ignore
					}
			));
		}

		[HttpGet("[action]/{BugId}")]
		public IActionResult GetAll(int BugId)
		{
			List<Update> Updates = context.Updates
			.Where(u => u.BugId == BugId)
			.Include(c => c.User)
			.OrderBy(b => b.CreatedAt)
			.ToList();
			return OkJson(Updates);
		}

		[HttpGet("[action]/{UpdateId}")]
		public IActionResult GetOne(int UpdateId)
		{
			Update Update = context.Updates
			.Include(u => User)
			.Include(u => u.Bug)
			.FirstOrDefault(u => u.UpdateId == UpdateId);
			return OkJson(Update);
		}

		[HttpPost("[action]")]
		public IActionResult Add([FromBody] Update NewUpdate) {
            if(ModelState.IsValid)
            {
				Bug Bug = context.Bugs.FirstOrDefault(b => b.BugId == NewUpdate.BugId);
				Bug.Status = NewUpdate.Status;
                context.Add(NewUpdate);
                context.SaveChanges();
                return OkJson(NewUpdate);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
		}

		[HttpDelete("[action]/{UpdateId}")]
		public IActionResult Delete(int UpdateId) {
			Update Update = context.Updates.FirstOrDefault(c => c.UpdateId == UpdateId);
			context.Remove(Update);
			context.SaveChanges();
			return OkJson(Update);
		}

    }
}