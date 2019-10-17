using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class Bug
    {
        [Key]
        public int BugId {get;set;}
        [Required]
        public string Subject {get;set;}
        [Required]
        public string Description {get;set;}
        [Required]
        public string Priority {get;set;}
        [Required]
        public string Status {get;set;}
        [Display(Name = "Due Date")]
        public DateTime? DueDate {get;set;}
        [Display(Name = "Start Date")]
        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;
        public string Confirm {get;set;}
        // Link & Navigation
        public int UserId {get;set;}
        public User Creator {get;set;}
        public ICollection<Assign> Assigned {get;set;}
        public ICollection<Comment> Comments {get;set;}
    }
}