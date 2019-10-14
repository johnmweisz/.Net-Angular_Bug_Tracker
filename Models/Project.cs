using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class Project
    {
        [Key]
        public int ProjectId {get;set;}
        [Required]
        public string Name {get;set;}
    }
}