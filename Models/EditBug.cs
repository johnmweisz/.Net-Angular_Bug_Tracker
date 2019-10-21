using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BugTracker.Models
{
    public class EditBug
    {
        [Required]
        public int BugId {get;set;}
        [Required]
        public string Subject {get;set;}
        [Required]
        public string Description {get;set;}
        [Required]
        public string Priority {get;set;}
        [Required]
        public string Status {get;set;}
        [Required]
        public DateTime DueDate {get;set;}
    }
}