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
        public string Description {get;set;}
        [Required]
        public string Status {get;set;}
        [Required]
        public int Public {get;set;}
        public string URL {get;set;}
        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;
        // Link & Navigation
        [Required]
        public int UserId {get;set;}
        public User Creator {get;set;}
        public ICollection<Contributor> Contributors {get;set;}
        public ICollection<Bug> Bugs {get;set;}
    }
}