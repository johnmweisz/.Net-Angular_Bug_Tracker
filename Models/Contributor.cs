using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class Contributor
    {
        [Key]
        public int ContributorId {get;set;}
        [Required]
        public int ProjectId {get;set;}
        [Required]
        public int UserId {get;set;}
        public Project Project {get;set;}
        public User User {get;set;}
    }
}