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
    public class ContributorController : Controller
    {
        private Context context;
        public ContributorController(Context context)
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

		[HttpGet("[action]/{ProjectId}")]
		public IActionResult GetAll(int ProjectId)
		{
			IQueryable<Contributor> Contributor = context.Contributors
			.Include(c => c.Project)
			.Include(c => c.User)
			.OrderBy(b => b.CreatedAt);
			return OkJson(Contributor.ToList());
		}

		[HttpPost("[action]")]
		public IActionResult Add([FromBody] Contributor NewContributor) {
            if(ModelState.IsValid)
            {
                context.Add(NewContributor);
                context.SaveChanges();
                return OkJson(NewContributor);
            }
            return BadRequest(JsonConvert.SerializeObject(ModelState));
		}

		[HttpGet("[action]/{ContributorId}")]
		public IActionResult Authorize(int ContributorId) {
			Contributor Contributor = context.Contributors.FirstOrDefault(c => c.ContributorId == ContributorId);
			if (Contributor.Authorized == 1) {
				return BadRequest();
			}
			Contributor.Authorized = 1;
			context.SaveChanges();
			return OkJson(Contributor);
		}

		[HttpGet("[action]/{ContributorId}")]
		public IActionResult Deauthorize(int ContributorId) {
			Contributor Contributor = context.Contributors.FirstOrDefault(c => c.ContributorId == ContributorId);
			if (Contributor.Authorized == 0) {
				return BadRequest();
			}
			Contributor.Authorized = 0;
			context.SaveChanges();
			return OkJson(Contributor);
		}

		[HttpDelete("[action]/{ContributorId}")]
		public IActionResult Delete(int ContributorId) {
			Contributor Contributor = context.Contributors.FirstOrDefault(c => c.ContributorId == ContributorId);
			context.Remove(Contributor);
			context.SaveChanges();
			return OkJson(Contributor);
		}

    }
}