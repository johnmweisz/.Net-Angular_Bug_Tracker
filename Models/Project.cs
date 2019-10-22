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
        [Required]
        public int UserId {get;set;}
        [Required]
        public bool Public {get;set;}
        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;
        public User Creator {get;set;}
        public ICollection<Contributor> Contributors {get;set;}
        public ICollection<Bug> Bugs {get;set;}
    }
}