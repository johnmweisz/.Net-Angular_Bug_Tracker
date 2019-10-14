using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class Assign
    {
        [Key]
        public int AssignId {get;set;}
        [Required]
        public int BugId {get;set;}
        [Required]
        public int UserId {get;set;}
        public Bug Bug {get;set;}
        public User User {get;set;}
    }
}